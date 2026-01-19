// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/registerModal.js";

export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the database (exclude password & OTP fields)
      req.user = await User.findById(decoded.id).select(
        "-password -otp -otpExpires"
      );

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Not authorized – user not found",
        });
      }

      // Optional: you can also check if user.isVerified === true here
      // if (!req.user.isVerified) {
      //   return res.status(401).json({ success: false, message: "Account not verified" });
      // }

      next(); // User is authenticated → proceed to controller
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({
        success: false,
        message: "Not authorized – invalid token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized – no token provided",
    });
  }
};
