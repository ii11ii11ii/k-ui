import type { Directive, DirectiveBinding } from 'vue'

/* v-click-outside="handler" — вызывает handler при клике вне элемента.
   Используется поповерами/меню/слайд-оверами поверх собственной логики. */
type Handler = (e: Event) => void
const map = new WeakMap<HTMLElement, (e: Event) => void>()

export const vClickOutside: Directive<HTMLElement, Handler> = {
  mounted(el, binding: DirectiveBinding<Handler>) {
    const listener = (e: Event) => {
      if (el === e.target || el.contains(e.target as Node)) return
      if (typeof binding.value === 'function') binding.value(e)
    }
    map.set(el, listener)
    // capture:false, на следующем тике, чтобы не ловить открывающий клик
    setTimeout(() => document.addEventListener('mousedown', listener), 0)
  },
  unmounted(el) {
    const listener = map.get(el)
    if (listener) document.removeEventListener('mousedown', listener)
    map.delete(el)
  },
}

export default vClickOutside
