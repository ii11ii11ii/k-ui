# Changelog

Формат — [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
версионирование — [SemVer](https://semver.org/lang/ru/).

## [Unreleased]

## [0.4.0] — 2026-06-11

**BREAKING** — единый нейминг с префиксом «k» (как Element Plus / Vuetify). Строки `kui` удалены.

### Changed (миграция потребителей обязательна)
- **Имена компонентов → префикс `K`:** `Icon → KIcon`, `DataTable → KDataTable`, `Modal → KModal`,
  `Button → KButton`, … (все 117). Теги при глобальной регистрации — kebab: `<k-icon>`, `<k-data-table>`.
  Слитные аббревиатуры — явные алиасы: `<k-qrcode>` (KQRCode), `<k-hbars>` (KHBars).
- **CSS-классы:** префикс `kui-*` → `k-*`; корневой класс компонента = его тегу.
- **Нормализация ядра «корень = имя компонента»:** `.btn → .k-button`, `.fld → .k-input-field`,
  `.dt/.data-table → .k-table`, `.menu → .k-menu`, `.modal → .k-modal`, `.combo → .k-combo-box`,
  `.seg/.segmented → .k-segmented`, `.switch → .k-switch`, `.stepper → .k-stepper`, `.pager → .k-pager`,
  `.meter → .k-meter`, `.editable/.ie- → .k-inline-edit`, `.icon-btn → .k-icon-btn`,
  `.status-badge → .k-status-badge` (+ модификатор `.k-tone-pill` у TonePill), чипы → `.k-code-chip`/
  `.k-doc-chip`/`.k-role-chip`/`.k-mp-tag`, `.cal- → .k-calendar-`, `.avatar → .k-avatar`,
  `.money- → .k-money-`, `.phone-* → .k-phone-input-*`, `.pw-* → .k-password-field-*`. Состояния — общий словарь `.is-*` (без изменений).
- **Инструменты таблицы/фильтров:** FilterControl/FilterHead/ComboBox-опции/Presence/Choice → единый `.k-filter-*`
  (`.flt-*`(control)→`.k-filter-*`, `.th-flt-*→.k-filter-th-*`, `.presence-flt→.k-filter-presence`, `.pf-*→.k-filter-presence-*`,
  `.choice-flt→.k-filter-choice`); FiltersSheet `.fs-*→.k-filters-sheet-*`; ColumnsMenu/Panel `.cols-*`/`.col-name`/`.col-fix`/`.fix-btn`→`.k-columns-*`;
  ConfirmHost `.confirm-*→.k-confirm-*`; Tabs `.order-tabs/.order-tab/.tab-count→.k-tabs(-item/-count)`;
  MiniPager `.mini-pager-*→.k-mini-pager-*`; SortHead `.th-sort→.k-sort-head`. Прикладная панель активных фильтров
  (`.flt-bar*`/`.flt-chip*`) и табличный словарь ячеек (`.col-*`/`.cell-*`/`.row-*`) — НЕ тронуты. Histoire-сторис → `K*`.
- **inject-ключ** `kuiCollapse → kCollapse`; **директива** `v-tooltip` использует `.k-tip` / `data-k-tip`;
  `RadioGroup name` `kui-radio → k-radio`.

### Migration
- Глобально: `app.use(KometumUI)` — без изменений, но в шаблонах теги `<icon>` → `<k-icon>` и т.п.
- Точечно: переименуйте импорты `{ Icon }` → `{ KIcon }`. Кастомные стили, цепляющиеся за `.btn`/`.fld`/
  `.kui-*`, переведите на `.k-button`/`.k-input-field`/`.k-*`.


## [0.3.0] — 2026-06-10

Доведение до **максимально полной библиотеки (117 компонентов)** — добавлены
продвинутые поля, оверлеи и медиа-компоненты Tier-3.

### Added
- **Поля:** `DatePicker`, `DateRangePicker`, `TimePicker`, `ColorPicker`, `Rate`,
  `Cascader`, `TreeSelect`, `Mentions`, `Transfer`, `RepeaterField`.
- **Оверлей:** `CommandPalette` (⌘K, развязан от данных — items пропсом).
- **Данные/медиа:** `Badge`, `Image` (с превью), `Carousel`, `Watermark`, `QRCode`
  (встроенный byte-mode энкодер v1–4/EC-L), `ScheduleGrid` (обобщённая сетка-расписание).
- **Layout:** `Affix`, `BackTop`, `Anchor`.
- **Утилита:** `utils/qrcode.ts` (`qrMatrix`).

### Notes
- `QRCode` покрывает короткие строки (≤78 байт). Для больших данных подключите пакет
  `qrcode` в приложении и передайте готовую `matrix` в `<QRCode :matrix>`.

## [0.2.0] — 2026-06-10

Крупное расширение до **полноценной general-purpose библиотеки (97 компонентов)** —
пакет пригоден для любого Vue 3-проекта, а не только для admin/CRM.

### Added
- **Атомы и кнопки:** `Button`, `ButtonGroup`.
- **Поля ввода (`inputs/`):** `TextInput`, `Textarea`, `Select`, `NumberInput`, `DateInput`,
  `Checkbox` (+`CheckboxGroup`), `Radio` (+`RadioGroup`), `Slider`, `FileUpload`, `SearchInput`,
  `Stepper`, `PhoneInput` (маски по странам), `PasswordField` (показ/генерация).
- **Обратная связь (`feedback/`):** `Toast` (+`useToast`/`ToastHost`), `Alert`, `Spinner`,
  `Skeleton`, `Result`, `Empty`, `Tooltip`, `Popover`, `Popconfirm`, `Drawer`.
- **Layout (`layout/`):** `Container`, `Row`, `Col`, `Space`, `Divider`, `Card`,
  `Collapse` (+`CollapseItem`), `ScrollArea`.
- **Навигация (`nav/`):** `Breadcrumb` (+`Item`), `Steps`, `Tabs`, `MiniPager`.
- **Данные (`display/`):** `List` (+`Item`), `Descriptions` (+`Item`), `Tree`, `Timeline` (+`Item`),
  `Tag`, `AvatarGroup`, `ProgressCircle`, `Statistic`, `CodeChip`, `DocChip`, `RoleChip`, `MpTag`, `OwnPark`, `Tip`.
- **Композаблы:** `useToast`, `useBreakpoint`, `useClipboard`, `useTheme`.
- **Директива:** `v-loading` (оверлей-маска со спиннером).
- **Иконка:** `minus` (для NumberInput).
- **Акцентные hue-токены в CSS** (`--brand-h1/h2` + `html[data-accent="…"]`) — стили теперь
  работают автономно, без JS-инъекции акцента.

### Changed
- `RoleChip`, `DocChip` развязаны от данных приложения (как `StatusBadge`): принимают
  `meta`/карту пропсом вместо `window.KADMIN`.
- `src/index.ts` импортирует `styles/index.scss` → сборка эмитит `dist/style.css`.
- Структура `components/` разбита на группы: `ui · charts · actions · inputs · feedback · layout · nav · display`.

## [0.1.0] — 2026-06-10

### Added
- Первый срез пакета **k-ui**, выделенный из прототипа `vue-admin`.
- **33 ui-компонента** (`components/ui`): Icon, IconBtn, Avatar, Money, Meter, Segmented,
  Switch, StatusBadge, TonePill, Menu (+ MenuItem/Header/Field/Divider), ActionMenu, ComboBox,
  InlineEdit, FormField, FormGroup, FormErrorHint, FormDeleteButton, Modal, ConfirmHost, Pager,
  CollapsibleKpis, Calendar, FilterControl, FilterHead, FiltersSheet, SortHead, ColumnsMenu,
  ColumnsPanel, DataTable.
- **5 графиков** (`components/charts`): AreaLineChart, BarChart, Donut, HBars, Sparkline.
- **Композаблы**: `useFormGuard`, `useConfirm`, `useTableColumns`, `useMeasure`.
- **Директивы**: `v-click-outside`, `v-autofocus`, `v-tooltip`.
- **Иконки**: набор SVG + компонент `<Icon>` (`IconName` тип).
- **Утилиты**: `fmtMoney`, `STATUS_TONES`, фильтры дат/значений, `escapeHtml`.
- **Стили**: единый `dist/style.css` с токенами тем (светлая/тёмная), плотности и акцентов
  через `data`-атрибуты.
- Глобальный плагин `KometumUI` + точечные именованные импорты (tree-shaking).
- Сборка ESM (Vite library mode) + типы (`vite-plugin-dts`).
- Витрина **Histoire** (`stories/`).

### Changed
- `StatusBadge` развязан от данных приложения: вместо импорта `statusMeta` принимает
  `tone`/`label` напрямую либо `status` + `meta`-карту пропсом.
- Импорты переведены на структуру пакета (`lib/` → `icons/` + `utils/`), `<script setup lang="ts">`.

### Excluded
- Оболочка админки (`components/shell`: AdminSidebar/Topbar/SidebarNav/NotificationsMenu/AdminLogo) —
  завязана на Pinia-стор и mock-данные, остаётся в приложении.
- `logo.ts` (data-URI логотипа для PDF) — это контент приложения, не UI-утилита.
