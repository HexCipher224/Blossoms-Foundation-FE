import { Link } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext.jsx'
import './CTASection.css'

export default function CTASection({ title, text, ctaLabel, ctaTo = '/donate' }) {
  const { t } = useLocale()
  return (
    <section className="cta-section">
      <img src="/images/cta-background.svg" alt="" className="cta-section__bg" aria-hidden="true" />
      <div className="cta-section__overlay" />
      <div className="container cta-section__content">
        <h2>{title ?? t('cta.title')}</h2>
        <p>{text ?? t('cta.text')}</p>
        <Link to={ctaTo} className="btn btn-primary">
          {ctaLabel ?? t('cta.button')}
        </Link>
      </div>
    </section>
  )
}
