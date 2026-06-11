<script setup lang="ts">
/* Дерево. nodes:[{key,label,icon?,children?,expanded?}]. v-model:selectedKey. */
import TreeNode from './TreeNode.vue'
const props = defineProps({ nodes: { type: Array, default: () => [] }, selectedKey: { default: null } })
const emit = defineEmits(['select','update:selectedKey','toggle'])
function onSelect(n: any){ emit('select', n); emit('update:selectedKey', n.key) }
</script>

<template>
  <div class="k-tree" role="tree">
    <TreeNode v-for="n in nodes" :key="n.key" :node="n" :selected-key="selectedKey" @select="onSelect" @toggle="$emit('toggle', $event)" />
  </div>
</template>
