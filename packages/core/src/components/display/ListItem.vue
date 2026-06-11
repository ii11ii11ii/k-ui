<script setup lang="ts">
/* Строка списка: префикс (иконка/слот) + заголовок/описание + суффикс. */
import Icon from '../ui/Icon.vue'
defineProps({ title: { type: String, default: '' }, description: { type: String, default: '' }, icon: { type: String, default: '' }, clickable: { type: Boolean, default: false } })
defineEmits(['click'])
</script>

<template>
  <div :class="['k-list-item', clickable ? 'is-clickable' : '']" @click="$emit('click', $event)">
    <span v-if="icon || $slots.prefix" class="k-list-prefix"><slot name="prefix"><Icon :name="icon" :size="18" /></slot></span>
    <div class="k-list-main">
      <div v-if="title || $slots.default" class="k-list-title"><slot>{{ title }}</slot></div>
      <div v-if="description" class="k-list-desc">{{ description }}</div>
    </div>
    <div v-if="$slots.suffix" class="k-list-suffix"><slot name="suffix" /></div>
  </div>
</template>
