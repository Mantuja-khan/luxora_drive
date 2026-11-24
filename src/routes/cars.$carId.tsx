import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Phone,
  MessageCircle,
  Shield,
  Zap,
  Gauge,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Share2,
  Heart,
  CheckCircle2,
  Award,
  Clock,
  Play,
  Users,
  Briefcase,
  Car,
  Settings2,
  RotateCcw,
  Truck,
  Lock,
  X,
  DoorClosed,
  Check,
  Menu,
} from "lucide-react";
import { getCarById, getRelatedCars, type ProductCar } from "@/data/cars";
import luxoraLogoWhite from "@/assets/luxora-logo-white.png";
import herovideo from "@/assets/herovideo.mp4";

export const Route = createFileRoute("/cars/$carId")({
  component: CarDetailPage,
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

const allCarBrands = [
  { id: "nissan", name: "NISSAN", count: "54 CARS" },
  { id: "mercedes", name: "MERCEDES", count: "60 CARS" },
  { id: "lamborghini", name: "LAMBORGHINI", count: "28 CARS" },
  { id: "porsche", name: "PORSCHE", count: "7 CARS" },
  { id: "rolls-royce", name: "ROLLS ROYCE", count: "15 CARS" },
  { id: "ferrari", name: "FERRARI", count: "8 CARS" },
  { id: "mclaren", name: "MCLAREN", count: "3 CARS" },
  { id: "bmw", name: "BMW", count: "25 CARS" },
  { id: "audi", name: "AUDI", count: "23 CARS" },
  { id: "range-rover", name: "RANGE ROVER", count: "34 CARS" },
  { id: "bentley", name: "BENTLEY", count: "8 CARS" },
  { id: "cadillac", name: "CADILLAC", count: "3 CARS" },
  { id: "chevrolet", name: "CHEVROLET", count: "30 CARS" },
  { id: "ford", name: "FORD", count: "22 CARS" },
  { id: "dodge", name: "DODGE", count: "17 CARS" },
  { id: "corvette", name: "CORVETTE", count: "5 CARS" },
];

const dubaiLocations = [
  { id: "al-barsha", name: "Al Barsha", subtitle: "Hub near Mall of the Emirates" },
  { id: "dubai-mall", name: "Dubai Mall", subtitle: "Downtown & Burj Khalifa Strip" },
  { id: "mall-of-emirates", name: "Mall of Emirates", subtitle: "Al Barsha 1 VIP Drop-off" },
  { id: "business-bay", name: "Business Bay", subtitle: "Financial & Corporate Towers" },
  { id: "dubai-marina", name: "Dubai Marina", subtitle: "Marina Walk & JBR Waterfront" },
  { id: "palm-jumeirah", name: "Palm Jumeirah", subtitle: "Atlantis & Coastal Villas" },
  { id: "dubai-airport", name: "Dubai Airport", subtitle: "Terminal 1, 2, 3 VIP Handover" },
  { id: "sheikh-zayed-road", name: "Shaikh Zayed Road", subtitle: "Main Luxury Highway Strip" },
  { id: "jumeirah-lake-towers", name: "Jumeirah Lake Towers", subtitle: "JLT Cluster Delivery Hub" },
  { id: "al-quoz", name: "Al Quoz", subtitle: "Creative Arts Hub" },
  { id: "deira", name: "Deira Dubai", subtitle: "Old Dubai & Gold Souk" },
  { id: "international-city", name: "International City", subtitle: "Warsan Zone" },
];

function CarDetailPage() {
  const params = useParams({ from: "/cars/$carId" });
  const navigate = useNavigate();
  const carId = params.carId;

  // Retrieve car by ID
  const car = useMemo(() => getCarById(carId), [carId]);
  const relatedCars = useMemo(() => getRelatedCars(carId, 3), [carId]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fullscreen Popup Lightbox Modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Video Modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Navigation Dropdown states (Exact same as home page)
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("AED");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isLocationsDropdownOpen, setIsLocationsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Selected Rental Duration Plan: 'daily' | 'weekly' | 'monthly'
  const [selectedPlan, setSelectedPlan] = useState<"daily" | "weekly" | "monthly">("daily");

  // Booking Modal State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    phone: "",
    pickupDate: "",
    returnDate: "",
    deliveryLocation: "Dubai Marina & Palm Jumeirah",
    notes: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Related cards 3-image slider index map (same as home page product cards)
  const [relatedCardImageIndices, setRelatedCardImageIndices] = useState<Record<string, number>>({});

  // Scroll to top on car change
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveImageIndex(0);
      setSelectedPlan("daily");
    }
  }, [carId]);

  // Currency Formatter
  const currentCurrencyConfig = useMemo(
    () => currencies.find((c) => c.code === selectedCurrency) || currencies[0],
    [selectedCurrency]
  );

  const formatCurrency = useCallback(
    (amountInAed: number): string => {
      const converted = Math.round(amountInAed * currentCurrencyConfig.rate);
      if (selectedCurrency === "AED") {
        return `AED ${amountInAed.toLocaleString()}`;
      }
      return `${currentCurrencyConfig.symbol}${converted.toLocaleString()}`;
    },
    [currentCurrencyConfig, selectedCurrency]
  );

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : (car?.images.length || 1) - 1));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev < (car?.images.length || 1) - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, car?.images.length]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({
          title: car?.name || "Luxora Drive Exotic Car Rental Dubai",
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-[#07080b] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-black mb-3 text-white uppercase font-poster">Vehicle Not Found</h1>
        <p className="text-neutral-400 mb-6 max-w-md text-sm">
          The luxury vehicle you are looking for is currently reserved or unavailable in our Dubai fleet.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#FFE600] text-black font-extrabold px-6 py-3 rounded-none hover:bg-yellow-400 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet Showcase</span>
        </Link>
      </div>
    );
  }

  // Ensure car has valid images array
  const carImages = car.images && car.images.length > 0 ? car.images : [luxoraLogoWhite];

  // 6 distinct gallery slots (matching user reference)
  const galleryItems = [
    carImages[0] || luxoraLogoWhite,
    carImages[1] || carImages[0] || luxoraLogoWhite,
    carImages[2] || carImages[1] || carImages[0] || luxoraLogoWhite,
    carImages[3] || carImages[0] || luxoraLogoWhite,
    carImages[4] || carImages[1] || carImages[0] || luxoraLogoWhite,
    carImages[5] || carImages[2] || carImages[0] || luxoraLogoWhite,
  ];

  // Savings calculations
  const dailySavePct =
    car.originalDailyRate > car.dailyRate
      ? Math.round(((car.originalDailyRate - car.dailyRate) / car.originalDailyRate) * 100)
      : car.flashSale?.discountPercent || 25;

  const weeklyOriginal = Math.round(car.originalDailyRate * 7 * 0.9);
  const weeklySavePct =
    weeklyOriginal > car.weeklyRate
      ? Math.round(((weeklyOriginal - car.weeklyRate) / weeklyOriginal) * 100)
      : 30;

  const monthlyOriginal = car.originalMonthlyRate || Math.round(car.originalDailyRate * 30 * 0.8);
  const monthlySavePct =
    monthlyOriginal > car.monthlyRate
      ? Math.round(((monthlyOriginal - car.monthlyRate) / monthlyOriginal) * 100)
      : 40;

  const currentRate =
    selectedPlan === "daily"
      ? car.dailyRate
      : selectedPlan === "weekly"
      ? Math.round(car.weeklyRate / 7)
      : Math.round(car.monthlyRate / 30);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : carImages.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < carImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-white select-none overflow-x-hidden antialiased">
      
      {/* =========================================================================
          EXACT SAME HOME PAGE NAVBAR
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

        {/* Full Desktop Navigation: ALL CAPITAL, NOT BOLD, NO ICONS */}
        <nav className="hidden xl:flex items-center gap-6 lg:gap-7 text-xs font-normal tracking-wider text-neutral-300">
          <Link to="/" className="uppercase font-normal hover:text-white transition-colors cursor-pointer">
            HOME
          </Link>

          {/* All Brands Dropdown in Mega Grid */}
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
                className="absolute left-0 top-full mt-0 w-[640px] sm:w-[760px] bg-[#121319] shadow-2xl border border-neutral-800 py-4 px-6 z-50 animate-in fade-in duration-100 max-h-[80vh] overflow-y-auto rounded-none"
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

          <Link
            to="/flash-deals"
            className="uppercase font-normal text-[#FFE600] hover:text-amber-400 transition-colors cursor-pointer"
          >
            FLASH DEALS
          </Link>

          {/* Categories Dropdown in Two Vertical Columns */}
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

          {/* Locations Dropdown in Two Columns */}
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

          <a href="/#services" className="uppercase font-normal hover:text-white transition-colors cursor-pointer">
            SERVICES
          </a>
          <a href="/#blogs" className="uppercase font-normal hover:text-white transition-colors cursor-pointer">
            BLOGS
          </a>
          <a
            href="tel:+971500000000"
            className="uppercase font-normal text-[#FFE600] hover:text-white transition-colors cursor-pointer"
          >
            CONTACT US
          </a>
        </nav>

        {/* Right Action: Currency Dropdown + VIP Contact + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Currency Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCurrencyDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-normal uppercase px-3 py-1.5 border border-neutral-700 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95 rounded-none"
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
                className="absolute right-0 top-full mt-0 w-44 bg-[#121319] shadow-2xl border border-neutral-800 py-1.5 z-50 animate-in fade-in duration-100 rounded-none"
                onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-[10px] font-normal text-neutral-500 uppercase tracking-wider border-b border-neutral-800">
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
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-normal text-left hover:bg-neutral-800 cursor-pointer transition-colors uppercase rounded-none ${
                      selectedCurrency === curr.code
                        ? "text-[#FFE600] bg-neutral-800/70"
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
            href={`https://wa.me/?text=Hi%20Luxora%20Drive%2C%20I%20am%20interested%20in%20renting%20the%20${encodeURIComponent(
              car.name
            )}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebd5a] text-black px-3.5 py-1.5 rounded-none font-extrabold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-none bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Identical to Home Page) */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-[#07080b]/98 backdrop-blur-xl pt-20 px-6 pb-10 overflow-y-auto space-y-4 animate-in fade-in">
          <div className="flex flex-col space-y-3 text-sm font-medium text-neutral-300 border-b border-neutral-800 pb-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFE600] py-2">
              HOME
            </Link>
            <Link to="/flash-deals" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FFE600] py-2 font-bold">
              FLASH DEALS
            </Link>
            <a href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFE600] py-2">
              SERVICES
            </a>
            <a href="/#blogs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#FFE600] py-2">
              BLOGS
            </a>
            <a href="tel:+971500000000" className="text-[#FFE600] py-2 font-bold">
              CONTACT US: +971 50 000 0000
            </a>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
              Fleet Brands
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {allCarBrands.slice(0, 8).map((b) => (
                <Link
                  key={b.id}
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-none bg-neutral-900 border border-neutral-800 hover:text-[#FFE600]"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PRODUCT DETAILS CONTENT: PURE BLACK THEME & ZERO BORDER CURVE (ROUNDED-NONE)
          ========================================================================= */}
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 py-6 sm:py-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link to="/" className="hover:text-white transition-colors">
            Dubai Fleet
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-neutral-300">{car.brand}</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-[#FFE600] font-bold truncate max-w-[240px] sm:max-w-none">
            {car.name}
          </span>
        </nav>

        {/* -----------------------------------------------------------------------
            TOP SECTION: 2 COLUMNS (NO BORDER CURVE - PURE BLACK THEME)
            ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: MAIN CAR VIEWPORT (WITH YELLOW ARROWS) + THUMBNAILS NICHE
              ===================================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-3">
            
            {/* Main Image Showcase Card (Black Theme with Yellow Chevron Arrows - Rounded None) */}
            <div className="relative w-full h-72 sm:h-96 md:h-[420px] bg-gradient-to-b from-[#12141e] via-[#0d0f17] to-[#07080b] border border-neutral-800 rounded-none flex items-center justify-center p-6 sm:p-10 overflow-hidden group select-none shadow-2xl">
              
              {/* Previous Photo Button (Yellow Chevron Arrow `<` as in screenshot) */}
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#FFE600] hover:text-amber-400 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                aria-label="Previous view"
              >
                <ChevronLeft className="w-9 h-9 stroke-[3]" />
              </button>

              {/* Next Photo Button (Yellow Chevron Arrow `>` as in screenshot) */}
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#FFE600] hover:text-amber-400 hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                aria-label="Next view"
              >
                <ChevronRight className="w-9 h-9 stroke-[3]" />
              </button>

              {/* Action Buttons: Wishlist & Share in top-right */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-8 h-8 rounded-none flex items-center justify-center border transition-all cursor-pointer ${
                    isWishlisted
                      ? "bg-red-500/20 border-red-500 text-red-500 scale-105"
                      : "bg-[#141622] border-neutral-700 text-neutral-400 hover:text-white"
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-8 h-8 rounded-none bg-[#141622] hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Share Vehicle"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Main Displayed Car Image (Clicking opens fullscreen popup lightbox) */}
              <div
                className="w-full h-full flex items-center justify-center relative cursor-zoom-in"
                onClick={() => openLightbox(activeImageIndex)}
                title="Click to view full photo lightbox"
              >
                <img
                  src={carImages[activeImageIndex] || carImages[0]}
                  alt={`${car.name} view ${activeImageIndex + 1}`}
                  className="max-h-[88%] max-w-[94%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:scale-104"
                />
              </div>

              {/* Image Counter Badge */}
              <div className="absolute bottom-3 right-3 z-20 text-[10px] font-mono font-bold bg-black/80 border border-neutral-700 text-neutral-300 px-2 py-0.5 rounded-none backdrop-blur-xs">
                {activeImageIndex + 1} / {carImages.length}
              </div>
            </div>

            {/* THUMBNAIL GALLERY STRIP (PLACED NICHE/BELOW, NO BORDER CURVE) */}
            <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
              
              {/* Slot 1: WATCH VIDEO Thumbnail with dark tint + round play button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="relative aspect-video rounded-none border border-neutral-700 bg-neutral-900 p-0.5 overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-md hover:border-[#FFE600] transition-all"
                title="Watch Video"
              >
                <img
                  src={galleryItems[0]}
                  alt="Watch Video Preview"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.4] group-hover:brightness-50 group-hover:scale-105 transition-all"
                />
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-none bg-[#FFE600] text-black flex items-center justify-center shadow-md mb-0.5 group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-black translate-x-0.5" />
                  </div>
                  <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-white drop-shadow-md">
                    WATCH VIDEO
                  </span>
                </div>
              </button>

              {/* Slot 2: Front View */}
              <button
                type="button"
                onClick={() => setActiveImageIndex(0)}
                className={`relative aspect-video rounded-none border p-1 bg-[#10121a] flex items-center justify-center cursor-pointer overflow-hidden transition-all shadow-md ${
                  activeImageIndex === 0
                    ? "border-2 border-[#FFE600] shadow-[0_0_12px_rgba(255,230,0,0.4)]"
                    : "border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={galleryItems[1]}
                  alt="Thumbnail 2"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </button>

              {/* Slot 3: Rear View */}
              <button
                type="button"
                onClick={() => setActiveImageIndex(1 % carImages.length)}
                className={`relative aspect-video rounded-none border p-1 bg-[#10121a] flex items-center justify-center cursor-pointer overflow-hidden transition-all shadow-md ${
                  activeImageIndex === (1 % carImages.length)
                    ? "border-2 border-[#FFE600] shadow-[0_0_12px_rgba(255,230,0,0.4)]"
                    : "border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={galleryItems[2]}
                  alt="Thumbnail 3"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </button>

              {/* Slot 4: Interior Front Cockpit */}
              <button
                type="button"
                onClick={() => setActiveImageIndex(2 % carImages.length)}
                className={`relative aspect-video rounded-none border p-1 bg-[#10121a] flex items-center justify-center cursor-pointer overflow-hidden transition-all shadow-md ${
                  activeImageIndex === (2 % carImages.length)
                    ? "border-2 border-[#FFE600] shadow-[0_0_12px_rgba(255,230,0,0.4)]"
                    : "border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={galleryItems[3]}
                  alt="Thumbnail 4"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </button>

              {/* Slot 5: Interior Passenger Cabin */}
              <button
                type="button"
                onClick={() => setActiveImageIndex(Math.min(3, carImages.length - 1))}
                className={`relative aspect-video rounded-none border p-1 bg-[#10121a] flex items-center justify-center cursor-pointer overflow-hidden transition-all shadow-md ${
                  activeImageIndex === Math.min(3, carImages.length - 1)
                    ? "border-2 border-[#FFE600] shadow-[0_0_12px_rgba(255,230,0,0.4)]"
                    : "border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={galleryItems[4]}
                  alt="Thumbnail 5"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </button>

              {/* Slot 6: VIEW ALL Overlay (Clicking opens fullscreen popup lightbox) */}
              <button
                type="button"
                onClick={() => openLightbox(activeImageIndex)}
                className="relative aspect-video rounded-none border border-neutral-700 bg-neutral-900 p-0.5 overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-md hover:border-[#FFE600] transition-all"
                title="View All Photos in Popup Lightbox"
              >
                <img
                  src={galleryItems[5]}
                  alt="View All Photos"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:scale-105 transition-all"
                />
                <div className="relative z-10 text-center">
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white drop-shadow-md">
                    VIEW ALL
                  </span>
                </div>
              </button>
            </div>

            {copiedLink && (
              <div className="p-2 rounded-none bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs text-center font-bold">
                Car link copied to clipboard!
              </div>
            )}
          </div>

          {/* =====================================================================
              RIGHT COLUMN: TITLE, 3-ROW TIERED RATE BOX, 3 BUTTONS & DESCRIPTION
              ===================================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-4">
            
            {/* Header: Rent Category + Car Title */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                {car.category.startsWith("Rent ")
                  ? car.category
                  : `Rent ${car.practicalSpecs.passengers} Seater`}
              </span>
              <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight uppercase font-poster">
                {car.name}
              </h1>
            </div>

            {/* 3-Row Tiered Pricing Box (Black Theme, Rounded None) */}
            <div className="bg-[#12141f] border border-neutral-800 rounded-none p-3.5 sm:p-4 space-y-2.5 shadow-xl">
              
              {/* Row 1: DAILY RATE */}
              <div
                onClick={() => setSelectedPlan("daily")}
                className={`p-3 rounded-none flex items-center justify-between cursor-pointer transition-all ${
                  selectedPlan === "daily"
                    ? "bg-[#1c1f2e] border-2 border-[#FFE600] shadow-md"
                    : "bg-[#0f1118] border border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="bg-black text-[#FFE600] text-[10px] font-black px-2.5 py-0.5 rounded-none tracking-wider uppercase border border-[#FFE600]/40">
                    SAVE {dailySavePct}%
                  </span>
                  <span className="text-xs font-bold text-neutral-300 tracking-wider uppercase">
                    DAILY
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-base sm:text-lg font-black text-white">
                    {formatCurrency(car.dailyRate)} <span className="text-xs font-normal text-neutral-400">/ Day</span>
                  </span>
                  <span className="text-xs text-neutral-500 line-through">
                    {formatCurrency(car.originalDailyRate)}
                  </span>
                </div>
              </div>

              {/* Row 2: WEEKLY RATE */}
              <div
                onClick={() => setSelectedPlan("weekly")}
                className={`p-3 rounded-none flex items-center justify-between cursor-pointer transition-all ${
                  selectedPlan === "weekly"
                    ? "bg-[#1c1f2e] border-2 border-[#FFE600] shadow-md"
                    : "bg-[#0f1118] border border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="bg-black text-[#FFE600] text-[10px] font-black px-2.5 py-0.5 rounded-none tracking-wider uppercase border border-[#FFE600]/40">
                    SAVE {weeklySavePct}%
                  </span>
                  <span className="text-xs font-bold text-neutral-300 tracking-wider uppercase">
                    WEEKLY
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-base sm:text-lg font-black text-white">
                    {formatCurrency(car.weeklyRate)} <span className="text-xs font-normal text-neutral-400">/ Weekly</span>
                  </span>
                  <span className="text-xs text-neutral-500 line-through">
                    {formatCurrency(weeklyOriginal)}
                  </span>
                </div>
              </div>

              {/* Row 3: MONTHLY RATE */}
              <div
                onClick={() => setSelectedPlan("monthly")}
                className={`p-3 rounded-none flex items-center justify-between cursor-pointer transition-all ${
                  selectedPlan === "monthly"
                    ? "bg-[#1c1f2e] border-2 border-[#FFE600] shadow-md"
                    : "bg-[#0f1118] border border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="bg-black text-[#FFE600] text-[10px] font-black px-2.5 py-0.5 rounded-none tracking-wider uppercase border border-[#FFE600]/40">
                    SAVE {monthlySavePct}%
                  </span>
                  <span className="text-xs font-bold text-neutral-300 tracking-wider uppercase">
                    MONTHLY
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-base sm:text-lg font-black text-white">
                    {formatCurrency(car.monthlyRate)}
                  </span>
                  <span className="text-xs text-neutral-500 line-through">
                    {formatCurrency(monthlyOriginal)}
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Horizontal Action Buttons (WhatsApp Green, Call Us Red, Inquire Now Black/Gold - Rounded None) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              
              {/* WhatsApp Button (Green) */}
              <a
                href={`https://wa.me/?text=Hi%20Luxora%20Drive%2C%20I%20want%20to%20rent%20the%20${encodeURIComponent(
                  car.name
                )}%20(${selectedPlan.toUpperCase()}%20PLAN%20at%20${encodeURIComponent(
                  formatCurrency(currentRate)
                )})`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#1E7E34] hover:bg-[#186429] text-white py-2.5 px-2 sm:px-3 rounded-none font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-colors text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span className="truncate">WhatsApp</span>
              </a>

              {/* Call Us Button (Red) */}
              <a
                href="tel:+971500000000"
                className="bg-[#B30006] hover:bg-[#8f0005] text-white py-2.5 px-2 sm:px-3 rounded-none font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-colors text-center"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="truncate">Call Us</span>
              </a>

              {/* Inquire Now Button (Black / Yellow Accent) */}
              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="bg-black hover:bg-neutral-900 text-white border border-[#FFE600]/40 py-2.5 px-2 sm:px-3 rounded-none font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-colors text-center cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="truncate">Inquire Now</span>
              </button>
            </div>

            {/* Vehicle Description with Yellow Accent Bar on the right */}
            <div className="relative p-4 bg-[#0f1118] border border-neutral-800 rounded-none shadow-lg">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal pr-4">
                {car.description}
              </p>
              {/* Vertical Yellow Accent Bar on the right */}
              <div className="absolute right-2.5 top-3.5 bottom-3.5 w-1 bg-[#FFE600] rounded-none shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
            </div>

          </div>
        </div>

        {/* -----------------------------------------------------------------------
            BOTTOM SECTION: SPECIFICATIONS & INCLUDED + VIP GUARANTEE CARD
            ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
          
          {/* Left Panel: SPECIFICATIONS & INCLUDED (Col 7 - Rounded None) */}
          <div className="lg:col-span-7 bg-[#0f1118] rounded-none border border-neutral-800 p-5 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header with yellow accent bar */}
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
                  SPECIFICATIONS
                </h3>
                <div className="w-8 h-1 bg-[#FFE600] mt-1 mb-5 rounded-none shadow-[0_0_8px_rgba(255,230,0,0.5)]" />
              </div>

              {/* 6-Item Specifications Grid (3 Columns x 2 Rows) */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                
                {/* 1. Make */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none border border-neutral-800 bg-[#141622] flex items-center justify-center text-[#FFE600] shrink-0">
                    <Car className="w-5 h-5 text-[#FFE600]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">Make</span>
                    <span className="text-[11px] text-neutral-400 font-medium">{car.brand}</span>
                  </div>
                </div>

                {/* 2. Car Type */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none border border-neutral-800 bg-[#141622] flex items-center justify-center text-[#FFE600] shrink-0">
                    <Award className="w-5 h-5 text-[#FFE600]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">Car Type</span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {car.practicalSpecs.carType || car.category}
                    </span>
                  </div>
                </div>

                {/* 3. Door */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none border border-neutral-800 bg-[#141622] flex items-center justify-center text-[#FFE600] shrink-0">
                    <DoorClosed className="w-5 h-5 text-[#FFE600]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">Door</span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {car.practicalSpecs.doors} Doors
                    </span>
                  </div>
                </div>

                {/* 4. Passengers */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none border border-neutral-800 bg-[#141622] flex items-center justify-center text-[#FFE600] shrink-0">
                    <Users className="w-5 h-5 text-[#FFE600]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">Passengers</span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {car.practicalSpecs.passengers}
                    </span>
                  </div>
                </div>

                {/* 5. Gear */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none border border-neutral-800 bg-[#141622] flex items-center justify-center text-[#FFE600] shrink-0">
                    <Settings2 className="w-5 h-5 text-[#FFE600]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">Gear</span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {car.practicalSpecs.gear}
                    </span>
                  </div>
                </div>

                {/* 6. Luggages */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none border border-neutral-800 bg-[#141622] flex items-center justify-center text-[#FFE600] shrink-0">
                    <Briefcase className="w-5 h-5 text-[#FFE600]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">Luggages</span>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {car.practicalSpecs.luggages}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* INCLUDED Sub-section */}
            <div className="pt-6 mt-6 border-t border-neutral-800">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-2">
                INCLUDED
              </span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                  <span>Insurance Included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Trust & VIP Guarantees Card (Col 5 - Rounded None) */}
          <div className="lg:col-span-5 bg-[#0f1118] rounded-none border border-neutral-800 p-5 sm:p-7 shadow-xl flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs text-neutral-300">
              
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Insurance included</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">No deposit</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Car className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Own fleet</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Working 24/7</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Delivery &amp; pick-up</span>
              </div>

              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Late return</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">Free cancellation</span>
              </div>

              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFE600] shrink-0" />
                <span className="font-semibold text-white text-[11px] sm:text-xs">No hidden costs</span>
              </div>

            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM SECTION: RELATED PRODUCTS (EXACT SAME AS HOMEPAGE PRODUCT CARDS)
            ========================================================================= */}
        <section className="pt-10 sm:pt-14 border-t border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFE600]">
                EXCLUSIVE DUBAI FLEET
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-poster mt-0.5">
                RELATED CARS YOU MAY ALSO LIKE
              </h2>
            </div>

            <Link
              to="/"
              className="text-xs font-bold text-[#FFE600] hover:text-yellow-300 flex items-center gap-1 group transition-colors"
            >
              <span>View All Fleet Vehicles</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Related Cards Grid: EXACT SAME AS HOMEPAGE (Sharp corners, dark cards, 3 dots, call button, etc.) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCars.map((card) => {
              const isFlash = Boolean(card.flashSale?.active);
              const cardImageIndex = relatedCardImageIndices[card.id] || 0;
              const cardImgs = card.images && card.images.length > 0 ? card.images : [luxoraLogoWhite];

              const handlePrev = (e: React.MouseEvent) => {
                e.stopPropagation();
                setRelatedCardImageIndices((prev) => ({
                  ...prev,
                  [card.id]: cardImageIndex > 0 ? cardImageIndex - 1 : cardImgs.length - 1,
                }));
              };

              const handleNext = (e: React.MouseEvent) => {
                e.stopPropagation();
                setRelatedCardImageIndices((prev) => ({
                  ...prev,
                  [card.id]: cardImageIndex < cardImgs.length - 1 ? cardImageIndex + 1 : 0,
                }));
              };

              const dailyPct =
                card.originalDailyRate > card.dailyRate
                  ? `${Math.round(((card.originalDailyRate - card.dailyRate) / card.originalDailyRate) * 100)}%`
                  : "24%";

              const monthlyOriginalRate = card.originalMonthlyRate || Math.round(card.originalDailyRate * 30 * 0.8);
              const monthlyPct =
                monthlyOriginalRate > card.monthlyRate
                  ? `${Math.round(((monthlyOriginalRate - card.monthlyRate) / monthlyOriginalRate) * 100)}%`
                  : "39%";

              return (
                <div
                  key={card.id}
                  onClick={() => navigate({ to: "/cars/$carId", params: { carId: card.id } })}
                  className={`rounded-none transition-all duration-300 overflow-hidden flex flex-col justify-between group relative cursor-pointer ${
                    isFlash
                      ? "bg-gradient-to-b from-[#2a0c16] via-[#16101c] to-[#0c0d12] border-2 border-red-500/70 shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:border-red-400"
                      : "bg-[#12141c] border border-neutral-800 shadow-md hover:shadow-2xl"
                  }`}
                >
                  {/* Full-card light shine sweeping on Flash Deals */}
                  {isFlash && <div className="flash-card-full-shine" aria-hidden="true" />}

                  {/* Flash Sale Top Ribbon Badge */}
                  {isFlash && (
                    <div className="absolute top-0 left-0 z-30 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-black text-[10px] tracking-widest uppercase px-3 py-1 flex items-center gap-1.5 shadow-md shadow-red-950/60 rounded-none">
                      <Zap className="w-3.5 h-3.5 fill-white text-white animate-bounce" />
                      <span>{card.flashSale.badgeText || "FLASH SALE SPECIAL OFFER"}</span>
                    </div>
                  )}

                  {/* Car Preview Box with 3-Image Slider */}
                  <div
                    className={`relative w-full h-48 sm:h-52 p-3 flex items-center justify-center overflow-hidden select-none rounded-none ${
                      isFlash ? "bg-gradient-to-b from-[#3a101d] to-[#180f1a]" : "bg-[#181a24]"
                    }`}
                  >
                    {/* Left & Right Chevrons */}
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous view"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-white font-black text-2xl leading-none transition-transform hover:scale-125 active:scale-95 cursor-pointer z-20 select-none drop-shadow-xs"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next view"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-white font-black text-2xl leading-none transition-transform hover:scale-125 active:scale-95 cursor-pointer z-20 select-none drop-shadow-xs"
                    >
                      &gt;
                    </button>

                    {/* Brand Logo in bottom-left */}
                    <div className="absolute left-3 bottom-2.5 z-10 pointer-events-none opacity-70">
                      <div className="w-6 h-6 rounded-none border border-neutral-700 flex items-center justify-center text-[11px] font-bold text-neutral-400">
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
                          <span key={dotIdx} className="w-2 h-2 rounded-none bg-neutral-700" />
                        );
                      })}
                    </div>

                    {/* Call Now Button at top-right corner */}
                    <a
                      href="tel:+971500000000"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-3 top-3 w-8 h-8 rounded-none bg-[#B30006] hover:bg-[#8f0005] text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95 z-20 animate-pulse"
                      title="Call Now"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                    </a>

                    {/* Black Circular Play Action Button */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({ to: "/cars/$carId", params: { carId: card.id } });
                      }}
                      className="absolute right-3 bottom-2.5 w-7 h-7 rounded-none bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform z-20"
                      title="View Car Details"
                    >
                      <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                    </div>

                    {/* Car Image with smooth hover scale */}
                    <img
                      src={cardImgs[cardImageIndex] || cardImgs[0]}
                      alt={`${card.name} - View ${cardImageIndex + 1}`}
                      className="max-h-36 sm:max-h-40 object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-108 select-none pointer-events-none relative z-10"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between rounded-none text-white">
                    <div>
                      <span className="text-xs text-neutral-400 font-medium block">
                        {card.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white leading-tight mt-1">
                        {card.name}
                      </h3>
                    </div>

                    {/* Price Rows */}
                    <div className="space-y-1.5 pt-1">
                      {/* Daily Rate */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-black text-white leading-none">
                            {formatCurrency(card.dailyRate)}
                          </span>
                          <span className="text-xs text-neutral-400 font-normal">/ Day</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-neutral-500 line-through">
                            {formatCurrency(card.originalDailyRate)}
                          </span>
                          <span className="font-bold text-emerald-400">{dailyPct}</span>
                        </div>
                      </div>

                      {/* Monthly Rate */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-black text-white leading-none">
                            {formatCurrency(card.monthlyRate)}
                          </span>
                          <span className="text-xs text-neutral-400 font-normal">/ Monthly</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-neutral-500 line-through">
                            {formatCurrency(monthlyOriginalRate)}
                          </span>
                          <span className="font-bold text-emerald-400">{monthlyPct}</span>
                        </div>
                      </div>
                    </div>

                    {/* Free Delivery & Insurance Included */}
                    <div className="flex items-center gap-4 text-xs font-bold text-neutral-300 pt-1">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FFE600] fill-[#FFE600] text-black" /> Free Delivery
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#FFE600] fill-[#FFE600] text-black" /> Insurance Included
                      </span>
                    </div>

                    {/* Action Buttons: WhatsApp & View Details */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <a
                        href={`https://wa.me/?text=Hi%2C%20I%20am%20interested%20in%20renting%20the%20${encodeURIComponent(card.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1.5 bg-[#1E7E34] hover:bg-[#186429] text-white py-2 px-2 rounded-none text-xs font-bold transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate({ to: "/cars/$carId", params: { carId: card.id } });
                        }}
                        className="flex items-center justify-center gap-1.5 bg-[#FFE600] hover:bg-yellow-400 text-black py-2 px-2 rounded-none text-xs font-black transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" /> View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* =========================================================================
          FULLSCREEN POPUP LIGHTBOX MODAL WITH LEFT & RIGHT NAVIGATION BUTTONS
          ========================================================================= */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar of Popup */}
          <div
            className="flex items-center justify-between z-20 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-base sm:text-lg font-black uppercase text-white font-poster">
                {car.name}
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                Photo {lightboxIndex + 1} of {carImages.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-none bg-neutral-900 hover:bg-[#FFE600] text-white hover:text-black border border-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-lg"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Showcase: Left Arrow, Big Image, Right Arrow */}
          <div
            className="relative flex-1 flex items-center justify-between w-full max-w-7xl mx-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Button */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : carImages.length - 1))
              }
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-none bg-neutral-900/90 hover:bg-[#FFE600] text-white hover:text-black border border-neutral-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl z-20 shrink-0"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-8 h-8 stroke-[3]" />
            </button>

            {/* Huge Centered Image */}
            <div className="flex-1 flex items-center justify-center p-4 max-h-[75vh]">
              <img
                src={carImages[lightboxIndex] || carImages[0]}
                alt={`${car.name} Fullscreen View ${lightboxIndex + 1}`}
                className="max-h-[72vh] max-w-[85vw] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-300"
              />
            </div>

            {/* Right Button */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) => (prev < carImages.length - 1 ? prev + 1 : 0))
              }
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-none bg-neutral-900/90 hover:bg-[#FFE600] text-white hover:text-black border border-neutral-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl z-20 shrink-0"
              aria-label="Next photo"
            >
              <ChevronRight className="w-8 h-8 stroke-[3]" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip in Popup */}
          <div
            className="flex items-center justify-center gap-2.5 overflow-x-auto py-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {carImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className={`h-14 w-20 sm:h-16 sm:w-24 rounded-none border p-1 bg-neutral-900 flex items-center justify-center cursor-pointer transition-all shrink-0 ${
                  lightboxIndex === idx
                    ? "border-2 border-[#FFE600] scale-105 shadow-[0_0_12px_rgba(255,230,0,0.5)]"
                    : "border-neutral-800 opacity-50 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="max-h-full max-w-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          WATCH VIDEO MODAL
          ========================================================================= */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-black border border-neutral-800 rounded-none overflow-hidden max-w-3xl w-full text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-neutral-900 flex items-center justify-between border-b border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                {car.name} — Official Video Showcase
              </span>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-7 h-7 rounded-none bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video
                src={herovideo}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INQUIRE NOW / BOOKING RESERVATION MODAL (ROUNDED NONE - BLACK THEME)
          ========================================================================= */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            className="bg-[#10121a] rounded-none p-6 sm:p-7 max-w-md w-full text-white space-y-4 shadow-2xl relative border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold uppercase font-poster text-white">
                  Reserve {car.name}
                </h3>
                <p className="text-[11px] text-neutral-400 font-medium">
                  {selectedPlan.toUpperCase()} Plan: {formatCurrency(currentRate)} / day
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#FFE600] mx-auto" />
                <h4 className="font-extrabold text-base text-white">Inquiry Received!</h4>
                <p className="text-xs text-neutral-400">
                  Our VIP Concierge will contact you within 15 minutes to confirm delivery at your hotel or villa in Dubai.
                </p>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="mt-4 px-6 py-2 bg-[#FFE600] text-black font-extrabold text-xs rounded-none"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBookingSuccess(true);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-neutral-300 font-bold mb-1 uppercase text-[10px]">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={bookingFormData.name}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-none bg-[#141622] border border-neutral-700 text-white focus:outline-none focus:border-[#FFE600]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1 uppercase text-[10px]">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={bookingFormData.phone}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-none bg-[#141622] border border-neutral-700 text-white focus:outline-none focus:border-[#FFE600]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-300 font-bold mb-1 uppercase text-[10px]">Pickup Date</label>
                    <input
                      type="date"
                      required
                      value={bookingFormData.pickupDate}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, pickupDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-none bg-[#141622] border border-neutral-700 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 font-bold mb-1 uppercase text-[10px]">Return Date</label>
                    <input
                      type="date"
                      required
                      value={bookingFormData.returnDate}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, returnDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-none bg-[#141622] border border-neutral-700 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-bold mb-1 uppercase text-[10px]">Delivery Location in Dubai</label>
                  <select
                    value={bookingFormData.deliveryLocation}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, deliveryLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded-none bg-[#141622] border border-neutral-700 text-white focus:outline-none focus:border-[#FFE600]"
                  >
                    <option value="Dubai Marina">Dubai Marina</option>
                    <option value="Downtown Dubai & Burj Khalifa">Downtown Dubai &amp; Burj Khalifa</option>
                    <option value="Palm Jumeirah">Palm Jumeirah</option>
                    <option value="Dubai International Airport (DXB)">Dubai International Airport (DXB)</option>
                    <option value="DIFC & Business Bay">DIFC &amp; Business Bay</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FFE600] hover:bg-yellow-400 text-black font-extrabold uppercase text-xs tracking-wider rounded-none transition-colors mt-2"
                >
                  Confirm Reservation Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
