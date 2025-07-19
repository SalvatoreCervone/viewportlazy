<template>
    <div ref="lazyView">
        <div v-if="visibility">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { onMounted, useTemplateRef, ref } from "vue";
const lazyview = useTemplateRef("lazyView");
const visibility = ref(false);
onMounted(() => {
    setTimeout(function () {
        isVisibleInViewport(lazyview.value);
    }, 3000);
    window.addEventListener("scroll", () => {
        isVisibleInViewport(lazyview.value);
    },
        true
    );
});

function isVisibleInViewport(element) {
    // let element = elementObject.element
    if (element) {
        const elementStyle = window.getComputedStyle(element);
        //Casi in cui non è visibile a nessuno
        if (
            // elementStyle.height == '0px' || // discutibile
            elementStyle.display == "none" ||
            elementStyle.opacity == "0" ||
            elementStyle.visibility == "hidden" ||
            elementStyle.clipPath == "circle(0px at 50% 50%)" ||
            elementStyle.transform == "scale(0)" ||
            element.hasAttribute("hidden")
        ) {
            return false;
        }
        const rect = element.getBoundingClientRect();

        //Overlapping strict check
        const baseElementLeft = rect.left;
        const baseElementTop = rect.top;
        const elementFromStartingPoint = document.elementFromPoint(
            baseElementLeft,
            baseElementTop
        );
        if (
            elementFromStartingPoint != null &&
            !element.isSameNode(elementFromStartingPoint)
        ) {
            const elementZIndex = elementStyle.zIndex;
            const elementOverlappingZIndex = window.getComputedStyle(elementFromStartingPoint).zIndex;
            if (Number(elementZIndex) < Number(elementOverlappingZIndex)) {
                return false;
            }
            if (elementZIndex === "" && elementOverlappingZIndex === "") {
                /** Se 2 elementi sono sovrapposti con z-index si vedrà solo quello superiore **/
                if (
                    element.compareDocumentPosition(elementFromStartingPoint) &
                    Node.DOCUMENT_POSITION_FOLLOWING
                ) {
                    return false;
                }
            }
        }
        console.log(rect.top, rect.bottom)
        let checkvisibility =
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 80;
        // && rect.right <= (window.innerWidth || document.documentElement.clientWidth) // NON INTERESSA

        if (checkvisibility) {
            visibility.value = checkvisibility;
        }

    }
}
</script>
