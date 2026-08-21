<template>
    <div ref="lazyView">
        <div v-if="visibility">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const props = defineProps({
    delayAllView: { type: Number, default: 2000 }, // Milliseconds
    delaySingle: { type: Number, default: 0 }, // Milliseconds
});

const lazyView = ref(null);
const visibility = ref(false);
let observer = null;
let timer = null;

function isElementHidden(element) {
    const elementStyle = window.getComputedStyle(element);
    if (
        elementStyle.display === "none" ||
        elementStyle.opacity === "0" ||
        elementStyle.visibility === "hidden" ||
        elementStyle.clipPath === "circle(0px at 50% 50%)" ||
        elementStyle.transform === "scale(0)" ||
        element.hasAttribute("hidden")
    ) {
        return true;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
        return false;
    }

    const elementFromPoint = document.elementFromPoint(rect.left, rect.top);
    if (
        elementFromPoint != null &&
        !element.isSameNode(elementFromPoint) &&
        !element.contains(elementFromPoint)
    ) {
        const elementZIndex = elementStyle.zIndex;
        const overlappingZIndex = window.getComputedStyle(elementFromPoint).zIndex;
        if (
            elementZIndex !== "" &&
            overlappingZIndex !== "" &&
            Number(elementZIndex) < Number(overlappingZIndex)
        ) {
            return true;
        }
        if (elementZIndex === "" && overlappingZIndex === "") {
            if (
                element.compareDocumentPosition(elementFromPoint) &
                Node.DOCUMENT_POSITION_FOLLOWING
            ) {
                return true;
            }
        }
    }

    return false;
}

function checkVisibility() {
    const element = lazyView.value;
    if (!element || visibility.value) return;

    if (!isElementHidden(element)) {
        visibility.value = true;
        cleanup();
    }
}

function cleanup() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

onMounted(() => {
    const sumTime = Number(props.delayAllView) + Number(props.delaySingle);

    timer = setTimeout(() => {
        const element = lazyView.value;
        if (!element) return;

        if ("IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            checkVisibility();
                        }
                    }
                },
                {
                    rootMargin: "0px 0px -80px 0px",
                }
            );
            observer.observe(element);
        } else {
            checkVisibility();
        }
    }, sumTime);
});

onBeforeUnmount(() => {
    cleanup();
});
</script>
