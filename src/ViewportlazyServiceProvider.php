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
        // $package
        //     ->name('viewportlazy')
        //     // ->hasConfigFile()
        //     ->hasRoute('web')
        //     // ->hasViews()
        //     ->hasMigration('create_server_loads_table')
        //     ->hasInertiaComponents();
        //     // ->hasInstallCommand(function (InstallCommand $command) {
        //     //     $command
        //     //         // ->publishConfigFile()
        //     //         // ->publishAssets()
        //     //         ->publishMigrations()
        //     //         ->copyAndRegisterServiceProviderInApp();
        //     //     // ->askToStarRepoOnGitHub();
        //     // });
        //     // ->hasCommand(ViewportlazyCommand::class)
        // ;

        $this->publishes([__DIR__ . '/../database/migrations' => database_path('/migrations')], 'migration-viewportlazy');
        $this->publishes([__DIR__ . '/../routes/web.php' => app_path('../routes/')], 'route-viewportlazy');
        $this->publishes([__DIR__ . '/../resources/js/Pages' => resource_path('js/Pages/viewportlazy/')], 'vue-viewportlazy');
        $this->publishes([__DIR__ . '/Http/Controllers' => app_path('Http/Controllers/')], 'controller-viewportlazy');
        $this->publishes([__DIR__ . '/Models' => app_path('Models/')], 'model-viewportlazy');
        // $this->publishes([__DIR__ . '/Events' => app_path('Events/')], 'event-chatonetoone');
        // $this->publishes([__DIR__ . '/config' => config_path()], 'config-chatonetoone');
    }
}
