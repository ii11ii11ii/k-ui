import type { Directive } from 'vue'

/* v-tooltip="'Текст'"  /  v-tooltip:right="'Текст'"
   Лёгкий нативный тултип на CSS-классе .k-tip (стили — в styles/index.scss).
   Без зависимостей и порталов: подпись хранится в data-атрибутах, показ — по :hover. */
type TipValue = string | { text: string; placement?: 'top' | 'right' | 'bottom' | 'left' }

function apply(el: HTMLElement, value: TipValue, arg?: string) {
  const text = typeof value === 'string' ? value : value?.text
  const placement = (typeof value === 'object' && value?.placement) || arg || 'top'
  if (!text) {
    el.removeAttribute('data-k-tip')
    el.classList.remove('k-tip')
    return
  }
  el.setAttribute('data-k-tip', text)
  el.setAttribute('data-k-tip-place', placement)
  el.classList.add('k-tip')
}

export const vTooltip: Directive<HTMLElement, TipValue> = {
  mounted(el, b) { apply(el, b.value, b.arg) },
  updated(el, b) { apply(el, b.value, b.arg) },
  unmounted(el) {
    el.removeAttribute('data-k-tip')
    el.removeAttribute('data-k-tip-place')
    el.classList.remove('k-tip')
  },
}

export default vTooltip
