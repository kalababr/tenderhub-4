import { FaArrowRight } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { categories } from '../data/taxonomy.js'
import Reveal from './Reveal.jsx'
import SearchCard from './SearchCard.jsx'

export default function Hero({ filters, onUpdate, onClear, onPickCategory, postHref = '#post' }) {
  const { t } = useI18n()

  return (
    <section className="hero-outer container" aria-labelledby="hero-title">
      <Reveal className="hero">
        <div className="hero-copy">
          <p className="hero-badge">{t('hero.badge')}</p>
          <h1 id="hero-title">{t('hero.title')}</h1>
          <p className="hero-sub">{t('hero.sub')}</p>

          <div className="hero-chips">
            <span className="hero-chips-label" id="hero-chips-label">
              {t('hero.chips')}
            </span>
            <div className="chip-row" role="group" aria-labelledby="hero-chips-label">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className="chip"
                  aria-pressed={filters.category === category.id}
                  onClick={() => onPickCategory(category.id)}
                >
                  {t(`cat.${category.id}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-links">
            <a className="btn btn--gold" href="#alerts">
              {t('hero.getAlerts')}
              <span className="arrow-circle" aria-hidden="true">
                <FaArrowRight />
              </span>
            </a>
            <a className="btn btn--outline-light" href={postHref}>
              {t('hero.postTender')}
            </a>
          </div>
        </div>

        <SearchCard filters={filters} onUpdate={onUpdate} onClear={onClear} />
      </Reveal>
    </section>
  )
}
