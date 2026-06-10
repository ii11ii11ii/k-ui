import { reactive, computed } from 'vue'

/* Состояние колонок таблицы (порядок / видимость / закрепление) + persist.
   В Vue 3 — composable useTableColumns(storageKey, columns). Возвращает
   { state, api } — state.order/hidden/fixed реактивны. */
export function useTableColumns(storageKey, columns) {
  const defaults = () => ({
    order: columns.map((c) => c.key),
    hidden: columns.filter((c) => c.hidden).map((c) => c.key),
    fixed: columns.reduce((m, c) => { if (c.fixed) m[c.key] = c.fixed; return m }, {}),
  })

  function init() {
    if (storageKey) {
      try {
        const s = JSON.parse(localStorage.getItem('kmt.cols.' + storageKey))
        if (s && s.order) {
          const known = new Set(columns.map((c) => c.key))
          const order = s.order.filter((k) => known.has(k))
          const hidden = (s.hidden || []).filter((k) => known.has(k))
          columns.forEach((c) => {
            if (!order.includes(c.key)) { order.push(c.key); if (c.hidden && !hidden.includes(c.key)) hidden.push(c.key) }
          })
          return { order, hidden, fixed: s.fixed || {} }
        }
      } catch {}
    }
    return defaults()
  }

  const state = reactive(init())
  function persist() { if (storageKey) { try { localStorage.setItem('kmt.cols.' + storageKey, JSON.stringify(state)) } catch {} } }

  const api = {
    toggle(key) { state.hidden = state.hidden.includes(key) ? state.hidden.filter((k) => k !== key) : [...state.hidden, key]; persist() },
    setFixed(key, side) {
      const fixed = { ...state.fixed }
      if (!side) delete fixed[key]; else fixed[key] = side
      state.fixed = fixed
      if (side) state.hidden = state.hidden.filter((k) => k !== key)
      persist()
    },
    move(from, to) {
      const order = state.order.slice()
      const [m] = order.splice(from, 1)
      order.splice(to, 0, m)
      state.order = order; persist()
    },
    showAll() { state.hidden = []; persist() },
    reset() { const d = defaults(); state.order = d.order; state.hidden = d.hidden; state.fixed = d.fixed; persist() },
  }

  return { state, api }
}

/* Раскладка колонок: видимые в нужном порядке + метаданные закрепления. */
export function layoutColumns(columns, state) {
  const byKey = Object.fromEntries(columns.map((c) => [c.key, c]))
  const ordered = state.order.map((k) => byKey[k]).filter(Boolean)
  const hidden = new Set(state.hidden)
  const vis = ordered.filter((c) => !hidden.has(c.key))
  const fixedOf = (k) => state.fixed[k] || null
  let edgeLeft = null, edgeRight = null
  vis.forEach((c) => { if (fixedOf(c.key) === 'left') edgeLeft = c.key })
  for (const c of vis) { if (fixedOf(c.key) === 'right') { edgeRight = c.key; break } }
  return { vis, fixedOf, edgeLeft, edgeRight }
}
