// src/redux/features/Project/projectService.js
import { API } from "../../api/axiosInstance"

const API_URL = "/api/projects/";

 // Adjust if your backend port differs

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

// Create new project
export const createProjectService = async (projectData) => {
  try {
    const response = await API.post(API_URL, projectData, getAuthHeaders());
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
    const response = await API.get(API_URL, {
      ...getAuthHeaders(),
      params, // { search, sort }
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
    const response = await API.get(`${API_URL}${id}`, getAuthHeaders());
    return response.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch project");
  }
};

// Update project
export const updateProjectService = async (id, projectData) => {
  try {
    const response = await API.patch(
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
    const response = await API.delete(`${API_URL}${id}`, getAuthHeaders());
    return response.data; // { message }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete project",
    );
  }
};

// Duplicate project
export const duplicateProjectService = async (id, { newName }) => {
  try {
    const response = await API.post(
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
    const response = await API.post(
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
    const response = await API.patch(
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
    const response = await API.delete(
      `${API_URL}${projectId}/subprojects/${subId}`,
      getAuthHeaders(),
    );
    return response.data; // { message }
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
    const response = await API.post(
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
// Add to projectService.js first (if not already there)
export const getSubprojectByIdService = async (subprojectId) => {
  try {
    const response = await API.get(
      `${API_URL.replace("/projects/", "/subprojects/")}${subprojectId}`,
      getAuthHeaders(),
    );
    return response.data.subproject;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch subproject",
    );
  }
};