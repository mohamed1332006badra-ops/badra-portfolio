"use client";

import React from "react";
import Image from "next/image";
import { CaseStudy } from "@/lib/types";
import { PROJECTS } from "@/lib/content";
import { useI18n } from "@/lib/i18n-context";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Layers,
  BookOpen,
  Compass,
  Trophy,
  Database,
  Code2,
  ExternalLink,
  ShieldCheck,
  Cpu
} from "lucide-react";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  const { language } = useI18n();

  if (!caseStudy) return null;

  const project = PROJECTS.find((p) => p.id === caseStudy.projectId);

  const displayTitle =
    (language === "en" ? caseStudy.title?.en : caseStudy.title?.ar) ||
    caseStudy.title?.en ||
    caseStudy.title?.ar ||
    "System Architecture & Engineering Case Study";

  const displayOverview =
    (language === "en" ? caseStudy.overview?.en : caseStudy.overview?.ar) ||
    caseStudy.overview?.en ||
    caseStudy.overview?.ar ||
    "";

  const dbSchema = language === "en" ? caseStudy.databaseSchema?.en : caseStudy.databaseSchema?.ar;
  const apiContract = language === "en" ? caseStudy.apiContracts?.en : caseStudy.apiContracts?.ar;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex flex-wrap items-center justify-between gap-3 w-full pr-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className="font-mono text-sm tracking-wide uppercase text-slate-700 dark:text-slate-300 font-bold">
              {language === "en" ? "Engineering Case Study" : "دراسة حالة معمارية متقدمة"}
            </span>
          </div>
          {project && (
            <div className="flex items-center gap-2">
              {project.demoUrl ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{language === "en" ? "Live Hosted Production" : "إنتاج حي متصل"}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                  <ShieldCheck className="w-3 h-3 text-blue-500" />
                  <span>{language === "en" ? "Enterprise Production / Private Showcase" : "متاح بعرض خاص / إنتاج مؤسسي"}</span>
                </span>
              )}
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-8 text-slate-900 dark:text-slate-100">
        {/* Title & Overview Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {project && (
              <Badge variant="accent" size="sm">
                {language === "en" ? project.categoryLabel.en : project.categoryLabel.ar}
              </Badge>
            )}
            <span className="font-mono text-xs text-slate-500">ID: {caseStudy.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-3">
            {displayTitle}
          </h2>
          {displayOverview && (
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {displayOverview}
            </p>
          )}
        </div>

        {/* High-Fidelity UI Product Mockup Container */}
        {project?.image && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-xl ring-1 ring-slate-800">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 truncate max-w-[320px]">
                <span className="text-emerald-400">arch://</span>
                <span className="truncate">{project.slug}.badra.systems</span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 pr-1">UI Mockup</div>
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <Image
                src={project.image}
                alt={project.title.en}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-top"
              />
            </div>
          </div>
        )}

        {/* Tech Stack Badges */}
        {project && project.technologies && project.technologies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>{language === "en" ? "Engineered Technology Stack" : "التقنيات والأدوات المعمارية"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Context & Problem Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-700 dark:text-slate-400 mb-2">
              <Compass className="w-4 h-4 text-blue-500" />
              <span>{language === "en" ? "Context & Background" : "السياق والخلفية"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === "en" ? caseStudy.context?.en : caseStudy.context?.ar}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/40">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{language === "en" ? "Core Problem Statement" : "المشكلة الجوهرية"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === "en" ? caseStudy.problemStatement?.en : caseStudy.problemStatement?.ar}
            </p>
          </div>
        </div>

        {/* Architectural Implementation Pipeline */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>{language === "en" ? "Architectural Implementation Steps" : "خطوات ومراحل التنفيذ المعماري"}</span>
          </div>

          <div className="space-y-3">
            {caseStudy.architectureSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs"
              >
                <span className="font-mono text-base font-bold text-blue-500 shrink-0">
                  {step.step}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                    {language === "en" ? step.title.en : step.title.ar}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {language === "en" ? step.desc.en : step.desc.ar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Schema Architecture */}
        {dbSchema && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wider">
              <Database className="w-4 h-4 text-blue-400" />
              <span>{language === "en" ? "Database Schema & Isolation Architecture" : "مخطط قاعدة البيانات ونموذج العزل"}</span>
            </div>
            <p className="font-mono text-xs leading-relaxed text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 select-text overflow-x-auto">
              {dbSchema}
            </p>
          </div>
        )}

        {/* API Contracts */}
        {apiContract && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>{language === "en" ? "Production API Contracts & Latency SLO" : "عقود واجهات API ومعايير زمن الاستجابة"}</span>
            </div>
            <p className="font-mono text-xs leading-relaxed text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 select-text overflow-x-auto">
              {apiContract}
            </p>
          </div>
        )}

        {/* Key Architectural Decisions */}
        <div>
          <h4 className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-3">
            {language === "en" ? "Key Decisions & Trade-Offs" : "القرارات المعمارية والمفاضلات"}
          </h4>
          <div className="space-y-3">
            {caseStudy.keyDecisions.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 shadow-xs"
              >
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  {language === "en" ? item.decision.en : item.decision.ar}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-mono text-blue-500 font-medium">
                    {language === "en" ? "Rationale: " : "السبب والمبرر: "}
                  </span>
                  {language === "en" ? item.rationale.en : item.rationale.ar}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Challenges */}
        <div>
          <h4 className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-3">
            {language === "en" ? "Hardest Challenges & Resolution" : "أبرز التحديات التقنية وحلولها"}
          </h4>
          <div className="space-y-3">
            {caseStudy.technicalChallenges.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/40"
              >
                <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">
                  {language === "en" ? item.challenge.en : item.challenge.ar}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    {language === "en" ? "Resolution: " : "الحل المطبق: "}
                  </span>
                  {language === "en" ? item.resolution.en : item.resolution.ar}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome & Lessons */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
            <Trophy className="w-4 h-4" />
            <span>{language === "en" ? "Measurable Outcomes & Lessons Learned" : "النتائج والدروس المستفادة"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium mb-2">
            {language === "en" ? caseStudy.metricsOrOutcome.en : caseStudy.metricsOrOutcome.ar}
          </p>
          <p className="text-xs text-slate-700 dark:text-slate-300 italic">
            &ldquo;{language === "en" ? caseStudy.lessonsLearned.en : caseStudy.lessonsLearned.ar}&rdquo;
          </p>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            {language === "en" ? "Close Case Study" : "إغلاق دراسة الحالة"}
          </Button>

          {project?.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                {language === "en" ? "Visit Live Production System" : "زيارة النظام الحي"}
              </Button>
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}

