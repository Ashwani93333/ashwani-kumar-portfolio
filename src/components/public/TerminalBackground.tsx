"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const PARTICLES = [
  "</>",
  "{ }",
  "=>",
  "fn()",
  "npm i",
  "$",
  "class",
  "public",
  "return",
  "async",
  "await",
  "void",
  "byte",
  "int",
  "//",
  "git",
  "push",
  "yarn",
  "&&",
  "||",
];

const COLORS = [
  "rgba(250,178,131,0.35)", // primary peach
  "rgba(157,124,216,0.35)", // accent purple
  "rgba(127,216,143,0.3)",  // success green
  "rgba(86,182,194,0.3)",   // info cyan
  "rgba(245,167,66,0.3)",   // warning orange
];

interface Particle {
  id: number;
  text: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

/**
 * Fixed full-viewport background: faint grid, floating code particles,
 * scanlines and a soft cursor glow that follows the mouse.
 */
export function TerminalBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  const particlesMemo = useMemo(() => {
    return Array.from({ length: 26 }, (_, i) => ({
      id: i,
      text: PARTICLES[i % PARTICLES.length],
      left: Math.random() * 100,
      size: 10 + Math.random() * 8,
      duration: 16 + Math.random() * 18,
      delay: Math.random() * 20,
      color: COLORS[i % COLORS.length],
    }));
  }, []);

  useEffect(() => setParticles(particlesMemo), [particlesMemo]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!glowRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      glowRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0b0a09] to-[#0a0a0a]" />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Cursor glow that follows the mouse */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-60 blur-[120px] animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(250,178,131,0.09) 0%, rgba(157,124,216,0.06) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Floating code particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="float-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {p.text}
        </span>
      ))}

      {/* CRT scanlines */}
      <div className="absolute inset-0 scanlines opacity-60" />
    </div>
  );
}
