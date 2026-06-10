<script setup lang="ts">
/* Загрузка файлов: drag-and-drop + клик. @change(file|files), @files(File[]). */
import { ref } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({
  accept: { type: String, default: '' },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hint: { type: String, default: 'Перетащите файл или нажмите для выбора' },
})
const emit = defineEmits(['change','files'])
const over = ref(false)
const input = ref<HTMLInputElement | null>(null)
function pick(){ if (!props.disabled && input.value) input.value.click() }
function emitFiles(list){ const fs = Array.from(list || []); emit('change', props.multiple ? fs : fs[0]); emit('files', fs) }
function onChange(e){ emitFiles(e.target.files) }
function onDrop(e){ over.value = false; if (props.disabled) return; emitFiles(e.dataTransfer.files) }
</script>

<template>
  <div :class="['kui-upload', over ? 'is-over' : '', disabled ? 'is-disabled' : '']"
    @click="pick" @dragover.prevent="over = true" @dragleave="over = false" @drop.prevent="onDrop">
    <Icon name="upload" :size="22" class="kui-upload-ico" />
    <div class="kui-upload-hint"><slot>{{ hint }}</slot></div>
    <input ref="input" type="file" class="kui-upload-input" :accept="accept" :multiple="multiple" :disabled="disabled" @change="onChange" />
  </div>
</template>
