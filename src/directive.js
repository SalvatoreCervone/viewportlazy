const DIRECTIVE_MAP = new WeakMap();

/**
 * Vue 3 directive `v-viewport-lazy`
 *
 * Usage:
 * `<div v-viewport-lazy="onIntersect"></div>`
 * `<div v-viewport-lazy="{ onVisible, onHidden, rootMargin: '100px', threshold: 0.2, delay: 300, once: true }"></div>`
 * `<div v-viewport-lazy.once="onVisible"></div>`
 */
export const vViewportLazy = {
    mounted(el, binding) {
        if (typeof window === 'undefined') return;

        let options = {};
        if (typeof binding.value === 'function') {
            options = {
                onVisible: binding.value,
            };
        } else if (binding.value && typeof binding.value === 'object') {
            options = { ...binding.value };
        }

        const once = binding.modifiers.once !== undefined ? true : (options.once ?? true);
        const delay = options.delay || 0;
        const rootMargin = options.rootMargin || '0px';
        const threshold = options.threshold || 0;

        let timer = null;

        const cleanup = () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            const data = DIRECTIVE_MAP.get(el);
            if (data?.observer) {
                data.observer.disconnect();
            }
            DIRECTIVE_MAP.delete(el);
        };

        if (!('IntersectionObserver' in window)) {
            if (typeof options.onVisible === 'function') {
                options.onVisible(el, null);
            }
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        if (delay > 0) {
                            if (timer) clearTimeout(timer);
                            timer = setTimeout(() => {
                                if (typeof options.onVisible === 'function') {
                                    options.onVisible(el, entry);
                                }
                                if (once) {
                                    cleanup();
                                }
                            }, delay);
                        } else {
                            if (typeof options.onVisible === 'function') {
                                options.onVisible(el, entry);
                            }
                            if (once) {
                                cleanup();
                            }
                        }
                    } else {
                        if (timer) {
                            clearTimeout(timer);
                            timer = null;
                        }
                        if (!once && typeof options.onHidden === 'function') {
                            options.onHidden(el, entry);
                        }
                    }
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        DIRECTIVE_MAP.set(el, { observer, cleanup });
        observer.observe(el);
    },

    unmounted(el) {
        const data = DIRECTIVE_MAP.get(el);
        if (data) {
            data.cleanup();
        }
    },
};

export default vViewportLazy;
