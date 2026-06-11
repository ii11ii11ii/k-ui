<script setup lang="ts">
/* Тултип-обёртка (компонент). content — текст или слот #content. */
import { ref } from 'vue'
defineProps({
  content: { type: String, default: '' },
  placement: { type: String, default: 'top' },
  disabled: { type: Boolean, default: false },
})
const show = ref(false)
</script>

<template>
  <span class="k-tooltip-wrap" @mouseenter="show = true" @mouseleave="show = false" @focusin="show = true" @focusout="show = false">
    <slot />
    <span v-if="!disabled && (content || $slots.content)" :class="['k-tooltip-pop', 'k-ttp-' + placement, show ? 'is-show' : '']" role="tooltip">
      <slot name="content">{{ content }}</slot>
    </span>
  </span>
</template>
