"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import GalaxyStars from "./GalaxyStars";
import Cases from "./Cases";
import InteractiveReviews from "./InteractiveReviews";
import TypingText from "./TypingText";
import ContactForm from "./ContactForm";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const videoSrc = mounted && isMobile ? "/mobile-web.mp4" : "/website-video.mp4";

  // Track scroll progress of the Hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map progress of the first 4 sections (original 400vh out of new 550vh scroll distance)
  // 400 / 550 = 0.727272
  const originalScrollProgress = useTransform(scrollYProgress, [0, 0.727272], [0, 1.0]);

  // Helper to negate translateY values for fixed backdrop portal effect
  const negateY = (val: string) => {
    const num = parseFloat(val) || 0;
    return `${-num}vh`;
  };

  // Map scroll progress to the exact size and position of the video
  // Phase 1 (0 to 0.266): scale to full screen
  const videoWidth = useTransform(originalScrollProgress, (v) => {
    if (isMobile) return "100vw";
    const startWidth = 25;
    if (v < 0.266) {
      const p = v / 0.266;
      return `${startWidth + (100 - startWidth) * p}vw`;
    }
    return "100vw";
  });

  const videoHeight = useTransform(originalScrollProgress, (v) => {
    if (isMobile) return "100vh";
    if (v < 0.266) {
      const p = v / 0.266;
      return `calc(62vw + (100vh - 62vw) * ${p})`;
    }
    return "100vh";
  });

  const videoY = useTransform(originalScrollProgress, (v) => {
    if (isMobile) return "0vh";
    const startY = 42; // vh units
    if (v < 0.266) {
      const p = v / 0.266;
      return `${startY * (1 - p)}vh`;
    }
    return "0vh";
  });
  const borderRadius = useTransform(originalScrollProgress, [0, 0.266], [isMobile ? "0px" : "16px", "0px"]);

  // Fade and scale out other UI elements as video goes full-screen (Phase 1)
  const textOpacity = useTransform(originalScrollProgress, [0, 0.186], [1, isMobile ? 0.35 : 0]);
  const textY = useTransform(originalScrollProgress, (v) => {
    const endY = isMobile ? 0 : -60; // vh units
    if (v < 0.240) {
      const p = v / 0.240;
      return `${endY * p}vh`;
    }
    return `${endY}vh`;
  });
  const textScale = useTransform(originalScrollProgress, [0, 0.240], [1, 0.8]);

  // Staggered white curtain panels (Phase 2)
  const panel1Y = useTransform(originalScrollProgress, [0.266, 0.400], ["100vh", "0vh"], { clamp: true });
  const panel2Y = useTransform(originalScrollProgress, [0.288, 0.421], ["100vh", "0vh"], { clamp: true });
  const panel3Y = useTransform(originalScrollProgress, [0.309, 0.442], ["100vh", "0vh"], { clamp: true });
  const panel4Y = useTransform(originalScrollProgress, [0.330, 0.464], ["100vh", "0vh"], { clamp: true });
  const panel5Y = useTransform(originalScrollProgress, [0.352, 0.485], ["100vh", "0vh"], { clamp: true });

  // About Content (Phase 2 & 3)
  const aboutY = useTransform(originalScrollProgress, [0.266, 0.280, 0.380, 0.512, 0.608], ["100vh", "100vh", "0vh", "0vh", "-100vh"], { clamp: true });

  // Staggered black panels (Phase 3)
  const blackPanel1Y = useTransform(originalScrollProgress, [0.512, 0.592], ["100vh", "0vh"], { clamp: true });
  const blackPanel2Y = useTransform(originalScrollProgress, [0.524, 0.604], ["100vh", "0vh"], { clamp: true });
  const blackPanel3Y = useTransform(originalScrollProgress, [0.536, 0.616], ["100vh", "0vh"], { clamp: true });
  const blackPanel4Y = useTransform(originalScrollProgress, [0.548, 0.628], ["100vh", "0vh"], { clamp: true });
  const blackPanel5Y = useTransform(originalScrollProgress, [0.560, 0.640], ["100vh", "0vh"], { clamp: true });

  // Cases Content (Phase 3)
  const casesDisplay = useTransform(originalScrollProgress, (v) => (v >= 0.608 && v < 0.940 ? "block" : "none"));

  // Staggered final white panels (Phase 4)
  // Starts right after horizontal scroll finishes at 0.792 for a seamless, smooth transition
  const finalWhitePanel1Y = useTransform(originalScrollProgress, [0.800, 0.880], ["100vh", "0vh"], { clamp: true });
  const finalWhitePanel2Y = useTransform(originalScrollProgress, [0.815, 0.895], ["100vh", "0vh"], { clamp: true });
  const finalWhitePanel3Y = useTransform(originalScrollProgress, [0.830, 0.910], ["100vh", "0vh"], { clamp: true });
  const finalWhitePanel4Y = useTransform(originalScrollProgress, [0.845, 0.925], ["100vh", "0vh"], { clamp: true });
  const finalWhitePanel5Y = useTransform(originalScrollProgress, [0.860, 0.940], ["100vh", "0vh"], { clamp: true });

  // Custom easeOut function (cubic bezier) for smooth curtain sliding
  const cubicEaseOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Staggered dark panels for the new section transition (Phase 5)
  const newPanel1Y = useTransform(scrollYProgress, [0.740, 0.790], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });
  const newPanel2Y = useTransform(scrollYProgress, [0.748, 0.798], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });
  const newPanel3Y = useTransform(scrollYProgress, [0.756, 0.806], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });
  const newPanel4Y = useTransform(scrollYProgress, [0.764, 0.814], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });
  const newPanel5Y = useTransform(scrollYProgress, [0.772, 0.820], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });

  // Staggered black panels for transition to Footer (Phase 6)
  const footerPanel1Y = useTransform(scrollYProgress, [0.900, 0.930], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });
  const footerPanel2Y = useTransform(scrollYProgress, [0.905, 0.935], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });
  const footerPanel3Y = useTransform(scrollYProgress, [0.910, 0.940], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });
  const footerPanel4Y = useTransform(scrollYProgress, [0.915, 0.945], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });
  const footerPanel5Y = useTransform(scrollYProgress, [0.920, 0.950], ["100vh", "0vh"], { clamp: true, ease: cubicEaseOut });

  // Final White Section Content (Phase 4)
  // 0.940 * 0.727272 = 0.6836
  const finalWhiteDisplay = useTransform(scrollYProgress, (v) => (v >= 0.6836 && v < 0.820 ? "flex" : "none"));

  // New Galaxy Section Content (Phase 5)
  const newSectionDisplay = useTransform(scrollYProgress, (v) => (v >= 0.820 && v < 0.950 ? "flex" : "none"));

  // Footer Section Content (Phase 6)
  const footerSectionDisplay = useTransform(scrollYProgress, (v) => (v >= 0.950 ? "flex" : "none"));

  // Footer text display
  const footerTextDisplay = useTransform(scrollYProgress, (v) => (v >= 0.900 ? "flex" : "none"));

  const footerTextY = useTransform(scrollYProgress, [0.900, 0.940], ["100vh", "0vh"], { clamp: true });

  const [showTyping, setShowTyping] = useState(false);
  const [typingKey, setTypingKey] = useState(0);

  // Track when the galaxy section becomes visible to trigger typing
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v >= 0.820 && v < 0.950 && !showTyping) {
        setShowTyping(true);
        setTypingKey((k) => k + 1);
      } else if ((v < 0.820 || v >= 0.950) && showTyping) {
        setShowTyping(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, showTyping]);

  // Hash scroll listener for cross-page redirects
  useEffect(() => {
    const handleHashScroll = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        if (hash && hash.startsWith("#scroll-")) {
          const targetPercent = parseFloat(hash.split("-")[1]);
          if (!isNaN(targetPercent)) {
            setTimeout(() => {
              window.scrollTo({
                top: window.innerHeight * 5.5 * targetPercent,
                behavior: "smooth"
              });
              // Clear hash to prevent re-scroll on page refresh
              window.history.replaceState(null, "", window.location.pathname);
            }, 600);
          }
        }
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title staggered reveal
      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.fromTo(
          titleChars,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleText = "CLIXS";

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[650vh] bg-[#050505]"
    >
      {/* Sticky container to keep items visible during scroll scaling */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Fixed Viewport Background Gradient */}
        <div className="absolute inset-0 z-0 galaxy-bg pointer-events-none" />
        <GalaxyStars />

        {/* Background oversized text */}
        <motion.h1
          ref={titleRef}
          style={{
            fontFamily: "var(--font-montserrat)",
            opacity: textOpacity,
            scale: textScale,
            y: textY,
          }}
          className="absolute top-[68vh] md:top-[0vh] left-0 w-full px-4 sm:px-8 md:px-12 flex justify-between font-bold text-white text-[22vw] sm:text-[25vw] md:text-[30vw] leading-none z-10 select-none pointer-events-none"
        >
          {titleText.split("").map((char, i) => (
            <span key={i} className="char inline-block">
              {char}
            </span>
          ))}
        </motion.h1>

        {/* Scroll-scaling Video */}
        <motion.div
          style={{
            width: videoWidth,
            height: videoHeight,
            borderRadius: borderRadius,
            y: videoY,
            x: "-50%",
          }}
          className="absolute left-1/2 top-0 z-[5] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          {videoSrc && (
            <video
              key={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </motion.div>

        {/* Staggered White Curtain Panels (z-[25]) */}
        <div className="absolute inset-0 z-[25] flex pointer-events-none select-none">
          <motion.div style={{ y: panel1Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-white will-change-transform" />
          <motion.div style={{ y: panel2Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-white will-change-transform" />
          <motion.div style={{ y: panel3Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-white will-change-transform" />
          <motion.div style={{ y: panel4Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-white will-change-transform" />
          <motion.div style={{ y: panel5Y }} className="w-[20.5vw] h-full bg-white will-change-transform" />
        </div>

        {/* About Section Content (z-30) */}
        <motion.div
          style={{
            y: aboutY,
            opacity: 1,
          }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center px-4 xs:px-6 md:px-12 lg:px-24 pointer-events-none select-none"
        >
          <div className="w-full max-w-5xl pointer-events-auto flex flex-col items-center gap-2 md:gap-3">
            <span
              className="text-xl md:text-3xl font-serif italic text-black/60"
              style={{ fontFamily: "Georgia, serif" }}
            >
              about.
            </span>
            <h2
              className="text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight leading-snug text-center font-montserrat"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {"We are a growth-focused digital marketing agency, helping businesses attract, convert, and scale through data-driven marketing strategies and high-performing digital experiences."
                .split(" ")
                .map((word, i) => (
                  <span key={i} className="inline-block mr-[0.28em]">
                    <span className="hover:text-[#8849a6] transition-colors duration-200 cursor-default">
                      {word}
                    </span>
                  </span>
                ))}
            </h2>

            {/* Asymmetrical Right-Aligned Subtext and Button */}
            <div className="w-full flex justify-center md:justify-end mt-2 md:mt-4">
              <div className="w-full md:max-w-md flex flex-col items-center md:items-start gap-3 md:gap-2 text-center md:text-left">
                <p className="text-[10px] xs:text-xs md:text-sm text-black/75 leading-relaxed font-sans">
                  {"From strategic planning and performance marketing to website development and conversion optimization, we help brands turn attention into measurable growth, generate qualified leads, and build a stronger online presence."
                    .split(" ")
                    .map((word, i) => (
                      <span key={i} className="inline-block mr-[0.28em]">
                        <span className="hover:text-[#8849a6] transition-colors duration-200 cursor-default">
                          {word}
                        </span>
                      </span>
                    ))}
                </p>
                <Link href="/about" className="inline-block pointer-events-auto">
                  <button
                    className="px-5 py-1.5 md:px-6 md:py-2 rounded-full border border-black text-black text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-black hover:text-white hover:scale-105 cursor-pointer font-montserrat"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    more about us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Staggered Black Curtain Panels (z-[35]) */}
        <div className="absolute inset-0 z-[35] flex pointer-events-none select-none">
          <motion.div style={{ y: blackPanel1Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-black will-change-transform" />
          <motion.div style={{ y: blackPanel2Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-black will-change-transform" />
          <motion.div style={{ y: blackPanel3Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-black will-change-transform" />
          <motion.div style={{ y: blackPanel4Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-black will-change-transform" />
          <motion.div style={{ y: blackPanel5Y }} className="w-[20.5vw] h-full bg-black will-change-transform" />
        </div>

        {/* Cases Section Content (z-40) */}
        <motion.div
          style={{
            display: casesDisplay,
            opacity: 1,
          }}
          className="absolute inset-0 z-40 pointer-events-auto"
        >
          <Cases scrollYProgress={originalScrollProgress} />
        </motion.div>

        {/* Staggered Final Light Gray Curtain Panels (z-[45]) */}
        <div className="absolute inset-0 z-[45] flex pointer-events-none select-none">
          <motion.div style={{ y: finalWhitePanel1Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-[#F3F3F3] will-change-transform" />
          <motion.div style={{ y: finalWhitePanel2Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-[#F3F3F3] will-change-transform" />
          <motion.div style={{ y: finalWhitePanel3Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-[#F3F3F3] will-change-transform" />
          <motion.div style={{ y: finalWhitePanel4Y }} className="w-[20.5vw] -mr-[0.5vw] h-full bg-[#F3F3F3] will-change-transform" />
          <motion.div style={{ y: finalWhitePanel5Y }} className="w-[20.5vw] h-full bg-[#F3F3F3] will-change-transform" />
        </div>

        {/* Final Interactive Reviews Section Content (z-50) */}
        <motion.div
          style={{
            display: finalWhiteDisplay,
            opacity: 1,
          }}
          className="absolute inset-0 z-50 pointer-events-auto bg-[#F3F3F3]"
        >
          <InteractiveReviews />
        </motion.div>

        {/* Staggered Dark Curtain Panels to Transition to New Section (z-[55]) */}
        <div className="absolute inset-0 z-[55] flex pointer-events-none select-none overflow-hidden">
          <motion.div style={{ y: newPanel1Y }} className="w-[20.5%] -mr-[0.5%] h-full overflow-hidden relative will-change-transform">
            <motion.div style={{ y: useTransform(newPanel1Y, negateY), left: "0%" }} className="absolute top-0 w-[500%] h-full galaxy-bg" />
          </motion.div>
          <motion.div style={{ y: newPanel2Y }} className="w-[20.5%] -mr-[0.5%] h-full overflow-hidden relative will-change-transform">
            <motion.div style={{ y: useTransform(newPanel2Y, negateY), left: "-100%" }} className="absolute top-0 w-[500%] h-full galaxy-bg" />
          </motion.div>
          <motion.div style={{ y: newPanel3Y }} className="w-[20.5%] -mr-[0.5%] h-full overflow-hidden relative will-change-transform">
            <motion.div style={{ y: useTransform(newPanel3Y, negateY), left: "-200%" }} className="absolute top-0 w-[500%] h-full galaxy-bg" />
          </motion.div>
          <motion.div style={{ y: newPanel4Y }} className="w-[20.5%] -mr-[0.5%] h-full overflow-hidden relative will-change-transform">
            <motion.div style={{ y: useTransform(newPanel4Y, negateY), left: "-300%" }} className="absolute top-0 w-[500%] h-full galaxy-bg" />
          </motion.div>
          <motion.div style={{ y: newPanel5Y }} className="w-[20.5%] h-full overflow-hidden relative will-change-transform">
            <motion.div style={{ y: useTransform(newPanel5Y, negateY), left: "-400%" }} className="absolute top-0 w-[500%] h-full galaxy-bg" />
          </motion.div>
        </div>

        {/* New Galaxy Section Content (z-[60]) */}
        <motion.div
          style={{
            display: newSectionDisplay,
            opacity: 1,
          }}
          className="absolute inset-0 z-[60] pointer-events-auto galaxy-bg flex flex-col justify-start items-center px-4 xs:px-6 md:px-12 lg:px-24 pt-24 xs:pt-28 sm:pt-24 md:pt-32 pb-16 md:pb-0 overflow-y-auto md:overflow-hidden"
        >
          <GalaxyStars />
          
          <div className="w-full max-w-[1400px] relative z-10 px-0 flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-4 items-center md:items-start">
            <div className="w-full md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left gap-6 sm:gap-8">
              {showTyping && (
                <TypingText
                  key={typingKey}
                  text={"waiting for your next\nmove"}
                  arrowAfterWord={"next\n"}
                  arrowElement={
                    <span className="relative inline-flex flex-col items-center mx-3 align-middle">
                      <span 
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs md:text-[1.6vw] text-white select-none whitespace-nowrap italic tracking-wide"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        lets start
                      </span>
                      <svg width="360" height="24" viewBox="0 0 360 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block" style={{ minWidth: isMobile ? '24vw' : '12vw', width: isMobile ? '24vw' : '12vw', height: 'auto' }}>
                        <line x1="0" y1="12" x2="345" y2="12" stroke="rgba(255,255,255,1.0)" strokeWidth="2" />
                        <polyline points="335,4 348,12 335,20" fill="none" stroke="rgba(255,255,255,1.0)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                      </svg>
                    </span>
                  }
                  speed={70}
                  delay={400}
                  className="text-[9vw] xs:text-[8vw] md:text-[8.5vw] lg:text-[8vw] xl:text-[7.5vw] font-bold text-white leading-[1.2] md:leading-[1.0] lowercase tracking-tighter w-full whitespace-pre-line text-center md:text-left"
                  style={{ 
                    fontFamily: "var(--font-montserrat)", 
                    letterSpacing: "-0.05em" 
                  }}
                />
              )}

              {/* Contact Info & Socials Block */}
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="flex flex-col items-center md:items-start gap-4 text-white pointer-events-auto select-text w-full max-w-[360px] md:max-w-none"
                >
                  <span 
                    className="text-xl md:text-[2.2vw] text-white select-none whitespace-nowrap italic tracking-wide font-bold"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    contact.
                  </span>
                  
                  {/* Structured Glassmorphic Contact Box */}
                  <div className="w-full md:w-[36vw] md:max-w-[450px] bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all duration-300">
                    {/* Left: Contact Info */}
                    <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
                      <a 
                        href="tel:+916284174045" 
                        className="text-sm sm:text-base md:text-[1.2vw] text-white hover:text-white/80 transition-colors duration-300 font-sans font-normal tracking-wide select-text whitespace-nowrap"
                      >
                        +91 6284 174 045
                      </a>

                      <a 
                        href="mailto:team@clixs.media" 
                        className="text-sm sm:text-base md:text-[1.2vw] text-white hover:text-white/80 transition-colors duration-300 font-sans font-normal tracking-wide select-text whitespace-nowrap"
                      >
                        team@clixs.media
                      </a>
                    </div>

                    {/* Right: Social Media Links */}
                    <div className="flex gap-4 items-center select-none justify-center w-full sm:w-auto border-t border-white/10 sm:border-t-0 pt-3 sm:pt-0">
                      <motion.a 
                        href="https://wa.link/pg1agm" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ scale: 1.1 }}
                        className="group text-white cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-[1.6vw] md:h-[1.6vw] relative">
                          <circle 
                            cx="12" 
                            cy="12" 
                            r="6" 
                            className="fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="M12 2C6.477 2 2 6.477 2 12c0 1.885.52 3.654 1.428 5.178L2.05 21.95l4.908-1.29A9.95 9.95 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm6.73 13.914c-.266.753-1.313 1.375-1.813 1.458-.454.078-.986.14-2.915-.628-2.46-.988-4.06-3.5-4.184-3.673-.124-.173-1.05-1.4-1.05-2.673 0-1.272.66-1.9 1.05-2.31.298-.314.785-.47 1.16-.47.126 0 .25 0 .36.015.316.016.472.03.676.519.267.628.877 2.15.955 2.308.078.157.126.36.016.55-.11.189-.173.315-.346.519-.173.204-.36.392-.518.565-.157.157-.33.33-.14.66.188.315.83 1.366 1.77 2.2.94.832 1.74 1.1 2.07 1.226.33.125.52.094.707-.126.188-.22.816-.957 1.036-1.287.22-.33.44-.282.72-.173.298.11 1.868.88 2.198 1.036.314.157.533.234.612.36.079.141.079.816-.188 1.57z"
                            className="fill-current group-hover:text-[#25D366] transition-colors duration-300"
                          />
                        </svg>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        onClick={(e) => e.preventDefault()}
                        whileHover={{ scale: 1.1 }}
                        className="text-white hover:text-[#E1306C] transition-colors duration-300 cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[1.6vw] md:h-[1.6vw]">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        onClick={(e) => e.preventDefault()}
                        whileHover={{ scale: 1.1 }}
                        className="text-white hover:text-[#1877F2] transition-colors duration-300 cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[1.6vw] md:h-[1.6vw]">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                      </motion.a>
                      <motion.a 
                        href="https://www.linkedin.com/company/clixs-media/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ scale: 1.1 }}
                        className="text-white hover:text-[#0077B5] transition-colors duration-300 cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[1.6vw] md:h-[1.6vw]">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                          <rect x="2" y="9" width="4" height="12"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Contact form aligned to the right, absolute positioned on desktop */}
            <div className="w-full md:col-span-5 md:absolute md:top-[12vh] md:right-8 mt-0 md:mt-0 flex justify-center md:justify-end items-start pointer-events-none select-auto z-20">
              {showTyping && <ContactForm delay={1.8} />}
            </div>
          </div>
        </motion.div>

        {/* Staggered Black Footer Curtain Panels (z-[75]) */}
        <div className="absolute inset-0 z-[75] flex pointer-events-none select-none overflow-hidden">
          <motion.div style={{ y: footerPanel1Y }} className="w-[20.5%] -mr-[0.5%] h-full bg-[#050505] will-change-transform" />
          <motion.div style={{ y: footerPanel2Y }} className="w-[20.5%] -mr-[0.5%] h-full bg-[#050505] will-change-transform" />
          <motion.div style={{ y: footerPanel3Y }} className="w-[20.5%] -mr-[0.5%] h-full bg-[#050505] will-change-transform" />
          <motion.div style={{ y: footerPanel4Y }} className="w-[20.5%] -mr-[0.5%] h-full bg-[#050505] will-change-transform" />
          <motion.div style={{ y: footerPanel5Y }} className="w-[20.5%] h-full bg-[#050505] will-change-transform" />
        </div>

        {/* Footer Background Section (z-[70]) */}
        <motion.div
          style={{
            display: footerSectionDisplay,
          }}
          className="absolute inset-0 z-[70] pointer-events-none bg-[#050505]"
        />

        {/* Giant CLIXS Text Overlay (z-[80]) */}
        <motion.div
          style={{
            display: footerTextDisplay,
            y: footerTextY,
          }}
          className="absolute inset-0 z-[80] pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <div className="relative flex items-start leading-none mt-0 md:mt-[20vh]">
            <span 
              className="text-[28vw] font-bold text-white tracking-tighter leading-none"
              style={{ 
                fontFamily: "var(--font-montserrat)",
                letterSpacing: "-0.06em",
              }}
            >
              {"CLIXS".split("").map((char, i) => (
                <span 
                  key={i} 
                  className="inline-block pointer-events-auto hover:text-[#8849a6] transition-colors duration-300"
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
        </motion.div>


      </div>
    </section>
  );
}
