<?php

namespace salvatorecervone\Viewportlazy;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use salvatorecervone\Viewportlazy\Commands\ViewportlazyCommand;

class ViewportlazyServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('viewportlazy')
            ->hasConfigFile()
            ->hasViews()
            ->hasMigration('create_viewportlazy_table')
            ->hasCommand(ViewportlazyCommand::class);
    }
}
