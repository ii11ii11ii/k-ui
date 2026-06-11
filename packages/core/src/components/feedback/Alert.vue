<script setup lang="ts">
/* Баннер-уведомление. type: info|success|warning|danger. closable, icon. */
import { ref } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({
  type: { type: String, default: 'info' },
  title: { type: String, default: '' },
  closable: { type: Boolean, default: false },
  icon: { type: [String, Boolean], default: true },
})
const emit = defineEmits(['close'])
const shown = ref(true)
const iconMap: Record<string,string> = { info: 'info', success: 'check', warning: 'alert', danger: 'alert' }
function close(){ shown.value = false; emit('close') }
</script>

<template>
  <div v-if="shown" :class="['k-alert', 'k-alert-' + type]" role="alert">
    <Icon v-if="icon !== false" :name="typeof icon === 'string' ? icon : iconMap[type]" :size="18" class="k-alert-ico" />
    <div class="k-alert-body">
      <div v-if="title" class="k-alert-title">{{ title }}</div>
      <div v-if="$slots.default" class="k-alert-text"><slot /></div>
    </div>
    <button v-if="closable" type="button" class="k-alert-close" aria-label="Закрыть" @click="close"><Icon name="close" :size="15" /></button>
  </div>
</template>
