"use client";

import React, { useState, useRef, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n-context";
import { AiProjectScopeResult, AiScopeStreamEvent } from "@/lib/types";
import { Sparkles, AlertTriangle, Layers, Terminal, Square, HelpCircle, CheckCircle2 } from "lucide-react";

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
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedStatus, setStreamedStatus] = useState<string>("");
  const [streamedSummary, setStreamedSummary] = useState<string>("");
  const [result, setResult] = useState<AiProjectScopeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Clean up ongoing stream when modal is closed
  useEffect(() => {
    if (!isOpen && abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsStreaming(false);
      setLoading(false);
    }
  }, [isOpen]);

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError(language === "en" ? "Please enter a project description." : "يرجى كتابة وصف للمشروع.");
      return;
    }

    setLoading(true);
    setIsStreaming(true);
    setError(null);
    setStreamedSummary("");
    setStreamedStatus(language === "en" ? "Initializing architecture engine..." : "تهيئة محرك المعمارية الذكي...");
    setResult(null);

    // Setup abort controller for client-side stream termination
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const res = await fetch("/api/ai-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, projectType, language }),
        signal: abortController.signal,
      });

      if (!res.ok) {
        let errMessage = "Failed to generate architecture analysis.";
        try {
          const errData = await res.json();
          errMessage = errData.error || errMessage;
        } catch {
          // Response was not JSON
        }
        throw new Error(errMessage);
      }

      const reader = res.body?.getReader();
      if (!reader) {
        throw new Error("No readable stream received from server.");
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const dataPayload = trimmed.slice(6).trim();
          if (dataPayload === "[DONE]") {
            break;
          }

          try {
            const event: AiScopeStreamEvent = JSON.parse(dataPayload);

            if (event.type === "status") {
              setStreamedStatus(event.message);
            } else if (event.type === "token") {
              setStreamedSummary((prev) => prev + event.token);
            } else if (event.type === "complete") {
              setResult(event.result);
              setStreamedSummary(event.result.summary);
            } else if (event.type === "error") {
              setError(event.message);
            }
          } catch {
            // Ignore incomplete JSON chunks in transit
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("[AI Scoper] Stream aborted by client.");
      } else {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      }
    } finally {
      setIsStreaming(false);
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleProceedToContact = () => {
    if (!result) return;
    const brief = `[AI Scoper Architecture Brief]\nProject: ${prompt}\n\nRecommended Stack:\nFrontend: ${result.recommendedArchitecture.frontend}\nBackend: ${result.recommendedArchitecture.backend}\nDatabase: ${result.recommendedArchitecture.database}\nAI: ${result.recommendedArchitecture.aiComponents || 'N/A'}`;
    onPassToContact(brief);
    onClose();
  };

  const handleReset = () => {
    handleStopGeneration();
    setResult(null);
    setStreamedSummary("");
    setStreamedStatus("");
    setError(null);
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
        {!result && !isStreaming ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {language === "en" ? "Tell me what you want to build." : "أخبرني بما تريد بناءه."}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {language === "en"
                  ? "Describe your product idea or engineering challenge. Our system will stream a real-time architectural blueprint, stack breakdown, and delivery phases."
                  : "اشرح فكرة منتجك أو التحدي البرمجي المطلوب. سيقوم النظام ببث تحليل معماري لحظي للتقنيات ومراحل التسليم."}
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
                  className="w-full px-3 py-2 text-xs rounded-md bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors"
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
                      language === "en"
                        ? "A bilingual customer intelligence dashboard with vector search on support tickets and real-time metric updates."
                        : "لوحة تحكم ذكية ثنائية اللغة مع بحث متجهي في تذاكر الدعم الفني وتحديثات لحظية للمقاييس."
                    )
                  }
                  className="w-full text-start px-3 py-2 text-xs rounded-md bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-slate-300 dark:hover:border-white/20 transition-colors truncate shadow-2xs"
                >
                  {language === "en"
                    ? "Click to fill: Customer intelligence & RAG..."
                    : "اضغط للملء: منصة ذكاء العملاء واسترجاع RAG..."}
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
              {language === "en" ? "Analyze Architecture & Stream Scope (SSE)" : "تحليل المعمارية وبث نطاق العمل (SSE)"}
            </Button>
          </form>
        ) : isStreaming && !result ? (
          /* Live Streaming Terminal View */
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 p-5 shadow-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-400 ms-2">ai-scope-engine://stream</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>SSE Active</span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="flex items-center gap-2 mb-4 p-2 rounded bg-slate-800/60 border border-slate-700/50 text-xs text-blue-300">
                <Terminal className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
                <span className="font-mono">{streamedStatus}</span>
              </div>

              {/* Live Streaming Content */}
              <div className="min-h-[120px] font-mono text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {streamedSummary}
                <span className="inline-block w-2 h-4 ms-1 bg-blue-400 animate-pulse align-middle" />
              </div>
            </div>

            {/* Stop Stream Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleStopGeneration}
                icon={<Square className="w-3.5 h-3.5 fill-current" />}
              >
                {language === "en" ? "Stop Generation" : "إيقاف التوليد"}
              </Button>
            </div>
          </div>
        ) : (
          /* Full Completed Result View */
          <div className="space-y-6 text-slate-900 dark:text-slate-100">
            {/* Stream Status Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === "en" ? "Architecture Specification Generated" : "تم توليد المواصفة المعمارية بنجاح"}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {language === "en" ? "Deterministic SSE Stream" : "بث تدريجي مباشر"}
              </span>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/40">
              <span className="font-mono text-xs uppercase font-bold text-purple-600 dark:text-purple-400 block mb-1">
                {language === "en" ? "Architectural Assessment" : "التقييم المعماري الأولي"}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {result?.summary}
              </p>
            </div>

            {/* Recommended Stack */}
            {result && (
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
                  <Layers className="w-4 h-4" />
                  <span>{language === "en" ? "Recommended Engineering Stack" : "البنية التقنية الموصى بها"}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 uppercase block font-semibold">Frontend</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.frontend}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 uppercase block font-semibold">Backend / APIs</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.backend}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                    <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 uppercase block font-semibold">Database & Caching</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.database}</span>
                  </div>
                  {result.recommendedArchitecture.aiComponents && (
                    <div className="p-2.5 rounded bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 uppercase block font-semibold">AI & Vectors</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.aiComponents}</span>
                    </div>
                  )}
                  <div className="p-2.5 rounded bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs sm:col-span-2">
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 uppercase block font-semibold">Hosting & CDN</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{result.recommendedArchitecture.hosting}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Milestones */}
            {result && (
              <div>
                <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider block mb-2.5">
                  {language === "en" ? "Phased Delivery Milestones" : "مراحل التسليم المقترحة"}
                </span>
                <div className="space-y-2">
                  {result.keyMilestones.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-3 shadow-xs">
                      <span className="font-mono text-blue-500 font-bold shrink-0">{m.phase}:</span>
                      <span className="text-slate-700 dark:text-slate-300">{m.deliverables}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Risks */}
            {result && result.technicalRisks.length > 0 && (
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

            {/* Suggested Questions */}
            {result && result.suggestedQuestions && result.suggestedQuestions.length > 0 && (
              <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40 text-xs">
                <div className="flex items-center gap-1.5 font-mono text-blue-700 dark:text-blue-400 font-bold mb-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{language === "en" ? "Exploratory Architecture Questions" : "أسئلة معمارية استكشافية"}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {result.suggestedQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" size="sm" onClick={handleReset}>
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
