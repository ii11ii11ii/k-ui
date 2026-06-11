<script setup lang="ts">
/* Поле формы с тремя режимами:
   • mode='create' — ЯВНЫЙ инпут (только при создании/добавлении);
   • mode='edit'   — строка «подпись · значение», значение правится по клику (InlineEdit);
   • mode='view'   — то же, но только чтение.
   Слот #display переопределяет отображение значения (напр. StatusBadge).
   v-model:value. */
import { computed, useSlots } from 'vue'
import Icon from './Icon.vue'
import InlineEdit from './InlineEdit.vue'
import ComboBox from './ComboBox.vue'

const props = defineProps({
  label: { type: String, default: '' },
  req: { type: Boolean, default: false },
  mode: { type: String, default: 'edit' },
  editor: { type: String, default: 'text' },
  value: { default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  mono: { type: Boolean, default: false },
  display: { type: Function, default: null },
  full: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  allowClear: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
})
const emit = defineEmits(['update:value'])
const slots = useSlots()
const set = (v) => emit('update:value', v)

const empty = computed(() => props.value === '' || props.value == null)
const readText = computed(() => {
  if (empty.value) return '—'
  if (props.display) return props.display(props.value)
  if (props.editor === 'select' || props.editor === 'combo') {
    const o = props.options.find((x) => String(x.value) === String(props.value))
    return o ? o.label : props.value
  }
  return props.value
})
</script>

<template>
  <!-- create -->
  <label v-if="mode === 'create'" :class="['k-input-field-wrap', full ? 'k-input-field-full' : '', disabled ? 'is-disabled' : '', invalid ? 'is-invalid' : '']">
    <span class="k-input-field-label">{{ label }}<em v-if="req" class="req">*</em><em v-if="invalid" class="k-input-field-req-hint">обязательное поле</em></span>
    <select v-if="editor === 'select'" :class="['k-input-field', mono ? 'mono' : '']" :value="value" :disabled="disabled" @change="set($event.target.value)">
      <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
    <ComboBox v-else-if="editor === 'combo'" :value="value" :options="options" :icon="icon" :allow-clear="allowClear" :disabled="disabled"
      :placeholder="placeholder || 'Выбрать'" @update:value="set" />
    <textarea v-else-if="editor === 'textarea'" class="k-input-field k-input-field-area" :rows="3" :value="value" :placeholder="placeholder" :disabled="disabled" @input="set($event.target.value)"></textarea>
    <input v-else-if="editor === 'date' || editor === 'datetime'" :class="['k-input-field', mono ? 'mono' : '']" :type="editor === 'datetime' ? 'datetime-local' : 'date'" :value="value || ''" :disabled="disabled" @input="set($event.target.value)" />
    <input v-else :class="['k-input-field', mono ? 'mono' : '']" :type="editor === 'number' ? 'number' : 'text'" :value="value" :placeholder="placeholder" :disabled="disabled" @input="set($event.target.value)" />
  </label>

  <!-- edit / view -->
  <div v-else :class="['frow', full ? 'frow-full' : '', editor === 'textarea' ? 'frow-area' : '', invalid ? 'is-invalid' : '']">
    <span class="frow-label"><Icon v-if="icon" :name="icon" :size="14" class="frow-ico" />{{ label }}<em v-if="req && mode !== 'view'" class="req">*</em><em v-if="invalid" class="frow-req-hint">обязательное</em></span>
    <div class="frow-val">
      <span v-if="mode === 'view' || disabled" :class="['frow-read', empty ? 'is-empty' : '', mono ? 'mono' : '', disabled ? 'is-locked' : '']">
        <i v-if="prefix && !empty" class="k-inline-edit-prefix">{{ prefix }}</i>
        <slot v-if="slots.display && !empty" name="display" :value="value">{{ readText }}</slot>
        <template v-else>{{ readText }}</template>
        <i v-if="suffix && !empty" class="k-inline-edit-suffix">{{ suffix }}</i>
      </span>
      <ComboBox v-else-if="editor === 'combo'" variant="inline" :value="value" :options="options" :allow-clear="allowClear"
        :placeholder="placeholder || 'Указать'" @update:value="set" />
      <InlineEdit v-else :value="value" :editor="editor" :options="options" :placeholder="placeholder || 'Указать'"
        :prefix="prefix" :suffix="suffix" :mono="mono" :display="display" @commit="set">
        <template v-if="slots.display" #display="{ value: v }"><slot name="display" :value="v" /></template>
      </InlineEdit>
    </div>
  </div>
</template>
