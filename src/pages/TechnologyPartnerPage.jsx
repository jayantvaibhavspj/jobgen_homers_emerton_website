import React, { useEffect } from 'react';
import PageBanner from '../components/banner/PageBanner';
import PartnerIntro from '../components/partner/PartnerIntro';
import AgentCards from '../components/partner/AgentCards';
import CapabilityGrid from '../components/partner/CapabilityGrid';
import HowItWorks from '../components/partner/HowItWorks';
import SafeByDesign from '../components/partner/SafeByDesign';
import WorksWith from '../components/partner/WorksWith';
import BuiltForHomers from '../components/partner/BuiltForHomers';
import PartnerCTA from '../components/partner/PartnerCTA';
import { PARTNER_CONTENT } from '../data/partner.content';

export default function TechnologyPartnerPage() {
  const { meta, banner } = PARTNER_CONTENT;

  // Dynamically update page title and factual meta description for SEO
  useEffect(() => {
    document.title = meta.title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const previousDesc = metaDesc.getAttribute('content');
    metaDesc.setAttribute('content', meta.description);

    return () => {
      document.title = 'Homers Emerton | Hot, Fresh Takeaway Burgers, Fish & Chips, Curries & Roasts';
      if (previousDesc) {
        metaDesc.setAttribute('content', previousDesc);
      }
    };
  }, [meta]);

  return (
    <div className="pt-24 min-h-screen bg-charcoal text-cream selection:bg-orange-burnt selection:text-white">
      {/* 1. HEADER BANNER (Retained variant="story" with charcoal spit and milkshake decor) */}
      <PageBanner
        variant="story"
        badgeText={banner.badgeText}
        title={banner.title}
        subtitle={banner.subtitle}
        className="py-16 px-4 sm:px-6 text-center"
      />

      {/* 2. REBUILT PHOTO-LED PARTNER SECTIONS */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Intro Split Card */}
        <PartnerIntro />

        {/* Meet the AI Workforce (Jenny & Olivia) */}
        <AgentCards />

        {/* 9 Capability Photo Cards Grid */}
        <CapabilityGrid />

        {/* How It Works (01 - 02 - 03 Flow with Checkpoints) */}
        <HowItWorks />

        {/* Safe by Design (4 Compact Cards) */}
        <SafeByDesign />

        {/* Works With Ecosystem & Industries */}
        <WorksWith />

        {/* Built for Homers (Verified Features Only) */}
        <BuiltForHomers />

        {/* CTA Card with City Backdrop, Contact, and Legal Links */}
        <PartnerCTA />
      </main>
    </div>
  );
}
