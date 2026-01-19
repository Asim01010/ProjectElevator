// src/redux/features/Register/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../Register/registerSlice";

import {
  getProfileService,
  updateProfileService,
  changePasswordService,
} from "../Register/registerService";

const initialState = {
  user: null,
  profileLoading: false,
  profileError: false,
  profileSuccess: false,
  profileMessage: "",
};

export const getUserProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getProfileService();
      if (!response?._id) {
        throw new Error("No valid user data returned from server");
      }
      thunkAPI.dispatch(setUser(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to load profile",
      );
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      const response = await updateProfileService(profileData);
      if (!response?._id) {
        throw new Error("No valid updated user data returned");
      }
      thunkAPI.dispatch(setUser(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Profile update failed");
    }
  },
);

export const changeUserPassword = createAsyncThunk(
  "profile/changePassword",
  async (passwordData, thunkAPI) => {
    try {
      const response = await changePasswordService(passwordData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Password change failed",
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileReset: (state) => {
      state.profileLoading = false;
      state.profileError = false;
      state.profileSuccess = false;
      state.profileMessage = "";
      // We do NOT clear user here — keep it until logout
    },
    clearProfile: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET PROFILE
      .addCase(getUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = false;
        state.profileMessage = "";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
        state.profileSuccess = true;
        state.profileMessage = "Profile loaded successfully";
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = true;
        state.profileMessage = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = false;
        state.profileMessage = "";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
        state.profileSuccess = true;
        state.profileMessage = "Profile updated successfully";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = true;
        state.profileMessage = action.payload;
      })

      // CHANGE PASSWORD
      .addCase(changeUserPassword.pending, (state) => {
        state.profileLoading = true;
        state.profileError = false;
        state.profileMessage = "";
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.profileLoading = false;
        state.profileSuccess = true;
        state.profileMessage = "Password changed successfully";
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = true;
        state.profileMessage = action.payload;
      });
  },
});

export const { profileReset, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
