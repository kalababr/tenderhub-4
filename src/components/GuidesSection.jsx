import { useI18n } from '../i18n/I18nProvider.jsx'
import { guides } from '../data/guides.js'
import Reveal from './Reveal.jsx'

export default function GuidesSection() {
  const { t, tr } = useI18n()

  return (
    <Reveal as="section" id="guides" className="section container" aria-labelledby="guides-title">
      <div className="section-head">
        <div>
          <h2 id="guides-title">{t('guides.title')}</h2>
          <p className="section-sub">{t('guides.sub')}</p>
        </div>
      </div>
      <p className="sample-note">{t('guides.sampleNote')}</p>

      <div className="guide-grid">
        {guides.map((guide) => (
          <article className="card guide-card" key={guide.id}>
            <div className="thumb" aria-hidden="true" />
            <h3>{tr(guide.title)}</h3>
            <p>{tr(guide.excerpt)}</p>
            <a className="link-btn" href={guide.href}>
              {t('guides.read')}
            </a>
          </article>
        ))}
      </div>
    </Reveal>
  )
}
