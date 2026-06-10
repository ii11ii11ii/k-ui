<script setup lang="ts">
/* Бейдж статуса: точка + подпись. РАЗВЯЗАН от данных приложения.
   Два режима:
     1) прямой   — <StatusBadge tone="green" label="Активен" />
     2) по карте — <StatusBadge :status="row.status" :meta="statusMeta" />
        где meta: Record<string, { tone, label }> (передаётся приложением). */
import { computed } from 'vue'
import { STATUS_TONES, type ToneName } from '../../utils/tones'

interface StatusMetaEntry { tone: ToneName; label: string }

const props = defineProps<{
  tone?: ToneName
  label?: string
  status?: string
  meta?: Record<string, StatusMetaEntry>
  size?: 'sm' | 'md' | 'lg'
}>()

const resolved = computed<StatusMetaEntry>(() => {
  if (props.status && props.meta && props.meta[props.status]) return props.meta[props.status]
  return { tone: (props.tone || 'gray') as ToneName, label: props.label ?? props.status ?? '' }
})
const tone = computed(() => STATUS_TONES[resolved.value.tone] || STATUS_TONES.gray)
const size = computed(() => props.size || 'md')
</script>

<template>
  <span :class="`status-badge st-${size}`" :style="{ background: tone.bg, color: tone.fg }">
    <span class="status-dot" :style="{ background: tone.dot }"></span>
    {{ resolved.label }}
  </span>
</template>
