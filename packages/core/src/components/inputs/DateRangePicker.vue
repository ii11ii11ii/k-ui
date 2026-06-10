<script setup lang="ts">
/* Диапазон дат. v-model — [fromYmd, toYmd]. */
import { ref, computed } from 'vue'
import Icon from '../ui/Icon.vue'
import Calendar from '../ui/Calendar.vue'
import { kmtYmd, kmtFromYmd } from '../../utils/filters'
const props = defineProps({ modelValue: { type: Array, default: () => [] }, placeholder: { type: String, default: 'Период' }, disabled: { type: Boolean, default: false }, invalid: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue','change'])
const open = ref(false)
const stage = ref<'from'|'to'>('from')
const MON = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек']
const calVal = computed(() => { const [f, t] = props.modelValue as any[]; return f ? { from: f, to: t || f } : null })
function fmt(ymd: string){ const d = kmtFromYmd(ymd); return d.getDate() + ' ' + MON[d.getMonth()] }
const display = computed(() => { const [f, t] = props.modelValue as any[]; if (!f) return ''; return fmt(f) + ' — ' + (t ? fmt(t) : '…') })
function onPick(d: Date){
  const ymd = kmtYmd(d); let [f, t] = (props.modelValue as any[]) || []
  if (stage.value === 'from' || !f) { f = ymd; t = ''; stage.value = 'to' }
  else { if (kmtFromYmd(ymd) < kmtFromYmd(f)) { t = f; f = ymd } else t = ymd; stage.value = 'from'; open.value = false }
  emit('update:modelValue', [f, t]); emit('change', [f, t])
}
function clear(e: Event){ e.stopPropagation(); stage.value = 'from'; emit('update:modelValue', []); emit('change', []) }
</script>

<template>
  <div class="kui-datepicker">
    <button type="button" :class="['kui-dp-field', invalid ? 'is-invalid' : '', disabled ? 'is-disabled' : '']" :disabled="disabled" @click="open = !open">
      <Icon name="calendar" :size="15" class="kui-dp-ico" />
      <span :class="['kui-dp-text', !modelValue.length ? 'is-ph' : '']">{{ display || placeholder }}</span>
      <span v-if="modelValue.length" class="kui-dp-clear" @click="clear"><Icon name="close" :size="13" /></span>
    </button>
    <template v-if="open">
      <div class="kui-pop-backdrop" @click="open = false"></div>
      <div class="kui-dp-pop"><Calendar :value="calVal" @pick="onPick" /></div>
    </template>
  </div>
</template>
