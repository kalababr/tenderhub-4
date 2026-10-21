/**
 * PLACEHOLDER: fictional news items for the demo.
 * `date` is generated relative to today; `href` links are placeholders.
 */
const DAY = 86400000
const iso = (offsetDays) => new Date(Date.now() + offsetDays * DAY).toISOString().slice(0, 10)

export const news = [
  {
    id: 'news-1',
    date: iso(-3),
    category: { en: 'Policy', am: 'መርህ' },
    title: {
      en: 'New procurement guidance published for regional offices',
      am: 'ለክልሎች ቢሮዎች አዲስ የግዜ መመሪያ ወጥቷል',
    },
    excerpt: {
      en: 'Sample excerpt — the guidance covers publication timelines and required documents.',
      am: 'የናሙና አጭሩ — መመሪያው የማተመ ጊዜያትና የሚያስፈልጉ ሰነዶችን ያካትታል።',
    },
    href: '#news',
  },
  {
    id: 'news-2',
    date: iso(-8),
    category: { en: 'Finance', am: 'ፋይናንስ' },
    title: {
      en: 'Banks open dedicated windows for bid guarantees',
      am: 'ባንኮች ለውድቅ ዋስትና ልዩ መስኮች ከፍተዋል',
    },
    excerpt: {
      en: 'Sample excerpt — suppliers can request bid bonds through a single channel.',
      am: 'የናሙና አጭሩ — አቅራቢዎች የውድቅ ዋስትና በአንድ መንገድ ማስወጣት ይችላሉ።',
    },
    href: '#news',
  },
  {
    id: 'news-3',
    date: iso(-14),
    category: { en: 'Construction', am: 'ግንባታ' },
    title: {
      en: 'Road authority announces a quarterly works calendar',
      am: 'የመንገዶች ባለስልጣን የሦስትወርታዊ የሥራ ቀጠሮ አወጣ',
    },
    excerpt: {
      en: 'Sample excerpt — the calendar lists planned road packages by region.',
      am: 'የናሙና አጭሩ — ቀጠሮው የሚመረጡ የመንገድ ጥቅሎችን በክልስ ያሳያል።',
    },
    href: '#news',
  },
]
