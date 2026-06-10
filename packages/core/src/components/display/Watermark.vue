<script setup lang="ts">
/* Водяной знак (повторяющийся текст поверх содержимого). */
import { computed } from 'vue'
const props = defineProps({ text: { type: String, default: 'Кометум' }, color: { type: String, default: 'rgba(120,120,140,0.10)' }, fontSize: { type: Number, default: 15 }, rotate: { type: Number, default: -22 }, gap: { type: Number, default: 130 } })
const bg = computed(() => {
  if (typeof document === 'undefined') return 'none'
  const c = document.createElement('canvas'); const g = props.gap; c.width = g; c.height = g
  const ctx = c.getContext('2d'); if (!ctx) return 'none'
  ctx.translate(g / 2, g / 2); ctx.rotate(props.rotate * Math.PI / 180)
  ctx.font = '600 ' + props.fontSize + 'px Inter, sans-serif'; ctx.fillStyle = props.color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(props.text, 0, 0)
  return 'url(' + c.toDataURL() + ')'
})
</script>

<template>
  <div class="kui-watermark"><slot /><div class="kui-watermark-layer" :style="{ backgroundImage: bg }"></div></div>
</template>
