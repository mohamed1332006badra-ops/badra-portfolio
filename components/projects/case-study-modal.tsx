"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CaseStudy } from "@/lib/types";
import { PROJECTS } from "@/lib/content";
import { useI18n } from "@/lib/i18n-context";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TechLogo } from "@/components/ui/brand-logos";
import {
  AlertTriangle,
  Layers,
  BookOpen,
  Compass,
  Trophy,
  Database,
  Code2,
  ExternalLink,
  Cpu,
  Copy,
  Check,
  Calculator,
  Truck,
  TrendingUp,
  FileCheck2,
} from "lucide-react";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

// Interactive Syntax-Highlighted Code Block Component with Copy Button
function SyntaxCodeBlock({
  title,
  language = "sql",
  code,
}: {
  title: string;
  language?: "sql" | "json" | "http" | "ts";
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div className="rounded-xl border border-slate-800 bg-[#07090e] shadow-xl overflow-hidden my-3">
      {/* Code Window Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-400 font-bold ml-1.5">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-950 text-slate-500 uppercase">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content with Line Numbers */}
      <div className="p-3.5 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-slate-200">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="pr-4 text-right text-slate-600 select-none align-top w-8 text-[11px]">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono">
                  {/* Highlight keywords */}
                  {line.startsWith("--") || line.startsWith("//") ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes("CREATE TABLE") || line.includes("PRIMARY KEY") || line.includes("SELECT") || line.includes("POST") || line.includes("GET") || line.includes("PATCH") ? (
                    <span className="text-purple-400 font-bold">{line}</span>
                  ) : line.includes("UUID") || line.includes("VARCHAR") || line.includes("TIMESTAMPTZ") || line.includes("INT") || line.includes("JSONB") ? (
                    <span className="text-cyan-300">{line}</span>
                  ) : line.includes("HTTP/1.1") || line.includes("200 OK") || line.includes("SSE") ? (
                    <span className="text-emerald-400">{line}</span>
                  ) : (
                    <span className="text-slate-300">{line}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Interactive B2B Concrete & Rebar Tonnage Calculator Embedded in Gulf Building Materials Case Study
function EmbeddedMaterialsCalculator({ language }: { language: "en" | "ar" }) {
  const [concreteM3, setConcreteM3] = useState<number>(140);
  const [quoteExported, setQuoteExported] = useState<boolean>(false);

  const rebarTons = Number((concreteM3 * 0.12).toFixed(1));
  const truckCount = Math.ceil(concreteM3 / 28);
  const safetyBufferM3 = Number((concreteM3 * 1.05).toFixed(0));
  const isContractorTier = concreteM3 >= 80;
  const discountRate = isContractorTier ? 0.12 : 0.0;
  const shuwaikhSpotKWD = 228;
  const basePriceKWD = concreteM3 * 22 + rebarTons * shuwaikhSpotKWD;
  const finalEstimateKWD = Math.round(basePriceKWD * (1 - discountRate));

  const handleSimulateQuote = () => {
    setQuoteExported(true);
    setTimeout(() => setQuoteExported(false), 3000);
  };

  return (
    <div className="p-5 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/5 via-slate-900/40 to-amber-950/20 shadow-xl my-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-2 text-sm font-mono font-bold text-amber-400">
          <Calculator className="w-5 h-5 text-amber-500" />
          <span>
            {language === "en"
              ? "Live Interactive B2B Structural Calculator Engine"
              : "محرك حساب الأحمال الإنشائية ومواد البناء التفاعلي (B2B)"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/30">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Shuwaikh Rebar Spot Index: 228 KWD/ton ▲</span>
        </div>
      </div>

      {/* Concrete Slider */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-300">
            {language === "en" ? "Ready-Mix Concrete Slab Volume (m³):" : "حجم الخرسانة الجاهزة المسلحة (م³):"}
          </span>
          <strong className="text-amber-400 text-sm font-bold">{concreteM3} m³</strong>
        </div>
        <input
          type="range"
          min="20"
          max="400"
          step="10"
          value={concreteM3}
          onChange={(e) => setConcreteM3(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>Min: 20 m³ (Residential Footing)</span>
          <span>Max: 400 m³ (Commercial Raft Foundation)</span>
        </div>
      </div>

      {/* Computed Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono mb-4">
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">
            {language === "en" ? "Rebar Tonnage" : "حديد التسليح"}
          </span>
          <span className="font-bold text-white text-sm">{rebarTons} Tons</span>
          <span className="text-[10px] text-slate-500 block">Ratio: 120 kg/m³</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-1 text-slate-500 text-[10px]">
            <Truck className="w-3 h-3" />
            <span>{language === "en" ? "Mixer Fleet" : "شاحنات النقل"}</span>
          </div>
          <span className="font-bold text-white text-sm">{truckCount} Trucks</span>
          <span className="text-[10px] text-slate-500 block">28m³ Per Batch</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">
            {language === "en" ? "Safety Buffer" : "هامش الهدر"}
          </span>
          <span className="font-bold text-emerald-400 text-sm">+5% Buffer</span>
          <span className="text-[10px] text-slate-500 block">Gross: {safetyBufferM3} m³</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-slate-500 block text-[10px]">
            {language === "en" ? "Contractor Tier" : "تصنيف المقاول"}
          </span>
          <span className="font-bold text-amber-400 text-sm">
            {isContractorTier ? "-12% Tier 2" : "Standard"}
          </span>
          <span className="text-[10px] text-slate-500 block">Automated Bulk Tier</span>
        </div>
      </div>

      {/* Quote Simulator Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-amber-500/20 text-xs font-mono">
        <div>
          <span className="text-slate-400 text-[11px] block">
            {isContractorTier
              ? (language === "en" ? "Contractor Wholesale Net Total:" : "إجمالي عرض السعر بالجملة (صافي):")
              : (language === "en" ? "Standard Commercial Estimate:" : "التقدير التجاري المبدئي:")}
          </span>
          <span className="text-lg font-black text-amber-400">
            {finalEstimateKWD.toLocaleString()} KWD (Net)
          </span>
        </div>

        <button
          type="button"
          onClick={handleSimulateQuote}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer hover:scale-105"
        >
          <FileCheck2 className="w-4 h-4" />
          <span>
            {quoteExported
              ? (language === "en" ? "Official Quotation Generated!" : "تم إنشاء العرض الرسمي بنجاح!")
              : (language === "en" ? "Simulate B2B Quotation" : "توليد عرض سعر B2B معتمد")}
          </span>
        </button>
      </div>
    </div>
  );
}

// Structured Multiline Code Definitions for All 8 Projects
function getFormattedDatabaseSchema(projectId: string): string {
  switch (projectId) {
    case "badra-ai":
      return `-- PostgreSQL Distributed Workspace & SSE Vector Table Schema
CREATE TABLE ai_workspaces (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      VARCHAR(64) NOT NULL INDEX,
  tier        VARCHAR(32) DEFAULT 'enterprise',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES ai_workspaces(id),
  user_id      VARCHAR(64) NOT NULL,
  model        VARCHAR(64) NOT NULL,
  token_usage  INT DEFAULT 0
);

CREATE TABLE chat_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conv_id     UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role        VARCHAR(16) CHECK (role IN ('user', 'assistant', 'system')),
  content     TEXT NOT NULL,
  latency_ms  INT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vector_embeddings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_id    VARCHAR(128) NOT NULL,
  embedding   vector(1536),
  metadata    JSONB,
  CONSTRAINT cosine_idx EXCLUDE USING ivfflat (embedding vector_cosine_ops)
);`;

    case "pulsecrm":
      return `-- Supabase PostgreSQL Multi-Tenant Architecture with Row-Level Security
CREATE TABLE tenants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(128) NOT NULL,
  plan        VARCHAR(32) DEFAULT 'enterprise_sla',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deals (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID REFERENCES tenants(id) ON DELETE CASCADE,
  title       VARCHAR(255) NOT NULL,
  value_usd   NUMERIC(12, 2) NOT NULL,
  stage       VARCHAR(32) CHECK (stage IN ('lead', 'demo', 'proposal', 'closed_won')),
  assigned_to UUID NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Strict RLS Policy Enforced at the Engine Level
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON deals
  FOR ALL
  USING (tenant_id = (auth.jwt() ->> 'tenant_id')::UUID);`;

    case "aurum-gulf":
      return `-- TimescaleDB Real-Time Financial Telemetry Hypertable
CREATE TABLE spot_prices (
  time         TIMESTAMPTZ NOT NULL,
  metal_code   VARCHAR(8) NOT NULL,
  bid_usd      NUMERIC(10, 3) NOT NULL,
  ask_usd      NUMERIC(10, 3) NOT NULL,
  volume_oz    NUMERIC(12, 2) NOT NULL
);

SELECT create_hypertable('spot_prices', 'time');

CREATE TABLE forex_rates (
  currency_pair VARCHAR(8) PRIMARY KEY,
  spot_rate     NUMERIC(12, 6) NOT NULL,
  last_updated  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE regional_karat_spreads (
  karat_purity  INT PRIMARY KEY,
  spread_pct    NUMERIC(5, 3) NOT NULL,
  margin_kwd    NUMERIC(8, 3) NOT NULL
);`;

    case "gulf-building-materials":
      return `-- Heavy Industrial Commerce & Structural Logistics Schema
CREATE TABLE structural_catalog (
  sku           VARCHAR(64) PRIMARY KEY,
  category      VARCHAR(32) NOT NULL,
  name_en       VARCHAR(128) NOT NULL,
  name_ar       VARCHAR(128) NOT NULL,
  unit_of_measure VARCHAR(16) NOT NULL,
  shuwaikh_spot NUMERIC(10, 3) NOT NULL
);

CREATE TABLE contractor_credit_tiers (
  tier_level    INT PRIMARY KEY,
  min_volume_m3 INT NOT NULL,
  discount_rate NUMERIC(4, 2) NOT NULL,
  credit_days   INT DEFAULT 60
);

CREATE TABLE b2b_quotations (
  quote_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contractor_id UUID NOT NULL,
  concrete_m3   NUMERIC(8, 2) NOT NULL,
  rebar_tons    NUMERIC(8, 2) NOT NULL,
  fleet_trucks  INT NOT NULL,
  net_total_kwd NUMERIC(12, 3) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);`;

    case "majd-parts":
      return `-- Automotive Compatibility Engine & Inverted Fitment Graph
CREATE TABLE vehicle_matrix (
  vin_pattern   VARCHAR(17) PRIMARY KEY,
  make          VARCHAR(64) NOT NULL,
  model         VARCHAR(64) NOT NULL,
  year_start    INT NOT NULL,
  year_end      INT NOT NULL,
  engine_code   VARCHAR(32) NOT NULL,
  transmission  VARCHAR(32) NOT NULL
);

CREATE TABLE oem_spare_parts (
  part_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oem_number    VARCHAR(64) UNIQUE NOT NULL,
  category      VARCHAR(32) NOT NULL,
  brand         VARCHAR(64) NOT NULL,
  price_kwd     NUMERIC(10, 3) NOT NULL
);

CREATE TABLE fitment_associations (
  vin_pattern   VARCHAR(17) REFERENCES vehicle_matrix(vin_pattern),
  part_id       UUID REFERENCES oem_spare_parts(part_id),
  fit_verified  BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (vin_pattern, part_id)
);`;

    case "egypt-tourism":
      return `-- Cultural Tour Expeditions & Live Capacity Booking Schema
CREATE TABLE expedition_packages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          VARCHAR(64) UNIQUE NOT NULL,
  title_en      VARCHAR(128) NOT NULL,
  title_ar      VARCHAR(128) NOT NULL,
  duration_days INT NOT NULL,
  base_usd      NUMERIC(10, 2) NOT NULL
);

CREATE TABLE daily_itineraries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expedition_id UUID REFERENCES expedition_packages(id),
  day_number    INT NOT NULL,
  landmark      VARCHAR(128) NOT NULL,
  guide_type    VARCHAR(64) DEFAULT 'Senior Egyptologist'
);

CREATE TABLE currency_live_matrix (
  code          VARCHAR(4) PRIMARY KEY,
  rate_to_usd   NUMERIC(10, 4) NOT NULL,
  synced_at     TIMESTAMPTZ DEFAULT NOW()
);`;

    case "arab-family-cinema":
      return `-- Family-Safe Cultural Cinema Streaming Platform Schema
CREATE TABLE cinematic_titles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar      VARCHAR(255) NOT NULL,
  title_en      VARCHAR(255) NOT NULL,
  genre         VARCHAR(32) NOT NULL,
  age_rating    VARCHAR(8) CHECK (age_rating IN ('all', '7+', '12+')),
  duration_secs INT NOT NULL,
  ad_free_mode  BOOLEAN DEFAULT TRUE
);

CREATE TABLE hls_renditions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_id      UUID REFERENCES cinematic_titles(id),
  resolution    VARCHAR(16) NOT NULL,
  bandwidth_bps INT NOT NULL,
  stream_url    TEXT NOT NULL
);`;

    case "interactive-memory-game":
      return `-- High-Speed In-Memory State Machine Interface
interface GameStateMachine {
  status: 'IDLE' | 'SELECTING' | 'EVALUATING' | 'MATCHED' | 'VICTORY';
  activeGrid: 4 | 6;
  cardCount: 16 | 36;
  firstFlippedIndex: number | null;
  movesCounter: number;
  matchedPairs: number;
  comboStreak: number;
  flipLockMutex: boolean;
  heapFootprintKb: number;
  renderFps: number;
}`;

    default:
      return `-- Database Schema Configuration
CREATE TABLE records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;
  }
}

function getFormattedApiContract(projectId: string): string {
  switch (projectId) {
    case "badra-ai":
      return `POST /api/v1/inference/stream HTTP/1.1
Host: badra-ai.vercel.app
Content-Type: application/json
Accept: text/event-stream

{
  "model": "claude-3-5-sonnet",
  "temperature": 0.2,
  "messages": [{ "role": "user", "content": "Explain SSE streaming token buffers" }],
  "stream": true
}

-- Response: Server-Sent Events (SSE) (TTFT < 40ms Target)
data: { "chunk": "Server-Sent", "model": "claude-3-5-sonnet", "tokens": 2 }
data: { "chunk": " Events provide", "model": "claude-3-5-sonnet", "tokens": 4 }
data: [DONE]

GET /api/v1/models/telemetry HTTP/1.1
-- Response: 200 OK
{
  "active_providers": ["claude-3-5-sonnet", "gpt-4o", "deepseek-v3"],
  "latency_p95_ms": 38,
  "edge_cache_hit_rate": 0.942
}`;

    case "pulsecrm":
      return `PATCH /api/v1/deals/8912-fa81/stage HTTP/1.1
Host: pulsecrm.systems
Authorization: Bearer <Tenant_JWT_Token>
Content-Type: application/json

{
  "stage": "closed_won",
  "optimistic_mutation_id": "mut_99182a",
  "deal_value_usd": 120000
}

-- Response: 200 OK (Processed in 22ms)
{
  "success": true,
  "tenant_id": "019482-org-acme",
  "updated_at": "2026-10-14T02:20:00Z",
  "rls_verified": true
}`;

    case "aurum-gulf":
      return `WSS wss://aurumgulf.vercel.app/ws/market-feed HTTP/1.1
Connection: Upgrade
Upgrade: websocket

-- Broadcast Frame: Binary Payload (Dispatched Every 500ms)
{
  "event": "TICK",
  "metal": "XAU_USD",
  "spot_bid": 2654.80,
  "spot_ask": 2655.00,
  "kwd_24k": 24.850,
  "sar_24k": 320.15,
  "aed_24k": 313.40,
  "latency_ms": 11
}`;

    case "gulf-building-materials":
      return `POST /api/v1/structural/calculate HTTP/1.1
Host: store-kuwait.vercel.app
Content-Type: application/json

{
  "concrete_slab_volume_m3": 140,
  "steel_spot_index_kwd": 228,
  "include_safety_margin": true
}

-- Response: 200 OK (Calculated in 14ms)
{
  "rebar_tonnage": 16.8,
  "mixer_trucks_required": 5,
  "safety_buffer_gross_m3": 147,
  "contractor_tier_discount": 0.12,
  "gross_estimate_kwd": 6083,
  "instant_proforma_available": true
}`;

    case "majd-parts":
      return `POST /api/v1/vin/verify HTTP/1.1
Host: badra.portfolio/demos/majd-parts
Content-Type: application/json

{
  "chassis_vin": "WBA3R1C58KA123456"
}

-- Response: 200 OK (Sub-20ms Engine Response)
{
  "verified": true,
  "vehicle": "BMW 330i M-Sport (G20)",
  "engine": "2.0L TwinPower Turbo B48",
  "transmission": "8-Speed Steptronic Sport",
  "stock_hub": "Shuwaikh Central - 14 SKUs Ready"
}`;

    case "egypt-tourism":
      return `POST /api/v1/tours/instant-quote HTTP/1.1
Host: badra.portfolio/demos/egypt-tourism
Content-Type: application/json

{
  "expedition_slug": "royal-egypt-odyssey",
  "tier": "royal_vip",
  "adults": 2,
  "children": 0,
  "currency": "USD"
}

-- Response: 200 OK
{
  "quote_id": "EGY-ROYAL-88912",
  "net_total_usd": 3700,
  "currency_rates_synced": true,
  "vip_flight_transfers_included": true
}`;

    case "arab-family-cinema":
      return `GET /api/v1/cinema/stream/film-01/manifest.m3u8 HTTP/1.1
Host: badra.portfolio/demos/cinema
Accept: application/vnd.apple.mpegurl

-- Response: 200 OK (Adaptive HLS Master Manifest)
#EXTM3U
#EXT-X-VERSION:6
#EXT-X-STREAM-INF:BANDWIDTH=24500000,RESOLUTION=3840x2160,CODECS="avc1.640033,mp4a.40.2"
renditions/4k_hdr.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=8500000,RESOLUTION=1920x1080
renditions/1080p.m3u8`;

    case "interactive-memory-game":
      return `// Browser Native Synthesizer & State Machine API
synthesizeAudioTone(frequencyHz: 523.25, durationSeconds: 0.18, type: 'triangle'): void;

executeAtomicTransition(
  currentState: StateMachineStatus,
  action: 'CARD_FLIP' | 'EVALUATE' | 'CONFIRM_MATCH'
): StateMachineStatus;`;

    default:
      return `GET /api/v1/health HTTP/1.1\n-- Response: 200 OK\n{ "status": "operational" }`;
  }
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  const { language } = useI18n();

  if (!caseStudy) return null;

  const project = PROJECTS.find((p) => p.id === caseStudy.projectId);

  const displayTitle =
    (language === "en" ? caseStudy.title?.en : caseStudy.title?.ar) ||
    caseStudy.title?.en ||
    caseStudy.title?.ar ||
    "System Architecture & Engineering Case Study";

  const displayOverview =
    (language === "en" ? caseStudy.overview?.en : caseStudy.overview?.ar) ||
    caseStudy.overview?.en ||
    caseStudy.overview?.ar ||
    "";

  const formattedDbSchema = getFormattedDatabaseSchema(caseStudy.projectId);
  const formattedApiContract = getFormattedApiContract(caseStudy.projectId);

  const isExternal = project?.demoUrl?.startsWith("http");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex flex-wrap items-center justify-between gap-3 w-full pr-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span className="font-mono text-sm tracking-wide uppercase text-slate-700 dark:text-slate-300 font-bold">
              {language === "en" ? "Engineering Case Study" : "دراسة حالة معمارية متقدمة"}
            </span>
          </div>

          {project && project.demoUrl && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === "en" ? "Live Hosted Production" : "إنتاج حي متصل"}</span>
              </span>

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold shadow-xs transition-transform hover:scale-105"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{language === "en" ? "Launch Platform" : "فتح المنصة الحية"}</span>
              </a>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-8 text-slate-900 dark:text-slate-100">
        {/* Title & Overview Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {project && (
              <Badge variant="accent" size="sm">
                {language === "en" ? project.categoryLabel.en : project.categoryLabel.ar}
              </Badge>
            )}
            <span className="font-mono text-xs text-slate-500">ID: {caseStudy.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mb-3">
            {displayTitle}
          </h2>
          {displayOverview && (
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {displayOverview}
            </p>
          )}
        </div>

        {/* High-Fidelity UI Product Visual Preview Container */}
        {project && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-xl ring-1 ring-slate-800">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 truncate max-w-[320px]">
                <span className="text-emerald-400">https://</span>
                <span className="truncate">
                  {project.demoUrl
                    ? project.demoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                    : `${project.slug}.badra.systems`}
                </span>
              </div>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-blue-400 hover:text-blue-300 pr-1 flex items-center gap-1"
              >
                <span>Live View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div
              onClick={() => {
                if (project.demoUrl) {
                  window.open(project.demoUrl, "_blank", "noopener,noreferrer");
                }
              }}
              className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 cursor-pointer group/modalview"
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={language === "en" ? project.title.en : project.title.ar}
                  fill
                  sizes="(max-width: 1024px) 100vw, 860px"
                  quality={92}
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover/modalview:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full bg-slate-900" />
              )}
            </div>
          </div>
        )}

        {/* Tech Stack Badges */}
        {project && project.technologies && project.technologies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>{language === "en" ? "Engineered Technology Stack" : "التقنيات والأدوات المعمارية"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium"
                >
                  <TechLogo name={tech} className="w-3.5 h-3.5 shrink-0" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Context & Problem Statement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-700 dark:text-slate-400 mb-2">
              <Compass className="w-4 h-4 text-blue-500" />
              <span>{language === "en" ? "Context & Background" : "السياق والخلفية"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === "en" ? caseStudy.context?.en : caseStudy.context?.ar}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/40">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-red-600 dark:text-red-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{language === "en" ? "Core Problem Statement" : "المشكلة الجوهرية"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === "en" ? caseStudy.problemStatement?.en : caseStudy.problemStatement?.ar}
            </p>
          </div>
        </div>

        {/* Architectural Implementation Pipeline */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>{language === "en" ? "Architectural Implementation Steps" : "خطوات ومراحل التنفيذ المعماري"}</span>
          </div>

          <div className="space-y-3">
            {caseStudy.architectureSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs"
              >
                <span className="font-mono text-base font-bold text-blue-500 shrink-0">
                  {step.step}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                    {language === "en" ? step.title.en : step.title.ar}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {language === "en" ? step.desc.en : step.desc.ar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prominently Embedded Calculator Exclusively for Gulf Building Materials Engine */}
        {caseStudy.projectId === "gulf-building-materials" && (
          <EmbeddedMaterialsCalculator language={language as "en" | "ar"} />
        )}

        {/* Database Schema Architecture - Multi-Line Syntax Highlighted */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-400 mb-2 uppercase tracking-wider">
            <Database className="w-4 h-4 text-blue-400" />
            <span>
              {language === "en"
                ? "Database Schema & Multi-Tenant Data Isolation"
                : "مخطط قاعدة البيانات وهندسة عزل البيانات"}
            </span>
          </div>
          <SyntaxCodeBlock
            title={language === "en" ? "PostgreSQL Schema Definition (DDL)" : "مخطط قاعدة البيانات PostgreSQL"}
            language="sql"
            code={formattedDbSchema}
          />
        </div>

        {/* Production API Contracts - Multi-Line Syntax Highlighted */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>
              {language === "en"
                ? "Production API Contracts & Latency SLO"
                : "عقود واجهات API ومعايير زمن الاستجابة"}
            </span>
          </div>
          <SyntaxCodeBlock
            title={language === "en" ? "Production HTTP & WebSocket Contracts" : "عقود واجهات برمجية API"}
            language="http"
            code={formattedApiContract}
          />
        </div>

        {/* Key Architectural Decisions */}
        <div>
          <h4 className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-3">
            {language === "en" ? "Key Decisions & Trade-Offs" : "القرارات المعمارية والمفاضلات"}
          </h4>
          <div className="space-y-3">
            {caseStudy.keyDecisions.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 shadow-xs"
              >
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  {language === "en" ? item.decision.en : item.decision.ar}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-mono text-blue-500 font-medium">
                    {language === "en" ? "Rationale: " : "السبب والمبرر: "}
                  </span>
                  {language === "en" ? item.rationale.en : item.rationale.ar}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Challenges */}
        <div>
          <h4 className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-3">
            {language === "en" ? "Hardest Challenges & Resolution" : "أبرز التحديات التقنية وحلولها"}
          </h4>
          <div className="space-y-3">
            {caseStudy.technicalChallenges.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/40"
              >
                <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">
                  {language === "en" ? item.challenge.en : item.challenge.ar}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    {language === "en" ? "Resolution: " : "الحل المطبق: "}
                  </span>
                  {language === "en" ? item.resolution.en : item.resolution.ar}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome & Lessons */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
            <Trophy className="w-4 h-4" />
            <span>{language === "en" ? "Measurable Outcomes & Lessons Learned" : "النتائج والدروس المستفادة"}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium mb-2">
            {language === "en" ? caseStudy.metricsOrOutcome.en : caseStudy.metricsOrOutcome.ar}
          </p>
          <p className="text-xs text-slate-700 dark:text-slate-300 italic">
            &ldquo;{language === "en" ? caseStudy.lessonsLearned.en : caseStudy.lessonsLearned.ar}&rdquo;
          </p>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            {language === "en" ? "Close Case Study" : "إغلاق دراسة الحالة"}
          </Button>

          {project?.demoUrl && (
            isExternal ? (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  {language === "en" ? "Visit Live Production System" : "زيارة النظام الحي"}
                </Button>
              </a>
            ) : (
              <Link href={project.demoUrl}>
                <Button variant="primary" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  {language === "en" ? "Visit Live Production System" : "زيارة النظام الحي"}
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </Modal>
  );
}
