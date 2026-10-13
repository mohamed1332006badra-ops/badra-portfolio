"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  Terminal,
  Truck,
  Car,
  Atom,
} from "lucide-react";

interface ProjectVisualPreviewProps {
  projectSlug: string;
}

export function ProjectVisualPreview({ projectSlug }: ProjectVisualPreviewProps) {
  switch (projectSlug) {
    case "badra-ai":
      return (
        <div className="relative w-full h-full bg-[#0a0c14] text-slate-100 p-4 font-mono select-none overflow-hidden flex flex-col justify-between">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Control Bar */}
          <div className="relative flex items-center justify-between pb-2.5 border-b border-slate-800/80 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span>Claude 3.5 Sonnet</span>
              </span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline text-[10px]">GPT-4o Fallback Ready</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SSE STREAMING (38ms TTFT)</span>
            </div>
          </div>

          {/* Center Chat & Token Streaming Body */}
          <div className="relative my-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 shadow-inner space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <Terminal className="w-3 h-3 text-purple-400" />
              <span>Prompt: &ldquo;Design a distributed token buffer pipeline with zero layout shift...&rdquo;</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-purple-500/20 text-[11px] leading-relaxed text-slate-200">
              <span className="text-purple-400 font-bold">const</span>{" "}
              <span className="text-cyan-300">tokenPipeline</span> ={" "}
              <span className="text-emerald-300">new</span>{" "}
              <span className="text-amber-300">SSEChunkBuffer</span>(&#123;{" "}
              <span className="text-slate-400">maxLatencyMs:</span>{" "}
              <span className="text-emerald-400">45</span>,{" "}
              <span className="text-slate-400">rehydrateState:</span>{" "}
              <span className="text-purple-300">true</span> &#125;);
              <span className="inline-block w-1.5 h-3.5 bg-purple-400 ml-1 animate-pulse align-middle" />
            </div>
          </div>

          {/* Footer Telemetry Strip */}
          <div className="relative flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
            <span className="text-slate-500">Tokens: 842,190 / 1M Quota</span>
            <span className="text-purple-400 font-bold">RAG Vector Cosine: 0.941</span>
          </div>
        </div>
      );

    case "pulsecrm":
      return (
        <div className="relative w-full h-full bg-[#080b12] text-slate-100 p-4 font-sans select-none overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-1/4 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Tenant Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-bold text-white tracking-tight">Acme Global [Enterprise Org]</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                RLS ISOLATED
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Q3 P95: 18ms</span>
          </div>

          {/* Mini Kanban Columns Grid */}
          <div className="grid grid-cols-3 gap-2 my-2 text-[10px]">
            {/* Column 1 */}
            <div className="p-2 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-slate-400 font-mono font-bold block mb-1">QUALIFIED (3)</span>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-[11px]">Aramco Logistics</div>
                  <div className="text-emerald-400 font-mono font-bold">$120,000</div>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 mt-1">Stage Probability: 65%</span>
            </div>

            {/* Column 2 */}
            <div className="p-2 rounded-xl bg-slate-950/90 border border-blue-500/30 ring-1 ring-blue-500/20 flex flex-col justify-between">
              <div>
                <span className="text-blue-400 font-mono font-bold block mb-1">PROPOSAL (2)</span>
                <div className="p-1.5 rounded-lg bg-blue-950/40 border border-blue-500/40 space-y-1">
                  <div className="font-bold text-white text-[11px]">Emirates Telemetry</div>
                  <div className="text-emerald-400 font-mono font-bold">$240,000</div>
                </div>
              </div>
              <span className="text-[9px] text-blue-400 mt-1">SLA Contract Review</span>
            </div>

            {/* Column 3 */}
            <div className="p-2 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-emerald-400 font-mono font-bold block mb-1">WON (5)</span>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 space-y-1">
                  <div className="font-bold text-white text-[11px]">KOC Petroleum</div>
                  <div className="text-emerald-400 font-mono font-bold">$410,000</div>
                </div>
              </div>
              <span className="text-[9px] text-emerald-400 mt-1">Closed This Month</span>
            </div>
          </div>

          {/* Footer Metrics */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
            <span>Pipeline Value: <strong className="text-white">$770,000</strong></span>
            <span className="text-emerald-400">PostgreSQL RLS: 100% Secure</span>
          </div>
        </div>
      );

    case "aurum-gulf":
      return (
        <div className="relative w-full h-full bg-[#08090f] text-slate-100 p-4 font-mono select-none overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Ticker Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400">XAU/USD GOLD SPOT</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                ▲ +1.45%
              </span>
            </div>
            <div className="text-right">
              <span className="text-white font-extrabold text-sm">$2,654.80</span>
            </div>
          </div>

          {/* Real Animated SVG Candlestick / Area Chart Wave */}
          <div className="relative h-24 w-full my-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="aurumGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0,75 Q40,65 80,70 T160,50 T240,42 T320,25 T400,15 L400,90 L0,90 Z"
                fill="url(#aurumGrad)"
              />
              <path
                d="M0,75 Q40,65 80,70 T160,50 T240,42 T320,25 T400,15"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="400" cy="15" r="4" fill="#fbbf24" className="animate-ping" />
              <circle cx="400" cy="15" r="3" fill="#fbbf24" />
            </svg>
          </div>

          {/* Gulf Regional Spot Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[10px]">
            <div>
              <span className="text-slate-500 block text-[9px]">Kuwait (24K/g)</span>
              <strong className="text-white font-bold">24.850 KWD</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">Saudi (24K/g)</span>
              <strong className="text-white font-bold">320.15 SAR</strong>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[9px]">UAE (24K/g)</span>
              <strong className="text-white font-bold">313.40 AED</strong>
            </div>
          </div>
        </div>
      );

    case "gulf-building-materials":
      return (
        <div className="relative w-full h-full bg-[#0a0a0f] text-slate-100 p-4 font-mono select-none overflow-hidden flex flex-col justify-between">
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[11px]">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>SHUWAIKH SPOT INDEX</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
              Steel: 228 KWD/t ▲
            </span>
          </div>

          {/* Concrete Volume Calculation Display */}
          <div className="my-2 p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Structural Slab:</span>
              <strong className="text-amber-400 font-bold">140 m³ Ready-Mix</strong>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-[10px] text-slate-300">
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-500 block text-[8px]">Rebar</span>
                <span className="font-bold text-white">16.8 Tons</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-500 block text-[8px]">Fleet</span>
                <span className="font-bold text-white">5 Trucks</span>
              </div>
              <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-500 block text-[8px]">Discount</span>
                <span className="font-bold text-emerald-400">-12% Net</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
            <span>B2B Commercial PO: <strong className="text-amber-400">6,083 KWD</strong></span>
            <span className="text-emerald-400">Edge API: &lt;80ms</span>
          </div>
        </div>
      );

    case "majd-parts":
      return (
        <div className="relative w-full h-full bg-[#08090e] text-slate-100 p-4 font-sans select-none overflow-hidden flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Car className="w-3.5 h-3.5" />
              <span>VIN MATRIX DECODER</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
              ✓ 100% FIT VERIFIED
            </span>
          </div>

          {/* Product cards snippet */}
          <div className="grid grid-cols-2 gap-2 my-2">
            <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex gap-2 items-center">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                <Image
                  src="https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=200&q=80"
                  alt="Brembo Rotors"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 text-[10px]">
                <div className="font-bold text-white truncate">Brembo 348mm Rotor</div>
                <div className="text-amber-400 font-mono">115 KWD</div>
                <div className="text-slate-500 text-[9px]">BMW G20 M-Sport</div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex gap-2 items-center">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                <Image
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=200&q=80"
                  alt="Bilstein Shocks"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 text-[10px]">
                <div className="font-bold text-white truncate">Bilstein B6 Shock</div>
                <div className="text-amber-400 font-mono">85 KWD</div>
                <div className="text-slate-500 text-[9px]">Land Cruiser LC300</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
            <span>Target VIN: <strong className="text-white">WBA3R1C58K...</strong></span>
            <span className="text-emerald-400">Shuwaikh Hub Stock: Synced</span>
          </div>
        </div>
      );

    case "egypt-tourism":
      return (
        <div className="relative w-full h-full bg-[#08090d] text-slate-100 select-none overflow-hidden flex flex-col justify-between">
          {/* Full-bleed high-res background photography */}
          <Image
            src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80"
            alt="Giza Pyramids"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Top Badges */}
          <div className="relative p-3.5 flex items-center justify-between text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 font-bold text-[10px] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>5-DAY ROYAL EXPEDITION</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-amber-400 font-bold border border-amber-500/30 text-[10px]">
              ★ 4.98 (340+ Reviews)
            </span>
          </div>

          {/* Bottom Title & Currency Switcher Pill */}
          <div className="relative p-3.5 space-y-1">
            <h4 className="text-white font-black text-sm tracking-tight drop-shadow-md">
              Cairo Pyramids, Luxor Karnak & Aswan Dahabiya
            </h4>
            <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-white/20">
              <span className="text-amber-300 font-bold">$1,850 USD / 91,575 EGP</span>
              <span className="text-emerald-400 font-bold">Instant VIP Booking</span>
            </div>
          </div>
        </div>
      );

    case "arab-family-cinema":
      return (
        <div className="relative w-full h-full bg-[#07080d] text-slate-100 select-none overflow-hidden flex flex-col justify-between">
          <Image
            src="https://images.unsplash.com/photo-1548625361-19597371d0e5?auto=format&fit=crop&w=800&q=80"
            alt="Cordoba Architecture"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center filter brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Top badges */}
          <div className="relative p-3.5 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px]">
                4K HDR
              </span>
              <span className="px-2 py-0.5 rounded bg-black/70 text-emerald-400 font-bold border border-emerald-500/30 text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>ALL AGES</span>
              </span>
            </div>
            <span className="text-slate-300 text-[10px] font-mono">1h 54m Master</span>
          </div>

          {/* Bottom title & progress bar */}
          <div className="relative p-3.5 space-y-2">
            <h4 className="text-white font-black text-sm tracking-tight drop-shadow-md">
              عصر قرطبة الذهبي: رواد الفكر والعمارة
            </h4>
            {/* Scrubber bar */}
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-2/5 h-full bg-rose-500 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
              <span>Dolby Atmos 5.1</span>
              <span className="text-rose-400 font-bold">Family Safe 10/10 ★</span>
            </div>
          </div>
        </div>
      );

    case "interactive-memory-game":
      return (
        <div className="relative w-full h-full bg-[#06070a] text-slate-100 p-4 font-mono select-none overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-blue-950/20" />

          {/* Top HUD */}
          <div className="relative flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Atom className="w-3.5 h-3.5 animate-spin" />
              <span>NEURAL MATCH 2030</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-400 font-bold">
              x4 COMBO BOOST 🔥
            </span>
          </div>

          {/* Mini 4x4 matrix representation */}
          <div className="relative grid grid-cols-4 gap-1.5 my-1 max-w-[240px] mx-auto w-full">
            {[
              { sym: "⚛️", active: true },
              { sym: "▲", active: false },
              { sym: "⚡", active: false },
              { sym: "⚛️", active: true },
              { sym: "TS", active: false },
              { sym: "🐘", active: true },
              { sym: "🐘", active: true },
              { sym: "🧠", active: false },
            ].map((c, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs border ${
                  c.active
                    ? "bg-slate-900 border-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "bg-slate-950 border-slate-800 text-slate-600"
                }`}
              >
                {c.active ? c.sym : "•"}
              </div>
            ))}
          </div>

          {/* Footer metrics */}
          <div className="relative flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
            <span className="text-emerald-400 font-bold">60.0 FPS</span>
            <span>Atomic State: <strong className="text-cyan-400">MATCH_CONFIRMED</strong></span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
