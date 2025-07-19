<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/server_load', [SystemControl::class, 'server_load']);
    Route::get('/server_load/fromdb/{minutes?}', [SystemControl::class, 'server_load_db']);
    Route::get('/server_load/avvia_registrazione_load', [SystemControl::class, 'avvia_registrazione_load']);
    Route::get('/server_load/stop_registrazione_load', [SystemControl::class, 'stop_registrazione_load']);
});
