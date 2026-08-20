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
  const [openSection, setOpenSection] = useState("straightFront");
  const [activeLayerIndex, setActiveLayerIndex] = useState(null);

  const MaterialImageGrid = ({ index, label, color }) => {
    const currentValue = layerMaterials[index];

    return (
      <div className="mt-4">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 23 }, (_, i) => i + 1).map((num) => {
            const code = `GAF-${String(num).padStart(3, "0")}`;
            const previewSrc = `Sending/${code}/v1/2.png`;
            const isSelected = currentValue === num;

            return (
              <button
                key={num}
                onClick={() => onUpdateLayer(index, num)}
                className={`
                  group relative aspect-square overflow-hidden rounded-md border-2 transition-all duration-200
                  ${
                    isSelected
                      ? `border-${color.split("-")[1]}-600 shadow-lg scale-105`
                      : "border-gray-300 hover:border-gray-400 hover:shadow-md hover:scale-[1.02]"
                  }
                `}
              >
                <img
                  src={previewSrc}
                  alt={code}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-1 text-center">
                  <span className="text-xs font-medium text-white drop-shadow">
                    {code}
                  </span>
                </div>
                {isSelected && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-${
                      color.split("-")[1]
                    }-500/30 backdrop-blur-sm`}
                  >
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-bold shadow">
                      SELECTED
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const sections = [
    {
      id: "straightFront",
      title: "Straight & Front (2-11)",
      layers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => ({
        index: i,
        label: `Layer ${i}`,
        color: "text-orange-600",
      })),
    },
    {
      id: "straightBack",
      title: "Straight & Back (12-16)",
      layers: [12, 13, 14, 15, 16].map((i) => ({
        index: i,
        label: `Layer ${i}`,
        color: "text-purple-600",
      })),
    },
    {
      id: "special",
      title: "Special Layers",
      layers: [
        { index: 17, label: "Layer 17 (Back: 10.png)", color: "text-red-600" },
        { index: 18, label: "16.png (Straight)", color: "text-teal-600" },
        { index: 19, label: "17.png (Straight)", color: "text-teal-600" },
        { index: 20, label: "11.png (Front)", color: "text-purple-600" },
        { index: 21, label: "13.png (Front)", color: "text-purple-600" },
        { index: 22, label: "6.png (Back)", color: "text-indigo-600" },
        { index: 23, label: "8.png (Back)", color: "text-indigo-600" },
      ],
    },
  ];

  const currentSection = sections.find((s) => s.id === openSection);
  const currentLayers = currentSection?.layers || [];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm  overflow-hidden  h-[627px]  ">
        {/* Main headings/tabs */}
        <div className="flex border-b bg-gray-50 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setOpenSection(section.id);
                setActiveLayerIndex(null); // Reset active layer when switching sections
              }}
              className={`flex-shrink-0 px-6 py-3 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
                openSection === section.id
                  ? "bg-white text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Mini-navbar for layers */}
        <div className="p-4 bg-white border-b ">
          <div className="flex flex-wrap gap-2">
            {currentLayers.map(({ index, label, color }) => (
              <button
                key={index}
                onClick={() =>
                  setActiveLayerIndex(activeLayerIndex === index ? null : index)
                }
                className={`
                  px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap
                  ${
                    activeLayerIndex === index
                      ? `bg-${color.split("-")[1]}-100 text-${
                          color.split("-")[1]
                        }-800 border-${color.split("-")[1]}-600 border shadow`
                      : `bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300`
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content: only the selected layer's grid */}
        <div
          className="p-6 bg-white overflow-y-auto scrollbar-hide"
          style={{ maxHeight: "630px" }}
        >
          {activeLayerIndex !== null && (
            <div>
              {currentLayers
                .filter((layer) => layer.index === activeLayerIndex)
                .map(({ index, label, color }) => (
                  <div key={index}>
                    <h4 className={`text-lg font-semibold mb-4 ${color}`}>
                      {label}
                    </h4>
                    <MaterialImageGrid
                      index={index}
                      label={label}
                      color={color}
                    />
                  </div>
                ))}
            </div>
          )}
          {activeLayerIndex === null && (
            <p className="text-center text-gray-500 py-10">
              Select a layer from the mini-navbar above to choose its material.
            </p>
          )}
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
  const [activeTab, setActiveTab] = useState("ceiling"); // "ceiling" or "floor"
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
          <h2 className="text-2xl font-bold mb-6">Floor & Ceiling Selection</h2>

          {/* Tab buttons */}
          <div className="flex border-b border-gray-300 mb-6">
            <button
              onClick={() => setActiveTab("ceiling")}
              className={`
            flex-1 py-3 px-6 text-center font-semibold text-lg transition-all
            ${
              activeTab === "ceiling"
                ? "border-b-4 border-green-600 text-green-700 bg-green-50"
                : "text-gray-600 hover:bg-gray-100"
            }
          `}
            >
              Ceiling
            </button>

            <button
              onClick={() => setActiveTab("floor")}
              className={`
            flex-1 py-3 px-6 text-center font-semibold text-lg transition-all
            ${
              activeTab === "floor"
                ? "border-b-4 border-blue-600 text-blue-700 bg-blue-50"
                : "text-gray-600 hover:bg-gray-100"
            }
          `}
            >
              Floor
            </button>
          </div>

          {/* Content - only one shown at a time */}
          {activeTab === "ceiling" && (
            <div
              className="h-[440px] overflow-hidden overflow-y-scroll"
              style={{ scrollbarWidth: "none" }}
            >
              <h3 className="text-xl font-semibold text-green-700 mb-5">
                Choose Ceiling Material
              </h3>
              <div className="grid grid-cols-4 gap-4 p-2 ">
                {Array.from({ length: 23 }, (_, i) => i + 1).map((num) => {
                  const code = `GAF-${String(num).padStart(3, "0")}`;
                  const previewSrc = `Sending/${code}/v1/18.png`; // ← change this number if better preview exists

                  return (
                    <button
                      key={num}
                      onClick={() => updateLayer(0, num)}
                      className={`
                    group relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200
                    ${
                      layerMaterials[0] === num
                        ? "border-green-600 shadow-xl scale-[1.04] ring-2 ring-green-400"
                        : "border-gray-200 hover:border-green-400 hover:shadow-md hover:scale-[1.02]"
                    }
                  `}
                    >
                      <img
                        src={previewSrc}
                        alt={code}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(e) => (e.target.src = "/placeholder.png")}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-2.5 text-center">
                        <span className="text-xs font-bold text-white drop-shadow">
                          {code}
                        </span>
                      </div>

                      {layerMaterials[0] === num && (
                        <div className="absolute inset-0 flex items-center justify-center bg-green-600/25 backdrop-blur-[1px]">
                          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-green-800 shadow-lg">
                            SELECTED
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "floor" && (
            <div
              className="h-[440px] overflow-hidden overflow-y-scroll p-2"
              style={{ scrollbarWidth: "none" }}
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-5">
                Choose Floor Material
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 23 }, (_, i) => i + 1).map((num) => {
                  const code = `GAF-${String(num).padStart(3, "0")}`;
                  const previewSrc = `Sending/${code}/v1/18.png`;

                  return (
                    <button
                      key={num}
                      onClick={() => updateLayer(1, num)}
                      className={`
                    group relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200
                    ${
                      layerMaterials[1] === num
                        ? "border-blue-600 shadow-xl scale-[1.04] ring-2 ring-blue-400"
                        : "border-gray-200 hover:border-blue-400 hover:shadow-md hover:scale-[1.02]"
                    }
                  `}
                    >
                      <img
                        src={previewSrc}
                        alt={code}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(e) => (e.target.src = "/placeholder.png")}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-2.5 text-center">
                        <span className="text-xs font-bold text-white drop-shadow">
                          {code}
                        </span>
                      </div>

                      {layerMaterials[1] === num && (
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-600/25 backdrop-blur-[1px]">
                          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-blue-800 shadow-lg">
                            SELECTED
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
                  className={`relative px-12 py-4 text-xs font-bold uppercase transition-all flex items-center justify-center ${
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
      <div className="max-w-7xl mx-auto px-10 py-6">
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
