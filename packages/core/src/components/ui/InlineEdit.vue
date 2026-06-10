<script setup lang="ts">
/* Значение-как-текст с правкой по клику (никаких постоянных инпутов).
   Клик раскрывает редактор (text/number/select/textarea/date); Enter или blur
   сохраняют, Esc отменяет. Пустое значение — мягкий плейсхолдер со знаком «+».
   Слот #display переопределяет отображение прочитанного значения. */
import { ref, computed, watch, nextTick } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  value: { default: '' },
  editor: { type: String, default: 'text' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Указать' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  mono: { type: Boolean, default: false },
  display: { type: Function, default: null },
  parse: { type: Function, default: null },
  align: { type: String, default: 'left' },
  inputWidth: { type: [Number, String], default: null },
})
const emit = defineEmits(['commit'])

const editing = ref(false)
const draft = ref(props.value)
const elRef = ref(null)
watch(() => props.value, (v) => { draft.value = v })

function startEdit() {
  editing.value = true
  nextTick(() => {
    const el = elRef.value
    if (el) { el.focus(); if (props.editor !== 'select' && el.select) el.select() }
  })
}
function norm(val) {
  if (props.parse) return props.parse(val)
  if (props.editor === 'number') { const n = parseFloat(String(val).replace(/\s/g, '').replace(',', '.')); return isNaN(n) ? '' : n }
  return val
}
function finish(val) { editing.value = false; const out = norm(val); if (out !== props.value) emit('commit', out) }
function cancel() { editing.value = false; draft.value = props.value }

const empty = computed(() => props.value === '' || props.value == null)
const shownText = computed(() => {
  if (empty.value) return props.placeholder
  if (props.display) return props.display(props.value)
  if (props.editor === 'select') { const o = props.options.find((x) => String(x.value) === String(props.value)); return o ? o.label : props.value }
  return props.value
})
const style = computed(() => (props.inputWidth ? { width: typeof props.inputWidth === 'number' ? props.inputWidth + 'px' : props.inputWidth } : null))
</script>

<template>
  <!-- edit: select -->
  <span v-if="editing && editor === 'select'" class="ie-edit ie-edit-select">
    <select ref="elRef" :class="['ie-input', 'ie-select', mono ? 'mono' : '']" :style="style"
      :value="draft ?? ''" @change="finish($event.target.value)" @blur="editing = false"
      @keydown.esc="cancel">
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
    <Icon name="chevronDown" :size="14" class="ie-select-caret" />
  </span>

  <!-- edit: textarea -->
  <textarea v-else-if="editing && editor === 'textarea'" ref="elRef"
    :class="['ie-input', 'ie-area', mono ? 'mono' : '']" :style="style" :rows="3" :value="draft ?? ''"
    @input="draft = $event.target.value" @blur="finish($event.target.value)"
    @keydown.esc="cancel" @keydown.enter.exact.prevent="finish($event.target.value)"></textarea>

  <!-- edit: date/datetime -->
  <input v-else-if="editing && (editor === 'date' || editor === 'datetime')" ref="elRef"
    :class="['ie-input', mono ? 'mono' : '']" :style="style"
    :type="editor === 'datetime' ? 'datetime-local' : 'date'" :value="draft ?? ''"
    @input="draft = $event.target.value" @blur="finish($event.target.value)"
    @keydown.enter="finish($event.target.value)" @keydown.esc="cancel" />

  <!-- edit: text/number -->
  <input v-else-if="editing" ref="elRef" :class="['ie-input', mono ? 'mono' : '']" :style="style"
    type="text" :inputmode="editor === 'number' ? 'decimal' : undefined" :value="draft ?? ''"
    @input="draft = $event.target.value" @blur="finish($event.target.value)"
    @keydown.enter="finish($event.target.value)" @keydown.esc="cancel" />

  <!-- read -->
  <button v-else type="button"
    :class="['ie', `ie-${align}`, empty ? 'is-empty' : '', mono ? 'mono' : '']"
    @click="startEdit" title="Нажмите, чтобы изменить">
    <i v-if="prefix && !empty" class="ie-prefix">{{ prefix }}</i>
    <span class="ie-text">
      <slot v-if="$slots.display && !empty" name="display" :value="value">{{ shownText }}</slot>
      <template v-else>{{ shownText }}</template>
    </span>
    <i v-if="suffix && !empty" class="ie-suffix">{{ suffix }}</i>
    <Icon :name="empty ? 'plus' : 'edit'" :size="12" class="ie-pencil" />
  </button>
</template>
