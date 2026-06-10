<script setup lang="ts">
/* Горизонтальные полосы (тарифы, источники). items:[{label,value,hue?}]. */
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  valText: { type: Function, default: null },
})
const max = computed(() => Math.max(...props.items.map((i) => i.value), 1))
</script>

<template>
  <div class="dhbars">
    <div v-for="(it, i) in items" :key="i" class="dhbar">
      <span class="dhbar-label truncate" :title="it.label">{{ it.label }}</span>
      <span class="dhbar-track">
        <span class="dhbar-fill" :style="{ width: Math.max((it.value / max) * 100, 2) + '%', background: `oklch(0.62 0.17 ${it.hue != null ? it.hue : 'var(--brand-h1)'})` }"></span>
      </span>
      <span class="dhbar-val mono">{{ valText ? valText(it) : it.value }}</span>
    </div>
  </div>
</template>
