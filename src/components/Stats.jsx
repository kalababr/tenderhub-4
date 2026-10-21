import { useI18n } from '../i18n/I18nProvider.jsx'
import { formatNumber } from '../i18n/format.js'
import { stats } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function Stats() {
  const { t, lang } = useI18n()

  return (
    <Reveal className="stats container">
      <dl className="stat-grid">
        {stats.map((stat) => (
          <div className="stat" key={stat.id}>
            <dt>{t(stat.labelKey)}</dt>
            <dd>{stat.valueKey ? t(stat.valueKey) : formatNumber(stat.value, lang)}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}
