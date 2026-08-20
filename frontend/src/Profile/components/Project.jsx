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
    <div className="w-40 bg-[#1c140f]/20 rounded-lg overflow-hidden border border-[#d4a359]/20 transition-all duration-300 hover:border-[#d4a359]/40">
      {/* Tightened Header */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-[#d4a359]/20 bg-[#231913]/40">
        <div className="h-2 w-2 rounded-full bg-[#d4a359] shadow-[0_0_6px_#d4a359]"></div>
        <span className="text-[11px] font-semibold text-[#e8dfd8] truncate" style={{ fontFamily: "'Playfair Display', serif" }}>
          {name}
        </span>
      </div>

      {/* Low-profile Compact Geometric Canvas */}
      <div className="relative bg-gradient-to-br from-[#4a3423] to-[#231913] h-20 flex items-center justify-center overflow-hidden">
        {/* Background geometric shapes */}
        <div className="absolute inset-0 flex">
          {/* Left deep brown panel */}
          <div className="w-1/3 bg-[#362519] opacity-60"></div>

          {/* Middle section with pentagon shapes */}
          <div className="w-1/3 relative">
            {/* Top pentagon */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#a6824b] opacity-40"
              style={{
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            ></div>
            {/* Bottom pentagon */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#825c35] opacity-50"
              style={{
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            ></div>
          </div>

          {/* Right warm cream-gold panel with pentagon */}
          <div className="w-1/3 relative bg-[#e2d4bd] opacity-25">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#d4a359] opacity-40"
              style={{
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            ></div>
          </div>
        </div>

        {/* Scaled-down project number wheel */}
        <div className="relative z-10 h-10 w-10 rounded-full bg-gradient-to-b from-[#ffffff] to-[#f4ebd9] flex items-center justify-center shadow-[0_3px_8px_rgba(0,0,0,0.3)] border border-[#d4a359]/40">
          <span className="text-sm font-bold text-[#4a3423]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {projectNumber}
          </span>
        </div>
      </div>

      {/* Clean Compact Action Bar */}
      <div className="flex items-center justify-around py-1.5 border-t border-[#d4a359]/20 bg-[#231913]/60">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(projectId);
          }}
          className="p-1 rounded text-[#a6824b] hover:text-[#d4a359] hover:bg-[#d4a359]/10 transition-colors duration-200"
          title="Edit Project"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddDesign?.(projectId);
          }}
          className="p-1 rounded text-[#a6824b] hover:text-[#d4a359] hover:bg-[#d4a359]/10 transition-colors duration-200"
          title="Add New Design"
        >
          <CirclePlus className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate?.(projectId);
          }}
          className="p-1 rounded text-[#a6824b] hover:text-[#d4a359] hover:bg-[#d4a359]/10 transition-colors duration-200"
          title="Duplicate Project"
        >
          <BookCopy className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(projectId);
          }}
          className="p-1 rounded text-[#a6824b] hover:text-[#e76e6e] hover:bg-[#e76e6e]/10 transition-colors duration-200"
          title="Delete Project"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default Project;