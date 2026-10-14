"use client";

import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, Shield, Code, Cpu, FileText, Zap, Activity, CheckCheck } from "lucide-react";
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

export function Hero({ onOpenContactModal, onOpenAiScoper, onOpenResumeModal }: HeroProps) {
  const { language, direction } = useI18n();

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
              {language === "en" ? SITE_METADATA.availability.en : SITE_METADATA.availability.ar}
            </span>
          </div>

          {/* Name & Titles */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
            <span className="block font-mono text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-widest">
              {SITE_METADATA.brand} · {SITE_METADATA.name}
            </span>
            <span className="block text-slate-800 dark:text-slate-100">
              {language === "en" ? "Full-Stack Developer" : "مطور برمجيات شامل"}
            </span>
            <span className="block text-slate-600 dark:text-slate-400 font-normal">
              {language === "en" ? "AI Engineer · Product Builder" : "مهندس ذكاء اصطناعي · صانع منتجات"}
            </span>
          </h1>

          {/* Core Master Statement */}
          <p className="text-lg sm:text-2xl font-medium text-slate-700 dark:text-slate-200 mt-6 mb-8 leading-relaxed">
            {language === "en" ? SITE_METADATA.coreStatement.en : SITE_METADATA.coreStatement.ar}
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
                <ArrowRight className={`w-4 h-4 ${direction === "rtl" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
              </Button>
            </a>

            <Button
              variant="outline"
              size="lg"
              onClick={onOpenContactModal}
            >
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

        {/* Live Engineering Impact Bar */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800/80 [dir=rtl]:sm:divide-x-reverse">
          {/* Metric 1 */}
          <div className="pt-2 sm:pt-0 sm:px-4 first:px-0">
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 text-xs font-mono font-semibold mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Architected" : "الأنظمة المنفذة"}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              8+
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              {language === "en" ? "Production Systems" : "أنظمة إنتاجية حية"}
            </div>
          </div>

          {/* Metric 2 */}
          <div className="pt-2 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Latency" : "زمن الاستجابة"}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              &lt;50ms
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              {language === "en" ? "Edge API Response" : "استجابة الحافة السحابية"}
            </div>
          </div>

          {/* Metric 3 */}
          <div className="pt-2 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Availability" : "معدل الجاهزية"}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              99.98%
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              {language === "en" ? "Production Uptime" : "استقرار تشغيلي موثق"}
            </div>
          </div>

          {/* Metric 4 */}
          <div className="pt-2 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 text-xs font-mono font-semibold mb-1">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{language === "en" ? "Reliability" : "الموثوقية"}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              100%
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              {language === "en" ? "Type-Safe End-to-End" : "أمان نوعي شامل"}
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
