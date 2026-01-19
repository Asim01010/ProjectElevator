// src/pages/components/ProjectsGrid.jsx
import React, { useMemo } from "react";
import Project from "./Project";

const ProjectsGrid = ({
  projects = [],
  isLoading = false,
  onProjectClick, // callback to navigate → passed from Profile
}) => {
  // Compute real stats based on actual data
  const stats = useMemo(() => {
    const total = projects.length;

    // More realistic calculation:
    // - If project has subprojects → consider "In Progress"
    // - If no subprojects → consider "Active" but not started
    // - You can later add real "status" field from backend
    const inProgress = projects.filter((p) => p.subprojects?.length > 0).length;

    // For now: completed is 0 unless you add status field later
    const completed = projects.filter((p) => p.status === "Complete").length;

    return {
      total,
      active: total,
      inProgress,
      completed,
    };
  }, [projects]);

  if (isLoading) {
    return (
      <div className="py-16 flex items-center justify-center">
        <p className="text-lg text-gray-600 animate-pulse font-light tracking-wide">
          Loading your projects...
        </p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-2xl font-light text-gray-700 mb-4 tracking-wide">
          No projects found
        </h3>
        <p className="text-gray-500 font-light max-w-lg mx-auto">
          Start creating your first elevator design project by clicking the
          "CREATE A NEW PROJECT" area above.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Stats Bar */}
      <div className="flex flex-wrap items-center gap-8 mb-10">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-green-500"></div>
          <span className="text-base font-light text-gray-700">
            Active: <strong className="font-medium">{stats.active}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
          <span className="text-base font-light text-gray-700">
            In Progress:{" "}
            <strong className="font-medium">{stats.inProgress}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-gray-400"></div>
          <span className="text-base font-light text-gray-700">
            Completed:{" "}
            <strong className="font-medium">{stats.completed}</strong>
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="h-full cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => onProjectClick?.(project._id)}
          >
            <Project
              projectId={project._id}
              name={project.name}
              company={project.company}
              createdAt={project.createdAt}
              updatedAt={project.updatedAt}
              subprojectsCount={project.subprojects?.length || 0}
              // You can pass more props later:
              // status={project.status}
              // progress={project.progress}
              // color="green"
            />
          </div>
        ))}
      </div>

      {/* Showing count */}
      <div className="mt-10 text-center text-sm font-light text-gray-500">
        Showing {projects.length} project{projects.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default ProjectsGrid;
