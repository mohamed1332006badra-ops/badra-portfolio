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

export default function HomePage() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiScoperOpen, setAiScoperOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string>("");
  const [inquiryDescription, setInquiryDescription] = useState<string>("");

  // Global Keyboard shortcut listener for ⌘K and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
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
    <div className="flex min-h-screen flex-col">
      {/* Global Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAiScoper={() => setAiScoperOpen(true)}
        onOpenContactModal={() => {
          setSelectedServiceForInquiry("");
          setInquiryDescription("");
          setContactModalOpen(true);
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenContactModal={() => setContactModalOpen(true)}
          onOpenAiScoper={() => setAiScoperOpen(true)}
        />

        {/* 01 // Engineering Proof Matrix */}
        <EngineeringProof />

        {/* 02 // Projects & Deep-Dive Case Studies */}
        <ProjectsSection />

        {/* 03 // Engineering Lab & Interactive Sandboxes */}
        <EngineeringLab />

        {/* 04 // Engineering Services & Capabilities */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 05 // Engineering Philosophy & About */}
        <AboutSection />

        {/* 06 // Contact & Project Inquiry */}
        <ContactSection
          initialService={selectedServiceForInquiry}
          initialDescription={inquiryDescription}
        />
      </main>

      {/* Footer */}
      <Footer onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Global Command Center (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenAiScoper={() => setAiScoperOpen(true)}
        onOpenContactModal={() => setContactModalOpen(true)}
      />

      {/* AI Project Scoper Modal */}
      <AiScoperModal
        isOpen={aiScoperOpen}
        onClose={() => setAiScoperOpen(false)}
        onPassToContact={handleAiScopeToContact}
      />

      {/* Project Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialService={selectedServiceForInquiry}
        initialDescription={inquiryDescription}
      />
    </div>
  );
}
