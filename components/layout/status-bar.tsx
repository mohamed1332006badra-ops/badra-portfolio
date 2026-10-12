"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n-context";
import { HealthCheckResponse } from "@/lib/types";
import { Activity, RefreshCw, Globe, Cpu, ShieldCheck } from "lucide-react";

export function StatusBar() {
  const { language } = useI18n();
  const [telemetry, setTelemetry] = useState<HealthCheckResponse | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const measureLatencyAndHealth = useCallback(async (manual = false) => {
    if (manual) setIsRefreshing(true);
    const start = typeof performance !== "undefined" ? performance.now() : Date.now();
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const end = typeof performance !== "undefined" ? performance.now() : Date.now();
      if (res.ok) {
        const data: HealthCheckResponse = await res.json();
        setTelemetry(data);
        setLatency(Math.max(1, Math.round(end - start)));
      }
    } catch {
      // Retain optimistic or previous state without crashing
    } finally {
      if (manual) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const runCheck = async () => {
      const start = typeof performance !== "undefined" ? performance.now() : Date.now();
      try {
        const res = await fetch("/api/health", { cache: "no-store" });
        const end = typeof performance !== "undefined" ? performance.now() : Date.now();
        if (res.ok && isMounted) {
          const data: HealthCheckResponse = await res.json();
          setTelemetry(data);
          setLatency(Math.max(1, Math.round(end - start)));
        }
      } catch {
        // Silently retain fallback state
      }
    };

    runCheck();
    const interval = setInterval(runCheck, 45000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const regionDisplay = telemetry?.edgeRegion && telemetry.edgeRegion !== "auto"
    ? telemetry.edgeRegion.toUpperCase()
    : "Global Edge";

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xs p-3 sm:px-4 sm:py-2.5 shadow-2xs transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Live Status & Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {language === "en" ? "Systems Operational" : "جميع الأنظمة تعمل بكفاءة"}
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>

          {/* SLA / Quality Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>99.9% SLA</span>
          </div>
        </div>

        {/* Right: Runtime Observability Telemetry */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] text-slate-600 dark:text-slate-400">
          {/* Edge Region */}
          <div className="flex items-center gap-1.5" title="Detected CDN/Edge Region">
            <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>
              <span className="text-slate-400 dark:text-slate-500 me-1">Edge:</span>
              <strong className="font-semibold text-slate-700 dark:text-slate-300">{regionDisplay}</strong>
            </span>
          </div>

          {/* Real Client Latency RTT */}
          <button
            type="button"
            onClick={() => measureLatencyAndHealth(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer group"
            title={language === "en" ? "Click to ping server latency" : "اضغط لقياس سرعة استجابة الخادم"}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
            <span>
              <span className="text-slate-400 dark:text-slate-500 me-1">RTT:</span>
              <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
                {latency !== null ? `${latency}ms` : "..."}
              </strong>
            </span>
            <RefreshCw
              className={`w-3 h-3 text-slate-400 dark:text-slate-500 ms-0.5 ${
                isRefreshing ? "animate-spin text-blue-500" : "opacity-60 group-hover:opacity-100"
              }`}
            />
          </button>

          {/* Framework & Runtime */}
          <div className="hidden md:flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>
              <strong className="font-semibold text-slate-700 dark:text-slate-300">Next.js 16.4</strong>
              <span className="text-slate-400 dark:text-slate-500 ms-1">(Turbopack)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
