/**
 * PLACEHOLDER: fictional companies for the directory and the profile pages.
 * Every company, registration number, phone number and figure below is
 * made up — replace the whole file with real directory data before launch.
 */
export const businesses = [
  {
    id: 'awash-water',
    name: { en: 'Awash Valley Water Bureau', am: 'አዋሽ ሸለቆ የውሃ ቢሮ' },
    initials: 'AW',
    sector: 'energy',
    region: 'afar',
    site: 'https://example.com/awash-water',
    verificationStatus: 'verified',
    founded: 1998,
    employees: { en: '250–500', am: '250–500' },
    registration: 'REG-AW-1998-0142',
    capital: { en: 'ETB 480 million', am: 'የኢትዮጵያ ብር 480 ሚሊዮን' },
    phone: '+251 344 550 112',
    email: 'info@awash-water.example',
    headquarters: { en: 'Awash town, Afar Region', am: 'አዋሽ ከተማ፣ አፋር ክልል' },
    summary: {
      en: 'Regional water utility operating irrigation schemes, treatment plants and rural water supply across the Awash basin since 1998.',
      am: 'የክልል የውሃ አገልግሎት ድርጅት — ከ1998 ጀምሮ በአዋሽ ሸለቆ የጠላል ሥርዎች፣ የውሃ ጥራት አስተናግዶችና የገጠር የውሃ አገልግሎት ይሰጣል።',
    },
    specialties: [
      { en: 'Irrigation and canal works', am: 'የጠላል ሥርዎችና የውሃ ሸለቆ ሥራዎች' },
      { en: 'Water treatment plants', am: 'የውሃ ጥራት አስተናግዶች' },
      { en: 'Rural supply schemes', am: 'የገጠር የውሃ አገልግሎት ፕሮጀክቶች' },
    ],
    certifications: [
      { en: 'Water and sanitation licence — level 1', am: 'የውሃና የንጽሕና ፈቃድ — ደረጃ 1' },
      { en: 'ISO 9001 quality management', am: 'ISO 9001 የጥራት አመራር ሥርዓት' },
      { en: 'Public procurement clearance', am: 'የይፈትያዊ ግዢ ፈቃድ' },
    ],
    stats: {
      posted: 24,
      awarded: 11,
      value: { en: 'ETB 1.9 bn', am: 'የኢትዮጵያ ብር 1.9 ቢሊዮን' },
      onTime: '94%',
    },
  },
  {
    id: 'sheba-logistics',
    name: { en: 'Sheba Logistics Group', am: 'ሺባ የማድረስ ቡድን' },
    initials: 'SL',
    sector: 'transport',
    region: 'dire-dawa',
    site: 'https://example.com/sheba-logistics',
    verificationStatus: 'unverified',
    founded: 2011,
    employees: { en: '500–1,000', am: '500–1,000' },
    registration: 'REG-SL-2011-0877',
    capital: { en: 'ETB 260 million', am: 'የኢትዮጵያ ብር 260 ሚሊዮን' },
    phone: '+251 25 550 884',
    email: 'contact@sheba-logistics.example',
    headquarters: { en: 'Dire Dawa, Eastern Ethiopia', am: 'ድሬዳዋ፣ ምሥራቅ ኢትዮጵያ' },
    summary: {
      en: 'Freight and bonded warehousing group running bonded hubs in Dire Dawa and Addis Ababa with a fleet for regional distribution.',
      am: 'የእቃ ማጓጓዝና የተጠበቀ ማከማቻ ቡድን — በድሬዳዋና በአዲስ አበባ ተጠበቅ ያላቸው ማዕከላትን ያስተዳዳራል።',
    },
    specialties: [
      { en: 'Bonded warehousing', am: 'የተጠበቀ ማከማቻ' },
      { en: 'Regional freight and haulage', am: 'የክልል እቃ ማጓጓዝና ጎብኘት' },
      { en: 'Cold chain logistics', am: 'የቀዝቃ ሰንጥር ማድረስ' },
    ],
    certifications: [
      { en: 'Transport service licence', am: 'የትራንስፖርት አገልግሎት ፈቃድ' },
      { en: 'Customs bonded warehouse approval', am: 'የጉምርማ ተጠበቅ ማከማቻ ማጽደቅ' },
    ],
    stats: {
      posted: 18,
      awarded: 6,
      value: { en: 'ETB 740 million', am: 'የኢትዮጵያ ብር 740 ሚሊዮን' },
      onTime: '88%',
    },
  },
  {
    id: 'blue-nile-tech',
    name: { en: 'Blue Nile Institute of Technology', am: 'ባሉ ናይል የቴክኖሎጂ ተቋም' },
    initials: 'BN',
    sector: 'ict',
    region: 'amhara',
    site: 'https://example.com/blue-nile-tech',
    verificationStatus: 'pending',
    founded: 2009,
    employees: { en: '100–250', am: '100–250' },
    registration: 'REG-BN-2009-0233',
    capital: { en: 'ETB 95 million', am: 'የኢትዮጵያ ብር 95 ሚሊዮን' },
    phone: '+251 58 550 641',
    email: 'procurement@blue-nile-tech.example',
    headquarters: { en: 'Bahir Dar, Amhara Region', am: 'ባህር ዳር፣ አማራ ክልል' },
    summary: {
      en: 'Public institute delivering ICT teaching, network operations and hardware integration for campuses across the northern regions.',
      am: 'የሕዝብ ተቋም — በሰሜን ክልሎች የአይሲቲ ትምህርት፣ የመረብ አስተዳደርና የሆርድዌር ማዋቀሪያ ይሰጣል።',
    },
    specialties: [
      { en: 'Campus network operations', am: 'የተቋማት የመረብ አስተዳደር' },
      { en: 'Hardware supply and installation', am: 'የሆርድዌር አቅርቦትና ማስገጣገጥ' },
      { en: 'IT training and labs', am: 'የመርክ ትምህርትና የላብሪቶሪ አዳራሮች' },
    ],
    certifications: [
      { en: 'Higher education licence', am: 'የከፍተኛ ትምህርት ፈቃድ' },
      { en: 'Ethiopian ICT authority accreditation', am: 'የኢትዮጵያ የአይሲቲ ባለስልጣን ማጽደቅ' },
    ],
    stats: {
      posted: 12,
      awarded: 4,
      value: { en: 'ETB 310 million', am: 'የኢትዮጵያ ብር 310 ሚሊዮን' },
      onTime: '91%',
    },
  },
  {
    id: 'rift-agro',
    name: { en: 'Rift Valley Agriculture Enterprise', am: 'ሪፍት ሸለቆ የግብርና ድርጅት' },
    initials: 'RA',
    sector: 'agriculture',
    region: 'sidama',
    site: 'https://example.com/rift-agro',
    verificationStatus: 'verified',
    founded: 2005,
    employees: { en: '250–500', am: '250–500' },
    registration: 'REG-RA-2005-0519',
    capital: { en: 'ETB 340 million', am: 'የኢትዮጵያ ብር 340 ሚሊዮን' },
    phone: '+251 46 550 305',
    email: 'info@rift-agro.example',
    headquarters: { en: 'Hawassa, Sidama Region', am: 'ሐዋሳ፣ ሲዳማ ክልል' },
    summary: {
      en: 'Agri-processing company running horticulture supply chains, cold storage and export packing for smallholder coffee producers.',
      am: 'የግብርና ማቀናነስ ድርጅት — ለትንሽሽን የቡና አሽሎች የቀዝቃ ሥርዓት፣ የቀዝቃ ማስቀመጥና የማሸጋገር አገልግሎት።',
    },
    specialties: [
      { en: 'Cold storage and cold chain', am: 'የቀዝቃ ማስቀመጥና ሰንጥር' },
      { en: 'Export grading and packing', am: 'የወጪ ምልክትና የማሸጋገር አገልግሎት' },
      { en: 'Farmer supply chain support', am: 'የአሽሎች የአቅርቦት ሰንጥር ድጋፍ' },
    ],
    certifications: [
      { en: 'Horticulture exporter licence', am: 'የሕዳሴ ማሸጋገሪያ ፈቃድ' },
      { en: 'Global G.A.P. certification', am: 'Global G.A.P. ማጽደቅ' },
      { en: 'Quality management certification', am: 'የጥራት አመራር ሥርዓት ማጽደቅ' },
    ],
    stats: {
      posted: 16,
      awarded: 9,
      value: { en: 'ETB 1.2 bn', am: 'የኢትዮጵያ ብር 1.2 ቢሊዮን' },
      onTime: '96%',
    },
  },
]

/** Looks up a company by its id. */
export function findBusiness(id) {
  return businesses.find((business) => business.id === id) ?? null
}
