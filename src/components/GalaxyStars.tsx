"use client";

import { useEffect, useState } from "react";

export default function GalaxyStars() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; opacity: number; animationDelay: string }[]>([]);

  useEffect(() => {
    // Generate 150 random stars
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`, // 1px to 3px
      opacity: Math.random() * 0.5 + 0.2, // 0.2 to 0.7
      animationDelay: `${Math.random() * 3}s` // For twinkling effect
    }));
    const timeoutId = setTimeout(() => {
      setStars(newStars);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
}
