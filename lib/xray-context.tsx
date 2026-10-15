"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n-context";
import { X, Terminal } from "lucide-react";

interface XRayContextType {
  xrayMode: boolean;
  toggleXRayMode: () => void;
  setXRayMode: (val: boolean) => void;
}

const XRayContext = createContext<XRayContextType | undefined>(undefined);

export function XRayProvider({ children }: { children: React.ReactNode }) {
  const [xrayMode, setXRayMode] = useState<boolean>(false);

  // Global Alt+X Hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
        setXRayMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update HTML attribute and body class for blueprint grid styling
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (xrayMode) {
      document.documentElement.classList.add("xray-active");
      document.body.classList.add("xray-mode-on");
    } else {
      document.documentElement.classList.remove("xray-active");
      document.body.classList.remove("xray-mode-on");
    }
  }, [xrayMode]);

  const toggleXRayMode = () => setXRayMode((prev) => !prev);

  return (
    <XRayContext.Provider value={{ xrayMode, toggleXRayMode, setXRayMode }}>
      {children}
      {xrayMode && <XRayFloatingHUD />}
    </XRayContext.Provider>
  );
}

export function useXRay() {
  const context = useContext(XRayContext);
  if (!context) {
    throw new Error("useXRay must be used within an XRayProvider");
  }
  return context;
}

// Floating HUD pill indicating active X-Ray Mode with 1-click exit
function XRayFloatingHUD() {
  const { toggleXRayMode } = useXRay();
  const { language } = useI18n();

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950/90 border border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.4)] backdrop-blur-md text-white font-mono text-xs select-none animate-bounce"
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>
        <span className="font-bold text-cyan-300 uppercase tracking-wider">
          {language === "en" ? "Architect X-Ray Mode: ACTIVE" : "وضع الأشعة السينية المعماري: نشط"}
        </span>
      </div>

      <span className="text-slate-500 hidden sm:inline">|</span>

      <span className="text-[11px] text-slate-300 hidden sm:inline">
        {language === "en" ? "Alt+X to toggle" : "اضغط Alt+X للتبديل"}
      </span>

      <button
        type="button"
        onClick={toggleXRayMode}
        className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
        aria-label="Exit X-Ray Mode"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// Architectural Component Inspection Tag for X-Ray Mode
export function XRayTag({
  component,
  props,
}: {
  component: string;
  props?: Record<string, string | number | boolean>;
}) {
  const { xrayMode } = useXRay();
  if (!xrayMode) return null;

  const propString = props
    ? Object.entries(props)
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ")
    : "";

  return (
    <div
      dir="ltr"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded bg-cyan-950/90 border border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)] text-cyan-300 font-mono text-[10.5px] select-none backdrop-blur-xs z-20 pointer-events-none"
    >
      <Terminal className="w-3 h-3 text-cyan-400" />
      <span className="font-bold">{`<${component}${propString ? ` ${propString}` : ""} />`}</span>
    </div>
  );
}
