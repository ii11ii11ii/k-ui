<script setup lang="ts">
/* Многострочное поле (.fld.fld-area). v-model. */
defineProps({
  modelValue: { default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 3 },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  resize: { type: String, default: 'vertical' },
})
defineEmits(['update:modelValue','change'])
</script>

<template>
  <textarea :class="['fld', 'fld-area', invalid ? 'is-invalid' : '']" :rows="rows" :value="modelValue" :placeholder="placeholder"
    :disabled="disabled" :style="{ resize }" @input="$emit('update:modelValue', $event.target.value)" @change="$emit('change', $event.target.value)"></textarea>
</template>
