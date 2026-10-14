import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Send } from 'lucide-react'
import { useLocale } from '../context/LocaleContext.jsx'
import { subscribeNewsletter } from '../config/api.js'
import './Footer.css'

const quickLinks = [
  { to: '/about', key: 'nav.about' },
  { to: '/programs', key: 'nav.programs' },
  { to: '/impact', key: 'nav.impact' },
  { to: '/stories', key: 'nav.stories' },
  { to: '/get-involved', key: 'nav.involved' },
  { to: '/donate', key: 'nav.donate' },
  { to: '/contact', key: 'nav.contact' },
]

const programLinks = ['education', 'nutrition', 'healthcare', 'child-protection', 'family-support']

const socials = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'X (formerly Twitter)', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const { t } = useLocale()
  const [subscribed, setSubscribed] = useState(false)
  const [subError, setSubError] = useState('')

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email.trim()) return
    setSubError('')
    try {
      await subscribeNewsletter(email.trim())
      setSubscribed(true)
      setEmail('')
    } catch {
      setSubError(t('footer.error'))
    }
  }

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand">
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="30" height="30">
                <path
                  d="M20 33C20 33 8 26 8 15.5C8 9.5 12.6 6 17 7.7C19 8.5 20 11 20 11C20 11 21 8.5 23 7.7C27.4 6 32 9.5 32 15.5C32 26 20 33 20 33Z"
                  fill="var(--color-yellow-500)"
                />
                <circle cx="20" cy="12.5" r="2.6" fill="var(--color-orange-500)" />
              </svg>
            </span>
            <span className="brand__text footer__brand-text">Blossoms Foundation</span>
          </Link>
          <p className="footer__tagline">{t('footer.tagline')}</p>

          <ul className="footer__socials">
            {socials.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a href={href} aria-label={label} className="footer__social-link">
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h3>{t('footer.quick')}</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{t(link.key)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Programs">
          <h3>{t('footer.programs')}</h3>
          <ul>
            {programLinks.map((id) => (
              <li key={id}>
                <Link to={`/programs#${id}`}>{t(`programs.${id}.title`)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__newsletter">
          <h3>{t('footer.newsTitle')}</h3>
          <p>{t('footer.newsText')}</p>
          {subscribed ? (
            <p className="footer__subscribed" role="status">
              {t('footer.thanks')}
            </p>
          ) : (
            <form className="footer__form" onSubmit={handleSubscribe}>
              <label htmlFor="newsletter-email" className="visually-hidden">
                {t('footer.email')}
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" aria-label={t('footer.subscribe')}>
                <Send size={17} />
              </button>
            </form>
          )}
          {subError && <p className="footer__suberror" role="alert">{subError}</p>}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{t('footer.rights')}</p>
          <div className="footer__legal">
            <Link to="/contact">{t('footer.privacy')}</Link>
            <span aria-hidden="true">·</span>
            <Link to="/contact">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
