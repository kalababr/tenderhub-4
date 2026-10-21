/**
 * PLACEHOLDER: mock local ad creatives for the demo.
 *
 * These are fictional Ethiopian brands — no real company is advertised.
 * Swap them for real creatives before launch. Every string is a bilingual
 * pair so the creative follows the site language (English / Amharic).
 */
export const mockAds = {
  wide: {
    id: 'mock-gonde-coffee',
    variant: 'wide',
    mark: 'GC',
    brand: { en: 'Gonde Coffee', am: 'ጎንደ ሽንጫፍ' },
    eyebrow: { en: 'Ethiopian coffee export', am: 'የኢትዮጵያ ቅቤ ኤክስፖርት' },
    headline: {
      en: 'From Yirgacheffe to the world — one bag at a time',
      am: 'ከይርጎች እስከ ዓለም ድረስ — በአንድ ከረብት ጊዜ',
    },
    body: {
      en: 'Washed and natural grades in 60 kg jute bags. Export-ready and priced in birr.',
      am: 'የውሃና የተራራ ቅቤ በ60 ኪሎ ጁት ከረብት። ለኤክስፖርት ተዘጋጅቶ በብር የተለመደ።',
    },
    price: { en: 'From 620 ETB / kg', am: 'ከ 620 ብር / ኪሎ ጀምሮ' },
    cta: { en: 'Order a bag', am: 'ከረብት ይግዙ' },
    note: { en: 'Free delivery inside Addis Ababa', am: 'በአዲስ አበባ ውስጥ ነፃ አያወልድ' },
    contact: '+251 911 234 567',
    href: '#contact',
  },
  box: {
    id: 'mock-addis-print',
    variant: 'box',
    mark: 'ADP',
    brand: { en: 'Addis Digital Print', am: 'አዲስ ስተራራ ፕሪንት' },
    eyebrow: { en: 'Bid documents & binding', am: 'የውድቅ ሰነዶች ማትሪያና ማስረጃፍት' },
    headline: {
      en: 'Print, bind and deliver your bid within 24 hours',
      am: 'ውድቅዎን በ24 ሰዓት ውስጥ ያትሩ፣ ያስረጃፉ',
    },
    body: {
      en: 'Tender documents from 12 birr per page. Serving Addis Ababa, Hawassa and Bahir Dar.',
      am: 'የውድቅ ሰነዶች ከ12 ብር በገጹ። አዲስ አበባ፣ ሐዋሳ፣ ባህር ዳር እንገልጋለን።',
    },
    price: { en: 'From 12 ETB / page', am: 'ከ 12 ብር / ገጽ ጀምሮ' },
    cta: { en: 'Send your file', am: 'ፋይልዎን ይላኩ' },
    note: { en: 'Open Sat–Sun, 8am–6pm', am: 'ቅዳሜ–እሁድ፣ 8ጠዋት–6ከሰዓት' },
    contact: '+251 911 234 568',
    href: '#contact',
  },
}
