// ============================================================
//  components/SparkleCursor.tsx
//  Desktop-only sparkle trail following the mouse.
//  Skipped entirely on touch devices (pointer: coarse).
// ============================================================
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  dx: number;
  dy: number;
  color: string;
}

const COLORS = ["#c9826a", "#e8a0a0", "#f5c6d0", "#d4a853", "#fff0e8"];

export default function SparkleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Spawn 2 sparkles per move
      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          alpha: 1,
          size: Math.random() * 4 + 2,
          dx: (Math.random() - 0.5) * 1.5,
          dy: (Math.random() - 0.5) * 1.5 - 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    // Custom dot cursor
    const cursor = document.createElement("div");
    cursor.style.cssText = `
      position:fixed; pointer-events:none; z-index:99999;
      width:12px; height:12px; border-radius:50%;
      background:radial-gradient(circle, #e8a0a0, #c9826a);
      transform:translate(-50%,-50%);
      box-shadow:0 0 10px #c9826a,0 0 20px rgba(201,130,106,0.4);
      transition:transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", moveCursor);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.alpha > 0.02);
      for (const p of particles.current) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        // Draw a small star / diamond
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.03;
        p.size *= 0.97;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(rafRef.current);
      cursor.remove();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}
