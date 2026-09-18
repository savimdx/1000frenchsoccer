import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface HeaderBannerProps {
  timeLeft?: number;
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Ignored
    }
  }
};

export default function HeaderBanner({ timeLeft }: HeaderBannerProps) {
  const [secondsLeft, setSecondsLeft] = useState<number>(30 * 60);

  useEffect(() => {
    if (timeLeft !== undefined) return;

    // Check if there is a saved timer in localStorage to keep it persistent on refresh
    const savedTime = safeLocalStorage.getItem('soccer_sales_timer_30');
    let initialTime = 30 * 60;
    
    if (savedTime) {
      const parsed = parseInt(savedTime, 10);
      if (parsed > 0) {
        initialTime = parsed;
      }
    }
    
    setSecondsLeft(initialTime);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          safeLocalStorage.setItem('soccer_sales_timer_30', (30 * 60).toString());
          return 30 * 60; 
        }
        const updated = prev - 1;
        safeLocalStorage.setItem('soccer_sales_timer_30', updated.toString());
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const activeSeconds = timeLeft !== undefined ? timeLeft : secondsLeft;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="bg-[#f02d00] text-white py-2.5 px-4 fixed top-0 inset-x-0 w-full z-50 shadow-md flex justify-center items-center gap-3 text-xs sm:text-sm md:text-base font-black tracking-wide border-b border-[#d82800] select-none">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg">🔥</span>
          <span className="font-extrabold tracking-wider text-white">
            OFFRE VALABLE AUJOURD'HUI SEULEMENT !
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg border border-white/20 font-mono text-white text-xs sm:text-sm font-bold shadow-sm">
          <Clock className="w-4 h-4 text-white" />
          <span>{formatTime(activeSeconds)}</span>
        </div>
      </div>
      {/* Spacer to prevent content from jumping under fixed banner */}
      <div className="h-11 sm:h-12 w-full" aria-hidden="true" />
    </>
  );
}

