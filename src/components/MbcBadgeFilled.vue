<script setup lang="ts">
export interface Props {
  label?: string | number
}

defineProps<Props>()
</script>

<template>
  <span class="badge">
    <slot name="icon" />
    <slot> {{ label }} </slot>
    <slot name="icon-right" />
  </span>
</template>

<style lang="scss" scoped>
.badge {
  background-color: var(--mbc-badge-filled-background);
  color: var(--mbc-badge-filled-color);
  padding: var(--mbc-badge-filled-padding);
  border-radius: var(--mbc-badge-filled-shape);
  font: {
    family: 'Funnel Display';
    size: var(--mbc-badge-filled-font-size);
    weight: 550;
  }
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-padding-extra-small);
  --md-icon-size: var(--md-sys-shape-large-increased);
}
</style>
