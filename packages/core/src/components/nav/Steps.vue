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
  <div :class="['k-steps', 'k-steps-' + direction]">
    <div v-for="(s, i) in steps" :key="i" :class="['k-step', 'is-' + status(i)]">
      <div class="k-step-marker">
        <Icon v-if="status(i) === 'done'" name="checkMark" :size="14" />
        <Icon v-else-if="s.icon" :name="s.icon" :size="14" />
        <span v-else>{{ i + 1 }}</span>
      </div>
      <div class="k-step-main">
        <div class="k-step-title">{{ s.title }}</div>
        <div v-if="s.description" class="k-step-desc">{{ s.description }}</div>
      </div>
      <div v-if="i < steps.length - 1" class="k-step-line"></div>
    </div>
  </div>
</template>
