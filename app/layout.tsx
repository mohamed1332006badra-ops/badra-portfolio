import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AmbientBackground } from "@/components/layout/ambient-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "BADRA — Mohamed Ahmed Badra | Full-Stack Developer · AI Systems Architect",
  description: "Personal engineering portfolio of Mohamed Ahmed Badra. Full-Stack Developer, AI Systems Architect, and Digital Product Builder. Building high-throughput production systems, multi-tenant SaaS, and real-time AI engines.",
  keywords: [
    "Mohamed Ahmed Badra",
    "BADRA",
    "Full-Stack Developer",
    "AI Systems Architect",
    "Software Architecture",
    "Next.js 16",
    "TypeScript",
    "Supabase PostgreSQL",
    "FastAPI",
    "RAG",
    "Vector Search",
    "Enterprise SaaS",
  ],
  authors: [{ name: "Mohamed Ahmed Badra" }],
  creator: "Mohamed Ahmed Badra",
  metadataBase: new URL("https://badra-portfolio.vercel.app"),
  alternates: {
    canonical: "https://badra-portfolio.vercel.app",
    languages: {
      "en-US": "https://badra-portfolio.vercel.app",
      "ar-EG": "https://badra-portfolio.vercel.app",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG", "ar_SA"],
    url: "https://badra-portfolio.vercel.app",
    siteName: "BADRA — Mohamed Ahmed Badra",
    title: "BADRA — Mohamed Ahmed Badra | Full-Stack Developer · AI Systems Architect",
    description: "Building digital products that solve real problems. High-throughput production systems, multi-tenant SaaS platforms, and real-time AI engines.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BADRA — Mohamed Ahmed Badra | Full-Stack Developer · AI Systems Architect",
    description: "Personal engineering portfolio of Mohamed Ahmed Badra. High-throughput production systems, multi-tenant SaaS, and real-time AI engines.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${ibmArabic.variable} h-full antialiased dark overflow-x-hidden max-w-[100vw]`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("badra_theme");if(t==="light"){document.documentElement.classList.remove("dark")}else{document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#08090d] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden max-w-[100vw]">
        <Providers>
          <AmbientBackground />
          <div className="relative z-10 flex flex-col min-h-screen overflow-x-hidden max-w-[100vw]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
