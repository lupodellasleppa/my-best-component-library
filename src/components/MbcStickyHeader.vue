<script setup lang="ts">
import { useCSS } from '@/composables/useCSS'

const { getCSSPropertyValue } = useCSS()
const topAppBarHeight = getCSSPropertyValue('--mbc-top-app-bar-height')

defineEmits(['stuck'])

const vStickyStuck = {
  mounted(el: HTMLElement) {
    // We observe the element. When it gets within 1px of the top of the viewport,
    // it triggers the observer.
    const rootMargin = `-${parseFloat(topAppBarHeight) + 1 + 43}px 0px 0px 0px`
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 1. Is it partially off-screen?
        const isIntersecting = entry.intersectionRatio < 1
        // 2. Is it physically near the top of the viewport?
        const isAtTop =
          entry.boundingClientRect.top < parseFloat(topAppBarHeight) + 1 + 43

        // Only apply the stuck class if BOTH are true
        el.classList.toggle('is-stuck', isIntersecting && isAtTop)
      },
      {
        threshold: [1],
        // This -1px margin acts as a tripwire right at the top of the screen
        rootMargin,
      },
    )
    observer.observe(el)
  },
}

defineProps<{
  label?: string
  isFirstElement?: boolean
}>()
</script>

<template>
  <div
    class="sticky-header"
    v-sticky-stuck
    :class="{ 'is-first-element': isFirstElement }"
  >
    <slot> {{ label }} </slot>
  </div>
</template>

<style scoped lang="scss">
.sticky-header {
  background-color: var(--mbc-sticky-header-container-color);
  border-radius: var(--md-sys-shape-medium);
  padding: var(--md-sys-shape-small);
  font-size: 1.2em;
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 9;
  // transition: all 0.2s ease;
}
.is-first-element.is-stuck {
  margin-block-start: calc(var(--md-sys-padding-large) * -1);
}
</style>
