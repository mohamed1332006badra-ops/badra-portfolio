"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08090d] text-white p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-blue-500" />
          <span>HTTP 404 // RESOURCE_NOT_FOUND</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-slate-100">
          404
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed">
          The requested route or resource does not exist in the BADRA architecture registry. It may have been relocated or refactored.
        </p>

        <div className="pt-2 flex justify-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
              Return to Engineering Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
