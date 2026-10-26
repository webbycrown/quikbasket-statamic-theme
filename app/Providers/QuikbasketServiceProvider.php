<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Statamic\Events\FormSubmitted;
use Statamic\Facades\Entry;
use Statamic\Facades\GlobalSet;

class QuikbasketServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        Event::listen(FormSubmitted::class, function (FormSubmitted $event) {
            if ($event->submission->form()->handle() !== 'inquiry') {
                return;
            }

            if ((string) $event->submission->get('clear_cart') !== '1') {
                return;
            }

            session()->forget(['qb_cart', 'qb_qty']);
        });

        Route::middleware('web')->group(function () {
            Route::get('/shop/saved', function () {
                return response()->json([
                    'wish' => array_values(session('qb_wish', [])),
                    'cart' => array_values(session('qb_cart', [])),
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
                    if (in_array($id, $ids, true)) {
                        $qtys[$id] = max(1, (int) ($qtys[$id] ?? 1));
                    } else {
                        unset($qtys[$id]);
                    }
                    session(['qb_qty' => $qtys]);
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

            Route::statamic('/cart', 'cart', function () {
                $cart = QuikbasketServiceProvider::cartLines();
                $shipping = QuikbasketServiceProvider::shippingOptions();
                $ship = (float) ($shipping[0]['price'] ?? 0);

                return [
                    'title' => 'Cart',
                    'cart_lines' => $cart['lines'],
                    'cart_subtotal' => $cart['total'],
                    'cart_total' => number_format((float) $cart['total'] + $ship, 2, '.', ''),
                    'shipping_options' => $shipping,
                ];
            });
            Route::statamic('/cart/empty', 'cart-empty', ['title' => 'Empty cart']);
            Route::statamic('/checkout', 'checkout', ['title' => 'Checkout']);
            Route::statamic('/order-received', 'thank-you', ['title' => 'Inquiry received']);
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
                    'image' => $entry->value('image'),
                ];
            })
            ->filter()
            ->values()
            ->all();
    }

    public static function cartLines(): array
    {
        $qtys = session('qb_qty', []);
        $total = 0;
        $lines = collect(session('qb_cart', []))
            ->map(function ($id) use ($qtys, &$total) {
                $entry = Entry::find($id);
                if (! $entry || $entry->collectionHandle() !== 'products') {
                    return null;
                }

                $qty = max(1, (int) ($qtys[$id] ?? 1));
                $price = (float) $entry->value('price');
                $line = $price * $qty;
                $total += $line;

                return [
                    'id' => $entry->id(),
                    'title' => $entry->value('title'),
                    'url' => $entry->url(),
                    'price' => number_format($price, 2, '.', ''),
                    'qty' => $qty,
                    'line_total' => number_format($line, 2, '.', ''),
                    'image' => $entry->value('image'),
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
}
