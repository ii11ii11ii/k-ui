<script setup lang="ts">
import { ref } from 'vue'
import { KIconBtn, KSwitch, KSegmented, KMoney } from 'k-ui'

const on = ref(true)
const view = ref('table')
const viewOpts = [
  { value: 'table', icon: 'bars', label: 'Таблица' },
  { value: 'cards', icon: 'grid', label: 'Карточки' },
]
</script>

<template>
  <Story title="Компоненты/Контролы" group="components">
    <Variant title="IconBtn">
      <div style="display:flex;gap:12px;padding:24px">
        <KIconBtn name="bell" label="Уведомления" :badge="3" />
        <KIconBtn name="settings" label="Настройки" active />
        <KIconBtn name="trash" label="Удалить" danger />
      </div>
    </Variant>

    <Variant title="Switch">
      <div style="display:flex;flex-direction:column;gap:16px;padding:24px;max-width:360px">
        <KSwitch v-model:checked="on" />
        <KSwitch v-model:checked="on" label="Тёмная тема" hint="Применяется ко всему интерфейсу" />
        <KSwitch :checked="false" label="Отключено" disabled />
      </div>
    </Variant>

    <Variant title="Segmented">
      <div style="padding:24px">
        <KSegmented v-model:value="view" :options="viewOpts" />
        <p style="margin-top:12px;color:var(--text-3);font:13px/1.4 system-ui">Выбрано: {{ view }}</p>
      </div>
    </Variant>

    <Variant title="Money (tnum, nowrap)">
      <div style="display:flex;flex-direction:column;gap:8px;padding:24px;font-size:18px">
        <KMoney :value="1240560.5" />
        <KMoney :value="-89000" />
        <KMoney :value="320000" sign />
        <KMoney :value="0" muted />
      </div>
    </Variant>
  </Story>
</template>
