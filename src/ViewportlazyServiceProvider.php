<?php

namespace salvatorecervone\Viewportlazy;

use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use Spatie\LaravelPackageTools\Commands\InstallCommand;

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
            // ->hasConfigFile()
            ->hasRoute('web')
            ->hasViews()
            ->hasMigration('create_server_loads_table')
            ->hasInertiaComponents()
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    // ->publishConfigFile()
                    // ->publishAssets()
                    ->publishMigrations()
                    ->copyAndRegisterServiceProviderInApp();
                // ->askToStarRepoOnGitHub();
            });
            // ->hasCommand(ViewportlazyCommand::class)
        ;
    }
}
