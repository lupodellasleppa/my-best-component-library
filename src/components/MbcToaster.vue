<script setup lang="ts">
import { useToast } from '../composables/useToast'

// Connect to the global brain
const { toasts, currentPosition, remove } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="toaster-viewport" :data-position="currentPosition">
      <TransitionGroup name="toast-list" tag="div" class="toast-container">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-card"
          @click="remove(toast.id)"
        >
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
/* 1. The Viewport: Fixed to the bottom center of the screen */
.toaster-viewport {
  --space: var(--md-sys-shape-small);
  position: fixed;
  z-index: 9999;

  /* Critical: allows clicks to pass through the invisible container
     so users can still click buttons behind the toast area */
  pointer-events: none;

  &[data-position='bottom-right'] {
    bottom: var(--space);
    right: var(--space);
  }

  &[data-position='bottom-left'] {
    bottom: var(--space);
    left: var(--space);
  }

  &[data-position='bottom-center'] {
    bottom: var(--space);
    left: 50%;
    transform: translateX(-50%);
  }

  &[data-position='top-right'] {
    top: var(--space);
    right: var(--space);
  }

  &[data-position='top-left'] {
    top: var(--space);
    left: var(--space);
  }
}

/* 2. The Container: Stacks toasts dynamically */
.toast-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Keeps them centered if text lengths vary */
  gap: 8px;
}

/* 3. The Toast UI */
.toast-card {
  pointer-events: auto; /* Re-enable clicks specifically for the toast */
  cursor: pointer;
  padding: 12px 24px;
  background-color: var(--md-sys-color-inverse-surface, #313033);
  color: var(--md-sys-color-inverse-on-surface, #f4eff4);
  font-size: 0.875rem;
  border-radius: var(--md-sys-shape-small);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);

  width: max-content;
  /* 2. Prevent the text from squishing into multiple lines during the exit */
  white-space: nowrap;
}

/* 4. The Magic TransitionGroup Animations */
.toast-list-enter-active,
.toast-list-leave-active,
.toast-list-move {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* Ensures smooth sliding when an item is removed from the middle of the list */
.toast-list-leave-active {
  position: absolute;
}

.toaster-viewport[data-position^='top-'] .toast-list-enter-from,
.toaster-viewport[data-position^='top-'] .toast-list-leave-to {
  transform: translateY(-20px) scale(0.9);
}
</style>
