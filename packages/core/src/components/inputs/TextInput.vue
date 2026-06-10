<script setup lang="ts">
/* Базовое текстовое поле (.fld) с опц. иконкой и очисткой. v-model. */
import Icon from '../ui/Icon.vue'
const props = defineProps({
  modelValue: { default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  mono: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  clearable: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
})
const emit = defineEmits(['update:modelValue','input','change','enter'])
function onInput(e){ emit('update:modelValue', e.target.value); emit('input', e.target.value) }
</script>

<template>
  <div :class="['kui-input', icon ? 'has-icon' : '', invalid ? 'is-invalid' : '', disabled ? 'is-disabled' : '', size === 'sm' ? 'is-sm' : '']">
    <Icon v-if="icon" :name="icon" :size="16" class="kui-input-ico" />
    <input :class="['fld', mono ? 'mono' : '']" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      @input="onInput" @change="$emit('change', $event.target.value)" @keydown.enter="$emit('enter', $event.target.value)" />
    <button v-if="clearable && modelValue" type="button" class="kui-input-clear" @click="$emit('update:modelValue','')"><Icon name="close" :size="14" /></button>
  </div>
</template>
