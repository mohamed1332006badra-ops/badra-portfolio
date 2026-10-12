"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Layers,
  BookOpen,
  ArrowUpRight,
  Play,
  Calculator,
  Truck,
  TrendingUp,
  FileCheck2,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onInspectArchitecture: (project: Project) => void;
  onOpenCaseStudy: (projectId: string) => void;
  onOpenLivePreview: (project: Project) => void;
}

export function ProjectCard({
  project,
  onInspectArchitecture,
  onOpenCaseStudy,
  onOpenLivePreview,
}: ProjectCardProps) {
  const { language, direction } = useI18n();

  // State for Kuwait Building Materials interactive simulation
  const [concreteM3, setConcreteM3] = useState<number>(140);
  const [quoteExported, setQuoteExported] = useState<boolean>(false);

  // Derived B2B calculations for Kuwait Materials Engine
  const rebarTons = Number((concreteM3 * 0.12).toFixed(1));
  const truckCount = Math.ceil(concreteM3 / 28);
  const safetyBufferM3 = Number((concreteM3 * 1.05).toFixed(0));
  const isContractorTier = concreteM3 >= 80;
  const discountRate = isContractorTier ? 0.12 : 0.0;
  const shuwaikhSpotKWD = 228; // Kuwait Rebar Spot Index KWD / ton
  const basePriceKWD = concreteM3 * 22 + rebarTons * shuwaikhSpotKWD;
  const finalEstimateKWD = Math.round(basePriceKWD * (1 - discountRate));

  const handleSimulateQuote = () => {
    setQuoteExported(true);
    setTimeout(() => setQuoteExported(false), 3000);
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-7 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group shadow-sm hover:shadow-xl relative overflow-hidden">
      <div>
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800/60">
          <Badge variant={project.category === "ai" ? "purple" : "accent"} size="sm">
            {language === "en" ? project.categoryLabel.en : project.categoryLabel.ar}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400 uppercase font-medium">
              STATUS: {project.status}
            </span>
          </div>
        </div>

        {/* Visual Mockup Container in Dark Minimalist Browser Frame */}
        {project.image && (
          <div className="mb-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-md group-hover:border-blue-500/40 transition-all">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800/80 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 truncate max-w-[220px] sm:max-w-[320px]">
                {project.demoUrl ? (
                  <>
                    <span className="text-emerald-400">https://</span>
                    <span className="truncate">{project.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                  </>
                ) : (
                  <>
                    <span className="text-blue-400">enterprise://</span>
                    <span className="truncate">{project.slug}.internal</span>
                  </>
                )}
              </div>
              <div className="w-10" />
            </div>

            {/* Mockup Image with Responsive Layout & Shimmer Fallback */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <Image
                src={project.image}
                alt={project.title.en}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={project.featured}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Hover Quick Action Overlay */}
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                {project.demoUrl ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onOpenLivePreview(project)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{language === "en" ? "Live Sandbox" : "المعاينة الحية"}</span>
                    </button>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-mono text-xs font-medium border border-slate-700 shadow-lg transition-colors"
                    >
                      <span>{language === "en" ? "Direct URL" : "زيارة الموقع"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => onOpenCaseStudy(project.id)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "Deep-Dive Case Study" : "دراسة الحالة"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onInspectArchitecture(project)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-mono text-xs font-medium border border-slate-700 shadow-lg transition-colors cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{language === "en" ? "Architecture" : "المعمارية"}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
          {language === "en" ? project.title.en : project.title.ar}
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          {language === "en" ? project.tagline.en : project.tagline.ar}
        </p>

        {/* Telemetry Badges */}
        {project.telemetryBadges && project.telemetryBadges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.telemetryBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>{language === "en" ? badge.en : badge.ar}</span>
              </span>
            ))}
          </div>
        )}

        {/* Interactive B2B Simulation Widget (Exclusively for Gulf Building Materials Engine) */}
        {project.simulationType === "materials-calculator" && (
          <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 backdrop-blur-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                <Calculator className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  {language === "en"
                    ? "Interactive B2B Structural Calculator Engine"
                    : "محرك حساب الأحمال الإنشائية ومواد البناء (B2B)"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span>Shuwaikh Spot: 228 KWD/t ▲</span>
              </div>
            </div>

            {/* Concrete Volume Slider */}
            <div className="space-y-1.5 mb-3.5">
              <div className="flex justify-between text-xs font-mono text-slate-700 dark:text-slate-300">
                <span>{language === "en" ? "Concrete Slab Volume ($m^3$):" : "حجم الخرسانة المسلحة ($m^3$):"}</span>
                <strong className="text-amber-600 dark:text-amber-400 font-bold">{concreteM3} $m^3$</strong>
              </div>
              <input
                type="range"
                min="20"
                max="400"
                step="10"
                value={concreteM3}
                onChange={(e) => setConcreteM3(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Computed Logistics & Financial Outputs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono mb-3.5">
              <div className="p-2 rounded bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block text-[10px]">
                  {language === "en" ? "Rebar Tonnage" : "حديد التسليح"}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{rebarTons} Tons</span>
              </div>

              <div className="p-2 rounded bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                  <Truck className="w-3 h-3" />
                  <span>{language === "en" ? "Mixer Fleet" : "شاحنات النقل"}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{truckCount} Trucks (28m³)</span>
              </div>

              <div className="p-2 rounded bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-500 block text-[10px]">
                  {language === "en" ? "Waste Margin" : "هامش الأمان"}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">+5% ({safetyBufferM3}m³)</span>
              </div>
            </div>

            {/* B2B Contractor Tier Price & Quote Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-500/20 text-xs font-mono">
              <div>
                <span className="text-slate-500 text-[11px] block">
                  {isContractorTier
                    ? (language === "en" ? "Tier-2 Contractor Matrix (-12%):" : "تسعير مقاولي الفئة الثانية (-12%):")
                    : (language === "en" ? "Standard Commercial Estimate:" : "التقدير التجاري المبدئي:")}
                </span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  {finalEstimateKWD.toLocaleString()} KWD (Net)
                </span>
              </div>

              <button
                type="button"
                onClick={handleSimulateQuote}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-semibold transition-all shadow-xs cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>
                  {quoteExported
                    ? (language === "en" ? "Quotation Generated!" : "تم إنشاء العرض!")
                    : (language === "en" ? "Simulate B2B Quote" : "توليد عرض سعر B2B")}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Problem & Solution Snippet */}
        <div className="space-y-3 mb-6 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/60 text-xs">
          <div>
            <span className="font-mono uppercase tracking-wider text-rose-500 font-semibold block mb-0.5">
              {language === "en" ? "Problem:" : "المشكلة:"}
            </span>
            <span className="text-slate-700 dark:text-slate-300 line-clamp-2">
              {language === "en" ? project.problem.en : project.problem.ar}
            </span>
          </div>
          <div>
            <span className="font-mono uppercase tracking-wider text-emerald-500 font-semibold block mb-0.5">
              {language === "en" ? "Solution:" : "الحل:"}
            </span>
            <span className="text-slate-700 dark:text-slate-300 line-clamp-2">
              {language === "en" ? project.solution.en : project.solution.ar}
            </span>
          </div>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onInspectArchitecture(project)}
          >
            <Layers className="w-3.5 h-3.5 mr-1" />
            <span>{language === "en" ? "Architecture" : "المعمارية"}</span>
          </Button>

          {project.demoUrl ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenLivePreview(project)}
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
            >
              <Play className="w-3.5 h-3.5 mr-1" />
              <span>{language === "en" ? "Live Sandbox" : "معاينة حية"}</span>
            </Button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 font-medium select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>
                {language === "en"
                  ? "[ Enterprise Production / Private Showcase ]"
                  : "[ إنتاج مؤسسي / متاح بعرض خاص ]"}
              </span>
            </span>
          )}
        </div>

        {project.hasCaseStudy && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenCaseStudy(project.id)}
            className="group"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            <span>{language === "en" ? "Case Study" : "دراسة الحالة"}</span>
            <ArrowUpRight
              className={`w-3.5 h-3.5 ${
                direction === "rtl" ? "rotate-90" : ""
              } group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
