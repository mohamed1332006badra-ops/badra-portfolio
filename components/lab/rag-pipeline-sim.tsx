"use client";

import React, { useState } from "react";
import { Search, Cpu, Sparkles, Check, Database, Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";

interface DocumentChunk {
  id: string;
  source: string;
  content: string;
  vectorSimilarity: number;
}

export function RagPipelineSim() {
  const { language } = useI18n();
  const [query, setQuery] = useState("How does the system ensure zero layout shifts in Arabic RTL?");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(3);

  const sampleChunks: DocumentChunk[] = [
    {
      id: "chunk-102",
      source: "docs/typography-bidi.md:L42",
      content:
        "By enforcing CSS logical properties (margin-inline, inset-inline) and pre-loading IBM Plex Sans Arabic font metrics, layout shifts (CLS) are reduced to 0.00.",
      vectorSimilarity: 0.942,
    },
    {
      id: "chunk-088",
      source: "arch/edge-caching.md:L18",
      content:
        "Static generation at edge CDNs provides sub-30ms TTFB for international visitors across GCC and European edge nodes.",
      vectorSimilarity: 0.724,
    },
    {
      id: "chunk-041",
      source: "services/rate-limit.go:L110",
      content:
        "Sliding window rate limiters in Redis return HTTP 429 when client IP exceeds 60 requests per minute.",
      vectorSimilarity: 0.381,
    },
  ];

  const handleSimulate = () => {
    setIsProcessing(true);
    setActiveStep(1);
    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setIsProcessing(false);
      }, 500);
    }, 400);
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-[#131622] border border-slate-200 dark:border-white/10">
      <div className="pb-4 border-b border-slate-200 dark:border-white/5">
        <h4 className="font-semibold text-base text-slate-900 dark:text-white">
          {language === "en" ? "RAG Vector Similarity & Grounding Inspector" : "مستكشف تشريح استرجاع المتجهات الدلالية"}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Step-by-step pipeline from natural language prompt to grounded context window
        </p>
      </div>

      {/* Query Input */}
      <div className="py-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-md bg-white dark:bg-[#0c0e15] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleSimulate}
            loading={isProcessing}
            icon={<Search className="w-3.5 h-3.5" />}
          >
            {language === "en" ? "Run Pipeline" : "تشغيل المسار"}
          </Button>
        </div>
      </div>

      {/* 3 Step Breakdown */}
      <div className="space-y-4">
        {/* Step 1: Embedding Vector */}
        <div className={`p-3 rounded-lg border transition-colors ${activeStep >= 1 ? "bg-white dark:bg-[#0c0e15] border-blue-500/30" : "opacity-50"}`}>
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-blue-500 font-bold">01. Query Embedding (text-embedding-3-small)</span>
            <span className="text-slate-400">Dim: 1536</span>
          </div>
          <div className="font-mono text-[11px] text-slate-500 bg-slate-100 dark:bg-white/5 p-2 rounded truncate">
            [0.0241, -0.8123, 0.4419, 0.1092, -0.0521, 0.7712, 0.3201, -0.1982, ... +1528 dimensions]
          </div>
        </div>

        {/* Step 2: Vector Search with Cosine Similarity */}
        <div className={`p-3 rounded-lg border transition-colors ${activeStep >= 2 ? "bg-white dark:bg-[#0c0e15] border-purple-500/30" : "opacity-50"}`}>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-purple-500 font-bold">02. HNSW Vector Similarity Scores (pgvector)</span>
            <span className="text-slate-400">Top-k: 3</span>
          </div>
          <div className="space-y-2">
            {sampleChunks.map((chunk, idx) => (
              <div
                key={chunk.id}
                className={`p-2.5 rounded text-xs border ${
                  idx === 0
                    ? "bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/40"
                    : "bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/5 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{chunk.source}</span>
                  <span className={idx === 0 ? "text-emerald-500 font-bold" : "text-slate-400"}>
                    Similarity: {chunk.vectorSimilarity}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 line-clamp-2">{chunk.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Grounded Assembly */}
        <div className={`p-3 rounded-lg border transition-colors ${activeStep >= 3 ? "bg-white dark:bg-[#0c0e15] border-emerald-500/30" : "opacity-50"}`}>
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-emerald-500 font-bold">03. Deterministic Context Window Assembly</span>
            <span className="text-emerald-500 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Grounded
            </span>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded bg-emerald-50/30 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-800/20 leading-relaxed">
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">[Verified Fact]: </span>
            Layout shifts in Arabic RTL are eliminated (CLS: 0.00) through CSS logical properties combined with preloaded font metrics, without layout jumps.
            <span className="font-mono text-[10px] text-slate-400 block mt-1">Source Citation: docs/typography-bidi.md#L42</span>
          </div>
        </div>
      </div>
    </div>
  );
}
