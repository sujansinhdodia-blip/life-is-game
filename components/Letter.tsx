// ============================================================
//  components/Letter.tsx
//  Parchment-like glass card with a typewriter that starts
//  only when the section scrolls into view (useInView).
// ============================================================
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Typewriter from "./Typewriter";
import { CONFIG } from "@/lib/config";

export default function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when 30% of the card is visible
  const inView = useInView(ref, { once: true, amount: 0.3 });

  // Split letter into lines for the sequential typewriter
  const letterLines = CONFIG.letter
    .trim()
    .split("\n")
    .filter((l) => l.trim() !== "");

  return (
    <section
      id="letter"
      style={{
        padding: "6rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <h2
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            color: "#c9826a",
            textShadow: "0 0 20px rgba(201,130,106,0.4)",
          }}
        >
          My Letter to You
        </h2>
      </motion.div>

      {/* Parchment card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        className="glass"
        style={{
          maxWidth: "780px",
          width: "100%",
          padding: "clamp(1.8rem, 5vw, 3.5rem)",
          position: "relative",
          background: "rgba(20, 4, 12, 0.55)",
          borderColor: "rgba(201,130,106,0.22)",
        }}
      >
        {/* Decorative corner roses */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "1rem",
            left: "1.2rem",
            fontSize: "1.1rem",
            opacity: 0.3,
          }}
        >
          🌹
        </span>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1.2rem",
            fontSize: "1.1rem",
            opacity: 0.3,
          }}
        >
          🌹
        </span>

        {/* Letter content — typewriter starts on scroll-in */}
        <div
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "#fff0e8",
            letterSpacing: "0.01em",
            whiteSpace: "pre-wrap",
          }}
        >
          {inView ? (
            <Typewriter
              lines={letterLines}
              sequential
              speed={28}
            />
          ) : (
            // Placeholder to prevent layout shift
            <span style={{ opacity: 0 }}>
              {CONFIG.letter.trim().charAt(0)}
            </span>
          )}
        </div>

        {/* Bottom decoration */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "2rem",
            textAlign: "center",
            fontFamily: '"Great Vibes", cursive',
            fontSize: "1.5rem",
            color: "rgba(201,130,106,0.5)",
          }}
        >
          ∞
        </div>
      </motion.div>
    </section>
  );
}
