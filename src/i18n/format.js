const LOCALES = { en: 'en-GB', am: 'am-ET' }

/**
 * Single place every date is formatted through, so the Ethiopian
 * calendar can be added later without touching the components.
 */
export function formatDate(iso, lang) {
  const date = new Date(`${iso}T00:00:00Z`)
  return new Intl.DateTimeFormat(LOCALES[lang] || LOCALES.en, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
    calendar: 'gregory',
    numberingSystem: 'latn',
  }).format(date)
}

export function formatNumber(value, lang) {
  return new Intl.NumberFormat(LOCALES[lang] || LOCALES.en).format(value)
}

/** Ready for when we start displaying prices. */
export function formatETB(value, lang) {
  return new Intl.NumberFormat(LOCALES[lang] || LOCALES.en, {
    style: 'currency',
    currency: 'ETB',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Whole days from today until an ISO date (negative = past). */
export function daysUntil(iso) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(`${iso}T00:00:00`)
  return Math.round((date - today) / 86400000)
}
