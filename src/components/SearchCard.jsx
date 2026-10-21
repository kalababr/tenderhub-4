import { FaMagnifyingGlass, FaXmark } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { categories, procurementTypes, regions } from '../data/taxonomy.js'

const STATUS_OPTIONS = [
  { value: 'all', key: 'search.all' },
  { value: 'Published', key: 'status.published' },
  { value: 'Closed', key: 'status.closed' },
  { value: 'Awarded', key: 'status.awarded' },
  { value: 'Cancelled', key: 'status.cancelled' },
  { value: 'Draft', key: 'status.draft' },
  { value: 'PendingReview', key: 'status.pendingReview' },
  { value: 'Rejected', key: 'status.rejected' },
]

const DEADLINE_OPTIONS = [
  { value: 'all', key: 'search.any' },
  { value: '7', key: 'search.next7' },
  { value: '30', key: 'search.next30' },
  { value: '90', key: 'search.next90' },
]

const PUBLISHED_OPTIONS = [
  { value: 'all', key: 'search.any' },
  { value: '7', key: 'search.last7' },
  { value: '30', key: 'search.last30' },
]

export default function SearchCard({ filters, onUpdate, onClear }) {
  const { t } = useI18n()
  const set = (key) => (event) => onUpdate({ [key]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    document.getElementById('tenders')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <form className="search-card" onSubmit={submit} aria-label={t('search.aria')}>
      <div className="field field--wide">
        <label htmlFor="s-keyword">{t('search.keyword')}</label>
        <input
          id="s-keyword"
          type="search"
          value={filters.keyword}
          onChange={set('keyword')}
          placeholder={t('search.keywordPh')}
          autoComplete="off"
        />
        <p className="field-hint">{t('search.keywordHint')}</p>
      </div>

      <div className="field">
        <label htmlFor="s-category">{t('search.category')}</label>
        <select id="s-category" value={filters.category} onChange={set('category')}>
          <option value="all">{t('search.all')}</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {t(`cat.${item.id}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="s-region">{t('search.region')}</label>
        <select id="s-region" value={filters.region} onChange={set('region')}>
          <option value="all">{t('search.all')}</option>
          {regions.map((item) => (
            <option key={item.id} value={item.id}>
              {t(`region.${item.id}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="s-type">{t('search.type')}</label>
        <select id="s-type" value={filters.procurementType} onChange={set('procurementType')}>
          <option value="all">{t('search.all')}</option>
          {procurementTypes.map((type) => (
            <option key={type} value={type}>
              {t(`type.${type}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="s-status">{t('search.status')}</label>
        <select id="s-status" value={filters.status} onChange={set('status')}>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.key)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="s-deadline">{t('search.deadline')}</label>
        <select id="s-deadline" value={filters.deadline} onChange={set('deadline')}>
          {DEADLINE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.key)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="s-published">{t('search.published')}</label>
        <select id="s-published" value={filters.published} onChange={set('published')}>
          {PUBLISHED_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.key)}
            </option>
          ))}
        </select>
      </div>

      <div className="search-actions">
        <button type="submit" className="btn btn--primary">
          <FaMagnifyingGlass aria-hidden="true" />
          {t('search.submit')}
        </button>
        <button type="button" className="btn btn--ghost" onClick={onClear}>
          <FaXmark aria-hidden="true" />
          {t('search.clear')}
        </button>
      </div>

      <p className="field-note">{t('search.statusNote')}</p>
    </form>
  )
}
