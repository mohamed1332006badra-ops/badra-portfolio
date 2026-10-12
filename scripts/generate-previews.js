const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

const projects = [
  {
    name: 'badra-ai.webp',
    title: 'BADRA AI Copilot & Real-Time Multi-Model Streaming SaaS',
    mockup: `
      <!-- Left Sidebar: Channels & Models -->
      <rect x="0" y="48" width="220" height="672" fill="#0c0e17" />
      <text x="24" y="80" fill="#a78bfa" font-size="11" font-family="monospace" font-weight="bold" letter-spacing="1">WORKSPACE CONTEXT</text>
      <rect x="14" y="96" width="192" height="36" rx="8" fill="#1e1b4b" stroke="#4338ca" stroke-width="1" />
      <circle cx="32" cy="114" r="4" fill="#a855f7" />
      <text x="44" y="118" fill="#f5f3ff" font-size="12" font-family="sans-serif" font-weight="bold">Production Copilot</text>

      <rect x="14" y="140" width="192" height="34" rx="6" fill="#131627" />
      <text x="32" y="161" fill="#94a3b8" font-size="12" font-family="sans-serif">⚡ RAG Knowledge Graph</text>

      <rect x="14" y="180" width="192" height="34" rx="6" fill="#131627" />
      <text x="32" y="201" fill="#94a3b8" font-size="12" font-family="sans-serif">⏱ Latency Benchmark</text>

      <rect x="14" y="220" width="192" height="34" rx="6" fill="#131627" />
      <text x="32" y="241" fill="#94a3b8" font-size="12" font-family="sans-serif">⚖ Multi-Model Fallback</text>

      <rect x="14" y="580" width="192" height="90" rx="8" fill="#111424" stroke="#1f243d" />
      <text x="28" y="604" fill="#64748b" font-size="11" font-family="monospace">TOKEN QUOTA</text>
      <text x="28" y="626" fill="#38bdf8" font-size="14" font-family="monospace" font-weight="bold">842,190 / 1M</text>
      <rect x="28" y="638" width="164" height="6" rx="3" fill="#1e293b" />
      <rect x="28" y="638" width="138" height="6" rx="3" fill="#8b5cf6" />
      <text x="28" y="658" fill="#22c55e" font-size="10" font-family="monospace">● Edge SSE Active</text>

      <!-- Center: Main AI Prompt & Streaming Canvas -->
      <!-- Model Selector Pills Bar -->
      <g transform="translate(240, 64)">
        <rect x="0" y="0" width="710" height="42" rx="10" fill="#121626" stroke="#252a45" />
        <rect x="8" y="6" width="160" height="30" rx="6" fill="#2e1065" stroke="#7c3aed" />
        <circle cx="22" cy="21" r="3.5" fill="#a855f7" />
        <text x="32" y="25" fill="#f5f3ff" font-size="11" font-family="sans-serif" font-weight="bold">Claude 3.5 Sonnet</text>

        <rect x="176" y="6" width="120" height="30" rx="6" fill="#1a1e33" />
        <text x="194" y="25" fill="#94a3b8" font-size="11" font-family="sans-serif">GPT-4o</text>

        <rect x="304" y="6" width="130" height="30" rx="6" fill="#1a1e33" />
        <text x="322" y="25" fill="#94a3b8" font-size="11" font-family="sans-serif">DeepSeek V3</text>

        <text x="694" y="26" fill="#10b981" font-size="11" font-family="monospace" text-anchor="end">TTFT: 38ms · P99: 42ms</text>
      </g>

      <!-- Active Streaming Terminal Window -->
      <g transform="translate(240, 120)">
        <rect x="0" y="0" width="710" height="340" rx="12" fill="#0d101d" stroke="#252b47" />
        <!-- Terminal Header -->
        <rect x="0" y="0" width="710" height="34" rx="12" fill="#15192c" />
        <circle cx="20" cy="17" r="4" fill="#ef4444" />
        <circle cx="34" cy="17" r="4" fill="#f59e0b" />
        <circle cx="48" cy="17" r="4" fill="#10b981" />
        <text x="70" y="21" fill="#cbd5e1" font-size="11" font-family="monospace">ai-streaming-inference.ts // SSE Token Protocol</text>

        <!-- Streaming Prompt & Code Output -->
        <text x="24" y="65" fill="#94a3b8" font-size="12" font-family="sans-serif">User Query: &quot;Optimize distributed database indexes for high-throughput multi-tenant RLS schema.&quot;</text>
        <rect x="24" y="82" width="662" height="230" rx="8" fill="#070913" stroke="#1c2035" />
        <text x="40" y="110" fill="#38bdf8" font-size="12" font-family="monospace">system&gt; SSE stream connection established [DXB-01 Edge Node] · Protocol: HTTP/2</text>
        <text x="40" y="132" fill="#a78bfa" font-size="12" font-family="monospace">stream&gt; Execution time: 1.2ms. Analyzing query execution plan for 1.2M rows...</text>
        <text x="40" y="160" fill="#34d399" font-size="12" font-family="monospace">-- Proposed PostgreSQL B-Tree Composite Index</text>
        <text x="40" y="182" fill="#f8fafc" font-size="12" font-family="monospace">CREATE INDEX CONCURRENTLY idx_deals_tenant_created</text>
        <text x="40" y="204" fill="#f8fafc" font-size="12" font-family="monospace">  ON enterprise_deals (tenant_id, created_at DESC)</text>
        <text x="40" y="226" fill="#f8fafc" font-size="12" font-family="monospace">  WHERE status = &apos;active&apos;;</text>
        <text x="40" y="258" fill="#cbd5e1" font-size="11" font-family="monospace">stream&gt; Estimated latency reduction: 94.2% (148ms -&gt; 8.4ms) <tspan fill="#38bdf8">█</tspan></text>
      </g>

      <!-- Bottom Real-time Telemetry Metrics Row -->
      <g transform="translate(240, 476)">
        <rect x="0" y="0" width="345" height="194" rx="10" fill="#111424" stroke="#252a48" />
        <text x="20" y="30" fill="#94a3b8" font-size="11" font-family="monospace">INFERENCE THROUGHPUT</text>
        <text x="20" y="65" fill="#ffffff" font-size="28" font-family="monospace" font-weight="bold">128.4 tok/s</text>
        <polyline points="20,160 60,145 110,150 160,120 210,130 260,105 320,95" fill="none" stroke="#8b5cf6" stroke-width="3" />
        <text x="20" y="180" fill="#a78bfa" font-size="10" font-family="monospace">▲ 14% vs batch REST API</text>

        <rect x="365" y="0" width="345" height="194" rx="10" fill="#111424" stroke="#252a48" />
        <text x="385" y="30" fill="#94a3b8" font-size="11" font-family="monospace">P99 TIME TO FIRST TOKEN</text>
        <text x="385" y="65" fill="#38bdf8" font-size="28" font-family="monospace" font-weight="bold">38 ms</text>
        <polyline points="385,150 430,155 480,140 530,135 580,120 640,115 690,110" fill="none" stroke="#38bdf8" stroke-width="3" />
        <text x="385" y="180" fill="#38bdf8" font-size="10" font-family="monospace">● Sub-50ms Global SLA Guaranteed</text>
      </g>

      <!-- Right Column: Security & Edge Node Audit -->
      <g transform="translate(970, 64)">
        <rect x="0" y="0" width="290" height="606" rx="12" fill="#0d101d" stroke="#21263e" />
        <text x="24" y="34" fill="#cbd5e1" font-size="12" font-family="monospace" font-weight="bold">EDGE TELEMETRY AUDIT</text>
        <line x1="24" y1="48" x2="266" y2="48" stroke="#1e243b" />

        <text x="24" y="80" fill="#22c55e" font-size="11" font-family="monospace">● Edge Region: DXB-01 (Dubai)</text>
        <text x="24" y="110" fill="#22c55e" font-size="11" font-family="monospace">● Protocol: HTTP/2 SSE</text>
        <text x="24" y="140" fill="#22c55e" font-size="11" font-family="monospace">● Vector Cache: 99.4% Hit</text>
        <text x="24" y="170" fill="#38bdf8" font-size="11" font-family="monospace">● Zero Data Retention: Verified</text>
        <text x="24" y="200" fill="#e2e8f0" font-size="11" font-family="monospace">● Encryption: TLS 1.3 / ChaCha20</text>

        <rect x="20" y="240" width="250" height="150" rx="8" fill="#131627" stroke="#252a48" />
        <text x="34" y="268" fill="#f59e0b" font-size="11" font-family="monospace" font-weight="bold">ACTIVE INFERENCE MODELS</text>
        <text x="34" y="296" fill="#cbd5e1" font-size="11" font-family="sans-serif">1. Claude 3.5 Sonnet (Primary)</text>
        <text x="34" y="322" fill="#94a3b8" font-size="11" font-family="sans-serif">2. OpenAI GPT-4o (Hot-Standby)</text>
        <text x="34" y="348" fill="#94a3b8" font-size="11" font-family="sans-serif">3. DeepSeek V3 (Reasoning)</text>
        <text x="34" y="374" fill="#10b981" font-size="10" font-family="monospace">Auto-Failover: 0ms Interruption</text>
      </g>
    `
  },
  {
    name: 'pulsecrm.webp',
    title: 'PULSECRM Multi-Tenant Platform & Kanban Telemetry Engine',
    mockup: `
      <!-- Left CRM Sidebar -->
      <rect x="0" y="48" width="210" height="672" fill="#090d16" />
      <text x="20" y="80" fill="#38bdf8" font-size="13" font-family="monospace" font-weight="bold">PULSE CRM v2</text>
      <text x="20" y="100" fill="#64748b" font-size="10" font-family="monospace">ORG: AL-GHANIM GROUP</text>

      <rect x="12" y="118" width="186" height="34" rx="6" fill="#0369a1" />
      <text x="26" y="139" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold">Kanban Pipeline</text>

      <rect x="12" y="160" width="186" height="32" rx="6" fill="#0f172a" />
      <text x="26" y="181" fill="#94a3b8" font-size="12" font-family="sans-serif">Enterprise Accounts</text>

      <rect x="12" y="200" width="186" height="32" rx="6" fill="#0f172a" />
      <text x="26" y="221" fill="#94a3b8" font-size="12" font-family="sans-serif">Deals and Revenue</text>

      <rect x="12" y="240" width="186" height="32" rx="6" fill="#0f172a" />
      <text x="26" y="261" fill="#94a3b8" font-size="12" font-family="sans-serif">Security Policies (RLS)</text>

      <!-- KPI Summary Cards Top Row -->
      <g transform="translate(230, 64)">
        <rect x="0" y="0" width="235" height="74" rx="8" fill="#0f172a" stroke="#1e293b" />
        <text x="16" y="25" fill="#94a3b8" font-size="10" font-family="monospace">TOTAL PIPELINE VALUE</text>
        <text x="16" y="54" fill="#ffffff" font-size="20" font-family="monospace" font-weight="bold">$482,000 USD</text>

        <rect x="250" y="0" width="235" height="74" rx="8" fill="#0f172a" stroke="#1e293b" />
        <text x="266" y="25" fill="#94a3b8" font-size="10" font-family="monospace">ACTIVE ENTERPRISE DEALS</text>
        <text x="266" y="54" fill="#38bdf8" font-size="20" font-family="monospace" font-weight="bold">34 Contracts</text>

        <rect x="500" y="0" width="235" height="74" rx="8" fill="#0f172a" stroke="#1e293b" />
        <text x="516" y="25" fill="#94a3b8" font-size="10" font-family="monospace">WIN CONVERSION RATE</text>
        <text x="516" y="54" fill="#10b981" font-size="20" font-family="monospace" font-weight="bold">68.4% Net</text>

        <rect x="750" y="0" width="270" height="74" rx="8" fill="#09182b" stroke="#0284c7" />
        <text x="766" y="25" fill="#38bdf8" font-size="10" font-family="monospace">SUPABASE RLS ENGINE</text>
        <text x="766" y="54" fill="#4ade80" font-size="14" font-family="monospace" font-weight="bold">✔ 100% ISOLATED (P95: 18ms)</text>
      </g>

      <!-- Kanban Pipeline Columns -->
      <!-- Column 1: Discovery -->
      <g transform="translate(230, 154)">
        <rect x="0" y="0" width="245" height="520" rx="8" fill="#0b1120" stroke="#1e293b" />
        <text x="16" y="28" fill="#94a3b8" font-size="12" font-family="sans-serif" font-weight="bold">LEAD DISCOVERY (4)</text>
        <line x1="16" y1="38" x2="229" y2="38" stroke="#1e293b" />

        <rect x="12" y="50" width="221" height="96" rx="6" fill="#131d33" stroke="#334155" />
        <text x="24" y="74" fill="#f8fafc" font-size="12" font-weight="bold">Al-Ghanim Supply Chain</text>
        <text x="24" y="94" fill="#38bdf8" font-size="11" font-family="monospace">$48,000 / ARR</text>
        <rect x="24" y="106" width="70" height="18" rx="4" fill="#0369a1" />
        <text x="32" y="119" fill="#ffffff" font-size="9" font-family="sans-serif">Logistics</text>

        <rect x="12" y="156" width="221" height="96" rx="6" fill="#131d33" stroke="#334155" />
        <text x="24" y="180" fill="#f8fafc" font-size="12" font-weight="bold">Bahrain FinTech Corp</text>
        <text x="24" y="200" fill="#38bdf8" font-size="11" font-family="monospace">$32,500 / ARR</text>
        <rect x="24" y="212" width="60" height="18" rx="4" fill="#6d28d9" />
        <text x="32" y="225" fill="#ffffff" font-size="9" font-family="sans-serif">Finance</text>
      </g>

      <!-- Column 2: Technical Qual -->
      <g transform="translate(490, 154)">
        <rect x="0" y="0" width="245" height="520" rx="8" fill="#0b1120" stroke="#1e293b" />
        <text x="16" y="28" fill="#38bdf8" font-size="12" font-family="sans-serif" font-weight="bold">TECHNICAL QUAL (3)</text>
        <line x1="16" y1="38" x2="229" y2="38" stroke="#1e293b" />

        <rect x="12" y="50" width="221" height="96" rx="6" fill="#131d33" stroke="#0284c7" />
        <text x="24" y="74" fill="#f8fafc" font-size="12" font-weight="bold">Kuwait Port Authority</text>
        <text x="24" y="94" fill="#10b981" font-size="11" font-family="monospace">$125,000 / Contract</text>
        <rect x="24" y="106" width="80" height="18" rx="4" fill="#047857" />
        <text x="32" y="119" fill="#ffffff" font-size="9" font-family="sans-serif">Government</text>
      </g>

      <!-- Column 3: Proposal Stage -->
      <g transform="translate(750, 154)">
        <rect x="0" y="0" width="245" height="520" rx="8" fill="#0b1120" stroke="#1e293b" />
        <text x="16" y="28" fill="#f59e0b" font-size="12" font-family="sans-serif" font-weight="bold">PROPOSAL STAGE (2)</text>
        <line x1="16" y1="38" x2="229" y2="38" stroke="#1e293b" />

        <rect x="12" y="50" width="221" height="96" rx="6" fill="#131d33" stroke="#d97706" />
        <text x="24" y="74" fill="#f8fafc" font-size="12" font-weight="bold">Saudi Tech Cluster</text>
        <text x="24" y="94" fill="#10b981" font-size="11" font-family="monospace">$210,000 / ARR</text>
        <rect x="24" y="106" width="70" height="18" rx="4" fill="#b45309" />
        <text x="32" y="119" fill="#ffffff" font-size="9" font-family="sans-serif">Enterprise</text>
      </g>

      <!-- Column 4: Closed Won -->
      <g transform="translate(1010, 154)">
        <rect x="0" y="0" width="245" height="520" rx="8" fill="#0b1120" stroke="#1e293b" />
        <text x="16" y="28" fill="#10b981" font-size="12" font-family="sans-serif" font-weight="bold">CLOSED WON (7)</text>
        <line x1="16" y1="38" x2="229" y2="38" stroke="#1e293b" />

        <rect x="12" y="50" width="221" height="96" rx="6" fill="#131d33" stroke="#059669" />
        <text x="24" y="74" fill="#f8fafc" font-size="12" font-weight="bold">Dubai Retail Holdings</text>
        <text x="24" y="94" fill="#10b981" font-size="11" font-family="monospace">$86,000 / ARR</text>
        <text x="24" y="118" fill="#4ade80" font-size="10" font-family="monospace">✔ Signed &amp; Provisioned</text>
      </g>
    `
  },
  {
    name: 'aurumgulf.webp',
    title: 'Aurum Gulf Market Telemetry & Real-Time Trading Terminal',
    mockup: `
      <!-- Top Live Bullion Ticker Banner -->
      <rect x="0" y="48" width="1280" height="44" fill="#171206" stroke="#854d0e" stroke-width="1" />
      <text x="30" y="76" fill="#fbbf24" font-size="13" font-family="monospace" font-weight="bold">GOLD (XAU/USD): $2,748.20 ▲ +1.42%</text>
      <text x="370" y="76" fill="#fde047" font-size="13" font-family="monospace">24K KWD: 27.18 KWD ▲</text>
      <text x="630" y="76" fill="#fde047" font-size="13" font-family="monospace">24K SAR: 331.40 SAR ▲</text>
      <text x="890" y="76" fill="#fde047" font-size="13" font-family="monospace">24K AED: 324.85 AED ▲</text>
      <text x="1250" y="76" fill="#22c55e" font-size="12" font-family="monospace" text-anchor="end">RTT: 28ms ● LIVE</text>

      <!-- Main Candlestick Chart Window -->
      <g transform="translate(24, 106)">
        <rect x="0" y="0" width="890" height="430" rx="10" fill="#0c0e14" stroke="#292524" />
        <!-- Header Info -->
        <text x="24" y="32" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="bold">Spot Gold Index (XAU/USD) · 1-Minute Gulf Telemetry Ticker</text>
        <text x="24" y="52" fill="#94a3b8" font-size="11" font-family="monospace">High: $2,752.40 | Low: $2,739.10 | Volume: 48,290 oz | Canvas 60 FPS</text>

        <!-- Chart Grid Lines -->
        <line x1="24" y1="80" x2="866" y2="80" stroke="#1c1917" stroke-dasharray="4 4" />
        <line x1="24" y1="140" x2="866" y2="140" stroke="#1c1917" stroke-dasharray="4 4" />
        <line x1="24" y1="200" x2="866" y2="200" stroke="#1c1917" stroke-dasharray="4 4" />
        <line x1="24" y1="260" x2="866" y2="260" stroke="#1c1917" stroke-dasharray="4 4" />
        <line x1="24" y1="320" x2="866" y2="320" stroke="#1c1917" stroke-dasharray="4 4" />

        <!-- Candlesticks (Realistic Bull/Bear Run) -->
        <!-- Candle 1: Red -->
        <line x1="60" y1="280" x2="60" y2="340" stroke="#ef4444" stroke-width="1.5" />
        <rect x="54" y="290" width="12" height="30" fill="#ef4444" />

        <!-- Candle 2: Green -->
        <line x1="120" y1="260" x2="120" y2="320" stroke="#22c55e" stroke-width="1.5" />
        <rect x="114" y="270" width="12" height="35" fill="#22c55e" />

        <!-- Candle 3: Green -->
        <line x1="180" y1="240" x2="180" y2="300" stroke="#22c55e" stroke-width="1.5" />
        <rect x="174" y="250" width="12" height="40" fill="#22c55e" />

        <!-- Candle 4: Red Pullback -->
        <line x1="240" y1="250" x2="240" y2="310" stroke="#ef4444" stroke-width="1.5" />
        <rect x="234" y="260" width="12" height="25" fill="#ef4444" />

        <!-- Candle 5: Strong Green Breakout -->
        <line x1="300" y1="200" x2="300" y2="270" stroke="#22c55e" stroke-width="1.5" />
        <rect x="294" y="210" width="12" height="50" fill="#22c55e" />

        <!-- Candle 6: Green -->
        <line x1="360" y1="180" x2="360" y2="240" stroke="#22c55e" stroke-width="1.5" />
        <rect x="354" y="190" width="12" height="40" fill="#22c55e" />

        <!-- Candle 7: Green -->
        <line x1="420" y1="150" x2="420" y2="210" stroke="#22c55e" stroke-width="1.5" />
        <rect x="414" y="160" width="12" height="45" fill="#22c55e" />

        <!-- Candle 8: Consolidation -->
        <line x1="480" y1="140" x2="480" y2="200" stroke="#ef4444" stroke-width="1.5" />
        <rect x="474" y="150" width="12" height="25" fill="#ef4444" />

        <!-- Candle 9: Green -->
        <line x1="540" y1="110" x2="540" y2="170" stroke="#22c55e" stroke-width="1.5" />
        <rect x="534" y="120" width="12" height="45" fill="#22c55e" />

        <!-- Candle 10: Surge -->
        <line x1="600" y1="90" x2="600" y2="150" stroke="#22c55e" stroke-width="1.5" />
        <rect x="594" y="100" width="12" height="40" fill="#22c55e" />

        <!-- Dynamic EMA Trend Lines -->
        <polyline points="60,310 120,285 180,265 240,270 300,230 360,205 420,180 480,165 540,140 600,115 680,105 760,95 840,88" fill="none" stroke="#f59e0b" stroke-width="2.5" />
        <polyline points="60,330 120,310 180,290 240,295 300,265 360,240 420,215 480,200 540,175 600,150 680,140 760,130 840,120" fill="none" stroke="#38bdf8" stroke-width="2" />

        <!-- Volume Bar Chart at bottom -->
        <rect x="54" y="380" width="12" height="30" fill="#ef4444" opacity="0.6" />
        <rect x="114" y="370" width="12" height="40" fill="#22c55e" opacity="0.6" />
        <rect x="174" y="360" width="12" height="50" fill="#22c55e" opacity="0.6" />
        <rect x="234" y="385" width="12" height="25" fill="#ef4444" opacity="0.6" />
        <rect x="294" y="340" width="12" height="70" fill="#22c55e" opacity="0.6" />
        <rect x="354" y="360" width="12" height="50" fill="#22c55e" opacity="0.6" />
        <rect x="414" y="350" width="12" height="60" fill="#22c55e" opacity="0.6" />
        <rect x="474" y="380" width="12" height="30" fill="#ef4444" opacity="0.6" />
        <rect x="534" y="340" width="12" height="70" fill="#22c55e" opacity="0.6" />
        <rect x="594" y="330" width="12" height="80" fill="#22c55e" opacity="0.6" />
      </g>

      <!-- Right Order Book & Telemetry Column -->
      <g transform="translate(930, 106)">
        <rect x="0" y="0" width="326" height="430" rx="10" fill="#0c0e14" stroke="#292524" />
        <text x="20" y="32" fill="#ffffff" font-size="14" font-family="sans-serif" font-weight="bold">Live Order Book Depth</text>

        <!-- Asks (Sells - Red) -->
        <text x="20" y="65" fill="#ef4444" font-size="12" font-family="monospace">ASK 27.188 KWD · 1,200g</text>
        <rect x="20" y="72" width="220" height="6" rx="3" fill="#ef4444" opacity="0.25" />
        <text x="20" y="98" fill="#ef4444" font-size="12" font-family="monospace">ASK 27.186 KWD · 3,450g</text>
        <rect x="20" y="105" width="260" height="6" rx="3" fill="#ef4444" opacity="0.4" />

        <line x1="20" y1="125" x2="306" y2="125" stroke="#292524" />
        <text x="20" y="150" fill="#facc15" font-size="15" font-family="monospace" font-weight="bold">MID SPOT: 27.184 KWD</text>
        <line x1="20" y1="165" x2="306" y2="165" stroke="#292524" />

        <!-- Bids (Buys - Green) -->
        <text x="20" y="195" fill="#22c55e" font-size="12" font-family="monospace">BID 27.182 KWD · 4,800g</text>
        <rect x="20" y="202" width="280" height="6" rx="3" fill="#22c55e" opacity="0.4" />
        <text x="20" y="228" fill="#22c55e" font-size="12" font-family="monospace">BID 27.180 KWD · 8,100g</text>
        <rect x="20" y="235" width="250" height="6" rx="3" fill="#22c55e" opacity="0.25" />

        <!-- Bullion Telemetry Badge -->
        <rect x="20" y="280" width="286" height="120" rx="8" fill="#1c1917" stroke="#44403c" />
        <text x="32" y="308" fill="#e2e8f0" font-size="11" font-family="monospace" font-weight="bold">GULF TELEMETRY STATUS</text>
        <text x="32" y="332" fill="#22c55e" font-size="11" font-family="monospace">✔ Ingestion Pipeline: Sub-second</text>
        <text x="32" y="356" fill="#22c55e" font-size="11" font-family="monospace">✔ Memory: Circular Buffer Capped</text>
        <text x="32" y="380" fill="#38bdf8" font-size="11" font-family="monospace">✔ Forex Parity: KWD / SAR / AED</text>
      </g>
    `
  },
  {
    name: 'gulf-store.webp',
    title: 'Gulf Building Materials Industrial Commerce & Calculator Engine',
    mockup: `
      <!-- Top Shuwaikh Spot Index Ticker -->
      <rect x="0" y="48" width="1280" height="42" fill="#1c1917" stroke="#44403c" stroke-width="1" />
      <text x="24" y="74" fill="#fb923c" font-size="13" font-family="monospace" font-weight="bold">SHUWAIKH SPOT INDEX: HIGH-TENSILE REBAR 228 KWD/TON ▲ +0.4%</text>
      <text x="520" y="74" fill="#e2e8f0" font-size="13" font-family="monospace">PORTLAND CEMENT: 1.45 KWD/BAG</text>
      <text x="880" y="74" fill="#38bdf8" font-size="13" font-family="monospace">EDGE LATENCY: 22ms · SUPABASE RLS ACTIVE</text>

      <!-- Left Panel: Automated Structural Concrete & Rebar Calculator -->
      <g transform="translate(24, 106)">
        <rect x="0" y="0" width="600" height="430" rx="10" fill="#18181b" stroke="#27272a" />
        <text x="28" y="36" fill="#f8fafc" font-size="16" font-family="sans-serif" font-weight="bold">B2B Heavy Construction Volumetric Calculator</text>

        <!-- Volume Slider Mockup -->
        <text x="28" y="78" fill="#a1a1aa" font-size="12" font-family="sans-serif">CONCRETE SLAB VOLUME: 140 m³</text>
        <rect x="28" y="90" width="544" height="10" rx="5" fill="#27272a" />
        <rect x="28" y="90" width="380" height="10" rx="5" fill="#f97316" />

        <!-- Computed Metric Rows -->
        <g transform="translate(28, 126)">
          <rect x="0" y="0" width="168" height="74" rx="6" fill="#09090b" stroke="#27272a" />
          <text x="14" y="24" fill="#a1a1aa" font-size="11" font-family="sans-serif">Rebar Tonnage</text>
          <text x="14" y="52" fill="#f8fafc" font-size="18" font-family="monospace" font-weight="bold">16.8 Tons</text>

          <rect x="188" y="0" width="168" height="74" rx="6" fill="#09090b" stroke="#27272a" />
          <text x="202" y="24" fill="#a1a1aa" font-size="11" font-family="sans-serif">Mixer Fleet</text>
          <text x="202" y="52" fill="#38bdf8" font-size="18" font-family="monospace" font-weight="bold">5 Trucks (28m³)</text>

          <rect x="376" y="0" width="168" height="74" rx="6" fill="#09090b" stroke="#27272a" />
          <text x="390" y="24" fill="#a1a1aa" font-size="11" font-family="sans-serif">Waste Buffer</text>
          <text x="390" y="52" fill="#22c55e" font-size="18" font-family="monospace" font-weight="bold">+5% (147m³)</text>
        </g>

        <!-- Logistics Dispatch Checklist -->
        <rect x="28" y="224" width="544" height="100" rx="8" fill="#09090b" stroke="#27272a" />
        <text x="44" y="252" fill="#22c55e" font-size="12" font-family="monospace" font-weight="bold">✔ Dispatch Queue: Shuwaikh Industrial Terminal Priority</text>
        <text x="44" y="278" fill="#22c55e" font-size="12" font-family="monospace">✔ Tier-2 Contractor Matrix Discount Applied (-12%)</text>
        <text x="44" y="304" fill="#facc15" font-size="12" font-family="monospace">✔ Dynamic Concrete Slump: 120mm ± 20mm Verified</text>

        <!-- Pricing Summary -->
        <rect x="28" y="344" width="544" height="64" rx="8" fill="#27272a" />
        <text x="44" y="372" fill="#a1a1aa" font-size="12" font-family="sans-serif">Contractor Net Quote (Tax Free / Kuwait):</text>
        <text x="44" y="396" fill="#f97316" font-size="20" font-family="monospace" font-weight="bold">7,420 KWD (Delivered to Site)</text>
      </g>

      <!-- Right Panel: Official Commercial Quotation Document Mockup -->
      <g transform="translate(648, 106)">
        <rect x="0" y="0" width="608" height="430" rx="10" fill="#18181b" stroke="#27272a" />
        <text x="28" y="36" fill="#f8fafc" font-size="16" font-family="sans-serif" font-weight="bold">Official B2B Digital Commercial Quotation</text>

        <rect x="28" y="58" width="552" height="280" rx="8" fill="#09090b" stroke="#27272a" />
        <!-- Quotation Meta -->
        <text x="48" y="90" fill="#94a3b8" font-size="12" font-family="monospace">Ref: KW-MAT-2026-0842 · Date: Today</text>
        <text x="48" y="114" fill="#94a3b8" font-size="12" font-family="monospace">Client: Al-Mutlaa Residential Contractor (Sector N4)</text>
        <text x="48" y="138" fill="#38bdf8" font-size="12" font-family="monospace">Line 1: 140 m³ Ready-Mix Concrete (C35 Grade) @ 22 KWD/m³</text>
        <text x="48" y="162" fill="#38bdf8" font-size="12" font-family="monospace">Line 2: 16.8 Tons High-Tensile Steel Rebar @ 228 KWD/ton</text>
        <text x="48" y="186" fill="#10b981" font-size="12" font-family="monospace">Contractor Tier Credit: Approved (Credit Line: 45,000 KWD)</text>
        <text x="48" y="210" fill="#22c55e" font-size="12" font-family="monospace">Delivery: 5 Transit Concrete Trucks to Site (Morning Slot)</text>
        <line x1="48" y1="230" x2="532" y2="230" stroke="#27272a" />
        <text x="48" y="258" fill="#ffffff" font-size="14" font-family="monospace" font-weight="bold">Total Delivered: 7,420 KWD · Status: Ready for Signature</text>

        <!-- CTA Buttons -->
        <rect x="28" y="360" width="280" height="44" rx="6" fill="#f97316" />
        <text x="60" y="388" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold">Generate Signed B2B PDF</text>
      </g>
    `
  },
  {
    name: 'majd-parts.webp',
    title: 'MAJD PARTS Automotive Platform & VIN Compatibility Matrix',
    mockup: `
      <!-- VIN Lookup Bar Header -->
      <g transform="translate(24, 64)">
        <rect x="0" y="0" width="1232" height="56" rx="10" fill="#18181f" stroke="#ef4444" stroke-width="1.5" />
        <text x="24" y="34" fill="#f87171" font-size="14" font-family="monospace" font-weight="bold">VIN LOOKUP:</text>
        <text x="140" y="34" fill="#ffffff" font-size="14" font-family="monospace">WBA33AY08MFS29410</text>
        <rect x="360" y="14" width="290" height="28" rx="6" fill="#22c55e" opacity="0.2" />
        <text x="375" y="33" fill="#4ade80" font-size="12" font-family="monospace">✔ BMW 330i G20 (B48B20 2.0L Turbo)</text>
        <text x="1208" y="34" fill="#94a3b8" font-size="12" font-family="monospace" text-anchor="end">FITMENT: 100% VERIFIED</text>
      </g>

      <!-- 3 Catalog Component Cards with Mechanical Part Schematics -->
      <!-- Card 1: Brake Disc -->
      <g transform="translate(24, 140)">
        <rect x="0" y="0" width="390" height="410" rx="10" fill="#121217" stroke="#26262e" />
        <rect x="18" y="18" width="354" height="200" rx="8" fill="#09090d" />
        <!-- Mechanical Disc Brake Schematic -->
        <circle cx="195" cy="118" r="70" fill="none" stroke="#ef4444" stroke-width="4" />
        <circle cx="195" cy="118" r="45" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="8 6" />
        <circle cx="195" cy="118" r="20" fill="#26262e" />
        <circle cx="195" cy="100" r="4" fill="#ffffff" />
        <circle cx="213" cy="118" r="4" fill="#ffffff" />
        <circle cx="195" cy="136" r="4" fill="#ffffff" />
        <circle cx="177" cy="118" r="4" fill="#ffffff" />

        <text x="24" y="248" fill="#f8fafc" font-size="15" font-family="sans-serif" font-weight="bold">Ceramic Ventilated Brake Rotors (Front Axle)</text>
        <text x="24" y="274" fill="#ef4444" font-size="12" font-family="monospace">OEM: 34116886477 · G20 Fitment Confirmed</text>
        <text x="24" y="298" fill="#94a3b8" font-size="11" font-family="sans-serif">Wear sensor included · 348x36mm Specification</text>
        <text x="24" y="328" fill="#22c55e" font-size="12" font-family="monospace">● In Stock: Kuwait Central Warehouse (24 units)</text>

        <rect x="24" y="350" width="342" height="40" rx="6" fill="#ef4444" />
        <text x="120" y="375" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold">Add Verified Component</text>
      </g>

      <!-- Card 2: Ignition Coil -->
      <g transform="translate(444, 140)">
        <rect x="0" y="0" width="390" height="410" rx="10" fill="#121217" stroke="#26262e" />
        <rect x="18" y="18" width="354" height="200" rx="8" fill="#09090d" />
        <!-- Ignition Coil Schematic -->
        <rect x="180" y="50" width="30" height="100" rx="4" fill="none" stroke="#38bdf8" stroke-width="3" />
        <line x1="195" y1="150" x2="195" y2="185" stroke="#facc15" stroke-width="4" />
        <polyline points="150,90 180,90 195,120 210,90 240,90" fill="none" stroke="#38bdf8" stroke-width="2" />

        <text x="24" y="248" fill="#f8fafc" font-size="15" font-family="sans-serif" font-weight="bold">Direct High-Voltage Ignition Coil Pack (Set of 4)</text>
        <text x="24" y="274" fill="#38bdf8" font-size="12" font-family="monospace">OEM: 12138647689 · B48 Turbo Verified</text>
        <text x="24" y="298" fill="#94a3b8" font-size="11" font-family="sans-serif">High resistance silicone boot · Plug-and-Play</text>
        <text x="24" y="328" fill="#22c55e" font-size="12" font-family="monospace">● In Stock: Cairo Logistics Hub (16 sets)</text>

        <rect x="24" y="350" width="342" height="40" rx="6" fill="#0284c7" />
        <text x="120" y="375" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold">Add Verified Component</text>
      </g>

      <!-- Card 3: Performance Intake Filter -->
      <g transform="translate(864, 140)">
        <rect x="0" y="0" width="390" height="410" rx="10" fill="#121217" stroke="#26262e" />
        <rect x="18" y="18" width="354" height="200" rx="8" fill="#09090d" />
        <!-- High-Flow Cone Filter Schematic -->
        <polygon points="195,55 250,175 140,175" fill="none" stroke="#10b981" stroke-width="3" />
        <line x1="150" y1="95" x2="240" y2="95" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4 4" />
        <line x1="160" y1="135" x2="230" y2="135" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4 4" />

        <text x="24" y="248" fill="#f8fafc" font-size="15" font-family="sans-serif" font-weight="bold">Multi-Layer Dual Cone High-Flow Air Filter</text>
        <text x="24" y="274" fill="#10b981" font-size="12" font-family="monospace">Performance Tier · OEM Superseded</text>
        <text x="24" y="298" fill="#94a3b8" font-size="11" font-family="sans-serif">Washable cotton gauze · +8% CFM Air Intake</text>
        <text x="24" y="328" fill="#22c55e" font-size="12" font-family="monospace">● Instant Dispatch Available</text>

        <rect x="24" y="350" width="342" height="40" rx="6" fill="#059669" />
        <text x="120" y="375" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold">Add Verified Component</text>
      </g>
    `
  },
  {
    name: 'egypt-tour.webp',
    title: 'Egypt Tourism & Tour Sales Engine with Interactive Itinerary',
    mockup: `
      <!-- Luxury Hero Banner with Giza Pyramids & Nile Palette -->
      <g transform="translate(24, 64)">
        <rect x="0" y="0" width="1232" height="150" rx="12" fill="#062e24" stroke="#059669" stroke-width="1.5" />
        <!-- Sunset Gradient Silhouette of Pyramids -->
        <polygon points="1000,150 1080,45 1160,150" fill="#0d4a3b" />
        <polygon points="1120,150 1180,75 1240,150" fill="#08382c" />
        <circle cx="1090" cy="50" r="22" fill="#f59e0b" opacity="0.8" />

        <text x="36" y="52" fill="#34d399" font-size="22" font-family="sans-serif" font-weight="bold">7-Day Historic Cairo &amp; Nile Luxury Cruise Itinerary</text>
        <text x="36" y="84" fill="#a7f3d0" font-size="14" font-family="sans-serif">Giza Pyramids · Grand Egyptian Museum · Luxor Karnak · Aswan Philae Temple</text>
        <text x="36" y="118" fill="#fbbf24" font-size="13" font-family="monospace">Instant Booking Engine · Multi-Currency: [ EGP 42,500 | $1,380 USD | €1,270 EUR | SAR 5,180 ]</text>
      </g>

      <!-- Day-by-Day Interactive Itinerary Planner Cards -->
      <!-- Day 1 - 2: Cairo -->
      <g transform="translate(24, 234)">
        <rect x="0" y="0" width="390" height="310" rx="10" fill="#091c16" stroke="#059669" />
        <rect x="18" y="18" width="100" height="26" rx="4" fill="#047857" />
        <text x="28" y="35" fill="#ffffff" font-size="11" font-family="monospace" font-weight="bold">DAY 1 - 2</text>
        <text x="130" y="35" fill="#34d399" font-size="14" font-family="sans-serif" font-weight="bold">CAIRO &amp; GIZA</text>

        <rect x="18" y="56" width="354" height="140" rx="6" fill="#041f17" />
        <text x="32" y="84" fill="#f8fafc" font-size="13" font-weight="bold">Giza Plateau &amp; Grand Egyptian Museum</text>
        <text x="32" y="108" fill="#a7f3d0" font-size="12">● Private Egyptologist Tour of the Great Pyramid</text>
        <text x="32" y="130" fill="#a7f3d0" font-size="12">● VIP Fast-Track Entry to King Tutankhamun Gallery</text>
        <text x="32" y="152" fill="#a7f3d0" font-size="12">● Chauffeur Mercedes Transfer to Four Seasons Nile</text>

        <rect x="18" y="210" width="354" height="80" rx="6" fill="#092d21" />
        <text x="32" y="238" fill="#fbbf24" font-size="12" font-family="monospace">Availability: 6 Seats Remaining (Oct 18)</text>
        <text x="32" y="264" fill="#34d399" font-size="11" font-family="monospace">Included: 5★ Hotel, Private Guide, Entrance Fees</text>
      </g>

      <!-- Day 3 - 5: Luxor -->
      <g transform="translate(444, 234)">
        <rect x="0" y="0" width="390" height="310" rx="10" fill="#091c16" stroke="#059669" />
        <rect x="18" y="18" width="100" height="26" rx="4" fill="#047857" />
        <text x="28" y="35" fill="#ffffff" font-size="11" font-family="monospace" font-weight="bold">DAY 3 - 5</text>
        <text x="130" y="35" fill="#34d399" font-size="14" font-family="sans-serif" font-weight="bold">LUXOR &amp; NILE CRUISE</text>

        <rect x="18" y="56" width="354" height="140" rx="6" fill="#041f17" />
        <text x="32" y="84" fill="#f8fafc" font-size="13" font-weight="bold">Valley of the Kings &amp; Karnak Temple</text>
        <text x="32" y="108" fill="#a7f3d0" font-size="12">● Sunrise Hot Air Balloon flight over West Bank</text>
        <text x="32" y="130" fill="#a7f3d0" font-size="12">● Embark Sanctuary Sun Boat IV (Full Board Gourmet)</text>
        <text x="32" y="152" fill="#a7f3d0" font-size="12">● Edfu &amp; Kom Ombo Temples Sunset Navigation</text>

        <rect x="18" y="210" width="354" height="80" rx="6" fill="#092d21" />
        <text x="32" y="238" fill="#fbbf24" font-size="12" font-family="monospace">Nile Cruise Suite: Upper Deck Confirmed</text>
        <text x="32" y="264" fill="#34d399" font-size="11" font-family="monospace">Private Balloon Ride Included</text>
      </g>

      <!-- Day 6 - 7: Aswan -->
      <g transform="translate(864, 234)">
        <rect x="0" y="0" width="390" height="310" rx="10" fill="#091c16" stroke="#059669" />
        <rect x="18" y="18" width="100" height="26" rx="4" fill="#047857" />
        <text x="28" y="35" fill="#ffffff" font-size="11" font-family="monospace" font-weight="bold">DAY 6 - 7</text>
        <text x="130" y="35" fill="#34d399" font-size="14" font-family="sans-serif" font-weight="bold">ASWAN &amp; ABU SIMBEL</text>

        <rect x="18" y="56" width="354" height="140" rx="6" fill="#041f17" />
        <text x="32" y="84" fill="#f8fafc" font-size="13" font-weight="bold">Philae Island &amp; Abu Simbel Excursion</text>
        <text x="32" y="108" fill="#a7f3d0" font-size="12">● Private Flight Excursion to Colossi of Ramses II</text>
        <text x="32" y="130" fill="#a7f3d0" font-size="12">● Sunset Felucca Sail around Elephantine Island</text>
        <text x="32" y="152" fill="#a7f3d0" font-size="12">● High Tea at Historic Old Cataract Hotel</text>

        <rect x="18" y="210" width="354" height="80" rx="6" fill="#047857" />
        <text x="32" y="244" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold">Book Verified Tour Package</text>
        <text x="32" y="270" fill="#a7f3d0" font-size="11" font-family="monospace">Instant Confirmation · Zero Booking Fee</text>
      </g>
    `
  },
  {
    name: 'arab-cinema.webp',
    title: 'Arab Family Cinema Platform & Adaptive HLS Streaming',
    mockup: `
      <!-- Video Player Viewport (Left / Center) -->
      <g transform="translate(24, 64)">
        <rect x="0" y="0" width="870" height="490" rx="12" fill="#12091c" stroke="#581c87" stroke-width="1.5" />
        <!-- Video Canvas with Ambient Backdrop -->
        <rect x="12" y="12" width="846" height="390" rx="8" fill="#1a0c2b" />
        <circle cx="435" cy="207" r="45" fill="#9333ea" />
        <polygon points="426,188 454,207 426,226" fill="#ffffff" />
        <text x="36" y="50" fill="#f5d0fe" font-size="18" font-family="sans-serif" font-weight="bold">ملحمة الحضارة العربية — The Journey of Arab Heritage (4K HDR)</text>

        <!-- Player Controls Bar -->
        <rect x="12" y="412" width="846" height="78" rx="8" fill="#0d0517" />
        <!-- Mirrored RTL Progress Bar -->
        <rect x="30" y="430" width="810" height="8" rx="4" fill="#3b0764" />
        <rect x="30" y="430" width="520" height="8" rx="4" fill="#c026d3" />

        <text x="30" y="468" fill="#f5d0fe" font-size="12" font-family="monospace">01:14:28 / 02:20:00 · 4K 60FPS · HLS Adaptive</text>
        <text x="840" y="468" fill="#22c55e" font-size="12" font-family="monospace" text-anchor="end">Family Mode: Active (No Ads)</text>
      </g>

      <!-- Right Panel: Purposeful Cultural Curations & Parental Filters -->
      <g transform="translate(914, 64)">
        <rect x="0" y="0" width="342" height="490" rx="12" fill="#12091c" stroke="#581c87" />
        <text x="24" y="36" fill="#f5d0fe" font-size="14" font-family="sans-serif" font-weight="bold">PURPOSEFUL CURATIONS</text>
        <line x1="24" y1="48" x2="318" y2="48" stroke="#3b0764" />

        <!-- Family Safe Badges -->
        <rect x="24" y="66" width="294" height="48" rx="6" fill="#2e1065" stroke="#7e22ce" />
        <text x="38" y="96" fill="#4ade80" font-size="12" font-family="monospace">✔ Age Classification: All Ages</text>

        <rect x="24" y="126" width="294" height="48" rx="6" fill="#2e1065" stroke="#7e22ce" />
        <text x="38" y="156" fill="#4ade80" font-size="12" font-family="monospace">✔ 100% Ad-Free Architecture</text>

        <text x="24" y="208" fill="#e879f9" font-size="12" font-family="sans-serif" font-weight="bold">FEATURED FAMILY RELEASES</text>

        <!-- Movie Item 1 -->
        <rect x="24" y="224" width="294" height="64" rx="6" fill="#1f0e33" />
        <text x="38" y="250" fill="#f8fafc" font-size="12" font-weight="bold">روائع بلاد الأندلس (Documentary)</text>
        <text x="38" y="272" fill="#c084fc" font-size="11">4K UHD · Arabic Audio 5.1</text>

        <!-- Movie Item 2 -->
        <rect x="24" y="300" width="294" height="64" rx="6" fill="#1f0e33" />
        <text x="38" y="326" fill="#f8fafc" font-size="12" font-weight="bold">عظماء الفكر والعلوم في بغداد</text>
        <text x="38" y="348" fill="#c084fc" font-size="11">Historical Series · Episodes 1-12</text>

        <!-- Movie Item 3 -->
        <rect x="24" y="376" width="294" height="64" rx="6" fill="#1f0e33" />
        <text x="38" y="402" fill="#f8fafc" font-size="12" font-weight="bold">حكايات وقيم الأجداد للأطفال</text>
        <text x="38" y="424" fill="#22c55e" font-size="11">Educational Youth Special</text>
      </g>
    `
  },
  {
    name: 'memory-game.webp',
    title: 'Interactive Systems: Algorithmic Memory Game & DOM State Engine',
    mockup: `
      <!-- Top State Engine & Metric Bar -->
      <g transform="translate(24, 64)">
        <rect x="0" y="0" width="1232" height="52" rx="10" fill="#08202b" stroke="#0e7490" stroke-width="1.5" />
        <text x="24" y="32" fill="#22d3ee" font-size="13" font-family="monospace" font-weight="bold">STATE MACHINE: ATOMIC LOCK · 60 FPS · MOVES: 14 · MATCHED: 6/8 PAIRS · TIME: 00:42.18</text>
        <text x="1208" y="32" fill="#4ade80" font-size="12" font-family="monospace" text-anchor="end">WEB AUDIO: 0KB (SYNTHESIZED)</text>
      </g>

      <!-- 4x4 Cyber Card Flipping Matrix -->
      <g transform="translate(140, 140)">
        <!-- Row 1 -->
        <!-- Card 1: Flipped / Matched Cyan -->
        <rect x="0" y="0" width="110" height="110" rx="10" fill="#0891b2" stroke="#22d3ee" stroke-width="2" />
        <circle cx="55" cy="55" r="24" fill="none" stroke="#ffffff" stroke-width="3" />
        <line x1="55" y1="20" x2="55" y2="90" stroke="#ffffff" stroke-width="2" />

        <!-- Card 2: Flipped / Matched Cyan -->
        <rect x="130" y="0" width="110" height="110" rx="10" fill="#0891b2" stroke="#22d3ee" stroke-width="2" />
        <circle cx="185" cy="55" r="24" fill="none" stroke="#ffffff" stroke-width="3" />
        <line x1="185" y1="20" x2="185" y2="90" stroke="#ffffff" stroke-width="2" />

        <!-- Card 3: Face Down -->
        <rect x="260" y="0" width="110" height="110" rx="10" fill="#0e2330" stroke="#155e75" stroke-width="1.5" />
        <text x="315" y="65" fill="#155e75" font-size="24" font-family="monospace" text-anchor="middle">?</text>

        <!-- Card 4: Face Down -->
        <rect x="390" y="0" width="110" height="110" rx="10" fill="#0e2330" stroke="#155e75" stroke-width="1.5" />
        <text x="445" y="65" fill="#155e75" font-size="24" font-family="monospace" text-anchor="middle">?</text>

        <!-- Row 2 -->
        <!-- Card 5: Flipped / Purple Matched -->
        <rect x="0" y="130" width="110" height="110" rx="10" fill="#7c3aed" stroke="#a78bfa" stroke-width="2" />
        <polygon points="55,30 85,85 25,85" fill="none" stroke="#ffffff" stroke-width="3" />

        <!-- Card 6: Face Down -->
        <rect x="130" y="130" width="110" height="110" rx="10" fill="#0e2330" stroke="#155e75" stroke-width="1.5" />
        <text x="185" y="195" fill="#155e75" font-size="24" font-family="monospace" text-anchor="middle">?</text>

        <!-- Card 7: Flipped / Purple Matched -->
        <rect x="260" y="130" width="110" height="110" rx="10" fill="#7c3aed" stroke="#a78bfa" stroke-width="2" />
        <polygon points="315,160 345,215 285,215" fill="none" stroke="#ffffff" stroke-width="3" />

        <!-- Card 8: Face Down -->
        <rect x="390" y="130" width="110" height="110" rx="10" fill="#0e2330" stroke="#155e75" stroke-width="1.5" />
        <text x="445" y="195" fill="#155e75" font-size="24" font-family="monospace" text-anchor="middle">?</text>

        <!-- Row 3 -->
        <!-- Card 9: Flipped Green -->
        <rect x="0" y="260" width="110" height="110" rx="10" fill="#059669" stroke="#34d399" stroke-width="2" />
        <rect x="30" y="290" width="50" height="50" fill="none" stroke="#ffffff" stroke-width="3" />

        <!-- Card 10: Flipped Green -->
        <rect x="130" y="260" width="110" height="110" rx="10" fill="#059669" stroke="#34d399" stroke-width="2" />
        <rect x="160" y="290" width="50" height="50" fill="none" stroke="#ffffff" stroke-width="3" />

        <!-- Card 11: Face Down -->
        <rect x="260" y="260" width="110" height="110" rx="10" fill="#0e2330" stroke="#155e75" stroke-width="1.5" />
        <text x="315" y="325" fill="#155e75" font-size="24" font-family="monospace" text-anchor="middle">?</text>

        <!-- Card 12: Face Down -->
        <rect x="390" y="260" width="110" height="110" rx="10" fill="#0e2330" stroke="#155e75" stroke-width="1.5" />
        <text x="445" y="325" fill="#155e75" font-size="24" font-family="monospace" text-anchor="middle">?</text>
      </g>

      <!-- Right Telemetry Panel -->
      <g transform="translate(730, 140)">
        <rect x="0" y="0" width="526" height="370" rx="12" fill="#061822" stroke="#0e7490" />
        <text x="24" y="34" fill="#67e8f9" font-size="14" font-family="monospace" font-weight="bold">BROWSER RUNTIME ARCHITECTURE AUDIT</text>
        <line x1="24" y1="46" x2="502" y2="46" stroke="#0e7490" />

        <text x="24" y="78" fill="#4ade80" font-size="12" font-family="monospace">✔ Flip Transition: 300ms via CSS 3D Transforms (GPU)</text>
        <text x="24" y="106" fill="#4ade80" font-size="12" font-family="monospace">✔ Audio: Web Audio API Oscillator Synthesis (0KB HTTP)</text>
        <text x="24" y="134" fill="#4ade80" font-size="12" font-family="monospace">✔ Zero Layout Thrashing: Composite Layer Isolation</text>
        <text x="24" y="162" fill="#4ade80" font-size="12" font-family="monospace">✔ Memory: 0.8 MB Baseline DOM Footprint</text>
        <text x="24" y="190" fill="#facc15" font-size="12" font-family="monospace">✔ Mutex Lock: Race conditions during rapid clicks blocked</text>

        <rect x="24" y="220" width="478" height="120" rx="8" fill="#040f16" stroke="#155e75" />
        <text x="40" y="248" fill="#38bdf8" font-size="12" font-family="monospace" font-weight="bold">ACTIVE AUDIO SYNTHESIZER FREQUENCIES</text>
        <text x="40" y="274" fill="#94a3b8" font-size="11" font-family="monospace">Card Flip: Sine wave 520Hz (duration: 60ms)</text>
        <text x="40" y="296" fill="#94a3b8" font-size="11" font-family="monospace">Pair Match: Arpeggio [440Hz, 554Hz, 659Hz] (duration: 180ms)</text>
        <text x="40" y="318" fill="#10b981" font-size="11" font-family="monospace">Latency: 0.0ms Instantaneous Synthesis</text>
      </g>
    `
  }
];

async function run() {
  const outputDir = path.join(__dirname, '..', 'public', 'projects');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const p of projects) {
    const svg = `
      <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0a0d14" />
            <stop offset="50%" stop-color="#070a10" />
            <stop offset="100%" stop-color="#030508" />
          </linearGradient>
          <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
        </defs>

        <rect width="1280" height="720" fill="url(#bg)" />

        <!-- Browser Top Bar -->
        <rect x="0" y="0" width="1280" height="44" fill="url(#headerGrad)" stroke="#334155" stroke-width="0.5" />
        <circle cx="24" cy="22" r="6" fill="#ef4444" />
        <circle cx="44" cy="22" r="6" fill="#f59e0b" />
        <circle cx="64" cy="22" r="6" fill="#10b981" />

        <rect x="100" y="9" width="580" height="26" rx="6" fill="#020617" stroke="#1e293b" />
        <text x="120" y="26" fill="#94a3b8" font-size="12" font-family="monospace">https://production-preview.badra.systems/${escapeXml(p.name.replace('.webp', ''))}</text>

        <text x="1256" y="27" fill="#64748b" font-size="12" font-family="monospace" text-anchor="end">${escapeXml(p.title)}</text>

        ${p.mockup}

        <!-- Bottom Telemetry Status Bar -->
        <rect x="0" y="700" width="1280" height="20" fill="#020617" />
        <line x1="0" y1="700" x2="1280" y2="700" stroke="#1e293b" stroke-width="1" />
        <text x="24" y="714" fill="#64748b" font-size="10" font-family="monospace">BADRA SYSTEMS HIGH-CONCURRENCY RUNTIME · VERIFIED PRODUCTION ENVIRONMENT</text>
        <text x="1256" y="714" fill="#10b981" font-size="10" font-family="monospace" text-anchor="end">STATUS: 200 OK · TELEMETRY ACTIVE</text>
      </svg>
    `;

    const dest = path.join(outputDir, p.name);
    await sharp(Buffer.from(svg))
      .webp({ quality: 92 })
      .toFile(dest);
    console.log(`Generated: ${p.name}`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
