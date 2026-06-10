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
  <div v-if="shown" :class="['kui-alert', 'kui-alert-' + type]" role="alert">
    <Icon v-if="icon !== false" :name="typeof icon === 'string' ? icon : iconMap[type]" :size="18" class="kui-alert-ico" />
    <div class="kui-alert-body">
      <div v-if="title" class="kui-alert-title">{{ title }}</div>
      <div v-if="$slots.default" class="kui-alert-text"><slot /></div>
    </div>
    <button v-if="closable" type="button" class="kui-alert-close" aria-label="Закрыть" @click="close"><Icon name="close" :size="15" /></button>
  </div>
</template>
