"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

function getInitialLanguage(): Language {
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

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", dir);
    try {
      localStorage.setItem("badra_lang", language);
    } catch {
      // Ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "ar" : "en"));
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
