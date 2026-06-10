<script setup lang="ts">
/* Табы. tabs:[{id,label,icon?,count?}]. v-model — id активной вкладки. */
import Icon from '../ui/Icon.vue'
defineProps({
  tabs: { type: Array, required: true },
  modelValue: { default: undefined },
})
defineEmits(['update:modelValue','change'])
</script>

<template>
  <div class="order-tabs" role="tablist">
    <button v-for="t in tabs" :key="t.id" role="tab" :aria-selected="modelValue === t.id"
      :class="['order-tab', modelValue === t.id ? 'is-on' : '']" @click="$emit('update:modelValue', t.id); $emit('change', t.id)">
      <Icon v-if="t.icon" :name="t.icon" :size="15" />
      {{ t.label }}
      <span v-if="t.count != null" class="tab-count">{{ t.count }}</span>
    </button>
  </div>
</template>
