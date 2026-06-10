<script setup lang="ts">
/* Кнопка. variant: primary|ghost|soft|danger|danger-ghost. size: md|sm. */
import Icon from '../ui/Icon.vue'
const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  icon: { type: String, default: '' },
  iconRight: { type: String, default: '' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
})
const emit = defineEmits(['click'])
function onClick(e){ if (props.disabled || props.loading) return; emit('click', e) }
</script>

<template>
  <button :type="type" :disabled="disabled || loading"
    :class="['btn', 'btn-' + variant, size === 'sm' ? 'btn-sm' : '', block ? 'btn-block' : '', active ? 'is-active' : '', loading ? 'is-loading' : '']"
    @click="onClick">
    <span v-if="loading" class="btn-spin" aria-hidden="true"></span>
    <Icon v-else-if="icon" :name="icon" :size="size === 'sm' ? 15 : 16" />
    <span v-if="$slots.default" class="btn-label"><slot /></span>
    <Icon v-if="iconRight && !loading" :name="iconRight" :size="size === 'sm' ? 15 : 16" />
  </button>
</template>
