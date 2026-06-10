<script setup lang="ts">
/* Меню настройки колонок. Десктоп — выпадающее меню; мобайл — выезжающая
   панель (bottom-sheet). props: columns, state, api, isMobile. */
import { ref } from 'vue'
import Icon from './Icon.vue'
import IconBtn from './IconBtn.vue'
import Menu from './Menu.vue'
import ColumnsPanel from './ColumnsPanel.vue'

const props = defineProps({
  columns: { type: Array, required: true },
  state: { type: Object, required: true },
  api: { type: Object, required: true },
  align: { type: String, default: 'right' },
  isMobile: { type: Boolean, default: false },
})
const open = ref(false)
</script>

<template>
  <template v-if="isMobile">
    <IconBtn name="columns" label="Настройка колонок" :active="open" @click="open = true" />
    <teleport to="body">
      <div v-if="open" class="sheet-overlay" @mousedown="open = false">
        <div class="filters-sheet cols-sheet" @mousedown.stop role="dialog" aria-label="Настройка колонок">
          <div class="fs-head">
            <span class="fs-title"><Icon name="columns" :size="17" />Колонки<span class="fs-badge">{{ state.order.length - state.hidden.length }}/{{ state.order.length }}</span></span>
            <button class="fs-close" title="Закрыть" @click="open = false"><Icon name="close" :size="18" /></button>
          </div>
          <div class="fs-body"><ColumnsPanel :columns="columns" :state="state" :api="api" /></div>
          <div class="fs-foot">
            <button class="btn btn-ghost" @click="api.reset"><Icon name="refresh" :size="14" />Сбросить</button>
            <button class="btn btn-primary" @click="open = false">Готово</button>
          </div>
        </div>
      </div>
    </teleport>
  </template>
  <Menu v-else :align="align" :width="272">
    <template #trigger="{ open: o, toggle }">
      <IconBtn name="columns" label="Настройка колонок" :active="o" @click="toggle" />
    </template>
    <ColumnsPanel :columns="columns" :state="state" :api="api" />
  </Menu>
</template>
