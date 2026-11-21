import mongoose from "mongoose";

const CarSpecsSchema = new mongoose.Schema({
  engine: { type: String, default: "" },
  power: { type: String, default: "" },
  speed: { type: String, default: "" },
  accel: { type: String, default: "" },
  gear: { type: String, default: "" },
  weight: { type: String, default: "" },
}, { _id: false });

const FlashSaleSchema = new mongoose.Schema({
  active: { type: Boolean, default: false },
  discountPercent: { type: Number, default: 0 },
  dealPrice: { type: Number },
  badgeText: { type: String, default: "" },
  endsAt: { type: Date }
}, { _id: false });

const CarSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  dailyRate: { type: Number, required: true },
  originalDailyRate: { type: Number },
  weeklyRate: { type: Number },
  monthlyRate: { type: Number },
  originalMonthlyRate: { type: Number },
  images: [{ type: String }],
  description: { type: String, default: "" },
  specs: { type: CarSpecsSchema, default: () => ({}) },
  features: [{ type: String }],
  flashSale: { type: FlashSaleSchema, default: () => ({ active: false, discountPercent: 0 }) },
  featuredOnHome: { type: Boolean, default: true }, // Select whether to show on Home Page
}, {
  timestamps: true
});

export const Car = mongoose.model("Car", CarSchema);
