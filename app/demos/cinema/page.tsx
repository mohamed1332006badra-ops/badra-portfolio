"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ShieldCheck,
  Star,
  Film,
  Bookmark,
  ArrowLeft,
} from "lucide-react";

interface CinemaTitle {
  id: string;
  titleEn: string;
  titleAr: string;
  genre: "historical" | "science" | "nature" | "animation" | "drama";
  ageRating: "all" | "7+" | "12+";
  duration: string;
  year: number;
  rating: number;
  directorEn: string;
  directorAr: string;
  synopsisEn: string;
  synopsisAr: string;
  image: string;
  videoUrl?: string;
  culturalValues: {
    familySafetyScore: number;
    moralWisdom: number;
    historicalFidelity: number;
  };
  tags: string[];
}

const CINEMA_CATALOG: CinemaTitle[] = [
  {
    id: "film-01",
    titleEn: "The Golden Age of Cordoba: Architects of Light",
    titleAr: "عصر قرطبة الذهبي: رواد الفكر والعمارة",
    genre: "historical",
    ageRating: "all",
    duration: "1h 54m",
    year: 2024,
    rating: 9.6,
    directorEn: "Dr. Zaid Al-Mansoor",
    directorAr: "د. زيد المنصور",
    synopsisEn: "A cinematic documentary epic chronicling the profound intellectual renaissance of 10th-century Andalusia, where medicine, astronomy, and architectural marvels flourished in peace.",
    synopsisAr: "ملحمة وثائقية وسينمائية ترصد النهضة العلمية والمعمارية في الأندلس بالقرن العاشر الميلادي، وازدهار علوم الطب والفلك والترجمة في سلام وتسامح.",
    image: "https://images.unsplash.com/photo-1548625361-19597371d0e5?auto=format&fit=crop&w=1200&q=80",
    culturalValues: { familySafetyScore: 10, moralWisdom: 9.8, historicalFidelity: 9.9 },
    tags: ["Andalusia", "Astronomy", "Architecture", "Philosophy"],
  },
  {
    id: "film-02",
    titleEn: "Ibn Battuta: Footsteps Across the Known World",
    titleAr: "ابن بطوطة: خطوات عبر العالم المعروف",
    genre: "historical",
    ageRating: "7+",
    duration: "2h 12m",
    year: 2023,
    rating: 9.4,
    directorEn: "Karim El-Sharif",
    directorAr: "كريم الشريف",
    synopsisEn: "Over thirty years and 73,000 miles, follow the extraordinary voyages of Tangier's scholar as he crosses Africa, the Arabian Gulf, Persia, and China.",
    synopsisAr: "رحلة ملحمية على مدار 30 عاماً وأكثر من 73 ألف ميل، تتبع أسفار الرحالة الطنجي العظيم عبر إفريقيا والخليج العربي وبلاد فارس والصين.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    culturalValues: { familySafetyScore: 10, moralWisdom: 9.6, historicalFidelity: 9.7 },
    tags: ["Exploration", "Geography", "Cultures", "Travel"],
  },
  {
    id: "film-03",
    titleEn: "Secrets of the Arabian Desert Oryx & Falcon",
    titleAr: "أسرار المها العربي وصقور الربع الخالي",
    genre: "nature",
    ageRating: "all",
    duration: "52m",
    year: 2024,
    rating: 9.2,
    directorEn: "Nadia Ben-Hassan",
    directorAr: "نادية بن حسان",
    synopsisEn: "Shot over 14 months in 4K HDR across the pristine dunes of the Empty Quarter, capturing the resilience and survival of rare desert wildlife.",
    synopsisAr: "تصوير سينمائي فائق الدقة (4K HDR) على مدار 14 شهراً في كثبان الربع الخالي، يوثق دورة حياة المها والصقور والحيوانات النادرة وتكيفها المذهل.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    culturalValues: { familySafetyScore: 10, moralWisdom: 9.2, historicalFidelity: 9.5 },
    tags: ["Wildlife", "Conservation", "Arabian Peninsula", "4K UHD"],
  },
  {
    id: "film-04",
    titleEn: "The Astrolabe: Navigating the Stars",
    titleAr: "الإسطرلاب: قراءة النجوم وقياس الزمن",
    genre: "science",
    ageRating: "7+",
    duration: "1h 18m",
    year: 2023,
    rating: 9.5,
    directorEn: "Tariq Masoud",
    directorAr: "طارق مسعود",
    synopsisEn: "How Islamic scholars like Al-Zarqali and Maryam Al-Ijliya perfected the mechanical astronomical computer that mapped heavens and guided navigators across oceans.",
    synopsisAr: "قصة ابتكار وتطوير حاسوب الفلك الميكانيكي على يد علماء الحضارة الإسلامية مثل الزرقالي ومريم الإسطرلابية لرصد الكواكب والملاحة البحرية.",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
    culturalValues: { familySafetyScore: 10, moralWisdom: 9.9, historicalFidelity: 9.8 },
    tags: ["Mathematics", "Astronomy", "Navigation", "Invention"],
  },
  {
    id: "film-05",
    titleEn: "Al-Haramain: Echoes of Stone & Faith",
    titleAr: "الحرمان الشريفان: عبق التاريخ وقدسية المكان",
    genre: "historical",
    ageRating: "all",
    duration: "1h 35m",
    year: 2024,
    rating: 9.8,
    directorEn: "Ahmad Sami",
    directorAr: "أحمد سامي",
    synopsisEn: "An architectural and spiritual retrospective examining the magnificent engineering expansions and historic craftsmanship of Makkah and Madinah.",
    synopsisAr: "استعراض تاريخي ومعماري استثنائي يوثق توسعات الحرمين الشريفين وهندسة العمارة الفريدة على مر العصور.",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80",
    culturalValues: { familySafetyScore: 10, moralWisdom: 10, historicalFidelity: 9.9 },
    tags: ["Spirituality", "Architecture", "Sacred Heritage"],
  },
  {
    id: "film-06",
    titleEn: "Chronicles of the Silk Road Oases",
    titleAr: "واحات طريق الحرير: قوافل التجارة والحكمة",
    genre: "drama",
    ageRating: "12+",
    duration: "2h 05m",
    year: 2023,
    rating: 9.1,
    directorEn: "Layla Murad",
    directorAr: "ليلى مراد",
    synopsisEn: "A heartwarming narrative following a caravan merchant guild resolving diplomatic disputes through honor, contract integrity, and poetic eloquence.",
    synopsisAr: "دراما تاريخية ملهمة تتبع نقابة تجار القوافل في حل النزاعات وحماية المسافرين عبر قيم الصدق والوفاء بالعهود والشعر العربي البليغ.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    culturalValues: { familySafetyScore: 9.8, moralWisdom: 9.7, historicalFidelity: 9.4 },
    tags: ["Commerce", "Ethics", "Historical Drama", "Honor"],
  },
];

export default function CinemaDemoPage() {
  const [lang, setLang] = useState<"ar" | "en">("ar"); // Default to Arabic for cultural cinema
  const [activeTitle, setActiveTitle] = useState<CinemaTitle>(CINEMA_CATALOG[0]);
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [watchlist, setWatchlist] = useState<string[]>(["film-01", "film-04"]);

  // Video player interactive state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(342); // 5m 42s
  const duration = 6840; // 1h 54m
  const [volume, setVolume] = useState<number>(85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [subtitle, setSubtitle] = useState<"ar" | "en" | "off">("ar");
  const [quality, setQuality] = useState<string>("4K HDR");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Playback timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, duration]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    }
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const filteredTitles = CINEMA_CATALOG.filter((title) => {
    const matchesAge = ageFilter === "all" || title.ageRating === ageFilter;
    const matchesGenre = genreFilter === "all" || title.genre === genreFilter;
    return matchesAge && matchesGenre;
  });

  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#07080d] text-slate-100 font-sans selection:bg-rose-500 selection:text-white antialiased"
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#07080d]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              <span>{lang === "ar" ? "العودة للملف الرئيسي" : "Back to Portfolio"}</span>
            </Link>

            <div className="h-5 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center font-black text-white text-sm shadow-md shadow-rose-500/20">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block">
                  {lang === "ar" ? "سينما الأسرة الحديدية" : "Iron Family Cinema"}
                </span>
                <span className="text-[10px] font-mono text-rose-400 block -mt-1">
                  Iron Family Streaming · 100% Curated & Safe
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls: Family Safe Badge & Lang Switcher */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === "ar" ? "بيئة عائلية آمنة خالية من الإعلانات" : "Ad-Free Family Safe Mode"}</span>
            </div>

            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="px-2.5 py-1 text-xs font-mono rounded border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Video Player Showcase */}
      <section className="relative w-full bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Simulated 4K Player Frame */}
          <div className="relative aspect-[16/9] w-full max-h-[580px] rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl group">
            {/* Background Backdrop Image */}
            <Image
              src={activeTitle.image}
              alt={activeTitle.titleEn}
              fill
              priority
              sizes="100vw"
              className={`object-cover object-center filter transition-all duration-700 ${
                isPlaying ? "brightness-[0.75] scale-102" : "brightness-[0.55]"
              }`}
            />

            {/* Ambient Dark Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />

            {/* Top Bar inside Player */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300 z-20">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px]">
                  4K HDR
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {activeTitle.ageRating === "all"
                    ? (lang === "ar" ? "لكافة الأعمار" : "All Ages")
                    : `${activeTitle.ageRating}`}
                </span>
                <span className="text-white font-bold hidden sm:inline">
                  {lang === "ar" ? activeTitle.titleAr : activeTitle.titleEn}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Bitrate: 24.5 Mbps</span>
                </span>
              </div>
            </div>

            {/* Center Big Play Button if paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl shadow-rose-600/40 transition-transform hover:scale-110 cursor-pointer"
                >
                  <Play className={`w-8 h-8 fill-white ${lang === "ar" ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}

            {/* Bottom Custom Video Player Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20 space-y-3">
              {/* Progress Scrubber */}
              <div className="relative w-full h-1.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden group/bar">
                <div
                  className="h-full bg-rose-600 rounded-full relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Control Buttons Bar */}
              <div className="flex items-center justify-between text-xs font-mono">
                {/* Left: Play/Pause, Time, Volume */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <div className="text-slate-300 text-[11px]">
                    <span className="text-white font-bold">{formatTime(currentTime)}</span>
                    <span className="mx-1 text-slate-500">/</span>
                    <span className="text-slate-400">{formatTime(duration)}</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  </div>
                </div>

                {/* Right: Subtitles, Speed, Quality, Fullscreen */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Subtitle Toggle */}
                  <button
                    onClick={() => setSubtitle(subtitle === "ar" ? "en" : subtitle === "en" ? "off" : "ar")}
                    className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white text-[11px]"
                  >
                    CC: {subtitle.toUpperCase()}
                  </button>

                  {/* Playback Speed */}
                  <button
                    onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1)}
                    className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white text-[11px]"
                  >
                    {playbackSpeed}x
                  </button>

                  {/* Quality Selector */}
                  <button
                    type="button"
                    onClick={() => setQuality(q => q === "4K HDR" ? "1080p" : q === "1080p" ? "720p" : "4K HDR")}
                    className="px-2 py-0.5 rounded bg-rose-600/30 border border-rose-500/40 text-rose-300 text-[10px] font-bold hidden sm:inline hover:bg-rose-600/50 cursor-pointer"
                  >
                    {quality}
                  </button>

                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white"
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Title Meta Bar */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-400 font-bold">
                  {activeTitle.genre.toUpperCase()}
                </span>
                <span className="text-slate-400 text-xs font-mono">{activeTitle.year}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 text-xs font-mono">{activeTitle.duration}</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400 text-xs font-mono font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {activeTitle.rating}
                </span>
              </div>

              <h2 className="text-2xl font-black text-white">
                {lang === "ar" ? activeTitle.titleAr : activeTitle.titleEn}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                {lang === "ar" ? activeTitle.synopsisAr : activeTitle.synopsisEn}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleWatchlist(activeTitle.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  watchlist.includes(activeTitle.id)
                    ? "bg-rose-500/20 border-rose-500 text-rose-300"
                    : "bg-slate-950 border-slate-700 text-slate-300 hover:text-white"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {watchlist.includes(activeTitle.id)
                    ? (lang === "ar" ? "في قائمة المشاهدة" : "In Watchlist")
                    : (lang === "ar" ? "إضافة للمشاهدة" : "Add to Watchlist")}
                </span>
              </button>

              <button
                onClick={() => setIsPlaying(true)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{lang === "ar" ? "بدء العرض الفوري" : "Watch Master 4K"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Navigation */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Filter Tabs Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          {/* Age Filters */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">
              {lang === "ar" ? "التصنيف العائلي:" : "Family Rating:"}
            </span>
            {[
              { id: "all", labelAr: "الكل", labelEn: "All Ratings" },
              { id: "all", labelAr: "عام (لكافة الأعمار)", labelEn: "All Ages" },
              { id: "7+", labelAr: "+7 ناشئة", labelEn: "7+ Youth" },
              { id: "12+", labelAr: "+12 عائلي", labelEn: "12+ Family" },
            ].map((f, idx) => (
              <button
                key={idx}
                onClick={() => setAgeFilter(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  ageFilter === f.id
                    ? "bg-rose-600 text-white font-bold"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {lang === "ar" ? f.labelAr : f.labelEn}
              </button>
            ))}
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", labelAr: "كافة الأعمال", labelEn: "All Genres" },
              { id: "historical", labelAr: "ملاحم تاريخية", labelEn: "Historical" },
              { id: "science", labelAr: "علوم وابتكار", labelEn: "Science" },
              { id: "nature", labelAr: "طبيعة وبرية", labelEn: "Nature" },
              { id: "drama", labelAr: "دراما هادفة", labelEn: "Moral Drama" },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => setGenreFilter(g.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  genreFilter === g.id
                    ? "bg-slate-800 text-white font-bold border border-slate-700"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {lang === "ar" ? g.labelAr : g.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTitles.map((title) => (
            <div
              key={title.id}
              onClick={() => {
                setActiveTitle(title);
                setIsPlaying(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 hover:border-rose-500/50 hover:bg-slate-900/80 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Poster Artwork */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 mb-3.5 border border-slate-800">
                  <Image
                    src={title.image}
                    alt={title.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/90 text-emerald-400 border border-emerald-500/30">
                      {title.ageRating === "all" ? "ALL AGES" : title.ageRating}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                      {title.duration}
                    </span>
                  </div>
                </div>

                {/* Title & Metadata */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span className="text-rose-400">{title.genre.toUpperCase()}</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {title.rating}
                  </span>
                </div>

                <h3 className="font-extrabold text-white text-base group-hover:text-rose-400 transition-colors line-clamp-1 mb-1.5">
                  {lang === "ar" ? title.titleAr : title.titleEn}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {lang === "ar" ? title.synopsisAr : title.synopsisEn}
                </p>
              </div>

              {/* Cultural Score Meter */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">
                  {lang === "ar" ? "أمان الأسرة:" : "Family Safety:"}
                </span>
                <span className="text-emerald-400 font-bold">
                  {title.culturalValues.familySafetyScore}/10 ★
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
