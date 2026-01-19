// backend/routes/projectRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleWare.js";
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
  duplicateProject,
  addSubproject,
  updateSubproject,
  deleteSubproject,
  duplicateSubproject,
} from "../controllers/projectController.js";

const router = express.Router();

// Project routes
router.route("/").post(protect, createProject).get(protect, getUserProjects);

router
  .route("/:id")
  .get(protect, getProjectById)
  .patch(protect, updateProject)
  .delete(protect, deleteProject);

router.post("/:id/duplicate", protect, duplicateProject);

// Subproject routes
router.post("/:id/subprojects", protect, addSubproject);

router
  .route("/:id/subprojects/:subId")
  .patch(protect, updateSubproject)
  .delete(protect, deleteSubproject);

router.post("/:id/subprojects/:subId/duplicate", protect, duplicateSubproject);

export default router;
