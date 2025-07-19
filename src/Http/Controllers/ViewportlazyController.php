<?php

namespace salvatorecervone\Viewportlazy;

use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;
use App\Models\ServerLoad;
use App\Http\Controllers\Controller;

class Viewportlazy extends Controller
{

    static function server_load_db($minutes = 30)
    {
        // $label = ['cpu', 'ram'];
        $labels = null;
        $datiCpu = null;
        $datiRam = null;

        ServerLoad::whereRaw('created_at>dateadd(minute, -' . $minutes . ', getdate())')->get()
            ->each(function ($q) use (&$datiCpu, &$datiRam, &$labels) {
                $labels[] = Carbon::parse($q->created_at)->format('H:i:s');
                $datiCpu[] =  $q->cpu;
                $datiRam[] =  $q->ram;
                // $dati[] = ['cpu' => $q->cpu, 'ram' => $q->ram];
            });
        return [
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'cpu',
                    'data' => $datiCpu
                ],
                [
                    'label' => 'ram',
                    'data' => $datiRam
                ]
            ]
        ];
    }

    static function avvia_registrazione_load()
    {
        Cache::put('server_load_status', true);
        return  Cache::get('server_load_status');
    }
    static function stop_registrazione_load()
    {
        Cache::forget('server_load_status');
    }

    static function slow_query_db($minutes = 30)
    {
        $slowquery = Cache::get('slowquery', []);
        return collect($slowquery)
            ->where('dataoperazione', '>=', Carbon::now()->subMinutes($minutes))
            ->sortByDesc('dataoperazione')
            ->take(5)
            ->values();
    }
}
