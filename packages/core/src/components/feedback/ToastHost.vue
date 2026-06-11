<script setup lang="ts">
/* Хост тостов (teleport в body). Монтируется один раз в корне приложения. */
import Icon from '../ui/Icon.vue'
import { toastState, dismissToast } from '../../composables/useToast'
defineProps({ position: { type: String, default: 'top-right' } })
const iconMap: Record<string,string> = { info: 'info', success: 'check', warning: 'alert', danger: 'alert' }
</script>

<template>
  <teleport to="body">
    <div :class="['k-toast-host', 'k-toast-' + position]">
      <transition-group name="k-toast">
        <div v-for="t in toastState.items" :key="t.id" :class="['k-toast', 'k-toast-tone-' + t.type]" role="status">
          <Icon :name="t.icon || iconMap[t.type] || 'info'" :size="18" class="k-toast-ico" />
          <div class="k-toast-body">
            <div v-if="t.title" class="k-toast-title">{{ t.title }}</div>
            <div v-if="t.message" class="k-toast-text">{{ t.message }}</div>
          </div>
          <button type="button" class="k-toast-close" aria-label="Закрыть" @click="dismissToast(t.id)"><Icon name="close" :size="14" /></button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>
