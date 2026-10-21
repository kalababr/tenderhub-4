import { useEffect, useState } from 'react'
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaBriefcase,
  FaCalendarDays,
  FaCircleCheck,
  FaCoins,
  FaEnvelope,
  FaGlobe,
  FaIdCard,
  FaLocationDot,
  FaPhone,
  FaRegClock,
  FaUsers,
} from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { tenders } from '../data/tenders.js'
import { VerifyBadge } from '../components/Badges.jsx'
import LanguageToggle from '../components/LanguageToggle.jsx'
import TenderRow from '../components/TenderRow.jsx'

/**
 * Company profile page — one screen per directory company.
 * Every figure comes from the sample directory file, nothing is fetched.
 */
export default function CompanyPage({ business, onSave, savedRefs, onDetails }) {
  const { t, tr } = useI18n()
  const [following, setFollowing] = useState(false)

  useEffect(() => {
    document.title = business ? `${tr(business.name)} — ${t('brand.name')}` : t('company.notFound')
    /* put the site title back when the profile is closed */
    return () => {
      document.title = t('brand.name')
    }
  }, [business, tr, t])

  if (!business) {
    return (
      <div className="company-page">
        <header className="company-top">
          <a className="logo company-logo" href="#top">
            {t('brand.name')}
          </a>
          <div className="company-top-actions">
            <LanguageToggle />
            <a className="btn btn--ghost btn--sm" href="#top">
              <FaArrowLeft aria-hidden="true" />
              {t('company.backHome')}
            </a>
          </div>
        </header>

        <main id="main" className="company-main container">
          <div className="company-empty">
            <h1>{t('company.notFound')}</h1>
            <p>{t('company.notFoundBody')}</p>
            <a className="btn btn--primary" href="#directory">
              {t('company.backDirectory')}
              <span className="arrow-circle" aria-hidden="true">
                <FaArrowRight />
              </span>
            </a>
          </div>
        </main>
      </div>
    )
  }

  const companyTenders = tenders.filter((item) => item.businessId === business.id)

  const facts = [
    { icon: FaCalendarDays, label: t('company.founded'), value: String(business.founded) },
    { icon: FaUsers, label: t('company.employees'), value: tr(business.employees) },
    { icon: FaIdCard, label: t('company.registration'), value: business.registration },
    { icon: FaCoins, label: t('company.capital'), value: tr(business.capital) },
    { icon: FaLocationDot, label: t('company.headquarters'), value: tr(business.headquarters) },
    { icon: FaBriefcase, label: t('company.sector'), value: t(`cat.${business.sector}`) },
  ]

  const trackRecord = [
    { label: t('company.posted'), value: business.stats.posted.toLocaleString('en-US') },
    { label: t('company.awarded'), value: business.stats.awarded.toLocaleString('en-US') },
    { label: t('company.value'), value: tr(business.stats.value) },
    { label: t('company.onTime'), value: business.stats.onTime },
  ]

  return (
    <div className="company-page">
      <header className="company-top">
        <a className="logo company-logo" href="#top">
          {t('brand.name')}
        </a>
        <div className="company-top-actions">
          <LanguageToggle />
          <a className="btn btn--ghost btn--sm" href="#directory">
            <FaArrowLeft aria-hidden="true" />
            {t('company.backDirectory')}
          </a>
        </div>
      </header>

      <main id="main" className="company-main container">
        <section className="company-hero" aria-labelledby="company-name">
          <div className="company-identity">
            <span className="company-mark" aria-hidden="true">
              {business.initials}
            </span>
            <div>
              <h1 id="company-name">{tr(business.name)}</h1>
              <p className="company-tags">
                <VerifyBadge status={business.verificationStatus} />
                <span className="company-tag">{t(`cat.${business.sector}`)}</span>
                <span className="company-tag">{t(`region.${business.region}`)}</span>
              </p>
            </div>
          </div>

          <p className="company-summary">{tr(business.summary)}</p>

          <div className="company-actions">
            <button
              type="button"
              className={`btn ${following ? 'btn--gold' : 'btn--primary'}`}
              aria-pressed={following}
              onClick={() => setFollowing((value) => !value)}
            >
              <FaCircleCheck aria-hidden="true" />
              {following ? t('company.following') : t('company.follow')}
            </button>
            <a className="btn btn--outline" href="#contact">
              {t('company.contact')}
            </a>
            <a className="btn btn--outline" href={business.site} target="_blank" rel="noopener noreferrer">
              {t('company.visitSite')}
              <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
          </div>

          <p className="sample-note company-note">{t('company.sampleNote')}</p>
        </section>

        <div className="company-grid">
          <div className="company-main-col">
            <section className="card company-block" aria-labelledby="company-about">
              <h2 id="company-about">{t('company.about')}</h2>
              <p>{tr(business.summary)}</p>

              <h3>{t('company.specialties')}</h3>
              <ul className="tag-list">
                {business.specialties.map((item) => (
                  <li key={item.en} className="company-tag">
                    {tr(item)}
                  </li>
                ))}
              </ul>

              <h3>{t('company.certifications')}</h3>
              <ul className="check-list">
                {business.certifications.map((item) => (
                  <li key={item.en}>
                    <FaCircleCheck aria-hidden="true" />
                    <span>{tr(item)}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="company-block" aria-labelledby="company-tenders">
              <div className="section-head">
                <div>
                  <h2 id="company-tenders">{t('company.tenders')}</h2>
                  <p className="section-sub">{t('company.tendersSub')}</p>
                </div>
              </div>

              {companyTenders.length > 0 ? (
                <ul className="tender-list">
                  {companyTenders.map((tender) => (
                    <TenderRow
                      key={tender.reference}
                      tender={tender}
                      saved={savedRefs?.includes(tender.reference)}
                      onSave={() => onSave(tender.reference)}
                      onDetails={() => onDetails(tender)}
                    />
                  ))}
                </ul>
              ) : (
                <p className="field-note">{t('company.noTenders')}</p>
              )}
            </section>
          </div>

          <aside className="company-side">
            <section className="card company-block" aria-labelledby="company-facts">
              <h2 id="company-facts">{t('company.facts')}</h2>
              <dl className="company-facts">
                {facts.map((fact) => {
                  const Icon = fact.icon
                  return (
                    <div key={fact.label}>
                      <dt>
                        <Icon aria-hidden="true" />
                        {fact.label}
                      </dt>
                      <dd>{fact.value}</dd>
                    </div>
                  )
                })}
              </dl>
            </section>

            <section className="card company-block" aria-labelledby="company-track">
              <h2 id="company-track">{t('company.track')}</h2>
              <dl className="company-track">
                {trackRecord.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="field-note">{t('company.trackNote')}</p>
            </section>

            <section className="card company-block" aria-labelledby="company-contact">
              <h2 id="company-contact">{t('company.contactTitle')}</h2>
              <ul className="company-contact-list">
                <li>
                  <FaPhone aria-hidden="true" />
                  <a href={`tel:${business.phone.replace(/\s/g, '')}`}>{business.phone}</a>
                </li>
                <li>
                  <FaEnvelope aria-hidden="true" />
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
                <li>
                  <FaGlobe aria-hidden="true" />
                  <a href={business.site} target="_blank" rel="noopener noreferrer">
                    {t('company.website')}
                    <FaArrowUpRightFromSquare aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <FaRegClock aria-hidden="true" />
                  <span>{t('company.hours')}</span>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}
