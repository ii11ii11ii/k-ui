<script setup lang="ts">
/* Скелетон-плейсхолдер загрузки. variant: text|rect|circle. */
const props = defineProps({
  variant: { type: String, default: 'text' },
  width: { type: [Number, String], default: '' },
  height: { type: [Number, String], default: '' },
  lines: { type: Number, default: 1 },
  animated: { type: Boolean, default: true },
})
const dim = (v: any) => (typeof v === 'number' ? v + 'px' : v)
</script>

<template>
  <div v-if="variant === 'text'" class="k-skel-lines">
    <span v-for="i in lines" :key="i" :class="['k-skel', animated ? 'is-anim' : '']"
      :style="{ width: (i === lines && lines > 1) ? '60%' : (dim(width) || '100%'), height: dim(height) || '0.9em' }"></span>
  </div>
  <span v-else :class="['k-skel', variant === 'circle' ? 'is-circle' : '', animated ? 'is-anim' : '']"
    :style="{ width: dim(width) || (variant === 'circle' ? '40px' : '100%'), height: dim(height) || (variant === 'circle' ? '40px' : '80px') }"></span>
</template>
