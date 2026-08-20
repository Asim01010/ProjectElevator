import jwt from "jsonwebtoken"; // ← ADD THIS LINE if missing
import User from "../models/registerModal.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // ← now jwt exists

      req.user = await User.findById(decoded.id).select(
        "-password -otp -otpExpires",
      );

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized – user not found",
        });
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error.name || error.message);

      // Optional: more specific messages
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token expired" });
      }
      if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }

      return res.status(401).json({
        success: false,
        message: "Not authorized – token verification failed",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized – no token provided",
    });
  }
};