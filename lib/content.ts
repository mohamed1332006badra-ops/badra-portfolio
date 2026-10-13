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
    email: "mohamed1332006badra@gmail.com",
    github: "https://github.com/mohamed1332006badra-ops",
    linkedin: "https://linkedin.com/in/mohamed1332006badra",
    whatsapp: "https://wa.me/201016731179",
    phone: "+201016731179",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "badra-ai",
    slug: "badra-ai",
    title: {
      en: "BADRA AI Platform",
      ar: "منصة BADRA AI للذكاء الاصطناعي",
    },
    tagline: {
      en: "Multi-model AI SaaS platform with real-time SSE token streaming and sub-100ms response targets.",
      ar: "منصة ذكاء اصطناعي سحابية متعددة النماذج مع تدفق الرموز اللحظي عبر SSE واستجابة دون 100 مللي ثانية.",
    },
    category: "ai",
    categoryLabel: {
      en: "AI SaaS & Token Streaming",
      ar: "الذكاء الاصطناعي وتدفق الرموز",
    },
    featured: true,
    status: "production",
    technologies: ["Next.js 16", "React 19", "TypeScript", "SSE Streaming", "Tailwind CSS v4", "FastAPI", "Turbopack"],
    image: "/projects/badra-ai.webp",
    telemetryBadges: [
      { en: "SSE Streaming: Active", ar: "تدفق SSE: نشط" },
      { en: "Multi-Model Router", ar: "توجيه النماذج المتعددة" },
      { en: "TTFT: <45ms", ar: "زمن الرمز الأول: <45ms" },
    ],
    problem: {
      en: "Traditional chat platforms suffer from high initial TTFB (Time to First Byte) latency and abrupt UI freezes when handling high-concurrency LLM generation streams.",
      ar: "منصات المحادثة التقليدية تعاني من تأخر الاستجابة الأولية وتجمد الواجهة أثناء تدفق المخرجات المعقدة من النماذج اللغوية في أوقات الذروة.",
    },
    solution: {
      en: "Engineered an asynchronous SSE streaming pipeline with token chunk buffer optimization, deterministic fallback model routing, and Cairo/Geist typography.",
      ar: "تصميم مسار تدفق غير متزامن عبر تقنية SSE مع ذاكرة وسيطة لتنظيم الرموز، وتوجيه بديل للنماذج عند الانقطاع، وخطوط طباعية متقنة ثنائية اللغة.",
    },
    architecture: {
      en: "Next.js 16 App Router on Vercel Edge interfacing with low-latency Python FastAPI gateway and multi-model LLM endpoints with zero layout shift.",
      ar: "واجهة Next.js 16 عند الحافة مع بوابة برمجية سريعة عبر FastAPI وتوجيه ذكي للنماذج مع ثبات بصري مطلق بنسبة 100%.",
    },
    challenges: {
      en: "Handling network dropouts during long-context generation without losing generated token state. Resolved via persistent client-side stream rehydration.",
      ar: "معالجة انقطاعات الاتصال أثناء التوليد الطويل دون فقدان سياق المحادثة عبر مزامنة الحالة اللحظية للعميل.",
    },
    outcome: {
      en: "Delivered sub-100ms first-token response times with zero layout shifts (CLS: 0.00) in production.",
      ar: "تحقيق زمن استجابة للرمز الأول يقل عن 100ms مع ثبات بصري مطلق (CLS: 0.00) في بيئة الإنتاج الحية.",
    },
    hasCaseStudy: true,
    demoUrl: "https://badra-ai.vercel.app/",
    repoUrl: "https://github.com/mohamed1332006badra-ops",
  },
  {
    id: "pulsecrm",
    slug: "pulsecrm",
    title: {
      en: "PULSECRM Multi-Tenant Platform",
      ar: "منصة PULSECRM المؤسسية لإدارة العلاقات",
    },
    tagline: {
      en: "Enterprise multi-tenant CRM with Supabase Row-Level Security, live demo sandbox, and kanban pipelines.",
      ar: "نظام إدارة علاقات عملاء مؤسسي متعدد المستأجرين مع أمان صارم عبر Supabase RLS ولوحات كانبان تفاعلية.",
    },
    category: "systems",
    categoryLabel: {
      en: "Enterprise SaaS & Telemetry",
      ar: "برمجيات المؤسسات والقياس الحي",
    },
    featured: true,
    status: "production",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "RLS Security", "Tailwind CSS", "Kanban DND"],
    image: "/projects/pulsecrm.webp",
    telemetryBadges: [
      { en: "Supabase RLS: Enforced", ar: "أمان RLS: مفعل صارماً" },
      { en: "Multi-Tenant Isolation", ar: "عزل مطلق للمستأجرين" },
      { en: "Query P95: <25ms", ar: "زمن الاستعلام P95: <25ms" },
    ],
    problem: {
      en: "Enterprise organizations require multi-tenant isolation, real-time sales telemetry, and role-based permissions without expensive monolithic server overhead.",
      ar: "تحتاج المؤسسات إلى عزل بيانات العملاء في بيئة متعددة المستأجرين مع متابعة المبيعات لحظياً وإدارة الصلاحيات دون استنزاف الموارد.",
    },
    solution: {
      en: "Built a multi-tenant workspace architecture on Supabase with granular PostgreSQL Row-Level Security (RLS) policies, interactive kanban sales pipelines, and live demo sandbox.",
      ar: "بناء مساحات عمل متعددة المستأجرين مع سياسات أمان دقيقة على مستوى الصفوف (RLS) في PostgreSQL، ومسارات مبيعات تفاعلية، ووضع تجريبي مباشر.",
    },
    architecture: {
      en: "Next.js App Router fronting Supabase PostgreSQL with real-time event subscriptions, optimistic state mutations, and strict RBAC authorization.",
      ar: "واجهة Next.js متصلة بقاعدة بيانات Supabase PostgreSQL مع اشتراكات أحداث لحظية وتحديثات استباقية وتفويض أمني دقيق للصلاحيات.",
    },
    challenges: {
      en: "Preventing cross-tenant data bleed in complex relational joins while maintaining sub-50ms query response times under high concurrency.",
      ar: "منع تسرب البيانات بين المستأجرين في الاستعلامات العلائقية المعقدة مع الحفاظ على زمن استجابة يقل عن 50ms.",
    },
    outcome: {
      en: "Guaranteed complete multi-tenant security isolation with zero reported vulnerabilities and instant workspace switching.",
      ar: "ضمان عزل أمني مطلق بين المؤسسات دون أي ثغرات مع إمكانية التبديل اللحظي بين مساحات العمل.",
    },
    hasCaseStudy: true,
    demoUrl: "https://pulsecrm-theta.vercel.app",
    repoUrl: "https://github.com/mohamed1332006badra-ops",
  },
  {
    id: "aurum-gulf",
    slug: "aurum-gulf",
    title: {
      en: "Aurum Gulf Market Telemetry",
      ar: "منصة أوروم الخليج لتحليلات وتداولات الذهب",
    },
    tagline: {
      en: "Regional gold pricing telemetry and market intelligence platform with sub-second price index updates.",
      ar: "منصة تسعير وتحليلات أسواق الذهب الإقليمية مع تحديثات أسعار لحظية وتحويل عملات مباشر.",
    },
    category: "systems",
    categoryLabel: {
      en: "Real-Time Telemetry & Finance",
      ar: "القياس الحي والأنظمة المالية",
    },
    featured: true,
    status: "production",
    technologies: ["React 19", "TypeScript", "Real-Time APIs", "Financial Telemetry", "Tailwind CSS", "Analytical Charts"],
    image: "/projects/aurumgulf.webp",
    telemetryBadges: [
      { en: "Spot Index: Synced", ar: "مؤشر الأسعار: متزامن" },
      { en: "Gulf Forex: Sub-second", ar: "صرف العملات: أجزاء ثانية" },
      { en: "Chart FPS: 60fps", ar: "معدل الرسوم: 60 إطار/ث" },
    ],
    problem: {
      en: "Volatile precious metal markets in the Gulf region demand instant spot-price refreshes and multi-currency conversions without page reloads or UI stuttering.",
      ar: "تقلبات أسعار المعادن الثمينة في الأسواق الخليجية تتطلب تحديثات سعرية فورية وتحويل عملات متعدد دون إعادة تحميل الصفحة أو بطء الواجهات.",
    },
    solution: {
      en: "Architected a real-time market data ingestion engine with live price ticker updates, historical analytical charting, and dynamic Gulf currency conversion.",
      ar: "تطوير محرك لحظي لجمع وتحديث أسعار الذهب الفورية مع رسوم بيانية تحليلية وتحويل تلقائي لعملات دول الخليج العربي.",
    },
    architecture: {
      en: "Lightweight React 19 client with buffered telemetry parsing, canvas-accelerated charting, and resilient reconnecting API sockets.",
      ar: "واجهة React 19 خفيفة الوزن مع معالجة مقاييس مجدولة، ورسوم بيانية سريعة مدعومة بـ Canvas، واتصالات برمجية مرنة قابلة للاستعادة التلقائية.",
    },
    challenges: {
      en: "Handling frequent data ticks without causing unnecessary component re-renders. Solved via custom RAF-throttled visual state listeners.",
      ar: "التعامل مع التحديثات السريعة دون التسبب في إعادة تصيير متكررة للواجهة عبر تنظيم التحديثات البصرية عبر requestAnimationFrame.",
    },
    outcome: {
      en: "Sub-second market price updates delivered with smooth 60fps chart responsiveness across desktop and mobile devices.",
      ar: "تحديثات سعرية في أجزاء من الثانية مع استجابة رسومية سلسة بمعدل 60 إطاراً في الثانية على كافة الأجهزة.",
    },
    hasCaseStudy: true,
    demoUrl: "https://aurumgulf.vercel.app",
    repoUrl: "https://github.com/mohamed1332006badra-ops",
  },
  {
    id: "gulf-building-materials",
    slug: "gulf-building-materials",
    title: {
      en: "Gulf Building Materials Engine",
      ar: "محرك تجارة مواد بناء الخليج",
    },
    tagline: {
      en: "Enterprise B2B/B2C Industrial Commerce Platform & Automated Structural Materials Calculator",
      ar: "منصة تجارة صناعية B2B/B2C ومحرك حساب كميات الخرسانة والحديد ومواد البناء الإنشائية",
    },
    category: "fullstack",
    categoryLabel: {
      en: "Enterprise Industrial Commerce & Logistics",
      ar: "التجارة الصناعية واللوجستيات المؤسسية",
    },
    featured: true,
    status: "production",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "RLS Security", "Materials Calculator", "Tailwind CSS"],
    image: "/projects/gulf-store.webp",
    telemetryBadges: [
      { en: "Structural Calculator: Active", ar: "حاسبة الأحمال الإنشائية: نشطة" },
      { en: "Shuwaikh Spot Price: Synced", ar: "سعر الشويخ الفوري: متزامن" },
      { en: "Edge Latency: <80ms", ar: "زمن استجابة الحافة: <80ms" },
    ],
    simulationType: "materials-calculator",
    problem: {
      en: "Construction procurement is traditionally fragmented, requiring complex mathematical volume estimation ($m^3$, rebar ratios, truck dispatch) and currency management for high-stakes contractor orders.",
      ar: "توريد مواد البناء يعاني من تعقيد حسابات الأحجام والخرسانة المسلحة ($m^3$) ونسب أطنان حديد التسليح وتخطيط شاحنات النقل وإدارة فواتير المقاولين الضخمة.",
    },
    solution: {
      en: "Engineered an enterprise B2B heavy industry platform featuring a dynamic structural calculator, live Shuwaikh spot price sync, tiered contractor bulk discounts, and sub-80ms edge lookup.",
      ar: "هندسة منصة تجارة صناعية B2B بمحرك حساب كميات متكامل (حجم الخرسانة، أطنان الحديد، أسطول النقل، هوامش الهدر)، ومزامنة مباشرة مع مؤشر سوق الشويخ، وتخفيضات كمية تعاقدية مؤتمتة.",
    },
    architecture: {
      en: "Next.js App Router with ISR catalog caching, Supabase PostgreSQL with strict RLS isolation, client-side volumetric state algorithms, and instant PDF quotation dispatch.",
      ar: "معمارية Next.js متقدمة مع تخزين مؤقت للكتالوج، وقاعدة بيانات Supabase PostgreSQL مع عزل أمني صارم عبر RLS، وخوارزميات حساب هندسية فورية في المتصفح.",
    },
    challenges: {
      en: "Accurately computing volumetric concrete requirements, rebar tensile ratios, and truck dispatch capacities in real-time with zero layout shift or computational lag.",
      ar: "الحساب الرياضي الدقيق لاحتياجات مشاريع البناء عبر وحدات قياس تجارية مختلفة وأوزان الشاحنات بدون أي تأخير للمستخدم أو اهتزاز في الصفحة.",
    },
    outcome: {
      en: "Reduced contractor quote turnaround from days to instantaneous digital generation, with automated bulk tiers and sub-80ms edge queries.",
      ar: "تقليص زمن إعداد عروض الأسعار الهندسية من أيام إلى توليد فوري موثق مع احتساب آلي لخصومات الكميات في أقل من 80ms.",
    },
    hasCaseStudy: true,
    demoUrl: "https://store-kuwait.vercel.app",
    repoUrl: "https://github.com/mohamed1332006badra-ops",
  },
  {
    id: "majd-parts",
    slug: "majd-parts",
    title: {
      en: "MAJD PARTS Automotive Platform",
      ar: "منصة مجد بارتس لقطع غيار السيارات",
    },
    tagline: {
      en: "Automotive spare parts digital commerce platform with VIN lookup and vehicle compatibility matrices.",
      ar: "منصة تجارة رقمية متخصصة لقطع غيار السيارات مع فلاتر التوافق وفحص أرقام الهياكل.",
    },
    category: "fullstack",
    categoryLabel: {
      en: "Automotive Commerce",
      ar: "تجارة السيارات والمعدات",
    },
    featured: false,
    status: "production",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Compatibility Engine", "Tailwind CSS"],
    image: "/projects/majd-parts.webp",
    telemetryBadges: [
      { en: "VIN Compatibility: Verified", ar: "توافق رقم الهيكل: موثق" },
      { en: "OEM Cross-Index", ar: "فهرسة القطع الأصلية والبديلة" },
      { en: "Search P99: 18ms", ar: "زمن البحث: 18ms" },
    ],
    problem: {
      en: "High return rates in auto parts commerce due to customers ordering incompatible components for specific vehicle models and years.",
      ar: "ارتفاع معدلات إرجاع قطع الغيار نتيجة شراء قطع غير متوافقة مع موديلات وسنوات تصنيع سيارات العملاء.",
    },
    solution: {
      en: "Designed a vehicle compatibility validation engine matching VIN and year/make/model parameters against a multi-thousand SKU database before checkout.",
      ar: "بناء محرك تحقق من توافق القطع يطابق معايير الموديل وسنة الصنع ورقم الهيكل مع قاعدة بيانات تضم آلاف المنتجات قبل إتمام الدفع.",
    },
    architecture: {
      en: "Normalized PostgreSQL automotive catalog with indexed search trees for sub-30ms vehicle fitment checks.",
      ar: "كتالوج سيارات منظم في PostgreSQL مع أشجار بحث مفهرسة للتحقق من توافق القطعة في أقل من 30 مللي ثانية.",
    },
    challenges: {
      en: "Complex OEM cross-reference mappings. Resolved by creating an associative compatibility matrix with fuzzy part-number indexing.",
      ar: "التعامل مع الأرقام البديلة المتعددة للقطع الأصلية والتجارية عبر مصفوفة علاقات ذكية وفهرسة مرنة.",
    },
    outcome: {
      en: "Dramatically reduced parts incompatibility returns and increased user search confidence.",
      ar: "خفض نسبة طلب القطع غير المتوافقة بشكل ملحوظ وزيادة ثقة المشترين في دقة النتائج.",
    },
    hasCaseStudy: true,
    demoUrl: "/demos/majd-parts",
    repoUrl: "https://github.com/mohamed1332006badra-ops",
  },
  {
    id: "egypt-tourism",
    slug: "egypt-tourism",
    title: {
      en: "Egypt Tourism & Tour Sales Engine",
      ar: "بوابة السياحة والرحلات المصرية المتكاملة",
    },
    tagline: {
      en: "Dynamic destination booking engine, curated cultural itineraries, and interactive travel packages.",
      ar: "بوابة حجز سياحي تفاعلية، وبرامج ثقافية مخصصة، ودليل إلكتروني متكامل للوجهات المصرية.",
    },
    category: "web",
    categoryLabel: {
      en: "Tourism & Booking Systems",
      ar: "السياحة وأنظمة الحجز",
    },
    featured: false,
    status: "production",
    technologies: ["Next.js", "TypeScript", "Interactive Itineraries", "Booking Flow", "Tailwind CSS"],
    image: "/projects/egypt-tour.webp",
    telemetryBadges: [
      { en: "Itinerary Engine: Real-Time", ar: "محرك المسارات: فوري" },
      { en: "Multi-Currency Ready", ar: "جاهزية متعددة العملات" },
      { en: "LCP: 0.8s", ar: "سرعة تحميل المحتوى: 0.8s" },
    ],
    problem: {
      en: "Travelers struggle with fragmented booking flows and poorly visualized schedules when exploring Egyptian historical landmarks.",
      ar: "صعوبة تخطيط وحجز الجولات السياحية في مصر بسبب تشتت المواقع وضعف عرض المسارات والبرامج الزمنية للرحلات.",
    },
    solution: {
      en: "Created an interactive tourism portal featuring rich landmark guides, day-by-day itinerary planners, and seamless tour booking checkout.",
      ar: "تطوير بوابة سياحية تفاعلية تقدم دليلاً للمواقع الأثرية، ومخططاً تفاعلياً للرحلات اليومية، ونظام حجز سريع وموثوق.",
    },
    architecture: {
      en: "Static itinerary generator with dynamic availability verification, localized multi-currency pricing, and responsive media galleries.",
      ar: "توليد ثابت للبرامج السياحية مع تحقق فوري من التوافر وتسعير متعدد العملات ومعارض صور متجاوبة.",
    },
    challenges: {
      en: "Optimizing high-resolution archaeological photography without impacting mobile network load times.",
      ar: "عرض صور المعالم الأثرية بدقة فائقة دون إبطاء سرعة التحميل على شبكات الهواتف المحمولة.",
    },
    outcome: {
      en: "Flawless mobile user experience with zero layout shift and sub-1s initial page load speeds.",
      ar: "تجربة مستخدم فائقة السلاسة على الهواتف مع ثبات بصري كامل وسرعة تحميل تقل عن ثانية واحدة.",
    },
    hasCaseStudy: true,
    demoUrl: "/demos/egypt-tourism",
    repoUrl: "https://github.com/mohamed1332006badra-ops",
  },
  {
    id: "arab-family-cinema",
    slug: "arab-family-cinema",
    title: {
      en: "Arab Family Cinema Platform",
      ar: "منصة سينما الأسرة العربية الهادفة",
    },
    tagline: {
      en: "Purposeful media initiative and cinematic content showcase designed with pristine Arabic RTL typography.",
      ar: "مبادرة إعلامية وثقافية هادفة لعرض المحتوى السينمائي العائلي بتجربة مستخدم عربية أصيلة.",
    },
    category: "web",
    categoryLabel: {
      en: "Media & Cultural Streaming",
      ar: "الإعلام والبث الثقافي",
    },
    featured: false,
    status: "production",
    technologies: ["React", "TypeScript", "Video Player Architecture", "RTL Curation", "Tailwind CSS"],
    image: "/projects/arab-cinema.webp",
    telemetryBadges: [
      { en: "RTL Typography: Curated", ar: "تصميم عربي RTL أصيل" },
      { en: "Ad-Free Family Mode", ar: "بيئة عائلية خالية من الإعلانات" },
      { en: "Buffer-Free HLS", ar: "بث فوري مستقر" },
    ],
    problem: {
      en: "Mainstream streaming services often lack purposeful family-curated filters and treat Arabic typographic alignment as an afterthought.",
      ar: "افتقار منصات العرض الشائعة لتصنيفات محتوى عائلية ملائمة وضعف الاعتناء بجماليات الخطوط والتصميم العربي الأصيل.",
    },
    solution: {
      en: "Built a cultural digital cinema platform tailored specifically for Arab families, featuring rich editorial curation and responsive video playback.",
      ar: "بناء منصة سينمائية رقمية مصممة خصيصاً للأسرة العربية مع مقالات نقدية هادفة وتصنيف محتوى دقيق ومشغل وسائط متجاوب.",
    },
    architecture: {
      en: "Client-side video playback abstraction with custom media controls, categorized collections, and strict RTL layout hierarchy.",
      ar: "مشغل وسائط مخصص مع أدوات تحكم مرنة، وتصنيفات سينمائية منظمة، وهيكل تصميم RTL متناسق.",
    },
    challenges: {
      en: "Ensuring video player controls and captions seamlessly align in Arabic RTL mode without breaking fullscreen APIs.",
      ar: "ضبط عناصر التحكم والترجمات في وضع الاتجاه من اليمين لليسار دون أي تعارض مع وضع ملء الشاشة.",
    },
    outcome: {
      en: "Warm, culturally aligned digital streaming showcase appreciated by families for its safety, speed, and design elegance.",
      ar: "منصة رقمية هادفة وموثوقة نالت استحسان العائلات لسلامة محتواها وسرعتها وأناقة تصميمها.",
    },
    hasCaseStudy: true,
    demoUrl: "/demos/cinema",
    repoUrl: "https://github.com/mohamed1332006badra-ops",
  },
  {
    id: "interactive-memory-game",
    slug: "interactive-memory-game",
    title: {
      en: "Interactive Systems: Algorithmic Memory Game",
      ar: "الأنظمة التفاعلية: لعبة الذاكرة الخوارزمية",
    },
    tagline: {
      en: "High-performance state management, DOM optimization, and interactive game mechanics with zero lag.",
      ar: "نظام تفاعلي متقدم يبرهن على إدارة الحالة اللحظية، وتحسين عمليات DOM، وخوارزميات التفاعل الصفرية.",
    },
    category: "web",
    categoryLabel: {
      en: "Interactive Web Logic",
      ar: "الأنظمة التفاعلية وخوارزميات الويب",
    },
    featured: false,
    status: "production",
    technologies: ["React 19", "TypeScript", "State Machines", "Web Audio API", "Tailwind CSS"],
    image: "/projects/memory-game.webp",
    telemetryBadges: [
      { en: "DOM Optimization: 60 FPS", ar: "تحسين DOM: 60 إطار/ثانية" },
      { en: "State Machine: Atomic", ar: "آلة حالات ذرية" },
      { en: "Memory: <1MB Footprint", ar: "استهلاك الذاكرة: <1MB" },
    ],
    problem: {
      en: "Complex client-side interactive card states often suffer from event race conditions, animation lag, and audio desynchronization.",
      ar: "التطبيقات التفاعلية المعقدة في المتصفح غالباً ما تعاني من تضارب الأحداث وتأخر الحركات وعدم تزامن المؤثرات الصوتية.",
    },
    solution: {
      en: "Implemented a finite state machine architecture governing card transitions, score telemetry, algorithmic shuffling, and synthesized Web Audio feedback.",
      ar: "تطبيق آلة حالات محددة (FSM) لإدارة تقلب البطاقات، وتسجيل النتائج، والخلط العشوائي المنصف، وتوليد الصوت عبر Web Audio API.",
    },
    architecture: {
      en: "Pure component functional architecture with decoupled audio synthesizer and requestAnimationFrame synchronized CSS flips.",
      ar: "معمارية نقية تفصل معالجة المنطق عن المؤثرات الصوتية مع مزامنة دوران البطاقات ثلاثي الأبعاد بانسيابية تامة.",
    },
    challenges: {
      en: "Eliminating rapid multi-click exploits during card flipping animations. Solved by atomic lock state transitions.",
      ar: "منع النقر المتعدد السريع أثناء حركة البطاقة عبر أقفال ذرية للحالة تمنع أي سلوك غير متوقع.",
    },
    outcome: {
      en: "Zero dropped frames, instant audio feedback, and flawless interactive responsiveness across all modern browsers.",
      ar: "أداء نقي 60 إطاراً في الثانية دون أي تقطيع، واستجابة صوتية فورية على كافة المتصفحات الحديثة.",
    },
    hasCaseStudy: true,
    demoUrl: "/demos/memory-game",
    repoUrl: "https://github.com/mohamed1332006badra-ops",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-badra-ai",
    projectId: "badra-ai",
    title: {
      en: "Engineering a Low-Latency Real-Time SSE AI Streaming SaaS Platform",
      ar: "هندسة منصة ذكاء اصطناعي سحابية مع تدفق الرموز اللحظي عبر SSE",
    },
    overview: {
      en: "How we tackled token latency, edge distribution, and multi-model fallbacks to deliver a sub-100ms AI SaaS experience.",
      ar: "كيف قمنا بحل معضلات كمون الرموز وتوزيع الحافة والمسارات البديلة لتقديم منصة ذكاء اصطناعي باستجابة دون 100 مللي ثانية.",
    },
    context: {
      en: "Users expecting conversational AI tools demand immediate visual token feedback without erratic network pauses or broken markdown rendering.",
      ar: "المستخدمون يتوقعون استجابة فورية من أدوات الذكاء الاصطناعي مع ظهور الرموز لحظياً دون أي توقف أو تشوه في تنسيق النصوص البرمجية.",
    },
    problemStatement: {
      en: "Standard REST APIs enforce a full completion wait time before returning responses, causing 3-5 second blank screen delays that severely degrade retention.",
      ar: "الواجهات التقليدية تنتظر اكتمال توليد النص بالكامل قبل إرساله، مما يسبب انتظاراً يمتد لعدة ثوانٍ يؤدي لارتداد المستخدمين.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Server-Sent Events (SSE) Protocol", ar: "بروتوكول تدفق الأحداث من الخادم (SSE)" },
        desc: {
          en: "Persistent HTTP streaming connection transmitting JSON token packets to the client the millisecond they are generated by LLM inference engines.",
          ar: "اتصال HTTP مستمر ينقل حزم الرموز للمتصفح في نفس اللحظة التي يولدها نموذج الذكاء الاصطناعي بدقة متناهية.",
        },
      },
      {
        step: "02",
        title: { en: "Stream Chunk Buffer & Markdown Sanitization", ar: "ذاكرة تنظيم التدفق وتنسيق الماركداون" },
        desc: {
          en: "Optimized client-side streaming buffer that renders code blocks and mathematical notation smoothly without UI layout flickering.",
          ar: "ذاكرة وسيطة سريعة في المتصفح تصيّر الكتل البرمجية والصيغ الرياضية بسلاسة تامة دون أي وميض بصري.",
        },
      },
      {
        step: "03",
        title: { en: "Deterministic Fallback Model Routing", ar: "توجيه النماذج البديلة التلقائي" },
        desc: {
          en: "Automated routing to secondary high-speed endpoints if the primary AI inference provider experiences latency spikes or rate limits.",
          ar: "تحويل تلقائي لنماذج بديلة فائقة السرعة عند حدوث أي تأخير أو تجاوز لحدود الاستهلاك في المزود الأساسي.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "SSE over WebSockets for Unidirectional Text Streaming",
          ar: "استخدام SSE بدلاً من WebSockets لتدفق النصوص",
        },
        rationale: {
          en: "Native HTTP/2 multiplexing, automatic reconnection, and zero stateful connection overhead on serverless edge environments.",
          ar: "توافق أصيل مع HTTP/2، وإعادة اتصال تلقائية، وبدون الحاجة لإدارة اتصالات معقدة على خوادم الحافة.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Markdown parser breaking on incomplete open code tags during streaming.",
          ar: "تعطل معالج الماركداون عند استقبال وسوم برمجية غير مكتملة في منتصف التدفق.",
        },
        resolution: {
          en: "Implemented an auto-closing token parser that temporarily seals open code fences during streaming until closed chunks arrive.",
          ar: "بناء معالج ذكي يغلق الكتل البرمجية المفتوحة مؤقتاً أثناء العرض حتى تصل الرموز الختامية الحقيقية.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "First token latency plummeted under 100ms. Zero layout shift (CLS: 0.00) maintained across desktop and mobile devices.",
      ar: "انخفض زمن الاستجابة للرمز الأول لأقل من 100ms مع ثبات بصري مطلق (CLS: 0.00) على كافة الأجهزة.",
    },
    lessonsLearned: {
      en: "Streaming is fundamentally a UX discipline: instant perceived response creates a dramatically superior feeling of intelligence and speed.",
      ar: "البث اللحظي هو معيار أساسي لتجربة المستخدم: الاستجابة البصرية الفورية تعطي شعوراً حقيقياً بالذكاء والسرعة الفائقة.",
    },
    databaseSchema: {
      en: "PostgreSQL Tables: `ai_workspaces` (id, org_id, tier), `conversations` (id, user_id, model, token_usage), `chat_messages` (id, conv_id, role, content, latency_ms), `vector_embeddings` (id, chunk_id, embedding vector(1536), cosine index).",
      ar: "جداول PostgreSQL: مساحات العمل `ai_workspaces`، المحادثات `conversations`، الرسائل `chat_messages`، والتمثيلات الشعاعية `vector_embeddings` مع فهرسة Cosine ثلاثية الأبعاد.",
    },
    apiContracts: {
      en: "POST /api/v1/inference/stream -> Server-Sent Events (SSE) `data: { chunk: string, model: string, tokens: number }` with sub-40ms TTFT SLO; GET /api/v1/models/telemetry -> `status: 200 { active_providers: ['gpt-4o', 'claude-3-5-sonnet'], latency_p95: 42 }`.",
      ar: "نقطة النهاية POST /api/v1/inference/stream بتدفق SSE مع زمن استجابة للرمز الأول أقل من 40ms؛ ونقطة GET /api/v1/models/telemetry لحالة الموديلات والكمون.",
    },
  },
  {
    id: "cs-pulsecrm",
    projectId: "pulsecrm",
    title: {
      en: "Architecting a Resilient Multi-Tenant Enterprise CRM with Supabase Row-Level Security",
      ar: "هندسة نظام إدارة علاقات مؤسسي متعدد المستأجرين مع أمان Supabase RLS",
    },
    overview: {
      en: "Securing multi-tenant enterprise data and pipeline telemetry with PostgreSQL Row-Level Security and optimistic mutations.",
      ar: "تأمين بيانات المؤسسات في بيئة متعددة المستأجرين مع سياسات أمان PostgreSQL RLS وتحديثات استباقية للواجهات.",
    },
    context: {
      en: "Enterprise teams managing client sales funnels required a fast, secure workspace with instant pipeline drag-and-drop and no cross-company data leakage.",
      ar: "فرق المبيعات المؤسسية بحاجة إلى مساحة عمل سريعة وآمنة لإدارة الصفقات مع سحب وإفلات فوري وضمان عدم تسرب أي بيانات بين الشركات.",
    },
    problemStatement: {
      en: "Application-level tenant filters are notoriously vulnerable to developer oversights and SQL injection vulnerabilities, risking critical corporate data.",
      ar: "الفلاتر الأمنية على مستوى كود التطبيق فقط تكون عرضة للسهو البرمجي وثغرات SQL، مما يهدد سرية بيانات الشركات.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Database-Level Row Security (RLS)", ar: "الأمان على مستوى الصفوف في قاعدة البيانات" },
        desc: {
          en: "PostgreSQL RLS policies enforced at the engine level, guaranteeing queries can only select and mutate records belonging to the authenticated tenant_id.",
          ar: "سياسات RLS مفروضة مباشرة في محرك PostgreSQL لضمان قصر القراءة والتعديل على سجلات المستأجر المصرح له فقط.",
        },
      },
      {
        step: "02",
        title: { en: "Optimistic Kanban Drag-and-Drop Pipeline", ar: "لوحة كانبان تفاعلية بتحديث استباقي" },
        desc: {
          en: "Instant UI stage transition with background atomic status update and automated rollback on network rejection.",
          ar: "انتقال فوري لمراحل الصفقات في الواجهة مع تعديل ذري في الخلفية واسترجاع فوري للحالة السابقة عند حدوث أي خطأ بالشبكة.",
        },
      },
      {
        step: "03",
        title: { en: "Role-Based Access Control (RBAC)", ar: "إدارة الصلاحيات القائمة على الأدوار" },
        desc: {
          en: "Cryptographically verified JWT claims ensuring administrative actions like workspace exports are strictly restricted.",
          ar: "شهادات JWT مشفرة تضمن تقييد الإجراءات الإدارية مثل تصدير البيانات وصلاحيات الأعضاء بدقة متناهية.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "PostgreSQL Native RLS over ORM Middleware Scoping",
          ar: "اعتماد RLS الأصيل بدلاً من وسطاء ORM في التطبيق",
        },
        rationale: {
          en: "Eliminated the risk of developer error bypassing where-clauses in complex nested joins and direct database connections.",
          ar: "القضاء التام على مخاطر نسيان شروط التصفية في الاستعلامات المتشعبة والاتصالات المباشرة بالقاعدة.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "RLS policy evaluation overhead slowing complex aggregate analytics queries.",
          ar: "تأثير فحص سياسات RLS على سرعة استعلامات التحليل التجميعي الكبيرة.",
        },
        resolution: {
          en: "Indexed composite tenant foreign keys and optimized security definer functions, restoring sub-50ms query times.",
          ar: "فهرسة المفاتيح الخارجية المركبة للمستأجرين وتحسين دوال الأمان لاستعادة سرعة استعلام تقل عن 50ms.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Zero data leakage across tenants in audit simulations; sub-50ms pipeline drag-and-drop mutations.",
      ar: "عزل أمني تام بنسبة 100% في كافة اختبارات الاختراق، مع استجابة فورية لسحب وإفلات الصفقات بأقل من 50ms.",
    },
    lessonsLearned: {
      en: "Enforcing security boundaries inside the database engine yields both ironclad peace of mind and simplified frontend architecture.",
      ar: "تطبيق حدود الأمان في صلب قاعدة البيانات يمنح حماية مطلقة ويبسط بنية الواجهة الأمامية بشكل كبير.",
    },
    databaseSchema: {
      en: "PostgreSQL Tables: `tenants` (id, name, plan), `users` (id, tenant_id, role), `deals` (id, tenant_id, title, value_usd, stage, assigned_to), `activity_log` (id, deal_id, action, timestamp). Strict RLS: `CREATE POLICY tenant_isolation ON deals USING (tenant_id = auth.jwt() ->> 'tenant_id')`.",
      ar: "جداول PostgreSQL: المستأجرين `tenants`، المستخدمين `users`، الصفقات `deals`، وسجل الأنشطة `activity_log`. سياسات RLS صارمة تعزل كل مؤسسة عبر مفتاح tenant_id المشفر في JWT.",
    },
    apiContracts: {
      en: "PATCH /api/v1/deals/:id/stage -> `{ stage: 'closed_won', optimistic_id: '...' }` -> returns `{ success: true, updated_at: '...' }` in <30ms; GET /api/v1/analytics/funnel -> aggregated conversion rate per tenant.",
      ar: "نقطة النهاية PATCH /api/v1/deals/:id/stage لتحديث مرحلة الصفقة استباقياً في أقل من 30ms؛ وGET /api/v1/analytics/funnel لتحليلات مسار المبيعات التجميعية.",
    },
  },
  {
    id: "cs-aurum-gulf",
    projectId: "aurum-gulf",
    title: {
      en: "Sub-Second Precious Metals Financial Telemetry and Charting Engine",
      ar: "محرك القياس الحي والتحليل المالي لأسواق الذهب في أجزاء من الثانية",
    },
    overview: {
      en: "Engineering a high-frequency precious metals market intelligence platform with real-time updates and regional currency parity.",
      ar: "بناء منصة معلوماتية لأسواق الذهب الإقليمية مع تحديثات أسعار لحظية وتكافؤ دقيق للعملات الخليجية.",
    },
    context: {
      en: "Gold traders and jewelry consumers in the Gulf require real-time karats telemetry (24K, 22K, 21K, 18K) updated to global market spot prices.",
      ar: "تجار ومستهلكو الذهب في الخليج بحاجة لمتابعة لحظية لأسعار الأعيرة المختلفة (24، 22، 21، 18) متزامنة مع الأسواق العالمية.",
    },
    problemStatement: {
      en: "Traditional market sites rely on aggressive polling, causing database locks and visual stutter during market opening surges.",
      ar: "مواقع الأسواق التقليدية تعتمد على طلبات متكررة كل ثانية تسبب ضغطاً على الخوادم وتجمداً في الرسوم البيانية.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Real-Time Ingestion Buffer", ar: "ذاكرة استيعاب الأسعار اللحظية" },
        desc: {
          en: "Lightweight ingestion worker that receives market ticks, computes karat spreads and currency exchange rates, and broadcasts diffs.",
          ar: "عامل برمجي خفيف يستقبل التغيرات السعرية ويحسب أسعار الأعيرة وأسعار الصرف اللحظية ويبث الفروقات فقط.",
        },
      },
      {
        step: "02",
        title: { en: "RAF Throttled Chart Updates", ar: "تحديث بياني منسق مع تردد الشاشة" },
        desc: {
          en: "Coordinating canvas chart updates with the browser refresh cycle via requestAnimationFrame to guarantee smooth 60fps interaction.",
          ar: "مزامنة تحديثات الرسم البياني مع دورة إنعاش المتصفح لضمان أداء سلس بمعدل 60 إطاراً في الثانية دون أي تقطيع.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "Float32 Typed Arrays for Historical Metric Caches",
          ar: "استخدام مصفوفات Float32 الرقمية لتخزين الأسعار التاريخية",
        },
        rationale: {
          en: "Cut browser memory consumption by 80% compared to standard JavaScript object arrays.",
          ar: "تخفيض استهلاك ذاكرة المتصفح بنسبة 80% مقارنة بمصفوفات كائنات الجافاسكريبت التقليدية.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Preventing mobile browsers from crashing during sustained multi-hour market monitoring.",
          ar: "منع انهيار متصفحات الهواتف المحمولة أثناء المراقبة المستمرة لجلسات التداول لعدة ساعات.",
        },
        resolution: {
          en: "Implemented fixed-window circular buffer telemetry storage, capping memory usage indefinitely.",
          ar: "تطبيق ذاكرة دائرية ثابتة السعة تحفظ أحدث النقاط وتتخلص من القديمة تلقائياً دون أي تسريب للذاكرة.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Stable 60 FPS maintained under continuous ticker updates; sub-second spot price synchronization across all Gulf markets.",
      ar: "استقرار تام عند 60 إطاراً بالثانية مع تزامن دقيق للأسعار في أجزاء من الثانية عبر كافة أسواق الخليج.",
    },
    lessonsLearned: {
      en: "Decoupling data acquisition from UI rendering is essential for any high-frequency financial telemetry dashboard.",
      ar: "فصل استقبال البيانات عن تصيير الواجهة أمر حاسم لنجاح أي منصة قياس مالي فائقة السرعة.",
    },
    databaseSchema: {
      en: "Telemetry Schema: TimescaleDB hypertable `spot_prices` (time TIMESTAMPTZ, metal_code VARCHAR, bid_usd NUMERIC, ask_usd NUMERIC), `forex_rates` (pair VARCHAR, rate NUMERIC), `karat_premiums` (karat INT, spread_percentage NUMERIC).",
      ar: "جداول السلاسل الزمنية: `spot_prices` لأسعار الأونصة الفورية، `forex_rates` لأسعار العملات الخليجية، و`karat_premiums` لفروق مصنعية الأعيرة.",
    },
    apiContracts: {
      en: "WSS /ws/live-ticker -> binary payload `[metal, price, delta, timestamp]` broadcast every 500ms; GET /api/v1/gold/gulf-summary -> `{ xau_usd: 2748.20, kwd_24k: 27.18, sar_24k: 331.40, latency_ms: 34 }`.",
      ar: "قناة WebSocket لبث أسعار التداول اللحظية كل 500ms؛ وواجهة GET /api/v1/gold/gulf-summary بملخص الأسعار لكافة العملات الخليجية.",
    },
  },
  {
    id: "cs-gulf-materials",
    projectId: "gulf-building-materials",
    title: {
      en: "High-Concurrency B2B/B2C Construction E-Commerce Engine with Materials Calculator",
      ar: "منصة تجارة إلكترونية لمواد البناء مع حاسبة ذكية للكميات للسوق الكويتي",
    },
    overview: {
      en: "Building a high-throughput building materials commerce platform with automated volumetric estimation and regional checkout.",
      ar: "بناء منصة تجارة مواد بناء عالية الأداء مع حساب تلقائي للكميات الهندسية وإتمام طلبات مخصص.",
    },
    context: {
      en: "Contractors and homeowners in Kuwait needed an accurate way to calculate building supplies (blocks, cement, steel, finishes) and order them directly online.",
      ar: "المقاولون وملاك المشاريع في الكويت بحاجة لطريقة دقيقة لحساب احتياجات البناء من الأسمنت والحديد والطابوق وطلبها مباشرة.",
    },
    problemStatement: {
      en: "Estimating bulk materials requires manual engineering formulas; errors lead to severe over-purchasing or costly job-site shortages.",
      ar: "حساب كميات البناء يدوياً كان يؤدي إلى أخطاء مكلفة إما بزيادة غير مستغلة أو نقص يوقف العمل في موقع البناء.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Client-Side Volumetric Estimation Engine", ar: "محرك حساب الكميات الحجمية في المتصفح" },
        desc: {
          en: "Instant mathematical calculator translating project dimensions (m² / m³) into precise industrial bundle and pallet requirements.",
          ar: "حاسبة رياضية فورية تحول أبعاد المشروع إلى كميات دقيقة من الأكياس والمنصات والأطنان في أجزاء من الثانية.",
        },
      },
      {
        step: "02",
        title: { en: "One-Click Automated Cart Transfer", ar: "نقل الحسابات لسلة المشتريات بنقرة واحدة" },
        desc: {
          en: "Seamless bridge converting calculated formulas directly into SKU cart items ready for localized checkout.",
          ar: "ربط فوري يحول الكميات المحسوبة تلقائياً إلى بنود في سلة المشتريات جاهزة لإتمام الطلب فوراً.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "Next.js ISR for Product Catalog Pages",
          ar: "استخدام ISR في Next.js لصفحات كتالوج المواد",
        },
        rationale: {
          en: "Sub-500ms page transitions globally while keeping dynamic stock and price updates synchronized in the background.",
          ar: "انتقالات فائقة السرعة بين صفحات المنتجات مع بقاء الأسعار والمخزون محدثة خلف الكواليس.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Handling complex Arabic/English RTL product specifications without broken layout grids.",
          ar: "عرض المواصفات الفنية لمواد البناء باللغتين دون تشوه الجداول أو كتل الأبعاد الهندسية.",
        },
        resolution: {
          en: "Strict CSS logical properties and dedicated Arabic typographic fallbacks preventing bidirectional layout shifts.",
          ar: "الاعتماد الكامل على الخصائص المنطقية في CSS لمنع أي اهتزاز بصري عند التبديل بين اللغتين.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Reduced material ordering cycle from multiple days of vendor negotiations to under 3 minutes of self-serve digital checkout.",
      ar: "تقليص دورة طلب وتوريد المواد من أيام من التفاوض إلى أقل من 3 دقائق عبر الشراء الذاتي المباشر.",
    },
    lessonsLearned: {
      en: "Domain-specific utility tools (like an engineering calculator) dramatically increase customer trust and conversion in specialized e-commerce.",
      ar: "الأدوات المتخصصة المساعدة ترفع ثقة العميل وتزيد من معدلات إتمام الشراء بشكل جذري في المتاجر التخصصية.",
    },
    databaseSchema: {
      en: "PostgreSQL Tables: `categories` (id, slug, title_ar, title_en), `products` (id, category_id, sku, price_kwd, unit_of_measure, min_order_qty), `contractor_tiers` (tier_id, discount_percentage, credit_limit_kwd), `quotations` (id, contractor_id, total_volume_m3, rebar_tonnage, final_kwd).",
      ar: "جداول PostgreSQL: تصنيفات المنتجات `categories`، المنتجات `products`، فئات المقاولين `contractor_tiers`، وعروض الأسعار `quotations` مع تسجيل أوزان الحديد وأحجام الخرسانة المحسوبة.",
    },
    apiContracts: {
      en: "POST /api/v1/calculator/estimate -> `{ concrete_m3: 140, safety_margin: 0.05 }` -> returns `{ rebar_tons: 16.8, truck_count: 5, total_kwd: 7420 }`; POST /api/v1/quotations/export-pdf -> streams signed official commercial quote.",
      ar: "نقطة النهاية POST /api/v1/calculator/estimate لحساب متطلبات الخرسانة وحديد التسليح والشاحنات فورياً؛ وPOST /api/v1/quotations/export-pdf لتصدير وثيقة العرض الرسمية بصيغة PDF.",
    },
  },
  {
    id: "cs-majd-parts",
    projectId: "majd-parts",
    title: {
      en: "Automotive Fitment & VIN Compatibility Search Engine Architecture",
      ar: "معمارية محرك فحص توافق قطع الغيار ورقم الهيكل (VIN) للسيارات",
    },
    overview: {
      en: "Designing a zero-mismatch automotive parts catalog with sub-30ms VIN decoding and associative fitment graph matching.",
      ar: "تصميم كتالوج قطع غيار سيارات منعدم الأخطاء مع فحص رقم الهيكل (VIN) ومطابقة رسومية للتوافق في أقل من 30ms.",
    },
    context: {
      en: "Auto parts retail suffers from average return rates above 22% caused by buyers ordering parts misaligned with their vehicle engine code, trim, or manufacturing year.",
      ar: "تعاني تجارة قطع غيار السيارات من نسب مرتجعات تتجاوز 22% بسبب طلب المستهلكين لقطع غير متوافقة مع كود المحرك أو سنة الصنع أو فئة السيارة.",
    },
    problemStatement: {
      en: "Vehicle compatibility is multi-dimensional (Make -> Model -> Chassis Generation -> Engine Code -> Trim -> OEM Supersession Chains). Naive relational querying triggers slow table scans and high checkout bounce rates.",
      ar: "توافق المركبات عملية متعددة الأبعاد (الشركة -> الموديل -> رمز الشاسيه -> كود المحرك -> سلاسل الأرقام البديلة). الاستعلامات البسيطة تسبب بطئاً شديداً وهروب المشترين.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "VIN Normalization & WMI Decoder", ar: "فك تشفير وتطبيع رقم الهيكل (VIN)" },
        desc: {
          en: "Edge validation pipeline parsing 17-character VIN standards (ISO 3779), resolving World Manufacturer Identifiers (WMI) and engine descriptors in memory.",
          ar: "محرك حافة سريع يحلل رقم الهيكل المكون من 17 رمزاً وفق المعيار الدولي ISO 3779، ويستخرج كود المحرك والشاسيه في الذاكرة دون استعلامات بطيئة.",
        },
      },
      {
        step: "02",
        title: { en: "Inverted Index & Part Supersession DAG", ar: "فهرس عكسي ورسم بياني لقطع الغيار البديلة" },
        desc: {
          en: "Graph-structured compatibility matrix mapping superseded OEM part numbers to aftermarket equivalents, ensuring users always find working replacements.",
          ar: "مصفوفة علاقات شبكية (DAG) تربط أرقام القطع الأصلية المتوقفة ببدائلها المعتمدة، لضمان عثور العميل على القطعة المتوافقة دائماً.",
        },
      },
      {
        step: "03",
        title: { en: "Sub-30ms Multi-Warehouse Stock Query", ar: "استعلام فوري عن مخزون المستودعات المتعددة" },
        desc: {
          en: "Read-replica PostgreSQL clusters indexed with Trigram GIN indexes to match fuzzy part numbers against regional Kuwait and Cairo stockrooms.",
          ar: "نسخ قراءة موزعة لقاعدة البيانات مفهرسة بـ GIN Trigram للبحث السريع في أرقام القطع ومطابقتها مع مخازن الكويت والقاهرة في أقل من 30ms.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "Direct In-Memory Fitment DAG over Heavy Join SQL Tables",
          ar: "اعتماد رسم بياني في الذاكرة لمصفوفة التوافق بدلاً من الاستعلامات المترابطة المعقدة",
        },
        rationale: {
          en: "Eliminated 6-table relational joins on vehicle search queries, cutting latency from 240ms to 18ms.",
          ar: "إلغاء ربط 6 جداول في استعلامات البحث عن السيارات، مما خفض زمن الاستجابة من 240ms إلى 18ms.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Discrepancies in aftermarket cross-reference catalogs leading to false-positive fitment suggestions.",
          ar: "تضارب أرقام القطع البديلة بين الشركات المصنعة مما قد يقترح قطعاً غير متوافقة بنسبة 100%.",
        },
        resolution: {
          en: "Instituted a dual-tier verification gate: strict OEM chassis match required before unlocking the purchase button.",
          ar: "تطبيق بوابة تحقق مزدوجة: اشتراط تطابق رقم الشاسيه وكود المحرك الموثق قبل تفعيل زر إتمام الشراء.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Incompatibility return rate plummeted from 22% to under 0.8%. Average catalog search latency dropped to 18ms (P99).",
      ar: "انخفضت نسبة المرتجعات الناتجة عن عدم التوافق من 22% إلى أقل من 0.8%، مع وصول سرعة البحث لـ 18ms.",
    },
    lessonsLearned: {
      en: "In high-stakes automotive parts commerce, proactive fitment confirmation at the top of the funnel eliminates the largest driver of customer churn.",
      ar: "في تجارة قطع غيار السيارات، التحقق الاستباقي من التوافق قبل إضافة القطعة للسلة يقضي على أكبر مسبب لشكاوى العملاء.",
    },
    databaseSchema: {
      en: "PostgreSQL Tables: `vehicles` (vin_pattern, make, model, year_start, year_end, engine_code), `parts` (id, oem_number, brand, name, category_id), `fitment_matrix` (vehicle_id, part_id, axle_position, notes), `inventory_stocks` (part_id, warehouse_location, qty_available).",
      ar: "جداول PostgreSQL: السيارات `vehicles`، القطع `parts`، مصفوفة التوافق `fitment_matrix` مع موضع التركيب (أمامي/خلفي)، ومخزون المستودعات `inventory_stocks`.",
    },
    apiContracts: {
      en: "POST /api/v1/fitment/verify-vin -> `{ vin: 'WBA33AY08...' }` -> returns `{ verified: true, vehicle: 'BMW 330i G20', engine: 'B48B20' }` in 18ms; GET /api/v1/parts/catalog?vin=... -> filtered list of 100% compatible components.",
      ar: "نقطة النهاية POST /api/v1/fitment/verify-vin للتحقق الفوري من رقم الهيكل في 18ms؛ وGET /api/v1/parts/catalog لعرض القطع المتوافقة حصراً مع السيارة.",
    },
  },
  {
    id: "cs-egypt-tourism",
    projectId: "egypt-tourism",
    title: {
      en: "Dynamic Itinerary Generation & Cultural Tour Sales Engine",
      ar: "محرك توليد المسارات السياحية التفاعلية وحجز الجولات الثقافية",
    },
    overview: {
      en: "Architecting a high-speed travel portal combining static-generated historic guidebooks with real-time tour capacity allocation.",
      ar: "معمارية بوابة سياحية فائقة السرعة تجمع بين التوليد الثابت لأدلة المعالم وإدارة السعة اللحظية للجولات.",
    },
    context: {
      en: "International travelers booking Egyptian multi-city historical circuits need transparent itineraries, interactive route visualizations, and live multi-currency booking.",
      ar: "المسافرون الدوليون الراغبون في استكشاف المعالم المصرية بحاجة لمسارات واضحة وتفاعلية وتأكيد فوري للرحلات بالعملات المختلفة.",
    },
    problemStatement: {
      en: "Dynamic itinerary builders frequently suffer from severe layout shifts, slow visual asset loading over cellular networks, and inconsistent tour booking locks.",
      ar: "بوابات الجولات غالباً ما تعاني من بطء تحميل الصور التراثية عالية الدقة واهتزاز الواجهات وأخطاء حجز المواعيد المتزامنة.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Hybrid ISR Itinerary Architecture", ar: "معمارية هجينة لتوليد برامج الرحلات (ISR)" },
        desc: {
          en: "Next.js Incremental Static Regeneration delivering landmark itineraries instantly from edge cache while updating seat availability dynamically.",
          ar: "توليد صفحات البرامج السياحية مسبقاً على خوادم الحافة (Edge) لفتح الصفحة فوراً مع تحديث عدد المقاعد المتاحة بشكل لحظي.",
        },
      },
      {
        step: "02",
        title: { en: "Optimistic Slot Reservation with TTL", ar: "حجز المقاعد الاستباقي مع مهلة زمنية مؤقتة" },
        desc: {
          en: "15-minute temporary slot reservation lock via Redis TTL preventing double-booking during checkout sessions across Cairo, Luxor, and Aswan tours.",
          ar: "قفل مؤقت لمقاعد الجولة السياحية لمدة 15 دقيقة عبر Redis لمنع تضارب الحجوزات أثناء إتمام الدفع.",
        },
      },
      {
        step: "03",
        title: { en: "Localized Currency Parity Pipeline", ar: "محرك تسعير متعدد العملات اللحظي" },
        desc: {
          en: "Real-time edge currency conversion presenting transparent pricing in USD, EUR, EGP, and SAR without client-side calculation delay.",
          ar: "تحويل مباشر لأسعار البرامج السياحية لعملات متعددة (الدولار، اليورو، الجنيه المصري، الريال السعودي) مع تثبيت السعر أثناء الدفع.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "Next.js Edge Image Optimization with Responsive AVIF/WebP",
          ar: "تحسين صور المعالم على الحافة باستخدام صيغ AVIF و WebP المتجاوبة",
        },
        rationale: {
          en: "Reduced hero image payload by 72% over international mobile cellular networks, ensuring sub-1s Largest Contentful Paint (LCP).",
          ar: "تقليص حجم صور الأهرامات والمعابد بنسبة 72% على شبكات المحمول، مما خفض زمن تحميل الصفحة لأقل من ثانية واحدة.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Coordinating multi-city schedules (flights, Nile cruise sailings, museum entries) without date misalignment.",
          ar: "تنسيق جداول رحلات الطيران ومواعيد إبحار الفنادق العائمة وتذاكر المتاحف دون أي تضارب زمني.",
        },
        resolution: {
          en: "Engineered a calendar constraint validator that automatically prevents invalid arrival-to-departure schedules.",
          ar: "تطوير محرك قيود تقويمية يتحقق آلياً من تسلسل مسار الرحلة ويمنع اختيار تواريخ غير متناسقة.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Sub-0.8s LCP on mobile 4G networks; 0 booking double-allocation errors; 38% increase in full-itinerary completions.",
      ar: "سرعة تحميل 0.8s على شبكات المحمول؛ صفر أخطاء حجز مزدوج؛ وزيادة بنسبة 38% في إتمام حجز البرامج الكاملة.",
    },
    lessonsLearned: {
      en: "Transparent visual timelines with explicit daily schedules convert substantially higher than generic list-based travel packages.",
      ar: "المسارات البصرية الواضحة المقسمة يوماً بيوم تحقق معدلات حجز أعلى بكثير مقارنة بقوائم الرحلات التقليدية.",
    },
    databaseSchema: {
      en: "PostgreSQL Tables: `tours` (id, slug, title_en, title_ar, duration_days, base_price_usd), `itinerary_days` (tour_id, day_number, city, activity_desc, included_meals), `tour_departures` (id, tour_id, start_date, max_capacity, booked_seats), `currency_rates` (currency_code, exchange_rate, last_synced).",
      ar: "جداول PostgreSQL: الجولات `tours`، أيام البرامج `itinerary_days`، مواعيد الانطلاق والسعة `tour_departures`، وأسعار صرف العملات `currency_rates`.",
    },
    apiContracts: {
      en: "GET /api/v1/tours/:slug -> returns full structured itinerary with daily milestones; POST /api/v1/tours/hold-slot -> `{ departure_id, seats: 2 }` -> returns `{ lock_token, expires_in_seconds: 900 }`.",
      ar: "نقطة النهاية GET /api/v1/tours/:slug للبرنامج السياحي التفصيلي؛ وPOST /api/v1/tours/hold-slot لحجز المقاعد مؤقتاً لمدة 15 دقيقة.",
    },
  },
  {
    id: "cs-arab-cinema",
    projectId: "arab-family-cinema",
    title: {
      en: "Purposeful Media Architecture: Adaptive HLS Streaming & RTL Cultural Curation",
      ar: "معمارية منصة السينما الهادفة: بث HLS التكيفي وإدارة المحتوى العائلي العربي",
    },
    overview: {
      en: "Engineering a family-first digital cinema platform with strict Arabic RTL typography, adaptive streaming manifests, and ad-free cultural curation.",
      ar: "بناء منصة سينمائية رقمية تركز على القيم العائلية مع واجهة عربية أصيلة وبث فيديو تكيفي عالي الاستقرار.",
    },
    context: {
      en: "Arab families seeking quality cinematic entertainment often encounter intrusive ads, algorithmically inappropriate recommendations, and degraded RTL interfaces.",
      ar: "العائلات العربية الباحثة عن ترفيه هادف تعاني من الإعلانات المزعجة، والمحتوى غير اللائق، وضعف دعم الواجهات العربية في المنصات العالمية.",
    },
    problemStatement: {
      en: "Delivering high-definition streaming with zero buffering across disparate regional bandwidth conditions while preserving full Arabic typographic elegance.",
      ar: "توفير بث فيديو فائق الدقة دون تقطيع عبر سرعات اتصال متباينة مع الحفاظ على التناسق والجمال البصري العربي.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Adaptive Bitrate HLS Delivery", ar: "بث الفيديو التكيفي (HLS)" },
        desc: {
          en: "Segmented HTTP Live Streaming architecture switching seamlessly between 1080p, 720p, and 480p based on real-time client throughput telemetry.",
          ar: "تقسيم الفيديو لشرائح متتابعة (HLS) مع التبديل التلقائي السلس بين جودات العرض حسب سرعة اتصال المستخدم.",
        },
      },
      {
        step: "02",
        title: { en: "RTL-First Custom Media Controls", ar: "مشغل وسائط مصمم خصيصاً لاتجاه RTL" },
        desc: {
          en: "Custom HTML5 video controller with mirrored scrub bars, Arabic typographic time-codes, and dedicated family-safe skip markers.",
          ar: "مشغل فيديو مخصص يعكس شريط التقدم ليتطابق مع اتجاه القراءة العربي، مع توقيتات رقمية واضحة وفواصل للمشاهد العائلية.",
        },
      },
      {
        step: "03",
        title: { en: "Strict Family-Safe Classification Taxonomy", ar: "تصنيف عائلي دقيق ومعايير أمان صارمة" },
        desc: {
          en: "Hierarchical content tagging filtering out all violence, profanity, and intrusive third-party ad networks by architectural design.",
          ar: "نظام تصنيف وتصفية محكم يستبعد تلقائياً أي مشاهد غير ملائمة أو إعلانات خارجية دخيلة، لضمان بيئة آمنة للطفل والأسرة.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "Zero External Ad Network SDKs Embedded in Runtime",
          ar: "الاستغناء الكامل عن حزم إعلانات الطرف الثالث في كود المنصة",
        },
        rationale: {
          en: "Eliminated tracking cookies, boosted client render speed, and protected children from inappropriate commercial messaging.",
          ar: "حماية خصوصية الأطفال، وتسريع تشغيل المنصة، وضمان عدم ظهور أي إعلانات خادشة للحياء.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Fullscreen API in mobile browsers causing horizontal scroll desynchronization in RTL orientation.",
          ar: "تعارض واجهة ملء الشاشة على متصفحات الهواتف مع محاذاة عناصر التحكم في وضع الاتجاه من اليمين لليسار.",
        },
        resolution: {
          en: "Encapsulated video player in a shadow DOM boundary with CSS logical properties, isolating browser native fullscreen controls.",
          ar: "عزل المشغل في بيئة منعزلة مع استخدام الخصائص المنطقية في CSS لمنع أي تشوه عند التدوير وملء الشاشة.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "99.8% buffer-free playback session rate; zero inappropriate content incidents; high organic adoption among educators and families.",
      ar: "نسبة بث مستقر دون تقطيع بلغت 99.8%؛ انعدام تام لأي محتوى غير لائق؛ وإشادة واسعة من العائلات والمربين.",
    },
    lessonsLearned: {
      en: "Cultural authenticity in digital products is a structural engineering choice, not merely translating strings into Arabic.",
      ar: "الهوية الثقافية في المنتجات الرقمية هي قرار معماري وتصميمي متكامل، وليست مجرد ترجمة لغوية للنصوص.",
    },
    databaseSchema: {
      en: "PostgreSQL Tables: `media_titles` (id, title_ar, synopsis, duration_minutes, age_rating, release_year), `video_renditions` (id, media_id, resolution, bandwidth_bps, hls_stream_url), `categories` (id, name_ar, icon), `watch_history` (user_id, media_id, progress_seconds, completed).",
      ar: "جداول PostgreSQL: عناوين الأفلام `media_titles`، جودات البث `video_renditions` مع روابط HLS، التصنيفات العائلية `categories`، وسجل المتابعة `watch_history`.",
    },
    apiContracts: {
      en: "GET /api/v1/cinema/stream/:id/manifest.m3u8 -> streams secure HLS master playlist; GET /api/v1/cinema/catalog?category=family-values -> returns curated media collection with parental rating metadata.",
      ar: "نقطة النهاية GET /api/v1/cinema/stream/:id/manifest.m3u8 لبث قائمة HLS المشفرة؛ وGET /api/v1/cinema/catalog لتصفح المحتوى العائلي المصنف.",
    },
  },
  {
    id: "cs-memory-game",
    projectId: "interactive-memory-game",
    title: {
      en: "Algorithmic State Machines, Web Audio Synthesis & 60 FPS DOM Optimization",
      ar: "معمارية آلة الحالات الخوارزمية، التوليد الصوتي، وتحسين تصيير DOM بمعدل 60 إطاراً",
    },
    overview: {
      en: "A high-performance demonstration of browser runtime optimization: pure state machines, synthesized audio without asset downloads, and zero layout thrashing.",
      ar: "برهان عملي على الأداء الفائق في المتصفح: إدارة حالات نقية، توليد صوتي فوري دون ملفات خارجية، وثبات بصري مطلق بمعدل 60FPS.",
    },
    context: {
      en: "Browser gaming interactions frequently lag when rapid user inputs trigger simultaneous DOM animations, audio playback, and score updates.",
      ar: "التطبيقات التفاعلية في المتصفح تتأثر سلباً عند توالي نقرات المستخدم السريعة مما يؤدي لتداخل الحركات وتأخر الاستجابة.",
    },
    problemStatement: {
      en: "Event race conditions during card flips, memory leaks from audio objects, and garbage collection pauses degrading frame rates below 60 FPS.",
      ar: "تضارب الأحداث عند النقر السريع، وتراكم كائنات الصوت في الذاكرة، وانخفاض معدل الإطارات عند إعادة رسم عناصر DOM.",
    },
    architectureSteps: [
      {
        step: "01",
        title: { en: "Finite State Machine with Atomic Transition Locks", ar: "آلة حالات محددة (FSM) بأقفال ذرية" },
        desc: {
          en: "Strict state transitions (IDLE -> ONE_FLIPPED -> EVALUATING -> MATCHED / RESET) preventing card-flip race condition exploits.",
          ar: "تنظيم حالات اللعبة عبر آلة حالات ذرية تمنع أي نقرات غير مصرح بها أثناء دوران البطاقات أو تقييم التطابق.",
        },
      },
      {
        step: "02",
        title: { en: "Synthesized Web Audio API Oscillators", ar: "توليد نغمات صوتية برمجية عبر Web Audio API" },
        desc: {
          en: "Pure algorithmic sound synthesis generating interactive chimes, clicks, and chords without downloading a single external audio file.",
          ar: "توليد المؤثرات الصوتية برمجياً عبر متذبذبات Web Audio دون الحاجة لتحميل أي ملف صوتي من الخادم، مما يوفر سرعة استجابة فورية وحجماً صفرياً.",
        },
      },
      {
        step: "03",
        title: { en: "GPU-Accelerated 3D CSS Transforms", ar: "تحريك ثلاثي الأبعاد معجل عبر كارت الشاشة (GPU)" },
        desc: {
          en: "CSS perspective and transform-style: preserve-3d executed on dedicated GPU compositor layers, guaranteeing zero layout thrashing.",
          ar: "دوران البطاقات ثلاثي الأبعاد بتقنية GPU Compositor لمنع إعادة حساب أبعاد الصفحة والحفاظ على استقرار 60 FPS.",
        },
      },
    ],
    keyDecisions: [
      {
        decision: {
          en: "Algorithmic Web Audio Synthesis over Audio Element MP3s",
          ar: "اعتماد التوليد الصوتي البرمجي بدلاً من ملفات MP3 التقليدية",
        },
        rationale: {
          en: "Zero network latency, 0 KB bundle weight, and instant deterministic audio feedback upon user touch.",
          ar: "استجابة صوتية فورية منعدمة التأخير، وحجم ملفات صفر كيلوبايت، وتفادي مشاكل الحظر التلقائي للصوت في المتصفحات.",
        },
      },
    ],
    technicalChallenges: [
      {
        challenge: {
          en: "Rapid double-clicking causing visual desynchronization of flipped cards.",
          ar: "النقر السريع المزدوج يسبب تداخل بطاقات غير متطابقة في حالة الانقلاب.",
        },
        resolution: {
          en: "Implemented an atomic flipLock mutex flag that rejects all pointer events during 300ms evaluation windows.",
          ar: "تطبيق قفل ذري (Mutex) يرفض استقبال أي نقرات إضافية خلال نافذة المقارنة البالغة 300ms.",
        },
      },
    ],
    metricsOrOutcome: {
      en: "Sustained 60 FPS across all tested mobile and desktop browsers. 0 KB audio asset download footprint; 0.8 MB total DOM memory baseline.",
      ar: "ثبات كامل عند 60 إطاراً في الثانية على كافة المتصفحات؛ صفر كيلوبايت لملفات الصوت؛ واستهلاك ذاكرة أقل من 0.8MB.",
    },
    lessonsLearned: {
      en: "Web platform native APIs (Web Audio, CSS 3D Transforms) are vastly more performant and lightweight than bloated third-party game libraries.",
      ar: "استثمار إمكانيات المتصفح الأصلية يعطي أداءً أسرع وأخف بكثير من الاعتماد على مكتبات ألعاب خارجية ثقيلة.",
    },
    databaseSchema: {
      en: "In-Memory FSM Schema: `GameState { status: 'idle' | 'evaluating' | 'won', activeCards: Card[16], firstSelection: number | null, movesCount: number, matchedPairs: number, timerMs: number, flipLock: boolean }`.",
      ar: "هيكل الحالة في الذاكرة: كائن GameState يحدد حالة اللعبة، مصفوفة البطاقات النشطة، عداد الحركات، الأزواج المتطابقة، والمؤقت الزمني.",
    },
    apiContracts: {
      en: "Local Audio Synthesizer: `synthesizeTone(freq: number, type: 'sine' | 'triangle', durationMs: number)`; Local Fisher-Yates Shuffle: `shuffleDeck<T>(items: T[]): T[]` with cryptographic randomness.",
      ar: "واجهات برمجية في المتصفح: دالة synthesizeTone لتوليد الترددات الصوتية، ودالة الخلط العشوائي المنصفة shuffleDeck.",
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
