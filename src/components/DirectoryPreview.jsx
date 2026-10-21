import { FaArrowRight, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { businesses } from '../data/directory.js'
import Reveal from './Reveal.jsx'

export default function DirectoryPreview() {
  const { t, tr } = useI18n()

  return (
    <Reveal as="section" id="directory" className="section container" aria-labelledby="directory-title">
      <div className="section-head">
        <div>
          <h2 id="directory-title">{t('directory.title')}</h2>
          <p className="section-sub">{t('directory.sub')}</p>
        </div>
      </div>
      <p className="sample-note">{t('directory.sampleNote')}</p>

      <div className="biz-grid">
        {businesses.map((business) => (
          <article className="card biz-card" key={business.id}>
            <div className="biz-logo" aria-hidden="true">
              {business.initials}
            </div>
            <h3>{tr(business.name)}</h3>
            <p className="field-note">
              {t('directory.sector')}: {t(`cat.${business.sector}`)}
            </p>
            <p className="field-note">
              {t('directory.region')}: {t(`region.${business.region}`)}
            </p>
            <div className="biz-card-actions">
              <a className="link-btn" href={`#/company/${business.id}`}>
                {t('directory.view')}
                <FaArrowRight aria-hidden="true" style={{ marginInlineStart: '6px' }} />
              </a>
              <a
                className="link-btn link-btn--muted"
                href={business.site}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('directory.website')}
                <FaArrowUpRightFromSquare aria-hidden="true" style={{ marginInlineStart: '6px' }} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  )
}
