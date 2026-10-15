"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/hero/hero";
import { EngineeringProof } from "@/components/proof/engineering-proof";
import { ProjectsSection } from "@/components/projects/projects-section";
import { EngineeringLab } from "@/components/lab/engineering-lab";
import { ServicesSection } from "@/components/services/services-section";
import { AboutSection } from "@/components/about/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { AiScoperModal } from "@/components/ai/ai-scoper-modal";
import { ContactModal } from "@/components/contact/contact-modal";
import { ResumeModal } from "@/components/resume/resume-modal";
import { TerminalModal } from "@/components/terminal/terminal-modal";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { TelemetryHud } from "@/components/layout/telemetry-hud";
import { XRayTag } from "@/lib/xray-context";

export default function HomePage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [telemetryHudOpen, setTelemetryHudOpen] = useState(false);
  const [aiScoperOpen, setAiScoperOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>("");
  const [inquiryDescription, setInquiryDescription] = useState<string>("");

  // Global Keyboard shortcut listener for ⌘K (Command Palette) and ` / Ctrl+` (Developer CLI)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl instanceof HTMLInputElement || activeEl instanceof HTMLTextAreaElement;

      // ⌘K or Ctrl+K for Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }

      // Backtick (`) or Ctrl+` for Developer Terminal
      if (!isInput && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key === "`") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
    setContactModalOpen(true);
  };

  const handleAiScopeToContact = (scopeBrief: string) => {
    setInquiryDescription(scopeBrief);
    setContactModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#08090d] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden max-w-[100vw]">
      {/* Global Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAiScoper={() => setAiScoperOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenContactModal={() => {
          setSelectedServiceForInquiry("");
          setInquiryDescription("");
          setContactModalOpen(true);
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1 overflow-x-hidden max-w-[100vw]">
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <XRayTag component="HeroSystem" props={{ rsc: "true", render: "0.8ms", hydration: "selective" }} />
          </div>
          <Hero
            onOpenContactModal={() => setContactModalOpen(true)}
            onOpenAiScoper={() => setAiScoperOpen(true)}
            onOpenResumeModal={() => setResumeModalOpen(true)}
          />
        </div>

        {/* 01 // Engineering Proof Matrix */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
            <XRayTag component="ProofMatrix" props={{ telemetry: "live", workers: 4, sla: "99.9%" }} />
          </div>
          <EngineeringProof />
        </div>

        {/* 02 // Projects & Deep-Dive Case Studies */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
            <XRayTag component="ProjectGrid" props={{ items: 8, hydration: "selective", architecture: "rsc" }} />
          </div>
          <ProjectsSection />
        </div>

        {/* 03 // Engineering Lab & Interactive Sandboxes */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
            <XRayTag component="EngineeringLab" props={{ fsm: "atomic", sandboxes: 3, frameSync: "rAF" }} />
          </div>
          <EngineeringLab />
        </div>

        {/* 04 // Engineering Services & Capabilities */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 05 // Engineering Philosophy & About */}
        <AboutSection />

        {/* 06 // Contact & Project Inquiry */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
            <XRayTag component="ContactSection" props={{ encrypted: "aes-256", dispatch: "direct-queue" }} />
          </div>
          <ContactSection
            initialService={selectedServiceForInquiry}
            initialDescription={inquiryDescription}
          />
        </div>
      </main>

      {/* Footer with Observability Telemetry & GitHub Stream */}
      <Footer
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenTelemetryHud={() => setTelemetryHudOpen(true)}
      />

      {/* Global Command Center (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAiScoper={() => setAiScoperOpen(true)}
        onOpenContactModal={() => setContactModalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenTelemetryHud={() => setTelemetryHudOpen(true)}
      />

      {/* Developer Retro-Modern CLI Modal (badra-shell v1.0.0) */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
      />

      {/* Live Browser Telemetry & Core Vitals HUD */}
      <TelemetryHud
        isOpen={telemetryHudOpen}
        onClose={() => setTelemetryHudOpen(false)}
      />

      {/* AI Project Scoper Modal */}
      <AiScoperModal
        isOpen={aiScoperOpen}
        onClose={() => setAiScoperOpen(false)}
        onPassToContact={handleAiScopeToContact}
      />

      {/* Project Inquiry Modal */}
      <ContactModal
        key={`${selectedServiceForInquiry}-${inquiryDescription.length}`}
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialService={selectedServiceForInquiry}
        initialDescription={inquiryDescription}
      />

      {/* ATS-Compliant Interactive Resume Modal & Dynamic PDF Exporter */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Floating Direct WhatsApp CTA */}
      <WhatsAppFloat />
    </div>
  );
}
