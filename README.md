![alt text](https://github.com/SalvatoreCervone/viewportlazy/blob/main/images/human-pc.avif "Guardare il browser")

# @salvatorecervone/viewportlazy

> High-performance Vue 3 component, composable, and directive to lazy load elements, components, and media when entering the viewport using `IntersectionObserver`.

[![npm version](https://img.shields.io/npm/v/@salvatorecervone/viewportlazy.svg)](https://www.npmjs.com/package/@salvatorecervone/viewportlazy)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

---

## Features

- ⚡ **Lightweight & Fast**: Built on native `IntersectionObserver` with automatic cleanup.
- 🧩 **3 Ways to Use**:
  - **Component**: `<ViewPortLazy>` with slot `#placeholder` support (Zero CLS).
  - **Composable**: `useViewportLazy(elementRef, options)`.
  - **Directive**: `v-viewport-lazy`.
- 📐 **Zero Layout Shift (CLS)**: Reserve height with `min-height` and skeletons before content loads.
- ⏱️ **Flexible Delays**: Configure debounce/throttle delays before triggering.
- 🎯 **Configurable Root & Margin**: Fine-tune `rootMargin` and `threshold`.
- 🔷 **TypeScript Ready**: Complete TypeScript definitions included.

---

## Installation

```bash
npm install @salvatorecervone/viewportlazy
```

---

## Quick Start

### 1. Global Plugin Registration

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import ViewPortLazy from '@salvatorecervone/viewportlazy';

const app = createApp(App);
app.use(ViewPortLazy); // Registers <ViewPortLazy> component and v-viewport-lazy directive
app.mount('#app');
```

---

## Usage

### Option A: `<ViewPortLazy>` Component

#### Basic Usage

```vue
<template>
  <ViewPortLazy>
    <HeavyChartComponent />
  </ViewPortLazy>
</template>

<script setup>
import { ViewPortLazy } from '@salvatorecervone/viewportlazy';
</script>
```

#### With `#placeholder` Slot (Zero Layout Shift)

```vue
<template>
  <ViewPortLazy :min-height="300" root-margin="100px" @visible="onVisible">
    <!-- Rendered when entering viewport -->
    <HeavyCard :data="cardData" />

    <!-- Rendered before entering viewport (Skeleton loader) -->
    <template #placeholder>
      <div class="skeleton-loader" style="height: 300px;">Loading...</div>
    </template>
  </ViewPortLazy>
</template>
```

#### Component Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `String` | `'div'` | Wrapper HTML tag |
| `minHeight` | `String \| Number` | `null` | Minimum height for wrapper before content loads |
| `rootMargin` | `String` | `'0px'` | Margin around root for IntersectionObserver (e.g. `'100px'`) |
| `threshold` | `Number \| Array` | `0` | Intersection threshold(s) to trigger visibility |
| `delayAllView` | `Number` | `0` | Delay in milliseconds before marking as visible |
| `delaySingle` | `Number` | `0` | Additional single-instance delay in milliseconds |
| `once` | `Boolean` | `true` | If `true`, disconnects observer once visible |

#### Component Events

| Event | Payload | Description |
| --- | --- | --- |
| `@visible` | `IntersectionObserverEntry` | Emitted when element enters viewport |
| `@hidden` | `IntersectionObserverEntry` | Emitted when element exits viewport (when `once: false`) |

---

### Option B: `useViewportLazy` Composable

For fine-grained logic in your script:

```vue
<template>
  <div ref="targetEl" class="box">
    <p v-if="isVisible">Data loaded on scroll! 🚀</p>
    <p v-else>Waiting for viewport...</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useViewportLazy } from '@salvatorecervone/viewportlazy';

const targetEl = ref(null);

const { isVisible, stop, start } = useViewportLazy(targetEl, {
  rootMargin: '50px',
  delay: 200,
  once: true,
  onVisible: () => {
    console.log('Element is now visible! Fetching API data...');
  }
});
</script>
```

---

### Option C: `v-viewport-lazy` Directive

For lightweight triggers directly in template:

```vue
<template>
  <!-- Simple callback on intersect -->
  <div v-viewport-lazy="onIntersect">...</div>

  <!-- With options and delay -->
  <div v-viewport-lazy="{ onVisible: loadImages, delay: 300, rootMargin: '100px' }">...</div>
</template>

<script setup>
function onIntersect() {
  console.log('Element entered viewport!');
}
</script>
```

---

## Development & Playground

To run the local interactive playground and test changes:

```bash
npm run dev
```

To run the automated tests:

```bash
npm run test
```

To build for production:

```bash
npm run build
```

---

## Changelog

Please see [CHANGELOG.md](CHANGELOG.md) for more information on recent changes.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute.

## License

The MIT License (MIT). Please see [LICENSE.md](LICENSE.md) for more information.
