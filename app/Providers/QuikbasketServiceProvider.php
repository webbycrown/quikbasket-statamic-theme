<?php

namespace App\Providers;

use App\Console\Commands\SetupIndustryCommand;
use App\Http\Middleware\PrefixAbsolutePaths;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\ValidationException;
use Statamic\Events\FormSubmitted;
use Statamic\Facades\Entry;
use Statamic\Facades\GlobalSet;
use Statamic\Facades\Site;
use Statamic\Facades\User;
use Statamic\Support\Str;

class QuikbasketServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([SetupIndustryCommand::class]);
        }

        $this->app->booted(function () {
            $appUrl = rtrim((string) config('app.url'), '/');
            $path = (string) (parse_url($appUrl, PHP_URL_PATH) ?: '');
            if ($path !== '' && $path !== '/') {
                URL::forceRootUrl($appUrl);
                $scheme = parse_url($appUrl, PHP_URL_SCHEME);
                if (is_string($scheme) && $scheme !== '') {
                    URL::forceScheme($scheme);
                }
            }
            View::share('qb_path_prefix', ($path !== '/' ? $path : ''));
        });

        $this->app->make('router')->pushMiddlewareToGroup('web', PrefixAbsolutePaths::class);

        Event::listen(FormSubmitted::class, function (FormSubmitted $event) {
            $handle = $event->submission->form()->handle();

            if ($handle === 'inquiry') {
                if ((string) $event->submission->get('clear_cart') !== '1') {
                    return;
                }

                $cart = self::cartLines();
                $totals = self::cartTotalsPayload(0);
                $orderId = (string) random_int(10000, 99999);
                $data = $event->submission->data();
                $first = trim((string) ($data->get('first_name') ?? ''));
                $last = trim((string) ($data->get('last_name') ?? ''));
                $name = trim((string) ($data->get('name') ?? ''));
                if ($name === '') {
                    $name = trim($first.' '.$last);
                }
                $dial = trim((string) ($data->get('phone_dial') ?? ''));
                $phone = trim((string) ($data->get('phone') ?? ''));
                $phoneFull = trim($dial.' '.$phone);
                $shipDifferent = (string) ($data->get('ship_different') ?? '') === '1';
                $order = [
                    'id' => $orderId,
                    'date' => now()->format('d M, Y'),
                    'status' => 'Inquiry received',
                    'status_key' => 'received',
                    'name' => $name,
                    'first_name' => $first,
                    'last_name' => $last,
                    'email' => trim((string) ($data->get('email') ?? '')),
                    'phone' => $phoneFull !== '' ? $phoneFull : $phone,
                    'address' => trim((string) ($data->get('address') ?? '')),
                    'city' => trim((string) ($data->get('city') ?? '')),
                    'state' => trim((string) ($data->get('state') ?? '')),
                    'pincode' => trim((string) ($data->get('pincode') ?? '')),
                    'country' => trim((string) ($data->get('country') ?? '')),
                    'ship_different' => $shipDifferent,
                    'ship_address' => $shipDifferent ? trim((string) ($data->get('ship_address') ?? '')) : '',
                    'ship_city' => $shipDifferent ? trim((string) ($data->get('ship_city') ?? '')) : '',
                    'ship_state' => $shipDifferent ? trim((string) ($data->get('ship_state') ?? '')) : '',
                    'ship_pincode' => $shipDifferent ? trim((string) ($data->get('ship_pincode') ?? '')) : '',
                    'ship_country' => $shipDifferent ? trim((string) ($data->get('ship_country') ?? '')) : '',
                    'message' => (string) ($data->get('message') ?? ''),
                    'lines' => $cart['lines'],
                    'subtotal' => $totals['cart_subtotal'],
                    'discount' => $totals['cart_discount'],
                    'coupon' => $totals['coupon_code'],
                    'total' => '$'.number_format(max(0, (float) $totals['cart_subtotal'] - (float) $totals['cart_discount']), 2, '.', ''),
                ];

                $orders = array_values(session('qb_orders', []));
                array_unshift($orders, $order);
                session([
                    'qb_orders' => array_slice($orders, 0, 40),
                    'qb_last_order' => $orderId,
                ]);
                session()->forget(['qb_cart', 'qb_qty', 'qb_opts', 'qb_coupon']);

                return;
            }

            if ($handle !== 'comment') {
                return;
            }

            // Blog comments → unpublished Comments entries.
            // Form submissions are read-only in the CP; editors publish via Collections → Comments.
            $data = $event->submission->data();
            $name = trim((string) ($data->get('name') ?? 'Comment'));
            $postRef = trim((string) ($data->get('post') ?? ''));
            $message = (string) ($data->get('message') ?? '');

            if ($postRef === '' || $message === '') {
                throw ValidationException::withMessages([
                    'message' => ['Please complete the comment form.'],
                ]);
            }

            $blog = Entry::find($postRef)
                ?? Entry::query()
                    ->where('collection', 'blogs')
                    ->where('slug', $postRef)
                    ->first();

            if (! $blog || $blog->collectionHandle() !== 'blogs') {
                throw ValidationException::withMessages([
                    'post' => ['Comments are only accepted on journal posts.'],
                ]);
            }

            $title = Str::limit($name.' on '.$blog->get('title', $blog->slug()), 100, '');

            Entry::make()
                ->collection('comments')
                ->locale(Site::default()->handle())
                ->published(false)
                ->slug(Str::slug($name.'-'.$blog->slug().'-'.uniqid()))
                ->date(now())
                ->data([
                    'title' => $title,
                    'post' => $blog->id(),
                    'name' => $name,
                    'email' => $data->get('email'),
                    'message' => $message,
                ])
                ->save();
        });

        Route::middleware('web')->group(function () {
            Route::get('/shop/saved', function () {
                return response()->json([
                    'wish' => array_values(session('qb_wish', [])),
                    'cart' => array_values(session('qb_cart', [])),
                ]);
            });

            Route::get('/shop/orders', function () {
                return response()->json([
                    'orders' => array_values(session('qb_orders', [])),
                    'last' => session('qb_last_order'),
                ]);
            });

            Route::post('/shop/saved', function (Request $request) {
                $list = $request->input('list');
                $key = $list === 'wish' ? 'qb_wish' : ($list === 'cart' ? 'qb_cart' : null);
                $id = (string) $request->input('id');
                $entry = Entry::find($id);

                if (! $key || ! $entry || $entry->collectionHandle() !== 'products') {
                    return response()->json(['message' => 'Unknown product'], 422);
                }

                $ids = array_values(session($key, []));
                $present = in_array($id, $ids, true);
                if ($request->input('mode') === 'add') {
                    $added = true;
                    if (! $present) {
                        $ids[] = $id;
                    }
                } else {
                    $added = ! $present;
                    $ids = $added
                        ? array_merge($ids, [$id])
                        : array_values(array_diff($ids, [$id]));
                }
                session([$key => $ids]);

                if ($key === 'qb_cart') {
                    $qtys = session('qb_qty', []);
                    $opts = session('qb_opts', []);
                    if (in_array($id, $ids, true)) {
                        $incomingQty = max(1, min(99, (int) $request->input('qty', 1)));
                        if ($request->input('mode') === 'add' && $present) {
                            $qtys[$id] = max(1, min(99, (int) ($qtys[$id] ?? 1) + $incomingQty));
                        } elseif ($request->input('mode') === 'add') {
                            $qtys[$id] = $incomingQty;
                        } else {
                            $qtys[$id] = max(1, (int) ($qtys[$id] ?? $incomingQty));
                        }
                        $size = trim((string) $request->input('size', ''));
                        $color = trim((string) $request->input('color', ''));
                        if ($size !== '' || $color !== '') {
                            $opts[$id] = array_filter([
                                'size' => $size,
                                'color' => $color,
                            ], fn ($v) => $v !== '');
                        }
                    } else {
                        unset($qtys[$id], $opts[$id]);
                    }
                    session(['qb_qty' => $qtys, 'qb_opts' => $opts]);
                }

                return response()->json([
                    'added' => $added,
                    'wish' => array_values(session('qb_wish', [])),
                    'cart' => array_values(session('qb_cart', [])),
                ]);
            });

            Route::post('/shop/cart/qty', function (Request $request) {
                $id = (string) $request->input('id');
                $ids = array_values(session('qb_cart', []));
                if (! in_array($id, $ids, true)) {
                    return response()->json(['message' => 'Not in cart'], 422);
                }

                $qty = max(1, min(99, (int) $request->input('qty')));
                $qtys = session('qb_qty', []);
                $qtys[$id] = $qty;
                session(['qb_qty' => $qtys]);

                return response()->json(['qty' => $qty]);
            });

            Route::post('/shop/cart/coupon', function (Request $request) {
                $action = (string) $request->input('action', 'apply');
                if ($action === 'remove') {
                    session()->forget('qb_coupon');

                    return response()->json([
                        'ok' => true,
                        'coupon' => null,
                        'totals' => QuikbasketServiceProvider::cartTotalsPayload(),
                    ]);
                }

                $code = strtoupper(trim((string) $request->input('code', '')));
                $coupon = QuikbasketServiceProvider::findCoupon($code);
                if (! $coupon) {
                    return response()->json(['message' => 'That coupon code is not valid.'], 422);
                }

                session(['qb_coupon' => $coupon['code']]);

                return response()->json([
                    'ok' => true,
                    'coupon' => $coupon,
                    'totals' => QuikbasketServiceProvider::cartTotalsPayload(),
                ]);
            });

            Route::statamic('/cart', 'cart', function () {
                $totals = QuikbasketServiceProvider::cartTotalsPayload();
                $shipping = QuikbasketServiceProvider::shippingOptions();

                return array_merge([
                    'title' => 'Cart',
                    'shipping_options' => $shipping,
                ], $totals);
            });
            Route::statamic('/cart/empty', 'cart-empty', ['title' => 'Empty cart']);
            Route::statamic('/checkout', 'checkout', function () {
                $totals = QuikbasketServiceProvider::cartTotalsPayload();

                return array_merge([
                    'title' => 'Checkout',
                ], $totals, QuikbasketServiceProvider::checkoutProfile());
            });
            Route::statamic('/order-received', 'thank-you', function () {
                $id = (string) session('qb_last_order', '');
                $order = collect(session('qb_orders', []))->firstWhere('id', $id);

                return [
                    'title' => 'Inquiry received',
                    'order' => $order,
                    'order_id' => $id,
                ];
            });
            Route::statamic('/order/{id}', 'order-show', function ($id) {
                $order = collect(session('qb_orders', []))->firstWhere('id', (string) $id);
                if (! $order) {
                    abort(404);
                }

                return [
                    'title' => 'Inquiry #'.$id,
                    'order' => $order,
                ];
            });
            Route::get('/order/{id}/invoice', function ($id) {
                $order = collect(session('qb_orders', []))->firstWhere('id', (string) $id);
                if (! $order) {
                    abort(404);
                }

                $pdf = QuikbasketServiceProvider::inquiryInvoicePdf($order);
                $filename = 'inquiry-invoice-'.$id.'.pdf';

                return response($pdf, 200, [
                    'Content-Type' => 'application/pdf',
                    'Content-Disposition' => 'attachment; filename="'.$filename.'"',
                    'Content-Length' => (string) strlen($pdf),
                    'Cache-Control' => 'no-store, private',
                ]);
            });
            Route::statamic('/wishlist', 'wishlist', function () {
                return [
                    'title' => 'Wishlist',
                    'saved_products' => QuikbasketServiceProvider::savedProducts('qb_wish'),
                ];
            });
            Route::statamic('/compare', 'compare', ['title' => 'Compare']);
            Route::statamic('/account', 'account', ['title' => 'Account']);
            Route::statamic('/account/orders', 'orders', ['title' => 'Orders']);
            Route::statamic('/login', 'auth', ['title' => 'Sign in']);
            Route::statamic('/register', 'register', ['title' => 'Sign up']);
            Route::statamic('/forgot-password', 'forgot', ['title' => 'Forgot password']);
            Route::statamic('/reset-password', 'reset', ['title' => 'Reset password']);
        });
    }

    public static function savedProducts(string $key): array
    {
        return collect(session($key, []))
            ->map(function ($id) {
                $entry = Entry::find($id);
                if (! $entry || $entry->collectionHandle() !== 'products') {
                    return null;
                }

                return [
                    'id' => $entry->id(),
                    'title' => $entry->value('title'),
                    'url' => $entry->url(),
                    'price' => number_format((float) $entry->value('price'), 2, '.', ''),
                    'description' => $entry->value('description'),
                    'image' => self::assetPath($entry->value('image') ?? $entry->get('image')),
                ];
            })
            ->filter()
            ->values()
            ->all();
    }

    /**
     * Normalize an assets field to a path/URL string for media-url / img src.
     */
    public static function assetPath(mixed $value): string
    {
        if (is_object($value)) {
            if (method_exists($value, 'path') && $value->path()) {
                return ltrim((string) $value->path(), '/');
            }
            if (method_exists($value, 'url') && $value->url()) {
                return (string) $value->url();
            }
            if (method_exists($value, '__toString')) {
                return (string) $value;
            }
        }

        if (is_array($value)) {
            return self::assetPath($value[0] ?? '');
        }

        return trim((string) $value);
    }

    public static function cartLines(): array
    {
        $qtys = session('qb_qty', []);
        $opts = session('qb_opts', []);
        $total = 0;
        $lines = collect(session('qb_cart', []))
            ->map(function ($id) use ($qtys, $opts, &$total) {
                $entry = Entry::find($id);
                if (! $entry || $entry->collectionHandle() !== 'products') {
                    return null;
                }

                $qty = max(1, (int) ($qtys[$id] ?? 1));
                $price = (float) $entry->value('price');
                $regular = $entry->value('compare_price');
                $regular = $regular !== null && $regular !== '' ? (float) $regular : null;
                $line = $price * $qty;
                $total += $line;
                $choice = is_array($opts[$id] ?? null) ? $opts[$id] : [];
                $size = trim((string) ($choice['size'] ?? ''));
                $color = trim((string) ($choice['color'] ?? ''));
                $parts = array_values(array_filter([$size !== '' ? 'Size '.$size : '', $color !== '' ? 'Color '.$color : '']));
                $title = (string) $entry->value('title');
                if ($parts) {
                    $title .= ' ('.implode(', ', $parts).')';
                }

                return [
                    'id' => $entry->id(),
                    'title' => $title,
                    'url' => $entry->url(),
                    'price' => number_format($price, 2, '.', ''),
                    'compare_price' => $regular !== null && $regular > $price
                        ? number_format($regular, 2, '.', '')
                        : '',
                    'qty' => $qty,
                    'size' => $size,
                    'color' => $color,
                    'line_total' => number_format($line, 2, '.', ''),
                    'image' => self::assetPath($entry->value('image') ?? $entry->get('image')),
                ];
            })
            ->filter()
            ->values()
            ->all();

        return [
            'lines' => $lines,
            'total' => number_format($total, 2, '.', ''),
        ];
    }

    public static function shippingOptions(): array
    {
        $set = GlobalSet::findByHandle('setting');
        $global = $set ? $set->inDefaultSite() : null;
        $rows = $global ? ($global->get('shipping_options') ?? []) : [];

        return collect($rows)
            ->map(function ($row) {
                $label = trim((string) ($row['label'] ?? ''));
                if ($label === '') {
                    return null;
                }

                return [
                    'label' => $label,
                    'price' => number_format((float) ($row['price'] ?? 0), 2, '.', ''),
                ];
            })
            ->filter()
            ->values()
            ->all();
    }

    public static function couponRows(): array
    {
        $set = GlobalSet::findByHandle('setting');
        $global = $set ? $set->inCurrentSite() : null;
        $rows = $global ? ($global->get('coupons') ?? []) : [];

        return collect($rows)
            ->map(function ($row) {
                $code = strtoupper(trim((string) ($row['code'] ?? '')));
                if ($code === '') {
                    return null;
                }
                $discountType = (string) ($row['discount_type'] ?? 'percent');
                if (! in_array($discountType, ['percent', 'fixed'], true)) {
                    $discountType = 'percent';
                }
                $amount = max(0, (float) ($row['amount'] ?? 0));
                $label = trim((string) ($row['label'] ?? ''));
                if ($label === '') {
                    $label = $discountType === 'percent'
                        ? rtrim(rtrim(number_format($amount, 2, '.', ''), '0'), '.').'% off'
                        : '$'.number_format($amount, 2, '.', '').' off';
                }

                return [
                    'code' => $code,
                    'discount_type' => $discountType,
                    'amount' => $amount,
                    'label' => $label,
                ];
            })
            ->filter()
            ->values()
            ->all();
    }

    public static function findCoupon(string $code): ?array
    {
        $code = strtoupper(trim($code));
        if ($code === '') {
            return null;
        }

        return collect(self::couponRows())->firstWhere('code', $code);
    }

    public static function activeCoupon(): ?array
    {
        $code = (string) session('qb_coupon', '');
        if ($code === '') {
            return null;
        }
        $coupon = self::findCoupon($code);
        if (! $coupon) {
            session()->forget('qb_coupon');
        }

        return $coupon;
    }

    public static function couponDiscount(float $subtotal, ?array $coupon = null): float
    {
        $coupon = $coupon ?? self::activeCoupon();
        if (! $coupon || $subtotal <= 0) {
            return 0.0;
        }

        if (($coupon['discount_type'] ?? '') === 'fixed') {
            return min($subtotal, (float) $coupon['amount']);
        }

        $pct = min(100, (float) $coupon['amount']);

        return round($subtotal * ($pct / 100), 2);
    }

    /**
     * Prefill checkout from the signed-in user (admin / shopper) plus Setting contact fallbacks.
     */
    public static function checkoutProfile(): array
    {
        $first = '';
        $last = '';
        $email = '';
        $phone = '';
        $dial = '+1';
        $address = '';
        $city = '';
        $state = '';
        $pincode = '';
        $country = '';

        $user = User::current();
        if ($user) {
            $email = (string) $user->email();
            $first = trim((string) ($user->get('first_name') ?? ''));
            $last = trim((string) ($user->get('last_name') ?? ''));
            $name = trim((string) ($user->get('name') ?? ''));
            if ($first === '' && $name !== '') {
                $parts = preg_split('/\s+/', $name, 2) ?: [];
                $first = (string) ($parts[0] ?? '');
                $last = (string) ($parts[1] ?? '');
            }
            $phone = trim((string) ($user->get('phone') ?? ''));
            $dial = trim((string) ($user->get('phone_dial') ?? '')) ?: '+1';
            $address = trim((string) ($user->get('address') ?? ''));
            $city = trim((string) ($user->get('city') ?? ''));
            $state = trim((string) ($user->get('state') ?? ''));
            $pincode = trim((string) ($user->get('pincode') ?? ''));
            $country = trim((string) ($user->get('country') ?? ''));
        }

        $set = GlobalSet::findByHandle('setting');
        $global = $set ? $set->inCurrentSite() : null;
        if ($global) {
            if ($phone === '') {
                $phone = trim((string) ($global->get('phone') ?? ''));
                if (str_starts_with($phone, '+') && str_contains($phone, ' ')) {
                    [$maybeDial, $rest] = explode(' ', $phone, 2);
                    $dial = $maybeDial ?: $dial;
                    $phone = $rest;
                }
            }
            if ($address === '') {
                $address = trim((string) ($global->get('address') ?? ''));
            }
            if ($email === '' && $user) {
                $email = (string) $user->email();
            }
        }

        // If address is a single Setting line like "120 Market Street, Portland", keep as street;
        // city/state/country may still come from user profile.
        return [
            'checkout_first' => $first,
            'checkout_last' => $last,
            'checkout_email' => $email,
            'checkout_dial' => $dial,
            'checkout_phone' => $phone,
            'checkout_address' => $address,
            'checkout_city' => $city,
            'checkout_state' => $state,
            'checkout_pincode' => $pincode,
            'checkout_country' => $country,
            'checkout_name' => trim($first.' '.$last),
        ];
    }

    public static function cartTotalsPayload(?float $shipping = null): array
    {
        $cart = self::cartLines();
        $subtotal = (float) $cart['total'];
        $coupon = self::activeCoupon();
        $discount = self::couponDiscount($subtotal, $coupon);
        $options = self::shippingOptions();
        if ($shipping === null) {
            $shipping = (float) ($options[0]['price'] ?? 0);
        }
        $total = max(0, $subtotal - $discount) + $shipping;

        return [
            'cart_lines' => $cart['lines'],
            'cart_subtotal' => number_format($subtotal, 2, '.', ''),
            'cart_discount' => number_format($discount, 2, '.', ''),
            'cart_total' => number_format($total, 2, '.', ''),
            'coupon' => $coupon,
            'coupon_code' => $coupon['code'] ?? '',
            'coupon_label' => $coupon['label'] ?? '',
            'coupon_type' => $coupon['discount_type'] ?? '',
            'coupon_amount' => isset($coupon['amount']) ? (float) $coupon['amount'] : 0,
        ];
    }

    /**
     * Branded single-page inquiry invoice PDF (nothing charged). Forced download.
     */
    public static function inquiryInvoicePdf(array $order): string
    {
        $set = GlobalSet::findByHandle('setting');
        $global = $set ? $set->inCurrentSite() : null;
        $site = $global ? (string) ($global->get('site_name') ?? 'Quikbasket') : 'Quikbasket';
        $address = $global ? trim((string) ($global->get('address') ?? '')) : '';
        $email = $global ? trim((string) ($global->get('email') ?? '')) : '';
        $phone = $global ? trim((string) ($global->get('phone') ?? '')) : '';
        $hex = $global ? (string) ($global->get('invoice_color') ?? '#247A4D') : '#247A4D';
        $colors = self::invoiceColorPalette($hex);

        $esc = static function (string $text): string {
            $text = preg_replace('/[^\x20-\x7E]/', '?', $text) ?? $text;

            return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);
        };
        $clip = static function (string $text, int $max): string {
            return mb_substr(trim($text), 0, $max);
        };
        $textAt = static function (float $x, float $y, string $font, float $size, string $text) use ($esc): string {
            return sprintf(
                "BT /%s %.2f Tf %.2f %.2f Td (%s) Tj ET\n",
                $font,
                $size,
                $x,
                $y,
                $esc($text)
            );
        };
        $textRight = static function (float $rightX, float $y, string $font, float $size, string $text) use ($esc): string {
            $w = strlen($text) * $size * 0.5;
            $x = $rightX - $w;

            return sprintf(
                "BT /%s %.2f Tf %.2f %.2f Td (%s) Tj ET\n",
                $font,
                $size,
                $x,
                $y,
                $esc($text)
            );
        };
        $rect = static function (float $x, float $y, float $w, float $h, string $rgb): string {
            [$r, $g, $b] = array_map('floatval', explode(' ', $rgb));

            return sprintf("%.3f %.3f %.3f rg\n%.2f %.2f %.2f %.2f re f\n", $r, $g, $b, $x, $y, $w, $h);
        };
        $strokeRect = static function (float $x, float $y, float $w, float $h, string $rgb = '0.75 0.75 0.78'): string {
            [$r, $g, $b] = array_map('floatval', explode(' ', $rgb));

            return sprintf("%.3f %.3f %.3f RG\n1 w\n%.2f %.2f %.2f %.2f re S\n", $r, $g, $b, $x, $y, $w, $h);
        };
        $hline = static function (float $x1, float $x2, float $y, string $rgb = '0.85 0.85 0.87'): string {
            [$r, $g, $b] = array_map('floatval', explode(' ', $rgb));

            return sprintf("%.3f %.3f %.3f RG\n0.8 w\n%.2f %.2f m %.2f %.2f l S\n", $r, $g, $b, $x1, $y, $x2, $y);
        };

        $margin = 40.0;
        $pageW = 612.0;
        $pageH = 792.0;
        $contentW = $pageW - ($margin * 2);
        $primary = $colors['primary'];
        $primaryDark = $colors['dark'];
        $primarySoft = $colors['soft'];
        $primaryBorder = $colors['border'];
        $rowTint = $colors['row'];
        $muted = '0.42 0.42 0.45';

        $ops = '';

        // Top brand bar
        $ops .= $rect(0, $pageH - 88, $pageW, 88, $primary);
        $ops .= "1 1 1 rg\n";
        $ops .= $textAt($margin, $pageH - 42, 'F2', 22, $site);
        $ops .= $textAt($margin, $pageH - 64, 'F1', 10, 'Inquiry invoice  ·  Nothing was charged');
        $ops .= $textRight($pageW - $margin, $pageH - 38, 'F2', 14, 'INVOICE');
        $ops .= $textRight($pageW - $margin, $pageH - 56, 'F1', 10, '#'.($order['id'] ?? ''));
        $ops .= $textRight($pageW - $margin, $pageH - 70, 'F1', 9, (string) ($order['date'] ?? ''));

        // Accent strip
        $ops .= $rect(0, $pageH - 96, $pageW, 8, $primaryDark);

        // Shop + meta cards
        $cardY = $pageH - 220;
        $cardH = 108;
        $half = ($contentW - 16) / 2;
        $ops .= $rect($margin, $cardY, $half, $cardH, $primarySoft);
        $ops .= $strokeRect($margin, $cardY, $half, $cardH, $primaryBorder);
        $ops .= "0.12 0.12 0.14 rg\n";
        $ops .= $textAt($margin + 14, $cardY + $cardH - 22, 'F2', 10, 'FROM');
        $ops .= $textAt($margin + 14, $cardY + $cardH - 40, 'F2', 12, $clip($site, 36));
        $y = $cardY + $cardH - 56;
        foreach (array_filter([$address, $email, $phone]) as $row) {
            $ops .= $textAt($margin + 14, $y, 'F1', 9, $clip((string) $row, 42));
            $y -= 13;
        }

        $billX = $margin + $half + 16;
        $ops .= $rect($billX, $cardY, $half, $cardH, '0.98 0.98 0.985');
        $ops .= $strokeRect($billX, $cardY, $half, $cardH, '0.85 0.85 0.88');
        $ops .= "0.12 0.12 0.14 rg\n";
        $ops .= $textAt($billX + 14, $cardY + $cardH - 22, 'F2', 10, 'BILL TO');
        $cityLine = trim(
            (string) ($order['city'] ?? '')
            .((($order['state'] ?? '') !== '') ? ', '.$order['state'] : '')
            .' '.($order['pincode'] ?? '')
        );
        $billRows = array_values(array_filter([
            (string) ($order['name'] ?? ''),
            (string) ($order['email'] ?? ''),
            (string) ($order['phone'] ?? ''),
            (string) ($order['address'] ?? ''),
            $cityLine,
            (string) ($order['country'] ?? ''),
        ], static fn ($v) => trim($v) !== ''));
        $y = $cardY + $cardH - 40;
        foreach (array_slice($billRows, 0, 5) as $i => $row) {
            $font = $i === 0 ? 'F2' : 'F1';
            $size = $i === 0 ? 11 : 9;
            $ops .= $textAt($billX + 14, $y, $font, $size, $clip($row, 40));
            $y -= 13;
        }

        // Status chip
        $status = (string) ($order['status'] ?? 'Inquiry received');
        $ops .= $rect($margin, $cardY - 36, 160, 22, $primarySoft);
        [$dr, $dg, $db] = array_map('floatval', explode(' ', $primaryDark));
        $ops .= sprintf("%.3f %.3f %.3f rg\n", $dr, $dg, $db);
        $ops .= $textAt($margin + 10, $cardY - 30, 'F2', 9, $clip('Status: '.$status, 28));

        // Table
        $tableTop = $cardY - 58;
        $rowH = 26.0;
        $colProduct = $margin;
        $colQty = $margin + 360;
        $colAmt = $pageW - $margin;
        $ops .= $rect($margin, $tableTop - $rowH, $contentW, $rowH, $primary);
        $ops .= "1 1 1 rg\n";
        $ops .= $textAt($colProduct + 12, $tableTop - 18, 'F2', 10, 'Product');
        $ops .= $textAt($colQty, $tableTop - 18, 'F2', 10, 'Qty');
        $ops .= $textRight($colAmt - 12, $tableTop - 18, 'F2', 10, 'Amount');

        $y = $tableTop - $rowH;
        $items = array_values($order['lines'] ?? []);
        if ($items === []) {
            $items = [['title' => 'No line items', 'qty' => '-', 'line_total' => '0.00']];
        }
        foreach (array_slice($items, 0, 12) as $i => $line) {
            $y -= $rowH;
            if ($i % 2 === 0) {
                $ops .= $rect($margin, $y, $contentW, $rowH, $rowTint);
            }
            $ops .= $strokeRect($margin, $y, $contentW, $rowH, '0.90 0.90 0.93');
            $ops .= "0.12 0.12 0.14 rg\n";
            $title = (string) ($line['title'] ?? 'Item');
            $qty = (string) ($line['qty'] ?? '1');
            $amt = '$'.ltrim((string) ($line['line_total'] ?? '0.00'), '$');
            $ops .= $textAt($colProduct + 12, $y + 9, 'F1', 10, $clip($title, 48));
            $ops .= $textAt($colQty + 4, $y + 9, 'F1', 10, $clip($qty, 6));
            $ops .= $textRight($colAmt - 12, $y + 9, 'F1', 10, $amt);
        }

        // Totals panel
        $totalBoxW = 210.0;
        $totalBoxX = $pageW - $margin - $totalBoxW;
        $totalBoxY = $y - 78;
        $ops .= $rect($totalBoxX, $totalBoxY, $totalBoxW, 62, $primarySoft);
        $ops .= $strokeRect($totalBoxX, $totalBoxY, $totalBoxW, 62, $primaryBorder);
        $ops .= sprintf("%.3f %.3f %.3f rg\n", $dr, $dg, $db);
        $ops .= $textAt($totalBoxX + 14, $totalBoxY + 38, 'F1', 10, 'Inquiry total');
        $ops .= $textAt($totalBoxX + 14, $totalBoxY + 16, 'F2', 16, $clip((string) ($order['total'] ?? '$0.00'), 16));
        $ops .= $textRight($totalBoxX + $totalBoxW - 14, $totalBoxY + 16, 'F1', 8, 'Not charged');

        // Notes
        $notesY = $totalBoxY - 24;
        if (! empty($order['message'])) {
            $ops .= "0.12 0.12 0.14 rg\n";
            $ops .= $textAt($margin, $notesY, 'F2', 10, 'Notes');
            $ops .= $textAt($margin, $notesY - 16, 'F1', 9, $clip((string) $order['message'], 90));
            $notesY -= 40;
        }

        // Footer
        $ops .= $hline($margin, $pageW - $margin, 64, $primaryBorder);
        [$mr, $mg, $mb] = array_map('floatval', explode(' ', $muted));
        $ops .= sprintf("%.3f %.3f %.3f rg\n", $mr, $mg, $mb);
        $ops .= $textAt($margin, 46, 'F1', 8, $clip($site.' inquiry summary - no payment was taken on this document.', 88));
        $ops .= $textAt($margin, 32, 'F1', 8, $clip(trim($email.($phone !== '' ? '  |  '.$phone : '')), 88));

        // Reset graphics state leftovers
        $content = $ops;

        $objects = [];
        $objects[] = '1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj';
        $objects[] = '2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj';
        $objects[] = '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R /F2 6 0 R >> >> >>endobj';
        $objects[] = '4 0 obj<< /Length '.strlen($content).' >>stream'."\n".$content."\n".'endstream endobj';
        $objects[] = '5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj';
        $objects[] = '6 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>endobj';

        $pdf = "%PDF-1.4\n";
        $offsets = [0];
        foreach ($objects as $object) {
            $offsets[] = strlen($pdf);
            $pdf .= $object."\n";
        }
        $xref = strlen($pdf);
        $pdf .= 'xref'."\n".'0 '.(count($offsets))."\n";
        $pdf .= "0000000000 65535 f \n";
        for ($i = 1; $i < count($offsets); $i++) {
            $pdf .= sprintf("%010d 00000 n \n", $offsets[$i]);
        }
        $pdf .= 'trailer<< /Size '.count($offsets).' /Root 1 0 R >>'."\n";
        $pdf .= 'startxref'."\n".$xref."\n%%EOF";

        return $pdf;
    }

    /**
     * Build PDF RGB strings from a Setting hex color.
     *
     * @return array{primary: string, dark: string, soft: string, border: string, row: string}
     */
    public static function invoiceColorPalette(string $hex): array
    {
        $hex = ltrim(trim($hex), '#');
        if (! preg_match('/^[0-9A-Fa-f]{6}$/', $hex)) {
            $hex = '247A4D';
        }

        $r = hexdec(substr($hex, 0, 2)) / 255;
        $g = hexdec(substr($hex, 2, 2)) / 255;
        $b = hexdec(substr($hex, 4, 2)) / 255;

        $mix = static function (float $c, float $toward, float $amount): float {
            return max(0, min(1, $c + ($toward - $c) * $amount));
        };

        $fmt = static function (float $r, float $g, float $b): string {
            return sprintf('%.3f %.3f %.3f', $r, $g, $b);
        };

        return [
            'primary' => $fmt($r, $g, $b),
            'dark' => $fmt($mix($r, 0, 0.28), $mix($g, 0, 0.28), $mix($b, 0, 0.28)),
            'soft' => $fmt($mix($r, 1, 0.88), $mix($g, 1, 0.88), $mix($b, 1, 0.88)),
            'border' => $fmt($mix($r, 1, 0.55), $mix($g, 1, 0.55), $mix($b, 1, 0.55)),
            'row' => $fmt($mix($r, 1, 0.92), $mix($g, 1, 0.92), $mix($b, 1, 0.92)),
        ];
    }
}
