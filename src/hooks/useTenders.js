import { useMemo } from 'react'
import { daysUntil } from '../i18n/format.js'

export const emptyFilters = {
  keyword: '',
  category: 'all',
  region: 'all',
  procurementType: 'all',
  status: 'all',
  deadline: 'all',
  published: 'all',
}

/**
 * SRS draft v0.9: only Published tenders appear publicly.
 * Draft / PendingReview / Cancelled / Rejected / Closed / Awarded records
 * exist in the mock data but are never shown in the public catalogue.
 */
const PUBLIC_STATUSES = ['Published']

function matchesKeyword(tender, keyword) {
  const haystack = [
    tender.title.en,
    tender.title.am,
    tender.reference,
    tender.issuer.name.en,
    tender.issuer.name.am,
    tender.description.en,
    tender.description.am,
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(keyword)
}

export function useTenders(allTenders, filters) {
  return useMemo(() => {
    const keyword = filters.keyword.trim().toLowerCase()
    const now = Date.now()

    return allTenders.filter((tender) => {
      if (!PUBLIC_STATUSES.includes(tender.status)) return false
      if (filters.status !== 'all' && tender.status !== filters.status) return false
      if (filters.category !== 'all' && tender.category !== filters.category) return false
      if (filters.region !== 'all' && tender.region !== filters.region) return false
      if (filters.procurementType !== 'all' && tender.procurementType !== filters.procurementType) return false
      if (keyword && !matchesKeyword(tender, keyword)) return false

      if (filters.deadline !== 'all') {
        const days = daysUntil(tender.deadline)
        if (days < 0 || days > Number(filters.deadline)) return false
      }

      if (filters.published !== 'all') {
        const publishedAt = new Date(`${tender.publicationDate}T00:00:00Z`).getTime()
        const ageDays = Math.floor((now - publishedAt) / 86400000)
        if (ageDays < 0 || ageDays > Number(filters.published)) return false
      }

      return true
    })
  }, [allTenders, filters])
}
