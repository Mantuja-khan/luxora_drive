export interface CarSpecs {
  engine: string;
  power: string;
  speed: string;
  accel: string;
  gear: string;
  weight: string;
}

export interface FlashSaleOffer {
  active: boolean;
  discountPercent: number;
  dealPrice?: number;
  badgeText?: string;
  endsAt?: string;
}

export interface CarDocument {
  id: string;
  name: string;
  brand: string;
  category: string;
  location: string;
  dailyRate: number;
  originalDailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  originalMonthlyRate: number;
  images: string[];
  description: string;
  specs: CarSpecs;
  features: string[];
  flashSale: FlashSaleOffer;
  featuredOnHome: boolean; // Flag to select whether car shows on the storefront Home Page
  createdAt: string;
  updatedAt: string;
}

export const INITIAL_FLEET: CarDocument[] = [
  {
    id: "porsche-gt3-rs-2024",
    name: "Porsche 911 GT3 RS",
    brand: "Porsche",
    category: "Rent Supercars",
    location: "Dubai Marina",
    dailyRate: 1850,
    originalDailyRate: 2400,
    weeklyRate: 11000,
    monthlyRate: 36000,
    originalMonthlyRate: 52000,
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The ultimate track weapon for Dubai highways. Featuring an aerodynamic active rear wing, carbon fiber doors, and a screaming 9,000 RPM naturally aspirated flat-six engine.",
    specs: {
      engine: "4.0L Flat-6 NA",
      power: "525 PS / 518 HP",
      speed: "296 km/h",
      accel: "0-100 km/h in 3.2s",
      gear: "7-Speed Dual-Clutch (PDK)",
      weight: "1,450 kg"
    },
    features: [
      "DRS Active Aero System",
      "Weissach Lightweight Carbon Package",
      "Porsche Ceramic Composite Brakes (PCCB)",
      "Club Sport Roll Cage with 6-point harness",
      "Apple CarPlay & Burmester Surround Sound"
    ],
    flashSale: {
      active: true,
      discountPercent: 23,
      dealPrice: 1850,
      badgeText: "23% OFF FLASH DEAL"
    },
    featuredOnHome: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "lambo-huracan-sto-2024",
    name: "Lamborghini Huracán STO",
    brand: "Lamborghini",
    category: "Rent Supercars",
    location: "Downtown Dubai",
    dailyRate: 2100,
    originalDailyRate: 2800,
    weeklyRate: 13000,
    monthlyRate: 42000,
    originalMonthlyRate: 59000,
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Super Trofeo Omologata — pure motorsport DNA engineered for road superiority. Full carbon fiber Cofango hood and aerodynamic Shark Fin.",
    specs: {
      engine: "5.2L Naturally Aspirated V10",
      power: "640 PS / 631 HP",
      speed: "310 km/h",
      accel: "0-100 km/h in 3.0s",
      gear: "7-Speed LDF Dual-Clutch",
      weight: "1,339 kg"
    },
    features: [
      "Rear-Wheel Drive Precision",
      "CCMR Carbon Ceramic Brakes",
      "Telemetry System",
      "Titanium Roll Bar"
    ],
    flashSale: {
      active: true,
      discountPercent: 25,
      dealPrice: 2100,
      badgeText: "25% FLASH SALE"
    },
    featuredOnHome: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "ferrari-f8-tributo-2024",
    name: "Ferrari F8 Tributo Spider",
    brand: "Ferrari",
    category: "Rent Supercars",
    location: "Palm Jumeirah",
    dailyRate: 1950,
    originalDailyRate: 2600,
    weeklyRate: 12500,
    monthlyRate: 39000,
    originalMonthlyRate: 54000,
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Tribute to the most powerful V8 in Ferrari history. Open-top thrills under Dubai's sunshine with rapid retractable hardtop.",
    specs: {
      engine: "3.9L Twin-Turbo V8",
      power: "720 PS / 710 HP",
      speed: "340 km/h",
      accel: "0-100 km/h in 2.9s",
      gear: "7-Speed F1 Dual-Clutch",
      weight: "1,400 kg"
    },
    features: [
      "Retractable Hardtop",
      "Ferrari Dynamic Enhancer Plus",
      "Side Slip Angle Control 6.1",
      "JBL Premium Audio"
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: ""
    },
    featuredOnHome: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "rolls-royce-cullinan-2024",
    name: "Rolls-Royce Cullinan Black Badge",
    brand: "Rolls Royce",
    category: "Rent Luxury Cars",
    location: "DIFC",
    dailyRate: 2600,
    originalDailyRate: 3400,
    weeklyRate: 16000,
    monthlyRate: 52000,
    originalMonthlyRate: 72000,
    images: [
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Effortless luxury everywhere in Dubai. The pinnacle of ultra-luxury SUVs featuring starlight headliner and individual massage rear seating.",
    specs: {
      engine: "6.75L Twin-Turbo V12",
      power: "600 PS / 592 HP",
      speed: "250 km/h",
      accel: "0-100 km/h in 4.9s",
      gear: "8-Speed Satellite-Aided Auto",
      weight: "2,660 kg"
    },
    features: [
      "Shooting Star Headliner",
      "Rear Lounge Massage Seats",
      "Champagne Chiller with Crystal Flutes",
      "Whisper-Quiet Sound Insulation"
    ],
    flashSale: {
      active: true,
      discountPercent: 24,
      dealPrice: 2600,
      badgeText: "VIP FLASH DEAL"
    },
    featuredOnHome: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "mercedes-g63-amg-2024",
    name: "Mercedes-AMG G63 Brabus 800",
    brand: "Mercedes",
    category: "Rent SUV Cars",
    location: "Downtown Dubai",
    dailyRate: 1650,
    originalDailyRate: 2200,
    weeklyRate: 9800,
    monthlyRate: 32000,
    originalMonthlyRate: 45000,
    images: [
      "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Command the streets of Dubai with iconic G-Wagon presence, side-exit dual sports exhaust, and aggressive widebody styling.",
    specs: {
      engine: "4.0L Bi-Turbo V8",
      power: "585 PS / 577 HP",
      speed: "240 km/h",
      accel: "0-100 km/h in 4.5s",
      gear: "AMG SPEEDSHIFT 9-Speed",
      weight: "2,560 kg"
    },
    features: [
      "Brabus Carbon Hood & Bodykit",
      "64-Color Ambient Lighting",
      "Burmester 3D Surround Sound",
      "Triple Differential Locks"
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: ""
    },
    featuredOnHome: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
