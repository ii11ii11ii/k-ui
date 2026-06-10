<script setup lang="ts">
/* Чекбокс. Standalone (v-model:modelValue) или в составе CheckboxGroup (по :value). */
import { computed, inject } from 'vue'
import Icon from '../ui/Icon.vue'
import { CheckboxGroupKey } from './groupKeys'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  value: { default: undefined },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
const group = inject(CheckboxGroupKey, null as any)
const checked = computed(() => group ? group.value.includes(props.value) : props.modelValue)
const isDisabled = computed(() => props.disabled || (group && group.disabled))
function toggle(){
  if (isDisabled.value) return
  if (group) group.toggle(props.value)
  else { emit('update:modelValue', !props.modelValue); emit('change', !props.modelValue) }
}
</script>

<template>
  <label :class="['kui-check', checked ? 'is-on' : '', indeterminate ? 'is-indet' : '', isDisabled ? 'is-disabled' : '']">
    <span class="kui-check-box" role="checkbox" :aria-checked="indeterminate ? 'mixed' : checked" tabindex="0"
      @click="toggle" @keydown.space.prevent="toggle" @keydown.enter.prevent="toggle">
      <Icon v-if="checked && !indeterminate" name="checkMark" :size="13" class="kui-check-mark" />
      <span v-else-if="indeterminate" class="kui-check-dash"></span>
    </span>
    <span v-if="label || $slots.default" class="kui-check-label"><slot>{{ label }}</slot></span>
  </label>
</template>
