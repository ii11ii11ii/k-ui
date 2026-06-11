<script setup lang="ts">
/* Событие ленты (слотовая запись). */
defineProps({ title: { type: String, default: '' }, time: { type: String, default: '' }, tone: { type: String, default: '' } })
</script>

<template>
  <div class="k-tl-item">
    <span class="k-tl-dot" :style="tone ? { background: 'var(--st-' + tone + '-dot)' } : null"></span>
    <div class="k-tl-body">
      <div class="k-tl-head"><span class="k-tl-title">{{ title }}</span><span v-if="time" class="k-tl-time">{{ time }}</span></div>
      <div class="k-tl-desc"><slot /></div>
    </div>
  </div>
</template>
