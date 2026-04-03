<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useFloating, autoUpdate, offset, flip, shift } from '@floating-ui/vue'

// Material web imports for list components (likely used in the slot)
import "@material/web/list/list.js";
import "@material/web/list/list-item.js";

export interface Props {
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-start',
})

const isOpen = ref(false)
const toggleMenuOpen = (value?: boolean) => {
  isOpen.value = value ?? !isOpen.value
}

const anchor = useTemplateRef<HTMLElement | null>('anchor')
const menu = useTemplateRef<HTMLElement | null>('menu')

// Positioning logic mirroring MbcTooltip.vue
const { floatingStyles } = useFloating(anchor, menu, {
  placement: computed(() => props.placement),
  strategy: 'fixed',
  whileElementsMounted: autoUpdate,
  middleware: [offset(4), flip(), shift({ padding: 8 })],
})

// Close the menu when clicking outside it, ignoring clicks on the trigger button
onClickOutside(menu, (event) => {
  if (anchor.value && anchor.value.contains(event.target as Node)) {
    return
  }
  isOpen.value = false
})

// Expose open state and toggle method
defineExpose({
  isOpen,
  toggleMenuOpen,
})
</script>

<template>
  <div class="mbc-button-dropdown">
    <div
      ref="anchor"
      class="anchor-container"
      @click="toggleMenuOpen()"
    >
      <slot name="button" />
    </div>

    <Teleport to="body">
      <Transition name="menu">
        <div
          v-if="isOpen"
          ref="menu"
          class="dropdown-menu"
          :style="floatingStyles"
        >
          <slot />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.mbc-button-dropdown {
  display: inline-block;
}

.anchor-container {
  display: inline-block;
  cursor: pointer;
}

.dropdown-menu {
  z-index: 1000;
  background-color: var(--md-sys-color-surface-container, #ffffff);
  border-radius: var(--md-sys-shape-corner-extra-small, 4px);
  box-shadow: 
    0px 3px 1px -2px rgba(0,0,0,0.2), 
    0px 2px 2px 0px rgba(0,0,0,0.14), 
    0px 1px 5px 0px rgba(0,0,0,0.12);
  overflow: hidden;
  min-width: 112px;
}

/* Smooth transition matching Material Design expectations */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
