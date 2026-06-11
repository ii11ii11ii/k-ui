<script setup lang="ts">
/* Шапка-фильтр одной колонки: клик по названию открывает контрол (в body, fixed).
   props: col, value, options; @change(key, value). */
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'
import FilterControl from './FilterControl.vue'
import { kmtFilterActive, kmtFilterLabel, kmtEmptyValue } from '../../utils/filters'

const props = defineProps({
  col: { type: Object, required: true },
  value: { default: '' },
  options: { type: Array, default: null },
  align: { type: String, default: 'left' },
})
const emit = defineEmits(['change'])

const open = ref(false)
const ref0 = ref(null)
const pos = ref(null)
let cleanup = null
const active = computed(() => kmtFilterActive(props.value))
const kind = computed(() => props.col.filter.kind)
const trigIcon = computed(() => (kind.value === 'text' ? 'search' : kind.value === 'date' ? 'calendar' : 'chevronDown'))
const popWidth = computed(() => (kind.value === 'date' ? 268 : 252))
const label = computed(() => kmtFilterLabel(props.col, props.value, props.options))

function place() {
  const el = ref0.value; if (!el) return
  const r = el.getBoundingClientRect()
  let left = Math.min(r.left, window.innerWidth - popWidth.value - 10)
  left = Math.max(10, left)
  const top = Math.min(r.bottom + 6, window.innerHeight - 80)
  pos.value = { top, left }
}
function onKey(e) { if (e.key === 'Escape') doClose() }
function doOpen() {
  open.value = true
  nextTick(() => {
    place()
    window.addEventListener('resize', place, true)
    window.addEventListener('scroll', place, true)
    window.addEventListener('keydown', onKey)
    cleanup = () => {
      window.removeEventListener('resize', place, true)
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('keydown', onKey)
    }
  })
}
function doClose() { open.value = false; if (cleanup) { cleanup(); cleanup = null } }
function clear() { emit('change', props.col.key, kmtEmptyValue(props.col)) }
onBeforeUnmount(() => { if (cleanup) cleanup() })
</script>

<template>
  <div :class="['k-filter-th', active ? 'is-on' : '', align === 'right' ? 'th-right' : '']" ref="ref0">
    <button class="k-filter-th-btn" @click="open ? doClose() : doOpen()" :title="col.thTitle || `Фильтр: ${col.label}`">
      <span class="k-filter-th-label">{{ col.label }}</span>
      <span :class="['k-filter-th-ico', open ? 'is-open' : '']"><Icon :name="active ? 'funnel' : trigIcon" :size="13" /></span>
    </button>
    <div v-if="active" class="k-filter-th-active" :title="label">
      <span class="k-filter-th-val">{{ label }}</span>
      <button class="k-filter-th-x" title="Сбросить фильтр" @click="clear"><Icon name="close" :size="15" :stroke="2.6" /></button>
    </div>
    <teleport to="body">
      <template v-if="open">
        <div class="pop-backdrop pop-backdrop-hi" @mousedown="doClose"></div>
        <div class="k-filter-pop" :style="{ position: 'fixed', top: (pos ? pos.top : -9999) + 'px', left: (pos ? pos.left : -9999) + 'px', width: popWidth + 'px' }" @mousedown.stop @click.stop>
          <div class="k-filter-pop-head">
            <span class="k-filter-pop-title">{{ col.label }}</span>
            <button v-if="active" class="k-filter-pop-clear" @click="clear">Сбросить</button>
          </div>
          <FilterControl :col="col" :value="value" :options="options || []"
            @change="emit('change', col.key, $event)" @clear="clear" @picked="doClose" />
        </div>
      </template>
    </teleport>
  </div>
</template>
