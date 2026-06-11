# k-ui

Vue 3 UI-библиотека **Кометум** — компоненты, композаблы, директивы, иконки и токены тем
(светлая/тёмная, плотность, акцент). Независимый npm-пакет: ставится в любой проект на Vue 3.

```bash
npm install @ii11/k-ui
```

```ts
// main.ts
import { createApp } from 'vue'
import KometumUI from '@ii11/k-ui'
import '@ii11/k-ui/style.css'
import App from './App.vue'

createApp(App).use(KometumUI).mount('#app')
```

```vue
<!-- или точечно, с tree-shaking (имена с префиксом K, теги <k-*>) -->
<script setup lang="ts">
import { KDataTable, KFormField, useFormGuard } from '@ii11/k-ui'
</script>
```

> Пакет **публичный** — устанавливается без токена (npmjs.com).

## Монорепо

```
k-ui/
├── packages/core/      # сам пакет (публикуется как «k-ui»)
│   └── src/
│       ├── components/ #   97: ui · inputs · actions · feedback · layout · nav · display · charts
│       ├── composables/#   useFormGuard · useConfirm · useToast · useTheme · useBreakpoint · …(8)
│       ├── directives/ #   v-click-outside · v-autofocus · v-tooltip · v-loading
│       ├── icons/      #   набор SVG-иконок + <KIcon> / <k-icon>
│       ├── styles/     #   index.scss → dist/style.css (темы через data-атрибуты)
│       └── utils/      #   format, tones, filters, security
├── stories/            # витрина Histoire
└── docs/               # README · USAGE · CHANGELOG
```

## Команды

```bash
npm install          # установить зависимости (workspaces)
npm run dev          # dev-сервер пакета (packages/core)
npm run build        # сборка ESM + dist/style.css + типы → packages/core/dist
npm run story        # витрина Histoire
npm run type-check   # проверка типов (vue-tsc)
npm run publish:lib  # публикация в публичный npm (нужен npm login или NPM_TOKEN)
```

- Первая заливка репозитория и релизы (публичный npm) — [`PUBLISHING.md`](PUBLISHING.md).
- Установка в свои проекты (без токена) — [`INSTALL.md`](INSTALL.md).
- Подробности API и сценарии — [`docs/USAGE.md`](docs/USAGE.md).
