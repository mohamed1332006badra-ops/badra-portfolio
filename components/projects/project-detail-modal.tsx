"use client";

import React from "react";
import { Project } from "@/lib/types";
import { useI18n } from "@/lib/i18n-context";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Cpu, AlertCircle, CheckCircle, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseStudy?: (projectId: string) => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onOpenCaseStudy,
}: ProjectDetailModalProps) {
  const { language } = useI18n();

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      title={
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm">
            {language === "en" ? project.categoryLabel.en : project.categoryLabel.ar}
          </Badge>
          <span className="font-mono text-xs text-slate-500">
            {project.status.toUpperCase()}
          </span>
        </div>
      }
    >
      <div className="space-y-6 text-slate-900 dark:text-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
            {language === "en" ? project.title.en : project.title.ar}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {language === "en" ? project.tagline.en : project.tagline.ar}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-red-50/40 dark:bg-red-950/20 border border-red-200/40 dark:border-red-900/40">
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>{language === "en" ? "Problem Addressed" : "المشكلة المعالجة"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === "en" ? project.problem.en : project.problem.ar}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-900/40">
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              <CheckCircle className="w-4 h-4" />
              <span>{language === "en" ? "Engineered Solution" : "الحل الهندسي"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === "en" ? project.solution.en : project.solution.ar}
            </p>
          </div>
        </div>

        {/* Architecture & Implementation */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-[#141722] border border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
            <Layers className="w-4 h-4" />
            <span>{language === "en" ? "System Architecture" : "المعمارية البرمجية"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {language === "en" ? project.architecture.en : project.architecture.ar}
          </p>
        </div>

        {/* Challenges & Outcome */}
        <div className="space-y-3">
          <div>
            <h4 className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              {language === "en" ? "Key Technical Challenge" : "أبرز التحديات التقنية"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === "en" ? project.challenges.en : project.challenges.ar}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              {language === "en" ? "Verified Outcome" : "النتيجة المحققة"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === "en" ? project.outcome.en : project.outcome.ar}
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" icon={<GithubIcon className="w-4 h-4" />}>
                  GitHub
                </Button>
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl}>
                <Button variant="secondary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  {language === "en" ? "Interactive Sandbox" : "المحاكاة التفاعلية"}
                </Button>
              </a>
            )}
          </div>

          {project.hasCaseStudy && onOpenCaseStudy && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenCaseStudy(project.id);
              }}
            >
              {language === "en" ? "Read Full Case Study →" : "قراءة دراسة الحالة بالكامل ←"}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
