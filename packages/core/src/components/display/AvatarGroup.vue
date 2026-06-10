<script setup lang="ts">
/* Стопка аватаров с переполнением. names:string[]; max — сколько показать. */
import { computed } from 'vue'
import Avatar from '../ui/Avatar.vue'
const props = defineProps({ names: { type: Array, default: () => [] }, max: { type: Number, default: 4 }, size: { type: Number, default: 28 } })
const shown = computed(() => props.names.slice(0, props.max))
const extra = computed(() => Math.max(0, props.names.length - props.max))
</script>

<template>
  <div class="kui-avatar-group">
    <span v-for="(n, i) in shown" :key="i" class="kui-avatar-group-item"><Avatar :name="n" :size="size" /></span>
    <span v-if="extra" class="kui-avatar-more" :style="{ width: size + 'px', height: size + 'px' }">+{{ extra }}</span>
  </div>
</template>
