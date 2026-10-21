import { chromium } from 'playwright'

const BASE = 'http://localhost:4173'
const errors = []

function checkOverflow(page, width) {
  return page.evaluate((vw) => {
    const docWidth = document.documentElement.scrollWidth
    const offenders = []
    document.querySelectorAll('body *').forEach((el) => {
      const style = getComputedStyle(el)
      if (style.position === 'fixed' || style.display === 'none' || style.visibility === 'hidden') return
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return
      if (rect.right > vw + 1 || rect.left < -1) {
        offenders.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} right=${Math.round(rect.right)}`)
      }
    })
    return { docWidth, offenders: offenders.slice(0, 8) }
  }, width)
}

const browser = await chromium.launch()

const ROUTES = ['', '#/signin', '#/signup', '#/company/awash-water']

for (const width of [360, 414, 768, 1280]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } })
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    const { docWidth, offenders } = await checkOverflow(page, width)
    if (docWidth > width + 1) errors.push(`${width}px${route}: document scrollWidth = ${docWidth}`)
    if (offenders.length) errors.push(`${width}px${route}: elements overflow -> ${offenders.join(' | ')}`)
  }
  await page.close()
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await page.goto(BASE, { waitUntil: 'networkidle' })

/* keyboard: first Tab reaches the skip link and focus is visible */
await page.keyboard.press('Tab')
const firstFocus = await page.evaluate(() => {
  const el = document.activeElement
  const style = getComputedStyle(el)
  return { cls: el.className, outline: style.outlineStyle, width: style.outlineWidth }
})
if (!String(firstFocus.cls).includes('skip-link')) errors.push(`first tab stop is "${firstFocus.cls}", expected skip link`)
if (firstFocus.outline === 'none') errors.push('focus outline not visible on first tab stop')

/* language switch changes visible strings, options, placeholders and <html lang> */

const before = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  heading: document.querySelector('h1')?.textContent,
  option: document.querySelector('#s-category option:nth-child(2)')?.textContent,
  placeholder: document.querySelector('#s-keyword')?.getAttribute('placeholder'),
}))

await page.getByRole('button', { name: 'አማርኛ' }).click()

const after = await page.evaluate(() => ({
  lang: document.documentElement.lang,
  heading: document.querySelector('h1')?.textContent,
  option: document.querySelector('#s-category option:nth-child(2)')?.textContent,
  placeholder: document.querySelector('#s-keyword')?.getAttribute('placeholder'),
  savedLang: localStorage.getItem('tenderhub.lang'),
  status: document.querySelector('.badge--status-published')?.textContent,
}))

if (after.lang !== 'am') errors.push(`html lang is "${after.lang}", expected "am"`)
if (after.savedLang !== 'am') errors.push('language choice not saved to localStorage')
if (before.heading === after.heading) errors.push('h1 did not change on language switch')
if (before.option === after.option) errors.push('select options did not change on language switch')
if (before.placeholder === after.placeholder) errors.push('placeholder did not change on language switch')
if (!after.status || !after.status.includes('ታትሟል')) errors.push(`status badge not translated: "${after.status}"`)

/* every input/select/textarea has an associated label */
const unlabelled = await page.evaluate(() =>
  [...document.querySelectorAll('input, select, textarea')]
    .filter((el) => !el.labels || el.labels.length === 0)
    .map((el) => el.id || el.name || el.type),
)
if (unlabelled.length) errors.push(`form controls without label: ${unlabelled.join(', ')}`)

await page.close()
await browser.close()

if (errors.length) {
  console.log('FAIL')
  errors.forEach((e) => console.log('  - ' + e))
  process.exit(1)
}
console.log('OK — no horizontal overflow at 360/414/768/1280, i18n switch verified, focus + labels verified')
