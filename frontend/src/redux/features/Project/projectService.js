// src/redux/features/Project/projectService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";
const API_URL = `${BASE_URL}/api/projects/`;
console.log("API URL being used:", import.meta.env.VITE_API_URL);
// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// ... (keep all existing services)

// ✅ NEW: Save design state to backend
export const saveDesignStateService = async (
  projectId,
  subprojectId,
  designState,
) => {
  try {
    const response = await axios.patch(
      `${API_URL}${projectId}/subprojects/${subprojectId}/design-state`,
      { designState },
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to save design state",
    );
  }
};

// ✅ NEW: Load design state from backend
export const loadDesignStateService = async (projectId, subprojectId) => {
  try {
    const response = await axios.get(
      `${API_URL}${projectId}/subprojects/${subprojectId}/design-state`,
      getAuthHeaders(),
    );
    return response.data.designState;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to load design state",
    );
  }
};

// Create new project
export const createProjectService = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData, getAuthHeaders());
    return response.data.project;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create project",
    );
  }
};

// Get all user projects (with optional search/sort)
export const getUserProjectsService = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, {
      ...getAuthHeaders(),
      params,
    });
    return response.data.projects;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch projects",
    );
  }
};

// Get single project by ID
export const getProjectByIdService = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`, getAuthHeaders());
    return response.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch project");
  }
};

// Update project
export const updateProjectService = async (id, projectData) => {
  try {
    const response = await axios.patch(
      `${API_URL}${id}`,
      projectData,
      getAuthHeaders(),
    );
    return response.data.project;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update project",
    );
  }
};

// Delete project
export const deleteProjectService = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete project",
    );
  }
};

// Duplicate project
export const duplicateProjectService = async (id, { newName }) => {
  try {
    const response = await axios.post(
      `${API_URL}${id}/duplicate`,
      { newName },
      getAuthHeaders(),
    );
    return response.data.project;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to duplicate project",
    );
  }
};

// Add new subproject
export const addSubprojectService = async (projectId, subData = {}) => {
  try {
    const response = await axios.post(
      `${API_URL}${projectId}/subprojects`,
      subData,
      getAuthHeaders(),
    );
    return response.data.subproject;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add subproject",
    );
  }
};

// Update subproject
export const updateSubprojectService = async (projectId, subId, subData) => {
  try {
    const response = await axios.patch(
      `${API_URL}${projectId}/subprojects/${subId}`,
      subData,
      getAuthHeaders(),
    );
    return response.data.subproject;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update subproject",
    );
  }
};

// Delete subproject
export const deleteSubprojectService = async (projectId, subId) => {
  try {
    const response = await axios.delete(
      `${API_URL}${projectId}/subprojects/${subId}`,
      getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete subproject",
    );
  }
};

// Duplicate subproject
export const duplicateSubprojectService = async (
  projectId,
  subId,
  { newElevatorName },
) => {
  try {
    const response = await axios.post(
      `${API_URL}${projectId}/subprojects/${subId}/duplicate`,
      { newElevatorName },
      getAuthHeaders(),
    );
    return response.data.subproject;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to duplicate subproject",
    );
  }
};

// Get subproject by ID
export const getSubprojectByIdService = async (subprojectId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/subprojects/${subprojectId}`,
      getAuthHeaders(),
    );
    return response.data.subproject;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch subproject",
    );
  }
};
