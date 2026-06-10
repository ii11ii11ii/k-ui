<script setup lang="ts">
/* Текст с @упоминаниями. options:[{value,label}]. v-model — текст. */
import { ref, computed } from 'vue'
const props = defineProps({ modelValue: { default: '' }, options: { type: Array, default: () => [] }, trigger: { type: String, default: '@' }, placeholder: { type: String, default: '' }, rows: { type: Number, default: 3 } })
const emit = defineEmits(['update:modelValue'])
const ta = ref<HTMLTextAreaElement | null>(null)
const query = ref<string | null>(null)
const tokenStart = ref(-1)
function onInput(e: any){
  const val = e.target.value; emit('update:modelValue', val)
  const pos = e.target.selectionStart; const upto = val.slice(0, pos); const at = upto.lastIndexOf(props.trigger)
  if (at >= 0) { const frag = upto.slice(at + 1); if (!frag.includes(' ') && !frag.includes('\n')) { query.value = frag.toLowerCase(); tokenStart.value = at; return } }
  query.value = null; tokenStart.value = -1
}
const list = computed(() => { if (query.value == null) return []; return (props.options as any[]).filter((o) => o.label.toLowerCase().includes(query.value as string)).slice(0, 6) })
function insert(o: any){
  const val = props.modelValue as string; const pos = ta.value ? ta.value.selectionStart : val.length
  const before = val.slice(0, tokenStart.value); const after = val.slice(pos)
  const next = before + props.trigger + o.label + ' ' + after
  emit('update:modelValue', next); query.value = null; tokenStart.value = -1
}
</script>

<template>
  <div class="kui-mentions">
    <textarea ref="ta" class="fld fld-area" :rows="rows" :value="modelValue" :placeholder="placeholder" @input="onInput"></textarea>
    <div v-if="list.length" class="kui-mentions-pop">
      <button v-for="o in list" :key="o.value" type="button" class="kui-mentions-item" @mousedown.prevent="insert(o)">{{ trigger }}{{ o.label }}</button>
    </div>
  </div>
</template>
