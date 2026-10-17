// ============================================================
//  components/WhyCards.tsx
//  6 glassmorphism cards from CONFIG.whyCards.
//  Each card flips on hover/focus to reveal the text.
// ============================================================
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONFIG } from "@/lib/config";

// Card accent icons — one per card
const ICONS = ["✨", "👁️", "💪", "🎙️", "🤍", "🌸"];
const GLOW_COLORS = [
  "rgba(201,130,106,0.35)",
  "rgba(232,160,160,0.35)",
  "rgba(212,168,83,0.3)",
  "rgba(201,130,106,0.3)",
  "rgba(245,198,208,0.35)",
  "rgba(232,160,160,0.3)",
];

export default function WhyCards() {
  return (
    <section
      id="why"
      style={{ padding: "6rem 1.5rem", position: "relative" }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <h2
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400,
            color: "#c9826a",
            textShadow: "0 0 20px rgba(201,130,106,0.4)",
            marginBottom: "0.5rem",
          }}
        >
          Why I Love You
        </h2>
        <p
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: "0.78rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,240,232,0.4)",
          }}
        >
          hover or tap each card
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.4rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {CONFIG.whyCards.map((card, i) => (
          <FlipCard
            key={i}
            index={i}
            title={card.title}
            text={card.text}
            icon={ICONS[i]}
            glow={GLOW_COLORS[i]}
          />
        ))}
      </div>
    </section>
  );
}

function FlipCard({
  index,
  title,
  text,
  icon,
  glow,
}: {
  index: number;
  title: string;
  text: string;
  icon: string;
  glow: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.12,
        ease: "easeOut",
      }}
      // The outer wrapper handles perspective
      className="why-card"
      tabIndex={0}
      aria-label={`${title}: ${text}`}
      style={{
        height: "200px",
        perspective: "1000px",
        cursor: "pointer",
      }}
    >
      {/* Rotating inner */}
      <div
        className="why-card-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* FRONT */}
        <div
          className="why-face glass"
          style={{
            background: "rgba(20, 4, 14, 0.55)",
            borderColor: "rgba(201,130,106,0.2)",
            flexDirection: "column",
            gap: "0.75rem",
            padding: "1.5rem",
          }}
        >
          <span style={{ fontSize: "2rem" }} aria-hidden="true">
            {icon}
          </span>
          <h3
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: "1.3rem",
              fontWeight: 500,
              color: "#f5c6d0",
              textAlign: "center",
            }}
          >
            {title}
          </h3>
        </div>

        {/* BACK */}
        <div
          className="why-face why-back glass"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(74,10,26,0.7) 0%, rgba(10,0,8,0.8) 100%)`,
            borderColor: "rgba(201,130,106,0.3)",
            padding: "1.5rem",
            boxShadow: `0 0 40px ${glow}`,
          }}
        >
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: "1.05rem",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#fff0e8",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            "{text}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
