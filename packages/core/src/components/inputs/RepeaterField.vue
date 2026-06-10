<script setup lang="ts">
/* Повторяющиеся строки формы (add/remove). v-model — массив.
   Слот #row="{ item, index, update }" — содержимое строки. template — шаблон новой строки. */
import Icon from '../ui/Icon.vue'
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  addLabel: { type: String, default: 'Добавить' },
  template: { default: '' },
  min: { type: Number, default: 0 },
})
const emit = defineEmits(['update:modelValue','add','remove'])
function clone(v: any){ return (v && typeof v === 'object') ? JSON.parse(JSON.stringify(v)) : v }
function update(i: number, val: any){ const arr = props.modelValue.slice(); arr[i] = val; emit('update:modelValue', arr) }
function remove(i: number){ if (props.modelValue.length <= props.min) return; const arr = props.modelValue.slice(); arr.splice(i, 1); emit('update:modelValue', arr); emit('remove', i) }
function add(){ const arr = props.modelValue.slice(); arr.push(clone(props.template)); emit('update:modelValue', arr); emit('add') }
</script>

<template>
  <div class="kui-repeater">
    <div v-for="(item, i) in modelValue" :key="i" class="kui-repeater-row">
      <div class="kui-repeater-main"><slot name="row" :item="item" :index="i" :update="(v: any) => update(i, v)">{{ item }}</slot></div>
      <button type="button" class="kui-repeater-del" :disabled="modelValue.length <= min" title="Удалить" @click="remove(i)"><Icon name="trash" :size="15" /></button>
    </div>
    <button type="button" class="kui-repeater-add" @click="add"><Icon name="plus" :size="15" />{{ addLabel }}</button>
  </div>
</template>
