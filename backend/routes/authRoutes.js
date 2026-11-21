import express from "express";
import { loginAdmin, verifyAdminSession } from "../controllers/authController.js";
import { protectAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/verify", protectAdmin, verifyAdminSession);

export default router;
