import { useEffect, useMemo, useRef, useState } from 'react'
import { X, Check, ArrowLeft } from 'lucide-react'
import { useLocale } from '../context/LocaleContext.jsx'
import './LocaleModal.css'

export default function LocaleModal() {
  const { modalOpen, closeLocale, countries, languages, country, language, setLocale, t } = useLocale()
  const [step, setStep] = useState(1)
  const [draftCountry, setDraftCountry] = useState(country)
  const [draftLang, setDraftLang] = useState(language)
  const [query, setQuery] = useState('')
  const headingRef = useRef(null)

  useEffect(() => {
    if (!modalOpen) return undefined
    setStep(1)
    setDraftCountry(country)
    setDraftLang(language)
    setQuery('')
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeLocale()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen])

  useEffect(() => {
    if (modalOpen && headingRef.current) headingRef.current.focus()
  }, [step, modalOpen])

  const filtered = useMemo(
    () => countries.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase())),
    [countries, query],
  )

  if (!modalOpen) return null

  const suggested = draftCountry.languages.filter((code) => languages.some((l) => l.code === code))
  const others = languages.filter((l) => !suggested.includes(l.code))

  function pickCountry(c) {
    setDraftCountry(c)
    setDraftLang(c.languages[0] || 'en')
    setStep(2)
  }

  function confirm() {
    setLocale(draftCountry.code, draftLang)
    closeLocale()
  }

  const renderLang = (code) => {
    const lang = languages.find((l) => l.code === code)
    return (
      <li key={code}>
        <button
          type="button"
          className={`locale-option ${draftLang === code ? 'is-selected' : ''}`}
          onClick={() => setDraftLang(code)}
          aria-pressed={draftLang === code}
        >
          <span>{lang.label}</span>
          {draftLang === code && <Check size={18} />}
        </button>
      </li>
    )
  }

  return (
    <div className="locale-overlay" onMouseDown={(e) => e.target === e.currentTarget && closeLocale()}>
      <div className="locale-dialog" role="dialog" aria-modal="true" aria-labelledby="locale-title">
        <button type="button" className="locale-close" onClick={closeLocale} aria-label={t('locale.close')}>
          <X size={20} />
        </button>

        <h2 id="locale-title" tabIndex={-1} ref={headingRef}>
          {step === 1 ? t('locale.title') : t('locale.titleLang')}
        </h2>
        <p className="locale-sub">{t('locale.subtitle')}</p>

        {step === 1 ? (
          <>
            <label htmlFor="locale-search" className="visually-hidden">{t('locale.search')}</label>
            <input
              id="locale-search"
              type="search"
              className="locale-search"
              placeholder={t('locale.search')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className="locale-list">
              {filtered.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    className={`locale-option ${c.code === draftCountry.code ? 'is-selected' : ''}`}
                    onClick={() => pickCountry(c)}
                  >
                    <span>
                      <span aria-hidden="true">{c.flag}</span> {c.name}
                    </span>
                    <small>{c.currency}</small>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="locale-empty">{t('locale.noResults')}</li>}
            </ul>
          </>
        ) : (
          <>
            <p className="locale-picked">
              <span aria-hidden="true">{draftCountry.flag}</span> {draftCountry.name} · {draftCountry.currency}
            </p>
            <h3 className="locale-group">{t('locale.suggested')}</h3>
            <ul className="locale-list">{suggested.map(renderLang)}</ul>
            {others.length > 0 && (
              <>
                <h3 className="locale-group">{t('locale.other')}</h3>
                <ul className="locale-list">{others.map((l) => renderLang(l.code))}</ul>
              </>
            )}
            <p className="locale-note">{t('locale.rateNote', { currency: draftCountry.currency })}</p>
            <div className="locale-actions">
              <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                <ArrowLeft size={16} /> {t('locale.back')}
              </button>
              <button type="button" className="btn btn-dark" onClick={confirm}>
                {t('locale.confirm')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
