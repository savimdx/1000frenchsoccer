/**
 * High-Precision Geolocation & Dynamic Pricing Service
 *
 * Designed for maximum accuracy ("bem preciso") across Western Europe:
 * - France (FR): 17,94 €
 * - Switzerland (CH): 15.00 CHF
 * - Belgium (BE): 18,02 €
 * - Default / Other: 17,90 €
 *
 * Detection Cascade:
 * 1. URL Parameter Overrides (e.g. ?country=FR, ?country=CH, ?country=BE, ?geo=...)
 * 2. Cached Resolution in localStorage (valid for 24h)
 * 3. Multi-Provider Edge IP Geolocation (Cloudflare CDN-Trace + api.country.is + ipwho.is)
 * 4. Zero-latency System Heuristics (Intl TimeZone: Europe/Paris, Europe/Zurich, Europe/Brussels + Navigator Locales)
 */

export interface CountryPricingConfig {
  countryCode: 'FR' | 'CH' | 'BE' | 'DEFAULT';
  countryName: string;
  countryNameFr: string;
  price: number;
  formattedPrice: string;
  currencyCode: 'EUR' | 'CHF';
  currencySymbol: '€' | 'CHF';
  crossedPriceFormatted: string;
  flag: string;
}

export const COUNTRY_PRICING: Record<'FR' | 'CH' | 'BE' | 'DEFAULT', CountryPricingConfig> = {
  FR: {
    countryCode: 'FR',
    countryName: 'França',
    countryNameFr: 'France',
    price: 17.94,
    formattedPrice: '17,94 €',
    currencyCode: 'EUR',
    currencySymbol: '€',
    crossedPriceFormatted: '420 €',
    flag: '🇫🇷',
  },
  CH: {
    countryCode: 'CH',
    countryName: 'Suíça',
    countryNameFr: 'Suisse',
    price: 15.00,
    formattedPrice: '15.00 CHF',
    currencyCode: 'CHF',
    currencySymbol: 'CHF',
    crossedPriceFormatted: '420 CHF',
    flag: '🇨🇭',
  },
  BE: {
    countryCode: 'BE',
    countryName: 'Bélgica',
    countryNameFr: 'Belgique',
    price: 18.02,
    formattedPrice: '18,02 €',
    currencyCode: 'EUR',
    currencySymbol: '€',
    crossedPriceFormatted: '420 €',
    flag: '🇧🇪',
  },
  DEFAULT: {
    countryCode: 'DEFAULT',
    countryName: 'Internacional',
    countryNameFr: 'Europe / International',
    price: 17.90,
    formattedPrice: '17,90 €',
    currencyCode: 'EUR',
    currencySymbol: '€',
    crossedPriceFormatted: '420 €',
    flag: '🇪🇺',
  },
};

const STORAGE_KEY = 'lead_geo_country_data_v2';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface GeoDetectionResult {
  countryCode: 'FR' | 'CH' | 'BE' | 'DEFAULT';
  config: CountryPricingConfig;
  source: 'url_param' | 'local_cache' | 'ip_cloudflare' | 'ip_countryis' | 'ip_whois' | 'timezone_heuristic' | 'default';
  rawCountry?: string;
}

/**
 * Normalizes any detected country string to our supported target set.
 */
export function normalizeCountry(code?: string | null): 'FR' | 'CH' | 'BE' | 'DEFAULT' {
  if (!code) return 'DEFAULT';
  const upper = code.trim().toUpperCase();
  if (upper === 'FR' || upper === 'FRA' || upper === 'FRANCE') return 'FR';
  if (upper === 'CH' || upper === 'CHE' || upper === 'SWITZERLAND' || upper === 'SUISSE' || upper === 'SUICA') return 'CH';
  if (upper === 'BE' || upper === 'BEL' || upper === 'BELGIUM' || upper === 'BELGIQUE' || upper === 'BELGICA') return 'BE';
  return 'DEFAULT';
}

/**
 * Heuristic 1: Check URL search parameters (useful for ads tracking & explicit testing)
 * Example: ?country=FR, ?country=CH, ?country=BE, ?geo=CH, ?pays=france
 */
export function detectFromUrlParams(): GeoDetectionResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const candidate = params.get('country') || params.get('geo') || params.get('pays') || params.get('location');
    if (candidate) {
      const normalized = normalizeCountry(candidate);
      return {
        countryCode: normalized,
        config: COUNTRY_PRICING[normalized],
        source: 'url_param',
        rawCountry: candidate,
      };
    }
  } catch (e) {
    // Ignore URL parsing errors
  }
  return null;
}

/**
 * Heuristic 2: Check cached resolution in localStorage
 */
export function detectFromCache(): GeoDetectionResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        const normalized = normalizeCountry(parsed.countryCode);
        return {
          countryCode: normalized,
          config: COUNTRY_PRICING[normalized],
          source: 'local_cache',
          rawCountry: parsed.rawCountry || parsed.countryCode,
        };
      }
    }
  } catch (e) {
    // Ignore storage errors
  }
  return null;
}

/**
 * Save detected country to localStorage for 24 hours
 */
export function saveToCache(countryCode: string, rawCountry?: string): void {
  if (typeof window === 'undefined') return null;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        countryCode,
        rawCountry,
        timestamp: Date.now(),
      })
    );
  } catch (e) {
    // Ignore storage quota errors
  }
}

/**
 * Heuristic 3: Browser Timezone & System Locale (0ms synchronous, 100% ad-block proof)
 * Europe/Paris, Europe/Monaco -> France (FR)
 * Europe/Zurich -> Switzerland (CH)
 * Europe/Brussels -> Belgium (BE)
 */
export function detectFromBrowserHeuristics(): GeoDetectionResult {
  let detectedCode: 'FR' | 'CH' | 'BE' | 'DEFAULT' = 'DEFAULT';
  let rawSource = '';

  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      rawSource = `tz:${timeZone}`;
      if (timeZone === 'Europe/Paris' || timeZone === 'Europe/Monaco') {
        detectedCode = 'FR';
      } else if (timeZone === 'Europe/Zurich') {
        detectedCode = 'CH';
      } else if (timeZone === 'Europe/Brussels') {
        detectedCode = 'BE';
      }
    }
  } catch (e) {
    // Ignore timezone error
  }

  // If timezone was ambiguous (e.g. generic or UTC), check languages
  if (detectedCode === 'DEFAULT' && typeof navigator !== 'undefined') {
    const langs = (navigator.languages || [navigator.language || '']).map((l) => l.toLowerCase());
    for (const lang of langs) {
      if (lang === 'fr-fr') {
        detectedCode = 'FR';
        rawSource = `lang:${lang}`;
        break;
      }
      if (lang === 'fr-ch' || lang === 'de-ch' || lang === 'it-ch' || lang === 'rm-ch') {
        detectedCode = 'CH';
        rawSource = `lang:${lang}`;
        break;
      }
      if (lang === 'fr-be' || lang === 'nl-be' || lang === 'de-be') {
        detectedCode = 'BE';
        rawSource = `lang:${lang}`;
        break;
      }
    }
  }

  return {
    countryCode: detectedCode,
    config: COUNTRY_PRICING[detectedCode],
    source: 'timezone_heuristic',
    rawCountry: rawSource || 'browser_heuristic',
  };
}

/**
 * Network Provider 1: Cloudflare Edge Trace
 * Cloudflare routes request to nearest edge data center (e.g. Paris, Zurich, Brussels).
 * The `loc` parameter in cdn-cgi/trace provides carrier-grade country detection.
 */
async function fetchCloudflareGeo(timeoutMs = 2800): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('https://cloudflare.com/cdn-cgi/trace', {
      signal: controller.signal,
      headers: { Accept: 'text/plain' },
    });
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.match(/loc=([A-Za-z]{2})/);
    return match ? match[1].toUpperCase() : null;
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Network Provider 2: Country.is API
 * Fast, lightweight geo-resolution powered by Cloudflare Workers.
 */
async function fetchCountryIsGeo(timeoutMs = 2500): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('https://api.country.is/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.country ? data.country.toUpperCase() : null;
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Network Provider 3: IpWho.is API
 * Comprehensive fallback returning country_code
 */
async function fetchIpWhoIsGeo(timeoutMs = 2500): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('https://ipwho.is/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.country_code ? data.country_code.toUpperCase() : null;
  } catch (e) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Runs the network IP detection cascade across providers.
 * Returns normalized country code and the provider that resolved it.
 */
export async function detectFromNetwork(): Promise<{ countryCode: 'FR' | 'CH' | 'BE' | 'DEFAULT'; source: GeoDetectionResult['source']; rawCountry: string } | null> {
  // Try Cloudflare trace first (fastest and most accurate in Europe)
  const cfCountry = await fetchCloudflareGeo();
  if (cfCountry) {
    const normalized = normalizeCountry(cfCountry);
    saveToCache(normalized, cfCountry);
    return { countryCode: normalized, source: 'ip_cloudflare', rawCountry: cfCountry };
  }

  // Secondary fallback: api.country.is
  const countryIs = await fetchCountryIsGeo();
  if (countryIs) {
    const normalized = normalizeCountry(countryIs);
    saveToCache(normalized, countryIs);
    return { countryCode: normalized, source: 'ip_countryis', rawCountry: countryIs };
  }

  // Tertiary fallback: ipwho.is
  const ipWho = await fetchIpWhoIsGeo();
  if (ipWho) {
    const normalized = normalizeCountry(ipWho);
    saveToCache(normalized, ipWho);
    return { countryCode: normalized, source: 'ip_whois', rawCountry: ipWho };
  }

  return null;
}

/**
 * Synchronous initial detection: URL param > localStorage cache > Browser Timezone/Locale heuristics.
 * Guaranteed to return in 0ms without waiting for network or causing layout jump!
 */
export function getInitialGeoState(): GeoDetectionResult {
  const urlResult = detectFromUrlParams();
  if (urlResult) return urlResult;

  const cacheResult = detectFromCache();
  if (cacheResult) return cacheResult;

  return detectFromBrowserHeuristics();
}
