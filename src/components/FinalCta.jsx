import { FaArrowRight } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import Reveal from './Reveal.jsx'

export default function FinalCta() {
  const { t } = useI18n()

  return (
    <Reveal as="section" id="post" className="section container" aria-labelledby="cta-title">
      <div className="cta-band">
        <h2 id="cta-title">{t('cta.title')}</h2>
        <p>{t('cta.sub')}</p>
        <div className="cta-actions">
          <a className="btn btn--gold" href="#how">
            {t('cta.primary')}
            <span className="arrow-circle" aria-hidden="true">
              <FaArrowRight />
            </span>
          </a>
          <a className="btn btn--outline-light" href="#alerts">
            {t('cta.secondary')}
          </a>
        </div>
      </div>
    </Reveal>
  )
}
