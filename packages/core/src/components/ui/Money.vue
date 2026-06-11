<script setup lang="ts">
/* Денежное значение (моноширинное, tnum, без переноса). */
import { computed } from 'vue'
import { fmtMoney } from '../../utils/format'

const props = defineProps({
  value: { type: Number, default: null },
  decimals: { type: Number, default: 2 },
  sign: { type: Boolean, default: false },
  muted: { type: Boolean, default: false },
})
const text = computed(() => fmtMoney(props.value, { decimals: props.decimals, sign: props.sign }))
const cls = computed(() => [
  'mono',
  !props.value && props.muted ? 'k-money-zero' : '',
  props.value < 0 ? 'k-money-neg' : (props.sign && props.value > 0 ? 'k-money-pos' : ''),
].filter(Boolean).join(' '))
</script>

<template>
  <span :class="cls">{{ text }}</span>
</template>
