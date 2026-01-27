import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const WallpanelController = ({
  activeZone,
  setActiveZone,
  selectedPanels,
  togglePanel,
}) => {
  // Zone config - number of panels per zone
  const zoneConfig = {
    A: 4,
    B: 2,
    C: 2,
    D: 2,
    E: 2,
  };

  const [appliedMaterial, setAppliedMaterial] = useState(null);

  // Get panel count for current active zone
  const panelCount = zoneConfig[activeZone] || 4;

  return (
    <>
      <div className="flex justify-between items-start mb-4 mt-2 text-xs text-gray-500">
        <p className="w-full">
          LEVELe pairs aluminum-framed panels with an interlocking grid system.
          Multiple configurations, each defined by wall panel shape and layout,
          make it easy to create distinctive elevator interiors. Choose one of
          the configurations below and give it a name at right (optional).
        </p>
      </div>

      <div className="w-full max-w-xl mx-auto border bg-white border-gray-300 font-sans text-gray-700">
        {/* Header Info */}
        <div className="px-4 pt-4">
          <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider">
            LEVELe-108 | Zone {activeZone} – Material Selection
          </div>

          {/* Sub-Panels Section */}
          <div className="mb-6">
            {/* Alphabet buttons */}
            <div className="flex gap-2 mb-4">
              {["A", "B", "C", "D", "E"].map((zone) => (
                <button
                  key={zone}
                  onClick={() => setActiveZone(zone)}
                  className={`w-12 h-12 border-2 text-xl font-bold flex items-center justify-center transition-all rounded-none
                    ${
                      activeZone === zone
                        ? "bg-lime-500 text-white border-lime-600 shadow-md"
                        : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                    }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* Numeric buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from({ length: panelCount }).map((_, i) => {
                const num = i + 1;
                const isSelected = selectedPanels[activeZone]?.includes(num);

                return (
                  <button
                    key={num}
                    onClick={() => togglePanel(activeZone, num)}
                    className={`w-11 h-11 border-2 flex items-center justify-center font-bold text-lg transition-all rounded-none
                      ${
                        isSelected
                          ? "bg-[#8DC63F] border-lime-700 text-white shadow-md"
                          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-gray-500 leading-tight">
              Select one or more panels. Selected panels stay active until you
              click them again.
            </p>
          </div>

          {/* Search Bar Area */}
          <div className="flex bg-black items-center h-12 mb-4">
            <div className="flex-1 flex items-center px-3 gap-3">
              <span className="text-white text-2xl">
                <IoSearch />
              </span>
              <input
                type="text"
                placeholder="Search Surfaces"
                className="bg-transparent text-white outline-none placeholder-gray-500 uppercase text-sm w-full"
              />
            </div>
            <div className="bg-[#838383] h-full px-4 flex items-center text-white font-bold shadow-[inset_0_-15px_20px_rgba(0,0,0,0.20)]">
              F+S
            </div>
            <div className="bg-[#838383] h-full px-4 flex items-center text-white text-xl shadow-[inset_0_-5px_10px_rgba(0,0,0,0.10)]">
              <FaStar size={30} />
            </div>
          </div>
        </div>

        {/* Material Selection / Gradient Box */}
        <div className="bg-black">
          <div
            className="relative group cursor-pointer"
            onClick={() => setAppliedMaterial(activeZone)}
          >
            <div className="w-full h-40 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 shadow-inner mb-2 flex items-center justify-center">
              <span className="text-gray-400 text-xs uppercase">
                Preview Area
              </span>
            </div>
            <button className="absolute top-2 right-2 bg-lime-500 text-white px-4 py-1 font-bold text-xs uppercase">
              Apply
            </button>
          </div>

          {/* Material Details Table */}
          <div className="mt-4 space-y-4">
            <Section label="Material" value="Stainless Steel" />
            <Section label="Finish" value="Sandstone" />
            <Section label="Pattern" value="No Pattern" />
          </div>
        </div>

        {/* Applied info */}
        {appliedMaterial && (
          <div className="mt-4 p-3 bg-lime-100 border border-lime-500 text-lime-800 text-sm">
            <strong>Applied:</strong> Zone {appliedMaterial} is active with
            panels {selectedPanels[activeZone]?.join(", ") || "none"}
          </div>
        )}
      </div>
    </>
  );
};

// Helper component
const Section = ({ label, value }) => (
  <div>
    <div className="bg-gray-800 text-[10px] text-gray-400 px-2 py-0.5 uppercase">
      {label}: <span className="text-white font-bold">{value}</span>
    </div>
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="w-10 h-10 border border-gray-700 bg-gradient-to-t from-gray-600 to-gray-400"
        />
      ))}
    </div>
  </div>
);

export default WallpanelController;
