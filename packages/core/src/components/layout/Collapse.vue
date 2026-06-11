<script setup lang="ts">
/* Аккордеон. v-model — массив открытых имён (или одно имя при accordion). */
import { provide } from 'vue'
const props = defineProps({
  modelValue: { type: [Array, String, Number], default: () => [] },
  accordion: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
function isOpen(name: any){ return props.accordion ? props.modelValue === name : (Array.isArray(props.modelValue) && props.modelValue.includes(name)) }
function toggle(name: any){
  let next: any
  if (props.accordion) next = props.modelValue === name ? '' : name
  else { const arr = Array.isArray(props.modelValue) ? props.modelValue.slice() : []; const i = arr.indexOf(name); if (i >= 0) arr.splice(i, 1); else arr.push(name); next = arr }
  emit('update:modelValue', next); emit('change', next)
}
provide('kCollapse', { isOpen, toggle })
</script>

<template>
  <div class="k-collapse"><slot /></div>
</template>
