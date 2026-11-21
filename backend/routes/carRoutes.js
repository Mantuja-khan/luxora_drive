import express from "express";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  toggleFlashSale,
  toggleFeaturedHome
} from "../controllers/carController.js";
import { protectAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getCars);
router.get("/:id", getCarById);

// Protected Admin routes
router.post("/", protectAdmin, createCar);
router.put("/:id", protectAdmin, updateCar);
router.delete("/:id", protectAdmin, deleteCar);
router.patch("/:id/flash-sale", protectAdmin, toggleFlashSale);
router.patch("/:id/featured", protectAdmin, toggleFeaturedHome);

export default router;
