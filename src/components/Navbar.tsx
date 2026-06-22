"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "about", target: 0.356 },
  { name: "dashboard", isDashboard: true },
  { name: "services", target: 0.509 },
  { name: "contact us", target: 0.880 },
];

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(false);
  const [isWhiteBg, setIsWhiteBg] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const isHome = window.location.pathname === "/";
        if (isHome) {
          // Home page logo visibility behavior
          if (window.scrollY > window.innerHeight * 0.4) {
            setShowLogo(true);
          } else {
            setShowLogo(false);
          }

          // Invert header colors when white background is visible under the navbar (between 125vh and 2.05vh scroll)
          if (window.scrollY > window.innerHeight * 1.25 && window.scrollY < window.innerHeight * 2.05) {
            setIsWhiteBg(true);
          } else {
            setIsWhiteBg(false);
          }
        } else {
          // Other pages (e.g. /about): always show logo, dark background headers
          setShowLogo(true);
          setIsWhiteBg(false);
        }
      }
    };
    
    // Check initial scroll on mount
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showComingSoon) {
      const timer = setTimeout(() => {
        setShowComingSoon(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showComingSoon]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full px-6 md:px-8 py-6 z-50 flex items-center justify-between"
      >
        <div className="flex-1">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                if (window.location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  window.location.href = "/";
                }
              }
            }}
            className="inline-block bg-transparent border-0 cursor-pointer p-0 outline-none align-middle"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={showLogo ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center"
            >
              <img
                src="/1.png"
                alt="CLIXS Logo"
                className="h-8 w-auto object-contain select-none"
              />
            </motion.div>
          </button>
        </div>
        
        {/* Desktop Menu links */}
        <div className="hidden md:flex items-center gap-8 font-normal text-sm" style={{ fontFamily: "var(--font-montserrat)" }}>
          {navLinks.map((link, i) => {
            const handleClick = (e: React.MouseEvent) => {
              e.preventDefault();
              if (link.isDashboard) {
                setShowComingSoon(true);
              } else if (link.target !== undefined) {
                if (typeof window !== 'undefined') {
                  if (window.location.pathname === "/") {
                    window.scrollTo({
                      top: window.innerHeight * 5.5 * link.target,
                      behavior: "smooth"
                    });
                  } else {
                    window.location.href = `/#scroll-${link.target}`;
                  }
                }
              }
            };

            return (
              <button
                key={i}
                onClick={handleClick}
                className={`group relative uppercase tracking-wide transition-colors duration-300 cursor-pointer bg-transparent border-0 p-0 outline-none font-medium ${
                  isWhiteBg ? "text-black" : "text-white"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 ease-out group-hover:w-full ${
                  isWhiteBg ? "bg-black" : "bg-white"
                }`}></span>
              </button>
            );
          })}
        </div>

        {/* Right side: CTA on desktop, Hamburger on mobile */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={showLogo ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            href="https://calendly.com/clixs-works/free-consultation-call?month=2026-06"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:inline-block px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
              isWhiteBg 
                ? "border-black text-black hover:bg-black hover:text-white" 
                : "border-white text-white hover:bg-white hover:text-black"
            }`}
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Get started
          </motion.a>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 z-50 cursor-pointer relative bg-transparent border-0 outline-none"
            aria-label="Toggle mobile menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-6 h-0.5 ${isWhiteBg && !isMenuOpen ? "bg-black" : "bg-white"}`}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`w-6 h-0.5 ${isWhiteBg && !isMenuOpen ? "bg-black" : "bg-white"}`}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-6 h-0.5 ${isWhiteBg && !isMenuOpen ? "bg-black" : "bg-white"}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#050505]/98 backdrop-blur-2xl z-40 flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            {/* Nav Links */}
            <div className="flex flex-col gap-6 text-left pl-4 mt-6">
              {navLinks.map((link, i) => {
                const handleClick = (e: React.MouseEvent) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  if (link.isDashboard) {
                    setShowComingSoon(true);
                  } else if (link.target !== undefined) {
                    if (typeof window !== 'undefined') {
                      if (window.location.pathname === "/") {
                        window.scrollTo({
                          top: window.innerHeight * 5.5 * link.target,
                          behavior: "smooth"
                        });
                      } else {
                        window.location.href = `/#scroll-${link.target}`;
                      }
                    }
                  }
                };

                return (
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    key={i}
                    onClick={handleClick}
                    className="text-4xl font-extrabold uppercase tracking-wider text-white hover:text-[#8849a6] transition-colors duration-300 text-left bg-transparent border-0 p-0 outline-none font-montserrat"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {link.name}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-6 w-full px-4 pb-8 border-t border-white/10 pt-8">
              <a
                href="https://calendly.com/clixs-works/free-consultation-call?month=2026-06"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-white text-black font-bold uppercase tracking-wider hover:bg-[#8849a6] hover:text-white transition-all duration-300"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Get started
              </a>

              {/* Socials & Info */}
              <div className="flex justify-between items-center text-xs text-white/50 font-sans">
                <a href="mailto:team@clixs.media" className="hover:text-white transition-colors">team@clixs.media</a>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/company/clixs-media" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="https://wa.link/pg1agm" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Toast Popup */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-3 pointer-events-auto"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8849a6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8849a6]"></span>
            </span>
            <span 
              className="text-white text-base font-semibold tracking-wide"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              dashboard coming soon...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
