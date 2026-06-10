<script setup lang="ts">
/* Кнопка-сортировка в шапке колонки. sort = { key, dir }; @sort(key). */
import Icon from './Icon.vue'

const props = defineProps({
  label: { type: String, default: '' },
  colKey: { type: String, required: true },
  sort: { type: Object, default: null },
  align: { type: String, default: 'left' },
})
const emit = defineEmits(['sort'])
</script>

<template>
  <button :class="['th-sort', align === 'right' ? 'th-right' : '', sort && sort.key === colKey ? 'is-on' : '']" @click="emit('sort', colKey)">
    <span>{{ label }}</span>
    <Icon name="arrowUpDown" :size="13" :class="['th-sort-i', sort && sort.key === colKey ? 'dir-' + sort.dir : '']" />
  </button>
</template>
