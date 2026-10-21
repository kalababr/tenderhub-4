import { useI18n } from '../i18n/I18nProvider.jsx'
import Reveal from './Reveal.jsx'

const QUESTIONS = [1, 2, 3, 4, 5]

export default function Faq() {
  const { t } = useI18n()

  return (
    <Reveal as="section" id="faq" className="section container" aria-labelledby="faq-title">
      <div className="section-head">
        <div>
          <h2 id="faq-title">{t('faq.title')}</h2>
          <p className="section-sub">{t('faq.sub')}</p>
        </div>
      </div>

      <div className="faq-list">
        {QUESTIONS.map((n) => (
          <details key={n}>
            <summary>{t(`faq.q${n}`)}</summary>
            <p>{t(`faq.a${n}`)}</p>
          </details>
        ))}
      </div>
    </Reveal>
  )
}
