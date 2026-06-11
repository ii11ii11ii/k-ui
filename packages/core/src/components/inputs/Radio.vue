<script setup lang="ts">
/* Радиокнопка. Standalone (v-model) или в составе RadioGroup (по :value). */
import { computed, inject } from 'vue'
import { RadioGroupKey } from './groupKeys'
const props = defineProps({
  modelValue: { default: undefined },
  value: { default: undefined },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
const group = inject(RadioGroupKey, null as any)
const checked = computed(() => group ? group.value === props.value : props.modelValue === props.value)
const isDisabled = computed(() => props.disabled || (group && group.disabled))
function pick(){
  if (isDisabled.value) return
  if (group) group.pick(props.value)
  else { emit('update:modelValue', props.value); emit('change', props.value) }
}
</script>

<template>
  <label :class="['k-radio', checked ? 'is-on' : '', isDisabled ? 'is-disabled' : '']">
    <span class="k-radio-dot" role="radio" :aria-checked="checked" tabindex="0"
      @click="pick" @keydown.space.prevent="pick" @keydown.enter.prevent="pick"></span>
    <span v-if="label || $slots.default" class="k-radio-label"><slot>{{ label }}</slot></span>
  </label>
</template>
