<script setup lang="ts">
/* Компактная пагинация для списков внутри карточек/панелей. v-model:page. */
import { computed } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({
  total: { type: Number, required: true },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  unit: { type: String, default: '' },
})
const emit = defineEmits(['update:page','page'])
const pages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const cur = computed(() => Math.min(Math.max(1, props.page), pages.value))
const from = computed(() => (cur.value - 1) * props.pageSize + 1)
const to = computed(() => Math.min(cur.value * props.pageSize, props.total))
function go(p: number){ emit('update:page', p); emit('page', p) }
</script>

<template>
  <div v-if="pages > 1" class="mini-pager">
    <span class="mini-pager-range nowrap">{{ from }}–{{ to }} из {{ total }}{{ unit ? ' ' + unit : '' }}</span>
    <div class="mini-pager-nav">
      <button type="button" class="mini-pager-btn" :disabled="cur <= 1" title="Назад" @click="go(cur - 1)"><Icon name="chevronLeft" :size="15" /></button>
      <span class="mini-pager-pos mono nowrap">{{ cur }} / {{ pages }}</span>
      <button type="button" class="mini-pager-btn" :disabled="cur >= pages" title="Вперёд" @click="go(cur + 1)"><Icon name="chevronRight" :size="15" /></button>
    </div>
  </div>
</template>
