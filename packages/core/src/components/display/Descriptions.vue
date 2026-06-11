<script setup lang="ts">
/* Таблица «ключ-значение». columns — число колонок; items:[{label,value,span?}] или слот. */
defineProps({ title: { type: String, default: '' }, columns: { type: Number, default: 2 }, bordered: { type: Boolean, default: true }, items: { type: Array, default: () => [] } })
</script>

<template>
  <div :class="['k-desc', bordered ? 'is-bordered' : '']">
    <div v-if="title" class="k-desc-title">{{ title }}</div>
    <div class="k-desc-grid" :style="{ gridTemplateColumns: 'repeat(' + columns + ', minmax(0,1fr))' }">
      <slot>
        <div v-for="(it, i) in items" :key="i" class="k-desc-cell" :style="{ gridColumn: it.span ? 'span ' + it.span : null }">
          <div class="k-desc-label">{{ it.label }}</div>
          <div class="k-desc-value">{{ it.value }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>
