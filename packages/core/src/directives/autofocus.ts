import type { Directive } from 'vue'

/* v-autofocus — фокус на элементе при монтировании (модалки, инлайн-редактор).
   v-autofocus="false" отключает. */
export const vAutofocus: Directive<HTMLElement, boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value === false) return
    requestAnimationFrame(() => {
      const target = (el.matches('input,textarea,select,[tabindex]')
        ? el
        : el.querySelector<HTMLElement>('input,textarea,select,[tabindex]')) || el
      target.focus?.()
    })
  },
}

export default vAutofocus
