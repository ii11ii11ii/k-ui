<script setup lang="ts">
/* Area + Line — две серии по месяцам (область + линия). data:[{label,a,b,partial?}]. */
import { ref, computed } from 'vue'
import { useMeasure } from '../../composables/useMeasure'

const props = defineProps({
  data: { type: Array, required: true },
  height: { type: Number, default: 248 },
  aLabel: { type: String, default: 'A' },
  bLabel: { type: String, default: 'B' },
  tickFmt: { type: Function, default: (v) => v },
  valFmt: { type: Function, default: (v) => v },
  step: { type: Number, default: null },
})
const [measureRef, w] = useMeasure()
const hi = ref(null)

const W = computed(() => Math.max(w.value, 280))
const H = computed(() => props.height)
const padL = 40, padR = 14, padT = 16, padB = 26
const iw = computed(() => W.value - padL - padR)
const ih = computed(() => H.value - padT - padB)
const maxV = computed(() => Math.max(...props.data.flatMap((d) => [d.a, d.b]), 1))
const st = computed(() => props.step || Math.max(1, Math.ceil(maxV.value / 4)))
const top = computed(() => Math.ceil(maxV.value / st.value) * st.value)
const x = (i) => padL + (props.data.length <= 1 ? iw.value / 2 : (i / (props.data.length - 1)) * iw.value)
const y = (v) => padT + ih.value - (v / top.value) * ih.value
const ticks = computed(() => { const a = []; for (let v = 0; v <= top.value; v += st.value) a.push(v); return a })

const linePts = computed(() => props.data.map((d, i) => `${x(i)},${y(d.b)}`).join(' '))
const areaPath = computed(() => {
  const areaTop = props.data.map((d, i) => `${x(i)},${y(d.a)}`).join(' L')
  return `M${padL},${y(0)} L${x(0)},${y(props.data[0].a)} L${areaTop} L${x(props.data.length - 1)},${y(0)} Z`
})
const aLine = computed(() => 'M' + props.data.map((d, i) => `${x(i)},${y(d.a)}`).join(' L'))
const tipLeft = computed(() => (hi.value != null ? Math.min(Math.max(x(hi.value), 70), W.value - 70) : 0))
</script>

<template>
  <div class="dchart" ref="measureRef" :style="{ height: H + 'px' }" @mouseleave="hi = null">
    <svg :width="W" :height="H" role="img">
      <defs>
        <linearGradient id="dcArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="oklch(0.6 0.18 var(--brand-h1))" stop-opacity="0.32" />
          <stop offset="1" stop-color="oklch(0.6 0.18 var(--brand-h1))" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <g v-for="(v, i) in ticks" :key="'t' + i">
        <line :x1="padL" :y1="y(v)" :x2="W - padR" :y2="y(v)" class="dc-grid" />
        <text :x="padL - 8" :y="y(v) + 3.5" class="dc-axis" text-anchor="end">{{ tickFmt(v) }}</text>
      </g>
      <path :d="areaPath" fill="url(#dcArea)" />
      <path :d="aLine" class="dc-rev-line" />
      <polyline :points="linePts" class="dc-mrr-line" />
      <circle v-for="(d, i) in data" :key="'m' + i" :cx="x(i)" :cy="y(d.b)" :r="hi === i ? 4.5 : 0" class="dc-mrr-dot" />
      <g v-if="hi != null">
        <line :x1="x(hi)" :y1="padT" :x2="x(hi)" :y2="padT + ih" class="dc-guide" />
        <circle :cx="x(hi)" :cy="y(data[hi].a)" r="4" class="dc-rev-dot" />
        <circle :cx="x(hi)" :cy="y(data[hi].b)" r="4.5" class="dc-mrr-dot" />
      </g>
      <text v-for="(d, i) in data" :key="'x' + i" :x="x(i)" :y="H - 8" :class="['dc-xlabel', d.partial ? 'is-partial' : '']" text-anchor="middle">{{ d.label }}</text>
      <rect v-for="(d, i) in data" :key="'h' + i" :x="x(i) - (iw / data.length) / 2" :y="padT" :width="iw / data.length" :height="ih" fill="transparent" @mouseenter="hi = i" />
    </svg>
    <div v-if="hi != null" class="dc-tip" :style="{ left: tipLeft + 'px' }">
      <div class="dc-tip-h">{{ data[hi].label }}{{ data[hi].partial ? ' · неполный' : '' }}</div>
      <div class="dc-tip-row"><span class="dc-tip-k"><i class="dc-sw sw-rev"></i>{{ aLabel }}</span><span class="dc-tip-v mono">{{ valFmt(data[hi].a) }}</span></div>
      <div class="dc-tip-row"><span class="dc-tip-k"><i class="dc-sw sw-mrr"></i>{{ bLabel }}</span><span class="dc-tip-v mono">{{ valFmt(data[hi].b) }}</span></div>
    </div>
  </div>
</template>
