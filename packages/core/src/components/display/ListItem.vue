<script setup lang="ts">
/* Строка списка: префикс (иконка/слот) + заголовок/описание + суффикс. */
import Icon from '../ui/Icon.vue'
defineProps({ title: { type: String, default: '' }, description: { type: String, default: '' }, icon: { type: String, default: '' }, clickable: { type: Boolean, default: false } })
defineEmits(['click'])
</script>

<template>
  <div :class="['kui-list-item', clickable ? 'is-clickable' : '']" @click="$emit('click', $event)">
    <span v-if="icon || $slots.prefix" class="kui-list-prefix"><slot name="prefix"><Icon :name="icon" :size="18" /></slot></span>
    <div class="kui-list-main">
      <div v-if="title || $slots.default" class="kui-list-title"><slot>{{ title }}</slot></div>
      <div v-if="description" class="kui-list-desc">{{ description }}</div>
    </div>
    <div v-if="$slots.suffix" class="kui-list-suffix"><slot name="suffix" /></div>
  </div>
</template>
