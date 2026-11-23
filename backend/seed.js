import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { Car } from "./models/Car.js";

const sampleFleet = [
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
    description: "The ultimate track weapon for Dubai highways. Featuring active rear aero wing and naturally aspirated flat-six engine.",
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
      "Porsche Ceramic Composite Brakes (PCCB)"
    ],
    flashSale: {
      active: true,
      discountPercent: 23,
      dealPrice: 1850,
      badgeText: "23% OFF FLASH DEAL"
    },
    featuredOnHome: true
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
    description: "Pure motorsport DNA for road superiority. Full carbon fiber body and shark fin aero.",
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
      "Telemetry System"
    ],
    flashSale: {
      active: true,
      discountPercent: 25,
      dealPrice: 2100,
      badgeText: "25% FLASH SALE"
    },
    featuredOnHome: true
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
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The pinnacle of ultra-luxury SUVs featuring starlight headliner and individual massage rear seating.",
    specs: {
      engine: "6.75L Twin-Turbo V12",
      power: "600 PS / 592 HP",
      speed: "250 km/h",
      accel: "0-100 km/h in 4.9s",
      gear: "8-Speed Auto",
      weight: "2,660 kg"
    },
    features: [
      "Shooting Star Headliner",
      "Rear Lounge Massage Seats",
      "Champagne Chiller"
    ],
    flashSale: {
      active: true,
      discountPercent: 24,
      dealPrice: 2600,
      badgeText: "VIP FLASH DEAL"
    },
    featuredOnHome: true
  }
];

const seedData = async () => {
  await connectDB();
  console.log("[Seeder] Clearing old records...");
  await Car.deleteMany({});
  console.log("[Seeder] Inserting sample fleet with Flash Sale & Home showcase...");
  await Car.insertMany(sampleFleet);
  console.log(`[Seeder] Seeded ${sampleFleet.length} supercars successfully into MongoDB.`);
  process.exit(0);
};

seedData().catch((err) => {
  console.error("[Seeder Error]:", err);
  process.exit(1);
});
