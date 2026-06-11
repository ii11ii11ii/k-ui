<script setup lang="ts">
/* Переключатель вкл/выкл. Без label — только тумблер; с label — строка
   «текст + хинт … тумблер». v-model:checked. */
const props = defineProps({
  checked: { type: Boolean, default: false },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['update:checked'])
function toggle() { if (!props.disabled) emit('update:checked', !props.checked) }
</script>

<template>
  <button v-if="!label" type="button" role="switch" :aria-checked="checked"
    :class="['k-switch', checked ? 'is-on' : '']" :disabled="disabled" @click="toggle">
    <span class="k-switch-thumb"></span>
  </button>
  <div v-else :class="['switch-row', disabled ? 'is-disabled' : '']" @click.stop>
    <span class="switch-row-text">
      <span class="switch-row-label">{{ label }}</span>
      <span v-if="hint" class="switch-row-hint">{{ hint }}</span>
    </span>
    <button type="button" role="switch" :aria-checked="checked"
      :class="['k-switch', checked ? 'is-on' : '']" :disabled="disabled" @click="toggle">
      <span class="k-switch-thumb"></span>
    </button>
  </div>
</template>
