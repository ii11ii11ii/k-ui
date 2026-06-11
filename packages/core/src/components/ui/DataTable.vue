<script setup lang="ts">
/* Таблица с закреплением колонок (left/right), фильтрами в шапке, сортировкой,
   раскрытием строк. Ячейки рендерятся слотом #cell="{ column, row, index }"
   (fallback row[column.key]); раскрытие — слотом #expanded="{ row }".
   props: columns, rows, rowKey, state, sort, filtering, selIndex, rowClassName,
   isExpanded, emptyText, tableClassName, className. */
import { ref, computed, watch, onBeforeUnmount, nextTick } from 'vue'
import FilterHead from './FilterHead.vue'
import SortHead from './SortHead.vue'
import { kmtFilterActive } from '../../utils/filters'
import { layoutColumns } from '../../composables/useTableColumns'

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  rowKey: { type: Function, default: null },
  state: { type: Object, required: true },
  sort: { type: Object, default: null },
  filtering: { type: Object, default: null },
  selIndex: { type: Number, default: -1 },
  rowClassName: { type: Function, default: null },
  isExpanded: { type: Function, default: null },
  emptyText: { type: String, default: 'Ничего не найдено' },
  tableClassName: { type: String, default: '' },
  className: { type: String, default: '' },
})
const emit = defineEmits(['sort', 'rowClick', 'rowEnter'])

const wrapRef = ref(null)
const offsets = ref({})
const layout = computed(() => layoutColumns(props.columns, props.state))
const fltActive = (key) => props.filtering && kmtFilterActive(props.filtering.values[key])

function measure() {
  const wrap = wrapRef.value
  if (!wrap) return
  const ths = wrap.querySelectorAll('thead th[data-col]')
  const w = {}
  ths.forEach((th) => { w[th.dataset.col] = th.getBoundingClientRect().width })
  const { vis, fixedOf } = layout.value
  const offs = {}
  let l = 0
  vis.forEach((c) => { if (fixedOf(c.key) === 'left') { offs[c.key] = { side: 'left', px: l }; l += w[c.key] || 0 } })
  let r = 0
  for (let i = vis.length - 1; i >= 0; i--) { const c = vis[i]; if (fixedOf(c.key) === 'right') { offs[c.key] = { side: 'right', px: r }; r += w[c.key] || 0 } }
  if (JSON.stringify(offsets.value) !== JSON.stringify(offs)) offsets.value = offs
}
let ro = null
function bind() {
  nextTick(() => {
    measure()
    if (ro) ro.disconnect()
    ro = new ResizeObserver(measure)
    if (wrapRef.value) ro.observe(wrapRef.value)
  })
}
watch(() => [JSON.stringify(props.state), props.rows.length], bind, { immediate: true })
onBeforeUnmount(() => { if (ro) ro.disconnect() })

function pinProps(key) {
  const { fixedOf, edgeLeft, edgeRight } = layout.value
  const side = fixedOf(key)
  if (!side) return { className: '', style: null }
  const o = offsets.value[key]
  const isEdge = (side === 'left' && key === edgeLeft) || (side === 'right' && key === edgeRight)
  const cls = `is-pin is-pin-${side}${isEdge ? ` is-pin-edge-${side}` : ''}`
  const style = o ? { [o.side]: o.px + 'px' } : { [side]: '0px' }
  return { className: cls, style }
}
function thStyle(c, key) {
  const pin = pinProps(key)
  return { ...(c.width ? { width: typeof c.width === 'number' ? c.width + 'px' : c.width } : null), ...pin.style }
}
function onRowClickGuarded(row, i, e) {
  if (e.target.closest('button, a, input, select, textarea, label, [role="button"], [role="switch"], [contenteditable]')) return
  emit('rowClick', row, i)
}
function keyOf(row, i) { return props.rowKey ? props.rowKey(row) : i }
</script>

<template>
  <div :class="`k-table-wrap ${className}`" ref="wrapRef">
    <table :class="`k-table ${tableClassName}`">
      <thead>
        <tr>
          <th v-for="c in layout.vis" :key="c.key" :data-col="c.key"
            :class="[c.th || '', c.align === 'right' ? 'th-num' : '', pinProps(c.key).className, c.filter ? 'th-has-flt' : '', fltActive(c.key) ? 'is-flt-col' : '']"
            :style="thStyle(c, c.key)" :title="c.filter ? undefined : (c.thTitle || undefined)">
            <FilterHead v-if="c.filter" :col="c" :value="filtering.values[c.key]"
              :options="filtering.options ? filtering.options[c.key] : null" :align="c.align"
              @change="(k, v) => filtering.onChange(k, v)" />
            <SortHead v-else-if="c.sortable" :label="c.label" :col-key="c.key" :sort="sort" :align="c.align" @sort="emit('sort', $event)" />
            <span v-else :class="c.align === 'right' ? 'th-num-label' : ''">{{ c.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="rows.length === 0" class="k-table-empty-row"><td :colspan="layout.vis.length"><div class="k-table-empty">{{ emptyText }}</div></td></tr>
        <template v-for="(row, i) in rows" :key="keyOf(row, i)">
          <tr :data-i="i"
            :class="[rowClassName ? rowClassName(row, i) : '', selIndex === i ? 'is-sel' : '', isExpanded && isExpanded(row) ? 'is-expanded' : '']"
            :tabindex="0"
            @click="onRowClickGuarded(row, i, $event)"
            @mouseenter="emit('rowEnter', i)"
            @keydown.enter="$event.target === $event.currentTarget && emit('rowClick', row, i)">
            <td v-for="c in layout.vis" :key="c.key"
              :class="[c.cell || '', c.align === 'right' ? 'col-num' : c.align === 'center' ? 'col-center' : '', pinProps(c.key).className, fltActive(c.key) ? 'is-flt-col' : '']"
              :style="pinProps(c.key).style">
              <slot name="cell" :column="c" :row="row" :index="i">{{ row[c.key] }}</slot>
            </td>
          </tr>
          <tr v-if="isExpanded && isExpanded(row)" class="k-table-expanded">
            <td :colspan="layout.vis.length"><div class="k-table-expanded-inner"><slot name="expanded" :row="row" /></div></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
