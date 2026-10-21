import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { categories, regions } from '../data/taxonomy.js'
import Reveal from './Reveal.jsx'

const FREQUENCIES = ['immediate', 'daily', 'weekly']

export default function Alerts({ signedIn, onRequireAuth }) {
  const { t } = useI18n()
  const [form, setForm] = useState({
    keywords: '',
    category: 'all',
    region: 'all',
    frequency: 'daily',
    email: '',
  })
  const [done, setDone] = useState(false)

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }))
    setDone(false)
  }

  const submit = (event) => {
    event.preventDefault()
    if (!signedIn) {
      onRequireAuth()
      return
    }
    setDone(true)
  }

  return (
    <Reveal as="section" id="alerts" className="section container" aria-labelledby="alerts-title">
      <div className="section-head">
        <div>
          <h2 id="alerts-title">{t('alerts.title')}</h2>
          <p className="section-sub">{t('alerts.sub')}</p>
        </div>
      </div>

      <div className="alerts-grid">
        <form className="card" onSubmit={submit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="a-keywords">{t('alerts.keywords')}</label>
              <input
                id="a-keywords"
                type="text"
                value={form.keywords}
                onChange={set('keywords')}
                placeholder={t('alerts.keywordsPh')}
              />
            </div>

            <div className="field">
              <label htmlFor="a-category">{t('alerts.category')}</label>
              <select id="a-category" value={form.category} onChange={set('category')}>
                <option value="all">{t('search.all')}</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(`cat.${item.id}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="a-region">{t('alerts.region')}</label>
              <select id="a-region" value={form.region} onChange={set('region')}>
                <option value="all">{t('search.all')}</option>
                {regions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t(`region.${item.id}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="a-frequency">{t('alerts.frequency')}</label>
              <select id="a-frequency" value={form.frequency} onChange={set('frequency')}>
                {FREQUENCIES.map((value) => (
                  <option key={value} value={value}>
                    {t(`freq.${value}`)}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="a-email">{t('alerts.emailLabel')}</label>
              <input
                id="a-email"
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                placeholder={t('alerts.emailPh')}
              />
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '16px' }}>
            <button type="submit" className="btn btn--primary">
              <FaPaperPlane aria-hidden="true" />
              {t('alerts.submit')}
            </button>
          </div>

          {done && <p className="form-status">{t('alerts.success')}</p>}
        </form>

        <div className="card">
          <h3>{t('alerts.channel')}</h3>
          <div className="channel-list">
            <label className="channel">
              <input type="radio" name="channel" value="email" defaultChecked />
              <span>{t('alerts.email')}</span>
            </label>
            <label className="channel">
              <input type="radio" name="channel" value="sms" disabled />
              <span>{t('alerts.sms')}</span>
            </label>
            <label className="channel">
              <input type="radio" name="channel" value="telegram" disabled />
              <span>{t('alerts.telegram')}</span>
            </label>
          </div>
          <p className="field-note" style={{ marginTop: '12px' }}>
            {t('alerts.note')}
          </p>
        </div>
      </div>
    </Reveal>
  )
}
