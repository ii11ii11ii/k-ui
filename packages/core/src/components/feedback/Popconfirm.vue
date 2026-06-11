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
  <span class="k-pop-wrap">
    <span class="k-pop-trigger" @click="open = !open"><slot /></span>
    <template v-if="open">
      <div class="k-pop-backdrop" @click="cancel"></div>
      <div class="k-pop-panel k-popconfirm">
        <div class="k-popconfirm-head"><Icon :name="icon" :size="16" :class="danger ? 'k-popconfirm-ico-danger' : 'k-popconfirm-ico'" /><span>{{ title }}</span></div>
        <div class="k-popconfirm-acts">
          <Button variant="ghost" size="sm" @click="cancel">{{ cancelLabel }}</Button>
          <Button :variant="danger ? 'danger' : 'primary'" size="sm" @click="confirm">{{ confirmLabel }}</Button>
        </div>
      </div>
    </template>
  </span>
</template>
