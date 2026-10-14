import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations.js'
import { countries, getCountry, languages, presetsFor, formatAmount, toUsdt } from '../i18n/countries.js'

const STORAGE_KEY = 'blossoms.locale'
const LocaleContext = createContext(null)

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!countries.some((c) => c.code === parsed.country)) return null
    if (!languages.some((l) => l.code === parsed.language)) return null
    return parsed
  } catch {
    return null
  }
}

export function LocaleProvider({ children }) {
  const stored = useMemo(readStored, [])
  const [countryCode, setCountryCode] = useState(stored?.country || 'KE')
  const [language, setLanguage] = useState(stored?.language || 'en')
  const [confirmed, setConfirmed] = useState(Boolean(stored))
  const [modalOpen, setModalOpen] = useState(false)

  const country = getCountry(countryCode)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = languages.find((l) => l.code === language)?.dir || 'ltr'
  }, [language])

  const setLocale = useCallback((nextCountry, nextLanguage) => {
    setCountryCode(nextCountry)
    setLanguage(nextLanguage)
    setConfirmed(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ country: nextCountry, language: nextLanguage }))
    } catch {
      /* storage unavailable: the choice simply won't persist */
    }
  }, [])

  const value = useMemo(() => {
    const lookup = (key) => translations[language]?.[key] ?? translations.en[key]
    const t = (key, vars) => {
      let text = lookup(key) ?? key
      if (vars) Object.entries(vars).forEach(([k, v]) => { text = text.split(`{${k}}`).join(String(v)) })
      return text
    }
    const presets = presetsFor(country)
    return {
      country,
      language,
      confirmed,
      countries,
      languages,
      setLocale,
      modalOpen,
      openLocale: () => setModalOpen(true),
      closeLocale: () => setModalOpen(false),
      t,
      tf: (key, fallback) => lookup(key) ?? fallback,
      presets,
      minLocal: presets[0],
      formatMoney: (amount) => formatAmount(country, amount, language),
      toUsdt: (amount) => toUsdt(country, amount),
    }
  }, [country, language, confirmed, modalOpen, setLocale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}
