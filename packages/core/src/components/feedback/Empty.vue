<script setup lang="ts">
/* Пустое состояние списка/таблицы. */
import Icon from '../ui/Icon.vue'
defineProps({
  icon: { type: String, default: 'box' },
  title: { type: String, default: 'Нет данных' },
  hint: { type: String, default: '' },
})
</script>

<template>
  <div class="kui-empty">
    <span class="kui-empty-ico"><Icon :name="icon" :size="26" /></span>
    <div class="kui-empty-title">{{ title }}</div>
    <div v-if="hint || $slots.hint" class="kui-empty-hint"><slot name="hint">{{ hint }}</slot></div>
    <div v-if="$slots.default" class="kui-empty-actions"><slot /></div>
  </div>
</template>
