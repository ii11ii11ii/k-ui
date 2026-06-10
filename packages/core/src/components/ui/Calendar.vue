<script setup lang="ts">
/* Календарь (сетка месяца, Пн-первый). value = {from,to} | null; @pick(date). */
import { ref, computed, watch } from 'vue'
import Icon from './Icon.vue'
import { KMT_TODAY, KMT_WD, KMT_MONTHS, kmtFromYmd, kmtMonday, kmtSameDay } from '../../utils/filters'

const props = defineProps({ value: { default: null } })
const emit = defineEmits(['pick'])

const init = props.value && props.value.from ? kmtFromYmd(props.value.from) : KMT_TODAY
const view = ref(new Date(init.getFullYear(), init.getMonth(), 1))
watch(() => props.value && props.value.from, (f) => { if (f) { const d = kmtFromYmd(f); view.value = new Date(d.getFullYear(), d.getMonth(), 1) } })

const from = computed(() => (props.value && props.value.from ? kmtFromYmd(props.value.from) : null))
const to = computed(() => (props.value && props.value.to ? kmtFromYmd(props.value.to) : from.value))
const days = computed(() => {
  const firstMon = kmtMonday(new Date(view.value.getFullYear(), view.value.getMonth(), 1))
  return Array.from({ length: 42 }, (_, i) => { const d = new Date(firstMon); d.setDate(firstMon.getDate() + i); return d })
})
function inRange(d) { return from.value && to.value && d >= new Date(from.value.getFullYear(), from.value.getMonth(), from.value.getDate()) && d <= new Date(to.value.getFullYear(), to.value.getMonth(), to.value.getDate()) }
function cls(d) {
  return ['cal-day',
    d.getMonth() !== view.value.getMonth() ? 'is-out' : '',
    kmtSameDay(d, KMT_TODAY) ? 'is-today' : '',
    inRange(d) ? 'is-range' : '',
    ((from.value && kmtSameDay(d, from.value)) || (to.value && kmtSameDay(d, to.value))) ? 'is-sel' : '']
}
function shift(n) { view.value = new Date(view.value.getFullYear(), view.value.getMonth() + n, 1) }
</script>

<template>
  <div class="cal">
    <div class="cal-head">
      <button class="cal-nav" title="Предыдущий месяц" @click="shift(-1)"><Icon name="chevronLeft" :size="16" /></button>
      <span class="cal-title">{{ KMT_MONTHS[view.getMonth()] }} {{ view.getFullYear() }}</span>
      <button class="cal-nav" title="Следующий месяц" @click="shift(1)"><Icon name="chevronRight" :size="16" /></button>
    </div>
    <div class="cal-grid cal-wd"><span v-for="w in KMT_WD" :key="w" class="cal-wd-c">{{ w }}</span></div>
    <div class="cal-grid">
      <button v-for="(d, i) in days" :key="i" :class="cls(d)" @click="emit('pick', d)">{{ d.getDate() }}</button>
    </div>
  </div>
</template>
