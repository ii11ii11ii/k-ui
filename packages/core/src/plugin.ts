import type { App, Plugin } from 'vue'
import * as components from './components'
import { vClickOutside, vAutofocus, vTooltip, vLoading } from './directives'

export interface KometumUIOptions {
  /** Доп. префикс к именам компонентов. Имена УЖЕ канонические (K…), поэтому
   *  по умолчанию префикс пустой: KIcon → <k-icon>. Менять не требуется. */
  prefix?: string
  /** Регистрировать директивы (v-click-outside, v-autofocus, v-tooltip, v-loading). По умолчанию true. */
  directives?: boolean
}

/* Слитные аббревиатуры дают «грязный» авто-kebab (KQRCode → <k-q-r-code>).
   Регистрируем их под «чистым» именем, чтобы тег был <k-qrcode> / <k-hbars>. */
const KEBAB_ALIAS: Record<string, string> = {
  KQRCode: 'KQrcode',
  KHBars: 'KHbars',
}

/* Глобальная установка: app.use(KometumUI).
   Регистрирует ВСЕ компоненты и директивы. Для tree-shaking используйте
   точечные именованные импорты вместо плагина. */
export const KometumUI: Plugin = {
  install(app: App, options: KometumUIOptions = {}) {
    const prefix = options.prefix ?? ''
    for (const [name, comp] of Object.entries(components)) {
      const regName = KEBAB_ALIAS[name] ?? name
      app.component(prefix + regName, comp as any)
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
