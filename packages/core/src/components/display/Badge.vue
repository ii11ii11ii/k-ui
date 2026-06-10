<script setup lang="ts">
/* Бейдж-счётчик/точка на углу содержимого (или standalone). */
import { computed } from 'vue'
const props = defineProps({ count: { type: Number, default: 0 }, dot: { type: Boolean, default: false }, max: { type: Number, default: 99 }, tone: { type: String, default: 'red' }, showZero: { type: Boolean, default: false }, standalone: { type: Boolean, default: false } })
const show = computed(() => props.dot || props.showZero || props.count > 0)
const text = computed(() => props.count > props.max ? props.max + '+' : String(props.count))
</script>

<template>
  <span :class="['kui-badge-wrap', standalone ? 'is-standalone' : '']">
    <slot />
    <sup v-if="show" :class="['kui-badge', dot ? 'is-dot' : '']" :style="{ background: 'var(--st-' + tone + '-dot)' }">{{ dot ? '' : text }}</sup>
  </span>
</template>
