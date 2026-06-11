<script setup lang="ts">
/* Пагинация под таблицей (визуальная). v-model:page — текущая; size локально. */
import { ref, computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  total: { type: Number, required: true },
  page: { type: Number, default: 1 },
  sizes: { type: Array, default: () => [50, 100, 200] },
})
const size = ref(100)
const pages = computed(() => Math.max(1, Math.ceil(props.total / size.value)))
const cur = computed(() => Math.min(props.page, pages.value))
const pageList = computed(() => Array.from({ length: pages.value }, (_, i) => i + 1).slice(0, 5))
</script>

<template>
  <div class="k-pager">
    <div class="k-pager-nav">
      <button class="k-pager-btn" :disabled="cur <= 1" title="Назад"><Icon name="chevronLeft" :size="15" /></button>
      <button v-for="p in pageList" :key="p" :class="['k-pager-btn', p === cur ? 'is-on' : '']">{{ p }}</button>
      <button class="k-pager-btn" :disabled="cur >= pages" title="Вперёд"><Icon name="chevronRight" :size="15" /></button>
    </div>
    <label class="k-pager-size">
      <select class="k-input-field" v-model.number="size">
        <option v-for="s in sizes" :key="s" :value="s">{{ s }} на странице</option>
      </select>
    </label>
    <span class="k-pager-total">Всего <b>{{ total }}</b></span>
  </div>
</template>
