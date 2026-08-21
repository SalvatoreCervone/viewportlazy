import { ref, shallowRef, watch, onMounted, onBeforeUnmount, unref } from 'vue';

/**
 * Composable to observe an element's visibility within the viewport or a specified root.
 *
 * @param {import('vue').Ref<HTMLElement | null> | HTMLElement | null} target - Ref or element to observe
 * @param {Object} [options={}] - Observation options
 * @param {Element | Document | null} [options.root=null] - The root element for intersection
 * @param {string} [options.rootMargin='0px'] - Margin around root
 * @param {number | number[]} [options.threshold=0] - Threshold(s) at which to trigger callback
 * @param {number} [options.delay=0] - Delay in milliseconds before marking as visible
 * @param {boolean} [options.once=true] - Whether to stop observing once visible
 * @param {boolean} [options.immediate=true] - Whether to start observing immediately
 * @param {(entry: IntersectionObserverEntry) => void} [options.onVisible] - Callback when visible
 * @param {(entry: IntersectionObserverEntry) => void} [options.onHidden] - Callback when hidden
 * @returns {{
 *   isVisible: import('vue').Ref<boolean>,
 *   stop: () => void,
 *   start: () => void,
 *   observer: import('vue').ShallowRef<IntersectionObserver | null>
 * }}
 */
export function useViewportLazy(target, options = {}) {
    const {
        root = null,
        rootMargin = '0px',
        threshold = 0,
        delay = 0,
        once = true,
        immediate = true,
        onVisible,
        onHidden,
    } = options;

    const isVisible = ref(false);
    const observer = shallowRef(null);
    let delayTimer = null;

    function cleanupTimer() {
        if (delayTimer) {
            clearTimeout(delayTimer);
            delayTimer = null;
        }
    }

    function stop() {
        cleanupTimer();
        if (observer.value) {
            observer.value.disconnect();
            observer.value = null;
        }
    }

    function handleIntersect(entry) {
        if (entry.isIntersecting) {
            if (delay > 0) {
                cleanupTimer();
                delayTimer = setTimeout(() => {
                    isVisible.value = true;
                    if (typeof onVisible === 'function') {
                        onVisible(entry);
                    }
                    if (once) {
                        stop();
                    }
                }, delay);
            } else {
                isVisible.value = true;
                if (typeof onVisible === 'function') {
                    onVisible(entry);
                }
                if (once) {
                    stop();
                }
            }
        } else {
            cleanupTimer();
            if (!once) {
                isVisible.value = false;
                if (typeof onHidden === 'function') {
                    onHidden(entry);
                }
            }
        }
    }

    function start() {
        stop();

        const el = unref(target);
        if (!el || typeof window === 'undefined') return;

        if (!('IntersectionObserver' in window)) {
            // Fallback for environments without IntersectionObserver
            isVisible.value = true;
            if (typeof onVisible === 'function') {
                onVisible(null);
            }
            return;
        }

        observer.value = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    handleIntersect(entry);
                }
            },
            {
                root: unref(root),
                rootMargin,
                threshold,
            }
        );

        observer.value.observe(el);
    }

    if (typeof window !== 'undefined') {
        onMounted(() => {
            if (immediate) {
                start();
            }
        });

        // Watch target in case it changes dynamically
        watch(
            () => unref(target),
            (newEl) => {
                if (newEl && immediate && (!once || !isVisible.value)) {
                    start();
                } else if (!newEl) {
                    stop();
                }
            }
        );

        onBeforeUnmount(() => {
            stop();
        });
    }

    return {
        isVisible,
        stop,
        start,
        observer,
    };
}

export default useViewportLazy;
