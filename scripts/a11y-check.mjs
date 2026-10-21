import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const AXE = readFileSync(join(ROOT, 'node_modules', 'axe-core', 'axe.min.js'), 'utf8')
const BASE = 'http://localhost:4173'
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

const errors = []
const browser = await chromium.launch()

const ROUTES = ['', '#/signin', '#/signup', '#/company/awash-water']

for (const scheme of ['light', 'dark', 'am']) {
  for (const route of ROUTES) {
    const context = await browser.newContext({
      colorScheme: scheme === 'dark' ? 'dark' : 'light',
      reducedMotion: 'reduce', // renders the settled (no fade-in) state
      viewport: { width: 1280, height: 900 },
    })
    const page = await context.newPage()
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    if (scheme === 'am') await page.getByRole('button', { name: 'አማርኛ' }).click()
    await page.addScriptTag({ content: AXE })

    const results = await page.evaluate(
      async (tags) => window.axe.run(document, { runOnly: { type: 'tag', values: tags } }),
      TAGS,
    )

    for (const violation of results.violations) {
      const targets = violation.nodes.slice(0, 4).map((node) => node.target.join(' '))
      errors.push(`[${scheme}${route}] ${violation.id} (${violation.impact}): ${targets.join(' | ')}`)
    }

    await context.close()
  }
}

await browser.close()

if (errors.length) {
  console.log(`FAIL — ${errors.length} WCAG 2.1 AA violation(s):`)
  errors.forEach((e) => console.log('  - ' + e))
  process.exit(1)
}
console.log('OK — axe-core: 0 WCAG 2.0/2.1 A+AA violations in light mode, dark mode and Amharic')
