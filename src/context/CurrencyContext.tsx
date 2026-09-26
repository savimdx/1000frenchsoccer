import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  COUNTRY_PRICING,
  CountryPricingConfig,
  GeoDetectionResult,
  getInitialGeoState,
  detectFromNetwork,
  detectFromUrlParams,
  saveToCache,
  normalizeCountry,
} from '../utils/geolocation';

export interface CurrencyContextProps {
  originalPrice: number;
  convertedPrice: number;
  currencyCode: string;
  currencySymbol: string;
  formattedPrice: string;
  isConverting: boolean;
  rate: number;
  detectedCountry: string;
  countryName: string;
  countryNameFr: string;
  countryFlag: string;
  geoSource: string;
  setCurrency: (code: string) => void;
  setCountry: (countryCode: string) => void;
  convertAndFormat: (value: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Instant zero-latency synchronous detection (URL Param -> localStorage cache -> Timezone heuristics)
  const initialGeo = getInitialGeoState();

  const [activeGeo, setActiveGeo] = useState<GeoDetectionResult>(initialGeo);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  // Helper to format any numeric value (e.g., 420 -> "420 €" or "420 CHF")
  const convertAndFormat = useCallback(
    (val: number): string => {
      const cfg = activeGeo.config;
      if (cfg.currencyCode === 'CHF') {
        return `${val} CHF`;
      }
      return `${val} €`;
    },
    [activeGeo.config]
  );

  // Manual or programmatic country changer (e.g. for testing or selection)
  const setCountry = useCallback((code: string) => {
    const normalized = normalizeCountry(code);
    const config = COUNTRY_PRICING[normalized];
    saveToCache(normalized, code);
    setActiveGeo({
      countryCode: normalized,
      config,
      source: 'url_param',
      rawCountry: code,
    });
  }, []);

  // Backward compatibility setter
  const setCurrency = useCallback((code: string) => {
    if (code.toUpperCase() === 'CHF') {
      setCountry('CH');
    } else {
      setCountry('FR');
    }
  }, [setCountry]);

  // 2. High-precision Network IP verification in background
  useEffect(() => {
    // If user already specified an explicit URL parameter (e.g., ?country=CH), respect it without overriding
    const urlOverride = detectFromUrlParams();
    if (urlOverride) {
      return;
    }

    let isMounted = true;
    setIsConverting(true);

    detectFromNetwork()
      .then((netResult) => {
        if (!isMounted || !netResult) return;
        const normalized = netResult.countryCode;
        const config = COUNTRY_PRICING[normalized];

        // Update active configuration
        setActiveGeo({
          countryCode: normalized,
          config,
          source: netResult.source,
          rawCountry: netResult.rawCountry,
        });
      })
      .catch(() => {
        // Fallback remains the initial heuristic
      })
      .finally(() => {
        if (isMounted) {
          setIsConverting(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const config = activeGeo.config;

  return (
    <CurrencyContext.Provider
      value={{
        originalPrice: config.price,
        convertedPrice: config.price,
        currencyCode: config.currencyCode,
        currencySymbol: config.currencySymbol,
        formattedPrice: config.formattedPrice,
        isConverting,
        rate: 1,
        detectedCountry: config.countryCode,
        countryName: config.countryName,
        countryNameFr: config.countryNameFr,
        countryFlag: config.flag,
        geoSource: activeGeo.source,
        setCurrency,
        setCountry,
        convertAndFormat,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
