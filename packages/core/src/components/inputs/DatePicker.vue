<script setup lang="ts">
/* Поле даты с поповер-календарём. v-model — YMD-строка (2026-06-10). */
import { ref, computed } from 'vue'
import Icon from '../ui/Icon.vue'
import Calendar from '../ui/Calendar.vue'
import { kmtYmd, kmtFromYmd } from '../../utils/filters'
const props = defineProps({ modelValue: { default: '' }, placeholder: { type: String, default: 'Выберите дату' }, disabled: { type: Boolean, default: false }, invalid: { type: Boolean, default: false }, clearable: { type: Boolean, default: true } })
const emit = defineEmits(['update:modelValue','change'])
const open = ref(false)
const MON = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек']
const calVal = computed(() => props.modelValue ? { from: props.modelValue, to: props.modelValue } : null)
const display = computed(() => { if (!props.modelValue) return ''; const d = kmtFromYmd(props.modelValue); return d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear() })
function onPick(d: Date){ const v = kmtYmd(d); emit('update:modelValue', v); emit('change', v); open.value = false }
function clear(e: Event){ e.stopPropagation(); emit('update:modelValue', ''); emit('change', '') }
</script>

<template>
  <div class="kui-datepicker">
    <button type="button" :class="['kui-dp-field', invalid ? 'is-invalid' : '', disabled ? 'is-disabled' : '']" :disabled="disabled" @click="open = !open">
      <Icon name="calendar" :size="15" class="kui-dp-ico" />
      <span :class="['kui-dp-text', !modelValue ? 'is-ph' : '']">{{ display || placeholder }}</span>
      <span v-if="clearable && modelValue" class="kui-dp-clear" @click="clear"><Icon name="close" :size="13" /></span>
    </button>
    <template v-if="open">
      <div class="kui-pop-backdrop" @click="open = false"></div>
      <div class="kui-dp-pop"><Calendar :value="calVal" @pick="onPick" /></div>
    </template>
  </div>
</template>
