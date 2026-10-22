import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Cpu, Zap, Smartphone, ExternalLink, ArrowRight, Layers, Bot } from 'lucide-react';
import PageBanner from '../components/banner/PageBanner';

export default function TechnologyPartnerPage() {
  const capabilities = [
    {
      icon: Layers,
      title: "Interactive Burger Builder",
      description: "Custom visual burger assembly engine with dynamic real-time layer rendering and instant calorie and price calculation."
    },
    {
      icon: Zap,
      title: "Ultra-Fast Edge Performance",
      description: "Sub-second page loads powered by modern edge architecture, ensuring instant menu browsing during busy dinner rushes."
    },
    {
      icon: Bot,
      title: "AI Takeaway Concierge",
      description: "Intelligent assistant guiding customers through catering options, dietary specifics, and house-favorite food pairings."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Touch Architecture",
      description: "Optimized for one-handed thumb navigation, smooth gesture drag rails, and frictionless mobile ordering."
    }
  ];

  const metrics = [
    { label: "Page Load Speed", value: "< 0.5s", detail: "Global edge CDN" },
    { label: "Custom Architecture", value: "100%", detail: "Handcrafted for Homers" },
    { label: "Platform Uptime", value: "99.9%", detail: "Reliable during rush hours" },
    { label: "Western Sydney Local", value: "Emerton", detail: "Community focused" },
  ];

  return (
    <div className="pt-24 min-h-screen bg-charcoal text-cream">
      {/* 1. HEADER BANNER */}
      <PageBanner
        variant="story"
        badgeIcon={Sparkles}
        badgeText="Official Technology Partnership"
        title="Technology Partner: JobGen.AI"
        subtitle="Powering Homers Emerton with cutting-edge digital experiences, bringing next-generation web performance and interactive technology to Western Sydney's favorite takeaway."
        className="py-16 px-4 sm:px-6 text-center"
      />

      {/* 2. MAIN CONTENT (COMPACT & POLISHED) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Partnership Intro Card */}
        <div className="p-8 sm:p-10 rounded-[28px] bg-charcoal-50 border border-cream/10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-orange-burnt/10 blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-burnt/10 border border-orange-burnt/30 text-orange-glow text-xs font-mono font-bold tracking-wider uppercase">
              <Cpu className="w-3.5 h-3.5 text-orange-glow" />
              <span>Digital Craftsmanship</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-cream">
              Traditional Kitchen Mastery Meets Next-Gen Web Tech
            </h2>
            <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
              For over a decade, <strong>Homers Emerton</strong> has been celebrated across Western Sydney for hot, flame-grilled burgers, crispy chicken salt chips, and hearty roasts. Through our partnership with <strong>JobGen.AI</strong>, we’ve brought the same uncompromising dedication to our digital storefront.
            </p>
            <p className="text-cream/70 text-sm leading-relaxed">
              JobGen.AI crafts bespoke digital platforms that empower local culinary legends with enterprise-grade speed, delightful micro-animations, and intelligent ordering workflows without losing the warm, welcoming touch of the neighborhood shop.
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-cream mb-2">
              What JobGen.AI Powers at Homers
            </h3>
            <p className="text-xs sm:text-sm text-cream/60">
              Designed specifically to make ordering fast, joyful, and effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-charcoal-50/80 border border-cream/10 hover:border-orange-burnt/40 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-burnt/15 border border-orange-burnt/30 flex items-center justify-center text-orange-glow">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-cream font-serif">
                      {cap.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-cream/70 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#120a06] border border-[#2e1d14]">
          {metrics.map((m, idx) => (
            <div key={idx} className="text-center p-3">
              <span className="block text-2xl sm:text-3xl font-mono font-bold text-orange-glow mb-1">
                {m.value}
              </span>
              <span className="block text-xs font-bold text-cream/90 uppercase tracking-wider">
                {m.label}
              </span>
              <span className="block text-[11px] text-cream/50 mt-0.5">
                {m.detail}
              </span>
            </div>
          ))}
        </div>

        {/* JobGen.AI Callout & Links */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1f130b] to-[#160d07] border border-[#f08a2c]/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-lg font-bold font-mono tracking-wider text-[#f08a2c]">JOBGEN.AI</span>
            </div>
            <p className="text-xs sm:text-sm text-cream/70 max-w-md">
              Learn more about how JobGen.AI builds bespoke web applications, AI tools, and high-performance digital flagships.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://jobgen.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#f08a2c] hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-2 shadow-md hover:scale-105"
            >
              <span>Visit JobGen.AI</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/menu"
              className="px-5 py-2.5 rounded-full border border-cream/20 hover:border-cream/50 text-cream/90 hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 inline-flex items-center gap-1.5"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
