import { Project, CaseStudy, EngineeringProofItem, ServiceItem, LabExperiment } from './types';

export const SITE_METADATA = {
  name: "Mohamed Ahmed Badra",
  brand: "BADRA",
  positioning: {
    en: "Full-Stack Developer · AI Engineer · Digital Product Builder",
    ar: "مطور برمجيات شامل · مهندس ذكاء اصطناعي · مصمم منتجات رقمية",
  },
  coreStatement: {
    en: "I build digital products that solve real problems.",
    ar: "أبني منتجات رقمية متكاملة تحل مشكلات حقيقية.",
  },
  location: {
    en: "Remote / Global",
    ar: "العمل عن بُعد / متاح عالمياً",
  },
  availability: {
    en: "Available for High-Impact Projects & Senior Engineering Roles",
    ar: "متاح للمشاريع المتقدمة والأدوار الهندسية البارزة",
  },
  contact: {
    email: "contact@badra.dev",
    github: "https://github.com/badra-dev",
    linkedin: "https://linkedin.com/in/badra-dev",
    whatsapp: "https://wa.me/201000000000",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "omniflow-rag",
    slug: "omniflow-rag",
    title: {
      en: "OmniFlow AI Knowledge Orchestrator",
      ar: "منصة OmniFlow لتنظيم المعرفة الذكية",
    },
    tagline: {
      en: "Hybrid RAG engine with multi-agent query decomposition and vector routing.",
      ar: "محرك استرجاع معرفي هجين مدعوم بوكلاء أذكياء وتوجيه متجهات دقيق.",
    },
    category: "ai",
    categoryLabel: {
      en: "AI & Retrieval Systems",
      ar: "أنظمة الذكاء الاصطناعي والاسترجاع",
    },
    featured: true,
    status: "production",
    technologies: ["Next.js 16", "TypeScript", "FastAPI", "pgvector", "Redis", "LangChain", "Tailwind CSS"],
    problem: {
      en: "Standard naive vector search frequently returned hallucinations and missed cross-document context in complex technical domain documentation.",
      ar: "البحث الدلالي التقليدي كان يعاني من الهلوسة وفقدان السياق عند التعامل مع وثائق تقنية معقدة متعددة الأقسام.",
    },
    solution: {
      en: "Engineered a hybrid retrieval pipeline combining reciprocal rank fusion (BM25 + dense embeddings) with an autonomous query-planning agent that breaks queries into structured sub-intents.",
      ar: "بناء مسار استرجاع هجين يجمع بين خوارزميات BM25 والتضمينات الدلالية مع وكيل ذكي يحلل الاستفسارات المركبة إلى أهداف فرعية منظمة.",
    },
    architecture: {
      en: "Next.js App Router frontend communicating via Server-Sent Events to a Python FastAPI backend. Async chunk embeddings stored in PostgreSQL with pgvector, indexed via HNSW, with hot-query caching in Redis.",
      ar: "واجهة Next.js App Router متصلة عبر تقنية SSE بخلفية FastAPI. تضمينات غير متزامنة مخزنة في PostgreSQL عبر pgvector مع فهرسة HNSW وذاكرة مؤقتة Redis.",
    },
    challenges: {
      en: "Balancing vector search latency with deep re-ranking accuracy. Resolved by implementing a 2-stage tier: fast top-50 candidate retrieval followed by cross-encoder re-ranking for top-5.",
      ar: "الموازنة بين سرعة البحث الدلالي ودقة إعادة الترتيب. حُلت عبر معمارية ثنائية: تصفية سريعة لأفضل 50 نتيجة ثم إعادة ترتيب دقيقة لأفضل 5.",
    },
    outcome: {
      en: "Reduced context hallucination rates significantly while maintaining sub-400ms end-to-end first-token streaming latency on self-hosted inference.",
      ar: "تقليل معدلات الهلوسة المعرفية بشكل جذري مع الحفاظ على زمن استجابة للبث أقل من 400 مللي ثانية للرمز الأول.",
    },
    hasCaseStudy: true,
    demoUrl: "#lab",
    repoUrl: "https://github.com/badra-dev",
  },
  {
    id: "nexus-pulse",
    slug: "nexus-pulse",
    title: {
      en: "NexusPulse Real-Time Telemetry & Edge Monitor",
      ar: "منصة NexusPulse لمراقبة المقاييس اللحظية",
    },
    tagline: {
      en: "Ultra-fast distributed system telemetry engine with WebSocket streaming.",
      ar: "محرك لمراقبة الأنظمة الموزعة عالي السرعة مدعوم ببث WebSocket فوري.",
    },
    category: "systems",
    categoryLabel: {
      en: "Systems & Infrastructure",
      ar: "الأنظمة والبنية التحتية",
    },
    featured: true,
    status: "production",
    technologies: ["React 19", "TypeScript", "Node.js", "WebSockets", "TimescaleDB", "Tailwind CSS"],
    problem: {
      en: "Legacy dashboard polled HTTP endpoints every 3 seconds, leading to excessive database contention and visual lag during traffic surges.",
      ar: "لوحة التحكم السابقة كانت تعتمد على استعلامات دورية كل 3 ثوانٍ مما سبب ضغطاً شديداً على قاعدة البيانات وتأخراً في الرؤية اللحظية.",
    },
    solution: {
      en: "Architected a dual-channel pub/sub pipeline with WebSocket broadcast for active visualizers and buffer aggregation for timeseries persistence.",
      ar: "تصميم مسار نشر واشتراك مزدوج يبث المقاييس مباشرة للمتصفحات النشطة عبر WebSockets مع تجميع دفعات البيانات لقاعدة التايم سيريز.",
    },
    architecture: {
      en: "Stateless Node.js WebSocket cluster behind HAProxy, feeding live telemetry directly into canvas/SVG renderers without React DOM re-render thrashing.",
      ar: "عنقود Node.js بدون حالة خلف موازن أحمال، يضخ البيانات مباشرة لمخرجات الرسم البياني دون استهلاك مفرط لإعادة تصيير React.",
    },
    challenges: {
      en: "Browser UI freezing during 1,000+ metrics/sec bursts. Solved using requestAnimationFrame throttlers and Web Workers for metric parsing off the main thread.",
      ar: "تجمد واجهة المتصفح عند تدفق أكثر من ألف مقياس في الثانية. تم حلها بنقل المعالجة إلى Web Workers مع مزامنة الرسوم عبر requestAnimationFrame.",
    },
    outcome: {
      en: "Maintained consistent 60fps chart rendering under sustained 5k msgs/sec ingest with near-zero database polling load.",
      ar: "الحفاظ على معدل 60 إطاراً في الثانية أثناء معالجة 5000 رسالة بالثانية دون أي استعلام دوري غير ضروري.",
    },
    hasCaseStudy: true,
    demoUrl: "#lab",
    repoUrl: "https://github.com/badra-dev",
  },
  {
    id: "cogni-commerce",
    slug: "cogni-commerce",
    title: {
      en: "CogniCommerce Modular E-Commerce Platform",
      ar: "منصة CogniCommerce للتجارة الرقمية المعيارية",
    },
    tagline: {
      en: "High-performance headless commerce with sub-second page transitions and AI product discovery.",
      ar: "منصة تجارة إلكترونية مفصولة فائقة السرعة مع تنقل فوري واكتشاف ذكي للمنتجات.",
    },
    category: "fullstack",
    categoryLabel: {
      en: "Full-Stack & E-Commerce",
      ar: "تطوير شامل وتجارة إلكترونية",
    },
    featured: true,
    status: "production",
    technologies: ["Next.js App Router", "TypeScript", "PostgreSQL", "Supabase", "Stripe API", "Zustand"],
    problem: {
      en: "Monolithic storefront experienced poor Core Web Vitals (LCP > 3.4s) and high mobile drop-off on international connections.",
      ar: "المتجر السابق عانى من بطء تحميل كبير (LCP تجاوز 3.4 ثانية) ومعدل ارتداد مرتفع للمستخدمين عبر الهواتف النقالة.",
    },
    solution: {
      en: "Engineered a headless storefront leveraging Next.js Incremental Static Regeneration (ISR), optimized edge image transformation, and resilient optimistic client state.",
      ar: "بناء واجهة مفصولة تستفيد من إعادة التوليد الثابت التدريجي (ISR) في Next.js ومعالجة الصور عبر شبكات التوزيع وحالات تفاعلية استباقية.",
    },
    architecture: {
      en: "Edge-cached static pages with on-demand revalidation on inventory changes. Server Actions for secure payment sessions with Stripe and localized webhook reconciliation.",
      ar: "صفحات مخزنة على خوادم الحافة مع تحديث فوري عند تغير المخزون. استخدام Server Actions لتأمين عمليات الدفع وحل تناقضات Webhooks.",
    },
    challenges: {
      en: "Handling cart state synchronization between guest sessions and authenticated users without server roundtrip latency. Solved via signed cryptographically verified local sessions.",
      ar: "مزامنة سلة المشتريات بين المستخدمين المجهولين والمسجلين دون تأخير الشبكة، ونفذت عبر جلسات محلية موثعة رقمياً.",
    },
    outcome: {
      en: "Achieved perfect 98+ Lighthouse Performance scores, 0.6s LCP, and a seamless bilingual checkout experience.",
      ar: "تحقيق درجة أداء 98+ في مؤشرات Lighthouse وزمن LCP يبلغ 0.6 ثانية مع تجربة دفع ثنائية اللغة فائقة السلاسة.",
    },
    hasCaseStudy: true,
    demoUrl: "#projects",
    repoUrl: "https://github.com/badra-dev",
  },
  {
    id: "bilingual-dochub",
    slug: "bilingual-dochub",
    title: {
      en: "Bilingual Semantic DocHub & Knowledge Base",
      ar: "مركز التوثيق الدلالي ثنائي اللغة",
    },
    tagline: {
      en: "Cross-lingual Arabic/English technical documentation portal with native RTL typography.",
      ar: "بوابة توثيق تقنية متكاملة تدعم البحث الدلالي العربي/الإنجليزي مع خطوط RTL متقنة.",
    },
    category: "web",
    categoryLabel: {
      en: "Web & Documentation Systems",
      ar: "أنظمة الويب والتوثيق",
    },
    featured: false,
    status: "completed",
    technologies: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "FlexSearch"],
    problem: {
      en: "Documentation systems treat Arabic as an afterthought, causing broken bidirectional code blocks and disjointed search tokenization.",
      ar: "أنظمة التوثيق الشائعة تعامل اللغة العربية كإضافة ثانوية، مما يسبب تشوه الكتل البرمجية وعدم دقة البحث في الكلمات العربية.",
    },
    solution: {
      en: "Built a ground-up documentation system with custom Arabic morphological root stemming, bidirectional code isolation, and lightning-fast client indexing.",
      ar: "تصميم محرك توثيق من الصفر مع تجذير الكلمات العربية، وفصل اتجاه الأسطر البرمجية بدقة، وفهرسة فورية في المتصفح.",
    },
    architecture: {
      en: "Statically compiled MDX AST pipelines with syntax highlighting that preserves LTR code indentation inside RTL layouts without CSS layout shifts.",
      ar: "معالجة ثابتة لملفات MDX مع تلوين شفرات البرمجة بما يحفظ اتجاه الكود الإنجليزي داخل التخطيط العربي دون أي اهتزاز بصري.",
    },
    challenges: {
      en: "Handling Arabic punctuation marks in mixed English/Arabic technical terminology without CSS bidi bleed.",
      ar: "ضبط علامات الترقيم والمصطلحات التقنية المختلطة دون حدوث تشويه في ترتيب النصوص ثنائية الاتجاه.",
    },
    outcome: {
      en: "Zero-dependency client search delivering instantaneous query results in under 12ms across 2,000+ indexed documentation pages.",
      ar: "بحث فوري بدون تبعيات خارجية يعرض النتائج في أقل من 12 مللي ثانية عبر أكثر من ألفي صفحة توثيق.",
    },
    hasCaseStudy: false,
    demoUrl: "#projects",
    repoUrl: "https://github.com/badra-dev",
  },
  {
    id: "dev-agent-reviewer",
    slug: "dev-agent-reviewer",
    title: {
      en: "DevPulse Code Review & AST Analysis Agent",
      ar: "وكيل فحص الكود والتحليل البنيوي DevPulse",
    },
    tagline: {
      en: "Automated static analysis and security regression assistant for TypeScript and Python.",
      ar: "مساعد آلي للتحليل الساكن واكتشاف الثغرات الأمنية في مشاريع TypeScript و Python.",
    },
    category: "ai",
    categoryLabel: {
      en: "Developer Tools & AI",
      ar: "أدوات المطورين والذكاء الاصطناعي",
    },
    featured: false,
    status: "active-rd",
    technologies: ["TypeScript", "Tree-sitter", "Docker", "Node.js", "GitHub API"],
    problem: {
      en: "Manual code reviews spend excessive time on repetitive pattern errors and missing security validations instead of architectural evaluation.",
      ar: "المراجعات اليدوية تستهلك وقتاً طويلاً في تدقيق الأخطاء النمطية المتكررة بدلاً من التركيز على القرارات المعمارية الهامة.",
    },
    solution: {
      en: "Developed an AST-aware agent that parses pull request diffs, checks semantic boundaries, and flags anti-patterns before human review.",
      ar: "تطوير وكيل يفهم شجرة البنية المجردة (AST) لفحص الفروقات البرمجية وتنبيه المطورين للممارسات الضعيفة قبل المراجعة البشرية.",
    },
    architecture: {
      en: "Isolated container sandbox running tree-sitter AST queries with local LLM verification for contextual diff explanations.",
      ar: "بيئة حاويات معزولة تفحص شجرة الكود مع نموذج محلي لشرح التعديلات وتقديم توصيات دقيقة.",
    },
    challenges: {
      en: "Preventing false positives on intentional idiomatic exceptions. Solved using AST node scope tracking rather than simple regex matching.",
      ar: "تجنب التنبيهات الخاطئة في الاستثناءات البرمجية المقصودة عبر تتبع نطاق المتغيرات والوظائف بدقة.",
    },
    outcome: {
      en: "Active R&D project demonstrating AST-assisted linting with deep contextual explanations.",
      ar: "مشروع بحث وتطوير نشط يبرهن على تكامل التحليل البنيوي مع نماذج الذكاء الاصطناعي لرفع كفاءة مراجعة الكود.",
    },
    hasCaseStudy: false,
    demoUrl: "#lab",
    repoUrl: "https://github.com/badra-dev",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-omniflow",
    projectId: "omniflow-rag",
    title: {
      en: "Architecting a Resilient Multi-Agent RAG Pipeline with Deterministic Grounding",
      ar: "تصميم مسار استرجاع معرفي متعدد الوكلاء مدعوم بتحقق قطعي",
    },
    overview: {
      en: "How we tackled knowledge hallucination and retrieval latency in enterprise technical documentation by separating query planning from vector execution.",
      ar: "كيف قمنا بحل معضلات الهلوسة المعرفية وبطء الاسترجاع في التوثيق التقني عبر فصل تخطيط الاستعلام عن التنفيذ المتجهي.",
    },
    context: {
      en: "Engineering teams required an intelligent documentation assistant capable of answering complex architectural queries across dozens of microservice specifications. Standard embeddings failed on domain-specific acronyms and cross-repository dependencies.",
      ar: "احتاجت الفرق الهندسية إلى مساعد ذكي قادر على الإجابة عن أسئلة معمارية مركبة عبر مواصفات العديد من الخدمات المصغرة، حيث فشل البحث التقليدي في فهم المصطلحات المتخصصة.",
    },
    problemStatement: {
      en: "Naive top-k vector similarity returned fragmented paragraphs without context. Large language models attempted to fill informational gaps with plausible-sounding hallucinations.",
      ar: "البحث السطحي بالمقارنة المتجهية كان يعيد فقرات مجزأة بدون سياق مترابط، مما دفع النماذج اللغوية لاختلاق تفاصيل غير موجودة بالوثائق الأصلية.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Query Intent Decomposition", ar: "تفكيك قصد الاستعلام" },
        desc: {
          en: "A lightweight classifier classifies the user intent into single-fact lookup, cross-service dependency, or architectural summary. It decomposes multi-part questions into discrete search operations.",
          ar: "مصنف فائق السرعة يحدد نية المستخدم (بحث عن حقيقة مفردة، علاقات بين خدمات، ملخص معماري) ويجزئ الاستفسار لمهام بحثية مستقلة.",
        },
      },
      {
        step: "02",
        title: { en: "Hybrid Fusion Retrieval", ar: "الاسترجاع الهجين المدمج" },
        desc: {
          en: "Parallel execution of sparse BM25 keyword search and dense text-embedding-3-small vector search, merged using Reciprocal Rank Fusion (RRF with k=60).",
          ar: "تنفيذ متزامن للبحث الدلالي اللفظي (BM25) والبحث المتجهي، مدمجين باستخدام خوارزمية دمج الرتب التبادلية (RRF).",
        },
      },
      {
        step: "03",
        title: { en: "Context Window Packing & Citation Anchor", ar: "حزم السياق وتثبيت المراجع" },
        desc: {
          en: "Retrieved chunks are deduplicated, bounded by token budget, and injected into the system prompt with deterministic file/line citations.",
          ar: "تصفية الفقرات وحزمها حسب سعة الرموز المتاحة مع ربط كل حقيقة بمسار الملف ورقم السطر الأصلي بدقة متناهية.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "PostgreSQL pgvector over standalone vector SaaS",
          ar: "استخدام PostgreSQL مع pgvector بدلاً من خدمات المتجهات السحابية المنفصلة",
        },
        rationale: {
          en: "Eliminated network egress hops, maintained strict relational foreign-key consistency between documents and embeddings, and simplified transactional backups.",
          ar: "تجنب تأخير الشبكة الخارجي والحفاظ على العلاقات والترابط بين الوثائق والتضمينات، مع تبسيط النسخ الاحتياطي في قاعدة واحدة.",
        },
      },
      {
        decision: {
          en: "Chunk size of 512 tokens with 128 token overlap",
          ar: "حجم مقطع 512 رمزاً مع تداخل 128 رمزاً",
        },
        rationale: {
          en: "Benchmarking revealed 512 tokens retained full function definitions in codebases without splitting critical logical scopes.",
          ar: "أثبتت التجارب أن 512 رمزاً تحتفظ بالتعريفات البرمجية الكاملة للوظائف دون كسر النطاق المنطقي للأكواد.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "High cold-start latency on vector queries when embedding models were re-initialized.",
          ar: "بطء الاستجابة الأولى عند إعادة تهيئة نماذج التضمين في الذاكرة.",
        },
        resolution: {
          en: "Implemented an in-memory worker pool with pre-warmed embeddings cache and async fallback queues.",
          ar: "إنشاء مجمع عمال في الذاكرة مع تجهيز مسبق لنماذج التضمين وقوائم انتظار غير متزامنة.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Eliminated unsupported hallucinations by 92% in blind evaluation sets; first-token streaming achieved under 380ms.",
      ar: "خفض الإجابات غير الموثقة بنسبة 92% في اختبارات التقييم المزدوج، مع زمن تدفق للرمز الأول يقل عن 380 مللي ثانية.",
    },
    lessonsLearned: {
      en: "Data preparation and chunking boundaries dictate 80% of RAG quality. Sophisticated prompt engineering cannot compensate for noisy retrieval chunks.",
      ar: "جودة تحضير البيانات وتقسيم المقاطع تمثل 80% من نجاح الاسترجاع؛ لا يمكن لأي هندسة أوامر تعويض فقرات غير دقيقة.",
    },
  },
  {
    id: "cs-nexus",
    projectId: "nexus-pulse",
    title: {
      en: "NexusPulse — Real-Time Telemetry & Edge Monitoring Architecture",
      ar: "NexusPulse — معمارية القياس عن بُعد والمراقبة اللحظية على الخوادم الطرفية",
    },
    overview: {
      en: "Eliminating UI thrash when streaming thousands of metrics per second through architectural decoupling of WebSocket parsing and canvas rendering.",
      ar: "القضاء التام على بطء واجهة المستخدم عند معالجة آلاف المقاييس بالثانية عبر فصل استقبال البيانات عن محرك الرسم.",
    },
    context: {
      en: "Operating a cluster of edge nodes required real-time visibility into CPU, memory, socket connections, and request latency. Previous tools lagged seconds behind reality.",
      ar: "إدارة عنقود من خوادم الحافة تطلبت مراقبة حية لاستهلاك المعالجات والذاكرة وحركة الشبكة، حيث كانت الحلول السابقة تتأخر لعدة ثوانٍ.",
    },
    problemStatement: {
      en: "Pushing raw WebSocket payloads directly into React component state caused hundreds of re-renders per second, locking the main thread and triggering browser crash warnings.",
      ar: "تمرير بيانات WebSocket مباشرة لحالة مكونات React أدى لمئات عمليات إعادة التصيير في الثانية وتجميد خيط المعالجة الرئيسي للمتصفح.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Offloading to Web Workers", ar: "ترحيل المعالجة لعمال الويب" },
        desc: {
          en: "Incoming binary WebSocket frames are parsed and aggregated inside a dedicated background Web Worker, protecting the main UI thread.",
          ar: "فك تشفير البيانات الثنائية وتجميعها داخل Web Worker يعمل في الخلفية دون المساس باستجابة الواجهة.",
        },
      },
      {
        step: "02",
        title: { en: "Circular Ring Buffer in Shared Memory", ar: "ذاكرة حلقية للمقاييس السريعة" },
        desc: {
          en: "Metrics are stored in fixed-size typed arrays acting as circular ring buffers, preventing JavaScript garbage collection pauses.",
          ar: "تخزين القياسات في مصفوفات محددة النوع تعمل كذاكرة حلقية ثابتة لتفادي توقفات جامع القمامة في JavaScript.",
        },
      },
      {
        step: "03",
        title: { en: "Direct Canvas 2D/WebGL Blitting", ar: "الرسم المباشر على Canvas" },
        desc: {
          en: "The rendering loop synchronizes with requestAnimationFrame, reading the buffer state without passing objects through React props.",
          ar: "مزامنة حلقة الرسم مع معدل تحديث الشاشة وقراءة البيانات مباشرة دون تمرير كائنات ثقيلة عبر خصائص React.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "Typed Arrays over JavaScript Object Arrays",
          ar: "استخدام المصفوفات الرقمية Typed Arrays بدلاً من كائنات JS",
        },
        rationale: {
          en: "Pre-allocated Float32Arrays completely removed memory fragmentation and reduced memory footprint by 84%.",
          ar: "المصفوفات المحجوزة مسبقاً منعت تجزئة الذاكرة وخفضت استهلاك الذاكرة الإجمالي بنسبة 84%.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Network packet loss causing visual charting stutter on unstable cellular connections.",
          ar: "فقدان حزم البيانات مسبباً تقطعاً في الرسم البياني على الشبكات اللاسلكية الضعيفة.",
        },
        resolution: {
          en: "Implemented cubic bezier client-side metric interpolation that smoothly connects gaps between delayed packets.",
          ar: "تطبيق خوارزمية استكمال حركي انسيابي تسد الفجوات المؤقتة بين الحزم المتأخرة بانسيابية تامة.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Stable 60 FPS visual rendering maintained under 5,000 telemetry messages/second on mid-tier hardware.",
      ar: "معدل ثابت 60 إطاراً بالثانية أثناء تدفق 5000 رسالة مقاييس بالثانية على أجهزة متوسطة المواصفات.",
    },
    lessonsLearned: {
      en: "React is exceptional for application state and layouts, but high-frequency time-series rendering belongs in direct Canvas/Worker pipelines.",
      ar: "React رائع لإدارة التطبيقات والتخطيط، لكن الرسوم البيانية فائقة التردد مكانها الصحيح هو Canvas وعمال الويب المباشرين.",
    },
  },
  {
    id: "cs-cogni",
    projectId: "cogni-commerce",
    title: {
      en: "Zero-Layout-Shift Bilingual Headless Architecture with Sub-Second Transitions",
      ar: "معمارية تجارة رقمية ثنائية اللغة بانتقالات فورية ودون أي اهتزاز بصري",
    },
    overview: {
      en: "Building an e-commerce experience with instantaneous page changes, strict RTL/LTR typographic fidelity, and resilient checkout flows.",
      ar: "بناء منصة تجارة إلكترونية بتنقل فوري، ودقة تامة في التخطيط العربي والإنجليزي، وتأمين مسار الدفع ضد الانقطاعات.",
    },
    context: {
      en: "The client needed a modern digital storefront catering to both Middle Eastern (Arabic RTL) and international (English LTR) luxury consumers, where every 100ms delay cost conversions.",
      ar: "المتجر يستهدف عملاء في الشرق الأوسط (عربي RTL) وعالمياً (إنجليزي LTR)، حيث يمثل كل تأخير بمقدار 100 مللي ثانية خسارة مباشرة للمبيعات.",
    },
    problemStatement: {
      en: "Existing platform suffered from layout jumps when switching languages, poor mobile cache hits, and fragile third-party payment redirection hooks.",
      ar: "الموقع القديم كان يعاني من تشوه التخطيط عند تبديل اللغة، وبطء التخزين المؤقت، وهشاشة إعادة التوجيه لبوابات الدفع.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Edge Static Generation with On-Demand Revalidation", ar: "توليد ثابت عند الحافة مع إعادة تحقق لحظية" },
        desc: {
          en: "Catalog pages pre-rendered at the edge, invalidating only specific product slugs upon stock mutation events via secure webhooks.",
          ar: "توليد مسبق لصفحات المنتجات على خوادم الحافة، مع تحديث المتبقي من المخزون فورياً عند الشراء عبر Webhooks آمنة.",
        },
      },
      {
        step: "02",
        title: { en: "Dual-Directional Design System", ar: "نظام تصميم ثنائي الاتجاه" },
        desc: {
          en: "CSS logical properties (margin-inline, inset-inline) coupled with dedicated font fallbacks for IBM Plex Sans Arabic and Geist Sans.",
          ar: "الاعتماد على الخصائص المنطقية في CSS لضمان تناسق الهوامش والاتجاهات تلقائياً مع خطوط مخصصة لكلتا اللغتين.",
        },
      },
      {
        step: "03",
        title: { en: "Optimistic Cart & Server Action Settlement", ar: "سلة تسوق تفاعلية استباقية" },
        desc: {
          en: "Immediate UI cart mutation with background cryptographically signed session verification, preventing payment discrepancies.",
          ar: "تحديث فوري لواجهة السلة مع تحقق خلفي موثق رقمياً لمنع أي تلاعب بالأسعار أو الكميات قبل توجيه الدفع.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "CSS Logical Properties over Directional Utility Duplication",
          ar: "الخصائص المنطقية في CSS بدلاً من مضاعفة فئات التنسيق",
        },
        rationale: {
          en: "Reduced CSS bundle size by 38% and eliminated visual flickers during instant language toggling.",
          ar: "تقليل حجم ملفات CSS بنسبة 38% ومنع أي وميض بصري عند التبديل الفوري بين اللغتين.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Stripe Webhook drops during high concurrency flash sales.",
          ar: "فقدان إشعارات الدفع (Webhooks) أثناء طفرات الشراء المفاجئة.",
        },
        resolution: {
          en: "Engineered an idempotent queue worker with exponential backoff and replay auditing.",
          ar: "بناء معالج رسائل ذي معالجة متطابقة النتائج (Idempotent) مع إعادة محاولة ذكية وسجل تدقيق.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Largest Contentful Paint dropped from 3.4s to 0.6s. Zero layout shifts (CLS: 0.00) recorded in production across Arabic and English.",
      ar: "انخفض زمن LCP من 3.4 ثانية إلى 0.6 ثانية، مع تحقيق معدل اهتزاز بصري صفري تماماً (CLS: 0.00) في كلا الاتجاهين.",
    },
    lessonsLearned: {
      en: "RTL design is not a CSS hack; treating bidirectional layouts as first-class architectural constraints results in superior UX for all users.",
      ar: "دعم العربية ليس مجرد تعديل شكلي؛ بل معيار معماري أصيل يؤدي عند مراعاته منذ البداية إلى متانة هندسية فائقة.",
    },
  },
];

export const ENGINEERING_PROOFS: EngineeringProofItem[] = [
  {
    id: "proof-nextjs",
    technology: "Next.js (App Router)",
    category: "frontend",
    role: {
      en: "Full-Stack Web Architecture",
      ar: "معمارية تطبيقات الويب المتكاملة",
    },
    realUsage: {
      en: "Server Components, Server Actions for secure mutations, Streaming SSR, and Parallel/Intercepting Routes.",
      ar: "مكونات الخادم، وعمليات الخادم الآمنة، والبث اللحظي للواجهات، والتوجيه المتوازي المعزول.",
    },
    associatedProject: "OmniFlow RAG & CogniCommerce",
    architecturalNote: {
      en: "Zero client bundle weight for static views; fast progressive hydration.",
      ar: "حجم حزمة عميل صفري للمشاهد الثابتة، مع ترطيب تدريجي فائق السرعة.",
    },
  },
  {
    id: "proof-typescript",
    technology: "TypeScript (Strict)",
    category: "frontend",
    role: {
      en: "Type Safety & Contracts",
      ar: "الأمان النوعي والعقود البرمجية",
    },
    realUsage: {
      en: "Generic API contract interfaces, Zod schema validation at runtime boundaries, branded types for IDs.",
      ar: "واجهات برمجية عامة، والتحقق من البيانات عند الحدود عبر Zod، وأنواع مخصصة للمعرفات.",
    },
    associatedProject: "All Production Repositories",
    architecturalNote: {
      en: "100% strict mode enabled. No 'any' escape hatches in business logic.",
      ar: "تفعيل الوضع الصارم 100% دون استخدام أي تجاوزات غير آمنة.",
    },
  },
  {
    id: "proof-ai",
    technology: "AI & Vector Search (pgvector, Embeddings)",
    category: "ai",
    role: {
      en: "Intelligent Retrieval & LLM Systems",
      ar: "الاسترجاع الذكي ونظم النماذج اللغوية",
    },
    realUsage: {
      en: "Hybrid BM25 + dense embedding search, token budgeting, multi-agent tool calling, deterministic context injection.",
      ar: "البحث الهجين اللفظي والدلالي، وإدارة ميزانية الرموز، واستدعاء الأدوات للوكلاء، وتثبيت السياق.",
    },
    associatedProject: "OmniFlow RAG Engine",
    architecturalNote: {
      en: "HNSW index partitioning on PostgreSQL for sub-50ms vector queries on 100k+ chunks.",
      ar: "فهرسة HNSW على PostgreSQL لتنفيذ استعلامات المتجهات في أقل من 50 مللي ثانية.",
    },
  },
  {
    id: "proof-backend",
    technology: "Node.js & FastAPI (Python)",
    category: "backend",
    role: {
      en: "High-Throughput Microservices & APIs",
      ar: "الخدمات المصغرة والواجهات البرمجية السريعة",
    },
    realUsage: {
      en: "Async streaming endpoints, WebSocket connection clusters, idempotent webhook handlers, rate-limiting middlewares.",
      ar: "نقاط نهاية البث غير المتزامنة، وإدارة اتصالات WebSockets، ومعالجات Webhooks الآمنة، ومحددات معدل الطلبات.",
    },
    associatedProject: "NexusPulse & OmniFlow",
    architecturalNote: {
      en: "Non-blocking event loop utilization; heavy compute delegated to background queues.",
      ar: "استثمار حلقة الأحداث غير المعطلة ونقل العمليات الثقيلة إلى طوابير المعالجة الخلفية.",
    },
  },
  {
    id: "proof-db",
    technology: "PostgreSQL & Redis",
    category: "database",
    role: {
      en: "Relational Persistence & Caching",
      ar: "قواعد البيانات العلائقية والتخزين المؤقت",
    },
    realUsage: {
      en: "Row-Level Security (RLS), atomic transactions, Redis sliding-window rate limiters, pub/sub message brokers.",
      ar: "أمان على مستوى الصفوف (RLS)، ومعاملات ذرية، ومحددات طلبات بالنافذة المنزلقة، ووسطاء رسائل.",
    },
    associatedProject: "CogniCommerce & OmniFlow",
    architecturalNote: {
      en: "Strict normalization with targeted denormalization for hot read paths.",
      ar: "هيكلة قياسية متقنة مع تفكيك مدروس للمسارات شديدة القراءة لسرعة الوصول.",
    },
  },
  {
    id: "proof-infra",
    technology: "Docker & Edge CDNs",
    category: "infra",
    role: {
      en: "Containerization & Global Delivery",
      ar: "بيئات الحاويات والتوزيع الجغرافي",
    },
    realUsage: {
      en: "Multi-stage Docker builds (<120MB final images), edge headers configuration, cache invalidation hooks.",
      ar: "بناء حاويات Docker متعدد المراحل بحجم يقل عن 120 ميجابايت، وضبط ترويسات الحافة والتخزين.",
    },
    associatedProject: "Production Deployments",
    architecturalNote: {
      en: "Immutable artifacts built with zero devDependencies in production runtime.",
      ar: "حزم غير قابلة للتغيير خالية من أي تبعيات تطوير في بيئة التشغيل الفعلية.",
    },
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "web-apps",
    icon: "Layout",
    title: {
      en: "High-Performance Web Applications",
      ar: "تطبيقات الويب فائقة الأداء",
    },
    summary: {
      en: "Production-ready, highly responsive web products engineered with modern frameworks and resilient architectures.",
      ar: "منتجات وتطبيقات ويب جاهزة للإنتاج، سريعة الاستجابة ومبنية بأحدث الأطر والمعماريات البرمجية المتينة.",
    },
    problemSolved: {
      en: "Slow legacy stacks, poor user retention caused by laggy interactions, fragile state management, and maintenance debt.",
      ar: "بطء الأنظمة القديمة، وفقدان المستخدمين بسبب بطء التفاعل، وهشاشة إدارة البيانات وتراكم الديون التقنية.",
    },
    solutionApproach: {
      en: "Architecting clean Next.js/React applications with strong TypeScript contracts, fast server rendering, and zero-compromise UX.",
      ar: "بناء تطبيقات Next.js و React بمعايير صارمة في الأمان البرمجي وتصيير سريع وتجربة مستخدم لا تقبل المساومة.",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    deliverables: {
      en: [
        "Full-stack web application with responsive layout",
        "Clean, modular codebase with TypeScript typing",
        "Authentication & role-based authorization",
        "Performance optimization (Core Web Vitals > 90)",
        "CI/CD deployment pipeline setup",
      ],
      ar: [
        "تطبيق ويب متكامل الواجهات ومتجاوب مع جميع الشاشات",
        "شفرة برمجية معيارية ونظيفة بأعلى درجات الأمان النوعي",
        "نظام مصادقة وتفويض مستخدمين متعدد الأدوار",
        "تحسين شامل للأداء ومؤشرات Core Web Vitals > 90",
        "إعداد مسار النشر التلقائي المستمر CI/CD",
      ],
    },
    typicalTimeline: {
      en: "3 – 6 Weeks",
      ar: "3 – 6 أسابيع",
    },
  },
  {
    id: "ai-systems",
    icon: "Cpu",
    title: {
      en: "AI Engineering & Retrieval Systems",
      ar: "أنظمة الذكاء الاصطناعي والاسترجاع الذكي",
    },
    summary: {
      en: "Custom RAG pipelines, autonomous workflows, and intelligent assistants connected securely to proprietary data.",
      ar: "مسارات استرجاع معرفي مخصصة (RAG)، ووكلاء أذكياء، ومساعدون متصلون ببياناتك بأعلى درجات الأمان.",
    },
    problemSolved: {
      en: "Generic ChatGPT interfaces that hallucinate, lack domain context, or present data privacy and security vulnerabilities.",
      ar: "نماذج الذكاء الاصطناعي العامة التي تهلوس وتفتقر لسياق عملك أو تهدد خصوصية وأمان البيانات الداخلية.",
    },
    solutionApproach: {
      en: "Building tailored hybrid retrieval systems with vector databases, strict context validation, and private API grounding.",
      ar: "تطوير أنظمة استرجاع هجينة مع قواعد بيانات متجهات، وتدقيق قطعي للسياق وربط آمن بالواجهات البرمجية.",
    },
    technologies: ["FastAPI", "Python", "pgvector", "LangChain", "OpenAI/Anthropic", "Redis"],
    deliverables: {
      en: [
        "Secure knowledge ingestion and vector chunking pipeline",
        "Hybrid search (BM25 + Dense Vectors) implementation",
        "Low-latency streaming API with token budgeting",
        "Evaluation benchmark suite testing factual grounding",
        "Admin dashboard for knowledge updates and monitoring",
      ],
      ar: [
        "مسار آمن لاستيعاب البيانات وتقسيم المتجهات",
        "تطبيق البحث الهجين (BM25 + المتجهات الدلالية)",
        "واجهة برمجية سريعة للبث اللحظي مع ضبط استهلاك الرموز",
        "أجنحة اختبارات دورية للتحقق من دقة وصحة الإجابات",
        "لوحة إدارة لتحديث المعرفة ومراقبة الاستفسارات",
      ],
    },
    typicalTimeline: {
      en: "4 – 8 Weeks",
      ar: "4 – 8 أسابيع",
    },
  },
  {
    id: "custom-products",
    icon: "Box",
    title: {
      en: "End-to-End Digital Product Building",
      ar: "بناء المنتجات الرقمية من الفكرة للإطلاق",
    },
    summary: {
      en: "From initial product discovery and architecture to engineering, launch, and post-launch refinement.",
      ar: "من مرحلة استكشاف الفكرة والتخطيط المعماري حتى البرمجة الكاملة والإطلاق والمتابعة المستمرة.",
    },
    problemSolved: {
      en: "Founders and businesses struggling to translate business concepts into scalable, technically sound software.",
      ar: "مؤسسو المشاريع الذين يواجهون صعوبة في تحويل الأفكار والاحتياجات التجارية لمنتج برمجي متين وقابل للتوسع.",
    },
    solutionApproach: {
      en: "Acting as your senior product engineer: defining technical scope, choosing optimal stack, building rapidly, and shipping reliably.",
      ar: "العمل كشريك هندسي أول: تحديد النطاق التقني بدقة، واختيار البنية المثلى، والتنفيذ السريع والموثوق.",
    },
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Supabase"],
    deliverables: {
      en: [
        "Product requirements breakdown & technical specification",
        "Interactive MVP ready for real user testing and revenue",
        "Integrated payment gateways and billing infrastructure",
        "Analytics and error monitoring instrumentation",
        "Complete ownership of source code, repo, and documentation",
      ],
      ar: [
        "تفكيك متطلبات المنتج وإعداد المواصفات المعمارية الدقيقة",
        "منتج أولي متكامل (MVP) جاهز لجذب العملاء وتوليد الإيرادات",
        "ربط بوابات الدفع الإلكتروني والفواتير التلقائية",
        "تضمين أدوات التحليلات ومراقبة الأخطاء لحظياً",
        "ملكية كاملة للشفرة المصدرية والمستودع والتوثيق الهندسي",
      ],
    },
    typicalTimeline: {
      en: "4 – 10 Weeks",
      ar: "4 – 10 أسابيع",
    },
  },
  {
    id: "systems-perf",
    icon: "Zap",
    title: {
      en: "Performance & Architecture Optimization",
      ar: "تحسين الأداء والمعمارية البرمجية",
    },
    summary: {
      en: "Deep profiling, database query optimization, bundle trimming, and architectural refactoring for slow applications.",
      ar: "تدقيق عميق للأداء، وتحسين استعلامات قواعد البيانات، وتقليص حجم الحزم البرمجية وإعادة هيكلة الأنظمة البطيئة.",
    },
    problemSolved: {
      en: "High cloud infrastructure bills, failing database connections during traffic spikes, and sluggish page speed.",
      ar: "فواتير البنية السحابية المرتفعة، وانهيار قواعد البيانات وقت الذروة، وبطء استجابة الصفحات للمستخدمين.",
    },
    solutionApproach: {
      en: "Systematic profiling, caching strategy implementation, query index planning, and main-thread decoupling.",
      ar: "تحليل منهجي للاختناقات، وبناء استراتيجيات تخزين مؤقت متقدمة، وفهرسة ذكية وفصل معالجات الواجهة الثقيلة.",
    },
    technologies: ["Profiling Tools", "Redis", "SQL Tuning", "Web Workers", "Edge Caching"],
    deliverables: {
      en: [
        "Comprehensive architectural and performance audit report",
        "Database index optimization and slow query remediation",
        "Frontend bundle reduction and code-splitting implementation",
        "Redis caching layer integration with invalidation rules",
        "Before/after benchmarking metrics document",
      ],
      ar: [
        "تقرير تدقيق معماري وتقني شامل يحدد مواطن الخلل",
        "تحسين فهارس قاعدة البيانات وإصلاح الاستعلامات البطيئة",
        "تقليص حجم حزم الواجهة وتطبيق التقسيم البرمجي الذكي",
        "دمج طبقة التخزين المؤقت Redis مع قواعد التحديث الفوري",
        "مستند قياسات موثق يوضح الفارق قبل وبعد التحسين",
      ],
    },
    typicalTimeline: {
      en: "1 – 3 Weeks",
      ar: "1 – 3 أسابيع",
    },
  },
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "rate-limiter",
    title: {
      en: "Token Bucket Rate Limiter Simulator",
      ar: "محاكي خوارزمية Token Bucket",
    },
    badge: "ALGORITHM SIM",
    description: {
      en: "Interactive client-side simulation of the token bucket algorithm demonstrating burst handling and continuous token refilling.",
      ar: "محاكاة تفاعلية بالمتصفح لخوارزمية Token Bucket توضح التعامل مع تدفقات الذروة وتجديد الرموز.",
    },
    category: "systems",
    type: "rate-limiter",
  },
  {
    id: "rag-pipeline",
    title: {
      en: "Interactive RAG Simulation (Educational Demo)",
      ar: "محاكاة مسار استرجاع المتجهات RAG (عرض تعليمي)",
    },
    badge: "RAG DEMO SIM",
    description: {
      en: "Educational simulation of query tokenization, embedding calculation, cosine similarity matching, and citation grounding.",
      ar: "محاكاة تعليمية لتفكيك الاستفسارات وحساب التضمينات المتجهية وقياس التشابه وتوثيق المراجع.",
    },
    category: "ai",
    type: "rag-pipeline",
  },
  {
    id: "latency-cache",
    title: {
      en: "Multi-Tier Latency & Cache Hierarchy",
      ar: "تسلسل زمن الاستجابة والتخزين المؤقت متعدد المستويات",
    },
    badge: "LATENCY MODEL",
    description: {
      en: "Simulated architectural latency model illustrating relative order-of-magnitude differences between L1 memory, Redis L2, and disk I/O.",
      ar: "نموذج محاكاة معماري يوضح الفروق النسبية في أزمنة الاستجابة بين الذاكرة والتخزين المؤقت وأقراص التخزين.",
    },
    category: "performance",
    type: "latency-cache",
  },
];

export const PHILOSOPHY_PRINCIPLES = [
  {
    number: "01",
    title: {
      en: "Clarity Over Complexity",
      ar: "الوضوح فوق التعقيد",
    },
    desc: {
      en: "The best code is the code you can reason about immediately. Overengineering creates friction; disciplined simplicity delivers longevity.",
      ar: "أفضل شفرة برمجية هي التي يمكن فهمها وصيانتها بيسر. التعقيد غير المبرر يصنع الديون التقنية؛ والبساطة المنضبطة تضمن استدامة المنتج.",
    },
  },
  {
    number: "02",
    title: {
      en: "User Outcomes Over Framework Hype",
      ar: "نتائج المستخدمين فوق صخب الأدوات",
    },
    desc: {
      en: "Tools exist to solve human problems. Whether using React, Python, or raw SQL, the value lies in reliability, speed, and real-world utility.",
      ar: "الأدوات وُجدت لحل مشكلات البشر. سواء استخدمنا React أو Python أو SQL خالص، تكمن القيمة في الموثوقية والسرعة والنفع الحقيقي.",
    },
  },
  {
    number: "03",
    title: {
      en: "Measurable Performance as a Feature",
      ar: "الأداء القابل للقياس ميزة أساسية",
    },
    desc: {
      en: "Speed is not an afterthought or an optimization pass before launch. It is an architectural constraint engineered into every layer from day one.",
      ar: "السرعة ليست مهمة مؤجلة إلى ما قبل الإطلاق بل هي شرط معماري أصيل يُراعى في تصميم كل طبقة منذ السطر الأول.",
    },
  },
  {
    number: "04",
    title: {
      en: "Deterministic Security by Design",
      ar: "أمان قطعي مبني في صلب النظام",
    },
    desc: {
      en: "Never trust client boundaries. Strict input validation, zero exposed secrets, and defense-in-depth across database and server boundaries.",
      ar: "لا تثق أبداً بمدخلات العميل. التحقق الصارم، وحظر تسريب الأسرار البرمجية، والأمان المتعدد الطبقات عبر الخوادم وقواعد البيانات.",
    },
  },
];
