<script setup lang="ts">
/* Тег маркетплейса (короткая метка). */
defineProps({ mp: { type: String, required: true }, title: { type: String, default: '' } })
</script>

<template>
  <span class="k-mp-tag" :title="title || undefined">{{ mp }}</span>
</template>
