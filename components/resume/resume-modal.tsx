"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Printer, FileText, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { RESUME_DATA } from "@/lib/resume-data";
import { Language } from "@/lib/types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { language: siteLanguage } = useI18n();
  const [userSelectedLang, setUserSelectedLang] = useState<Language | null>(null);
  const resumeLang: Language = userSelectedLang ?? siteLanguage;
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and listen for ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const isAr = resumeLang === "ar";
  const data = RESUME_DATA;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 md:p-6 overflow-y-auto print:static print:inset-auto print:p-0 print:overflow-visible print:block print:bg-white"
    >
      {/* Screen Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity print:hidden"
      />

      {/* Modal Card / Print Wrapper */}
      <div
        ref={modalContentRef}
        className="relative w-full max-w-5xl my-4 sm:my-6 z-10 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden print:static print:max-w-none print:w-full print:my-0 print:p-0 print:border-none print:shadow-none print:bg-white print:rounded-none"
      >
        {/* Floating Screen Toolbar (Hidden on Print) */}
        <div
          data-print-hide="true"
          className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 print:hidden"
        >
          {/* Title & ATS Badge */}
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="resume-modal-title"
                  className="text-sm font-semibold tracking-tight text-white"
                >
                  {isAr ? "السيرة الذاتية الهندسية (ATS)" : "Engineering Resume (ATS-Compliant)"}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  VERIFIED 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {isAr
                  ? "تنسيق قياسي عالي التوافق مع أنظمة الفرز الآلي وتصدير PDF دقيق"
                  : "Optimized for automated parsers & pixel-perfect PDF export via window.print()"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60 text-xs">
              <button
                type="button"
                onClick={() => setUserSelectedLang("en")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  !isAr
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Switch to English ATS Format"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setUserSelectedLang("ar")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  isAr
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="التبديل إلى التنسيق العربي"
              >
                عربي
              </button>
            </div>

            {/* Print / Download Button */}
            <button
              type="button"
              onClick={handlePrint}
              id="btn-print-resume"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isAr ? "طباعة / تصدير PDF" : "Download PDF / Print"}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label={isAr ? "إغلاق النافذة" : "Close modal"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Container */}
        <div className="p-3 sm:p-6 md:p-8 bg-slate-950/60 max-h-[82vh] overflow-y-auto print:max-h-none print:p-0 print:overflow-visible print:bg-white">
          {/* Printable Resume Document Paper */}
          <article
            id="printable-resume"
            dir={isAr ? "rtl" : "ltr"}
            lang={resumeLang}
            className="w-full max-w-[850px] mx-auto bg-white text-black p-6 sm:p-10 md:p-12 shadow-2xl rounded-sm font-sans selection:bg-slate-200 print:p-0 print:m-0 print:max-w-none print:shadow-none print:rounded-none"
            style={{
              fontFamily: isAr
                ? "var(--font-arabic), Tahoma, Arial, sans-serif"
                : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
          >
            {/* 1. HEADER / CONTACT BLOCK */}
            <header className="border-b-2 border-black pb-4 mb-5 text-center print:pb-1.5 print:mb-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-black mb-1.5 print:text-xl print:mb-0.5">
                {isAr ? data.profile.name.ar : data.profile.name.en}
              </h1>

              <p className="text-sm sm:text-base font-semibold text-neutral-800 mb-3 tracking-wide print:text-xs print:mb-1">
                {isAr ? data.profile.title.ar : data.profile.title.en}
              </p>

              {/* Contact Information Row */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-neutral-800 font-medium print:gap-x-2 print:gap-y-0.5 print:text-[8pt]">
                <span>{isAr ? data.profile.location.ar : data.profile.location.en}</span>
                <span className="text-neutral-400">•</span>
                <a
                  href={data.profile.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-black font-semibold"
                >
                  WhatsApp: {data.profile.phone}
                </a>
                <span className="text-neutral-400">•</span>
                <a
                  href={`mailto:${data.profile.email}`}
                  className="hover:underline text-black font-semibold"
                >
                  {data.profile.email}
                </a>
                <span className="text-neutral-400">•</span>
                <a
                  href={data.profile.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-neutral-900"
                >
                  {data.profile.github.label}
                </a>
                <span className="text-neutral-400">•</span>
                <a
                  href={data.profile.portfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-neutral-900"
                >
                  {data.profile.portfolio.label}
                </a>
              </div>
            </header>

            {/* 2. PROFESSIONAL SUMMARY */}
            <section className="mb-5 resume-section print:mb-2">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-2 print:pb-0.5 print:mb-1">
                {isAr ? "الملخص المهني" : "PROFESSIONAL SUMMARY"}
              </h2>
              <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-900 text-justify print:text-[8pt] print:leading-snug">
                {isAr ? data.summary.ar : data.summary.en}
              </p>
            </section>

            {/* 3. CORE TECHNICAL SKILLS */}
            <section className="mb-5 resume-section print:mb-2">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-2 print:pb-0.5 print:mb-1">
                {isAr ? "المهارات التقنية والمعمارية" : "CORE TECHNICAL SKILLS"}
              </h2>
              <div className="space-y-1.5 text-xs sm:text-[13px] print:space-y-0.5 print:text-[8pt]">
                {data.skills.map((skillGroup, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:gap-2 leading-relaxed">
                    <span className="font-bold text-black min-w-[210px] shrink-0">
                      {isAr ? skillGroup.category.ar : skillGroup.category.en}:
                    </span>
                    <span className="text-neutral-800">
                      {skillGroup.skills.join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. PROFESSIONAL EXPERIENCE */}
            <section className="mb-5 resume-section print:mb-2">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-2 print:pb-0.5 print:mb-1">
                {isAr ? "الخبرات المهنية" : "PROFESSIONAL EXPERIENCE"}
              </h2>

              <div className="space-y-4 print:space-y-1.5">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="resume-entry">
                    {/* Role & Company Header */}
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1 print:mb-0.5">
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-black print:text-[8.5pt]">
                          {isAr ? exp.role.ar : exp.role.en}
                        </span>
                        <span className="text-neutral-600 mx-1.5">|</span>
                        <span className="font-semibold text-xs sm:text-sm text-neutral-900 print:text-[8.5pt]">
                          {exp.company}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-700 font-medium font-mono print:text-[7.5pt]">
                        <span>{isAr ? exp.location.ar : exp.location.en}</span>
                        <span className="mx-1">•</span>
                        <span>{isAr ? exp.period.ar : exp.period.en}</span>
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="list-disc list-outside ps-4 sm:ps-5 space-y-1 text-xs sm:text-[12.5px] leading-relaxed text-neutral-900 print:ps-3.5 print:space-y-0.5 print:text-[7.5pt] print:leading-snug">
                      {(isAr ? exp.highlights.ar : exp.highlights.en).map((bullet, bIdx) => (
                        <li key={bIdx} className="text-justify">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. SELECTED PRODUCTION PROJECTS */}
            <section className="mb-5 resume-section print:mb-2">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-2 print:pb-0.5 print:mb-1">
                {isAr ? "أبرز المشاريع الإنتاجية المعتمدة" : "SELECTED PRODUCTION PROJECTS"}
              </h2>

              <div className="space-y-3 print:space-y-1">
                {data.projects.map((proj, idx) => (
                  <div key={idx} className="resume-entry">
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-0.5 print:mb-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-black print:text-[8.5pt]">
                          {proj.title}
                        </span>
                        <span className="text-neutral-500 text-xs print:text-[7.5pt]">
                          (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-900 font-medium hover:underline"
                          >
                            {proj.displayUrl}
                          </a>
                          )
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-600 print:text-[7pt]">
                        {proj.technologies.slice(0, 4).join(" • ")}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[12px] leading-relaxed text-neutral-800 text-justify print:text-[7.5pt] print:leading-snug">
                      {isAr ? proj.description.ar : proj.description.en}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. EDUCATION & CREDENTIALS */}
            <section className="mb-4 resume-section print:mb-1.5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-2 print:pb-0.5 print:mb-1">
                {isAr ? "التعليم والمؤهلات" : "EDUCATION & CREDENTIALS"}
              </h2>

              <div className="space-y-2 print:space-y-1">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="resume-entry">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="font-bold text-xs sm:text-sm text-black print:text-[8.5pt]">
                        {isAr ? edu.degree.ar : edu.degree.en}
                      </span>
                      <span className="text-xs text-neutral-700 font-mono print:text-[7.5pt]">
                        {isAr ? edu.period.ar : edu.period.en}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-800 print:text-[7.5pt]">
                      {isAr ? edu.institution.ar : edu.institution.en}
                    </p>
                    {edu.details && (
                      <p className="text-[11.5px] text-neutral-700 mt-0.5 print:text-[7pt] print:mt-0">
                        {isAr ? edu.details.ar : edu.details.en}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 7. LANGUAGES */}
            <section className="resume-section print:mb-0">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-1.5 print:pb-0.5 print:mb-0.5">
                {isAr ? "اللغات" : "LANGUAGES"}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-800">
                {data.languages.map((langItem, idx) => (
                  <div key={idx}>
                    <span className="font-semibold text-black">
                      {isAr ? langItem.name.ar : langItem.name.en}:
                    </span>{" "}
                    <span>
                      {isAr ? langItem.proficiency.ar : langItem.proficiency.en}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
