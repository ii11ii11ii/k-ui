<script setup lang="ts">
/* Узел дерева (рекурсивный). Используется внутри Tree. */
import { ref } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ node: { type: Object, required: true }, level: { type: Number, default: 0 }, selectedKey: { default: null } })
const emit = defineEmits(['select','toggle'])
const open = ref(props.node.expanded !== false)
const hasChildren = () => props.node.children && props.node.children.length
function toggle(){ if (hasChildren()) { open.value = !open.value; emit('toggle', props.node) } }
</script>

<template>
  <div class="kui-tree-node">
    <div :class="['kui-tree-row', selectedKey === node.key ? 'is-selected' : '']" :style="{ paddingLeft: (level * 16 + 8) + 'px' }" @click="$emit('select', node)">
      <button v-if="hasChildren()" type="button" :class="['kui-tree-caret', open ? 'is-open' : '']" @click.stop="toggle"><Icon name="chevronRight" :size="13" /></button>
      <span v-else class="kui-tree-caret-spacer"></span>
      <Icon v-if="node.icon" :name="node.icon" :size="15" class="kui-tree-ico" />
      <span class="kui-tree-label">{{ node.label }}</span>
    </div>
    <div v-if="hasChildren() && open" class="kui-tree-children">
      <TreeNode v-for="c in node.children" :key="c.key" :node="c" :level="level + 1" :selected-key="selectedKey" @select="$emit('select', $event)" @toggle="$emit('toggle', $event)" />
    </div>
  </div>
</template>
