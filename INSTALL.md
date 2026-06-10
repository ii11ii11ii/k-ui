# Установка `@ii11ii11ii/k-ui`

Пакет публикуется в **публичный npm-реестр (npmjs.com)** — ставится без токена и без `.npmrc`.

```bash
npm install @ii11ii11ii/k-ui
# peer-зависимость: vue@^3.4
```

```ts
// main.ts
import { createApp } from 'vue'
import KometumUI from '@ii11ii11ii/k-ui'
import '@ii11ii11ii/k-ui/style.css'
import App from './App.vue'

createApp(App).use(KometumUI).mount('#app')
```

```vue
<!-- или точечно, с tree-shaking -->
<script setup lang="ts">
import { DataTable, FormField, useFormGuard } from '@ii11ii11ii/k-ui'
</script>
```

Шрифты (Inter / Inter Tight) подключаются в приложении отдельно — см. `docs/USAGE.md`.

> Никакой `.npmrc` и токенов в проектах-потребителях не нужно — пакет публичный.
