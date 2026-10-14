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
      className={`fixed bottom-4 md:bottom-6 ${
        direction === "rtl" ? "left-4 md:left-6" : "right-4 md:right-6"
      } z-50 print:hidden flex items-center group`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isAr ? "تواصل مباشر عبر واتساب" : "Chat on WhatsApp"}
        className="relative flex items-center justify-center md:justify-start gap-2.5 w-12 h-12 md:w-auto md:h-14 p-0 md:pl-3.5 md:pr-4 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white shadow-[0_8px_30px_rgb(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgb(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 select-none cursor-pointer"
      >
        {/* WhatsApp Icon */}
        <div className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center shrink-0">
          <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-md" />
        </div>

        {/* Expandable Pill Label (Shown on md+ or group-hover) */}
        <span className="hidden md:inline font-semibold text-xs tracking-wide whitespace-nowrap text-white drop-shadow-sm font-sans">
          {isAr ? "تواصل مباشر عبر واتساب" : "Chat on WhatsApp"}
        </span>

        {/* Live Pulsing Online Indicator Dot */}
        <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 flex h-3.5 w-3.5 md:h-4 md:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 md:h-4 md:w-4 bg-emerald-400 border-2 border-white shadow-xs" />
        </span>
      </a>
    </aside>
  );
}
