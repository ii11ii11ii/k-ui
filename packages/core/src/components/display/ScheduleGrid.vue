<script setup lang="ts">
/* Сетка-расписание (ряды × колонки), напр. загрузка техники по дням.
   rows:[{key,label,sub?}], columns:[{key,label,sub?,highlight?}], cells: map 'rowKey|colKey'.
   Слот #cell="{ row, col, value }". */
const props = defineProps({
  rows: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  cells: { type: Object, default: () => ({}) },
  rowHeader: { type: String, default: 'Ряд / Колонка' },
  colWidth: { type: Number, default: 88 },
})
function cell(rk: any, ck: any){ return (props.cells as any)[rk + '|' + ck] }
</script>

<template>
  <div class="k-schedule-wrap">
    <div class="k-schedule" :style="{ gridTemplateColumns: 'minmax(160px,1.2fr) repeat(' + columns.length + ', minmax(' + colWidth + 'px,1fr))' }">
      <div class="k-sch-corner">{{ rowHeader }}</div>
      <div v-for="c in columns" :key="c.key" :class="['k-sch-colhead', c.highlight ? 'is-hl' : '']"><b>{{ c.label }}</b><span v-if="c.sub">{{ c.sub }}</span></div>
      <template v-for="r in rows" :key="r.key">
        <div class="k-sch-rowhead"><b>{{ r.label }}</b><span v-if="r.sub">{{ r.sub }}</span></div>
        <div v-for="c in columns" :key="c.key" class="k-sch-cell"><slot name="cell" :row="r" :col="c" :value="cell(r.key, c.key)">{{ cell(r.key, c.key) }}</slot></div>
      </template>
    </div>
  </div>
</template>
