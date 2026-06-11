<script setup lang="ts">
/* Центрирующий контейнер с max-width. size: sm|md|lg|xl|full. */
const props = defineProps({ size: { type: String, default: 'lg' }, padded: { type: Boolean, default: true } })
const maxw: Record<string,string> = { sm: '640px', md: '820px', lg: '1080px', xl: '1320px', full: '100%' }
</script>

<template>
  <div :class="['k-container', padded ? 'is-padded' : '']" :style="{ maxWidth: maxw[size] || maxw.lg }"><slot /></div>
</template>
