<?php

namespace App\Console\Commands;

use App\Support\QuikbasketIndustry;
use Illuminate\Console\Command;

class SetupIndustryCommand extends Command
{
    protected $signature = 'quikbasket:setup {industry : fashion|menswear|womenswear|kids|streetwear|jewellery|beauty|accessories|homeware} {--force : Replace products and journal entries without asking}';

    protected $description = 'Apply a Quikbasket catalogue demo pack.';

    public function handle(): int
    {
        $industry = strtolower((string) $this->argument('industry'));
        if (! in_array($industry, QuikbasketIndustry::SLUGS, true)) {
            $this->error('Catalogue must be one of: '.implode(', ', QuikbasketIndustry::SLUGS));

            return self::FAILURE;
        }

        if (! $this->option('force') && ! $this->confirm(
            "This deletes every product and journal entry, then replaces them with the {$industry} demo pack. Continue?",
            false
        )) {
            $this->warn('Cancelled. Products and journal entries were not changed.');

            return self::FAILURE;
        }

        if (! QuikbasketIndustry::apply($industry)) {
            $this->error('Could not apply the '.$industry.' demo pack.');

            return self::FAILURE;
        }

        $this->info("Quikbasket catalogue set to {$industry}. Demo products and labels updated.");

        return self::SUCCESS;
    }
}
