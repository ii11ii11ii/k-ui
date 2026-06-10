import { reactive } from 'vue'

/* Глобальные тосты. <ToastHost> монтируется один раз (teleport в body).
   const toast = useToast(); toast.success('Сохранено'); toast.error({ title, message }). */
export interface ToastItem { id: number; type: string; title: string; message: string; duration: number; icon?: string }
export const toastState = reactive<{ items: ToastItem[] }>({ items: [] })
let seq = 0
type ToastInput = string | Partial<Omit<ToastItem,'id'>> & { text?: string }
function normalize(o: ToastInput){ return typeof o === 'string' ? { message: o } : (o || {}) }
export function pushToast(opts: ToastInput){
  const o: any = normalize(opts)
  const id = ++seq
  const item: ToastItem = { id, type: o.type || 'info', title: o.title || '', message: o.message || o.text || '', duration: o.duration == null ? 3500 : o.duration, icon: o.icon }
  toastState.items.push(item)
  if (item.duration > 0) setTimeout(() => dismissToast(id), item.duration)
  return id
}
export function dismissToast(id: number){ const i = toastState.items.findIndex((t) => t.id === id); if (i >= 0) toastState.items.splice(i, 1) }
export function clearToasts(){ toastState.items.splice(0) }
export function useToast(){
  return {
    show: pushToast,
    success: (o: ToastInput) => pushToast({ ...normalize(o), type: 'success' } as any),
    error:   (o: ToastInput) => pushToast({ ...normalize(o), type: 'danger' } as any),
    info:    (o: ToastInput) => pushToast({ ...normalize(o), type: 'info' } as any),
    warning: (o: ToastInput) => pushToast({ ...normalize(o), type: 'warning' } as any),
    dismiss: dismissToast,
    clear: clearToasts,
  }
}
