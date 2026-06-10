<script setup lang="ts">
/* Список-контейнер. size: sm|md|lg. */
defineProps({ bordered: { type: Boolean, default: true }, hoverable: { type: Boolean, default: false }, size: { type: String, default: 'md' } })
</script>

<template>
  <div :class="['kui-list', bordered ? '' : 'is-borderless', hoverable ? 'is-hoverable' : '', 'kui-list-' + size]"><slot /></div>
</template>
