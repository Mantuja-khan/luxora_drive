import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Phone,
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  CheckCircle2,
  Play,
  Calendar,
  Check,
  Menu,
  X,
  Shield,
  Sparkles,
  Clock,
  Car,
  Headphones,
  Key,
} from "lucide-react";
import {
  getCarsForCategory,
  getCategoryBySlug,
  ALL_CATEGORIES,
  categoryNameToSlug,
  allCarBrands,
  type ProductCar,
} from "@/data/cars";
import luxoraLogoWhite from "@/assets/luxora-logo-white.png";

export const Route = createFileRoute("/categories/$categorySlug")({
  component: CategoryDetailPage,
});

type CurrencyCode = "AED" | "USD" | "EUR" | "GBP" | "RUB";

interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  flag: string;
  symbol: string;
  rate: number;
}

const currencies: CurrencyConfig[] = [
  { code: "AED", label: "AED (د.إ)", flag: "🇦🇪", symbol: "AED ", rate: 1 },
  { code: "USD", label: "USD ($)", flag: "🇺🇸", symbol: "$", rate: 0.272 },
  { code: "EUR", label: "EUR (€)", flag: "🇪🇺", symbol: "€", rate: 0.25 },
  { code: "GBP", label: "GBP (£)", flag: "🇬🇧", symbol: "£", rate: 0.215 },
  { code: "RUB", label: "RUB (₽)", flag: "🇷🇺", symbol: "₽", rate: 25.5 },
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

function CategoryDetailPage() {
  const { categorySlug } = useParams({ from: "/categories/$categorySlug" });
  const navigate = useNavigate();

  // Currency State
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("AED");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isLocationsDropdownOpen, setIsLocationsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] = useState<"brands" | "categories" | "locations" | "currency" | null>(null);

  // Multi-image indices for card carousels
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});

  // Category Info & Cars
  const category = useMemo(() => getCategoryBySlug(categorySlug), [categorySlug]);
  const cars = useMemo(() => getCarsForCategory(categorySlug), [categorySlug]);

  const currentCurrencyConfig = useMemo(
    () => currencies.find((c) => c.code === selectedCurrency) || currencies[0],
    [selectedCurrency]
  );

  const formatPrice = useCallback(
    (aedAmount: number): string => {
      if (!aedAmount) return `${currentCurrencyConfig.symbol}0`;
      const converted = Math.round(aedAmount * currentCurrencyConfig.rate);
      return `${currentCurrencyConfig.symbol}${converted.toLocaleString()}`;
    },
    [currentCurrencyConfig]
  );

  const handleCardPrevImage = (id: string, len: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) > 0 ? (prev[id] ?? 0) - 1 : len - 1,
    }));
  };

  const handleCardNextImage = (id: string, len: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) < len - 1 ? (prev[id] ?? 0) + 1 : 0,
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categorySlug]);

  return (
    <div className="min-h-screen bg-[#07080b] text-white select-none overflow-x-hidden antialiased">
      {/* =========================================================================
          GLOBAL NAVBAR: AUTHENTIC BLACK THEME
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full px-4 sm:px-8 lg:px-12 py-3.5 sm:py-4 flex items-center justify-between bg-[#0a0c14] text-white border-b border-neutral-800 shadow-xl">
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

        {/* Full Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 lg:gap-7 text-xs font-semibold tracking-wider text-neutral-300">
          <Link to="/" className="uppercase hover:text-[#FFE600] transition-colors cursor-pointer">
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
              className="uppercase hover:text-[#FFE600] transition-colors cursor-pointer flex items-center gap-1 py-1"
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
                className="absolute left-0 top-full mt-0 w-[640px] sm:w-[760px] bg-[#0f1118] shadow-2xl border border-neutral-800 py-4 px-6 z-50 animate-in fade-in duration-100 max-h-[80vh] overflow-y-auto rounded-none"
                onMouseEnter={() => setIsBrandsDropdownOpen(true)}
                onMouseLeave={() => setIsBrandsDropdownOpen(false)}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2.5">
                  {allCarBrands.map((brand) => (
                    <Link
                      key={brand.id}
                      to="/"
                      onClick={() => setIsBrandsDropdownOpen(false)}
                      className="group flex flex-col py-1.5 px-2 hover:bg-[#1a1d2b] transition-colors border-b border-neutral-800 cursor-pointer rounded-none"
                    >
                      <span className="font-semibold text-xs sm:text-[13px] text-white group-hover:text-[#FFE600] transition-colors tracking-tight">
                        {brand.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-normal">
                        {brand.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/flash-deals"
            className="uppercase font-bold text-[#FFE600] hover:text-white transition-colors cursor-pointer"
          >
            FLASH DEALS
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
              className="uppercase text-[#FFE600] font-bold transition-colors cursor-pointer flex items-center gap-1 py-1"
            >
              <span>CATEGORIES</span>
              <ChevronDown
                className={`w-3 h-3 text-[#FFE600] transition-transform duration-200 ${
                  isCategoriesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoriesDropdownOpen && (
              <div
                className="absolute left-0 top-full mt-0 w-[480px] sm:w-[540px] bg-[#0f1118] shadow-2xl border border-neutral-800 py-4 px-6 z-50 animate-in fade-in duration-100 rounded-none"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <div className="grid grid-cols-2 gap-x-8">
                  <div className="flex flex-col">
                    {categoryDropdownCol1.map((name, idx) => {
                      const slug = categoryNameToSlug(name);
                      return (
                        <Link
                          key={name}
                          to="/categories/$categorySlug"
                          params={{ categorySlug: slug }}
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className={`group flex items-center gap-2 py-2 text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer rounded-none ${
                            idx < categoryDropdownCol1.length - 1 ? "border-b border-neutral-800" : ""
                          }`}
                        >
                          <span className="font-normal text-xs text-[#FFE600] group-hover:text-white transition-colors select-none">
                            &gt;
                          </span>
                          <span className="font-medium text-xs sm:text-[13px] tracking-tight">
                            {name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="flex flex-col">
                    {categoryDropdownCol2.map((name, idx) => {
                      const slug = categoryNameToSlug(name);
                      return (
                        <Link
                          key={name}
                          to="/categories/$categorySlug"
                          params={{ categorySlug: slug }}
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className={`group flex items-center gap-2 py-2 text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer rounded-none ${
                            idx < categoryDropdownCol2.length - 1 ? "border-b border-neutral-800" : ""
                          }`}
                        >
                          <span className="font-normal text-xs text-[#FFE600] group-hover:text-white transition-colors select-none">
                            &gt;
                          </span>
                          <span className="font-medium text-xs sm:text-[13px] tracking-tight">
                            {name}
                          </span>
                        </Link>
                      );
                    })}
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
              className="uppercase font-normal text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer flex items-center gap-1 py-1"
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
                className="absolute left-0 top-full mt-0 w-[440px] sm:w-[480px] bg-[#0f1118] shadow-2xl border border-neutral-800 py-4 px-6 z-50 animate-in fade-in duration-100 rounded-none"
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
                        <span className="font-normal text-xs text-[#FFE600] group-hover:text-white transition-colors select-none">
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
                        <span className="font-normal text-xs text-[#FFE600] group-hover:text-white transition-colors select-none">
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

          <a href="/#services" className="uppercase font-normal text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer">
            SERVICES
          </a>
          <a href="/#blogs" className="uppercase font-normal text-neutral-300 hover:text-[#FFE600] transition-colors cursor-pointer">
            BLOGS
          </a>
          <a
            href="tel:0000000000"
            className="uppercase font-bold text-[#FFE600] hover:text-white transition-colors cursor-pointer"
          >
            CONTACT US
          </a>
        </nav>

        {/* Right Action: Currency + Phone + WhatsApp */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Currency Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCurrencyDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 bg-[#12141e] hover:bg-[#1a1d2b] text-white text-xs font-normal uppercase px-3 py-1.5 border border-neutral-800 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95 rounded-none"
            >
              <span>{currentCurrencyConfig.flag}</span>
              <span>{currentCurrencyConfig.code}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                  isCurrencyDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCurrencyDropdownOpen && (
              <div
                className="absolute right-0 top-full mt-0 w-44 bg-[#0f1118] shadow-2xl border border-neutral-800 py-1.5 z-50 animate-in fade-in duration-100 rounded-none"
                onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-normal text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                  Select Currency
                </div>
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      setSelectedCurrency(curr.code);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-normal text-left hover:bg-[#1a1d2b] cursor-pointer transition-colors uppercase rounded-none ${
                      selectedCurrency === curr.code
                        ? "text-[#FFE600] bg-[#161824] font-bold"
                        : "text-neutral-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{curr.flag}</span>
                      <span>{curr.label}</span>
                    </span>
                    {selectedCurrency === curr.code && (
                      <Check className="w-3.5 h-3.5 text-[#FFE600] stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp Direct Header Link */}
          <a
            href="https://wa.me/?text=Hi%20Luxora%20Drive%2C%20I%20am%20interested%20in%20renting%20a%20luxury%20car"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-[#1E7E34] hover:bg-[#186429] text-white px-3.5 py-1.5 rounded-none font-bold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md"
          >
            <svg
              viewBox="0 0 32 32"
              className="w-4 h-4 fill-white shrink-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.01 2.012c-7.72 0-14 6.277-14 14 0 2.47.644 4.88 1.87 7.01l-1.99 7.26 7.43-1.95c2.05 1.12 4.38 1.68 6.69 1.68 7.72 0 14-6.28 14-14s-6.28-14-14-14zm0 25.64c-2.11 0-4.17-.57-5.97-1.64l-.43-.25-4.43 1.16 1.18-4.32-.28-.44c-1.18-1.87-1.8-4.04-1.8-6.15 0-6.42 5.22-11.64 11.64-11.64 3.11 0 6.03 1.21 8.23 3.41s3.41 5.12 3.41 8.23c0 6.42-5.23 11.64-11.65 11.64zm6.39-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.38-.2.23-.4.26-.75.09-.35-.18-1.48-.54-2.81-1.73-1.04-.92-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.16-.16.35-.4.53-.61.18-.2.23-.35.35-.59.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.58-.28-.68-.57-.59-.78-.6-.2-.01-.43-.01-.67-.01-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.38 1.42 3.61c.18.23 2.46 3.75 5.96 5.26.83.36 1.48.58 1.99.74.84.27 1.61.23 2.21.14.68-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.09-.15-.32-.23-.67-.41z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-none bg-[#12141e] text-neutral-300 hover:text-white border border-neutral-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0c14] border-b border-neutral-800 px-4 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#12141e] border border-neutral-800 text-white">
              HOME
            </Link>
            <Link to="/flash-deals" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#12141e] border border-neutral-800 text-[#FFE600]">
              FLASH DEALS
            </Link>
          </div>
          <div>
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Popular Categories</div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {ALL_CATEGORIES.slice(0, 10).map((cat) => (
                <Link
                  key={cat.slug}
                  to="/categories/$categorySlug"
                  params={{ categorySlug: cat.slug }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 border text-neutral-300 hover:text-white rounded-none ${
                    cat.slug === categorySlug ? "bg-[#FFE600]/15 border-[#FFE600] font-bold text-[#FFE600]" : "bg-[#12141e] border-neutral-800"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          CATEGORY HERO BANNER
          ========================================================================= */}
      <section className="w-full bg-gradient-to-b from-[#12141e] via-[#0d0f17] to-[#07080b] border-b border-neutral-800 pt-6 pb-10 sm:pb-12 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto space-y-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
            <Link to="/" className="hover:text-[#FFE600] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-neutral-400">Categories</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[#FFE600] font-bold">{category.name}</span>
          </nav>

          {/* Category Header Info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="max-w-3xl space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFE600] block">
                {category.heroTag}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-cinzel tracking-tight uppercase leading-tight">
                {category.name} <span className="text-[#FFE600]">IN DUBAI</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed max-w-2xl">
                {category.description}
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 bg-[#0f1118] border border-neutral-800 shadow-md flex items-center gap-3">
                <Car className="w-5 h-5 text-[#FFE600]" />
                <div>
                  <span className="text-xs font-black text-white block leading-tight">
                    {cars.length} LUXURY MODELS
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium">Available for Instant Booking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Category Switcher Tabs */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ALL_CATEGORIES.slice(0, 10).map((tab) => {
              const isActive = tab.slug === categorySlug;
              return (
                <Link
                  key={tab.slug}
                  to="/categories/$categorySlug"
                  params={{ categorySlug: tab.slug }}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider shrink-0 transition-all rounded-none border ${
                    isActive
                      ? "bg-[#FFE600] text-black border-[#FFE600] shadow-md"
                      : "bg-[#0f1118] text-neutral-300 hover:text-white hover:bg-[#161824] border-neutral-800"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CARS GRID FOR THIS CATEGORY
          - Original authentic Black theme
          - Distinctive styling for flash deals
          ========================================================================= */}
      <section className="w-full bg-[#07080b] py-10 sm:py-14 px-4 sm:px-8 lg:px-12 relative z-20">
        <div className="w-full max-w-[1720px] mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-white font-cinzel uppercase">
              {category.name} <span className="text-[#FFE600]">FLEET</span>
            </h2>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Showing {cars.length} Vehicles
            </span>
          </div>

          {/* 4-Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cars.map((card) => {
              const isFlash = Boolean(card.isFlashSale || card.hasFlashTimer);
              const cardImageIndex = cardImageIndices[card.id] || 0;
              const cardImgs = card.images && card.images.length > 0 ? card.images : [luxoraLogoWhite];

              const dailyPct =
                card.originalDailyRate > card.dailyRate
                  ? `${Math.round(((card.originalDailyRate - card.dailyRate) / card.originalDailyRate) * 100)}%`
                  : "25%";

              const monthlyOriginalRate = card.originalMonthlyRate || Math.round(card.originalDailyRate * 30 * 0.8);
              const monthlyPct =
                monthlyOriginalRate > card.monthlyRate
                  ? `${Math.round(((monthlyOriginalRate - card.monthlyRate) / monthlyOriginalRate) * 100)}%`
                  : "38%";

              return (
                <div
                  key={card.id}
                  onClick={() => navigate({ to: "/cars/$carId", params: { carId: card.id } })}
                  className={`rounded-none transition-all duration-300 overflow-hidden flex flex-col justify-between group relative cursor-pointer ${
                    isFlash
                      ? "bg-[#131b2e] border-2 border-[#22396F] shadow-lg shadow-[#22396F]/25 hover:shadow-2xl text-white"
                      : "bg-[#0f1118] border border-neutral-800 shadow-md hover:border-[#FFE600]/40 hover:shadow-xl text-white"
                  }`}
                >
                  {/* Full-card light shine sweeping on Flash Deals */}
                  {isFlash && <div className="flash-card-full-shine" aria-hidden="true" />}

                  {/* Flash Sale Top Ribbon Badge */}
                  {isFlash && (
                    <div className="absolute top-0 left-0 z-30 bg-[#22396F] text-white font-black text-[10px] tracking-widest uppercase px-3 py-1 flex items-center gap-1.5 shadow-md rounded-none">
                      <Zap className="w-3.5 h-3.5 fill-[#FFE600] text-[#FFE600] animate-bounce" />
                      <span>{card.flashSaleBadge || "FLASH SALE SPECIAL OFFER"}</span>
                    </div>
                  )}

                  {/* Car Preview Box with 3-Image Slider */}
                  <div
                    className={`relative w-full h-48 sm:h-52 p-3 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none rounded-none ${
                      isFlash ? "bg-[#0c1220]" : "bg-[#0a0c12]"
                    }`}
                  >
                    {/* Left & Right Chevrons */}
                    <button
                      type="button"
                      onClick={(e) => handleCardPrevImage(card.id, cardImgs.length, e)}
                      aria-label="Previous view"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 font-black text-2xl leading-none text-[#FFE600] hover:scale-125 active:scale-95 cursor-pointer z-20 select-none drop-shadow-xs transition-transform"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleCardNextImage(card.id, cardImgs.length, e)}
                      aria-label="Next view"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 font-black text-2xl leading-none text-[#FFE600] hover:scale-125 active:scale-95 cursor-pointer z-20 select-none drop-shadow-xs transition-transform"
                    >
                      &gt;
                    </button>

                    {/* Brand Logo in bottom-left */}
                    <div className="absolute left-3 bottom-2.5 z-10 pointer-events-none opacity-70">
                      <div className="w-6 h-6 rounded-none border border-neutral-700 text-neutral-300 bg-black/40 flex items-center justify-center text-[11px] font-bold">
                        {card.name.includes("Mercedes") ? "⨂" : "⚡"}
                      </div>
                    </div>

                    {/* Carousel 3 Pagination Dots */}
                    <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10 pointer-events-none">
                      {[0, 1, 2].map((dotIdx) => {
                        const isCurrent = cardImageIndex === dotIdx;
                        return isCurrent ? (
                          <span key={dotIdx} className="w-5 h-2 rounded-none bg-[#FFE600]" />
                        ) : (
                          <span
                            key={dotIdx}
                            className="w-2 h-2 rounded-none bg-neutral-700"
                          />
                        );
                      })}
                    </div>

                    {/* Call Now Button at top-right corner */}
                    <a
                      href="tel:0000000000"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-3 top-3 w-8 h-8 rounded-full bg-[#FFE600] hover:bg-[#ffd900] text-black flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95 z-20 animate-pulse"
                      title="Call Now"
                    >
                      <Phone className="w-4 h-4 fill-black" />
                    </a>

                    {/* Circular Play Action Button */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({ to: "/cars/$carId", params: { carId: card.id } });
                      }}
                      className="absolute right-3 bottom-2.5 w-7 h-7 rounded-full bg-[#FFE600] hover:bg-[#ffd900] text-black flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform z-20"
                      title="View Car Details"
                    >
                      <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
                    </div>

                    {/* Car Image with smooth hover scale */}
                    <img
                      src={cardImgs[cardImageIndex] || cardImgs[0]}
                      alt={`${card.name} - View ${cardImageIndex + 1}`}
                      loading="lazy"
                      draggable={false}
                      className="max-h-36 sm:max-h-40 object-contain transition-transform duration-300 group-hover:scale-108 select-none pointer-events-none relative z-10 drop-shadow-[0_12px_14px_rgba(0,0,0,0.4)]"
                      key={`${card.id}-${cardImageIndex}`}
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between rounded-none text-white">
                    <div>
                      <span className="text-xs font-medium block text-neutral-400">
                        {card.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-black font-cinzel leading-tight mt-1 text-white">
                        {card.name}
                      </h3>
                    </div>

                    {/* Price Rows */}
                    <div className="space-y-1.5 pt-1">
                      {/* Daily Rate */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-black leading-none text-white">
                            {formatPrice(card.dailyRate)}
                          </span>
                          <span className="text-xs font-normal text-neutral-400">
                            / Day
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-neutral-500 line-through">
                            {formatPrice(card.originalDailyRate)}
                          </span>
                          <span className="font-bold text-[#FFE600]">
                            {card.dailyDiscount || dailyPct}
                          </span>
                        </div>
                      </div>

                      {/* Monthly Rate */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-black leading-none text-white">
                            {formatPrice(card.monthlyRate)}
                          </span>
                          <span className="text-xs font-normal text-neutral-400">
                            / Monthly
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-neutral-500 line-through">
                            {formatPrice(monthlyOriginalRate)}
                          </span>
                          <span className="font-bold text-[#FFE600]">
                            {card.monthlyDiscount || monthlyPct}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Free Delivery & Insurance Included */}
                    <div className="flex items-center gap-4 text-xs font-bold pt-1 text-neutral-300">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FFE600]" /> Free Delivery
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FFE600]" /> Insurance Included
                      </span>
                    </div>

                    {/* Action Buttons: WhatsApp & Inquire Now */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <a
                        href={`https://wa.me/?text=Hi%2C%20I%20am%20interested%20in%20renting%20the%20${encodeURIComponent(
                          card.name
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1.5 bg-[#1E7E34] hover:bg-[#186429] text-white py-2 px-2 rounded-none text-xs font-bold transition-colors cursor-pointer"
                      >
                        <svg
                          viewBox="0 0 32 32"
                          className="w-4 h-4 fill-white shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16.01 2.012c-7.72 0-14 6.277-14 14 0 2.47.644 4.88 1.87 7.01l-1.99 7.26 7.43-1.95c2.05 1.12 4.38 1.68 6.69 1.68 7.72 0 14-6.28 14-14s-6.28-14-14-14zm0 25.64c-2.11 0-4.17-.57-5.97-1.64l-.43-.25-4.43 1.16 1.18-4.32-.28-.44c-1.18-1.87-1.8-4.04-1.8-6.15 0-6.42 5.22-11.64 11.64-11.64 3.11 0 6.03 1.21 8.23 3.41s3.41 5.12 3.41 8.23c0 6.42-5.23 11.64-11.65 11.64zm6.39-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.38-.2.23-.4.26-.75.09-.35-.18-1.48-.54-2.81-1.73-1.04-.92-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.16-.16.35-.4.53-.61.18-.2.23-.35.35-.59.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.58-.28-.68-.57-.59-.78-.6-.2-.01-.43-.01-.67-.01-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.38 1.42 3.61c.18.23 2.46 3.75 5.96 5.26.83.36 1.48.58 1.99.74.84.27 1.61.23 2.21.14.68-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.09-.15-.32-.23-.67-.41z" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate({ to: "/cars/$carId", params: { carId: card.id } });
                        }}
                        className="flex items-center justify-center gap-1.5 bg-[#FFE600] hover:bg-[#ffd900] text-black py-2 px-2 rounded-none text-xs font-black transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-black" /> Inquire Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXCLUSIVE CTA SECTION FOR ALL CATEGORY PAGES
          ========================================================================= */}
      <section className="w-full bg-[#0e1017] text-white py-14 sm:py-18 px-4 sm:px-8 lg:px-12 relative overflow-hidden border-t border-neutral-800">
        {/* Subtle radial luxury glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,230,0,0.06)_0%,rgba(14,16,23,0.95)_70%,#07080b_100%)] pointer-events-none" />

        <div className="w-full max-w-[1720px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bold Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs font-black tracking-widest uppercase text-[#FFE600] px-3 py-1 bg-white/5 border border-white/10 inline-block">
                VIP DUBAI CONCIERGE & DOORSTEP DELIVERY
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black font-cinzel uppercase tracking-tight leading-tight text-white">
                READY TO EXPERIENCE THE BEST{" "}
                <span className="text-[#FFE600]">{category.name}</span> IN DUBAI?
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-2xl">
                Whether you need a thrilling weekend supercar, an imposing executive SUV, or long-term monthly prestige,
                Luxora Drive guarantees immediate 30-minute delivery to your hotel, villa, or DXB VIP terminal with zero paperwork hassle.
              </p>

              {/* 4 Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-3 bg-white/5 p-3 border border-white/10">
                  <Shield className="w-5 h-5 text-[#FFE600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block uppercase">Comprehensive Insurance</span>
                    <span className="text-[11px] text-neutral-400">Full cover included with every rental</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 border border-white/10">
                  <Clock className="w-5 h-5 text-[#FFE600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block uppercase">30-Min Instant Delivery</span>
                    <span className="text-[11px] text-neutral-400">Anywhere across Dubai & Abu Dhabi</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 border border-white/10">
                  <Sparkles className="w-5 h-5 text-[#FFE600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block uppercase">Zero Deposit Options</span>
                    <span className="text-[11px] text-neutral-400">Flexible credit card or cash options</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 border border-white/10">
                  <Headphones className="w-5 h-5 text-[#FFE600] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block uppercase">24/7 Dedicated Concierge</span>
                    <span className="text-[11px] text-neutral-400">Direct WhatsApp support anytime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Instant Action Call & WhatsApp Box */}
            <div className="lg:col-span-5 bg-[#12141e] text-white p-6 sm:p-8 shadow-2xl border border-neutral-800 space-y-4">
              <div className="border-b border-neutral-800 pb-3">
                <span className="text-[10px] font-bold text-[#FFE600] uppercase tracking-wider block">
                  FAST TRACK VIP RESERVATION
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-cinzel uppercase text-white mt-0.5">
                  RESERVE YOUR {category.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Connect with our fleet manager for bespoke pricing and instant confirmation.
                </p>
              </div>

              {/* Direct Booking Phone CTA */}
              <a
                href="tel:0000000000"
                className="w-full flex items-center justify-between p-3.5 bg-[#0a0c14] hover:bg-[#07080b] border border-neutral-800 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFE600] text-black flex items-center justify-center shrink-0 font-bold">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">Call VIP Desk 24/7</span>
                    <span className="text-base sm:text-lg font-black text-white tracking-wide font-mono">
                      0000000000
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-[#FFE600] transition-transform group-hover:translate-x-1" />
              </a>

              {/* WhatsApp Action Button */}
              <a
                href={`https://wa.me/?text=Hi%20Luxora%20Drive%2C%20I%20am%20interested%20in%20booking%20a%20vehicle%20from%20the%20${encodeURIComponent(
                  category.name
                )}%20fleet`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#1E7E34] hover:bg-[#186429] text-white py-3.5 px-4 font-bold text-sm uppercase tracking-wider shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <svg
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-white shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.01 2.012c-7.72 0-14 6.277-14 14 0 2.47.644 4.88 1.87 7.01l-1.99 7.26 7.43-1.95c2.05 1.12 4.38 1.68 6.69 1.68 7.72 0 14-6.28 14-14s-6.28-14-14-14zm0 25.64c-2.11 0-4.17-.57-5.97-1.64l-.43-.25-4.43 1.16 1.18-4.32-.28-.44c-1.18-1.87-1.8-4.04-1.8-6.15 0-6.42 5.22-11.64 11.64-11.64 3.11 0 6.03 1.21 8.23 3.41s3.41 5.12 3.41 8.23c0 6.42-5.23 11.64-11.65 11.64zm6.39-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.38-.2.23-.4.26-.75.09-.35-.18-1.48-.54-2.81-1.73-1.04-.92-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.16-.16.35-.4.53-.61.18-.2.23-.35.35-.59.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.58-.28-.68-.57-.59-.78-.6-.2-.01-.43-.01-.67-.01-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.38 1.42 3.61c.18.23 2.46 3.75 5.96 5.26.83.36 1.48.58 1.99.74.84.27 1.61.23 2.21.14.68-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.09-.15-.32-.23-.67-.41z" />
                </svg>
                <span>Instant WhatsApp Booking</span>
              </a>

              {/* Explore Other Cars Link */}
              <Link
                to="/"
                className="w-full flex items-center justify-center gap-1.5 bg-[#FFE600] hover:bg-[#ffd900] text-black py-3 px-4 font-black text-xs uppercase tracking-wider transition-colors"
              >
                <Key className="w-4 h-4 text-black" />
                <span>View Full Dubai Fleet</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="w-full bg-[#0a0d14] text-white border-t border-neutral-800 py-12 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <img src={luxoraLogoWhite} alt="Luxora Drive" className="h-8 w-auto object-contain" />
            <p className="text-xs text-neutral-400 leading-relaxed">
              Dubai's premier luxury car rental service. Offering high-performance supercars, executive SUVs, and bespoke chauffeur services.
            </p>
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-white block mb-3 font-cinzel">
              Featured Categories
            </span>
            <div className="flex flex-col space-y-1.5 text-xs text-neutral-400">
              {ALL_CATEGORIES.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  to="/categories/$categorySlug"
                  params={{ categorySlug: c.slug }}
                  className="hover:text-[#E89B5B] transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-white block mb-3 font-cinzel">
              Popular Locations
            </span>
            <div className="flex flex-col space-y-1.5 text-xs text-neutral-400">
              {dubaiLocations.slice(0, 6).map((loc) => (
                <span key={loc.id} className="hover:text-white transition-colors cursor-pointer">
                  {loc.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-white block mb-3 font-cinzel">
              Contact & Support
            </span>
            <div className="space-y-2 text-xs text-neutral-400">
              <p>Downtown Dubai, Sheikh Zayed Road, UAE</p>
              <p className="text-[#E89B5B] font-mono font-bold">24/7 Hotline: 0000000000</p>
              <p>Email: vip@luxoradrive.com</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1720px] mx-auto mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <span>© {new Date().getFullYear()} Luxora Drive UAE. All Rights Reserved.</span>
          <span className="text-neutral-400">Luxury Supercar & SUV Rental Dubai</span>
        </div>
      </footer>
    </div>
  );
}
