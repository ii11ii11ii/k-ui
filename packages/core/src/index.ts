/* k-ui — публичная точка входа пакета.
   ─ Глобально:  import KometumUI from 'k-ui'; app.use(KometumUI)
   ─ Точечно:    import { Icon, DataTable, useFormGuard } from 'k-ui'
   ─ Стили:      import 'k-ui/style.css'  (один раз, в корне приложения)
*/
import './styles/index.scss'

export * from './components'
export * from './composables'
export * from './directives'
export * from './icons'
export * from './utils'

export { KometumUI, type KometumUIOptions } from './plugin'
export { default } from './plugin'

export const version = '0.4.0'
