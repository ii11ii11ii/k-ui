/* Телефонные маски по странам (без внешних сервисов). Чистые функции. */
export interface PhoneCountry { iso: string; name: string; dial: string; mask: string }

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: 'RU', name: 'Россия',         dial: '7',   mask: '(###) ###-##-##' },
  { iso: 'KZ', name: 'Казахстан',      dial: '7',   mask: '(###) ###-##-##' },
  { iso: 'US', name: 'США',            dial: '1',   mask: '(###) ###-####' },
  { iso: 'CA', name: 'Канада',         dial: '1',   mask: '(###) ###-####' },
  { iso: 'BY', name: 'Беларусь',       dial: '375', mask: '(##) ###-##-##' },
  { iso: 'UA', name: 'Украина',        dial: '380', mask: '(##) ###-##-##' },
  { iso: 'UZ', name: 'Узбекистан',     dial: '998', mask: '(##) ###-##-##' },
  { iso: 'KG', name: 'Кыргызстан',     dial: '996', mask: '(###) ###-###' },
  { iso: 'TJ', name: 'Таджикистан',    dial: '992', mask: '(##) ###-####' },
  { iso: 'TM', name: 'Туркменистан',   dial: '993', mask: '(##) ##-##-##' },
  { iso: 'AZ', name: 'Азербайджан',    dial: '994', mask: '(##) ###-##-##' },
  { iso: 'AM', name: 'Армения',        dial: '374', mask: '(##) ###-###' },
  { iso: 'GE', name: 'Грузия',         dial: '995', mask: '(###) ###-###' },
  { iso: 'MD', name: 'Молдова',        dial: '373', mask: '(##) ###-###' },
  { iso: 'DE', name: 'Германия',       dial: '49',  mask: '#### #######' },
  { iso: 'GB', name: 'Великобритания', dial: '44',  mask: '#### ######' },
  { iso: 'FR', name: 'Франция',        dial: '33',  mask: '# ## ## ## ##' },
  { iso: 'IT', name: 'Италия',         dial: '39',  mask: '### ######' },
  { iso: 'ES', name: 'Испания',        dial: '34',  mask: '### ## ## ##' },
  { iso: 'PL', name: 'Польша',         dial: '48',  mask: '### ### ###' },
  { iso: 'CZ', name: 'Чехия',          dial: '420', mask: '### ### ###' },
  { iso: 'TR', name: 'Турция',         dial: '90',  mask: '(###) ### ## ##' },
  { iso: 'CN', name: 'Китай',          dial: '86',  mask: '### #### ####' },
  { iso: 'IN', name: 'Индия',          dial: '91',  mask: '##### #####' },
  { iso: 'AE', name: 'ОАЭ',            dial: '971', mask: '## ### ####' },
  { iso: 'IL', name: 'Израиль',        dial: '972', mask: '##-###-####' },
  { iso: 'RS', name: 'Сербия',         dial: '381', mask: '## ###-####' },
]
export const PHONE_BY_ISO: Record<string, PhoneCountry> = Object.fromEntries(PHONE_COUNTRIES.map((c) => [c.iso, c]))
export const phoneDigits = (s: any): string => String(s == null ? '' : s).replace(/\D/g, '')
export const phoneMaxDigits = (mask: string): number => (mask.match(/#/g) || []).length
export function phoneFormatNational(mask: string, nat: string): string {
  let out = '', i = 0
  for (const ch of mask) {
    if (ch === '#') { if (i < nat.length) out += nat[i++]; else break }
    else { if (i < nat.length) out += ch; else break }
  }
  return out
}
export function phoneFull(country: PhoneCountry, nat: string): string {
  const f = phoneFormatNational(country.mask, nat)
  return '+' + country.dial + (f ? ' ' + f : '')
}
export function phonePlaceholder(country: PhoneCountry): string {
  return '+' + country.dial + ' ' + country.mask.replace(/#/g, '0')
}
export function phoneDetect(digits: string, preferIso?: string) {
  let best: PhoneCountry | null = null
  for (const c of PHONE_COUNTRIES) {
    if (digits.startsWith(c.dial) && (!best || c.dial.length > best.dial.length)) best = c
  }
  if (!best) return null
  const sameDial = PHONE_COUNTRIES.filter((c) => c.dial === best!.dial)
  if (sameDial.length > 1) best = sameDial.find((c) => c.iso === preferIso) || sameDial[0]
  return { country: best, national: digits.slice(best.dial.length) }
}
export function phoneParseInput(raw: any, currentCountry: PhoneCountry, preferIso?: string) {
  const hasPlus = String(raw == null ? '' : raw).trim().startsWith('+')
  const digits = phoneDigits(raw)
  if (!digits) return { country: currentCountry, national: '' }
  const maxNat = phoneMaxDigits(currentCountry.mask)
  const trunk8 = digits.length === 11 && digits[0] === '8'
  const norm = trunk8 ? '7' + digits.slice(1) : digits
  if (hasPlus || trunk8 || norm.length > maxNat) {
    const det = phoneDetect(norm, preferIso)
    if (det) return { country: det.country, national: det.national.slice(0, phoneMaxDigits(det.country.mask)) }
  }
  return { country: currentCountry, national: digits.slice(0, maxNat) }
}
