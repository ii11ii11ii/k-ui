<script setup lang="ts">
/* Выезжающая панель «Фильтры» (мобайл). groups:[{title, defs:[col,...]}].
   props: groups, filters, options, activeCount, resultCount; @change(key,val), @clearAll, @close. */
import Icon from './Icon.vue'
import FilterControl from './FilterControl.vue'
import { kmtFilterActive, kmtEmptyValue } from '../../utils/filters'

defineProps({
  groups: { type: Array, required: true },
  filters: { type: Object, required: true },
  options: { type: Object, default: () => ({}) },
  activeCount: { type: Number, default: 0 },
  resultCount: { type: Number, default: 0 },
})
const emit = defineEmits(['change', 'clearAll', 'close'])
</script>

<template>
  <teleport to="body">
    <div class="sheet-overlay" @mousedown="emit('close')">
      <div class="filters-sheet" @mousedown.stop role="dialog" aria-label="Фильтры">
        <div class="k-filters-sheet-head">
          <span class="k-filters-sheet-title">Фильтры<span v-if="activeCount > 0" class="k-filters-sheet-badge">{{ activeCount }}</span></span>
          <button class="k-filters-sheet-close" title="Закрыть" @click="emit('close')"><Icon name="close" :size="18" /></button>
        </div>
        <div class="k-filters-sheet-body">
          <div v-for="g in groups" :key="g.title" class="k-filters-sheet-group">
            <div class="k-filters-sheet-group-title">{{ g.title }}</div>
            <div v-for="c in g.defs" :key="c.key"
              :class="['k-filters-sheet-field', kmtFilterActive(filters[c.key]) ? 'is-on' : '', (c.filter.kind === 'presence' || c.filter.kind === 'choice') ? 'k-filters-sheet-field-inline' : '']">
              <div class="k-filters-sheet-field-head">
                <span class="k-filters-sheet-field-label">{{ c.label }}</span>
                <button v-if="kmtFilterActive(filters[c.key]) && c.filter.kind !== 'presence' && c.filter.kind !== 'choice'"
                  class="k-filters-sheet-field-clear" @click="emit('change', c.key, kmtEmptyValue(c))"><Icon name="close" :size="12" :stroke="2.2" />Сбросить</button>
              </div>
              <FilterControl :col="c" :value="filters[c.key]" :options="options[c.key] || []" :auto-focus="false"
                @change="emit('change', c.key, $event)" @clear="emit('change', c.key, kmtEmptyValue(c))" />
            </div>
          </div>
        </div>
        <div class="k-filters-sheet-foot">
          <button class="k-button k-button-ghost" :disabled="!activeCount" @click="emit('clearAll')">Сбросить все</button>
          <button class="k-button k-button-primary" @click="emit('close')">Показать {{ resultCount }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>
