"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  X,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface LivePreviewDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type ViewportMode = "desktop" | "tablet" | "mobile";

function LivePreviewDrawerInner({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { language } = useI18n();
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const demoUrl = project.demoUrl || "https://badra-portfolio.vercel.app";
  const hostname = (() => {
    try {
      return new URL(demoUrl).hostname;
    } catch {
      return demoUrl;
    }
  })();

  const getViewportWidthClass = () => {
    switch (viewport) {
      case "mobile":
        return "w-full max-w-[375px]";
      case "tablet":
        return "w-full max-w-[768px]";
      case "desktop":
      default:
        return "w-full max-w-6xl";
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className={`relative flex flex-col h-[92vh] max-h-[900px] ${getViewportWidthClass()} transition-all duration-300 rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden`}
      >
        {/* Top Header & Viewport Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/90 select-none">
          {/* Left: Window Controls & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  id="preview-title"
                  className="text-sm font-bold text-white truncate font-mono"
                >
                  {language === "en" ? project.title.en : project.title.ar}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sandbox
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 truncate">
                {hostname}
              </p>
            </div>
          </div>

          {/* Center: Viewport Switcher */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              title={language === "en" ? "Desktop (100%)" : "عرض سطح المكتب"}
              className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                viewport === "desktop"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport("tablet")}
              title={language === "en" ? "Tablet (768px)" : "عرض التابلت"}
              className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                viewport === "tablet"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              title={language === "en" ? "Mobile (375px)" : "عرض الهاتف"}
              className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                viewport === "mobile"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleRefresh}
              title={language === "en" ? "Reload Sandbox" : "إعادة تحميل المعاينة"}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={language === "en" ? "Launch Direct in New Tab" : "فتح مباشر في نافذة جديدة"}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
            >
              <span>{language === "en" ? "Launch Direct" : "فتح الرابط"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Sandbox"
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sandbox Content Container */}
        <div className="relative flex-1 bg-slate-900 overflow-hidden flex items-center justify-center">
          {/* Loading Shimmer Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xs text-slate-300 font-mono text-xs gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              <span>
                {language === "en"
                  ? `Loading ${hostname} in sandbox...`
                  : `جاري تحميل ${hostname} في البيئة التجريبية...`}
              </span>
            </div>
          )}

          {/* Sandboxed iframe */}
          <iframe
            key={iframeKey}
            src={demoUrl}
            title={project.title.en}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0 bg-white"
          />
        </div>

        {/* Footer Notice & Security Verification */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/95 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {language === "en"
                ? "Safe Sandbox Isolation: Scripts & forms allowed with restricted top-navigation"
                : "عزل أمني للبيئة التجريبية: تشغيل النصوص والنماذج ضمن إطار محمي"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            <span>
              {language === "en"
                ? "If site blocks framing (CSP), click 'Launch Direct'"
                : "في حال تقييد الإطار بواسطة CSP، استخدم زر 'فتح الرابط'"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LivePreviewDrawer({
  project,
  isOpen,
  onClose,
}: LivePreviewDrawerProps) {
  if (!isOpen || !project) return null;

  return <LivePreviewDrawerInner key={project.id} project={project} onClose={onClose} />;
}
