<script setup lang="ts">
/* Мини-спарклайн для KPI-карточек. data: number[]. */
import { computed } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
  w: { type: Number, default: 96 },
  h: { type: Number, default: 30 },
  tone: { type: String, default: '' },
})
const ok = computed(() => props.data && props.data.length >= 2)
const min = computed(() => Math.min(...props.data))
const max = computed(() => Math.max(...props.data))
const span = computed(() => (max.value - min.value) || 1)
const x = (i) => (i / (props.data.length - 1)) * (props.w - 2) + 1
const y = (v) => props.h - 2 - ((v - min.value) / span.value) * (props.h - 4)
const line = computed(() => 'M' + props.data.map((v, i) => `${x(i)},${y(v)}`).join(' L'))
const area = computed(() => `${line.value} L${x(props.data.length - 1)},${props.h} L${x(0)},${props.h} Z`)
const col = computed(() => (props.tone === 'down' ? 'var(--st-red-dot)' : 'oklch(0.62 0.16 var(--brand-h1))'))
</script>

<template>
  <svg v-if="ok" class="dspark" :width="w" :height="h" :viewBox="`0 0 ${w} ${h}`" preserveAspectRatio="none">
    <path :d="area" :fill="col" opacity="0.12" />
    <path :d="line" fill="none" :stroke="col" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" />
  </svg>
</template>
