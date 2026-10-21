import { useI18n } from '../i18n/I18nProvider.jsx'
import { formatNumber } from '../i18n/format.js'
import Reveal from './Reveal.jsx'

export default function BrowseSection({
  id,
  titleKey,
  subKey,
  labelPrefix,
  items,
  active,
  onPick,
  onShowAll,
}) {
  const { t, lang } = useI18n()

  return (
    <Reveal as="section" id={id} className="section container browse-block" aria-labelledby={`${id}-title`}>
      <div className="section-head">
        <div>
          <h2 id={`${id}-title`}>{t(titleKey)}</h2>
          <p className="section-sub">{t(subKey)}</p>
        </div>
        {active !== 'all' && (
          <button type="button" className="btn btn--ghost btn--sm" onClick={onShowAll}>
            {t('browse.showAll')}
          </button>
        )}
      </div>

      <div className="browse-grid">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="browse-item"
            aria-pressed={active === item.id}
            onClick={() => onPick(item.id)}
          >
            <span>{t(`${labelPrefix}.${item.id}`)}</span>
            <span className="browse-count">{t('browse.count', { n: formatNumber(item.count, lang) })}</span>
          </button>
        ))}
      </div>
    </Reveal>
  )
}
