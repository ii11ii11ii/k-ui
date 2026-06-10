<script setup lang="ts">
/* Поле поиска (иконка + очистка). v-model, @search по Enter. */
import Icon from '../ui/Icon.vue'
defineProps({
  modelValue: { default: '' },
  placeholder: { type: String, default: 'Поиск…' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue','search'])
</script>

<template>
  <div :class="['kui-search', disabled ? 'is-disabled' : '']">
    <Icon name="search" :size="16" class="kui-search-ico" />
    <input class="kui-search-input" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)" @keydown.enter="$emit('search', modelValue)" />
    <button v-if="modelValue" type="button" class="kui-search-clear" @click="$emit('update:modelValue','')"><Icon name="close" :size="14" /></button>
  </div>
</template>
