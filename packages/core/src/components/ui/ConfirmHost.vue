<script setup lang="ts">
/* Глобальное подтверждение действия (телепорт в body). Монтируется один раз.
   Источник состояния — composables/useConfirm.js (confirmState + resolveConfirm). */
import { watch, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'
import { confirmState, resolveConfirm } from '../../composables/useConfirm'

function onKey(e) {
  if (!confirmState.open) return
  if (e.key === 'Escape') { e.preventDefault(); resolveConfirm(false) }
  else if (e.key === 'Enter') { e.preventDefault(); resolveConfirm(true) }
}
watch(() => confirmState.open, (v) => {
  if (v) window.addEventListener('keydown', onKey, true)
  else window.removeEventListener('keydown', onKey, true)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey, true))
</script>

<template>
  <teleport to="body">
    <div v-if="confirmState.open" class="confirm-overlay" @mousedown="resolveConfirm(false)">
      <div class="confirm-box" role="alertdialog" aria-modal="true"
        :aria-label="confirmState.opts.title || 'Подтверждение'" @mousedown.stop>
        <span v-if="confirmState.opts.icon !== null"
          :class="['confirm-ico', confirmState.opts.danger !== false ? 'is-danger' : '']">
          <Icon :name="confirmState.opts.icon || 'trash'" :size="22" />
        </span>
        <div class="confirm-title">{{ confirmState.opts.title || 'Подтвердите действие' }}</div>
        <div v-if="confirmState.opts.message" class="confirm-msg">{{ confirmState.opts.message }}</div>
        <div class="confirm-acts">
          <button v-if="confirmState.opts.cancelLabel !== null && confirmState.opts.cancelLabel !== false"
            class="btn btn-ghost" @click="resolveConfirm(false)">{{ confirmState.opts.cancelLabel || 'Отмена' }}</button>
          <button :class="['btn', confirmState.opts.danger !== false ? 'btn-danger' : 'btn-primary']"
            autofocus @click="resolveConfirm(true)">
            <Icon :name="confirmState.opts.confirmIcon || (confirmState.opts.danger !== false ? 'trash' : 'check')" :size="15" />
            {{ confirmState.opts.confirmLabel || 'Удалить' }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
