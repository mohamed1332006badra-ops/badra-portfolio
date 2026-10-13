"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectVisualPreview } from "./project-visual-preview";
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

  const isExternal = project.demoUrl?.startsWith("http");

  return (
    <div className="h-full flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-7 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group shadow-sm hover:shadow-xl relative overflow-hidden">
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
        <div className="mb-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-md group-hover:border-blue-500/40 transition-all">
          {/* Window Top Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800/80 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 truncate max-w-[220px] sm:max-w-[320px]">
              <span className="text-emerald-400">https://</span>
              <span className="truncate">
                {project.demoUrl
                  ? project.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                  : `${project.slug}.badra.systems`}
              </span>
            </div>
            <div className="w-10" />
          </div>

          {/* High-Density Photorealistic React UI Visual Preview */}
          <div
            onClick={() => {
              if (project.demoUrl) {
                if (isExternal) {
                  window.open(project.demoUrl, "_blank", "noopener,noreferrer");
                } else {
                  window.location.href = project.demoUrl;
                }
              } else {
                onOpenCaseStudy(project.id);
              }
            }}
            className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 shadow-2xl cursor-pointer"
          >
            <ProjectVisualPreview projectSlug={project.slug} />
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
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

        {/* Compact 1-line Ticker Badge for Gulf Building Materials Engine (Strict Grid Symmetry Preserved!) */}
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

      {/* Action Buttons: ONLY TWO clean, high-contrast buttons */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {project.demoUrl && (
          isExternal ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] text-center"
            >
              <span>{language === "en" ? "Launch Live Platform" : "فتح المنصة الحية"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              href={project.demoUrl}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] text-center"
            >
              <span>{language === "en" ? "Launch Live Platform" : "فتح المنصة الحية"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )
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
