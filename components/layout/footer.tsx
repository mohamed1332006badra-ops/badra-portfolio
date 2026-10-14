"use client";

import React from "react";
import { useI18n } from "@/lib/i18n-context";
import { SITE_METADATA } from "@/lib/content";
import { Terminal, ArrowUp, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { StatusBar } from "@/components/layout/status-bar";
import { GitHubActivity } from "@/components/telemetry/github-activity";
import { BadraTechLogo } from "@/components/ui/brand-logos";

interface FooterProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal?: () => void;
  onOpenTerminal?: () => void;
}

export function Footer({
  onOpenCommandPalette,
  onOpenResumeModal,
  onOpenTerminal,
}: FooterProps) {
  const { language } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/80 dark:bg-[#08090d] py-12 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Observability Telemetry & GitHub Activity Stream */}
        <div className="space-y-3">
          <StatusBar onOpenTerminal={onOpenTerminal} />
          <GitHubActivity />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-200 dark:border-slate-800/60 gap-6">
          <div>
            <div className="mb-2">
              <BadraTechLogo className="w-8 h-8" showText={true} subtitle="2030" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 max-w-md">
              {language === "en" ? SITE_METADATA.coreStatement.en : SITE_METADATA.coreStatement.ar}
            </p>
          </div>

          {/* Social Links & Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {onOpenResumeModal && (
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                <span>{language === "en" ? "Resume" : "السيرة الذاتية"}</span>
              </button>
            )}

            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>⌘K</span>
            </button>

            <a
              href={SITE_METADATA.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Direct Message"
              title="WhatsApp: +20 1016731179"
              className="p-2 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-500 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            <a
              href={SITE_METADATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub: mohamed1332006badra-ops"
              className="p-2 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-500 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={SITE_METADATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
              className="p-2 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs text-blue-600 dark:text-blue-400 hover:border-blue-500 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
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
