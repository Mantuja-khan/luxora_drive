import { useState, useEffect, useRef, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  MapPin,
  CheckCircle2,
  Key,
  Phone,
  MessageCircle,
  Zap,
  Check,
  ArrowRight,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  ShieldCheck,
  X,
  Globe,
  Menu,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import mclaren765lt from "@/assets/mclaren-765lt.png";
import bmwM5Cs from "@/assets/bmw-m5-cs.png";
import audiRsQ8 from "@/assets/audi-rs-q8.png";
import porscheGt3Rs from "@/assets/porsche-gt3-rs.png";
import porscheRed from "@/assets/porsche-red.png";
import dubaiSuv from "@/assets/dubai_custom_suv.webp";
import lamboHuracanTiffany from "@/assets/lambo-huracan-tiffany.png";
import lamboHuracanWhite from "@/assets/lambo-huracan-white.png";
import lamboEvoCoupe from "@/assets/lambo-evo-coupe.png";
import lamboHuracanSto from "@/assets/lambo-huracan-sto.png";
import mercedesG63Maybach from "@/assets/mercedes-g63-maybach.png";
import mapGif from "@/assets/MAP.gif";
export interface CarItem {
  id: string;
  make: string;
  model: string;
  badge: string;
  category: string;
  tagline: string;
  description: string;
  cardShortDesc: string;
  builtFor: string;
  themeColor: string; // Accent color for the diagonal background stripe & UI
  accentRgb: string;
  image: string;
  alt: string;
  number: string;
  dailyRate: number;
  originalDailyRate: number;
  weeklyRate: number;
  securityDeposit: number;
  minAge: number;
  includedMileage: string;
  practicalSpecs: {
    make: string;
    carType: string;
    doors: number;
    passengers: number;
    gear: string;
    luggages: number;
  };
  specs: {
    engine: { label: string; value: string; subvalue: string };
    power: { label: string; value: string; subvalue: string };
    torque: { label: string; value: string; subvalue: string };
    weight: { label: string; value: string; subvalue: string };
    topSpeed: { label: string; value: string; subvalue: string };
    acceleration: { label: string; value: string; subvalue: string };
  };
}

const getCarFirstTwoWords = (make: string, model: string): string => {
  const full = `${make} ${model}`.trim();
  const words = full.split(/\s+/);
  return words.slice(0, 2).join(" ").toUpperCase();
};

const getCarTitleBreakdown = (make: string, model: string): { firstTwo: string; rest: string } => {
  const full = `${make} ${model}`.trim();
  const words = full.split(/\s+/);
  return {
    firstTwo: words.slice(0, 2).join(" "),
    rest: words.slice(2).join(" "),
  };
};

const getCarHeroBackdropName = (carId: string, make: string, model: string): string => {
  switch (carId) {
    case "lambo-huracan-tiffany":
      return "LAMBORGHINI EVO";
    case "lambo-huracan-white":
      return "LAMBORGHINI EVO";
    case "lambo-evo-coupe":
      return "LAMBORGHINI EVO";
    case "lambo-huracan-sto":
      return "LAMBORGHINI STO";
    case "mercedes-g63-maybach":
      return "MERCEDES G63";
    case "porsche-gt3-rs":
      return "PORSCHE 911";
    case "mclaren-765lt":
      return "MCLAREN 765LT";
    case "bmw-m5-cs":
      return "BMW M5";
    case "audi-rs-q8":
      return "AUDI RS Q8";
    default:
      return `${make} ${model}`.split(/\s+/).slice(0, 2).join(" ").toUpperCase();
  }
};

const getHeroTypographyStyle = (firstTwoWords: string, isMobile: boolean): React.CSSProperties => {
  const len = firstTwoWords.length;
  if (isMobile) {
    if (len > 14) {
      // e.g. "LAMBORGHINI EVO" (15 chars), "LAMBORGHINI STO" (15 chars)
      return {
        fontSize: "clamp(34px, 10.5vw, 52px)",
        letterSpacing: "-0.02em",
      };
    }
    if (len > 11) {
      // e.g. "MERCEDES G63" (12 chars), "PORSCHE 911" (11 chars)
      return {
        fontSize: "clamp(38px, 12vw, 60px)",
        letterSpacing: "-0.025em",
      };
    }
    return {
      fontSize: "clamp(44px, 13.5vw, 68px)",
      letterSpacing: "-0.03em",
    };
  } else {
    if (len > 14) {
      // e.g. "LAMBORGHINI EVO" (15 chars)
      return {
        fontSize: "clamp(54px, 9.5vw, 155px)",
        letterSpacing: "-0.03em",
      };
    }
    if (len > 11) {
      // e.g. "MERCEDES G63" (12 chars)
      return {
        fontSize: "clamp(62px, 11vw, 175px)",
        letterSpacing: "-0.035em",
      };
    }
    return {
      fontSize: "clamp(72px, 13vw, 210px)",
      letterSpacing: "-0.04em",
    };
  }
};

const fleet: CarItem[] = [
  {
    id: "lambo-huracan-tiffany",
    make: "Lamborghini",
    model: "Huracan EVO Tiffany",
    badge: "HURACAN EVO",
    category: "SUPERCAR",
    tagline: "TIFFANY BLUE. OPEN TOP THRILL.",
    description:
      "Striking Tiffany Blue bespoke edition. Naturally aspirated 5.2L V10 screaming to 8,500 RPM with open-top driving thrill.",
    cardShortDesc: "Bespoke Tiffany Cyan livery with 640 PS naturally aspirated V10 power.",
    builtFor: "PURE THRILL & EXOTIC PRESTIGE.",
    themeColor: "#00E5D0", // Tiffany Teal
    accentRgb: "0, 229, 208",
    image: lamboHuracanTiffany,
    alt: "Tiffany Blue Lamborghini Huracan EVO",
    number: "01",
    dailyRate: 1499,
    originalDailyRate: 1980,
    weeklyRate: 8999,
    securityDeposit: 3000,
    minAge: 25,
    includedMileage: "150 mi / day included",
    practicalSpecs: {
      make: "Lamborghini",
      carType: "Supercar",
      doors: 2,
      passengers: 2,
      gear: "Auto (7-Speed LDF)",
      luggages: 2,
    },
    specs: {
      engine: { label: "ENGINE", value: "5.2L V10", subvalue: "NATURALLY ASP." },
      power: { label: "POWER", value: "640 PS", subvalue: "470 kW" },
      torque: { label: "TORQUE", value: "600 Nm", subvalue: "443 lb-ft" },
      weight: { label: "WEIGHT", value: "1,422 kg", subvalue: "CARBON SPEC" },
      topSpeed: { label: "TOP SPEED", value: "325 km/h", subvalue: "202 mph" },
      acceleration: { label: "0-100 KM/H", value: "3.1 s", subvalue: "0-60 in 2.9s" },
    },
  },
  {
    id: "lambo-huracan-white",
    make: "Lamborghini",
    model: "Huracan Evo",
    badge: "HURACAN EVO",
    category: "SUPERCAR",
    tagline: "ITALIAN EXCELLENCE IN WHITE.",
    description:
      "Pure Italian performance in pristine pearl white. Uncompromising handling with all-wheel drive and magnetic suspension.",
    cardShortDesc: "Bianco Monocerus White with naturally aspirated 5.2L V10 and AWD.",
    builtFor: "PERFECT AGILITY.",
    themeColor: "#9CA3AF",
    accentRgb: "156, 163, 175",
    image: lamboHuracanWhite,
    alt: "White Lamborghini Huracan EVO",
    number: "02",
    dailyRate: 1399,
    originalDailyRate: 1850,
    weeklyRate: 8500,
    securityDeposit: 2500,
    minAge: 25,
    includedMileage: "150 mi / day included",
    practicalSpecs: {
      make: "Lamborghini",
      carType: "Supercar",
      doors: 2,
      passengers: 2,
      gear: "Auto (7-Speed LDF)",
      luggages: 2,
    },
    specs: {
      engine: { label: "ENGINE", value: "5.2L V10", subvalue: "NATURALLY ASP." },
      power: { label: "POWER", value: "640 PS", subvalue: "470 kW" },
      torque: { label: "TORQUE", value: "600 Nm", subvalue: "443 lb-ft" },
      weight: { label: "WEIGHT", value: "1,422 kg", subvalue: "ALL-WHEEL DRIVE" },
      topSpeed: { label: "TOP SPEED", value: "325 km/h", subvalue: "202 mph" },
      acceleration: { label: "0-100 KM/H", value: "2.9 s", subvalue: "0-60 in 2.8s" },
    },
  },
  {
    id: "lambo-evo-coupe",
    make: "Lamborghini",
    model: "Evo Coupe",
    badge: "EVO COUPE",
    category: "SUPERCAR",
    tagline: "STEALTH GRIGIO WITH GOLD ACCENTS.",
    description:
      "Stealth Grigio finish accented by forged gold alloy wheels. Blistering acceleration and breathtaking visual appeal.",
    cardShortDesc: "Grigio Titans metallic with bronze forged alloys and V10 symphony.",
    builtFor: "EXOTIC DISTINCTION.",
    themeColor: "#EAB308",
    accentRgb: "234, 179, 8",
    image: lamboEvoCoupe,
    alt: "Grigio Grey Lamborghini Evo Coupe",
    number: "03",
    dailyRate: 1450,
    originalDailyRate: 1900,
    weeklyRate: 8800,
    securityDeposit: 2500,
    minAge: 25,
    includedMileage: "150 mi / day included",
    practicalSpecs: {
      make: "Lamborghini",
      carType: "Supercar",
      doors: 2,
      passengers: 2,
      gear: "Auto (7-Speed Dual-Clutch)",
      luggages: 2,
    },
    specs: {
      engine: { label: "ENGINE", value: "5.2L V10", subvalue: "HIGH-REV" },
      power: { label: "POWER", value: "640 PS", subvalue: "470 kW" },
      torque: { label: "TORQUE", value: "600 Nm", subvalue: "443 lb-ft" },
      weight: { label: "WEIGHT", value: "1,422 kg", subvalue: "FORGED WHEELS" },
      topSpeed: { label: "TOP SPEED", value: "325 km/h", subvalue: "202 mph" },
      acceleration: { label: "0-100 KM/H", value: "3.0 s", subvalue: "Dynamic Steer" },
    },
  },
  {
    id: "lambo-huracan-sto",
    make: "Lamborghini",
    model: "Huracan STO",
    badge: "HURACAN STO",
    category: "SUPERCAR",
    tagline: "HOMOLOGATED FOR THE ROAD.",
    description:
      "Direct road-homologated Squadra Corse racecar with extreme aerodynamic downforce and pure motorsport DNA.",
    cardShortDesc: "Squadra Corse heritage with radical carbon aero and 640 PS V10.",
    builtFor: "TRACK EXTREMITY.",
    themeColor: "#A3E635",
    accentRgb: "163, 230, 53",
    image: lamboHuracanSto,
    alt: "Verde Scandal Lamborghini Huracan STO",
    number: "04",
    dailyRate: 1799,
    originalDailyRate: 2400,
    weeklyRate: 10500,
    securityDeposit: 3500,
    minAge: 25,
    includedMileage: "120 mi / day included",
    practicalSpecs: {
      make: "Lamborghini",
      carType: "Supercar",
      doors: 2,
      passengers: 2,
      gear: "Auto (7-Speed Dual-Clutch)",
      luggages: 1,
    },
    specs: {
      engine: { label: "ENGINE", value: "5.2L V10", subvalue: "SQUADRA CORSE" },
      power: { label: "POWER", value: "640 PS", subvalue: "470 kW" },
      torque: { label: "TORQUE", value: "565 Nm", subvalue: "417 lb-ft" },
      weight: { label: "WEIGHT", value: "1,339 kg", subvalue: "DRY" },
      topSpeed: { label: "TOP SPEED", value: "310 km/h", subvalue: "193 mph" },
      acceleration: { label: "0-100 KM/H", value: "3.0 s", subvalue: "Rear-Wheel Drive" },
    },
  },
  {
    id: "mercedes-g63-maybach",
    make: "Mercedes",
    model: "G63 Maybach",
    badge: "G63 MAYBACH",
    category: "LUXURY SUV",
    tagline: "COMMANDING LUXURY & POWER.",
    description:
      "Handcrafted Maybach bespoke leather, twin-turbo V8 rumble, and commanding presence across Dubai's highways.",
    cardShortDesc: "Handcrafted Maybach edition with 4.0L V8 Biturbo and commanding stance.",
    builtFor: "UNRIVALED DOMINANCE.",
    themeColor: "#B7B09E",
    accentRgb: "183, 176, 158",
    image: mercedesG63Maybach,
    alt: "White Mercedes-AMG G63 Maybach",
    number: "05",
    dailyRate: 1499,
    originalDailyRate: 1980,
    weeklyRate: 8999,
    securityDeposit: 2500,
    minAge: 23,
    includedMileage: "200 mi / day included",
    practicalSpecs: {
      make: "Mercedes",
      carType: "Luxury SUV",
      doors: 5,
      passengers: 5,
      gear: "Auto (9G-TRONIC)",
      luggages: 4,
    },
    specs: {
      engine: { label: "ENGINE", value: "4.0L V8", subvalue: "BITURBO" },
      power: { label: "POWER", value: "585 PS", subvalue: "430 kW" },
      torque: { label: "TORQUE", value: "850 Nm", subvalue: "627 lb-ft" },
      weight: { label: "WEIGHT", value: "2,560 kg", subvalue: "4MATIC" },
      topSpeed: { label: "TOP SPEED", value: "240 km/h", subvalue: "149 mph" },
      acceleration: { label: "0-100 KM/H", value: "4.5 s", subvalue: "AMG 4MATIC+" },
    },
  },
  {
    id: "porsche-gt3-rs",
    make: "PORSCHE",
    model: "911 GT3 RS",
    badge: "GT3 RS",
    category: "TRACK WEAPON",
    tagline: "BRED IN WEISSACH. UNLEASHED.",
    description:
      "Pure motorsport pedigree featuring DRS aero, magnesium wheels, and the intoxicating 9,000 RPM naturally aspirated scream.",
    cardShortDesc: "Naturally aspirated 4.0L boxer-6 with active DRS aerodynamic downforce.",
    builtFor: "UNADULTERATED SPEED.",
    themeColor: "#E63946", // Porsche Guards Red / Speed Racing
    accentRgb: "230, 57, 70",
    image: porscheGt3Rs,
    alt: "Racing yellow / red Porsche 911 GT3 RS with swan-neck wing",
    number: "06",
    dailyRate: 1650,
    originalDailyRate: 1850,
    weeklyRate: 9800,
    securityDeposit: 3000,
    minAge: 25,
    includedMileage: "120 mi / day included",
    practicalSpecs: {
      make: "Porsche",
      carType: "Track Weapon",
      doors: 2,
      passengers: 2,
      gear: "Auto (7-Speed PDK)",
      luggages: 2,
    },
    specs: {
      engine: { label: "ENGINE", value: "4.0L FLAT-6", subvalue: "NATURALLY ASP." },
      power: { label: "POWER", value: "525 PS", subvalue: "386 kW" },
      torque: { label: "TORQUE", value: "465 Nm", subvalue: "343 lb-ft" },
      weight: { label: "WEIGHT", value: "1,450 kg", subvalue: "DRY TRACK" },
      topSpeed: { label: "TOP SPEED", value: "296 km/h", subvalue: "184 mph" },
      acceleration: { label: "0-100 KM/H", value: "3.2 s", subvalue: "7-Speed PDK" },
    },
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxora Drive — Luxury & Supercar Rentals" },
      {
        name: "description",
        content:
          "Luxora Drive offers premier exotic and luxury supercar rentals with VIP airport handover and private concierge service.",
      },
    ],
  }),
  component: CarShowcasePage,
});

export type CurrencyCode = "AED" | "USD" | "EUR";

export interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  rate: number;
  flag: string;
}

export const currencies: CurrencyConfig[] = [
  { code: "AED", label: "AED (UAE Dirham)", symbol: "AED ", rate: 3.67, flag: "🇦🇪" },
  { code: "USD", label: "USD (US Dollar)", symbol: "$", rate: 1.0, flag: "🇺🇸" },
  { code: "EUR", label: "EUR (Euro)", symbol: "€", rate: 0.92, flag: "🇪🇺" },
];

export interface FlashSaleItem {
  id: string;
  badge: string;
  name: string;
  category: string;
  image: string;
  dailyRate: number;
  originalDailyRate: number;
  discount: string;
  monthlyRate: number;
  timerString: string;
  specs: {
    power: string;
    speed: string;
    accel: string;
  };
  carRef: CarItem;
}

export interface RentalCategory {
  id: string;
  title: string;
  count: string;
  isFlash?: boolean;
}

const rentalCategories: RentalCategory[] = [
  { id: "flash-sale", title: "FLASH SALE", count: "36 Cars", isFlash: true },
  { id: "supercars", title: "RENT SUPERCARS", count: "50 Cars" },
  { id: "monthly", title: "RENT MONTHLY", count: "163 Cars" },
  { id: "luxury", title: "RENT LUXURY", count: "253 Cars" },
  { id: "sports", title: "RENT SPORTS", count: "123 Cars" },
  { id: "suv", title: "RENT SUV", count: "219 Cars" },
  { id: "modified", title: "RENT MODIFIED", count: "109 Cars" },
  { id: "7-seater", title: "RENT 7 SEATER", count: "63 Cars" },
  { id: "economy", title: "RENT ECONOMY CAR", count: "18 Cars" },
  { id: "luxury-van", title: "LUXURY VAN RENTAL", count: "9 Cars" },
  { id: "convertible", title: "RENT CONVERTIBLE", count: "48 Cars" },
  { id: "driver", title: "CAR WITH DRIVER", count: "10 Cars" },
  { id: "patrol", title: "PATROL EXPERTS", count: "17 Cars" },
  { id: "lease", title: "LEASE TO OWN", count: "25 Cars" },
];

export interface PorscheProductCard {
  id: string;
  topBadge: string;
  topBadgeTheme: "dark" | "blue";
  category: string;
  name: string;
  images: string[];
  dayMonthRate?: number;
  dailyRate: number;
  originalDailyRate: number;
  dailyDiscount: string;
  monthlyRate: number;
  originalMonthlyRate: number;
  monthlyDiscount: string;
  hasFlashTimer?: boolean;
  timerString?: string;
  specs: {
    engine: string;
    power: string;
    speed: string;
    accel: string;
    gear: string;
    weight: string;
  };
  features: string[];
  description: string;
}

const porscheProductCards: PorscheProductCard[] = [
  {
    id: "mercedes-g63-maybach-card",
    category: "Rent Modified",
    name: "Mercedes-AMG G63",
    images: [mercedesG63Maybach, mercedesG63Maybach, mercedesG63Maybach],
    dailyRate: 1499,
    originalDailyRate: 1980,
    dailyDiscount: "24%",
    monthlyRate: 29999,
    originalMonthlyRate: 49500,
    monthlyDiscount: "39%",
    specs: {
      engine: "4.0L V8 Biturbo",
      power: "585 PS / 430 kW",
      speed: "240 km/h",
      accel: "0-100 km/h in 4.5s",
      gear: "9G-TRONIC AMG",
      weight: "2,560 kg",
    },
    features: [
      "Maybach Handcrafted Leather",
      "AMG Night Styling Package",
      "Burmester 3D Surround Audio",
      "Active Dual Side-Exhausts",
    ],
    description:
      "The undisputed king of luxury performance SUVs in Dubai. Handcrafted Maybach leather, twin-turbo V8 rumble, and unmatched commanding road presence.",
  },
  {
    id: "lambo-huracan-tiffany-card",
    category: "Rent Supercars",
    name: "Lamborghini Huracan EVO Tiffany",
    images: [lamboHuracanTiffany, lamboHuracanTiffany, lamboHuracanTiffany],
    dailyRate: 1499,
    originalDailyRate: 1980,
    dailyDiscount: "24%",
    monthlyRate: 29999,
    originalMonthlyRate: 49500,
    monthlyDiscount: "39%",
    specs: {
      engine: "5.2L Naturally Aspirated V10",
      power: "640 PS / 470 kW",
      speed: "325 km/h",
      accel: "0-100 km/h in 3.1s",
      gear: "7-Speed LDF Dual-Clutch",
      weight: "1,422 kg",
    },
    features: [
      "Tiffany Blue Bespoke Livery",
      "LDVI Predictive Dynamics",
      "Dual Sport Exhaust System",
      "Bespoke Yellow Contrast Stitching",
    ],
    description:
      "Exclusive Tiffany Blue custom livery with open-top driving thrill. Naturally aspirated 5.2L V10 revving to an exhilarating 8,500 RPM.",
  },
  {
    id: "lambo-huracan-sto-card",
    category: "Rent Modified",
    name: "Lamborghini Huracan STO",
    images: [lamboHuracanSto, lamboHuracanSto, lamboHuracanSto],
    dailyRate: 1799,
    originalDailyRate: 2400,
    dailyDiscount: "25%",
    monthlyRate: 34999,
    originalMonthlyRate: 55000,
    monthlyDiscount: "36%",
    specs: {
      engine: "5.2L V10 Squadra Corse",
      power: "640 PS / 470 kW",
      speed: "310 km/h",
      accel: "0-100 km/h in 3.0s",
      gear: "7-Speed Dual-Clutch",
      weight: "1,339 kg Dry Track",
    },
    features: [
      "Carbon Fiber 'Cofango' Aero",
      "Shark Fin & Adjustable Wing",
      "Brembo CCM-R Carbon Ceramic Brakes",
      "Lightweight Forged Magnesium Wheels",
    ],
    description:
      "Direct road-homologated Squadra Corse racecar. Extreme aerodynamic downforce, magnesium wheels, and pure motorsport DNA on Dubai roads.",
  },
  {
    id: "lambo-huracan-white-card",
    category: "Rent Sports",
    name: "Lamborghini Huracan Evo",
    images: [lamboHuracanWhite, lamboHuracanWhite, lamboHuracanWhite],
    dailyRate: 1399,
    originalDailyRate: 1850,
    dailyDiscount: "24%",
    monthlyRate: 27999,
    originalMonthlyRate: 44500,
    monthlyDiscount: "37%",
    specs: {
      engine: "5.2L V10 Naturally Aspirated",
      power: "640 PS / 470 kW",
      speed: "325 km/h",
      accel: "0-100 km/h in 2.9s",
      gear: "7-Speed LDF",
      weight: "1,422 kg",
    },
    features: [
      "Bianco Monocerus Pearl White",
      "All-Wheel Steering & Torque Vectoring",
      "Lamborghini Dynamic Steering (LDS)",
      "Red Performance Brake Calipers",
    ],
    description:
      "Pure Italian performance in pristine pearl white. Uncompromising handling with all-wheel drive and magnetic suspension.",
  },
  {
    id: "lambo-evo-coupe-card",
    category: "Rent Supercars",
    name: "Lamborghini Evo Coupe",
    images: [lamboEvoCoupe, lamboEvoCoupe, lamboEvoCoupe],
    dailyRate: 1450,
    originalDailyRate: 1900,
    dailyDiscount: "24%",
    monthlyRate: 28500,
    originalMonthlyRate: 46000,
    monthlyDiscount: "38%",
    specs: {
      engine: "5.2L High-Rev V10",
      power: "640 PS / 470 kW",
      speed: "325 km/h",
      accel: "0-100 km/h in 3.0s",
      gear: "7-Speed Dual-Clutch",
      weight: "1,422 kg",
    },
    features: [
      "Grigio Titans Stealth Metallic",
      "Bronze Forged Lightweight Alloys",
      "Carbon Ceramic Composite Brakes",
      "Alcantara Sport Seats & Cockpit",
    ],
    description:
      "Stealth Grigio finish accented by forged gold alloy wheels. Blistering acceleration and breathtaking visual appeal.",
  },
  {
    id: "porsche-gt3-clubsport",
    category: "Rent Sports",
    name: "Porsche 911 GT3 RS Clubsport",
    images: [porscheGt3Rs, porscheRed, porscheGt3Rs],
    dailyRate: 1499,
    originalDailyRate: 1980,
    dailyDiscount: "24%",
    monthlyRate: 29999,
    originalMonthlyRate: 49500,
    monthlyDiscount: "39%",
    specs: {
      engine: "4.0L Naturally Aspirated Flat-6",
      power: "525 PS / 386 kW",
      speed: "296 km/h (184 mph)",
      accel: "0-100 km/h in 3.2s",
      gear: "7-Speed PDK Dual-Clutch",
      weight: "1,450 kg (DIN)",
    },
    features: [
      "Clubsport Roll-Cage & Harness",
      "Active DRS Rear Wing Aero",
      "Carbon Ceramic Composite Brakes (PCCB)",
      "Motorsport Lightweight Forged Wheels",
    ],
    description:
      "Motorsport aerodynamic downforce combined with a 9,000 RPM naturally aspirated engine. Tuned for peak racetrack connection and open Dubai highway cruising.",
  },
];

const flashSaleItems: FlashSaleItem[] = [
  {
    id: "flash-lambo-tiffany",
    badge: "24% OFF FLASH DEAL",
    name: "Lamborghini Huracan EVO Tiffany",
    category: "Supercar / Exotic",
    image: lamboHuracanTiffany,
    dailyRate: 1499,
    originalDailyRate: 1980,
    discount: "24% OFF",
    monthlyRate: 29999,
    timerString: "02:10:40",
    specs: { power: "640 PS", speed: "325 km/h", accel: "3.1s" },
    carRef: fleet[0],
  },
  {
    id: "flash-mercedes-g63",
    badge: "24% OFF EXCLUSIVE",
    name: "Mercedes-AMG G63 Maybach",
    category: "Luxury SUV",
    image: mercedesG63Maybach,
    dailyRate: 1499,
    originalDailyRate: 1980,
    discount: "24% OFF",
    monthlyRate: 29999,
    timerString: "04:45:15",
    specs: { power: "585 PS", speed: "240 km/h", accel: "4.5s" },
    carRef: fleet[1],
  },
  {
    id: "flash-lambo-sto",
    badge: "25% OFF SPECIAL",
    name: "Lamborghini Huracan STO",
    category: "Track Supercar",
    image: lamboHuracanSto,
    dailyRate: 1799,
    originalDailyRate: 2400,
    discount: "25% OFF",
    monthlyRate: 34999,
    timerString: "01:25:00",
    specs: { power: "640 PS", speed: "310 km/h", accel: "3.0s" },
    carRef: fleet[2],
  },
  {
    id: "flash-lambo-white",
    badge: "24% OFF EXOTIC",
    name: "Lamborghini Huracan Evo",
    category: "Supercar",
    image: lamboHuracanWhite,
    dailyRate: 1399,
    originalDailyRate: 1850,
    discount: "24% OFF",
    monthlyRate: 27999,
    timerString: "03:12:30",
    specs: { power: "640 PS", speed: "325 km/h", accel: "2.9s" },
    carRef: fleet[3],
  },
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

export interface RentalLocation {
  id: string;
  name: string;
  subtitle: string;
  carsAvailable: number;
  deliveryTime: string;
  x: number; // percentage X on map
  y: number; // percentage Y on map
}

const dubaiLocations: RentalLocation[] = [
  { id: "al-barsha", name: "Al Barsha", subtitle: "Hub near Mall of the Emirates", carsAvailable: 48, deliveryTime: "15 mins", x: 50, y: 22 },
  { id: "dubai-mall", name: "Dubai Mall", subtitle: "Downtown & Burj Khalifa Strip", carsAvailable: 65, deliveryTime: "10 mins", x: 62, y: 15 },
  { id: "mall-of-emirates", name: "Mall of Emirates", subtitle: "Al Barsha 1 VIP Drop-off", carsAvailable: 42, deliveryTime: "15 mins", x: 72, y: 28 },
  { id: "business-bay", name: "Business Bay", subtitle: "Financial & Corporate Towers", carsAvailable: 55, deliveryTime: "12 mins", x: 84, y: 24 },
  { id: "dubai-marina", name: "Dubai Marina", subtitle: "Marina Walk & JBR Waterfront", carsAvailable: 58, deliveryTime: "15 mins", x: 58, y: 39 },
  { id: "international-city", name: "International City", subtitle: "Warsan & Dragon Mart Zone", carsAvailable: 32, deliveryTime: "25 mins", x: 67, y: 48 },
  { id: "sheikh-zayed-road", name: "Shaikh Zayed Road", subtitle: "Main Luxury Highway Strip", carsAvailable: 70, deliveryTime: "10 mins", x: 81, y: 44 },
  { id: "palm-jumeirah", name: "Palm Jumeriah", subtitle: "Atlantis & Luxury Coastal Villas", carsAvailable: 50, deliveryTime: "20 mins", x: 54, y: 58 },
  { id: "dubai-airport", name: "Dubai Airport", subtitle: "Terminal 1, 2, 3 VIP Handover", carsAvailable: 80, deliveryTime: "Instant VIP", x: 72, y: 64 },
  { id: "jumeirah-lake-towers", name: "Jumeirah Lake Towers", subtitle: "JLT Cluster Delivery Hub", carsAvailable: 38, deliveryTime: "15 mins", x: 81, y: 58 },
  { id: "al-quoz", name: "Al Quoz", subtitle: "Creative Arts & Performance Hub", carsAvailable: 40, deliveryTime: "15 mins", x: 60, y: 69 },
  { id: "deira", name: "Deira Dubai", subtitle: "Old Dubai & Gold Souk Waterfront", carsAvailable: 36, deliveryTime: "20 mins", x: 87, y: 74 },
];

function CarShowcasePage() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("AED");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isLocationsDropdownOpen, setIsLocationsDropdownOpen] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState<string>("dubai-mall");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const currentCurrencyConfig =
    currencies.find((c) => c.code === selectedCurrency) || currencies[0];

  const formatPrice = (usdAmount: number): string => {
    const converted = Math.round(usdAmount * currentCurrencyConfig.rate);
    return `${currentCurrencyConfig.symbol}${converted.toLocaleString()}`;
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bookingCar, setBookingCar] = useState<CarItem | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Dedicated Car Details Page / Modal state (opened via yellow arrow button)
  const [selectedCarDetails, setSelectedCarDetails] = useState<PorscheProductCard | null>(null);

  // Product cards 3-image carousel state
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});
  const cardTouchStartRef = useRef<{ id: string; x: number } | null>(null);

  // Dragging / swiping state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);

  // Live ticking countdown timer for flash sale
  const [flashSaleSeconds, setFlashSaleSeconds] = useState<Record<string, number>>({
    "flash-lambo-tiffany": 2 * 3600 + 10 * 60 + 40,
    "flash-mercedes-g63": 4 * 3600 + 45 * 60 + 15,
    "flash-lambo-sto": 1 * 3600 + 25 * 60 + 0,
    "flash-lambo-white": 3 * 3600 + 15 * 60 + 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSaleSeconds((prev) => {
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

  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const car = fleet[currentIndex];
  const exitingCar = exitingIndex !== null ? fleet[exitingIndex] : null;

  const autoPlayDuration = 5200; // 5.2 seconds per slide
  const progressIntervalMs = 50;

  const startTransition = useCallback(
    (nextIdx: number, dir: "next" | "prev") => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      setExitingIndex(currentIndex);
      setCurrentIndex(nextIdx);
      setTransitionDirection(dir);
      setAnimKey((k) => k + 1);
      setProgress(0);

      // Reset exiting car after 540ms animation finishes
      transitionTimerRef.current = setTimeout(() => {
        setExitingIndex(null);
      }, 540);
    },
    [currentIndex],
  );

  const goToNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % fleet.length;
    startTransition(nextIdx, "next");
  }, [currentIndex, startTransition]);

  const goToPrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + fleet.length) % fleet.length;
    startTransition(prevIdx, "prev");
  }, [currentIndex, startTransition]);

  const selectCar = (index: number) => {
    if (index === currentIndex) return;
    startTransition(index, index > currentIndex ? "next" : "prev");
  };

  // Product Card 3-image slider handlers
  const handleCardNextImage = (cardId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [cardId]: ((prev[cardId] || 0) + 1) % 3,
    }));
  };

  const handleCardPrevImage = (cardId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [cardId]: ((prev[cardId] || 0) - 1 + 3) % 3,
    }));
  };

  const handleCardTouchStart = (cardId: string, clientX: number) => {
    cardTouchStartRef.current = { id: cardId, x: clientX };
  };

  const handleCardTouchEnd = (cardId: string, clientX: number) => {
    if (!cardTouchStartRef.current || cardTouchStartRef.current.id !== cardId) return;
    const diff = clientX - cardTouchStartRef.current.x;
    if (diff < -30) {
      handleCardNextImage(cardId);
    } else if (diff > 30) {
      handleCardPrevImage(cardId);
    }
    cardTouchStartRef.current = null;
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || isDragging || exitingIndex !== null) return;

    const timer = setInterval(() => {
      setProgress((old) => {
        const next = old + (progressIntervalMs / autoPlayDuration) * 100;
        if (next >= 100) {
          goToNext();
          return 0;
        }
        return next;
      });
    }, progressIntervalMs);

    return () => clearInterval(timer);
  }, [isAutoPlay, isDragging, exitingIndex, goToNext]);

  // Touch and Mouse drag gesture listeners
  const handlePointerDown = (clientX: number) => {
    if (exitingIndex !== null) return;
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffsetX(0);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - dragStartX;
    // Elastic constraint during active user drag
    setDragOffsetX(diff * 0.85);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    const threshold = 55; // pixels to trigger slide change
    if (dragOffsetX < -threshold) {
      goToNext();
    } else if (dragOffsetX > threshold) {
      goToPrev();
    }
    setIsDragging(false);
    setDragOffsetX(0);
  };

  // Calculate dynamic opacity of name while user is dragging
  // As the user drags left or right, the name visibly fades out / disappears
  const dragRatio = Math.min(Math.abs(dragOffsetX) / 75, 1);
  const nameDragOpacity = isDragging ? Math.max(0, 1 - dragRatio * 1.5) : 1;
  const nameDragY = isDragging ? -dragRatio * 35 : 0;

  const handleBookProductCard = (card: PorscheProductCard) => {
    setBookingCar({
      id: card.id,
      make: "PORSCHE",
      model: card.name.replace("Porsche ", ""),
      badge: "GT3 RS",
      category: card.category,
      tagline: card.topBadge,
      description:
        "The Porsche 911 GT3 RS features motorsport aerodynamic downforce and a 9,000 RPM high-revving naturally aspirated engine.",
      cardShortDesc: "Clubsport roll-cage, carbon-ceramic brakes, and active DRS rear wing.",
      builtFor: "BORN FOR RACETRACK & OPEN ROAD.",
      themeColor: "#FFCC00",
      accentRgb: "255, 204, 0",
      image: porscheGt3Rs,
      alt: card.name,
      number: "04",
      dailyRate: card.dailyRate,
      originalDailyRate: card.originalDailyRate,
      weeklyRate: card.monthlyRate ? Math.round(card.monthlyRate / 4) : 4800,
      securityDeposit: 2000,
      minAge: 25,
      includedMileage: "150 mi / day included",
      practicalSpecs: {
        make: "Porsche",
        carType: card.category,
        doors: 2,
        passengers: 2,
        gear: "Auto (7-Speed PDK)",
        luggages: 2,
      },
      specs: {
        engine: { label: "ENGINE", value: "4.0L FLAT-6", subvalue: "NATURALLY ASPIRATED" },
        power: { label: "POWER", value: "525 PS", subvalue: "386 kW" },
        torque: { label: "TORQUE", value: "465 Nm", subvalue: "343 lb-ft" },
        weight: { label: "WEIGHT", value: "1,450 kg", subvalue: "DIN WEIGHT" },
        topSpeed: { label: "TOP SPEED", value: "296 km/h", subvalue: "184 mph" },
        acceleration: { label: "0-100 KM/H", value: "3.2 s", subvalue: "0-60 in 3.0s" },
      },
    });
  };

  return (
    <main className="w-full bg-white select-none relative overflow-x-hidden">
      {/* 
        Hero Showcase Section:
        - Full viewport studio with dynamic car-matched diagonal patti
        - Centered car with brand name partially behind
        - Swipe / Drag gesture interactive studio
      */}
      <section
        className="car-showroom-fullscreen min-h-screen w-full flex flex-col justify-between select-none relative overflow-hidden"
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
      >
        {/* 
        Dynamic car-matched background patti (diagonal stripe) 
        Responsive on small screen: starts from right side, connects to left corner, does not touch bottom!
      */}
        <div
          className="diagonal-patti opacity-90"
          style={{
            backgroundColor: car.themeColor,
            filter: "drop-shadow(0 20px 45px rgba(0,0,0,0.06))",
          }}
          aria-hidden="true"
        />

        {/* 
        Navbar: Fully transparent (no background color, no glass blur, completely transparent)
        Buttons: Home, All brands, Flash Sale, Categories, Locations, Blogs, Contact US
        Currency Dropdown: AED, USD, EUR (updates all prices across the site)
      */}
        <header className="relative z-30 w-full px-4 sm:px-8 lg:px-12 py-4 sm:py-5 flex items-center justify-between bg-transparent border-none shadow-none backdrop-blur-none">
          {/* Brand Logo & Name: LUXORA DRIVE */}
          <a href="#home" className="flex items-center gap-2.5 cursor-pointer group shrink-0">
            <span
              className="w-9 h-9 rounded-lg grid place-items-center font-black text-white text-base shadow-sm transition-colors duration-500"
              style={{ backgroundColor: car.themeColor }}
            >
              L
            </span>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl tracking-wider text-neutral-900 leading-none">
                LUXORA <span style={{ color: car.themeColor }}>DRIVE</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.24em] text-neutral-500 uppercase mt-0.5">
                EXOTIC & SUPERCAR FLEET
              </span>
            </div>
          </a>

          {/* Full Desktop Navigation: ALL CAPITAL, NOT BOLD, NO ICONS */}
          <nav className="hidden xl:flex items-center gap-6 lg:gap-7 text-xs font-normal tracking-wider text-neutral-700">
            <a href="#home" className="uppercase font-normal hover:text-neutral-900 transition-colors cursor-pointer">
              HOME
            </a>
            <a href="#categories" className="uppercase font-normal hover:text-neutral-900 transition-colors cursor-pointer">
              ALL BRANDS
            </a>
            <a
              href="#flash-sale"
              className="uppercase font-normal text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
            >
              FLASH SALE
            </a>

            {/* Categories Dropdown in Two Vertical Columns */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
              onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoriesDropdownOpen((prev) => !prev)}
                className="uppercase font-normal hover:text-neutral-900 transition-colors cursor-pointer flex items-center gap-1 py-1"
              >
                <span>CATEGORIES</span>
                <ChevronDown
                  className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isCategoriesDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isCategoriesDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-[480px] sm:w-[540px] bg-white rounded-xl shadow-2xl border border-neutral-200/90 py-4 px-6 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                  onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-x-8">
                    {/* Column 1 */}
                    <div className="flex flex-col">
                      {categoryDropdownCol1.map((name, idx) => (
                        <a
                          key={name}
                          href="#categories"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className={`group flex items-center gap-2 py-2 text-neutral-900 hover:text-amber-600 transition-colors cursor-pointer ${
                            idx < categoryDropdownCol1.length - 1 ? "border-b border-neutral-900" : ""
                          }`}
                        >
                          <span className="font-black text-sm text-neutral-900 group-hover:text-amber-600 transition-colors select-none">
                            &gt;
                          </span>
                          <span className="font-bold text-xs sm:text-[13px] tracking-tight">
                            {name}
                          </span>
                        </a>
                      ))}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col">
                      {categoryDropdownCol2.map((name, idx) => (
                        <a
                          key={name}
                          href="#categories"
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className={`group flex items-center gap-2 py-2 text-neutral-900 hover:text-amber-600 transition-colors cursor-pointer ${
                            idx < categoryDropdownCol2.length - 1 ? "border-b border-neutral-900" : ""
                          }`}
                        >
                          <span className="font-black text-sm text-neutral-900 group-hover:text-amber-600 transition-colors select-none">
                            &gt;
                          </span>
                          <span className="font-bold text-xs sm:text-[13px] tracking-tight">
                            {name}
                          </span>
                        </a>
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
                className="uppercase font-normal hover:text-neutral-900 transition-colors cursor-pointer flex items-center gap-1 py-1"
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
                  className="absolute left-0 top-full mt-2 w-[440px] sm:w-[480px] bg-white rounded-xl shadow-2xl border border-neutral-200/90 py-4 px-6 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={() => setIsLocationsDropdownOpen(true)}
                  onMouseLeave={() => setIsLocationsDropdownOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-x-8">
                    {/* Column 1 */}
                    <div className="flex flex-col">
                      {dubaiLocations.slice(0, 6).map((loc, idx) => (
                        <a
                          key={loc.id}
                          href="#locations"
                          onClick={() => {
                            setActiveLocationId(loc.id);
                            setIsLocationsDropdownOpen(false);
                          }}
                          className={`group flex items-center gap-2 py-2 text-neutral-900 hover:text-amber-600 transition-colors cursor-pointer ${
                            idx < 5 ? "border-b border-neutral-900" : ""
                          }`}
                        >
                          <span className="font-black text-sm text-neutral-900 group-hover:text-amber-600 transition-colors select-none">
                            &gt;
                          </span>
                          <span className="font-bold text-xs sm:text-[13px] tracking-tight">
                            {loc.name}
                          </span>
                        </a>
                      ))}
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col">
                      {dubaiLocations.slice(6, 12).map((loc, idx) => (
                        <a
                          key={loc.id}
                          href="#locations"
                          onClick={() => {
                            setActiveLocationId(loc.id);
                            setIsLocationsDropdownOpen(false);
                          }}
                          className={`group flex items-center gap-2 py-2 text-neutral-900 hover:text-amber-600 transition-colors cursor-pointer ${
                            idx < 5 ? "border-b border-neutral-900" : ""
                          }`}
                        >
                          <span className="font-black text-sm text-neutral-900 group-hover:text-amber-600 transition-colors select-none">
                            &gt;
                          </span>
                          <span className="font-bold text-xs sm:text-[13px] tracking-tight">
                            {loc.name}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <a href="#blogs" className="uppercase font-normal hover:text-neutral-900 transition-colors cursor-pointer">
              BLOGS
            </a>
            <a
              href="tel:+0008088888"
              className="uppercase font-normal text-neutral-900 hover:opacity-80 transition-colors cursor-pointer"
            >
              CONTACT US
            </a>
          </nav>

          {/* Right Action: Currency Dropdown + Contact Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Currency Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCurrencyDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1.5 bg-white/90 hover:bg-white text-neutral-900 text-xs font-normal uppercase px-3 py-1.5 rounded-xl border border-neutral-300/80 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
              >
                <span>{currentCurrencyConfig.flag}</span>
                <span>{currentCurrencyConfig.code}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${isCurrencyDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isCurrencyDropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-normal text-neutral-400 uppercase tracking-wider border-b border-neutral-100">
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
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-normal text-left hover:bg-neutral-50 cursor-pointer transition-colors uppercase ${selectedCurrency === curr.code
                          ? "text-neutral-950 font-medium bg-neutral-100/70"
                          : "text-neutral-700"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{curr.flag}</span>
                        <span>{curr.label}</span>
                      </span>
                      {selectedCurrency === curr.code && (
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rent Now CTA (Desktop) */}
            <Button
              size="sm"
              onClick={() => setBookingCar(car)}
              className="hidden sm:inline-flex text-xs font-normal uppercase tracking-wider text-white shadow hover:opacity-90 transition-opacity cursor-pointer px-4 rounded-xl"
              style={{ backgroundColor: car.themeColor }}
            >
              RENT NOW
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="xl:hidden w-9 h-9 rounded-xl bg-white/90 hover:bg-white text-neutral-800 border border-neutral-200/80 shadow-xs flex items-center justify-center cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown / Drawer */}
          {isMobileMenuOpen && (
            <div className="xl:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-neutral-200 shadow-2xl px-6 py-6 z-50 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
              <nav className="flex flex-col gap-3.5 text-sm font-normal uppercase tracking-wider text-neutral-800">
                <a
                  href="#home"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors py-1 border-b border-neutral-100"
                >
                  HOME
                </a>
                <a
                  href="#categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors py-1 border-b border-neutral-100"
                >
                  ALL BRANDS
                </a>
                <a
                  href="#flash-sale"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-amber-600 hover:text-amber-700 py-1 border-b border-neutral-100"
                >
                  FLASH SALE
                </a>
                <a
                  href="#categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors py-1 border-b border-neutral-100"
                >
                  CATEGORIES
                </a>
                <div className="py-2 grid grid-cols-2 gap-x-3 border-b border-neutral-100">
                  <div className="flex flex-col">
                    {categoryDropdownCol1.map((item, idx) => (
                      <a
                        key={item}
                        href="#categories"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-1.5 py-1.5 text-[11px] font-bold text-neutral-900 hover:text-amber-600 transition-colors ${
                          idx < categoryDropdownCol1.length - 1 ? "border-b border-neutral-900" : ""
                        }`}
                      >
                        <span className="font-black text-xs text-neutral-900">&gt;</span>
                        <span className="truncate">{item}</span>
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {categoryDropdownCol2.map((item, idx) => (
                      <a
                        key={item}
                        href="#categories"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-1.5 py-1.5 text-[11px] font-bold text-neutral-900 hover:text-amber-600 transition-colors ${
                          idx < categoryDropdownCol2.length - 1 ? "border-b border-neutral-900" : ""
                        }`}
                      >
                        <span className="font-black text-xs text-neutral-900">&gt;</span>
                        <span className="truncate">{item}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href="#locations"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors py-1 border-b border-neutral-100 uppercase"
                >
                  LOCATIONS
                </a>
                <div className="py-2 grid grid-cols-2 gap-x-3 border-b border-neutral-100">
                  <div className="flex flex-col">
                    {dubaiLocations.slice(0, 6).map((loc, idx) => (
                      <a
                        key={loc.id}
                        href="#locations"
                        onClick={() => {
                          setActiveLocationId(loc.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-1.5 py-1.5 text-[11px] font-bold text-neutral-900 hover:text-amber-600 transition-colors ${
                          idx < 5 ? "border-b border-neutral-900" : ""
                        }`}
                      >
                        <span className="font-black text-xs text-neutral-900">&gt;</span>
                        <span className="truncate">{loc.name}</span>
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    {dubaiLocations.slice(6, 12).map((loc, idx) => (
                      <a
                        key={loc.id}
                        href="#locations"
                        onClick={() => {
                          setActiveLocationId(loc.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-1.5 py-1.5 text-[11px] font-bold text-neutral-900 hover:text-amber-600 transition-colors ${
                          idx < 5 ? "border-b border-neutral-900" : ""
                        }`}
                      >
                        <span className="font-black text-xs text-neutral-900">&gt;</span>
                        <span className="truncate">{loc.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <a
                  href="#blogs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-amber-600 transition-colors py-1 border-b border-neutral-100"
                >
                  BLOGS
                </a>
                <a
                  href="tel:+0008088888"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-neutral-900 py-1"
                >
                  CONTACT US: +00 080 888 88
                </a>
              </nav>

              {/* Mobile Currency Switcher */}
              <div className="mt-5 pt-4 border-t border-neutral-200">
                <span className="text-[11px] font-normal text-neutral-400 uppercase tracking-wider block mb-2">
                  SELECT CURRENCY
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      type="button"
                      onClick={() => {
                        setSelectedCurrency(curr.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-normal uppercase border transition-all ${selectedCurrency === curr.code
                          ? "bg-neutral-900 text-white border-neutral-900 shadow-sm"
                          : "bg-neutral-50 text-neutral-700 border-neutral-200"
                        }`}
                    >
                      <span>{curr.flag}</span>
                      <span>{curr.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main Feature Stage Area */}
        <div className="relative z-20 flex-1 flex flex-col justify-center items-center w-full px-4 sm:px-8 lg:px-12 py-1 lg:py-2 overflow-hidden">
          {/* 
          3-Column Dribbble Showcase Stage:
          - Left: Heading (1st and 2nd word), Model details, short description, Daily & weekly rates, RENT NOW button
          - Center: Centered car with idle floating animation, dynamic shadow, and bottom thumbnail carousel
          - Right: Vertical timeline with connected glowing dots showing vehicle SPECS
        */}
          <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center relative z-20 my-auto pt-4 sm:pt-6 lg:pt-10">
            {/* Left Column (Desktop): Badge, Heading, Short Description, Rating - Shifted Further Down for Large Screen */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-start text-left z-30 pr-4 select-none translate-y-20 xl:translate-y-28 2xl:translate-y-32">
              <div
                key={`left-cat-${car.id}-${animKey}`}
                className="animate-d-fade-up"
                style={{ animationDelay: "50ms" }}
              >
                <span
                  className="text-[11px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md"
                  style={{ backgroundColor: `${car.themeColor}20`, color: car.themeColor }}
                >
                  {car.category} • LUXURY FLEET
                </span>
              </div>

              <h1
                key={`left-title-${car.id}-${animKey}`}
                className="text-3xl xl:text-4xl font-black text-neutral-900 tracking-tight uppercase leading-tight mt-3 animate-d-fade-up"
                style={{ animationDelay: "120ms" }}
              >
                {getCarTitleBreakdown(car.make, car.model).firstTwo}{" "}
                <span style={{ color: car.themeColor }}>
                  {getCarTitleBreakdown(car.make, car.model).rest}
                </span>
              </h1>

              <p
                key={`left-desc-${car.id}-${animKey}`}
                className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed mt-2.5 max-w-xs animate-d-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                {car.description}
              </p>

              {/* Left Column Daily Pricing & Rent Button - Show only weekly and per day, no % OFF */}
              <div
                key={`left-cta-${car.id}-${animKey}`}
                className="mt-6 flex flex-col items-start gap-2.5 animate-d-fade-up"
                style={{ animationDelay: "260ms" }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                      {formatPrice(car.dailyRate)}
                    </span>
                    <span className="text-xs text-neutral-500 font-semibold">/ day</span>
                  </div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: car.themeColor }}
                  >
                    Weekly: {formatPrice(car.weeklyRate)}{" "}
                    <span className="text-neutral-500 font-medium">/ week</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => setBookingCar(car)}
                  className="text-xs font-black text-white px-5 py-2.5 rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5 mt-1"
                  style={{ backgroundColor: car.themeColor }}
                >
                  <Key className="w-3.5 h-3.5" /> RENT NOW
                </Button>
              </div>
            </div>

            {/* Center Column: Increased Car Size on Large Screen, Shifted Down on Small Screen */}
            <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center relative z-20 my-auto pb-2 pt-10 sm:pt-12 lg:pt-0">
              <div className="relative w-full max-w-[660px] sm:max-w-[740px] lg:max-w-[960px] xl:max-w-[1080px] 2xl:max-w-[1180px] aspect-[2.15/1] flex items-center justify-center cursor-grab active:cursor-grabbing px-1 sm:px-3">
                {/* Desktop Giant Brand Typography: Exactly 80% on top of car, 20% behind car */}
                {exitingCar && (
                  <div
                    key={`brand-name-exit-desk-${exitingCar.id}-${animKey}`}
                    className="hidden lg:block giant-brand-typography animate-name-exit"
                    style={getHeroTypographyStyle(getCarHeroBackdropName(exitingCar.id, exitingCar.make, exitingCar.model), false)}
                  >
                    {getCarHeroBackdropName(exitingCar.id, exitingCar.make, exitingCar.model)}
                  </div>
                )}
                <div
                  key={`brand-name-active-desk-${car.id}-${animKey}`}
                  className="hidden lg:block giant-brand-typography animate-name-top"
                  style={{
                    ...getHeroTypographyStyle(getCarHeroBackdropName(car.id, car.make, car.model), false),
                    opacity: nameDragOpacity,
                    transform: `translate(calc(-50% + ${dragOffsetX * 0.2}px), ${nameDragY}px)`,
                    transition: isDragging ? "none" : "opacity 200ms ease, transform 200ms ease",
                  }}
                >
                  {getCarHeroBackdropName(car.id, car.make, car.model)}
                </div>

                {/* Mobile Giant Brand Typography: Exactly 80% on top of car, 20% behind car */}
                {exitingCar && (
                  <div
                    key={`brand-name-exit-mob-${exitingCar.id}-${animKey}`}
                    className="lg:hidden giant-brand-typography-mobile animate-name-exit"
                    style={getHeroTypographyStyle(getCarHeroBackdropName(exitingCar.id, exitingCar.make, exitingCar.model), true)}
                  >
                    {getCarHeroBackdropName(exitingCar.id, exitingCar.make, exitingCar.model)}
                  </div>
                )}
                <div
                  key={`brand-name-active-mob-${car.id}-${animKey}`}
                  className="lg:hidden giant-brand-typography-mobile animate-name-top"
                  style={{
                    ...getHeroTypographyStyle(getCarHeroBackdropName(car.id, car.make, car.model), true),
                    opacity: nameDragOpacity,
                    transform: `translate(calc(-50% + ${dragOffsetX * 0.2}px), ${nameDragY}px)`,
                    transition: isDragging ? "none" : "opacity 200ms ease, transform 200ms ease",
                  }}
                >
                  {getCarHeroBackdropName(car.id, car.make, car.model)}
                </div>

                {/* Ground Contact Shadow with Synchronous Breathing Animation */}
                <div
                  className={`car-contact-shadow ${exitingCar ? "" : "animate-shadow-breathe"}`}
                />

                {/* Exiting Car (smooth slide & scale-down exit) - STRICT z-20 so it is ALWAYS in front of typography (z-10) */}
                {exitingCar && (
                  <div
                    key={`car-exiting-${exitingCar.id}`}
                    className={`absolute inset-0 z-20 flex items-center justify-center ${
                      transitionDirection === "next"
                        ? "animate-car-exit-left"
                        : "animate-car-exit-right"
                    }`}
                  >
                    <img
                      src={exitingCar.image}
                      alt={exitingCar.alt}
                      draggable={false}
                      className="w-full h-full object-contain p-2 relative z-20 drop-shadow-[0_20px_24px_rgba(0,0,0,0.22)] select-none pointer-events-none"
                    />
                  </div>
                )}

                {/* Entering / Active Car (slide-in with spring scale & idle floating breathing) - STRICT z-30 so it is ALWAYS in front of typography (z-10) */}
                <div
                  key={`car-active-${car.id}-${animKey}`}
                  className={`relative z-30 w-full h-full flex items-center justify-center ${
                    exitingCar
                      ? transitionDirection === "next"
                      ? "animate-car-enter-right"
                      : "animate-car-enter-left"
                      : isDragging
                        ? ""
                        : "animate-car-breathe"
                  }`}
                  style={{
                    transform: isDragging ? `translateX(${dragOffsetX}px)` : undefined,
                    transition: isDragging ? "none" : "transform 300ms ease-out",
                  }}
                >
                  <img
                    src={car.image}
                    alt={car.alt}
                    draggable={false}
                    className="w-full h-full object-contain p-2 relative z-20 drop-shadow-[0_22px_26px_rgba(0,0,0,0.24)] select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* 
                Under Center Car:
                - On Small Screens (lg:hidden): Price section + RENT NOW button without background, show ONLY weekly and per day (no % OFF)
                - On Large Screens (hidden lg:flex): 4 cars thumbnail carousel shifted lower down
              */}

              {/* Small Screen: Price & RENT NOW button without background, show only weekly and per day */}
              <div className="flex lg:hidden flex-col items-center justify-center gap-2 mt-6 sm:mt-8 z-30 w-full px-2">
                <div className="flex items-center gap-4 bg-transparent border-none shadow-none backdrop-blur-none px-2 py-1">
                  <div className="flex flex-col items-start">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-none">
                        {formatPrice(car.dailyRate)}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-500">/ day</span>
                    </div>
                    <div
                      className="text-[11px] font-bold mt-0.5"
                      style={{ color: car.themeColor }}
                    >
                      Weekly: {formatPrice(car.weeklyRate)}{" "}
                      <span className="text-neutral-500 font-medium">/ week</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => setBookingCar(car)}
                    className="text-xs font-black text-white px-4 py-2 rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5 shrink-0"
                    style={{ backgroundColor: car.themeColor }}
                  >
                    RENT NOW
                  </Button>
                </div>

                {/* 6 Hero Service Features for small screen: 2 items per row, NO icons */}
                <div className="w-full max-w-[340px] mx-auto pt-2.5 pb-0.5">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-center">
                    <span className="text-[11px] font-bold text-neutral-800 tracking-tight">
                      Insurance included
                    </span>
                    <span className="text-[11px] font-bold text-neutral-800 tracking-tight">
                      No deposit
                    </span>
                    <span className="text-[11px] font-bold text-neutral-800 tracking-tight">
                      Own fleet
                    </span>
                    <span className="text-[11px] font-bold text-neutral-800 tracking-tight">
                      Working 24/7
                    </span>
                    <span className="text-[11px] font-bold text-neutral-800 tracking-tight">
                      Delivery &amp; pick-up
                    </span>
                    <span className="text-[11px] font-bold text-neutral-800 tracking-tight">
                      Late return
                    </span>
                  </div>
                </div>
              </div>

              {/* Large Screen: Dribbble Style Bottom 4-Car Thumbnail Carousel - Shifted lower down */}
              <div className="hidden lg:flex items-center justify-center gap-2 sm:gap-3 mt-8 lg:mt-12 z-30 translate-y-3 lg:translate-y-5">
                <button
                  type="button"
                  onClick={goToPrev}
                  aria-label="Previous Car"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-xs border border-neutral-200/80 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {fleet.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectCar(idx)}
                      className={`px-2 py-1 rounded-lg border transition-all duration-300 flex items-center justify-center bg-white/80 cursor-pointer ${
                        idx === currentIndex
                          ? "border-2 shadow-sm scale-105"
                          : "border-neutral-200/80 hover:border-neutral-400 opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        borderColor: idx === currentIndex ? car.themeColor : undefined,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.model}
                        className="h-5 sm:h-7 w-auto object-contain pointer-events-none"
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next Car"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-xs border border-neutral-200/80 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column (Desktop): Vertical Connected Timeline with Glowing Dots for SPECS - Shifted Further Right */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-end text-left z-30 lg:pl-10 xl:pl-16 pr-1 xl:pr-4 select-none ml-auto">
              <div key={`right-specs-${car.id}-${animKey}`} className="flex flex-col items-start w-full max-w-[230px]">
                <div className="mb-4 animate-d-fade-up" style={{ animationDelay: "50ms" }}>
                  <span className="text-[11px] font-black tracking-widest uppercase text-neutral-400 block">
                    PERFORMANCE
                  </span>
                  <span
                    className="text-lg font-black tracking-tight uppercase"
                    style={{ color: car.themeColor }}
                  >
                    SPECS
                  </span>
                </div>

                {/* Connected Vertical Timeline Line and Dots */}
                <div className="relative pl-6 space-y-3.5 w-full">
                  {/* Vertical connecting timeline line */}
                  <div
                    className="absolute left-2.5 top-2 bottom-2 w-0.5 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: `${car.themeColor}40` }}
                  />

                  {/* Spec 1: Engine */}
                  <div
                    className="relative flex items-start gap-3 animate-d-fade-up"
                    style={{ animationDelay: "100ms" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-xs transition-colors duration-500"
                      style={{ backgroundColor: car.themeColor }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase text-neutral-400 block">
                        {car.specs.engine.label}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-neutral-900 leading-tight block">
                        {car.specs.engine.value}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-500 block">
                        {car.specs.engine.subvalue}
                      </span>
                    </div>
                  </div>

                  {/* Spec 2: Power */}
                  <div
                    className="relative flex items-start gap-3 animate-d-fade-up"
                    style={{ animationDelay: "160ms" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-xs transition-colors duration-500"
                      style={{ backgroundColor: car.themeColor }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase text-neutral-400 block">
                        {car.specs.power.label}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-neutral-900 leading-tight block">
                        {car.specs.power.value}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-500 block">
                        {car.specs.power.subvalue}
                      </span>
                    </div>
                  </div>

                  {/* Spec 3: Torque */}
                  <div
                    className="relative flex items-start gap-3 animate-d-fade-up"
                    style={{ animationDelay: "220ms" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-xs transition-colors duration-500"
                      style={{ backgroundColor: car.themeColor }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase text-neutral-400 block">
                        {car.specs.torque.label}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-neutral-900 leading-tight block">
                        {car.specs.torque.value}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-500 block">
                        {car.specs.torque.subvalue}
                      </span>
                    </div>
                  </div>

                  {/* Spec 4: Top Speed */}
                  <div
                    className="relative flex items-start gap-3 animate-d-fade-up"
                    style={{ animationDelay: "280ms" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-xs transition-colors duration-500"
                      style={{ backgroundColor: car.themeColor }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase text-neutral-400 block">
                        {car.specs.topSpeed.label}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-neutral-900 leading-tight block">
                        {car.specs.topSpeed.value}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-500 block">
                        {car.specs.topSpeed.subvalue}
                      </span>
                    </div>
                  </div>

                  {/* Spec 5: Acceleration */}
                  <div
                    className="relative flex items-start gap-3 animate-d-fade-up"
                    style={{ animationDelay: "340ms" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-xs transition-colors duration-500"
                      style={{ backgroundColor: car.themeColor }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase text-neutral-400 block">
                        {car.specs.acceleration.label}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-neutral-900 leading-tight block">
                        {car.specs.acceleration.value}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-500 block">
                        {car.specs.acceleration.subvalue}
                      </span>
                    </div>
                  </div>

                  {/* Spec 6: Weight */}
                  <div
                    className="relative flex items-start gap-3 animate-d-fade-up"
                    style={{ animationDelay: "400ms" }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-xs transition-colors duration-500"
                      style={{ backgroundColor: car.themeColor }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase text-neutral-400 block">
                        {car.specs.weight.label}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-neutral-900 leading-tight block">
                        {car.specs.weight.value}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-500 block">
                        {car.specs.weight.subvalue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Arrow Navigation (Desktop edge arrows) */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous Car"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md border border-neutral-200 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next Car"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow-md border border-neutral-200 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        {/* 
          Hero Section Integrated Controls & Pricing:
          - Specifications text section is removed as requested.
          - Per-day price with discount badge, weekly price, and RENT NOW button placed right here in the hero section!
        */}
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 pb-3 pt-1 relative z-30 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3 mt-auto">
          {/* Left Side: Slide Dots & Index Counter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {fleet.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectCar(idx)}
                  aria-label={`Go to ${item.make} ${item.model}`}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: idx === currentIndex ? car.themeColor : "#D1D5DB",
                    transform: idx === currentIndex ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <div className="text-xs font-mono font-bold text-neutral-800 flex items-center gap-2">
              <div>
                <span style={{ color: car.themeColor }}>{car.number}</span>
                <span className="text-neutral-400 mx-1">/</span>
                <span>{String(fleet.length).padStart(2, "0")}</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-sans tracking-wide hidden md:inline">
                • Swipe or click arrows to explore fleet
              </span>
            </div>
          </div>

          {/* Small Screen Bottom: 4-Car Preview Thumbnail Carousel (swapped to bottom for small screens only, shifted lower) */}
          <div className="flex lg:hidden items-center justify-center gap-1.5 sm:gap-2 z-30 w-full sm:w-auto pt-3 pb-2 mt-1">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous Car"
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-xs border border-neutral-200/80 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5">
              {fleet.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectCar(idx)}
                  className={`px-2 py-1 rounded-lg border transition-all duration-300 flex items-center justify-center bg-white/90 cursor-pointer ${
                    idx === currentIndex
                      ? "border-2 shadow-sm scale-105"
                      : "border-neutral-200/80 hover:border-neutral-400 opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: idx === currentIndex ? car.themeColor : undefined,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.model}
                    className="h-5 sm:h-6 w-auto object-contain pointer-events-none"
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next Car"
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-xs border border-neutral-200/80 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Auto Slide Progress Line */}
        {isAutoPlay && (
          <div className="w-full bg-neutral-200/60 h-0.5 overflow-hidden rounded-full mt-1">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: `${progress}%`,
                backgroundColor: car.themeColor,
              }}
            />
          </div>
        )}
      </section>

      {/* 
        Categories Section (Image 1):
        - Section Title: Luxora Drive Rental Dubai (Centered, right side content removed)
        - Border line & background white section removed: shows only car, yellow line, Rent title, and car count
        - On hover: car moves a little bit to the left side (group-hover:-translate-x-3)
        - Shows only 6 categories initially with "View More" toggle button below
      */}
      <section
        id="categories"
        className="w-full bg-[#F5F6F8] border-t border-neutral-200/80 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 relative z-20"
      >
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Centered Main Header, right side content removed */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-600 block mb-1">
              PRESTIGE DUBAI FLEET
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight uppercase">
              Luxora Drive Rental Dubai
            </h2>
          </div>

          {/* Categories Grid (Only Car, Yellow Line Accent, Rent Title, and Count - No white card box / No border line) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {rentalCategories.slice(0, showAllCategories ? rentalCategories.length : 6).map((cat) => (
              <a
                key={cat.id}
                href="#flash-sale"
                className="bg-transparent border-0 shadow-none p-2 sm:p-3 text-center group relative flex flex-col items-center justify-between min-h-[140px] sm:min-h-[160px] cursor-pointer"
              >
                {/* Yellow Diagonal Patti Accent behind the car */}
                <div className="absolute top-1 sm:top-2 right-2 sm:right-5 w-14 sm:w-16 h-8 sm:h-9 bg-[#FFE600] -skew-x-12 rounded-xs opacity-90 transition-transform group-hover:scale-110 pointer-events-none" />

                {/* Flash Sale Red Badge */}
                {cat.isFlash && (
                  <span className="absolute -top-1 right-1 bg-[#FF0033] text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm rotate-6 z-20">
                    FLASH SALE
                  </span>
                )}

                {/* Car Image - Porsche image on every category; shifts slightly to left on hover */}
                <div className="relative z-10 w-full h-16 sm:h-20 flex items-center justify-center my-1">
                  <img
                    src={porscheGt3Rs}
                    alt={cat.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.20)] transition-transform duration-300 group-hover:-translate-x-3 select-none pointer-events-none"
                  />
                </div>

                {/* Category Typography: Rent Title & Number of cars */}
                <div className="relative z-10 w-full mt-2 text-center">
                  <h3 className="text-xs sm:text-[13px] font-black uppercase text-neutral-900 tracking-tight leading-tight group-hover:text-amber-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-semibold mt-0.5">{cat.count}</p>
                </div>
              </a>
            ))}
          </div>

          {/* View More Categories Toggle Button */}
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{showAllCategories ? "VIEW LESS CATEGORIES" : "VIEW MORE CATEGORIES"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${showAllCategories ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 
        Flash Sale Section:
        - Background: White (as requested: "make sure super car flash deal should be their backgeround should be white")
        - Heading: Centered, right-side content removed
        - Car Card Color: #B7B09E (as requested: "#B7B09E please use this color on the flash deal car card")
        - No unnecessary icons
      */}
      <section
        id="flash-sale"
        className="w-full bg-white border-t border-neutral-200/80 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 relative z-20"
      >
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Centered Header, right side content removed */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#D1121E] block mb-1">
              LIMITED TIME SUPERCAR SPECIALS • UP TO 56% OFF
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight uppercase">
              SUPERCAR FLASH SALE
            </h2>
          </div>

          {/* 4 Flash Sale Cards in #B7B09E - No border lines on card or buttons, no curved borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {flashSaleItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#B7B09E] rounded-none border-0 border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Countdown Timer Bar with Real-Time Live Clock */}
                <div className="w-full bg-[#18191B] px-3.5 py-1.5 flex items-center justify-between text-[#FFE600] text-xs font-bold uppercase tracking-wider rounded-none border-0 border-none">
                  <span>FLASH SALE</span>
                  <span className="font-mono tracking-widest text-[11px] font-bold text-white">
                    {formatFlashTimer(flashSaleSeconds[item.id] ?? 7200)}
                  </span>
                </div>

                {/* Car Preview Container with hover scale */}
                <div className="relative w-full h-44 sm:h-48 bg-[#A8A18E]/30 p-3 flex items-center justify-center overflow-hidden select-none rounded-none border-0 border-none">
                  {/* Discount Badge */}
                  <div className="absolute top-2.5 left-3 bg-[#D1121E] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-none border-0 border-none shadow-xs z-10">
                    {item.discount}
                  </div>

                  {/* Car Image: Scales slightly on hover */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    draggable={false}
                    className="max-h-32 object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-108 select-none pointer-events-none relative z-10"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-neutral-900 rounded-none border-0 border-none">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="text-base font-black text-neutral-950 leading-snug mt-0.5">
                      {item.name}
                    </h3>
                  </div>

                  {/* Price Row (Formatted with active currency) */}
                  <div className="space-y-1 pt-1">
                    {/* Daily Rate */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-neutral-950 leading-none">
                          {formatPrice(item.dailyRate)}
                        </span>
                        <span className="text-xs font-semibold text-neutral-700">/ Day</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-neutral-600 line-through">
                          {formatPrice(item.originalDailyRate)}
                        </span>
                        <span className="font-bold text-red-700">{item.discount}</span>
                      </div>
                    </div>

                    {/* Monthly Rate */}
                    <div className="flex items-baseline justify-between text-xs text-neutral-800 font-semibold">
                      <span>Monthly Deal</span>
                      <span className="text-neutral-950 font-black">{formatPrice(item.monthlyRate)}</span>
                    </div>
                  </div>

                  {/* Free Delivery & Insurance Included - No border line */}
                  <div className="flex items-center gap-3 text-[11px] font-bold text-neutral-800 pt-2 border-0 border-none">
                    <span className="flex items-center gap-1 text-emerald-800">
                      Free Delivery
                    </span>
                    <span className="flex items-center gap-1 text-emerald-800">
                      Insurance Included
                    </span>
                  </div>
                  {/* Action Buttons - No border line, no curved border */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    <a
                      href={`https://wa.me/?text=Hi%2C%20I%20am%20interested%20in%20the%20Flash%20Sale%20deal%20for%20${encodeURIComponent(item.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1 bg-[#128C7E] hover:bg-[#075E54] text-white py-2 px-1 rounded-none border-0 border-none text-[11px] font-bold transition-colors cursor-pointer text-center"
                    >
                      
                      WhatsApp
                    </a>
                    <a
                      href="tel:+0008088888"
                      className="flex items-center justify-center gap-1 bg-[#D32F2F] hover:bg-[#B71C1C] text-white py-2 px-1 rounded-none border-0 border-none text-[11px] font-bold transition-colors cursor-pointer text-center"
                    >
                      Call Us
                    </a>
                    <button
                      type="button"
                      onClick={() => setBookingCar(item.carRef)}
                      className="flex items-center justify-center gap-1 bg-neutral-950 hover:bg-neutral-800 text-white py-2 px-1 rounded-none border-0 border-none text-[11px] font-bold transition-colors cursor-pointer text-center"
                    >
                      Claim Deal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 
        Fleet / Product Card Section (Image 2):
        - 4 Columns of luxury cards.
        - Uses Porsche image on every card.
        - Rates with daily and monthly discounts.
        - WhatsApp, Call Us, and Inquire Now buttons.
      */}
      <section
        id="fleet-deals"
        className="w-full bg-white border-t border-neutral-200/80 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 relative z-20">
        <div className="w-full max-w-[1720px] mx-auto">
          {/* Centered Main Header, right side content removed */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-600 block mb-1">
              FEATURED PROMOTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight uppercase">
              OUR BEST RENTED
            </h2>
          </div>

          {/* Product Cards Grid: Exactly matching user reference (media_1794989490058_abdd045b.png) with zero curved borders (rounded-none everywhere) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {porscheProductCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-none border border-neutral-300 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Car Preview Box with 3-Image Slider (Drag & Left/Right yellow arrow buttons) */}
                <div
                  className="relative w-full h-48 sm:h-52 bg-[#ECECEC] p-3 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none rounded-none"
                  onTouchStart={(e) => handleCardTouchStart(card.id, e.touches[0].clientX)}
                  onTouchEnd={(e) => handleCardTouchEnd(card.id, e.changedTouches[0].clientX)}
                  onMouseDown={(e) => handleCardTouchStart(card.id, e.clientX)}
                  onMouseUp={(e) => handleCardTouchEnd(card.id, e.clientX)}
                >
                  {/* Left & Right Yellow Chevrons */}
                  <button
                    type="button"
                    onClick={(e) => handleCardPrevImage(card.id, e)}
                    aria-label="Previous view"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#FFE600] hover:text-amber-500 font-black text-2xl leading-none transition-transform hover:scale-125 active:scale-95 cursor-pointer z-20 select-none drop-shadow-xs"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleCardNextImage(card.id, e)}
                    aria-label="Next view"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#FFE600] hover:text-amber-500 font-black text-2xl leading-none transition-transform hover:scale-125 active:scale-95 cursor-pointer z-20 select-none drop-shadow-xs"
                  >
                    &gt;
                  </button>

                  {/* Brand Logo in bottom-left */}
                  <div className="absolute left-3 bottom-2.5 z-10 pointer-events-none opacity-70">
                    <div className="w-6 h-6 rounded-full border border-neutral-400 flex items-center justify-center text-[11px] font-bold text-neutral-600">
                      {card.name.includes("Mercedes") ? "⨂" : "⚡"}
                    </div>
                  </div>

                  {/* Carousel 3 Pagination Dots: Active yellow bar, inactive round dots */}
                  <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10 pointer-events-none">
                    {[0, 1, 2].map((dotIdx) => {
                      const isCurrent = (cardImageIndices[card.id] || 0) === dotIdx;
                      return isCurrent ? (
                        <span
                          key={dotIdx}
                          className="w-5 h-2 rounded-none bg-[#FFE600]"
                        />
                      ) : (
                        <span
                          key={dotIdx}
                          className="w-2 h-2 rounded-full bg-neutral-400"
                        />
                      );
                    })}
                  </div>

                  {/* Yellow Circular Play Action Button -> Opens Detailed Car Page */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCarDetails(card);
                    }}
                    className="absolute right-3 bottom-2.5 w-7 h-7 rounded-full bg-[#FFE600] hover:bg-amber-400 text-neutral-950 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform z-20"
                    title="View Car Details & Full Specs"
                  >
                    <Play className="w-3.5 h-3.5 fill-neutral-950 text-neutral-950 ml-0.5" />
                  </div>

                  {/* Car Image with smooth hover scale */}
                  <img
                    src={card.images[cardImageIndices[card.id] || 0]}
                    alt={`${card.name} - View ${(cardImageIndices[card.id] || 0) + 1}`}
                    loading="lazy"
                    draggable={false}
                    className="max-h-36 sm:max-h-40 object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-108 select-none pointer-events-none relative z-10"
                    key={`${card.id}-${cardImageIndices[card.id] || 0}`}
                  />
                </div>

                {/* Card Body with sharp square styling (no curved borders anywhere) */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between rounded-none">
                  <div>
                    <span className="text-xs text-neutral-500 font-medium block">
                      {card.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-neutral-900 leading-tight mt-1">
                      {card.name}
                    </h3>
                  </div>

                  {/* Price Rows: Daily & Monthly Rates with strikethrough & discount */}
                  <div className="space-y-1.5 pt-1">
                    {/* Daily Rate */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-neutral-900 leading-none">
                          {formatPrice(card.dailyRate)}
                        </span>
                        <span className="text-xs text-neutral-500 font-normal">/ Day</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-neutral-400 line-through">
                          {formatPrice(card.originalDailyRate)}
                        </span>
                        <span className="font-bold text-emerald-600">{card.dailyDiscount}</span>
                      </div>
                    </div>

                    {/* Monthly Rate */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-neutral-900 leading-none">
                          {formatPrice(card.monthlyRate)}
                        </span>
                        <span className="text-xs text-neutral-500 font-normal">/ Monthly</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-neutral-400 line-through">
                          {formatPrice(card.originalMonthlyRate)}
                        </span>
                        <span className="font-bold text-emerald-600">{card.monthlyDiscount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Free Delivery & Insurance Included */}
                  <div className="flex items-center gap-4 text-xs font-bold text-neutral-800 pt-1">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" /> Free Delivery
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-600 text-white" /> Insurance Included
                    </span>
                  </div>

                  {/* 3 Action Buttons: WhatsApp, Call Us, Inquire Now (sharp corners) */}
                  <div className="grid grid-cols-3 gap-1.5 pt-2">
                    <a
                      href={`https://wa.me/?text=Hi%2C%20I%20am%20interested%20in%20renting%20the%20${encodeURIComponent(card.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1 bg-[#1E7E34] hover:bg-[#186429] text-white py-2 px-1 rounded-none text-xs font-bold transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" /> WhatsApp
                    </a>
                    <a
                      href="tel:+971542116317"
                      className="flex items-center justify-center gap-1 bg-[#B30006] hover:bg-[#8f0005] text-white py-2 px-1 rounded-none text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Us
                    </a>
                    <button
                      type="button"
                      onClick={() => handleBookProductCard(card)}
                      className="flex items-center justify-center gap-1 bg-black hover:bg-neutral-800 text-white py-2 px-1 rounded-none text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Inquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        Promotional Banners Section (Matching User Reference Image):
        - Both banners in a single row (`grid-cols-1 xl:grid-cols-2`).
        - Smooth dynamic red-and-white curve sweep.
        - Without any border styling.
        - Exact car-matched colors (Guards Red & Papaya Orange).
      */}
      <section
        id="promotions"
        className="w-full bg-[#F5F6F8] border-none py-10 sm:py-14 px-4 sm:px-8 lg:px-12 relative z-20"
      >
        <div className="w-full max-w-[1720px] mx-auto space-y-8">
          {/* Centered Main Header, right side content removed */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-600 block mb-1">
              EXCLUSIVE CAMPAIGNS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight uppercase">
              SPECIAL PROMOTIONAL OFFERS
            </h2>
          </div>

          {/* Two Promotional Banners in a Single Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Banner 1: Racing Red Porsche Edition */}
            <div className="relative w-full rounded-none overflow-hidden shadow-xl border-none min-h-[220px] sm:min-h-[240px] flex items-center bg-[#D1121E]">
              {/* Pencil Color Curved Background Shape (Graphite Lead Slate #232529 so white text shows properly) */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
              >
                {/* Secondary accent shadow contour */}
                <path d="M 0,0 L 42,0 Q 58,50 86,100 L 0,100 Z" fill="rgba(0,0,0,0.3)" />
                {/* Main Curve in Pencil Color (#232529) */}
                <path d="M 0,0 L 40,0 Q 55,50 82,100 L 0,100 Z" fill="#232529" />
              </svg>

              <div className="relative z-10 w-full h-full p-5 sm:p-7 flex flex-col justify-between">
                {/* Top Brand Logo with high-contrast white font on pencil color */}
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#D1121E] text-white font-black grid place-items-center text-[10px] shadow-xs">
                    L
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-black tracking-wider text-white leading-none block">
                      LUXORA <span className="text-[#FF5A5F]">DRIVE</span>
                    </span>
                    <span className="text-[8px] font-bold text-neutral-300 tracking-widest uppercase">
                      PREMIER FLEET
                    </span>
                  </div>
                </div>

                {/* Center Content Row: Left Car + Right Typography */}
                <div className="grid grid-cols-12 items-center gap-2 my-auto pt-1 pb-2">
                  {/* Car Image overlapping the curve */}
                  <div className="col-span-6 sm:col-span-5 flex items-center justify-center">
                    <img
                      src={porscheRed}
                      alt="Porsche 911 GT3 RS"
                      loading="lazy"
                      className="max-h-28 sm:max-h-36 w-auto object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.25)] select-none pointer-events-none hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Right Typography on Red Background with White Font */}
                  <div className="col-span-6 sm:col-span-7 pl-2 sm:pl-4 text-white">
                    <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tighter leading-[0.9] text-white">
                      NEED A CAR ??
                    </h3>
                    <p className="text-[10px] sm:text-xs text-red-100 font-medium mt-1.5 hidden sm:block">
                      Instant 24/7 delivery • 0% security deposit options • Comprehensive VIP
                      insurance.
                    </p>

                    {/* Contact & Phone */}
                    <div className="mt-2 sm:mt-3 pt-2 border-t border-red-300/30 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-red-200 block leading-tight">
                          Contact
                        </span>
                        <a
                          href="tel:+0008088888"
                          className="text-sm sm:text-lg font-black text-white hover:underline leading-tight block"
                        >
                          +00 080 888 88
                        </a>
                        <span className="text-[9px] text-red-200 block">www.luxoradrive.com</span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => setBookingCar(fleet[3])}
                        className="bg-white hover:bg-neutral-100 text-[#D1121E] font-black text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-none border-0 border-none shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95"
                      >
                        RENT NOW
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner 2: Papaya Orange McLaren Edition */}
            <div className="relative w-full rounded-none overflow-hidden shadow-xl border-none min-h-[220px] sm:min-h-[240px] flex items-center bg-[#FF5900]">
              {/* Pencil Color Curved Background Shape (Graphite Lead Slate #232529 so white text shows properly) */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
              >
                {/* Secondary accent shadow contour */}
                <path d="M 0,0 L 42,0 Q 58,50 86,100 L 0,100 Z" fill="rgba(0,0,0,0.3)" />
                {/* Main Curve in Pencil Color (#232529) */}
                <path d="M 0,0 L 40,0 Q 55,50 82,100 L 0,100 Z" fill="#232529" />
              </svg>

              <div className="relative z-10 w-full h-full p-5 sm:p-7 flex flex-col justify-between">
                {/* Top Brand Logo with high-contrast white font on pencil color */}
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#FF5900] text-white font-black grid place-items-center text-[10px] shadow-xs">
                    L
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-black tracking-wider text-white leading-none block">
                      LUXORA <span className="text-[#FF8A00]">DRIVE</span>
                    </span>
                    <span className="text-[8px] font-bold text-neutral-300 tracking-widest uppercase">
                      WEEKEND SPECIAL
                    </span>
                  </div>
                </div>

                {/* Center Content Row: Left Car + Right Typography */}
                <div className="grid grid-cols-12 items-center gap-2 my-auto pt-1 pb-2">
                  {/* Car Image overlapping the curve */}
                  <div className="col-span-6 sm:col-span-5 flex items-center justify-center">
                    <img
                      src={mclaren765lt}
                      alt="McLaren 765LT"
                      loading="lazy"
                      className="max-h-28 sm:max-h-36 w-auto object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.25)] select-none pointer-events-none hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Right Typography on Orange Background with White Font */}
                  <div className="col-span-6 sm:col-span-7 pl-2 sm:pl-4 text-white">
                    <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-black uppercase tracking-tighter leading-[0.9] text-white">
                      WEEKEND ESCAPE ??
                    </h3>
                    <p className="text-[10px] sm:text-xs text-orange-100 font-medium mt-1.5 hidden sm:block">
                      Rent 4 days and get 1 day completely free • Free hotel / private villa
                      handover.
                    </p>

                    {/* Contact & Phone */}
                    <div className="mt-2 sm:mt-3 pt-2 border-t border-orange-300/30 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-orange-200 block leading-tight">
                          Hotline
                        </span>
                        <a
                          href="tel:+0008088888"
                          className="text-sm sm:text-lg font-black text-white hover:underline leading-tight block"
                        >
                          +00 080 888 88
                        </a>
                        <span className="text-[9px] text-orange-200 block">
                          www.luxoradrive.com
                        </span>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => setBookingCar(fleet[0])}
                        className="bg-neutral-950 hover:bg-neutral-800 text-white font-black text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-none border-0 border-none shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95"
                      >
                        CLAIM 20% OFF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        Tailor Your Car Rental in Dubai Section (Image 2):
        - Dark luxury charcoal background with distressed torn/brush borders.
        - Two-tone custom yellow & black luxury SUV on the left.
        - Exact copy and bullet points with amber checkmarks on the right.
      */}
      <section
        id="tailor-dubai"
        className="w-full bg-[#18191B] text-white py-14 sm:py-20 px-4 sm:px-8 lg:px-12 relative overflow-hidden z-20"
      >
        {/* Subtle Dubai Skyline Silhouette Watermark */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 50%, rgba(255, 230, 0, 0.08) 0%, transparent 60%)",
          }}
        />

        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10">
          {/* Left Column: Yellow/Black Luxury Custom SUV (Increased image size) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[580px] lg:max-w-[650px] flex items-center justify-center group">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[#FFE600]/15 rounded-full blur-3xl group-hover:bg-[#FFE600]/20 transition-all" />
              <img
                src={dubaiSuv}
                alt="Custom Two-Tone Luxury SUV in Dubai"
                loading="lazy"
                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)] relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Tailor Your Rental Copy & Bullet Points */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Tailor Your Car Rental In Dubai Plan To Your Specific Requirement
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Faster Rent a Car is a professional rent a car in Dubai service provider for all
              requirements. We offer tailored rental plans and services for specific preferences.
              Our business, private, wedding, and desert safari car rental in Dubai services are
              available tailored to your requirements.{" "}
              <span className="font-extrabold text-white">We offer:</span>
            </p>

            {/* Checklist with Golden Checkmarks */}
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-200 pt-1">
              <li className="flex items-start gap-2.5">
                <span className="text-[#FFE600] font-bold text-sm leading-tight flex-shrink-0">
                  ✓
                </span>
                <span>
                  <strong className="text-white">Hourly car rental</strong> and chauffeur service
                  for airport connections and desert safari
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FFE600] font-bold text-sm leading-tight flex-shrink-0">
                  ✓
                </span>
                <span>
                  Full-day business, private, and wedding car rental services in your city
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FFE600] font-bold text-sm leading-tight flex-shrink-0">
                  ✓
                </span>
                <span>
                  Full weekend and also full week{" "}
                  <strong className="text-white">exotic car rental in Dubai</strong> services
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FFE600] font-bold text-sm leading-tight flex-shrink-0">
                  ✓
                </span>
                <span>Long-term monthly sports car</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FFE600] font-bold text-sm leading-tight flex-shrink-0">
                  ✓
                </span>
                <span>
                  Same-day delivery and advance booking are available for all requirements
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FFE600] font-bold text-sm leading-tight flex-shrink-0">
                  ✓
                </span>
                <span>
                  Affordable, fast car rental plans are available any day of the week, all year
                </span>
              </li>
            </ul>
            <div className="pt-2">
              <Button
                onClick={() => setBookingCar(fleet[2])}
                className="bg-[#FFE600] hover:bg-[#FACC15] text-neutral-950 font-black text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95">
                <Key className="w-4 h-4 mr-1.5" /> CUSTOMIZE MY RENTAL PLAN
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        Our Locations Section:
        - Layout & Content directly matching user's uploaded reference (media_1794988104568_24beaa4d.png)
        - Left: "Our Locations" heading, description, interactive location selection pills
        - Right: Dubai & UAE Regional Map with 12 interactive lime/yellow pins with pulse/radar glow & tooltips
      */}
      <section
        id="locations"
        className="w-full bg-white border-none py-16 sm:py-20 px-4 sm:px-8 lg:px-12 relative z-20 overflow-hidden"
      >
        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading & Description Only */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              Our Locations
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-lg">
              Partnered with the major car hire companies, Faster Rent A Car is your one-stop-solution to find a cheap car rental facility anywhere in Dubai.
            </p>
          </div>

          {/* Right Column: Uploaded Animated MAP.gif on pure white background without border line */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center overflow-hidden bg-white rounded-none border-0 border-none shadow-none p-0">
            <img
              src={mapGif}
              alt="Dubai & Global Fleet Locations"
              className="w-full h-auto max-h-[580px] object-contain select-none rounded-none border-0 border-none bg-white"
            />
          </div>
        </div>
      </section>

      {/* 
        Footer matching uploaded reference image (media_1794988083086_85d99c5b.png):
        - Pure black background (bg-black)
        - Neon yellow headers and accent bullets (text-[#FFE600])
        - Left brand description + CONTINUE READING button with yellow bottom bar
        - 4 Columns of categorized links with yellow bullseye target icon (◎)
        - Right Support column with address, phone, whatsapp, email
        - Red vehicle image in bottom-right corner
        - Centered bottom copyright bar
        - Floating WhatsApp icon button in bottom left
      */}
      <footer className="w-full bg-black text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-8 lg:px-12 border-t border-neutral-900 relative z-20 overflow-hidden">
        {/* Red Vehicle Accent in bottom-right corner matching screenshot */}
        <div className="hidden lg:block absolute -right-10 bottom-6 w-72 xl:w-80 pointer-events-none select-none opacity-90 z-0">
          <img
            src={porscheRed}
            alt="Faster Luxury Fleet"
            className="w-full h-auto object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.8)]"
          />
        </div>

        <div className="w-full max-w-[1720px] mx-auto space-y-14 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 items-start">
            {/* Column 1: Brand & CONTINUE READING Button */}
            <div className="flex flex-col items-start space-y-5">
              {/* Yellow stylized aerodynamic emblem matching reference */}
              <div className="flex items-center gap-2">
                <svg className="w-14 h-12 text-[#FFE600]" viewBox="0 0 100 80" fill="currentColor">
                  <path d="M12 25 Q35 15 75 10 Q60 25 45 32 Q70 28 92 22 Q65 50 32 68 Q48 48 52 42 Q30 50 12 25 Z" />
                </svg>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-normal">
                Faster Luxury Car Rental Dubai professional Sports Car Rental Service. Customer well-being, satisfaction and choice are our extreme priority.
              </p>
              <a
                href="#tailor-dubai"
                className="inline-block bg-[#2A2B2D] hover:bg-[#383A3D] text-white font-black text-xs uppercase px-7 py-3 tracking-wider transition-all border-b-4 border-[#FFE600] shadow-[0_4px_0_#FFE600] cursor-pointer"
              >
                CONTINUE READING
              </a>
            </div>

            {/* Column 2: USEFUL LINKS */}
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#FFE600]">
                USEFUL LINKS
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300">
                {[
                  "About Us",
                  "Special Offers",
                  "Blogs",
                  "Events & News",
                  "Terms and Conditions",
                  "Privacy Policy",
                  "FAQ'S",
                  "Contact Us",
                  "Sitemap",
                ].map((item) => (
                  <li key={item}>
                    <a href="#home" className="flex items-center gap-2 hover:text-[#FFE600] transition-colors">
                      <span className="text-[#FFE600] font-black text-xs">◎</span>
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: CATEGORIES */}
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#FFE600]">
                CATEGORIES
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300">
                {[
                  "Rent Supercars",
                  "Rent Monthly",
                  "Rent Luxury",
                  "Rent Sports",
                  "Rent SUV",
                  "Rent Modified",
                  "Rent 7 Seater",
                ].map((item) => (
                  <li key={item}>
                    <a href="#categories" className="flex items-center gap-2 hover:text-[#FFE600] transition-colors">
                      <span className="text-[#FFE600] font-black text-xs">◎</span>
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: OUR SERVICES */}
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#FFE600]">
                OUR SERVICES
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300">
                {[
                  "Yacht Charter Service",
                  "Limousine Service",
                  "Helicopter Tour Service",
                  "Desert Safari Service",
                ].map((item) => (
                  <li key={item}>
                    <a href="#tailor-dubai" className="flex items-center gap-2 hover:text-[#FFE600] transition-colors">
                      <span className="text-[#FFE600] font-black text-xs">◎</span>
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: SUPPORT */}
            <div className="space-y-4">
              <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#FFE600]">
                SUPPORT
              </h4>
              <ul className="space-y-3 text-xs sm:text-[13px] text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
                  <span>Rose 2 - 17a St - Dubai, Al Barsha, Sheikh Zayed Road, United Arab Emirates.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FFE600] shrink-0" />
                  <a href="tel:+971542116317" className="hover:text-[#FFE600] font-bold text-white">
                    +971 54 211 6317
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#FFE600] shrink-0" />
                  <a href="https://wa.me/971542116317" className="hover:text-[#FFE600] font-bold text-white">
                    971 54 211 6317
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FFE600] shrink-0" />
                  <a href="mailto:info@fastercars.ae" className="hover:text-[#FFE600]">
                    info@fastercars.ae
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright */}
          <div className="pt-8 border-t border-neutral-900 text-center text-xs text-neutral-400">
            © 2026 Faster Rent A Car LLC. All Rights Reserved.
          </div>
        </div>

        {/* Floating WhatsApp Action Button in Bottom-Right Corner (Actual WhatsApp icon + Blinking Pulse) */}
        <a
          href="https://wa.me/971542116317"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-all cursor-pointer animate-whatsapp-pulse shadow-2xl group"
          title="Chat on WhatsApp"
        >
          {/* Blinking Ping Ripple */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60 pointer-events-none" />

          {/* Real Official WhatsApp Vector Icon */}
          <svg
            viewBox="0 0 32 32"
            className="w-8 h-8 fill-white relative z-10 drop-shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.01 2.012c-7.72 0-14 6.277-14 14 0 2.47.644 4.88 1.87 7.01l-1.99 7.26 7.43-1.95c2.05 1.12 4.38 1.68 6.69 1.68 7.72 0 14-6.28 14-14s-6.28-14-14-14zm0 25.64c-2.11 0-4.17-.57-5.97-1.64l-.43-.25-4.43 1.16 1.18-4.32-.28-.44c-1.18-1.87-1.8-4.04-1.8-6.15 0-6.42 5.22-11.64 11.64-11.64 3.11 0 6.03 1.21 8.23 3.41s3.41 5.12 3.41 8.23c0 6.42-5.23 11.64-11.65 11.64zm6.39-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.38-.2.23-.4.26-.75.09-.35-.18-1.48-.54-2.81-1.73-1.04-.92-1.74-2.07-1.94-2.42-.2-.35-.02-.54.15-.71.16-.16.35-.4.53-.61.18-.2.23-.35.35-.59.12-.23.06-.44-.03-.61-.09-.18-.78-1.89-1.07-2.58-.28-.68-.57-.59-.78-.6-.2-.01-.43-.01-.67-.01-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.91s1.25 3.38 1.42 3.61c.18.23 2.46 3.75 5.96 5.26.83.36 1.48.58 1.99.74.84.27 1.61.23 2.21.14.68-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.09-.15-.32-.23-.67-.41z" />
          </svg>
        </a>
      </footer>

      {/* Luxury Rental Booking Dialog */}
      <Dialog open={!!bookingCar} onOpenChange={(open) => !open && setBookingCar(null)}>
        <DialogContent className="max-w-md bg-white p-6 rounded-2xl border shadow-2xl">
          {bookingCar && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: bookingCar.themeColor }}
                  >
                    LUXORA RESERVATION
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    VEHICLE #{bookingCar.number}
                  </span>
                </div>
                <DialogTitle className="text-xl font-black text-neutral-900 tracking-tight">
                  Reserve {bookingCar.make} {bookingCar.model}
                </DialogTitle>
                <DialogDescription className="text-xs text-neutral-500">
                  Select your dates and delivery location for instant concierge confirmation.
                </DialogDescription>
              </DialogHeader>

              {bookingConfirmed ? (
                <div className="py-8 text-center space-y-3">
                  <div
                    className="w-14 h-14 rounded-full mx-auto grid place-items-center text-white shadow-lg"
                    style={{ backgroundColor: bookingCar.themeColor }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900">
                    Reservation Request Confirmed!
                  </h4>
                  <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                    The Luxora Drive concierge team will contact you via WhatsApp / Phone within 15
                    minutes to coordinate delivery of your {bookingCar.make} {bookingCar.model}.
                  </p>
                  <Button
                    onClick={() => {
                      setBookingConfirmed(false);
                      setBookingCar(null);
                    }}
                    className="mt-4 text-xs font-bold text-white px-6 py-2 rounded-lg cursor-pointer"
                    style={{ backgroundColor: bookingCar.themeColor }}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingConfirmed(true);
                  }}
                  className="space-y-4 mt-4"
                >
                  {/* Car Quick Snapshot */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <img
                      src={bookingCar.image}
                      alt={bookingCar.model}
                      className="w-20 h-12 object-contain"
                    />
                    <div>
                      <div className="text-sm font-bold text-neutral-900">
                        {bookingCar.make} {bookingCar.model}
                      </div>
                      <div
                        className="text-xs font-extrabold"
                        style={{ color: bookingCar.themeColor }}
                      >
                          {formatPrice(bookingCar.dailyRate)} / day
                      </div>
                      <div className="text-[10px] text-neutral-500">
                          Deposit: {formatPrice(bookingCar.securityDeposit)} • {bookingCar.includedMileage}
                      </div>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        PICKUP DATE
                      </label>
                      <div className="flex items-center gap-2 border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <input
                          type="date"
                          defaultValue="2026-11-20"
                          required
                          className="w-full text-neutral-800 outline-none text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        RETURN DATE
                      </label>
                      <div className="flex items-center gap-2 border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        <input
                          type="date"
                          defaultValue="2026-11-23"
                          required
                          className="w-full text-neutral-800 outline-none text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Selection */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      DELIVERY LOCATION
                    </label>
                    <div className="flex items-center gap-2 border border-neutral-200 rounded-lg px-3 py-2 text-xs bg-white">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <select className="w-full text-neutral-800 outline-none bg-transparent text-xs">
                        <option>International Airport (VIP Terminal Handover)</option>
                        <option>Hotel / Private Villa Doorstep Delivery</option>
                        <option>Luxora Showroom Collection</option>
                      </select>
                    </div>
                  </div>

                  {/* Driver Contact Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        PHONE / WHATSAPP
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        required
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 outline-none"
                      />
                    </div>
                  </div>

                  {/* Total Estimate Calculation */}
                  <div className="bg-neutral-50 p-3 rounded-lg text-xs space-y-1 text-neutral-600">
                    <div className="flex justify-between">
                        <span>3 Days Rental ({formatPrice(bookingCar.dailyRate)} × 3)</span>
                      <span className="font-semibold text-neutral-800">
                          {formatPrice(bookingCar.dailyRate * 3)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refundable Security Deposit</span>
                      <span className="font-semibold text-neutral-800">
                          {formatPrice(bookingCar.securityDeposit)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-neutral-200/80 pt-1 text-neutral-900 font-bold">
                      <span>Estimated Total</span>
                      <span style={{ color: bookingCar.themeColor }}>
                          {formatPrice(bookingCar.dailyRate * 3 + bookingCar.securityDeposit)}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full text-xs font-bold text-white py-2.5 rounded-lg shadow cursor-pointer"
                    style={{ backgroundColor: bookingCar.themeColor }}
                  >
                    CONFIRM RESERVATION REQUEST
                  </Button>
                </form>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dedicated Vehicle Details Page / Modal (Opened via Yellow Arrow Button) */}
      <Dialog
        open={!!selectedCarDetails}
        onOpenChange={(open) => !open && setSelectedCarDetails(null)}
      >
        <DialogContent className="max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xl overflow-y-auto max-h-[92vh]">
          {selectedCarDetails && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="bg-[#FFE600] text-neutral-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs">
                      {selectedCarDetails.category}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                      {selectedCarDetails.topBadge}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                    {selectedCarDetails.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mt-1">
                    Official Luxora Drive Fleet • Verified Condition • Doorstep Delivery Available
                  </p>
                </div>
              </div>

              {/* 3-Image Interactive Gallery */}
              <div className="space-y-2">
                <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-neutral-50 to-neutral-100/80 rounded-xl p-4 flex items-center justify-center overflow-hidden border border-neutral-100">
                  <button
                    type="button"
                    onClick={() => handleCardPrevImage(selectedCarDetails.id)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 z-20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCardNextImage(selectedCarDetails.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 shadow flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 z-20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <img
                    src={
                      selectedCarDetails.images[cardImageIndices[selectedCarDetails.id] || 0]
                    }
                    alt={selectedCarDetails.name}
                    className="max-h-48 w-auto object-contain drop-shadow-[0_16px_20px_rgba(0,0,0,0.22)] select-none pointer-events-none transition-all duration-300"
                    key={`modal-img-${selectedCarDetails.id}-${cardImageIndices[selectedCarDetails.id] || 0}`}
                  />

                  <div className="absolute bottom-2.5 right-3 text-[10px] font-mono font-bold text-neutral-400 bg-white/80 px-2 py-0.5 rounded">
                    Photo {(cardImageIndices[selectedCarDetails.id] || 0) + 1} of 3
                  </div>
                </div>

                {/* 3 Thumbnails Selector */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setCardImageIndices((prev) => ({ ...prev, [selectedCarDetails.id]: idx }))
                      }
                      className={`h-12 w-20 rounded-lg border p-1 bg-neutral-50 flex items-center justify-center cursor-pointer transition-all ${(cardImageIndices[selectedCarDetails.id] || 0) === idx
                        ? "border-2 border-[#FFE600] shadow-sm scale-105"
                        : "border-neutral-200 opacity-60 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={selectedCarDetails.images[idx]}
                        alt={`Thumb ${idx + 1}`}
                        className="max-h-full max-w-full object-contain pointer-events-none"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {selectedCarDetails.description}
              </p>

              {/* Full Technical Specifications Grid */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2.5">
                  TECHNICAL SPECIFICATIONS
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">
                      ENGINE
                    </span>
                    <span className="text-xs font-black text-neutral-900 block mt-0.5">
                      {selectedCarDetails.specs.engine}
                    </span>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">
                      HORSEPOWER
                    </span>
                    <span className="text-xs font-black text-neutral-900 block mt-0.5">
                      {selectedCarDetails.specs.power}
                    </span>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">
                      0-100 KM/H
                    </span>
                    <span className="text-xs font-black text-neutral-900 block mt-0.5">
                      {selectedCarDetails.specs.accel}
                    </span>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">
                      TOP SPEED
                    </span>
                    <span className="text-xs font-black text-neutral-900 block mt-0.5">
                      {selectedCarDetails.specs.speed}
                    </span>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">
                      TRANSMISSION
                    </span>
                    <span className="text-xs font-black text-neutral-900 block mt-0.5">
                      {selectedCarDetails.specs.gear}
                    </span>
                  </div>
                  <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase block">
                      KERB WEIGHT
                    </span>
                    <span className="text-xs font-black text-neutral-900 block mt-0.5">
                      {selectedCarDetails.specs.weight}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Features */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-2">
                  HIGHLIGHTED FEATURES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 font-medium">
                  {selectedCarDetails.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                    <span>24/7 VIP Doorstep Delivery in Dubai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] shrink-0" />
                    <span>Full Comprehensive Insurance Included</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Booking Action Footer */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-neutral-900 leading-none">
                      {formatPrice(selectedCarDetails.dailyRate)}
                    </span>
                    <span className="text-xs text-neutral-500 font-semibold">/ Day</span>
                    <span className="text-xs text-neutral-400 line-through font-bold">
                      {formatPrice(selectedCarDetails.originalDailyRate)}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500 text-white leading-none">
                      {selectedCarDetails.dailyDiscount} OFF
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 font-medium mt-0.5">
                    Monthly Rate:{" "}
                    <strong className="text-neutral-900">
                      {formatPrice(selectedCarDetails.monthlyRate)}
                    </strong>{" "}
                    ({selectedCarDetails.monthlyDiscount} OFF)
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/?text=Hi%2C%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(selectedCarDetails.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#128C7E] hover:bg-[#075E54] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                  <Button
                    onClick={() => {
                      handleBookProductCard(selectedCarDetails);
                      setSelectedCarDetails(null);
                    }}
                    className="flex-1 sm:flex-initial bg-neutral-950 hover:bg-neutral-800 text-white py-2.5 px-6 rounded-xl text-xs font-black shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5" /> BOOK NOW
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
