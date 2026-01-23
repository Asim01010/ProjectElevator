import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
const WallpanelController = () => {
  // Configuration for how many sub-panels each Zone has
  const zoneConfig = {
    A: 4,
    B: 2,
    C: 2,
    E: 5,
    F: 3,
    G: 4,
  };

  const [activeZone, setActiveZone] = useState("C");
  const [selectedSubPanels, setSelectedSubPanels] = useState([1, 2]);
  const [appliedMaterial, setAppliedMaterial] = useState(null);

  // Reset sub-panels when zone changes (optional, or keep selection)
  const handleZoneChange = (zone) => {
    setActiveZone(zone);
    // Default to selecting all sub-panels of the new zone
    const count = zoneConfig[zone];
    setSelectedSubPanels(Array.from({ length: count }, (_, i) => i + 1));
  };

  const toggleSubPanel = (num) => {
    if (selectedSubPanels.includes(num)) {
      setSelectedSubPanels(selectedSubPanels.filter((i) => i !== num));
    } else {
      setSelectedSubPanels([...selectedSubPanels, num]);
    }
  };

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
      <div className="w-full max-w-xl mx-auto border bg-white border-gray-300  font-sans text-gray-700">
        {/* Header Info */}
        <div className="px-4 pt-4">
          <div className="text-xs text-gray-400 mb-4 uppercase tracking-wider">
            LEVELe-101B | Material Selection
          </div>

          {/* Zone Selection (A, B, C...) */}
          <div className="flex gap-2 mb-6">
            {Object.keys(zoneConfig).map((zone) => (
              <button
                key={zone}
                onClick={() => handleZoneChange(zone)}
                className={`w-12 h-12 border-2 text-xl font-bold flex items-center justify-center transition-colors
              ${activeZone === zone ? "border-lime-500 bg-lime-500 text-white" : "border-gray-400 text-gray-500 hover:border-gray-600"}`}
              >
                {zone}
              </button>
            ))}
          </div>

          {/* Sub-Panels Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-gray-400 uppercase">
                Sub-Panels
              </span>
              <span className="text-xs italic">
                ({selectedSubPanels.length} of {zoneConfig[activeZone]}{" "}
                selected)
              </span>
              <div className="ml-auto flex gap-1">
                <button
                  onClick={() =>
                    setSelectedSubPanels(
                      Array.from(
                        { length: zoneConfig[activeZone] },
                        (_, i) => i + 1,
                      ),
                    )
                  }
                  className="px-2 py-0.5 bg-gray-500 text-white text-[10px] uppercase"
                >
                  Select All
                </button>
                <span className="text-gray-400">/</span>
                <button
                  onClick={() => setSelectedSubPanels([])}
                  className="px-2 py-0.5 bg-gray-500 text-white text-[10px] uppercase"
                >
                  None
                </button>
              </div>
            </div>

            {/* Dynamic Number Buttons */}
            <div className="flex gap-2 mb-4">
              {Array.from({ length: zoneConfig[activeZone] }).map((_, i) => {
                const num = i + 1;
                const isSelected = selectedSubPanels.includes(num);
                return (
                  <button
                    key={num}
                    onClick={() => toggleSubPanel(num)}
                    className={`w-10 h-10 border-2 flex items-center justify-center font-bold text-lg
                  ${isSelected ? "bg-lime-500 border-lime-600 text-white" : "bg-gray-200 border-gray-300 text-gray-500"}`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 leading-tight">
              Select one or more of the numbered sub-panels. You can select
              multiple sub-panels by clicking on the numbers above.
            </p>
          </div>

          {/* Search Bar Area */}
          <div className="flex bg-black items-center  h-12 ">
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
            <div className="bg-[#838383] h-full px-4 flex items-center text-white text-xl shadow-[inset_0_-5px_10px_rgba(0,0,0,0.10)] ">
              <FaStar size={30} />
            </div>
          </div>
        </div>
        {/* Material Selection / Gradient Box */}
        <div className="bg-black ">
          <div
            className="relative group cursor-pointer"
            onClick={() => setAppliedMaterial(activeZone)}
          >
            {/* Random Gradient as requested */}
            <div className="w-full h-40 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 shadow-inner mb-2 flex items-center justify-center">
              <span className="text-gray-400 text-xs uppercase">
                Preview Area
              </span>
            </div>
            <button className="absolute top-2 right-2 bg-lime-500 text-white px-4 py-1 font-bold text-xs uppercase">
              Apply
            </button>
          </div>

          {/* Material Details Table (Simplified representation of your 2nd image) */}
          <div className="mt-4 space-y-4">
            <Section label="Material" value="Stainless Steel" />
            <Section label="Finish" value="Sandstone" />
            <Section label="Pattern" value="No Pattern" />
          </div>
        </div>

        {/* Logic to show which button/zone is open right now */}
        {appliedMaterial && (
          <div className="mt-4 p-3 bg-lime-100 border border-lime-500 text-lime-800 text-sm">
            <strong>Applied:</strong> Zone {appliedMaterial} is active with
            panels {selectedSubPanels.join(", ")}
          </div>
        )}
      </div>
    </>
  );
};

// Helper component for the black background sections
const Section = ({ label, value }) => (
  <div>
    <div className="bg-gray-800 text-[10px] text-gray-400 px-2 py-0.5 uppercase">
      {label}: <span className="text-white font-bold">{value}</span>
    </div>
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={`w-10 h-10 border border-gray-700 bg-gradient-to-t from-gray-600 to-gray-400`}
        />
      ))}
    </div>
  </div>
);

export default WallpanelController;
