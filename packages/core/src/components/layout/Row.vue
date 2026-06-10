<script setup lang="ts">
/* Флекс-ряд сетки. gutter — число или [x,y]. */
import { computed } from 'vue'
const props = defineProps({
  gutter: { type: [Number, Array], default: 16 },
  align: { type: String, default: 'stretch' },
  justify: { type: String, default: 'start' },
  wrap: { type: Boolean, default: true },
})
const gx = computed(() => Array.isArray(props.gutter) ? props.gutter[0] : props.gutter)
const gy = computed(() => Array.isArray(props.gutter) ? props.gutter[1] : 0)
const jmap: Record<string,string> = { start: 'flex-start', end: 'flex-end', center: 'center', between: 'space-between', around: 'space-around' }
</script>

<template>
  <div class="kui-row" :style="{ columnGap: gx + 'px', rowGap: gy + 'px', alignItems: align, justifyContent: jmap[justify] || 'flex-start', flexWrap: wrap ? 'wrap' : 'nowrap' }"><slot /></div>
</template>
