// backend/controllers/fabricatorController.js
import Fabricator from "../models/fabricatorModel.js";
import Project from "../models/projectModel.js";

// Get Fabricator Dashboard
export const getFabricatorDashboard = async (req, res) => {
  try {
    const fabricator = await Fabricator.findOne({ user: req.user.id }).lean();

    if (!fabricator) {
      return res.status(404).json({ 
        success: false, 
        message: "Fabricator profile not found. Please update your profile first." 
      });
    }

    const assignedProjects = await Project.find({}).limit(5).lean();

    res.status(200).json({
      success: true,
      dashboard: {
        profile: fabricator,
        stats: {
          totalProjects: assignedProjects.length,
          pendingQuotes: 0,
          activeProductions: 0,
        },
        recentProjects: assignedProjects,
      }
    });
  } catch (error) {
    console.error("Fabricator dashboard error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create or Update Fabricator Profile
// Create or Update Fabricator Profile
export const updateFabricatorProfile = async (req, res) => {
  try {
    const fabricatorData = req.body;

    let fabricator = await Fabricator.findOne({ user: req.user.id });

    if (fabricator) {
      Object.assign(fabricator, fabricatorData);
      await fabricator.save();
    } else {
      fabricator = new Fabricator({
        user: req.user.id,
        ...fabricatorData,
      });
      await fabricator.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      fabricator,
    });
  } catch (error) {
    console.error("Update fabricator profile error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get Assigned Projects
export const getAssignedProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate("user", "firstName lastName company email")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Get assigned projects error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};