<script setup lang="ts">
import { useSlots, computed } from 'vue'

const slots = useSlots()

const currentStep = defineModel<number>({ default: 0 })

// Get step titles from the slot children's props
const steps = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []
  return defaultSlot.map((vnode, i) => ({
    title: vnode.props?.title || `Step ${i + 1}`,
  }))
})

const totalSteps = computed(() => steps.value.length)

function nextStep() {
  if (currentStep.value < totalSteps.value - 1) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

defineExpose({
  nextStep,
  prevStep,
})
</script>

<template>
  <div class="stepper">
    <div class="stepper-header">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step"
        :class="{
          active: index === currentStep,
          completed: index < currentStep,
        }"
        @click="currentStep = index"
      >
        <div class="step-indicator">
          <span v-if="index >= currentStep">{{ index + 1 }}</span>
          <md-icon v-else>check</md-icon>
        </div>
        <div class="step-label">{{ step.title }}</div>
      </div>
    </div>

    <div class="stepper-content">
      <slot :name="`step-${currentStep + 1}`" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stepper {
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-padding-large);
  width: 100%;
}

.stepper-header {
  display: flex;
  gap: var(--md-sys-padding-medium);
  justify-content: space-around;
  border-bottom: 1px solid var(--md-sys-color-outline-variant);
  padding-bottom: var(--md-sys-padding-medium);
}

.step {
  display: flex;
  align-items: center;
  gap: var(--md-sys-padding-small);
  cursor: pointer;
  color: var(--md-sys-color-on-surface-variant);

  .step-indicator {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--md-sys-color-surface-container-highest);
    color: var(--md-sys-color-on-surface-variant);
    display: grid;
    place-content: center;
    font-size: 0.875rem;
  }

  &.active {
    color: var(--md-sys-color-primary);
    .step-indicator {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }
  }

  &.completed {
    color: var(--md-sys-color-on-surface);
    .step-indicator {
      background-color: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }
  }
}
</style>
