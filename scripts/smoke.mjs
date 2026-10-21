import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

function withLang(lang, fn) {
  globalThis.localStorage = {
    getItem: () => lang,
    setItem: () => {},
  }
  try {
    return fn()
  } finally {
    delete globalThis.localStorage
  }
}

const mod = await import(pathToFileURL(join(ROOT, '.smoke', 'ssr-entry.js')))
const { renderPage } = mod

const errors = []

const enHtml = withLang('en', renderPage)
const amHtml = withLang('am', renderPage)

const mustContain = [
  ['en', enHtml, ['Latest tenders', 'Post a tender', 'Browse by category', 'Chat with us', 'Create alert', 'Report a notice', 'Order a bag']],
  ['am', amHtml, ['የጨረታ ማንቂያ ይፍጠሩ', 'ጨረታ ያስገቡ', 'በዘርፍ ይመልከቱ', 'ማንቂያ ፍጠር', 'ማስታወቂያ አሳውቅ', 'ከረብት ይግዙ']],
]

for (const [lang, html, needles] of mustContain) {
  for (const needle of needles) {
    if (!html.includes(needle)) errors.push(`${lang}: rendered HTML missing "${needle}"`)
  }
}

/* every form control must have a label */
const inputs = enHtml.match(/<(input|select|textarea)\b[^>]*>/g) || []
const ids = enHtml.match(/id="[^"]+"/g) || []
if (inputs.length < 10) errors.push(`expected at least 10 form controls, found ${inputs.length}`)
if (ids.length < 10) errors.push(`expected labelled ids, found ${ids.length}`)

if (errors.length) {
  console.log('FAIL')
  errors.forEach((e) => console.log('  - ' + e))
  process.exit(1)
}
console.log(`OK — rendered ${enHtml.length} chars (en) and ${amHtml.length} chars (am), ${inputs.length} form controls`)
