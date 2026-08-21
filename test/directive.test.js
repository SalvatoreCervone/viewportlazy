import { describe, it, expect, beforeEach, vi } from 'vitest';
import { defineComponent, h, withDirectives } from 'vue';
import { mount } from '@vue/test-utils';
import { vViewportLazy } from '../src/directive.js';
import { observerInstances } from './setup.js';

describe('v-viewport-lazy Directive', () => {
    beforeEach(() => {
        observerInstances.length = 0;
        vi.useRealTimers();
    });

    it('should observe element and trigger callback on intersect', async () => {
        const onVisible = vi.fn();
        const TestComponent = defineComponent({
            setup() {
                return () => withDirectives(h('div'), [[vViewportLazy, onVisible]]);
            },
        });

        const wrapper = mount(TestComponent);

        expect(observerInstances.length).toBe(1);
        const observer = observerInstances[0];

        observer.trigger([{ isIntersecting: true, target: wrapper.element }]);

        expect(onVisible).toHaveBeenCalledTimes(1);
    });

    it('should support object binding with delay in template', async () => {
        vi.useFakeTimers();
        const onVisible = vi.fn();

        const TestComponent = defineComponent({
            directives: {
                viewportLazy: vViewportLazy,
            },
            template: `<div v-viewport-lazy="{ onVisible, delay: 300 }"></div>`,
            setup() {
                return { onVisible };
            },
        });

        const wrapper = mount(TestComponent);
        const observer = observerInstances[0];

        observer.trigger([{ isIntersecting: true, target: wrapper.element }]);
        expect(onVisible).not.toHaveBeenCalled();

        vi.advanceTimersByTime(300);
        expect(onVisible).toHaveBeenCalledTimes(1);
    });
});
