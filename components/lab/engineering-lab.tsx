"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import { LAB_EXPERIMENTS } from "@/lib/content";
import { RateLimiterSim } from "./rate-limiter-sim";
import { RagPipelineSim } from "./rag-pipeline-sim";
import { LatencyCacheSim } from "./latency-cache-sim";
import { Cpu, Zap, Activity, Terminal } from "lucide-react";

export function EngineeringLab() {
  const { language } = useI18n();
  const [activeExperiment, setActiveExperiment] = useState<string>("rate-limiter");

  const getExperimentIcon = (type: string) => {
    switch (type) {
      case "rate-limiter": return <Activity className="w-4 h-4 text-emerald-400" />;
      case "rag-pipeline": return <Cpu className="w-4 h-4 text-purple-400" />;
      case "latency-cache": return <Zap className="w-4 h-4 text-blue-400" />;
      default: return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <section id="lab" className="py-24 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#090b10]/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span>03 //</span>
            <span>{language === "en" ? "Engineering Lab & Interactive Sandboxes" : "المختبر الهندسي والمحاكيات الحية"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "en" ? "Live Architecture & Systems Experiments" : "تجارب حية للأنظمة والمعمارية البرمجية"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {language === "en"
              ? "Real engineering principles made tangible. Test distributed rate limiting, inspect RAG vector similarity pipelines, and analyze latency disparities in real-time."
              : "مبادئ هندسية حقيقية قابلة للتجربة والتفاعل. اختبر محدد معدل الطلبات، وتفحص مسار متجهات الذكاء، واستكشف فروق أزمنة الاستجابة."}
          </p>
        </div>

        {/* Experiment Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {LAB_EXPERIMENTS.map((exp) => {
            const isSelected = exp.type === activeExperiment;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveExperiment(exp.type)}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-white dark:bg-[#131622] border-blue-500 shadow-md ring-1 ring-blue-500/20"
                    : "bg-white/60 dark:bg-[#0e1017]/60 border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="flex items-center gap-2">
                    {getExperimentIcon(exp.type)}
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400">
                      {exp.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {language === "en" ? exp.title.en : exp.title.ar}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {language === "en" ? exp.description.en : exp.description.ar}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Sandbox Viewer */}
        <div className="bg-white dark:bg-[#0c0e15] border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden p-2 sm:p-4">
          {activeExperiment === "rate-limiter" && <RateLimiterSim />}
          {activeExperiment === "rag-pipeline" && <RagPipelineSim />}
          {activeExperiment === "latency-cache" && <LatencyCacheSim />}
        </div>
      </div>
    </section>
  );
}
