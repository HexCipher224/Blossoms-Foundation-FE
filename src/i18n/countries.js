// Countries, currencies and indicative exchange rates.
//
// IMPORTANT: `perUSD` values are INDICATIVE ONLY (roughly how many units of
// the local currency equal 1 US dollar). Donations are settled in USDT
// (a USD-pegged stablecoin) on Binance, so the USDT amount shown to the
// donor is derived from these rates. Update them before launch, or have the
// backend serve live rates (see blossoms-backend /api/rates).
export const BASE_CURRENCY = { code: 'KES', perUSD: 129 }

// `languages` = suggested UI languages for that country, best match first.
// Only languages that exist in translations.js are supported: en, sw, fr.
export const countries = [
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', symbol: 'KSh', perUSD: 129, languages: ['sw', 'en'] },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX', symbol: 'USh', perUSD: 3650, languages: ['en', 'sw'] },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', currency: 'TZS', symbol: 'TSh', perUSD: 2650, languages: ['sw', 'en'] },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', currency: 'RWF', symbol: 'FRw', perUSD: 1450, languages: ['fr', 'en', 'sw'] },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', currency: 'ETB', symbol: 'Br', perUSD: 140, languages: ['en'] },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', symbol: '₦', perUSD: 1500, languages: ['en'] },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', symbol: 'GH₵', perUSD: 12, languages: ['en'] },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', symbol: 'R', perUSD: 18, languages: ['en'] },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', perUSD: 1, languages: ['en'] },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'CA$', perUSD: 1.37, languages: ['en', 'fr'] },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', perUSD: 0.78, languages: ['en'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', symbol: '€', perUSD: 0.92, languages: ['fr', 'en'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', symbol: '€', perUSD: 0.92, languages: ['en', 'fr'] },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$', perUSD: 1.5, languages: ['en'] },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', perUSD: 85, languages: ['en'] },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', symbol: 'AED', perUSD: 3.67, languages: ['en'] },
  { code: 'OTHER', name: 'Other country (USD)', flag: '🌍', currency: 'USD', symbol: '$', perUSD: 1, languages: ['en', 'fr', 'sw'] },
]

export const languages = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'sw', label: 'Kiswahili', dir: 'ltr' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
]

export const getCountry = (code) => countries.find((c) => c.code === code) || countries[0]

// Donations start at KSh 50. These are the preset steps, expressed in KES,
// and converted to each visitor's local currency.
export const BASE_PRESETS_KES = [50, 500, 1000, 2500, 5000]

// Round to a "friendly" number (steps x 10^n).
const FINE_STEPS = [1, 1.5, 2, 2.5, 5, 10]
const COARSE_STEPS = [1, 2, 2.5, 5, 10]

function magnitude(value) {
  return Math.pow(10, Math.floor(Math.log10(value)))
}

// Nearest friendly number.
export function niceRound(value, steps = COARSE_STEPS) {
  if (!value || value <= 0) return 0
  const mag = magnitude(value)
  const n = value / mag
  const best = steps.reduce((a, b) => (Math.abs(b - n) < Math.abs(a - n) ? b : a))
  return Math.round(best * mag * 100) / 100
}

// Smallest friendly number that is >= value (used for the starting amount so it
// never falls below the KSh 50 equivalent).
export function niceCeil(value, steps = FINE_STEPS) {
  if (!value || value <= 0) return 0
  const mag = magnitude(value)
  const n = value / mag
  const best = steps.find((step) => step >= n - 1e-9) ?? 10
  return Math.round(best * mag * 100) / 100
}

export function presetsFor(country) {
  const factor = country.perUSD / BASE_CURRENCY.perUSD
  const [first, ...rest] = BASE_PRESETS_KES
  const out = [niceCeil(first * factor)]
  for (const kes of rest) {
    let value = niceRound(kes * factor)
    // keep the list strictly increasing
    if (value <= out[out.length - 1]) value = niceCeil(out[out.length - 1] * 1.01, COARSE_STEPS)
    out.push(value)
  }
  return out
}

export function formatAmount(country, value, lang = 'en') {
  const n = Number(value) || 0
  const digits = n < 10 && n % 1 !== 0 ? 2 : 0
  const formatted = new Intl.NumberFormat(lang, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n)
  return `${country.symbol} ${formatted}`
}

export const toUsdt = (country, localAmount) =>
  Math.round((Number(localAmount) / country.perUSD) * 100) / 100
