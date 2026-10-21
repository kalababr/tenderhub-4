import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './en.js'
import am from './am.js'

const dicts = { en, am }
const STORAGE_KEY = 'tenderhub.lang'
const I18nContext = createContext(null)

function readInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'am') return saved
  } catch {
    /* storage unavailable */
  }
  return 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(readInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const value = useMemo(() => {
    const dict = dicts[lang] || dicts.en

    /** t('tenders.count', { n: 3 }) -> replaces {n} */
    const t = (path, vars) => {
      let text = dict[path] ?? dicts.en[path] ?? path
      if (vars) {
        for (const [key, val] of Object.entries(vars)) {
          text = text.split(`{${key}}`).join(String(val))
        }
      }
      return text
    }

    /** tr({ en: 'Road', am: 'መንገድ' }) -> picks the active language */
    const tr = (pair) => {
      if (!pair) return ''
      return pair[lang] ?? pair.en ?? ''
    }

    return { lang, setLang, t, tr }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}
