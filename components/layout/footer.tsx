"use client";

import React from "react";
import { useI18n } from "@/lib/i18n-context";
import { SITE_METADATA } from "@/lib/content";
import { Terminal, MessageSquare, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

interface FooterProps {
  onOpenCommandPalette: () => void;
}

export function Footer({ onOpenCommandPalette }: FooterProps) {
  const { language } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/80 dark:bg-[#08090d] py-14 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-10 border-b border-slate-200 dark:border-slate-800/60 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 dark:text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="font-mono text-lg tracking-wider">BADRA</span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">· 2030</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 max-w-md">
              {language === "en" ? SITE_METADATA.coreStatement.en : SITE_METADATA.coreStatement.ar}
            </p>
          </div>

          {/* Social Links & System Health */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{language === "en" ? "Systems Operational" : "جميع الأنظمة تعمل بكفاءة"}</span>
            </div>

            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>⌘K</span>
            </button>

            <a
              href={SITE_METADATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={SITE_METADATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={SITE_METADATA.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Message"
              className="p-2 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs hover:text-emerald-500 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium gap-2">
          <p>
            © 2026 Mohamed Ahmed Badra. {language === "en" ? "All rights reserved. Human-designed & engineered." : "جميع الحقوق محفوظة. تصميم وتطوير هندسي أصيل."}
          </p>
          <p className="font-mono text-[11px]">
            Next.js · TypeScript · Strict Type Contracts · Zero Fake Metrics
          </p>
        </div>
      </div>
    </footer>
  );
}
