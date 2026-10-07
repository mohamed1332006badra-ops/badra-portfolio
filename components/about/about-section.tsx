"use client";

import React from "react";
import { useI18n } from "@/lib/i18n-context";
import { PHILOSOPHY_PRINCIPLES } from "@/lib/content";
import { Shield } from "lucide-react";

export function AboutSection() {
  const { language } = useI18n();

  return (
    <section id="about" className="py-24 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#090b10]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span>05 //</span>
            <span>{language === "en" ? "Engineering Philosophy & Mindset" : "الفلسفة الهندسية والمبادئ"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "en" ? "How I Think About Software & Systems" : "كيف أفكر في بناء البرمجيات والأنظمة"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {language === "en"
              ? "Code is a liability; functioning products that create human and business value are the true objective."
              : "الشفرة البرمجية مجرد وسيلة؛ القيمة الحقيقية تكمن في منتجات رقمية متينة تحقق نفعاً ملموساً للمستخدمين."}
          </p>
        </div>

        {/* 4 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {PHILOSOPHY_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="p-6 sm:p-7 rounded-xl bg-white dark:bg-[#0e1017] border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-200"
            >
              <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-3">
                {principle.number} {"//"}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {language === "en" ? principle.title.en : principle.title.ar}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === "en" ? principle.desc.en : principle.desc.ar}
              </p>
            </div>
          ))}
        </div>

        {/* Mohamed Ahmed Badra Background & Non-Negotiable Truth Disclosure */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#0c0e15] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {language === "en" ? "About Mohamed Ahmed Badra" : "عن محمد أحمد بدرة"}
              </h3>
              <p>
                {language === "en"
                  ? "I am a full-stack developer and AI engineer dedicated to building resilient, production-grade digital products. My work spans modern distributed web systems, deterministic RAG pipelines, real-time telemetry architectures, and high-conversion e-commerce engines."
                  : "مطور برمجيات شامل ومهندس ذكاء اصطناعي متخصص في بناء وتطوير المنتجات الرقمية المتكاملة الجاهزة للإنتاج الفعلي. تشمل خبراتي معمارية الويب الحديثة، ومسارات استرجاع المعرفة بالذكاء الاصطناعي (RAG)، ومراقبة الأنظمة الحية، ومنصات التجارة الرقمية السريعة."}
              </p>
              <p>
                {language === "en"
                  ? "I treat engineering as a craft of discipline: selecting technologies based on actual constraints rather than trendiness, writing strict type contracts, measuring latency across every hop, and ensuring both English and Arabic users receive an uncompromised experience."
                  : "أنظر إلى الهندسة البرمجية كمسؤولية وانضباط: اختيار التقنيات بناءً على الاحتياج والقيود الحقيقية وليس الموضة، وكتابة شفرات محكمة الأمان، وقياس أزمنة الاستجابة في كل طبقة، وضمان تجربة مستخدم رفيعة المستوى لكل من المستخدمين باللغتين العربية والإنجليزية."}
              </p>
            </div>

            {/* Truth Policy Card */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#131622] border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>{language === "en" ? "Verified Truth Standard" : "معيار الصدق الهندسي"}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === "en"
                  ? "Zero fabricated client logos, fake revenue figures, or inflated skill percentages. Every architecture and project documented reflects disciplined engineering, with educational simulations explicitly identified."
                  : "لا شعارات وهمية لعملاء أو أرقام أرباح مختلقة أو نسب مهارات مضللة. كل معمارية ومشروع موثق هنا يعبر عن واقع هندسي منضبط، مع توضيح المحاكيات التعليمية بدقة."}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span>BADRA Engineering</span>
                <span className="text-blue-500">2030</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
