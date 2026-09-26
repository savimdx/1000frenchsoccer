import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface PurchaseAlert {
  name: string;
  location: string;
  timeAgo: string;
}

const PURCHASE_POOL_FR: PurchaseAlert[] = [
  { name: "Thomas Martin", location: "Paris, France", timeAgo: "il y a 2 min" },
  { name: "Alexandre Dubois", location: "Lyon, France", timeAgo: "il y a 4 min" },
  { name: "Julien Bernard", location: "Marseille, France", timeAgo: "il y a 1 min" },
  { name: "Maxime Leroy", location: "Bordeaux, France", timeAgo: "il y a 5 min" },
  { name: "Lucas Petit", location: "Lille, France", timeAgo: "il y a 30 sec" },
  { name: "Antoine Moreau", location: "Toulouse, France", timeAgo: "il y a 7 min" },
  { name: "Nicolas Roux", location: "Nantes, France", timeAgo: "il y a 3 min" },
  { name: "Sébastien David", location: "Strasbourg, France", timeAgo: "il y a 6 min" }
];

const PURCHASE_POOL_CH: PurchaseAlert[] = [
  { name: "Marc Schneider", location: "Genève, Suisse", timeAgo: "il y a 2 min" },
  { name: "Laurent Favre", location: "Lausanne, Suisse", timeAgo: "il y a 4 min" },
  { name: "Daniel Weber", location: "Zurich, Suisse", timeAgo: "il y a 1 min" },
  { name: "Stéphane Blanc", location: "Fribourg, Suisse", timeAgo: "il y a 5 min" },
  { name: "Cédric Mayor", location: "Neuchâtel, Suisse", timeAgo: "il y a 30 sec" },
  { name: "Nicolas Rochat", location: "Sion, Suisse", timeAgo: "il y a 6 min" }
];

const PURCHASE_POOL_BE: PurchaseAlert[] = [
  { name: "Thierry Wouters", location: "Bruxelles, Belgique", timeAgo: "il y a 2 min" },
  { name: "Philippe Lambert", location: "Liège, Belgique", timeAgo: "il y a 4 min" },
  { name: "Maxime Dumont", location: "Namur, Belgique", timeAgo: "il y a 1 min" },
  { name: "Benoît Renard", location: "Charleroi, Belgique", timeAgo: "il y a 5 min" },
  { name: "Julien Peeters", location: "Waterloo, Belgique", timeAgo: "il y a 30 sec" },
  { name: "Arnaud Collet", location: "Mons, Belgique", timeAgo: "il y a 6 min" }
];

export default function NotificationToast() {
  const { detectedCountry } = useCurrency();

  const purchasePool = useMemo(() => {
    if (detectedCountry === 'CH') return PURCHASE_POOL_CH;
    if (detectedCountry === 'BE') return PURCHASE_POOL_BE;
    return PURCHASE_POOL_FR;
  }, [detectedCountry]);

  const [current, setCurrent] = useState<PurchaseAlert>(purchasePool[0]);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setCurrent(purchasePool[0]);
  }, [purchasePool]);

  useEffect(() => {
    // Delay first toast showing
    const firstShowTimeout = setTimeout(() => {
      setVisible(true);
    }, 4000);

    const interval = setInterval(() => {
      // Hide
      setVisible(false);
      
      // Select random new purchase and show again
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * purchasePool.length);
        setCurrent(purchasePool[randomIndex]);
        setVisible(true);
      }, 1000); // 1s to transition out before changing content
      
    }, 12000); // Cycle every 12 seconds

    return () => {
      clearTimeout(firstShowTimeout);
      clearInterval(interval);
    };
  }, [purchasePool]);

  return (
    <div
      className={`fixed top-16 left-4 z-40 max-w-[185px] bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-xl p-1.5 shadow-lg transition-all duration-700 ease-out flex items-center gap-1.5 ${
        visible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-6 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-emerald-100/80 flex items-center justify-center text-emerald-600 border border-emerald-200/60">
          <ShoppingBag className="w-4 h-4 text-emerald-600" />
        </div>
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-slate-800 truncate leading-tight">
          {current.name}
        </p>
        <p className="text-[8.5px] text-slate-500 truncate leading-tight">
          {current.location}
        </p>
        <p className="text-[8.5px] text-emerald-700 font-bold mt-0.5 flex items-center gap-0.5 leading-tight truncate">
          <CheckCircle className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
          <span>Acheté • {current.timeAgo}</span>
        </p>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-slate-400 hover:text-slate-600 transition-colors ml-1.5 self-start text-xs font-bold leading-none"
        aria-label="Fermer la notification"
      >
        ×
      </button>
    </div>
  );
}
