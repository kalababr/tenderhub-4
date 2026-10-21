import { renderToString } from 'react-dom/server'
import { I18nProvider } from '../src/i18n/I18nProvider.jsx'
import App from '../src/App.jsx'

/** Renders the whole page on the server — used as a smoke test. */
export function renderPage() {
  return renderToString(
    <I18nProvider>
      <App />
    </I18nProvider>,
  )
}
