<script setup lang="ts">
/* Секция аккордеона. name — уникальный ключ; title или слот #title. */
import { inject, computed } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ name: { type: [String, Number], required: true }, title: { type: String, default: '' }, disabled: { type: Boolean, default: false } })
const ctx = inject<any>('kCollapse', null)
const open = computed(() => ctx ? ctx.isOpen(props.name) : false)
function toggle(){ if (!props.disabled && ctx) ctx.toggle(props.name) }
</script>

<template>
  <div :class="['k-collapse-item', open ? 'is-open' : '', disabled ? 'is-disabled' : '']">
    <button type="button" class="k-collapse-head" :disabled="disabled" @click="toggle">
      <span class="k-collapse-title"><slot name="title">{{ title }}</slot></span>
      <Icon name="chevronDown" :size="16" class="k-collapse-caret" />
    </button>
    <div v-show="open" class="k-collapse-body"><slot /></div>
  </div>
</template>
