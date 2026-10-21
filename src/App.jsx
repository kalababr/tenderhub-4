import { useEffect, useState } from 'react'
import { useI18n } from './i18n/I18nProvider.jsx'
import { tenders } from './data/tenders.js'
import { categories, regions } from './data/taxonomy.js'
import { mockAds } from './data/ads.js'
import { navigate, useRoute } from './hooks/useRoute.js'
import { emptyFilters, useTenders } from './hooks/useTenders.js'

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import LatestTenders from './components/LatestTenders.jsx'
import AdSlot from './components/AdSlot.jsx'
import BrowseSection from './components/BrowseSection.jsx'
import Alerts from './components/Alerts.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Trust from './components/Trust.jsx'
import DirectoryPreview from './components/DirectoryPreview.jsx'
import NewsSection from './components/NewsSection.jsx'
import GuidesSection from './components/GuidesSection.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import SocialRail from './components/SocialRail.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import SignInDialog from './components/SignInDialog.jsx'
import TenderDetailDialog from './components/TenderDetailDialog.jsx'
import SignPage from './pages/SignPage.jsx'
import CompanyPage from './pages/CompanyPage.jsx'
import { findBusiness } from './data/directory.js'

export default function App() {
  const { t } = useI18n()
  const route = useRoute()
  const [filters, setFilters] = useState(emptyFilters)
  const [signedIn, setSignedIn] = useState(false)
  const [savedRefs, setSavedRefs] = useState([])
  const [signInOpen, setSignInOpen] = useState(false)
  const [detail, setDetail] = useState(null)

  const visibleTenders = useTenders(tenders, filters)

  const update = (patch) => setFilters((current) => ({ ...current, ...patch }))
  const clearFilters = () => setFilters(emptyFilters)

  const goToTenders = () =>
    document.getElementById('tenders')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const pickCategory = (id) => {
    update({ category: id })
    goToTenders()
  }

  const pickRegion = (id) => {
    update({ region: id })
    goToTenders()
  }

  const handleSave = (reference) => {
    if (!signedIn) {
      setSignInOpen(true)
      return
    }
    setSavedRefs((current) =>
      current.includes(reference) ? current.filter((item) => item !== reference) : [...current, reference],
    )
  }

  /* tender details are for members only — guests go to the sign-in page */
  const handleDetails = (tender) => {
    if (!signedIn) {
      navigate('#/signin')
      return
    }
    setDetail(tender)
  }

  /* the account and company pages are their own screen — always land at the top */
  useEffect(() => {
    if (route.name !== 'home') {
      window.scrollTo(0, 0)
      return
    }
    /* coming back from another screen to a section anchor */
    const hash = window.location.hash
    if (hash && hash !== '#top' && hash.startsWith('#') && !hash.startsWith('#/')) {
      const target = document.getElementById(hash.slice(1))
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [route.name, route.id])

  /* account pages take over the whole screen */
  if (route.name === 'signin' || route.name === 'signup') {
    return (
      <>
        <a className="skip-link" href="#main">
          {t('a11y.skip')}
        </a>
        <SignPage mode={route.name} signedIn={signedIn} onSignedIn={() => setSignedIn(true)} />
      </>
    )
  }

  /* company profile page */
  if (route.name === 'company') {
    return (
      <>
        <a className="skip-link" href="#main">
          {t('a11y.skip')}
        </a>
        <CompanyPage
          business={findBusiness(route.id)}
          savedRefs={savedRefs}
          onSave={handleSave}
          onDetails={handleDetails}
        />
      </>
    )
  }

  return (
    <>
      <a className="skip-link" href="#main">
        {t('a11y.skip')}
      </a>
      <Navbar onSignIn={() => navigate('#/signin')} signedIn={signedIn} />

      <main id="main">
        <Hero
          filters={filters}
          onUpdate={update}
          onClear={clearFilters}
          onPickCategory={pickCategory}
          postHref={signedIn ? '#post' : '#/signin'}
        />
        <Stats />

        <LatestTenders
          tenders={visibleTenders}
          onClear={clearFilters}
          onSave={handleSave}
          savedRefs={savedRefs}
          onDetails={handleDetails}
        />

        <AdSlot sizeKey="ad.sizeWide" creative={mockAds.wide} />

        <BrowseSection
          id="browse-category"
          titleKey="browse.categoryTitle"
          subKey="browse.categorySub"
          labelPrefix="cat"
          items={categories}
          active={filters.category}
          onPick={pickCategory}
          onShowAll={() => update({ category: 'all' })}
        />
        <BrowseSection
          id="browse-region"
          titleKey="browse.regionTitle"
          subKey="browse.regionSub"
          labelPrefix="region"
          items={regions}
          active={filters.region}
          onPick={pickRegion}
          onShowAll={() => update({ region: 'all' })}
        />

        <Alerts signedIn={signedIn} onRequireAuth={() => navigate('#/signin')} />
        <HowItWorks />
        <Trust />

        <DirectoryPreview />
        <NewsSection />
        <GuidesSection />
        <AdSlot id="advertise" sizeKey="ad.sizeBox" pitch creative={mockAds.box} />

        <Faq />
        <Contact />
        <FinalCta />
      </main>

      <Footer />
      <SocialRail />
      <ChatWidget />

      {signInOpen && (
        <SignInDialog
          onClose={() => setSignInOpen(false)}
          onSignedIn={() => {
            setSignedIn(true)
            setSignInOpen(false)
          }}
        />
      )}
      {detail && <TenderDetailDialog tender={detail} onClose={() => setDetail(null)} />}
    </>
  )
}
