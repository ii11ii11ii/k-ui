import type { App, Plugin } from 'vue'
import * as components from './components'
import { vClickOutside, vAutofocus, vTooltip, vLoading } from './directives'

export interface KometumUIOptions {
  /** Префикс для глобально регистрируемых компонентов, напр. 'K' → <KIcon/>. По умолчанию без префикса. */
  prefix?: string
  /** Регистрировать директивы (v-click-outside, v-autofocus, v-tooltip). По умолчанию true. */
  directives?: boolean
}

/* Глобальная установка: app.use(KometumUI).
   Регистрирует ВСЕ компоненты и директивы. Для tree-shaking используйте
   точечные именованные импорты вместо плагина. */
export const KometumUI: Plugin = {
  install(app: App, options: KometumUIOptions = {}) {
    const prefix = options.prefix ?? ''
    for (const [name, comp] of Object.entries(components)) {
      app.component(prefix + name, comp as any)
    }
    if (options.directives !== false) {
      app.directive('click-outside', vClickOutside)
      app.directive('autofocus', vAutofocus)
      app.directive('tooltip', vTooltip)
      app.directive('loading', vLoading)
    }
  },
}

export default KometumUI
