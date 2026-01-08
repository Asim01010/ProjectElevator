import React, { useState } from "react";
import Straight from "./components/Straight";
import Front from "./components/Front";
import Back from "./components/Back";

export default function WallPanelModal() {
  const [activeView, setActiveView] = useState("S");

  const viewButtons = [
    {
      id: "S",
      label: "Straight",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      ),
      color: "#8DC63F",
    },
    {
      id: "F",
      label: "Front",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      color: "#3B82F6",
    },
    {
      id: "B",
      label: "Back",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      ),
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8DC63F] to-emerald-600 flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">LEVELe-101 #2</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">Project:</span>
              <button className="text-sm text-[#8DC63F] hover:text-[#7CB536] font-medium">
                elevator_2
              </button>
              <button className="text-xs text-gray-400 hover:text-gray-600 ml-1">
                (edit)
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">View Controls</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mb-6">
        {/* View Tabs */}
        <div className="flex gap-2 mb-4">
          {viewButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveView(button.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all duration-200
                ${
                  activeView === button.id
                    ? "border-gray-800 bg-gray-900 text-white shadow-lg"
                    : "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:border-gray-400"
                }`}
            >
              <div
                className={`p-1.5 rounded-md ${
                  activeView === button.id ? "bg-white/20" : "bg-white"
                }`}
              >
                <div
                  className={
                    activeView === button.id ? "text-white" : "text-gray-600"
                  }
                >
                  {button.icon}
                </div>
              </div>
              <span className="font-medium">{button.label}</span>
              {activeView === button.id && (
                <div
                  className="w-2 h-2 rounded-full ml-2"
                  style={{ backgroundColor: button.color }}
                ></div>
              )}
            </button>
          ))}
        </div>

        {/* Main View Container */}
        <div className="border-2 border-gray-300  shadow-inner  bg-gradient-to-br from-gray-50 to-white">
          <div className="flex justify-between items-start">
            {/* Main View Content */}
            <div className="flex-1">
              {activeView === "S" && <Straight />}
              {activeView === "F" && <Front />}
              {activeView === "B" && <Back />}
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
