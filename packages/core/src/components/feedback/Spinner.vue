<script setup lang="ts">
/* Индикатор загрузки (кольцо). size — число (px) или строка. */
const props = defineProps({
  size: { type: [Number, String], default: 20 },
  stroke: { type: Number, default: 2 },
  label: { type: String, default: '' },
})
const dim = (v: any) => (typeof v === 'number' ? v + 'px' : v)
</script>

<template>
  <span class="kui-spinner" role="status" :aria-label="label || 'Загрузка'">
    <span class="kui-spinner-ring" :style="{ width: dim(props.size), height: dim(props.size), borderWidth: stroke + 'px' }"></span>
    <span v-if="label" class="kui-spinner-label">{{ label }}</span>
  </span>
</template>
