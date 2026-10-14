"use client";

import React, { useState } from "react";
import { CaseStudy } from "@/lib/types";
import { PROJECTS, CASE_STUDIES } from "@/lib/content";
import { useI18n } from "@/lib/i18n-context";
import { ProjectCard } from "./project-card";
import { CaseStudyModal } from "./case-study-modal";

export function ProjectsSection() {
  const { language } = useI18n();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filterTabs = [
    { id: "all", label: { en: "All Systems (8)", ar: "جميع الأنظمة (8)" } },
    { id: "ai", label: { en: "AI & Real-Time Streaming", ar: "الذكاء الاصطناعي والتدفق اللحظي" } },
    { id: "crm", label: { en: "Enterprise SaaS & CRM", ar: "برمجيات المؤسسات وإدارة العلاقات" } },
    { id: "fintech", label: { en: "Fintech & B2B Commerce", ar: "التكنولوجيا المالية والتجارة الصناعية" } },
    { id: "interactive", label: { en: "Interactive Systems", ar: "الأنظمة التفاعلية" } },
  ];

  const filteredProjects = activeFilter === "all"
    ? PROJECTS
    : activeFilter === "interactive"
    ? PROJECTS.filter((p) => p.category === "systems" || p.category === "fullstack" || p.category === "web")
    : PROJECTS.filter((p) => p.category === activeFilter);

  const handleOpenCaseStudy = (projectId: string) => {
    const cs = CASE_STUDIES.find((c) => c.projectId === projectId);
    if (cs) {
      setSelectedCaseStudy(cs);
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#08090d]">
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
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-50/80 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
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
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={handleOpenCaseStudy}
            />
          ))}
        </div>
      </div>

      {/* Unified World-Class Case Study Architecture Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
}
