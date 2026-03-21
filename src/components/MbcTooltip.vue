<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useParentElement, useElementHover, useMediaQuery } from '@vueuse/core'
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/vue'

export interface Props {
  text?: string
  desktopOnly?: boolean
  delay?: number // Added delay configuration
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

// Set a default delay of 400ms (industry standard)
const props = withDefaults(defineProps<Props>(), {
  delay: 400,
})

const parent = useParentElement()
const tooltip = useTemplateRef<HTMLElement | null>('tooltip')

const isDesktop = useMediaQuery('(min-width: 1024px)')

// 1. Add delayEnter for the initial hover, and a tiny delayLeave to bridge the gap
const isParentHovered = useElementHover(parent, {
  delayEnter: props.delay,
  delayLeave: 100,
})

// 2. Add delayLeave here so the tooltip doesn't vanish instantly when moving off it
const isTooltipHovered = useElementHover(tooltip, {
  delayLeave: 100,
})

const showOnDesktop = computed(() => {
  if (props.desktopOnly !== true) return true
  return isDesktop.value
})

const show = computed(
  () =>
    showOnDesktop.value && (isParentHovered.value || isTooltipHovered.value),
)

const placement = computed(() => {
  return props.placement || 'bottom'
})

const { floatingStyles } = useFloating(parent, tooltip, {
  placement,
  strategy: 'absolute',
  whileElementsMounted: autoUpdate,
  middleware: [offset(8), flip(), shift({ padding: 8 })],
})
</script>

<template>
  <Teleport to="body">
    <md-outlined-card
      v-if="show"
      ref="tooltip"
      class="tooltiptext"
      :style="[floatingStyles]"
    >
      <slot>{{ text }}</slot>
    </md-outlined-card>
  </Teleport>
</template>

<style lang="scss" scoped>
.tooltiptext {
  font-size: 0.81rem;
  line-height: 1.2;
  width: max-content;
  text-align: center;
  color: var(--mbc-tooltip-text-color);
  background-color: var(--mbc-tooltip-background-color);
  border-radius: var(--mbc-tooltip-shape);
  padding: var(--mbc-tooltip-padding);
  z-index: 1000;
  margin: 0;
}
</style>
