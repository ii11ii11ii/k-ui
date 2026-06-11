<script setup lang="ts">
/* Числовое поле со степпером (+/-, min/max/step, clamp, suffix). v-model. */
import { computed } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({
  modelValue: { type: [Number, null], default: null },
  min: { type: [Number, null], default: null },
  max: { type: [Number, null], default: null },
  step: { type: Number, default: 1 },
  suffix: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  mono: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue','change'])
function clamp(n){ if (n==null) return n; if (props.min!=null) n=Math.max(props.min,n); if (props.max!=null) n=Math.min(props.max,n); return n }
function parse(v){ const n = parseFloat(String(v).replace(/\s/g,'').replace(',','.')); return isNaN(n) ? null : n }
function set(n){ const c = clamp(n); emit('update:modelValue', c); emit('change', c) }
function onInput(e){ set(parse(e.target.value)) }
function bump(d){ if (props.disabled) return; const base = props.modelValue==null ? (props.min!=null?props.min:0) : props.modelValue; set(base + d*props.step) }
const canDec = computed(() => !props.disabled && (props.min==null || (props.modelValue ?? props.min) > props.min))
const canInc = computed(() => !props.disabled && (props.max==null || (props.modelValue ?? props.max) < props.max))
</script>

<template>
  <div :class="['k-num', invalid ? 'is-invalid' : '', disabled ? 'is-disabled' : '']">
    <button type="button" class="k-num-btn" :disabled="!canDec" tabindex="-1" @click="bump(-1)"><Icon name="minus" :size="15" /></button>
    <input :class="['k-num-input', mono ? 'mono' : '']" :value="modelValue==null ? '' : modelValue" :placeholder="placeholder" :disabled="disabled" inputmode="decimal" @input="onInput" />
    <span v-if="suffix" class="k-num-suffix">{{ suffix }}</span>
    <button type="button" class="k-num-btn" :disabled="!canInc" tabindex="-1" @click="bump(1)"><Icon name="plus" :size="15" /></button>
  </div>
</template>
