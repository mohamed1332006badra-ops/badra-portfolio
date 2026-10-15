"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n-context";
import { Laptop, Cpu, Layers, Database, Zap, Activity, CheckCircle2 } from "lucide-react";

interface TopologyNode {
  id: string;
  number: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  tech: string;
  throughput: { en: string; ar: string };
  p95Latency: { en: string; ar: string };
  security: { en: string; ar: string };
  fallback: { en: string; ar: string };
  notes: { en: string; ar: string };
}

interface ProjectTopology {
  projectId: string;
  nodes: [TopologyNode, TopologyNode, TopologyNode, TopologyNode];
}

const TOPOLOGIES: Record<string, ProjectTopology> = {
  "badra-ai": {
    projectId: "badra-ai",
    nodes: [
      {
        id: "ui-edge",
        number: "01",
        name: { en: "Client Streaming UI", ar: "واجهة البث اللحظي" },
        role: { en: "Edge UI / Client Layer", ar: "طبقة الحافة وواجهة المستخدم" },
        tech: "Next.js 16 App Router · Token Stream Parser",
        throughput: { en: "60 FPS Visual Pacing", ar: "معدل إطارات 60FPS متزامن" },
        p95Latency: { en: "< 16ms Local Render", ar: "< 16ms معالجة محلية" },
        security: { en: "Strict Content-Security-Policy", ar: "سياسة أمان محتوى صارمة CSP" },
        fallback: { en: "Progressive Markdown Seal Buffer", ar: "معالج مؤقت لغلق الوسوم تلقائياً" },
        notes: {
          en: "Handles token stream rendering with zero layout shift (CLS: 0.00) using chunked DOM assembly.",
          ar: "معالجة تدفق الرموز النصية بثبات بصري كامل دون أي اهتزاز للصفحة عبر تجميع مجزأ للـ DOM.",
        },
      },
      {
        id: "gateway",
        number: "02",
        name: { en: "SSE Gateway & Router", ar: "بوابة بث الأحداث SSE" },
        role: { en: "Streaming Transport", ar: "مسار البث الشبكي غير المتزامن" },
        tech: "Node.js Edge Runtime · Token Budgeter",
        throughput: { en: "15,000 Concurrent SSE Conns", ar: "15,000 اتصال بث متزامن" },
        p95Latency: { en: "< 38ms TTFT (Time to First Token)", ar: "< 38ms زمن أول رمز" },
        security: { en: "JWT Bearer · Sliding-Window Rate Limit", ar: "توثيق JWT وتحديد ذكي للمعدل" },
        fallback: { en: "Automatic SSE Reconnect with Stream State Resume", ar: "استئناف فوري للتدفق عند انقطاع الاتصال" },
        notes: {
          en: "Multiplexes unidirectional inference streams over standard HTTP/2 with automatic backpressure control.",
          ar: "تعدد إرسال تدفقات الذكاء الاصطناعي عبر HTTP/2 مع ضبط تلقائي للضغط الخلفي.",
        },
      },
      {
        id: "engine",
        number: "03",
        name: { en: "Hybrid RAG Engine", ar: "محرك البحث والاسترجاع الهجين" },
        role: { en: "Core Compute & AI Vector", ar: "معالجة الذكاء الاصطناعي والبحث المتجهي" },
        tech: "Python FastAPI Worker Pool · Cross-Encoder",
        throughput: { en: "2,400 Embeddings/sec", ar: "2,400 تضمين متجهي/ثانية" },
        p95Latency: { en: "< 45ms Re-ranking Pipeline", ar: "< 45ms إعادة ترتيب النتائج" },
        security: { en: "Strict Isolation Tenant Sandbox", ar: "عزل كامل لبيئات العملاء" },
        fallback: { en: "Dense Embedding Fallback to BM25 Lexical", ar: "تحول تلقائي للبحث النصي عند تأخر النماذج" },
        notes: {
          en: "Synthesizes sparse lexical index and dense semantic vector search with Cross-Encoder precision scoring.",
          ar: "يدمج البحث النصي مع البحث الدلالي المتجهي بدقة متناهية عبر خوارزميات Cross-Encoder.",
        },
      },
      {
        id: "storage",
        number: "04",
        name: { en: "PostgreSQL pgvector", ar: "قاعدة بيانات المتجهات" },
        role: { en: "Vector & State Persistence", ar: "حفظ البيانات والتضمينات المكانية" },
        tech: "PostgreSQL · pgvector HNSW Index · Redis",
        throughput: { en: "50,000 QPS Index Lookups", ar: "50,000 استعلام متجهي/ثانية" },
        p95Latency: { en: "< 12ms Cosine Distance Query", ar: "< 12ms قياس المسافة الشعاعية" },
        security: { en: "Encrypted at Rest (AES-256) · Strict RLS", ar: "تشفير AES-256 وعزل صفوف البيانات RLS" },
        fallback: { en: "Pre-warmed Redis Vector Cache Cluster", ar: "ذاكرة Redis المجهزة مسبقاً للمتجهات الشائعة" },
        notes: {
          en: "HNSW high-dimensional vector index provides sub-12ms approximate nearest neighbor queries.",
          ar: "فهرس HNSW عالي الأبعاد يتيح استرجاع أقرب الجيران الدلالية في أقل من 12 مللي ثانية.",
        },
      },
    ],
  },
  "pulsecrm": {
    projectId: "pulsecrm",
    nodes: [
      {
        id: "ui-edge",
        number: "01",
        name: { en: "React Server Components", ar: "مكونات الخادم React" },
        role: { en: "UI & Optimistic State", ar: "الواجهة وحالات التحديث الفوري" },
        tech: "Next.js 16 · Tailwind CSS · React Query",
        throughput: { en: "60 FPS Pipeline Drag-n-Drop", ar: "60 إطار/ث بالسحب والإفلات" },
        p95Latency: { en: "< 15ms Mutation Optimistic Apply", ar: "< 15ms استجابة بصرية فورية" },
        security: { en: "Sanitized HTML & Zero-Trust UI Tokens", ar: "تنقية مدخلات كاملة وانعدام الثقة" },
        fallback: { en: "Optimistic State Rollback on Network Error", ar: "تراجع آمن للحالة عند تعثر الاتصال" },
        notes: {
          en: "Renders Kanban deals and pipelines with instant optimistic updates prior to server response.",
          ar: "عرض خطوط الصفقات والمبيعات مع تحديث لحظي استباقي قبل وصول رد الخادم.",
        },
      },
      {
        id: "gateway",
        number: "02",
        name: { en: "Multi-Tenant Edge Gateway", ar: "بوابة الحافة متعددة المستأجرين" },
        role: { en: "API Routing & Identity", ar: "التوجيه والتحقق من هوية المؤسسات" },
        tech: "Edge Route Handlers · Supabase Auth",
        throughput: { en: "20,000 HTTP Req/sec", ar: "20,000 طلب خادم/ثانية" },
        p95Latency: { en: "< 22ms Auth & Route Verification", ar: "< 22ms للتحقق والتوجيه" },
        security: { en: "Tenant-Bound JWT Claim Injections", ar: "حقن أختام رقمية مشفرة برقم المستأجر" },
        fallback: { en: "Read-Only Replica Session Fallback", ar: "التحويل للنسخ المتطابقة للقراءة فقط عند الضغط" },
        notes: {
          en: "Extracts and enforces tenant_id claim in every payload before hitting database connection pools.",
          ar: "استخراج وتأكيد هوية المستأجر في كل طلب قبل الوصول إلى خوادم قواعد البيانات.",
        },
      },
      {
        id: "engine",
        number: "03",
        name: { en: "Webhook & Mutation Pipeline", ar: "محرك المعاملات والأحداث" },
        role: { en: "Business Logic & Integrations", ar: "منطق الأعمال وخطافات الويب" },
        tech: "Idempotent Worker Queue · Zod Schemas",
        throughput: { en: "4,500 Mutations/sec", ar: "4,500 تعديل معاملاتي/ثانية" },
        p95Latency: { en: "< 35ms Deal Value Recalculation", ar: "< 35ms لاحتساب إجماليات الصفقات" },
        security: { en: "HMAC-SHA256 Webhook Signatures", ar: "توقيعات رقمية مشفرة HMAC-SHA256" },
        fallback: { en: "Dead-Letter Queue with 5x Exponential Retry", ar: "طابور الرسائل المتعثرة مع 5 محاولات ذكية" },
        notes: {
          en: "Guarantees exactly-once processing for external webhooks from Stripe, HubSpot, and ERPs.",
          ar: "ضمان معالجة الأحداث الخارجية مرة واحدة بالضبط دون تكرار أو فقدان للبيانات.",
        },
      },
      {
        id: "storage",
        number: "04",
        name: { en: "Supabase PostgreSQL RLS", ar: "قاعدة بيانات Supabase RLS" },
        role: { en: "Enterprise Data Tier", ar: "طبقة تخزين وحماية بيانات المؤسسات" },
        tech: "PostgreSQL 16 · Row-Level Security · RLS",
        throughput: { en: "18,000 Transactional IOPS", ar: "18,000 عملية إدخال/إخراج/ثانية" },
        p95Latency: { en: "< 14ms Query Execution", ar: "< 14ms تنفيذ الاستعلامات المعزولة" },
        security: { en: "Kernel-Level Row Security Isolation", ar: "عزل الصفوف على مستوى نواة قاعدة البيانات" },
        fallback: { en: "Multi-Zone Automated Standby Failover", ar: "تحويل فوري لخادم احتياطي في منطقة أخرى" },
        notes: {
          en: "Zero cross-tenant data leakage guaranteed at database level via auth.jwt() -> tenant_id policies.",
          ar: "انعدام تام لتسرب البيانات بين الشركات عبر سياسات أمان صارمة في عمق قاعدة البيانات.",
        },
      },
    ],
  },
  "aurum-gulf": {
    projectId: "aurum-gulf",
    nodes: [
      {
        id: "ui-edge",
        number: "01",
        name: { en: "Sub-Second Trading Canvas", ar: "شاشة التداول اللحظية" },
        role: { en: "Live WebGL / DOM Ticker", ar: "لوحة الأسعار الحية ودفتر الأوامر" },
        tech: "Next.js · HTML5 Canvas · SVG Sparklines",
        throughput: { en: "60 FPS Visual Price Tickers", ar: "معدل تحديث 60 إطار بالثانية" },
        p95Latency: { en: "< 8ms Frame Tick Paint", ar: "< 8ms رسم التذبذبات السعرية" },
        security: { en: "Signed Client Heartbeat Tokens", ar: "أختام تحقق مشفرة للنبضات" },
        fallback: { en: "HTTP Polling Auto-Degradation (1.5s)", ar: "تراجع تلقائي للسحب الدوري عند انقطاع السوكيت" },
        notes: {
          en: "Ultra-low overhead render loops update live bid/ask spreads without re-rendering parent tree.",
          ar: "حلقات عرض خفيفة الوزن تحدث أسعار الذهب الفورية دون إعادة بناء الشجرة البصرية.",
        },
      },
      {
        id: "gateway",
        number: "02",
        name: { en: "Binary WebSocket Hub", ar: "بوابة الاتصال الثنائي WSS" },
        role: { en: "Realtime Bidirectional Pipe", ar: "مسار البث المباشر ثنائي الاتجاه" },
        tech: "WSS Multiplexer · Edge Geodistribution",
        throughput: { en: "100,000 Live Price Ticks/min", ar: "100,000 تحديث سعري/دقيقة" },
        p95Latency: { en: "< 11ms Global Edge Ping", ar: "< 11ms زمن استجابة الحافة العالمية" },
        security: { en: "WSS Encrypted over TLS 1.3", ar: "تشفير كامل عبر بروتوكول TLS 1.3" },
        fallback: { en: "Multi-Region Cluster Edge Failover", ar: "تحويل فوري لعقدة جغرافية بديلة" },
        notes: {
          en: "Broadcasts raw market ticks to thousands of connected bullion desks simultaneously.",
          ar: "بث أسعار السبائك الفورية لآلاف المتعاملين في نفس اللحظة بأقل استهلاك حزمة بيانات.",
        },
      },
      {
        id: "engine",
        number: "03",
        name: { en: "GCC Spot Normalizer", ar: "محرك أسعار الخليج والمعادن" },
        role: { en: "Algorithmic Pricing Engine", ar: "حساب أعيرة الذهب وفروقات العملات" },
        tech: "TypeScript · Fixed-Point Precision Math",
        throughput: { en: "10,000 Calculations/sec", ar: "10,000 عملية حسابية دقيقة/ثانية" },
        p95Latency: { en: "< 4ms Currency Conversion", ar: "< 4ms تحويل KWD/SAR/AED/USD" },
        security: { en: "Tamper-Proof Market Feed Validation", ar: "فحص قطعي لمنع تلاعب الأسعار" },
        fallback: { en: "Last-Known Spot Median Lock", ar: "تثبيت آخر متوسط سعري موثوق عند اضطراب المزود" },
        notes: {
          en: "Computes 24K, 22K, 21K, 18K purity grams with live spot spreads and regional FX matrices.",
          ar: "حساب جرامات الذهب 24 و21 و18 قيراط مع هوامش البيع والشراء ومصرفية الخليج الموحدة.",
        },
      },
      {
        id: "storage",
        number: "04",
        name: { en: "Redis Ring + PostgreSQL", ar: "ذاكرة Redis وسجل العمليات" },
        role: { en: "Sliding-Window Memory & Ledger", ar: "الذاكرة السريعة وسجل التدقيق المالي" },
        tech: "Redis In-Memory · PostgreSQL Timescale",
        throughput: { en: "85,000 Ops/sec In-Memory", ar: "85,000 عملية ذاكرة بالثانية" },
        p95Latency: { en: "< 2ms Cache Fetch / < 18ms Ledger Write", ar: "< 2ms قراءة الكاش / < 18ms كتابة السجل" },
        security: { en: "Immutable Append-Only Audit Trail", ar: "سجل مالي غير قابل للتعديل Append-Only" },
        fallback: { en: "Snapshot Disk Persistence (AOF / RDB)", ar: "حفظ دوري للملفات في القرص الصلب" },
        notes: {
          en: "Sliding-window buffer keeps the last 24h tick history instantly accessible with zero lag.",
          ar: "ذاكرة ذكية تحفظ سجل تذبذبات الـ 24 ساعة الماضية للاسترجاع الفوري الفائق.",
        },
      },
    ],
  },
  "gulf-building-materials": {
    projectId: "gulf-building-materials",
    nodes: [
      {
        id: "ui-edge",
        number: "01",
        name: { en: "B2B Contractor PWA", ar: "بوابة المقاولين الذكية PWA" },
        role: { en: "Industrial Commerce Interface", ar: "واجهة طلب مواد البناء والمقاولات" },
        tech: "Next.js 16 · Tailwind · Client Volumetric State",
        throughput: { en: "60 FPS Interactive Sliders", ar: "مؤشرات تفاعلية سلسة 60FPS" },
        p95Latency: { en: "< 10ms Client Math Update", ar: "< 10ms حساب فوري للأحجام" },
        security: { en: "Contractor Account Security", ar: "حماية حسابات المقاولين المعتمدة" },
        fallback: { en: "Local Storage Offline Quotation Cache", ar: "حفظ مسودة العرض محلياً عند انقطاع النت" },
        notes: {
          en: "Allows project engineers to enter concrete slab dimensions and immediately see rebar tonnage.",
          ar: "تتيح للمهندسين إدخال أبعاد الصبات الخرسانية وحساب أطنان الحديد وشاحنات النقل فوراً.",
        },
      },
      {
        id: "gateway",
        number: "02",
        name: { en: "Edge Quotation Gateway", ar: "بوابة تسعير الحافة" },
        role: { en: "Fast API Route Handler", ar: "توجيه وحساب عروض الأسعار" },
        tech: "Vercel Edge Functions · Zod Validation",
        throughput: { en: "12,000 Requests/sec", ar: "12,000 طلب تسعير/ثانية" },
        p95Latency: { en: "< 24ms Roundtrip Response", ar: "< 24ms زمن الاستجابة الكامل" },
        security: { en: "Rate Limiting & Anti-Scraping Protection", ar: "منع كشط الأسعار والتلاعب بالكميات" },
        fallback: { en: "Cached Spot Discount Matrix", ar: "استخدام جدول الخصومات المخزن مسبقاً" },
        notes: {
          en: "Applies contractor wholesale tier discounts based on total order volumetric thresholds.",
          ar: "تطبيق خصومات المقاولين بالجملة آلياً بناءً على الحجم الإجمالي والأوزان.",
        },
      },
      {
        id: "engine",
        number: "03",
        name: { en: "Volumetric Structural Engine", ar: "محرك الحسابات الإنشائية" },
        role: { en: "Heavy Industry Math Core", ar: "حساب الخرسانة، الحديد وهامش الهدر" },
        tech: "Structural Algorithmic Engine",
        throughput: { en: "8,000 Quotes Generated/min", ar: "8,000 عرض سعر رسمي/دقيقة" },
        p95Latency: { en: "< 14ms Engine Computation", ar: "< 14ms احتساب المعادلة الإنشائية" },
        security: { en: "Cryptographic Quotation Seal Hash", ar: "تشفير بصمة رقمية لعرض السعر لمنع التلاعب" },
        fallback: { en: "Conservative Safety Margin Default (+5%)", ar: "تطبيق هامش الأمان الإنشائي الافتراضي 5%" },
        notes: {
          en: "Computes rebar tonnage ratios (120kg/m³ standard), transit mixer dispatch, and waste margins.",
          ar: "حساب معدلات تسليح الخرسانة وسعة خلاطات النقل وهوامش الهدر بالمقاييس المعتمدة.",
        },
      },
      {
        id: "storage",
        number: "04",
        name: { en: "Supabase DB & PDF Quotations", ar: "قاعدة البيانات ومستندات PDF" },
        role: { en: "Catalog & Invoice Storage", ar: "كتالوج المواد وأرشفة العروض الرسمية" },
        tech: "PostgreSQL · PDF Engine · Storage Bucket",
        throughput: { en: "1,200 PDF Dispatches/min", ar: "1,200 وثيقة عرض سعر PDF/دقيقة" },
        p95Latency: { en: "< 18ms Query / < 120ms PDF Build", ar: "< 18ms استعلام / < 120ms توليد PDF" },
        security: { en: "Signed One-Time Quotation Download URLs", ar: "روابط تحميل مؤقتة ومحمية للعروض" },
        fallback: { en: "Cold Archive Cloud Storage Replica", ar: "نسخ سحابي احتياطي لكافة المعاملات" },
        notes: {
          en: "Generates stamped formal contractor proforma invoices with Shuwaikh spot prices.",
          ar: "توليد فواتير وعروض أسعار هندسية معتمدة مرتبطة بمؤشر سوق الشويخ اليومي.",
        },
      },
    ],
  },
  "majd-parts": {
    projectId: "majd-parts",
    nodes: [
      {
        id: "ui-edge",
        number: "01",
        name: { en: "Multilingual Parts Catalog", ar: "كتالوج قطع الغيار الذكي" },
        role: { en: "Automotive Storefront", ar: "واجهة البحث وتصفية القطع والموديلات" },
        tech: "Next.js 16 · Compatibility Filter Grid",
        throughput: { en: "60 FPS Interactive Filter", ar: "تصفية بصرية سلسة 60 إطار/ث" },
        p95Latency: { en: "< 12ms Filter Evaluation", ar: "< 12ms تطبيق الفلاتر المعقدة" },
        security: { en: "XSS Protection & Secure Sessions", ar: "حماية الجلسات وتأمين البيانات" },
        fallback: { en: "Pre-indexed Top 50 Popular Vehicle Models", ar: "فهرسة مسبقة لأشهر 50 طراز سيارة" },
        notes: {
          en: "Instant interactive search across thousands of auto replacement components.",
          ar: "بحث فوري ودقيق في آلاف قطع غيار المركبات الأصلية والبديلة.",
        },
      },
      {
        id: "gateway",
        number: "02",
        name: { en: "VIN Verification Router", ar: "بوابة فحص رقم الهيكل VIN" },
        role: { en: "Chassis Code Decoder", ar: "تفكيك وترجمة أرقام الشاسيه العالمية" },
        tech: "Edge Functions · Regular Expression Lexer",
        throughput: { en: "15,000 Lookups/sec", ar: "15,000 عملية فحص شاسيه/ثانية" },
        p95Latency: { en: "< 18ms Chassis Decode SLO", ar: "< 18ms فك تشفير مواصفات المحرك" },
        security: { en: "WAF Rate Limit on VIN Lookups", ar: "جدار حماية لمنع الاستعلام العشوائي" },
        fallback: { en: "Standard Make/Model/Year Manual Filter", ar: "التحويل للبحث اليدوي في حال تعذر قراءة الكود" },
        notes: {
          en: "Decodes 17-character VIN into exact year, engine code, transmission, and trim level.",
          ar: "تفكيك رقم الهيكل الـ 17 واستخراج كود المحرك وناقل الحركة بدقة الصانع.",
        },
      },
      {
        id: "engine",
        number: "03",
        name: { en: "Fitment & OEM Matrix", ar: "محرك التوافق والقطع البديلة" },
        role: { en: "Part Compatibility Engine", ar: "مطابقة القطع البديلة مع معايير المصنع" },
        tech: "Automotive Relational Graph",
        throughput: { en: "50,000 Cross-References/sec", ar: "50,000 مطابقة ترافدية/ثانية" },
        p95Latency: { en: "< 22ms Compatibility Verification", ar: "< 22ms تأكيد ملاءمة القطعة" },
        security: { en: "Tamper-Proof SKU Mapping", ar: "تشفير ومطابقة أكواد القطع الأصلية" },
        fallback: { en: "OEM Generic Interchange Fallback", ar: "استخدام جداول التبادل المعتمدة دولياً" },
        notes: {
          en: "Verifies whether brake calipers, sensors, and spark plugs fit the target chassis.",
          ar: "التحقق الميكانيكي والكهربائي من توافق القطعة المختارة مع المركبة المحددة.",
        },
      },
      {
        id: "storage",
        number: "04",
        name: { en: "PostgreSQL Inventory", ar: "قاعدة بيانات المخزون والمستودعات" },
        role: { en: "Live Warehouse Stock Hub", ar: "متابعة الكميات ومواقع التخزين" },
        tech: "PostgreSQL · Indexed SKU Catalog",
        throughput: { en: "12,000 Stock Queries/sec", ar: "12,000 استعلام جرد لحظي/ثانية" },
        p95Latency: { en: "< 15ms Stock Status & Pricing", ar: "< 15ms لحالة التوفر الفوري" },
        security: { en: "Strict Inventory Mutation Lock (ACID)", ar: "أقفال معاملات متزامنة تمنع البيع المزدوج" },
        fallback: { en: "Supplier Dropship Partner API Integration", ar: "تحويل الطلب للمورد المباشر عند نفاد الرفوف" },
        notes: {
          en: "Maintains real-time inventory counts across Shuwaikh central warehouse and hub branches.",
          ar: "متابعة فورية لكميات القطع في المستودع المركزي ومنافذ التوزيع في الكويت.",
        },
      },
    ],
  },
  "egypt-tourism": {
    projectId: "egypt-tourism",
    nodes: [
      {
        id: "ui-edge",
        number: "01",
        name: { en: "Luxury Expedition UI", ar: "واجهة الرحلات الملكية الفاخرة" },
        role: { en: "Cinematic Experience Layer", ar: "استعراض مسارات الآثار والبرامج الخاصة" },
        tech: "Next.js 16 · Smooth Scroll · High-Res Imagery",
        throughput: { en: "60 FPS Visual Pacing", ar: "تصفح انسيابي 60 إطار بالثانية" },
        p95Latency: { en: "< 14ms Viewport Transition", ar: "< 14ms انتقال بصري لحظي" },
        security: { en: "Safe Asset Delivery with Signed CDNs", ar: "توصيل وسائط آمن عبر شبكات عالمية" },
        fallback: { en: "Low-Bandwidth Mobile Image Fallbacks", ar: "عرض صور محسنة خفيفة للاتصالات الضعيفة" },
        notes: {
          en: "Delivers an ultra-premium experience showcasing Cairo, Luxor, and Aswan itineraries.",
          ar: "واجهة فندقية فاخرة لاستعراض رحلات القاهرة والأقصر وأسوان لكبار الشخصيات.",
        },
      },
      {
        id: "gateway",
        number: "02",
        name: { en: "Multi-Currency Gateway", ar: "بوابة العملات الأجنبية" },
        role: { en: "Real-Time Exchange Locker", ar: "تثبيت وتحديث أسعار الصرف العالمية" },
        tech: "Edge Functions · Live FX Rate API",
        throughput: { en: "10,000 Requests/sec", ar: "10,000 طلب تحويل/ثانية" },
        p95Latency: { en: "< 20ms Live Currency Sync", ar: "< 20ms لمزامنة USD/EUR/GBP/SAR" },
        security: { en: "Price Lock Guarantee Hash (15 min)", ar: "تثبيت السعر لمدة 15 دقيقة ضد تقلب الصرف" },
        fallback: { en: "Static Central Bank Daily Peg Baseline", ar: "استخدام السعر الرسمي للبنك المركزي كمرجع" },
        notes: {
          en: "Allows international travelers to view and lock tour quotes in their local preferred currencies.",
          ar: "إتاحة تثبيت أسعار الحجوزات بعملة العميل المفضلة بدون مفاجآت في الصرف.",
        },
      },
      {
        id: "engine",
        number: "03",
        name: { en: "Dynamic VIP Quoter", ar: "محرك التسعير والحزم المخصصة" },
        role: { en: "Itinerary Cost Calculator", ar: "حساب تكاليف الطيران الخاص والفنادق" },
        tech: "Dynamic Bundler · Tier Estimator",
        throughput: { en: "6,000 Quote Calculations/min", ar: "6,000 عرض سعر مخصص/دقيقة" },
        p95Latency: { en: "< 18ms Custom Package Math", ar: "< 18ms تجميع المزايا والتنقلات" },
        security: { en: "Encrypted Guest Details & Travel Dates", ar: "تشفير كامل لبيانات المسافرين والتواريخ" },
        fallback: { en: "Fixed Season Standard Tier Fallback", ar: "استخدام الأسعار الموسمية الثابتة عند الطوارئ" },
        notes: {
          en: "Calculates private transfers, Nile cruises, and Egyptologist escort pricing dynamically.",
          ar: "احتساب تكاليف المرشدين الأثريين، واليخوت النيلية، وتذاكر المعابد الحصرية.",
        },
      },
      {
        id: "storage",
        number: "04",
        name: { en: "PostgreSQL Reservation Ledger", ar: "سجل الحجوزات وقاعدة البيانات" },
        role: { en: "Booking & Availability State", ar: "حفظ الحجوزات والجدول الزمني للرحلات" },
        tech: "PostgreSQL · Automated Email Dispatcher",
        throughput: { en: "5,000 Booking Commits/sec", ar: "5,000 تأكيد حجز معتمد/ثانية" },
        p95Latency: { en: "< 16ms ACID Transaction Write", ar: "< 16ms لتأكيد المعاملة المالية" },
        security: { en: "PCI-DSS Level Compliant Payment Handshake", ar: "توافق كامل مع المعايير المصرفية العالمية" },
        fallback: { en: "Secondary Redundant Database Replication", ar: "نسخة احتياطية متزامنة لبيانات النزلاء" },
        notes: {
          en: "Maintains complete itinerary records with instantaneous confirmation dispatch to client.",
          ar: "أرشفة تفاصيل البرنامج السياحي وإرسال تأكيد الحجز الفوري للعميل والمشرفين.",
        },
      },
    ],
  },
  "arab-family-cinema": {
    projectId: "arab-family-cinema",
    nodes: [
      {
        id: "ui-edge",
        number: "01",
        name: { en: "Adaptive Streaming Player", ar: "مشغل الفيديو التكيفي 4K" },
        role: { en: "Client Playback Surface", ar: "واجهة المشغل وتغيير الجودات السلس" },
        tech: "Next.js · Video.js · HLS.js Adaptive ABR",
        throughput: { en: "60 FPS 4K/HDR Playback", ar: "عرض بدقة 4K بمعدل 60FPS" },
        p95Latency: { en: "< 80ms First Frame Buffer", ar: "< 80ms لبدء أول إطار فيديو" },
        security: { en: "DRM Token Verification & Watermarking", ar: "حماية المحتوى والعلامات المائية الرقمية" },
        fallback: { en: "Auto-Downscale to 1080p/720p on Congestion", ar: "تخفيض الجودة تلقائياً عند ضعف اتصال الإنترنت" },
        notes: {
          en: "Monitors client bandwidth and switches streaming chunks dynamically without playback stall.",
          ar: "مراقبة سرعة النت وتبديل المقاطع بجودات مختلفة دون أي توقف في المشاهدة.",
        },
      },
      {
        id: "gateway",
        number: "02",
        name: { en: "Cloudflare Video CDN", ar: "شبكة التوزيع السحابي CDN" },
        role: { en: "Global Edge Content Delivery", ar: "توصيل مقاطع الفيديو من أقرب خادم" },
        tech: "Cloudflare Edge Nodes · HTTP/3 Anycast",
        throughput: { en: "100+ Gbps Egress Capacity", ar: "أكثر من 100Gbps سرعة تدفق للبيانات" },
        p95Latency: { en: "< 18ms Manifest Request", ar: "< 18ms لطلب ملفات الفهرسة m3u8" },
        security: { en: "Signed Token URL Protection (Short TTL)", ar: "روابط مشفرة محددة الصلاحية زمنياً" },
        fallback: { en: "Multi-CDN Failover Routing", ar: "التحويل لشبكة سحابية رديفة عند ذروة الطلب" },
        notes: {
          en: "Caches .ts / .m4s segments at edge points of presence across the Middle East and worldwide.",
          ar: "تخزين مؤقت لمقاطع الفيلم في مراكز بيانات إقليمية لضمان سرعة تشغيل فائقة.",
        },
      },
      {
        id: "engine",
        number: "03",
        name: { en: "HLS Transcoder & Filter", ar: "محرك المعالجة وفلترة المحتوى" },
        role: { en: "Safe Family Content Pipeline", ar: "تقطيع الجودات والتصنيف العائلي المنضبط" },
        tech: "FFmpeg Pipeline · Audio Normalizer",
        throughput: { en: "Realtime Transcoding Rate 3.2x", ar: "معالجة وتحويل أسرع 3 مرات من الزمن الفعلي" },
        p95Latency: { en: "< 25ms Scene Metadata Tagging", ar: "< 25ms لتسجيل تصنيفات المشاهد" },
        security: { en: "Strict Content Rating & Parental Locks", ar: "أقفال أبوية ومعايير مشاهدة عائلية صارمة" },
        fallback: { en: "Pre-Transcoded Baseline Profile (H.264)", ar: "استخدام النسخ القياسية المجهزة عند انشغال الخوادم" },
        notes: {
          en: "Generates multi-bitrate renditions from 4K down to 480p with family-safe rating filters.",
          ar: "توليد جودات متعددة من 4K إلى 480p مع التأكد من معايير المحتوى العائلي المحافظ.",
        },
      },
      {
        id: "storage",
        number: "04",
        name: { en: "Distributed S3 Blob Storage", ar: "التخزين السحابي الموزع S3" },
        role: { en: "Master Media & User Profiles", ar: "حفظ النسخ الأصلية وسجل المشاهدة" },
        tech: "S3 Object Store · PostgreSQL User State",
        throughput: { en: "99.999999999% Data Durability", ar: "أمان وموثوقية تخزين 99.999999999%" },
        p95Latency: { en: "< 22ms Segment Read Latency", ar: "< 22ms قراءة أجزاء الفيديو" },
        security: { en: "Server-Side Encryption with KMS Keys", ar: "تشفير البيانات بمفاتيح KMS المؤسسية" },
        fallback: { en: "Geo-Replicated Secondary Cloud Archive", ar: "نسخ جغرافي متطابق في منطقة سحابية أخرى" },
        notes: {
          en: "Stores master 4K ProRes files, compressed HLS playlists, and persistent user watch history.",
          ar: "تخزين الملفات الأصلية وقوائم التشغيل ومزامنة الدقيقة التي توقف عندها المشاهد.",
        },
      },
    ],
  },
  "portfolio-2030": {
    projectId: "portfolio-2030",
    nodes: [
      {
        id: "ui-edge",
        number: "01",
        name: { en: "Next.js 16 Selective Hydration", ar: "واجهة الحافة المتكيفة" },
        role: { en: "Client & RSC Hybrid", ar: "طبقة العرض والترطيب الانتقائي" },
        tech: "React 19 Server Components · Turbopack",
        throughput: { en: "60 FPS Smooth GPU Accelerated", ar: "تسريع رسومي كامل 60FPS" },
        p95Latency: { en: "< 0.8ms Component Render", ar: "< 0.8ms معالجة بصرية فورية" },
        security: { en: "Strict Content Security & Zero Dependencies", ar: "سياسة أمان خالية من التبعيات غير الآمنة" },
        fallback: { en: "Full SSR HTML Pre-rendered Baseline", ar: "عرض هيكل HTML كامل حتى بدون تشغيل الجافاسكربت" },
        notes: {
          en: "Delivers a 100/100 Lighthouse benchmark with perfect layout stability and zero perceived latency.",
          ar: "تحقيق درجة 100/100 في معايير Lighthouse مع ثبات بصري مطلق وانعدام التأخير.",
        },
      },
      {
        id: "gateway",
        number: "02",
        name: { en: "Vercel Global Anycast Edge", ar: "شبكة الحافة العالمية Anycast" },
        role: { en: "Edge CDN & Routing", ar: "التوزيع الجغرافي وخفض زمن الوصول" },
        tech: "HTTP/3 · TLS 1.3 · Edge Middlewares",
        throughput: { en: "Unlimited Scalable Edge Egress", ar: "قدرة استيعاب غير محدودة على الحافة" },
        p95Latency: { en: "< 20ms Global RTT", ar: "< 20ms زمن استجابة عالمي موحد" },
        security: { en: "Automated DDoS Mitigation & TLS 1.3", ar: "حماية مدمجة ضد هجمات حجب الخدمة DDoS" },
        fallback: { en: "Stale-While-Revalidate Edge Cache", ar: "توفير النسخ المخبأة عند تحديث البيانات" },
        notes: {
          en: "Renders visitors from the nearest geographic edge node (IAD, FRA, DXB, HND).",
          ar: "توجيه الزوار لأقرب نقطة تواجد جغرافية لخوادم الحافة العالمية.",
        },
      },
      {
        id: "engine",
        number: "03",
        name: { en: "Telemetry & Sandboxes Core", ar: "محرك المختبر الهندسي والمحاكاة" },
        role: { en: "In-Browser Systems Simulation", ar: "محاكيات الأنظمة الموزعة داخل المتصفح" },
        tech: "Atomic State · Web Audio / Animation API",
        throughput: { en: "1,000 Sim Cycles/sec", ar: "1,000 دورة محاكاة دقيقة/ثانية" },
        p95Latency: { en: "< 2ms FSM State Transition", ar: "< 2ms تحول حالات المحاكاة" },
        security: { en: "Sandbox Memory Isolation", ar: "عزل كامل لذاكرة المحاكاة عن المتصفح" },
        fallback: { en: "Deterministic Seed State Initialization", ar: "إعادة تعيين الحالة المبدئية عند أي خطأ" },
        notes: {
          en: "Powers the live Rate Limiter, RAG Pipeline, and Latency Cache interactive experiments.",
          ar: "تشغيل محاكيات خوارزميات تحديد الطلبات وتأخير الذاكرة المؤقتة بالمتصفح.",
        },
      },
      {
        id: "storage",
        number: "04",
        name: { en: "Static ISR & Runtime Memory", ar: "التخزين المؤقت والذاكرة الحية" },
        role: { en: "State Persistence & Telemetry", ar: "الاحتفاظ بالبيانات وقياسات الأداء" },
        tech: "Next.js ISR · Browser Performance API",
        throughput: { en: "Sub-millisecond Memory Lookups", ar: "استرجاع لحظي من الذاكرة الحية" },
        p95Latency: { en: "< 1ms Local Telemetry Read", ar: "< 1ms قراءة مؤشرات الأداء الحية" },
        security: { en: "Client-Side Zero-PII Collection", ar: "احترام الخصوصية التام دون تتبع بيانات شخصية" },
        fallback: { en: "Static Export Snapshot Fallback", ar: "نسخة ثابتة جاهزة للعرض الفوري" },
        notes: {
          en: "Measures real FPS, DOM timings, and memory consumption in real time.",
          ar: "قياس حقيقي لمعدل الإطارات وسرعة استجابة المتصفح ومصروف الذاكرة لحظة بلحظة.",
        },
      },
    ],
  },
};

// Fallback generator for any custom project ID
function getProjectTopology(projectId: string): ProjectTopology {
  return TOPOLOGIES[projectId] || TOPOLOGIES["portfolio-2030"];
}

export function SystemTopologyFlow({ projectId }: { projectId: string }) {
  const { language } = useI18n();
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  const topology = getProjectTopology(projectId);
  const activeNode = topology.nodes[activeNodeIndex] || topology.nodes[0];

  const getNodeIcon = (index: number) => {
    switch (index) {
      case 0: return <Laptop className="w-4 h-4 text-sky-400" />;
      case 1: return <Zap className="w-4 h-4 text-emerald-400" />;
      case 2: return <Cpu className="w-4 h-4 text-purple-400" />;
      case 3: return <Database className="w-4 h-4 text-amber-400" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#090b11] p-4 sm:p-5 shadow-2xl overflow-hidden my-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-bold tracking-wide uppercase text-slate-200">
            {language === "en" ? "Live System Topology Flow" : "مخطط تدفق المعمارية الحية (Live Topology Flow)"}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-semibold">
            60FPS REAL-TIME
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          {language === "en" ? "Tap any node to inspect telemetry" : "انقر فوق أي عقدة لفحص مواصفات الأداء"}
        </span>
      </div>

      {/* Interactive Horizontal Node Chain */}
      <div className="relative mb-6 pt-2 pb-1 overflow-x-auto no-scrollbar">
        {/* Animated Glowing Connection Line */}
        <div className="hidden sm:block absolute top-[34px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-sky-500/30 via-emerald-500/40 to-amber-500/30 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-24 h-full animate-marquee" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 relative z-10 min-w-[500px] sm:min-w-0">
          {topology.nodes.map((node, idx) => {
            const isSelected = idx === activeNodeIndex;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeIndex(idx)}
                className={`relative flex flex-col p-3 rounded-xl border text-start transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/50"
                    : "bg-slate-950/80 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                {/* Node Top Indicator */}
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-mono text-[10px] font-bold text-slate-300">
                      {node.number}
                    </span>
                    <span className="p-1 rounded bg-slate-900 border border-slate-800">
                      {getNodeIcon(idx)}
                    </span>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? "bg-cyan-400 animate-ping" : "bg-emerald-500/60"
                    }`}
                  />
                </div>

                {/* Node Name & Tech */}
                <div className="text-xs font-bold text-slate-100 mb-1 line-clamp-1">
                  {language === "en" ? node.name.en : node.name.ar}
                </div>
                <div className="text-[10px] font-mono text-cyan-400/90 line-clamp-1 mb-1">
                  {language === "en" ? node.role.en : node.role.ar}
                </div>
                <div className="text-[9.5px] font-mono text-slate-500 truncate">
                  {node.tech}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Node Telemetry Inspector Card */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4 transition-all">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
              {activeNode.number}
            </span>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{language === "en" ? activeNode.name.en : activeNode.name.ar}</span>
                <span className="text-[11px] font-mono text-slate-400 font-normal">
                  ({activeNode.tech})
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                {language === "en" ? activeNode.notes.en : activeNode.notes.ar}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{language === "en" ? "SLO Compliant" : "مطابق لمعايير الأداء"}</span>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">
              {language === "en" ? "Throughput Capacity" : "القدرة الاستيعابية"}
            </span>
            <span className="font-bold text-sky-400">
              {language === "en" ? activeNode.throughput.en : activeNode.throughput.ar}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">
              {language === "en" ? "P95 Latency SLO" : "زمن الاستجابة P95"}
            </span>
            <span className="font-bold text-emerald-400">
              {language === "en" ? activeNode.p95Latency.en : activeNode.p95Latency.ar}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">
              {language === "en" ? "Security Protocol" : "بروتوكول الأمان"}
            </span>
            <span className="font-bold text-purple-400 line-clamp-1" title={language === "en" ? activeNode.security.en : activeNode.security.ar}>
              {language === "en" ? activeNode.security.en : activeNode.security.ar}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-1">
              {language === "en" ? "Failure Fallback" : "آلية التعافي التلقائي"}
            </span>
            <span className="font-bold text-amber-400 line-clamp-1" title={language === "en" ? activeNode.fallback.en : activeNode.fallback.ar}>
              {language === "en" ? activeNode.fallback.en : activeNode.fallback.ar}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
