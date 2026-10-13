"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  CheckCircle2,
  Car,
  ShieldCheck,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  FileText,
  X,
  Cpu,
} from "lucide-react";

interface VehicleSpec {
  vin: string;
  label: string;
  make: string;
  model: string;
  year: number;
  engine: string;
  chassis: string;
  transmission: string;
  market: string;
}

const PRESET_VINS: VehicleSpec[] = [
  {
    vin: "WBA3R1C58KA123456",
    label: "BMW 330i M-Sport (G20)",
    make: "BMW",
    model: "330i Sedan",
    year: 2023,
    engine: "2.0L TwinPower Turbo (B48B20O1) 255 HP",
    chassis: "G20 LCI",
    transmission: "8-Speed Steptronic Sport",
    market: "GCC Specification",
  },
  {
    vin: "WDD2050461F987654",
    label: "Mercedes-Benz C300 (W205)",
    make: "Mercedes-Benz",
    model: "C300 AMG Line",
    year: 2021,
    engine: "2.0L Turbo Inline-4 (M274 DE 20) 255 HP",
    chassis: "W205",
    transmission: "9G-TRONIC Automatic",
    market: "GCC Specification",
  },
  {
    vin: "JTEBU5JR8K5112233",
    label: "Toyota Land Cruiser LC300 VXR",
    make: "Toyota",
    model: "Land Cruiser 300 VXR",
    year: 2024,
    engine: "3.5L Twin-Turbo V6 (V35A-FTS) 409 HP",
    chassis: "FJA300 / VJA300",
    transmission: "10-Speed Direct Shift Auto",
    market: "Middle East / Kuwait Spec",
  },
  {
    vin: "WP0AB2A97LS198234",
    label: "Porsche 911 Carrera S (992)",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2022,
    engine: "3.0L Twin-Turbo Flat-6 (DKK) 443 HP",
    chassis: "992.1",
    transmission: "8-Speed Dual-Clutch PDK",
    market: "GCC Specification",
  },
];

interface PartItem {
  id: string;
  oemNumber: string;
  titleEn: string;
  titleAr: string;
  category: "brakes" | "engine" | "suspension" | "transmission" | "filtration";
  brand: string;
  origin: string;
  priceKwd: number;
  priceUsd: number;
  stockCount: number;
  warehouseLocation: string;
  compatibleVins: string[];
  image: string;
  specs: { [key: string]: string };
}

const PARTS_CATALOG: PartItem[] = [
  {
    id: "part-01",
    oemNumber: "34-11-6-860-244",
    titleEn: "Brembo 348mm Two-Piece Drilled Front Brake Rotors",
    titleAr: "أقراص فرامل أمامية بريمبو 348 مم مثقوبة ومزدوجة",
    category: "brakes",
    brand: "Brembo High Performance",
    origin: "Italy",
    priceKwd: 115,
    priceUsd: 375,
    stockCount: 14,
    warehouseLocation: "Shuwaikh Central Hub - Shelf A4",
    compatibleVins: ["WBA3R1C58KA123456", "WP0AB2A97LS198234"],
    image: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?auto=format&fit=crop&w=600&q=80",
    specs: { Diameter: "348 mm", Thickness: "30 mm", Type: "Drilled / Vented", Material: "High Carbon Alloy" },
  },
  {
    id: "part-02",
    oemNumber: "008-420-18-20",
    titleEn: "Akebono Ceramic Ultra-Low Dust Front Brake Pads",
    titleAr: "أقمشة فرامل أمامية سيراميك فائقة النظافة من أكيبونو",
    category: "brakes",
    brand: "Akebono Euro Precision",
    origin: "Japan / Germany",
    priceKwd: 42,
    priceUsd: 138,
    stockCount: 28,
    warehouseLocation: "Shuwaikh Central Hub - Shelf A9",
    compatibleVins: ["WDD2050461F987654", "WBA3R1C58KA123456"],
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
    specs: { Compound: "Ceramic Composite", SensorSlot: "Integrated Electronic", Temperature: "Up to 650°C" },
  },
  {
    id: "part-03",
    oemNumber: "12-13-8-657-273",
    titleEn: "Bosch High-Energy Ignition Coil Pack (Set of 4)",
    titleAr: "طقم كويلات اشتعال عالية الطاقة من بوش (4 كويلات)",
    category: "engine",
    brand: "Bosch OEM Germany",
    origin: "Germany",
    priceKwd: 68,
    priceUsd: 220,
    stockCount: 19,
    warehouseLocation: "Al-Rai Express Depo - Bin C2",
    compatibleVins: ["WBA3R1C58KA123456", "WDD2050461F987654"],
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    specs: { Voltage: "35,000 V Max", Core: "Dual Ferrite", Connector: "4-Pin Sealed OEM" },
  },
  {
    id: "part-04",
    oemNumber: "48510-69625",
    titleEn: "Bilstein B6 Heavy-Duty Nitrogen Gas Front Shock Absorber",
    titleAr: "مساعدات بيلشتاين B6 الغازية للمهام الشاقة - أمامي",
    category: "suspension",
    brand: "Bilstein Suspension",
    origin: "Germany",
    priceKwd: 85,
    priceUsd: 278,
    stockCount: 8,
    warehouseLocation: "Shuwaikh Central Hub - Heavy Rack 2",
    compatibleVins: ["JTEBU5JR8K5112233"],
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    specs: { Technology: "Monotube Gas Pressure", Stroke: "235 mm", Damping: "Dynamic Self-Adjusting" },
  },
  {
    id: "part-05",
    oemNumber: "S671-090-312",
    titleEn: "ZF LifeguardFluid 8 & Integrated Filter Sump Service Kit",
    titleAr: "طقم صيانة زيت ومرشح ناقل الحركة الألماني ZF 8HP",
    category: "transmission",
    brand: "ZF Friedrichshafen",
    origin: "Germany",
    priceKwd: 92,
    priceUsd: 300,
    stockCount: 22,
    warehouseLocation: "Shuwaikh Central Hub - Chemical Bay",
    compatibleVins: ["WBA3R1C58KA123456", "JTEBU5JR8K5112233"],
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    specs: { Volume: "7 Liters Fluid", Pan: "Molded with Magnets & Gasket", Bolts: "13x Torx OEM" },
  },
  {
    id: "part-06",
    oemNumber: "17801-F0050",
    titleEn: "Denso Multi-Fiber High Flow Engine Air Filter",
    titleAr: "فلتر هواء محرك عالي التدفق متعدد الألياف من دينسو",
    category: "filtration",
    brand: "Denso First Time Fit",
    origin: "Japan",
    priceKwd: 18,
    priceUsd: 58,
    stockCount: 45,
    warehouseLocation: "Al-Rai Express Depo - Shelf D1",
    compatibleVins: ["JTEBU5JR8K5112233"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    specs: { Efficiency: "99.4% ISO 5011", Media: "Electrostatic Pleated", ServiceLife: "30,000 KM" },
  },
  {
    id: "part-07",
    oemNumber: "992-106-037-02",
    titleEn: "BorgWarner Electronic Variable High-Flow Water Pump",
    titleAr: "مضخة مياه إلكترونية متغيرة التدفق من بورغ وارنر",
    category: "engine",
    brand: "BorgWarner OEM",
    origin: "Germany",
    priceKwd: 165,
    priceUsd: 540,
    stockCount: 6,
    warehouseLocation: "Shuwaikh Central Hub - High-Security Vault",
    compatibleVins: ["WP0AB2A97LS198234"],
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
    specs: { Actuation: "PWM ECU Governed", Impeller: "Composite Lightweight", Flow: "180 L/min" },
  },
  {
    id: "part-08",
    oemNumber: "64-11-9-382-885",
    titleEn: "Mahle CareMetix 5-Layer Activated Charcoal Cabin Filter",
    titleAr: "فلتر مقصورة مهله كيرميتكس خماسي الطبقات بالكربون النشط",
    category: "filtration",
    brand: "Mahle Original",
    origin: "Germany",
    priceKwd: 26,
    priceUsd: 85,
    stockCount: 34,
    warehouseLocation: "Shuwaikh Central Hub - Shelf B8",
    compatibleVins: ["WBA3R1C58KA123456", "WDD2050461F987654"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    specs: { Protection: "PM2.5, Bacteria, VOCs & Dust", Layers: "5x Microfiber", Fitment: "Direct Drop-in" },
  },
];

interface CartItem {
  part: PartItem;
  quantity: number;
}

export default function MajdPartsDemoPage() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [vinInput, setVinInput] = useState<string>("WBA3R1C58KA123456");
  const [activeVin, setActiveVin] = useState<VehicleSpec>(PRESET_VINS[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([
    { part: PARTS_CATALOG[0], quantity: 1 },
    { part: PARTS_CATALOG[2], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  // Handle VIN selection
  const handleSelectVinPreset = (spec: VehicleSpec) => {
    setVinInput(spec.vin);
    setActiveVin(spec);
  };

  const handleCustomVinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = PRESET_VINS.find((v) => v.vin.toUpperCase() === vinInput.trim().toUpperCase());
    if (match) {
      setActiveVin(match);
    } else {
      // Create ad-hoc spec
      setActiveVin({
        vin: vinInput.toUpperCase(),
        label: `Custom Chassis (${vinInput.slice(0, 7)}...)`,
        make: "Universal Compatibility",
        model: "Vehicle Match System",
        year: 2023,
        engine: "Verified Against GCC Parts Matrix",
        chassis: vinInput.slice(0, 8),
        transmission: "Standard Auto / Manual",
        market: "GCC & Regional Import",
      });
    }
  };

  // Filter parts
  const filteredParts = useMemo(() => {
    return PARTS_CATALOG.filter((part) => {
      const matchesCategory = activeCategory === "all" || part.category === activeCategory;
      const matchesSearch =
        part.oemNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.titleAr.includes(searchQuery) ||
        part.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cart operations
  const addToCart = (part: PartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.part.id === part.id);
      if (existing) {
        return prev.map((item) =>
          item.part.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { part, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.part.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.part.id !== id));
  };

  const subtotalKwd = cart.reduce((acc, item) => acc + item.part.priceKwd * item.quantity, 0);
  const subtotalUsd = cart.reduce((acc, item) => acc + item.part.priceUsd * item.quantity, 0);
  const expressFreightKwd = subtotalKwd > 150 ? 0 : 5;

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-amber-500 selection:text-black antialiased"
    >
      {/* Top Header & Telemetry Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#07090e]/90 backdrop-blur-md">
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-black text-sm tracking-tighter">
                MP
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block">
                  MAJD PARTS
                </span>
                <span className="text-[10px] font-mono text-amber-400 block -mt-1">
                  OEM Automotive Telemetry
                </span>
              </div>
            </div>
          </div>

          {/* Right actions: Language Switcher, Cart trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="px-2.5 py-1 text-xs font-mono rounded border border-slate-700 bg-slate-900 text-slate-300 hover:text-white"
            >
              {lang === "en" ? "العربية" : "English"}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === "en" ? "B2B Cart" : "سلة القطع"}
              </span>
              <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[10px] flex items-center justify-center font-mono">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero & Interactive VIN Decoder Hub */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-amber-950/20 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
              <Car className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Dynamic Fitment Engine Active" : "محرك فحص التوافق اللحظي"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === "en"
                ? "Enterprise Automotive Spare Parts & VIN Matrix"
                : "منصة قطع غيار السيارات ومحرك مطابقة أرقام الهياكل (VIN)"}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === "en"
                ? "Enter any 17-digit Chassis VIN to instantly verify OEM part fitment, query Shuwaikh regional hub inventory, and eliminate costly return cycles with sub-20ms database fitment lookups."
                : "أدخل رقم الهيكل المكون من 17 رمزاً لمطابقة القطع الأصلية بدقة 100%، والاستعلام الفوري عن مخزون مستودعات الشويخ والري، ومنع أخطاء الطلب قبل الشحن."}
            </p>
          </div>

          {/* VIN Input Bar */}
          <form onSubmit={handleCustomVinSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-5 max-w-2xl">
            <div className="relative flex-1">
              <input
                type="text"
                value={vinInput}
                onChange={(e) => setVinInput(e.target.value)}
                placeholder="Enter 17-digit VIN (e.g. WBA3R1C58KA123456)..."
                className="w-full h-11 pl-4 pr-10 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-amber-500 transition-colors uppercase"
              />
              <Car className="absolute right-3.5 top-3 w-5 h-5 text-slate-500" />
            </div>
            <button
              type="submit"
              className="h-11 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>{lang === "en" ? "Decode VIN & Match" : "فحص وتأكيد التوافق"}</span>
            </button>
          </form>

          {/* Preset Quick-Test Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-mono">
              {lang === "en" ? "Test Presets:" : "نماذج جاهزة للاختبار:"}
            </span>
            {PRESET_VINS.map((preset) => (
              <button
                key={preset.vin}
                type="button"
                onClick={() => handleSelectVinPreset(preset)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                  activeVin.vin === preset.vin
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "bg-slate-950/80 text-slate-400 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Active Verified Vehicle Telemetry Banner */}
          <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{activeVin.label}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {lang === "en" ? "100% Fitment Verified" : "توافق موثق 100%"}
                  </span>
                </div>
                <div className="text-slate-400 text-xs font-mono flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                  <span>VIN: {activeVin.vin}</span>
                  <span>•</span>
                  <span>{activeVin.engine}</span>
                  <span>•</span>
                  <span>{activeVin.transmission}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono text-slate-500 block">
                {lang === "en" ? "Telemetry Status" : "حالة النظام"}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>P99 Cache Fitment: 14ms</span>
              </span>
            </div>
          </div>
        </section>

        {/* Filter Bar & Search */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", labelEn: "All Parts", labelAr: "كافة القطع" },
              { id: "brakes", labelEn: "Brakes & Rotors", labelAr: "الفرامل والأقراص" },
              { id: "engine", labelEn: "Engine & Ignition", labelAr: "المحرك والإشعال" },
              { id: "suspension", labelEn: "Suspension", labelAr: "المساعدات والتعليق" },
              { id: "transmission", labelEn: "Transmission", labelAr: "ناقل الحركة (الجير)" },
              { id: "filtration", labelEn: "Filtration", labelAr: "الفلاتر والزيوت" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {lang === "en" ? cat.labelEn : cat.labelAr}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "en" ? "Filter by OEM part # or name..." : "بحث برقم القطعة أو الاسم..."}
              className="w-full h-9 pl-9 pr-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => {
            const isFit = part.compatibleVins.includes(activeVin.vin);
            return (
              <div
                key={part.id}
                className={`rounded-2xl border bg-slate-900/60 p-5 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl ${
                  isFit ? "border-slate-800" : "border-slate-800/40 opacity-75"
                }`}
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-800">
                    <Image
                      src={part.image}
                      alt={part.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                      {isFit ? (
                        <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500/90 text-slate-950 shadow-md">
                          ✓ FIT GUARANTEED
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-md text-[10px] font-mono font-semibold bg-amber-500/80 text-slate-950 shadow-md">
                          ⚠️ VERIFY FITMENT
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-slate-300 border border-slate-800">
                        {part.brand}
                      </span>
                    </div>
                  </div>

                  {/* OEM & Title */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs text-amber-400 font-bold tracking-wider">
                      OEM #{part.oemNumber}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {part.origin}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-2 line-clamp-2">
                    {lang === "en" ? part.titleEn : part.titleAr}
                  </h3>

                  {/* Technical Specs Pills */}
                  <div className="grid grid-cols-2 gap-1.5 mb-4 text-[11px] font-mono">
                    {Object.entries(part.specs).map(([key, val]) => (
                      <div key={key} className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-500 block text-[9px]">{key}</span>
                        <span className="text-slate-300 truncate block">{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Warehouse & Stock */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pt-2 border-t border-slate-800/80">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {part.stockCount} units in stock
                    </span>
                    <span className="truncate max-w-[150px]">{part.warehouseLocation}</span>
                  </div>
                </div>

                {/* Footer Price & Add to Cart */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
                  <div>
                    <div className="text-lg font-black text-white font-mono">
                      {part.priceKwd} KWD
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      ≈ ${part.priceUsd} USD
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(part)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-md hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === "en" ? "Add to Order" : "إضافة للطلب"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-500" />
                  <h2 className="font-extrabold text-white text-lg">
                    {lang === "en" ? "B2B Procurement Cart" : "سلة طلبيات قطع الغيار"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Vehicle Compatibility Banner */}
              <div className="my-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <span className="text-slate-500 block">Target Chassis:</span>
                <span className="text-amber-400 font-bold">{activeVin.label}</span>
                <span className="text-slate-400 block text-[11px]">VIN: {activeVin.vin}</span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono">
                    {lang === "en" ? "Your procurement cart is empty." : "سلة المشتريات فارغة حالياً."}
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.part.id}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono text-amber-400 block">
                          OEM #{item.part.oemNumber}
                        </span>
                        <h4 className="text-white font-semibold truncate">
                          {lang === "en" ? item.part.titleEn : item.part.titleAr}
                        </h4>
                        <span className="text-slate-400 font-mono">
                          {item.part.priceKwd} KWD × {item.quantity} = {item.part.priceKwd * item.quantity} KWD
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.part.id, -1)}
                          className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.part.id, 1)}
                          className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.part.id)}
                          className="p-1 text-rose-400 hover:text-rose-300 ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Subtotal & Checkout Trigger */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>{lang === "en" ? "Parts Subtotal:" : "مجموع القطع:"}</span>
                  <span className="text-white font-bold">{subtotalKwd} KWD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{lang === "en" ? "Shuwaikh Courier Dispatch:" : "توصيل سريع من الشويخ:"}</span>
                  <span className="text-emerald-400">{expressFreightKwd === 0 ? "FREE" : `${expressFreightKwd} KWD`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-amber-400 pt-2 border-t border-slate-800">
                  <span>{lang === "en" ? "Total Gross Invoice:" : "الإجمالي الصافي:"}</span>
                  <span>{subtotalKwd + expressFreightKwd} KWD (≈ ${subtotalUsd} USD)</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === "en" ? "Generate Pro-Forma B2B PO" : "إصدار أمر شراء رسمي B2B"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout / Invoice Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setCheckoutModalOpen(false);
                setOrderConfirmed(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderConfirmed ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">
                    {lang === "en" ? "Official B2B Purchase Order Review" : "مراجعة أمر الشراء المؤسسي المعتمد"}
                  </h3>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-slate-400">PO Ref: <span className="text-amber-400">MP-KW-2026-9812</span></div>
                  <div className="text-slate-400">Chassis Fitment: <span className="text-white">{activeVin.label}</span></div>
                  <div className="text-slate-400">Warehouse: <span className="text-emerald-400">Shuwaikh Hub 01 (Instant Release)</span></div>
                  <div className="text-slate-400">Line Items: <span className="text-white">{cart.length} SKUs</span></div>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed">
                  {lang === "en"
                    ? "Submitting this purchase order generates a digitally signed pro-forma quote with Shuwaikh warehouse bin reservation for 48 hours."
                    : "تأكيد هذا الطلب ينشئ عرض سعر رسمي معتمد مع حجز القطع فوراً في مستودع الشويخ لمدة 48 ساعة."}
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono hover:bg-slate-800"
                  >
                    {lang === "en" ? "Cancel" : "إلغاء"}
                  </button>
                  <button
                    onClick={() => {
                      setOrderConfirmed(true);
                      setCart([]);
                    }}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono shadow-md"
                  >
                    {lang === "en" ? "Authorize & Confirm Order" : "اعتماد وتأكيد الشراء"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {lang === "en" ? "Order Confirmed & Reserved!" : "تم تأكيد الطلب وحجز القطع بنجاح!"}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {lang === "en"
                    ? "Purchase Order MP-KW-2026-9812 has been dispatched to warehouse fulfillment. Tracking will update via SMS & Email."
                    : "تم إرسال أمر الشراء لمستودعات الشويخ لتجهيز الشحن فوراً."}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setIsCartOpen(false);
                      setOrderConfirmed(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold border border-slate-700"
                  >
                    {lang === "en" ? "Done" : "إتمام"}
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
