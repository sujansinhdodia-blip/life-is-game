// ============================================================
//  components/Gallery.tsx
//  Polaroid/masonry gallery with hover zoom + glow.
//  Parallax float-in on scroll via Framer Motion.
//  Opens Lightbox on click.
// ============================================================
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Lightbox from "./Lightbox";

interface GalleryProps {
  images: string[];
}

// Each polaroid gets a slight random rotation for character
const rotations = [-3, 2, -1.5, 2.5, -2, 1, -2.5, 3, -1, 2, -3, 1.5];

export default function Gallery({ images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <section
        id="gallery"
        style={{
          padding: "6rem 1.5rem",
          position: "relative",
        }}
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
            Our Memories
          </h2>
          <p
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,240,232,0.4)",
            }}
          >
            tap any photo to open
          </p>
        </div>

        {/* Masonry grid */}
        <div
          style={{
            columns: "2 240px",
            columnGap: "1.2rem",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {images.map((img, i) => (
            <GalleryItem
              key={img}
              src={img}
              index={i}
              rotation={rotations[i % rotations.length]}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => ((i ?? 0) - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((i) => ((i ?? 0) + 1) % images.length)}
        />
      )}
    </>
  );
}

function GalleryItem({
  src,
  index,
  rotation,
  onClick,
}: {
  src: string;
  index: number;
  rotation: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: rotation * 0.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate: rotation } : { opacity: 0, y: 40, rotate: rotation * 0.5 }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.12,
        ease: "easeOut",
      }}
      className="polaroid"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open memory ${index + 1}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{
        marginBottom: "1.2rem",
        breakInside: "avoid",
        cursor: "pointer",
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/5",
          overflow: "hidden",
          borderRadius: "2px",
        }}
      >
        <Image
          src={`/images/${src}`}
          alt={`Memory ${index + 1}`}
          fill
          sizes="(max-width: 600px) 45vw, 240px"
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          loading="lazy"
        />
      </div>
      {/* Polaroid label */}
      <div
        style={{
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "0.75rem",
          color: "rgba(201,130,106,0.6)",
          fontStyle: "italic",
          letterSpacing: "0.06em",
          marginTop: "6px",
        }}
      >
        ♡
      </div>
    </motion.div>
  );
}
