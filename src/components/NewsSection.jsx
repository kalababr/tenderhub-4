import { useI18n } from '../i18n/I18nProvider.jsx'
import { formatDate } from '../i18n/format.js'
import { news } from '../data/news.js'
import Reveal from './Reveal.jsx'

export default function NewsSection() {
  const { t, tr, lang } = useI18n()

  return (
    <Reveal as="section" id="news" className="section container" aria-labelledby="news-title">
      <div className="section-head">
        <div>
          <h2 id="news-title">{t('news.title')}</h2>
          <p className="section-sub">{t('news.sub')}</p>
        </div>
      </div>
      <p className="sample-note">{t('news.sampleNote')}</p>

      <div className="news-grid">
        {news.map((item) => (
          <article className="card news-item" key={item.id}>
            <time dateTime={item.date}>{formatDate(item.date, lang)}</time>
            <span className="news-cat">{tr(item.category)}</span>
            <h3>{tr(item.title)}</h3>
            <p>{tr(item.excerpt)}</p>
            <a className="link-btn" href={item.href}>
              {t('news.read')}
            </a>
          </article>
        ))}
      </div>
    </Reveal>
  )
}
