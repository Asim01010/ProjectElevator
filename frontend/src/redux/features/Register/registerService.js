// src/redux/features/Register/registerService.js
import axios from "axios";

const BASE_URL = ""; // local development → direct backend

const API_URL = `${BASE_URL}/api/users/`;

// ─── AUTH SERVICES ───

// REGISTER
export const registerUserService = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);

    if (response.data?.user) {
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again.",
    );
  }
};

// LOGIN USER
export const loginUserService = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}login`, loginData);

    if (response.data) {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token); // ← VERY IMPORTANT
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again.",
    );
  }
};

// VERIFY OTP
export const verifyOTPService = async (otpData) => {
  try {
    const response = await axios.post(`${API_URL}verify-otp/${otpData?.id}`, {
      otp: otpData.otp,
    });

    if (response.data) {
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token); // ← VERY IMPORTANT
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "OTP verification failed.",
    );
  }
};

// RESEND OTP
export const resendOTPService = async (email) => {
  try {
    const response = await axios.post(`${API_URL}resend-otp`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to resend OTP.");
  }
};

// ─── PROFILE SERVICES ───

export const getProfileService = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${API_URL}profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

export const updateProfileService = async (profileData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.patch(`${API_URL}profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile",
    );
  }
};

export const changePasswordService = async ({ oldPassword, newPassword }) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.patch(
      `${API_URL}change-password`,
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to change password",
    );
  }
};

// Optional: if you still want to keep the default export
export default registerUserService;