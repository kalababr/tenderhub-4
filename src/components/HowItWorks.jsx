import { useI18n } from '../i18n/I18nProvider.jsx'
import Reveal from './Reveal.jsx'

const TRACKS = [
  {
    key: 'supplier',
    steps: [1, 2, 3],
  },
  {
    key: 'publisher',
    steps: [1, 2, 3],
  },
]

export default function HowItWorks() {
  const { t } = useI18n()

  return (
    <Reveal as="section" id="how" className="section container" aria-labelledby="how-title">
      <div className="section-head">
        <div>
          <h2 id="how-title">{t('how.title')}</h2>
          <p className="section-sub">{t('how.sub')}</p>
        </div>
      </div>

      <div className="two-col">
        {TRACKS.map((track) => (
          <div className="card" key={track.key}>
            <h3 className="track-title">{t(`how.${track.key}`)}</h3>
            <ol className="steps">
              {track.steps.map((step) => (
                <li className="step" key={step}>
                  <div>
                    <h4>{t(`how.${track.key}${step}t`)}</h4>
                    <p>{t(`how.${track.key}${step}b`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Reveal>
  )
}
