import { describe, it, expect, beforeEach, vi } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { useViewportLazy } from '../src/useViewportLazy.js';
import { observerInstances } from './setup.js';

describe('useViewportLazy Composable', () => {
    beforeEach(() => {
        observerInstances.length = 0;
        vi.useRealTimers();
    });

    it('should initialize with isVisible false and create observer', () => {
        let composableResult;
        const TestComponent = defineComponent({
            setup() {
                const el = ref(null);
                composableResult = useViewportLazy(el);
                return () => h('div', { ref: el });
            },
        });

        const wrapper = mount(TestComponent);

        expect(composableResult.isVisible.value).toBe(false);
        expect(observerInstances.length).toBe(1);
        expect(observerInstances[0].elements.has(wrapper.element)).toBe(true);
    });

    it('should set isVisible to true when intersecting and once=true', async () => {
        let composableResult;
        const onVisible = vi.fn();

        const TestComponent = defineComponent({
            setup() {
                const el = ref(null);
                composableResult = useViewportLazy(el, { once: true, onVisible });
                return () => h('div', { ref: el });
            },
        });

        const wrapper = mount(TestComponent);
        const observer = observerInstances[0];

        observer.trigger([{ isIntersecting: true, target: wrapper.element }]);

        expect(composableResult.isVisible.value).toBe(true);
        expect(onVisible).toHaveBeenCalledTimes(1);
        // Once true should disconnect
        expect(observer.elements.size).toBe(0);
    });

    it('should handle delay option before becoming visible', async () => {
        vi.useFakeTimers();

        let composableResult;
        const TestComponent = defineComponent({
            setup() {
                const el = ref(null);
                composableResult = useViewportLazy(el, { delay: 500 });
                return () => h('div', { ref: el });
            },
        });

        const wrapper = mount(TestComponent);
        const observer = observerInstances[0];

        observer.trigger([{ isIntersecting: true, target: wrapper.element }]);
        expect(composableResult.isVisible.value).toBe(false);

        vi.advanceTimersByTime(200);
        expect(composableResult.isVisible.value).toBe(false);

        vi.advanceTimersByTime(300);
        expect(composableResult.isVisible.value).toBe(true);
    });

    it('should toggle visibility when once is false', async () => {
        let composableResult;
        const onVisible = vi.fn();
        const onHidden = vi.fn();

        const TestComponent = defineComponent({
            setup() {
                const el = ref(null);
                composableResult = useViewportLazy(el, { once: false, onVisible, onHidden });
                return () => h('div', { ref: el });
            },
        });

        const wrapper = mount(TestComponent);
        const observer = observerInstances[0];

        // Intersect
        observer.trigger([{ isIntersecting: true, target: wrapper.element }]);
        expect(composableResult.isVisible.value).toBe(true);
        expect(onVisible).toHaveBeenCalledTimes(1);

        // Exit
        observer.trigger([{ isIntersecting: false, target: wrapper.element }]);
        expect(composableResult.isVisible.value).toBe(false);
        expect(onHidden).toHaveBeenCalledTimes(1);
    });

    it('should cleanup observer on unmount', () => {
        const TestComponent = defineComponent({
            setup() {
                const el = ref(null);
                useViewportLazy(el);
                return () => h('div', { ref: el });
            },
        });

        const wrapper = mount(TestComponent);
        const observer = observerInstances[0];

        expect(observer.elements.size).toBe(1);
        wrapper.unmount();
        expect(observer.elements.size).toBe(0);
    });
});
