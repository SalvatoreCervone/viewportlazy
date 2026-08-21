<template>
    <component :is="tag" ref="lazyView" :style="wrapperStyle">
        <template v-if="visibility">
            <slot :is-visible="visibility" />
        </template>
        <template v-else>
            <slot name="placeholder" :is-visible="visibility" />
        </template>
    </component>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useViewportLazy } from './useViewportLazy.js';

const props = defineProps({
    tag: {
        type: String,
        default: 'div',
    },
    delayAllView: {
        type: Number,
        default: 0,
    },
    delaySingle: {
        type: Number,
        default: 0,
    },
    rootMargin: {
        type: String,
        default: '0px',
    },
    threshold: {
        type: [Number, Array],
        default: 0,
    },
    once: {
        type: Boolean,
        default: true,
    },
    minHeight: {
        type: [String, Number],
        default: null,
    },
});

const emit = defineEmits(['visible', 'hidden']);

const lazyView = ref(null);
const totalDelay = computed(() => Number(props.delayAllView || 0) + Number(props.delaySingle || 0));

const wrapperStyle = computed(() => {
    if (!props.minHeight || visibility.value) return {};
    const height = typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight;
    return { minHeight: height };
});

const { isVisible: visibility, stop, start } = useViewportLazy(lazyView, {
    rootMargin: props.rootMargin,
    threshold: props.threshold,
    delay: totalDelay.value,
    once: props.once,
    onVisible: (entry) => emit('visible', entry),
    onHidden: (entry) => emit('hidden', entry),
});

defineExpose({
    visibility,
    stop,
    start,
});
</script>
