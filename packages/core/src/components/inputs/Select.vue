<script setup lang="ts">
/* Нативный селект в стиле .fld. options:[{value,label}]. v-model. */
import Icon from '../ui/Icon.vue'
defineProps({
  modelValue: { default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
function onChange(e){ emit('update:modelValue', e.target.value); emit('change', e.target.value) }
</script>

<template>
  <div :class="['k-select', invalid ? 'is-invalid' : '', disabled ? 'is-disabled' : '']">
    <select class="k-input-field" :value="modelValue" :disabled="disabled" @change="onChange">
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
    <Icon name="chevronDown" :size="16" class="k-select-caret" />
  </div>
</template>
