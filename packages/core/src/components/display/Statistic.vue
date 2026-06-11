<script setup lang="ts">
/* KPI-число: подпись + значение (tnum, nowrap) + префикс/суффикс + тренд. */
import Icon from '../ui/Icon.vue'
defineProps({
  label: { type: String, default: '' },
  value: { type: [String, Number], default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  trend: { type: [Number, null], default: null },
  icon: { type: String, default: '' },
})
</script>

<template>
  <div class="k-stat">
    <div class="k-stat-label"><Icon v-if="icon" :name="icon" :size="14" />{{ label }}</div>
    <div class="k-stat-value mono nowrap"><span v-if="prefix" class="k-stat-affix">{{ prefix }}</span>{{ value }}<span v-if="suffix" class="k-stat-affix">{{ suffix }}</span></div>
    <div v-if="trend != null" :class="['k-stat-trend', trend >= 0 ? 'is-up' : 'is-down']">{{ trend >= 0 ? '▲' : '▼' }} {{ Math.abs(trend) }}%</div>
  </div>
</template>
