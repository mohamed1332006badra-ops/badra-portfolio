"use client";

import React, { useState } from "react";
import { Zap, Server, Database, HardDrive, Globe, RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";

interface LatencyTier {
  id: string;
  name: string;
  hardware: string;
  latencyMs: number;
  icon: React.ReactNode;
  color: string;
}

export function LatencyCacheSim() {
  const { language } = useI18n();
  const [scenario, setScenario] = useState<"l1_hit" | "redis_hit" | "db_index" | "cold_scan">("redis_hit");

  const tiers: LatencyTier[] = [
    {
      id: "l1",
      name: "L1 In-Memory Cache",
      hardware: "Process RAM",
      latencyMs: 0.05,
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      color: "bg-emerald-500",
    },
    {
      id: "redis",
      name: "L2 Distributed Cache",
      hardware: "Redis Cluster (VPC)",
      latencyMs: 1.2,
      icon: <Server className="w-4 h-4 text-cyan-400" />,
      color: "bg-cyan-500",
    },
    {
      id: "db_index",
      name: "PostgreSQL B-Tree Index",
      hardware: "Primary DB (SSD)",
      latencyMs: 8.5,
      icon: <Database className="w-4 h-4 text-blue-400" />,
      color: "bg-blue-500",
    },
    {
      id: "cold_scan",
      name: "Full Table Sequential Scan",
      hardware: "Disk IO & CPU bound",
      latencyMs: 94.0,
      icon: <HardDrive className="w-4 h-4 text-red-400" />,
      color: "bg-red-500",
    },
  ];

  const getScenarioLatency = () => {
    switch (scenario) {
      case "l1_hit": return 0.05;
      case "redis_hit": return 1.25;
      case "db_index": return 8.55;
      case "cold_scan": return 94.05;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-[#131622] border border-slate-200 dark:border-white/10">
      <div className="pb-4 border-b border-slate-200 dark:border-white/5">
        <h4 className="font-semibold text-base text-slate-900 dark:text-white">
          {language === "en" ? "Multi-Tier Latency & Storage Hierarchy" : "تسلسل زمن الاستجابة والتخزين المؤقت"}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Order-of-magnitude performance disparities across distributed computing layers
        </p>
      </div>

      {/* Scenario Pickers */}
      <div className="py-4 flex flex-wrap gap-2">
        <Button
          variant={scenario === "l1_hit" ? "primary" : "outline"}
          size="sm"
          onClick={() => setScenario("l1_hit")}
        >
          {language === "en" ? "RAM Cache Hit (0.05ms)" : "إصابة ذاكرة RAM (0.05ms)"}
        </Button>
        <Button
          variant={scenario === "redis_hit" ? "primary" : "outline"}
          size="sm"
          onClick={() => setScenario("redis_hit")}
        >
          {language === "en" ? "Redis Hit (1.2ms)" : "إصابة Redis (1.2ms)"}
        </Button>
        <Button
          variant={scenario === "db_index" ? "primary" : "outline"}
          size="sm"
          onClick={() => setScenario("db_index")}
        >
          {language === "en" ? "DB Index Query (8.5ms)" : "فهرس قاعدة البيانات (8.5ms)"}
        </Button>
        <Button
          variant={scenario === "cold_scan" ? "primary" : "outline"}
          size="sm"
          onClick={() => setScenario("cold_scan")}
        >
          {language === "en" ? "Full Table Scan (94ms)" : "مسح كامل للقرص (94ms)"}
        </Button>
      </div>

      {/* Active latency banner */}
      <div className="p-3.5 rounded-lg bg-white dark:bg-[#0c0e15] border border-slate-200 dark:border-white/10 flex items-center justify-between mb-5 font-mono text-xs">
        <span className="text-slate-500">Effective Round-Trip Latency:</span>
        <span className="text-sm font-bold text-slate-900 dark:text-white">
          {getScenarioLatency()} ms
        </span>
      </div>

      {/* Visual Bar Comparison */}
      <div className="space-y-3">
        {tiers.map((tier) => {
          const maxLatency = 100;
          const percentage = Math.min(100, Math.max(3, (tier.latencyMs / maxLatency) * 100));

          return (
            <div key={tier.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  {tier.icon}
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{tier.name}</span>
                  <span className="text-[10px] text-slate-400">({tier.hardware})</span>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {tier.latencyMs} ms
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${tier.color} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
