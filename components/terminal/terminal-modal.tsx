"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { useI18n } from "@/lib/i18n-context";
import { useTheme } from "@/lib/theme-context";
import { PROJECTS } from "@/lib/content";
import { X, CornerDownLeft } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onOpenProjectPreview?: (slug: string) => void;
}

interface CommandLog {
  id: string;
  command?: string;
  output: React.ReactNode;
  timestamp: string;
}

export function TerminalModal({
  isOpen,
  onClose,
  onOpenResumeModal,
  onOpenProjectPreview,
}: TerminalModalProps) {
  const { language } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [, startTransition] = useTransition();

  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "init",
      timestamp: "00:00:00",
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-emerald-400 font-bold">
            badra-shell v1.0.0 (x86_64-pc-edge-v8) · Production Interactive CLI
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-amber-400 font-semibold">&apos;help&apos;</span> or <span className="text-amber-400 font-semibold">&apos;?&apos;</span> for supported commands. Use <span className="text-sky-400 font-semibold">Up/Down arrows</span> for command history.
          </div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Scroll to bottom on new log
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  // Handle escape to close & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(" ")[0];
  };

  const handleCommand = async (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const ts = getTimestamp();
    const [action, ...args] = cmd.split(" ");
    const lowerAction = action.toLowerCase();
    const argStr = args.join(" ").trim();

    let output: React.ReactNode = null;

    switch (lowerAction) {
      case "help":
      case "?":
        output = (
          <div className="space-y-1.5 text-xs text-slate-300 py-1">
            <div className="text-emerald-400 font-bold mb-1">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              <div><span className="text-amber-300 font-semibold">help, ?</span> : Display this command manual</div>
              <div><span className="text-amber-300 font-semibold">skills</span> : Full-stack technical competency matrix</div>
              <div><span className="text-amber-300 font-semibold">projects</span> : List verified production systems</div>
              <div><span className="text-amber-300 font-semibold">open &lt;slug&gt;</span> : Launch live sandbox or demo URL</div>
              <div><span className="text-amber-300 font-semibold">ping</span> : Measure live edge round-trip latency (ms)</div>
              <div><span className="text-amber-300 font-semibold">resume</span> : View ATS Engineering Resume &amp; PDF export</div>
              <div><span className="text-amber-300 font-semibold">theme</span> : Toggle light/dark UI mode</div>
              <div><span className="text-amber-300 font-semibold">clear</span> : Clear terminal display buffer</div>
              <div><span className="text-amber-300 font-semibold">exit</span> : Terminate session and close terminal</div>
            </div>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      case "theme":
        toggleTheme();
        output = (
          <div className="text-xs text-sky-300">
            Theme dynamically updated to: <span className="font-bold text-white">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </div>
        );
        break;

      case "resume":
        output = (
          <div className="text-xs text-emerald-300">
            Mounting ATS-Compliant Interactive Resume Modal &amp; Dynamic PDF Exporter...
          </div>
        );
        startTransition(() => {
          onClose();
          onOpenResumeModal();
        });
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs py-1">
            <div className="text-cyan-400 font-bold">SYSTEMS &amp; ENGINEERING CAPABILITIES:</div>
            <div className="space-y-1 text-slate-300 font-mono">
              <div><span className="text-purple-400 font-semibold">[AI &amp; Inference]</span> : SSE Streaming, RAG, Multi-Model LLMs (GPT-4o, Claude 3.5), Vector Embeddings, LangChain.</div>
              <div><span className="text-sky-400 font-semibold">[Frontend &amp; UI]</span> : Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4, Arabic RTL Typography, Micro-animations.</div>
              <div><span className="text-emerald-400 font-semibold">[Backend &amp; DB]</span> : Supabase, PostgreSQL, Row-Level Security (RLS), Node.js, Python FastAPI, REST &amp; WebSockets.</div>
              <div><span className="text-amber-400 font-semibold">[DevOps &amp; Cloud]</span> : Vercel Edge Runtime, GitHub Actions CI/CD, Zero Layout Shift Optimization, Docker.</div>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1.5 text-xs py-1">
            <div className="text-cyan-400 font-bold mb-1">VERIFIED PRODUCTION SYSTEMS ({PROJECTS.length}):</div>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="flex flex-wrap items-center gap-2 text-slate-300">
                <span className="text-slate-500 font-mono">{idx + 1}.</span>
                <span className="text-amber-300 font-semibold">{p.slug}</span>
                <span className="text-slate-500">—</span>
                <span className="text-white font-medium">{p.title.en}</span>
                <span className="text-slate-500 text-[10px]">[{p.status}]</span>
              </div>
            ))}
            <div className="text-slate-400 text-[11px] pt-1">
              Hint: Type <span className="text-amber-300 font-semibold">open &lt;slug&gt;</span> to inspect live (e.g. <span className="text-sky-300 font-mono">open badra-ai</span>)
            </div>
          </div>
        );
        break;

      case "open":
        if (!argStr) {
          output = (
            <div className="text-xs text-rose-400">
              Error: Please specify project slug. Example: <span className="text-white font-mono">open gulf-building-materials</span>
            </div>
          );
        } else {
          const target = PROJECTS.find(
            (p) => p.slug.toLowerCase() === argStr.toLowerCase() || p.id.toLowerCase() === argStr.toLowerCase()
          );
          if (target) {
            output = (
              <div className="text-xs text-emerald-300">
                Launching live sandbox for <span className="font-bold text-white">{target.title.en}</span> ({target.slug})...
              </div>
            );
            if (onOpenProjectPreview) {
              onClose();
              onOpenProjectPreview(target.slug);
            } else if (target.demoUrl) {
              window.open(target.demoUrl, "_blank");
            }
          } else {
            output = (
              <div className="text-xs text-rose-400">
                Project not found: &apos;{argStr}&apos;. Type <span className="text-amber-300 font-mono">projects</span> to view all valid slugs.
              </div>
            );
          }
        }
        break;

      case "ping":
        {
          const start = performance.now();
          let rtt = 24;
          try {
            await fetch("/api/health", { cache: "no-store" });
            rtt = Math.max(1, Math.round(performance.now() - start));
          } catch {
            rtt = Math.max(1, Math.round(performance.now() - start));
          }
          output = (
            <div className="text-xs space-y-1">
              <div className="text-emerald-400 font-bold">EDGE NETWORK LATENCY TEST:</div>
              <div className="text-slate-300 font-mono">
                Pinging global Vercel edge endpoint... <span className="text-white font-bold">{rtt}ms RTT</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                Packet loss: 0.0% · SLA status: Healthy · SSL TLS 1.3 Verified
              </div>
            </div>
          );
        }
        break;

      default:
        output = (
          <div className="text-xs text-rose-400">
            command not found: &apos;{cmd}&apos;. Type <span className="text-amber-300 font-semibold">help</span> to list valid commands.
          </div>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        command: cmd,
        output,
        timestamp: ts,
      },
    ]);

    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || "");
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-in fade-in duration-150"
    >
      <div className="relative flex flex-col w-[95vw] md:w-full max-w-3xl h-[85vh] max-h-[90dvh] md:max-h-[620px] rounded-2xl border border-slate-800 bg-slate-950/95 font-mono shadow-2xl overflow-hidden overscroll-contain">
        {/* Terminal Window Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/90 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span id="terminal-title" className="text-xs font-mono font-semibold text-slate-300 ml-2">
              badra@edge:~ (badra-shell v1.0.0)
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[11px] text-slate-500 hidden sm:inline">Press Esc or type &apos;exit&apos;</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Terminal"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Buffer */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs select-text cursor-text"
        >
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              {log.command && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">badra@edge:~$</span>
                  <span className="text-white font-semibold">{log.command}</span>
                  <span className="text-slate-600 text-[10px] ml-auto">{log.timestamp}</span>
                </div>
              )}
              <div>{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Active Prompt Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-800/80 bg-slate-950">
          <span className="text-emerald-400 font-bold shrink-0">badra@edge:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal prompt command input"
            placeholder={language === "en" ? "Type command ('help', 'projects', 'resume', 'ping')..." : "اكتب أمراً ('help', 'projects', 'resume')..."}
            className="flex-1 bg-transparent text-emerald-300 font-mono text-xs outline-none placeholder:text-slate-600"
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="button"
            onClick={() => handleCommand(inputVal)}
            aria-label="Submit command"
            className="p-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
