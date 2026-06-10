<script setup lang="ts">
/* Телефон с автоопределением страны и маской. v-model — полный номер. */
import { ref, computed } from 'vue'
import Icon from '../ui/Icon.vue'
import { PHONE_COUNTRIES, PHONE_BY_ISO, phoneDigits, phoneMaxDigits, phoneFormatNational, phoneFull, phoneDetect, phoneParseInput, phonePlaceholder } from '../../utils/phone'
const props = defineProps({
  modelValue: { default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  invalid: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue','change'])
const initDet = phoneDetect(phoneDigits(props.modelValue), 'RU')
const iso = ref(initDet ? initDet.country.iso : 'RU')
const open = ref(false)
const q = ref('')
const digits = computed(() => phoneDigits(props.modelValue))
const det = computed(() => digits.value ? phoneDetect(digits.value, iso.value) : null)
const country = computed(() => det.value ? det.value.country : (PHONE_BY_ISO[iso.value] || PHONE_BY_ISO.RU))
const nat = computed(() => (det.value ? det.value.national : digits.value).slice(0, phoneMaxDigits(country.value.mask)))
const display = computed(() => phoneFormatNational(country.value.mask, nat.value))
function emitVal(c: any, n: string){ const v = phoneFull(c, n.slice(0, phoneMaxDigits(c.mask))); emit('update:modelValue', v); emit('change', v) }
function onInput(e: any){ const parsed = phoneParseInput(e.target.value, country.value, iso.value); if (parsed.country.iso !== iso.value) iso.value = parsed.country.iso; emitVal(parsed.country, parsed.national) }
function pick(code: string){ const c = PHONE_BY_ISO[code]; iso.value = code; emitVal(c, nat.value); open.value = false; q.value = '' }
const list = computed(() => { const s = q.value.trim().toLowerCase(); return PHONE_COUNTRIES.filter((c) => !s || c.name.toLowerCase().includes(s) || ('+' + c.dial).includes(s) || c.iso.toLowerCase().includes(s)) })
function onCopy(e: any){ const full = nat.value ? country.value.dial + nat.value : ''; if (!full) return; e.preventDefault(); (e.clipboardData || (window as any).clipboardData).setData('text/plain', full) }
</script>

<template>
  <span :class="['phone-input', 'phone-fld', open ? 'is-open' : '', disabled ? 'is-disabled' : '', invalid ? 'is-invalid' : '']">
    <button type="button" class="phone-cc" :disabled="disabled" :title="country.name + ' · +' + country.dial" @click="open = !open">
      <span class="phone-cc-iso">{{ country.iso }}</span>
      <span class="phone-cc-dial mono">+{{ country.dial }}</span>
      <Icon name="chevronDown" :size="13" class="phone-cc-caret" />
    </button>
    <input class="phone-field mono" type="tel" inputmode="tel" :disabled="disabled" :value="display"
      :placeholder="placeholder || phonePlaceholder(country)" @input="onInput" @copy="onCopy" />
    <template v-if="open">
      <div class="phone-backdrop" @click="open = false"></div>
      <div class="phone-pop">
        <div class="phone-pop-search"><Icon name="search" :size="14" /><input v-model="q" placeholder="Поиск страны или кода…" /></div>
        <div class="phone-pop-list">
          <button v-for="c in list" :key="c.iso" type="button" :class="['phone-pop-item', c.iso === country.iso ? 'is-on' : '']" @click="pick(c.iso)">
            <span class="phone-pop-iso">{{ c.iso }}</span><span class="phone-pop-name">{{ c.name }}</span><span class="phone-pop-dial mono">+{{ c.dial }}</span>
          </button>
        </div>
      </div>
    </template>
  </span>
</template>
