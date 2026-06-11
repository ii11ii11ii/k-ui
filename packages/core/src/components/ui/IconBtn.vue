<script setup lang="ts">
/* Иконочная кнопка с подсказкой и опциональным бейджем-счётчиком. */
import Icon from './Icon.vue'

defineProps({
  name: { type: String, required: true },
  label: { type: String, default: '' },
  active: { type: Boolean, default: false },
  danger: { type: Boolean, default: false },
  size: { type: Number, default: 18 },
  badge: { type: [Number, String], default: null },
})
defineEmits(['click'])
</script>

<template>
  <button :class="['k-icon-btn', active ? 'is-active' : '', danger ? 'is-danger' : '']"
    :title="label" :aria-label="label" @click="$emit('click', $event)">
    <Icon :name="name" :size="size" />
    <span v-if="badge != null && badge !== false" class="k-icon-btn-badge">{{ badge }}</span>
  </button>
</template>
