import { useI18n } from '../i18n/I18nProvider.jsx'

const lowerFirst = (value) => value.charAt(0).toLowerCase() + value.slice(1)

export function StatusBadge({ status }) {
  const { t } = useI18n()
  return (
    <span className={`badge badge--status-${lowerFirst(status)}`}>
      <span className="sr-only">{t('tender.status')}: </span>
      {t(`status.${lowerFirst(status)}`)}
    </span>
  )
}

export function VerifyBadge({ status }) {
  const { t } = useI18n()
  return (
    <span className={`badge badge--verify-${status}`}>
      <span className="sr-only">{t('verify.issuer')}: </span>
      {t(`verify.${status}`)}
    </span>
  )
}
