<script setup lang="ts">
/* Аватар с инициалами, цвет — детерминированный hue по имени. */
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, default: '?' },
  size: { type: Number, default: 26 },
})
const initials = computed(() =>
  (props.name || '?').replace(/[«»"(),.]/g, '').trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase())
const hue = computed(() => Array.from(props.name || '').reduce((a, c) => a + c.charCodeAt(0), 0) % 360)
</script>

<template>
  <span class="k-avatar" :style="{ width: size + 'px', height: size + 'px', fontSize: (size * 0.42) + 'px', background: `oklch(0.62 0.12 ${hue})` }">{{ initials }}</span>
</template>
