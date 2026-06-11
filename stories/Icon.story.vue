<script setup lang="ts">
import { KIcon } from 'k-ui'
import { ICONS } from '@core/icons'
const names = Object.keys(ICONS)
</script>

<template>
  <Story title="Основа/Иконки" group="foundation" :layout="{ type: 'single', iframe: false }">
    <Variant title="Набор">
      <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:14px;padding:20px">
        <div v-for="n in names" :key="n"
          style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px 6px;border:1px solid var(--line);border-radius:10px">
          <KIcon :name="n" :size="22" />
          <span style="font:11px/1.2 ui-monospace,monospace;color:var(--text-3);text-align:center">{{ n }}</span>
        </div>
      </div>
    </Variant>
    <Variant title="Размеры и толщина">
      <div style="display:flex;align-items:center;gap:20px;padding:24px">
        <KIcon name="settings" :size="16" :stroke="1.5" />
        <KIcon name="settings" :size="24" :stroke="1.7" />
        <KIcon name="settings" :size="36" :stroke="2" />
        <KIcon name="settings" :size="48" :stroke="2.4" />
      </div>
    </Variant>
  </Story>
</template>
