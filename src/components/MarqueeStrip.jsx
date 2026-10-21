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

  return (
    <div className="bg-orange-burnt text-white py-4 overflow-hidden border-y border-white/20 select-none shadow-warm">
      <div className="animate-marquee flex items-center whitespace-nowrap text-sm sm:text-base font-serif font-bold tracking-wider">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="uppercase">{text}</span>
            <Flame className="w-4 h-4 ml-6 fill-white text-white opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
}
