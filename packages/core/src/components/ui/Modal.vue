<script setup lang="ts">
/* Унифицированное модальное окно (выезжает справа). Телепорт в body.
   Закрытие: клик по затемнению, крестик внутри (слот), Esc — закрывают
   ТОЛЬКО верхнее окно в стопке. width — фикс-ширина; leftOffset — отступ слева. */
import { watch, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  leftOffset: { type: String, default: undefined },
  width: { type: String, default: undefined },
  level: { type: Number, default: 0 },
  label: { type: String, default: '' },
})
const emit = defineEmits(['close'])

/* Трансформ/анимацию слайда задаёт CSS (.modal-root.is-open > .modal-panel).
   Телепорт в #modal-layer (внутри .app) — как в оригинале (createPortal). */
const panelStyle = computed(() => (props.width ? { width: props.width, left: 'auto' } : { left: props.leftOffset }))

const entry = { close: () => emit('close') }
function onKey(e) {
  if (e.key === 'Escape' && Modal_stack.length) {
    const top = Modal_stack[Modal_stack.length - 1]
    if (top && top.close) top.close()
  }
}
watch(() => props.open, (v) => {
  entry.close = () => emit('close')
  const idx = Modal_stack.indexOf(entry)
  if (v && idx < 0) Modal_stack.push(entry)
  if (!v && idx >= 0) Modal_stack.splice(idx, 1)
}, { immediate: true })
onBeforeUnmount(() => { const i = Modal_stack.indexOf(entry); if (i >= 0) Modal_stack.splice(i, 1) })

// module-level Esc stack (shared across all Modal instances)
window.__kModalStack = window.__kModalStack || []
const Modal_stack = window.__kModalStack
if (!window.__kModalEsc) { window.__kModalEsc = true; window.addEventListener('keydown', onKey) }
</script>

<template>
  <teleport to="#modal-layer">
    <div :class="['k-modal-root', open ? 'is-open' : '']" :style="{ zIndex: 300 + level * 40 }"
      :aria-hidden="!open" role="dialog" aria-modal="true" :aria-label="label">
      <div class="k-modal-scrim" @click="emit('close')"></div>
      <div class="k-modal-panel" :style="panelStyle">
        <slot />
      </div>
    </div>
  </teleport>
</template>
