import { useLocale } from '../context/LocaleContext.jsx'
import './DonationCard.css'

export default function DonationCard({
  frequency,
  onFrequencyChange,
  amount,
  onAmountChange,
  customAmount,
  onCustomAmountChange,
}) {
  const { t, presets, formatMoney, country } = useLocale()

  return (
    <div className="donation-card card">
      <div className="donation-card__frequency" role="tablist" aria-label={t('donate.frequency')}>
        {['once', 'monthly'].map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={frequency === value}
            className={frequency === value ? 'is-active' : ''}
            onClick={() => onFrequencyChange(value)}
          >
            {value === 'once' ? t('donate.oneTime') : t('donate.monthly')}
          </button>
        ))}
      </div>

      <fieldset className="donation-card__amounts">
        <legend className="visually-hidden">{t('donate.chooseAmount')}</legend>
        {presets.map((value) => (
          <label key={value} className={`amount-pill ${amount === value ? 'is-selected' : ''}`}>
            <input
              type="radio"
              name="amount"
              value={value}
              checked={amount === value}
              onChange={() => {
                onAmountChange(value)
                onCustomAmountChange('')
              }}
            />
            {formatMoney(value)}
          </label>
        ))}
        <label className={`amount-pill amount-pill--custom ${amount === 'custom' ? 'is-selected' : ''}`}>
          <input
            type="radio"
            name="amount"
            value="custom"
            checked={amount === 'custom'}
            onChange={() => onAmountChange('custom')}
          />
          {t('donate.custom')}
        </label>
      </fieldset>

      {amount === 'custom' && (
        <div className="donation-card__custom">
          <label htmlFor="custom-amount">{t('donate.customLabel', { currency: country.currency })}</label>
          <input
            id="custom-amount"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={customAmount}
            onChange={(e) => onCustomAmountChange(e.target.value)}
          />
        </div>
      )}

      <p className="donation-card__min">{t('donate.minNote', { amount: formatMoney(presets[0]) })}</p>
    </div>
  )
}
