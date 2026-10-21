import { useState } from 'react'
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <Reveal as="section" id="contact" className="section container" aria-labelledby="contact-title">
      <div className="section-head">
        <div>
          <h2 id="contact-title">{t('contact.title')}</h2>
          <p className="section-sub">{t('contact.sub')}</p>
        </div>
      </div>

      <div className="contact-grid">
        <form className="card" onSubmit={submit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="c-name">{t('contact.name')}</label>
              <input id="c-name" type="text" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="c-email">{t('contact.emailLabel')}</label>
              <input id="c-email" type="email" required autoComplete="email" />
            </div>
            <div className="field" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="c-message">{t('contact.message')}</label>
              <textarea id="c-message" required />
            </div>
          </div>
          <div className="form-actions" style={{ marginTop: '16px' }}>
            <button type="submit" className="btn btn--primary">
              {t('contact.send')}
            </button>
          </div>
          {sent && <p className="form-status">{t('contact.success')}</p>}
        </form>

        <div className="card">
          <h3>{t('contact.details')}</h3>
          <dl className="contact-list">
            <div>
              <dt>
                <FaEnvelope aria-hidden="true" /> {t('contact.emailLabel')}
              </dt>
              <dd>
                <a href={`mailto:${t('contact.emailValue')}`}>{t('contact.emailValue')}</a>
              </dd>
            </div>
            <div>
              <dt>
                <FaPhone aria-hidden="true" /> {t('contact.phone')}
              </dt>
              <dd>{t('contact.phoneValue')}</dd>
            </div>
            <div>
              <dt>
                <FaLocationDot aria-hidden="true" /> {t('contact.address')}
              </dt>
              <dd>
                {t('contact.addressValue')}
                <a className="contact-map-link" href="#map">
                  {t('contact.map')}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Reveal>
  )
}
