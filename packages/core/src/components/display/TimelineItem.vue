<script setup lang="ts">
/* Событие ленты (слотовая запись). */
defineProps({ title: { type: String, default: '' }, time: { type: String, default: '' }, tone: { type: String, default: '' } })
</script>

<template>
  <div class="kui-tl-item">
    <span class="kui-tl-dot" :style="tone ? { background: 'var(--st-' + tone + '-dot)' } : null"></span>
    <div class="kui-tl-body">
      <div class="kui-tl-head"><span class="kui-tl-title">{{ title }}</span><span v-if="time" class="kui-tl-time">{{ time }}</span></div>
      <div class="kui-tl-desc"><slot /></div>
    </div>
  </div>
</template>
