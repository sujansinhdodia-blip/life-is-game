// ============================================================
//  components/MusicPlayer.tsx
//  Small floating play/pause button.
//  The <audio> element is controlled externally via a ref
//  that gets passed up from IntroScreen.
// ============================================================
"use client";

import { useState, useEffect } from "react";

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  visible: boolean;
}

export default function MusicPlayer({ audioRef, visible }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 900,
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        border: "1px solid rgba(201,130,106,0.4)",
        background: "rgba(10,0,8,0.7)",
        backdropFilter: "blur(12px)",
        color: "#e8a0a0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 0 20px rgba(201,130,106,0.2)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        fontSize: "20px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 30px rgba(201,130,106,0.5)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 20px rgba(201,130,106,0.2)";
      }}
    >
      {playing ? (
        /* Pause icon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        /* Play icon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      )}
    </button>
  );
}
