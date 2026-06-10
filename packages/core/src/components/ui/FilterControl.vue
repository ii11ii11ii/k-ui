<script setup lang="ts">
/* Контрол фильтра по виду колонки (общий для шапки и мобильной панели).
   col.filter.kind: text | select | combo | date | presence | choice.
   @change(value) — новое значение; @clear — сброс; @picked — закрыть поповер. */
import { ref, computed } from 'vue'
import Icon from './Icon.vue'
import Calendar from './Calendar.vue'
import { kmtFilterActive, kmtYmd, kmtMonday, KMT_TODAY } from '../../utils/filters'

const props = defineProps({
  col: { type: Object, required: true },
  value: { default: '' },
  options: { type: Array, default: () => [] },
  autoFocus: { type: Boolean, default: true },
})
const emit = defineEmits(['change', 'clear', 'picked'])
const f = computed(() => props.col.filter)

// --- select / combo ---
const q = ref('')
const sel = computed(() => (f.value.multi ? (Array.isArray(props.value) ? props.value : []) : props.value))
const list = computed(() => {
  const t = q.value.trim().toLowerCase()
  return t ? props.options.filter((o) => String(o.label).toLowerCase().includes(t)) : props.options
})
const isOn = (v) => (f.value.multi ? sel.value.includes(v) : sel.value === v)
function pick(v) {
  if (f.value.multi) emit('change', sel.value.includes(v) ? sel.value.filter((x) => x !== v) : [...sel.value, v])
  else { emit('change', isOn(v) ? '' : v); emit('picked') }
}

// --- presence ---
const pv = computed(() => props.value || { mode: '', number: '' })
function setMode(m) { emit('change', { ...pv.value, mode: pv.value.mode === m ? '' : m }) }
function setNumber(n) { emit('change', { ...pv.value, number: n }) }

// --- date ---
function setPreset(preset) {
  let from, to
  if (preset === 'today') { from = to = KMT_TODAY }
  else if (preset === 'week') { from = kmtMonday(KMT_TODAY); to = new Date(from); to.setDate(from.getDate() + 6) }
  else { from = new Date(KMT_TODAY.getFullYear(), KMT_TODAY.getMonth(), 1); to = new Date(KMT_TODAY.getFullYear(), KMT_TODAY.getMonth() + 1, 0) }
  emit('change', { from: kmtYmd(from), to: kmtYmd(to), preset })
}
function pickDay(d) { emit('change', { from: kmtYmd(d), to: kmtYmd(d) }); emit('picked') }
const active = computed(() => kmtFilterActive(props.value))
</script>

<template>
  <!-- text -->
  <div v-if="f.kind === 'text'" class="flt-text">
    <Icon name="search" :size="15" class="flt-text-ico" />
    <input class="flt-text-input" :autofocus="autoFocus" :value="value || ''"
      @input="emit('change', $event.target.value)" :placeholder="f.placeholder || `Поиск: ${col.label.toLowerCase()}`" />
    <button v-if="active" class="flt-text-clear" title="Очистить" @click="emit('clear')"><Icon name="close" :size="13" /></button>
  </div>

  <!-- date -->
  <div v-else-if="f.kind === 'date'" class="flt-date">
    <div class="flt-presets">
      <button v-for="[k, l] in [['today','Сегодня'],['week','Неделя'],['month','Месяц']]" :key="k"
        :class="['flt-preset', value && value.preset === k ? 'is-on' : '']" @click="setPreset(k)">{{ l }}</button>
    </div>
    <Calendar :value="value" @pick="pickDay" />
    <div class="flt-foot">
      <button class="flt-clear-btn" :disabled="!active" @click="emit('clear')"><Icon name="close" :size="13" />Сбросить</button>
    </div>
  </div>

  <!-- presence -->
  <div v-else-if="f.kind === 'presence'" class="presence-flt">
    <button :class="['pf-x', active ? 'is-on' : '']" title="Сбросить" :disabled="!active" @click="emit('clear')"><Icon name="close" :size="13" :stroke="2.4" /></button>
    <div class="pf-seg">
      <button :class="['pf-opt', pv.mode === 'has' ? 'is-on' : '']" @click="setMode('has')">По наличию</button>
      <button :class="['pf-opt', pv.mode === 'none' ? 'is-on' : '']" @click="setMode('none')">По отсутствию</button>
    </div>
    <input class="pf-num" :autofocus="autoFocus" :value="pv.number || ''" :placeholder="f.placeholder || 'По номеру'" @input="setNumber($event.target.value)" />
  </div>

  <!-- choice -->
  <div v-else-if="f.kind === 'choice'" class="choice-flt">
    <button :class="['pf-x', active ? 'is-on' : '']" title="Сбросить" :disabled="!active" @click="emit('clear')"><Icon name="close" :size="13" :stroke="2.4" /></button>
    <div class="pf-seg pf-seg-wrap">
      <button v-for="o in (options.length ? options : (f.options || []))" :key="o.value"
        :class="['pf-opt', value === o.value ? 'is-on' : '']" @click="emit('change', value === o.value ? '' : o.value)">{{ o.label }}</button>
    </div>
  </div>

  <!-- select / combo -->
  <div v-else class="flt-select">
    <div class="flt-text">
      <Icon name="search" :size="15" class="flt-text-ico" />
      <input class="flt-text-input" :autofocus="autoFocus" v-model="q" :placeholder="f.placeholder || 'Поиск по списку…'" />
      <button v-if="q" class="flt-text-clear" title="Очистить поиск" @click="q = ''"><Icon name="close" :size="13" /></button>
    </div>
    <div class="flt-options" role="listbox">
      <div v-if="list.length === 0" class="flt-empty">Ничего не найдено</div>
      <button v-for="o in list" :key="o.value" role="option" :aria-selected="isOn(o.value)"
        :class="['flt-opt', isOn(o.value) ? 'is-on' : '']" @click="pick(o.value)">
        <span :class="['flt-opt-box', f.multi ? 'is-check' : 'is-radio']">
          <Icon v-if="isOn(o.value) && f.multi" name="checkMark" :size="11" :stroke="3" />
          <span v-else-if="isOn(o.value)" class="flt-opt-dot"></span>
        </span>
        <span class="flt-opt-label" :title="o.label">{{ o.label }}</span>
      </button>
    </div>
    <div v-if="active" class="flt-foot">
      <button class="flt-clear-btn" @click="emit('clear')"><Icon name="close" :size="13" />Сбросить</button>
      <span v-if="f.multi" class="flt-count">{{ sel.length }} выбрано</span>
    </div>
  </div>
</template>
