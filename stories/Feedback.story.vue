<script setup lang="ts">
import { KAlert, KSpinner, KSkeleton, KEmpty, KTag, KProgressCircle, KStatistic, KButton, KToastHost, useToast } from 'k-ui'
const toast = useToast()
</script>

<template>
  <Story title="Обратная связь/Feedback" group="components">
    <Variant title="Alert · Spinner · Skeleton">
      <div style="display:flex;flex-direction:column;gap:14px;padding:24px;max-width:480px">
        <KAlert type="success" title="Готово">Изменения сохранены.</KAlert>
        <KAlert type="danger" closable>Ошибка соединения.</KAlert>
        <KSpinner :size="24" label="Загрузка…" />
        <KSkeleton :lines="3" />
      </div>
    </Variant>
    <Variant title="Toast">
      <div style="display:flex;gap:10px;padding:24px">
        <KButton @click="toast.success('Сохранено')">Success</KButton>
        <KButton variant="danger" @click="toast.error('Ошибка')">Error</KButton>
        <KButton variant="ghost" @click="toast.info({ title: 'Инфо', message: 'Сообщение' })">Info</KButton>
      </div>
      <KToastHost />
    </Variant>
    <Variant title="Tag · Progress · Statistic · Empty">
      <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center;padding:24px">
        <KTag tone="green" label="Активен" />
        <KTag tone="amber" label="Ждёт" closable />
        <KProgressCircle :value="72" />
        <KStatistic label="Выручка" value="1 240 560" suffix="₽" :trend="12" />
        <KEmpty title="Список пуст" hint="Добавьте первую запись" />
      </div>
    </Variant>
  </Story>
</template>
