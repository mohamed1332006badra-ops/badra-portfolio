import { NextRequest } from "next/server";
import { AiProjectScopeRequest, AiProjectScopeResult, AiScopeStreamEvent } from "@/lib/types";

// Helper for pacing token streaming smoothly
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
  try {
    const body: AiProjectScopeRequest = await req.json();

    if (!body || !body.prompt || body.prompt.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide a description of what you want to build." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const sanitizedPrompt = body.prompt.trim().slice(0, 1000);
    const projectCategory = body.projectType || "General Web / AI Product";
    const targetTimeline = body.targetTimeline || "Standard (4-8 weeks)";
    
    // Detect language: check explicit request or presence of Arabic characters
    const hasArabicChars = /[\u0600-\u06FF]/.test(sanitizedPrompt);
    const isArabic = body.language === "ar" || hasArabicChars;

    console.log(`[AI Scoper SSE] Scoping request: ${projectCategory} | Timeline: ${targetTimeline} | Lang: ${isArabic ? 'ar' : 'en'}`);

    // Intent detection
    const isAiRAG = /rag|vector|ai|llm|agent|gpt|chat|embeddings|ذكاء|استرجاع|فيكتور/i.test(sanitizedPrompt);
    const isCommerce = /store|ecommerce|e-commerce|shop|cart|stripe|checkout|payment|متجر|تجارة|دفع|سلة/i.test(sanitizedPrompt);
    const isRealTime = /realtime|real-time|telemetry|websocket|live|stream|dashboard|لحظي|مراقبة|بث/i.test(sanitizedPrompt);

    let result: AiProjectScopeResult;

    if (isAiRAG) {
      if (isArabic) {
        result = {
          summary: `مواصفة معمارية شاملة لمحرك استرجاع معرفي ذكي (RAG) مدعوم بوكلاء استعلامات وتضمينات متجهة مخصص لـ: "${sanitizedPrompt.slice(0, 80)}..."`,
          recommendedArchitecture: {
            frontend: "واجهات Next.js 16 App Router مع بث تدريجي حي للرموز (SSE Streaming)",
            backend: "مجمع عمال FastAPI / Node.js مع تقسيم غير متزامن للمستندات وضبط ميزانية الرموز",
            database: "قاعدة PostgreSQL مع ملحق pgvector (فهرس HNSW) وذاكرة مؤقتة Redis",
            aiComponents: "استرجاع هجين يجمع بين BM25 والتضمينات المتجهية مع إعادة ترتيب دقيقة للنتائج (Cross-Encoder)",
            hosting: "حاويات Docker مع توزيع جغرافي على شبكة حافة CDN",
          },
          keyMilestones: [
            { phase: "المرحلة الأولى (الأسبوع 1-2)", deliverables: "بناء مسار استقبال البيانات وتقسيم المقاطع وتأسيس فهرسة المتجهات" },
            { phase: "المرحلة الثانية (الأسبوع 3-4)", deliverables: "تطبيق البحث الهجين وتثبيت المراجع وإنشاء واجهات البث المباشر" },
            { phase: "المرحلة الثالثة (الأسبوع 5-6)", deliverables: "حزمة اختبارات الجودة وخفض زمن الاستجابة والدمج النهائي للواجهة" },
          ],
          technicalRisks: [
            "الهلوسة المعرفية في المصطلحات التخصصية (تُعالج عبر توثيق الاقتباسات القطعية للمصادر)",
            "تأخر الإقلاع البارد لنماذج التضمين (يُعالج عبر مجمعات عمال مجهزة مسبقاً في الذاكرة)",
          ],
          suggestedQuestions: [
            "ما هو الحجم التقديري للوثائق ومعدل تحديثها الزمني؟",
            "هل تفضل نماذج محلية خاصة بالكامل أم نماذج سحابية عبر APIs تجارية؟",
          ],
        };
      } else {
        result = {
          summary: `Architectural specification for an intelligent AI retrieval and workflow engine tailored to: "${sanitizedPrompt.slice(0, 80)}..."`,
          recommendedArchitecture: {
            frontend: "Next.js 16 App Router with progressive Server-Sent Events (SSE) streaming for tokens",
            backend: "Python FastAPI / Node.js worker pool with asynchronous chunk parsing and token budgeting",
            database: "PostgreSQL with pgvector (HNSW index) + Redis sliding-window cache",
            aiComponents: "Hybrid BM25 + dense embedding retrieval with cross-encoder re-ranking",
            hosting: "Dockerized container deployment with edge CDN caching",
          },
          keyMilestones: [
            { phase: "Phase 1 (Week 1-2)", deliverables: "Data ingestion pipeline, chunking boundaries, and vector indexing setup" },
            { phase: "Phase 2 (Week 3-4)", deliverables: "Hybrid search implementation, prompt grounding, and streaming API endpoints" },
            { phase: "Phase 3 (Week 5-6)", deliverables: "Evaluation benchmark suite, latency tuning, and production UI integration" },
          ],
          technicalRisks: [
            "Hallucination on domain-specific acronyms (mitigated by strict chunk citation grounding)",
            "Cold-start latency on embedding models (mitigated by pre-warmed worker pools in Redis)",
          ],
          suggestedQuestions: [
            "What is the average volume and update frequency of your source documents?",
            "Do you require private self-hosted models or commercial LLM API providers?",
          ],
        };
      }
    } else if (isCommerce) {
      if (isArabic) {
        result = {
          summary: `معمارية متجر إلكتروني عالي الأداء ومعدل التحويل مع معالجة غير متزامنة للطلبات مخصص لـ: "${sanitizedPrompt.slice(0, 80)}..."`,
          recommendedArchitecture: {
            frontend: "واجهة Next.js Headless فائقة السرعة مع توليد ثابت تدريجي (ISR)",
            backend: "إجراءات خادم مع عمال تسوية خطافات الويب (Webhooks) المتكررة بأمان تام",
            database: "قاعدة PostgreSQL مع حماية الصفوف الصارمة (RLS) وذاكرة جلسات Redis",
            aiComponents: "بحث دلالي ذكي عن المنتجات وتوصيات مخصصة (اختياري)",
            hosting: "استضافة موزعة على Vercel / AWS مع تحسين فوري للصور على الحافة",
          },
          keyMilestones: [
            { phase: "المرحلة الأولى (الأسبوع 1-2)", deliverables: "هيكل كتالوج المنتجات واستراتيجية التخزين المؤقت والتصميم الثنائي المتجاوب" },
            { phase: "المرحلة الثانية (الأسبوع 3-4)", deliverables: "مزامنة سلة المشتريات وبوابة الدفع Stripe وأقفال المخزون اللحظية" },
            { phase: "المرحلة الثالثة (الأسبوع 5-6)", deliverables: "ربط خطافات الويب للطلبات وتحليلات الأداء وCore Web Vitals" },
          ],
          technicalRisks: [
            "سباق التزامن في السلة أثناء العروض الخاطفة (يُعالج عبر أقفال Redis الذرية)",
            "انزياح التخطيط البصري عند تبديل اللغة (يُعالج عبر خصائص CSS المنطقية)",
          ],
          suggestedQuestions: [
            "هل المنتجات المعروضة مادية تتطلب شحن أم منتجات رقمية فورية؟",
            "ما هي بوابات الدفع والعملات المطلوبة للمستخدمين المستهدفين؟",
          ],
        };
      } else {
        result = {
          summary: `High-conversion modular e-commerce architecture tailored to: "${sanitizedPrompt.slice(0, 80)}..."`,
          recommendedArchitecture: {
            frontend: "Headless Next.js storefront utilizing Incremental Static Regeneration (ISR)",
            backend: "Server Actions with idempotent webhook reconciliation workers",
            database: "PostgreSQL with strict Row-Level Security (RLS) + Redis session cache",
            aiComponents: "Semantic product search and personalized recommendations (optional)",
            hosting: "Vercel / AWS with edge image optimization",
          },
          keyMilestones: [
            { phase: "Phase 1 (Week 1-2)", deliverables: "Catalog schema, ISR edge caching strategy, and bilingual responsive layout" },
            { phase: "Phase 2 (Week 3-4)", deliverables: "Cart synchronization, Stripe checkout flow, and inventory locks" },
            { phase: "Phase 3 (Week 5-6)", deliverables: "Order fulfillment webhooks, analytics, and Core Web Vitals optimization" },
          ],
          technicalRisks: [
            "Cart concurrency race conditions during flash sales (mitigated by Redis atomic locks)",
            "Layout shifts during language toggling (mitigated by CSS logical properties)",
          ],
          suggestedQuestions: [
            "Will you be selling physical or digital products?",
            "Which payment gateways and currencies are required for your target audience?",
          ],
        };
      }
    } else if (isRealTime) {
      if (isArabic) {
        result = {
          summary: `معمارية أنظمة المراقبة الحية والبث اللحظي للبيانات والمقاييس مخصصة لـ: "${sanitizedPrompt.slice(0, 80)}..."`,
          recommendedArchitecture: {
            frontend: "واجهات React تعتمد على Canvas/WebGL مفصولة تماماً عن DOM لضمان 60fps",
            backend: "عنقود خوادم WebSocket عديم الحالة مع وسيط نشر واشتراك (Redis أو NATS)",
            database: "قاعدة بيانات سلاسل زمنية (TimescaleDB / ClickHouse) مع ذاكرة دائرية Buffer",
            aiComponents: "كشف آلي للشذوذ في تدفق البيانات اللحظية (Anomaly Detection)",
            hosting: "حاويات موزعة مع موازنة الحمل خلف Cloudflare / HAProxy",
          },
          keyMilestones: [
            { phase: "المرحلة الأولى (الأسبوع 1-2)", deliverables: "تحديد بروتوكول النشر والاشتراك وبث بيانات القياس التجريبية" },
            { phase: "المرحلة الثانية (الأسبوع 3-4)", deliverables: "معالجة البيانات عبر Web Worker ومحرك الرسم البصري اللحظي" },
            { phase: "المرحلة الثالثة (الأسبوع 5-6)", deliverables: "إدارة الضغط العكسي (Backpressure) واستعادة الاتصال واختبارات الحمل" },
          ],
          technicalRisks: [
            "تجمد واجهة المستخدم أثناء تدفق آلاف المقاييس (يُعالج بنقل المعالجة إلى Web Workers)",
            "فجوات فقدان الحزم أثناء تقلب الشبكة (تُعالج بالاستيفاء البياني في جهة العميل)",
          ],
          suggestedQuestions: [
            "ما هو الحجم المتوقع للرسائل بالثانية وعدد الاتصالات المتزامنة؟",
            "ما هي المدة الزمنية المطلوبة لحفظ المقاييس التاريخية؟",
          ],
        };
      } else {
        result = {
          summary: `Distributed real-time streaming and telemetry system architecture for: "${sanitizedPrompt.slice(0, 80)}..."`,
          recommendedArchitecture: {
            frontend: "React with Canvas/WebGL render loop decoupled from DOM state",
            backend: "Stateless WebSocket cluster with pub/sub broker (Redis or NATS)",
            database: "Timeseries storage (TimescaleDB / ClickHouse) with ring-buffer memory",
            aiComponents: "Automated anomaly detection on telemetry streams",
            hosting: "Load-balanced container cluster behind HAProxy / Cloudflare",
          },
          keyMilestones: [
            { phase: "Phase 1 (Week 1-2)", deliverables: "WebSocket pub/sub protocol definition and mock metric stream" },
            { phase: "Phase 2 (Week 3-4)", deliverables: "Web Worker data parsing and 60fps canvas visualization engine" },
            { phase: "Phase 3 (Week 5-6)", deliverables: "Backpressure management, connection recovery, and load testing" },
          ],
          technicalRisks: [
            "Main-thread UI lockup on high-throughput bursts (mitigated by Web Worker offloading)",
            "Network drop packet gaps (mitigated by client-side cubic bezier interpolation)",
          ],
          suggestedQuestions: [
            "What is the expected message frequency and concurrent client volume?",
            "How long does historic telemetry data need to be retained?",
          ],
        };
      }
    } else {
      if (isArabic) {
        result = {
          summary: `مواصفة معمارية شاملة لتطبيق ويب متكامل وقابل للتوسع وموثوق الأداء مخصصة لـ: "${sanitizedPrompt.slice(0, 80)}..."`,
          recommendedArchitecture: {
            frontend: "واجهات Next.js App Router مع TypeScript ونظام تصميم متقن بتيلويند",
            backend: "خدمات مصغرة Node.js مع تحقق صارم من صحة عقود البيانات عبر Zod",
            database: "قاعدة PostgreSQL مع تجمع اتصالات آمن وفهرسة علائقية محسنة",
            aiComponents: "أتمتة المهام الذكية والبحث الدلالي في بيانات التطبيق",
            hosting: "استضافة سحابية على الحافة مع خطوط أنابيب CI/CD مؤتمتة بالكامل",
          },
          keyMilestones: [
            { phase: "المرحلة الأولى (الأسبوع 1-2)", deliverables: "التوصيف التقني وتوحيد عناصر التصميم وهيكلة قاعدة البيانات" },
            { phase: "المرحلة الثانية (الأسبوع 3-5)", deliverables: "بناء الميزات البرمجية والمصادقة الأمنية ومسارات العمل الرئيسية" },
            { phase: "المرحلة الثالثة (الأسبوع 6)", deliverables: "تدقيق الأداء والحماية وإطلاق النسخة الإنتاجية الأولى" },
          ],
          technicalRisks: [
            "غموض نطاق العمل وتضخمه (يُعالج بمراحل تسليم مجزأة وإطلاق MVP سريع)",
          ],
          suggestedQuestions: [
            "ما هي مؤشرات الأداء والتحويل الرئيسية المطلوبة من التطبيق؟",
            "هل توجد واجهات برمجية خارجية أو قواعد بيانات سابقة تتطلب الربط والمزامنة؟",
          ],
        };
      } else {
        result = {
          summary: `Scalable full-stack application architecture specification for: "${sanitizedPrompt.slice(0, 80)}..."`,
          recommendedArchitecture: {
            frontend: "Next.js App Router with TypeScript and Tailwind CSS design system",
            backend: "Modular API routes or Node.js microservices with Zod contract validation",
            database: "PostgreSQL with connection pooling and relational indexing",
            aiComponents: "Task automation & smart contextual search integration",
            hosting: "Edge-routed container hosting with automated CI/CD deployment",
          },
          keyMilestones: [
            { phase: "Phase 1 (Week 1-2)", deliverables: "Technical specification, UI design tokens, and core database migrations" },
            { phase: "Phase 2 (Week 3-5)", deliverables: "Full-stack feature engineering, authentication, and core business workflows" },
            { phase: "Phase 3 (Week 6)", deliverables: "Performance profiling, security review, and production launch" },
          ],
          technicalRisks: [
            "Scope ambiguity (mitigated by strict phased milestones and early MVP delivery)",
          ],
          suggestedQuestions: [
            "What are the primary business conversions expected from the application?",
            "Are there existing third-party APIs or legacy databases that need integration?",
          ],
        };
      }
    }

    // Create ReadableStream for Server-Sent Events
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (event: AiScopeStreamEvent) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        };

        try {
          // 1. Initial reasoning status
          const phase1Msg = isArabic 
            ? "تحليل المتطلبات وتفكيك قصد الاستعلام..." 
            : "Decomposing query intent & domain constraints...";
          sendEvent({ type: "status", message: phase1Msg });
          await sleep(150);

          // 2. Secondary architectural synthesis status
          const phase2Msg = isArabic
            ? "تحديد معمارية البيانات والخدمات السحابية وميزانية التأخير..."
            : "Synthesizing data tier, services & latency budget...";
          sendEvent({ type: "status", message: phase2Msg });
          await sleep(150);

          // 3. Stream summary tokens in real-time
          const words = result.summary.split(/(\s+)/);
          for (const word of words) {
            sendEvent({ type: "token", token: word });
            // Micro-delay between tokens for realistic streaming pacing (18ms)
            await sleep(18);
          }

          await sleep(80);

          // 4. Send complete structured payload
          sendEvent({ type: "complete", result });

          // 5. Send SSE termination signal
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err: unknown) {
          const errMsg = err instanceof Error ? err.message : "Stream processing error";
          sendEvent({ type: "error", message: errMsg });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("AI Scope API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate project scope analysis." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
