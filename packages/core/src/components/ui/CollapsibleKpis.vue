<script setup lang="ts">
/* Обёртка-«сворачиватель» для KPI-полосы экрана. Свёрнутость хранится в
   localStorage по id (на раздел). Свёрнуто → компактная строка-итог (summary).
   summary: [{ k, v, tone? }]. Слот по умолчанию — сами KPI-карточки. */
import { ref, watch } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  id: { type: String, required: true },
  summary: { type: Array, default: null },
  label: { type: String, default: 'Показатели' },
})
const key = 'kadm.kpi.' + props.id
const open = ref((() => { try { const s = localStorage.getItem(key); return s == null ? false : JSON.parse(s) } catch { return false } })())
watch(open, (v) => { try { localStorage.setItem(key, JSON.stringify(v)) } catch {} })
</script>

<template>
  <div :class="['kpi-sec', open ? 'is-open' : 'is-collapsed']">
    <div class="kpi-sec-head">
      <button class="kpi-sec-toggle" :aria-expanded="open" @click="open = !open"
        :title="open ? 'Свернуть показатели' : 'Развернуть показатели'">
        <Icon name="chevronRight" :size="14" class="kpi-sec-chev" />
        <span>{{ label }}</span>
      </button>
      <div v-if="!open && summary" class="kpi-sec-summary">
        <span v-for="(s, i) in summary" :key="i" :class="['kpi-sum', s.tone ? `kpi-sum-${s.tone}` : '']">
          <span class="kpi-sum-v">{{ s.v }}</span>
          <span class="kpi-sum-k">{{ s.k }}</span>
        </span>
      </div>
    </div>
    <slot v-if="open" />
  </div>
</template>
