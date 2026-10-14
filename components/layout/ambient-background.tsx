"use client";

import React, { useEffect, useRef } from "react";

export function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch & mobile screen detection: disable continuous mousemove spotlight on touch screens
    const isTouchOrCoarse =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);

    if (isTouchOrCoarse) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      spotlightRef.current.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      if (!spotlightRef.current) return;
      spotlightRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500 max-w-[100vw]"
      aria-hidden="true"
    >
      {/* 1. Dynamic Aurora Mesh Orbs with hardware acceleration & mobile-reduced blur */}
      <div
        style={{ transform: "translateZ(0)" }}
        className="absolute top-[-10%] left-[-5%] w-[320px] h-[320px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-blue-500/10 to-transparent blur-xl md:blur-3xl dark:from-indigo-600/20 dark:via-blue-600/15 animate-aurora-slow will-change-transform"
      />
      <div
        style={{ transform: "translateZ(0)" }}
        className="absolute top-[35%] right-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-transparent blur-xl md:blur-3xl dark:from-cyan-500/20 dark:via-emerald-500/10 animate-aurora-reverse will-change-transform"
      />
      <div
        style={{ transform: "translateZ(0)" }}
        className="absolute bottom-[-10%] left-[20%] w-[340px] h-[300px] md:w-[700px] md:h-[550px] rounded-full bg-gradient-to-tr from-purple-600/15 via-indigo-500/10 to-transparent blur-xl md:blur-3xl dark:from-purple-600/20 dark:via-indigo-500/15 animate-aurora-slow will-change-transform"
      />

      {/* 2. Cyber-Grid Architectural Matrix with Perspective */}
      <div className="absolute inset-0 bg-cyber-grid opacity-[0.4] dark:opacity-[0.25]" />

      {/* 3. Glowing Light Beams traveling along grid lines */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Horizontal Beam 1 */}
        <div className="absolute top-[28%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-beam-horizontal" />
        {/* Horizontal Beam 2 */}
        <div className="absolute top-[68%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent animate-beam-horizontal-delayed" />
        {/* Vertical Beam 1 */}
        <div className="absolute top-0 left-[22%] w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/40 to-transparent animate-beam-vertical" />
        {/* Vertical Beam 2 */}
        <div className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/40 to-transparent animate-beam-vertical-delayed" />
      </div>

      {/* 4. Mouse-Following Interactive Radial Spotlight (Desktop only) */}
      <div
        ref={spotlightRef}
        style={{
          width: "600px",
          height: "600px",
          opacity: 0,
          transition: "opacity 0.4s ease-out",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
        className="hidden md:block absolute top-0 left-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,rgba(99,102,241,0.06)_40%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,rgba(99,102,241,0.09)_40%,transparent_70%)] pointer-events-none"
      />
    </div>
  );
}
