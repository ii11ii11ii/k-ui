import { reactive } from 'vue'

/* =========================================================================
   useConfirm — глобальное подтверждение действия (императивный вызов).
   ПРАВИЛО СИСТЕМЫ: любое удаление спрашивает подтверждение.
     const { confirmDialog, confirmDelete, confirmRestart } = useConfirm()
     await confirmDelete({ title, message })  → boolean
   <ConfirmHost> монтируется один раз (телепорт в body) и слушает state.
   ========================================================================= */
export const confirmState = reactive({ open: false, opts: {}, _resolve: null })

function request(opts) {
  return new Promise((resolve) => {
    confirmState.opts = opts
    confirmState.open = true
    confirmState._resolve = resolve
  })
}
export function resolveConfirm(val) {
  confirmState.open = false
  const r = confirmState._resolve
  confirmState._resolve = null
  if (r) r(val)
}

export function confirmDialog(opts = {}) { return request(opts) }
export function confirmDelete(opts = {}) {
  return request({ icon: 'trash', danger: true, confirmLabel: 'Удалить', title: 'Удалить?', ...opts })
}
export function confirmRestart(opts = {}) {
  return request({ icon: 'power', danger: false, confirmIcon: 'power', confirmLabel: 'Перезагрузить', title: 'Перезагрузить?', ...opts })
}

export function useConfirm() { return { confirmDialog, confirmDelete, confirmRestart } }
