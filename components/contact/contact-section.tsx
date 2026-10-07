"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import { SITE_METADATA } from "@/lib/content";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck } from "lucide-react";

interface ContactSectionProps {
  initialDescription?: string;
  initialService?: string;
}

export function ContactSection({ initialDescription = "", initialService = "" }: ContactSectionProps) {
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

  const projectTypes = [
    { en: "Web Application", ar: "تطبيق ويب" },
    { en: "AI / RAG System", ar: "نظام ذكاء اصطناعي" },
    { en: "E-Commerce", ar: "تجارة إلكترونية" },
    { en: "Digital Product MVP", ar: "منتج رقمي MVP" },
    { en: "Performance Audit", ar: "تدقيق وتحسين الأداء" },
  ];

  const budgetOptions = [
    "$3,000 - $5,000",
    "$5,000 - $15,000",
    "$15,000 - $30,000",
    "$30,000+",
  ];

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
    <section id="contact" className="py-24 border-t border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span>06 //</span>
            <span>{language === "en" ? "Start a Project / Inquiry" : "بدء مشروع / استفسار"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "en" ? "Let's Engineer Something Exceptional" : "لنبدأ في هندسة شيء استثنائي"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
            {language === "en"
              ? "Share your product goals, technical specifications, or timeline requirements. You will receive an architectural review and response within 24 hours."
              : "شاركنا أهداف منتجك أو مواصفاتك التقنية أو جدولك الزمني. ستتلقى تحليلاً معمارياً ورداً خلال 24 ساعة."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct channels left column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-[#0c0e15] border border-slate-200/80 dark:border-white/10 space-y-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === "en" ? "Direct Contact Channels" : "قنوات الاتصال المباشرة"}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={`mailto:${SITE_METADATA.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-[#141722] border border-slate-200/60 dark:border-white/5 hover:border-blue-500 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Email</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-500">
                      {SITE_METADATA.contact.email}
                    </span>
                  </div>
                </a>

                <a
                  href={SITE_METADATA.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-[#141722] border border-slate-200/60 dark:border-white/5 hover:border-emerald-500 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">WhatsApp / Instant Message</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500">
                      Direct WhatsApp Chat
                    </span>
                  </div>
                </a>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 space-y-2.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{language === "en" ? "Response within 24 hours guaranteed" : "رد مؤكد خلال 24 ساعة"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{language === "en" ? "Strict NDA & IP confidentiality" : "سرية تامة لحقوق الملكية الفكرية"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form right column */}
          <div className="lg:col-span-7">
            {success ? (
              <div className="p-8 sm:p-10 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === "en" ? "Inquiry Dispatched Successfully" : "تم إرسال استفسارك بنجاح"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  {language === "en"
                    ? "Thank you for reaching out. Mohamed Ahmed Badra will review your requirements and respond with architectural suggestions shortly."
                    : "شكراً لتواصلك. سيقوم محمد أحمد بدرة بمراجعة متطلباتك والرد عليك بالمقترحات المعمارية في أقرب وقت."}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      name: "",
                      email: "",
                      phoneOrWhatsApp: "",
                      projectType: "Web Application",
                      budgetRange: "$5,000 - $15,000",
                      timeline: "4 - 8 Weeks",
                      description: "",
                    });
                  }}
                >
                  {language === "en" ? "Send Another Message" : "إرسال رسالة أخرى"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-slate-50/60 dark:bg-[#0c0e15] border border-slate-200/80 dark:border-white/10 space-y-5">
                {/* Project Type Selector */}
                <div>
                  <label className="text-xs font-semibold uppercase font-mono text-slate-500 block mb-2">
                    {language === "en" ? "Project Category" : "تصنيف المشروع"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((pt) => {
                      const isSelected = formData.projectType === pt.en;
                      return (
                        <button
                          key={pt.en}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: pt.en })}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                              : "bg-white dark:bg-[#141722] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20"
                          }`}
                        >
                          {language === "en" ? pt.en : pt.ar}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={language === "en" ? "Your Name *" : "الاسم الكريم *"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder={language === "en" ? "e.g. Alex Vance" : "مثال: أحمد مصطفى"}
                  />
                  <Input
                    label={language === "en" ? "Email Address *" : "البريد الإلكتروني *"}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="name@company.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={language === "en" ? "WhatsApp / Phone (Optional)" : "واتساب / الهاتف (اختياري)"}
                    value={formData.phoneOrWhatsApp}
                    onChange={(e) => setFormData({ ...formData, phoneOrWhatsApp: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                  />
                  <div>
                    <label htmlFor="target-budget-tier" className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                      {language === "en" ? "Target Budget Tier" : "الميزانية المتوقعة"}
                    </label>
                    <select
                      id="target-budget-tier"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-md bg-white dark:bg-[#141722] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                    >
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Textarea
                  label={language === "en" ? "Project Overview & Goals *" : "نبذة عن المشروع والأهداف *"}
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={
                    language === "en"
                      ? "Tell me about the problem you are solving, core features needed, and any architectural constraints..."
                      : "أخبرني بالمشكلة التي ترغب في حلها، والوظائف الأساسية المطلوبة، وأي قيود تقنية..."
                  }
                />

                {errorMessage && (
                  <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full"
                  icon={<Send className="w-4 h-4" />}
                >
                  {language === "en" ? "Transmit Project Inquiry" : "إرسال تفاصيل المشروع"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
