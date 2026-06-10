<script setup lang="ts">
/* Выбор из дерева (поле + поповер с Tree). v-model — key. nodes — дерево. */
import { ref, computed } from 'vue'
import Icon from '../ui/Icon.vue'
import Tree from '../display/Tree.vue'
const props = defineProps({ modelValue: { default: null }, nodes: { type: Array, default: () => [] }, placeholder: { type: String, default: 'Выберите' }, disabled: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue','change'])
const open = ref(false)
function findLabel(list: any[], key: any): string {
  for (const n of list) { if (n.key === key) return n.label; if (n.children) { const r = findLabel(n.children, key); if (r) return r } }
  return ''
}
const label = computed(() => props.modelValue == null ? '' : findLabel(props.nodes as any[], props.modelValue))
function onSelect(n: any){ if (n.children && n.children.length) return; emit('update:modelValue', n.key); emit('change', n.key); open.value = false }
</script>

<template>
  <div class="kui-treeselect">
    <button type="button" :class="['kui-dp-field', disabled ? 'is-disabled' : '']" :disabled="disabled" @click="open = !open">
      <span :class="['kui-dp-text', !label ? 'is-ph' : '']">{{ label || placeholder }}</span>
      <Icon name="chevronDown" :size="15" class="kui-dp-ico" />
    </button>
    <template v-if="open">
      <div class="kui-pop-backdrop" @click="open = false"></div>
      <div class="kui-treeselect-pop"><Tree :nodes="nodes" :selected-key="modelValue" @select="onSelect" /></div>
    </template>
  </div>
</template>
