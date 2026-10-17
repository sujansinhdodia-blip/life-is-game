// ============================================================
//  components/PageClient.tsx — Main Client Shell
//  Assembles all sections. Marked "use client" so it can
//  manage state (intro shown, music playing, petal mode).
// ============================================================
"use client";

import { useState, useRef } from "react";
import IntroScreen from "./IntroScreen";
import Hero from "./Hero";
import Story from "./Story";
import Gallery from "./Gallery";
import Letter from "./Letter";
import WhyCards from "./WhyCards";
import Proposal from "./Proposal";
import Petals from "./Petals";
import SparkleCursor from "./SparkleCursor";
import MusicPlayer from "./MusicPlayer";
import ScrollProgress from "./ScrollProgress";

interface PageClientProps {
  images: string[];
}

export default function PageClient({ images }: PageClientProps) {
  const [started, setStarted] = useState(false);
  const [petalMode, setPetalMode] = useState<"ambient" | "celebration">("ambient");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      {/* Hidden audio element — music.mp3 in /public */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        aria-hidden="true"
      />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Background ambient canvas (always on) */}
      <Petals mode={petalMode} />

      {/* Desktop sparkle cursor */}
      <SparkleCursor />

      {/* Floating music player */}
      <MusicPlayer audioRef={audioRef} visible={started} />

      {/* Intro gate */}
      <IntroScreen
        onBegin={() => setStarted(true)}
        audioRef={audioRef}
      />

      {/* Main content — shown after intro */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          background: "transparent",
        }}
        aria-label="Main content"
      >
        {/* 1. Hero typewriter */}
        <Hero />

        {/* Divider */}
        <Divider />

        {/* 2. Story timeline */}
        <Story images={images} />

        {/* Divider */}
        <Divider />

        {/* 3. Gallery */}
        {images.length > 0 && (
          <>
            <Gallery images={images} />
            <Divider />
          </>
        )}

        {/* 4. Letter */}
        <Letter />

        {/* Divider */}
        <Divider />

        {/* 5. Why I Love You cards */}
        <WhyCards />

        {/* Divider */}
        <Divider />

        {/* 6. Proposal */}
        <Proposal onYes={() => setPetalMode("celebration")} />

        {/* Footer */}
        <footer
          style={{
            padding: "3rem 1.5rem",
            textAlign: "center",
            fontFamily: '"Great Vibes", cursive',
            fontSize: "1.5rem",
            color: "rgba(201,130,106,0.35)",
          }}
          aria-label="Footer"
        >
          made with love ♡
        </footer>
      </main>
    </>
  );
}

/** Subtle rose-gold gradient divider between sections */
function Divider() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "1px",
        maxWidth: "320px",
        margin: "0 auto",
        background: "linear-gradient(90deg, transparent, rgba(201,130,106,0.3), transparent)",
      }}
    />
  );
}
