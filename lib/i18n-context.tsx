"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Language, LocalizedString, LocalizedArray } from "./types";

interface I18nContextType {
  language: Language;
  direction: "ltr" | "rtl";
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (val: LocalizedString | undefined) => string;
  tArr: (val: LocalizedArray | undefined) => string[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function subscribeLang(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("badra-lang-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("badra-lang-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getLangClient(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("badra_lang") as Language | null;
    if (saved === "en" || saved === "ar") return saved;
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("ar")) return "ar";
  } catch {
    // Ignore error
  }
  return "en";
}

function getLangServer(): Language {
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribeLang, getLangClient, getLangServer);

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", dir);
  }, [language]);

  const setLanguage = (lang: Language) => {
    try {
      localStorage.setItem("badra_lang", lang);
    } catch {
      // Ignore
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("badra-lang-change"));
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "ar" : "en";
    setLanguage(nextLang);
  };

  const t = (val: LocalizedString | undefined): string => {
    if (!val) return "";
    return val[language] || val.en || "";
  };

  const tArr = (val: LocalizedArray | undefined): string[] => {
    if (!val) return [];
    return val[language] || val.en || [];
  };

  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        toggleLanguage,
        t,
        tArr,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
