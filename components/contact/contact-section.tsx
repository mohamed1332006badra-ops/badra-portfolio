"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import { SITE_METADATA } from "@/lib/content";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  FileCode2,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";

interface ContactSectionProps {
  initialDescription?: string;
  initialService?: string;
}

export function ContactSection({
  initialDescription = "",
  initialService = "",
}: ContactSectionProps) {
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

  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [referenceId, setReferenceId] = useState<string>("");
  const [copied, setCopied] = useState(false);
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

      const generatedRef =
        data.referenceId ||
        `BDR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      setReferenceId(generatedRef);
      setSubmittedData({ ...formData });
      setSuccess(true);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const constructBriefText = () => {
    if (!submittedData) return "";
    if (language === "ar") {
      return `*ملخص طلب مشروع هندسي*
----------------------------------------
*الرقم المرجعي:* ${referenceId}
*اسم العميل:* ${submittedData.name}
*البريد الإلكتروني:* ${submittedData.email}
*الهاتف / واتساب:* ${submittedData.phoneOrWhatsApp || "غير محدد"}
*تصنيف المشروع:* ${submittedData.projectType}
*الميزانية المتوقعة:* ${submittedData.budgetRange}
*الجدول الزمني:* ${submittedData.timeline}
----------------------------------------
*نبذة عن المشروع والأهداف:*
${submittedData.description}
----------------------------------------
مرسل عبر: https://badra-portfolio.vercel.app`;
    }

    return `*Project Inquiry Brief*
----------------------------------------
*Reference ID:* ${referenceId}
*Client Name:* ${submittedData.name}
*Email:* ${submittedData.email}
*Phone/WhatsApp:* ${submittedData.phoneOrWhatsApp || "N/A"}
*Project Category:* ${submittedData.projectType}
*Target Budget:* ${submittedData.budgetRange}
*Timeline:* ${submittedData.timeline}
----------------------------------------
*Project Overview & Goals:*
${submittedData.description}
----------------------------------------
Dispatched via: https://badra-portfolio.vercel.app`;
  };

  const handleCopyBrief = async () => {
    const text = constructBriefText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setSubmittedData(null);
    setReferenceId("");
    setCopied(false);
    setFormData({
      name: "",
      email: "",
      phoneOrWhatsApp: "",
      projectType: "Web Application",
      budgetRange: "$5,000 - $15,000",
      timeline: "4 - 8 Weeks",
      description: "",
    });
  };

  return (
    <section
      id="contact"
      className="py-24 border-t border-slate-200 dark:border-slate-800/60 bg-white dark:bg-[#08090d]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <span>06 //</span>
            <span>{language === "en" ? "Start a Project / Inquiry" : "بدء مشروع / استفسار"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === "en"
              ? "Let's Engineer Something Exceptional"
              : "لنبدأ في هندسة شيء استثنائي"}
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
            <div className="p-6 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {language === "en" ? "Direct Contact Channels" : "قنوات الاتصال المباشرة"}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={`mailto:${SITE_METADATA.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800/60 shadow-xs hover:border-blue-500 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase block font-medium">
                      {language === "en" ? "Email" : "البريد الإلكتروني"}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-500">
                      {SITE_METADATA.contact.email}
                    </span>
                  </div>
                </a>

                <a
                  href={SITE_METADATA.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800/60 shadow-xs hover:border-emerald-500 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase block font-medium">
                      {language === "en" ? "WhatsApp / Instant Message" : "واتساب / تواصل فوري"}
                    </span>
                    <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 flex items-center gap-1.5 flex-wrap">
                      <span dir="ltr" className="inline-block font-mono">+20 1016731179</span>
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        {language === "en" ? "(Direct WhatsApp)" : "(واتساب مباشر)"}
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 space-y-2.5 text-xs text-slate-700 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>
                    {language === "en"
                      ? "Response within 24 hours guaranteed"
                      : "رد مؤكد خلال 24 ساعة"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>
                    {language === "en"
                      ? "Strict NDA & IP confidentiality"
                      : "سرية تامة لحقوق الملكية الفكرية"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form right column */}
          <div className="lg:col-span-7">
            {success && submittedData ? (
              <div className="p-6 sm:p-8 rounded-xl bg-slate-50/90 dark:bg-slate-900/80 border border-emerald-500/40 dark:border-emerald-500/30 shadow-lg space-y-6">
                {/* Status Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {language === "en"
                          ? "Inquiry Transmitted to Queue"
                          : "تم استلام تفاصيل المشروع وتأكيد الطلب"}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {language === "en"
                          ? "SLA: Mohamed will personally review requirements and respond within 24h"
                          : "التزام زمني: مراجعة معمارية والرد خلال 24 ساعة كحد أقصى"}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 font-mono text-xs font-semibold text-emerald-800 dark:text-emerald-300 self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>REF: {referenceId}</span>
                  </div>
                </div>

                {/* Structured JSON Payload / Architectural Summary Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                      <FileCode2 className="w-3.5 h-3.5 text-blue-500" />
                      {language === "en" ? "Structured Inquiry Payload" : "ملخص الطلب المعماري"}
                    </span>
                    <span>JSON / ARCH-V1</span>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
                    <pre className="whitespace-pre-wrap">
{JSON.stringify(
  {
    reference_id: referenceId,
    client: submittedData.name,
    email: submittedData.email,
    category: submittedData.projectType,
    target_budget: submittedData.budgetRange,
    timeline: submittedData.timeline,
    phone: submittedData.phoneOrWhatsApp || "N/A",
    status: "QUEUED_FOR_ARCHITECTURAL_REVIEW",
    guaranteed_sla: "< 24 Hours",
  },
  null,
  2
)}
                    </pre>
                  </div>
                </div>

                {/* Direct High-Conversion Routing Actions */}
                <div className="space-y-3 pt-2">
                  <a
                    href={`https://wa.me/201016731179?text=${encodeURIComponent(constructBriefText())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-bold bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] hover:brightness-105 text-white shadow-[0_8px_25px_rgba(37,211,102,0.35)] transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0 fill-current" />
                    <span>
                      {language === "en"
                        ? "Send Formatted Brief via WhatsApp Directly"
                        : "إرسال ملخص الطلب عبر واتساب مباشرة"}
                    </span>
                    <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                  </a>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 shadow-xs transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {language === "en" ? "Brief Copied to Clipboard!" : "تم نسخ الملخص بنجاح!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-500" />
                          <span>{language === "en" ? "Copy Formatted Brief" : "نسخ ملخص المشروع"}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${SITE_METADATA.contact.email}?subject=${encodeURIComponent(
                        `Project Inquiry [${referenceId}]: ${submittedData.name} - ${submittedData.projectType}`
                      )}&body=${encodeURIComponent(constructBriefText())}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 shadow-xs transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>{language === "en" ? "Send via Email Direct" : "إرسال عبر البريد الإلكتروني"}</span>
                    </a>
                  </div>
                </div>

                {/* Reset / New message button */}
                <div className="pt-2 text-center border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>
                      {language === "en"
                        ? "Submit Another Project Inquiry"
                        : "تعديل أو إرسال استفسار جديد"}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
              >
                {/* Project Type Selector */}
                <div>
                  <label className="text-xs font-semibold uppercase font-mono text-slate-700 dark:text-slate-400 block mb-2">
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
                              : "bg-white dark:bg-slate-800/60 border-slate-300 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 shadow-xs"
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
                    label={
                      language === "en"
                        ? "WhatsApp / Phone (Optional)"
                        : "واتساب / الهاتف (اختياري)"
                    }
                    value={formData.phoneOrWhatsApp}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneOrWhatsApp: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                  />
                  <div>
                    <label
                      htmlFor="target-budget-tier"
                      className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5"
                    >
                      {language === "en" ? "Target Budget Tier" : "الميزانية المتوقعة"}
                    </label>
                    <select
                      id="target-budget-tier"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-md bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors"
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
                  label={
                    language === "en"
                      ? "Project Overview & Goals *"
                      : "نبذة عن المشروع والأهداف *"
                  }
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

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full sm:flex-1"
                    icon={<Send className="w-4 h-4" />}
                  >
                    {language === "en" ? "Transmit Project Inquiry" : "إرسال تفاصيل المشروع"}
                  </Button>

                  <a
                    href={`https://wa.me/201016731179?text=${encodeURIComponent(
                      language === "ar"
                        ? "مرحباً أستاذ محمد، أود مناقشة تفاصيل مشروع برمجي معكم"
                        : "Hello Mohamed, I would like to discuss a software project with you"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm transition-colors shrink-0"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>{language === "en" ? "Chat on WhatsApp" : "محادثة فورية عبر واتساب"}</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
