// ============================================================
//  components/IntroScreen.tsx
//  Full-screen dark intro: pulsing heart + "Tap to begin".
//  On tap: fades out, starts music, reveals rest of site.
// ============================================================
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroScreenProps {
  onBegin: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function IntroScreen({ onBegin, audioRef }: IntroScreenProps) {
  const [visible, setVisible] = useState(true);
  const [pressed, setPressed] = useState(false);

  const handleBegin = () => {
    if (pressed) return;
    setPressed(true);

    // Try to play music (may be blocked by browser until user gesture — this IS the gesture)
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0;
      audio.play().catch(() => {});
      // Fade in volume gently
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol = Math.min(1, vol + 0.04);
        if (audio) audio.volume = vol;
        if (vol >= 1) clearInterval(fadeIn);
      }, 80);
    }

    // Delay hide so animation can play
    setTimeout(() => {
      setVisible(false);
      onBegin();
    }, 800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "radial-gradient(ellipse 70% 70% at 50% 50%, #1a0510 0%, #0a0008 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {/* Glowing orbs */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(74,10,26,0.6) 0%, transparent 70%)",
              filter: "blur(60px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />

          {/* Pulsing Heart SVG */}
          <motion.div
            className="pulse-heart"
            aria-hidden="true"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 80 }}
          >
            <svg
              width="110"
              height="100"
              viewBox="0 0 100 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="hg" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#e8a0a0" />
                  <stop offset="55%" stopColor="#c9826a" />
                  <stop offset="100%" stopColor="#6b1a2a" />
                </radialGradient>
              </defs>
              <path
                d="M50 85 C10 60 5 15 25 8 C37 3 47 12 50 20 C53 12 63 3 75 8 C95 15 90 60 50 85Z"
                fill="url(#hg)"
              />
            </svg>
          </motion.div>

          {/* Script text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: "clamp(2rem, 6vw, 3.2rem)",
              color: "#e8a0a0",
              textAlign: "center",
              letterSpacing: "0.02em",
              textShadow: "0 0 30px rgba(201,130,106,0.6)",
            }}
          >
            Something I built just for you
          </motion.p>

          {/* Tap to begin button */}
          <motion.button
            id="btn-begin"
            onClick={handleBegin}
            disabled={pressed}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 44px",
              borderRadius: "100px",
              border: "1px solid rgba(201,130,106,0.5)",
              background: "rgba(201,130,106,0.1)",
              backdropFilter: "blur(12px)",
              color: "#f5c6d0",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              cursor: pressed ? "default" : "pointer",
              transition: "background 0.3s ease",
              textTransform: "uppercase",
              boxShadow: "0 0 40px rgba(201,130,106,0.15), inset 0 0 20px rgba(201,130,106,0.05)",
            }}
          >
            {pressed ? "…" : "Tap to begin"}
          </motion.button>

          {/* Subtle note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.4, duration: 1 }}
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "0.75rem",
              color: "#e8a0a0",
              letterSpacing: "0.08em",
              textAlign: "center",
            }}
          >
            🎵 Best with sound on
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
