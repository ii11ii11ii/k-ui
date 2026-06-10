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
        <div class="fs-head">
          <span class="fs-title">Фильтры<span v-if="activeCount > 0" class="fs-badge">{{ activeCount }}</span></span>
          <button class="fs-close" title="Закрыть" @click="emit('close')"><Icon name="close" :size="18" /></button>
        </div>
        <div class="fs-body">
          <div v-for="g in groups" :key="g.title" class="fs-group">
            <div class="fs-group-title">{{ g.title }}</div>
            <div v-for="c in g.defs" :key="c.key"
              :class="['fs-field', kmtFilterActive(filters[c.key]) ? 'is-on' : '', (c.filter.kind === 'presence' || c.filter.kind === 'choice') ? 'fs-field-inline' : '']">
              <div class="fs-field-head">
                <span class="fs-field-label">{{ c.label }}</span>
                <button v-if="kmtFilterActive(filters[c.key]) && c.filter.kind !== 'presence' && c.filter.kind !== 'choice'"
                  class="fs-field-clear" @click="emit('change', c.key, kmtEmptyValue(c))"><Icon name="close" :size="12" :stroke="2.2" />Сбросить</button>
              </div>
              <FilterControl :col="c" :value="filters[c.key]" :options="options[c.key] || []" :auto-focus="false"
                @change="emit('change', c.key, $event)" @clear="emit('change', c.key, kmtEmptyValue(c))" />
            </div>
          </div>
        </div>
        <div class="fs-foot">
          <button class="btn btn-ghost" :disabled="!activeCount" @click="emit('clearAll')">Сбросить все</button>
          <button class="btn btn-primary" @click="emit('close')">Показать {{ resultCount }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>
