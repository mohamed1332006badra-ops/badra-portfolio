"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n-context";
import { AiProjectScopeResult } from "@/lib/types";
import { Sparkles, AlertTriangle, Layers } from "lucide-react";

interface AiScoperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPassToContact: (scopeSummary: string) => void;
}

export function AiScoperModal({ isOpen, onClose, onPassToContact }: AiScoperModalProps) {
  const { language } = useI18n();
  const [prompt, setPrompt] = useState("");
  const [projectType, setProjectType] = useState("Full-Stack Web App");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiProjectScopeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError(language === "en" ? "Please enter a project description." : "يرجى كتابة وصف للمشروع.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, projectType }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate architecture analysis.");
      }

      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToContact = () => {
    if (!result) return;
    const brief = `[AI Scoper Architecture Brief]\nProject: ${prompt}\n\nRecommended Stack:\nFrontend: ${result.recommendedArchitecture.frontend}\nBackend: ${result.recommendedArchitecture.backend}\nDatabase: ${result.recommendedArchitecture.database}\nAI: ${result.recommendedArchitecture.aiComponents || 'N/A'}`;
    onPassToContact(brief);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span className="font-mono text-sm tracking-wide uppercase text-slate-800 dark:text-slate-200">
            {language === "en" ? "AI Product Architect & Scoper" : "المخطط الذكي لمعمارية المشاريع"}
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {language === "en" ? "Tell me what you want to build." : "أخبرني بما تريد بناءه."}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {language === "en"
                  ? "Describe your product idea or engineering challenge. Our system will generate a recommended architecture, stack breakdown, and delivery phases."
                  : "اشرح فكرة منتجك أو التحدي البرمجي المطلوب. سيقوم النظام بتحليل المتطلبات واقتراح المعمارية المثلى ومراحل التنفيذ."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  {language === "en" ? "Product Category" : "تصنيف المنتج"}
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-[#141722] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
                >
                  <option value="Full-Stack Web App">Full-Stack Web Application</option>
                  <option value="AI & RAG System">AI Assistant / RAG Knowledge Pipeline</option>
                  <option value="E-Commerce Platform">High-Performance E-Commerce</option>
                  <option value="Real-Time Telemetry">Real-Time Telemetry / Dashboard</option>
                  <option value="Custom Digital Product">Custom Digital Product (MVP)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1">
                  {language === "en" ? "Example Prompt" : "مثال استرشادي"}
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setPrompt(
                      "A bilingual customer intelligence dashboard with vector search on support tickets and real-time metric updates."
                    )
                  }
                  className="w-full text-left px-3 py-2 text-xs rounded-md bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 hover:text-blue-500 truncate"
                >
                  Click to fill: Customer intelligence & RAG...
                </button>
              </div>
            </div>

            <Textarea
              label={language === "en" ? "Project Requirements & Intent" : "متطلبات المشروع والمواصفات"}
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                language === "en"
                  ? "E.g., We need a secure document portal where users can upload PDFs and ask natural-language questions in Arabic and English..."
                  : "مثال: نحتاج إلى بوابة مستندات آمنة تتيح للمستخدمين رفع ملفات PDF وطرح أسئلة باللغتين العربية والإنجليزية..."
              }
            />

            {error && (
              <div className="p-3 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-xs text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={loading}
              className="w-full"
              icon={<Sparkles className="w-4 h-4" />}
            >
              {language === "en" ? "Analyze Architecture & Generate Scope" : "تحليل المعمارية وتوليد نطاق العمل"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6 text-slate-900 dark:text-slate-100">
            {/* Summary */}
            <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/40">
              <span className="font-mono text-xs uppercase font-bold text-purple-600 dark:text-purple-400 block mb-1">
                {language === "en" ? "Architectural Assessment" : "التقييم المعماري الأولي"}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Recommended Stack */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4" />
                <span>{language === "en" ? "Recommended Engineering Stack" : "البنية التقنية الموصى بها"}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded bg-slate-50 dark:bg-[#141722] border border-slate-200/80 dark:border-white/5">
                  <span className="font-mono text-[10px] text-slate-400 uppercase block">Frontend</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.frontend}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 dark:bg-[#141722] border border-slate-200/80 dark:border-white/5">
                  <span className="font-mono text-[10px] text-slate-400 uppercase block">Backend / APIs</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.backend}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-50 dark:bg-[#141722] border border-slate-200/80 dark:border-white/5">
                  <span className="font-mono text-[10px] text-slate-400 uppercase block">Database & Caching</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.database}</span>
                </div>
                {result.recommendedArchitecture.aiComponents && (
                  <div className="p-2.5 rounded bg-slate-50 dark:bg-[#141722] border border-slate-200/80 dark:border-white/5">
                    <span className="font-mono text-[10px] text-purple-400 uppercase block">AI & Vectors</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.aiComponents}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Milestones */}
            <div>
              <span className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
                {language === "en" ? "Phased Delivery Milestones" : "مراحل التسليم المقترحة"}
              </span>
              <div className="space-y-2">
                {result.keyMilestones.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-white dark:bg-[#0c0e15] border border-slate-200/80 dark:border-white/10 text-xs flex items-start gap-3">
                    <span className="font-mono text-blue-500 font-bold shrink-0">{m.phase}:</span>
                    <span className="text-slate-600 dark:text-slate-300">{m.deliverables}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Risks */}
            {result.technicalRisks.length > 0 && (
              <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-amber-700 dark:text-amber-400 font-bold mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{language === "en" ? "Anticipated Technical Risks & Mitigations" : "المخاطر التقنية وطرق تداركها"}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {result.technicalRisks.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" size="sm" onClick={() => setResult(null)}>
                {language === "en" ? "← Modify Prompt" : "← تعديل الوصف"}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleProceedToContact}
                className="group"
              >
                <span>{language === "en" ? "Send Architecture to Mohamed →" : "إرسال المواصفات إلى محمد ←"}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
