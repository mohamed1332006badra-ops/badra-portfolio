"use client";

import React, { useState } from "react";
import { CheckCircle, Layers, Code2, Server, Cpu, Database, Cloud } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { ENGINEERING_PROOFS } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export function EngineeringProof() {
  const { language } = useI18n();
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: { en: "All Disciplines", ar: "جميع التخصصات" } },
    { id: "frontend", label: { en: "Frontend & Full-Stack", ar: "الواجهات والويب الشامل" } },
    { id: "backend", label: { en: "Backend & APIs", ar: "الخوادم والواجهات البرمجية" } },
    { id: "ai", label: { en: "AI & Vector Search", ar: "الذكاء واسترجاع المتجهات" } },
    { id: "database", label: { en: "Databases & Cache", ar: "قواعد البيانات والتخزين المؤقت" } },
    { id: "infra", label: { en: "Infrastructure & DevOps", ar: "البنية التحتية والحاويات" } },
  ];

  const filteredItems = filter === "all"
    ? ENGINEERING_PROOFS
    : ENGINEERING_PROOFS.filter((item) => item.category === filter);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "frontend": return <Code2 className="w-4 h-4 text-blue-400" />;
      case "backend": return <Server className="w-4 h-4 text-amber-400" />;
      case "ai": return <Cpu className="w-4 h-4 text-purple-400" />;
      case "database": return <Database className="w-4 h-4 text-cyan-400" />;
      case "infra": return <Cloud className="w-4 h-4 text-emerald-400" />;
      default: return <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  const getProjectRefName = (name: string, lang: "en" | "ar") => {
    if (lang === "en") return name;
    return name
      .replace(/OmniFlow & DevPulse/g, "OmniFlow و DevPulse")
      .replace(/OmniFlow RAG & CogniCommerce/g, "OmniFlow RAG و CogniCommerce")
      .replace(/NexusPulse & OmniFlow/g, "NexusPulse و OmniFlow")
      .replace(/CogniCommerce & OmniFlow/g, "CogniCommerce و OmniFlow")
      .replace(/OmniFlow RAG Engine/g, "محرك OmniFlow RAG")
      .replace(/All Production Repositories/g, "كافة مستودعات الإنتاج")
      .replace(/Production Deployments/g, "بيئات النشر الإنتاجية");
  };

  return (
    <section id="proof" className="py-20 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/80 dark:bg-[#0c0e14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>01 //</span>
              <span>{language === "en" ? "Engineering Proof Matrix" : "سجل الإثبات الهندسي"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === "en" ? "Technology → Real Usage → Systems" : "التقنيات → الاستخدام الفعلي → الأنظمة"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              {language === "en"
                ? "No arbitrary percentage bars or vanity scores. Real architectural applications mapped directly to production workloads and software design patterns."
                : "دون أي نسب مئوية وهمية أو مقاييس شكلية. توثيق مباشر لدور كل تقنية وكيفية استخدامها في معمارية الأنظمة الفعلية."}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  filter === cat.id
                    ? "bg-blue-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {language === "en" ? cat.label.en : cat.label.ar}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-slate-100 dark:bg-white/5">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {item.technology}
                    </span>
                  </div>
                  <Badge variant="outline" size="sm">
                    {language === "en" ? item.role.en : item.role.ar}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                      {language === "en" ? "Production Usage" : "الاستخدام الفعلي"}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {language === "en" ? item.realUsage.en : item.realUsage.ar}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-0.5">
                      {language === "en" ? "Architectural Constraint" : "القيد المعماري"}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal">
                      {language === "en" ? item.architecturalNote.en : item.architecturalNote.ar}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 gap-2">
                <span className="truncate">
                  {language === "en" ? "Ref: " : "المرجع: "}
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {getProjectRefName(item.associatedProject, language)}
                  </span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono text-[11px] shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === "en" ? "Production Pattern" : "نمط إنتاجي"}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
