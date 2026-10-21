import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import LunchBanner from '../components/LunchBanner';
import MarqueeStrip from '../components/MarqueeStrip';
import PlateRise from '../components/PlateRise';
import ChefsPicks from '../components/ChefsPicks';
import WeatherSpecial from '../components/WeatherSpecial';
import HowToOrder from '../components/HowToOrder';
import { Utensils, ArrowRight, Star, Flame } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../config';

export default function HomePage({ onAddToCart, onOpenCart }) {
  return (
    <div>
      {/* 1. HERO + LUNCH BANNER + MARQUEE [DARK SECTION] */}
      <div className="bg-charcoal text-cream">
        <Hero onOpenCart={onOpenCart} />
        <LunchBanner />
        <MarqueeStrip />
      </div>

      {/* 2. PINNED PLATE RISE (150vh) [LIGHT SECTION] */}
      <PlateRise theme="light" onOpenCart={onOpenCart} />

      {/* 3. CHEF'S STANDOUT PICKS [DARK SECTION] */}
      <div className="bg-charcoal text-cream border-b border-cream/10">
        <ChefsPicks onAddToCart={onAddToCart} />
      </div>

      {/* 4. CALLOUT TO CUSTOM BURGER BUILDER & FULL MENU [LIGHT SECTION] */}
      <section className="bg-cream text-charcoal py-16 px-4 sm:px-6 border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box 1: Custom Burger Builder */}
          <div className="p-8 rounded-[24px] bg-white border border-charcoal/10 shadow-warm flex flex-col justify-between group hover:border-orange-burnt/50 transition-all hover:shadow-warm-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-burnt/10 text-orange-burnt text-xs uppercase font-mono font-bold mb-3">
                <Flame className="w-3.5 h-3.5 text-orange-burnt" />
                <span>Interactive Builder</span>
              </div>
              <h3 className="text-3xl font-serif font-bold text-charcoal mb-2 group-hover:text-orange-burnt transition-colors">
                Stack Your Dream Burger
              </h3>
              <p className="text-charcoal/70 text-xs sm:text-sm leading-relaxed mb-6">
                Watch 8 fresh layers stack with physics on scroll! Add double Angus patties, extra smoked bacon,
                sunny fried egg, or roasted jalapeños with live pricing.
              </p>
            </div>
            <Link
              to="/burger-builder"
              className="inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-orange-burnt hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm shadow-warm transition-transform active:scale-95"
            >
              <span>Open Burger Builder</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Box 2: Full Menu & In-Store Boards */}
          <div className="p-8 rounded-[24px] bg-white border border-charcoal/10 shadow-warm flex flex-col justify-between group hover:border-charcoal/30 transition-all hover:shadow-warm-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal/5 text-charcoal/80 text-xs uppercase font-mono font-bold mb-3">
                <Utensils className="w-3.5 h-3.5 text-orange-burnt" />
                <span>Explore Full Range</span>
              </div>
              <h3 className="text-3xl font-serif font-bold text-charcoal mb-2 group-hover:text-orange-burnt transition-colors">
                Browse Full Takeaway Menu
              </h3>
              <p className="text-charcoal/70 text-xs sm:text-sm leading-relaxed mb-6">
                From crispy battered fish & chips to slow-cooked roasts, chicken dinners, aromatic curries,
                salads, and our official wall-mounted menu boards.
              </p>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-charcoal hover:bg-charcoal/90 text-white font-semibold text-xs sm:text-sm shadow-warm transition-transform active:scale-95"
            >
              <span>View Full Menu & Prices</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. LIVE WEATHER SPECIALS [DARK SECTION] */}
      <div className="bg-charcoal text-cream border-b border-cream/10">
        <WeatherSpecial onAddToCart={onAddToCart} />
      </div>

      {/* 6. HOW TO ORDER [LIGHT SECTION] */}
      <HowToOrder theme="light" />

      {/* 7. REVIEWS HIGHLIGHTS [DARK SECTION] */}
      <section className="bg-charcoal py-20 px-4 sm:px-6 border-t border-cream/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream">
              Loved in Emerton for 10+ Years
            </h2>
            <p className="text-cream/60 text-xs sm:text-sm mt-1">
              4.1 Stars across 250+ Google Reviews
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CUSTOMER_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-charcoal-50 border border-cream/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-cream/80 text-xs sm:text-sm leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-2 border-t border-cream/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-cream">{rev.name}</span>
                  <span className="text-orange-glow text-[11px]">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
