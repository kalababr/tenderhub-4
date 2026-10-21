import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT = join(ROOT, 'screenshots')
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()

/* desktop, English */
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } })
await desktop.goto('http://localhost:4173', { waitUntil: 'networkidle' })
await desktop.waitForTimeout(900)
await desktop.screenshot({ path: join(OUT, 'desktop-en.png'), fullPage: true })
await desktop.close()

/* mobile 360px, Amharic */
const mobile = await browser.newPage({ viewport: { width: 360, height: 740 } })
await mobile.goto('http://localhost:4173', { waitUntil: 'networkidle' })
await mobile.getByRole('button', { name: 'አማርኛ' }).click()
await mobile.waitForTimeout(900)
await mobile.screenshot({ path: join(OUT, 'mobile-360-am.png'), fullPage: true })
await mobile.close()

await browser.close()
console.log('saved screenshots/desktop-en.png and screenshots/mobile-360-am.png')
