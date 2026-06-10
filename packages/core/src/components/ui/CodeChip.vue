<script setup lang="ts">
/* Код/промокод с копированием в буфер (флаг copied на 1.2с). */
import { ref } from 'vue'
import Icon from './Icon.vue'
const props = defineProps({
  code: { type: String, required: true },
  size: { type: String, default: 'md' },
  icon: { type: String, default: 'ticket' },
  muted: { type: Boolean, default: false },
})
const copied = ref(false)
let t: any = null
function copy(e: Event){ e.stopPropagation(); try { navigator.clipboard && navigator.clipboard.writeText(props.code) } catch (err) {}
  copied.value = true; clearTimeout(t); t = setTimeout(() => copied.value = false, 1200) }
</script>

<template>
  <span :class="['code-chip', 'code-chip-' + size, muted ? 'is-muted' : '', copied ? 'is-copied' : '']" :title="code">
    <Icon v-if="icon" :name="icon" :size="size === 'lg' ? 16 : size === 'sm' ? 12 : 14" class="code-chip-ico" />
    <span class="code-chip-text mono truncate">{{ code }}</span>
    <button type="button" class="code-chip-copy" :title="copied ? 'Скопировано' : 'Скопировать код'" aria-label="Скопировать код" @click="copy">
      <Icon :name="copied ? 'checkMark' : 'copy'" :size="size === 'lg' ? 15 : 13" :stroke="copied ? 3 : 2" />
    </button>
  </span>
</template>
