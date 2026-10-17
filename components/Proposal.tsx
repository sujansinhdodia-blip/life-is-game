// ============================================================
//  components/Proposal.tsx
//  The final proposal section with YES / I need more time.
//  Neither button moves, resizes, or guilt-trips.
//  On YES → celebration petals + yesClosing typed out.
//  On NO  → quiet floating light + noClosing typed out.
// ============================================================
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "./Typewriter";
import { CONFIG } from "@/lib/config";

type Outcome = "yes" | "no" | null;

interface ProposalProps {
  onYes: () => void; // tells parent to switch petals to celebration mode
}

export default function Proposal({ onYes }: ProposalProps) {
  const [outcome, setOutcome] = useState<Outcome>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setOutcome("yes");
    onYes();
    // Smooth scroll to outcome message
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  const handleNo = () => {
    setOutcome("no");
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  };

  return (
    <section
      id="proposal"
      ref={sectionRef}
      className="spotlight-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem",
        position: "relative",
      }}
    >
      {/* Background orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          maxWidth: "500px",
          maxHeight: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,10,26,0.45) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <AnimatePresence mode="wait">
        {outcome === null && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3rem",
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            {/* Pulsing heart */}
            <motion.div
              className="pulse-heart"
              aria-hidden="true"
            >
              <svg width="64" height="58" viewBox="0 0 100 90" fill="none">
                <defs>
                  <radialGradient id="hg2" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#e8a0a0" />
                    <stop offset="55%" stopColor="#c9826a" />
                    <stop offset="100%" stopColor="#6b1a2a" />
                  </radialGradient>
                </defs>
                <path
                  d="M50 85 C10 60 5 15 25 8 C37 3 47 12 50 20 C53 12 63 3 75 8 C95 15 90 60 50 85Z"
                  fill="url(#hg2)"
                />
              </svg>
            </motion.div>

            {/* Proposal line */}
            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#fff0e8",
                lineHeight: 1.7,
                letterSpacing: "0.01em",
              }}
            >
              {CONFIG.proposalLine}
            </p>

            {/* Buttons — equal dignity, both always reachable */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
                maxWidth: "340px",
              }}
            >
              {/* YES */}
              <button
                id="btn-yes"
                onClick={handleYes}
                style={{
                  padding: "16px 32px",
                  borderRadius: "100px",
                  border: "1px solid rgba(201,130,106,0.5)",
                  background: "linear-gradient(135deg, rgba(107,26,42,0.6) 0%, rgba(74,10,26,0.7) 100%)",
                  color: "#f5c6d0",
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "1rem",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  boxShadow: "0 0 30px rgba(201,130,106,0.2)",
                  transition: "box-shadow 0.3s ease, background 0.3s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 50px rgba(201,130,106,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 0 30px rgba(201,130,106,0.2)";
                }}
              >
                {CONFIG.buttonYes}
              </button>

              {/* NO / More time */}
              <button
                id="btn-no"
                onClick={handleNo}
                style={{
                  padding: "16px 32px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,240,232,0.15)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,240,232,0.55)",
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(255,240,232,0.3)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,240,232,0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(255,240,232,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,240,232,0.55)";
                }}
              >
                {CONFIG.buttonNo}
              </button>
            </div>
          </motion.div>
        )}

        {/* YES OUTCOME */}
        {outcome === "yes" && (
          <motion.div
            key="yes-outcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              textAlign: "center",
              maxWidth: "640px",
            }}
          >
            {/* Animated hearts burst */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.7, ease: "backOut" }}
              aria-hidden="true"
              style={{ fontSize: "3.5rem" }}
            >
              🌹
            </motion.div>

            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "#fff0e8",
                lineHeight: 1.8,
              }}
            >
              <Typewriter
                lines={[CONFIG.yesClosing]}
                sequential
                speed={35}
              />
            </p>

            <p
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                color: "#c9826a",
                opacity: 0.8,
                textShadow: "0 0 20px rgba(201,130,106,0.4)",
              }}
            >
              With all my love
            </p>
          </motion.div>
        )}

        {/* NO / MORE TIME OUTCOME */}
        {outcome === "no" && (
          <motion.div
            key="no-outcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              textAlign: "center",
              maxWidth: "640px",
            }}
          >
            {/* Soft floating light particles */}
            <NoParticles />

            <span aria-hidden="true" style={{ fontSize: "2.5rem" }}>
              🤍
            </span>

            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(255,240,232,0.85)",
                lineHeight: 1.85,
              }}
            >
              <Typewriter
                lines={[CONFIG.noClosing]}
                sequential
                speed={35}
              />
            </p>

            <p
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "1.05rem",
                color: "rgba(255,240,232,0.4)",
                fontStyle: "italic",
              }}
            >
              Take care of yourself. Always.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Quiet floating light dots for the "no" outcome
function NoParticles() {
  const dots = Array.from({ length: 12 });
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {dots.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: `${Math.random() * 100}%` }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -(Math.random() * 200 + 100)],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            bottom: "20%",
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            borderRadius: "50%",
            background: "rgba(255,240,232,0.6)",
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
