"use client";

import React from "react";
import { I18nProvider } from "@/lib/i18n-context";
import { ThemeProvider } from "@/lib/theme-context";
import { XRayProvider } from "@/lib/xray-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <XRayProvider>
          {children}
        </XRayProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
