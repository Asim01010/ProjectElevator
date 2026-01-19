// src/redux/features/Register/registerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regUserService, {
  loginUserService,
  verifyOTPService,
  resendOTPService,
} from "./registerService";

// Helper to safely read user from localStorage
const getStoredUser = () => {
  const stored = localStorage.getItem("userInfo");
  if (!stored || stored === "undefined") {
    return null;
  }
  try {
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (err) {
    console.warn("Invalid userInfo in localStorage → removing", err);
    localStorage.removeItem("userInfo");
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  userLoading: false,
  userError: false,
  userSuccess: false,
  userMessage: "",
};

// ─── Thunks ──────────────────────────────────────────────────────────────

export const regUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await regUserService(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, thunkAPI) => {
    try {
      return await loginUserService(loginData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

export const verifyUserOtp = createAsyncThunk(
  "user/verifyOtp",
  async (otpData, thunkAPI) => {
    try {
      return await verifyOTPService(otpData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "OTP verification failed"
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "user/resendOtp",
  async (email, thunkAPI) => {
    try {
      return await resendOTPService(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Resend OTP failed");
    }
  }
);

// ─── Slice ───────────────────────────────────────────────────────────────

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    userReset: (state, action) => {
      const resetUserOnly = action.payload?.resetUserOnly ?? false;
      state.userLoading = false;
      state.userError = false;
      state.userSuccess = false;
      state.userMessage = "";

      if (!resetUserOnly) {
        state.user = null;
        localStorage.removeItem("userInfo");
      }
    },

    setUser: (state, action) => {
      // Prevent saving undefined / invalid data
      if (!action.payload || typeof action.payload !== "object") {
        console.warn(
          "setUser called with invalid payload → ignored",
          action.payload
        );
        return;
      }
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(regUser.pending, (state) => {
        state.userLoading = true;
        state.userError = false;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userError = false;

        const userData = action.payload.user || {
          _id: action.payload.userId,
          email: action.payload.email,
        };

        if (userData?._id) {
          state.user = userData;
          localStorage.setItem("userInfo", JSON.stringify(userData));
        }

        state.userMessage =
          action.payload.message || "User registered successfully!";
      })
      .addCase(regUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })

      // LOGIN
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userError = false;

        if (action.payload?.user?._id) {
          state.user = action.payload.user;
          localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.token);
        }

        state.userMessage =
          action.payload?.message || "User logged in successfully!";
      })

      // VERIFY OTP
      .addCase(verifyUserOtp.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userError = false;

        if (action.payload?.user?._id) {
          state.user = action.payload.user;
          localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.token);
        }

        state.userMessage = action.payload?.message || "OTP Verified!";
      })

      // RESEND OTP (no user change)
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userMessage =
          action.payload?.message || "OTP resent successfully!";
      })

      // common error/pending cases for other thunks...
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.userLoading = true;
          state.userError = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.userLoading = false;
          state.userError = true;
          state.userMessage = action.payload || "Operation failed";
        }
      );
  },
});

export const { userReset, setUser } = registerSlice.actions;
export default registerSlice.reducer;
