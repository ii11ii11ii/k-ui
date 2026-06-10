<script setup lang="ts">
/* Кольцевая диаграмма (статусы подписок). segments:[{label,value,color}]; center:{v,k}. */
import { computed } from 'vue'

const props = defineProps({
  segments: { type: Array, required: true },
  size: { type: Number, default: 156 },
  thickness: { type: Number, default: 20 },
  center: { type: Object, default: null },
})
const total = computed(() => props.segments.reduce((s, x) => s + x.value, 0) || 1)
const r = computed(() => (props.size - props.thickness) / 2)
const C = computed(() => 2 * Math.PI * r.value)
const segs = computed(() => {
  let acc = 0
  return props.segments.map((s) => {
    const frac = s.value / total.value
    const dash = `${frac * C.value} ${C.value - frac * C.value}`
    const off = -acc * C.value
    acc += frac
    return { ...s, dash, off }
  })
})
</script>

<template>
  <div class="ddonut">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <circle :cx="size / 2" :cy="size / 2" :r="r" class="dd-track" :stroke-width="thickness" fill="none" />
      <circle v-for="(s, i) in segs" :key="i" :cx="size / 2" :cy="size / 2" :r="r" :stroke="s.color" :stroke-width="thickness"
        fill="none" :stroke-dasharray="s.dash" :stroke-dashoffset="s.off" stroke-linecap="butt"
        :transform="`rotate(-90 ${size / 2} ${size / 2})`" class="dd-seg" />
      <template v-if="center">
        <text :x="size / 2" :y="size / 2 - 2" class="dd-center-v" text-anchor="middle">{{ center.v }}</text>
        <text :x="size / 2" :y="size / 2 + 16" class="dd-center-k" text-anchor="middle">{{ center.k }}</text>
      </template>
    </svg>
  </div>
</template>
