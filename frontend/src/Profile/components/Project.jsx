import { BookCopy, CirclePlus, Pencil, Trash2 } from "lucide-react";
import React from "react";

const Project = ({
  projectName = "elevator_2",
  lastEdited = "Today",
  progress = 75,
  projectNumber = "P2",
}) => {
  return (
    <div className="group bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden h-full">
      {/* Top status indicator */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
          <span className="text-sm font-light text-gray-700 tracking-wide truncate">
            {projectName}
          </span>
        </div>
        <span className="text-xs text-gray-400 font-light whitespace-nowrap">
          {lastEdited}
        </span>
      </div>

      {/* Main content with gradient background */}
      <div className="relative p-4 md:p-6 lg:p-8 flex items-center justify-center">
        {/* Gradient background container */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 opacity-80"></div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Main gradient circle - responsive sizing */}
        <div className="relative z-10 h-28 w-28 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-xl group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
          {/* Inner decorative circle */}
          <div className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full bg-gradient-to-tr from-white/20 to-transparent backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full bg-gradient-to-bl from-blue-300/40 to-pink-300/40 backdrop-blur-sm border border-white/20"></div>
          </div>

          {/* Project icon overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <div className="text-lg md:text-xl lg:text-2xl font-light text-gray-700">
                {projectNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-2 right-2 md:top-3 md:right-3 lg:top-4 lg:right-4 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-60"></div>
        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 lg:bottom-4 lg:left-4 h-3 w-3 md:h-4 md:w-4 lg:h-4 lg:w-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-60"></div>
      </div>

      {/* Action buttons */}
      <div className="bg-gray-50/50 border-t border-gray-100 p-3 md:p-4">
        <div className="flex items-center justify-evenly">
          <button className="flex flex-col items-center gap-1 p-1 md:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group/btn">
            <div className="p-1 md:p-2 bg-white rounded-full border border-gray-200 group-hover/btn:border-blue-200 group-hover/btn:bg-blue-50 transition-colors">
              <Pencil className="h-3 w-3 md:h-4 md:w-4" />
            </div>
            <span className="text-xs font-light tracking-wide">Edit</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-1 md:p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 group/btn">
            <div className="p-1 md:p-2 bg-white rounded-full border border-gray-200 group-hover/btn:border-green-200 group-hover/btn:bg-green-50 transition-colors">
              <CirclePlus className="h-3 w-3 md:h-4 md:w-4" />
            </div>
            <span className="text-xs font-light tracking-wide">New</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-1 md:p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 group/btn">
            <div className="p-1 md:p-2 bg-white rounded-full border border-gray-200 group-hover/btn:border-purple-200 group-hover/btn:bg-purple-50 transition-colors">
              <BookCopy className="h-3 w-3 md:h-4 md:w-4" />
            </div>
            <span className="text-xs font-light tracking-wide">Copy</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-1 md:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group/btn">
            <div className="p-1 md:p-2 bg-white rounded-full border border-gray-200 group-hover/btn:border-red-200 group-hover/btn:bg-red-50 transition-colors">
              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
            </div>
            <span className="text-xs font-light tracking-wide">Delete</span>
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="px-3 md:px-4 pb-3 md:pb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span className="font-light">Progress</span>
          <span className="font-light">{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Project;
