<script setup lang="ts">
/* Сегмент-контрол (tab-переключатель). options:[{value,icon?,label?}].
   v-model:value — текущий выбор. */
import Icon from './Icon.vue'

const props = defineProps({
  options: { type: Array, required: true },
  value: { required: true },
  size: { type: String, default: 'md' },
})
defineEmits(['update:value', 'change'])
</script>

<template>
  <div :class="`k-segmented k-segmented-${size}`" role="tablist">
    <button v-for="o in options" :key="o.value" role="tab" :aria-selected="value === o.value"
      :class="['k-segmented-item', value === o.value ? 'is-on' : '']"
      @click="$emit('update:value', o.value); $emit('change', o.value)">
      <Icon v-if="o.icon" :name="o.icon" :size="size === 'sm' ? 14 : 16" />
      <span v-if="o.label">{{ o.label }}</span>
    </button>
  </div>
</template>
