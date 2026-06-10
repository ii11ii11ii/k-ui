/* Глобальный setup Histoire: подключаем стили пакета один раз и задаём
   дефолтную тему/плотность/акцент на <html> (как в приложении-потребителе). */
import { defineSetupVue3 } from '@histoire/plugin-vue'
import '@core/styles/index.scss'

export const setupVue3 = defineSetupVue3(() => {
  const html = document.documentElement
  if (!html.getAttribute('data-theme')) html.setAttribute('data-theme', 'light')
  if (!html.getAttribute('data-density')) html.setAttribute('data-density', 'comfortable')
  if (!html.getAttribute('data-accent')) html.setAttribute('data-accent', 'indigo')
})
