<script setup lang="ts">
/* Шаги-визард. current — индекс активного; steps:[{title,description?,icon?}]. */
import Icon from '../ui/Icon.vue'
const props = defineProps({
  current: { type: Number, default: 0 },
  steps: { type: Array, default: () => [] },
  direction: { type: String, default: 'horizontal' },
})
function status(i: number){ return i < props.current ? 'done' : (i === props.current ? 'active' : 'wait') }
</script>

<template>
  <div :class="['kui-steps', 'kui-steps-' + direction]">
    <div v-for="(s, i) in steps" :key="i" :class="['kui-step', 'is-' + status(i)]">
      <div class="kui-step-marker">
        <Icon v-if="status(i) === 'done'" name="checkMark" :size="14" />
        <Icon v-else-if="s.icon" :name="s.icon" :size="14" />
        <span v-else>{{ i + 1 }}</span>
      </div>
      <div class="kui-step-main">
        <div class="kui-step-title">{{ s.title }}</div>
        <div v-if="s.description" class="kui-step-desc">{{ s.description }}</div>
      </div>
      <div v-if="i < steps.length - 1" class="kui-step-line"></div>
    </div>
  </div>
</template>
