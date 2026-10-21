import { useMemo, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { daysUntil } from '../i18n/format.js'
import Reveal from './Reveal.jsx'
import TenderRow from './TenderRow.jsx'

const CLOSING_WINDOW_DAYS = 14

export default function LatestTenders({ tenders, onClear, onSave, savedRefs, onDetails }) {
  const { t } = useI18n()
  const [tab, setTab] = useState('latest')
  const [sort, setSort] = useState('published')

  const list = useMemo(() => {
    let base = tenders
    if (tab === 'closing') {
      base = tenders.filter((item) => {
        const days = daysUntil(item.deadline)
        return days >= 0 && days <= CLOSING_WINDOW_DAYS
      })
    }

    const sorted = [...base]
    if (sort === 'published') sorted.sort((a, b) => b.publicationDate.localeCompare(a.publicationDate))
    if (sort === 'deadline') sorted.sort((a, b) => a.deadline.localeCompare(b.deadline))
    if (sort === 'title') sorted.sort((a, b) => a.title.en.localeCompare(b.title.en))
    return sorted
  }, [tenders, tab, sort])

  return (
    <Reveal as="section" id="tenders" className="section container" aria-labelledby="tenders-title">
      <div className="section-head">
        <div>
          <h2 id="tenders-title">{t('tenders.title')}</h2>
          <p className="section-sub">{t('tenders.sub')}</p>
        </div>
        <div className="section-tools">
          <div className="tabs" role="group" aria-label={t('tenders.tabsLabel')}>
            <button
              type="button"
              className={tab === 'latest' ? 'is-active' : ''}
              aria-pressed={tab === 'latest'}
              onClick={() => setTab('latest')}
            >
              {t('tenders.tabLatest')}
            </button>
            <button
              type="button"
              className={tab === 'closing' ? 'is-active' : ''}
              aria-pressed={tab === 'closing'}
              onClick={() => setTab('closing')}
            >
              {t('tenders.tabClosing')}
            </button>
          </div>
          <div className="sort">
            <label htmlFor="tender-sort">{t('tenders.sortLabel')}</label>
            <select id="tender-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="published">{t('sort.published')}</option>
              <option value="deadline">{t('sort.deadline')}</option>
              <option value="title">{t('sort.title')}</option>
            </select>
          </div>
        </div>
      </div>

      <p className="count-line" aria-live="polite">
        {t('tenders.count', { n: list.length })}
      </p>
      <p className="sample-note">{t('tenders.sampleNote')}</p>

      {list.length === 0 ? (
        <div className="empty-state">
          <h3>{t('tenders.emptyTitle')}</h3>
          <p>{t('tenders.emptyBody')}</p>
          <button type="button" className="btn btn--primary" onClick={onClear}>
            {t('tenders.clear')}
          </button>
        </div>
      ) : (
        <ul className="tender-list">
          {list.map((item) => (
            <TenderRow
              key={item.reference}
              tender={item}
              saved={savedRefs.includes(item.reference)}
              onSave={() => onSave(item.reference)}
              onDetails={() => onDetails(item)}
            />
          ))}
        </ul>
      )}
    </Reveal>
  )
}
