// backend/routes/userRoute.js
import express from "express";
import {
  registerUser,
  loginUser,
  resendOTP,
  verifyOTP,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleWare.js";
import { changePassword, getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp/:userId", verifyOTP);
router.post("/resend-otp", resendOTP);
// ─── Protected profile routes ───
// All routes below this line require authentication
router.get("/profile", protect, getProfile);
router.patch("/profile", protect, updateProfile);
router.patch("/change-password", protect, changePassword);
export default router;
