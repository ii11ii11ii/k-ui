<script setup lang="ts">
/* Выпадающий список с поиском (single-select). Триггер показывает выбранное
   значение как ТЕКСТ; клик раскрывает поповер (поиск + список) в body (fixed),
   поэтому не обрезается скроллом формы/таблицы. v-model:value.
   variant: 'fld' (поле формы) | 'inline' (значение InlineEdit). */
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  value: { default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Выбрать' },
  searchPlaceholder: { type: String, default: 'Поиск по списку…' },
  variant: { type: String, default: 'fld' },
  disabled: { type: Boolean, default: false },
  allowClear: { type: Boolean, default: false },
  icon: { type: String, default: '' },
})
const emit = defineEmits(['update:value', 'change'])

const triggerRef = ref(null)
const open = ref(false)
const q = ref('')
const pos = ref(null)
let cleanup = null

const sel = computed(() => props.options.find((o) => String(o.value) === String(props.value)))
const list = computed(() => {
  const t = q.value.trim().toLowerCase()
  return t ? props.options.filter((o) => `${o.label} ${o.sub || ''}`.toLowerCase().includes(t)) : props.options
})

function place() {
  const el = triggerRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const width = Math.max(r.width, 240)
  let left = Math.min(r.left, window.innerWidth - width - 10)
  left = Math.max(10, left)
  let top = r.bottom + 6
  if (top + 300 > window.innerHeight - 10) top = Math.max(10, r.top - 306)
  pos.value = { top, left, width }
}
function onKey(e) { if (e.key === 'Escape') doClose() }
function doOpen() {
  open.value = true; q.value = ''
  nextTick(() => {
    place()
    window.addEventListener('resize', place, true)
    window.addEventListener('scroll', place, true)
    window.addEventListener('keydown', onKey)
    cleanup = () => {
      window.removeEventListener('resize', place, true)
      window.removeEventListener('scroll', place, true)
      window.removeEventListener('keydown', onKey)
    }
  })
}
function doClose() { open.value = false; if (cleanup) { cleanup(); cleanup = null } }
function toggle() { if (props.disabled) return; open.value ? doClose() : doOpen() }
function pick(v) { emit('update:value', v); emit('change', v); doClose() }
onBeforeUnmount(() => { if (cleanup) cleanup() })
</script>

<template>
  <span :class="['combo', `combo-${variant}`, open ? 'is-open' : '', !sel ? 'is-empty' : '', disabled ? 'is-disabled' : '']" ref="triggerRef">
    <button type="button" class="combo-trigger" :disabled="disabled" @click="toggle" :title="sel ? sel.label : placeholder">
      <Icon v-if="icon" :name="icon" :size="15" class="combo-ico" />
      <span class="combo-value truncate"><template v-if="sel">{{ sel.label }}</template><span v-else class="combo-ph">{{ placeholder }}</span></span>
      <Icon :name="variant === 'inline' && !sel ? 'plus' : 'chevronDown'" :size="variant === 'inline' && !sel ? 12 : 15" class="combo-caret" />
    </button>
    <teleport to="body">
      <template v-if="open">
        <div class="combo-backdrop" @mousedown="doClose"></div>
        <div class="combo-pop" :style="{ position: 'fixed', top: (pos ? pos.top : -9999) + 'px', left: (pos ? pos.left : -9999) + 'px', width: (pos ? pos.width : 240) + 'px' }" @mousedown.stop>
          <div class="flt-text">
            <Icon name="search" :size="15" class="flt-text-ico" />
            <input class="flt-text-input" autofocus v-model="q" :placeholder="searchPlaceholder" />
            <button v-if="q" class="flt-text-clear" title="Очистить поиск" @click="q = ''"><Icon name="close" :size="13" /></button>
          </div>
          <div class="flt-options" role="listbox">
            <button v-if="allowClear" :class="['flt-opt', (!value && value !== 0) ? 'is-on' : '']" @click="pick('')">
              <span class="flt-opt-box is-radio"><span v-if="!value && value !== 0" class="flt-opt-dot"></span></span>
              <span class="flt-opt-label combo-opt-clear">Не выбрано</span>
            </button>
            <div v-if="list.length === 0" class="flt-empty">Ничего не найдено</div>
            <button v-for="o in list" :key="o.value" role="option" :aria-selected="String(o.value) === String(value)"
              :class="['flt-opt', String(o.value) === String(value) ? 'is-on' : '']" @click="pick(o.value)">
              <span class="flt-opt-box is-radio"><span v-if="String(o.value) === String(value)" class="flt-opt-dot"></span></span>
              <span class="combo-opt-text">
                <span class="flt-opt-label" :title="o.label">{{ o.label }}</span>
                <span v-if="o.sub" class="combo-opt-sub">{{ o.sub }}</span>
              </span>
            </button>
          </div>
        </div>
      </template>
    </teleport>
  </span>
</template>
