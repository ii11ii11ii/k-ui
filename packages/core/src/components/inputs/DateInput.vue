<script setup lang="ts">
/* Поле даты/времени (нативное, стиль .fld). type: date|datetime|time. v-model. */
defineProps({
  modelValue: { default: '' },
  type: { type: String, default: 'date' },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  min: { type: String, default: '' },
  max: { type: String, default: '' },
})
defineEmits(['update:modelValue','change'])
const native: Record<string,string> = { date: 'date', datetime: 'datetime-local', time: 'time' }
</script>

<template>
  <input :class="['fld', 'mono', invalid ? 'is-invalid' : '']" :type="native[type] || 'date'" :value="modelValue"
    :min="min || undefined" :max="max || undefined" :disabled="disabled"
    @input="$emit('update:modelValue', $event.target.value)" @change="$emit('change', $event.target.value)" />
</template>
