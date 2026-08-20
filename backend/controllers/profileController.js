// backend/controllers/profileController.js
import User from "../models/registerModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // if needed later
import dotenv from "dotenv";

dotenv.config();

// ───────────────────────────────────────────────────────────────
// Middleware to protect these routes (you can move it to middleware folder later)
// For now we can use it inside controllers or create separate auth middleware
// ───────────────────────────────────────────────────────────────

/**
 * GET /api/users/profile
 * Get current user's profile data
 * Protected route
 */
export const getProfile = async (req, res) => {
  try {
    // req.user will be set by auth middleware (we'll add later)
    const user = await User.findById(req.user.id).select(
      "-password -otp -otpExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        jobTitle: user.jobTitle,
        country: user.country,
        city: user.city,
        zipCode: user.zipCode,
        phone: user.phone,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PATCH /api/users/profile
 * Update profile fields (firstName, lastName, company, etc.)
 * Protected route
 */
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body; // { firstName, lastName, company, ... }

    // Optional: validate allowed fields
    const allowedUpdates = [
      "firstName",
      "lastName",
      "company",
      "jobTitle",
      "country",
      "city",
      "zipCode",
      "phone",
    ];
    const isValidUpdate = Object.keys(updates).every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidUpdate) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields in update request",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password -otp -otpExpires");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * PATCH /api/users/change-password
 * Change password (requires old password)
 * Protected route
 */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new password are required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ───────────────────────────────────────────────────────────────
// Profile image upload will come next (needs multer/cloudinary)
// We'll add it in the next step
// ───────────────────────────────────────────────────────────────
