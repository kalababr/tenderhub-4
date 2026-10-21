import { FaFlag } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import Reveal from './Reveal.jsx'

const POINTS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
]

export default function Trust() {
  const { t } = useI18n()

  return (
    <Reveal as="section" id="trust" className="section container" aria-labelledby="trust-title">
      <div className="section-head">
        <div>
          <h2 id="trust-title">{t('trust.title')}</h2>
          <p className="section-sub">{t('trust.sub')}</p>
        </div>
      </div>

      <div className="trust-list">
        {POINTS.map((point) => (
          <div className="trust-point" key={point.id}>
            <h3>{t(`trust.t${point.id}`)}</h3>
            <p>{t(`trust.b${point.id}`)}</p>
          </div>
        ))}
      </div>

      <div className="trust-foot">
        <p className="disclaimer">{t('trust.disclaimer')}</p>
        <a className="btn btn--ghost" href="#contact">
          <FaFlag aria-hidden="true" />
          {t('trust.report')}
        </a>
      </div>
    </Reveal>
  )
}
