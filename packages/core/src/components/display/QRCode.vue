<script setup lang="ts">
/* QR-код. value — строка (byte-mode, v1–4). Либо готовая matrix (boolean[][]). */
import { computed } from 'vue'
import { qrMatrix } from '../../utils/qrcode'
const props = defineProps({ value: { type: String, default: '' }, size: { type: Number, default: 140 }, matrix: { type: Array, default: null }, margin: { type: Number, default: 2 }, dark: { type: String, default: 'currentColor' }, light: { type: String, default: 'transparent' } })
const grid = computed<boolean[][]>(() => { try { return (props.matrix as any) || (props.value ? qrMatrix(props.value) : []) } catch (e) { return [] } })
const n = computed(() => grid.value.length)
const total = computed(() => n.value + props.margin * 2)
</script>

<template>
  <svg v-if="n" :width="size" :height="size" :viewBox="'0 0 ' + total + ' ' + total" class="k-qr" shape-rendering="crispEdges">
    <rect :width="total" :height="total" :fill="light" />
    <template v-for="(row, r) in grid" :key="r">
      <rect v-for="(v, c) in row" v-show="v" :key="c" :x="c + margin" :y="r + margin" width="1" height="1" :fill="dark" />
    </template>
  </svg>
</template>
