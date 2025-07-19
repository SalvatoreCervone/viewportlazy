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
        $package->name('viewportlazy');
        $this->publishes([__DIR__ . '/../resources/js/Pages' => resource_path('js/Pages/viewportlazy/')], 'vue-viewportlazy');
        // $this->publishes([__DIR__ . '/Events' => app_path('Events/')], 'event-chatonetoone');
        // $this->publishes([__DIR__ . '/config' => config_path()], 'config-chatonetoone');
    }
}
