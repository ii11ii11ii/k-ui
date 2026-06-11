<script setup lang="ts">
/* Индикатор загрузки (CPU / RAM / Disk). value/max → процент.
   tone: 'auto' (по порогам warn/high) | 'ok' | 'warn' | 'high'. */
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  value: { type: Number, required: true },
  max: { type: Number, default: 100 },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  unit: { type: String, default: '%' },
  showVal: { type: Boolean, default: true },
  valText: { type: String, default: null },
  warn: { type: Number, default: 70 },
  high: { type: Number, default: 90 },
  tone: { type: String, default: 'auto' },
  minW: { type: [Number, String], default: null },
})
const pct = computed(() => (props.max > 0 ? Math.max(0, Math.min(100, (props.value / props.max) * 100)) : 0))
const lvl = computed(() => (props.tone !== 'auto' ? props.tone : (pct.value >= props.high ? 'high' : pct.value >= props.warn ? 'warn' : 'ok')))
const shown = computed(() => (props.valText != null ? props.valText : `${Math.round(pct.value)}${props.unit}`))
</script>

<template>
  <div :class="`k-meter k-meter-${lvl}`" :style="minW ? { minWidth: typeof minW === 'number' ? minW + 'px' : minW } : null">
    <div class="k-meter-top">
      <span class="k-meter-label"><Icon v-if="icon" :name="icon" :size="13" />{{ label }}</span>
      <span v-if="showVal" class="k-meter-val">{{ shown }}</span>
    </div>
    <div class="k-meter-track"><div class="k-meter-fill" :style="{ width: pct + '%' }"></div></div>
  </div>
</template>
