<script setup lang="ts">
/* Панель настройки колонок: drag-порядок + видимость + закрепление.
   props: columns, state, api (из useTableColumns). */
import { ref, computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  columns: { type: Array, required: true },
  state: { type: Object, required: true },
  api: { type: Object, required: true },
})
const byKey = computed(() => Object.fromEntries(props.columns.map((c) => [c.key, c])))
const ordered = computed(() => props.state.order.map((k) => byKey.value[k]).filter(Boolean))
const hidden = computed(() => new Set(props.state.hidden))
const visibleCount = computed(() => ordered.value.length - hidden.value.size)

const drag = ref(null)
const over = ref(null)
function onDrop(toIdx) {
  if (drag.value === null || drag.value === toIdx) { drag.value = null; over.value = null; return }
  props.api.move(drag.value, toIdx)
  drag.value = null; over.value = null
}
</script>

<template>
  <div class="k-columns-panel" @click.stop>
    <div class="k-columns-head">
      <span class="k-columns-title">Колонки</span>
      <span class="k-columns-sub">{{ visibleCount }} из {{ ordered.length }}</span>
    </div>
    <div class="k-columns-list">
      <div v-for="(c, idx) in ordered" :key="c.key"
        :class="['col-row', hidden.has(c.key) ? 'is-off' : '', drag === idx ? 'is-drag' : '', over === idx ? 'is-over' : '', state.fixed[c.key] ? 'is-fixed' : '']"
        draggable="true"
        @dragstart="drag = idx; $event.dataTransfer.effectAllowed = 'move'"
        @dragover.prevent="over !== idx ? (over = idx) : null"
        @dragend="drag = null; over = null"
        @drop.prevent="onDrop(idx)">
        <span class="col-grip" title="Перетащите, чтобы изменить порядок"><Icon name="grip" :size="16" /></span>
        <button type="button" :class="['col-chk', !hidden.has(c.key) ? 'is-on' : '']" :disabled="c.lockVisible"
          @click="api.toggle(c.key)" :title="c.lockVisible ? 'Колонку нельзя скрыть' : (hidden.has(c.key) ? 'Показать' : 'Скрыть')">
          <span class="chk-box"><Icon v-if="!hidden.has(c.key)" name="check" :size="12" :stroke="3" /></span>
        </button>
        <span class="k-columns-name">{{ c.label }}</span>
        <span class="k-columns-fix">
          <button type="button" :class="['k-columns-fix-btn', state.fixed[c.key] === 'left' ? 'is-on' : '']" :disabled="c.lockFixed"
            @click="api.setFixed(c.key, state.fixed[c.key] === 'left' ? null : 'left')" title="Закрепить слева"><Icon name="pinLeft" :size="15" /></button>
          <button type="button" :class="['k-columns-fix-btn', state.fixed[c.key] === 'right' ? 'is-on' : '']" :disabled="c.lockFixed"
            @click="api.setFixed(c.key, state.fixed[c.key] === 'right' ? null : 'right')" title="Закрепить справа"><Icon name="pinRight" :size="15" /></button>
        </span>
      </div>
    </div>
    <div class="k-columns-foot">
      <button class="k-button k-button-ghost k-button-sm" @click="api.reset"><Icon name="refresh" :size="14" />Сбросить</button>
      <button class="k-button k-button-ghost k-button-sm" :disabled="hidden.size === 0" @click="api.showAll">Показать всё</button>
    </div>
  </div>
</template>
