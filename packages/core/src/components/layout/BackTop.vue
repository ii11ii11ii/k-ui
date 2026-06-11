<script setup lang="ts">
/* Кнопка «наверх», появляется после прокрутки. */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ threshold: { type: Number, default: 240 }, right: { type: Number, default: 24 }, bottom: { type: Number, default: 24 } })
const show = ref(false)
function onScroll(){ show.value = (window.scrollY || document.documentElement.scrollTop) > props.threshold }
function toTop(){ window.scrollTo({ top: 0, behavior: 'smooth' }) }
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <teleport to="body">
    <transition name="k-fade">
      <button v-if="show" class="k-backtop" :style="{ right: right + 'px', bottom: bottom + 'px' }" aria-label="Наверх" @click="toTop">
        <Icon name="chevronDown" :size="20" style="transform:rotate(180deg)" />
      </button>
    </transition>
  </teleport>
</template>
