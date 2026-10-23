/**
 * JOBGEN.AI PARTNER CONTENT SPECIFICATION
 * -------------------------------------------------------------
 * Single editable source of truth for all partner page content.
 * Strictly based on factual public information from https://jobgen.ai/.
 * No invented statistics, numbers, uptime claims, or client testimonials.
 */

export const PARTNER_CONTENT = {
  // Page Meta & SEO
  meta: {
    title: "Technology Partner | Homers Emerton",
    description: "Homers Emerton's website is powered by JobGen.AI, an Australian company building AI voice agents for reception, bookings and follow-up.",
  },

  // Banner Header (Reuses PageBanner with variant="story")
  banner: {
    badgeText: "Technology Partner",
    title: "Technology Partner: JobGen.AI",
    subtitle: "JobGen.AI builds AI voice agents that answer calls, book appointments and follow up for businesses.",
  },

  // Section 2: Intro Split
  intro: {
    badge: "ABOUT JOBGEN.AI",
    tagline: "Make your business automated",
    description: "JobGen.AI builds conversational AI voice agents that provide 24/7 reception, live appointment bookings, proactive sales outreach, and unified WhatsApp and CRM workflows.",
    logo: "/partners/jobgen/jobgen-white.webp",
    mockup: "/partners/jobgen/hero.webp",
    primaryBtn: {
      label: "Visit JobGen.AI",
      url: "https://jobgen.ai/",
    },
    demoBtn: {
      label: "Book a Demo",
      url: "https://calendly.com/jobgen-demo/30min",
    },
    floatingChips: [
      { name: "Jenny", role: "Reception", color: "emerald" },
      { name: "Olivia", role: "Sales", color: "orange" },
    ],
  },

  // Section 3: Meet the AI Workforce
  agents: {
    heading: "Meet the AI Workforce",
    subtitle: "Specialized voice agents configured for inbound customer care and proactive sales conversations.",
    list: [
      {
        id: "jenny",
        name: "Jenny",
        role: "AI Receptionist",
        tag: "Inbound",
        tagColor: "emerald",
        image: "/partners/jobgen/jenny-front.webp",
        alt: "Jenny, AI Receptionist for JobGen.AI - front-facing professional portrait",
        description: "Specialized in answering inbound phone enquiries and inbound sales with warm, verified accuracy.",
        bullets: [
          "Greets callers in your business name, answers approved questions and keeps the conversation moving.",
          "Checks live calendars, applies duration and staff rules, books or reschedules, and sends instant confirmations.",
        ],
      },
      {
        id: "olivia",
        name: "Olivia",
        role: "AI Sales Agent",
        tag: "Outbound",
        tagColor: "orange",
        image: "/partners/jobgen/olivia-front.webp",
        alt: "Olivia, AI Sales Agent for JobGen.AI - front-facing professional portrait",
        description: "Engineered for outbound sales outreach, qualification, and scheduled follow-up conversations.",
        bullets: [
          "Follows up with eligible contacts, qualifies customer interest, and arranges callbacks on a schedule you set.",
          "Connects WhatsApp messaging with voice workflows and captures intent directly into your CRM.",
        ],
      },
    ],
  },

  // Section 4: What They Can Do (9 Capability Photo Cards)
  capabilities: {
    heading: "What They Can Do",
    subtitle: "Voice, live calendars, instant messaging, and CRM data working together in one unified workflow.",
    callSamplesUrl: "https://jobgen.ai/#calls",
    items: [
      {
        id: "call-intake",
        title: "Every caller gets a useful answer",
        description: "Jenny greets callers in your business name, answers approved questions and keeps the conversation moving.",
        image: "/partners/jobgen/call-intake.webp",
        alt: "Friendly receptionist at front desk answering customer calls",
      },
      {
        id: "calendar-sync",
        title: "Live calendars, confirmed on the call",
        description: "Finds valid times, applies duration and staff rules, books or reschedules, and sends confirmations.",
        image: "/partners/jobgen/calendar-sync.webp",
        alt: "Professional checking calendar schedules on a modern tablet",
      },
      {
        id: "carrier-forward",
        title: "Keep your number, cover the calls you miss",
        description: "Forward unanswered, overflow or after-hours calls without changing the number customers know.",
        image: "/partners/jobgen/carrier-forward.webp",
        alt: "Smartphone on executive desk receiving an incoming customer call",
      },
      {
        id: "smart-routing",
        title: "The right calls reach the right person",
        description: "Urgent or high-value conversations trigger a live transfer or a handoff with context.",
        image: "/partners/jobgen/smart-routing.webp",
        alt: "Team members collaborating on intelligent customer call routing and handoffs",
      },
      {
        id: "website-voice",
        title: "A website that starts a conversation",
        description: "Website, AI chat and browser voice work together to answer questions and capture intent.",
        image: "/partners/jobgen/website-voice.webp",
        alt: "Customer browsing on laptop at a cafe",
      },
      {
        id: "inbound-voice",
        title: "Be there when customers call",
        description: "Inbound AI receptionist answers enquiries, takes messages and helps with appointments around the clock.",
        image: "/partners/jobgen/inbound-voice.webp",
        alt: "Warm front desk greeting at a customer reception counter",
      },
      {
        id: "outbound-voice",
        title: "Make the next conversation happen",
        description: "Follow up with eligible contacts, qualify interest and arrange callbacks on a schedule you set.",
        image: "/partners/jobgen/outbound-voice.webp",
        alt: "Executive conducting proactive outreach on phone by a city window",
      },
      {
        id: "whatsapp-voice",
        title: "Keep the conversation going",
        description: "Connects WhatsApp with the voice workflow for instant messaging and unified follow-up.",
        image: "/partners/jobgen/whatsapp-voice.webp",
        alt: "Person sending messages on smartphone at an outdoor terrace",
      },
      {
        id: "crm-leads",
        title: "Turn interest into an owned next step",
        description: "Captures contact details, intent and conversation summaries into your CRM.",
        image: "/partners/jobgen/crm-leads.webp",
        alt: "Widescreen desktop display showing real-time CRM analytics dashboard and sales pipeline",
      },
    ],
  },

  // Section 5: How It Works (3 Steps)
  howItWorks: {
    heading: "How It Works",
    subtitle: "Three guided steps to go from business documentation to live automated voice workflows.",
    steps: [
      {
        number: "01",
        title: "Ingest verified business knowledge",
        description: "Upload service menu, pricing guidelines, opening hours; define approved answers.",
        image: "/partners/jobgen/cp-1.webp",
        alt: "Audio equipment and waveform display representing knowledge ingestion",
      },
      {
        number: "02",
        title: "Define required intake and escalation rules",
        description: "Set qualification fields, conditional escalation for VIPs, and routing guidelines.",
        image: "/partners/jobgen/cp-2.webp",
        alt: "Compliance and security status verification displayed on a tablet",
      },
      {
        number: "03",
        title: "Test in a sandbox, then go live",
        description: "Try phone interactions in the browser, review recordings and CRM entries, then point your existing phone lines.",
        image: "/partners/jobgen/cp-6.webp",
        alt: "Voice interaction sandbox testing with audio stream diagnostics",
      },
    ],
  },

  // Section 6: Safe by Design (4 Items)
  safeByDesign: {
    heading: "Built to stay accurate and accountable",
    subtitle: "Built-in guardrails and verification protocols ensure every interaction stays on-script and auditable.",
    items: [
      {
        icon: "ShieldCheck",
        title: "Approved facts only",
        description: "Only speaks approved business facts, never makes up pricing, policies or availability.",
      },
      {
        icon: "UserCheck",
        title: "Identity checks",
        description: "Can require details such as date of birth or an account number before sharing customer-specific information.",
      },
      {
        icon: "PhoneForwarded",
        title: "Warm failover",
        description: "Urgent callers are transferred to a person with a pre-briefed summary.",
      },
      {
        icon: "FileText",
        title: "Audit trail",
        description: "Call audio, transcripts and recording consent are logged.",
      },
    ],
  },

  // Section 7: Works With (Plain text chips, NO logos)
  worksWith: {
    heading: "Works With Your Existing Tools",
    subtitle: "Connects with the messaging, scheduling, and customer management platforms your team already relies on.",
    platforms: [
      "WhatsApp",
      "Microsoft Teams",
      "HubSpot",
      "Google Drive",
      "Slack",
      "LinkedIn",
      "Calendly",
      "Dropbox",
      "Notion",
      "Airtable",
      "Mailchimp",
      "Stripe",
      "Zapier",
      "Salesforce",
      "Google Calendar",
      "MYOB",
    ],
  },

  // Section 8: Industries Served (Tags)
  industries: {
    heading: "Industries Served",
    tags: [
      "Plumbing",
      "Electricians",
      "Home services",
      "Construction",
      "Accounting",
      "Legal",
      "Real estate",
      "Mortgage brokers",
      "Medical",
      "Dental",
      "NDIS providers",
      "Automotive",
    ],
  },

  // Section 9: Built for Homers (Verified features on this site ONLY)
  builtForHomers: {
    heading: "On the Homers website",
    subtitle: "Real digital capabilities built into this site to serve Western Sydney takeaway customers:",
    features: [
      {
        title: "Online Ordering",
        description: "Slide-out cart drawer, live calculation of order totals, and persistent order review.",
      },
      {
        title: "Interactive Burger Builder",
        description: "Custom visual sandwich assembly tool with ingredient stacking and itemized pricing.",
      },
      {
        title: "Catering Enquiries",
        description: "Party food packages and dedicated booking enquiry modal for community gatherings.",
      },
      {
        title: "WhatsApp Ordering",
        description: "Direct WhatsApp messaging checkout for quick mobile orders.",
      },
      {
        title: "AI Chat Assistant",
        description: "On-site interactive food guide answering menu questions and helping with orders.",
      },
      {
        title: "Live Open / Closed Status",
        description: "Sydney time-zone aware operating schedule showing current takeaway availability.",
      },
    ],
  },

  // Section 10: CTA Card & Contact
  cta: {
    heading: "Talk to JobGen.AI",
    description: "Automate your customer reception, appointment booking, and sales follow-up.",
    demoBtn: {
      label: "Book a Demo",
      url: "https://calendly.com/jobgen-demo/30min",
    },
    visitBtn: {
      label: "Visit JobGen.AI",
      url: "https://jobgen.ai/",
    },
    email: "hello@jobgen.ai",
    address: "Suite 306, 60 Martin Place, Sydney NSW 2000, Australia",
    privacyUrl: "https://jobgen.ai/privacy/",
    termsUrl: "https://jobgen.ai/terms/",
    cityBg: "/partners/jobgen/city.webp",
  },

  // Footer Disclaimers
  footerNote: "Information about JobGen.AI is based on jobgen.ai. Visit their site for the latest details.",
  imageCredit: "Images courtesy of JobGen.AI",
};
