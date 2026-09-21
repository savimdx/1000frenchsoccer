import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  decimals: number;
  prefix: boolean;
}

export const CURRENCY_LIST: Record<string, CurrencyOption> = {
  USD: { code: 'USD', name: 'Dólar estadounidense', symbol: 'US$', flag: '🇺🇸', decimals: 2, prefix: true },
  BRL: { code: 'BRL', name: 'Real brasileño', symbol: 'R$', flag: '🇧🇷', decimals: 2, prefix: true },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇸', decimals: 2, prefix: false },
  MXN: { code: 'MXN', name: 'Peso mexicano', symbol: 'MX$', flag: '🇲🇽', decimals: 2, prefix: true },
  COP: { code: 'COP', name: 'Peso colombiano', symbol: 'COL$', flag: '🇨🇴', decimals: 0, prefix: true },
  ARS: { code: 'ARS', name: 'Peso argentino', symbol: 'ARS$', flag: '🇦🇷', decimals: 0, prefix: true },
  CLP: { code: 'CLP', name: 'Peso chileno', symbol: 'CLP$', flag: '🇨🇱', decimals: 0, prefix: true },
  PEN: { code: 'PEN', name: 'Sol peruano', symbol: 'S/', flag: '🇵🇪', decimals: 2, prefix: true },
  UYU: { code: 'UYU', name: 'Peso uruguayo', symbol: '$U', flag: '🇺🇾', decimals: 2, prefix: true },
  BOB: { code: 'BOB', name: 'Boliviano', symbol: 'Bs.', flag: '🇧🇴', decimals: 2, prefix: true },
  PYG: { code: 'PYG', name: 'Guaraní paraguayo', symbol: 'Gs.', flag: '🇵🇾', decimals: 0, prefix: true },
  CRC: { code: 'CRC', name: 'Colón costarricense', symbol: '₡', flag: '🇨🇷', decimals: 0, prefix: true },
  DOP: { code: 'DOP', name: 'Peso dominicano', symbol: 'RD$', flag: '🇩🇴', decimals: 2, prefix: true },
  GTQ: { code: 'GTQ', name: 'Quetzal guatemalteco', symbol: 'Q', flag: '🇬🇹', decimals: 2, prefix: true },
  HNL: { code: 'HNL', name: 'Lempira hondureño', symbol: 'L', flag: '🇭🇳', decimals: 2, prefix: true },
  NIO: { code: 'NIO', name: 'Córdoba nicaragüense', symbol: 'C$', flag: '🇳🇮', decimals: 2, prefix: true },
  GBP: { code: 'GBP', name: 'Libra esterlina', symbol: '£', flag: '🇬🇧', decimals: 2, prefix: true },
  CAD: { code: 'CAD', name: 'Dólar canadiense', symbol: 'CA$', flag: '🇨🇦', decimals: 2, prefix: true },
  AUD: { code: 'AUD', name: 'Dólar australiano', symbol: 'AU$', flag: '🇦🇺', decimals: 2, prefix: true },
  CHF: { code: 'CHF', name: 'Franco suizo', symbol: 'CHF', flag: '🇨🇭', decimals: 2, prefix: true },
};

// Mapping country codes to currency codes
const countryToCurrency: Record<string, string> = {
  US: 'USD',
  BR: 'BRL',
  ES: 'EUR', DE: 'EUR', FR: 'EUR', IT: 'EUR', PT: 'EUR', GR: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', FI: 'EUR', IE: 'EUR',
  MX: 'MXN',
  AR: 'ARS',
  CO: 'COP',
  CL: 'CLP',
  PE: 'PEN',
  UY: 'UYU',
  VE: 'USD',
  EC: 'USD',
  SV: 'USD',
  PA: 'USD',
  BO: 'BOB',
  PY: 'PYG',
  CR: 'CRC',
  DO: 'DOP',
  GT: 'GTQ',
  HN: 'HNL',
  NI: 'NIO',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  CH: 'CHF',
};

// Fallback Hotmart-aligned exchange rates against 1 USD (including Hotmart currency conversion & taxes)
const fallbackRates: Record<string, number> = {
  USD: 1.00,
  BRL: 5.8347826,    // Hotmart checkout exact: 6.90 USD -> R$ 40,26
  EUR: 1.05507246,   // Hotmart checkout exact for Spain/Europe: 6.90 USD -> 7,28 €
  MXN: 19.8550725,   // Hotmart checkout: 6.90 USD -> MX$ 137,00
  COP: 4565.21739,   // Hotmart checkout: 6.90 USD -> COL$ 31.500
  ARS: 1144.9275,    // Hotmart checkout: 6.90 USD -> ARS$ 7.900
  CLP: 1028.9855,    // Hotmart checkout: 6.90 USD -> CLP$ 7.100
  PEN: 4.13043478,   // Hotmart checkout: 6.90 USD -> S/ 28,50
  UYU: 42.753623,    // Hotmart checkout: 6.90 USD -> $U 295,00
  BOB: 7.2463768,    // Hotmart checkout: 6.90 USD -> Bs. 50,00
  PYG: 7826.08695,   // Hotmart checkout: 6.90 USD -> Gs. 54.000
  CRC: 543.47826,    // Hotmart checkout: 6.90 USD -> ₡ 3.750
  DOP: 62.31884,     // Hotmart checkout: 6.90 USD -> RD$ 430,00
  GTQ: 8.115942,     // Hotmart checkout: 6.90 USD -> Q 56,00
  HNL: 25.7971,      // Hotmart checkout: 6.90 USD -> L 178,00
  NIO: 38.26087,     // Hotmart checkout: 6.90 USD -> C$ 264,00
  GBP: 0.833333,     // Hotmart checkout: 6.90 USD -> £ 5,75
  CAD: 1.420289,     // Hotmart checkout: 6.90 USD -> CA$ 9,80
  AUD: 1.579710,     // Hotmart checkout: 6.90 USD -> AU$ 10,90
  CHF: 0.920289,     // Hotmart checkout: 6.90 USD -> CHF 6,35
};

// Timezone to country mapping fallback
const timezoneToCountry: Record<string, string> = {
  'America/Sao_Paulo': 'BR',
  'America/Rio_Branco': 'BR',
  'America/Manaus': 'BR',
  'America/Belem': 'BR',
  'America/Fortaleza': 'BR',
  'America/Recife': 'BR',
  'America/Cuiaba': 'BR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Argentina/Cordoba': 'AR',
  'America/Bogota': 'CO',
  'America/Santiago': 'CL',
  'America/Mexico_City': 'MX',
  'America/Monterrey': 'MX',
  'America/Lima': 'PE',
  'America/Caracas': 'VE',
  'America/Montevideo': 'UY',
  'America/Asuncion': 'PY',
  'America/La_Paz': 'BO',
  'America/Guayaquil': 'EC',
  'America/Panama': 'PA',
  'America/Costa_Rica': 'CR',
  'America/Guatemala': 'GT',
  'Europe/Madrid': 'ES',
};

export interface CurrencyContextProps {
  originalPrice: number;
  convertedPrice: number;
  currencyCode: string;
  currencySymbol: string;
  formattedPrice: string;
  isConverting: boolean;
  rate: number;
  detectedCountry: string;
  setCurrency: (code: string) => void;
  convertAndFormat: (usdValue: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const originalPrice = 9.50;
  const [currencyCode, setCurrencyCode] = useState<string>('EUR');
  const [rate, setRate] = useState<number>(1);
  const [ratesCache, setRatesCache] = useState<Record<string, number>>(fallbackRates);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [detectedCountry, setDetectedCountry] = useState<string>('ES');

  // Formatter helper for EUR currency: e.g. "9,50 €"
  const formatValue = (val: number): string => {
    try {
      const numFormatted = val.toLocaleString('fr-FR', {
        minimumFractionDigits: val % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      });
      return `${numFormatted} €`;
    } catch (e) {
      return `${val.toFixed(2).replace('.', ',')} €`;
    }
  };

  useEffect(() => {
    setCurrencyCode('EUR');
    setRate(1);
    setIsConverting(false);
  }, []);

  const setCurrency = (newCode: string) => {
    // Keep fixed to EUR
    setCurrencyCode('EUR');
    setRate(1);
  };

  const convertAndFormat = (val: number): string => {
    return formatValue(val);
  };

  const convertedPrice = 9.50;
  const currencySymbol = '€';
  const formattedPrice = '9,50 €';

  return (
    <CurrencyContext.Provider
      value={{
        originalPrice,
        convertedPrice,
        currencyCode,
        currencySymbol,
        formattedPrice,
        isConverting,
        rate,
        detectedCountry,
        setCurrency,
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

