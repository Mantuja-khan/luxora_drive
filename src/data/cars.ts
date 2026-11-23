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
import faqCarBg from "@/assets/faq-car-bg.webp";
import camaro1 from "../assets/camaro1.webp";
import camaro2 from "../assets/camaro2.webp";
import camaro3 from "../assets/camaro3.webp";
import camaro4 from "../assets/camaro4.webp";
import camaro5 from "../assets/camaro5.webp";

// Sky / Tiffany LV Patrol Images
import sky1 from "@/assets/sky1.png";
import sky2 from "@/assets/sky2.webp";
import sky3 from "@/assets/sky3.webp";
import sky4 from "@/assets/sky4.webp";
import img1 from "@/assets/img1.webp";
import img3 from "@/assets/img3.webp";
import img4 from "@/assets/img4.webp";
import img5 from "@/assets/img5.webp";

// White Platinum Patrol Images
import white1 from "@/assets/white1.webp";
import white2 from "@/assets/white2.webp";
import white3 from "@/assets/white3.webp";
import white4 from "@/assets/white4.webp";
import white5 from "@/assets/white5.webp";

// Brown / Executive Tan Patrol Images
import brown1 from "@/assets/brown1.webp";
import brown2 from "@/assets/brown2.webp";
import brown3 from "@/assets/brown3.webp";
import brown4 from "@/assets/brown4.webp";
import brown5 from "@/assets/brown5.webp";

// Car / Hermes Orange Edition Patrol Images
import car1 from "@/assets/car1.webp";
import car2 from "@/assets/car2.webp";
import car3 from "@/assets/car3.webp";
import car4 from "@/assets/car4.webp";

// Lambo Tiffany EVO Spyder Images (lambo0 to lambo4)
import lambo0 from "@/assets/lambo0.png";
import lambo1 from "@/assets/lambo1.webp";
import lambo2 from "@/assets/lambo2.webp";
import lambo3 from "@/assets/lambo3.webp";
import lambo4 from "@/assets/lambo4.webp";

// Lambo Blue EVO Spyder Images (blue1 to blue5)
import blue1 from "@/assets/blue1.webp";
import blue2 from "@/assets/blue2.webp";
import blue3 from "@/assets/blue3.webp";
import blue4 from "@/assets/blue4.webp";
import blue5 from "@/assets/blue5.webp";

// Lambo Yellow EVO Spyder Images (yellow1 to yellow6)
import yellow1 from "@/assets/yellow1.webp";
import yellow2 from "@/assets/yellow2.webp";
import yellow3 from "@/assets/yellow3.webp";
import yellow4 from "@/assets/yellow4.webp";
import yellow5 from "@/assets/yellow5.webp";
import yellow6 from "@/assets/yellow6.webp";

// Land Rover Defender White Images (whitesuv1-whitesuv5 & suv1-suv6)
import whitesuv1 from "@/assets/whitesuv1.webp";
import whitesuv2 from "@/assets/whitesuv2.webp";
import whitesuv3 from "@/assets/whitesuv3.webp";
import whitesuv4 from "@/assets/whitesuv4.webp";
import whitesuv5 from "@/assets/whitesuv5.webp";
import suv1 from "@/assets/suv1.webp";
import suv2 from "@/assets/suv2.webp";
import suv3 from "@/assets/suv3.webp";
import suv4 from "@/assets/suv4.webp";
import suv5 from "@/assets/suv5.webp";
import suv6 from "@/assets/suv6.webp";

// Land Rover Defender Black Edition Images (suvblack1 to suvblack5)
import suvblack1 from "@/assets/suvblack1.webp";
import suvblack2 from "@/assets/suvblack2.webp";
import suvblack3 from "@/assets/suvblack3.webp";
import suvblack4 from "@/assets/suvblack4.webp";
import suvblack5 from "@/assets/suvblack5.webp";


import ferarri1 from "../assets/ferarri1.webp";
import ferarri2 from "../assets/ferarri2.webp";
import ferarri3 from "../assets/ferarri3.webp";
import ferarri4 from "../assets/ferarri4.webp";
import ferarri5 from "../assets/ferarri5.webp";

// Sports Camaro SS Orange Images (sports1 to sports5)
import sports1 from "@/assets/sports1.webp";
import sports2 from "@/assets/sports2.webp";
import sports3 from "@/assets/sports3.webp";
import sports4 from "@/assets/sports4.webp";
import sports5 from "@/assets/sports5.webp";

export interface CarSpecs {
  engine: string;
  power: string;
  speed: string;
  accel: string;
  gear: string;
  weight: string;
  torque?: string;
}

export interface PracticalSpecs {
  doors: number;
  passengers: number;
  gear: string;
  luggages: number;
  carType: string;
}

export interface FlashSaleInfo {
  active: boolean;
  discountPercent: number;
  dealPrice?: number;
  badgeText?: string;
  endsAt?: string;
}

export interface ProductCar {
  id: string;
  name: string;
  brand: string;
  model: string;
  badge: string;
  category: string;
  tagline: string;
  description: string;
  images: string[];
  dailyRate: number;
  originalDailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  originalMonthlyRate: number;
  securityDeposit: number;
  minAge: number;
  includedMileage: string;
  location: string;
  themeColor: string;
  specs: CarSpecs;
  practicalSpecs: PracticalSpecs;
  features: string[];
  flashSale: FlashSaleInfo;
  featuredOnHome?: boolean;
}

export const CARS_DATABASE: ProductCar[] = [
  {
    id: "ferrari-f8-spider",
    name: "Ferrari F8 Spider",
    brand: "Ferrari",
    model: "F8 Spider",
    badge: "FERRARI F8",
    category: "Rent Sports",
    tagline: "UNLEASH THE POWER OF ITALIAN EXCELLENCE.",
    description:
      "Experience the ultimate expression of Italian supercar engineering with the Ferrari F8 Spider. Powered by a breathtaking 3.9-litre twin-turbocharged V8 engine producing 720 CV, this extraordinary convertible delivers explosive acceleration and exceptional driving precision. Its retractable hardtop roof, aggressive aerodynamic styling, sculpted bodywork, and luxurious driver-focused cockpit create an unforgettable combination of performance and open-air freedom. Designed for those who demand pure Ferrari excitement, the F8 Spider makes every journey through Dubai extraordinary.",
    images: [ferarri1, ferarri2, ferarri3, ferarri4, ferarri5],
    dailyRate: 2799,
    originalDailyRate: 3500,
    weeklyRate: 18157,
    monthlyRate: 57599,
    originalMonthlyRate: 7200,
    securityDeposit: 0,
    minAge: 25,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & JBR",
    themeColor: "#DC143C",
    specs: {
      engine: "3.9L Twin-Turbocharged V8",
      power: "720 CV / 710 HP",
      speed: "340 km/h",
      accel: "0-100 km/h in 2.9s",
      gear: "7-Speed Dual-Clutch F1 Transmission",
      weight: "1,400 kg (Dry Weight)",
      torque: "770 Nm @ 3,250 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic Dual-Clutch",
      luggages: 1,
      carType: "Luxury Convertible Supercar",
    },
    features: [
      "3.9L Twin-Turbocharged V8 Engine",
      "720 CV Ferrari Performance",
      "Retractable Hardtop Convertible Roof",
      "Advanced Aerodynamic Design",
      "F1-Inspired Dual-Clutch Transmission",
      "Carbon Fiber Interior Details",
      "Premium Leather Sports Seats",
      "Ferrari Manettino Driving Modes",
      "Advanced Traction Control System",
      "Carbon Ceramic Braking System",
      "LED Headlights",
      "Sport Alloy Wheels",
      "Premium Infotainment System",
      "Dual Exhaust Sports System",
    ],
    flashSale: {
      active: true,
      discountPercent: 20,
      badgeText: "SAVE 20%",
    },
    featuredOnHome: true,
  },
  {
    id: "nissan-patrol-lv-2026",
    name: "Nissan Patrol LV 2026",
    brand: "Nissan",
    model: "Patrol LV Edition 2026",
    badge: "PATROL LV",
    category: "Rent 7 Seater",
    tagline: "EXCLUSIVE LOUIS VUITTON LUXURY BESPOKE SUV.",
    description:
      "The 2026 Nissan Patrol LV Edition is a black luxury SUV with a bold custom design that combines powerful presence with exclusive styling. It stands out with a unique Louis Vuitton-inspired exterior pattern, custom alloy wheels, and a refined matte finish that gives it a distinctive and premium look. Built for strength and comfort, it delivers powerful performance with smooth handling, making it ideal for both city driving and long journeys. Inside, the cabin is fully customized with a striking Tiffany green and orange leather interior, VIP rear seating, and state-of-the-art entertainment screens.",
    images: [sky1, sky4, sky2, sky3],
    dailyRate: 579,
    originalDailyRate: 1400,
    weeklyRate: 3793,
    monthlyRate: 12599,
    originalMonthlyRate: 23849,
    securityDeposit: 2000,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & Palm Jumeirah",
    themeColor: "#00E5D0",
    specs: {
      engine: "5.6L Endurance V8 Engine",
      power: "400 HP / 560 Nm",
      speed: "210 km/h",
      accel: "0-100 km/h in 6.6s",
      gear: "7-Speed Automatic with Manual Mode",
      weight: "2,750 kg",
      torque: "560 Nm @ 4,000 RPM",
    },
    practicalSpecs: {
      doors: 4,
      passengers: 7,
      gear: "Auto",
      luggages: 2,
      carType: "SUV",
    },
    features: [
      "Louis Vuitton Bespoke Monogram Exterior",
      "Tiffany Green & Orange Custom Leather Interior",
      "VIP 7-Seater Executive Configuration",
      "Bose Premium 13-Speaker Audio System",
      "Hydraulic Body Motion Control (HBMC)",
      "Rear Entertainment Dual Touchscreens",
    ],
    flashSale: {
      active: true,
      discountPercent: 59,
      dealPrice: 579,
      badgeText: "SAVE 59%",
    },
    featuredOnHome: true,
  },
  {
    id: "nissan-patrol-white-2026",
    name: "Nissan Patrol Platinum White 2026",
    brand: "Nissan",
    model: "Patrol Platinum 2026",
    badge: "PATROL PLATINUM",
    category: "Rent 7 Seater",
    tagline: "LUXURY WHITE EDITION WITH BLACK EXECUTIVE LEATHER.",
    description:
      "The 2026 Nissan Patrol Platinum in pure pearl white represents the pinnacle of luxury SUV comfort in Dubai. Featuring a sleek black contrast roof, blacked-out honeycomb grille, diamond-cut alloy wheels, and an executive VIP black leather interior with starlight ceiling and full digital panoramic dashboard. Unmatched road presence with supreme 7-seater comfort for family and VIP travel across UAE.",
    images: [white1, white5, white4, white3, white2],
    dailyRate: 549,
    originalDailyRate: 1200,
    weeklyRate: 3499,
    monthlyRate: 11999,
    originalMonthlyRate: 21000,
    securityDeposit: 2000,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & Palm Jumeirah",
    themeColor: "#FFFFFF",
    specs: {
      engine: "5.6L V8 DIG Endurance",
      power: "400 HP / 560 Nm",
      speed: "210 km/h",
      accel: "0-100 km/h in 6.6s",
      gear: "7-Speed Automatic",
      weight: "2,750 kg",
      torque: "560 Nm @ 4,000 RPM",
    },
    practicalSpecs: {
      doors: 4,
      passengers: 7,
      gear: "Auto",
      luggages: 4,
      carType: "SUV",
    },
    features: [
      "Pearl White Exterior with Black Contrast Roof",
      "Executive Black Leather Captain Seating with Star Headliner",
      "Panoramic Dual 14.3-inch Curved Digital Display",
      "Bose 13-Speaker Premium Surround Sound",
      "ProPILOT Assist 2.1 & 360° Safety Shield",
      "Hydraulic Body Motion Control (HBMC)",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "nissan-patrol-tan-2026",
    name: "Nissan Patrol V8 Executive Tan 2026",
    brand: "Nissan",
    model: "Patrol V8 Executive 2026",
    badge: "PATROL EXECUTIVE",
    category: "Rent 7 Seater",
    tagline: "PREMIUM TAN LEATHER CABIN WITH HIGH-TECH DIGITAL COCKPIT.",
    description:
      "Combining rugged V8 endurance with private-jet luxury. The 2026 Nissan Patrol V8 Executive features a stealth dark exterior paired with an ultra-exclusive caramel tan leather cockpit, expansive ultra-wide digital dashboard screens, wood-grain console, and supreme ride isolation. Engineered to deliver effortless power across city boulevards and desert expressways.",
    images: [brown1, brown2, brown3, brown4, brown5],
    dailyRate: 569,
    originalDailyRate: 1350,
    weeklyRate: 3690,
    monthlyRate: 12299,
    originalMonthlyRate: 22500,
    securityDeposit: 2000,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Dubai Marina & Business Bay",
    themeColor: "#D4AF37",
    specs: {
      engine: "5.6L V8 Endurance Engine",
      power: "400 HP / 560 Nm",
      speed: "210 km/h",
      accel: "0-100 km/h in 6.6s",
      gear: "7-Speed Automatic",
      weight: "2,750 kg",
      torque: "560 Nm @ 4,000 RPM",
    },
    practicalSpecs: {
      doors: 4,
      passengers: 7,
      gear: "Auto",
      luggages: 3,
      carType: "SUV",
    },
    features: [
      "Bespoke Caramel Tan Leather Upholstery",
      "Ultra-Wide Dual Digital High-Definition Screens",
      "Apple CarPlay & Wireless Smartphone Fast Charging",
      "Ventilated & Heated Executive Front & Rear Seats",
      "Intelligent All-Wheel Drive with Desert / Snow / On-Road Modes",
      "Electric Sunroof & Ambient Cabin Illumination",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "nissan-patrol-hermes-orange",
    name: "Nissan Patrol Nismo Hermes Edition",
    brand: "Nissan",
    model: "Patrol Nismo Hermes Edition",
    badge: "PATROL NISMO",
    category: "Rent Modified",
    tagline: "HERMES PARIS ORANGE BESPOKE QUILTED CABIN & NISMO AGGRESSION.",
    description:
      "The pinnacle of bespoke customization in the UAE. This 2026 Nissan Patrol Nismo features custom aerodynamics with signature orange trim accents, and an opulent Hermes Paris custom orange diamond-quilted leather interior. From the custom-stitched steering wheel to the rear executive lounge, every inch radiates bespoke ultra-luxury and uncompromising road authority.",
    images: [car1, car4, car2, car3],
    dailyRate: 649,
    originalDailyRate: 1550,
    weeklyRate: 4199,
    monthlyRate: 13999,
    originalMonthlyRate: 25000,
    securityDeposit: 2500,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & Palm Jumeirah",
    themeColor: "#FF6600",
    specs: {
      engine: "5.6L V8 Nismo Tuned",
      power: "428 HP / 560 Nm",
      speed: "215 km/h",
      accel: "0-100 km/h in 6.2s",
      gear: "7-Speed Automatic with Manual Paddle Shifters",
      weight: "2,710 kg",
      torque: "560 Nm @ 4,000 RPM",
    },
    practicalSpecs: {
      doors: 4,
      passengers: 7,
      gear: "Auto",
      luggages: 3,
      carType: "Modified SUV",
    },
    features: [
      "Hermes Paris Handcrafted Orange Quilted Leather Cabin",
      "Nismo Aerodynamic Body Kit with Orange Lip Spoiler",
      "Nismo 22-Inch Custom Two-Tone Alloy Wheels",
      "Bilstein Sport Tuned Suspension for High-Speed Stability",
      "Star-Light Fiber Optic Ceiling with Multi-Color Ambient LEDs",
      "Rear Passenger Entertainment Screens",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "lambo-huracan-tiffany",
    name: "Lamborghini Huracan EVO Tiffany",
    brand: "Lamborghini",
    model: "Huracan EVO Spyder",
    badge: "HURACAN EVO",
    category: "Rent Supercars",
    tagline: "TIFFANY BLUE. OPEN TOP THRILL.",
    description:
      "Experience Dubai's most striking supercar: an exclusive bespoke Tiffany Blue Lamborghini Huracán EVO Spyder. Powered by a naturally aspirated 5.2-litre V10 delivering 640 PS and 600 Nm of torque, it propels you from 0 to 100 km/h in just 3.1 seconds with the wind in your hair and an intoxicating exhaust scream along Sheikh Zayed Road.",
    images: [lambo0, lambo1, lambo2, lambo3, lambo4],
    dailyRate: 1499,
    originalDailyRate: 1980,
    weeklyRate: 8999,
    monthlyRate: 29999,
    originalMonthlyRate: 49500,
    securityDeposit: 3000,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & Palm Jumeirah",
    themeColor: "#00E5D0",
    specs: {
      engine: "5.2L Naturally Aspirated V10",
      power: "640 PS / 631 HP",
      speed: "325 km/h",
      accel: "0-100 km/h in 3.1s",
      gear: "7-Speed Dual-Clutch (LDF)",
      weight: "1,422 kg",
      torque: "600 Nm @ 6,500 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic",
      luggages: 2,
      carType: "Supercar Convertible",
    },
    features: [
      "Tiffany Blue Bespoke Matte Wrap",
      "LDVI Predictive Vehicle Dynamics",
      "Dual Sport Exhaust with Valve Control",
      "Apple CarPlay & Premium Sound System",
      "Front Axle Lift System (Speed Bumps)",
      "Carbon Ceramic Brakes with Teal Calipers",
    ],
    flashSale: {
      active: true,
      discountPercent: 24,
      dealPrice: 1499,
      badgeText: "24% OFF FLASH DEAL",
    },
    featuredOnHome: true,
  },
  {
    id: "lambo-huracan-yellow",
    name: "Lamborghini Huracan EVO Giallo Inti",
    brand: "Lamborghini",
    model: "Huracan EVO Spyder",
    badge: "HURACAN SPYDER",
    category: "Rent Supercars",
    tagline: "GIALLO INTI PEARL YELLOW WITH OPEN TOP THRILL.",
    description:
      "Finished in brilliant Giallo Inti pearl metallic with gloss black aerodynamics and yellow brake calipers. Naturally aspirated 5.2L V10 delivering 640 HP of pure open-air Italian adrenaline across Dubai.",
    images: [yellow1, yellow2, yellow3, yellow4, yellow5, yellow6],
    dailyRate: 1450,
    originalDailyRate: 1950,
    weeklyRate: 8800,
    monthlyRate: 28999,
    originalMonthlyRate: 46000,
    securityDeposit: 3000,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & Palm Jumeirah",
    themeColor: "#FFE600",
    specs: {
      engine: "5.2L V10 Naturally Aspirated",
      power: "640 PS / 631 HP",
      speed: "325 km/h",
      accel: "0-100 km/h in 3.1s",
      gear: "7-Speed Dual-Clutch (LDF)",
      weight: "1,422 kg",
      torque: "600 Nm @ 6,500 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic",
      luggages: 2,
      carType: "Supercar Convertible",
    },
    features: [
      "Giallo Inti Multi-Layer Pearl Yellow Paint",
      "Electro-Hydraulic Lightweight Soft Top",
      "LDVI Predictive Vehicle Dynamics",
      "Bespoke Sport Exhaust with Valved Flow",
      "Carbon Ceramic Brakes with Yellow Calipers",
    ],
    flashSale: {
      active: true,
      discountPercent: 25,
      dealPrice: 1450,
      badgeText: "25% OFF FLASH DEAL",
    },
    featuredOnHome: true,
  },
  {
    id: "defender-v8-white",
    name: "Land Rover Defender 110 White Custom",
    brand: "Land Rover",
    model: "Defender 110 V8 Bespoke",
    badge: "DEFENDER V8",
    category: "Rent SUV",
    tagline: "BESPOKE TIFFANY BLUE CABIN & ROOF LED EXPEDITION RIG.",
    description:
      "Finished in Fuji White with gloss black arches, roof LED auxiliary light pods, and a fully bespoke handcrafted electric blue/tiffany leather interior. Unstoppable supercharged 5.0L V8 power commanding presence across city and desert.",
    images: [whitesuv1, suv2, suv3, suv4, suv5, suv6, whitesuv2, whitesuv3],
    dailyRate: 899,
    originalDailyRate: 1400,
    weeklyRate: 5600,
    monthlyRate: 18500,
    originalMonthlyRate: 28000,
    securityDeposit: 2500,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Dubai Marina & Palm Jumeirah",
    themeColor: "#00E5D0",
    specs: {
      engine: "5.0L Supercharged V8",
      power: "525 PS / 518 HP",
      speed: "240 km/h",
      accel: "0-100 km/h in 5.2s",
      gear: "8-Speed Automatic with Quickshift",
      weight: "2,600 kg",
      torque: "625 Nm @ 2,500 RPM",
    },
    practicalSpecs: {
      doors: 5,
      passengers: 5,
      gear: "Automatic",
      luggages: 5,
      carType: "Luxury SUV",
    },
    features: [
      "Bespoke Tiffany Blue Leather Interior",
      "Twin Roof LED High-Power Safari Pods",
      "Electronic Active Differential with Torque Vectoring",
      "Configurable Terrain Response 2 with Desert Sand Mode",
      "Meridian 3D Surround Sound System",
    ],
    flashSale: {
      active: true,
      discountPercent: 35,
      dealPrice: 899,
      badgeText: "35% OFF FLASH DEAL",
    },
    featuredOnHome: true,
  },
  {
    id: "lambo-huracan-blue",
    name: "Lamborghini Huracan EVO Blue Le Mans",
    brand: "Lamborghini",
    model: "Huracan EVO Spyder",
    badge: "HURACAN SPYDER",
    category: "Rent Supercars",
    tagline: "BLU LE MANS WITH CONTRAST BLUE SPORT SEATS.",
    description:
      "Finished in deep Blu Le Mans metallic with black forged alloy wheels and blue contrast sport stitching. Delivers raw open-top sound and unmatched V10 thrill along Dubai Marina and Sheikh Zayed Road.",
    images: [blue1, blue2, blue3, blue4, blue5],
    dailyRate: 1499,
    originalDailyRate: 1980,
    weeklyRate: 8999,
    monthlyRate: 29999,
    originalMonthlyRate: 49500,
    securityDeposit: 3000,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & JBR",
    themeColor: "#0066FF",
    specs: {
      engine: "5.2L Naturally Aspirated V10",
      power: "640 PS / 631 HP",
      speed: "325 km/h",
      accel: "0-100 km/h in 3.1s",
      gear: "7-Speed Dual-Clutch (LDF)",
      weight: "1,422 kg",
      torque: "600 Nm @ 6,500 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic",
      luggages: 2,
      carType: "Supercar Convertible",
    },
    features: [
      "Blu Le Mans High-Gloss Metallic Finish",
      "Black Forged Aesir Rims with Red Brake Calipers",
      "Dual Mode Valved Titanium Exhaust",
      "Apple CarPlay & Touchscreen Navigation",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "chevrolet-camaro-2023",
    name: "Chevrolet Camaro Convertible",
    brand: "Chevrolet",
    model: "Camaro Convertible (2023)",
    badge: "CHEVROLET CAMARO",
    category: "Rent Sports",
    tagline: "UNLEASH THE THRILL. DRIVE WITH STYLE.",
    description:
      "Experience the perfect combination of American muscle and open-air luxury with the 2023 Chevrolet Camaro Convertible. Featuring a sleek matte black exterior paired with a distinctive Tiffany interior, this sport-modified convertible delivers an unforgettable driving experience. Enjoy premium leather seats with heating and ventilation, advanced infotainment with Apple CarPlay and Android Auto, multi-zone climate control, smart key entry, and advanced safety technologies. Its aggressive body kit, dual exhaust, LED headlights, rear spoiler, and stylish alloy wheels make it a true head-turner on Dubai roads.",
    images: [camaro1, camaro2, camaro3, camaro4, camaro5],
    dailyRate: 349,
    originalDailyRate: 800,
    weeklyRate: 2200,
    monthlyRate: 5999,
    originalMonthlyRate: 11999,
    securityDeposit: 0,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & JBR",
    themeColor: "#00D6C9",
    specs: {
      engine: "Engine variant not specified",
      power: "Varies by engine variant",
      speed: "Varies by engine variant",
      accel: "Varies by engine variant",
      gear: "Automatic Transmission",
      weight: "Varies by configuration",
      torque: "Varies by engine variant",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 4,
      gear: "Automatic",
      luggages: 2,
      carType: "Convertible Sports Car",
    },
    features: [
      "Matte Black Exterior Finish",
      "Exclusive Tiffany Interior",
      "Electric Leather Seats",
      "Heated & Ventilated Front Seats",
      "Rear Seat Cooling",
      "Apple CarPlay & Android Auto",
      "Bluetooth & Navigation System",
      "Touchscreen Infotainment Display",
      "Multi-Zone Climate Control",
      "Adaptive Cruise Control",
      "Rear View Camera & Parking Sensors",
      "LED Headlights & Illuminated Emblems",
      "Sport Body Kit with Dual Exhaust",
      "Premium Alloy Wheels",
      "Electric Soft-Top Convertible Roof",
      "Smart Key Entry",
    ],
    flashSale: {
      active: false,
      discountPercent: 56,
      badgeText: "UP TO 56% OFF",
    },
    featuredOnHome: true,
  },
  {
    id: "defender-v8-black",
    name: "Land Rover Defender 110 Black Edition",
    brand: "Land Rover",
    model: "Defender 110 V8 Stealth",
    badge: "DEFENDER STEALTH",
    category: "Rent SUV",
    tagline: "ALL-BLACK STEALTH EXTERIOR WITH ROOF LIGHTS & V8 ROAR.",
    description:
      "Satin Santorini Black exterior with stealth smoked lighting, black 22-inch wheels, and dual roof light bars. The ultimate command vehicle for Dubai's roads with 525 HP supercharged V8 power.",
    images: [suvblack1, suvblack2, suvblack3, suvblack4, suvblack5],
    dailyRate: 949,
    originalDailyRate: 1450,
    weeklyRate: 5900,
    monthlyRate: 19500,
    originalMonthlyRate: 29000,
    securityDeposit: 2500,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & Business Bay",
    themeColor: "#222222",
    specs: {
      engine: "5.0L Supercharged V8",
      power: "525 PS / 518 HP",
      speed: "240 km/h",
      accel: "0-100 km/h in 5.2s",
      gear: "8-Speed Automatic",
      weight: "2,600 kg",
      torque: "625 Nm @ 2,500 RPM",
    },
    practicalSpecs: {
      doors: 5,
      passengers: 5,
      gear: "Automatic",
      luggages: 5,
      carType: "Luxury SUV",
    },
    features: [
      "Santorini Black Stealth Matte Wrap",
      "Roof Auxiliary High-Beam LED Light Pods",
      "Full Black Windsor Leather Interior",
      "Quad Outboard Mounted Exhausts with V8 Acoustics",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "chevrolet-camaro-ss",
    name: "Chevrolet Camaro SS Coupe Orange",
    brand: "Chevrolet",
    model: "Camaro SS 6.2L V8",
    badge: "CAMARO SS",
    category: "Rent Sports",
    tagline: "CRUSH ORANGE AMERICAN MUSCLE WITH 6.2L V8 ROAR.",
    description:
      "Finished in eye-catching Crush Orange with black aero splitter, rear spoiler, and black performance wheels. 455 HP of American V8 muscle delivering an unmistakable exhaust note along Dubai streets.",
    images: [sports1, sports2, sports3, sports4, sports5],
    dailyRate: 499,
    originalDailyRate: 750,
    weeklyRate: 3100,
    monthlyRate: 9999,
    originalMonthlyRate: 15000,
    securityDeposit: 1500,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Dubai Marina & JBR",
    themeColor: "#FF6600",
    specs: {
      engine: "6.2L LT1 V8 Naturally Aspirated",
      power: "455 HP / 617 Nm",
      speed: "250 km/h",
      accel: "0-100 km/h in 4.0s",
      gear: "10-Speed Paddle-Shift Automatic",
      weight: "1,680 kg",
      torque: "617 Nm @ 4,400 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 4,
      gear: "Automatic",
      luggages: 2,
      carType: "Sports Muscle Coupe",
    },
    features: [
      "Crush Orange Matte Finish with Black Accents",
      "Dual-Mode Performance Exhaust System",
      "Brembo 4-Piston Performance Brakes",
      "Bose Premium Audio & Apple CarPlay",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "lambo-huracan-sto",
    name: "Lamborghini Huracan STO",
    brand: "Lamborghini",
    model: "Huracan STO",
    badge: "HURACAN STO",
    category: "Rent Supercars",
    tagline: "PURE MOTORSPORT HOMOLOGATED ROAD RACER.",
    description:
      "Directly derived from the Squadra Corse Huracán Super Trofeo EVO racecar. Built with over 75% carbon fiber body panels, single-piece Cofango front hood, functional roof air scoop, and adjustable shark fin wing. Delivering 640 PS exclusively to the rear wheels for the purest, most aggressive track driving experience available in Dubai.",
    images: [lamboHuracanSto, lamboHuracanTiffany, lamboHuracanWhite],
    dailyRate: 1799,
    originalDailyRate: 2400,
    weeklyRate: 10500,
    monthlyRate: 34999,
    originalMonthlyRate: 55000,
    securityDeposit: 3500,
    minAge: 25,
    includedMileage: "250 KM / Day",
    location: "Dubai Marina & DIFC",
    themeColor: "#FFE600",
    specs: {
      engine: "5.2L V10 Squadra Corse",
      power: "640 PS / 631 HP",
      speed: "310 km/h",
      accel: "0-100 km/h in 3.0s",
      gear: "7-Speed Dual-Clutch",
      weight: "1,339 kg Dry Track",
      torque: "565 Nm @ 6,500 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic",
      luggages: 1,
      carType: "Track-Focused Supercar",
    },
    features: [
      "Carbon Fiber 'Cofango' Aero Body",
      "Shark Fin Aero Wing & Roof Scoop",
      "Brembo CCM-R F1-Derived Carbon Brakes",
      "Lightweight Forged Magnesium Center-Lock Wheels",
      "Racing Telemetry & Full Alcantara Cockpit",
      "Akrapovič Titanium Sports Exhaust",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "porsche-gt3-rs",
    name: "Porsche 911 GT3 RS",
    brand: "Porsche",
    model: "911 GT3 RS (992)",
    badge: "PORSCHE 911",
    category: "Rent Sports",
    tagline: "THE RECORD-BREAKING TRACK WEAPON.",
    description:
      "The benchmark for sports car precision. Featuring Formula 1-style Drag Reduction System (DRS) on its towering rear wing, carbon fiber doors, and a naturally aspirated 4.0-litre flat-six engine revving all the way to 9,000 RPM. Engineered without compromise for high-speed stability and razor-sharp steering feedback.",
    images: [porscheGt3Rs, porscheRed, lamboHuracanSto],
    dailyRate: 1499,
    originalDailyRate: 1980,
    weeklyRate: 9800,
    monthlyRate: 29999,
    originalMonthlyRate: 49500,
    securityDeposit: 3000,
    minAge: 25,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & JBR",
    themeColor: "#FF2A2A",
    specs: {
      engine: "4.0L Naturally Aspirated Flat-6",
      power: "525 PS / 518 HP",
      speed: "296 km/h",
      accel: "0-100 km/h in 3.2s",
      gear: "7-Speed Porsche Doppelkupplung (PDK)",
      weight: "1,450 kg",
      torque: "465 Nm @ 6,300 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic PDK",
      luggages: 2,
      carType: "High-Performance Coupe",
    },
    features: [
      "F1 Active DRS (Drag Reduction System)",
      "Weissach Lightweight Carbon Package",
      "Porsche Ceramic Composite Brakes (PCCB)",
      "Club Sport Roll Cage with 6-Point Harnesses",
      "Bose Surround Sound & Apple CarPlay",
      "Active Aerodynamic Diffusers",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "mercedes-g63-maybach",
    name: "Mercedes-AMG G63 Maybach Edition",
    brand: "Mercedes",
    model: "G63 AMG Maybach",
    badge: "MERCEDES G63",
    category: "Rent SUV Cars",
    tagline: "COMMAND THE DUBAI STREETS WITH UNRIVALED MAJESTY.",
    description:
      "The undisputed king of Dubai's luxury SUV scene. Finished in stealth black with bespoke Maybach diamond-quilted leather interior, handcrafted walnut wood accents, and twin-turbocharged 4.0L V8 emitting that thunderous AMG side-exhaust growl. Unmatched road presence combined with royal comfort.",
    images: [mercedesG63Maybach, dubaiSuv, faqCarBg],
    dailyRate: 1499,
    originalDailyRate: 1980,
    weeklyRate: 8999,
    monthlyRate: 29999,
    originalMonthlyRate: 49500,
    securityDeposit: 2500,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Dubai Marina, DIFC & City Walk",
    themeColor: "#D4AF37",
    specs: {
      engine: "4.0L Bi-Turbo V8 Handcrafted",
      power: "585 PS / 577 HP",
      speed: "240 km/h",
      accel: "0-100 km/h in 4.5s",
      gear: "AMG SPEEDSHIFT PLUS 9G-TRONIC",
      weight: "2,560 kg",
      torque: "850 Nm @ 2,500-3,500 RPM",
    },
    practicalSpecs: {
      doors: 5,
      passengers: 5,
      gear: "Automatic",
      luggages: 5,
      carType: "Luxury Performance SUV",
    },
    features: [
      "Maybach Handcrafted Diamond Leather Interior",
      "Burmester 3D High-End Surround Sound",
      "AMG Dual Side-Exit Chrome Exhausts",
      "64-Color Ambient LED Mood Lighting",
      "Heated, Ventilated & Massage Seats",
      "360-Degree Surround Camera & Parking Pilot",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "lambo-huracan-white",
    name: "Lamborghini Huracan EVO White",
    brand: "Lamborghini",
    model: "Huracan EVO Coupe",
    badge: "HURACAN EVO",
    category: "Rent Supercars",
    tagline: "PURE ITALIAN PERFORMANCE IN PRISTINE WHITE.",
    description:
      "Dressed in stunning Bianco Monocerus pearl white with high-gloss black aero accents. The Huracan EVO Coupe blends all-wheel drive, four-wheel steering, and dynamic torque vectoring for razor-sharp stability whether cruising through Dubai Mall boulevard or pushing limits on the desert bypass.",
    images: [lamboHuracanWhite, lamboEvoCoupe, lamboHuracanTiffany],
    dailyRate: 1399,
    originalDailyRate: 1850,
    weeklyRate: 8500,
    monthlyRate: 27999,
    originalMonthlyRate: 44500,
    securityDeposit: 2500,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & Business Bay",
    themeColor: "#FFFFFF",
    specs: {
      engine: "5.2L V10 Naturally Aspirated",
      power: "640 PS / 631 HP",
      speed: "325 km/h",
      accel: "0-100 km/h in 2.9s",
      gear: "7-Speed LDF Dual-Clutch",
      weight: "1,422 kg",
      torque: "600 Nm @ 6,500 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic",
      luggages: 2,
      carType: "Supercar Coupe",
    },
    features: [
      "Bianco Monocerus Multi-Coat Pearl White",
      "All-Wheel Steering & Magnetorheological Suspension",
      "Lamborghini Infotainment System with Multi-Touch",
      "Rosso Mars Red Performance Brake Calipers",
      "Sport Leather Seats with Contrast White Stitching",
      "Full LED Headlamps with Y-Signature DRLs",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "lambo-evo-coupe",
    name: "Lamborghini Huracan EVO Titanium",
    brand: "Lamborghini",
    model: "Huracan EVO Coupe",
    badge: "HURACAN EVO",
    category: "Rent Supercars",
    tagline: "STEALTH GRIGIO TITANS WITH FORGED GOLD ALLOYS.",
    description:
      "A dark titanium masterpiece on Dubai's streets. Finished in satin Grigio Titans paint, complemented by forged gold alloy wheels and yellow brake calipers. Combines breathtaking aesthetics with thunderous V10 acoustics.",
    images: [lamboEvoCoupe, lamboHuracanWhite, lamboHuracanSto],
    dailyRate: 1450,
    originalDailyRate: 1900,
    weeklyRate: 8800,
    monthlyRate: 28500,
    originalMonthlyRate: 46000,
    securityDeposit: 2500,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Palm Jumeirah & Dubai Marina",
    themeColor: "#A0AEC0",
    specs: {
      engine: "5.2L High-Rev V10",
      power: "640 PS / 631 HP",
      speed: "325 km/h",
      accel: "0-100 km/h in 3.0s",
      gear: "7-Speed Dual-Clutch",
      weight: "1,422 kg",
      torque: "600 Nm @ 6,500 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic",
      luggages: 2,
      carType: "Supercar Coupe",
    },
    features: [
      "Grigio Titans Satin Metallic Paint",
      "Forged Gold Lightweight Alloy Wheels",
      "Carbon Ceramic Composite Brakes",
      "Full Alcantara Cockpit & Sport Seats",
      "Reversing Camera with Front/Rear Sensors",
      "Keyless Entry & Push-Button Start",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "mclaren-765lt",
    name: "McLaren 765LT Spider",
    brand: "McLaren",
    model: "765LT Longtail",
    badge: "MCLAREN 765LT",
    category: "Rent Supercars",
    tagline: "765 HORSEPOWER OF PURE LONGTAIL AGGRESSION.",
    description:
      "Limited to just 765 units worldwide. The Longtail philosophy brought to the highest level with ultra-lightweight carbon construction, quad titanium exhaust tips that spit blue flames, and an active carbon rear airbrake. Raw, visceral speed for drivers seeking the ultimate rush.",
    images: [mclaren765lt, lamboHuracanSto, porscheGt3Rs],
    dailyRate: 2400,
    originalDailyRate: 3200,
    weeklyRate: 14500,
    monthlyRate: 48000,
    originalMonthlyRate: 68000,
    securityDeposit: 4000,
    minAge: 25,
    includedMileage: "200 KM / Day",
    location: "Downtown Dubai & DIFC",
    themeColor: "#FF6600",
    specs: {
      engine: "4.0L Twin-Turbocharged V8",
      power: "765 PS / 755 HP",
      speed: "330 km/h",
      accel: "0-100 km/h in 2.8s",
      gear: "7-Speed Seamless Shift Gearbox (SSG)",
      weight: "1,229 kg Dry",
      torque: "800 Nm @ 5,500 RPM",
    },
    practicalSpecs: {
      doors: 2,
      passengers: 2,
      gear: "Automatic",
      luggages: 2,
      carType: "Supercar Longtail",
    },
    features: [
      "Active Carbon Fiber Rear Wing Airbrake",
      "Quad Center-Mounted Titanium Sports Exhaust",
      "Dihedral Butterfly Doors with Soft-Close",
      "McLaren Track Telemetry with Lap Cam",
      "Bowers & Wilkins 12-Speaker Audio",
      "Full Carbon Fiber Monocage II-S Structure",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "bmw-m5-cs",
    name: "BMW M5 CS Competition",
    brand: "BMW",
    model: "M5 CS",
    badge: "BMW M5 CS",
    category: "Rent Sports",
    tagline: "THE FASTEST & MOST POWERFUL BMW PRODUCTION SEDAN.",
    description:
      "The pinnacle of German executive super-sedans. Powered by a twin-turbo 4.4-litre V8 kicking out 635 HP with carbon bucket seats in both front and rear rows. Features gold-bronze accents, yellow laser headlights, and switchable M xDrive (4WD to pure RWD drift mode).",
    images: [bmwM5Cs, audiRsQ8, mercedesG63Maybach],
    dailyRate: 1200,
    originalDailyRate: 1600,
    weeklyRate: 7200,
    monthlyRate: 24000,
    originalMonthlyRate: 36000,
    securityDeposit: 2000,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Dubai Marina & City Walk",
    themeColor: "#1A85FF",
    specs: {
      engine: "4.4L M TwinPower Turbo V8",
      power: "635 PS / 627 HP",
      speed: "305 km/h",
      accel: "0-100 km/h in 3.0s",
      gear: "8-Speed M Steptronic with Drivelogic",
      weight: "1,825 kg",
      torque: "750 Nm @ 1,800-5,950 RPM",
    },
    practicalSpecs: {
      doors: 4,
      passengers: 4,
      gear: "Automatic",
      luggages: 4,
      carType: "Super Sedan",
    },
    features: [
      "Frozen Deep Green Metallic with Gold Accents",
      "Individual M Carbon Bucket Seats Front & Rear",
      "M Carbon Ceramic Brakes with Red Calipers",
      "Yellow Racing Laser Light DRLs",
      "Harman Kardon Surround Audio",
      "Head-Up Display with M-Specific Views",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
  {
    id: "audi-rs-q8",
    name: "Audi RS Q8 Mansory Edition",
    brand: "Audi",
    model: "RS Q8",
    badge: "AUDI RS Q8",
    category: "Rent SUV Cars",
    tagline: "SUPERCAR PACE WRAPPED IN AN IMPOSING SUV BODY.",
    description:
      "Sharing its chassis and twin-turbo V8 powertrain with the Lamborghini Urus. The Audi RS Q8 combines 600 horsepower with quattro all-wheel drive, active roll stabilization, and four-wheel steering. Effortlessly blends family practicality with ferocious racetrack dynamics.",
    images: [audiRsQ8, mercedesG63Maybach, dubaiSuv],
    dailyRate: 1100,
    originalDailyRate: 1500,
    weeklyRate: 6800,
    monthlyRate: 22000,
    originalMonthlyRate: 32000,
    securityDeposit: 2000,
    minAge: 21,
    includedMileage: "250 KM / Day",
    location: "Downtown Dubai & Jumeirah",
    themeColor: "#E53E3E",
    specs: {
      engine: "4.0L Twin-Turbo V8 with Mild Hybrid",
      power: "600 PS / 591 HP",
      speed: "250 km/h (Optioned to 305 km/h)",
      accel: "0-100 km/h in 3.8s",
      gear: "8-Speed Tiptronic",
      weight: "2,315 kg",
      torque: "800 Nm @ 2,200-4,500 RPM",
    },
    practicalSpecs: {
      doors: 5,
      passengers: 5,
      gear: "Automatic",
      luggages: 4,
      carType: "High-Performance SUV",
    },
    features: [
      "Mansory Carbon Styling Body Aero",
      "Bang & Olufsen 3D Advanced Sound System",
      "Quattro Sport Differential with Torque Vectoring",
      "Adaptive RS Sport Air Suspension",
      "Valcona Leather RS Sport Perforated Seats",
      "Panoramic Sunroof & Soft-Close Doors",
    ],
    flashSale: {
      active: false,
      discountPercent: 0,
      badgeText: "",
    },
    featuredOnHome: true,
  },
];

/**
 * Returns all available fleet cars, incorporating any custom vehicles added via Admin in localStorage
 */
export const getAllCars = (): ProductCar[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("luxora_fleet_cars");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom admin cars with default fleet without duplicates
          const customCars: ProductCar[] = parsed.map((c: any) => ({
            id: c.id,
            name: c.name || `${c.brand} ${c.model}`,
            brand: c.brand || "Exotic",
            model: c.model || c.name,
            badge: (c.brand || "EXOTIC").toUpperCase(),
            category: c.category || "Rent Supercars",
            tagline: c.tagline || "VIP LUXURY CAR RENTAL DUBAI",
            description: c.description || "Premium luxury vehicle available in Dubai.",
            images: Array.isArray(c.images) && c.images.length > 0 ? c.images : [lamboHuracanTiffany],
            dailyRate: Number(c.dailyRate) || 1500,
            originalDailyRate: Number(c.originalDailyRate) || 2000,
            weeklyRate: Number(c.weeklyRate) || 9000,
            monthlyRate: Number(c.monthlyRate) || 30000,
            originalMonthlyRate: Number(c.originalMonthlyRate) || 45000,
            securityDeposit: Number(c.securityDeposit) || 3000,
            minAge: Number(c.minAge) || 21,
            includedMileage: c.includedMileage || "250 KM / Day",
            location: c.location || "Dubai Marina",
            themeColor: "#FFE600",
            specs: {
              engine: c.specs?.engine || "V8 Twin-Turbo",
              power: c.specs?.power || "600 PS",
              speed: c.specs?.speed || "300 km/h",
              accel: c.specs?.accel || "0-100 km/h in 3.5s",
              gear: c.specs?.gear || "Automatic Dual-Clutch",
              weight: c.specs?.weight || "1,600 kg",
              torque: c.specs?.torque || "700 Nm",
            },
            practicalSpecs: {
              doors: c.practicalSpecs?.doors || 2,
              passengers: c.practicalSpecs?.passengers || 2,
              gear: c.practicalSpecs?.gear || "Automatic",
              luggages: c.practicalSpecs?.luggages || 2,
              carType: c.category || "Luxury Vehicle",
            },
            features: Array.isArray(c.features) && c.features.length > 0 ? c.features : [
              "Comprehensive Insurance Included",
              "Free Dubai Delivery",
              "Apple CarPlay & Bluetooth",
              "24/7 VIP Concierge Support",
            ],
            flashSale: {
              active: Boolean(c.flashSale?.active),
              discountPercent: Number(c.flashSale?.discountPercent) || 0,
              badgeText: c.flashSale?.badgeText || "SPECIAL OFFER",
              dealPrice: Number(c.flashSale?.dealPrice) || Number(c.dailyRate),
            },
            featuredOnHome: c.featuredOnHome !== false,
          }));

          const existingIds = new Set(CARS_DATABASE.map((car) => car.id));
          const newCars = customCars.filter((car) => !existingIds.has(car.id));
          return [...CARS_DATABASE, ...newCars];
        }
      }
    } catch {
      // ignore
    }
  }
  return CARS_DATABASE;
};

/**
 * Finds a car by exact or normalized ID (e.g. "lambo-huracan-tiffany-card" matches "lambo-huracan-tiffany")
 */
export const getCarById = (id: string): ProductCar | undefined => {
  const all = getAllCars();
  const normalizedId = id.replace(/-card$/, "").toLowerCase();

  return (
    all.find((car) => car.id.toLowerCase() === id.toLowerCase()) ||
    all.find((car) => car.id.toLowerCase() === normalizedId) ||
    all.find((car) => car.id.toLowerCase().includes(normalizedId) || normalizedId.includes(car.id.toLowerCase()))
  );
};

/**
 * Returns related products from similar categories or brand
 */
export const getRelatedCars = (currentCarId: string, limit = 4): ProductCar[] => {
  const all = getAllCars();
  const current = getCarById(currentCarId);
  const normalizedCurrentId = currentCarId.replace(/-card$/, "").toLowerCase();

  const otherCars = all.filter(
    (car) => car.id.toLowerCase() !== normalizedCurrentId && car.id.toLowerCase() !== currentCarId.toLowerCase()
  );

  if (!current) {
    return otherCars.slice(0, limit);
  }

  // Prioritize cars of the same brand or category
  const sameCategoryOrBrand = otherCars.filter(
    (car) => car.category === current.category || car.brand === current.brand
  );

  const rest = otherCars.filter(
    (car) => car.category !== current.category && car.brand !== current.brand
  );

  return [...sameCategoryOrBrand, ...rest].slice(0, limit);
};
