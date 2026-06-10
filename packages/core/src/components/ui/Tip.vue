<script setup lang="ts">
/* Усечение содержимого с нативной подсказкой (title) по наведению. */
defineProps({ on: { type: String, default: '' } })
</script>

<template>
  <span class="truncate" :title="on || undefined"><slot /></span>
</template>
