import { useEffect, useState } from 'react'

/**
 * Hash routing for the account and company pages.
 * The site scrolls with plain anchors (#tenders, #contact), so these pages
 * use their own hash space (#/signin, #/signup, #/company/<id>) to stay
 * clear of the section anchors.
 */
const ACCOUNT_ROUTES = {
  '#/signin': 'signin',
  '#/signup': 'signup',
}

function readRoute() {
  if (typeof window === 'undefined') return { name: 'home' }

  const hash = window.location.hash

  if (hash.startsWith('#/company/')) {
    const id = decodeURIComponent(hash.slice('#/company/'.length))
    return id ? { name: 'company', id } : { name: 'home' }
  }

  if (ACCOUNT_ROUTES[hash]) return { name: ACCOUNT_ROUTES[hash] }

  return { name: 'home' }
}

/** Current route: { name: 'home' | 'signin' | 'signup' | 'company', id? }. */
export function useRoute() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

/** Navigates to a hash route without reloading the page. */
export function navigate(hash) {
  if (typeof window === 'undefined') return
  if (window.location.hash === hash) return
  window.location.hash = hash
}
