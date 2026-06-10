/* Форматирование денег: группировка тысяч, минус как «−», опц. знак «+». */
export function fmtMoney(n, opts = {}) {
  const { decimals = 2, sign = false } = opts
  if (n === null || n === undefined || n === '') return '—'
  const neg = n < 0
  const abs = Math.abs(n)
  const fixed = abs.toFixed(decimals)
  const [int, dec] = fixed.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const body = dec ? `${grouped}.${dec}` : grouped
  const s = neg ? '−' : (sign && n > 0 ? '+' : '')
  return s + body
}

/* Компактный формат ₽: 723 800 → «724 тыс», 1 240 000 → «1.24 млн». */
export function dashKFmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.?0+$/, '') + ' млн'
  if (n >= 1e3) return Math.round(n / 1e3) + ' тыс'
  return String(n)
}
