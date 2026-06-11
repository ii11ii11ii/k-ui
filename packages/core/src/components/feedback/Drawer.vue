<script setup lang="ts">
/* Выезжающая панель. v-model:open. side: right|left|top|bottom. teleport в body. */
import Icon from '../ui/Icon.vue'
const props = defineProps({
  open: { type: Boolean, default: false },
  side: { type: String, default: 'right' },
  size: { type: [Number, String], default: 420 },
  title: { type: String, default: '' },
  closable: { type: Boolean, default: true },
})
const emit = defineEmits(['update:open','close'])
function close(){ emit('update:open', false); emit('close') }
const dim = (v: any) => (typeof v === 'number' ? v + 'px' : v)
</script>

<template>
  <teleport to="body">
    <div :class="['k-drawer-root', open ? 'is-open' : '']" :aria-hidden="!open">
      <div class="k-drawer-mask" @click="close"></div>
      <div :class="['k-drawer-panel', 'k-drawer-' + side]" role="dialog"
        :style="(side === 'left' || side === 'right') ? { width: dim(size) } : { height: dim(size) }">
        <div v-if="title || closable" class="k-drawer-head">
          <span class="k-drawer-title">{{ title }}</span>
          <button v-if="closable" type="button" class="k-drawer-close" aria-label="Закрыть" @click="close"><Icon name="close" :size="16" /></button>
        </div>
        <div class="k-drawer-body"><slot /></div>
        <div v-if="$slots.footer" class="k-drawer-foot"><slot name="footer" /></div>
      </div>
    </div>
  </teleport>
</template>
