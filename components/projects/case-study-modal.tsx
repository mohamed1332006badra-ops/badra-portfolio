"use client";

import React from "react";
import { CaseStudy } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";
import { Modal } from "@/components/ui/modal";
import { AlertTriangle, Layers, BookOpen, Compass, Trophy } from "lucide-react";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  const { language } = useI18n();

  if (!caseStudy) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      title={
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <span className="font-mono text-sm tracking-wide uppercase text-slate-500">
            {language === "en" ? "Engineering Case Study" : "دراسة حالة هندسية"}
          </span>
        </div>
      }
    >
      <div className="space-y-8 text-slate-900 dark:text-slate-100">
        {/* Title & Overview */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
            {language === "en" ? caseStudy.title.en : caseStudy.title.ar}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {language === "en" ? caseStudy.overview.en : caseStudy.overview.ar}
          </p>
        </div>

        {/* Context & Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#141722] border border-slate-200/80 dark:border-white/5">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-500 mb-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>{language === "en" ? "Context & Background" : "السياق والخلفية"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === "en" ? caseStudy.context.en : caseStudy.context.ar}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/40">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{language === "en" ? "Core Problem Statement" : "المشكلة الجوهرية"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === "en" ? caseStudy.problemStatement.en : caseStudy.problemStatement.ar}
            </p>
          </div>
        </div>

        {/* Architecture Implementation Pipeline */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>{language === "en" ? "Architectural Implementation Steps" : "خطوات التنفيذ المعماري"}</span>
          </div>

          <div className="space-y-3">
            {caseStudy.architectureSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg bg-white dark:bg-[#0c0e15] border border-slate-200 dark:border-white/10"
              >
                <span className="font-mono text-base font-bold text-blue-500 shrink-0">
                  {step.step}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                    {language === "en" ? step.title.en : step.title.ar}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {language === "en" ? step.desc.en : step.desc.ar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Architectural Decisions */}
        <div>
          <h4 className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {language === "en" ? "Key Decisions & Trade-Offs" : "القرارات المعمارية والمفاضلات"}
          </h4>
          <div className="space-y-3">
            {caseStudy.keyDecisions.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#141722]/80 border border-slate-100 dark:border-white/5"
              >
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  {language === "en" ? item.decision.en : item.decision.ar}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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
          <h4 className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {language === "en" ? "Hardest Challenges & Resolution" : "أبرز التحديات التقنية وحلولها"}
          </h4>
          <div className="space-y-3">
            {caseStudy.technicalChallenges.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/40"
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
        <div className="p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
            <Trophy className="w-4 h-4" />
            <span>{language === "en" ? "Measurable Outcomes & Lessons Learned" : "النتائج والدروس المستفادة"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium mb-2">
            {language === "en" ? caseStudy.metricsOrOutcome.en : caseStudy.metricsOrOutcome.ar}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 italic">
            &ldquo;{language === "en" ? caseStudy.lessonsLearned.en : caseStudy.lessonsLearned.ar}&rdquo;
          </p>
        </div>
      </div>
    </Modal>
  );
}
