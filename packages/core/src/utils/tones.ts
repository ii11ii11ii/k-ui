/* Тоны статусов → CSS-токены (из styles.css). Общий справочник для бейджей. */
export const STATUS_TONES = {
  amber:  { bg: 'var(--st-amber-bg)',  fg: 'var(--st-amber-fg)',  dot: 'var(--st-amber-dot)' },
  green:  { bg: 'var(--st-green-bg)',  fg: 'var(--st-green-fg)',  dot: 'var(--st-green-dot)' },
  blue:   { bg: 'var(--st-blue-bg)',   fg: 'var(--st-blue-fg)',   dot: 'var(--st-blue-dot)' },
  violet: { bg: 'var(--st-violet-bg)', fg: 'var(--st-violet-fg)', dot: 'var(--st-violet-dot)' },
  gray:   { bg: 'var(--st-gray-bg)',   fg: 'var(--st-gray-fg)',   dot: 'var(--st-gray-dot)' },
  red:    { bg: 'var(--st-red-bg)',    fg: 'var(--st-red-fg)',    dot: 'var(--st-red-dot)' },
}

export type ToneName = keyof typeof STATUS_TONES;
