"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n-context";
import { Send, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialDescription?: string;
}

export function ContactModal({
  isOpen,
  onClose,
  initialService = "",
  initialDescription = "",
}: ContactModalProps) {
  const { language } = useI18n();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneOrWhatsApp: "",
    projectType: initialService || "Web Application",
    budgetRange: "$5,000 - $15,000",
    timeline: "4 - 8 Weeks",
    description: initialDescription,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <span className="font-mono text-sm tracking-wide uppercase text-slate-800 dark:text-slate-200">
          {language === "en" ? "Start a Project — BADRA" : "بدء مشروع — بدرة"}
        </span>
      }
    >
      {success ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === "en" ? "Inquiry Sent Successfully" : "تم إرسال استفسارك بنجاح"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {language === "en"
              ? "Mohamed Ahmed Badra will review your project requirements and get in touch within 24 hours."
              : "سيقوم محمد أحمد بدرة بمراجعة متطلبات المشروع والتواصل معك خلال 24 ساعة."}
          </p>
          <Button variant="primary" size="sm" onClick={onClose}>
            {language === "en" ? "Close" : "إغلاق"}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={language === "en" ? "Your Name *" : "الاسم الكريم *"}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label={language === "en" ? "Email Address *" : "البريد الإلكتروني *"}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={language === "en" ? "WhatsApp / Phone (Optional)" : "واتساب / الهاتف (اختياري)"}
              value={formData.phoneOrWhatsApp}
              onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
            />
            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                {language === "en" ? "Project Type" : "نوع المشروع"}
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors cursor-pointer"
              >
                <option value={language === "en" ? "Full-Stack Web App" : "تطبيق ويب متكامل"}>
                  {language === "en" ? "Full-Stack Web Application" : "تطبيق ويب متكامل"}
                </option>
                <option value={language === "en" ? "AI / RAG Platform" : "منصة ذكاء اصطناعي / RAG"}>
                  {language === "en" ? "AI Platform / RAG System" : "منصة ذكاء اصطناعي / RAG"}
                </option>
                <option value={language === "en" ? "B2B/B2C E-Commerce" : "متجر إلكتروني B2B/B2C"}>
                  {language === "en" ? "B2B/B2C E-Commerce Engine" : "متجر إلكتروني B2B/B2C"}
                </option>
                <option value={language === "en" ? "Enterprise CRM / SaaS" : "نظام مؤسسي CRM / SaaS"}>
                  {language === "en" ? "Enterprise CRM / SaaS" : "نظام مؤسسي CRM / SaaS"}
                </option>
              </select>
            </div>
          </div>

          <Textarea
            label={language === "en" ? "Project Scope & Requirements *" : "نطاق المشروع والمتطلبات *"}
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={
              language === "en"
                ? "Describe your product, expected deliverables, and timeline..."
                : "اشرح فكرة منتجك والمخرجات المطلوبة والجدول الزمني المتوقع..."
            }
          />

          {errorMessage && (
            <div className="p-2.5 rounded bg-red-50 dark:bg-red-950/30 text-xs text-red-600 dark:text-red-400">
              {errorMessage}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full"
              icon={<Send className="w-4 h-4" />}
            >
              {language === "en" ? "Send Project Inquiry" : "إرسال تفاصيل المشروع"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
