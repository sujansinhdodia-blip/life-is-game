// ============================================================
//  components/Story.tsx
//  Scroll-triggered timeline pairing photos with captions.
//  Photos are passed in from the server component (page.tsx).
//  Falls back to placeholder colors if fewer photos than moments.
// ============================================================
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { CONFIG } from "@/lib/config";

interface StoryProps {
  images: string[];
}

const fadeSlide = {
  hidden: (dir: number) => ({
    opacity: 0,
    x: dir * 60,
    y: 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
};

function StoryItem({
  index,
  caption,
  imagePath,
}: {
  index: number;
  caption: string;
  imagePath: string | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      custom={isEven ? -1 : 1}
      variants={fadeSlide}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1rem",
      }}
    >
      {/* Timeline dot */}
      <div
        aria-hidden="true"
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #e8a0a0, #c9826a)",
          boxShadow: "0 0 16px rgba(201,130,106,0.7)",
          flexShrink: 0,
        }}
      />

      {/* Card */}
      <div
        className="glass"
        style={{
          maxWidth: "640px",
          width: "100%",
          overflow: "hidden",
          padding: 0,
        }}
      >
        {/* Photo */}
        {imagePath ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/3",
              overflow: "hidden",
              borderRadius: "20px 20px 0 0",
            }}
          >
            <Image
              src={`/images/${imagePath}`}
              alt={caption}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              style={{
                objectFit: "cover",
                transition: "transform 0.6s ease",
              }}
              loading="lazy"
              className="story-img"
            />
          </div>
        ) : (
          /* Placeholder gradient when no photo available */
          <div
            aria-hidden="true"
            style={{
              width: "100%",
              aspectRatio: "4/3",
              background: `linear-gradient(135deg, rgba(74,10,26,0.8) 0%, rgba(107,26,42,0.6) 100%)`,
              borderRadius: "20px 20px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
            }}
          >
            🌹
          </div>
        )}

        {/* Caption */}
        <div style={{ padding: "1.5rem 1.8rem" }}>
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#f5c6d0",
              lineHeight: 1.65,
              textAlign: "center",
            }}
          >
            "{caption}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Story({ images }: StoryProps) {
  return (
    <section
      id="story"
      style={{
        padding: "6rem 1.5rem",
        position: "relative",
      }}
    >
      {/* Section label */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
          Our Story
        </h2>
        <p
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontSize: "0.8rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,240,232,0.45)",
          }}
        >
          moments that mattered
        </p>
      </div>

      {/* Vertical line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "160px",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          background: "linear-gradient(to bottom, transparent, rgba(201,130,106,0.3), transparent)",
          pointerEvents: "none",
          display: "none",
        }}
      />

      {/* Timeline items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3.5rem",
          alignItems: "center",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {CONFIG.storyMoments.map((moment, i) => (
          <StoryItem
            key={i}
            index={i}
            caption={moment.caption}
            imagePath={images[i]}
          />
        ))}
      </div>
    </section>
  );
}
