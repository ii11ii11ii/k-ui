<script setup lang="ts">
/* Хлебные крошки. items:[{label,href?,icon?}] или слот из BreadcrumbItem. */
import Icon from '../ui/Icon.vue'
const props = defineProps({ items: { type: Array, default: () => [] }, separator: { type: String, default: '/' } })
const emit = defineEmits(['select'])
</script>

<template>
  <nav class="k-bc" aria-label="breadcrumb">
    <slot>
      <template v-for="(it, i) in items" :key="i">
        <a v-if="it.href" class="k-bc-item" :href="it.href"><Icon v-if="it.icon" :name="it.icon" :size="14" />{{ it.label }}</a>
        <span v-else :class="['k-bc-item', i === items.length - 1 ? 'is-current' : '']" @click="$emit('select', it, i)"><Icon v-if="it.icon" :name="it.icon" :size="14" />{{ it.label }}</span>
        <span v-if="i < items.length - 1" class="k-bc-sep">{{ separator }}</span>
      </template>
    </slot>
  </nav>
</template>
