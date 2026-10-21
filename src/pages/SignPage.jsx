import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa6'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { stats } from '../data/site.js'
import GoogleMark from '../components/GoogleMark.jsx'
import LanguageToggle from '../components/LanguageToggle.jsx'

const POINTS = ['sign.p1', 'sign.p2', 'sign.p3']

/**
 * Account page — sign in and sign up share this screen.
 * Everything here is a demo: no account is created and nothing is sent.
 */
export default function SignPage({ mode, signedIn, onSignedIn }) {
  const { t } = useI18n()
  const isSignUp = mode === 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [method, setMethod] = useState(null)

  useEffect(() => {
    document.title = isSignUp
      ? `${t('sign.signupTitle')} — ${t('brand.name')}`
      : t('sign.signinTitle')
  }, [t, isSignUp])

  const submit = (event) => {
    event.preventDefault()
    setMethod('email')
    onSignedIn()
  }

  const signInWithGoogle = () => {
    setMethod('google')
    onSignedIn()
  }

  const done = method !== null || signedIn

  return (
    <div className="sign-page">
      <header className="sign-top">
        <a className="logo sign-logo" href="#top">
          {t('brand.name')}
        </a>
        <div className="sign-top-actions">
          <LanguageToggle />
          <a className="btn btn--ghost btn--sm" href="#top">
            <FaArrowLeft aria-hidden="true" />
            {t('sign.back')}
          </a>
        </div>
      </header>

      <main id="main" className="sign-main container" aria-label={t('sign.aria')}>
        <div className="sign-grid">
          <aside className="sign-panel">
            <p className="hero-badge">{t('sign.badge')}</p>
            <h1>{t(isSignUp ? 'sign.signupTitle' : 'sign.signinTitle')}</h1>
            <p className="sign-panel-sub">{t(isSignUp ? 'sign.signupSub' : 'sign.signinSub')}</p>

            <ul className="sign-points">
              {POINTS.map((key) => (
                <li key={key}>
                  <FaCheck aria-hidden="true" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>

            <div className="sign-stats">
              {stats.slice(0, 2).map((item) => (
                <div key={item.id}>
                  <strong>{item.value.toLocaleString('en-US')}</strong>
                  <span>{t(item.labelKey)}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="sign-card">
            {done ? (
              <div className="sign-done">
                <span className="sign-done-mark">
                  <FaCheck aria-hidden="true" />
                </span>
                <h2>{t('sign.success')}</h2>
                <p>{t(method === 'google' ? 'sign.googleNote' : 'sign.emailNote')}</p>
                <a className="btn btn--gold" href="#top">
                  {t('sign.continue')}
                  <span className="arrow-circle" aria-hidden="true">
                    <FaArrowRight />
                  </span>
                </a>
              </div>
            ) : (
              <>
                <div>
                  <h2>{t(isSignUp ? 'sign.signupFormTitle' : 'sign.signinFormTitle')}</h2>
                  <p className="sign-card-sub">{t(isSignUp ? 'sign.signupSub' : 'sign.signinSub')}</p>
                </div>

                <button type="button" className="btn btn--google" onClick={signInWithGoogle}>
                  <GoogleMark />
                  {t('sign.google')}
                </button>

                <div className="sign-divider">
                  <span>{t('sign.or')}</span>
                </div>

                <form onSubmit={submit}>
                  <div className="form-grid sign-form">
                    {isSignUp && (
                      <div className="field sign-field--full">
                        <label htmlFor="sign-name">{t('sign.name')}</label>
                        <input
                          id="sign-name"
                          type="text"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    )}

                    <div className="field sign-field--full">
                      <label htmlFor="sign-email">{t('sign.email')}</label>
                      <input
                        id="sign-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>

                    <div className="field sign-field--full">
                      <label htmlFor="sign-password">{t('sign.password')}</label>
                      <div className="sign-password">
                        <input
                          id="sign-password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          autoComplete={isSignUp ? 'new-password' : 'current-password'}
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                        <button
                          type="button"
                          className="sign-eye"
                          onClick={() => setShowPassword((value) => !value)}
                          aria-pressed={showPassword}
                          aria-label={t(showPassword ? 'sign.hidePassword' : 'sign.showPassword')}
                        >
                          {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                        </button>
                      </div>
                    </div>

                    {isSignUp && (
                      <div className="field sign-field--full">
                        <label htmlFor="sign-organization">{t('sign.organization')}</label>
                        <input
                          id="sign-organization"
                          type="text"
                          autoComplete="organization"
                          placeholder={t('sign.organizationPh')}
                          value={organization}
                          onChange={(event) => setOrganization(event.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="sign-actions">
                    <button type="submit" className="btn btn--primary sign-submit">
                      {t(isSignUp ? 'sign.signupSubmit' : 'sign.signinSubmit')}
                      <span className="arrow-circle" aria-hidden="true">
                        <FaArrowRight />
                      </span>
                    </button>
                    {!isSignUp && (
                      <a className="sign-forgot" href="#contact">
                        {t('sign.forgot')}
                      </a>
                    )}
                  </div>

                  <p className="field-note sign-note">{t('sign.emailNote')}</p>
                </form>

                <p className="sign-switch">
                  {t(isSignUp ? 'sign.signupSwitch' : 'sign.signinSwitch')}{' '}
                  <a href={isSignUp ? '#/signin' : '#/signup'}>
                    {t(isSignUp ? 'sign.signupSwitchCta' : 'sign.signinSwitchCta')}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
