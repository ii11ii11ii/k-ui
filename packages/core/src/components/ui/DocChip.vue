<script setup lang="ts">
/* Чип документа (счёт/договор/лицензия/вложение). compact — пилюля для ячейки.
   Развязан: meta:{label,short?,icon,tone}, doc:{number,date?,size?,upload?}. */
import { computed } from 'vue'
import Icon from './Icon.vue'
import { STATUS_TONES } from '../../utils/tones'
const props = defineProps({
  doc: { type: Object, required: true },
  meta: { type: Object, required: true },
  compact: { type: Boolean, default: false },
  downloadable: { type: Boolean, default: true },
})
const emit = defineEmits(['download'])
const t = computed(() => STATUS_TONES[props.meta.tone] || STATUS_TONES.gray)
const vars = computed(() => ({ '--doc-fg': t.value.fg, '--doc-bg': t.value.bg, '--doc-dot': t.value.dot }))
function dl(e: Event){ e.stopPropagation(); if (props.downloadable) emit('download', props.doc) }
</script>

<template>
  <button v-if="compact" type="button" class="doc-tag" :title="meta.label + ' · ' + doc.number + ' — скачать'" :style="vars" @click="dl">
    <Icon :name="meta.icon" :size="12" class="doc-tag-ico" />
    <span class="doc-tag-label">{{ meta.short || meta.label }}</span>
  </button>
  <div v-else :class="['doc-chip', downloadable ? 'doc-chip-clickable' : '']" :style="vars"
    :role="downloadable ? 'button' : undefined" :tabindex="downloadable ? 0 : undefined"
    @click="downloadable && dl($event)" @keydown.enter.prevent="downloadable && dl($event)" @keydown.space.prevent="downloadable && dl($event)">
    <span class="doc-chip-ico"><Icon :name="meta.icon" :size="15" /></span>
    <span class="doc-chip-main">
      <span class="doc-chip-name truncate" :title="meta.label">{{ meta.label }}<span v-if="doc.upload" class="doc-chip-up">загружен</span></span>
      <span class="doc-chip-sub mono"><span class="truncate">{{ doc.number }}</span><em v-if="doc.date">· {{ doc.date }}</em><em v-if="doc.upload && doc.size">· {{ doc.size }}</em><em v-else-if="!doc.upload" class="doc-chip-ondemand">· формируется по запросу</em></span>
    </span>
    <button type="button" class="doc-chip-dl" title="Открыть документ" aria-label="Открыть документ" @click="dl"><Icon name="download" :size="15" /></button>
  </div>
</template>
