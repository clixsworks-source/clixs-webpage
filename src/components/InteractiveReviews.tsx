"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviewsData = [
  {
    company: "FalseDrip",
    logo: "falsedrip-logo.png",
    review: "CLIXS didn't just market our brand—they helped build its identity. Our brand value grew significantly, and today artists and celebrities like Talwiinder, Krishna, and many others have been seen wearing FalseDrip. Their creative strategy and branding approach gave us the recognition we were aiming for.",
  },
  {
    company: "Sthir",
    logo: "sthir-logo.png",
    review: "Working with CLIXS was a turning point for Sthir. From brand positioning to content strategy, they helped us create a premium clothing brand presence that truly connects with our audience. The growth in engagement, trust, and customer loyalty has been incredible.",
  },
  {
    company: "Ecilux",
    logo: "ecilux-logo.jpg",
    review: "CLIXS transformed Ecilux from a clothing store into a recognizable fashion brand. Their branding, content creation, and marketing efforts helped us attract the right audience and establish a strong online presence. We've seen consistent growth in both reach and sales.",
  },
];

type CardData = {
  id: string;
  dataIndex: number;
  x: number;
  y: number;
  rotation: number;
};

function ReviewCard({
  card,
  data,
  onRemove,
}: {
  card: CardData;
  data: typeof reviewsData[0];
  onRemove: (id: string) => void;
}) {
  useEffect(() => {
    // Trigger the exit animation after the card has been visible for a short time
    const timer = setTimeout(() => {
      onRemove(card.id);
    }, 2000);
    return () => clearTimeout(timer);
  }, [card.id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: card.rotation - 15, y: "-40%" }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: card.rotation,
        y: ["-50%", `calc(-50% - 15px)`, "-50%"], // Floating effect
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8, 
        rotate: card.rotation + 10, 
        y: "-60%",
        transition: { duration: 0.3, ease: "easeIn" }
      }}
      transition={{
        duration: 0.25,
        type: "spring",
        stiffness: 300,
        damping: 15,
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{
        position: "absolute",
        left: card.x,
        top: card.y,
        x: "-50%",
      }}
      className="w-[260px] xs:w-[280px] md:w-[320px] p-5 rounded-2xl bg-gradient-to-br from-[#8849A6] to-[#5d3072] border border-white/20 shadow-[0_15px_40px_rgba(136,73,166,0.3)] pointer-events-none flex flex-col gap-3 z-10 will-change-transform"
    >
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/10">
          <img
            src={`/${data.logo}`}
            alt={data.company}
            className="w-full h-full object-cover scale-150 opacity-90"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement!.innerHTML = `<span class="text-xs font-bold text-white">${data.company[0]}</span>`;
            }}
          />
        </div>
        <h4 className="font-bold text-white font-montserrat tracking-tight text-sm">
          {data.company}
        </h4>
      </div>

      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-[#FFD700]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-sm text-white/90 leading-relaxed font-sans line-clamp-3">
        &ldquo;{data.review}&rdquo;
      </p>
    </motion.div>
  );
}

export default function InteractiveReviews() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const dataIndexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const spawnCard = (x: number, y: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const dataIndex = dataIndexRef.current;
    
    // Cycle sequentially through the reviews array
    dataIndexRef.current = (dataIndexRef.current + 1) % reviewsData.length;
    
    // Random subtle rotation between -3 and +3 degrees
    const rotation = Math.random() * 6 - 3;

    setCards((prev) => {
      // Keep only a maximum of 3 cards to avoid lag
      const newCards = [...prev, { id, dataIndex, x, y, rotation }];
      if (newCards.length > 3) return newCards.slice(newCards.length - 3);
      return newCards;
    });
  };

  useEffect(() => {
    if (!isMobile) return;
    // Auto-spawn cards on mobile since there is no mouse trail
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Keep cards within bounds (dynamic padding based on screen size)
      const paddingX = rect.width < 768 ? 140 : 170;
      const paddingY = rect.height < 768 ? 110 : 150;
      const x = Math.max(paddingX, Math.min(rect.width - paddingX, Math.random() * rect.width));
      const y = Math.max(paddingY, Math.min(rect.height - paddingY, Math.random() * rect.height));
      spawnCard(x, y);
    }, 2000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);
    
    // Spawn a new card if the mouse has moved far enough (creates a trail effect)
    if (dist > 150) {
      lastPosRef.current = { x, y };
      spawnCard(x, y);
    }
  };

  const removeCard = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      {/* Background Static Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-black/80 text-4xl md:text-7xl font-serif italic tracking-wider drop-shadow-sm"
          style={{ fontFamily: "Georgia, serif" }}
        >
          reviews.
        </span>
      </div>

      {/* Floating Cards Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {cards.map((card) => (
            <ReviewCard
              key={card.id}
              card={card}
              data={reviewsData[card.dataIndex] || reviewsData[0]}
              onRemove={removeCard}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
