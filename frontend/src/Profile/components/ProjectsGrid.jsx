// src/pages/components/ProjectsGrid.jsx
import React, { useMemo } from "react";
import Project from "./Project";
import { RingLoader } from "react-spinners";

const ProjectsGrid = ({
  projects = [],
  isLoading = false,
  onProjectClick,
  onEdit,
  onDelete,
  onDuplicate,
  onAddDesign,
}) => {
  // Compute real stats based on actual data
  const stats = useMemo(() => {
    const total = projects.length;
    const inProgress = projects.filter((p) => p.subprojects?.length > 0).length;
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
          <RingLoader size={60} color="black" />
        </p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className=" text-center mt-10">
        <h3 className="text-2xl font-light text-gray-700  tracking-wide">
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
    <div className=" max-w-6xl mx-auto">
     

      {/* Projects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
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
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onAddDesign={onAddDesign}
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
