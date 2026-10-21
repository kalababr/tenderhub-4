import {
  FaArrowUpRightFromSquare,
  FaFacebookF,
  FaLinkedin,
  FaLocationDot,
  FaTelegram,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { socials } from '../data/site.js'

const ICONS = {
  telegram: FaTelegram,
  twitter: FaXTwitter,
  facebook: FaFacebookF,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
}

/**
 * Office location — Bole, Addis Ababa.
 * The map is an OpenStreetMap embed: no API key, no tracking, and the
 * address below is a placeholder until the real office is confirmed.
 */
const MAP_MARKER = { lat: 8.978, lon: 38.799 }
const MAP_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=38.7700%2C8.9550%2C38.8300%2C8.9950&layer=mapnik&marker=${MAP_MARKER.lat}%2C${MAP_MARKER.lon}`
const MAP_LINK = `https://www.openstreetmap.org/?mlat=${MAP_MARKER.lat}&mlon=${MAP_MARKER.lon}#map=16/${MAP_MARKER.lat}/${MAP_MARKER.lon}`

/** Shared link list: vertical rail on desktop, footer row on small screens. */
export function SocialLinks({ className = '' }) {
  const { t } = useI18n()
  return (
    <ul className={className} aria-label={t('social.aria')}>
      {socials.map((social) => {
        const Icon = ICONS[social.id]
        return (
          <li key={social.id}>
            <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={t(social.labelKey)}>
              <Icon aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default function Footer() {
  const { t } = useI18n()

  const columns = [
    {
      title: t('footer.explore'),
      links: [
        { href: '#tenders', label: t('footer.browseTenders') },
        { href: '#browse-category', label: t('footer.categories') },
        { href: '#browse-region', label: t('footer.regions') },
        { href: '#alerts', label: t('footer.createAlert') },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { href: '#directory', label: t('footer.directory') },
        { href: '#news', label: t('footer.news') },
        { href: '#guides', label: t('footer.guides') },
        { href: '#faq', label: t('footer.faq') },
      ],
    },
    {
      title: t('footer.account'),
      links: [
        { href: '#/signin', label: t('footer.signIn') },
        { href: '#/signin', label: t('footer.postTender') },
        { href: '#/signin', label: t('footer.savedTenders') },
        { href: '#advertise', label: t('footer.advertise') },
      ],
    },
  ]

  const legal = [
    { href: '#trust', label: t('footer.about') },
    { href: '#contact', label: t('footer.contact') },
    { href: '#faq', label: t('footer.terms') },
    { href: '#faq', label: t('footer.privacy') },
  ]

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="logo footer-logo" href="#top">
              <span>{t('brand.name')}</span>
            </a>
            <p className="footer-tagline">{t('footer.tagline')}</p>

            <div className="footer-updates">
              <h3>{t('footer.stayUpdated')}</h3>
              <p>{t('footer.stayUpdatedText')}</p>
              <a className="btn btn--gold btn--sm" href="#alerts">
                {t('footer.createAlert')}
              </a>
            </div>

            <SocialLinks className="social-row" />
          </div>

          <nav className="footer-columns" aria-label={t('footer.links')}>
            {columns.map((column) => (
              <div key={column.title}>
                <h3>{column.title}</h3>
                <ul className="footer-links">
                  {column.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-office" id="map">
          <div className="footer-office-info">
            <h3>
              <FaLocationDot aria-hidden="true" />
              {t('footer.office')}
            </h3>
            <address className="footer-address">
              <p>{t('footer.officeAddress')}</p>
              <p>{t('footer.officePhone')}</p>
              <p>
                <a href={`mailto:${t('footer.officeEmail')}`}>{t('footer.officeEmail')}</a>
              </p>
            </address>
            <a className="footer-map-link" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
              {t('footer.mapOpen')}
              <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
            <p className="footer-map-credit">
              <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
                {t('footer.mapCredit')}
              </a>
            </p>
          </div>

          <iframe
            className="footer-map"
            title={t('footer.mapLabel')}
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="footer-bottom">
          <span>{t('footer.rights')}</span>
          <span className="footer-languages">{t('footer.languageNote')}</span>
          <ul className="footer-legal">
            {legal.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <p className="footer-sample">{t('footer.sample')}</p>
      </div>
    </footer>
  )
}
