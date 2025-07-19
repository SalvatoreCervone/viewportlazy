<?php

use Illuminate\Support\Facades\Route;
use salvatorecervone\Viewportlazy\ViewportlazyController;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/server_load', [ViewportlazyController::class, 'server_load']);
    Route::get('/server_load/fromdb/{minutes?}', [ViewportlazyController::class, 'server_load_db']);
    Route::get('/server_load/avvia_registrazione_load', [ViewportlazyController::class, 'avvia_registrazione_load']);
    Route::get('/server_load/stop_registrazione_load', [ViewportlazyController::class, 'stop_registrazione_load']);
});
