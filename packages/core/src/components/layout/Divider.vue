<script setup lang="ts">
/* Разделитель. vertical — вертикальная черта; иначе горизонтальная (опц. с текстом). */
defineProps({ vertical: { type: Boolean, default: false }, text: { type: String, default: '' }, align: { type: String, default: 'center' } })
</script>

<template>
  <div v-if="vertical" class="k-divider-v" role="separator"></div>
  <div v-else :class="['k-divider', (text || $slots.default) ? 'has-text' : '', 'k-divider-' + align]" role="separator">
    <span v-if="text || $slots.default" class="k-divider-text"><slot>{{ text }}</slot></span>
  </div>
</template>
