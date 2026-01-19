import React, { useState } from "react";
import { LevelC, LevelE, LevelR } from "./ConfigurationData/ConfigurationData";

const Configuration = ({ onSubImageSelect }) => {
  const [activeLevel, setActiveLevel] = useState("E"); // default
  const [openIndex, setOpenIndex] = useState(null); // for checkboxes
  const [subImageRowStart, setSubImageRowStart] = useState(null); // for subImages

  const columns = 3; // number of columns in grid

  // dynamically select the active level data
  const activeData =
    activeLevel === "E" ? LevelE : activeLevel === "R" ? LevelR : LevelC;

  return (
    <div>
      <small>
        LEVELe pairs aluminum-framed panels with an interlocking grid system.
        Multiple configurations, each defined by wall panel shape and layout,
        make it easy to create distinctive elevator interiors.
      </small>

      {/* BUTTONS */}
      <div className="flex gap-2 my-3">
        {["E", "R", "C"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setActiveLevel(lvl);
              setOpenIndex(null); // hide checkboxes
              setSubImageRowStart(null); // hide subImages
            }}
            className={`py-1 px-4 border ${
              activeLevel === lvl ? "bg-black text-white" : ""
            }`}
          >
            {lvl === "E" ? "LEVELe" : lvl === "R" ? "LEVELr" : "LEVELc"}
          </button>
        ))}
      </div>

      {/* GRID DISPLAY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border p-2">
        {activeData.map((item, index) => {
          const isOpen = openIndex === index;
          const rowStart = index - (index % columns);

          return (
            <div key={index} className="flex flex-col w-full">
              {/* PARENT CARD */}
              {/* PARENT CARD */}
              <div
                className={`border rounded flex flex-col items-center p-2 cursor-pointer transition-all ${
                  isOpen ? "border-green-500" : "border-gray-300"
                }`}
              >
                {/* SHOW IMAGE WHEN NOT OPEN */}
                {!isOpen && (
                  <div
                    onClick={() => {
                      setOpenIndex(index);
                      setSubImageRowStart(rowStart);
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <p className="font-medium">{item.name}</p>
                    <img src={item.image} alt={item.name} className="w-24" />
                  </div>
                )}

                {/* SHOW CHECKBOXES WHEN OPEN */}
                {isOpen && (
                  <div className="flex flex-col items-start gap-2 w-full h-[146px] bg-gray-50 p-3">
                    <p className="text-[10px] font-medium">
                      {item.name} OPENING OPTIONS
                    </p>

                    <label className="flex items-center gap-2 text-[10px]">
                      <input type="checkbox" className="accent-green-500" />
                      Front
                    </label>

                    <label className="flex items-center gap-2 text-[10px] whitespace-nowrap">
                      <input type="checkbox" className="accent-green-500" />
                      Front & Rear
                    </label>

                    <button
                      onClick={() => setOpenIndex(null)}
                      className="text-[10px] underline mt-2"
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>

              {/* SUB IMAGES – ALIGN TO ROW START */}
              {index === subImageRowStart &&
                openIndex !== null &&
                item.subImage && (
                  <div className="flex gap-2 mt-2 w-[363px] bg-gray-400 p-3">
                    {activeData[subImageRowStart].subImage.map(
                      (sub, subIndex) => (
                        <div
                          key={subIndex}
                          onClick={() => onSubImageSelect(sub.image)}
                          className="flex-1 border rounded flex flex-col items-center p-2 bg-white"
                        >
                          <p className="text-[12px] font-medium">{sub.name}</p>
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="w-20"
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Configuration;
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
import React, { useState } from "react";

const ConfigureModal = ({ image, onApply }) => {
  const [selectedZone, setSelectedZone] = useState(null);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-3 h-8 bg-[#8DC63F] rounded-sm"></div>
            <div>
              <p className="font-semibold text-gray-800 text-lg">
                LEVELe-101 #2
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">Project:</span>
                <button className="text-sm text-[#8DC63F] hover:text-[#7CB536] underline font-medium">
                  elevator_2
                </button>
                <button className="text-xs text-gray-500 hover:text-gray-700 underline ml-1">
                  (edit)
                </button>
              </div>
            </div>
          </div>

          {selectedZone && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8DC63F] flex items-center justify-center text-white font-bold">
                {selectedZone}
              </div>
              <button
                onClick={() => setSelectedZone(null)}
                className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main image area */}
      <div className="flex-1 relative min-h-0 p-6">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="relative w-full h-full max-w-4xl max-h-[600px]">
            {/* Main configuration image */}
            <div className="relative w-full h-full bg-white border-4 border-gray-200 rounded-2xl shadow-xl overflow-hidden">
              <img
                src={image}
                alt="Selected Configuration"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-4 border-t border-gray-300 bg-gradient-to-r from-green-50 to-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Status:</span>
            <span className="text-[#8DC63F] font-semibold">Ready</span>
            <span className="text-gray-400">•</span>
            <span>Configuration preview</span>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={onApply} className="px-5 py-2 text-sm font-medium bg-[#8DC63F] hover:bg-[#7CB536] text-white rounded-lg transition-colors shadow-md">
              Apply Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigureModal;
