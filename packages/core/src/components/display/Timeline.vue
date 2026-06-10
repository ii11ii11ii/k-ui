<script setup lang="ts">
/* Лента событий. items:[{title,time?,description?,tone?}] или слот из TimelineItem. */
defineProps({ items: { type: Array, default: () => [] } })
</script>

<template>
  <div class="kui-timeline">
    <slot>
      <div v-for="(it, i) in items" :key="i" class="kui-tl-item">
        <span class="kui-tl-dot" :style="it.tone ? { background: 'var(--st-' + it.tone + '-dot)' } : null"></span>
        <div class="kui-tl-body">
          <div class="kui-tl-head"><span class="kui-tl-title">{{ it.title }}</span><span v-if="it.time" class="kui-tl-time">{{ it.time }}</span></div>
          <div v-if="it.description" class="kui-tl-desc">{{ it.description }}</div>
        </div>
      </div>
    </slot>
  </div>
</template>
