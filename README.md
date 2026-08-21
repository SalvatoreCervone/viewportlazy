![alt text](https://github.com/SalvatoreCervone/viewportlazy/blob/main/images/human-pc.avif "Guardare il browser")

## About

Vue 3 component to lazy load elements or components when they enter the viewport.

## Installation

```bash
npm i @salvatorecervone/viewportlazy
```

## Usage

### Global Registration

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ViewPortLazy from '@salvatorecervone/viewportlazy';

const app = createApp(App);
app.use(ViewPortLazy);
app.mount('#app');
```

### Local Component Usage

```vue
<template>
    <ViewPortLazy>
        <YourCustomComponent />
    </ViewPortLazy>
</template>

<script setup>
import { ViewPortLazy } from '@salvatorecervone/viewportlazy';
</script>
```

### Example with Slots and Cards

```vue
<template>
    <ViewPortLazy :delay-all-view="500" :delay-single="0">
        <Card>
            <template #header>My Card</template>
            <template #content>
                My content
            </template>
        </Card>
    </ViewPortLazy>
</template>
```

All your API / axios calls or expensive child component rendering will execute only after the component enters the viewport.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delayAllView` | `Number` | `2000` | Delay in milliseconds before starting visibility observation |
| `delaySingle` | `Number` | `0` | Additional single-instance delay in milliseconds |

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Credits

- [Salvatore](https://github.com/SalvatoreCervone)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

