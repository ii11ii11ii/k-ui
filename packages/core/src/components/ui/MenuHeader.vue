<script setup lang="ts">
/* Заголовок меню: аватар + имя + подпись. */
import Avatar from './Avatar.vue'

defineProps({
  name: { type: String, default: '' },
  sub: { type: String, default: '' },
  avatar: { type: String, default: '' },
})
</script>

<template>
  <div class="menu-head">
    <Avatar v-if="avatar" :name="avatar" :size="38" />
    <div class="menu-head-meta">
      <span class="menu-head-name">{{ name }}</span>
      <span v-if="sub" class="menu-head-sub">{{ sub }}</span>
    </div>
  </div>
</template>
