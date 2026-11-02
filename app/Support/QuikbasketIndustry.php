<?php

namespace App\Support;

use Illuminate\Support\Facades\File;
use Statamic\Facades\Stache;
use Statamic\Facades\YAML;

class QuikbasketIndustry
{
    public const SLUGS = [
        'fashion',
        'menswear',
        'womenswear',
        'kids',
        'streetwear',
        'jewellery',
        'beauty',
        'accessories',
        'homeware',
    ];

    /** Primary / soft / dark hex per catalogue so each demo reads a different brand colour. */
    public const THEME_COLORS = [
        'fashion' => ['#247A4D', '#EBF4F1', '#1B5E3B'],
        'menswear' => ['#1B4F72', '#E8F1F8', '#143B56'],
        'womenswear' => ['#9D174D', '#FCE8F0', '#7A123C'],
        'kids' => ['#EA580C', '#FFF1E6', '#C2410C'],
        'streetwear' => ['#DC2626', '#FEE2E2', '#B91C1C'],
        'jewellery' => ['#B45309', '#FEF3C7', '#92400E'],
        'beauty' => ['#BE185D', '#FCE7F3', '#9D174D'],
        'accessories' => ['#0369A1', '#E0F2FE', '#075985'],
        'homeware' => ['#0F766E', '#CCFBF1', '#115E59'],
    ];

    private const NAV = [
        'fashion' => [
            'nav_new' => 'New Arrivals',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Clothing',
            'nav_line1' => 'Tops & Sweaters',
            'nav_line2' => 'Pants & Jeans',
            'nav_line3' => 'Outwear',
            'nav_line4' => 'Shoes & Bags',
        ],
        'menswear' => [
            'nav_new' => 'New Arrivals',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Menswear',
            'nav_line1' => 'Shirts & Knits',
            'nav_line2' => 'Denim',
            'nav_line3' => 'Outerwear',
            'nav_line4' => 'Footwear',
        ],
        'womenswear' => [
            'nav_new' => 'New Arrivals',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Womenswear',
            'nav_line1' => 'Dresses',
            'nav_line2' => 'Tops & Knits',
            'nav_line3' => 'Outerwear',
            'nav_line4' => 'Shoes',
        ],
        'kids' => [
            'nav_new' => 'New Arrivals',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Kids wear',
            'nav_line1' => 'Tees & Tops',
            'nav_line2' => 'Sets',
            'nav_line3' => 'Outerwear',
            'nav_line4' => 'Shoes',
        ],
        'streetwear' => [
            'nav_new' => 'New Drops',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Streetwear',
            'nav_line1' => 'Graphics',
            'nav_line2' => 'Denim & Cargos',
            'nav_line3' => 'Hoodies',
            'nav_line4' => 'Trainers',
        ],
        'jewellery' => [
            'nav_new' => 'New Pieces',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Fine jewellery',
            'nav_line1' => 'Necklaces',
            'nav_line2' => 'Rings & Bands',
            'nav_line3' => 'Earrings',
            'nav_line4' => 'Bracelets',
        ],
        'beauty' => [
            'nav_new' => 'New Arrivals',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Beauty',
            'nav_line1' => 'Face',
            'nav_line2' => 'Lips & Colour',
            'nav_line3' => 'Body',
            'nav_line4' => 'Tools',
        ],
        'accessories' => [
            'nav_new' => 'New Arrivals',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Accessories',
            'nav_line1' => 'Bags',
            'nav_line2' => 'Sunglasses',
            'nav_line3' => 'Belts',
            'nav_line4' => 'Scarves',
        ],
        'homeware' => [
            'nav_new' => 'New Arrivals',
            'nav_best' => 'Best-Sellers',
            'nav_group' => 'Homeware',
            'nav_line1' => 'Table',
            'nav_line2' => 'Linen',
            'nav_line3' => 'Light',
            'nav_line4' => 'Storage',
        ],
    ];

    private const CATEGORIES = [
        'fashion' => [
            'tops' => ['title' => 'Tops', 'image' => 'image/categories-1.webp'],
            'dresses' => ['title' => 'Dresses', 'image' => 'image/categories-2.webp'],
            'jeans' => ['title' => 'Jeans', 'image' => 'image/categories-3.webp'],
            'outerwear' => ['title' => 'Outerwear', 'image' => 'image/categories-4.webp'],
            'accessories' => ['title' => 'Accessories', 'image' => 'image/accessories.webp'],
        ],
        'menswear' => [
            'tops' => ['title' => 'Shirts', 'image' => 'image/menswear-01.webp'],
            'dresses' => ['title' => 'Knits', 'image' => 'image/menswear-02.webp'],
            'jeans' => ['title' => 'Denim', 'image' => 'image/menswear-03.webp'],
            'outerwear' => ['title' => 'Coats', 'image' => 'image/menswear-04.webp'],
            'accessories' => ['title' => 'Extras', 'image' => 'image/menswear-05.webp'],
        ],
        'womenswear' => [
            'tops' => ['title' => 'Tops', 'image' => 'image/womenswear-01.webp'],
            'dresses' => ['title' => 'Dresses', 'image' => 'image/womenswear-02.webp'],
            'jeans' => ['title' => 'Bottoms', 'image' => 'image/womenswear-03.webp'],
            'outerwear' => ['title' => 'Layers', 'image' => 'image/womenswear-04.webp'],
            'accessories' => ['title' => 'Extras', 'image' => 'image/womenswear-05.webp'],
        ],
        'kids' => [
            'tops' => ['title' => 'Tees', 'image' => 'image/kids-01.webp'],
            'dresses' => ['title' => 'Dresses', 'image' => 'image/kids-02.webp'],
            'jeans' => ['title' => 'Sets', 'image' => 'image/kids-03.webp'],
            'outerwear' => ['title' => 'Outer', 'image' => 'image/kids-04.webp'],
            'accessories' => ['title' => 'Shoes', 'image' => 'image/kids-05.webp'],
        ],
        'streetwear' => [
            'tops' => ['title' => 'Graphics', 'image' => 'image/streetwear-01.webp'],
            'dresses' => ['title' => 'Hoodies', 'image' => 'image/streetwear-02.webp'],
            'jeans' => ['title' => 'Denim', 'image' => 'image/streetwear-03.webp'],
            'outerwear' => ['title' => 'Layers', 'image' => 'image/streetwear-04.webp'],
            'accessories' => ['title' => 'Trainers', 'image' => 'image/streetwear-05.webp'],
        ],
        'jewellery' => [
            'tops' => ['title' => 'Necklaces', 'image' => 'image/jewellery-01.webp'],
            'dresses' => ['title' => 'Rings', 'image' => 'image/jewellery-02.webp'],
            'jeans' => ['title' => 'Bracelets', 'image' => 'image/jewellery-03.webp'],
            'outerwear' => ['title' => 'Earrings', 'image' => 'image/jewellery-04.webp'],
            'accessories' => ['title' => 'Sets', 'image' => 'image/jewellery-05.webp'],
        ],
        'beauty' => [
            'tops' => ['title' => 'Face', 'image' => 'image/beauty-01.webp'],
            'dresses' => ['title' => 'Lips', 'image' => 'image/beauty-02.webp'],
            'jeans' => ['title' => 'Eyes', 'image' => 'image/beauty-03.webp'],
            'outerwear' => ['title' => 'Body', 'image' => 'image/beauty-04.webp'],
            'accessories' => ['title' => 'Tools', 'image' => 'image/beauty-05.webp'],
        ],
        'accessories' => [
            'tops' => ['title' => 'Bags', 'image' => 'image/accessories-01.webp'],
            'dresses' => ['title' => 'Sunglasses', 'image' => 'image/accessories-02.webp'],
            'jeans' => ['title' => 'Belts', 'image' => 'image/accessories-03.webp'],
            'outerwear' => ['title' => 'Scarves', 'image' => 'image/accessories-04.webp'],
            'accessories' => ['title' => 'Small leather', 'image' => 'image/accessories-05.webp'],
        ],
        'homeware' => [
            'tops' => ['title' => 'Table', 'image' => 'image/homeware-01.webp'],
            'dresses' => ['title' => 'Linen', 'image' => 'image/homeware-02.webp'],
            'jeans' => ['title' => 'Light', 'image' => 'image/homeware-03.webp'],
            'outerwear' => ['title' => 'Storage', 'image' => 'image/homeware-04.webp'],
            'accessories' => ['title' => 'Decor', 'image' => 'image/homeware-05.webp'],
        ],
    ];

    public static function apply(string $industry): bool
    {
        $industry = strtolower($industry);
        if (! in_array($industry, self::SLUGS, true)) {
            return false;
        }

        $pack = base_path('content/industries/'.$industry);
        if (! is_dir($pack)) {
            return false;
        }

        $meta = YAML::file($pack.'/setting.yaml')->parse() ?? [];

        $productDir = base_path('content/collections/products');
        File::ensureDirectoryExists($productDir);
        foreach (File::files($productDir) as $file) {
            if ($file->getExtension() === 'md') {
                File::delete($file->getPathname());
            }
        }
        foreach (File::files($pack.'/products') as $file) {
            File::copy($file->getPathname(), $productDir.'/'.$file->getFilename());
        }

        $blogsSrc = $pack.'/blogs';
        if (is_dir($blogsSrc)) {
            $blogDir = base_path('content/collections/blogs');
            File::ensureDirectoryExists($blogDir);
            foreach (File::files($blogDir) as $file) {
                if ($file->getExtension() === 'md') {
                    File::delete($file->getPathname());
                }
            }
            foreach (File::files($blogsSrc) as $file) {
                File::copy($file->getPathname(), $blogDir.'/'.$file->getFilename());
            }
        }

        $configPath = base_path('content/globals/setting.yaml');
        $variablesPath = base_path('content/globals/default/setting.yaml');
        File::ensureDirectoryExists(dirname($variablesPath));

        $config = YAML::file($configPath)->parse() ?? [];
        if (! empty($config['data']) && is_array($config['data'])) {
            $data = $config['data'];
        } else {
            $data = YAML::file($variablesPath)->parse() ?? [];
        }

        $data['industry'] = $industry;
        $data['industry_label'] = $meta['industry_label'] ?? ucfirst($industry).' shop';
        if (! empty($meta['seo_description'])) {
            $data['seo_description'] = $meta['seo_description'];
        }

        $colors = self::THEME_COLORS[$industry] ?? self::THEME_COLORS['fashion'];
        $data['theme_color'] = $meta['theme_color'] ?? $colors[0];
        $data['theme_color_soft'] = $meta['theme_color_soft'] ?? $colors[1];
        $data['theme_color_dark'] = $meta['theme_color_dark'] ?? $colors[2];
        $data['invoice_color'] = $data['theme_color'];

        foreach (self::NAV[$industry] ?? self::NAV['fashion'] as $key => $value) {
            $data[$key] = $value;
        }

        self::applyLogos($industry, $data);

        $config['title'] = $config['title'] ?? 'Setting';
        $config['data'] = $data;
        File::put($configPath, YAML::dump($config));
        File::put($variablesPath, YAML::dump($data));

        self::applyCategories($industry);
        self::applyHomeCopy($meta, $industry);
        self::applyThemeAssets($industry);
        // About page last so dedicated slot photos are not overwritten by the bulk remap.
        self::applyAboutPage($meta, $industry);

        if (class_exists(Stache::class)) {
            try {
                Stache::refresh();
            } catch (\Throwable $e) {
                // Catalogue files are already written.
            }
        }

        return true;
    }

    /**
     * Write catalogue wordmark SVGs and point Setting logo fields at them so
     * header/footer (all home layouts) show a niche-specific mark.
     */
    private static function applyLogos(string $industry, array &$data): void
    {
        $word = match ($industry) {
            'jewellery' => 'Jewellery',
            'beauty' => 'Beauty',
            'accessories' => 'Accessories',
            'homeware' => 'Homeware',
            'menswear' => 'Menswear',
            'womenswear' => 'Womenswear',
            'kids' => 'Kids',
            'streetwear' => 'Streetwear',
            default => 'Fashion',
        };

        $siteName = 'Quikbasket '.$word;
        $data['site_name'] = $siteName;
        $data['copyright'] = '© Copyright 2024 '.$siteName.'. All rights reserved.';

        $imageDir = public_path('assets/image');
        File::ensureDirectoryExists($imageDir);

        $black = self::logoSvg($word, '#111111');
        $white = self::logoSvg($word, '#ffffff');
        $blackPath = 'image/'.$industry.'-logo.svg';
        $whitePath = 'image/'.$industry.'-logo-white.svg';

        File::put($imageDir.DIRECTORY_SEPARATOR.$industry.'-logo.svg', $black);
        File::put($imageDir.DIRECTORY_SEPARATOR.$industry.'-logo-white.svg', $white);
        @chmod($imageDir.DIRECTORY_SEPARATOR.$industry.'-logo.svg', 0644);
        @chmod($imageDir.DIRECTORY_SEPARATOR.$industry.'-logo-white.svg', 0644);

        // Keep classic filenames in sync so hard-coded fallbacks stay on-niche.
        File::put($imageDir.DIRECTORY_SEPARATOR.'main-logo.svg', $black);
        File::put($imageDir.DIRECTORY_SEPARATOR.'main-white-logo.svg', $white);
        @chmod($imageDir.DIRECTORY_SEPARATOR.'main-logo.svg', 0644);
        @chmod($imageDir.DIRECTORY_SEPARATOR.'main-white-logo.svg', 0644);

        $data['logo'] = $blackPath;
        $data['logo_white'] = $whitePath;
        $data['footer_logo'] = $whitePath;
    }

    private static function logoSvg(string $niche, string $fill): string
    {
        $nicheUpper = htmlspecialchars(strtoupper($niche), ENT_QUOTES | ENT_XML1);
        $fill = htmlspecialchars($fill, ENT_QUOTES | ENT_XML1);

        return <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="260" height="40" viewBox="0 0 260 40" role="img" aria-label="Quikbasket {$nicheUpper}">
  <text x="130" y="17" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="0.14em" fill="{$fill}">QUIKBASKET</text>
  <text x="130" y="33" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Arial, sans-serif" font-size="10" font-weight="600" letter-spacing="0.32em" fill="{$fill}">{$nicheUpper}</text>
</svg>

SVG;
    }

    private static function applyCategories(string $industry): void
    {
        $map = self::CATEGORIES[$industry] ?? self::CATEGORIES['fashion'];
        $dir = base_path('content/taxonomies/categories');
        if (! is_dir($dir)) {
            return;
        }

        foreach ($map as $slug => $meta) {
            $path = $dir.'/'.$slug.'.yaml';
            if (! File::exists($path)) {
                continue;
            }
            $term = YAML::file($path)->parse() ?? [];
            $term['title'] = $meta['title'];
            if (! empty($meta['image'])) {
                $term['image'] = $meta['image'];
            }
            File::put($path, YAML::dump($term));
        }
    }

    /**
     * Overwrite every shared theme raster (all pages: home 1–7, shop, about, blog,
     * footer tiles, mega-menu, popups) with this catalogue's clear niche photo pool.
     */
    private static function applyThemeAssets(string $industry): void
    {
        if ($industry === 'fashion') {
            return;
        }

        $imageDir = public_path('assets/image');
        if (! is_dir($imageDir)) {
            return;
        }

        $prefix = preg_quote($industry, '/');
        $pool = [];
        foreach (File::files($imageDir) as $file) {
            $name = $file->getFilename();
            if (! preg_match('/\.(webp|jpg|jpeg|png)$/i', $name)) {
                continue;
            }
            // Dedicated clear assets + numbered product shots + expanded pools.
            if (preg_match('/^'.$prefix.'-(hero|about-1|about-2|about-slot-\w+|video)\./i', $name)
                || preg_match('/^'.$prefix.'-\d+\./i', $name)
                || preg_match('/^'.$prefix.'-pool-\d+\./i', $name)) {
                $pool[] = $file->getPathname();
            }
        }
        sort($pool, SORT_NATURAL | SORT_FLAG_CASE);
        if ($pool === []) {
            return;
        }

        $protect = '/^(main-logo|footer-logo|favicon|logo|call-|mail-|Delivery|Support|Price|warranty|truck|return|money|lifetime|market|shipping|24-7|calling|delievery|price-tag|[a-z]+-logo)/i';
        $i = 0;
        foreach (File::files($imageDir) as $file) {
            $name = $file->getFilename();
            if (! preg_match('/\.(webp|jpg|jpeg|png)$/i', $name)) {
                continue;
            }
            if (preg_match($protect, $name)) {
                continue;
            }
            // Never overwrite this catalogue's own source pool files.
            if (preg_match('/^'.$prefix.'-(hero|about-1|about-2|about-slot-\w+|video)\./i', $name)
                || preg_match('/^'.$prefix.'-\d+\./i', $name)
                || preg_match('/^'.$prefix.'-pool-\d+\./i', $name)
                || preg_match('/^'.$prefix.'\.(webp|jpg|jpeg|png)$/i', $name)) {
                continue;
            }
            // Leave other catalogues' dedicated files alone if present.
            if (preg_match('/^(fashion|menswear|womenswear|kids|streetwear|jewellery|beauty|accessories|homeware)-(hero|about-1|about-2|about-slot-\w+|video|pool-\d+|\d+)\./i', $name)) {
                continue;
            }

            self::copyAsThemeAsset($pool[$i % count($pool)], $file->getPathname());
            $i++;
        }

        // Web/PHP-FPM must be able to read rewritten assets.
        @chmod($imageDir, 0755);
        foreach (File::files($imageDir) as $file) {
            @chmod($file->getPathname(), 0644);
        }
    }

    /**
     * Copy a pool photo into a theme asset path, converting JPEG↔WebP when the
     * destination extension differs so browsers get a matching Content-Type.
     */
    private static function copyAsThemeAsset(string $source, string $dest): void
    {
        $srcExt = strtolower(pathinfo($source, PATHINFO_EXTENSION));
        $dstExt = strtolower(pathinfo($dest, PATHINFO_EXTENSION));

        if ($srcExt === $dstExt || ! function_exists('imagecreatefromstring')) {
            File::copy($source, $dest);

            return;
        }

        $binary = File::get($source);
        $image = @imagecreatefromstring($binary);
        if ($image === false) {
            File::copy($source, $dest);

            return;
        }

        if (function_exists('imagepalettetotruecolor')) {
            @imagepalettetotruecolor($image);
        }
        if (function_exists('imagealphablending')) {
            imagealphablending($image, true);
            imagesavealpha($image, true);
        }

        $ok = false;
        if (in_array($dstExt, ['jpg', 'jpeg'], true)) {
            $ok = imagejpeg($image, $dest, 88);
        } elseif ($dstExt === 'webp' && function_exists('imagewebp')) {
            $ok = imagewebp($image, $dest, 88);
        } elseif ($dstExt === 'png') {
            $ok = imagepng($image, $dest, 6);
        }

        imagedestroy($image);

        if (! $ok) {
            File::copy($source, $dest);
        }
    }

    private static function applyHomeCopy(array $meta, string $industry): void
    {
        $homePath = base_path('content/collections/pages/home.md');
        if (! File::exists($homePath)) {
            return;
        }

        $home = File::get($homePath);
        if (! preg_match('/type: home_hero\n/', $home)) {
            return;
        }

        $label = (string) ($meta['industry_label'] ?? ucfirst($industry).' shop');
        $word = match ($industry) {
            'jewellery' => 'Jewellery',
            'beauty' => 'Beauty',
            'accessories' => 'Accessories',
            'homeware' => 'Homeware',
            'menswear' => 'Menswear',
            'womenswear' => 'Womenswear',
            'kids' => 'Kids',
            'streetwear' => 'Streetwear',
            default => 'Fashion',
        };

        if (! empty($meta['hero_eyebrow'])) {
            $home = preg_replace(
                '/(type: home_hero\n(?:.*\n)*?    eyebrow: ).*/m',
                '$1'.self::quote((string) $meta['hero_eyebrow']),
                $home,
                1
            );
        }
        if (! empty($meta['hero_heading'])) {
            $home = preg_replace(
                '/(type: home_hero\n(?:.*\n)*?    heading: ).*/m',
                '$1'.self::quote((string) $meta['hero_heading']),
                $home,
                1
            );
        }
        if (! empty($meta['hero_text'])) {
            $home = preg_replace(
                '/(type: home_hero\n(?:.*\n)*?    text: ).*/m',
                '$1'.self::quote((string) $meta['hero_text']),
                $home,
                1
            );
        }
        if (! empty($meta['hero_image'])) {
            $home = preg_replace(
                '/(type: home_hero\n(?:.*\n)*?    image: ).*/m',
                '$1'.(string) $meta['hero_image'],
                $home,
                1
            );
        }
        if (! empty($meta['about_heading'])) {
            $home = preg_replace(
                '/(type: about_intro\n(?:.*\n)*?    heading: ).*/m',
                '$1'.self::quote((string) $meta['about_heading']),
                $home,
                1
            );
        }

        $aboutOne = $meta['about_image'] ?? ('image/'.$industry.'-about-1.jpg');
        $aboutTwo = $meta['about_image_two'] ?? ('image/'.$industry.'-about-2.jpg');
        if ($industry !== 'fashion') {
            $home = preg_replace(
                '/(type: about_intro\n(?:.*\n)*?    image: ).*/m',
                '$1'.$aboutOne,
                $home,
                1
            );
            $home = preg_replace(
                '/(type: about_intro\n(?:.*\n)*?    image_two: ).*/m',
                '$1'.$aboutTwo,
                $home,
                1
            );
        }

        $home = preg_replace(
            '/(type: category_slider\n(?:.*\n)*?    heading: ).*/m',
            '$1'.self::quote('Explore Our '.$word.' Categories'),
            $home,
            1
        );
        $home = preg_replace(
            '/(type: about_intro\n(?:.*\n)*?    text: ).*/m',
            '$1'.self::quote(
                $word.' is shown here as a demo catalogue. Photos and product titles match this niche so the theme sections read as one shop — inquiry only, nothing is charged.'
            ),
            $home,
            1
        );
        $home = preg_replace(
            '/(type: video_feature\n(?:.*\n)*?    heading: ).*/m',
            '$1'.self::quote($word.' in Focus: Exclusive Video Series'),
            $home,
            1
        );
        $home = preg_replace(
            '/(type: video_feature\n(?:.*\n)*?    text: ).*/m',
            '$1'.self::quote(
                'A short '.$word.' film strip for the demo. The still and copy stay on-niche with the rest of this catalogue. Send an inquiry — nothing is charged.'
            ),
            $home,
            1
        );
        if ($industry !== 'fashion') {
            $videoImage = $meta['video_image'] ?? ('image/'.$industry.'-video.jpg');
            $home = preg_replace(
                '/(type: video_feature\n(?:.*\n)*?    image: ).*/m',
                '$1'.$videoImage,
                $home,
                1
            );
        }
        $home = preg_replace(
            '/(type: sale_banner\n(?:.*\n)*?    heading: ).*/m',
            '$1'.self::quote($word.' Sale Edit'),
            $home,
            1
        );

        unset($label);
        File::put($homePath, $home);
    }

    private static function applyAboutPage(array $meta, string $industry): void
    {
        $aboutPath = base_path('content/collections/pages/about.md');
        if (! File::exists($aboutPath) || $industry === 'fashion') {
            return;
        }

        $word = match ($industry) {
            'jewellery' => 'Jewellery',
            'beauty' => 'Beauty',
            'accessories' => 'Accessories',
            'homeware' => 'Homeware',
            'menswear' => 'Menswear',
            'womenswear' => 'Womenswear',
            'kids' => 'Kids',
            'streetwear' => 'Streetwear',
            default => 'Fashion',
        };
        $label = (string) ($meta['industry_label'] ?? $word.' shop');

        $about = File::get($aboutPath);

        $about = preg_replace(
            '/(type: about_story\n(?:.*\n)*?    quote: ).*/m',
            '$1'.self::quote('Clear pieces, honest materials — '.$label.' made for everyday wear.'),
            $about,
            1
        );
        $about = preg_replace(
            '/(type: about_story\n(?:.*\n)*?    image: ).*/m',
            '$1image/'.$industry.'-about-slot-1.jpg',
            $about,
            1
        );
        $about = preg_replace(
            '/(type: about_story\n(?:.*\n)*?    image_two: ).*/m',
            '$1image/'.$industry.'-about-slot-2.jpg',
            $about,
            1
        );
        $about = preg_replace(
            '/(type: about_story\n(?:.*\n)*?    image_three: ).*/m',
            '$1image/'.$industry.'-about-slot-3.jpg',
            $about,
            1
        );

        $body = "Welcome to Quikbasket {$label}. This demo catalogue keeps the same shop layout while showing {$word} photos and product titles.\n\nBrowse the collection and send an inquiry from the contact page. Nothing is charged.";
        $about = preg_replace(
            '/(type: about_story\n(?:.*\n)*?    body: \|\n)(?:      .*\n)+/',
            '$1      '.str_replace("\n", "\n      ", trim($body))."\n\n",
            $about,
            1
        );

        $about = preg_replace(
            '/(type: about_why\n(?:.*\n)*?    text: ).*/m',
            '$1'.self::quote('A curated '.$word.' edit with clear photos, quality materials, and inquiry-only checkout.'),
            $about,
            1
        );
        $about = preg_replace(
            '/(type: about_why\n(?:.*\n)*?    image: ).*/m',
            '$1image/'.$industry.'-about-slot-choose.jpg',
            $about,
            1
        );
        $about = preg_replace(
            '/(title: \'Sustainable Fashion\'\n\s+line: ).*/m',
            '$1'.self::quote($word.' choices made with care.'),
            $about,
            1
        );
        $about = preg_replace(
            "/title: 'Sustainable Fashion'/",
            "title: 'Responsible ".$word."'",
            $about,
            1
        );

        $about = preg_replace(
            '/(type: video_feature\n(?:.*\n)*?    heading: ).*/m',
            '$1'.self::quote('See the '.$word.' edit up close.'),
            $about,
            1
        );
        $about = preg_replace(
            '/(id: about-video\n(?:.*\n)*?    image: ).*/m',
            '$1image/'.$industry.'-about-slot-video.jpg',
            $about,
            1
        );

        // Team photos → clear niche product shots.
        foreach ([
            'image/season-collection-1.webp' => 'image/'.$industry.'-01.webp',
            'image/our-team-1.webp' => 'image/'.$industry.'-02.webp',
            'image/best-seller-8.webp' => 'image/'.$industry.'-03.webp',
            'image/best-seller-9.webp' => 'image/'.$industry.'-04.webp',
            'image/our-team-2.webp' => 'image/'.$industry.'-05.webp',
        ] as $from => $to) {
            $about = str_replace($from, $to, $about);
        }

        // Also paint the classic about filenames so any leftover refs stay on-niche.
        $imageDir = public_path('assets/image');
        $slotCopies = [
            'about us-1.webp' => $industry.'-about-slot-1.jpg',
            'about us-2.webp' => $industry.'-about-slot-2.jpg',
            'about us-3.webp' => $industry.'-about-slot-3.jpg',
            'about us choose.webp' => $industry.'-about-slot-choose.jpg',
            'about us video.webp' => $industry.'-about-slot-video.jpg',
        ];
        foreach ($slotCopies as $destName => $srcName) {
            $src = $imageDir.DIRECTORY_SEPARATOR.$srcName;
            $dest = $imageDir.DIRECTORY_SEPARATOR.$destName;
            if (is_file($src) && is_file($dest)) {
                self::copyAsThemeAsset($src, $dest);
            } elseif (is_file($src)) {
                self::copyAsThemeAsset($src, $dest);
            }
        }

        File::put($aboutPath, $about);
    }

    private static function quote(string $value): string
    {
        return '"'.str_replace(['\\', '"'], ['\\\\', '\\"'], $value).'"';
    }
}
