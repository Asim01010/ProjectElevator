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

  // 🔥 Role (Core for ecosystem)
  role: {
    type: String,
    enum: ["user", "fabricator", "supplier"],
    default: "user",
    required: true,
  },

  // Profile Fields (Shared by all roles)
  firstName: { type: String, trim: true, default: "" },
  lastName: { type: String, trim: true, default: "" },
  company: { type: String, trim: true, default: "" },
  jobTitle: { type: String, trim: true, default: "" },
  country: { type: String, trim: true, default: "" },
  city: { type: String, trim: true, default: "" },
  zipCode: { type: String, trim: true, default: "" },
  phone: { type: String, trim: true, default: "" },
  profileImage: { type: String, default: "" },

  // Role-specific extra fields (optional)
  fabricatorSpecialty: { type: String, default: "" },   // e.g., "Elevator Manufacturing"
  supplierCategories: [{ type: String }],               // e.g., ["Motors", "Cables", "Glass"]

  isVerified: { type: Boolean, default: false },
  otp: { type: Number },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);