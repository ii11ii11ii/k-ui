<script setup lang="ts">
/* Подвальная подсказка о незаполненных обязательных полях (амбер-плашка).
   missing — массив названий полей (guard.missing). */
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  missing: { type: Array, default: () => [] },
  prefix: { type: String, default: 'Заполните обязательные поля' },
})
const shown = computed(() => props.missing.slice(0, 4))
const more = computed(() => props.missing.length - shown.value.length)
</script>

<template>
  <span v-if="missing && missing.length" class="so-foot-warn" role="alert">
    <Icon name="alert" :size="14" />
    {{ prefix }}: {{ shown.join(', ') }}{{ more > 0 ? ` и ещё ${more}` : '' }}
  </span>
</template>
