import { useI18n } from '../i18n/I18nProvider.jsx'
import { SocialLinks } from './Footer.jsx'

/** Vertical social links beside the scrollbar — desktop only (hidden < 1024px). */
export default function SocialRail() {
  const { t } = useI18n()
  return (
    <nav className="social-rail" aria-label={t('social.aria')}>
      <SocialLinks className="social-rail-list" />
    </nav>
  )
}
