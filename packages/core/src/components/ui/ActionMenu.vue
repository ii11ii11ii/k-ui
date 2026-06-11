<script setup lang="ts">
/* Меню действий по строке: рендер в body (teleport, fixed), не клипается
   scroll-контейнером таблицы. Слот #trigger получает { open, toggle };
   слот по умолчанию — пункты <MenuItem>. */
import { ref, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  width: { type: Number, default: 184 },
  align: { type: String, default: 'right' },
})
const open = ref(false)
const wrapRef = ref(null)
const pos = ref(null)
let cleanup = null

function place() {
  const el = wrapRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  let left = props.align === 'right' ? r.right - props.width : r.left
  left = Math.max(8, Math.min(left, window.innerWidth - props.width - 8))
  let top = r.bottom + 6
  const estH = 168
  if (top + estH > window.innerHeight - 8) top = Math.max(8, r.top - estH - 2)
  pos.value = { top, left }
}
function onKey(e) { if (e.key === 'Escape') doClose() }
function doOpen() {
  open.value = true
  nextTick(() => {
    place()
    window.addEventListener('resize', place, true)
    window.addEventListener('scroll', place, true)
    window.addEventListener('keydown', onKey)
    cleanup = () => {
      window.removeEventListener('resize', place, true)
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('keydown', onKey)
    }
  })
}
function doClose() { open.value = false; if (cleanup) { cleanup(); cleanup = null } }
function toggle() { open.value ? doClose() : doOpen() }
onBeforeUnmount(() => { if (cleanup) cleanup() })
</script>

<template>
  <span class="k-menu-wrap" ref="wrapRef">
    <slot name="trigger" :open="open" :toggle="toggle" />
    <teleport to="body">
      <template v-if="open">
        <div class="pop-backdrop" @mousedown="doClose"></div>
        <div class="k-menu-pop k-menu-pop-fixed" role="menu" @click="doClose"
          :style="{ top: (pos ? pos.top : -9999) + 'px', left: (pos ? pos.left : -9999) + 'px', minWidth: width + 'px' }">
          <slot />
        </div>
      </template>
    </teleport>
  </span>
</template>
