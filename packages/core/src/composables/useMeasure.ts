import { ref, onMounted, onBeforeUnmount } from 'vue'

/* Измеритель ширины контейнера (для отзывчивых SVG без искажения штрихов).
   Возвращает [ref, width]. */
export function useMeasure() {
  const el = ref(null)
  const w = ref(0)
  let ro = null
  onMounted(() => {
    if (!el.value) return
    ro = new ResizeObserver(() => { w.value = el.value ? el.value.clientWidth : 0 })
    ro.observe(el.value)
    w.value = el.value.clientWidth
  })
  onBeforeUnmount(() => { if (ro) ro.disconnect() })
  return [el, w]
}
