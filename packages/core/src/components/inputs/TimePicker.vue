<script setup lang="ts">
/* Время (часы:минуты). v-model — 'HH:MM'. minuteStep — шаг минут. */
import { computed } from 'vue'
const props = defineProps({ modelValue: { default: '' }, minuteStep: { type: Number, default: 5 }, disabled: { type: Boolean, default: false }, invalid: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue','change'])
const hh = computed(() => (props.modelValue || '').split(':')[0] || '')
const mm = computed(() => (props.modelValue || '').split(':')[1] || '')
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const minutes = computed(() => { const out = []; for (let i = 0; i < 60; i += props.minuteStep) out.push(String(i).padStart(2, '0')); return out })
function setH(e: any){ const v = e.target.value + ':' + (mm.value || '00'); emit('update:modelValue', v); emit('change', v) }
function setM(e: any){ const v = (hh.value || '00') + ':' + e.target.value; emit('update:modelValue', v); emit('change', v) }
</script>

<template>
  <div :class="['kui-timepicker', invalid ? 'is-invalid' : '', disabled ? 'is-disabled' : '']">
    <select class="kui-tp-sel" :value="hh" :disabled="disabled" @change="setH"><option value="" disabled>чч</option><option v-for="h in hours" :key="h" :value="h">{{ h }}</option></select>
    <span class="kui-tp-sep">:</span>
    <select class="kui-tp-sel" :value="mm" :disabled="disabled" @change="setM"><option value="" disabled>мм</option><option v-for="m in minutes" :key="m" :value="m">{{ m }}</option></select>
  </div>
</template>
