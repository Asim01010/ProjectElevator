// backend/models/projectModel.js
import mongoose from "mongoose";

const subprojectSchema = new mongoose.Schema({
  elevatorName: {
    type: String,
    required: true,
    default: "New Elevator",
  },
  configuration: {
    type: String,
    default: "",
  },
  frameStyle: {
    type: String,
    default: "",
  },
  lightplane: {
    panelA: { type: String, default: "" },
    panelB: { type: String, default: "" },
  },
  dimensions: {
    d1: { type: Number, default: 0 },
    w1: { type: Number, default: 0 },
    h1: { type: Number, default: 0 },
    h2: { type: Number, default: 0 },
  },
  openingOption: {
    type: String,
    required: true,
    default: "Front",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  jobType: {
    type: String,
    default: "",
  },
  elevatorType: {
    type: String,
    default: "",
  },
  shellMaterial: {
    type: String,
    default: "",
  },
  manufacturer: {
    type: String,
    default: "",
  },
  comments: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "In Progress",
    enum: ["In Progress", "Complete"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  specifier: {
    type: String,
    default: "",
  },
  jobLocation: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  subprojects: [subprojectSchema],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
