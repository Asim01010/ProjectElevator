// backend/routes/fabricatorRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleWare.js";
import {
  getFabricatorDashboard,
  updateFabricatorProfile,
  getAssignedProjects,
} from "../controllers/fabricatorController.js";

const router = express.Router();

// All routes are protected (only logged-in fabricators can access)
router.use(protect);

// Dashboard
router.get("/dashboard", getFabricatorDashboard);

// Profile
router.get("/profile", (req, res) => {
  // For now, return basic user info. Later enhance with Fabricator model
  res.json({ success: true, user: req.user });
});
router.put("/profile", updateFabricatorProfile);

// Projects
router.get("/projects", getAssignedProjects);

export default router;