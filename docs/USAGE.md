# Установка и использование k-ui

## 1. Установка

```bash
npm install @ii11/k-ui
# peer-зависимость: vue@^3.4
```

> Пакет публичный (npmjs.com) — ставится без токена и без `.npmrc`.

## 2. Подключение стилей (обязательно, один раз)

Стили поставляются единым файлом и подключаются в корне приложения:

```ts
import '@ii11/k-ui/style.css'
```

Либо исходный SCSS (если хотите импортировать токены в свой Sass-пайплайн):

```scss
@use '@ii11/k-ui/scss' as *;
```

## 3. Два способа подключения компонентов

### А. Глобальный плагин — всё сразу

```ts
import KometumUI from '@ii11/k-ui'
import '@ii11/k-ui/style.css'

app.use(KometumUI)
// опции:
app.use(KometumUI, { prefix: 'K', directives: true })
// → <KIcon/>, <KDataTable/> …
```

### Б. Точечные импорты — tree-shaking (рекомендуется для приложений)

```vue
<script setup lang="ts">
import { KIcon, KDataTable, KFormField, KModal, useFormGuard } from '@ii11/k-ui'
</script>
```

В сборку попадёт только то, что реально импортировано.

## 4. Темы, плотность, акцент

Управляются `data`-атрибутами на `<html>` — переключаются в рантайме без пересборки:

```html
<html data-theme="light" data-density="comfortable" data-accent="indigo">
```
| Атрибут        | Значения                                              | По умолчанию    |
|----------------|-------------------------------------------------------|-----------------|
| `data-theme`   | `light` · `dark`                                      | `light`         |
| `data-density` | `comfortable` · `compact`                             | `comfortable`   |
| `data-accent`  | `indigo` · `violet` · `blue` · `teal` · `amber` · …   | `indigo`        |

```ts
document.documentElement.setAttribute('data-theme', 'dark')
```

## 5. Шрифты

Пакет рассчитан на **Inter** (текст) и **Inter Tight** (заголовки и числа-дисплей),
с табличными цифрами (`tnum`) во всех таблицах. Подключите их в приложении
(Google Fonts или self-host) — пакет шрифты не тянет:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Inter+Tight:wght@500..700&display=swap" rel="stylesheet">
```

## 6. Что входит в пакет (97 компонентов)

**Поля ввода `inputs/` (15):** TextInput, Textarea, Select, NumberInput, DateInput, Checkbox(+Group),
Radio(+Group), Slider, FileUpload, SearchInput, Stepper, PhoneInput, PasswordField, ComboBox*.

**Кнопки/меню:** Button, ButtonGroup, IconBtn, Menu(+Item/Header/Field/Divider), ActionMenu.

**Обратная связь `feedback/` (10):** Toast (+useToast), Alert, Spinner, Skeleton, Result, Empty,
Tooltip, Popover, Popconfirm, Drawer, ConfirmHost*.

**Layout `layout/` (9):** Container, Row, Col, Space, Divider, Card, Collapse(+Item), ScrollArea.

**Навигация `nav/`:** Breadcrumb(+Item), Steps, Tabs, MiniPager, Pager.

**Данные `display/`:** List(+Item), Descriptions(+Item), Tree, Timeline(+Item), Tag, AvatarGroup,
ProgressCircle, Statistic, CodeChip, DocChip, RoleChip, MpTag, OwnPark, Tip, Money, Meter, Avatar,
StatusBadge, TonePill, CollapsibleKpis, Calendar.

**Таблицы:** **DataTable**, FilterControl, FilterHead, FiltersSheet, SortHead, ColumnsMenu, ColumnsPanel.

**Формы:** FormField, FormGroup, FormErrorHint, FormDeleteButton, InlineEdit.

**Графики `charts/` (5):** AreaLineChart, BarChart, Donut, HBars, Sparkline.

**Композаблы (8):** `useFormGuard`, `useConfirm`, `useTableColumns`, `useMeasure`, `useToast`,
`useTheme`, `useBreakpoint`, `useClipboard`.

**Директивы (4):** `v-click-outside`, `v-autofocus`, `v-tooltip`, `v-loading`.

**Утилиты:** `fmtMoney`, `STATUS_TONES`, фильтры дат/значений, `escapeHtml`, телефонные маски.

## 7. Ключевые сценарии

### Форма с валидацией по «Сохранить»

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { KFormField, KFormErrorHint, useFormGuard } from '@ii11/k-ui'

const f = reactive({ name: '', inn: '' })
const guard = useFormGuard(f, [
  { key: 'name', label: 'Название' },
  { key: 'inn', label: 'ИНН' },
])
function save() { if (guard.check()) emit('save', { ...f }) }
</script>

<template>
  <KFormField label="Название" v-model:value="f.name" :invalid="guard.invalid('name')" />
  <KFormField label="ИНН" v-model:value="f.inn" :invalid="guard.invalid('inn')" />
  <KFormErrorHint :missing="guard.missing" />
  <button class="k-button" @click="save">Сохранить</button>
</template>
```

### Таблица с колонками, фильтрами и раскрытием

```vue
<script setup lang="ts">
import { KDataTable, useTableColumns } from '@ii11/k-ui'
const columns = [
  { key: 'name', label: 'Клиент', sortable: true },
  { key: 'sum', label: 'Сумма', align: 'right' },
]
const { state, api } = useTableColumns('clients_v1', columns)
</script>

<template>
  <KDataTable :columns="columns" :rows="rows" :state="state">
    <template #cell="{ column, row }">
      <span v-if="column.key === 'name'">{{ row.name }}</span>
    </template>
    <template #expanded="{ row }">…</template>
  </KDataTable>
</template>
```

### Подтверждение удаления

```ts
import { useConfirm } from '@ii11/k-ui'
const { confirmDelete } = useConfirm()
if (await confirmDelete({ message: 'Удалить запись?' })) remove()
// один раз смонтируйте <ConfirmHost /> в корне приложения
```

## 8. Сборка и публикация (публичный npm)

Публикуем в npmjs.com. Два способа:

**Автоматически (рекомендуется)** — нужен секрет `NPM_TOKEN` в репозитории; CI (`.github/workflows/publish.yml`) соберёт и опубликует по релизу или кнопке Run workflow.

**Вручную** — локально:

```bash
npm login                       # вход в npmjs
npm install
npm run build                   # → packages/core/dist (k-ui.js, style.css, index.d.ts)
npm -w packages/core publish --access public
```

Реестр и access заданы в `packages/core/package.json → publishConfig`
(`registry: registry.npmjs.org`, `access: public`). Подробно — [`../PUBLISHING.md`](../PUBLISHING.md).

## 9. Граница пакета

Пакет **не зависит** от Pinia, роутера и данных приложения (peer — только `vue`).
Оболочка админки (sidebar/topbar, навигация, mock-данные `KADMIN`) намеренно
**оставлена в приложении** — она завязана на стор и контент конкретного проекта.
Переносите её отдельно, опираясь на компоненты `k-ui`.
