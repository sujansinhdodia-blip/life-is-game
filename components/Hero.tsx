// ============================================================
//  components/Hero.tsx
//  Full-viewport hero with typewriter cycling through heroLines
// ============================================================
"use client";

import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import { CONFIG } from "@/lib/config";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "35vw",
          height: "35vw",
          maxWidth: "400px",
          maxHeight: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,26,42,0.5) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "orb-float 9s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "8%",
          width: "28vw",
          height: "28vw",
          maxWidth: "320px",
          maxHeight: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,10,26,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb-float 11s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Script accent */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          fontFamily: '"Great Vibes", cursive',
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          color: "#c9826a",
          marginBottom: "2.5rem",
          textAlign: "center",
          letterSpacing: "0.03em",
          textShadow: "0 0 20px rgba(201,130,106,0.4)",
        }}
      >
        A letter from my heart
      </motion.p>

      {/* Typewriter text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          maxWidth: "720px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#fff0e8",
            lineHeight: 1.6,
            minHeight: "3em",
            letterSpacing: "0.01em",
          }}
        >
          <Typewriter
            lines={[...CONFIG.heroLines]}
            speed={45}
            pauseAfterLine={2200}
            pauseBetweenLines={500}
          />
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <p
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: "0.7rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#c9826a",
          }}
        >
          Scroll gently
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "#c9826a", fontSize: "1.2rem" }}
          aria-hidden="true"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
