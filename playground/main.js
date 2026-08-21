import { createApp } from 'vue';
import App from './App.vue';
import ViewPortLazy, { vViewportLazy } from '../src/index.js';

const app = createApp(App);
app.use(ViewPortLazy);
app.directive('viewport-lazy', vViewportLazy);
app.mount('#app');
