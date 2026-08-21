import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ViewPortLazy from '../src/ViewPortLazy.vue';
import { observerInstances } from './setup.js';

describe('ViewPortLazy Component', () => {
    beforeEach(() => {
        observerInstances.length = 0;
        vi.useRealTimers();
    });

    it('should render placeholder slot initially when not visible', () => {
        const wrapper = mount(ViewPortLazy, {
            slots: {
                default: '<div class="content">Loaded Content</div>',
                placeholder: '<div class="skeleton">Loading Skeleton...</div>',
            },
        });

        expect(wrapper.find('.skeleton').exists()).toBe(true);
        expect(wrapper.find('.content').exists()).toBe(false);
    });

    it('should render content and emit visible event when intersecting', async () => {
        const wrapper = mount(ViewPortLazy, {
            slots: {
                default: '<div class="content">Loaded Content</div>',
                placeholder: '<div class="skeleton">Loading Skeleton...</div>',
            },
        });

        expect(observerInstances.length).toBe(1);
        const observer = observerInstances[0];

        observer.trigger([{ isIntersecting: true, target: wrapper.element }]);
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.content').exists()).toBe(true);
        expect(wrapper.find('.skeleton').exists()).toBe(false);
        expect(wrapper.emitted('visible')).toBeTruthy();
    });

    it('should support custom tag and minHeight', () => {
        const wrapper = mount(ViewPortLazy, {
            props: {
                tag: 'section',
                minHeight: 250,
            },
            slots: {
                default: '<div>Content</div>',
            },
        });

        expect(wrapper.element.tagName.toLowerCase()).toBe('section');
        expect(wrapper.attributes('style')).toContain('min-height: 250px;');
    });
});
