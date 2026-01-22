// src/pages/components/Project.jsx
import React from "react";
import { BookCopy, CirclePlus, Pencil, Trash2 } from "lucide-react";

const Project = ({
  projectId,
  name = "Untitled Project",
  company = "No Company",
  createdAt,
  updatedAt,
  subprojectsCount = 0,
  onEdit,
  onDelete,
  onDuplicate,
  onAddDesign,
}) => {
  const projectNumber = subprojectsCount;

  return (
    <div className=" w-50">
      {/* Header with green indicator and project name */}
      <div className="flex items-center gap-2    border-b border-gray-300">
        <div className="h-3 w-3 bg-[#8dc63f]"></div>
        <span className="text-sm text-gray-700 truncate">{name}</span>
      </div>

      {/* Main green geometric design area */}
      <div className="relative bg-gradient-to-r from-[#8dc63f] to-green-[#8dc63f] h-30 flex items-center justify-center overflow-hidden">
        {/* Background geometric shapes */}
        <div className="absolute inset-0 flex">
          {/* Left dark green panel */}
          <div className="w-1/3 bg-[#8dc63f] opacity-60"></div>

          {/* Middle section with pentagon shapes */}
          <div className="w-1/3 relative">
            {/* Top pentagon */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#acc687] opacity-70"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            ></div>
            {/* Bottom pentagon */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#a9c188] opacity-60"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            ></div>
          </div>

          {/* Right light green panel with pentagon */}
          <div className="w-1/3 relative bg-[#DDEDC6] opacity-70">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white opacity-80"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            ></div>
          </div>
        </div>

        {/* White circle with project number */}
        <div className="relative z-10 h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-md">
          <span className="text-2xl text-gray-700">{projectNumber}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-around py-3 border-t border-gray-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(projectId);
          }}
          className="text-gray-500 hover:text-gray-600"
          title="Edit Project"
        >
          <Pencil className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddDesign?.(projectId);
          }}
          className="text-gray-500 hover:text-gray-600"
          title="Add New Design"
        >
          <CirclePlus className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate?.(projectId);
          }}
          className="text-gray-500 hover:text-gray-600"
          title="Duplicate Project"
        >
          <BookCopy className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(projectId);
          }}
          className="text-gray-500 hover:text-gray-600"
          title="Delete Project"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Project;
