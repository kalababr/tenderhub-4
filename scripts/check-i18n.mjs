import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SRC = join(ROOT, 'src')

const en = (await import(pathToFileURL(join(SRC, 'i18n', 'en.js')))).default
const am = (await import(pathToFileURL(join(SRC, 'i18n', 'am.js')))).default

const errors = []

/* 1. dictionary parity */
const enKeys = new Set(Object.keys(en))
const amKeys = new Set(Object.keys(am))
for (const key of enKeys) if (!amKeys.has(key)) errors.push(`am.js missing key: ${key}`)
for (const key of amKeys) if (!enKeys.has(key)) errors.push(`en.js missing key: ${key}`)

/* 2. walk source files */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return walk(full)
    return /\.(jsx|js)$/.test(name) && !full.endsWith('check-i18n.mjs') ? [full] : []
  })
}

const files = walk(SRC)
const dynamicPrefixes = new Set()
const usedKeys = new Set()

for (const file of files) {
  const code = readFileSync(file, 'utf8')

  /* static keys: t('a.b'), t("a.b") */
  for (const match of code.matchAll(/\bt\(\s*['"]([^'"]+)['"]/g)) usedKeys.add(match[1])
  for (const match of code.matchAll(/\b(?:labelKey|titleKey|subKey)\s*[:=]\s*['"]([^'"]+)['"]/g)) usedKeys.add(match[1])

  /* dynamic keys: t(`prefix.${var}`) */
  for (const match of code.matchAll(/\bt\(\s*`([^`$]+)\$\{/g)) dynamicPrefixes.add(match[1])

  /* unused imports (rough heuristic) */
  for (const match of code.matchAll(/^import\s+(.+?)\s+from\s+['"][^'"]+['"];?$/gm)) {
    const clause = match[1]
    const names = []
    const braced = clause.match(/\{([^}]+)\}/)
    if (braced) {
      braced[1].split(',').forEach((part) => {
        const name = part.trim().split(/\s+as\s+/).pop().trim()
        if (name) names.push(name)
      })
    }
    const defaultName = clause.replace(/\{[^}]+\}/, '').replace(/^,|,$/g, '').trim()
    if (defaultName && !defaultName.startsWith('*')) names.push(defaultName)

    const body = code.replace(match[0], '')
    for (const name of names) {
      const re = new RegExp(`\\b${name}\\b`)
      if (!re.test(body)) errors.push(`unused import "${name}" in ${file.slice(ROOT.length)}`)
    }
  }
}

/* 3. used static keys must exist */
for (const key of usedKeys) {
  if (!enKeys.has(key)) errors.push(`key used but not defined in en.js: ${key}`)
}

/* 4. dynamic prefixes must be fully covered for known vocabularies */
const vocab = {
  cat: ['construction', 'health', 'ict', 'education', 'agriculture', 'energy', 'transport', 'finance', 'general'],
  region: ['addis-ababa', 'afar', 'amhara', 'benishangul-gumuz', 'dire-dawa', 'gambella', 'harari', 'oromia', 'sidama', 'somali', 'south-west-ethiopia', 'central-ethiopia', 'tigray', 'nationwide'],
  type: ['goods', 'works', 'services', 'consultancy', 'other'],
  status: ['draft', 'pendingReview', 'published', 'closed', 'cancelled', 'awarded', 'rejected'],
  verify: ['unverified', 'pending', 'verified', 'rejected', 'suspended'],
  freq: ['immediate', 'daily', 'weekly'],
}
for (const prefix of dynamicPrefixes) {
  const trimmed = prefix.replace(/\.$/, '')
  if (vocab[trimmed]) {
    for (const id of vocab[trimmed]) {
      if (!enKeys.has(`${trimmed}.${id}`)) errors.push(`missing dynamic key: ${trimmed}.${id}`)
    }
  }
}

/* 5. bilingual data pairs */
function checkPairs(value, path) {
  if (value && typeof value === 'object') {
    const keys = Object.keys(value)
    if (keys.includes('en') || keys.includes('am')) {
      if (!keys.includes('en')) errors.push(`${path}: pair missing en`)
      if (!keys.includes('am')) errors.push(`${path}: pair missing am`)
      return
    }
    for (const key of keys) checkPairs(value[key], `${path}.${key}`)
  }
}
for (const name of ['tenders', 'directory', 'news', 'guides', 'ads']) {
  const mod = await import(pathToFileURL(join(SRC, 'data', `${name}.js`)))
  for (const [key, value] of Object.entries(mod)) checkPairs(value, `${name}.${key}`)
}

if (errors.length) {
  console.log(`FAIL — ${errors.length} problem(s):`)
  errors.forEach((e) => console.log('  - ' + e))
  process.exit(1)
}
console.log(`OK — ${enKeys.size} keys, ${files.length} files, all checks passed`)
