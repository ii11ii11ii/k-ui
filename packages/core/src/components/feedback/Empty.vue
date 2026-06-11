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
  <div class="k-empty">
    <span class="k-empty-ico"><Icon :name="icon" :size="26" /></span>
    <div class="k-empty-title">{{ title }}</div>
    <div v-if="hint || $slots.hint" class="k-empty-hint"><slot name="hint">{{ hint }}</slot></div>
    <div v-if="$slots.default" class="k-empty-actions"><slot /></div>
  </div>
</template>
