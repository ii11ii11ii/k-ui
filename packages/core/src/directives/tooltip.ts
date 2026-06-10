import type { Directive } from 'vue'

/* v-tooltip="'Текст'"  /  v-tooltip:right="'Текст'"
   Лёгкий нативный тултип на CSS-классе .kui-tip (стили — в styles/index.scss).
   Без зависимостей и порталов: подпись хранится в data-атрибутах, показ — по :hover. */
type TipValue = string | { text: string; placement?: 'top' | 'right' | 'bottom' | 'left' }

function apply(el: HTMLElement, value: TipValue, arg?: string) {
  const text = typeof value === 'string' ? value : value?.text
  const placement = (typeof value === 'object' && value?.placement) || arg || 'top'
  if (!text) {
    el.removeAttribute('data-kui-tip')
    el.classList.remove('kui-tip')
    return
  }
  el.setAttribute('data-kui-tip', text)
  el.setAttribute('data-kui-tip-place', placement)
  el.classList.add('kui-tip')
}

export const vTooltip: Directive<HTMLElement, TipValue> = {
  mounted(el, b) { apply(el, b.value, b.arg) },
  updated(el, b) { apply(el, b.value, b.arg) },
  unmounted(el) {
    el.removeAttribute('data-kui-tip')
    el.removeAttribute('data-kui-tip-place')
    el.classList.remove('kui-tip')
  },
}

export default vTooltip
