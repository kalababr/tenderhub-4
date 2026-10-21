import { useI18n } from '../i18n/I18nProvider.jsx'

/**
 * Renders a mock local ad creative (fictional brand, bilingual copy).
 * The creative follows the site language, so an Ethiopian visitor
 * reading Amharic sees the ad in Amharic.
 */
export default function MockAd({ creative }) {
  const { tr } = useI18n()

  return (
    <div className={`mock-ad mock-ad--${creative.variant}`}>
      <span className="mock-ad__mark" aria-hidden="true">
        {creative.mark}
      </span>

      <div className="mock-ad__copy">
        <span className="mock-ad__eyebrow">{tr(creative.eyebrow)}</span>
        <p className="mock-ad__headline">{tr(creative.headline)}</p>
        <p className="mock-ad__body">{tr(creative.body)}</p>
        <p className="mock-ad__price">{tr(creative.price)}</p>
      </div>

      <div className="mock-ad__action">
        <a className="btn btn--gold btn--sm" href={creative.href}>
          {tr(creative.cta)}
        </a>
        <p className="mock-ad__contact">{creative.contact}</p>
        <p className="mock-ad__note">{tr(creative.note)}</p>
      </div>
    </div>
  )
}
