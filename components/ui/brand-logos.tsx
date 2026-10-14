"useclient";

import React from "react";

// ============================================================================
// BADRA TECH CUSTOM GEOMETRIC CIRCUIT CREST EMBLEM
// ============================================================================
export function BadraTechLogo({
  className = "w-8 h-8",
  showText = true,
  subtitle = "2030",
}: {
  className?: string;
  showText?: boolean;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 group select-none">
      <div className={`relative ${className} shrink-0`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Hexagonal Circuit Emblem */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="badraHexGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="badraCoreGrad" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
          </defs>
          {/* Hexagon Outer Frame */}
          <path
            d="M20 2L35.5885 11V29L20 38L4.41154 29V11L20 2Z"
            fill="#090d16"
            stroke="url(#badraHexGrad)"
            strokeWidth="2"
          />
          {/* Circuit Grid Traces */}
          <path d="M20 2V12M35.5885 11L27 16M35.5885 29L27 24M20 38V28M4.41154 29L13 24M4.41154 11L13 16" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />
          {/* Central Bold Engineered B Glyph */}
          <path
            d="M14 11H21.5C23.9853 11 26 13.0147 26 15.5C26 17.1569 25.1046 18.6046 23.77 19.37C25.46 20.15 26.5 21.9 26.5 23.85C26.5 26.7 24.2 29 21.35 29H14V11ZM17.5 14.2V18.2H21.2C22 18.2 22.7 17.5 22.7 16.7C22.7 15.9 22 15.2 21.2 15.2L17.5 14.2ZM17.5 21.8V25.8H21.4C22.3 25.8 23 25.1 23 24.2C23 23.3 22.3 22.6 21.4 22.6L17.5 21.8Z"
            fill="url(#badraCoreGrad)"
          />
          {/* Active Node Pulse */}
          <circle cx="20" cy="2" r="1.5" fill="#38bdf8" />
          <circle cx="35.5885" cy="11" r="1.5" fill="#818cf8" />
          <circle cx="20" cy="38" r="1.5" fill="#38bdf8" />
          <circle cx="4.41154" cy="29" r="1.5" fill="#818cf8" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className="font-mono text-xl tracking-wider font-extrabold bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 dark:from-white dark:via-blue-100 dark:to-cyan-200 bg-clip-text text-transparent">
            BADRA
          </span>
          <span className="text-[11px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-500/20 dark:to-cyan-500/20 text-blue-600 dark:text-cyan-400 border border-blue-500/20 dark:border-cyan-500/30">
            TECH
          </span>
          {subtitle && (
            <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// OFFICIAL HIGH-PRECISION TECH STACK SVG LOGOS
// ============================================================================
export function TechLogo({
  name,
  className = "w-4 h-4",
}: {
  name: string;
  className?: string;
}) {
  const norm = name.toLowerCase().trim();

  // Next.js
  if (norm.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0_next)">
          <circle cx="90" cy="90" r="90" fill="black" stroke="#333" strokeWidth="6" />
          <path d="M149.508 157.438L69.147 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="url(#paint0_linear_next)" />
          <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
        </g>
        <defs>
          <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_next" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // React
  if (norm.includes("react")) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // TypeScript
  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="16" fill="#3178C6" />
        <path d="M37.6 77.2h15.2V112h17.1V77.2h15.2V63.6H37.6V77.2zM98.6 86.8c0-3.3-1.3-6-3.8-8s-6.6-4.1-12.2-6.2c-4.4-1.6-7.8-3.5-10.1-5.7s-3.5-4.9-3.5-8.2c0-4.1 1.7-7.4 5.2-9.9s8.1-3.8 13.9-3.8c6.1 0 11 1.4 14.6 4.1s5.7 6.4 6.2 11h-16.1c-.4-1.9-1.2-3.3-2.6-4.3s-3.2-1.5-5.5-1.5c-2.4 0-4.3.5-5.7 1.6s-2 2.5-2 4.2c0 1.6.7 3 2.2 4.2 1.5 1.1 4.1 2.3 7.8 3.6 5.6 1.9 9.8 4.2 12.6 6.9 2.8 2.7 4.2 6.3 4.2 10.7 0 4.6-1.8 8.2-5.5 10.8s-8.7 3.9-15.1 3.9c-6.8 0-12.2-1.5-16.2-4.5s-6.2-7.3-6.6-12.8h16.2c.4 2.5 1.5 4.3 3.1 5.6s3.8 1.9 6.6 1.9c2.8 0 4.9-.6 6.4-1.7s2.3-2.6 2.3-4.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Python
  if (norm.includes("python")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pyGradA" x1="16" y1="16" x2="78" y2="78" gradientUnits="userSpaceOnUse">
            <stop stopColor="#387EB8" />
            <stop offset="1" stopColor="#366994" />
          </linearGradient>
          <linearGradient id="pyGradB" x1="112" y1="112" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE873" />
            <stop offset="1" stopColor="#FFD43B" />
          </linearGradient>
        </defs>
        <path d="M63.5 6.7c-26.6 0-25 11.5-25 11.5l.03 11.9h25.5v3.6H26.2s-16.6-1.9-16.6 25c0 26.9 14.5 25.9 14.5 25.9h8.7v-12.2s-.5-14.5 14.3-14.5h24.7s13.8.2 13.8-13.8V20.5s2.1-13.8-22.1-13.8zm-13.6 7.4a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2z" fill="url(#pyGradA)" />
        <path d="M64.5 121.3c26.6 0 25-11.5 25-11.5l-.03-11.9H63.9v-3.6h37.8s16.6 1.9 16.6-25c0-26.9-14.5-25.9-14.5-25.9h-8.7v12.2s.5 14.5-14.3 14.5H56.1s-13.8-.2-13.8 13.8v23.6s-2.1 13.8 22.2 13.8zm13.6-7.4a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2z" fill="url(#pyGradB)" />
      </svg>
    );
  }

  // FastAPI
  if (norm.includes("fastapi")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="#059669" />
        <path d="M72.5 18L33 74h31l-7.5 36 43.5-57H69l3.5-35z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 4.5l54 31.2v62.4L64 123.5l-54-31.2V35.7L64 4.5z" fill="#539E43" />
        <path d="M64 16.2l43.8 25.3v50.6L64 117.4 20.2 92.1V41.5L64 16.2z" fill="#333333" />
        <path d="M64 28.5L93.2 45.4V79.2L64 96.1 34.8 79.2V45.4L64 28.5z" fill="#539E43" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes("postgres") || norm.includes("psql") || norm.includes("pg")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 10c-29.8 0-54 24.2-54 54 0 29.8 24.2 54 54 54 29.8 0 54-24.2 54-54 0-29.8-24.2-54-54-54z" fill="#336791" />
        <path d="M96.3 75.3c-.5-3.3-2.1-8.2-4.6-11.2 2.7-7.8 2.6-14.7 0-19.1-3.6-6.1-11.5-8.5-22.1-7.1-4.7.6-9.1 2.3-12.7 4.9-5-2.8-11.2-4.1-17.7-3.4-11.8 1.3-19.7 9.8-19.5 21.2.1 6.5 3 13 8 18.2-2.1 4.5-3.1 9.9-2.7 15.6.8 11.2 7.7 20 17 21.5 5.5.9 10.8-.4 14.8-3.4 4.5 1.8 9.7 2.4 15.3 1.5 12.6-2 21.1-11.9 24.2-24.7v-14.1z" fill="#FFFFFF" fillOpacity="0.9" />
      </svg>
    );
  }

  // Supabase
  if (norm.includes("supabase")) {
    return (
      <svg className={className} viewBox="0 0 109 113" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.7076 110.284C60.598 114.249 54.2327 112.012 54.2987 106.974L55.4312 20.3019C55.4859 16.1264 60.1065 13.6738 63.3854 16.2625L106.417 50.2335C109.845 52.9406 109.056 58.3377 104.978 59.9328L63.7076 76.0759V110.284Z" fill="url(#paint0_linear_supabase)" />
        <path d="M45.2924 2.716C48.402 -1.24898 54.7673 0.988015 54.7013 6.02604L53.5688 92.6981C53.5141 96.8736 48.8935 99.3262 45.6146 96.7375L2.58302 62.7665C-0.845009 60.0594 -0.0560244 54.6623 4.02206 53.0672L45.2924 36.9241V2.716Z" fill="#3ECF8E" />
        <defs>
          <linearGradient id="paint0_linear_supabase" x1="54.2987" y1="16.2625" x2="95.5" y2="76" gradientUnits="userSpaceOnUse">
            <stop stopColor="#249361" />
            <stop offset="1" stopColor="#3ECF8E" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 25.6C44.8 25.6 33.6 35.2 30.4 54.4c7.2-9.6 16-12.8 26.4-9.6 5.9 1.8 10.2 6.1 14.8 10.9 7.6 7.7 16.4 16.7 35.6 16.7 19.2 0 30.4-9.6 33.6-28.8-7.2 9.6-16 12.8-26.4 9.6-5.9-1.8-10.2-6.1-14.8-10.9C82 34.6 73.2 25.6 64 25.6zm-33.6 38.4C11.2 64 0 73.6-3.2 92.8c7.2-9.6 16-12.8 26.4-9.6 5.9 1.8 10.2 6.1 14.8 10.9C45.6 101.8 54.4 110.8 73.6 110.8c19.2 0 30.4-9.6 33.6-28.8-7.2 9.6-16 12.8-26.4 9.6-5.9-1.8-10.2-6.1-14.8-10.9-7.6-7.7-16.4-16.7-35.6-16.7z" fill="#38BDF8" transform="translate(14, 0)" />
      </svg>
    );
  }

  // Docker
  if (norm.includes("docker")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M125.7 54.4c-2.3-1.6-7.5-2.2-11.6-1-1-6.1-5.1-9.9-5.1-9.9s-5.6 4-6.4 10.7c-4.4 2.8-9 7.1-12.2 12.2H6.9c-2.2 7.7-2.3 22 2.7 31.4 7.2 13.5 22.8 20.3 46.9 20.3 36.4 0 63.8-18.7 67.2-48.4 8.7-2.3 12.7-8.8 12.7-8.8s-3.5-5.2-10.7-6.5zm-59.5 8.7H53.4V50.3h12.8v12.8zm15.7 0H69.1V50.3h12.8v12.8zm0-15.7H69.1V34.6h12.8v12.8zm-15.7 0H53.4V34.6h12.8v12.8zm-15.7 0H37.7V34.6h12.8v12.8zm0 15.7H37.7V50.3h12.8v12.8zm-15.7 0H22V50.3h12.8v12.8zm47.1-31.4H69.1V18.9h12.8v12.8zm-15.7 0H53.4V18.9h12.8v12.8z" fill="#2496ED" />
      </svg>
    );
  }

  // OpenAI
  if (norm.includes("openai") || norm.includes("gpt") || norm.includes("llm")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="#10A37F" />
        <path d="M102.5 54.5c-.8-6.1-4.8-11.2-10.4-13.6-1.5-.7-3.1-1.1-4.7-1.3-1.7-4.4-5.2-7.8-9.6-9.6-7-2.8-15.1-.8-20 4.9-1.9-.3-3.9-.3-5.8 0-7.3 1.2-13.2 6.6-14.8 13.8-4.5 1.7-8 5.2-9.7 9.7-3.2 7.8-1.5 16.7 4.2 22.8.8 6.1 4.8 11.2 10.4 13.6 1.5.7 3.1 1.1 4.7 1.3 1.7 4.4 5.2 7.8 9.6 9.6 7 2.8 15.1.8 20-4.9 1.9.3 3.9.3 5.8 0 7.3-1.2 13.2-6.6 14.8-13.8 4.5-1.7 8-5.2 9.7-9.7 3.2-7.8 1.5-16.7-4.2-22.9zM64 80.5c-9.1 0-16.5-7.4-16.5-16.5S54.9 47.5 64 47.5s16.5 7.4 16.5 16.5S73.1 80.5 64 80.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Redis
  if (norm.includes("redis")) {
    return (
      <svg className={className} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M116.5 79.5L64 105.7 11.5 79.5 0 54.5l52.5-26.2 52.5 26.2 11.5 25z" fill="#D82C20" />
        <path d="M64 105.7V57.3l52.5-29v26.2L64 105.7z" fill="#A32219" />
        <path d="M64 57.3L11.5 28.3 64 2.1l52.5 26.2L64 57.3z" fill="#FF4438" />
        <circle cx="58" cy="28" r="4" fill="#FFFFFF" opacity="0.8" />
        <circle cx="70" cy="22" r="4" fill="#FFFFFF" opacity="0.8" />
      </svg>
    );
  }

  // Vercel
  if (norm.includes("vercel")) {
    return (
      <svg className={className} viewBox="0 0 1155 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M577.346 0L1154.69 1000H0L577.346 0Z" fill="currentColor" className="text-slate-900 dark:text-white" />
      </svg>
    );
  }

  // GitHub
  if (norm.includes("github") || norm.includes("git")) {
    return (
      <svg className={className} viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.36 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.215-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor" className="text-slate-900 dark:text-white" />
      </svg>
    );
  }

  // Fallback Modern Circuit Micro-Icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

// ============================================================================
// INFINITE SMOOTH TECH STACK MARQUEE TICKER
// ============================================================================
export const FEATURED_TECHS = [
  { name: "Next.js 16", label: "Next.js", role: "SSR & Edge Platform" },
  { name: "React 19", label: "React", role: "Modern Component Architecture" },
  { name: "TypeScript", label: "TypeScript", role: "Strict End-to-End Typing" },
  { name: "Python", label: "Python", role: "AI & Telemetry Processing" },
  { name: "FastAPI", label: "FastAPI", role: "High-Throughput ASGI Microservices" },
  { name: "Supabase", label: "Supabase", role: "PostgreSQL & Row-Level Security" },
  { name: "PostgreSQL", label: "PostgreSQL", role: "Relational ACID Foundations" },
  { name: "Tailwind CSS", label: "Tailwind CSS", role: "Precision Design Systems" },
  { name: "Docker", label: "Docker", role: "Deterministic Microcontainers" },
  { name: "OpenAI", label: "OpenAI / LLMs", role: "Production SSE Streaming" },
  { name: "Redis", label: "Redis", role: "Sub-Millisecond Distributed Cache" },
  { name: "Vercel", label: "Vercel", role: "Global Edge Infrastructure" },
  { name: "GitHub", label: "GitHub", role: "CI/CD & DevOps Automation" },
];

export function TechStackMarquee() {
  // Duplicate for seamless infinite loop
  const list = [...FEATURED_TECHS, ...FEATURED_TECHS];

  return (
    <div className="w-full overflow-hidden py-4 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40 backdrop-blur-sm select-none relative">
      {/* Edge Gradients for Smooth In/Out Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-[#08090d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-[#08090d] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4 sm:gap-6 items-center">
        {list.map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/70 shadow-xs hover:border-blue-500/50 dark:hover:border-cyan-500/50 transition-all cursor-default group"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <TechLogo name={tech.name} className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              {tech.label}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800 pl-2 whitespace-nowrap">
              {tech.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
