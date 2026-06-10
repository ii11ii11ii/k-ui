<script setup lang="ts">
/* Секция аккордеона. name — уникальный ключ; title или слот #title. */
import { inject, computed } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ name: { type: [String, Number], required: true }, title: { type: String, default: '' }, disabled: { type: Boolean, default: false } })
const ctx = inject<any>('kuiCollapse', null)
const open = computed(() => ctx ? ctx.isOpen(props.name) : false)
function toggle(){ if (!props.disabled && ctx) ctx.toggle(props.name) }
</script>

<template>
  <div :class="['kui-collapse-item', open ? 'is-open' : '', disabled ? 'is-disabled' : '']">
    <button type="button" class="kui-collapse-head" :disabled="disabled" @click="toggle">
      <span class="kui-collapse-title"><slot name="title">{{ title }}</slot></span>
      <Icon name="chevronDown" :size="16" class="kui-collapse-caret" />
    </button>
    <div v-show="open" class="kui-collapse-body"><slot /></div>
  </div>
</template>
