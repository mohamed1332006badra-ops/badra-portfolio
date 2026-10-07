"use client";

import React, { useState } from "react";
import { Laptop, ShieldCheck, Server, Cpu, Database, Activity, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface ArchitectureNode {
  id: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  protocol: string;
  latency: string;
  icon: React.ReactNode;
}

export function ArchitectureVisualizer() {
  const { language } = useI18n();
  const [activeNode, setActiveNode] = useState<string>("ai");
  const [trafficMode, setTrafficMode] = useState<"standard" | "peak" | "rag">("standard");

  const nodes: ArchitectureNode[] = [
    {
      id: "client",
      name: { en: "Client Layer", ar: "طبقة العميل" },
      role: {
        en: "Next.js 16 App Router, progressive streaming hydration, zero CLS bidi typography.",
        ar: "واجهات Next.js 16 مع ترطيب تدريجي وانتقال فوري وتخطيط دقيق ثنائي الاتجاه.",
      },
      protocol: "HTTPS / WSS / HTTP/3",
      latency: "12ms (Edge CDN)",
      icon: <Laptop className="w-5 h-5 text-blue-400" />,
    },
    {
      id: "gateway",
      name: { en: "API Gateway & Edge", ar: "بوابة الواجهات والحافة" },
      role: {
        en: "Sliding-window rate limiter, JWT authentication verification, CORS, and TLS termination.",
        ar: "محدد معدل الطلبات بالنافذة المنزلقة، والتحقق من التوكنات، وإنهاء تشفير TLS.",
      },
      protocol: "Reverse Proxy / gRPC",
      latency: "2ms",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: "backend",
      name: { en: "Application Services", ar: "خدمات التطبيق الخلفية" },
      role: {
        en: "Node.js / FastAPI stateless workers handling business logic, transaction boundaries, and events.",
        ar: "خوادم Node.js و FastAPI لمعالجة منطق الأعمال، والتحويلات المالية، وتوجيه الأحداث.",
      },
      protocol: "REST / Server-Sent Events",
      latency: "18ms",
      icon: <Server className="w-5 h-5 text-amber-400" />,
    },
    {
      id: "ai",
      name: { en: "AI Inference & RAG", ar: "الاستدلال الذكي و RAG" },
      role: {
        en: "Embeddings pipeline, HNSW vector search, cross-encoder re-ranking, and grounded streaming.",
        ar: "مسار التضمينات، وبحث المتجهات عبر HNSW، وإعادة ترتيب النتائج، وتدفق الإجابات الموثقة.",
      },
      protocol: "Vector Similarity / Async SSE",
      latency: "320ms (Streaming)",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
    },
    {
      id: "storage",
      name: { en: "Persistence & Cache", ar: "قواعد البيانات والتخزين" },
      role: {
        en: "PostgreSQL with pgvector for ACID data and vectors; Redis cluster for L2 hot cache.",
        ar: "قاعدة بيانات PostgreSQL مع pgvector لضمان اتساق البيانات، وعنقود Redis للتخزين الفوري.",
      },
      protocol: "TCP Connection Pool",
      latency: "1.2ms (Redis) / 8ms (SQL)",
      icon: <Database className="w-5 h-5 text-cyan-400" />,
    },
  ];

  const selectedNodeData = nodes.find((n) => n.id === activeNode) || nodes[3];

  return (
    <div className="relative rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-[#0c0e15]/90 backdrop-blur-md p-5 sm:p-6 shadow-xl">
      {/* Top Header & Simulation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider uppercase text-slate-800 dark:text-slate-200">
            {language === "en" ? "System Topology & Data Pipeline" : "مخطط البنية البرمجية وتدفق البيانات"}
          </span>
        </div>

        {/* Traffic Simulation Selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-white/5 p-1 rounded-md border border-slate-200 dark:border-white/5">
          <button
            onClick={() => setTrafficMode("standard")}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
              trafficMode === "standard"
                ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {language === "en" ? "Standard Flow" : "تدفق طبيعي"}
          </button>
          <button
            onClick={() => setTrafficMode("peak")}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
              trafficMode === "peak"
                ? "bg-white dark:bg-emerald-600 text-slate-900 dark:text-white shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {language === "en" ? "High Concurrency" : "ذروة حركة"}
          </button>
          <button
            onClick={() => setTrafficMode("rag")}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
              trafficMode === "rag"
                ? "bg-white dark:bg-purple-600 text-slate-900 dark:text-white shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {language === "en" ? "AI / RAG Ingest" : "استعلام ذكاء"}
          </button>
        </div>
      </div>

      {/* Nodes Map Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 py-6">
        {nodes.map((node) => {
          const isSelected = node.id === activeNode;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-lg border transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-blue-500/10 dark:bg-white/10 border-blue-500 dark:border-blue-400 shadow-md ring-1 ring-blue-500/30"
                  : "bg-slate-50/50 dark:bg-[#141722]/50 border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <div className="p-2 rounded-md bg-white dark:bg-[#1b2030] shadow-xs mb-2 border border-slate-200/50 dark:border-white/10">
                {node.icon}
              </div>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">
                {language === "en" ? node.name.en : node.name.ar}
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                {node.latency}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Connector SVG Flow */}
      <div className="relative h-6 w-full hidden sm:block">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 20">
          <line
            x1="50"
            y1="10"
            x2="450"
            y2="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="text-slate-300 dark:text-white/20"
          />
          {/* Animated data packet */}
          <circle
            cx="250"
            cy="10"
            r="4"
            className={`fill-blue-500 dark:fill-blue-400 ${
              trafficMode === "peak" ? "animate-ping" : "animate-pulse"
            }`}
          />
        </svg>
      </div>

      {/* Selected Node Deep-Dive Card */}
      <div className="mt-4 p-4 rounded-lg bg-slate-50 dark:bg-[#131622] border border-slate-200 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/60 dark:border-white/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              {language === "en" ? selectedNodeData.name.en : selectedNodeData.name.ar}
            </h4>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>Protocol: <span className="text-slate-800 dark:text-slate-200">{selectedNodeData.protocol}</span></span>
            <span>Target Latency: <span className="text-emerald-600 dark:text-emerald-400">{selectedNodeData.latency}</span></span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
          {language === "en" ? selectedNodeData.role.en : selectedNodeData.role.ar}
        </p>
      </div>
    </div>
  );
}
