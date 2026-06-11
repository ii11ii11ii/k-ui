<script setup lang="ts">
/* Универсальный тег. tone: amber|green|blue|violet|gray|red (пусто — нейтральный). closable. */
import { computed } from 'vue'
import Icon from '../ui/Icon.vue'
import { STATUS_TONES } from '../../utils/tones'
const props = defineProps({
  tone: { type: String, default: '' },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  closable: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
})
const emit = defineEmits(['close'])
const t = computed(() => props.tone ? (STATUS_TONES[props.tone] || null) : null)
const style = computed(() => t.value ? { background: t.value.bg, color: t.value.fg } : null)
</script>

<template>
  <span :class="['k-tag', 'k-tag-' + size, tone ? '' : 'is-default']" :style="style">
    <Icon v-if="icon" :name="icon" :size="size === 'sm' ? 11 : 13" />
    <span><slot>{{ label }}</slot></span>
    <button v-if="closable" type="button" class="k-tag-close" aria-label="Удалить" @click.stop="$emit('close')"><Icon name="close" :size="12" /></button>
  </span>
</template>
