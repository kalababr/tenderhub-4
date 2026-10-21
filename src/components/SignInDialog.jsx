import { useEffect, useRef, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function SignInDialog({ onClose, onSignedIn }) {
  const { t } = useI18n()
  const closeRef = useRef(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const submit = (event) => {
    event.preventDefault()
    onSignedIn()
  }

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="signin-title">
        <div className="dialog-head">
          <h2 id="signin-title">{t('signin.title')}</h2>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label={t('signin.close')}>
            <FaXmark aria-hidden="true" />
          </button>
        </div>

        <p className="section-sub">{t('signin.body')}</p>

        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="signin-email">{t('signin.email')}</label>
              <input
                id="signin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="signin-password">{t('signin.password')}</label>
              <input id="signin-password" type="password" required autoComplete="current-password" />
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '16px' }}>
            <button type="submit" className="btn btn--primary">
              {t('signin.submit')}
            </button>
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              {t('signin.close')}
            </button>
          </div>
        </form>

        <p className="field-note" style={{ marginTop: '14px' }}>
          {t('signin.note')}
        </p>
      </div>
    </div>
  )
}
