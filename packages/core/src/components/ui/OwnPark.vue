<script setup lang="ts">
/* Бейдж «Собственный парк». small — компактная иконка без подписи. */
import Icon from './Icon.vue'
defineProps({ small: { type: Boolean, default: false } })
</script>

<template>
  <span :class="['own-park', small ? 'own-park-sm' : '']" title="Собственный парк">
    <span class="own-park-mark"><Icon name="ruble" :size="small ? 10 : 12" :stroke="2.2" /></span>
    <span v-if="!small">Собственный парк</span>
  </span>
</template>
