<script setup lang="ts">
/* Карусель слайдов. items — массив; слот #slide="{ item, index }". */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Icon from '../ui/Icon.vue'
const props = defineProps({ items: { type: Array, default: () => [] }, autoplay: { type: Boolean, default: false }, interval: { type: Number, default: 4000 }, arrows: { type: Boolean, default: true }, dots: { type: Boolean, default: true } })
const idx = ref(0)
let timer: any = null
function go(i: number){ const n = props.items.length; if (n) idx.value = (i + n) % n }
function start(){ stop(); if (props.autoplay && props.items.length > 1) timer = setInterval(() => go(idx.value + 1), props.interval) }
function stop(){ if (timer) { clearInterval(timer); timer = null } }
onMounted(start); onBeforeUnmount(stop); watch(() => props.autoplay, start)
</script>

<template>
  <div class="k-carousel" @mouseenter="stop" @mouseleave="start">
    <div class="k-carousel-track" :style="{ transform: 'translateX(-' + (idx * 100) + '%)' }">
      <div v-for="(it, i) in items" :key="i" class="k-carousel-slide"><slot name="slide" :item="it" :index="i">{{ it }}</slot></div>
    </div>
    <button v-if="arrows && items.length > 1" class="k-carousel-arrow is-prev" aria-label="Назад" @click="go(idx - 1)"><Icon name="chevronLeft" :size="18" /></button>
    <button v-if="arrows && items.length > 1" class="k-carousel-arrow is-next" aria-label="Вперёд" @click="go(idx + 1)"><Icon name="chevronRight" :size="18" /></button>
    <div v-if="dots && items.length > 1" class="k-carousel-dots">
      <button v-for="(it, i) in items" :key="i" :class="['k-carousel-dot', i === idx ? 'is-on' : '']" @click="go(i)"></button>
    </div>
  </div>
</template>
