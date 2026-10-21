import { useState } from 'react'
import { FaArrowRight, FaBars, FaXmark } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import LanguageToggle from './LanguageToggle.jsx'

export default function Navbar({ onSignIn, signedIn }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  /* publishing a tender needs an account — send guests to the sign-in page */
  const postHref = signedIn ? '#post' : '#/signin'

  const links = [
    { href: '#tenders', label: t('nav.tenders') },
    { href: '#directory', label: t('nav.directory') },
    { href: '#news', label: t('nav.news') },
    { href: '#guides', label: t('nav.guides') },
    { href: '#advertise', label: t('nav.advertise') },
  ]

  return (
    <header id="top" className="nav-wrap">
      <nav className="pill-nav" aria-label={t('nav.aria')}>
        <a className="logo" href="#top">
          <span>{t('brand.name')}</span>
        </a>

        <ul id="nav-menu" className={`nav-links${open ? ' is-open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="nav-mobile-only">
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                setOpen(false)
                onSignIn()
              }}
            >
              {signedIn ? t('nav.account') : t('nav.signIn')}
            </button>
          </li>
          <li className="nav-mobile-only">
            <a className="btn btn--gold btn--sm" href={postHref} onClick={() => setOpen(false)}>
              {t('nav.postTender')}
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <LanguageToggle />
          <button type="button" className="btn btn--ghost btn--sm" onClick={onSignIn}>
            {signedIn ? t('nav.account') : t('nav.signIn')}
          </button>
          <a className="btn btn--primary btn--sm" href={postHref}>
            {t('nav.postTender')}
            <span className="arrow-circle" aria-hidden="true">
              <FaArrowRight />
            </span>
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            <span className="sr-only">{open ? t('nav.closeMenu') : t('nav.menu')}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
