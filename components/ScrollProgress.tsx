// ============================================================
//  components/ScrollProgress.tsx — Thin rose-gold bar at top
// ============================================================
"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.width = `${progress * 100}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      id="scroll-progress"
      aria-hidden="true"
      style={{ width: "0%" }}
    />
  );
}
