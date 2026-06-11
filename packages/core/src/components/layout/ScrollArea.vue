<script setup lang="ts">
/* Скролл-контейнер с тонким скроллбаром. maxHeight — число(px)/строка. */
const props = defineProps({ maxHeight: { type: [Number, String], default: 280 }, horizontal: { type: Boolean, default: false } })
const dim = (v: any) => (typeof v === 'number' ? v + 'px' : v)
</script>

<template>
  <div :class="['k-scroll', horizontal ? 'is-horizontal' : '']" :style="{ maxHeight: dim(maxHeight) }"><slot /></div>
</template>
