<script setup lang="ts">
/* Перенос между списками. options:[{key,label,disabled?}]. v-model — массив ключей справа. */
import { ref, computed } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ modelValue: { type: Array, default: () => [] }, options: { type: Array, default: () => [] }, titles: { type: Array, default: () => ['Доступно','Выбрано'] } })
const emit = defineEmits(['update:modelValue','change'])
const selLeft = ref<any[]>([]); const selRight = ref<any[]>([])
const left = computed(() => (props.options as any[]).filter((o) => !(props.modelValue as any[]).includes(o.key)))
const right = computed(() => (props.options as any[]).filter((o) => (props.modelValue as any[]).includes(o.key)))
function toggle(arr: any, key: any){ const i = arr.value.indexOf(key); if (i >= 0) arr.value.splice(i, 1); else arr.value.push(key) }
function moveRight(){ const next = (props.modelValue as any[]).concat(selLeft.value); selLeft.value = []; emit('update:modelValue', next); emit('change', next) }
function moveLeft(){ const next = (props.modelValue as any[]).filter((k) => !selRight.value.includes(k)); selRight.value = []; emit('update:modelValue', next); emit('change', next) }
</script>

<template>
  <div class="kui-transfer">
    <div class="kui-transfer-panel">
      <div class="kui-transfer-head">{{ titles[0] }} <span class="kui-transfer-count">{{ left.length }}</span></div>
      <div class="kui-transfer-list">
        <label v-for="o in left" :key="o.key" :class="['kui-transfer-item', selLeft.includes(o.key) ? 'is-sel' : '']">
          <input type="checkbox" :checked="selLeft.includes(o.key)" :disabled="o.disabled" @change="toggle(selLeft, o.key)" />{{ o.label }}
        </label>
      </div>
    </div>
    <div class="kui-transfer-ctrl">
      <button type="button" class="btn btn-ghost btn-sm" :disabled="!selLeft.length" @click="moveRight"><Icon name="chevronRight" :size="15" /></button>
      <button type="button" class="btn btn-ghost btn-sm" :disabled="!selRight.length" @click="moveLeft"><Icon name="chevronLeft" :size="15" /></button>
    </div>
    <div class="kui-transfer-panel">
      <div class="kui-transfer-head">{{ titles[1] }} <span class="kui-transfer-count">{{ right.length }}</span></div>
      <div class="kui-transfer-list">
        <label v-for="o in right" :key="o.key" :class="['kui-transfer-item', selRight.includes(o.key) ? 'is-sel' : '']">
          <input type="checkbox" :checked="selRight.includes(o.key)" @change="toggle(selRight, o.key)" />{{ o.label }}
        </label>
      </div>
    </div>
  </div>
</template>
