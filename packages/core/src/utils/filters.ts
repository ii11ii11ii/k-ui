/* =========================================================================
   Фильтры таблиц — чистые утилиты (перенос из ui.jsx). Виды контролов задаются
   в колонке: col.filter = { kind: 'text'|'select'|'combo'|'date'|'presence'|'choice', ... }
   ========================================================================= */
export const KMT_YEAR = 2026
export const KMT_TODAY = new Date(2026, 5, 6)   // «сегодня» = 06.06.2026 (под mock)
export const KMT_WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const KMT_MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

export function kmtParseCell(str) { if (!str) return null; const [d, m] = String(str).split('.').map(Number); if (!d || !m) return null; return new Date(KMT_YEAR, m - 1, d) }
export function kmtYmd(dt) { return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}` }
export function kmtFromYmd(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
export function kmtFmtDM(dt) { return `${String(dt.getDate()).padStart(2, '0')}.${String(dt.getMonth() + 1).padStart(2, '0')}` }
export function kmtMonday(dt) { const x = new Date(dt); const wd = (x.getDay() + 6) % 7; x.setDate(x.getDate() - wd); return x }
export function kmtSameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() }

export function kmtEmptyValue(col) {
  const k = col.filter.kind
  if (k === 'date') return null
  if (k === 'presence') return { mode: '', number: '' }
  if ((k === 'select' || k === 'combo') && col.filter.multi) return []
  return ''
}

export function kmtFilterActive(val) {
  if (val == null) return false
  if (Array.isArray(val)) return val.length > 0
  if (typeof val === 'object') {
    if ('from' in val) return !!val.from
    if ('mode' in val || 'number' in val) return !!(val.mode || (val.number && String(val.number).trim()))
    return false
  }
  return String(val).trim() !== ''
}

export function kmtDateMatch(cell, val) {
  if (!val || !val.from) return true
  const dt = kmtParseCell(cell); if (!dt) return false
  const f = kmtFromYmd(val.from), t = kmtFromYmd(val.to || val.from)
  return dt >= new Date(f.getFullYear(), f.getMonth(), f.getDate()) && dt <= new Date(t.getFullYear(), t.getMonth(), t.getDate(), 23, 59)
}

export function kmtPresenceMatch(docNumber, val) {
  if (!val) return true
  const has = !!(docNumber && String(docNumber).trim())
  if (val.mode === 'has' && !has) return false
  if (val.mode === 'none' && has) return false
  if (val.number && String(val.number).trim()) {
    if (!has || !String(docNumber).toLowerCase().includes(String(val.number).trim().toLowerCase())) return false
  }
  return true
}

export function kmtFilterLabel(col, val, options) {
  const kind = col.filter.kind
  if (kind === 'date') {
    if (!val || !val.from) return ''
    if (val.preset === 'today') return 'Сегодня'
    if (val.preset === 'week') return 'Неделя'
    if (val.preset === 'month') return 'Месяц'
    const f = kmtFromYmd(val.from)
    if (!val.to || val.to === val.from) return kmtFmtDM(f)
    return `${kmtFmtDM(f)}–${kmtFmtDM(kmtFromYmd(val.to))}`
  }
  if (kind === 'presence') {
    if (!val) return ''
    const parts = []
    if (val.mode === 'has') parts.push('По наличию')
    else if (val.mode === 'none') parts.push('По отсутствию')
    if (val.number && String(val.number).trim()) parts.push(`№ ${val.number.trim()}`)
    return parts.join(' · ')
  }
  if (kind === 'choice') {
    const o = (options || col.filter.options || []).find((x) => x.value === val)
    return o ? o.label : (val || '')
  }
  if (kind === 'select' || kind === 'combo') {
    const arr = Array.isArray(val) ? val : [val]
    const lab = (v) => { const o = (options || []).find((x) => x.value === v); return o ? o.label : v }
    if (arr.length <= 1) return lab(arr[0])
    return `${lab(arr[0])} +${arr.length - 1}`
  }
  return String(val)
}
