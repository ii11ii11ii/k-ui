<script setup lang="ts">
/* Кольцевой прогресс. value 0–100. tone — статусный или бренд по умолчанию. */
import { computed } from 'vue'
const props = defineProps({
  value: { type: Number, default: 0 },
  size: { type: Number, default: 64 },
  stroke: { type: Number, default: 6 },
  tone: { type: String, default: '' },
  showLabel: { type: Boolean, default: true },
})
const r = computed(() => (props.size - props.stroke) / 2)
const circ = computed(() => 2 * Math.PI * r.value)
const dash = computed(() => circ.value * (1 - Math.max(0, Math.min(100, props.value)) / 100))
const color = computed(() => props.tone ? 'var(--st-' + props.tone + '-dot)' : 'var(--brand-solid)')
</script>

<template>
  <div class="k-progress-circle" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" :viewBox="'0 0 ' + size + ' ' + size">
      <circle :cx="size / 2" :cy="size / 2" :r="r" fill="none" :stroke-width="stroke" stroke="var(--surface-3)" />
      <circle :cx="size / 2" :cy="size / 2" :r="r" fill="none" :stroke-width="stroke" :stroke="color" stroke-linecap="round"
        :stroke-dasharray="circ" :stroke-dashoffset="dash" :transform="'rotate(-90 ' + (size / 2) + ' ' + (size / 2) + ')'" />
    </svg>
    <span v-if="showLabel" class="k-progress-circle-label mono">{{ Math.round(value) }}%</span>
  </div>
</template>
