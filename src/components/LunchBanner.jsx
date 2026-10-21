import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Flame, ArrowRight } from 'lucide-react';
import { SHOP_INFO } from '../config';

export default function LunchBanner({ onOpenMenu }) {
  const [timeLeft, setTimeLeft] = useState('2 hrs 45 mins');

  // Compute remaining time until lunch finish (2:00 PM)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endLunch = new Date();
      endLunch.setHours(14, 0, 0, 0); // 2:00 PM

      const diff = endLunch.getTime() - now.getTime();
      if (diff > 0 && now.getHours() >= 10 && now.getHours() < 14) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h ${mins}m remaining`);
      } else {
        setTimeLeft('Daily 11:00 AM – 2:00 PM');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-charcoal via-charcoal-50 to-charcoal border-y border-orange-burnt/30 py-3.5 px-4 text-cream">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left Deal Info */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full bg-chilli text-white font-bold text-[11px] uppercase tracking-wider shadow">
            HOT DEAL
          </span>
          <p className="text-cream/90">
            <strong className="text-orange-glow">{SHOP_INFO.lunchSpecialAnchor}</strong>
            <span className="text-cream/60 hidden md:inline ml-2">
              • Includes Schnitzel Rolls, Caesar Salads & Fish Packs with Chips!
            </span>
          </p>
        </div>

        {/* Right Countdown & Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-orange-burnt font-mono bg-charcoal px-3 py-1 rounded-full border border-orange-burnt/30">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}</span>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-orange-burnt hover:bg-orange-600 px-3.5 py-1 rounded-full transition-colors"
          >
            <span>View Specials</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
