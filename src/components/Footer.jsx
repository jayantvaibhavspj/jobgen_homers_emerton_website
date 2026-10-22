import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Sparkles, Store } from 'lucide-react';
import { SHOP_INFO } from '../config';
import FooterScene from './footer-scene/FooterScene';
import SceneDelivery from './footer-scene/SceneDelivery';

const ROAD_TICKER_ITEMS = [
  { text: "🛵 Homers Hot Express Delivery", badge: "💨" },
  { text: "🍔 Made Fresh To Order · Popondetta Rd", badge: "📍" },
  { text: "🍗 Crispy Roasts & Golden Fish", badge: "🔥" },
  { text: "⚡ Hot & Fresh Pick-up In 15 Mins", badge: "⏱️" },
  { text: "🍟 Famous Aussie Chicken Salt Chips", badge: "✨" },
  { text: "🍛 Slow-Simmered Traditional Curries", badge: "🍲" },
  { text: "⭐ Family-Run Western Sydney Takeaway", badge: "❤️" },
];

const TICKER_BLOCK = [...ROAD_TICKER_ITEMS, ...ROAD_TICKER_ITEMS];

export default function Footer({ onOpenCatering }) {
  const [dayOfWeek, setDayOfWeek] = useState(0);

  useEffect(() => {
    setDayOfWeek(new Date().getDay());
  }, []);

  // 0: Sun, 1: Mon, 2: Tue, 3: Wed
  const isSunToWed = dayOfWeek >= 0 && dayOfWeek <= 3;
  // 4: Thu, 5: Fri, 6: Sat
  const isThuToSat = dayOfWeek >= 4 && dayOfWeek <= 6;

  return (
    <footer
      className="bg-[#17100b] text-[#e9dcc8] relative overflow-hidden select-none border-t border-cream/10"
      style={{ minHeight: '520px' }}
    >
      {/* ANIMATED DELIVERY ROAD TICKER (Top Border of Footer) */}
      <div className="absolute top-0 left-0 right-0 h-8 sm:h-9 bg-[#17100b]/95 border-b border-cream/10 overflow-hidden select-none pointer-events-none flex items-center z-20">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 border-b border-dashed border-amber-400/20 -translate-y-1/2 pointer-events-none" />
        <div
          className="relative z-10 flex items-center text-orange-burnt animate-marquee whitespace-nowrap"
          style={{ animationDuration: '36s' }}
        >
          {/* Loop Set 1 */}
          <div className="flex items-center shrink-0">
            {TICKER_BLOCK.map((item, idx) => (
              <div key={`road-1-${idx}`} className="flex items-center gap-2 mx-8 sm:mx-12 shrink-0">
                <span className="text-[10px] font-mono tracking-widest text-amber-100/70 uppercase">
                  {item.text}
                </span>
                <span className="text-xs">{item.badge}</span>
              </div>
            ))}
          </div>
          {/* Loop Set 2 */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {TICKER_BLOCK.map((item, idx) => (
              <div key={`road-2-${idx}`} className="flex items-center gap-2 mx-8 sm:mx-12 shrink-0">
                <span className="text-[10px] font-mono tracking-widest text-amber-100/70 uppercase">
                  {item.text}
                </span>
                <span className="text-xs">{item.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ATMOSPHERIC SHOPFRONT BUILDING MOTION GRAPHIC */}
      <FooterScene />

      {/* SVG FILTER DEFINITIONS FOR WALL-PAINTED TEXT */}
      <svg width="0" height="0" className="absolute -z-10 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Static SVG filter for hand-painted edges on headings and script logo (Never animated) */}
          <filter id="paint-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" />
          </filter>
        </defs>
      </svg>

      {/* SHARED LIGHTING & TEXTURE OVERLAY ABOVE TEXT (mix-blend-mode: soft-light) */}
      {/* Contains diagonal warm light cones, grain at 7%, and awning underside shadow */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-20"
        style={{ mixBlendMode: 'soft-light' }}
        aria-hidden="true"
      >
        {/* Soft diagonal warm light cones from exterior wall lamps (alpha <= 0.15, slow 3-5% flicker) */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 650px 450px at 80px 180px, rgba(255, 220, 160, 0.14) 0%, rgba(245, 158, 11, 0.04) 60%, transparent 100%),
              radial-gradient(ellipse 650px 450px at calc(100% - 90px) 190px, rgba(255, 220, 160, 0.12) 0%, rgba(245, 158, 11, 0.03) 60%, transparent 100%)
            `,
            animation: 'softLampSway 8.5s ease-in-out infinite alternate',
          }}
        />

        {/* Faint wall grain matching at 7% opacity */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Soft shadow under the awning slightly darkening the first line */}
        <div
          className="absolute top-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>

      {/* FOOTER CONTENT CONTAINER */}
      {/* Awning Clearance: 52px empty gap between bottom of awning (y: 152) and text area (y: 204) */}
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
        style={{ paddingTop: '204px' }}
      >
        {/* ONE CSS GRID WITH THREE EQUAL-TOP COLUMNS (Masonry Wall Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-10">
          
          {/* ================================================================ */}
          {/* COLUMN 1: BRAND INFO & STENCILED SOCIALS                         */}
          {/* ================================================================ */}
          <div className="relative flex flex-col gap-4 md:pr-6 lg:pr-8">
            {/* Thin architectural detail between Col 1 and 2: Cast-iron drainpipe with brackets */}
            <div
              className="hidden md:block absolute right-0 top-3 bottom-3 w-1.5 bg-gradient-to-r from-[#2c1d15] via-[#3a261c] to-[#1a100a] shadow-[0_1px_3px_rgba(0,0,0,0.6)] rounded-sm pointer-events-none"
              aria-hidden="true"
            >
              <span className="absolute top-4 -left-0.5 w-2.5 h-1 bg-[#1a100a] border-t border-[#4a2e1f]" />
              <span className="absolute top-1/2 -left-0.5 w-2.5 h-1 bg-[#1a100a] border-t border-[#4a2e1f]" />
              <span className="absolute bottom-4 -left-0.5 w-2.5 h-1 bg-[#1a100a] border-t border-[#4a2e1f]" />
            </div>

            {/* Header row with uniform min-height 48px sharing exact same top line */}
            <div className="min-h-[48px] flex items-center">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#f08a2c] font-mono border-b border-[#2e1d14] pb-2 flex items-center gap-1.5 w-full wall-paint-heading">
                <span className="text-orange-burnt">★</span>
                <span>OUR STORY</span>
              </h4>
            </div>

            <p className="wall-paint-body text-xs sm:text-sm leading-relaxed">
              Family-run takeaway serving flame-grilled Angus burgers, wild-caught crumbed fish &
              chips, aromatic curries, and hot roast carvery dinners in Western Sydney for over a
              decade.
            </p>

            {/* Socials & Delivery Links: Painted Stencil Marks (Muted brand tones, paint lettering) */}
            <div className="pt-1">
              <span className="block text-[10px] font-mono tracking-widest uppercase text-amber-200/60 pb-2">
                Order & Official Socials
              </span>
              <div className="flex items-center gap-2.5">
                {/* FACEBOOK */}
                <a
                  href={SHOP_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_12px_rgba(24,119,242,0.6)] active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
                  aria-label="Homers Emerton Facebook"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* INSTAGRAM */}
                <a
                  href={SHOP_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_12px_rgba(220,39,67,0.6)] active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
                  aria-label="Homers Emerton Instagram"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* UBER EATS */}
                <a
                  href={SHOP_INFO.uberEatsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#06C167] text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_12px_rgba(6,193,103,0.6)] active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none px-1"
                  aria-label="Order on Uber Eats"
                  title="Uber Eats"
                >
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M0 2.8645v4.9972c0 1.8834 1.3315 3.1297 3.0835 3.1297a2.9652 2.9652 0 0 0 2.1502-.876v.7425H6.445V2.8645H5.223v4.9339c0 1.2642-.8696 2.1198-1.9954 2.122-1.1386-.0023-1.997-.834-1.997-2.122V2.8645zm7.3625 0v7.9934h1.163v-.7318a2.9915 2.9915 0 0 0 2.1177.876c1.714.048 3.1295-1.3283 3.1295-3.0429s-1.4155-3.091-3.1295-3.0429a2.9674 2.9674 0 0 0-2.107.876V2.8645zm9.8857 2.0561c-1.6752-.0074-3.0369 1.3492-3.0356 3.0245 0 1.7366 1.3732 3.0373 3.1537 3.0373a3.123 3.123 0 0 0 2.5578-1.2438l-.8495-.6177a2.0498 2.0498 0 0 1-1.7083.8585c-.9763.0126-1.8147-.6915-1.971-1.6553h4.818v-.379c0-1.734-1.254-3.0238-2.9638-3.0245zm6.1632.0667a1.5943 1.5943 0 0 0-1.376.7657v-.7186h-1.163v5.8235h1.1741V7.5465c0-.9023.5581-1.4847 1.3268-1.4847h.4949V4.9886c-.1576.0013-.3186-.0009-.4568-.0013zm-6.2034.944a1.844 1.844 0 0 1 1.8337 1.486H15.424a1.844 1.844 0 0 1 1.784-1.486zm-6.6589.0056c1.1223-.0084 2.0365.8992 2.0364 2.0215-.0026 1.1203-.914 2.0258-2.0343 2.021a2.0151 2.0151 0 0 1-1.4159-.5987A2.0152 2.0152 0 0 1 8.55 7.9592a2.0152 2.0152 0 0 1 .5838-1.422 2.0152 2.0152 0 0 1 1.4153-.6003zM0 12.9864v7.9716h5.7222v-1.3666H1.5458v-1.971h4.0647v-1.314H1.5458v-1.9556h4.1764v-1.3644zm14.5608.4097v1.6861h-1.1519v1.338h1.1545v3.143c0 .7927.5712 1.4209 1.6005 1.4209h1.6425L17.8 19.646h-1.1412c-.3482 0-.5714-.1509-.5714-.464v-2.7683H17.8v-1.3316h-1.7062v-1.686zm-5.2974 1.5275c-1.7348-.0103-3.141 1.4035-3.1214 3.1382.0196 1.7346 1.4575 3.1163 3.1915 3.0668a2.9915 2.9915 0 0 0 1.912-.6655v.532h1.5175v-5.9129h-1.509v.5257a3.0047 3.0047 0 0 0-1.9205-.6835c-.0244-.0007-.0492-.0006-.0701-.0008zm11.771.0077c-1.5855 0-2.7002.6437-2.7002 1.8854 0 .8607.6132 1.4213 1.936 1.695l1.4478.3286c.5694.1095.7224.2585.7224.4906 0 .3701-.438.6022-1.1279.6022-.876 0-1.3774-.1907-1.5723-.8477h-1.533c.219 1.2307 1.1563 2.05 3.0484 2.05h.0022c1.752 0 2.7422-.819 2.7422-1.9534 0-.8059-.5847-1.4084-1.8089-1.6668l-1.2943-.2605c-.7511-.1358-.988-.2738-.988-.5454 0-.357.3616-.5757 1.0295-.5757.7227 0 1.2527.1925 1.406.8473h1.5175c-.0854-1.2286-.9899-2.0497-2.8273-2.0497zM9.467 16.1815c1.0092.0096 1.8188.8369 1.8067 1.8461.0014 1.0046-.8198 1.816-1.8243 1.8025-1.0075-.0048-1.8203-.8256-1.8155-1.833.0048-1.0076.8255-1.8204 1.833-1.8156z"/>
                  </svg>
                </a>

                {/* DOORDASH */}
                <a
                  href={SHOP_INFO.doorDashUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF3008] text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-[0_0_12px_rgba(255,48,8,0.6)] active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
                  aria-label="Order on DoorDash"
                  title="DoorDash"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M23.071 8.409a6.09 6.09 0 00-5.396-3.228H.584A.589.589 0 00.17 6.184L3.894 9.93a1.752 1.752 0 001.242.516h12.049a1.554 1.554 0 11.031 3.108H8.91a.589.589 0 00-.415 1.003l3.725 3.747a1.75 1.75 0 001.242.516h3.757c4.887 0 8.584-5.225 5.852-10.413" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* COLUMN 2: QUICK LINKS (EXPLORE PAGES)                            */}
          {/* ================================================================ */}
          <div className="relative flex flex-col justify-between gap-4 md:px-6 lg:px-8">
            {/* Thin architectural detail between Col 2 and 3: Stone pilaster relief line */}
            <div
              className="hidden md:block absolute right-0 top-3 bottom-3 w-0.5 bg-[#2a1b13] shadow-[1px_0_0_rgba(255,255,255,0.03),-1px_0_0_rgba(0,0,0,0.6)] pointer-events-none"
              aria-hidden="true"
            />

            {/* Header row with uniform min-height 48px */}
            <div className="min-h-[48px] flex items-center">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#f08a2c] font-mono border-b border-[#2e1d14] pb-2 flex items-center gap-1.5 w-full wall-paint-heading">
                <span className="text-orange-burnt">✎</span>
                <span>EXPLORE PAGES</span>
              </h4>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/menu"
                  className="wall-paint-body hover:text-amber-300 transition-colors py-0.5 block relative group focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                >
                  <span>Takeaway & Dine Menu</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#f08a2c]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/burger-builder"
                  className="wall-paint-body hover:text-amber-300 transition-colors py-0.5 block relative group focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                >
                  <span>Interactive Burger Builder</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#f08a2c]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/catering"
                  className="wall-paint-body hover:text-amber-300 transition-colors py-0.5 flex items-center justify-between gap-1.5 relative group focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                >
                  <span>Party Catering Packages</span>
                  {/* Stenciled tag with hand-painted outline, no filled chip */}
                  <span className="text-[10px] font-mono text-amber-200 px-1.5 py-0.5 rounded border border-dashed border-amber-400/70 bg-transparent shrink-0">
                    4-day notice
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/order-online"
                  className="wall-paint-body hover:text-amber-300 transition-colors py-0.5 block relative group focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                >
                  <span>Order Online & Delivery</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#f08a2c]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="wall-paint-body hover:text-amber-300 transition-colors py-0.5 block relative group focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                >
                  <span>Our 10+ Year Story</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#f08a2c]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="wall-paint-body hover:text-amber-300 transition-colors py-0.5 block relative group focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                >
                  <span>Store Hours & Location</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#f08a2c]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/technology-partner"
                  className="wall-paint-body hover:text-amber-300 transition-colors py-0.5 block relative group focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                >
                  <span>Technology Partner</span>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#f08a2c]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* ================================================================ */}
          {/* COLUMN 3: CONTACT & HOURS (STORE & ORDERS)                      */}
          {/* ================================================================ */}
          <div className="relative flex flex-col justify-between gap-4 md:pl-6 lg:pl-8">
            {/* Header row with uniform min-height 48px */}
            <div className="min-h-[48px] flex items-center justify-between border-b border-[#2e1d14] pb-2">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#f08a2c] font-mono flex items-center gap-2 wall-paint-heading">
                <Store className="w-4 h-4 text-[#f08a2c]" />
                <span>STORE & ORDERS</span>
              </h4>

              {/* Stenciled Live Takeaway Tag - Hand-painted outline, no filled chip */}
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-400/60 bg-transparent text-[10px] font-mono font-bold text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                <span className="tracking-wider">Live Takeaway</span>
              </div>
            </div>

            {/* Address & Phone */}
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="flex items-start gap-2 wall-paint-body">
                <MapPin className="w-4 h-4 text-[#f08a2c] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Shop 2, 135-137 Popondetta Rd, Emerton NSW 2770
                </span>
              </p>

              {/* Phone Link with Neon-Tube outline around digits only */}
              <p className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#f08a2c] shrink-0" />
                <a
                  href={`tel:${SHOP_INFO.phoneRaw}`}
                  className="font-bold text-sm sm:text-base transition-colors flex items-center gap-2 group focus-visible:ring-1 focus-visible:ring-orange-500 rounded"
                >
                  <span
                    className="font-mono tracking-wider text-amber-100 px-2 py-0.5 rounded border border-amber-400/60 shadow-[0_0_6px_rgba(245,158,11,0.5),inset_0_0_4px_rgba(245,158,11,0.3)] group-hover:border-amber-300 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                    style={{
                      textShadow: '0 0 2px #fff, 0 0 6px #f59e0b, 0 0 12px rgba(245,158,11,0.7)',
                    }}
                  >
                    {SHOP_INFO.phone}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-orange-500/60 text-orange-400 font-bold bg-transparent group-hover:border-orange-400 group-hover:text-orange-300">
                    Call Shop
                  </span>
                </a>
              </p>
            </div>

            {/* Operating Hours with Real-Time "TODAY" Highlight */}
            <div className="pt-2 border-t border-[#2e1d14] space-y-1.5 text-xs">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-amber-300/70 pb-0.5">
                Opening Hours (Sydney Time)
              </span>

              {/* Sunday - Wednesday Row */}
              <div
                className={`flex items-center justify-between p-1.5 rounded transition-colors ${
                  isSunToWed
                    ? 'border-2 border-[#f59e0b]/80 bg-[#f59e0b]/10 text-amber-200 font-medium shadow-[inset_0_0_8px_rgba(245,158,11,0.15)]'
                    : 'wall-paint-body opacity-75 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#f08a2c] shrink-0" />
                  <span className={isSunToWed ? 'text-amber-200' : 'wall-paint-body'}>Sun - Wed: 10:00 AM - 8:00 PM</span>
                </div>
                {isSunToWed && (
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold px-1.5 py-0.5 rounded border border-orange-400 text-orange-300 bg-transparent shrink-0">
                    Today
                  </span>
                )}
              </div>

              {/* Thursday - Saturday Row */}
              <div
                className={`flex items-center justify-between p-1.5 rounded transition-colors ${
                  isThuToSat
                    ? 'border-2 border-[#f59e0b]/80 bg-[#f59e0b]/10 text-amber-200 font-medium shadow-[inset_0_0_8px_rgba(245,158,11,0.15)]'
                    : 'wall-paint-body opacity-75 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#f08a2c] shrink-0" />
                  <span className={isThuToSat ? 'text-amber-200' : 'wall-paint-body'}>Thu - Sat: 10:00 AM - 8:30 PM</span>
                </div>
                {isThuToSat && (
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold px-1.5 py-0.5 rounded border border-orange-400 text-orange-300 bg-transparent shrink-0">
                    Today
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* BOTTOM BAR: Powered by JobGen.AI (Simple Text, No Box)          */}
        {/* ================================================================ */}
        <div className="pt-4 pb-4 border-t border-[#2e1d14] flex items-center justify-end text-xs">
          <Link
            to="/technology-partner"
            className="text-xs text-[#e9dcc8]/60 hover:text-[#f08a2c] transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded px-1"
            title="Technology Partner: JobGen.AI"
          >
            <span>Powered by</span>
            <span className="font-semibold text-[#f08a2c]">JobGen.AI</span>
          </Link>
        </div>
      </div>

      {/* ================================================================== */}
      {/* SEPARATE ROAD STRIP SITUATED BELOW THE BOTTOM BAR (Height: 60px)   */}
      {/* Scooter drives only in this reserved road strip, never overlapping */}
      {/* the copyright line, Jobgen badge, or back-to-top button.          */}
      {/* ================================================================== */}
      <div className="relative w-full h-[60px] bg-[#0d0907] border-t border-cream/10 overflow-hidden z-20">
        <SceneDelivery />
      </div>

      {/* Custom Styles for Wall Paint Text and Subtle Lamp Sway */}
      <style>{`
        .wall-paint-body {
          color: #e9dcc8;
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.55);
        }
        .wall-paint-heading {
          color: #f08a2c;
          filter: url(#paint-rough);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.85);
        }
        @supports not (filter: url(#paint-rough)) {
          .wall-paint-heading {
            filter: none;
          }
        }
        @keyframes softLampSway {
          0% { opacity: 0.94; }
          50% { opacity: 1.0; }
          100% { opacity: 0.92; }
        }
      `}</style>
    </footer>
  );
}
