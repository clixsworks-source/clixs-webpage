"use client";

import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  const introText = "At CLIXS, we believe marketing should be smarter, faster, and driven by real data—not guesswork.";

  const beliefs = [
    "Innovation over outdated marketing",
    "Data-driven decisions over assumptions",
    "Long-term growth over short-term wins",
    "Partnerships over client relationships",
  ];

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#050505] text-white select-none relative overflow-x-hidden pb-40">
        <Navbar />

        {/* Top Hero Spacing */}
        <div className="pt-[22vh] md:pt-[25vh] flex flex-col items-center justify-start px-6 md:px-12 lg:px-24">
          
          {/* Giant Title Container */}
          <div className="relative w-full max-w-[1400px] flex justify-center items-center select-none pointer-events-none mt-10 mb-20">
            <h1 
              className="text-[14vw] xs:text-[16vw] md:text-[20vw] font-bold text-white tracking-tighter relative z-10 lowercase"
              style={{ fontFamily: "var(--font-montserrat)", letterSpacing: "-0.05em" }}
            >
              about us
            </h1>
          </div>

          {/* Plus Sign Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-4 mt-8 select-text"
          >
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-sm bg-white/5 hover:bg-white/10 transition-colors duration-300">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            
            <p className="text-sm font-sans tracking-widest text-white/50 text-center uppercase leading-relaxed">
              Based in India,<br />operating worldwide
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
              {introText.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.28em]">
                  <span className="hover:text-[#8849a6] transition-colors duration-200 cursor-default">
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
            
            {/* Founders Section (Glassmorphic Card) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-between p-8 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group"
            >
              {/* Top border purple glow overlay */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#8849a6] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8849a6] font-semibold font-montserrat">
                  our origin
                </span>
                <h3 className="text-3xl font-bold font-montserrat mt-4 mb-6 leading-tight tracking-tight lowercase">
                  founded by three friends.
                </h3>
                <p className="text-white/70 leading-relaxed font-sans text-base">
                  CLIXS was created by <strong className="text-white font-bold">Harjot Singh</strong>, <strong className="text-white font-bold">Adarsh Preet Singh</strong>, and <strong className="text-white font-bold">Vansh</strong> with a simple vision: help businesses grow using the power of Artificial Intelligence, creativity, and modern digital strategies.
                </p>
              </div>

              {/* Founders Tag badges */}
              <div className="flex flex-wrap gap-2.5 mt-8 select-none">
                {["Harjot Singh", "Adarsh Preet Singh", "Vansh"].map((founder, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-semibold px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/5 text-white/80 uppercase tracking-wider"
                  >
                    {founder}
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
                  who we are
                </span>
                <p className="text-base text-white/70 leading-relaxed font-sans">
                  {"We are an "}
                  <strong className="text-[#8849a6] font-semibold">AI-Driven Marketing Agency</strong>
                  {" that combines cutting-edge technology with human creativity to build powerful brands, generate qualified leads, and deliver measurable business growth. From performance marketing and content creation to automation, branding, and website development, we help businesses scale efficiently in today's digital-first world."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-white/40 font-semibold font-montserrat">
                  our approach
                </span>
                <p className="text-base text-white/70 leading-relaxed font-sans">
                  Our approach is different. Instead of relying on traditional marketing methods, we use AI-powered insights, data-driven strategies, and innovative workflows to understand customer behavior, optimize campaigns, and maximize results.
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
              &ldquo;{"Whether you're a startup looking to build your presence or an established brand aiming to scale, we become an extension of your team—focused on delivering real impact, not just vanity metrics."}&rdquo;
            </p>
          </motion.div>

          {/* Spacer */}
          <div className="h-24 md:h-32" />

          {/* Beliefs, Mission, and Vision Section */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pointer-events-auto select-text items-stretch">
            
            {/* What We Believe */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col gap-6"
            >
              <h4 className="text-xl font-bold font-montserrat tracking-tight flex items-center gap-2 lowercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8849a6]" />
                what we believe.
              </h4>
              <ul className="flex flex-col gap-4 font-sans text-sm text-white/70">
                {beliefs.map((belief, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#8849a6] font-bold select-none mt-0.5">•</span>
                    <span>{belief}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col gap-4"
            >
              <h4 className="text-xl font-bold font-montserrat tracking-tight flex items-center gap-2 lowercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8849a6]" />
                our mission.
              </h4>
              <p className="font-sans text-sm text-white/70 leading-relaxed">
                To help businesses unlock their full potential through AI-powered marketing, automation, and creative digital experiences.
              </p>
            </motion.div>

            {/* Our Vision */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col gap-4"
            >
              <h4 className="text-xl font-bold font-montserrat tracking-tight flex items-center gap-2 lowercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8849a6]" />
                our vision.
              </h4>
              <p className="font-sans text-sm text-white/70 leading-relaxed">
                To become a leading AI-driven growth partner for ambitious brands worldwide.
              </p>
            </motion.div>

          </div>

          {/* Spacer */}
          <div className="h-28 md:h-36" />

          {/* Footer Callout Call to Action */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
            className="w-full max-w-4xl p-12 rounded-3xl bg-gradient-to-br from-[#12011f]/60 to-[#050505] border border-white/10 text-center pointer-events-auto flex flex-col items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(136,73,166,0.1)_0%,_transparent_70%)] pointer-events-none" />

            <h4 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tighter uppercase font-montserrat"
              style={{ letterSpacing: "-0.04em" }}
            >
              build. automate. scale.
            </h4>
            
            <div className="w-12 h-[1px] bg-white/20" />
            
            <p 
              className="text-lg sm:text-xl font-serif italic text-white/60 tracking-wider"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {"that's the clixs way."}
            </p>
          </motion.div>

        </div>

        {/* Footer Section */}
        <div className="mt-20 md:mt-32 w-full">
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
