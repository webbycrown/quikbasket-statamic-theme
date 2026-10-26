<?php

namespace App\Tags;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Statamic\Facades\GlobalSet;
use Statamic\Tags\Tags;

class InstagramReels extends Tags
{
    public static $handle = 'instagram_reels';

    public function index()
    {
        [$token, $userId] = $this->credentials();

        if ($token === '') {
            return [];
        }

        $key = 'qb.instagram.reels.'.sha1($token.'|'.$userId);
        $cached = Cache::get($key);

        if (is_array($cached)) {
            return $cached;
        }

        $reels = $this->fetch($token, $userId);
        Cache::put($key, $reels, $reels === [] ? 120 : 1800);

        return $reels;
    }

    private function credentials(): array
    {
        $token = '';
        $userId = '';

        try {
            $data = GlobalSet::findByHandle('setting')?->inDefaultSite();
            $token = trim((string) $data?->get('instagram_token'));
            $userId = trim((string) $data?->get('instagram_user_id'));
        } catch (\Throwable $e) {
            $token = '';
            $userId = '';
        }

        if ($token === '') {
            $token = trim((string) config('quikbasket.instagram_token'));
        }

        if ($userId === '') {
            $userId = trim((string) config('quikbasket.instagram_user_id'));
        }

        return [$token, $userId];
    }

    private function fetch(string $token, string $userId): array
    {
        try {
            $endpoint = preg_match('/^\d+$/', $userId)
                ? 'https://graph.facebook.com/v23.0/'.$userId.'/media'
                : 'https://graph.instagram.com/me/media';

            $response = Http::timeout(8)->acceptJson()->get($endpoint, [
                'fields' => 'id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink',
                'limit' => 18,
                'access_token' => $token,
            ]);

            if (! $response->ok()) {
                return [];
            }

            $items = collect($response->json('data') ?? []);
            $reels = $items->filter(fn ($item) => ($item['media_product_type'] ?? '') === 'REELS');
            $chosen = $reels->isNotEmpty()
                ? $reels
                : $items->filter(fn ($item) => ($item['media_type'] ?? '') === 'VIDEO');

            return $chosen
                ->map(function ($item) {
                    $permalink = $this->https($item['permalink'] ?? '');

                    if (! str_contains($permalink, '://www.instagram.com/')) {
                        return null;
                    }

                    $video = $this->https($item['media_url'] ?? '');
                    $poster = $this->https($item['thumbnail_url'] ?? '');

                    if ($video === '' && $poster === '') {
                        return null;
                    }

                    return [
                        'permalink' => $permalink,
                        'video' => $video,
                        'poster' => $poster,
                        'caption' => trim(strip_tags((string) ($item['caption'] ?? ''))),
                    ];
                })
                ->filter()
                ->take(12)
                ->values()
                ->all();
        } catch (\Throwable $e) {
            return [];
        }
    }

    private function https(string $url): string
    {
        return str_starts_with($url, 'https://') ? $url : '';
    }
}
