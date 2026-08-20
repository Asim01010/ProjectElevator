import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

function getMaterialPaths(materialNumber) {
  const padded = String(materialNumber).padStart(3, "0");
  const materialCode = `GAF-${padded}`;
  return {
    straight: [
      `Sending/${materialCode}/v1/18.png`,
      `Sending/${materialCode}/v1/19.png`,
      `Sending/${materialCode}/v1/2.png`,
      `Sending/${materialCode}/v1/1.png`,
      `Sending/${materialCode}/v1/3.png`,
      `Sending/${materialCode}/v1/7.png`,
      `Sending/${materialCode}/v1/8.png`,
      `Sending/${materialCode}/v1/9.png`,
      `Sending/${materialCode}/v1/4.png`,
      `Sending/${materialCode}/v1/5.png`,
      `Sending/${materialCode}/v1/10.png`,
      `Sending/${materialCode}/v1/6.png`,
      `Sending/${materialCode}/v1/11.png`,
      `Sending/${materialCode}/v1/12.png`,
      `Sending/${materialCode}/v1/13.png`,
      `Sending/${materialCode}/v1/14.png`,
      `Sending/${materialCode}/v1/15.png`,
      `Sending/${materialCode}/v1/16.png`,
      `Sending/${materialCode}/v1/17.png`,
      `Sending/${materialCode}/v1/20.png`,
      `Sending/${materialCode}/v1/21.png`,
    ],
    front: [
      `Sending/${materialCode}/v2/12.png`,
      `Sending/${materialCode}/v2/14.png`,
      `Sending/${materialCode}/v2/2.png`,
      `Sending/${materialCode}/v2/3.png`,
      `Sending/${materialCode}/v2/4.png`,
      `Sending/${materialCode}/v2/7.png`,
      `Sending/${materialCode}/v2/8.png`,
      `Sending/${materialCode}/v2/9.png`,
      `Sending/${materialCode}/v2/5.png`,
      `Sending/${materialCode}/v2/1.png`,
      `Sending/${materialCode}/v2/6.png`,
      `Sending/${materialCode}/v2/10.png`,
      `Sending/${materialCode}/v2/11.png`,
      `Sending/${materialCode}/v2/13.png`,
      `Sending/${materialCode}/v2/15.png`,
      `Sending/${materialCode}/v2/16.png`,
    ],
    back: [
      `Sending/${materialCode}/v3/7.png`,
      `Sending/${materialCode}/v3/9.png`,
      `Sending/${materialCode}/v3/5.png`,
      `Sending/${materialCode}/v3/2.png`,
      `Sending/${materialCode}/v3/3.png`,
      `Sending/${materialCode}/v3/4.png`,
      `Sending/${materialCode}/v3/1.png`,
      `Sending/${materialCode}/v3/10.png`,
      `Sending/${materialCode}/v3/6.png`,
      `Sending/${materialCode}/v3/8.png`,
      `Sending/${materialCode}/v3/11.png`,
      `Sending/${materialCode}/v3/12.png`,
    ],
  };
}

function getSubMaterialPath(category, optionNumber, view) {
  const viewMap = { straight: "v1", front: "v2", back: "v3" };
  const viewFolder = viewMap[view];
  if (optionNumber === 0) return null;
  return `SubMaterial/${category}/${viewFolder}/${optionNumber}.png`;
}

const VIEW_MAPPING = {
  straightToFront: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    20: 12,
    21: 13,
    19: 14,
  },
  straightToBack: {
    0: 0,
    1: 1,
    12: 2,
    13: 3,
    14: 4,
    15: 5,
    16: 6,
    17: 7,
    22: 8,
    23: 9,
    19: 10,
  },
};

function WallPanels({ layerMaterials, onUpdateLayer }) {
  const [openSection, setOpenSection] = useState("floorCeiling");

  const MaterialSelector = ({ index, label, color }) => (
    <div className="text-center">
      <span className={`text-xs font-semibold ${color} block mb-2`}>
        {label}
      </span>
      <select
        value={layerMaterials[index]}
        onChange={(e) => onUpdateLayer(index, parseInt(e.target.value))}
        className="w-full px-3 py-1.5 text-xs border-2 border-gray-300 bg-white hover:border-blue-400 focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
      >
        {Array.from({ length: 23 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            GAF-{String(num).padStart(3, "0")}
          </option>
        ))}
      </select>
    </div>
  );

  const sections = [
    {
      id: "floorCeiling",
      title: "Floor & Ceiling",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <MaterialSelector index={0} label="Floor" color="text-green-700" />
          <MaterialSelector index={1} label="Ceiling" color="text-blue-700" />
        </div>
      ),
    },
    {
      id: "straightFront",
      title: "Straight & Front (2-11)",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <MaterialSelector
              key={i}
              index={i}
              label={`Layer ${i}`}
              color="text-orange-600"
            />
          ))}
        </div>
      ),
    },
    {
      id: "straightBack",
      title: "Straight & Back (12-16)",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[12, 13, 14, 15, 16].map((i) => (
            <MaterialSelector
              key={i}
              index={i}
              label={`Layer ${i}`}
              color="text-purple-600"
            />
          ))}
        </div>
      ),
    },
    {
      id: "special",
      title: "Special Layers",
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 p-3 border border-red-200">
            <h4 className="text-xs font-medium text-red-700 mb-2">
              Back: 10.png
            </h4>
            <MaterialSelector
              index={17}
              label="Layer 17"
              color="text-red-600"
            />
          </div>
          <div className="bg-teal-50 p-3 border border-teal-200">
            <h4 className="text-xs font-medium text-teal-700 mb-2">
              Straight: 16.png & 17.png
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <MaterialSelector
                index={18}
                label="16.png"
                color="text-teal-600"
              />
              <MaterialSelector
                index={19}
                label="17.png"
                color="text-teal-600"
              />
            </div>
          </div>
          <div className="bg-purple-50 p-3 border border-purple-200">
            <h4 className="text-xs font-medium text-purple-700 mb-2">
              Front: 11.png & 13.png
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <MaterialSelector
                index={20}
                label="11.png"
                color="text-purple-600"
              />
              <MaterialSelector
                index={21}
                label="13.png"
                color="text-purple-600"
              />
            </div>
          </div>
          <div className="bg-indigo-50 p-3 border border-indigo-200">
            <h4 className="text-xs font-medium text-indigo-700 mb-2">
              Back: 6.png & 8.png
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <MaterialSelector
                index={22}
                label="6.png"
                color="text-indigo-600"
              />
              <MaterialSelector
                index={23}
                label="8.png"
                color="text-indigo-600"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm border overflow-hidden">
        <div className="flex border-b bg-gray-50 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setOpenSection(section.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
                openSection === section.id
                  ? "bg-white text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div className="p-6 bg-white">
          {sections.find((s) => s.id === openSection)?.content}
        </div>
      </div>
    </div>
  );
}

function AdvancedOptions({ subMaterials, onUpdateSubMaterial }) {
  const [openSection, setOpenSection] = useState("ceiling");

  const ImageButton = ({ imageNum, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold transition-all ${
        isActive
          ? "bg-purple-600 text-white shadow-lg scale-105"
          : "bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400 hover:bg-purple-50"
      }`}
    >
      {imageNum}
    </button>
  );

  const sections = [
    {
      id: "ceiling",
      title: "Ceiling",
      content: (
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4">
          <p className="text-xs text-cyan-700 mb-3 font-semibold">
            5 ceiling images (synced across all views)
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onUpdateSubMaterial("ceiling", 0)}
              className={`px-4 py-2 text-sm font-semibold transition-all ${
                subMaterials.ceiling === 0
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400"
              }`}
            >
              None
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <ImageButton
                key={num}
                imageNum={num}
                isActive={subMaterials.ceiling === num}
                onClick={() => onUpdateSubMaterial("ceiling", num)}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "floor",
      title: "Floor",
      content: (
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4">
          <p className="text-xs text-emerald-700 mb-3 font-semibold">
            10 floor images (synced across all views)
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onUpdateSubMaterial("floor", 0)}
              className={`px-4 py-2 text-sm font-semibold transition-all ${
                subMaterials.floor === 0
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400"
              }`}
            >
              None
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <ImageButton
                key={num}
                imageNum={num}
                isActive={subMaterials.floor === num}
                onClick={() => onUpdateSubMaterial("floor", num)}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "handrails",
      title: "Handrails",
      content: (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4">
          <p className="text-xs text-orange-700 mb-3 font-semibold">
            16 handrail images (synced across all views)
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onUpdateSubMaterial("handrails", 0)}
              className={`px-4 py-2 text-sm font-semibold transition-all ${
                subMaterials.handrails === 0
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400"
              }`}
            >
              None
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
              (num) => (
                <ImageButton
                  key={num}
                  imageNum={num}
                  isActive={subMaterials.handrails === num}
                  onClick={() => onUpdateSubMaterial("handrails", num)}
                />
              )
            )}
          </div>
        </div>
      ),
    },
    {
      id: "lights",
      title: "Lights",
      content: (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4">
          <p className="text-xs text-yellow-700 mb-3 font-semibold">
            2 light images (synced across all views)
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onUpdateSubMaterial("lights", 0)}
              className={`px-4 py-2 text-sm font-semibold transition-all ${
                subMaterials.lights === 0
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400"
              }`}
            >
              None
            </button>
            {[1, 2].map((num) => (
              <ImageButton
                key={num}
                imageNum={num}
                isActive={subMaterials.lights === num}
                onClick={() => onUpdateSubMaterial("lights", num)}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "stripe",
      title: "Stripe",
      content: (
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4">
          <p className="text-xs text-pink-700 mb-3 font-semibold">
            2 stripe images (synced across all views)
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onUpdateSubMaterial("stripe", 0)}
              className={`px-4 py-2 text-sm font-semibold transition-all ${
                subMaterials.stripe === 0
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400"
              }`}
            >
              None
            </button>
            {[1, 2].map((num) => (
              <ImageButton
                key={num}
                imageNum={num}
                isActive={subMaterials.stripe === num}
                onClick={() => onUpdateSubMaterial("stripe", num)}
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-sm border overflow-hidden">
        <div className="flex border-b bg-gray-50 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setOpenSection(section.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
                openSection === section.id
                  ? "bg-white text-purple-600 border-purple-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
        <div className="p-6 bg-white max-h-[500px] overflow-y-auto">
          {sections.find((s) => s.id === openSection)?.content}
        </div>
      </div>
    </div>
  );
}

function WallPanelModal({
  layerMaterials,
  subMaterials,
  selectedView,
  onViewChange,
}) {
  return (
    <div className="flex gap-2">
      <div
        className="relative w-full bg-white overflow-hidden shadow-2xl border-4 border-gray-300"
        style={{ height: "630px" }}
      >
        {layerMaterials.map((materialNumber, straightIndex) => {
          let viewIndex = straightIndex;
          if (selectedView === "front")
            viewIndex = VIEW_MAPPING.straightToFront[straightIndex] ?? null;
          else if (selectedView === "back")
            viewIndex = VIEW_MAPPING.straightToBack[straightIndex] ?? null;
          if (viewIndex === null) return null;
          const materialPaths = getMaterialPaths(materialNumber);
          const images = materialPaths[selectedView];
          if (!images || images.length <= viewIndex) return null;
          return (
            <img
              key={`material-${straightIndex}`}
              src={images[viewIndex]}
              alt={`Layer ${straightIndex}`}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{ zIndex: straightIndex + 1 }}
            />
          );
        })}

        {Object.entries(subMaterials).map(
          ([category, optionNumber], catIndex) => {
            if (optionNumber === 0) return null;
            const src = getSubMaterialPath(
              category,
              optionNumber,
              selectedView
            );
            if (!src) return null;
            return (
              <img
                key={`sub-${category}-${optionNumber}`}
                src={src}
                alt={`${category}`}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                style={{ zIndex: 100 + catIndex }}
              />
            );
          }
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <button
          onClick={() => onViewChange("straight")}
          className={`w-9 h-9 flex items-center justify-center transition-all duration-200 shadow-sm ${
            selectedView === "straight"
              ? "bg-blue-600 text-white scale-110 shadow-md"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <MdKeyboardDoubleArrowUp size={18} />
        </button>

        <button
          onClick={() => onViewChange("front")}
          className={`w-9 h-9 flex items-center justify-center transition-all duration-200 shadow-sm ${
            selectedView === "front"
              ? "bg-purple-600 text-white scale-110 shadow-md"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-purple-50 hover:text-purple-600"
          }`}
        >
          <MdKeyboardDoubleArrowLeft size={18} />
        </button>

        <button
          onClick={() => onViewChange("back")}
          className={`w-9 h-9 flex items-center justify-center transition-all duration-200 shadow-sm ${
            selectedView === "back"
              ? "bg-indigo-600 text-white scale-110 shadow-md"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
        >
          <MdKeyboardDoubleArrowDown size={18} />
        </button>
      </div>
    </div>
  );
}

export default function WallPanelDesigner() {
  const [layerMaterials, setLayerMaterials] = useState(Array(24).fill(1));
  const [subMaterials, setSubMaterials] = useState({
    ceiling: 0,
    floor: 0,
    handrails: 0,
    lights: 0,
    stripe: 0,
  });
  const [selectedView, setSelectedView] = useState("straight");
  const [activeMenu, setActiveMenu] = useState("configuration");

  const updateLayer = (index, materialNumber) => {
    setLayerMaterials((prev) => {
      const updated = [...prev];
      updated[index] = materialNumber;
      return updated;
    });
  };

  const updateSubMaterial = (category, value) => {
    setSubMaterials((prev) => ({ ...prev, [category]: value }));
  };

  const menuItems = [
    { id: "configuration", label: "Configuration" },
    { id: "floorCeiling", label: "Floor, Ceiling" },
    { id: "panelSelection", label: "Panel Selection" },
    { id: "advancedOptions", label: "Advanced Options" },
    { id: "finalReview", label: "Final Review" },
  ];

  const renderContent = () => {
    if (activeMenu === "configuration") {
      return (
        <div className="bg-white p-6 border border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Configuration</h2>
          <p className="text-gray-600">
            Configure your elevator design settings here.
          </p>
        </div>
      );
    }
    if (activeMenu === "floorCeiling") {
      return (
        <div className="bg-white p-6 border border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Floor & Ceiling Selection</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="text-sm font-semibold text-green-700 block mb-2">
                Floor
              </span>
              <select
                value={layerMaterials[0]}
                onChange={(e) => updateLayer(0, parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 bg-white hover:border-blue-400 focus:border-blue-500 focus:outline-none"
              >
                {Array.from({ length: 23 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    GAF-{String(num).padStart(3, "0")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-sm font-semibold text-blue-700 block mb-2">
                Ceiling
              </span>
              <select
                value={layerMaterials[1]}
                onChange={(e) => updateLayer(1, parseInt(e.target.value))}
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 bg-white hover:border-blue-400 focus:border-blue-500 focus:outline-none"
              >
                {Array.from({ length: 23 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    GAF-{String(num).padStart(3, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    }
    if (activeMenu === "panelSelection") {
      return (
        <WallPanels
          layerMaterials={layerMaterials}
          onUpdateLayer={updateLayer}
        />
      );
    }
    if (activeMenu === "advancedOptions") {
      return (
        <AdvancedOptions
          subMaterials={subMaterials}
          onUpdateSubMaterial={updateSubMaterial}
        />
      );
    }
    if (activeMenu === "finalReview") {
      return (
        <div className="bg-white p-6 border border-gray-300">
          <h2 className="text-2xl font-bold mb-4">Final Review</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-blue-600">Materials Selected:</p>
              <p className="text-sm text-gray-600">
                24 wall panel layers configured
              </p>
            </div>
            <div>
              <p className="font-semibold text-purple-600">Advanced Options:</p>
              <p className="text-sm text-gray-600">
                Ceiling:{" "}
                {subMaterials.ceiling === 0
                  ? "None"
                  : `Option ${subMaterials.ceiling}`}{" "}
                • Floor:{" "}
                {subMaterials.floor === 0
                  ? "None"
                  : `Option ${subMaterials.floor}`}{" "}
                • Handrails:{" "}
                {subMaterials.handrails === 0
                  ? "None"
                  : `Option ${subMaterials.handrails}`}{" "}
                • Lights:{" "}
                {subMaterials.lights === 0
                  ? "None"
                  : `Option ${subMaterials.lights}`}{" "}
                • Stripe:{" "}
                {subMaterials.stripe === 0
                  ? "None"
                  : `Option ${subMaterials.stripe}`}
              </p>
            </div>
            <div>
              <p className="font-semibold text-green-600">Current View:</p>
              <p className="text-sm text-gray-600 capitalize">{selectedView}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Top Navbar */}
      <div className="bg-gray-200 border-b-2 border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-stretch">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className="relative flex items-center"
                style={{ marginLeft: index > 0 ? "-2px" : "0" }}
              >
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`relative px-12 py-4 text-[12px] font-bold uppercase transition-all flex items-center justify-center ${
                    activeMenu === item.id
                      ? "bg-white text-gray-800 z-10"
                      : "bg-gray-300 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{
                    border: "1px solid #d1d5db",
                    borderBottom:
                      activeMenu === item.id
                        ? "2px solid #3b82f6"
                        : "1px solid #d1d5db",
                  }}
                >
                  <span className="mr-2">{item.label}</span>
                  {activeMenu === item.id && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="text-green-500"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="currentColor"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path
                        d="M9 12l2 2 4-4"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {/* Arrow pointing right */}
                {index < menuItems.length - 1 && (
                  <div
                    className={`absolute right-0 z-20 ${
                      activeMenu === item.id ? "bg-white" : "bg-gray-300"
                    }`}
                    style={{
                      width: "30px",
                      height: "100%",
                      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                      transform: "translateX(50%)",
                      border: "1px solid #d1d5db",
                      borderLeft: "none",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">{renderContent()}</div>
          <div>
            <WallPanelModal
              layerMaterials={layerMaterials}
              subMaterials={subMaterials}
              selectedView={selectedView}
              onViewChange={setSelectedView}
            />
          </div>
        </div>
      </div>

      <footer className="text-center py-6 text-sm text-gray-600">
        Built with ❤️ by Muhammad & Grok
      </footer>
    </div>
  );
}
