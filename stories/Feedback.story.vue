<script setup lang="ts">
import { Alert, Spinner, Skeleton, Empty, Tag, ProgressCircle, Statistic, Button, ToastHost, useToast } from 'k-ui'
const toast = useToast()
</script>

<template>
  <Story title="Обратная связь/Feedback" group="components">
    <Variant title="Alert · Spinner · Skeleton">
      <div style="display:flex;flex-direction:column;gap:14px;padding:24px;max-width:480px">
        <Alert type="success" title="Готово">Изменения сохранены.</Alert>
        <Alert type="danger" closable>Ошибка соединения.</Alert>
        <Spinner :size="24" label="Загрузка…" />
        <Skeleton :lines="3" />
      </div>
    </Variant>
    <Variant title="Toast">
      <div style="display:flex;gap:10px;padding:24px">
        <Button @click="toast.success('Сохранено')">Success</Button>
        <Button variant="danger" @click="toast.error('Ошибка')">Error</Button>
        <Button variant="ghost" @click="toast.info({ title: 'Инфо', message: 'Сообщение' })">Info</Button>
      </div>
      <ToastHost />
    </Variant>
    <Variant title="Tag · Progress · Statistic · Empty">
      <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center;padding:24px">
        <Tag tone="green" label="Активен" />
        <Tag tone="amber" label="Ждёт" closable />
        <ProgressCircle :value="72" />
        <Statistic label="Выручка" value="1 240 560" suffix="₽" :trend="12" />
        <Empty title="Список пуст" hint="Добавьте первую запись" />
      </div>
    </Variant>
  </Story>
</template>
