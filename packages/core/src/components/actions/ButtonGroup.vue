<script setup lang="ts">
/* Группа кнопок: attached — слитный сегмент, иначе с зазором. */
defineProps({ attached: { type: Boolean, default: false } })
</script>

<template>
  <div :class="['k-button-group', attached ? 'is-attached' : '']"><slot /></div>
</template>
