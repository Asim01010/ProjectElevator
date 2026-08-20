// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

// Existing reducers (auth + profile)
import registerReducer from "../features/Register/registerSlice";
import profileReducer from "../features/Register/profileSlice";

// New project reducer
import projectReducer from "../features/Project/projectSlice";

export const store = configureStore({
  reducer: {
    // Authentication & user registration flow
    register: registerReducer,

    // User profile (edit, password change, etc.)
    profile: profileReducer,

    // Projects & sub-projects (new feature)
    project: projectReducer,
  },

  // Optional: good defaults for most apps
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable serializable check → useful when working with Dates, MongoDB _id, etc.
      serializableCheck: false,
    }),

});

export default store;
