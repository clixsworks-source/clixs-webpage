"use client";

import { useEffect, useState, useCallback } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  arrowElement?: React.ReactNode;
  arrowAfterWord?: string; // Insert arrow after this word
}

export default function TypingText({
  text,
  speed = 80,
  delay = 300,
  onComplete,
  className,
  style,
  arrowElement,
  arrowAfterWord = "next",
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  // Find where arrow goes using indexOf
  const arrowIndex = text.indexOf(arrowAfterWord);

  const startTyping = useCallback(() => {
    let currentIndex = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          
          // Check if we've typed past the arrow word
          if (arrowElement && arrowIndex !== -1) {
            const arrowPosition = arrowIndex + arrowAfterWord.length;
            if (currentIndex >= arrowPosition) {
              setShowArrow(true);
            }
          }
          
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, onComplete, arrowElement, arrowIndex, arrowAfterWord]);

  useEffect(() => {
    const cleanup = startTyping();
    return cleanup;
  }, [startTyping]);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Build the display with arrow inserted
  const renderText = () => {
    if (!arrowElement || arrowIndex === -1) {
      return (
        <>
          {displayedText}
          <span
            className="inline-block w-[3px] h-[0.85em] bg-white/80 ml-1 align-middle"
            style={{ opacity: !isComplete && showCursor ? 1 : 0, transition: "opacity 0.1s" }}
          />
        </>
      );
    }

    const arrowPosition = arrowIndex + arrowAfterWord.length;
    const beforeArrowText = text.slice(0, arrowPosition);
    const afterArrowText = text.slice(arrowPosition);

    const typedBeforeArrow = displayedText.slice(0, beforeArrowText.length);
    const typedAfterArrow = displayedText.length > beforeArrowText.length
      ? displayedText.slice(beforeArrowText.length)
      : "";

    return (
      <>
        {typedBeforeArrow}
        {showArrow && <span className="mx-3 inline-block align-middle">{arrowElement}</span>}
        {typedAfterArrow}
        <span
          className="inline-block w-[3px] h-[0.85em] bg-white/80 ml-1 align-middle"
          style={{ opacity: !isComplete && showCursor ? 1 : 0, transition: "opacity 0.1s" }}
        />
      </>
    );
  };

  return (
    <h2 className={className} style={style}>
      {renderText()}
    </h2>
  );
}
