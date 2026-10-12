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
    title: 'BADRA AI Copilot and Multi-Model Engine',
    mockup: `
      <rect x="0" y="48" width="220" height="672" fill="#0f111a" />
      <text x="24" y="80" fill="#a78bfa" font-size="13" font-family="monospace" font-weight="bold">ACTIVE CHANNELS</text>
      <rect x="16" y="96" width="188" height="34" rx="6" fill="#1e1b4b" />
      <text x="32" y="118" fill="#e0e7ff" font-size="12" font-family="sans-serif">● Production Copilot</text>
      <text x="32" y="152" fill="#94a3b8" font-size="12" font-family="sans-serif">○ RAG Knowledge Graph</text>
      <text x="32" y="186" fill="#94a3b8" font-size="12" font-family="sans-serif">○ Latency Benchmark</text>
      <text x="32" y="220" fill="#94a3b8" font-size="12" font-family="sans-serif">○ Model Evaluation</text>

      <rect x="236" y="64" width="720" height="200" rx="12" fill="#131625" stroke="#2e2b58" stroke-width="1" />
      <text x="260" y="98" fill="#e2e8f0" font-size="16" font-family="sans-serif" font-weight="bold">Prompt Inference Stream [Tokens: 842 · TTFT: 38ms · SSE Active]</text>
      <rect x="260" y="116" width="672" height="64" rx="8" fill="#0b0d17" />
      <text x="276" y="142" fill="#38bdf8" font-size="12" font-family="monospace">system&gt; Optimizing database indexes for high-throughput multi-tenant RLS schema...</text>
      <text x="276" y="164" fill="#a78bfa" font-size="12" font-family="monospace">stream&gt; Execution time: 1.2ms. B-tree composite index proposed on (tenant_id, created_at DESC).</text>

      <rect x="236" y="280" width="348" height="150" rx="10" fill="#131625" stroke="#2e2b58" stroke-width="1" />
      <text x="256" y="310" fill="#94a3b8" font-size="12" font-family="sans-serif">STREAMING THROUGHPUT</text>
      <text x="256" y="348" fill="#ffffff" font-size="28" font-family="monospace" font-weight="bold">128.4 tok/s</text>
      <polyline points="256,400 300,380 350,390 400,365 450,370 500,350 550,340" fill="none" stroke="#8b5cf6" stroke-width="3" />

      <rect x="608" y="280" width="348" height="150" rx="10" fill="#131625" stroke="#2e2b58" stroke-width="1" />
      <text x="628" y="310" fill="#94a3b8" font-size="12" font-family="sans-serif">MODEL LATENCY (P99)</text>
      <text x="628" y="348" fill="#38bdf8" font-size="28" font-family="monospace" font-weight="bold">42 ms</text>
      <polyline points="628,390 670,395 720,380 770,375 820,360 870,355 920,350" fill="none" stroke="#38bdf8" stroke-width="3" />

      <rect x="972" y="64" width="288" height="630" rx="10" fill="#0f111a" stroke="#1e2238" stroke-width="1" />
      <text x="992" y="96" fill="#cbd5e1" font-size="13" font-family="monospace" font-weight="bold">TELEMETRY AUDIT</text>
      <text x="992" y="130" fill="#22c55e" font-size="11" font-family="monospace">● Edge Node: DXB-01 (Dubai)</text>
      <text x="992" y="156" fill="#22c55e" font-size="11" font-family="monospace">● Protocol: HTTP/2 SSE</text>
      <text x="992" y="182" fill="#22c55e" font-size="11" font-family="monospace">● Vector Cache: 99.4% Hit</text>
      <text x="992" y="208" fill="#38bdf8" font-size="11" font-family="monospace">● Zero Data Retention</text>
    `
  },
  {
    name: 'pulsecrm.webp',
    title: 'PULSECRM Multi-Tenant Platform',
    mockup: `
      <rect x="0" y="48" width="200" height="672" fill="#090d16" />
      <text x="20" y="80" fill="#38bdf8" font-size="13" font-family="monospace" font-weight="bold">PULSE CRM v2</text>
      <rect x="12" y="96" width="176" height="32" rx="6" fill="#0369a1" />
      <text x="24" y="117" fill="#ffffff" font-size="12" font-family="sans-serif">Kanban Pipelines</text>
      <text x="24" y="150" fill="#94a3b8" font-size="12" font-family="sans-serif">Deals and Revenue</text>
      <text x="24" y="184" fill="#94a3b8" font-size="12" font-family="sans-serif">Enterprise Orgs</text>
      <text x="24" y="218" fill="#94a3b8" font-size="12" font-family="sans-serif">Security Policies (RLS)</text>

      <rect x="220" y="70" width="240" height="620" rx="8" fill="#0f172a" stroke="#1e293b" />
      <text x="236" y="98" fill="#94a3b8" font-size="12" font-family="sans-serif" font-weight="bold">LEADS IN DISCOVERY (4)</text>
      <rect x="232" y="114" width="216" height="80" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="244" y="138" fill="#f8fafc" font-size="12" font-weight="bold">Al-Ghanim Logistics</text>
      <text x="244" y="156" fill="#38bdf8" font-size="11" font-family="monospace">$48,000 / ARR</text>

      <rect x="480" y="70" width="240" height="620" rx="8" fill="#0f172a" stroke="#1e293b" />
      <text x="496" y="98" fill="#38bdf8" font-size="12" font-family="sans-serif" font-weight="bold">PROPOSAL STAGE (3)</text>
      <rect x="492" y="114" width="216" height="80" rx="6" fill="#1e293b" stroke="#0284c7" />
      <text x="504" y="138" fill="#f8fafc" font-size="12" font-weight="bold">Kuwait Port Authority</text>
      <text x="504" y="156" fill="#10b981" font-size="11" font-family="monospace">$125,000 / Contract</text>

      <rect x="740" y="70" width="240" height="620" rx="8" fill="#0f172a" stroke="#1e293b" />
      <text x="756" y="98" fill="#10b981" font-size="12" font-family="sans-serif" font-weight="bold">NEGOTIATION / CLOSING (2)</text>
      <rect x="752" y="114" width="216" height="80" rx="6" fill="#1e293b" stroke="#059669" />
      <text x="764" y="138" fill="#f8fafc" font-size="12" font-weight="bold">Saudi Tech Cluster</text>
      <text x="764" y="156" fill="#10b981" font-size="11" font-family="monospace">$210,000 / ARR</text>

      <rect x="1000" y="70" width="260" height="300" rx="8" fill="#0b1329" stroke="#1d4ed8" />
      <text x="1016" y="98" fill="#60a5fa" font-size="12" font-family="monospace" font-weight="bold">RLS ISOLATION STATUS</text>
      <text x="1016" y="130" fill="#4ade80" font-size="11" font-family="monospace">✔ Tenant ID Enforced</text>
      <text x="1016" y="156" fill="#4ade80" font-size="11" font-family="monospace">✔ JWT Claims Verified</text>
      <text x="1016" y="182" fill="#4ade80" font-size="11" font-family="monospace">✔ Query P95: 18ms</text>
      <text x="1016" y="208" fill="#facc15" font-size="11" font-family="monospace">✔ 0 Data Leaks Logged</text>
    `
  },
  {
    name: 'aurumgulf.webp',
    title: 'Aurum Gulf Market Telemetry',
    mockup: `
      <rect x="0" y="48" width="1280" height="42" fill="#1a1405" stroke="#713f12" stroke-width="1" />
      <text x="30" y="74" fill="#fbbf24" font-size="13" font-family="monospace" font-weight="bold">GOLD XAU/USD: $2,748.20 ▲ +1.42%</text>
      <text x="360" y="74" fill="#fde047" font-size="13" font-family="monospace">KWD/g 24K: 27.18 KWD ▲</text>
      <text x="640" y="74" fill="#fde047" font-size="13" font-family="monospace">SAR/g 24K: 331.40 SAR ▲</text>
      <text x="920" y="74" fill="#4ade80" font-size="13" font-family="monospace">SUB-SECOND TICKER: 34ms RTT</text>

      <rect x="24" y="106" width="900" height="420" rx="8" fill="#0d0f14" stroke="#292524" />
      <text x="48" y="136" fill="#f8fafc" font-size="15" font-family="sans-serif" font-weight="bold">Spot Gold (24K Gold Gulf Index) · Sub-Second Stream</text>
      <line x1="80" y1="360" x2="80" y2="420" stroke="#ef4444" stroke-width="2" />
      <rect x="74" y="380" width="12" height="30" fill="#ef4444" />
      <line x1="140" y1="340" x2="140" y2="400" stroke="#22c55e" stroke-width="2" />
      <rect x="134" y="350" width="12" height="40" fill="#22c55e" />
      <line x1="200" y1="310" x2="200" y2="380" stroke="#22c55e" stroke-width="2" />
      <rect x="194" y="320" width="12" height="45" fill="#22c55e" />
      <line x1="260" y1="280" x2="260" y2="350" stroke="#22c55e" stroke-width="2" />
      <rect x="254" y="290" width="12" height="50" fill="#22c55e" />
      <line x1="320" y1="260" x2="320" y2="330" stroke="#ef4444" stroke-width="2" />
      <rect x="314" y="275" width="12" height="35" fill="#ef4444" />
      <line x1="380" y1="240" x2="380" y2="310" stroke="#22c55e" stroke-width="2" />
      <rect x="374" y="250" width="12" height="45" fill="#22c55e" />
      <line x1="440" y1="210" x2="440" y2="280" stroke="#22c55e" stroke-width="2" />
      <rect x="434" y="220" width="12" height="50" fill="#22c55e" />
      <line x1="500" y1="180" x2="500" y2="250" stroke="#22c55e" stroke-width="2" />
      <rect x="494" y="190" width="12" height="50" fill="#22c55e" />
      <polyline points="80,395 140,370 200,340 260,315 320,290 380,270 440,245 500,215 580,200 660,185 740,165 820,150 880,140" fill="none" stroke="#f59e0b" stroke-width="3" />

      <rect x="944" y="106" width="312" height="420" rx="8" fill="#0d0f14" stroke="#292524" />
      <text x="964" y="136" fill="#e2e8f0" font-size="14" font-family="sans-serif" font-weight="bold">Live Order Book Depth</text>
      <text x="964" y="170" fill="#22c55e" font-size="12" font-family="monospace">BID: 27.182 KWD (4,500g)</text>
      <text x="964" y="196" fill="#22c55e" font-size="12" font-family="monospace">BID: 27.180 KWD (8,200g)</text>
      <text x="964" y="222" fill="#ef4444" font-size="12" font-family="monospace">ASK: 27.186 KWD (2,000g)</text>
      <text x="964" y="248" fill="#ef4444" font-size="12" font-family="monospace">ASK: 27.190 KWD (6,400g)</text>
    `
  },
  {
    name: 'gulf-store.webp',
    title: 'Gulf Building Materials Engine (Kuwait)',
    mockup: `
      <rect x="0" y="48" width="1280" height="42" fill="#1c1917" stroke="#44403c" stroke-width="1" />
      <text x="24" y="74" fill="#fb923c" font-size="13" font-family="monospace" font-weight="bold">SHUWAIKH SPOT INDEX: REBAR 228 KWD/TON ▲ +0.4%</text>
      <text x="480" y="74" fill="#e2e8f0" font-size="13" font-family="monospace">PORTLAND CEMENT: 1.45 KWD/BAG</text>
      <text x="820" y="74" fill="#38bdf8" font-size="13" font-family="monospace">EDGE LATENCY: 22ms · SUPABASE RLS ACTIVE</text>

      <rect x="24" y="106" width="600" height="420" rx="10" fill="#18181b" stroke="#27272a" />
      <text x="48" y="138" fill="#f8fafc" font-size="16" font-family="sans-serif" font-weight="bold">Automated Structural Concrete and Rebar Calculator</text>
      
      <text x="48" y="180" fill="#a1a1aa" font-size="12" font-family="sans-serif">CONCRETE SLAB VOLUME: 140 m³</text>
      <rect x="48" y="192" width="550" height="8" rx="4" fill="#27272a" />
      <rect x="48" y="192" width="380" height="8" rx="4" fill="#f97316" />

      <text x="48" y="240" fill="#a1a1aa" font-size="12" font-family="sans-serif">ESTIMATED REBAR RATIO (HIGH TENSILE 16mm): 16.8 TONS</text>
      <rect x="48" y="252" width="550" height="8" rx="4" fill="#27272a" />
      <rect x="48" y="252" width="420" height="8" rx="4" fill="#0284c7" />

      <rect x="48" y="290" width="550" height="120" rx="8" fill="#09090b" stroke="#27272a" />
      <text x="68" y="320" fill="#22c55e" font-size="13" font-family="monospace" font-weight="bold">✔ 5 Transit Concrete Mixers (32m³ Cap) Dispatched</text>
      <text x="68" y="348" fill="#22c55e" font-size="13" font-family="monospace">✔ Safety Waste Margin: +5% Buffer Pre-allocated</text>
      <text x="68" y="376" fill="#facc15" font-size="13" font-family="monospace">✔ Tier-2 Contractor Bulk Discount Applied (-12%)</text>

      <rect x="648" y="106" width="608" height="420" rx="10" fill="#18181b" stroke="#27272a" />
      <text x="672" y="138" fill="#f8fafc" font-size="16" font-family="sans-serif" font-weight="bold">Commercial B2B Quotation Specification</text>
      <rect x="672" y="160" width="560" height="180" rx="8" fill="#09090b" />
      <text x="692" y="192" fill="#94a3b8" font-size="12" font-family="monospace">Project: Al-Mutlaa Residential Complex (Sector N4)</text>
      <text x="692" y="218" fill="#94a3b8" font-size="12" font-family="monospace">Contractor Account: Approved (Credit Limit: 45,000 KWD)</text>
      <text x="692" y="244" fill="#38bdf8" font-size="12" font-family="monospace">Calculated Total: 7,420 KWD (Delivered Shuwaikh Site)</text>
      <text x="692" y="270" fill="#4ade80" font-size="12" font-family="monospace">Status: Instant PDF Quotation Ready for Export</text>

      <rect x="672" y="360" width="260" height="44" rx="6" fill="#f97316" />
      <text x="710" y="388" fill="#ffffff" font-size="13" font-weight="bold">Download Official B2B Quote</text>
    `
  },
  {
    name: 'majd-parts.webp',
    title: 'MAJD PARTS Automotive Platform',
    mockup: `
      <rect x="24" y="68" width="1232" height="52" rx="8" fill="#1e1e24" stroke="#333" />
      <text x="48" y="100" fill="#f87171" font-size="14" font-family="monospace">VIN Search: WBA33AY08MFS29410 [BMW 330i G20 - B48 Engine Verified]</text>

      <rect x="24" y="140" width="390" height="340" rx="8" fill="#141418" stroke="#26262e" />
      <rect x="44" y="160" width="350" height="160" rx="6" fill="#0d0d10" />
      <circle cx="219" cy="240" r="50" fill="none" stroke="#ef4444" stroke-width="4" stroke-dasharray="10 6" />
      <text x="44" y="348" fill="#f8fafc" font-size="15" font-weight="bold">Ceramic Brake Rotors (Front Axle)</text>
      <text x="44" y="372" fill="#ef4444" font-size="13" font-family="monospace">OEM: 34116886477 · In Stock (Kuwait / Cairo)</text>

      <rect x="444" y="140" width="390" height="340" rx="8" fill="#141418" stroke="#26262e" />
      <rect x="464" y="160" width="350" height="160" rx="6" fill="#0d0d10" />
      <polyline points="500,240 550,210 600,260 660,200 750,250" fill="none" stroke="#38bdf8" stroke-width="3" />
      <text x="464" y="348" fill="#f8fafc" font-size="15" font-weight="bold">Direct Ignition Coil Pack (Set of 4)</text>
      <text x="464" y="372" fill="#38bdf8" font-size="13" font-family="monospace">OEM: 12138647689 · Verified Compatible</text>

      <rect x="864" y="140" width="390" height="340" rx="8" fill="#141418" stroke="#26262e" />
      <rect x="884" y="160" width="350" height="160" rx="6" fill="#0d0d10" />
      <polygon points="1079,200 1130,280 1028,280" fill="none" stroke="#22c55e" stroke-width="4" />
      <text x="884" y="348" fill="#f8fafc" font-size="15" font-weight="bold">High-Flow Dual Cone Air Filter Kit</text>
      <text x="884" y="372" fill="#22c55e" font-size="13" font-family="monospace">Performance Tier · Instant Dispatch</text>
    `
  },
  {
    name: 'egypt-tour.webp',
    title: 'Egypt Tourism and Booking Platform',
    mockup: `
      <rect x="24" y="68" width="1232" height="160" rx="10" fill="#062e24" stroke="#047857" />
      <text x="54" y="112" fill="#34d399" font-size="22" font-family="sans-serif" font-weight="bold">7-Day Historic Cairo and Nile Luxury Cruise Itinerary</text>
      <text x="54" y="142" fill="#a7f3d0" font-size="14">Giza Pyramids · Grand Egyptian Museum · Luxor Karnak · Aswan Philae</text>
      <text x="54" y="174" fill="#fbbf24" font-size="13" font-family="monospace">Instant Booking Engine · Multi-Currency (USD / EUR / EGP / SAR)</text>

      <rect x="24" y="248" width="390" height="240" rx="8" fill="#0c1e18" stroke="#065f46" />
      <text x="44" y="280" fill="#34d399" font-size="14" font-family="monospace" font-weight="bold">DAY 1 - 2: CAIRO</text>
      <text x="44" y="310" fill="#f8fafc" font-size="13">Private Archaeologist Tour of Giza Plateau</text>
      <text x="44" y="336" fill="#94a3b8" font-size="12">Four Seasons Nile Plaza · Airport Chauffeur</text>

      <rect x="444" y="248" width="390" height="240" rx="8" fill="#0c1e18" stroke="#065f46" />
      <text x="464" y="280" fill="#34d399" font-size="14" font-family="monospace" font-weight="bold">DAY 3 - 5: LUXOR</text>
      <text x="464" y="310" fill="#f8fafc" font-size="13">Valley of the Kings and Hot Air Balloon Sunrise</text>
      <text x="464" y="336" fill="#94a3b8" font-size="12">Sanctuary Sun Boat IV · Full Board Gourmet</text>

      <rect x="864" y="248" width="390" height="240" rx="8" fill="#0c1e18" stroke="#065f46" />
      <text x="884" y="280" fill="#34d399" font-size="14" font-family="monospace" font-weight="bold">DAY 6 - 7: ASWAN</text>
      <text x="884" y="310" fill="#f8fafc" font-size="13">Abu Simbel Flight Excursion and Nubian Culture</text>
      <text x="884" y="336" fill="#94a3b8" font-size="12">Old Cataract Hotel · Private Felucca Sail</text>
    `
  },
  {
    name: 'arab-cinema.webp',
    title: 'Arab Family Cinema Platform',
    mockup: `
      <rect x="24" y="68" width="860" height="420" rx="10" fill="#180c24" stroke="#4c1d95" />
      <circle cx="454" cy="278" r="44" fill="#a855f7" />
      <polygon points="446,260 472,278 446,296" fill="#ffffff" />
      <text x="48" y="106" fill="#f5d0fe" font-size="16" font-family="sans-serif" font-weight="bold">Featured Narrative: The Journey of Arab Heritage (4K HDR)</text>
      <rect x="48" y="440" width="812" height="6" rx="3" fill="#3b0764" />
      <rect x="48" y="440" width="320" height="6" rx="3" fill="#d946ef" />

      <rect x="908" y="68" width="348" height="420" rx="10" fill="#140a1e" stroke="#3b0764" />
      <text x="928" y="100" fill="#e879f9" font-size="13" font-family="monospace" font-weight="bold">PURPOSEFUL CURATIONS</text>
      <text x="928" y="136" fill="#f8fafc" font-size="12">● Family Values and Cultural Roots</text>
      <text x="928" y="166" fill="#f8fafc" font-size="12">● Historical Documentaries</text>
      <text x="928" y="196" fill="#f8fafc" font-size="12">● Educational Youth Series</text>
      <text x="928" y="226" fill="#22c55e" font-size="11" font-family="monospace">Age Filter: All Ages Approved</text>
      <text x="928" y="252" fill="#22c55e" font-size="11" font-family="monospace">Zero Inappropriate Ads Policy</text>
    `
  },
  {
    name: 'memory-game.webp',
    title: 'Interactive Memory Engine',
    mockup: `
      <rect x="24" y="68" width="1232" height="50" rx="8" fill="#08202b" stroke="#0e7490" />
      <text x="50" y="100" fill="#22d3ee" font-size="13" font-family="monospace" font-weight="bold">STATE ENGINE: 60 FPS · MOVES: 14 · MATCHED: 6/8 PAIRS · TIME: 00:42.18</text>

      <g transform="translate(180, 140)">
        <rect x="0" y="0" width="100" height="100" rx="8" fill="#06b6d4" />
        <rect x="120" y="0" width="100" height="100" rx="8" fill="#06b6d4" />
        <rect x="240" y="0" width="100" height="100" rx="8" fill="#155e75" />
        <rect x="360" y="0" width="100" height="100" rx="8" fill="#155e75" />

        <rect x="0" y="120" width="100" height="100" rx="8" fill="#0e7490" />
        <rect x="120" y="120" width="100" height="100" rx="8" fill="#155e75" />
        <rect x="240" y="120" width="100" height="100" rx="8" fill="#0e7490" />
        <rect x="360" y="120" width="100" height="100" rx="8" fill="#155e75" />

        <rect x="0" y="240" width="100" height="100" rx="8" fill="#155e75" />
        <rect x="120" y="240" width="100" height="100" rx="8" fill="#155e75" />
        <rect x="240" y="240" width="100" height="100" rx="8" fill="#155e75" />
        <rect x="360" y="240" width="100" height="100" rx="8" fill="#155e75" />
      </g>

      <rect x="760" y="140" width="496" height="340" rx="8" fill="#051722" stroke="#0e7490" />
      <text x="784" y="174" fill="#67e8f9" font-size="13" font-family="monospace" font-weight="bold">DOM DISPATCH AND RECONCILIATION</text>
      <text x="784" y="206" fill="#22c55e" font-size="11" font-family="monospace">✔ Flip Duration: 300ms (CSS Transform 3D)</text>
      <text x="784" y="232" fill="#22c55e" font-size="11" font-family="monospace">✔ Zero Garbage Collection Spikes</text>
      <text x="784" y="258" fill="#22c55e" font-size="11" font-family="monospace">✔ Touch Event Passive Listeners Active</text>
      <text x="784" y="284" fill="#facc15" font-size="11" font-family="monospace">✔ Memory: 0.8 MB Baseline DOM Footprint</text>
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
            <stop offset="0%" stop-color="#0b0f19" />
            <stop offset="50%" stop-color="#070a12" />
            <stop offset="100%" stop-color="#030508" />
          </linearGradient>
          <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
        </defs>

        <rect width="1280" height="720" fill="url(#bg)" />

        <rect x="0" y="0" width="1280" height="44" fill="url(#headerGrad)" stroke="#334155" stroke-width="0.5" />
        <circle cx="24" cy="22" r="6" fill="#ef4444" />
        <circle cx="44" cy="22" r="6" fill="#f59e0b" />
        <circle cx="64" cy="22" r="6" fill="#10b981" />

        <rect x="100" y="9" width="580" height="26" rx="6" fill="#020617" stroke="#1e293b" />
        <text x="120" y="26" fill="#94a3b8" font-size="12" font-family="monospace">https://production-preview.badra.systems/${escapeXml(p.name.replace('.webp', ''))}</text>

        <text x="1256" y="27" fill="#64748b" font-size="12" font-family="monospace" text-anchor="end">${escapeXml(p.title)}</text>

        ${p.mockup}

        <rect x="0" y="700" width="1280" height="20" fill="#020617" />
        <line x1="0" y1="700" x2="1280" y2="700" stroke="#1e293b" stroke-width="1" />
        <text x="24" y="714" fill="#64748b" font-size="10" font-family="monospace">BADRA SYSTEMS HIGH-CONCURRENCY RUNTIME · VERIFIED PRODUCTION ENVIRONMENT</text>
        <text x="1256" y="714" fill="#10b981" font-size="10" font-family="monospace" text-anchor="end">STATUS: 200 OK · TELEMETRY ACTIVE</text>
      </svg>
    `;

    const dest = path.join(outputDir, p.name);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(dest);
    console.log(`Generated: ${p.name}`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
