<script setup lang="ts">
/* Выбор цвета: палитра-свотчи + опц. произвольный (нативный input). v-model — hex. */
const props = defineProps({
  modelValue: { type: String, default: '' },
  swatches: { type: Array, default: () => ['#2A6FDB','#1F8A5B','#D97757','#8B5CF6','#E11D48','#F59E0B','#0EA5E9','#10B981','#6B7280','#111827'] },
  allowCustom: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
function pick(c: string){ if (props.disabled) return; emit('update:modelValue', c); emit('change', c) }
</script>

<template>
  <div :class="['k-colorpicker', disabled ? 'is-disabled' : '']">
    <button v-for="c in swatches" :key="c" type="button" :class="['k-color-sw', modelValue && modelValue.toLowerCase() === c.toLowerCase() ? 'is-on' : '']"
      :style="{ background: c }" :title="c" @click="pick(c)"></button>
    <label v-if="allowCustom" class="k-color-custom" :style="{ background: modelValue || 'transparent' }" title="Произвольный цвет">
      <input type="color" :value="modelValue || '#000000'" :disabled="disabled" @input="pick($event.target.value)" />
    </label>
  </div>
</template>
