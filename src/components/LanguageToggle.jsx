import { FaGlobe } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n()
  return (
    <div className="lang-toggle" role="group" aria-label={t('lang.aria')}>
      <FaGlobe aria-hidden="true" className="lang-globe" />
      <button
        type="button"
        className={lang === 'en' ? 'is-active' : ''}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        {t('lang.en')}
      </button>
      <button
        type="button"
        className={lang === 'am' ? 'is-active' : ''}
        aria-pressed={lang === 'am'}
        onClick={() => setLang('am')}
      >
        {t('lang.am')}
      </button>
    </div>
  )
}
