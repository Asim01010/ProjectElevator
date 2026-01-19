// backend/controllers/projectController.js
import Project from "../models/projectModel.js";

// Create a new project (POST /api/projects)
export const createProject = async (req, res) => {
  try {
    const { name, company } = req.body;

    if (!name || !company) {
      return res.status(400).json({
        success: false,
        message: "Project name and company are required",
      });
    }

    const project = await Project.create({
      user: req.user.id,
      name,
      company,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during project creation",
    });
  }
};

// Get all projects for the current user (GET /api/projects?search=...&sort=...)
export const getUserProjects = async (req, res) => {
  try {
    const query = { user: req.user.id };

    // Search by name (case-insensitive)
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    // Sorting
    let sort = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === "az") {
      sort = { name: 1 }; // A-Z
    } else if (req.query.sort === "za") {
      sort = { name: -1 }; // Z-A (if ↑↓ means ascending/descending, you can adjust)
    } else if (req.query.sort === "date") {
      sort = { createdAt: -1 };
    } else if (req.query.sort === "custom") {
      // Implement custom sort if needed, e.g., by progress or something; for now, default
      sort = { updatedAt: -1 };
    }

    const projects = await Project.find(query).sort(sort);

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching projects",
    });
  }
};

// Get single project by ID (GET /api/projects/:id)
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching project",
    });
  }
};

// Update project details (PATCH /api/projects/:id)
export const updateProject = async (req, res) => {
  try {
    const updates = req.body; // e.g., { name, company, specifier, jobLocation }

    const allowedUpdates = ["name", "company", "specifier", "jobLocation"];
    const isValid = Object.keys(updates).every((key) =>
      allowedUpdates.includes(key),
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid update fields",
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    Object.assign(project, updates);
    project.updatedAt = Date.now();
    await project.save();

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating project",
    });
  }
};

// Delete project (DELETE /api/projects/:id)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting project",
    });
  }
};

// Duplicate project (POST /api/projects/:id/duplicate)
export const duplicateProject = async (req, res) => {
  try {
    const { newName } = req.body;

    if (!newName) {
      return res.status(400).json({
        success: false,
        message: "New project name required",
      });
    }

    const original = await Project.findById(req.params.id);

    if (!original || original.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    const duplicate = new Project({
      user: req.user.id,
      name: newName,
      company: original.company,
      specifier: original.specifier,
      jobLocation: original.jobLocation,
      subprojects: original.subprojects.map((sub) => ({
        ...sub.toObject(),
        _id: undefined,
      })),
    });

    await duplicate.save();

    res.status(201).json({
      success: true,
      project: duplicate,
    });
  } catch (error) {
    console.error("Duplicate project error:", error);
    res.status(500).json({
      success: false,
      message: "Server error duplicating project",
    });
  }
};

// Add new subproject (POST /api/projects/:id/subprojects)
export const addSubproject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    // Default new subproject; can override with req.body if provided
    const newSub = {
      ...req.body, // Allow overriding defaults
    };

    project.subprojects.push(newSub);
    project.updatedAt = Date.now();
    await project.save();

    res.status(201).json({
      success: true,
      subproject: project.subprojects[project.subprojects.length - 1],
    });
  } catch (error) {
    console.error("Add subproject error:", error);
    res.status(500).json({
      success: false,
      message: "Server error adding subproject",
    });
  }
};

// Update subproject (PATCH /api/projects/:id/subprojects/:subId)
export const updateSubproject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    const subproject = project.subprojects.id(req.params.subId);

    if (!subproject) {
      return res.status(404).json({
        success: false,
        message: "Subproject not found",
      });
    }

    // Update allowed fields
    const updates = req.body;
    const allowed = [
      "elevatorName",
      "configuration",
      "frameStyle",
      "lightplane",
      "dimensions",
      "openingOption",
      "quantity",
      "jobType",
      "elevatorType",
      "shellMaterial",
      "manufacturer",
      "comments",
      "status",
    ];
    const isValid = Object.keys(updates).every((key) => allowed.includes(key));

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid update fields for subproject",
      });
    }

    Object.assign(subproject, updates);
    subproject.updatedAt = Date.now();
    project.updatedAt = Date.now();
    await project.save();

    res.status(200).json({
      success: true,
      subproject,
    });
  } catch (error) {
    console.error("Update subproject error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating subproject",
    });
  }
};

// Delete subproject (DELETE /api/projects/:id/subprojects/:subId)
export const deleteSubproject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    const subproject = project.subprojects.id(req.params.subId);

    if (!subproject) {
      return res.status(404).json({
        success: false,
        message: "Subproject not found",
      });
    }

    subproject.deleteOne();
    project.updatedAt = Date.now();
    await project.save();

    res.status(200).json({
      success: true,
      message: "Subproject deleted successfully",
    });
  } catch (error) {
    console.error("Delete subproject error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting subproject",
    });
  }
};

// Duplicate subproject (POST /api/projects/:id/subprojects/:subId/duplicate)
export const duplicateSubproject = async (req, res) => {
  try {
    const { newElevatorName } = req.body;

    if (!newElevatorName) {
      return res.status(400).json({
        success: false,
        message: "New elevator name required",
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project || project.user.toString() !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied",
      });
    }

    const originalSub = project.subprojects.id(req.params.subId);

    if (!originalSub) {
      return res.status(404).json({
        success: false,
        message: "Subproject not found",
      });
    }

    const duplicateSub = {
      ...originalSub.toObject(),
      _id: undefined,
      elevatorName: newElevatorName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    project.subprojects.push(duplicateSub);
    project.updatedAt = Date.now();
    await project.save();

    res.status(201).json({
      success: true,
      subproject: project.subprojects[project.subprojects.length - 1],
    });
  } catch (error) {
    console.error("Duplicate subproject error:", error);
    res.status(500).json({
      success: false,
      message: "Server error duplicating subproject",
    });
  }
};
