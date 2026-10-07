"use client";

import React from "react";
import { useI18n } from "@/lib/i18n-context";
import { SERVICES } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, ArrowRight, Layout, Cpu, Box, Zap } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const { language, direction } = useI18n();

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case "Layout": return <Layout className="w-5 h-5 text-blue-500" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-purple-500" />;
      case "Box": return <Box className="w-5 h-5 text-emerald-500" />;
      case "Zap": return <Zap className="w-5 h-5 text-amber-500" />;
      default: return <Layout className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <section id="services" className="py-24 border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span>04 //</span>
            <span>{language === "en" ? "Engineering Services & Capabilities" : "الخدمات الهندسية والإمكانات"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "en" ? "Disciplined Engineering for High-Stakes Products" : "هندسة منضبطة للمنتجات الرقمية المتقدمة"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {language === "en"
              ? "Direct technical partnership. No account managers or junior delegation. Concrete deliverables, measurable performance, and full source code ownership."
              : "شراكة تقنية مباشرة دون وسطاء. مخرجات محددة، وأداء مثبت، وملكية كاملة لجميع الأكواد والبنية التحتية."}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#0c0e15] p-6 sm:p-8 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-200 shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/60 dark:border-white/5">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#141722] border border-slate-200/60 dark:border-white/10">
                    {getServiceIcon(srv.icon)}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{language === "en" ? srv.typicalTimeline.en : srv.typicalTimeline.ar}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {language === "en" ? srv.title.en : srv.title.ar}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {language === "en" ? srv.summary.en : srv.summary.ar}
                </p>

                {/* Problem vs Solution */}
                <div className="space-y-3 mb-6 p-4 rounded-lg bg-white dark:bg-[#131622] border border-slate-200/80 dark:border-white/5 text-xs">
                  <div>
                    <span className="font-mono text-red-500 uppercase font-semibold block mb-0.5">
                      {language === "en" ? "Problem Solved:" : "المشكلة المعالجة:"}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {language === "en" ? srv.problemSolved.en : srv.problemSolved.ar}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-emerald-500 uppercase font-semibold block mb-0.5">
                      {language === "en" ? "Architectural Approach:" : "النهج المعماري:"}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {language === "en" ? srv.solutionApproach.en : srv.solutionApproach.ar}
                    </span>
                  </div>
                </div>

                {/* Deliverables checklist */}
                <div className="mb-6">
                  <span className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                    {language === "en" ? "Concrete Deliverables" : "المخرجات المحددة"}
                  </span>
                  <ul className="space-y-2">
                    {(language === "en" ? srv.deliverables.en : srv.deliverables.ar).map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-white/5">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onSelectService(language === "en" ? srv.title.en : srv.title.ar)}
                  className="w-full justify-between group"
                >
                  <span>{language === "en" ? "Inquire About This Service" : "استفسر عن هذه الخدمة"}</span>
                  <ArrowRight className={`w-4 h-4 ${direction === "rtl" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
