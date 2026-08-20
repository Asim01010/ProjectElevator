// backend/models/fabricatorModel.js
import mongoose from "mongoose";

const fabricatorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  businessRegistrationNumber: { type: String, default: "" },
  taxId: { type: String, default: "" },
  address: {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    zipCode: { type: String, default: "" },
  },
  phone: { type: String, default: "" },
  website: { type: String, default: "" },
  specialties: [{
    type: String,
    enum: ["Elevator Manufacturing", "Custom Cabinets", "Glass Work", "Metal Fabrication", "Electrical", "Custom Design", "Other"],
  }],
  productionCapacity: { type: String, default: "" },
  certifications: [{ type: String }],
  yearsInBusiness: { type: Number, default: 0 },
  numberOfEmployees: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  verificationDocuments: [{ type: String }],
  averageResponseTime: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  totalProjectsCompleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Fabricator = mongoose.model("Fabricator", fabricatorSchema);
export default Fabricator;