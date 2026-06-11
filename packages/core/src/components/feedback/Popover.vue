<script setup lang="ts">
/* Поповер. Слот по умолчанию — триггер ({ open, toggle }); слот #content — панель ({ close }). */
import { ref } from 'vue'
const props = defineProps({
  placement: { type: String, default: 'bottom' },
  width: { type: [Number, String], default: 240 },
})
const emit = defineEmits(['open','close'])
const open = ref(false)
function toggle(){ open.value = !open.value; emit(open.value ? 'open' : 'close') }
function close(){ open.value = false; emit('close') }
defineExpose({ open, toggle, close })
</script>

<template>
  <span class="k-pop-wrap">
    <span class="k-pop-trigger" @click="toggle"><slot :open="open" :toggle="toggle" /></span>
    <template v-if="open">
      <div class="k-pop-backdrop" @click="close"></div>
      <div :class="['k-pop-panel', 'k-pop-' + placement]" :style="{ width: typeof width === 'number' ? width + 'px' : width }">
        <slot name="content" :close="close" />
      </div>
    </template>
  </span>
</template>
