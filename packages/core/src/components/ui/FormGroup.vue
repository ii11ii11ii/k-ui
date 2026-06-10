<script setup lang="ts">
/* Группа полей формы: заголовок секции + строки. Слот #aside — справа в шапке. */
defineProps({ title: { type: String, default: '' } })
</script>

<template>
  <section class="frow-group">
    <div v-if="title" class="frow-group-head">
      <span class="form-sec-title">{{ title }}</span>
      <slot name="aside" />
    </div>
    <div class="frow-list"><slot /></div>
  </section>
</template>
