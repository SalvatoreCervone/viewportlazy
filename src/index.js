import ViewPortLazy from './ViewPortLazy.vue';
import { useViewportLazy } from './useViewportLazy.js';
import { vViewportLazy } from './directive.js';

export function install(app) {
    if (install.installed) return;
    install.installed = true;

    app.component('ViewPortLazy', ViewPortLazy);
    app.directive('viewport-lazy', vViewportLazy);
}

ViewPortLazy.install = install;

export { ViewPortLazy, useViewportLazy, vViewportLazy };
export default ViewPortLazy;
