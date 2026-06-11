<script setup lang="ts">
/* Оценка звёздами. v-model — число 0..max. */
import { ref } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ modelValue: { type: Number, default: 0 }, max: { type: Number, default: 5 }, readonly: { type: Boolean, default: false }, allowClear: { type: Boolean, default: true }, size: { type: Number, default: 22 } })
const emit = defineEmits(['update:modelValue','change'])
const hover = ref(0)
function set(n: number){ if (props.readonly) return; const v = (props.allowClear && n === props.modelValue) ? 0 : n; emit('update:modelValue', v); emit('change', v) }
</script>

<template>
  <div :class="['k-rate', readonly ? 'is-readonly' : '']" @mouseleave="hover = 0">
    <button v-for="i in max" :key="i" type="button" class="k-rate-star" :class="(hover || modelValue) >= i ? 'is-on' : ''"
      @mouseenter="hover = i" @click="set(i)"><Icon :name="(hover || modelValue) >= i ? 'starFill' : 'star'" :size="size" /></button>
  </div>
</template>
