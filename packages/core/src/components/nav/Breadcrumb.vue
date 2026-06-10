<script setup lang="ts">
/* Хлебные крошки. items:[{label,href?,icon?}] или слот из BreadcrumbItem. */
import Icon from '../ui/Icon.vue'
const props = defineProps({ items: { type: Array, default: () => [] }, separator: { type: String, default: '/' } })
const emit = defineEmits(['select'])
</script>

<template>
  <nav class="kui-bc" aria-label="breadcrumb">
    <slot>
      <template v-for="(it, i) in items" :key="i">
        <a v-if="it.href" class="kui-bc-item" :href="it.href"><Icon v-if="it.icon" :name="it.icon" :size="14" />{{ it.label }}</a>
        <span v-else :class="['kui-bc-item', i === items.length - 1 ? 'is-current' : '']" @click="$emit('select', it, i)"><Icon v-if="it.icon" :name="it.icon" :size="14" />{{ it.label }}</span>
        <span v-if="i < items.length - 1" class="kui-bc-sep">{{ separator }}</span>
      </template>
    </slot>
  </nav>
</template>
