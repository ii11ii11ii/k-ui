<script setup lang="ts">
/* Карточка-контейнер. Слоты: header, extra, default, footer. */
defineProps({
  title: { type: String, default: '' },
  padded: { type: Boolean, default: true },
  hoverable: { type: Boolean, default: false },
  bordered: { type: Boolean, default: true },
})
</script>

<template>
  <div :class="['kui-card', hoverable ? 'is-hoverable' : '', bordered ? '' : 'is-borderless']">
    <div v-if="title || $slots.header || $slots.extra" class="kui-card-head">
      <slot name="header"><span class="kui-card-title">{{ title }}</span></slot>
      <div v-if="$slots.extra" class="kui-card-extra"><slot name="extra" /></div>
    </div>
    <div :class="['kui-card-body', padded ? '' : 'is-flush']"><slot /></div>
    <div v-if="$slots.footer" class="kui-card-foot"><slot name="footer" /></div>
  </div>
</template>
