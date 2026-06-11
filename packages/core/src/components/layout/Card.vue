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
  <div :class="['k-card', hoverable ? 'is-hoverable' : '', bordered ? '' : 'is-borderless']">
    <div v-if="title || $slots.header || $slots.extra" class="k-card-head">
      <slot name="header"><span class="k-card-title">{{ title }}</span></slot>
      <div v-if="$slots.extra" class="k-card-extra"><slot name="extra" /></div>
    </div>
    <div :class="['k-card-body', padded ? '' : 'is-flush']"><slot /></div>
    <div v-if="$slots.footer" class="k-card-foot"><slot name="footer" /></div>
  </div>
</template>
