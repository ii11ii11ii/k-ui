<script setup lang="ts">
/* Разворачивающееся меню (dropdown). Слот #trigger получает { open, toggle, close };
   слот по умолчанию — содержимое (клик внутри закрывает меню). */
import { ref } from 'vue'

const props = defineProps({
  align: { type: String, default: 'right' },
  width: { type: [Number, String], default: null },
})
const open = ref(false)
const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)
</script>

<template>
  <div class="menu-wrap">
    <slot name="trigger" :open="open" :toggle="toggle" :close="close" />
    <template v-if="open">
      <div class="pop-backdrop" @click="close"></div>
      <div :class="`menu-pop align-${align}`" role="menu" @click="close"
        :style="width ? { minWidth: typeof width === 'number' ? width + 'px' : width } : null">
        <slot />
      </div>
    </template>
  </div>
</template>
