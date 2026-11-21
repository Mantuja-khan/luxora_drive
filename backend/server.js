import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB
connectDB();

// API Health Check
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Luxora Drive Supercars Backend API & MongoDB Service",
    endpoints: {
      auth: "/api/auth/login",
      cars: "/api/cars",
      flashSaleFilter: "/api/cars?flashOnly=true",
      homeFeaturedFilter: "/api/cars?homeOnly=true"
    }
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("[Backend Error]:", err);
  res.status(500).json({ success: false, message: err.message || "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚗 Luxora Drive Backend Server running on port ${PORT}`);
  console.log(`📦 MongoDB Database: ${process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/luxoradrive"}`);
  console.log(`🔐 Admin Login Demo: ${process.env.ADMIN_EMAIL || "admin@luxoradrive.com"} / ${process.env.ADMIN_PASSWORD || "admin123"}`);
  console.log(`=======================================================`);
});
