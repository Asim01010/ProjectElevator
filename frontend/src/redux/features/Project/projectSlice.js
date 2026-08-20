// src/redux/features/Project/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProjectService,
  getUserProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
  duplicateProjectService,
  addSubprojectService,
  updateSubprojectService,
  deleteSubprojectService,
  duplicateSubprojectService,
  getSubprojectByIdService,
  saveDesignStateService, // ✅ NEW
  loadDesignStateService, // ✅ NEW
} from "./projectService";

const initialState = {
  projects: [],
  currentProject: null,
  currentSubproject: null,
  currentDesignState: null, // ✅ NEW: Store current design state
  lastCreatedSubprojectId: null, // ✅ NEW
  projectLoading: false,
  projectError: false,
  projectSuccess: false,
  projectMessage: "",
};

// ... (keep all existing thunks)

// ✅ NEW: Save design state thunk
export const saveDesignState = createAsyncThunk(
  "project/saveDesignState",
  async ({ projectId, subprojectId, designState }, thunkAPI) => {
    try {
      return await saveDesignStateService(projectId, subprojectId, designState);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// ✅ NEW: Load design state thunk
export const loadDesignState = createAsyncThunk(
  "project/loadDesignState",
  async ({ projectId, subprojectId }, thunkAPI) => {
    try {
      return await loadDesignStateService(projectId, subprojectId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const createProject = createAsyncThunk(
  "project/create",
  async (projectData, thunkAPI) => {
    try {
      return await createProjectService(projectData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getUserProjects = createAsyncThunk(
  "project/getAll",
  async (params, thunkAPI) => {
    try {
      return await getUserProjectsService(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getProjectById = createAsyncThunk(
  "project/getById",
  async (id, thunkAPI) => {
    try {
      return await getProjectByIdService(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateProject = createAsyncThunk(
  "project/update",
  async ({ id, projectData }, thunkAPI) => {
    try {
      return await updateProjectService(id, projectData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteProject = createAsyncThunk(
  "project/delete",
  async (id, thunkAPI) => {
    try {
      await deleteProjectService(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const duplicateProject = createAsyncThunk(
  "project/duplicate",
  async ({ id, newName }, thunkAPI) => {
    try {
      return await duplicateProjectService(id, { newName });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addSubproject = createAsyncThunk(
  "project/addSub",
  async ({ projectId, subData }, thunkAPI) => {
    try {
      return await addSubprojectService(projectId, subData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateSubproject = createAsyncThunk(
  "project/updateSub",
  async ({ projectId, subId, subData }, thunkAPI) => {
    try {
      return await updateSubprojectService(projectId, subId, subData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteSubproject = createAsyncThunk(
  "project/deleteSub",
  async ({ projectId, subId }, thunkAPI) => {
    try {
      await deleteSubprojectService(projectId, subId);
      return subId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const duplicateSubproject = createAsyncThunk(
  "project/duplicateSub",
  async ({ projectId, subId, newElevatorName }, thunkAPI) => {
    try {
      return await duplicateSubprojectService(projectId, subId, {
        newElevatorName,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getSubprojectById = createAsyncThunk(
  "project/getSubprojectById",
  async (subprojectId, thunkAPI) => {
    try {
      return await getSubprojectByIdService(subprojectId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectReset: (state) => {
      state.projectLoading = false;
      state.projectError = false;
      state.projectSuccess = false;
      state.projectMessage = "";
      state.lastCreatedSubprojectId = null; // ✅ clear
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    // ✅ NEW: Clear design state
    clearDesignState: (state) => {
      state.currentDesignState = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        state.projects.push(action.payload);
        state.currentProject = action.payload;
        state.projectMessage = "Project created successfully";
        // ✅ first auto-created subproject
  const firstSub = action.payload?.subprojects?.[0];
  state.lastCreatedSubprojectId = firstSub?._id ?? null;
      })

      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        state.projects = action.payload;
        state.projectMessage = "Projects loaded successfully";
      })

      .addCase(getProjectById.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        state.currentProject = action.payload;
        state.projectMessage = "Project loaded successfully";
      })

      .addCase(updateProject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        const index = state.projects.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) state.projects[index] = action.payload;
        state.currentProject = action.payload;
        state.projectMessage = "Project updated successfully";
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        state.projects = state.projects.filter((p) => p._id !== action.payload);
        if (state.currentProject?._id === action.payload)
          state.currentProject = null;
        state.projectMessage = "Project deleted successfully";
      })

      .addCase(duplicateProject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        state.projects.push(action.payload);
        state.currentProject = action.payload;
        state.projectMessage = "Project duplicated successfully";
      })

      .addCase(addSubproject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        if (state.currentProject) {
          state.currentProject.subprojects.push(action.payload);
        }
        state.projectMessage = "Subproject added successfully";
      })

      .addCase(updateSubproject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        if (state.currentProject) {
          const subIndex = state.currentProject.subprojects.findIndex(
            (s) => s._id === action.payload._id,
          );
          if (subIndex !== -1)
            state.currentProject.subprojects[subIndex] = action.payload;
        }
        state.projectMessage = "Subproject updated successfully";
      })

      .addCase(deleteSubproject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        if (state.currentProject) {
          state.currentProject.subprojects =
            state.currentProject.subprojects.filter(
              (s) => s._id !== action.payload,
            );
        }
        state.projectMessage = "Subproject deleted successfully";
      })

      .addCase(duplicateSubproject.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        if (state.currentProject) {
          state.currentProject.subprojects.push(action.payload);
        }
        state.projectMessage = "Subproject duplicated successfully";
      })

      .addCase(getSubprojectById.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        state.projectMessage = "Design loaded successfully";
        state.currentSubproject = action.payload;
      })

      // ✅ NEW: Save design state cases
      .addCase(saveDesignState.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        state.currentDesignState = action.payload.designState;
        state.projectMessage = "Design saved successfully";
      })

      // ✅ NEW: Load design state cases
      .addCase(loadDesignState.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.projectSuccess = true;
        state.currentDesignState = action.payload;
        state.projectMessage = "Design loaded successfully";
      })

      // General matchers
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.projectLoading = true;
          state.projectError = false;
          state.projectSuccess = false;
          state.projectMessage = "";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.projectLoading = false;
          state.projectError = true;
          state.projectMessage = action.payload || "Operation failed";
        },
      );
  },
});

export const { projectReset, clearCurrentProject, clearDesignState } =
  projectSlice.actions;
export default projectSlice.reducer;
