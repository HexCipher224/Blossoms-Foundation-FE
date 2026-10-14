import { Link } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext.jsx'
import './Hero.css'

export default function Hero() {
  const { t } = useLocale()
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow">{t('hero.eyebrow')}</span>
          <h1>{t('hero.title')}</h1>
          <p className="hero__lead">{t('hero.lead')}</p>
          <div className="hero__actions">
            <Link to="/donate" className="btn btn-primary">
              {t('nav.donateNow')}
            </Link>
            <Link to="/programs" className="btn btn-outline hero__outline">
              {t('hero.programs')}
            </Link>
          </div>
        </div>

        <div className="hero__media">
          <img
            src="/images/hero-children.svg"
            alt={t('hero.alt')}
            className="hero__image"
            width="640"
            height="720"
          />
        </div>
      </div>

      <svg className="hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40C240 80 480 0 720 20C960 40 1200 80 1440 40V80H0V40Z" fill="var(--color-bg)" />
      </svg>
    </section>
  )
}
