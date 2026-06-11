<script setup lang="ts">
/* Равномерные отступы между детьми. direction: horizontal|vertical. */
import { computed } from 'vue'
const props = defineProps({
  direction: { type: String, default: 'horizontal' },
  size: { type: [Number, String], default: 'md' },
  align: { type: String, default: 'center' },
  wrap: { type: Boolean, default: false },
})
const sizes: Record<string,number> = { sm: 6, md: 10, lg: 16, xl: 24 }
const gap = computed(() => typeof props.size === 'number' ? props.size : (sizes[props.size] || 10))
</script>

<template>
  <div class="k-space" :style="{ display: 'inline-flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: gap + 'px', alignItems: align, flexWrap: wrap ? 'wrap' : 'nowrap' }"><slot /></div>
</template>
