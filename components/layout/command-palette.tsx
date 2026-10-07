"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Laptop, Cpu, Layers, User, Mail, Moon, Sun, Globe, CornerDownLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { useTheme } from "@/lib/theme-context";

interface CommandItem {
  id: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAiScoper: () => void;
  onOpenContactModal: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenAiScoper,
  onOpenContactModal,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { language, toggleLanguage } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = React.useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const navigateTo = (hash: string) => {
    handleClose();
    const elem = document.querySelector(hash);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    {
      id: "ai-assistant",
      title: {
        en: "AI Project Scoper — 'Tell me what you want to build'",
        ar: "مساعد التخطيط الذكي — 'أخبرني بما تريد بناءه'",
      },
      category: { en: "AI Tools", ar: "أدوات الذكاء الاصطناعي" },
      icon: <Terminal className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        onOpenAiScoper();
      },
    },
    {
      id: "projects",
      title: { en: "Explore Engineered Projects & Case Studies", ar: "استكشف المشاريع ودراسات الحالة" },
      category: { en: "Navigation", ar: "التنقل" },
      icon: <Laptop className="w-4 h-4 text-blue-400" />,
      action: () => navigateTo("#projects"),
    },
    {
      id: "lab",
      title: { en: "Engineering Lab & Live Simulators", ar: "المختبر الهندسي والمحاكيات الحية" },
      category: { en: "Navigation", ar: "التنقل" },
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      action: () => navigateTo("#lab"),
    },
    {
      id: "services",
      title: { en: "Engineering Services & Deliverables", ar: "الخدمات الهندسية والمخرجات" },
      category: { en: "Navigation", ar: "التنقل" },
      icon: <Layers className="w-4 h-4 text-amber-400" />,
      action: () => navigateTo("#services"),
    },
    {
      id: "about",
      title: { en: "About Mohamed Badra & Engineering Philosophy", ar: "عن محمد بدرة والفلسفة الهندسية" },
      category: { en: "Navigation", ar: "التنقل" },
      icon: <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />,
      action: () => navigateTo("#about"),
    },
    {
      id: "contact",
      title: { en: "Start a Project / Send Inquiry", ar: "بدء مشروع / إرسال استفسار" },
      category: { en: "Action", ar: "إجراء" },
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      action: () => {
        onClose();
        onOpenContactModal();
      },
    },
    {
      id: "theme",
      title: {
        en: `Switch Theme to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        ar: `التبديل إلى الوضع ${theme === "dark" ? "النهاري" : "الليلي"}`,
      },
      category: { en: "Preferences", ar: "التفضيلات" },
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: "language",
      title: {
        en: `Switch Language to ${language === "en" ? "العربية (Arabic)" : "English"}`,
        ar: `التبديل إلى ${language === "en" ? "العربية" : "الإنجليزية"}`,
      },
      category: { en: "Preferences", ar: "التفضيلات" },
      icon: <Globe className="w-4 h-4 text-emerald-400" />,
      action: () => {
        toggleLanguage();
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchTarget = `${cmd.title.en} ${cmd.title.ar} ${cmd.category.en} ${cmd.category.ar}`.toLowerCase();
    return searchTarget.includes(query.toLowerCase());
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4"
    >
      <div onClick={handleClose} className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-xl bg-white dark:bg-[#0e1017] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-10 text-slate-900 dark:text-slate-100">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800/60 gap-3">
          <Search className="w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              language === "en"
                ? "Type a command or search (e.g. AI, Work, Lab, Theme)..."
                : "اكتب أمراً أو ابحث (مثل: ذكاء، مشاريع، مختبر، الوضع)..."
            }
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-slate-400 text-slate-900 dark:text-white"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-600 dark:text-slate-400">
              {language === "en" ? "No matching commands found." : "لا توجد نتائج مطابقة."}
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-500/10 dark:bg-white/10 text-blue-600 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="text-sm font-medium">
                      {language === "en" ? cmd.title.en : cmd.title.ar}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                      {language === "en" ? cmd.category.en : cmd.category.ar}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-blue-500 dark:text-slate-400" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50/80 dark:bg-[#141722]/60 border-t border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <span>↑↓ {language === "en" ? "Navigate" : "تنقل"}</span>
            <span>↵ {language === "en" ? "Select" : "اختيار"}</span>
            <span>esc {language === "en" ? "Close" : "إغلاق"}</span>
          </div>
          <span className="font-mono">BADRA CLI v2.4</span>
        </div>
      </div>
    </div>
  );
}
