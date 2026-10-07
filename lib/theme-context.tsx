"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Theme } from "./types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("badra-theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("badra-theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeClient(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const val = localStorage.getItem("badra_theme");
    if (val === "light" || val === "dark") return val;
  } catch {
    // Ignore error
  }
  return "dark";
}

function getThemeServer(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeClient, getThemeServer);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem("badra_theme", newTheme);
    } catch {
      // Ignore
    }
    if (typeof window !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      window.dispatchEvent(new Event("badra-theme-change"));
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
