"use client";

import React from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";
import { PHILOSOPHY_PRINCIPLES } from "@/lib/content";
import { Shield, Sparkles } from "lucide-react";

export function AboutSection() {
  const { language } = useI18n();

  return (
    <section
      id="about"
      className="py-24 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/80 dark:bg-[#0c0e14]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span>05 //</span>
            <span>
              {language === "en"
                ? "Engineering Philosophy & Mindset"
                : "الفلسفة الهندسية والمبادئ"}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "en"
              ? "How I Think About Software & Systems"
              : "كيف أفكر في بناء البرمجيات والأنظمة"}
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
              className="p-6 sm:p-7 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-3">
                {principle.number} {"//"}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {language === "en" ? principle.title.en : principle.title.ar}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {language === "en" ? principle.desc.en : principle.desc.ar}
              </p>
            </div>
          ))}
        </div>

        {/* Executive 2-Column Layout with Feature Portrait */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/70 backdrop-blur-md p-6 sm:p-10 shadow-xl overflow-hidden relative">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Portrait Column */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border border-indigo-500/30 shadow-2xl relative bg-slate-950 group">
                <Image
                  src="/badra-portrait-crop.webp"
                  alt="Eng. Mohamed Ahmed Badra"
                  fill
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Glass Badge at Bottom */}
                <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-center shadow-lg">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-xs text-white tracking-wide">
                      Eng. Mohamed Ahmed Badra
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300">
                    {language === "en"
                      ? "Lead Full-Stack & AI Architect"
                      : "كبير مهندسي البرمجيات والذكاء الاصطناعي"}
                  </div>
                </div>
              </div>
            </div>

            {/* Biography & Truth Policy Column */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {language === "en"
                      ? "Engineering Background"
                      : "الخلفية الهندسية والخبرة"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                  {language === "en" ? "About Mohamed Ahmed Badra" : "عن محمد أحمد بدرة"}
                </h3>
                <div className="space-y-3.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    {language === "en"
                      ? "I am a full-stack developer and AI systems architect dedicated to building resilient, production-grade digital products. My work spans modern distributed web systems, deterministic RAG pipelines, real-time telemetry architectures, and high-conversion industrial e-commerce platforms."
                      : "مطور برمجيات شامل ومهندس نظم ذكاء اصطناعي متخصص في بناء وتطوير المنتجات الرقمية المتكاملة الجاهزة للإنتاج الفعلي. تشمل خبراتي معمارية الويب الحديثة، ومسارات استرجاع المعرفة بالذكاء الاصطناعي (RAG)، ومراقبة الأنظمة الحية، ومنصات التجارة الصناعية السريعة."}
                  </p>
                  <p>
                    {language === "en"
                      ? "I treat engineering as a craft of discipline: selecting technologies based on actual constraints rather than trendiness, writing strict type contracts, measuring latency across every hop, and ensuring both English and Arabic users receive an uncompromised experience."
                      : "أنظر إلى الهندسة البرمجية كمسؤولية وانضباط: اختيار التقنيات بناءً على الاحتياج والقيود الحقيقية وليس الموضة، وكتابة شفرات محكمة الأمان، وقياس أزمنة الاستجابة في كل طبقة، وضمان تجربة مستخدم رفيعة المستوى لكل من المستخدمين باللغتين العربية والإنجليزية."}
                  </p>
                </div>
              </div>

              {/* Verified Truth Policy */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/60 space-y-2.5">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>
                    {language === "en"
                      ? "Verified Truth Standard"
                      : "معيار الصدق الهندسي"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {language === "en"
                    ? "Zero fabricated client logos, fake revenue figures, or inflated skill percentages. Every architecture and project documented reflects disciplined engineering, with educational simulations explicitly identified."
                    : "لا شعارات وهمية لعملاء أو أرقام أرباح مختلقة أو نسب مهارات مضللة. كل معمارية ومشروع موثق هنا يعبر عن واقع هندسي منضبط، مع توضيح المحاكيات بدقة."}
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  <span>BADRA Engineering Portfolio</span>
                  <span className="text-blue-500 font-semibold">2026 EDITION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
