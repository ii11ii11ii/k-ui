<script setup lang="ts">
/* Ячейка Descriptions (слотовая запись). */
defineProps({ label: { type: String, default: '' }, span: { type: Number, default: 1 } })
</script>

<template>
  <div class="kui-desc-cell" :style="{ gridColumn: span > 1 ? 'span ' + span : null }">
    <div class="kui-desc-label">{{ label }}</div>
    <div class="kui-desc-value"><slot /></div>
  </div>
</template>
