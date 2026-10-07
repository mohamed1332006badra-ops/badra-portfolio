"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Terminal, Globe, Moon, Sun, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenAiScoper: () => void;
  onOpenContactModal: () => void;
}

export function Navbar({
  onOpenCommandPalette,
  onOpenAiScoper,
  onOpenContactModal,
}: NavbarProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { language, toggleLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#projects", label: { en: "Work", ar: "الأعمال" } },
    { href: "#lab", label: { en: "Lab", ar: "المختبر" } },
    { href: "#services", label: { en: "Services", ar: "الخدمات" } },
    { href: "#about", label: { en: "About", ar: "نبذة" } },
    { href: "#contact", label: { en: "Contact", ar: "تواصل" } },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          scrolled
            ? "bg-white/90 dark:bg-[#08090d]/85 backdrop-blur-md border-slate-200 dark:border-slate-800/60 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 dark:text-white group shrink-0"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover:scale-125 transition-transform" />
            <span className="text-xl font-mono tracking-wider font-extrabold">BADRA</span>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
              2030
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2 lg:px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                {language === "en" ? link.label.en : link.label.ar}
              </a>
            ))}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 shrink-0">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              aria-label="Command Palette ⌘K"
              title={language === "en" ? "Command Palette (⌘K)" : "لوحة الأوامر (⌘K)"}
              className="hidden lg:flex items-center gap-1.5 px-2 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-slate-800 rounded-md transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              <span>⌘K</span>
            </button>

            {/* AI Scoper Quick Trigger */}
            <button
              onClick={onOpenAiScoper}
              title={language === "en" ? "AI Scoper: 'Tell me what you want to build'" : "مساعد التخطيط الذكي"}
              aria-label={language === "en" ? "Scope with AI" : "تخطيط ذكي"}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-md transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
              <span className="hidden xl:inline">
                {language === "en" ? "Scope with AI" : "تخطيط ذكي"}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label={language === "en" ? "Switch language to Arabic عربي" : "Switch language to English EN"}
              className="p-1.5 sm:p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-md transition-colors flex items-center gap-1 text-xs font-medium shrink-0"
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>{mounted ? (language === "en" ? "عربي" : "EN") : "عربي"}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 sm:p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-md transition-colors shrink-0"
            >
              {mounted ? (
                theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Primary Action Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenContactModal}
              className="hidden md:inline-flex text-xs lg:text-sm px-2.5 lg:px-3.5 py-1.5 whitespace-nowrap shrink-0"
            >
              {language === "en" ? "Start a Project" : "ابدأ مشروعك"}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#08090d]/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-md"
                >
                  {language === "en" ? link.label.en : link.label.ar}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-md bg-slate-100 dark:bg-white/5 text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-500" />
                  <span>{language === "en" ? "Command Palette" : "لوحة الأوامر السريعة"}</span>
                </div>
                <span className="font-mono text-xs text-slate-600 dark:text-slate-400 font-semibold">⌘K</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiScoper();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-md bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 text-sm font-medium text-purple-700 dark:text-purple-300"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>{language === "en" ? "AI Project Scoper" : "المخطط الذكي للمشاريع"}</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactModal();
                }}
                className="w-full mt-2"
              >
                {language === "en" ? "Start a Project" : "ابدأ مشروعك"}
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
