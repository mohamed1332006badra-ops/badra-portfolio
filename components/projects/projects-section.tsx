"use client";

import React, { useState } from "react";
import { Project, CaseStudy } from "@/lib/types";
import { PROJECTS, CASE_STUDIES } from "@/lib/content";
import { useI18n } from "@/lib/i18n-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectDetailModal } from "./project-detail-modal";
import { CaseStudyModal } from "./case-study-modal";
import { ArrowUpRight, BookOpen, Layers, Terminal, Sparkles, Code2 } from "lucide-react";

export function ProjectsSection() {
  const { language, direction } = useI18n();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filterTabs = [
    { id: "all", label: { en: "All Projects", ar: "جميع المشاريع" } },
    { id: "ai", label: { en: "AI & Retrieval (RAG)", ar: "الذكاء الاصطناعي و RAG" } },
    { id: "fullstack", label: { en: "Full-Stack & Commerce", ar: "الويب والتجارة" } },
    { id: "systems", label: { en: "Systems & Real-Time", ar: "الأنظمة والمقاييس الحية" } },
    { id: "web", label: { en: "Web & Developer Tools", ar: "أدوات الويب والمطورين" } },
  ];

  const filteredProjects = activeFilter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const handleOpenCaseStudy = (projectId: string) => {
    const cs = CASE_STUDIES.find((c) => c.projectId === projectId);
    if (cs) {
      setSelectedCaseStudy(cs);
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>02 //</span>
              <span>{language === "en" ? "Engineered Products & Systems" : "المنتجات البرمجية والأنظمة"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === "en" ? "Products Built to Solve Real Problems" : "منتجات مبنية لحل مشكلات حقيقية"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              {language === "en"
                ? "Every project is engineered as a robust system: clear problem boundaries, deliberate architectural choices, and measurable outcomes."
                : "كل مشروع هو نظام هندسي متكامل: توصيف دقيق للمشكلة، وقرارات معمارية مبرهنة، ونتائج قابلة للقياس والتحقق."}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-[#141722] rounded-lg border border-slate-200 dark:border-white/5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-blue-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {language === "en" ? tab.label.en : tab.label.ar}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#0c0e15] p-6 sm:p-7 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/60 dark:border-white/5">
                  <Badge variant={project.category === "ai" ? "purple" : "accent"} size="sm">
                    {language === "en" ? project.categoryLabel.en : project.categoryLabel.ar}
                  </Badge>
                  <span className="font-mono text-[11px] text-slate-400 uppercase">
                    STATUS: {project.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                  {language === "en" ? project.title.en : project.title.ar}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                  {language === "en" ? project.tagline.en : project.tagline.ar}
                </p>

                {/* Problem & Solution Snippet */}
                <div className="space-y-3 mb-6 p-4 rounded-lg bg-white dark:bg-[#131622] border border-slate-200/80 dark:border-white/5 text-xs">
                  <div>
                    <span className="font-mono uppercase tracking-wider text-red-500 font-semibold block mb-0.5">
                      {language === "en" ? "Problem:" : "المشكلة:"}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 line-clamp-2">
                      {language === "en" ? project.problem.en : project.problem.ar}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono uppercase tracking-wider text-emerald-500 font-semibold block mb-0.5">
                      {language === "en" ? "Solution:" : "الحل:"}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 line-clamp-2">
                      {language === "en" ? project.solution.en : project.solution.ar}
                    </span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-200/60 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProject(project)}
                >
                  <Layers className="w-3.5 h-3.5 mr-1" />
                  <span>{language === "en" ? "Inspect Architecture" : "فحص المعمارية"}</span>
                </Button>

                {project.hasCaseStudy && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenCaseStudy(project.id)}
                    className="group"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-1" />
                    <span>{language === "en" ? "Case Study" : "دراسة الحالة"}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${direction === "rtl" ? "rotate-90" : ""} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenCaseStudy={handleOpenCaseStudy}
      />

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
}
