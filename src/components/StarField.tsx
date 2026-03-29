"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number;
  opacity: number; twinkleSpeed: number; twinkleOffset: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const STARS = 180;
    const stars: Star[] = Array.from({ length: STARS }, () => ({
      x:            Math.random() * W,
      y:            Math.random() * H,
      r:            Math.random() * 1.3 + 0.2,
      opacity:      Math.random() * 0.65 + 0.1,
      twinkleSpeed: Math.random() * 0.018 + 0.004,
      twinkleOffset:Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t++;
      for (const s of stars) {
        const a = s.opacity * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.r > 1
          ? `rgba(140, 215, 255, ${a})`
          : `rgba(255, 255, 255, ${a})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      aria-hidden="true"
    />
  );
}
