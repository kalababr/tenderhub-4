import { useI18n } from '../i18n/I18nProvider.jsx'
import Reveal from './Reveal.jsx'
import MockAd from './MockAd.jsx'

export default function AdSlot({ id, sizeKey, pitch = false, creative }) {
  const { t } = useI18n()

  return (
    <Reveal as="section" id={id} className="container ad-wrap" aria-label={t('ad.label')}>
      <div className="ad-slot">
        <span className="ad-flag">{t('ad.label')}</span>
        <span className="ad-size">{t(sizeKey)}</span>

        {creative ? (
          <MockAd creative={creative} />
        ) : (
          <>
            <h3>{t('ad.title')}</h3>
            <p>{t('ad.body')}</p>
          </>
        )}

        {pitch && (
          <p>
            {t('ad.pitch')} <a href="#contact">{t('ad.contact')}</a>
          </p>
        )}
      </div>
    </Reveal>
  )
}
