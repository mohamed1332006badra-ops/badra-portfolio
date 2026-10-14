export interface ResumeProfile {
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  location: { en: string; ar: string };
  phone: string;
  email: string;
  github: { label: string; url: string };
  portfolio: { label: string; url: string };
  linkedin: { label: string; url: string };
  whatsapp: { label: string; url: string };
}

export interface ResumeSkillCategory {
  category: { en: string; ar: string };
  skills: string[];
}

export interface ResumeExperience {
  role: { en: string; ar: string };
  company: string;
  location: { en: string; ar: string };
  period: { en: string; ar: string };
  highlights: { en: string[]; ar: string[] };
}

export interface ResumeProject {
  title: string;
  url: string;
  displayUrl: string;
  description: { en: string; ar: string };
  technologies: string[];
}

export interface ResumeEducation {
  degree: { en: string; ar: string };
  institution: { en: string; ar: string };
  period: { en: string; ar: string };
  details?: { en: string; ar: string };
}

export interface ResumeData {
  profile: ResumeProfile;
  summary: { en: string; ar: string };
  skills: ResumeSkillCategory[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  education: ResumeEducation[];
  languages: Array<{ name: { en: string; ar: string }; proficiency: { en: string; ar: string } }>;
}

export const RESUME_DATA: ResumeData = {
  profile: {
    name: {
      en: "Mohamed Ahmed Badra",
      ar: "محمد أحمد بدرة",
    },
    title: {
      en: "Full-Stack Software Engineer & AI Systems Builder",
      ar: "مهندس برمجيات شامل ومطور أنظمة الذكاء الاصطناعي",
    },
    location: {
      en: "Giza, Egypt",
      ar: "الجيزة، مصر",
    },
    phone: "+201016731179",
    email: "mohamed1332006badra@gmail.com",
    github: {
      label: "github.com/mohamed1332006badra-ops",
      url: "https://github.com/mohamed1332006badra-ops",
    },
    portfolio: {
      label: "badra-portfolio.vercel.app",
      url: "https://badra-portfolio.vercel.app",
    },
    linkedin: {
      label: "linkedin.com/in/mohamed1332006badra",
      url: "https://linkedin.com/in/mohamed1332006badra",
    },
    whatsapp: {
      label: "wa.me/201016731179",
      url: "https://wa.me/201016731179",
    },
  },

  summary: {
    en: "Results-driven Full-Stack & AI Systems Engineer with 3+ years of intensive architecture experience building high-throughput web applications, real-time telemetry systems, and LLM edge streaming pipelines. Specialized in Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Python (FastAPI) with zero layout shift and sub-100ms response targets. Proven track record architecting multi-tenant SaaS platforms, resilient database models with Supabase RLS, and high-concurrency e-commerce systems.",
    ar: "مهندس برمجيات شامل ومطور أنظمة ذكاء اصطناعي بخبرة تفوق 3 سنوات في هندسة وتطوير تطبيقات الويب فائقة الأداء، ومسارات استرجاع المعرفة (RAG)، وأنظمة القياس عن بُعد اللحظية، وتدفق نماذج الذكاء الاصطناعي عند الحافة (Edge). متخصص في Next.js 16، React 19، TypeScript، وFastAPI مع تحقيق أعلى معايير الاستجابة (أقل من 100ms) واستقرار الواجهات بنسبة 100%. سجل حافل ببناء منصات SaaS، وتطبيقات التجارة الإلكترونية، وأنظمة متعددة المستأجرين مع أمان صارم.",
  },

  skills: [
    {
      category: {
        en: "Frontend & Architecture",
        ar: "الواجهات الأمامية والمعمارية",
      },
      skills: [
        "React 19",
        "Next.js 16 (App Router)",
        "TypeScript",
        "Tailwind CSS v4",
        "Responsive & RTL Architecture",
        "Turbopack",
        "Core Web Vitals Optimization",
        "State Management",
      ],
    },
    {
      category: {
        en: "Backend & Distributed Systems",
        ar: "الخلفيات البرمجية والأنظمة الموزعة",
      },
      skills: [
        "Python (FastAPI)",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Supabase (RLS Security)",
        "Redis",
        "Server-Sent Events (SSE)",
        "WebSockets",
        "REST APIs",
        "Multi-Tenant Architectures",
      ],
    },
    {
      category: {
        en: "AI Engineering & Observability",
        ar: "هندسة الذكاء الاصطناعي والمراقبة",
      },
      skills: [
        "LLM Streaming",
        "RAG Pipelines",
        "Vector Search (pgvector)",
        "Prompt Orchestration",
        "Vercel Edge Telemetry",
        "Docker",
        "CI/CD Automation",
        "Git / GitHub Workflow",
      ],
    },
  ],

  experience: [
    {
      role: {
        en: "Lead Full-Stack Developer",
        ar: "مطور برمجيات شامل رئيسي",
      },
      company: "Badra Tech",
      location: {
        en: "Giza, Egypt (Hybrid)",
        ar: "الجيزة، مصر",
      },
      period: {
        en: "2023 – Present",
        ar: "2023 – حتى الآن",
      },
      highlights: {
        en: [
          "Architected and deployed scalable multi-tenant SaaS platforms and responsive web systems using Next.js 16, TypeScript, and Tailwind CSS v4 with full bilingual (Arabic/English) RTL/LTR native support.",
          "Engineered real-time telemetry and streaming architectures using Server-Sent Events (SSE) and WebSockets, slashing end-to-end event latency under 80ms.",
          "Designed resilient PostgreSQL and Supabase schemas with Row-Level Security (RLS) policies, securing enterprise workspaces against data leakage across tenants.",
          "Built low-latency LLM agent pipelines and vector search workflows with async query decomposition and Redis caching layers.",
          "Implemented automated CI/CD deployment pipelines on Vercel Edge with zero-downtime releases and strict TypeScript and ESLint verification gates.",
        ],
        ar: [
          "هندسة وإطلاق منصات SaaS متعددة المستأجرين وأنظمة ويب متجاوبة باستخدام Next.js 16 وTypeScript وTailwind CSS v4 مع دعم كامل وثنائي اللغة (عربي/إنجليزي) واتجاهات RTL/LTR.",
          "بناء أنظمة قياس عن بُعد وتدفق بيانات لحظي بالاعتماد على Server-Sent Events (SSE) وWebSockets مما قلل زمن انتقال الأحداث إلى أقل من 80ms.",
          "تصميم قواعد بيانات PostgreSQL وSupabase متينة مع سياسات أمان على مستوى الصفوف (RLS) لحماية مساحات العمل المؤسسية.",
          "تطوير مسارات وكلاء ذكاء اصطناعي منخفضة الكمون مع بحث متجهي وتقسيم استعلامات غير متزامن مع طبقات تخزين مؤقت عبر Redis.",
          "تأسيس خطوط نشر مستمر CI/CD على Vercel Edge بدون أي توقف في الخدمة مع بوابات جودة برمجية صارمة.",
        ],
      },
    },
  ],

  projects: [
    {
      title: "BADRA AI Platform",
      url: "https://badra-ai.vercel.app/",
      displayUrl: "badra-ai.vercel.app",
      description: {
        en: "High-performance AI SaaS platform featuring real-time SSE token streaming, prompt orchestration, deterministic fallback mechanisms, and sub-100ms first-token response times.",
        ar: "منصة ذكاء اصطناعي سحابية متقدمة تتميز بتدفق الرموز اللحظي عبر SSE، وإدارة الأوامر الذكية، وآليات استرجاع بديلة مع سرعة استجابة أولية تقل عن 100ms.",
      },
      technologies: ["Next.js 16", "React 19", "TypeScript", "SSE Streaming", "Tailwind CSS v4", "FastAPI"],
    },
    {
      title: "PULSECRM",
      url: "https://pulsecrm-theta.vercel.app",
      displayUrl: "pulsecrm-theta.vercel.app",
      description: {
        en: "Enterprise multi-tenant CRM engine with Supabase Row-Level Security (RLS), role-based access control (RBAC), interactive Kanban pipeline, and live telemetry analytics.",
        ar: "نظام إدارة علاقات عملاء مؤسسي متعدد المستأجرين مع أمان صارم عبر Supabase RLS، وإدارة الصلاحيات (RBAC)، ولوحات كانبان للمبيعات ومتابعة العمليات لحظياً.",
      },
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "RLS Security", "Tailwind CSS"],
    },
    {
      title: "Aurum Gulf",
      url: "https://aurumgulf.vercel.app",
      displayUrl: "aurumgulf.vercel.app",
      description: {
        en: "Regional gold pricing telemetry and market intelligence platform delivering sub-second price index updates, currency conversion, and analytical charting across Gulf markets.",
        ar: "منصة تسعير وتحليل أسواق الذهب الإقليمية مع تحديثات أسعار لحظية، وتحويل عملات مباشر، ورسوم بيانية تحليلية لأسواق الخليج العربي.",
      },
      technologies: ["React 19", "TypeScript", "Financial APIs", "Real-time Telemetry", "Tailwind CSS"],
    },
    {
      title: "Gulf Building Materials",
      url: "https://store-kuwait.vercel.app",
      displayUrl: "store-kuwait.vercel.app",
      description: {
        en: "High-concurrency B2B/B2C construction e-commerce engine with real-time stock sync, materials quantity calculator, multi-currency pricing, and bilingual checkout flow.",
        ar: "منصة تجارة إلكترونية متطورة لمواد البناء (B2B/B2C) مع حاسبة ذكية للكميات، وتزامن فوري للمخزون، وتعدد العملات، وإتمام طلبات مخصص للسوق الكويتي.",
      },
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Commerce APIs", "Tailwind CSS"],
    },
    {
      title: "MAJD PARTS Automotive",
      url: "/demos/majd-parts",
      displayUrl: "badra-portfolio.vercel.app/demos/majd-parts",
      description: {
        en: "Automotive spare parts digital commerce platform with VIN lookup and vehicle compatibility matrices.",
        ar: "منصة تجارة رقمية متخصصة لقطع غيار السيارات مع فلاتر التوافق وفحص أرقام الهياكل.",
      },
      technologies: ["Next.js", "TypeScript", "Compatibility Matrix", "PostgreSQL", "Tailwind CSS"],
    },
    {
      title: "Egypt Tour Sales Engine",
      url: "/demos/egypt-tourism",
      displayUrl: "badra-portfolio.vercel.app/demos/egypt-tourism",
      description: {
        en: "Interactive Egyptian tourism and tour sales portal with curated day-by-day itineraries and multi-currency checkout.",
        ar: "بوابة حجز وجولات سياحية متكاملة مع برامج يومية تفاعلية ودعم الدفع متعدد العملات.",
      },
      technologies: ["Next.js", "TypeScript", "Interactive Itineraries", "Tailwind CSS"],
    },
    {
      title: "Arab Family Cinema",
      url: "/demos/cinema",
      displayUrl: "badra-portfolio.vercel.app/demos/cinema",
      description: {
        en: "Purposeful family cinema streaming platform with RTL Arabic typography, family-safe curation, and adaptive video player.",
        ar: "منصة بث سينمائي عائلية هادفة مع خطوط عربية مخصصة وتصنيف آمن ومشغل فيديو متكيف.",
      },
      technologies: ["Next.js", "TypeScript", "Adaptive Video Streaming", "RTL Arabic", "Tailwind CSS"],
    },
    {
      title: "Algorithmic Memory Game",
      url: "/demos/memory-game",
      displayUrl: "badra-portfolio.vercel.app/demos/memory-game",
      description: {
        en: "High-performance 60fps algorithmic memory game with finite state machine logic and Web Audio API synthesis.",
        ar: "لعبة ذاكرة خوارزمية بمعدل 60 إطاراً في الثانية تعتمد على آلة الحالات المنتهية والتوليف الصوتي عبر Web Audio API.",
      },
      technologies: ["React", "TypeScript", "Finite State Machine", "Web Audio API", "CSS Animations"],
    },
  ],

  education: [
    {
      degree: {
        en: "Bachelor of Computer Science / Software Engineering",
        ar: "بكالوريوس علوم الحاسب / هندسة البرمجيات",
      },
      institution: {
        en: "Faculty of Computers and Artificial Intelligence",
        ar: "كلية الحاسبات والذكاء الاصطناعي",
      },
      period: {
        en: "2020 – 2024",
        ar: "2020 – 2024",
      },
      details: {
        en: "Focused on Distributed Systems, Algorithms, Database Architecture, and Artificial Intelligence.",
        ar: "التركيز على الأنظمة الموزعة، وهياكل البيانات والخوارزميات، وقواعد البيانات، والذكاء الاصطناعي.",
      },
    },
  ],

  languages: [
    {
      name: { en: "Arabic", ar: "العربية" },
      proficiency: { en: "Native", ar: "اللغة الأم" },
    },
    {
      name: { en: "English", ar: "الإنجليزية" },
      proficiency: { en: "Full Professional Working Proficiency", ar: "إتقان مهني كامل" },
    },
  ],
};
