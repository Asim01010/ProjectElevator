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
