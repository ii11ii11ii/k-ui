<script setup lang="ts">
/* Командная палитра (⌘K). v-model:open. items:[{id,title,sub?,icon?,group?,keywords?,run?}]. */
import { ref, computed, watch, nextTick } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ open: { type: Boolean, default: false }, items: { type: Array, default: () => [] }, placeholder: { type: String, default: 'Поиск команд…' }, emptyText: { type: String, default: 'Ничего не найдено' } })
const emit = defineEmits(['update:open','select'])
const q = ref(''); const idx = ref(0); const input = ref<HTMLInputElement | null>(null)
const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  return (props.items as any[]).filter((it) => !s || it.title.toLowerCase().includes(s) || (it.keywords || '').toLowerCase().includes(s) || (it.sub || '').toLowerCase().includes(s)).slice(0, 50)
})
const groups = computed(() => { const map: any = {}; filtered.value.forEach((it) => { const g = it.group || ''; (map[g] = map[g] || []).push(it) }); return map })
function flatIndex(it: any){ return filtered.value.indexOf(it) }
watch(() => props.open, async (o) => { if (o) { q.value = ''; idx.value = 0; await nextTick(); input.value && input.value.focus() } })
watch(q, () => { idx.value = 0 })
function close(){ emit('update:open', false) }
function run(it: any){ if (!it) return; emit('select', it); if (it.run) it.run(); close() }
function onKey(e: KeyboardEvent){
  if (e.key === 'ArrowDown') { e.preventDefault(); idx.value = Math.min(filtered.value.length - 1, idx.value + 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); idx.value = Math.max(0, idx.value - 1) }
  else if (e.key === 'Enter') { e.preventDefault(); run(filtered.value[idx.value]) }
  else if (e.key === 'Escape') { close() }
}
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="kui-cmdk-root" @click="close">
      <div class="kui-cmdk" @click.stop>
        <div class="kui-cmdk-search"><Icon name="search" :size="17" /><input ref="input" v-model="q" :placeholder="placeholder" @keydown="onKey" /><kbd class="kui-cmdk-esc">ESC</kbd></div>
        <div class="kui-cmdk-list">
          <template v-for="(its, g) in groups" :key="g">
            <div v-if="g" class="kui-cmdk-group">{{ g }}</div>
            <button v-for="it in its" :key="it.id" :class="['kui-cmdk-item', flatIndex(it) === idx ? 'is-active' : '']" @mousemove="idx = flatIndex(it)" @click="run(it)">
              <Icon v-if="it.icon" :name="it.icon" :size="16" class="kui-cmdk-ico" />
              <span class="kui-cmdk-title">{{ it.title }}</span>
              <span v-if="it.sub" class="kui-cmdk-sub">{{ it.sub }}</span>
            </button>
          </template>
          <div v-if="!filtered.length" class="kui-cmdk-empty">{{ emptyText }}</div>
        </div>
      </div>
    </div>
  </teleport>
</template>
