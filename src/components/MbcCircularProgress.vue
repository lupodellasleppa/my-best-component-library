<script setup lang="ts">
import '@material/web/progress/circular-progress.js'

const props = defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="progress-container">
    <md-circular-progress indeterminate />
    {{ text || 'Loading...' }}
  </div>
</template>

<style lang="scss" scoped>
.progress-container {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: var(--md-sys-shape-medium);
}
</style>
