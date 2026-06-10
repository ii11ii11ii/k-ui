<script setup lang="ts">
/* Иконка (геометрический stroke-набор). Дети наследуют fill/stroke/stroke-width
   от <svg>; только явные fill="currentColor" / stroke="none" переопределяют.
   В Vue 3 — <Icon name size stroke />. */
import { computed } from 'vue'
import { ICONS } from '../../icons/icons'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 18 },
  stroke: { type: [Number, String], default: 1.7 },
})
const inner = computed(() => ICONS[props.name] || '')
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    :stroke-width="stroke" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
    v-html="inner"></svg>
</template>
