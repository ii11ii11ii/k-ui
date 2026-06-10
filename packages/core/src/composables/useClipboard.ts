import { ref } from 'vue'

/* Копирование в буфер с флагом copied (сбрасывается через 1.5с). */
export function useClipboard(){
  const copied = ref(false)
  let t: any = null
  async function copy(text: any){
    const s = String(text == null ? '' : text)
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(s)
      else { const ta = document.createElement('textarea'); ta.value = s; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove() }
      copied.value = true; clearTimeout(t); t = setTimeout(() => copied.value = false, 1500)
      return true
    } catch (e) { return false }
  }
  return { copied, copy }
}
