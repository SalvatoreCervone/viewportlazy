<?php

namespace salvatorecervone\Viewportlazy\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \salvatorecervone\Viewportlazy\Viewportlazy
 */
class Viewportlazy extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \salvatorecervone\Viewportlazy\Viewportlazy::class;
    }
}
