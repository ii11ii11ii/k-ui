<script setup lang="ts">
/* Элемент хлебных крошек (для слотовой записи). */
defineProps({ href: { type: String, default: '' }, current: { type: Boolean, default: false } })
</script>

<template>
  <a v-if="href" class="k-bc-item" :href="href"><slot /></a>
  <span v-else :class="['k-bc-item', current ? 'is-current' : '']"><slot /></span>
</template>
