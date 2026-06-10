import { ref, watch } from 'vue'

/* Чтение/переключение темы, плотности и акцента через data-атрибуты на <html>. */
function attr(name: string, def: string){ return typeof document === 'undefined' ? def : (document.documentElement.getAttribute(name) || def) }
function setAttr(name: string, v: string){ if (typeof document !== 'undefined') document.documentElement.setAttribute(name, v) }

export function useTheme(){
  const theme = ref(attr('data-theme', 'light'))
  const density = ref(attr('data-density', 'comfortable'))
  const accent = ref(attr('data-accent', 'indigo'))
  watch(theme, (v) => setAttr('data-theme', v))
  watch(density, (v) => setAttr('data-density', v))
  watch(accent, (v) => setAttr('data-accent', v))
  function toggleTheme(){ theme.value = theme.value === 'dark' ? 'light' : 'dark' }
  return { theme, density, accent, toggleTheme }
}
