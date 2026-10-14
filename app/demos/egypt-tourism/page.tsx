"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Star,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  X,
  CheckCircle2,
} from "lucide-react";

type Currency = "USD" | "EUR" | "SAR" | "EGP";

const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: "$", rate: 1, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  SAR: { symbol: "﷼", rate: 3.75, label: "SAR (﷼)" },
  EGP: { symbol: "E£", rate: 49.5, label: "EGP (E£)" },
};

interface ItineraryDay {
  day: number;
  location: string;
  locationAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  image: string;
  included: string[];
  duration: string;
  optionalAddons: { id: string; nameEn: string; nameAr: string; priceUsd: number }[];
}

const ITINERARY_DAYS: ItineraryDay[] = [
  {
    day: 1,
    location: "Giza & Cairo",
    locationAr: "الجيزة والقاهرة",
    titleEn: "Pyramids of Giza, Sphinx & Grand Egyptian Museum (GEM)",
    titleAr: "أهرامات الجيزة، تمثال أبو الهول، والمتحف المصري الكبير",
    descEn: "Private morning access to the Giza Plateau. Walk between the Great Pyramid of Khufu and Khafre with a private Senior Egyptologist, followed by VIP skip-the-line access to the Grand Egyptian Museum Tutankhamun galleries.",
    descAr: "دخول خاص صباحي لهضبة الجيزة وأهرامات خوفو وخفرع برفقة عالم مصريات أكاديمي، مع زيارة خاصة لقاعات توت عنخ آمون في المتحف المصري الكبير بدون انتظار.",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    included: ["Private Mercedes Chauffeur", "VIP GEM Entrance Ticket", "Private Egyptologist Lecturer", "Al-Azhar Park Gourmet Lunch"],
    duration: "Full Day (8 Hours)",
    optionalAddons: [
      { id: "quad-giza", nameEn: "Sunset Desert Quad Biking over Giza Dunes", nameAr: "جولة بيتش باجي عند غروب الشمس بكثبان الجيزة", priceUsd: 85 },
      { id: "sound-light", nameEn: "Giza Pyramids Private Sound & Light Show", nameAr: "عرض الصوت والضوء الخاص بالأهرامات", priceUsd: 110 },
    ],
  },
  {
    day: 2,
    location: "Luxor East Bank",
    locationAr: "الأقصر - البر الشرقي",
    titleEn: "Karnak Hypostyle Hall & Avenue of Sphinxes by Torchlight",
    titleAr: "معبد الكرنك وصالة الأعمدة الكبرى وطريق الكباش",
    descEn: "Early private charter flight to Luxor. Marvel at the 134 colossal columns of Karnak's Hypostyle Hall. Evening private tour along the newly restored 2.7km Avenue of Sphinxes leading to Luxor Temple.",
    descAr: "رحلة طيران خاصة للأقصر وزيارة صالة الأعمدة الشاهقة في الكرنك، تليها جولة مسائية مضيئة بطريق الكباش الممتد لمعبد الأقصر المهيب.",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
    included: ["Domestic Flight Cairo-Luxor", "5-Star Nile Cruiser Suite Check-in", "Sunset High Tea on Deck", "Evening Luxor Temple Pass"],
    duration: "Full Day (10 Hours)",
    optionalAddons: [
      { id: "hot-air-balloon", nameEn: "Sunrise Royal Hot Air Balloon over Valley of the Kings", nameAr: "منطاد طائر ملكي عند شروق الشمس فوق وادي الملوك", priceUsd: 145 },
    ],
  },
  {
    day: 3,
    location: "Luxor West Bank",
    locationAr: "الأقصر - البر الغربي",
    titleEn: "Valley of the Kings, Queen Hatshepsut & Colossi of Memnon",
    titleAr: "وادي الملوك، مقبرة توت عنخ آمون، ومعبد حتشبسوت بالدير البحري",
    descEn: "Descend into the vibrantly painted royal tombs of the New Kingdom pharaohs, including special private access permits to the Tomb of Seti I and Tutankhamun.",
    descAr: "استكشاف مقابر فراعنة الدولة الحديثة وجدرانها الملونة الزاهية، مع تصريح دخول حصري لمقبرة الملك سيتي الأول والملك توت عنخ آمون.",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80",
    included: ["Special Royal Tombs Permit", "Terraced Temple of Hatshepsut", "Private Air-Conditioned Launch", "Luxor West Bank Gourmet Dining"],
    duration: "Full Day (7 Hours)",
    optionalAddons: [
      { id: "nefertari", nameEn: "Exclusive Permit: Queen Nefertari Tomb (QV66)", nameAr: "تصريح خاص لمقبرة الملكة نفرتاري الفاخرة", priceUsd: 220 },
    ],
  },
  {
    day: 4,
    location: "Aswan & Nile River",
    locationAr: "أسوان ونهر النيل",
    titleEn: "Philae Island Temple of Isis & Private Dahabiya Sunset Sail",
    titleAr: "معبد فيلة وجزيرة إيزيس والإبحار بالدهبية الملكية في أسوان",
    descEn: "Sail upstream on the Nile to the sanctuary island of Philae, dedicated to Goddess Isis. Experience an authentic sunset voyage aboard a traditional luxury wooden Dahabiya amidst granite islands.",
    descAr: "الإبحار إلى جزيرة فيلة التاريخية المخصصة للإلهة إيزيس، مع رحلة إبحار هادئة عند المغيب بدهبية شراعية فخمة بين جزر الجرانيت والشلال الأول.",
    image: "https://images.unsplash.com/photo-1544971587-b842c56b921b?auto=format&fit=crop&w=1200&q=80",
    included: ["Private Boat to Philae Island", "Nubian Botanical Island Visit", "Authentic Nubian Cuisine Feast", "5-Star Nile Suite Stay"],
    duration: "Full Day (8 Hours)",
    optionalAddons: [
      { id: "abu-simbel", nameEn: "Early Morning Abu Simbel Temples Private Flight", nameAr: "رحلة طيران صباحية لمعبدي أبو سمبل العظيمين", priceUsd: 320 },
    ],
  },
  {
    day: 5,
    location: "Red Sea - Sharm El Sheikh",
    locationAr: "البحر الأحمر - شرم الشيخ",
    titleEn: "Ras Mohammed Marine Reserve & Coral Reef Yacht Cruise",
    titleAr: "محمية رأس محمد واليخوت البحرية بين الشعاب المرجانية",
    descEn: "Fly to the Red Sea Riviera for serene coastal luxury. Private chartered yacht excursion into Ras Mohammed National Park, renowned for world-class vibrant coral walls and sea turtles.",
    descAr: "الانتقال لساحل البحر الأحمر في شرم الشيخ، ويخت خاص للإبحار في مياه رأس محمد الساحرة لمشاهدة أندر الشعاب المرجانية والسلاحف البحرية.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    included: ["Domestic Flight Aswan-Sharm", "Private 50ft Yacht Charter", "Professional Snorkeling & Diving Gear", "Fresh Seafood Onboard Grill"],
    duration: "Full Day (8 Hours)",
    optionalAddons: [
      { id: "deep-scuba", nameEn: "Master PADI Guided Scuba Diving Dive (2 Tanks)", nameAr: "غوص سكوبا برفقة مدرب محترف (أسطوانتان)", priceUsd: 110 },
    ],
  },
];

export default function EgyptTourismDemoPage() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [tier, setTier] = useState<"deluxe" | "royal">("royal");
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["hot-air-balloon", "abu-simbel"]);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Conversion helper
  const convertPrice = (usd: number) => {
    const rate = CURRENCY_RATES[currency].rate;
    const symbol = CURRENCY_RATES[currency].symbol;
    const converted = Math.round(usd * rate);
    return `${symbol} ${converted.toLocaleString()}`;
  };

  // Base pricing
  const baseRatePerAdult = tier === "royal" ? 1850 : 1250;
  const baseRatePerChild = tier === "royal" ? 950 : 650;

  // Addons total
  const addonsTotalUsd = selectedAddons.reduce((acc, addonId) => {
    for (const day of ITINERARY_DAYS) {
      const match = day.optionalAddons.find((a) => a.id === addonId);
      if (match) return acc + match.priceUsd * adults;
    }
    return acc;
  }, 0);

  const totalUsd =
    adults * baseRatePerAdult + children * baseRatePerChild + addonsTotalUsd;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#08090d] text-slate-100 font-sans selection:bg-amber-500 selection:text-black antialiased"
    >
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#08090d]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${lang === "ar" ? "rotate-180" : ""}`} />
              <span>{lang === "en" ? "Back to Portfolio" : "العودة للملف الرئيسي"}</span>
            </Link>

            <div className="h-5 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-sm">
                ET
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block">
                  NILE & PHARAOHS
                </span>
                <span className="text-[10px] font-mono text-amber-400 block -mt-1">
                  Luxury Egypt Expeditions
                </span>
              </div>
            </div>
          </div>

          {/* Right actions: Currency switcher, Lang Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Currency Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
              {(["USD", "EUR", "SAR", "EGP"] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2 py-1 rounded transition-colors ${
                    currency === cur
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="px-2.5 py-1 text-xs font-mono rounded border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            >
              {lang === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner with Giza Pyramids */}
      <section className="relative h-[65vh] min-h-[460px] w-full overflow-hidden flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=2000&q=85"
          alt="Pyramids of Giza at Sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-[#08090d]/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === "en" ? "Private Bespoke Expeditions" : "رحلات سياحية ملكية خاصة ومخصصة"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl drop-shadow-md">
            {lang === "en"
              ? "The Royal 5-Day Egypt Odyssey: Cairo, Luxor, Aswan & Red Sea"
              : "الملحمة الملكية المصرية: 5 أيام بين القاهرة، الأقصر، أسوان والبحر الأحمر"}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-300 pt-1">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>4.98 / 5.0 (340+ Verified Reviews)</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>5 Days / 4 Nights</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === "en" ? "Ministry of Tourism Certified" : "مرخصة من وزارة السياحة والآثار"}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Container: Split Layout (Itinerary on Left, Booking Calculator on Right) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Day-by-Day Interactive Itinerary */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  {lang === "en" ? "Curated Day-by-Day Itinerary" : "البرنامج الزمني المنسق يوماً بيوم"}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === "en"
                    ? "Click on any day to inspect luxury inclusions, archaeological sites, and optional VIP experiences."
                    : "انقر على أي يوم لاستعراض المعالم الأثرية، التسهيلات المشمولة، والتجارب الإضافية."}
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-400">
                5 Chapters
              </span>
            </div>

            {/* Day Cards */}
            <div className="space-y-4">
              {ITINERARY_DAYS.map((dayItem) => {
                const isExpanded = expandedDay === dayItem.day;
                return (
                  <div
                    key={dayItem.day}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? "border-amber-500/50 bg-slate-900/80 shadow-xl"
                        : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                    }`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => setExpandedDay(isExpanded ? 0 : dayItem.day)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">DAY</span>
                          <span className="text-lg font-black text-white leading-none">0{dayItem.day}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {lang === "en" ? dayItem.location : dayItem.locationAr}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="text-xs font-mono text-slate-400">{dayItem.duration}</span>
                          </div>
                          <h3 className="font-bold text-white text-base sm:text-lg mt-0.5">
                            {lang === "en" ? dayItem.titleEn : dayItem.titleAr}
                          </h3>
                        </div>
                      </div>

                      <div className="p-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 shrink-0">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {/* Expanded Detail Body */}
                    {isExpanded && (
                      <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-5 animate-in fade-in duration-200">
                        {/* Day Image */}
                        <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                          <Image
                            src={dayItem.image}
                            alt={dayItem.titleEn}
                            fill
                            sizes="(max-width: 1024px) 100vw, 600px"
                            className="object-cover"
                          />
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {lang === "en" ? dayItem.descEn : dayItem.descAr}
                        </p>

                        {/* Included Features */}
                        <div>
                          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2">
                            {lang === "en" ? "VIP INCLUSIONS:" : "المميزات المشمولة حصرياً:"}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {dayItem.included.map((inc, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200"
                              >
                                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{inc}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Optional Add-ons */}
                        {dayItem.optionalAddons.length > 0 && (
                          <div className="pt-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                              {lang === "en" ? "OPTIONAL BESPOKE ADD-ONS:" : "تجارب إضافية اختيارية:"}
                            </span>
                            <div className="space-y-2">
                              {dayItem.optionalAddons.map((addon) => {
                                const isSelected = selectedAddons.includes(addon.id);
                                return (
                                  <div
                                    key={addon.id}
                                    onClick={() => toggleAddon(addon.id)}
                                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                                      isSelected
                                        ? "bg-amber-500/10 border-amber-500/50 text-white"
                                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div
                                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                                          isSelected
                                            ? "bg-amber-500 border-amber-500 text-black"
                                            : "border-slate-700 bg-slate-900"
                                        }`}
                                      >
                                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                      </div>
                                      <span className="text-xs font-medium">
                                        {lang === "en" ? addon.nameEn : addon.nameAr}
                                      </span>
                                    </div>

                                    <span className="font-mono text-xs font-bold text-amber-400 shrink-0">
                                      +{convertPrice(addon.priceUsd)} / person
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Instant Dynamic Booking Engine & Price Calculator */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-2xl border border-amber-500/40 bg-slate-900/90 backdrop-blur-md p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-extrabold text-white text-lg">
                    {lang === "en" ? "Instant Booking Engine" : "حاسبة الأسعار والحجز الفوري"}
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-Time Currency Ticker Synced</span>
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-400 block">Starting from</span>
                  <span className="text-lg font-black text-amber-400 font-mono">
                    {convertPrice(1250)}
                  </span>
                </div>
              </div>

              {/* Tier Selector */}
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-2 font-bold">
                  {lang === "en" ? "Expedition Tier:" : "مستوى الرحلة والفخامة:"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTier("deluxe")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tier === "deluxe"
                        ? "bg-amber-500/10 border-amber-500 text-white shadow-md"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-bold block">Deluxe 5-Star</span>
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                      {convertPrice(1250)} / guest
                    </span>
                  </button>

                  <button
                    onClick={() => setTier("royal")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      tier === "royal"
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-md ring-1 ring-amber-400/50"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold block text-amber-300">Royal VIP Suite</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                      {convertPrice(1850)} / guest
                    </span>
                  </button>
                </div>
              </div>

              {/* Guests Count Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">
                    {lang === "en" ? "Adults (12+):" : "البالغون (+12):"}
                  </span>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-white text-base">{adults}</span>
                    <button
                      onClick={() => setAdults((prev) => prev + 1)}
                      className="w-7 h-7 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">
                    {lang === "en" ? "Children (2-11):" : "الأطفال (2-11):"}
                  </span>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-white text-base">{children}</span>
                    <button
                      onClick={() => setChildren((prev) => prev + 1)}
                      className="w-7 h-7 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown Calculation */}
              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>
                    Base Package ({adults} Adults):
                  </span>
                  <span className="text-white">{convertPrice(adults * baseRatePerAdult)}</span>
                </div>

                {children > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Child Fare ({children} Children):</span>
                    <span className="text-white">{convertPrice(children * baseRatePerChild)}</span>
                  </div>
                )}

                {addonsTotalUsd > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>VIP Experiences ({selectedAddons.length} Selected):</span>
                    <span>+{convertPrice(addonsTotalUsd)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Egypt Tourism & Heritage Tax:</span>
                  <span className="text-emerald-400">INCLUDED (0.00)</span>
                </div>

                {/* Total Line */}
                <div className="flex items-baseline justify-between pt-3 border-t border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold block">
                      {lang === "en" ? "Net Guaranteed Price:" : "السعر الصافي الشامل:"}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      (All Flights, Guides & Permits Included)
                    </span>
                  </div>
                  <div className="text-2xl font-black text-amber-400 font-mono">
                    {convertPrice(totalUsd)}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === "en" ? "Book This Expedition" : "حجز هذه الرحلة الاستكشافية"}</span>
              </button>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free cancellation up to 7 days before departure</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setBookingModalOpen(false);
                setBookingConfirmed(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmed ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">
                    {lang === "en" ? "Expedition Reservation Summary" : "ملخص حجز الرحلة الملكية"}
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Package:</span>
                    <span className="text-white font-bold">5-Day Royal Odyssey</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tier:</span>
                    <span className="text-amber-400 font-bold uppercase">{tier} VIP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Guests:</span>
                    <span className="text-white">{adults} Adults {children > 0 ? `, ${children} Children` : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Selected Currency:</span>
                    <span className="text-white font-bold">{currency}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
                    <span className="text-slate-300 font-bold">Total Amount:</span>
                    <span className="text-amber-400 font-bold">{convertPrice(totalUsd)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === "en"
                    ? "Your reservation will be held for 24 hours. A Senior Luxury Concierge will contact you with private flight logistics and passport verification."
                    : "سيتم تثبيت حجزك لمدة 24 ساعة. سيتواصل معك مستشار السفر الخاص لترتيب تفاصيل الطيران الداخلي واستقبال كبار الزوار."}
                </p>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono hover:bg-slate-800"
                  >
                    {lang === "en" ? "Back" : "تعديل"}
                  </button>
                  <button
                    onClick={() => setBookingConfirmed(true)}
                    className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono shadow-md"
                  >
                    {lang === "en" ? "Confirm & Generate Voucher" : "تأكيد واستخراج القسيمة"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {lang === "en" ? "Expedition Reserved!" : "تم تأكيد حجز الرحلة بنجاح!"}
                </h3>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 max-w-xs mx-auto text-xs font-mono text-slate-300">
                  Voucher Code: <span className="text-amber-400 font-bold">EGY-ROYAL-88912</span>
                </div>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {lang === "en"
                    ? "An official itinerary dossier with private airport fast-track lounge access passes has been generated."
                    : "تم إصدار ملف الرحلة الرسمي وتصاريح صالة كبار الزوار بالمطار."}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setBookingModalOpen(false);
                      setBookingConfirmed(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold border border-slate-700"
                  >
                    {lang === "en" ? "Close" : "إغلاق"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
