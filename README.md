# BADRA — Mohamed Ahmed Badra

> **Full-Stack Developer · AI Engineer · Digital Product Builder**  
> *"I build digital products that solve real problems."*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

---

## Overview

**BADRA** is a production-grade personal engineering product and portfolio engineered by **Mohamed Ahmed Badra**. Designed and built from first principles, this portfolio serves as its own primary case study in modern web architecture, systems design, accessibility, and bilingual UX.

### Core Capabilities & Highlights

* **Interactive Engineering Lab**: In-browser interactive simulators demonstrating systems engineering concepts:
  * *RAG Retrieval & Grounding Simulation* (Vector search, similarity ranking, chunk assembly, hallucination mitigation).
  * *Multi-Tier Latency & Cache Hierarchy Simulation* (L1 In-Memory, Redis Distributed Cache, Primary DB latency comparison).
  * *Token Bucket Rate Limiter Simulation* (Burst allowance, token regeneration, and backpressure simulation).
* **Architecture Visualizer**: Dynamic interactive model illustrating high-throughput client/edge/AI backend topologies with latency budgets and traffic flow simulation.
* **Production Case Studies**: Exhaustive technical teardowns featuring context, core problems, technical trade-offs, architecture decisions, and measured outcomes.
* **AI Project Scoper**: Interactive architectural scoping tool providing deliverable roadmaps, tech stack recommendations, risk analyses, and exploratory technical questions.
* **Native Bilingual UX (English & Arabic)**: First-class Right-to-Left (RTL) support utilizing CSS logical properties, bidirectional typography (`IBM Plex Sans Arabic` + `Geist`), and persistent locale management.
* **Keyboard Command Center (`⌘K`)**: Quick navigation, theme toggling, locale switching, and direct action triggers.
* **Accessible & High-Performance**: 100/100 Best Practices, 100/100 SEO, 96/100 Accessibility, 99/100 Desktop Performance on Chromium Lighthouse.

---

## Technology Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Partial Prefetching, Static Generation)
* **Runtime**: React 19
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS v4 & Vanilla CSS Variables
* **Icons**: [Lucide React](https://lucide.dev/)
* **Typography**: Geist Sans, Geist Mono, IBM Plex Sans Arabic via `next/font/google`
* **Linting & Quality**: ESLint 9 (Next Core Web Vitals)

---

## Project Structure

```text
├── app/
│   ├── api/
│   │   ├── ai-scope/route.ts      # Architectural scoping endpoint
│   │   └── contact/route.ts       # Validated inquiry intake endpoint
│   ├── globals.css                # Design system tokens & utility classes
│   ├── layout.tsx                 # Root layout with font injection & metadata
│   ├── page.tsx                   # Main portfolio view composition
│   ├── robots.ts                  # Search engine crawl directives
│   └── sitemap.ts                 # Bilingual sitemap index
├── components/
│   ├── contact/                   # Contact section & inquiry modal
│   ├── hero/                      # Hero section & architecture visualizer
│   ├── lab/                       # Engineering Lab interactive simulators
│   ├── layout/                    # Navbar, footer, command palette
│   ├── projects/                  # Case studies, project cards & deep dives
│   ├── proof/                     # Architecture patterns & engineering proof
│   ├── services/                  # Engineering services & engagement models
│   └── ui/                        # Reusable accessible primitives (Button, Modal, etc.)
├── lib/
│   ├── content.ts                 # Bilingual content dictionary & project specs
│   ├── i18n-context.tsx           # useSyncExternalStore locale state manager
│   ├── theme-context.tsx          # useSyncExternalStore theme state manager
│   └── types.ts                   # TypeScript interfaces & domain types
├── public/                        # Static assets, manifests, icons
└── .env.example                   # Environment variable template
```

---

## Getting Started

### Prerequisites

* **Node.js**: `18.18.0` or higher (`20.x` or `22.x` recommended)
* **npm**: `9.x` or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamedahmedbadra/badra-portfolio.git
   cd badra-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   ```bash
   cp .env.example .env.local
   ```

### Running Locally

Start the local development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Verification & Build Commands

* **Type-check and Build**:
  ```bash
  npm run build
  ```
* **Run Production Server Locally**:
  ```bash
  npm run start
  ```
* **Run ESLint**:
  ```bash
  npm run lint
  ```

---

## Environment Variables

See [.env.example](file:///.env.example) for the complete list:

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public / Client | Base canonical URL used in SEO, Open Graph, and sitemap generation (e.g. `https://badra.dev`). |
| `OPENAI_API_KEY` | Server-Only | Optional API key for OpenAI LLM inference in the AI Project Scoper. |
| `GEMINI_API_KEY` | Server-Only | Optional API key for Google Gemini inference in the AI Project Scoper. |
| `CONTACT_NOTIFICATION_WEBHOOK_URL` | Server-Only | Optional webhook URL for forwarding inquiries to Slack/Discord/Telegram/CRM. |

*Note: All core features, interactive lab simulators, and architectural scoping analysis operate with zero external API dependencies via built-in deterministic algorithms.*

---

## Deployment (Vercel)

The project is natively optimized for zero-configuration deployment on **Vercel**:

1. Push your code to a GitHub repository.
2. Import the project in your [Vercel Dashboard](https://vercel.com/new).
3. Set Framework Preset to **Next.js**.
4. (Optional) Add your environment variables in **Project Settings → Environment Variables**.
5. Click **Deploy**.

---

## License

This project is licensed under the [MIT License](LICENSE).
