"use client";

import React, { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n-context";
import {
  Calculator,
  Check,
  Clock,
  Sparkles,
  FileCode2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { TechLogo } from "@/components/ui/brand-logos";
import { XRayTag } from "@/lib/xray-context";

type SystemTypeId = "ai-saas" | "crm" | "ecommerce" | "custom";
type PaceId = "standard" | "accelerated";

interface ModuleConfig {
  id: string;
  label: { en: string; ar: string };
  desc: { en: string; ar: string };
  weeks: number;
  cost: number;
  tag: string;
}

const SYSTEM_TYPES: Record<
  SystemTypeId,
  {
    id: SystemTypeId;
    title: { en: string; ar: string };
    desc: { en: string; ar: string };
    baseWeeks: number;
    baseCost: number;
    defaultStack: string[];
  }
> = {
  "ai-saas": {
    id: "ai-saas",
    title: { en: "AI SaaS Platform", ar: "منصة ذكاء اصطناعي (AI SaaS)" },
    desc: {
      en: "RAG knowledge pipeline, token streaming & vector embeddings",
      ar: "محرك استرجاع RAG، بث مباشر للرموز، وبحث متجهي",
    },
    baseWeeks: 4,
    baseCost: 4500,
    defaultStack: ["Next.js", "TypeScript", "Python", "PostgreSQL", "Tailwind CSS"],
  },
  crm: {
    id: "crm",
    title: { en: "Multi-Tenant CRM", ar: "نظام علاقات مؤسسي (CRM)" },
    desc: {
      en: "Supabase RLS, customer pipeline & webhook automations",
      ar: "عزل بيانات المؤسسات RLS، خطوط مبيعات، وأتمتة خطافات الويب",
    },
    baseWeeks: 5,
    baseCost: 5500,
    defaultStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
  },
  ecommerce: {
    id: "ecommerce",
    title: { en: "B2B E-Commerce Engine", ar: "منصة تجارة B2B ومواد صناعية" },
    desc: {
      en: "Volumetric calculations, tiered wholesale & checkout",
      ar: "حسابات الكميات، خصومات الجملة، ومزامنة الدفع",
    },
    baseWeeks: 4,
    baseCost: 4000,
    defaultStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  custom: {
    id: "custom",
    title: { en: "Custom Web/Mobile System", ar: "منتج رقمي مخصص (Custom MVP)" },
    desc: {
      en: "Bespoke high-performance architecture built to exact specifications",
      ar: "معمارية برمجية مخصصة وعالية الأداء مبنية وفق احتياجاتك",
    },
    baseWeeks: 3,
    baseCost: 3500,
    defaultStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
};

const MODULES: ModuleConfig[] = [
  {
    id: "sse",
    label: { en: "Real-time SSE / WebSockets", ar: "بث لحظي (SSE / WebSockets)" },
    desc: { en: "Sub-40ms bidirectional streaming pipe", ar: "مسار تدفق فوري بزمن كمون أقل من 40ms" },
    weeks: 1,
    cost: 1000,
    tag: "Realtime",
  },
  {
    id: "rls",
    label: { en: "Supabase RLS Multi-Tenancy", ar: "عزل مستأجرين مشفر (Postgres RLS)" },
    desc: { en: "Zero cross-tenant leakage at DB layer", ar: "عزل أمني صارم للبيانات في قاعدة البيانات" },
    weeks: 1,
    cost: 1200,
    tag: "Security",
  },
  {
    id: "payments",
    label: { en: "Payment & ERP Integration", ar: "بوابة دفع وفواتير (Stripe / KNET / ERP)" },
    desc: { en: "Automated reconciliation & webhooks", ar: "معالجة المدفوعات وخطافات تسوية الفواتير" },
    weeks: 1,
    cost: 1000,
    tag: "Fintech",
  },
  {
    id: "i18n",
    label: { en: "Bilingual AR/EN RTL Architecture", ar: "هندسة ثنائية اللغة وتوافق RTL أصيل" },
    desc: { en: "Flawless mirror layout with zero flip bugs", ar: "تصميم متناسق 100% يدعم العربية والإنجليزية" },
    weeks: 0.5,
    cost: 800,
    tag: "Localization",
  },
];

export function SprintEstimator({
  onPreFillInquiry,
}: {
  onPreFillInquiry?: (brief: string) => void;
}) {
  const { language } = useI18n();

  const [selectedSystem, setSelectedSystem] = useState<SystemTypeId>("ai-saas");
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>({
    sse: true,
    rls: true,
    payments: false,
    i18n: true,
  });
  const [pace, setPace] = useState<PaceId>("standard");

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Dynamic calculations
  const estimation = useMemo(() => {
    const sys = SYSTEM_TYPES[selectedSystem];
    let totalWeeks = sys.baseWeeks;
    let totalCost = sys.baseCost;

    MODULES.forEach((mod) => {
      if (selectedModules[mod.id]) {
        totalWeeks += mod.weeks;
        totalCost += mod.cost;
      }
    });

    if (pace === "accelerated") {
      totalWeeks = Math.max(3, Math.round(totalWeeks * 0.8));
      totalCost = Math.round(totalCost * 1.15); // Rush dedicated allocation
    }

    const minWeeks = Math.max(2, totalWeeks - 1);
    const maxWeeks = totalWeeks + 1;
    const minCost = Math.round(totalCost * 0.9);
    const maxCost = Math.round(totalCost * 1.1);

    // Recommended stack assembly
    const stack = Array.from(new Set([...sys.defaultStack]));
    if (selectedModules.sse) stack.push("WebSockets");
    if (selectedModules.rls && !stack.includes("Supabase")) stack.push("Supabase");

    return {
      minWeeks,
      maxWeeks,
      minCost,
      maxCost,
      stack,
    };
  }, [selectedSystem, selectedModules, pace]);

  const activeSys = SYSTEM_TYPES[selectedSystem];

  // Construct message for WhatsApp
  const constructWhatsAppMessage = () => {
    const activeModuleNames = MODULES.filter((m) => selectedModules[m.id]).map(
      (m) => (language === "en" ? m.label.en : m.label.ar)
    );

    if (language === "ar") {
      return encodeURIComponent(`*طلب مشروع عبر حاسبة المعمارية الهندسية:*
----------------------------------------
*نوع النظام:* ${activeSys.title.ar}
*الوحدات المحددة:* ${activeModuleNames.join(" + ")}
*وتيرة التسليم:* ${pace === "accelerated" ? "تسليم سريع (Accelerated MVP)" : "معمارية قياسية (Standard)"}
*الجدول الزمني المقدر:* ${estimation.minWeeks} - ${estimation.maxWeeks} أسابيع
*الميزانية التقديرية:* $${estimation.minCost.toLocaleString()} - $${estimation.maxCost.toLocaleString()} USD
----------------------------------------
أود مناقشة بدء المشروع معكم مباشرة.`);
    }

    return encodeURIComponent(`*Project Inquiry via Sprint & Cost Estimator:*
----------------------------------------
*System Type:* ${activeSys.title.en}
*Selected Modules:* ${activeModuleNames.join(" + ")}
*Delivery Pace:* ${pace === "accelerated" ? "Accelerated MVP (Fast-Track)" : "Standard Architecture"}
*Estimated Timeline:* ${estimation.minWeeks} - ${estimation.maxWeeks} Weeks
*Target Investment:* $${estimation.minCost.toLocaleString()} - $${estimation.maxCost.toLocaleString()} USD
----------------------------------------
I would like to discuss engineering this project with you.`);
  };

  const handlePreFill = () => {
    const activeModuleNames = MODULES.filter((m) => selectedModules[m.id]).map(
      (m) => (language === "en" ? m.label.en : m.label.ar)
    );

    const brief =
      language === "en"
        ? `[Configured Blueprint: ${activeSys.title.en}] Target Delivery: ${estimation.minWeeks}-${estimation.maxWeeks} weeks. Key Modules: ${activeModuleNames.join(", ")}. Pace: ${pace}. Investment Tier: $${estimation.minCost}-$${estimation.maxCost}.`
        : `[مواصفات معمارية محددة: ${activeSys.title.ar}] الجدول الزمني: ${estimation.minWeeks}-${estimation.maxWeeks} أسابيع. الوحدات: ${activeModuleNames.join("، ")}. وتيرة التسليم: ${pace === "accelerated" ? "سريعة" : "قياسية"}. الميزانية: $${estimation.minCost}-$${estimation.maxCost}.`;

    if (onPreFillInquiry) {
      onPreFillInquiry(brief);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/70 backdrop-blur-md p-6 sm:p-8 shadow-xl mt-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <XRayTag component="SprintEstimator" props={{ state: "reactive", units: "weeks" }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            <Calculator className="w-4 h-4" />
            <span>{language === "en" ? "Interactive Architecture & Sprint Estimator" : "حاسبة المعمارية والجدول الزمني التفاعلية"}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {language === "en" ? "Configure Your Production System" : "قم بتخصيص مواصفات نظامك الإنتاجي"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {language === "en"
              ? "Select system architecture, core modules, and pace to calculate delivery roadmap and investment tier."
              : "حدد نوع النظام والوحدات التقنية ووتيرة التسليم لاحتساب خارطة الطريق والميزانية التقديرية فورياً."}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 font-mono text-xs text-emerald-700 dark:text-emerald-300 self-start sm:self-auto shrink-0">
          <Clock className="w-3.5 h-3.5" />
          <span>{language === "en" ? "Instant 2026 Pacing" : "حساب فوري مباشر"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configurator Toggles (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. System Type Selection */}
          <div>
            <label className="text-xs font-semibold uppercase font-mono text-slate-700 dark:text-slate-300 block mb-2.5">
              {language === "en" ? "1. Select System Architecture" : "1. حدد نوع المعمارية البرمجية"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(SYSTEM_TYPES) as SystemTypeId[]).map((key) => {
                const item = SYSTEM_TYPES[key];
                const isSelected = selectedSystem === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSystem(key)}
                    className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30 text-slate-900 dark:text-white shadow-xs"
                        : "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm">
                        {language === "en" ? item.title.en : item.title.ar}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                      {language === "en" ? item.desc.en : item.desc.ar}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Core Modules Toggles */}
          <div>
            <label className="text-xs font-semibold uppercase font-mono text-slate-700 dark:text-slate-300 block mb-2.5">
              {language === "en" ? "2. Essential Production Modules" : "2. الوحدات البرمجية المتكاملة"}
            </label>
            <div className="space-y-2">
              {MODULES.map((mod) => {
                const isChecked = Boolean(selectedModules[mod.id]);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40 dark:border-emerald-500/30 shadow-2xs"
                        : "bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800/60 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isChecked
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white block">
                          {language === "en" ? mod.label.en : mod.label.ar}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {language === "en" ? mod.desc.en : mod.desc.ar}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 ms-2">
                      {mod.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Delivery Pace Selector */}
          <div>
            <label className="text-xs font-semibold uppercase font-mono text-slate-700 dark:text-slate-300 block mb-2">
              {language === "en" ? "3. Delivery Velocity & Sprint Pace" : "3. وتيرة وسرعة التسليم"}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setPace("standard")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  pace === "standard"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md font-bold"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 font-medium"
                }`}
              >
                <span className="text-xs block">
                  {language === "en" ? "Standard Architecture" : "معمارية منضبطة قياسية"}
                </span>
                <span className="text-[10.5px] opacity-80 font-normal">
                  {language === "en" ? "Methodical sprint cadence" : "مراحل تسليم أسبوعية منتظمة"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPace("accelerated")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  pace === "accelerated"
                    ? "bg-purple-600 text-white border-purple-600 shadow-md font-bold"
                    : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 font-medium"
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-xs block">
                    {language === "en" ? "Accelerated MVP" : "تسريع إطلاق MVP"}
                  </span>
                </div>
                <span className="text-[10.5px] opacity-80 font-normal">
                  {language === "en" ? "Dedicated high-velocity rush" : "تركيز مكثف وإطلاق أسرع 20%"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Live Estimate & Action Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400 uppercase tracking-wider">
                {language === "en" ? "Calculated Delivery Roadmap" : "خارطة التسليم المحسوبة"}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-bold">
                ESTIMATED
              </span>
            </div>

            {/* Timeline & Budget Big Numbers */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-lg bg-slate-950/90 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  {language === "en" ? "Estimated Timeline" : "الجدول الزمني"}
                </span>
                <span className="text-xl sm:text-2xl font-black text-cyan-400">
                  {estimation.minWeeks} – {estimation.maxWeeks}{" "}
                  <span className="text-xs text-slate-400 font-normal">
                    {language === "en" ? "Weeks" : "أسابيع"}
                  </span>
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/90 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  {language === "en" ? "Target Investment" : "الميزانية المتوقعة"}
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">
                  ${estimation.minCost.toLocaleString()}{" "}
                  <span className="text-xs text-slate-400 font-normal">USD</span>
                </span>
              </div>
            </div>

            {/* Sprint Breakdown */}
            <div className="space-y-2 mb-5">
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                {language === "en" ? "Planned Phased Sprints" : "مراحل السبرنتات المجدولة"}
              </span>

              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80 text-xs flex items-center justify-between">
                <span className="text-slate-300">
                  1. {language === "en" ? "System Architecture & Schema" : "المعمارية ومخطط البيانات"}
                </span>
                <span className="font-mono text-blue-400 text-[11px]">Sprint 1</span>
              </div>

              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80 text-xs flex items-center justify-between">
                <span className="text-slate-300">
                  2. {language === "en" ? "Core Engineering & Workflows" : "بناء المنطق والوظائف الأساسية"}
                </span>
                <span className="font-mono text-blue-400 text-[11px]">Sprint 2-3</span>
              </div>

              <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80 text-xs flex items-center justify-between">
                <span className="text-slate-300">
                  3. {language === "en" ? "Security, QA & Edge Deployment" : "الأمان، الفحص والإطلاق السحابي"}
                </span>
                <span className="font-mono text-emerald-400 text-[11px]">Sprint 4</span>
              </div>
            </div>

            {/* Recommended Tech Stack Badges */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase block mb-2">
                {language === "en" ? "Recommended Production Stack" : "التقنيات الموصى بها لهذا النظام"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {estimation.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-md bg-slate-800 border border-slate-700/80 text-slate-200"
                  >
                    <TechLogo name={tech} className="w-3 h-3 shrink-0" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
            <a
              href={`https://wa.me/201016731179?text=${constructWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] hover:brightness-110 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>
                {language === "en"
                  ? "Send This Exact Blueprint to Mohamed on WhatsApp"
                  : "إرسال هذه الخطة المحددة إلى محمد عبر واتساب"}
              </span>
            </a>

            <button
              type="button"
              onClick={handlePreFill}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs transition-colors cursor-pointer"
            >
              <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
              <span>
                {language === "en"
                  ? "Pre-fill Project Inquiry Form Below ↓"
                  : "تعبئة نموذج الطلب الرسمي بالأسفل بهذه المواصفات ↓"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
