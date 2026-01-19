// backend/models/registerModal.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ────── NEW PROFILE FIELDS (added safely) ──────
  firstName: {
    type: String,
    trim: true,
    default: "", // Empty by default – no impact on registration
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
  },
  company: {
    type: String,
    trim: true,
    default: "",
  },
  jobTitle: {
    type: String,
    trim: true,
    default: "",
  },
  country: {
    type: String,
    trim: true,
    default: "",
  },
  city: {
    type: String,
    trim: true,
    default: "",
  },
  zipCode: {
    type: String,
    trim: true,
    default: "",
  },
  phone: {
    type: String,
    trim: true,
    default: "",
  },
  profileImage: {
    type: String,
    default: "", // Will store URL (e.g., Cloudinary link) later
  },
  // ────────────────────────────────────────────────
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
  },
  otpExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
