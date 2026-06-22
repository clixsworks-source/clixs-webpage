"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "social growth",
    img: "/development.png",
    description: "Managing and scaling your social media presence through content creation, platform management, audience engagement, and growth-focused strategies that build brand awareness and drive results.",
    color: "#8849a6" // Purple
  },
  {
    num: "02",
    title: "branding",
    img: "/strategy.png",
    description: "Complete brand launch kits designed to establish a strong and memorable identity. Including logo design, brand identity systems, color palettes, typography, brand guidelines, and custom website design.",
    color: "#FF3366" // Pink/Red
  },
  {
    num: "03",
    title: "performance marketing",
    img: "/optimization.png",
    description: "Driving qualified leads and revenue through high-converting Meta Ads and Google Ads campaigns, backed by data-driven targeting, optimization, and performance tracking.",
    color: "#00C853" // Green
  },
  {
    num: "04",
    title: "ai creative studio",
    img: "/marketing.png",
    description: "Creating scroll-stopping AI-powered UGC videos, ad creatives, marketing visuals, and branded content that help businesses capture attention and increase conversions.",
    color: "#FF9100" // Orange
  },
  {
    num: "05",
    title: "automation",
    img: "/event.png",
    description: "Streamlining operations with intelligent automation systems, including WhatsApp automation, AI voice calling agents, appointment booking automation, lead nurturing, and workflow automation.",
    color: "#6200EA" // Purple
  }
];

interface CasesProps {
  scrollYProgress: MotionValue<number>;
}

export default function Cases({ scrollYProgress }: CasesProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardsX = useTransform(scrollYProgress, [0.736, 0.792], ["0vw", "-60vw"], { clamp: true });

  const card1Y = useTransform(scrollYProgress, [0.608, 0.688], ["100vh", "0vh"], { clamp: true });
  const card2Y = useTransform(scrollYProgress, [0.624, 0.704], ["100vh", "0vh"], { clamp: true });
  const card3Y = useTransform(scrollYProgress, [0.640, 0.720], ["100vh", "0vh"], { clamp: true });
  const card4Y = useTransform(scrollYProgress, [0.656, 0.736], ["100vh", "0vh"], { clamp: true });
  const card5Y = useTransform(scrollYProgress, [0.672, 0.752], ["100vh", "0vh"], { clamp: true });

  const cardYTransforms = [card1Y, card2Y, card3Y, card4Y, card5Y];

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-24 pb-2 bg-transparent text-white overflow-hidden relative select-none">
      {/* 1. Large Stationary Background Heading */}
      <div className="w-full text-center shrink-0 z-10 select-none pointer-events-none">
        <h2 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[9vw] font-bold tracking-tighter text-white font-montserrat lowercase leading-none"
          style={{ 
            fontFamily: "var(--font-montserrat)",
            letterSpacing: "-0.05em"
          }}
        >
          our services
        </h2>
      </div>

      {/* 2. Horizontal Cards Row Container */}
      <div className="w-full flex-grow flex items-center justify-center mt-3 sm:mt-4 lg:mt-5 z-20">
        <div className="w-full overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none no-scrollbar px-[calc((100vw-280px)/2)] lg:px-24">
          <motion.div 
            style={{ x: isDesktop ? cardsX : "0vw" }}
            className="flex flex-row gap-6 lg:gap-10 w-max snap-align-none"
          >
            {services.map((service, index) => {
              const isHovered = hoveredCard === index;
              
              return (
                <motion.div
                  key={index}
                  style={{ y: isDesktop ? cardYTransforms[index] : "0vh" }}
                  className="shrink-0 snap-center"
                >
                  <Link href={`/services/${service.title.toLowerCase().replace(/ /g, "-")}`} className="block pointer-events-auto select-none">
                    <motion.div
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      whileHover={isDesktop ? { y: -10 } : {}}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative w-[280px] h-[380px] lg:w-[360px] lg:h-[460px] flex flex-col justify-between p-4 lg:p-6 cursor-pointer rounded-none border-0 shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden"
                      style={{
                        backgroundColor: isHovered ? service.color : "#F2F2F2",
                        transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {/* Top-left: Small Square Image */}
                      <div className="w-20 h-20 xs:w-28 xs:h-28 lg:w-36 lg:h-36 overflow-hidden rounded-none self-start relative z-10">
                        <img 
                          src={service.img} 
                          alt={service.title} 
                          className="w-full h-full object-cover rounded-none"
                          style={{
                            filter: isHovered ? "none" : "grayscale(100%)",
                            transform: isHovered ? "scale(1.08)" : "scale(1)",
                            transition: "filter 0.4s ease, transform 0.5s ease",
                          }}
                        />
                      </div>

                      {/* "(explore services)" overlay text — appears only on hovered card */}
                      <div
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <span
                          className="text-white text-base lg:text-lg font-medium italic tracking-wide"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          (explore services)
                        </span>
                      </div>
                    
                      {/* Bottom: Title (left) & Diagonal Arrow (right) */}
                      <div className="w-full flex items-end justify-between relative z-10">
                        <div className="flex flex-col gap-1 text-left">
                          {/* Tiny index/tag */}
                          <span
                            className="text-[10px] lg:text-xs font-serif italic select-none"
                            style={{
                              color: isHovered ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)",
                              transition: "color 0.4s ease",
                            }}
                          >
                            {service.num}
                          </span>
                          <h3
                            className="text-2xl xs:text-3xl lg:text-4xl font-extrabold font-montserrat tracking-tighter leading-none lowercase"
                            style={{
                              color: isHovered ? "#ffffff" : "#000000",
                              transition: "color 0.4s ease",
                            }}
                          >
                            {service.title}
                          </h3>
                        </div>
                        
                        {/* Custom Minimal Diagonal Arrow */}
                        <div className="overflow-hidden p-1">
                          <svg 
                            className="w-6 h-6 xs:w-8 xs:h-8 lg:w-10 lg:h-10 transition-transform duration-300"
                            style={{
                              color: isHovered ? "#ffffff" : "#000000",
                              transition: "color 0.4s ease, transform 0.4s ease",
                              transform: isHovered ? "translate(6px, 0px) rotate(-45deg)" : "translate(0, 0) rotate(0deg)",
                            }}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 19H5 M19 19V5 M19 19L5 5" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
