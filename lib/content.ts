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
    tiktok: "https://www.tiktok.com/@mohamed1332006badra",
    facebook: "https://www.facebook.com/mohamed1332006badra",
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
      ar: "منصة مواد بناء الخليج للتجارة والمقاولات",
    },
    tagline: {
      en: "High-concurrency B2B/B2C construction commerce platform with materials calculator for Kuwait market.",
      ar: "منصة تجارة إلكترونية متطورة لمواد البناء مع حاسبة ذكية للكميات مخصصة للسوق الكويتي.",
    },
    category: "fullstack",
    categoryLabel: {
      en: "B2B/B2C Commerce & Logistics",
      ar: "التجارة واللوجستيات B2B/B2C",
    },
    featured: true,
    status: "production",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Materials Calculator", "Tailwind CSS"],
    problem: {
      en: "Construction procurement is traditionally fragmented, requiring complex mathematical volume estimation and currency management for cross-border projects.",
      ar: "شراء وتوريد مواد البناء في قطاع المقاولات يعاني من تعقيد حساب الكميات واختلاف العملات وصعوبة إدارة الطلبات الكبيرة عبر الإنترنت.",
    },
    solution: {
      en: "Engineered a specialized construction e-commerce engine with built-in materials quantity calculator, multi-currency support, and optimized bilingual checkout flow.",
      ar: "هندسة منصة تجارة إلكترونية متخصصة لمواد البناء تتضمن حاسبة ذكية لكميات الخرسانة والحديد والتشطيبات، مع إتمام طلبات ثنائي اللغة للسوق الكويتي.",
    },
    architecture: {
      en: "Next.js App Router with ISR catalog pages, Supabase PostgreSQL relational schema, and client-side instant volume algorithms.",
      ar: "معمارية Next.js متقدمة مع صفحات منتجات متجددة ذاتياً وقاعدة بيانات Supabase وخوارزميات حساب كميات لحظية في المتصفح.",
    },
    challenges: {
      en: "Accurately calculating volumetric requirements across differing commercial metric units with zero browser latency.",
      ar: "الحساب الرياضي الدقيق لاحتياجات مشاريع البناء عبر وحدات قياس تجارية مختلفة بدون أي تأخير للمستخدم.",
    },
    outcome: {
      en: "Streamlined order placement workflow, reducing quote turnaround time from days to instantaneous digital checkout.",
      ar: "تقليل زمن طلب عروض الأسعار وحساب الكميات من أيام إلى إتمام رقمي فوري في دقائق معدودة.",
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
    hasCaseStudy: false,
    demoUrl: "https://badra-portfolio.vercel.app",
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
    hasCaseStudy: false,
    demoUrl: "https://badra-portfolio.vercel.app",
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
    hasCaseStudy: false,
    demoUrl: "https://badra-portfolio.vercel.app",
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
    hasCaseStudy: false,
    demoUrl: "https://badra-portfolio.vercel.app",
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
