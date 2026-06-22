"use client";

import * as React from "react";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";

// Define the service content schema
interface ServiceData {
  slug: string;
  title: string;
  num: string;
  color: string;
  glowColor: string;
  bgFrom: string;
  tagline: string;
  intro: string;
  originTitle: string;
  originText: string;
  badges: string[];
  whoWeAreTitle: string;
  whoWeAreText: string;
  ourApproachTitle: string;
  ourApproachText: string;
  calloutQuote: string;
  beliefs: string[];
  mission: string;
  vision: string;
  deliverables: string[];
}

const servicesData: Record<string, ServiceData> = {
  "social-growth": {
    slug: "social-growth",
    title: "social growth",
    num: "01",
    color: "#8849a6",
    glowColor: "rgba(136, 73, 166, 0.1)",
    bgFrom: "from-[#8849a6]/10",
    tagline: "social media is your storefront. make it unforgettable.",
    intro: "We scale your brand's digital presence, turning attention into organic growth and loyal community support.",
    originTitle: "why social growth matters.",
    originText: "In a world where attention is the new currency, your social media presence is the storefront. We construct custom tailored content strategies that don't just chase temporary virality, but build long-term brand equity and community trust.",
    badges: ["Content Creation", "Community Management", "Platform Growth", "Audience Engagement", "Short-Form Video"],
    whoWeAreTitle: "our methodology",
    whoWeAreText: "We combine data-driven platform analytics with cultural trends and native content formats. From high-retention reels and TikToks to aesthetic feed design, we ensure every post tells a story that resonates with your target demographic.",
    ourApproachTitle: "platform specialization",
    ourApproachText: "We optimize across Instagram, TikTok, LinkedIn, and YouTube, customizing content structures for each algorithm. We handle everything from scripts, styling, scheduling, to active community response management.",
    calloutQuote: "Content isn't just about posting; it's about starting a conversation. We build social ecosystems that work for your brand 24/7.",
    beliefs: [
      "Consistency dictates organic algorithmic reach",
      "Storytelling converts viewers into advocates",
      "High-quality content beats spam posting",
      "Active engagement builds real relationships"
    ],
    mission: "To establish your brand as a dominant, highly engaged authority on key social channels.",
    vision: "To construct organic channels that generate consistent, high-intent inbound interest for your products and services.",
    deliverables: [
      "social media strategy & audit",
      "content calendar design & planning",
      "aesthetic feed curation & grid styling",
      "high-retention reels/tiktok production",
      "community response & engagement tracking",
      "monthly analytics & growth reporting"
    ]
  },
  "branding": {
    slug: "branding",
    title: "branding",
    num: "02",
    color: "#FF3366",
    glowColor: "rgba(255, 51, 102, 0.1)",
    bgFrom: "from-[#FF3366]/10",
    tagline: "design is the silent ambassador of your brand.",
    intro: "We define and build your visual identity, creating a cohesive, memorable, and premium brand experience.",
    originTitle: "designing identity.",
    originText: "A brand is more than just a logo; it is the gut feeling a person has when they interact with your business. We engineer comprehensive identity systems, color theories, and typographic hierarchies that align with your core values and make you stand out instantly.",
    badges: ["Logo Design", "Brand Guidelines", "Typography", "Color Palettes", "Visual System", "Web Design"],
    whoWeAreTitle: "our methodology",
    whoWeAreText: "We dive deep into your company's mission and audience psychology to craft custom visual guides. We design responsive, high-end websites that serve as the central hub of your digital identity, ensuring consistency across all touchpoints.",
    ourApproachTitle: "brand guidelines",
    ourApproachText: "We deliver a comprehensive brand book detailing your typography pairings, secondary visual elements, design rules, and logo spacing, enabling you or your team to easily maintain a clean aesthetic across future projects.",
    calloutQuote: "Design is the silent ambassador of your brand. We make sure yours speaks with authority, elegance, and unmistakable premium quality.",
    beliefs: [
      "Simplicity is the ultimate sophistication",
      "Consistency builds recognition and trust",
      "Every design detail should serve a purpose",
      "Emotion drives memorable brand recall"
    ],
    mission: "To build cohesive, premium visual identities that demand attention and command premium pricing.",
    vision: "To craft iconic brands that stand the test of time, remaining recognizable and relevant through industry shifts.",
    deliverables: [
      "premium logo design & marks",
      "brand identity design systems",
      "custom typography & color palette",
      "comprehensive brand guidelines book",
      "bespoke website design & aesthetic",
      "collateral, stationery & packaging mockup"
    ]
  },
  "performance-marketing": {
    slug: "performance-marketing",
    title: "performance marketing",
    num: "03",
    color: "#00C853",
    glowColor: "rgba(0, 200, 83, 0.1)",
    bgFrom: "from-[#00C853]/10",
    tagline: "marketing without data is like driving with your eyes closed.",
    intro: "We run hyper-targeted campaigns that drive qualified leads, maximize return on ad spend, and scale revenue.",
    originTitle: "data-driven scaling.",
    originText: "Stop guessing where your advertising budget goes. We build highly optimized funnel strategies across Meta, Google, and TikTok that turn advertising spend into predictable, measurable business revenue and volume growth.",
    badges: ["Meta Ads", "Google Search/GDN", "A/B Testing", "ROAS Optimization", "Conversion Funnels", "Retargeting"],
    whoWeAreTitle: "our methodology",
    whoWeAreText: "We track every click and conversion, refining targeting settings and creative hooks in real-time. By segmenting cold, warm, and hot audiences, we ensure ad spend is deployed with maximum efficiency and minimal waste.",
    ourApproachTitle: "continuous optimization",
    ourApproachText: "We run rigorous A/B creative testing, landing page experiments, and copy variations. We provide weekly transparent reports so you see exactly how your metrics are trending and how we plan to scale the next phase.",
    calloutQuote: "Marketing without data is like driving with your eyes closed. We run campaigns with clear sight, focus, and a direct path to scaling revenue.",
    beliefs: [
      "Data reveals truth, guesswork burns cash",
      "Creative matches targeting in performance value",
      "A converting landing page multiplies ad efficiency",
      "Constant iteration leads to sustained ROAS"
    ],
    mission: "To generate consistent, high-converting customer acquisition streams that fuel business growth.",
    vision: "To become the engine that scales your advertising from pilot budgets to seven-figure run rates.",
    deliverables: [
      "meta ads (instagram & facebook) setup",
      "google search & display network campaigns",
      "audience mapping & retargeting funnels",
      "rigorous a/b creative & landing page testing",
      "daily budget management & optimization",
      "transparent analytics dashboard"
    ]
  },
  "ai-creative-studio": {
    slug: "ai-creative-studio",
    title: "ai creative studio",
    num: "04",
    color: "#FF9100",
    glowColor: "rgba(255, 145, 0, 0.1)",
    bgFrom: "from-[#FF9100]/10",
    tagline: "ai gives us speed; human creativity gives us soul.",
    intro: "We produce scroll-stopping visuals, UGC videos, and marketing creatives using advanced AI and human direction.",
    originTitle: "the future of content.",
    originText: "In a world of infinite scroll, you have less than 1.5 seconds to capture a viewer's attention. We combine generative AI tools with cinematic workflows to produce high-retention visual assets that stand out in any feed.",
    badges: ["Generative AI Visuals", "AI Voice Over", "UGC Style Production", "Scroll-Stoppers", "Motion Design", "3D Rendering"],
    whoWeAreTitle: "our methodology",
    whoWeAreText: "We map current trends, draft scripts with high-retention hooks, and leverage AI to scale visual production. This lets us generate multiple creative variants rapidly, testing what performs best without massive traditional budget constraints.",
    ourApproachTitle: "hybrid creative direction",
    ourApproachText: "While AI drives speed and visual rendering, human directors refine the messaging, brand alignment, and emotional appeal. The result is a perfect balance of cutting-edge tech and raw storytelling.",
    calloutQuote: "AI gives us speed; human creativity gives us soul. Together, we build content that stops the scroll and starts the conversion.",
    beliefs: [
      "AI is a powerful force multiplier for human design",
      "The first 2 seconds of a video determine its value",
      "High volume of creative assets wins the feed",
      "Visual storytelling must connect to product utility"
    ],
    mission: "To deliver high-impact, fast-turnaround creative assets that outperform traditional studio timelines and budgets.",
    vision: "To pioneer a new era of AI-integrated marketing production that keeps your brand at the absolute cutting edge.",
    deliverables: [
      "ai ugc video generation & synthesis",
      "generative marketing visuals & imagery",
      "motion graphics & high-converting ad layouts",
      "ai voice-overs & sound design editing",
      "creative variation scaling & rapid assets",
      "high-retention video script-writing"
    ]
  },
  "automation": {
    slug: "automation",
    title: "automation",
    num: "05",
    color: "#6200EA",
    glowColor: "rgba(98, 0, 234, 0.1)",
    bgFrom: "from-[#6200EA]/10",
    tagline: "speed to lead is the number one predictor of sales success.",
    intro: "We streamline operations with intelligent, automated systems, saving time and closing leads faster.",
    originTitle: "operate at lightspeed.",
    originText: "Your team shouldn't spend hours on repetitive follow-ups, manual scheduling, or copy-pasting lead data. We build custom-integrated automation systems that connect your marketing directly to instant response channels.",
    badges: ["WhatsApp Automation", "AI Voice Agents", "CRM Integrations", "Zapier/Make Workflows", "Lead Nurturing", "Automated Booking"],
    whoWeAreTitle: "our methodology",
    whoWeAreText: "We map your entire customer journey from click to close. Then, we implement systems like WhatsApp drip sequences, automated email follow-ups, and calendar syncs that engage leads within 60 seconds of submission.",
    ourApproachTitle: "conversational ai",
    ourApproachText: "We configure custom-trained conversational agents that handle initial inquiries, answer FAQs, qualify leads, and schedule calls on autopilot, ensuring you never lose a hot prospect to delay.",
    calloutQuote: "Speed to lead is the number one predictor of sales success. Automation ensures your business responds instantly, day or night.",
    beliefs: [
      "Repetitive human tasks are system failures",
      "First-minute response increases conversions by 391%",
      "Integrations should be robust, simple, and clean",
      "Automation scales your team's capability without overhead"
    ],
    mission: "To replace manual, slow administrative workflows with seamless, instant, automated systems.",
    vision: "To build fully autonomous business frontends that capture, qualify, and book leads without manual intervention.",
    deliverables: [
      "automated whatsapp flow setups",
      "conversational ai voice booking agents",
      "crm integration & sync automation",
      "zapier / make customized workflow setups",
      "instant lead nurturing & automatic alerts",
      "hands-free email drip campaigns"
    ]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServicePage({ params }: PageProps) {
  const { slug } = React.use(params);
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const servicesOrder = [
    "social-growth",
    "branding",
    "performance-marketing",
    "ai-creative-studio",
    "automation"
  ];
  const currentIndex = servicesOrder.indexOf(slug);
  const nextIndex = (currentIndex + 1) % servicesOrder.length;
  const nextSlug = servicesOrder[nextIndex];
  const nextService = servicesData[nextSlug];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#050505] text-white select-none relative overflow-x-hidden pb-40">
        <Navbar />

        {/* Top Hero Spacing */}
        <div className="pt-[22vh] md:pt-[25vh] flex flex-col items-center justify-start px-6 md:px-12 lg:px-24">
          
          {/* Giant Title Container */}
          <div className="relative w-full max-w-[1400px] flex justify-center items-center select-none pointer-events-none mt-10 mb-20">
            <h1 
              className="text-[9vw] xs:text-[10vw] md:text-[12vw] font-bold text-white tracking-tighter relative z-10 lowercase text-center whitespace-normal break-words"
              style={{ 
                fontFamily: "var(--font-montserrat)", 
                letterSpacing: "-0.05em",
                lineHeight: "0.9"
              }}
            >
              {service.title}
            </h1>
          </div>

          {/* Plus Sign Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-4 mt-8 select-text"
          >
            <div 
              className="w-10 h-10 border flex items-center justify-center rounded-sm bg-white/5 transition-colors duration-300"
              style={{ borderColor: `${service.color}30` }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            
            <p className="text-sm font-sans tracking-widest text-white/50 text-center uppercase leading-relaxed">
              service {service.num}<br />growth-focused
            </p>
          </motion.div>

          {/* Vertical Line */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 80, opacity: 0.2 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-[1px] bg-white mt-10 mb-12"
          />

          {/* Intro Statement (Word-by-Word Hover) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full max-w-5xl text-center select-text pointer-events-auto"
          >
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] font-bold text-white tracking-tighter leading-snug lowercase"
              style={{ fontFamily: "var(--font-montserrat)", letterSpacing: "-0.04em" }}
            >
              {service.intro.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.28em]">
                  <span 
                    className="transition-colors duration-200 cursor-default"
                    style={{
                      // Custom hover via CSS variable or inline standard transitions
                      color: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = service.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "";
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </motion.div>

          {/* Spacer */}
          <div className="h-28 md:h-36" />

          {/* Main Grid Content */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch pointer-events-auto select-text">
            
            {/* Origin/Service Intro Card (Glassmorphic Card) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group"
            >
              {/* Dynamic top border glow overlay */}
              <div 
                className="absolute top-0 left-0 w-full h-[3px] opacity-50 group-hover:opacity-100 transition-opacity duration-500" 
                style={{
                  background: `linear-gradient(to right, transparent, ${service.color}, transparent)`
                }}
              />
              
              <div>
                <span 
                  className="text-xs uppercase tracking-widest font-semibold font-montserrat"
                  style={{ color: service.color }}
                >
                  overview
                </span>
                <h3 className="text-3xl font-bold font-montserrat mt-4 mb-6 leading-tight tracking-tight lowercase">
                  {service.originTitle}
                </h3>
                <p className="text-white/70 leading-relaxed font-sans text-base">
                  {service.originText}
                </p>
              </div>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-2.5 mt-8 select-none">
                {service.badges.map((badge, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-semibold px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/5 text-white/80 uppercase tracking-wider"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Who We Are & Our Approach */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8 justify-center"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-white/40 font-semibold font-montserrat">
                  {service.whoWeAreTitle}
                </span>
                <p className="text-base text-white/70 leading-relaxed font-sans">
                  {service.whoWeAreText}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-white/40 font-semibold font-montserrat">
                  {service.ourApproachTitle}
                </span>
                <p className="text-base text-white/70 leading-relaxed font-sans">
                  {service.ourApproachText}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Spacer */}
          <div className="h-24 md:h-32" />

          {/* Asymmetric Section: Partnership Callout */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl text-center pointer-events-auto select-text px-4"
          >
            <p className="text-xl sm:text-2xl text-white/60 leading-relaxed font-sans italic">
              &ldquo;{service.calloutQuote}&rdquo;
            </p>
          </motion.div>

          {/* Spacer */}
          <div className="h-24 md:h-32" />

          {/* Key Deliverables Header */}
          <div className="w-full max-w-6xl text-left mb-10 pointer-events-none select-none">
            <span className="text-xs uppercase tracking-widest text-white/40 font-semibold font-montserrat block mb-2">
              scope of work
            </span>
            <h3 
              className="text-4xl sm:text-5xl font-bold text-white tracking-tighter lowercase font-montserrat"
              style={{ letterSpacing: "-0.04em" }}
            >
              key deliverables.
            </h3>
          </div>

          {/* Key Deliverables Grid (6 items) */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto select-text items-stretch">
            {service.deliverables.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-8 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col justify-between gap-6 hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 group"
              >
                {/* Dynamic top border glow overlay */}
                <div 
                  className="absolute top-0 left-0 w-full h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{
                    background: `linear-gradient(to right, transparent, ${service.color}, transparent)`
                  }}
                />

                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold select-none font-montserrat" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <h4 className="text-lg font-bold font-montserrat tracking-tight leading-snug lowercase mt-2">
                  {item}
                </h4>
              </motion.div>
            ))}
          </div>

          {/* Spacer */}
          <div className="h-28 md:h-36" />

          {/* Next Service Link Section */}
          <div className="w-full max-w-[1400px] flex flex-col items-center justify-center select-none mt-10">
            <span className="text-xs uppercase tracking-widest text-white/40 font-semibold font-montserrat block mb-4">
              up next
            </span>
            <Link 
              href={`/services/${nextService.slug}`}
              className="group flex flex-col sm:flex-row items-center justify-center pointer-events-auto text-center gap-4 sm:gap-6 hover:scale-[1.02] transition-transform duration-300"
              style={{ 
                color: "white",
                transition: "color 0.3s ease, transform 0.3s ease" 
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = nextService.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
            >
              <h2 
                className="text-[10vw] md:text-[12vw] font-bold tracking-tighter leading-none lowercase"
                style={{ 
                  fontFamily: "var(--font-montserrat)", 
                  letterSpacing: "-0.05em",
                  lineHeight: "0.9"
                }}
              >
                {nextService.title}
              </h2>
              <span className="inline-block shrink-0">
                <svg 
                  className="w-[8vw] h-[8vw] md:w-[10vw] md:h-[10vw] transition-transform duration-300 group-hover:translate-x-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

        </div>

        {/* Footer Section */}
        <div className="mt-20 md:mt-32 w-full">
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
