<script setup lang="ts">
/* Колонка сетки (span из 12) либо flex. */
import { computed } from 'vue'
const props = defineProps({
  span: { type: [Number, null], default: null },
  offset: { type: Number, default: 0 },
  flex: { type: [String, Number, null], default: null },
})
const style = computed(() => {
  const s: any = {}
  if (props.flex != null) s.flex = String(props.flex)
  else if (props.span != null) { const w = (props.span / 12 * 100) + '%'; s.flexBasis = w; s.maxWidth = w }
  else s.flex = '1 1 0'
  if (props.offset) s.marginLeft = (props.offset / 12 * 100) + '%'
  return s
})
</script>

<template>
  <div class="kui-col" :style="style"><slot /></div>
</template>
