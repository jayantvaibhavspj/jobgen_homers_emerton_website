import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Utensils, CloudSun, ArrowDown } from 'lucide-react';
import { SHOP_INFO } from '../config';
import { fetchEmertonWeather } from '../utils/weatherApi';

export default function Hero() {
  const [weather, setWeather] = useState({ chipText: '21°C · Emerton Takeaway', mode: 'mild' });
  const canvasRef = useRef(null);
  const headlineWords = "Hot, fresh and made to order".split(" ");

  useEffect(() => {
    fetchEmertonWeather().then((data) => {
      setWeather(data);
    });
  }, []);

  // Ambient grill steam & warm particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle setup
    const particles = [];
    const count = window.innerWidth < 768 ? 20 : 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        radius: Math.random() * 2.5 + 1,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.4 + 0.1,
        isSteam: Math.random() > 0.4,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Reset if off top
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        if (p.isSteam) {
          // Soft white steam cloud
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 246, 240, ${p.alpha * 0.25})`;
        } else {
          // Amber flame ember
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 112, 10, ${p.alpha * 0.8})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#e8700a';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-charcoal pt-24 pb-16 px-4"
    >
      {/* BACKGROUND VIDEO & POSTER OVERLAY (Real Homer's Feast from Website) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/homeslide.jpg"
          alt="Homers Emerton Signature Food Spread"
          className="w-full h-full object-cover opacity-20 scale-105 filter brightness-90 contrast-125 transition-transform duration-1000"
        />
        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal/50 to-charcoal" />
      </div>

      {/* AMBIENT STEAM & EMBER PARTICLES */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-1 pointer-events-none opacity-60"
        aria-hidden="true"
      />

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* OFFICIAL HOMERS BRAND LOGO EMBLEM */}
        <div className="mb-4">
          <img
            src="/logo.png"
            alt="Homers Emerton Official Logo"
            className="h-14 sm:h-18 md:h-20 w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform"
          />
        </div>

        {/* PRICE ANCHORING BADGE (Golden Kim reference look) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-cream/20 backdrop-blur-md text-xs sm:text-sm font-medium text-cream mb-6 shadow-warm transform hover:scale-105 transition-all">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-burnt opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-burnt"></span>
          </span>
          <span className="text-orange-glow font-semibold tracking-wide uppercase text-[11px] sm:text-xs">
            {SHOP_INFO.lunchSpecialAnchor}
          </span>
          <span className="text-cream/50">|</span>
          <span className="text-cream/90 hidden xs:inline">100% Australian Beef & Seafood</span>
        </div>

        {/* HEADLINE: WORD-BY-WORD REVEAL */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-cream tracking-tight leading-[1.08] mb-6">
          {headlineWords.map((word, idx) => (
            <span
              key={idx}
              className="inline-block mr-2 sm:mr-3 transition-all duration-700 hover:text-orange-glow"
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${idx * 0.1}s`,
              }}
            >
              {word === 'order' ? (
                <span className="italic text-orange-burnt font-normal">order.</span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* LIVE WEATHER CHIP */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-50/80 border border-orange-burnt/20 text-xs sm:text-sm text-cream/90 mb-8 backdrop-blur-sm">
          <CloudSun className="w-4 h-4 text-orange-burnt" />
          <span>{weather.chipText}</span>
          <span className="text-cream/40">•</span>
          <span className="text-cream/70 text-xs">Hot & ready in 15 mins</span>
        </div>

        {/* ACTION BUTTONS (Magnetic hover style) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4">
          <Link
            to="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-orange-burnt hover:bg-orange-600 active:scale-95 text-white font-semibold text-base sm:text-lg shadow-warm-lg hover:shadow-glow-orange transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-burnt/50"
          >
            <Utensils className="w-5 h-5" />
            <span>See the menu</span>
          </Link>

          <a
            href={SHOP_INFO.uberEatsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cream/10 hover:bg-cream/20 active:scale-95 text-cream border border-cream/20 font-medium text-base sm:text-lg backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-cream/30"
          >
            <span>Order Delivery</span>
            <span className="text-xs text-orange-glow font-bold ml-1 bg-charcoal/60 px-2 py-0.5 rounded-full">UberEats</span>
          </a>
        </div>

        {/* QUICK SERVICE HIGHLIGHTS */}
        <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-12 pt-8 border-t border-cream/10 text-cream/70 text-xs sm:text-sm">
          <div className="flex flex-col items-center">
            <span className="text-cream font-bold text-base sm:text-xl">Flame-Grilled</span>
            <span className="text-cream/60 text-[11px] sm:text-xs">Premium Angus Patties</span>
          </div>
          <div className="flex flex-col items-center border-x border-cream/10 px-2">
            <span className="text-cream font-bold text-base sm:text-xl">Fresh Daily</span>
            <span className="text-cream/60 text-[11px] sm:text-xs">Crumbed Fish & Salads</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-cream font-bold text-base sm:text-xl">10+ Years</span>
            <span className="text-cream/60 text-[11px] sm:text-xs">Family-Run in Emerton</span>
          </div>
        </div>

        {/* SCROLL CUE */}
        <a
          href="#plate-rise"
          className="mt-10 sm:mt-12 flex flex-col items-center text-cream/40 hover:text-orange-burnt transition-colors group"
          aria-label="Scroll to plate showcase"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium mb-1">Scroll to taste</span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-orange-burnt" />
        </a>
      </div>
    </section>
  );
}
