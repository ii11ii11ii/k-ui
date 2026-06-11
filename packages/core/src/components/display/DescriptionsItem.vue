<script setup lang="ts">
/* Ячейка Descriptions (слотовая запись). */
defineProps({ label: { type: String, default: '' }, span: { type: Number, default: 1 } })
</script>

<template>
  <div class="k-desc-cell" :style="{ gridColumn: span > 1 ? 'span ' + span : null }">
    <div class="k-desc-label">{{ label }}</div>
    <div class="k-desc-value"><slot /></div>
  </div>
</template>
