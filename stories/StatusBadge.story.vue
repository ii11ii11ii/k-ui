<script setup lang="ts">
import { StatusBadge } from 'k-ui'
import { STATUS_TONES } from 'k-ui'
const tones = Object.keys(STATUS_TONES)
const labels: Record<string, string> = {
  amber: 'В процессе', green: 'Успешный', blue: 'Новый',
  violet: 'Лицензия', gray: 'Черновик', red: 'Отменён',
}
// демонстрация режима «по карте»
const meta = {
  active: { tone: 'green', label: 'Активен' },
  paused: { tone: 'amber', label: 'Приостановлен' },
  blocked: { tone: 'red', label: 'Заблокирован' },
}
</script>

<template>
  <Story title="Основа/StatusBadge" group="foundation">
    <Variant title="Все тоны (прямой режим)">
      <div style="display:flex;flex-wrap:wrap;gap:10px;padding:24px">
        <StatusBadge v-for="t in tones" :key="t" :tone="t" :label="labels[t]" />
      </div>
    </Variant>
    <Variant title="Размеры">
      <div style="display:flex;align-items:center;gap:12px;padding:24px">
        <StatusBadge tone="green" label="sm" size="sm" />
        <StatusBadge tone="green" label="md" size="md" />
        <StatusBadge tone="green" label="lg" size="lg" />
      </div>
    </Variant>
    <Variant title="Режим «по карте» (status + meta)">
      <div style="display:flex;gap:10px;padding:24px">
        <StatusBadge status="active" :meta="meta" />
        <StatusBadge status="paused" :meta="meta" />
        <StatusBadge status="blocked" :meta="meta" />
      </div>
    </Variant>
  </Story>
</template>
