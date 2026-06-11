<script setup lang="ts">
/* Слайдер (range). v-model. Заливка трека — через --k-slider-pct. */
import { computed } from 'vue'
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  showValue: { type: Boolean, default: false },
  suffix: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue','change'])
const pct = computed(() => { const r = props.max - props.min; return r ? ((props.modelValue - props.min) / r) * 100 : 0 })
</script>

<template>
  <div :class="['k-slider', disabled ? 'is-disabled' : '']">
    <input class="k-slider-input" type="range" :min="min" :max="max" :step="step" :value="modelValue" :disabled="disabled"
      :style="{ '--k-slider-pct': pct + '%' }"
      @input="$emit('update:modelValue', Number($event.target.value))" @change="$emit('change', modelValue)" />
    <span v-if="showValue" class="k-slider-val mono">{{ modelValue }}{{ suffix }}</span>
  </div>
</template>
