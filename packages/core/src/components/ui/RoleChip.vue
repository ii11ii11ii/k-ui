<script setup lang="ts">
/* Чип роли пользователя. Развязан: meta:{label,tone,icon} напрямую,
   либо role + roles-карта. tone 'brand' — особый брендовый стиль. */
import { computed } from 'vue'
import Icon from './Icon.vue'
import { STATUS_TONES } from '../../utils/tones'
const props = defineProps({
  role: { type: String, default: '' },
  roles: { type: Object, default: null },
  meta: { type: Object, default: null },
  size: { type: String, default: 'md' },
})
const m = computed(() => props.meta || (props.roles && props.role ? props.roles[props.role] : null))
const brand = computed(() => !!(m.value && m.value.tone === 'brand'))
const t = computed(() => STATUS_TONES[m.value ? m.value.tone : 'gray'] || STATUS_TONES.gray)
const style = computed(() => (brand.value || !m.value) ? null : { background: t.value.bg, color: t.value.fg })
</script>

<template>
  <span v-if="!m" class="cell-dash">—</span>
  <span v-else :class="['k-role-chip', 'role-' + size, brand ? 'is-brand' : '']" :style="style" :title="m.label">
    <Icon :name="m.icon || 'shield'" :size="size === 'sm' ? 11 : 13" />
    <span class="truncate">{{ m.label }}</span>
  </span>
</template>
