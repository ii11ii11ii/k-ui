<script setup lang="ts">
/* Лента событий. items:[{title,time?,description?,tone?}] или слот из TimelineItem. */
defineProps({ items: { type: Array, default: () => [] } })
</script>

<template>
  <div class="k-timeline">
    <slot>
      <div v-for="(it, i) in items" :key="i" class="k-tl-item">
        <span class="k-tl-dot" :style="it.tone ? { background: 'var(--st-' + it.tone + '-dot)' } : null"></span>
        <div class="k-tl-body">
          <div class="k-tl-head"><span class="k-tl-title">{{ it.title }}</span><span v-if="it.time" class="k-tl-time">{{ it.time }}</span></div>
          <div v-if="it.description" class="k-tl-desc">{{ it.description }}</div>
        </div>
      </div>
    </slot>
  </div>
</template>
