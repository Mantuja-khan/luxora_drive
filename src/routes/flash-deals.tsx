import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Phone,
  Zap,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Clock,
  Sparkles,
  SlidersHorizontal,
  Flame,
} from "lucide-react";
import { getAllCars, type ProductCar } from "@/data/cars";
import luxoraLogoWhite from "@/assets/luxora-logo-white.png";

export const Route = createFileRoute("/flash-deals")({
  component: FlashDealsPage,
});

type CurrencyCode = "AED" | "USD" | "EUR" | "GBP";

interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rate: number;
  flag: string;
}

const currencies: CurrencyConfig[] = [
  { code: "AED", label: "AED (UAE Dirham)", symbol: "AED ", rate: 1.0, flag: "🇦🇪" },
  { code: "USD", label: "USD (US Dollar)", symbol: "$", rate: 0.272, flag: "🇺🇸" },
  { code: "EUR", label: "EUR (Euro)", symbol: "€", rate: 0.252, flag: "🇪🇺" },
  { code: "GBP", label: "GBP (British Pound)", symbol: "£", rate: 0.218, flag: "🇬🇧" },
];

const allCarBrands = [
  { id: "nissan", name: "NISSAN", count: "54 CARS" },
  { id: "mercedes", name: "MERCEDES", count: "60 CARS" },
  { id: "lamborghini", name: "LAMBORGHINI", count: "28 CARS" },
  { id: "ferrari", name: "FERRARI", count: "14 CARS" },
  { id: "porsche", name: "PORSCHE", count: "7 CARS" },
  { id: "rolls-royce", name: "ROLLS ROYCE", count: "15 CARS" },
  { id: "mclaren", name: "MCLAREN", count: "3 CARS" },
  { id: "bmw", name: "BMW", count: "25 CARS" },
  { id: "audi", name: "AUDI", count: "23 CARS" },
  { id: "range-rover", name: "RANGE ROVER", count: "34 CARS" },
  { id: "bentley", name: "BENTLEY", count: "8 CARS" },
  { id: "cadillac", name: "CADILLAC", count: "3 CARS" },
  { id: "chevrolet", name: "CHEVROLET", count: "30 CARS" },
  { id: "ford", name: "FORD", count: "22 CARS" },
];

const categoryDropdownCol1 = [
  "Rent Supercars",
  "Rent Luxury",
  "Rent SUV",
  "Rent 7 Seater",
  "Weekly Car Rental",
  "Long Term Car Rental",
  "Airport Car Rental",
  "Rent Electric",
  "Rent Convertible",
  "Wedding Car Rental",
  "Lease To Own",
];

const categoryDropdownCol2 = [
  "Rent Monthly",
  "Rent Sports",
  "Rent Modified",
  "Rent Economy Car",
  "Daily Car Rental",
  "Rent Muscle Car",
  "Business Car Rental",
  "Luxury Van Rental",
  "Car With Driver",
  "Patrol Experts",
];

const dubaiLocations = [
  { id: "dubai-mall", name: "Downtown Dubai & Dubai Mall" },
  { id: "marina", name: "Dubai Marina & JBR" },
  { id: "palm", name: "Palm Jumeirah & Atlantis" },
  { id: "difc", name: "DIFC & Financial Centre" },
  { id: "airport", name: "Dubai Airport (DXB VIP Terminal)" },
  { id: "business-bay", name: "Business Bay & Canal" },
  { id: "city-walk", name: "City Walk & Al Wasl" },
  { id: "jumeirah", name: "Jumeirah Beach Road" },
  { id: "creek", name: "Dubai Creek Harbour" },
  { id: "hills", name: "Dubai Hills Estate" },
  { id: "al-barsha", name: "Al Barsha & Mall of the Emirates" },
  { id: "meydan", name: "Meydan Racecourse & Nad Al Sheba" },
];

function FlashDealsPage() {
  const navigate = useNavigate();

  // Navigation Dropdown State
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("AED");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isLocationsDropdownOpen, setIsLocationsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] = useState<"brands" | "categories" | "locations" | "currency" | null>(null);

  // Active Category Filter for Flash Deals
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("ALL");

  // Multi-image slider indices
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});

  // Countdown timers per car
  const [countdownSeconds, setCountdownSeconds] = useState<Record<string, number>>({
    "nissan-patrol-lv-2026": 4 * 3600 + 15 * 60 + 30,
    "lambo-huracan-tiffany": 2 * 3600 + 10 * 60 + 40,
    "lambo-huracan-yellow": 1 * 3600 + 25 * 60 + 0,
    "defender-v8-white": 3 * 3600 + 45 * 60 + 15,
    "ferrari-f8-spider-red": 5 * 3600 + 12 * 60 + 20,
    "ferrari-sf90-stradale-black": 2 * 3600 + 40 * 60 + 50,
    "ferrari-f8-tributo-yellow": 3 * 3600 + 18 * 60 + 10,
    "nissan-patrol-custom-orange": 4 * 3600 + 55 * 60 + 0,
    "defender-lumma-acid-green": 6 * 3600 + 20 * 60 + 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        const next: Record<string, number> = {};
        for (const [k, v] of Object.entries(prev)) {
          next[k] = v > 0 ? v - 1 : 24 * 3600;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatFlashTimer = (totalSec: number): string => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h.toString().padStart(2, "0")}h : ${m.toString().padStart(2, "0")}m : ${s.toString().padStart(2, "0")}s`;
  };

  // Currency Converter
  const currentCurrencyConfig = useMemo(
    () => currencies.find((c) => c.code === selectedCurrency) || currencies[0],
    [selectedCurrency]
  );

  const formatPrice = useCallback(
    (amountInAed: number): string => {
      const converted = Math.round(amountInAed * currentCurrencyConfig.rate);
      if (selectedCurrency === "AED") {
        return `AED ${amountInAed.toLocaleString()}`;
      }
      return `${currentCurrencyConfig.symbol}${converted.toLocaleString()}`;
    },
    [currentCurrencyConfig, selectedCurrency]
  );

  // Retrieve Flash Deal Cars
  const allFleet = useMemo(() => getAllCars(), []);

  const flashCars = useMemo(() => {
    return allFleet.filter((car) => {
      // Must have active flash sale or substantial discount
      return (
        car.flashSale?.active ||
        car.originalDailyRate > car.dailyRate * 1.2
      );
    });
  }, [allFleet]);

  // Filtered by Category
  const filteredFlashCars = useMemo(() => {
    if (activeCategoryFilter === "ALL") return flashCars;
    if (activeCategoryFilter === "SUPERCARS") {
      return flashCars.filter((c) => c.category.toLowerCase().includes("supercar") || c.brand.toLowerCase() === "ferrari" || c.brand.toLowerCase() === "lamborghini");
    }
    if (activeCategoryFilter === "SUVS") {
      return flashCars.filter((c) => c.category.toLowerCase().includes("suv") || c.brand.toLowerCase() === "nissan" || c.brand.toLowerCase() === "land rover");
    }
    if (activeCategoryFilter === "MODIFIED") {
      return flashCars.filter((c) => c.category.toLowerCase().includes("modified") || c.name.toLowerCase().includes("custom") || c.name.toLowerCase().includes("lumma"));
    }
    return flashCars;
  }, [flashCars, activeCategoryFilter]);

  const handleCardNextImage = (cardId: string, maxImages: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [cardId]: ((prev[cardId] || 0) + 1) % maxImages,
    }));
  };

  const handleCardPrevImage = (cardId: string, maxImages: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [cardId]: ((prev[cardId] || 0) - 1 + maxImages) % maxImages,
    }));
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-white selection:bg-[#FFE600] selection:text-black">
      {/* =========================================================================
          LUXORA DRIVE MASTER TOP NAVBAR (MATCHING HOME & DETAILS PAGE)
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between bg-[#0a0c14] border-b border-neutral-800 shadow-2xl">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center cursor-pointer group shrink-0 transition-opacity duration-300"
          aria-label="Luxora Drive Home"
        >
          <img
            src={luxoraLogoWhite}
            alt="Luxora Drive"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 lg:gap-7 text-xs font-normal tracking-wider text-neutral-300">
          <Link to="/" className="uppercase font-normal hover:text-white transition-colors cursor-pointer">
            HOME
          </Link>

          {/* All Brands Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsBrandsDropdownOpen(true)}
            onMouseLeave={() => setIsBrandsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsBrandsDropdownOpen((prev) => !prev)}
              className="uppercase font-normal hover:text-white transition-colors cursor-pointer flex items-center gap-1 py-1"
            >
              <span>ALL BRANDS</span>
              <ChevronDown
                className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                  isBrandsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isBrandsDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-0 w-[640px] sm:w-[780px] bg-[#121319] shadow-2xl border border-neutral-800 py-4 px-6 z-50 animate-in fade-in duration-100 max-h-[80vh] overflow-y-auto rounded-none"
                onMouseEnter={() => setIsBrandsDropdownOpen(true)}
                onMouseLeave={() => setIsBrandsDropdownOpen(false)}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2.5">
                  {allCarBrands.map((brand) => (
                    <Link
                      key={brand.id}
                      to="/"
                      onClick={() => setIsBrandsDropdownOpen(false)}
                      className="group flex flex-col py-1.5 px-2 hover:bg-neutral-800/70 transition-colors border-b border-neutral-800/60 cursor-pointer rounded-none"
                    >
                      <span className="font-medium text-xs sm:text-[13px] text-neutral-200 group-hover:text-[#FFE600] transition-colors tracking-tight">
                        {brand.name}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-normal">
                        {brand.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Flash Deals Tab */}
          <Link
            to="/flash-deals"
            className="uppercase font-bold text-[#FFE600] border-b-2 border-[#FFE600] pb-0.5 tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-[#FFE600] text-[#FFE600]" />
            <span>FLASH DEALS</span>
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
            onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsCategoriesDropdownOpen((prev) => !prev)}
              className="uppercase font-normal hover:text-white transition-colors cursor-pointer flex items-center gap-1 py-1"
            >
              <span>CATEGORIES</span>
              <ChevronDown
                className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                  isCategoriesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoriesDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-0 w-[480px] sm:w-[540px] bg-[#121319] shadow-2xl border border-neutral-800 py-4 px-6 z-50 animate-in fade-in duration-100 rounded-none"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <div className="grid grid-cols-2 gap-x-8">
                  <div className="flex flex-col">
                    {categoryDropdownCol1.map((name, idx) => (
                      <Link
                        key={name}
                        to="/"
                        onClick={() => setIsCategoriesDropdownOpen(false)}
                        className={`group flex items-center gap-2 py-2 text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer rounded-none ${
                          idx < categoryDropdownCol1.length - 1 ? "border-b border-neutral-800" : ""
                        }`}
                      >
                        <span className="font-normal text-xs text-neutral-500 group-hover:text-[#FFE600] transition-colors select-none">
                          &gt;
                        </span>
                        <span className="font-normal text-xs sm:text-[13px] tracking-tight">
                          {name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-col">
                    {categoryDropdownCol2.map((name, idx) => (
                      <Link
                        key={name}
                        to="/"
                        onClick={() => setIsCategoriesDropdownOpen(false)}
                        className={`group flex items-center gap-2 py-2 text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer rounded-none ${
                          idx < categoryDropdownCol2.length - 1 ? "border-b border-neutral-800" : ""
                        }`}
                      >
                        <span className="font-normal text-xs text-neutral-500 group-hover:text-[#FFE600] transition-colors select-none">
                          &gt;
                        </span>
                        <span className="font-normal text-xs sm:text-[13px] tracking-tight">
                          {name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Locations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsLocationsDropdownOpen(true)}
            onMouseLeave={() => setIsLocationsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsLocationsDropdownOpen((prev) => !prev)}
              className="uppercase font-normal hover:text-white transition-colors cursor-pointer flex items-center gap-1 py-1"
            >
              <span>LOCATIONS</span>
              <ChevronDown
                className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                  isLocationsDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLocationsDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-0 w-[440px] sm:w-[480px] bg-[#121319] shadow-2xl border border-neutral-800 py-4 px-6 z-50 animate-in fade-in duration-100 rounded-none"
                onMouseEnter={() => setIsLocationsDropdownOpen(true)}
                onMouseLeave={() => setIsLocationsDropdownOpen(false)}
              >
                <div className="grid grid-cols-2 gap-x-8">
                  <div className="flex flex-col">
                    {dubaiLocations.slice(0, 6).map((loc, idx) => (
                      <Link
                        key={loc.id}
                        to="/"
                        onClick={() => setIsLocationsDropdownOpen(false)}
                        className={`group flex items-center gap-2 py-2 text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer rounded-none ${
                          idx < 5 ? "border-b border-neutral-800" : ""
                        }`}
                      >
                        <span className="font-normal text-xs text-neutral-500 group-hover:text-[#FFE600] transition-colors select-none">
                          &gt;
                        </span>
                        <span className="font-normal text-xs sm:text-[13px] tracking-tight">
                          {loc.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {dubaiLocations.slice(6, 12).map((loc, idx) => (
                      <Link
                        key={loc.id}
                        to="/"
                        onClick={() => setIsLocationsDropdownOpen(false)}
                        className={`group flex items-center gap-2 py-2 text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer rounded-none ${
                          idx < 5 ? "border-b border-neutral-800" : ""
                        }`}
                      >
                        <span className="font-normal text-xs text-neutral-500 group-hover:text-[#FFE600] transition-colors select-none">
                          &gt;
                        </span>
                        <span className="font-normal text-xs sm:text-[13px] tracking-tight">
                          {loc.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/" className="uppercase font-normal hover:text-white transition-colors cursor-pointer">
            SERVICES
          </Link>
          <Link to="/" className="uppercase font-normal hover:text-white transition-colors cursor-pointer">
            BLOGS
          </Link>
          <a
            href="tel:+971500000000"
            className="uppercase font-normal text-[#FFE600] hover:text-white transition-colors cursor-pointer"
          >
            CONTACT US
          </a>
        </nav>

        {/* Currency Switcher & Phone Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCurrencyDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-none bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-200 hover:border-neutral-700 cursor-pointer"
            >
              <span>{currentCurrencyConfig.flag}</span>
              <span>{currentCurrencyConfig.code}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-[#121319] border border-neutral-800 shadow-xl z-50 rounded-none py-1">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      setSelectedCurrency(curr.code);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left cursor-pointer transition-colors ${
                      selectedCurrency === curr.code
                        ? "bg-[#FFE600] text-black font-bold"
                        : "text-neutral-300 hover:bg-neutral-800"
                    }`}
                  >
                    <span>
                      {curr.flag} {curr.code}
                    </span>
                    <span className="text-[10px] opacity-75">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="xl:hidden w-9 h-9 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-[#0c0d12] flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <img src={luxoraLogoWhite} alt="Luxora" className="h-8 w-auto" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center bg-neutral-900 border border-neutral-800"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex flex-col gap-4 pt-6 text-sm">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-neutral-800">
              HOME
            </Link>
            <Link
              to="/flash-deals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#FFE600] font-bold border-b border-neutral-800"
            >
              FLASH DEALS
            </Link>
            <a href="tel:0000000000" className="py-2 text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FFE600]" /> CALL US NOW
            </a>
          </div>
        </div>
      )}

      {/* =========================================================================
          HERO BANNER FOR FLASH DEALS
          ========================================================================= */}
      <section className="relative w-full py-12 sm:py-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-[#180a0f] via-[#0d0a12] to-[#07080b] border-b border-neutral-800/80 overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-red-600/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Top Live Flash Pill */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-xs uppercase px-4 py-1.5 shadow-lg shadow-red-950/60 mb-5 tracking-widest rounded-none">
            <Flame className="w-4 h-4 fill-white text-white animate-pulse" />
            <span>LIMITED TIME SUPERCAR FLASH SALE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight font-serif mb-4">
            ALL FLASH DEALS &amp; EXOTIC OFFERS
          </h1>

          <p className="max-w-2xl text-xs sm:text-sm text-neutral-400 font-medium tracking-wide uppercase mb-8">
            Verified luxury and supercar fleet at steep flash discount rates with free doorstep Dubai delivery, fully comprehensive insurance, and 24/7 VIP concierge.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: "ALL", label: `ALL DEALS (${flashCars.length})` },
              { id: "SUPERCARS", label: "SUPERCARS" },
              { id: "SUVS", label: "LUXURY SUVS" },
              { id: "MODIFIED", label: "MODIFIED FLEET" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`py-2 px-5 text-xs font-black uppercase tracking-wider rounded-none transition-all cursor-pointer border ${
                  activeCategoryFilter === cat.id
                    ? "bg-[#FFE600] text-black border-[#FFE600] shadow-md shadow-yellow-500/20 scale-105"
                    : "bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FLASH DEAL CARDS GRID (ALL FLASH SALE CARS)
          ========================================================================= */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-[#FFE600] fill-[#FFE600]" />
              <span>ACTIVE FLASH SALE INVENTORY</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Instant booking available • Prices valid until active countdown expiry
            </p>
          </div>
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30">
            {filteredFlashCars.length} CARS AVAILABLE
          </span>
        </div>

        {/* 4-Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFlashCars.map((car) => {
            const currentImgIdx = cardImageIndices[car.id] || 0;
            const images = car.images && car.images.length > 0 ? car.images : [luxoraLogoWhite];
            const discountPercent =
              car.flashSale?.discountPercent ||
              (car.originalDailyRate > car.dailyRate
                ? Math.round(((car.originalDailyRate - car.dailyRate) / car.originalDailyRate) * 100)
                : 25);
            const badgeText = car.flashSale?.badgeText || `SAVE ${discountPercent}%`;

            return (
              <div
                key={car.id}
                onClick={() => navigate({ to: "/cars/$carId", params: { carId: car.id } })}
                className="bg-gradient-to-b from-[#2a0c16] via-[#16101c] to-[#0c0d12] rounded-none border-2 border-red-500/70 shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:border-red-400 hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-all duration-300 overflow-hidden flex flex-col justify-between group relative cursor-pointer"
              >
                {/* Full-card light shine sweeping from left to right */}
                <div className="flash-card-full-shine" aria-hidden="true" />

                {/* Top Flash Sale Ribbon Badge */}
                <div className="absolute top-0 left-0 z-30 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-black text-[10px] tracking-widest uppercase px-3 py-1 flex items-center gap-1.5 shadow-md shadow-red-950/60">
                  <Zap className="w-3.5 h-3.5 fill-white text-white animate-bounce" />
                  <span>{badgeText}</span>
                </div>

                {/* Live Countdown Bar */}
                <div className="w-full bg-[#0e1015] px-3.5 py-1.5 pt-8 flex items-center justify-between text-[#FFE600] text-xs font-bold uppercase tracking-wider rounded-none border-b border-neutral-800 relative z-10">
                  <span className="flex items-center gap-1 text-[10px] text-neutral-400">
                    <Clock className="w-3 h-3 text-[#FFE600]" /> EXPIRES IN
                  </span>
                  <span className="font-mono tracking-widest text-[11px] font-bold text-white">
                    {formatFlashTimer(countdownSeconds[car.id] ?? 7200)}
                  </span>
                </div>

                {/* Car Preview Box with 3-Image Slider */}
                <div className="relative w-full h-48 sm:h-52 bg-gradient-to-b from-[#3a101d] to-[#180f1a] p-3 flex items-center justify-center overflow-hidden select-none rounded-none">
                  {/* Left & Right Chevrons */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => handleCardPrevImage(car.id, images.length, e)}
                        aria-label="Previous view"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-white font-black text-2xl leading-none transition-transform hover:scale-125 active:scale-95 cursor-pointer z-20 select-none drop-shadow-xs"
                      >
                        &lt;
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleCardNextImage(car.id, images.length, e)}
                        aria-label="Next view"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-white font-black text-2xl leading-none transition-transform hover:scale-125 active:scale-95 cursor-pointer z-20 select-none drop-shadow-xs"
                      >
                        &gt;
                      </button>
                    </>
                  )}

                  {/* Carousel Pagination Dots */}
                  <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10 pointer-events-none">
                    {images.slice(0, 3).map((_, dotIdx) => {
                      const isCurrent = currentImgIdx === dotIdx;
                      return isCurrent ? (
                        <span key={dotIdx} className="w-5 h-2 rounded-none bg-[#FFE600]" />
                      ) : (
                        <span key={dotIdx} className="w-2 h-2 rounded-full bg-neutral-700" />
                      );
                    })}
                  </div>

                  {/* Phone Call Icon Button */}
                  <a
                    href="tel:0000000000"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-3 top-3 w-8 h-8 rounded-full bg-[#B30006] hover:bg-[#8f0005] text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95 z-20 animate-pulse"
                    title="Call VIP Desk"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                  </a>

                  {/* Car Image with hover zoom */}
                  <img
                    src={images[currentImgIdx] || images[0]}
                    alt={car.name}
                    loading="lazy"
                    draggable={false}
                    className="max-h-36 sm:max-h-40 object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-108 select-none pointer-events-none relative z-10"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between rounded-none text-white">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block tracking-wider">
                      {car.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight mt-1 line-clamp-1">
                      {car.name}
                    </h3>
                  </div>

                  {/* Pricing Details */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-white leading-none">
                          {formatPrice(car.dailyRate)}
                        </span>
                        <span className="text-xs text-neutral-400 font-normal">/ Day</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-neutral-500 line-through">
                          {formatPrice(car.originalDailyRate)}
                        </span>
                        <span className="font-bold text-red-500">
                          {discountPercent}% OFF
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between text-xs text-neutral-400">
                      <span>Monthly Deal:</span>
                      <span className="font-bold text-white">
                        {formatPrice(car.monthlyRate)}
                      </span>
                    </div>
                  </div>

                  {/* Perks */}
                  <div className="flex items-center gap-3 text-xs font-bold text-neutral-300 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600] text-black" /> Free Delivery
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600] text-black" /> Insurance
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <a
                      href={`https://wa.me/?text=Hi%2C%20I%20am%20interested%20in%20the%20Flash%20Deal%20for%20the%20${encodeURIComponent(car.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 bg-[#1E7E34] hover:bg-[#186429] text-white py-2 px-2 rounded-none text-xs font-bold transition-colors cursor-pointer text-center"
                    >
                      <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.01 2.012c-7.72 0-14 6.277-14 14 0 2.47.644 4.88 1.87 7.01l-1.99 7.26 7.43-1.95c2.05 1.12 4.38 1.68 6.69 1.68 7.72 0 14-6.28 14-14s-6.28-14-14-14zm0 25.64c-2.11 0-4.17-.57-5.97-1.64l-.43-.25-4.43 1.16 1.18-4.32-.28-.44c-1.18-1.87-1.8-4.04-1.8-6.15 0-6.42 5.22-11.64 11.64-11.64 3.11 0 6.03 1.21 8.23 3.41s3.41 5.12 3.41 8.23c0 6.42-5.23 11.64-11.65 11.64zm6.39-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.38-.2.23-.4.26-.75.09-.35-.18-1.48-.54-2.81-1.73-1.04-.92-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.16-.16.35-.4.53-.61.18-.2.23-.35.35-.59.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.58-.28-.68-.57-.59-.78-.6-.2-.01-.43-.01-.67-.01-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.38 1.42 3.61c.18.23 2.46 3.75 5.96 5.26.83.36 1.48.58 1.99.74.84.27 1.61.23 2.21.14.68-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.09-.15-.32-.23-.67-.41z" />
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({ to: "/cars/$carId", params: { carId: car.id } });
                      }}
                      className="flex items-center justify-center gap-1.5 bg-[#FFE600] hover:bg-yellow-400 text-black py-2 px-2 rounded-none text-xs font-black transition-colors cursor-pointer text-center"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Claim Deal
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          FOOTER (MATCHING SITE)
          ========================================================================= */}
      <footer className="w-full bg-[#050608] border-t border-neutral-900 py-12 px-4 sm:px-8 lg:px-12 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={luxoraLogoWhite} alt="Luxora Drive" className="h-7 w-auto object-contain" />
            <span className="text-white font-black tracking-widest uppercase">LUXORA DRIVE DUBAI</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 uppercase text-neutral-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/flash-deals" className="hover:text-white text-[#FFE600] transition-colors">Flash Deals</Link>
            <Link to="/" className="hover:text-white transition-colors">Supercars</Link>
            <Link to="/" className="hover:text-white transition-colors">SUVs</Link>
            <a href="tel:0000000000" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-[11px] text-neutral-500">
            &copy; {new Date().getFullYear()} Luxora Drive. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
