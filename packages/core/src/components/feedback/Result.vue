<script setup lang="ts">
/* Полностраничный результат: success|error|warning|info + заголовок/подзаголовок/действия. */
import Icon from '../ui/Icon.vue'
const props = defineProps({
  status: { type: String, default: 'info' },
  icon: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})
const iconMap: Record<string,string> = { success: 'check', error: 'close', warning: 'alert', info: 'info' }
</script>

<template>
  <div :class="['k-result', 'k-result-' + status]">
    <span class="k-result-ico"><Icon :name="icon || iconMap[status] || 'info'" :size="30" /></span>
    <div v-if="title" class="k-result-title">{{ title }}</div>
    <div v-if="subtitle || $slots.subtitle" class="k-result-sub"><slot name="subtitle">{{ subtitle }}</slot></div>
    <div v-if="$slots.default" class="k-result-actions"><slot /></div>
  </div>
</template>
