import type { Directive } from 'vue'

/* v-loading="bool" — оверлей-маска со спиннером поверх контейнера. */
function ensureMask(el: HTMLElement){
  let mask = el.querySelector(':scope > .kui-loading-mask') as HTMLElement | null
  if (!mask) {
    mask = document.createElement('div'); mask.className = 'kui-loading-mask'
    const ring = document.createElement('span'); ring.className = 'kui-spinner-ring'
    ring.style.width = '24px'; ring.style.height = '24px'; ring.style.borderWidth = '3px'; ring.style.display = 'inline-block'; ring.style.borderRadius = '50%'; ring.style.borderStyle = 'solid'
    mask.appendChild(ring); el.appendChild(mask)
  }
  return mask
}
function removeMask(el: HTMLElement){ const m = el.querySelector(':scope > .kui-loading-mask'); if (m) m.remove() }

export const vLoading: Directive<HTMLElement, boolean> = {
  mounted(el, b){ el.classList.add('kui-loading-host'); if (b.value) ensureMask(el) },
  updated(el, b){ if (b.value) ensureMask(el); else removeMask(el) },
  unmounted(el){ removeMask(el) },
}
export default vLoading
