![alt text](https://github.com/SalvatoreCervone/viewportlazy/blob/main/images/human-pc.avif "Guardare il browser")

## About

If you see in browser, component loading 

## Installation

You can install the package via composer:

```bash
composer require salvatorecervone/viewportlazy
```

You can publish Inertia Component with:

```bash
php artisan vendor:publish --tag=vue-viewportlazy
```

## Use

Simple
After publish component you use with:

```php
<ViewPortLazy>
</ViewPortLazy>
```

after insert component in your intern

example:

```php
<ViewPortLazy>
    <YourCustomComponent></YourCustomComponent>
</ViewPortLazy>
```

or

```php
<ViewPortLazy>
    <Card>
        <template #header>My Card</template>
        <template #content>
            My content
        </template>
    </Card>
</ViewPortLazy>
```

All your axios call or your call external or internal project execute only after component is in viewport



## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Salvatore](https://github.com/SalvatoreCervone)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
