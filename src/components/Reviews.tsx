"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const reviewsData = [
  {
    company: "FALSEDRIP",
    projectName: "FalseDrip",
    image: "/1.png",
    logo: "/falsedrip-logo.png",
    text: "CLIXS didn't just market our brand—they helped build its identity. Our brand value grew significantly, and today artists and celebrities like Talwiinder, Krishna, and many others have been seen wearing FalseDrip. Their creative strategy and branding approach gave us the recognition we were aiming for.",
    rating: 5,
  },
  {
    company: "STHIR",
    projectName: "Sthir",
    image: "/development.png",
    logo: "/sthir-logo.png",
    text: "Working with CLIXS was a turning point for Sthir. From brand positioning to content strategy, they helped us create a premium clothing brand presence that truly connects with our audience. The growth in engagement, trust, and customer loyalty has been incredible.",
    rating: 5,
  },
  {
    company: "ECILUX",
    projectName: "Ecilux",
    image: "/strategy.png",
    logo: "/ecilux-logo.jpg",
    text: "CLIXS transformed Ecilux from a clothing store into a recognizable fashion brand. Their branding, content creation, and marketing efforts helped us attract the right audience and establish a strong online presence. We've seen consistent growth in both reach and sales.",
    rating: 5,
  }
];

// Helper component for individual review cards and backgrounds
function ReviewItem({ 
  index, 
  review, 
  progress 
}: { 
  index: number; 
  review: typeof reviewsData[0]; 
  progress: MotionValue<number>;
}) {
  const start = index * 0.333;
  const full = start + 0.05;
  const fadeOutStart = start + 0.28;
  const end = start + 0.333;

  // For the last item, keep it visible until the very end
  const isLast = index === reviewsData.length - 1;
  const finalEnd = isLast ? 1.0 : end;
  const finalFadeOutStart = isLast ? 0.95 : fadeOutStart;

  const opacity = useTransform(
    progress,
    [start, full, finalFadeOutStart, finalEnd],
    [0, 1, 1, 0]
  );

  const backgroundOpacity = useTransform(
    progress,
    [start, full, finalFadeOutStart, finalEnd],
    [0, 0.04, 0.04, 0] // Keep background opacity very low (4%)
  );

  const y = useTransform(
    progress,
    [start, full, finalFadeOutStart, finalEnd],
    [100, 0, 0, -100]
  );

  const scale = useTransform(
    progress,
    [start, full, finalFadeOutStart, finalEnd],
    [0.9, 1, 1, 0.9]
  );

  return (
    <>
      {/* Giant Background Text */}
      <motion.div
        style={{ opacity: backgroundOpacity, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <h2 
          className="text-[15vw] font-black text-white whitespace-nowrap tracking-tighter uppercase"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {review.company}
        </h2>
      </motion.div>

      {/* Foreground Content Card */}
      <motion.div
        style={{ opacity, y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 pointer-events-auto">
          
          {/* Left: Review Text & Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-white">
            {/* Rating Stars */}
            <div className="flex gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-[#8849A6]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <h3 className="text-4xl md:text-5xl font-bold font-montserrat text-white">
              {review.projectName}
            </h3>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-sans">
              &ldquo;{review.text}&rdquo;
            </p>
          </div>

          {/* Right: Image/Logo Card (Glassmorphism Circle) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_50px_rgba(136,73,166,0.25)] border border-white/10 bg-white/5 backdrop-blur-xl group flex items-center justify-center">
              <img 
                src={review.logo} 
                alt={review.company} 
                className="w-full h-full object-cover scale-150 opacity-90 group-hover:opacity-100 group-hover:scale-[1.65] transition-all duration-700 ease-out"
              />
              {/* Subtle accent gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8849a6]/15 to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </motion.div>
    </>
  );
}

export default function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[400vh] bg-[#050505]"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center pt-20">
        
        {/* Top Static Title */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <span 
            className="text-white/60 text-xl md:text-2xl font-serif italic tracking-wider"
            style={{ fontFamily: "Georgia, serif" }}
          >
            reviews.
          </span>
        </div>

        {/* Dynamic Reviews Container */}
        <div className="relative w-full h-full flex-grow">
          {reviewsData.map((review, index) => (
            <ReviewItem 
              key={index} 
              index={index} 
              review={review} 
              progress={scrollYProgress} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
