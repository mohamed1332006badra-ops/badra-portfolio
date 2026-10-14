"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Shield,
  Code,
  Cpu,
  FileText,
  Zap,
  Activity,
  CheckCheck,
} from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { SITE_METADATA } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { ArchitectureVisualizer } from "./architecture-visualizer";
import { TechStackMarquee } from "@/components/ui/brand-logos";

interface HeroProps {
  onOpenContactModal: () => void;
  onOpenAiScoper: () => void;
  onOpenResumeModal?: () => void;
}

export function Hero({
  onOpenContactModal,
  onOpenAiScoper,
  onOpenResumeModal,
}: HeroProps) {
  const { language, direction } = useI18n();

  // Sequential cascading number counters state
  const [counter1, setCounter1] = useState("0%");
  const [counter2, setCounter2] = useState("250ms");
  const [counter3, setCounter3] = useState("00.00%");
  const [counter4, setCounter4] = useState("0%");
  const [flashIndex, setFlashIndex] = useState<number | null>(null);

  const impactBarRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const startCascadingCounters = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const startTime = performance.now();
    let f1 = false;
    let f2 = false;
    let f3 = false;
    let f4 = false;

    // Easing function: smooth exponential out
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (now: number) => {
      const elapsed = now - startTime;

      // Metric 1: 0ms -> 650ms (0% -> 100%)
      if (elapsed < 650) {
        const p = easeOutExpo(Math.max(0, elapsed / 650));
        setCounter1(`${Math.round(p * 100)}%`);
      } else {
        setCounter1("100%");
        if (!f1) {
          f1 = true;
          setFlashIndex(1);
          setTimeout(() => setFlashIndex((prev) => (prev === 1 ? null : prev)), 400);
        }
      }

      // Metric 2: 500ms -> 1150ms (250ms -> <50ms)
      if (elapsed < 500) {
        setCounter2("250ms");
      } else if (elapsed < 1150) {
        const p = easeOutExpo((elapsed - 500) / 650);
        const val = Math.max(50, Math.round(250 - p * 200));
        setCounter2(val <= 50 ? "<50ms" : `${val}ms`);
      } else {
        setCounter2("<50ms");
        if (!f2) {
          f2 = true;
          setFlashIndex(2);
          setTimeout(() => setFlashIndex((prev) => (prev === 2 ? null : prev)), 400);
        }
      }

      // Metric 3: 1000ms -> 1650ms (00.00% -> 99.98%)
      if (elapsed < 1000) {
        setCounter3("00.00%");
      } else if (elapsed < 1650) {
        const p = easeOutExpo((elapsed - 1000) / 650);
        const val = (p * 99.98).toFixed(2);
        setCounter3(`${val.padStart(5, "0")}%`);
      } else {
        setCounter3("99.98%");
        if (!f3) {
          f3 = true;
          setFlashIndex(3);
          setTimeout(() => setFlashIndex((prev) => (prev === 3 ? null : prev)), 400);
        }
      }

      // Metric 4: 1500ms -> 2150ms (0% -> 100%)
      if (elapsed < 1500) {
        setCounter4("0%");
      } else if (elapsed < 2150) {
        const p = easeOutExpo((elapsed - 1500) / 650);
        setCounter4(`${Math.round(p * 100)}%`);
      } else {
        setCounter4("100%");
        if (!f4) {
          f4 = true;
          setFlashIndex(4);
          setTimeout(() => setFlashIndex((prev) => (prev === 4 ? null : prev)), 400);
        }
      }

      if (elapsed < 2400) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const el = impactBarRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCascadingCounters();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section className="relative pt-12 pb-12 md:pt-20 md:pb-16 overflow-hidden tech-grid-bg">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-purple-500/10 dark:bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Engineering status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 dark:text-slate-300">
              {language === "en"
                ? SITE_METADATA.availability.en
                : SITE_METADATA.availability.ar}
            </span>
          </div>

          {/* Name & Titles with Prominent Executive Portrait */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 mb-6">
            {/* Prominent rounded-3xl glowing portrait frame focusing on face & command center */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden ring-2 ring-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.45)] shrink-0 bg-slate-950 group">
              <Image
                src="/badra-portrait-crop.webp"
                alt="Eng. Mohamed Ahmed Badra"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 112px, 144px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl pointer-events-none" />
              {/* Live production indicator */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            <div>
              <span className="block font-mono text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mb-1.5 uppercase tracking-widest">
                {SITE_METADATA.brand} · {SITE_METADATA.name}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                <span className="block">
                  {language === "en" ? "Full-Stack Developer" : "مطور برمجيات شامل"}
                </span>
                <span className="block text-slate-600 dark:text-slate-400 font-normal text-lg sm:text-2xl mt-1">
                  {language === "en"
                    ? "AI Systems Architect · Product Builder"
                    : "مهندس نظم الذكاء الاصطناعي · صانع منتجات"}
                </span>
              </h1>
            </div>
          </div>

          {/* Core Master Statement */}
          <p className="text-lg sm:text-2xl font-medium text-slate-700 dark:text-slate-200 mt-6 mb-8 leading-relaxed">
            {language === "en"
              ? SITE_METADATA.coreStatement.en
              : SITE_METADATA.coreStatement.ar}
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
            {language === "en"
              ? "Architecting high-throughput web applications, deterministic RAG pipelines, and scalable digital systems built for resilience, speed, and real business utility."
              : "هندسة تطبيقات الويب المتكاملة عالية الأداء، ومسارات الذكاء الاصطناعي والاسترجاع المعرفي الدقيق، والأنظمة الرقمية المصممة للسرعة والموثوقية."}
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            <a href="#projects">
              <Button variant="primary" size="lg" className="group">
                <span>{language === "en" ? "Explore Work" : "استكشف المشاريع"}</span>
                <ArrowRight
                  className={`w-4 h-4 ${
                    direction === "rtl" ? "rotate-180" : ""
                  } group-hover:translate-x-1 transition-transform`}
                />
              </Button>
            </a>

            <Button variant="outline" size="lg" onClick={onOpenContactModal}>
              {language === "en" ? "Start a Project" : "ابدأ مشروعك"}
            </Button>

            {onOpenResumeModal && (
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>{language === "en" ? "Resume / ATS PDF" : "السيرة الذاتية / PDF"}</span>
              </button>
            )}

            <button
              onClick={onOpenAiScoper}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>{language === "en" ? "AI Project Scoper" : "المخطط الذكي للمشاريع"}</span>
            </button>
          </div>

          {/* Core Engineering Disciplines */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{language === "en" ? "Strict TypeScript" : "أمان نوعي صارم"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-500 shrink-0" />
              <span>{language === "en" ? "RAG & LLM Systems" : "أنظمة ذكاء متقدمة"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{language === "en" ? "Security by Design" : "أمان في صلب البناء"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{language === "en" ? "Zero Fake Metrics" : "شفافية وموثوقية"}</span>
            </div>
          </div>
        </div>

        {/* Live Engineering Impact Bar with Sequential Cascading Number Counters */}
        <div
          ref={impactBarRef}
          className="mt-12 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800/80 [dir=rtl]:sm:divide-x-reverse"
        >
          {/* Metric 1: Production-Verified (0ms -> 650ms, 0% -> 100%) */}
          <div
            className={`pt-2 sm:pt-0 sm:px-4 first:px-0 rounded-xl transition-all duration-300 ${
              flashIndex === 1
                ? "ring-2 ring-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 text-xs font-mono font-semibold mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>
                {language === "en" ? "Production-Verified" : "أنظمة موثقة في الإنتاج"}
              </span>
            </div>
            <div
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight"
              dir="ltr"
            >
              {counter1}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              {language === "en" ? "Live Flagship Systems" : "أنظمة إنتاجية حية"}
            </div>
          </div>

          {/* Metric 2: Latency (500ms -> 1150ms, 250ms -> <50ms) */}
          <div
            className={`pt-2 sm:pt-0 sm:px-4 rounded-xl transition-all duration-300 ${
              flashIndex === 2
                ? "ring-2 ring-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Latency" : "زمن الاستجابة"}</span>
            </div>
            <div
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight"
              dir="ltr"
            >
              {counter2}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              {language === "en" ? "Edge API Response" : "استجابة خوادم الحافة"}
            </div>
          </div>

          {/* Metric 3: Availability (1000ms -> 1650ms, 00.00% -> 99.98%) */}
          <div
            className={`pt-2 sm:pt-0 sm:px-4 rounded-xl transition-all duration-300 ${
              flashIndex === 3
                ? "ring-2 ring-indigo-400 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Availability" : "معدل الجاهزية"}</span>
            </div>
            <div
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight"
              dir="ltr"
            >
              {counter3}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              {language === "en" ? "Production Uptime" : "استقرار تشغيلي مستمر"}
            </div>
          </div>

          {/* Metric 4: Reliability (1500ms -> 2150ms, 0% -> 100%) */}
          <div
            className={`pt-2 sm:pt-0 sm:px-4 rounded-xl transition-all duration-300 ${
              flashIndex === 4
                ? "ring-2 ring-purple-400 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 text-xs font-mono font-semibold mb-1">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Reliability" : "الاعتمادية الهندسية"}</span>
            </div>
            <div
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight"
              dir="ltr"
            >
              {counter4}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              {language === "en" ? "Type-Safe End-to-End" : "أمان برمجي شامل"}
            </div>
          </div>
        </div>

        {/* Hero Interactive Visualization */}
        <div className="mt-12 lg:mt-14">
          <ArchitectureVisualizer />
        </div>
      </div>

      {/* Infinite Animated Tech Stack Marquee */}
      <div className="mt-12">
        <TechStackMarquee />
      </div>
    </section>
  );
}
