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
  } from "./projectService";

  const initialState = {
    projects: [], // List of all user projects
    currentProject: null, // Selected project for detail view
    currentSubproject: null,
    projectLoading: false,
    projectError: false,
    projectSuccess: false,
    projectMessage: "",
  };

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
        return id; // Return ID for removal from state
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
        return subId; // Return subId for removal
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

  // Then in projectSlice.js - add thunk
  export const getSubprojectById = createAsyncThunk(
    "project/getSubprojectById",
    async (subprojectId, thunkAPI) => {
      try {
        return await getSubprojectByIdService(subprojectId);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
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
      },
      clearCurrentProject: (state) => {
        state.currentProject = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // 1. All specific fulfilled cases FIRST
        .addCase(createProject.fulfilled, (state, action) => {
          state.projectLoading = false;
          state.projectSuccess = true;
          state.projects.push(action.payload);
          state.currentProject = action.payload;
          state.projectMessage = "Project created successfully";
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
        // Then in extraReducers (add this case)
        .addCase(getSubprojectById.fulfilled, (state, action) => {
          state.projectLoading = false;
          state.projectSuccess = true;
          state.projectMessage = "Design loaded successfully";
          // Option A: Store in a new field (recommended for design page)
          state.currentSubproject = action.payload;
          // Option B: Or merge into currentProject.subprojects if you prefer (but Option A is cleaner)
        })

        // 2. THEN general matchers for pending & rejected (LAST)
        .addMatcher(
          (action) => action.type.endsWith("/pending"),
          (state) => {
            state.projectLoading = true;
            state.projectError = false;
            state.projectSuccess = false; // ← add this
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

  export const { projectReset, clearCurrentProject } = projectSlice.actions;
  export default projectSlice.reducer;
