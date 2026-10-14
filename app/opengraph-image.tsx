import { ImageResponse } from "next/og";

export const alt = "Mohamed Ahmed Badra — Full-Stack Software Engineer · AI Systems Architect";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(59, 130, 246, 0.18) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(16, 185, 129, 0.18) 0%, transparent 45%)",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#f8fafc",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header / Branding Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo + Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563eb, #10b981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "26px",
                color: "#ffffff",
                boxShadow: "0 0 24px rgba(37, 99, 235, 0.5)",
              }}
            >
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "#ffffff",
                }}
              >
                MOHAMED AHMED BADRA
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                }}
              >
                BADRA TECH ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Status Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#34d399",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#10b981",
                boxShadow: "0 0 10px #10b981",
              }}
            />
            AVAILABLE FOR HIGH-IMPACT ARCHITECTURE
          </div>
        </div>

        {/* Center Hero Banner */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "1050px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#60a5fa",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span>SYSTEMS PORTFOLIO // 2026 EDITION</span>
          </div>

          <h1
            style={{
              fontSize: "54px",
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              margin: 0,
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Full-Stack Software Engineer</span>
            <span
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #34d399 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              · AI Systems Architect
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.45,
              color: "#cbd5e1",
              margin: 0,
              maxWidth: "920px",
            }}
          >
            Architecting production-grade multi-tenant SaaS platforms, distributed real-time telemetry,
            and deterministic AI agent workflows engineered for resilience and sub-50ms latency.
          </p>
        </div>

        {/* Proof Pills Bottom Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(148, 163, 184, 0.15)",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(71, 85, 105, 0.4)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              Next.js 16 & TypeScript
            </div>

            <div
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(71, 85, 105, 0.4)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              Supabase PostgreSQL (RLS)
            </div>

            <div
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                border: "1px solid rgba(71, 85, 105, 0.4)",
                fontSize: "13px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              Real-Time AI & B2B Engines
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "14px",
              fontWeight: 700,
              color: "#38bdf8",
            }}
          >
            <span>badra-portfolio.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
