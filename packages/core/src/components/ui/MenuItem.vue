<script setup lang="ts">
/* Пункт меню (кнопка или ссылка). danger — красный; disabled — неактивный. */
import Icon from './Icon.vue'

const props = defineProps({
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  danger: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: undefined },
  title: { type: String, default: undefined },
})
const emit = defineEmits(['click'])
function onClick(e) {
  if (props.disabled) { e.stopPropagation(); return }
  if (props.href === '#') e.preventDefault()
  emit('click', e)
}
</script>

<template>
  <a v-if="href !== undefined" :class="['menu-item', danger ? 'is-danger' : '', disabled ? 'is-disabled' : '']"
    :href="href" role="menuitem" :title="title" @click="onClick">
    <span v-if="icon" class="menu-ico"><Icon :name="icon" :size="17" /></span>
    <span class="menu-item-label">{{ label }}</span>
    <span v-if="hint" class="menu-item-hint">{{ hint }}</span>
  </a>
  <button v-else :class="['menu-item', danger ? 'is-danger' : '', disabled ? 'is-disabled' : '']"
    role="menuitem" :disabled="disabled" :title="title" @click="onClick">
    <span v-if="icon" class="menu-ico"><Icon :name="icon" :size="17" /></span>
    <span class="menu-item-label">{{ label }}</span>
    <span v-if="hint" class="menu-item-hint">{{ hint }}</span>
  </button>
</template>
