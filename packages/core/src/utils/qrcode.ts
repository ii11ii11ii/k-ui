/* Компактный генератор QR (byte-mode, версии 1–4, уровень EC = L).
   Покрывает короткие строки/URL (до ~78 байт). Для больших данных в проекте-
   потребителе подключите пакет `qrcode` и передайте готовую матрицу в QRCode.vue
   через проп `matrix`. Возвращает boolean[][] (true = тёмный модуль). */

// --- GF(256) ---
const EXP: number[] = new Array(512)
const LOG: number[] = new Array(256)
;(function () {
  let x = 1
  for (let i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 0x100) x ^= 0x11d }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]
})()
function gmul(a: number, b: number): number { return (a === 0 || b === 0) ? 0 : EXP[LOG[a] + LOG[b]] }
function rsGen(degree: number): number[] {
  let g = [1]
  for (let i = 0; i < degree; i++) {
    const next = new Array(g.length + 1).fill(0)
    for (let j = 0; j < g.length; j++) { next[j] ^= g[j]; next[j + 1] ^= gmul(g[j], EXP[i]) }
    g = next
  }
  return g
}
function rsEncode(data: number[], ecLen: number): number[] {
  const gen = rsGen(ecLen)
  const res = data.slice().concat(new Array(ecLen).fill(0))
  for (let i = 0; i < data.length; i++) {
    const coef = res[i]
    if (coef !== 0) for (let j = 0; j < gen.length; j++) res[i + j] ^= gmul(gen[j], coef)
  }
  return res.slice(data.length)
}

// version (1..4) → { size, totalCW, dataCW, ecCW, byteCap, align }
const VERSIONS = [
  { v: 1, size: 21, dataCW: 19, ecCW: 7, byteCap: 17, align: null as null | number },
  { v: 2, size: 25, dataCW: 34, ecCW: 10, byteCap: 32, align: 18 },
  { v: 3, size: 29, dataCW: 55, ecCW: 15, byteCap: 53, align: 22 },
  { v: 4, size: 33, dataCW: 80, ecCW: 20, byteCap: 78, align: 26 },
]

function utf8(str: string): number[] {
  const out: number[] = []
  for (const ch of unescape(encodeURIComponent(str))) out.push(ch.charCodeAt(0))
  return out
}

const MASKS = [
  (i: number, j: number) => (i + j) % 2 === 0,
  (i: number, _j: number) => i % 2 === 0,
  (_i: number, j: number) => j % 3 === 0,
  (i: number, j: number) => (i + j) % 3 === 0,
  (i: number, j: number) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0,
  (i: number, j: number) => ((i * j) % 2) + ((i * j) % 3) === 0,
  (i: number, j: number) => (((i * j) % 2) + ((i * j) % 3)) % 2 === 0,
  (i: number, j: number) => (((i + j) % 2) + ((i * j) % 3)) % 2 === 0,
]

export function qrMatrix(text: string): boolean[][] {
  const bytes = utf8(text)
  const spec = VERSIONS.find((s) => bytes.length <= s.byteCap)
  if (!spec) throw new Error('QRCode: payload too long for v1–4 (max 78 bytes)')
  const N = spec.size

  // --- bit stream (byte mode, 8-bit count for v1–9) ---
  const bits: number[] = []
  const push = (val: number, len: number) => { for (let b = len - 1; b >= 0; b--) bits.push((val >> b) & 1) }
  push(0b0100, 4)
  push(bytes.length, 8)
  for (const b of bytes) push(b, 8)
  const capBits = spec.dataCW * 8
  for (let k = 0; k < 4 && bits.length < capBits; k++) bits.push(0)
  while (bits.length % 8) bits.push(0)
  const pads = [0xec, 0x11]; let pi = 0
  while (bits.length < capBits) { push(pads[pi % 2], 8); pi++ }
  const dataCW: number[] = []
  for (let i = 0; i < bits.length; i += 8) { let v = 0; for (let b = 0; b < 8; b++) v = (v << 1) | bits[i + b]; dataCW.push(v) }
  const ecCW = rsEncode(dataCW, spec.ecCW)
  const all = dataCW.concat(ecCW)

  // --- module matrix ---
  const m: (boolean | null)[][] = Array.from({ length: N }, () => new Array(N).fill(null))
  const fn: boolean[][] = Array.from({ length: N }, () => new Array(N).fill(false))
  const set = (r: number, c: number, v: boolean, isFn = true) => { m[r][c] = v; if (isFn) fn[r][c] = true }

  function finder(r0: number, c0: number) {
    for (let dr = -1; dr <= 7; dr++) for (let dc = -1; dc <= 7; dc++) {
      const r = r0 + dr, c = c0 + dc
      if (r < 0 || c < 0 || r >= N || c >= N) continue
      const inner = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6
      const dark = inner && (dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4))
      set(r, c, !!dark)
    }
  }
  finder(0, 0); finder(0, N - 7); finder(N - 7, 0)
  // timing
  for (let i = 8; i < N - 8; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0) }
  // alignment
  if (spec.align != null) {
    const a = spec.align
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
      const dark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1
      set(a + dr, a + dc, dark)
    }
  }
  // dark module
  set(4 * spec.v + 9, 8, true)
  // reserve format areas (mark as function, fill later)
  for (let i = 0; i < 9; i++) { if (!fn[8][i]) { m[8][i] = false; fn[8][i] = true } if (!fn[i][8]) { m[i][8] = false; fn[i][8] = true } }
  for (let i = 0; i < 8; i++) { m[8][N - 1 - i] = false; fn[8][N - 1 - i] = true; m[N - 1 - i][8] = false; fn[N - 1 - i][8] = true }

  // --- place data (zigzag) ---
  let bi = 0
  let upward = true
  for (let col = N - 1; col > 0; col -= 2) {
    if (col === 6) col = 5
    for (let t = 0; t < N; t++) {
      const row = upward ? N - 1 - t : t
      for (let c = 0; c < 2; c++) {
        const cc = col - c
        if (fn[row][cc]) continue
        let dark = false
        if (bi < all.length * 8) { const byte = all[bi >> 3]; dark = ((byte >> (7 - (bi & 7))) & 1) === 1; bi++ }
        m[row][cc] = dark
      }
    }
    upward = !upward
  }

  // --- masking: pick best by penalty ---
  function applyMask(mi: number): boolean[][] {
    const out = m.map((row) => row.map((v) => v === null ? false : v)) as boolean[][]
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!fn[r][c] && MASKS[mi](r, c)) out[r][c] = !out[r][c]
    return out
  }
  function penalty(g: boolean[][]): number {
    let p = 0
    for (let r = 0; r < N; r++) { let run = 1; for (let c = 1; c < N; c++) { if (g[r][c] === g[r][c - 1]) { run++; if (run === 5) p += 3; else if (run > 5) p++ } else run = 1 } }
    for (let c = 0; c < N; c++) { let run = 1; for (let r = 1; r < N; r++) { if (g[r][c] === g[r - 1][c]) { run++; if (run === 5) p += 3; else if (run > 5) p++ } else run = 1 } }
    for (let r = 0; r < N - 1; r++) for (let c = 0; c < N - 1; c++) if (g[r][c] === g[r][c + 1] && g[r][c] === g[r + 1][c] && g[r][c] === g[r + 1][c + 1]) p += 3
    let dark = 0; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (g[r][c]) dark++
    const ratio = (dark * 100) / (N * N); p += Math.floor(Math.abs(ratio - 50) / 5) * 10
    return p
  }
  let best = 0, bestP = Infinity, bestG: boolean[][] = applyMask(0)
  for (let mi = 0; mi < 8; mi++) { const g = applyMask(mi); const p = penalty(g); if (p < bestP) { bestP = p; best = mi; bestG = g } }

  // --- format info (EC=L → 01) ---
  const fmt = (0b01 << 3) | best
  let bch = fmt << 10
  for (let i = 14; i >= 10; i--) if ((bch >> i) & 1) bch ^= 0x537 << (i - 10)
  const fmtBits = ((fmt << 10) | bch) ^ 0x5412
  const fb = (i: number) => ((fmtBits >> i) & 1) === 1
  // around top-left + split top-right/bottom-left
  for (let i = 0; i <= 5; i++) bestG[8][i] = fb(i)
  bestG[8][7] = fb(6); bestG[8][8] = fb(7); bestG[7][8] = fb(8)
  for (let i = 9; i <= 14; i++) bestG[14 - i][8] = fb(i)
  for (let i = 0; i <= 7; i++) bestG[N - 1 - i][8] = fb(i)
  for (let i = 8; i <= 14; i++) bestG[8][N - 15 + i] = fb(i)
  bestG[4 * spec.v + 9][8] = true // dark module stays

  return bestG
}
