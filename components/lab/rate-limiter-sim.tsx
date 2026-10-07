"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Send, AlertOctagon, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";

export function RateLimiterSim() {
  const { language } = useI18n();
  const capacity = 10;
  const refillRate = 2; // tokens per second
  const [tokens, setTokens] = useState<number>(10);
  const [stats, setStats] = useState({ allowed: 0, dropped: 0, total: 0 });
  const [isAutoSending, setIsAutoSending] = useState(false);
  const [lastStatus, setLastStatus] = useState<"ok" | "limited" | null>(null);

  const handleRequest = React.useCallback((cost = 1) => {
    setTokens((prev) => {
      if (prev >= cost) {
        setStats((s) => ({ ...s, allowed: s.allowed + 1, total: s.total + 1 }));
        setLastStatus("ok");
        return +(prev - cost).toFixed(1);
      } else {
        setStats((s) => ({ ...s, dropped: s.dropped + 1, total: s.total + 1 }));
        setLastStatus("limited");
        return prev;
      }
    });
  }, []);

  // Refill loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) => Math.min(capacity, +(prev + refillRate / 10).toFixed(1)));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Auto traffic simulation
  useEffect(() => {
    if (!isAutoSending) return;
    const interval = setInterval(() => {
      handleRequest(1);
    }, 300);
    return () => clearInterval(interval);
  }, [isAutoSending, handleRequest]);

  const handleReset = () => {
    setTokens(capacity);
    setStats({ allowed: 0, dropped: 0, total: 0 });
    setLastStatus(null);
    setIsAutoSending(false);
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-[#131622] border border-slate-200 dark:border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-white/5 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-base text-slate-900 dark:text-white">
              {language === "en" ? "Token Bucket Rate Limiter Simulator" : "محاكي خوارزمية Token Bucket"}
            </h4>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold uppercase">
              {language === "en" ? "Algorithm Simulation" : "محاكاة خوارزمية"}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {language === "en"
              ? "In-browser algorithm visualization: Capacity: 10 tokens · Refill Rate: 2 tokens/sec (illustrates API throttling and burst capacity)."
              : "محاكاة خوارزمية تفاعلية بالمتصفح: سعة 10 رموز · معدل تجديد 2 رمز/ثانية (لتوضيح آليات خنق الطلبات وتدفقات الذروة)."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAutoSending(!isAutoSending)}
            icon={isAutoSending ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          >
            {isAutoSending ? (language === "en" ? "Pause Traffic" : "إيقاف التدفق") : (language === "en" ? "Auto Burst" : "تدفق آلي")}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
            {language === "en" ? "Reset" : "إعادة ضبط"}
          </Button>
        </div>
      </div>

      {/* Visual Bucket */}
      <div className="py-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-full sm:w-48 flex flex-col items-center">
          <span className="text-xs font-mono text-slate-500 mb-1">
            Bucket Level ({Math.floor(tokens)} / {capacity})
          </span>
          <div className="w-full h-32 rounded-lg border-2 border-dashed border-slate-300 dark:border-white/20 p-1 flex flex-col-reverse relative overflow-hidden bg-white dark:bg-[#0c0e15]">
            <div
              className="w-full bg-blue-500/80 transition-all duration-150 rounded"
              style={{ height: `${(tokens / capacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Controls & Metrics */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleRequest(1)}
              icon={<Send className="w-3.5 h-3.5" />}
            >
              {language === "en" ? "Send 1 Request" : "إرسال طلب واحد"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRequest(4)}
            >
              {language === "en" ? "Send Burst (4 Req)" : "إرسال دفعة (4 طلبات)"}
            </Button>
          </div>

          {/* Real-time Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">Last Response:</span>
            {lastStatus === "ok" && (
              <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK (Processed)
              </span>
            )}
            {lastStatus === "limited" && (
              <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded border border-red-200 dark:border-red-800">
                <AlertOctagon className="w-3.5 h-3.5" /> 429 Too Many Requests (Rate Limited)
              </span>
            )}
            {!lastStatus && (
              <span className="text-xs font-mono text-slate-400">Waiting for trigger</span>
            )}
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-white/5 font-mono text-center">
            <div className="p-2 rounded bg-white dark:bg-[#1b2030]">
              <span className="text-[10px] text-slate-400 block">TOTAL</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{stats.total}</span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-[#1b2030]">
              <span className="text-[10px] text-emerald-500 block">200 OK</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{stats.allowed}</span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-[#1b2030]">
              <span className="text-[10px] text-red-500 block">429 DROPPED</span>
              <span className="text-sm font-bold text-red-600 dark:text-red-400">{stats.dropped}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
