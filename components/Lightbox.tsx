// ============================================================
//  components/Lightbox.tsx
//  Full-screen lightbox: keyboard arrows, swipe, close.
// ============================================================
"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  // Keyboard navigation
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  // Touch swipe
  let touchStartX = 0;

  const src = `/images/${images[currentIndex]}`;

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        onTouchStart={(e) => {
          touchStartX = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const diff = touchStartX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) {
            diff > 0 ? onNext() : onPrev();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Photo lightbox"
      >
        {/* Image container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "85vh",
            width: "auto",
            height: "auto",
          }}
        >
          <Image
            src={src}
            alt={`Memory ${currentIndex + 1}`}
            width={1200}
            height={900}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              width: "auto",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 0 60px rgba(201,130,106,0.3)",
              objectFit: "contain",
            }}
            priority
          />
          {/* Counter */}
          <div
            style={{
              position: "absolute",
              bottom: "-2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "0.75rem",
              color: "rgba(255,240,232,0.5)",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>

        {/* Prev button */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous photo"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(201,130,106,0.3)",
            color: "#e8a0a0",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.2rem",
            backdropFilter: "blur(8px)",
          }}
        >
          ‹
        </button>

        {/* Next button */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next photo"
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(201,130,106,0.3)",
            color: "#e8a0a0",
            borderRadius: "50%",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.2rem",
            backdropFilter: "blur(8px)",
          }}
        >
          ›
        </button>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(201,130,106,0.3)",
            color: "#e8a0a0",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.3rem",
            backdropFilter: "blur(8px)",
          }}
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
