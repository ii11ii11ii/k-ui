<script setup lang="ts">
/* Кнопка «Удалить» в подвале формы, подчинённая правилу связанности (deleteGuard).
   Есть связи → удаление запрещено (кнопка неактивна + замок-причина). Для
   плательщика guard.deactivate=true → кнопка «Деактивировать». */
import Icon from './Icon.vue'

const props = defineProps({
  guard: { type: Object, default: null },
  label: { type: String, default: 'Удалить' },
  deactivateLabel: { type: String, default: 'Деактивировать' },
  isActive: { type: Boolean, default: undefined },
})
const emit = defineEmits(['delete', 'deactivate', 'reactivate'])
</script>

<template>
  <div v-if="guard" class="so-foot-del-wrap">
    <button type="button" class="k-button k-button-danger-ghost so-foot-del" :disabled="!guard.ok"
      :title="guard.ok ? '' : (guard.reason || 'Удаление недоступно')" :aria-disabled="!guard.ok"
      @click="guard.ok ? emit('delete') : null">
      <Icon name="trash" :size="15" /><span>{{ label }}</span>
    </button>
    <template v-if="!guard.ok && guard.deactivate">
      <button v-if="isActive === false" type="button" class="k-button k-button-ghost k-button-sm so-foot-react" @click="emit('reactivate')"><Icon name="refresh" :size="14" /><span>Активировать</span></button>
      <button v-else type="button" class="k-button k-button-ghost k-button-sm so-foot-react" @click="emit('deactivate')"><Icon name="power" :size="14" /><span>{{ deactivateLabel }}</span></button>
    </template>
    <span v-if="!guard.ok" class="so-foot-locked" role="note"><Icon name="lock" :size="13" />{{ guard.reason }}</span>
  </div>
</template>
