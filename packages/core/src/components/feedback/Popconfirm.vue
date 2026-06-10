<script setup lang="ts">
/* Подтверждение у элемента (мини-поповер с Да/Отмена). Слот — триггер. */
import { ref } from 'vue'
import Icon from '../ui/Icon.vue'
import Button from '../actions/Button.vue'
const props = defineProps({
  title: { type: String, default: 'Подтвердите действие' },
  confirmLabel: { type: String, default: 'Да' },
  cancelLabel: { type: String, default: 'Отмена' },
  danger: { type: Boolean, default: false },
  icon: { type: String, default: 'alert' },
})
const emit = defineEmits(['confirm','cancel'])
const open = ref(false)
function confirm(){ open.value = false; emit('confirm') }
function cancel(){ open.value = false; emit('cancel') }
</script>

<template>
  <span class="kui-pop-wrap">
    <span class="kui-pop-trigger" @click="open = !open"><slot /></span>
    <template v-if="open">
      <div class="kui-pop-backdrop" @click="cancel"></div>
      <div class="kui-pop-panel kui-popconfirm">
        <div class="kui-popconfirm-head"><Icon :name="icon" :size="16" :class="danger ? 'kui-popconfirm-ico-danger' : 'kui-popconfirm-ico'" /><span>{{ title }}</span></div>
        <div class="kui-popconfirm-acts">
          <Button variant="ghost" size="sm" @click="cancel">{{ cancelLabel }}</Button>
          <Button :variant="danger ? 'danger' : 'primary'" size="sm" @click="confirm">{{ confirmLabel }}</Button>
        </div>
      </div>
    </template>
  </span>
</template>
