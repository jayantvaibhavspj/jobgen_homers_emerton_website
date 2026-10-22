import React from 'react';
import { Flame, Star } from 'lucide-react';

export default function MarqueeStrip() {
  const items = [
    "Flame-Grilled Burgers",
    "Crumbed Fish & Chips",
    "Slow-Simmered Curries",
    "Hot Roasts & Carvery",
    "Famous Chicken Salt",
    "Aussie Family Tradition",
  ];

  const loopSet = [...items, ...items, ...items];

  return (
    <div className="bg-orange-burnt text-white py-4 overflow-hidden border-y border-white/20 select-none shadow-warm">
      <div className="animate-marquee flex items-center whitespace-nowrap text-sm sm:text-base font-serif font-bold tracking-wider">
        <div className="flex items-center shrink-0">
          {loopSet.map((text, idx) => (
            <div key={`m1-${idx}`} className="flex items-center mx-6 shrink-0">
              <span className="uppercase">{text}</span>
              <Flame className="w-4 h-4 ml-6 fill-white text-white opacity-80" />
            </div>
          ))}
        </div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {loopSet.map((text, idx) => (
            <div key={`m2-${idx}`} className="flex items-center mx-6 shrink-0">
              <span className="uppercase">{text}</span>
              <Flame className="w-4 h-4 ml-6 fill-white text-white opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
