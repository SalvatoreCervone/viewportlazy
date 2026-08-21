import type { App, Component, Directive, Ref, ShallowRef } from 'vue';

export interface ViewPortLazyProps {
    /** Root tag wrapper element. Defaults to 'div'. */
    tag?: string;
    /** Delay in milliseconds before starting visibility observation or rendering. */
    delayAllView?: number;
    /** Additional single-instance delay in milliseconds. */
    delaySingle?: number;
    /** Margin around the root element. Defaults to '0px'. */
    rootMargin?: string;
    /** Intersection threshold(s). Defaults to 0. */
    threshold?: number | number[];
    /** Whether to observe only once. Defaults to true. */
    once?: boolean;
    /** Minimum height for wrapper before content loads (prevents layout shift). */
    minHeight?: string | number;
}

export interface UseViewportLazyOptions {
    /** The root element for intersection. Defaults to browser viewport. */
    root?: Element | Document | null | Ref<Element | Document | null>;
    /** Margin around the root. Defaults to '0px'. */
    rootMargin?: string;
    /** Intersection threshold(s). Defaults to 0. */
    threshold?: number | number[];
    /** Delay in milliseconds before setting isVisible to true. Defaults to 0. */
    delay?: number;
    /** Whether to observe only once and disconnect on visible. Defaults to true. */
    once?: boolean;
    /** Whether to start observing immediately. Defaults to true. */
    immediate?: boolean;
    /** Callback triggered when element becomes visible. */
    onVisible?: (entry: IntersectionObserverEntry | null) => void;
    /** Callback triggered when element exits viewport (only if once=false). */
    onHidden?: (entry: IntersectionObserverEntry) => void;
}

export interface UseViewportLazyReturn {
    isVisible: Ref<boolean>;
    stop: () => void;
    start: () => void;
    observer: ShallowRef<IntersectionObserver | null>;
}

export declare function useViewportLazy(
    target: Ref<HTMLElement | null> | HTMLElement | null,
    options?: UseViewportLazyOptions
): UseViewportLazyReturn;

export declare const vViewportLazy: Directive<HTMLElement, ((entry: IntersectionObserverEntry | null) => void) | UseViewportLazyOptions>;

export declare const ViewPortLazy: Component<ViewPortLazyProps> & {
    install: (app: App) => void;
};

export declare function install(app: App): void;

export default ViewPortLazy;
