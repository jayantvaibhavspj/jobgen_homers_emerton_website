import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowUp, Phone, MapPin, Heart, Clock, Bike, ShieldCheck, Sparkles } from 'lucide-react';
import { SHOP_INFO, OPERATING_HOURS } from '../config';

export default function Footer({ onOpenCatering }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-28 lg:pb-12 border-t border-cream/10 relative overflow-hidden">
      {/* ANIMATED DELIVERY SCOOTER / VAN ROAD (Golden Kim inspired feature) */}
      <div className="absolute top-0 left-0 right-0 h-9 bg-charcoal-100 border-b border-cream/10 overflow-hidden select-none pointer-events-none">
        {/* Road center dashes */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 border-b border-dashed border-cream/20 -translate-y-1/2" />

        {/* Animated cruising scooter & takeaway parcel */}
        <div className="absolute top-1 left-0 flex items-center gap-1 text-orange-burnt animate-marquee">
          <div className="flex items-center gap-2 mx-16">
            <span className="text-[10px] font-mono tracking-widest text-cream/50 uppercase">
              🛵 Homers Hot Express Delivery
            </span>
            <span className="text-xs">💨</span>
          </div>
          <div className="flex items-center gap-2 mx-16">
            <span className="text-[10px] font-mono tracking-widest text-cream/50 uppercase">
              🍔 Made Fresh To Order · Popondetta Rd
            </span>
            <span className="text-xs">⚡</span>
          </div>
          <div className="flex items-center gap-2 mx-16">
            <span className="text-[10px] font-mono tracking-widest text-cream/50 uppercase">
              🍗 Crispy Roasts & Golden Fish
            </span>
            <span className="text-xs">🔥</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-cream/10">
          {/* Column 1: Brand Info & Socials */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="font-script text-3xl sm:text-4xl text-orange-burnt">Homers</span>
              <span className="text-xs uppercase tracking-widest text-cream/70 font-semibold px-2 py-0.5 rounded-full bg-cream/10">
                Emerton NSW
              </span>
            </Link>

            <p className="text-cream/70 text-xs sm:text-sm max-w-sm leading-relaxed">
              Family-run takeaway serving flame-grilled Angus burgers, wild-caught crumbed fish & chips,
              aromatic curries, and hot roast carvery dinners in Western Sydney for over a decade.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* FACEBOOK - Official Blue */}
              <a
                href={SHOP_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center transition-all duration-200 shadow-md shadow-[#1877F2]/30 hover:scale-110 active:scale-95"
                aria-label="Homers Emerton Facebook"
                title="Follow us on Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* INSTAGRAM - Official Gradient */}
              <a
                href={SHOP_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white flex items-center justify-center transition-all duration-200 shadow-md shadow-[#dc2743]/30 hover:scale-110 active:scale-95"
                aria-label="Homers Emerton Instagram"
                title="Follow us on Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* UBER EATS - Official Green Badge */}
              <a
                href={SHOP_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 h-9 rounded-full bg-[#06C167] hover:bg-[#05a85a] text-black flex items-center gap-1.5 transition-all duration-200 text-xs font-bold shadow-md shadow-[#06C167]/30 hover:scale-105 active:scale-95"
                title="Order on Uber Eats"
              >
                <span className="w-2 h-2 rounded-full bg-black/80" />
                <span>Uber Eats</span>
              </a>

              {/* DOORDASH - Official Red Badge */}
              <a
                href={SHOP_INFO.doorDashUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 h-9 rounded-full bg-[#FF3008] hover:bg-[#e02805] text-white flex items-center gap-1.5 transition-all duration-200 text-xs font-bold shadow-md shadow-[#FF3008]/30 hover:scale-105 active:scale-95"
                title="Order on DoorDash"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.072 9.073c-.562-.977-1.503-1.66-2.614-1.897L2.43 3.03C1.353 2.801.272 3.497.042 4.574-.187 5.65.509 6.732 1.586 6.961l15.654 3.329c.494.105.908.406 1.156.837.248.431.283.946.098 1.408l-2.094 5.234c-.407 1.018.093 2.176 1.111 2.583 1.018.407 2.176-.093 2.583-1.111l2.094-5.234c.421-1.053.342-2.228-.216-3.21z" />
                </svg>
                <span>DoorDash</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-orange-glow font-mono">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-cream/70">
              <li>
                <Link to="/menu" className="hover:text-orange-burnt transition-colors">
                  Takeaway & Dine Menu
                </Link>
              </li>
              <li>
                <Link to="/burger-builder" className="hover:text-orange-burnt transition-colors">
                  Interactive Burger Builder
                </Link>
              </li>
              <li>
                <Link to="/catering" className="hover:text-orange-burnt transition-colors flex items-center gap-1.5">
                  <span>Party Catering Packages</span>
                  <span className="text-[10px] bg-orange-burnt/20 text-orange-glow px-1.5 py-0.5 rounded">4-day notice</span>
                </Link>
              </li>
              <li>
                <Link to="/order-online" className="hover:text-orange-burnt transition-colors">
                  Order Online & Delivery
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-orange-burnt transition-colors">
                  Our 10+ Year Story
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-orange-burnt transition-colors">
                  Store Hours & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-orange-glow font-mono">
              Store & Orders
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-cream/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-burnt flex-shrink-0" />
                <span>Shop 2, 135-137 Popondetta Rd, Emerton NSW 2770</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-burnt flex-shrink-0" />
                <a href={`tel:${SHOP_INFO.phoneRaw}`} className="hover:text-orange-glow font-medium text-cream">
                  {SHOP_INFO.phone}
                </a>
              </p>
              <div className="pt-2 text-xs text-cream/60 space-y-1">
                <div className="flex items-center gap-1.5 text-orange-glow">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Sunday – Wednesday: 10:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-glow">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Thursday – Saturday: 10:00 AM – 8:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW WITH "POWERED BY JOBGEN" IN RIGHT CORNER */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          {/* Left: Copyright */}
          <div>
            © {new Date().getFullYear()} {SHOP_INFO.name}. All Rights Reserved. Currency: AUD.
          </div>

          {/* Center: Location pride */}
          <div className="hidden md:flex items-center gap-1 text-cream/50">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 text-chilli fill-chilli" />
            <span>in Western Sydney</span>
          </div>

          {/* Right: POWERED BY JOBGEN & Back to Top */}
          <div className="flex items-center gap-3">
            {/* POWERED BY JOBGEN BADGE */}
            <a
              href="https://jobgen.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream/10 hover:bg-cream/20 text-cream/90 hover:text-white border border-cream/15 transition-all duration-200 group shadow-sm text-[11px]"
              title="Powered by Jobgen AI"
            >
              <span className="text-cream/50 font-normal">Powered by</span>
              <span className="font-bold text-orange-glow group-hover:text-white tracking-wide">
                Jobgen
              </span>
              <Sparkles className="w-3 h-3 text-orange-burnt group-hover:scale-110 transition-transform" />
            </a>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-cream/10 hover:bg-orange-burnt text-cream hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
