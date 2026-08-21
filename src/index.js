import ViewPortLazy from './ViewPortLazy.vue';

export function install(app) {
    if (install.installed) return;
    install.installed = true;
    app.component('ViewPortLazy', ViewPortLazy);
}

ViewPortLazy.install = install;

export { ViewPortLazy };
export default ViewPortLazy;

