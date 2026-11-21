import jwt from "jsonwebtoken";

const DEMO_EMAIL = process.env.ADMIN_EMAIL || "admin@luxoradrive.com";
const DEMO_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "luxora_super_secret_jwt_token_2026";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const token = jwt.sign(
        { email: DEMO_EMAIL, role: "Super Admin" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          email: DEMO_EMAIL,
          role: "Fleet Director & Super Admin",
          name: "Luxora Master Admin"
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: `Invalid credentials. Please use demo email: ${DEMO_EMAIL} and password: ${DEMO_PASSWORD}`
    });
  } catch (err) {
    console.error("[Login Error]:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyAdminSession = async (req, res) => {
  return res.json({ success: true, admin: req.admin });
};
