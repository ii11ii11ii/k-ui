<script setup lang="ts">
/* Тон-бейдж: точка + подпись с произвольным тоном (для статусов вне statusMeta). */
import { computed } from 'vue'
import { STATUS_TONES } from '../../utils/tones'

const props = defineProps({
  tone: { type: String, default: 'gray' },
  label: { type: String, default: '' },
  size: { type: String, default: 'md' },
  dot: { type: Boolean, default: true },
})
const t = computed(() => STATUS_TONES[props.tone] || STATUS_TONES.gray)
</script>

<template>
  <span :class="`status-badge st-${size}`" :style="{ background: t.bg, color: t.fg }">
    <span v-if="dot" class="status-dot" :style="{ background: t.dot }"></span>
    {{ label }}
  </span>
</template>
