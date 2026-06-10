<script setup lang="ts">
/* Группа чекбоксов. v-model — массив выбранных. options:[{value,label,disabled}] или слот. */
import { provide } from 'vue'
import Checkbox from './Checkbox.vue'
import { CheckboxGroupKey } from './groupKeys'
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  options: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
function toggle(v){
  const arr = props.modelValue.slice()
  const i = arr.indexOf(v)
  if (i >= 0) arr.splice(i,1); else arr.push(v)
  emit('update:modelValue', arr); emit('change', arr)
}
provide(CheckboxGroupKey, { get value(){ return props.modelValue }, toggle, get disabled(){ return props.disabled } })
</script>

<template>
  <div :class="['kui-check-group', inline ? 'is-inline' : '']">
    <slot><Checkbox v-for="o in options" :key="o.value" :value="o.value" :label="o.label" :disabled="o.disabled" /></slot>
  </div>
</template>
