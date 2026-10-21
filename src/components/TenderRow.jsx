import { FaBookmark, FaBuilding, FaRegBookmark, FaRegClock } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { daysUntil, formatDate, formatNumber } from '../i18n/format.js'
import { StatusBadge, VerifyBadge } from './Badges.jsx'

export default function TenderRow({ tender, saved, onSave, onDetails }) {
  const { t, tr, lang } = useI18n()
  const days = daysUntil(tender.deadline)
  const daysLabel = days === 0 ? t('tender.today') : t('tender.daysLeft', { n: formatNumber(days, lang) })

  return (
    <li className="tender-row">
      <div className="tender-main">
        <div className="tender-badges">
          <StatusBadge status={tender.status} />
          <VerifyBadge status={tender.issuer.verificationStatus} />
        </div>

        <h3 className="tender-title">{tr(tender.title)}</h3>

        <p className="tender-issuer">
          <FaBuilding aria-hidden="true" />
          <span className="meta-label">{t('tender.issuer')}</span>
          <span>{tr(tender.issuer.name)}</span>
        </p>

        <ul className="tender-meta">
          <li>
            <span>{t('tender.reference')}</span>
            {tender.reference}
          </li>
          <li>
            <span>{t('tender.category')}</span>
            {t(`cat.${tender.category}`)}
          </li>
          <li>
            <span>{t('tender.region')}</span>
            {t(`region.${tender.region}`)}
          </li>
          <li>
            <span>{t('tender.type')}</span>
            {t(`type.${tender.procurementType}`)}
          </li>
        </ul>
      </div>

      <div className="tender-side">
        <p className="tender-deadline">
          <FaRegClock aria-hidden="true" />
          <span>
            <span className="meta-label">{t('tender.deadline')}</span>{' '}
            <strong>{formatDate(tender.deadline, lang)}</strong>
          </span>
          <span className="days-left">{daysLabel}</span>
        </p>

        <div className="tender-actions">
          <button
            type="button"
            className={`btn btn--sm ${saved ? 'btn--gold' : 'btn--ghost'}`}
            aria-pressed={saved}
            onClick={onSave}
          >
            {saved ? <FaBookmark aria-hidden="true" /> : <FaRegBookmark aria-hidden="true" />}
            {saved ? t('tender.saved') : t('tender.save')}
          </button>
          <button type="button" className="link-btn" onClick={onDetails}>
            {t('tender.details')}
          </button>
        </div>
      </div>
    </li>
  )
}
