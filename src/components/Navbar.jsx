import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { useLocale } from '../context/LocaleContext.jsx'
import './Navbar.css'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/about', key: 'nav.about' },
  { to: '/programs', key: 'nav.programs' },
  { to: '/impact', key: 'nav.impact' },
  { to: '/stories', key: 'nav.stories' },
  { to: '/get-involved', key: 'nav.involved' },
]

export default function Navbar() {
  const { t, country, language, openLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="34" height="34">
              <path
                d="M20 33C20 33 8 26 8 15.5C8 9.5 12.6 6 17 7.7C19 8.5 20 11 20 11C20 11 21 8.5 23 7.7C27.4 6 32 9.5 32 15.5C32 26 20 33 20 33Z"
                fill="var(--color-green-700)"
              />
              <circle cx="20" cy="12.5" r="2.6" fill="var(--color-orange-500)" />
            </svg>
          </span>
          <span className="brand__text">Blossoms Foundation</span>
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
            >
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <NavLink to="/donate" className="btn btn-primary navbar__donate">
            {t('nav.donateNow')}
          </NavLink>
          <button
            type="button"
            className="navbar__locale"
            onClick={openLocale}
            aria-label={t('nav.language')}
          >
            <Globe size={16} />
            <span>{country.flag} {language.toUpperCase()}</span>
          </button>
          <button
            className="navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `mobile-menu__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </NavLink>
          ))}
          <NavLink to="/donate" className="btn btn-primary btn-block" onClick={() => setMenuOpen(false)}>
            {t('nav.donateNow')}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
