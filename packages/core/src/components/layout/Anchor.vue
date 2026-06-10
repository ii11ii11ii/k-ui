<script setup lang="ts">
/* Якорная навигация по странице. items:[{href:'#id',title}]. */
import { ref, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({ items: { type: Array, default: () => [] }, offset: { type: Number, default: 80 } })
const active = ref('')
function onScroll(){
  const sc = window.scrollY + props.offset + 1; let cur = ''
  for (const it of props.items as any[]) { const id = it.href.replace('#', ''); const el = document.getElementById(id); if (el && el.offsetTop <= sc) cur = id }
  active.value = cur
}
function go(href: string, e: Event){ e.preventDefault(); const el = document.getElementById(href.replace('#', '')); if (el) window.scrollTo({ top: el.offsetTop - props.offset + 1, behavior: 'smooth' }) }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav class="kui-anchor">
    <a v-for="it in items" :key="it.href" :href="it.href" :class="['kui-anchor-link', active === it.href.replace('#', '') ? 'is-active' : '']" @click="go(it.href, $event)">{{ it.title }}</a>
  </nav>
</template>
