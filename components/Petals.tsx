// ============================================================
//  components/Petals.tsx
//  Canvas: floating rose petals + hearts in background.
//  Two modes: "ambient" (always subtle) and "celebration"
//  (triggered after "Yes" — more petals, more hearts).
// ============================================================
"use client";

import { useEffect, useRef } from "react";

type Mode = "ambient" | "celebration";

interface PetalParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  size: number;
  type: "petal" | "heart";
  color: string;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmp: number;
}

const PETAL_COLORS = [
  "rgba(232,160,160,",
  "rgba(201,130,106,",
  "rgba(245,198,208,",
  "rgba(212,168,83,",
  "rgba(255,200,200,",
];

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  const s = size * 0.5;
  ctx.moveTo(0, s * 0.4);
  ctx.bezierCurveTo(-s, -s * 0.2, -s * 2, s * 0.6, 0, s * 1.6);
  ctx.bezierCurveTo(s * 2, s * 0.6, s, -s * 0.2, 0, s * 0.4);
  ctx.closePath();
  ctx.restore();
}

function drawPetal(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.4, size, 0, 0, Math.PI * 2);
  ctx.restore();
}

export default function Petals({ mode = "ambient" }: { mode?: Mode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<PetalParticle[]>([]);
  const rafRef = useRef<number>(0);
  const modeRef = useRef(mode);

  // Update mode ref when prop changes
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const isCelebration = modeRef.current === "celebration";
      const count = isCelebration ? 3 : 1;
      for (let i = 0; i < count; i++) {
        const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
        const isCelebHeart = isCelebration && Math.random() < 0.3;
        particles.current.push({
          x: Math.random() * canvas.width,
          y: -20,
          vx: (Math.random() - 0.5) * 1.2,
          vy: Math.random() * 1.2 + 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          alpha: Math.random() * 0.5 + 0.3,
          size: isCelebHeart
            ? Math.random() * 10 + 8
            : Math.random() * 14 + 6,
          type: isCelebHeart ? "heart" : "petal",
          color,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.04 + 0.01,
          wobbleAmp: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const spawnInterval = setInterval(spawn, mode === "celebration" ? 120 : 400);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.y < canvas.height + 40 && p.alpha > 0.01);

      for (const p of particles.current) {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `${p.color}0.6)`;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "heart") {
          drawHeart(ctx, 0, 0, p.size);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.fill();
        } else {
          drawPetal(ctx, 0, 0, p.size);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.fill();
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(spawnInterval);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
