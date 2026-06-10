<script setup lang="ts">
/* Каскадный выбор по уровням. options:[{value,label,children?}]. v-model — путь (массив value). */
import { ref, computed } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ modelValue: { type: Array, default: () => [] }, options: { type: Array, default: () => [] }, placeholder: { type: String, default: 'Выберите' }, disabled: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue','change'])
const open = ref(false)
const columns = computed(() => {
  const out: any[] = []; let level: any[] = props.options as any[]
  for (let i = 0; ; i++) { out.push(level); const sel = (props.modelValue as any[])[i]; const node = level.find((n: any) => n.value === sel); if (node && node.children && node.children.length) level = node.children; else break }
  return out
})
const labels = computed(() => {
  const out: string[] = []; let level: any[] = props.options as any[]
  for (const v of props.modelValue as any[]) { const node = level.find((n: any) => n.value === v); if (!node) break; out.push(node.label); level = node.children || [] }
  return out
})
function pick(colIndex: number, node: any){
  const path = (props.modelValue as any[]).slice(0, colIndex); path.push(node.value)
  emit('update:modelValue', path); emit('change', path)
  if (!(node.children && node.children.length)) open.value = false
}
</script>

<template>
  <div class="kui-cascader">
    <button type="button" :class="['kui-dp-field', disabled ? 'is-disabled' : '']" :disabled="disabled" @click="open = !open">
      <span :class="['kui-dp-text', !labels.length ? 'is-ph' : '']">{{ labels.length ? labels.join(' / ') : placeholder }}</span>
      <Icon name="chevronDown" :size="15" class="kui-dp-ico" />
    </button>
    <template v-if="open">
      <div class="kui-pop-backdrop" @click="open = false"></div>
      <div class="kui-cascader-pop">
        <div v-for="(col, ci) in columns" :key="ci" class="kui-cascader-col">
          <button v-for="n in col" :key="n.value" type="button" :class="['kui-cascader-item', modelValue[ci] === n.value ? 'is-on' : '']" @click="pick(ci, n)">
            <span>{{ n.label }}</span>
            <Icon v-if="n.children && n.children.length" name="chevronRight" :size="13" />
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
