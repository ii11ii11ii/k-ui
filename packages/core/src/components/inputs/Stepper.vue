<script setup lang="ts">
/* Числовое поле со стрелками вверх/вниз (CRM-вариант): ввод текстом,
   ↑/↓ с клавиатуры, кламп по min/max, suffix-единица. v-model. */
import { computed } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({
  modelValue: { default: '' },
  min: { type: [Number, null], default: null },
  max: { type: [Number, null], default: null },
  step: { type: Number, default: 1 },
  suffix: { type: String, default: '' },
  mono: { type: Boolean, default: true },
  placeholder: { type: String, default: '' },
  width: { type: [Number, String, null], default: null },
  disabled: { type: Boolean, default: false },
  align: { type: String, default: 'left' },
  invalid: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
function num(v: any){ const n = parseFloat(String(v).replace(/\s/g, '').replace(',', '.')); return isNaN(n) ? null : n }
function clamp(n: any){ if (n == null) return n; if (props.min != null) n = Math.max(props.min, n); if (props.max != null) n = Math.min(props.max, n); return n }
function set(v: any){ emit('update:modelValue', v); emit('change', v) }
function bump(d: number){ if (props.disabled) return; const cur = num(props.modelValue); const base = cur == null ? (props.min != null ? props.min : 0) : cur; set(clamp(base + d * props.step)) }
const cur = computed(() => num(props.modelValue))
function onBlur(e: any){ const n = clamp(num(e.target.value)); set(n == null ? '' : n) }
const widthStyle = computed(() => props.width == null ? null : { width: typeof props.width === 'number' ? props.width + 'px' : props.width })
</script>

<template>
  <div :class="['k-stepper', disabled ? 'is-disabled' : '', invalid ? 'is-invalid' : '']" :style="widthStyle">
    <input :class="['k-stepper-input', mono ? 'mono' : '', align === 'right' ? 'ta-right' : '']" type="text" inputmode="decimal"
      :value="modelValue == null ? '' : modelValue" :placeholder="placeholder" :disabled="disabled"
      @input="set($event.target.value)" @blur="onBlur" @keydown.up.prevent="bump(1)" @keydown.down.prevent="bump(-1)" />
    <span v-if="suffix" class="k-stepper-suffix">{{ suffix }}</span>
    <span class="k-stepper-btns">
      <button type="button" class="k-stepper-btn k-stepper-up" tabindex="-1" :disabled="disabled || (max != null && cur != null && cur >= max)" aria-label="Увеличить" @click="bump(1)"><Icon name="chevronDown" :size="12" /></button>
      <button type="button" class="k-stepper-btn" tabindex="-1" :disabled="disabled || (min != null && cur != null && cur <= min)" aria-label="Уменьшить" @click="bump(-1)"><Icon name="chevronDown" :size="12" /></button>
    </span>
  </div>
</template>
