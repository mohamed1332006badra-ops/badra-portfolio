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
  ShieldAlert,
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
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // 3-second watchdog timer for CSP / X-Frame-Options blocking
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimedOut(true);
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [iframeKey]);

  // Handle escape key & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
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
    setIsTimedOut(false);
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
          {/* Left: Window Controls, Title & Protected LTR Domain Badge */}
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
              <div className="mt-0.5 flex items-center">
                <span dir="ltr" className="font-mono text-xs text-slate-400 truncate inline-block">
                  https://{hostname}
                </span>
              </div>
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
          {isLoading && !isTimedOut && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xs text-slate-300 font-mono text-xs gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              <span>
                {language === "en"
                  ? `Loading https://${hostname} in sandbox...`
                  : `جاري تحميل https://${hostname} في البيئة التجريبية...`}
              </span>
            </div>
          )}

          {/* 3-Second Timeout Fallback Card for CSP / X-Frame-Options Restriction */}
          {isTimedOut ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-slate-950/95 backdrop-blur-sm space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="max-w-md space-y-2">
                <h4 className="text-base font-bold text-white font-mono">
                  {language === "en" ? "Live Sandbox Restricted by CSP" : "المعاينة مقيدة بسياسات أمان النطاق"}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  {language === "en"
                    ? "Preview restricted by target domain security headers (X-Frame-Options / Content-Security-Policy). Click below to launch the live platform directly in a full production window."
                    : "المعاينة المباشرة مقيدة بترويسات حماية النطاق الهدف (X-Frame-Options / CSP). اضغط بالأسفل لفتح المنصة مباشرة في نافذة إنتاج كاملة."}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                  <span>{language === "en" ? "Launch Live Platform Directly" : "فتح المنصة الحية مباشرة"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs border border-slate-700 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{language === "en" ? "Retry Sandbox" : "إعادة المحاولة"}</span>
                </button>
              </div>
            </div>
          ) : null}

          {/* Sandboxed iframe */}
          <iframe
            key={iframeKey}
            src={demoUrl}
            title={project.title.en}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => {
              setIsLoading(false);
              setIsTimedOut(false);
            }}
            onError={() => {
              setIsTimedOut(true);
              setIsLoading(false);
            }}
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
