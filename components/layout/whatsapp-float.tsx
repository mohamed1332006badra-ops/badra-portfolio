"use client";

import React from "react";
import { useI18n } from "@/lib/i18n-context";
import { WhatsAppIcon } from "@/components/ui/icons";

export function WhatsAppFloat() {
  const { language, direction } = useI18n();

  const isAr = language === "ar";
  const encodedMessage = isAr
    ? encodeURIComponent("مرحباً أستاذ محمد، أود مناقشة مشروع برمجي معكم")
    : encodeURIComponent("Hello Mohamed, I would like to discuss a software project");

  const whatsappUrl = `https://wa.me/201016731179?text=${encodedMessage}`;

  return (
    <aside
      aria-label={isAr ? "مساعد التواصل عبر واتساب" : "WhatsApp Quick Contact"}
      className={`fixed bottom-6 ${
        direction === "rtl" ? "left-6" : "right-6"
      } z-40 print:hidden flex items-center group`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isAr ? "تواصل مباشرة عبر واتساب" : "Chat directly on WhatsApp"}
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        {/* Ambient pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 drop-shadow-sm" />

        {/* Status green dot */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full border-2 border-[#25D366] flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </span>
      </a>

      {/* Tooltip banner */}
      <div
        className={`absolute pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900/90 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
          direction === "rtl" ? "left-16" : "right-16"
        }`}
      >
        <span>{isAr ? "تواصل مباشرة عبر واتساب" : "Chat on WhatsApp"}</span>
      </div>
    </aside>
  );
}
