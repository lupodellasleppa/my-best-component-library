<script setup lang="ts">
import '@material/web/chips/assist-chip.js'
import { useToast } from '../composables/useToast.ts'
import { useClipboard } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps<{
  text: string
}>()

const { text, copy, copied, isSupported } = useClipboard({
  source: props.text,
})

const toast = useToast()

async function copyBookingSerial() {
  await copy(props.text)
  if (copied.value) {
    toast.show(`${text.value} copied to clipboard`)
  } else {
    toast.show(`${text.value} failed to copy to clipboard`)
  }
}
const displayLabel = ref(props.text)
const displayIcon = ref('content_copy')

watch(copied, () => {
  if (copied.value) {
    displayLabel.value = 'Copied!'
    displayIcon.value = 'check'
  } else {
    displayLabel.value = props.text
    displayIcon.value = 'content_copy'
  }
})
</script>

<template>
  <md-icon-button
    class="copy-button"
    :disabled="!isSupported"
    @click="copyBookingSerial"
  >
    <md-icon>{{ displayIcon }}</md-icon>
  </md-icon-button>
</template>

<style lang="scss" scoped>
.copy-button {
  --md-icon-button-icon-size: var(--mbc-copy-button-icon-size);
}
</style>
