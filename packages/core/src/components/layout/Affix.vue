<script setup lang="ts">
/* Прилипающий блок (sticky) при прокрутке. offset — отступ сверху/снизу. */
const props = defineProps({ offset: { type: Number, default: 0 }, bottom: { type: Boolean, default: false } })
</script>

<template>
  <div class="k-affix" :style="bottom ? { position: 'sticky', bottom: offset + 'px' } : { position: 'sticky', top: offset + 'px' }"><slot /></div>
</template>
