import { useEffect, useState } from 'react'
import { ShieldCheck, Info, MapPin } from 'lucide-react'
import DonationCard from '../components/DonationCard.jsx'
import WalletPanel from '../components/WalletPanel.jsx'
import { createDonation } from '../config/api.js'
import { useLocale } from '../context/LocaleContext.jsx'
import './Donate.css'

const initialForm = { name: '', email: '', phone: '' }

// Defined at module level so inputs keep focus between keystrokes.
function Field({ id, label, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Donate() {
  const { t, country, language, confirmed, openLocale, presets, minLocal, formatMoney, toUsdt } = useLocale()

  const [frequency, setFrequency] = useState('once')
  const [amount, setAmount] = useState(presets[1])
  const [customAmount, setCustomAmount] = useState('')
  const [network, setNetwork] = useState('TRC20')
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [donation, setDonation] = useState(null)

  // Ask for location + language the first time someone opens the donate page.
  useEffect(() => {
    if (!confirmed) openLocale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Local-currency presets change when the country changes.
  useEffect(() => {
    setAmount(presets[1])
    setCustomAmount('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country.code])

  const finalAmount = amount === 'custom' ? Number(customAmount) : amount
  const usdt = finalAmount > 0 ? toUsdt(finalAmount) : 0

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = t('donate.err.name')
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = t('donate.err.email')
    if (!form.phone.trim()) next.phone = t('donate.err.phone')
    if (!finalAmount || finalAmount < minLocal) next.amount = t('donate.err.amount', { amount: formatMoney(minLocal) })
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    setApiError('')
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      const result = await createDonation({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        amount: finalAmount,
        currency: country.currency,
        country: country.code,
        language,
        frequency,
        network,
      })
      setDonation(result)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      if (err.details?.amount) {
        setErrors({ amount: t('donate.err.amount', { amount: formatMoney(minLocal) }) })
      } else {
        setApiError(err.code === 'wallet_not_configured' ? t('donate.err.wallet') : t('donate.err.api'))
      }
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setDonation(null)
    setForm(initialForm)
    setCustomAmount('')
    setAmount(presets[1])
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{t('donate.eyebrow')}</span>
          <h1>{t('donate.title')}</h1>
          <p>{t('donate.lead')}</p>
        </div>
      </section>

      <section className="donate-page">
        <div className="container donate-page__grid">
          {donation ? (
            <WalletPanel donation={donation} onBack={reset} />
          ) : (
            <form className="donate-form" onSubmit={handleSubmit} noValidate>
              <div className="locale-row">
                <span>
                  <MapPin size={16} /> {t('donate.location')}: <strong>{country.flag} {country.name} · {country.currency}</strong>
                </span>
                <button type="button" onClick={openLocale}>
                  {t('donate.change')}
                </button>
              </div>

              <DonationCard
                frequency={frequency}
                onFrequencyChange={setFrequency}
                amount={amount}
                onAmountChange={setAmount}
                customAmount={customAmount}
                onCustomAmountChange={setCustomAmount}
              />
              {errors.amount && <p className="field-error">{errors.amount}</p>}

              <div className="donate-form__fields card">
                <Field id="donor-name" label={t('donate.fullName')} value={form.name} error={errors.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Field id="donor-email" label={t('donate.email')} type="email" value={form.email} error={errors.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Field id="donor-phone" label={t('donate.phone')} type="tel" placeholder="+254 7XX XXX XXX"
                  value={form.phone} error={errors.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />

                <div className="field">
                  <label htmlFor="donor-network">{t('donate.network')}</label>
                  <select id="donor-network" value={network} onChange={(e) => setNetwork(e.target.value)}>
                    <option value="TRC20">{t('donate.networkTrc20')}</option>
                    <option value="BEP20">{t('donate.networkBep20')}</option>
                  </select>
                </div>

                {frequency === 'monthly' && <p className="donate-form__note">{t('donate.monthlyNote')}</p>}

                {apiError && (
                  <p className="api-error" role="alert">
                    {apiError}
                  </p>
                )}

                <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                  {submitting ? t('donate.creating') : t('donate.submit')}
                </button>

                <p className="donate-form__disclaimer">
                  <Info size={15} /> {t('donate.summary3')}
                </p>
              </div>
            </form>
          )}

          <aside className="donate-summary card">
            <img src="/images/donate-side.svg" alt="" className="donate-summary__img" loading="lazy" />
            <div className="donate-summary__body">
              <h3>{t('donate.summaryTitle')}</h3>
              <p className="donate-summary__amount">
                {formatMoney(finalAmount > 0 ? finalAmount : 0)}
                <span> {frequency === 'monthly' ? t('donate.perMonth') : t('donate.once')}</span>
              </p>
              <p className="donate-summary__usdt">{t('donate.approx', { usdt: usdt.toFixed(2) })}</p>
              <ul className="donate-summary__list">
                <li>{t('donate.summary1')}</li>
                <li>{t('donate.summary2')}</li>
                <li>{t('donate.summary3')}</li>
              </ul>
              <div className="donate-summary__security">
                <ShieldCheck size={18} />
                <span>{t('donate.feeNote')}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
