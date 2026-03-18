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
  background-color: var(--mbc-badge-outlined-background);
  color: var(--mbc-badge-outlined-color);
  padding: var(--mbc-badge-outlined-padding);
  border: {
    style: solid;
    width: 1px;
    color: var(--mbc-badge-outlined-color);
    radius: var(--mbc-badge-outlined-shape);
  }
  font: {
    family: 'Funnel Display';
    size: var(--mbc-badge-outlined-font-size);
    weight: 550;
  }
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: var(--md-sys-padding-extra-small);
  --md-icon-size: var(--md-sys-shape-large-increased);
}
</style>
