import { useEffect, useRef } from 'react'
import { FaArrowUpRightFromSquare, FaXmark } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { formatDate } from '../i18n/format.js'
import { StatusBadge, VerifyBadge } from './Badges.jsx'

export default function TenderDetailDialog({ tender, onClose }) {
  const { t, tr, lang } = useI18n()
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const rows = [
    { label: t('tender.reference'), value: tender.reference },
    { label: t('tender.issuer'), value: tr(tender.issuer.name) },
    { label: t('tender.category'), value: t(`cat.${tender.category}`) },
    { label: t('tender.region'), value: t(`region.${tender.region}`) },
    { label: t('tender.type'), value: t(`type.${tender.procurementType}`) },
    { label: t('tender.published'), value: formatDate(tender.publicationDate, lang) },
    { label: t('tender.deadline'), value: formatDate(tender.deadline, lang) },
  ]

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <div className="dialog-head">
          <h2 id="detail-title">{t('detail.title')}</h2>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label={t('detail.close')}>
            <FaXmark aria-hidden="true" />
          </button>
        </div>

        <div className="tender-badges" style={{ marginBottom: '12px' }}>
          <StatusBadge status={tender.status} />
          <VerifyBadge status={tender.issuer.verificationStatus} />
        </div>

        <h3>{tr(tender.title)}</h3>

        <dl className="contact-list">
          {rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>

        <p style={{ marginTop: '16px' }}>{tr(tender.description)}</p>
        <p className="field-note">{t('detail.note')}</p>

        <div className="form-actions" style={{ marginTop: '8px' }}>
          <a
            className="btn btn--primary"
            href={tender.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaArrowUpRightFromSquare aria-hidden="true" />
            {t('detail.source')}
          </a>
        </div>
      </div>
    </div>
  )
}
