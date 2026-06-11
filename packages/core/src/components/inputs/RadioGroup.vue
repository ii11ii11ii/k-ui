<script setup lang="ts">
/* Группа радиокнопок. v-model — выбранное значение. options:[{value,label,disabled}] или слот. */
import { provide } from 'vue'
import Radio from './Radio.vue'
import { RadioGroupKey } from './groupKeys'
const props = defineProps({
  modelValue: { default: undefined },
  options: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
function pick(v){ emit('update:modelValue', v); emit('change', v) }
provide(RadioGroupKey, { get value(){ return props.modelValue }, pick, get disabled(){ return props.disabled }, name: 'k-radio' })
</script>

<template>
  <div :class="['k-radio-group', inline ? 'is-inline' : '']" role="radiogroup">
    <slot><Radio v-for="o in options" :key="o.value" :value="o.value" :label="o.label" :disabled="o.disabled" /></slot>
  </div>
</template>
