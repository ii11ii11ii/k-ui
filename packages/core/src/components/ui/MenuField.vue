<script setup lang="ts">
/* Секция-настройка внутри меню (label + контрол). Клик не закрывает меню. */
defineProps({ label: { type: String, default: '' } })
</script>

<template>
  <div class="menu-field" @click.stop>
    <span v-if="label" class="menu-field-label">{{ label }}</span>
    <slot />
  </div>
</template>
