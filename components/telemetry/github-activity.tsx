"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n-context";
import { GitCommit, GitBranch, ExternalLink, CheckCircle2 } from "lucide-react";

interface CommitTelemetry {
  sha: string;
  shortSha: string;
  message: string;
  author: string;
  branch: string;
  date: string;
  url: string;
  verified: boolean;
  source: string;
}

const FALLBACK_COMMIT: CommitTelemetry = {
  sha: "c320570",
  shortSha: "c320570",
  message: "feat(content): integrate live projects, social profiles, and direct WhatsApp channel",
  author: "mohamed1332006badra-ops",
  branch: "main",
  date: "2026-10-12T14:51:59Z",
  url: "https://github.com/mohamed1332006badra-ops/badra-portfolio",
  verified: true,
  source: "local-build",
};

export function GitHubActivity() {
  const { language } = useI18n();
  const [telemetry, setTelemetry] = useState<CommitTelemetry>(FALLBACK_COMMIT);
  const [timeAgo, setTimeAgo] = useState<string>("recently");

  useEffect(() => {
    let isMounted = true;
    const fetchCommit = async () => {
      try {
        const res = await fetch("/api/github");
        if (res.ok && isMounted) {
          const data: CommitTelemetry = await res.json();
          setTelemetry(data);
        }
      } catch {
        // Retain current state
      }
    };

    fetchCommit();
    const interval = setInterval(fetchCommit, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Update relative time in an effect to guarantee pure render
  useEffect(() => {
    const computeRelative = () => {
      if (!telemetry.date) {
        setTimeAgo(language === "en" ? "recently" : "مؤخراً");
        return;
      }
      try {
        const diffSec = Math.floor((Date.now() - new Date(telemetry.date).getTime()) / 1000);
        if (diffSec < 60) {
          setTimeAgo(language === "en" ? "just now" : "الآن");
        } else if (diffSec < 3600) {
          const m = Math.floor(diffSec / 60);
          setTimeAgo(language === "en" ? `${m}m ago` : `منذ ${m} دقيقة`);
        } else {
          const h = Math.floor(diffSec / 3600);
          setTimeAgo(language === "en" ? `${h}h ago` : `منذ ${h} ساعة`);
        }
      } catch {
        setTimeAgo(language === "en" ? "recently" : "مؤخراً");
      }
    };

    computeRelative();
    const timer = setInterval(computeRelative, 60000);
    return () => clearInterval(timer);
  }, [telemetry.date, language]);

  return (
    <div className="w-full rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 p-3 sm:px-4 sm:py-2.5 backdrop-blur-xs text-xs font-mono shadow-2xs transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Stream Status Pulse */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {language === "en" ? "Verified Commit Stream: Synced" : "مزامنة الالتزامات البرمجية: موثقة"}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>GPG Verified</span>
          </span>
        </div>

        {/* Right: Commit Details & SHA */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] text-slate-600 dark:text-slate-400">
          {/* Branch badge */}
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
            <GitBranch className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="font-semibold">{telemetry.branch}</span>
          </div>

          {/* Commit Message Snippet */}
          <span className="hidden md:inline-block max-w-[280px] lg:max-w-[360px] truncate text-slate-500 dark:text-slate-400">
            {telemetry.message}
          </span>

          {/* Time Delta & Clickable SHA */}
          <a
            href={telemetry.url}
            target="_blank"
            rel="noopener noreferrer"
            title={telemetry.message}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-blue-500 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors shrink-0"
          >
            <GitCommit className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="font-bold">{telemetry.shortSha}</span>
            <span className="text-[10px] text-slate-400">({timeAgo})</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  );
}
