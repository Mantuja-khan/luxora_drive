import jwt from "jsonwebtoken";

export const protectAdmin = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Authorization denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "luxora_super_secret_jwt_token_2026");
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
