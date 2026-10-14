"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechLogo } from "@/components/ui/brand-logos";
import {
  BookOpen,
  ArrowUpRight,
  ExternalLink,
  TrendingUp,
} from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (projectId: string) => void;
  onInspectArchitecture?: (project: Project) => void;
}

export function ProjectCard({
  project,
  onOpenCaseStudy,
}: ProjectCardProps) {
  const { language, direction } = useI18n();

  const cleanDomain = project.demoUrl
    ? project.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.slug}.badra.systems`;

  return (
    <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/70 backdrop-blur-md p-5 sm:p-7 hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 group shadow-sm hover:shadow-2xl relative overflow-hidden card-spotlight-border">
      {/* Ambient hover border glow */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-indigo-500/10 blur-sm -z-10 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800/60">
          <Badge variant={project.category === "ai" ? "purple" : "accent"} size="sm">
            {language === "en" ? project.categoryLabel.en : project.categoryLabel.ar}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400 font-semibold tracking-wide">
              {language === "en" ? "STATUS: PRODUCTION" : "الحالة: إنتاج حي"}
            </span>
          </div>
        </div>

        {/* Real Live Screenshot in Sleek macOS Glassmorphic Frame */}
        <div className="mb-5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-lg group-hover:border-blue-500/40 dark:group-hover:border-cyan-500/40 transition-all">
          {/* macOS Top Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-900/95 border-b border-slate-800/80 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-950/90 border border-slate-800 text-[11px] font-mono text-slate-300 truncate max-w-[240px] sm:max-w-[340px]" dir="ltr">
              <span className="text-emerald-400 font-semibold">https://</span>
              <span className="truncate">{cleanDomain}</span>
            </div>
            <div className="w-10" />
          </div>

          {/* Real High-Resolution Screenshot Thumbnail with Hover Zoom */}
          <div
            onClick={() => {
              if (project.demoUrl) {
                window.open(project.demoUrl, "_blank", "noopener,noreferrer");
              } else {
                onOpenCaseStudy(project.id);
              }
            }}
            title={language === "en" ? `Launch ${cleanDomain} in new tab` : `فتح ${cleanDomain} في علامة تبويب جديدة`}
            className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 shadow-2xl cursor-pointer group/preview"
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={language === "en" ? project.title.en : project.title.ar}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={92}
                priority={project.featured}
                className="object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.04]"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center text-xs font-mono text-slate-500">
                {cleanDomain}
              </div>
            )}
            {/* Subtle Gradient Vignette on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-center pb-3">
              <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-white font-mono text-[11px] shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                <span>{language === "en" ? "Visit Live Site" : "زيارة الموقع الحي"}</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </span>
            </div>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
          {language === "en" ? project.title.en : project.title.ar}
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
          {language === "en" ? project.tagline.en : project.tagline.ar}
        </p>

        {/* Telemetry Badges */}
        {project.telemetryBadges && project.telemetryBadges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
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

        {/* Compact 1-line Ticker Badge for Gulf Building Materials Engine */}
        {project.simulationType === "materials-calculator" && (
          <div className="mb-4 px-3 py-2 rounded-lg border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold truncate">
              <TrendingUp className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">
                {language === "en" ? "Shuwaikh Spot: 228 KWD/t ▲ | Structural Engine Ready" : "مؤشر الشويخ: 228 د.ك/طن ▲ | حاسبة الأحمال نشطة"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project.id)}
              className="text-[11px] text-amber-600 dark:text-amber-300 underline underline-offset-2 shrink-0 cursor-pointer ml-2"
            >
              {language === "en" ? "Test Engine →" : "اختبر المحرك ←"}
            </button>
          </div>
        )}

        {/* Problem & Solution Snippet */}
        <div className="space-y-3 mb-5 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/60 text-xs">
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

        {/* Official Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80"
            >
              <TechLogo name={t} className="w-3.5 h-3.5 shrink-0" />
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons: ONLY TWO clean, high-contrast buttons */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] text-center"
          >
            <span>{language === "en" ? "Launch Live Platform" : "فتح المنصة الحية"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenCaseStudy(project.id)}
          className="w-full justify-center group text-xs font-mono"
        >
          <BookOpen className="w-3.5 h-3.5 mr-1 text-blue-500" />
          <span>{language === "en" ? "System Architecture" : "المعمارية الهندسية"}</span>
          <ArrowUpRight
            className={`w-3.5 h-3.5 ${
              direction === "rtl" ? "rotate-90" : ""
            } group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`}
          />
        </Button>
      </div>
    </div>
  );
}
