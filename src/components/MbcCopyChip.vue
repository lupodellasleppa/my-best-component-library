<script setup lang="ts">
import { useToast } from "../composables/useToast.ts";
import { useClipboard } from "@vueuse/core";
import { ref, watch } from "vue";

const props = defineProps<{
  text: string;
}>();

const { text, copy, copied, isSupported } = useClipboard({
  source: props.text,
});

const toast = useToast();

async function copyBookingSerial() {
  await copy(props.text);
  if (copied.value) {
    toast.show(`${text.value} copied to clipboard`);
  } else {
    toast.show(`${text.value} failed to copy to clipboard`);
  }
}
const displayLabel = ref(props.text);
const displayIcon = ref("content_copy");

watch(copied, () => {
  if (copied.value) {
    displayLabel.value = "Copied!";
    displayIcon.value = "check";
  } else {
    displayLabel.value = props.text;
    displayIcon.value = "content_copy";
  }
});
</script>

<template>
  <md-assist-chip class="copy-chip" :disabled="!isSupported" @click="copyBookingSerial">
    <md-icon slot="icon">{{ displayIcon }}</md-icon>
    {{ displayLabel }}
  </md-assist-chip>
</template>

<style lang="scss" scoped>
.copy-chip {
  --md-assist-chip-label-text-color: var(--md-sys-color-on-surface-variant);
  --md-assist-chip-label-text-size: 0.8rem;
  --md-assist-chip-label-text-font: "Geist Mono", monospace;
  --md-assist-chip-icon-size: 1rem;
  --md-assist-chip-container-height: 1.5rem;
  --md-assist-chip-label-text-weight: 350
}
</style>
