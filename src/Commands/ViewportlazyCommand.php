<?php

namespace salvatorecervone\Viewportlazy\Commands;

use Illuminate\Console\Command;

class ViewportlazyCommand extends Command
{
    public $signature = 'viewportlazy';

    public $description = 'My command';

    public function handle(): int
    {
        $this->comment('All done');

        return self::SUCCESS;
    }
}
