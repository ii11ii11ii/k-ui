<script setup lang="ts">
/* Изображение с превью по клику (полноэкранный оверлей). */
import { ref } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ src: { type: String, required: true }, alt: { type: String, default: '' }, width: { type: [Number, String], default: '' }, height: { type: [Number, String], default: '' }, fit: { type: String, default: 'cover' }, radius: { type: [Number, String], default: 10 }, preview: { type: Boolean, default: true } })
const open = ref(false)
const dim = (v: any) => (typeof v === 'number' ? v + 'px' : v)
</script>

<template>
  <span class="kui-image">
    <img :src="src" :alt="alt" :class="preview ? 'is-clickable' : ''"
      :style="{ width: dim(width) || '100%', height: dim(height) || 'auto', objectFit: fit, borderRadius: dim(radius) }" @click="preview && (open = true)" />
    <teleport to="body">
      <div v-if="open" class="kui-image-overlay" @click="open = false">
        <img :src="src" :alt="alt" />
        <button class="kui-image-close" aria-label="Закрыть"><Icon name="close" :size="20" /></button>
      </div>
    </teleport>
  </span>
</template>
