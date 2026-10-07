import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

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
  title: "BADRA — Mohamed Ahmed Badra | Full-Stack Developer · AI Engineer",
  description: "Personal engineering product of Mohamed Ahmed Badra. Full-Stack Developer, AI Engineer, and Digital Product Builder. I build digital products that solve real problems.",
  keywords: [
    "Mohamed Ahmed Badra",
    "BADRA",
    "Full-Stack Developer",
    "AI Engineer",
    "Software Architecture",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "RAG",
    "Vector Search",
    "Digital Product Builder",
  ],
  authors: [{ name: "Mohamed Ahmed Badra" }],
  creator: "Mohamed Ahmed Badra",
  metadataBase: new URL("https://badra.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_EG", "ar_SA"],
    url: "https://badra.dev",
    siteName: "BADRA — Mohamed Ahmed Badra",
    title: "BADRA — Mohamed Ahmed Badra | Full-Stack Developer · AI Engineer",
    description: "I build digital products that solve real problems. Engineering, systems, and product development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BADRA — Mohamed Ahmed Badra",
    description: "I build digital products that solve real problems. Full-Stack Developer · AI Engineer.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${ibmArabic.variable} h-full antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("badra_theme");if(t==="light"){document.documentElement.classList.remove("dark")}else{document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#08090d] text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
