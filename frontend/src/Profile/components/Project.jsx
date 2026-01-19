// src/pages/components/Project.jsx
import React from "react";
import { Pencil, PlusCircle, Copy, Trash2 } from "lucide-react";

const Project = ({
  name = "Untitled Project",
  company = "No Company",
  createdAt,
  updatedAt,
  subprojectsCount = 0,
  status = "In Progress", // "In Progress", "Complete", "Draft", etc.
  color = "green", // fallback color
}) => {
  const createdDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  const lastEdited = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Never";

  // Dynamic status badge styling
  const statusStyles = {
    "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-300",
    Complete: "bg-green-100 text-green-800 border-green-300",
    Draft: "bg-gray-100 text-gray-800 border-gray-300",
  };

  const badgeClass =
    statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-300"; // fallback

  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Header: Status dot + Name */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-gray-50/80 border-b border-gray-200">
        <div
          className={`h-3.5 w-3.5 rounded-full bg-${color}-500 ring-2 ring-${color}-200 ring-offset-2 flex-shrink-0`}
        ></div>
        <h3 className="font-medium text-gray-900 truncate text-lg leading-tight">
          {name}
        </h3>
      </div>

      {/* Visual / Preview Area */}
      <div
        className={`relative flex-1 bg-gradient-to-br from-${color}-50 via-${color}-100 to-${color}-200 min-h-[160px] flex items-center justify-center overflow-hidden`}
      >
        {/* Number of designs badge */}
        <div className="text-center z-10">
          <div className="text-6xl font-bold text-white drop-shadow-lg opacity-90">
            {subprojectsCount}
          </div>
          <p className="text-base font-light text-white mt-1 opacity-90 tracking-wide">
            {subprojectsCount === 1 ? "Design" : "Designs"}
          </p>
        </div>

        {/* Status badge */}
        <span
          className={`absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-sm ${badgeClass}`}
        >
          {status}
        </span>

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Info Section */}
      <div className="p-5 flex flex-col gap-3.5 text-sm flex-grow">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Company:</span>
          <span className="text-gray-600 truncate max-w-[65%] text-right">
            {company}
          </span>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <div>
            <span className="font-medium text-gray-600">Created:</span>{" "}
            {createdDate}
          </div>
          <div>
            <span className="font-medium text-gray-600">Last edited:</span>{" "}
            {lastEdited}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-around px-5 py-4 border-t border-gray-100 bg-gray-50/50">
        <button
          title="Edit Project"
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Pencil size={18} />
        </button>

        <button
          title="Add New Design"
          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
        >
          <PlusCircle size={18} />
        </button>

        <button
          title="Duplicate Project"
          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
        >
          <Copy size={18} />
        </button>

        <button
          title="Delete Project"
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default Project;
