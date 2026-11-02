<?php

use Illuminate\Support\Facades\File;

/**
 * Registers QuikbasketServiceProvider without touching AppServiceProvider.
 */
class StarterKitPostInstall
{
    public function handle($console): void
    {
        $providersPath = base_path('bootstrap/providers.php');
        $class = 'App\\Providers\\QuikbasketServiceProvider::class';

        if (! File::exists(base_path('app/Providers/QuikbasketServiceProvider.php'))) {
            $console->warn('QuikbasketServiceProvider.php was not installed; skip provider registration.');

            return;
        }

        if (! File::exists($providersPath)) {
            $console->warn('bootstrap/providers.php not found. Register App\\Providers\\QuikbasketServiceProvider manually (see README).');

            return;
        }

        $contents = File::get($providersPath);

        if (str_contains($contents, 'QuikbasketServiceProvider')) {
            $console->info('QuikbasketServiceProvider is already registered.');

            return;
        }

        if (! preg_match('/return\s*\[/', $contents)) {
            $console->warn('Could not update bootstrap/providers.php automatically. Add App\\Providers\\QuikbasketServiceProvider::class (see README).');

            return;
        }

        $updated = preg_replace(
            '/return\s*\[/',
            "return [\n    {$class},",
            $contents,
            1
        );

        if ($updated === null || $updated === $contents) {
            $console->warn('Could not update bootstrap/providers.php automatically. Add App\\Providers\\QuikbasketServiceProvider::class (see README).');

            return;
        }

        File::put($providersPath, $updated);
        $console->info('Registered App\\Providers\\QuikbasketServiceProvider in bootstrap/providers.php.');
    }
}
