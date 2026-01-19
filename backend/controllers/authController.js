// backend/controllers/userController.js
import User from "../models/registerModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Helper: Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Create Nodemailer transporter (only once, better to move to separate file in production)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password if using Gmail
    },
  });
};

/**
 * STEP 1: Register + send OTP
 * POST /api/users/register
 * Body: { email, password, confirmPassword }
 */
export const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // 1. Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, password and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // Optional: you can allow re-sending OTP if not verified
      if (!userExists.isVerified) {
        return res.status(400).json({
          success: false,
          message:
            "This email is already registered but not verified. Please verify your account.",
          email,
        });
      }
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Generate OTP
    const otp = generateOTP();

    // 5. Create user (unverified)
    const user = await User.create({
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
      isVerified: false,
    });

    // 6. Send OTP email
    const transporter = createTransporter();

    const mailOptions = {
      from: `"ShopHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your ShopHub Verification Code",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 520px; margin: 0 auto; padding: 30px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #4f46e5; text-align: center;">Verify Your Email</h2>
          <p style="font-size: 16px; color: #374151; text-align: center;">
            Use the code below to verify your ShopHub account:
          </p>
          
          <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; text-align: center; margin: 30px 0; color: #ffffff; background: linear-gradient(90deg, #4f46e5, #7c3aed); padding: 16px 24px; border-radius: 12px;">
            ${otp}
          </div>
          
          <p style="color: #6b7280; text-align: center; font-size: 14px;">
            This code will expire in <strong>10 minutes</strong>.
          </p>
          
          <p style="color: #6b7280; text-align: center; font-size: 14px; margin-top: 24px;">
            If you didn't request this code, please ignore this email.
          </p>
          
          <div style="text-align: center; margin-top: 32px; color: #9ca3af; font-size: 13px;">
            © ${new Date().getFullYear()} ShopHub
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 7. Response (do NOT send token yet — user must verify first)
    res.status(201).json({
      success: true,
      message:
        "Registration successful! Please check your email for verification code.",
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

/**
 * Login User
 * POST /api/users/login
 * Body: { email, password }
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Account not verified. Please verify your email.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

/**
 * STEP 2: Verify OTP
 * POST /api/users/verify-otp/:userId
 * Body: { otp }
 */
export const verifyOTP = async (req, res) => {
  try {
    const { userId } = req.params;
    const { otp } = req.body;

    if (!otp || otp.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 6-digit OTP",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified",
      });
    }

    if (!user.otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired or is invalid. Please register again.",
      });
    }

    // To (recommended):
    if (String(user.otp) !== String(otp).trim()) {
      return res.status(400).json({
        success: false,
        message: "Incorrect OTP. Please check and try again.",
      });
    }

    // Success → verify user & clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Now generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Account verified successfully!",
      token,
      user: {
        _id: user._id,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};

/**
 * Optional: Resend OTP
 * POST /api/users/resend-otp
 * Body: { email }
 */
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"ShopHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 New Verification Code",
      html: `Your new verification code is: <h2>${otp}</h2><p>Expires in 10 minutes.</p>`,
    });

    res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to resend OTP" });
  }
};
