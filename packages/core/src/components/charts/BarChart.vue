<script setup lang="ts">
/* Вертикальные столбцы (новые подписки по месяцам). data:[{label,value,partial?}]. */
import { ref, computed } from 'vue'
import { useMeasure } from '../../composables/useMeasure'

const props = defineProps({
  data: { type: Array, required: true },
  height: { type: Number, default: 150 },
  hue: { type: Number, default: null },
})
const [measureRef, w] = useMeasure()
const hi = ref(null)
const W = computed(() => Math.max(w.value, 240))
const H = computed(() => props.height)
const padT = 18, padB = 22
const ih = computed(() => H.value - padT - padB)
const max = computed(() => Math.max(...props.data.map((d) => d.value), 1))
const slot = computed(() => W.value / props.data.length)
const bw = computed(() => Math.min(slot.value * 0.56, 26))
const fill = (i) => `oklch(${hi.value === i ? '0.56' : '0.62'} 0.18 ${props.hue != null ? props.hue : 'var(--brand-h1)'})`
</script>

<template>
  <div class="dchart" ref="measureRef" :style="{ height: H + 'px' }" @mouseleave="hi = null">
    <svg :width="W" :height="H" role="img">
      <g v-for="(d, i) in data" :key="i" @mouseenter="hi = i">
        <rect :x="slot * i" :y="padT" :width="slot" :height="ih + padB" fill="transparent" />
        <rect :x="slot * i + slot / 2 - bw / 2" :y="padT + ih - Math.max((d.value / max) * ih, 2)"
          :width="bw" :height="Math.max((d.value / max) * ih, 2)" rx="4" :fill="fill(i)" :opacity="d.partial ? 0.55 : 1" class="dc-bar" />
        <text :x="slot * i + slot / 2" :y="padT + ih - Math.max((d.value / max) * ih, 2) - 5" class="dc-barval" text-anchor="middle">{{ d.value }}</text>
        <text :x="slot * i + slot / 2" :y="H - 6" :class="['dc-xlabel', d.partial ? 'is-partial' : '']" text-anchor="middle">{{ d.label }}</text>
      </g>
    </svg>
  </div>
</template>
