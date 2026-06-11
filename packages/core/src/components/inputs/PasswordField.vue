<script setup lang="ts">
/* Пароль: показ/скрытие, копирование, генерация (crypto). v-model. */
import { ref } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({
  modelValue: { default: '' },
  placeholder: { type: String, default: 'Пароль' },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
  allowGenerate: { type: Boolean, default: true },
  autoShow: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
const show = ref(!!props.autoShow)
function genPassword(len: number){
  const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#%'
  const rnd = (n: number) => (window.crypto && window.crypto.getRandomValues) ? window.crypto.getRandomValues(new Uint32Array(1))[0] % n : Math.floor(Math.random() * n)
  let s = ''; for (let i = 0; i < (len || 12); i++) s += abc[rnd(abc.length)]; return s
}
function set(v: any){ emit('update:modelValue', v); emit('change', v) }
function copy(e: Event){ e.preventDefault(); try { navigator.clipboard && navigator.clipboard.writeText(props.modelValue || '') } catch (err) {} }
function gen(){ set(genPassword(12)); show.value = true }
</script>

<template>
  <span :class="['k-password-field', show ? 'is-shown' : '', invalid ? 'is-invalid' : '', disabled ? 'is-disabled' : '']">
    <span class="k-password-field-ico"><Icon name="key" :size="15" /></span>
    <input :class="['k-password-field-input', show ? 'mono' : '']" :type="show ? 'text' : 'password'" :value="modelValue"
      :placeholder="placeholder" autocomplete="new-password" spellcheck="false" :disabled="disabled" @input="set($event.target.value)" />
    <span class="k-password-field-btns">
      <button v-if="modelValue" type="button" class="k-password-field-btn" title="Скопировать" @click="copy"><Icon name="copy" :size="14" /></button>
      <button type="button" class="k-password-field-btn" :title="show ? 'Скрыть' : 'Показать'" @click="show = !show"><Icon :name="show ? 'eyeOff' : 'eye'" :size="15" /></button>
      <button v-if="allowGenerate" type="button" class="k-password-field-btn k-password-field-gen" title="Сгенерировать пароль" @click="gen"><Icon name="refresh" :size="14" /></button>
    </span>
  </span>
</template>
