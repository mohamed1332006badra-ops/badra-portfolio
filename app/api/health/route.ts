import { NextRequest, NextResponse } from "next/server";
import { HealthCheckResponse } from "@/lib/types";

export async function GET(req: NextRequest) {
  // Extract edge region from Vercel / Cloudflare headers if present
  const vercelId = req.headers.get("x-vercel-id");
  let edgeRegion = process.env.VERCEL_REGION || "auto";
  
  if (vercelId) {
    const parts = vercelId.split("::");
    if (parts.length > 0 && parts[0]) {
      edgeRegion = parts[0];
    }
  }

  const payload: HealthCheckResponse = {
    status: "operational",
    timestamp: Date.now(),
    framework: "Next.js 16.4.0",
    edgeRegion,
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
    },
  });
}
