import React, { useState } from "react";
import { Check } from "lucide-react";

const ElevatorConfigurator = () => {
  const [activeTab, setActiveTab] = useState("LEVELe");
  const [selectedModel, setSelectedModel] = useState(null);
  const [openingOptions, setOpeningOptions] = useState({
    front: false,
    frontRear: false,
  });

  // Data structure for all models
  const elevatorData = {
    LEVELe: [
      { id: "LEVELe-101", name: "LEVELe-101" },
      { id: "LEVELe-102", name: "LEVELe-102" },
      { id: "LEVELe-103", name: "LEVELe-103" },
      { id: "LEVELe-104", name: "LEVELe-104" },
      { id: "LEVELe-105", name: "LEVELe-105" },
      { id: "LEVELe-106", name: "LEVELe-106" },
      { id: "LEVELe-107", name: "LEVELe-107" },
      { id: "LEVELe-108", name: "LEVELe-108" },
    ],
    LEVELr: [
      { id: "LEVELr-201", name: "LEVELr-201" },
      { id: "LEVELr-202", name: "LEVELr-202" },
      { id: "LEVELr-203", name: "LEVELr-203" },
      { id: "LEVELr-204", name: "LEVELr-204" },
      { id: "LEVELr-205", name: "LEVELr-205" },
    ],
    LEVELc: [
      { id: "LEVELc-301", name: "LEVELc-301" },
      { id: "LEVELc-302", name: "LEVELc-302" },
    ],
  };

  const handleModelClick = (model) => {
    if (selectedModel?.id === model.id) {
      setSelectedModel(null);
      setOpeningOptions({ front: false, frontRear: false });
    } else {
      setSelectedModel(model);
      setOpeningOptions({ front: false, frontRear: false });
    }
  };

  const handleOpeningOptionClick = (option) => {
    if (option === "front") {
      setOpeningOptions({ front: true, frontRear: false });
    } else {
      setOpeningOptions({ front: false, frontRear: true });
    }
  };

  const currentModels = elevatorData[activeTab];

  // Calculate which row each model is in and when to show the sub-image
  const getRowForIndex = (index) => Math.floor(index / 3);
  const isLastInRow = (index) =>
    (index + 1) % 3 === 0 || index === currentModels.length - 1;

  return (
    <div
      className="w-[40%] max-w-6xl mx-auto   overflow-y-scroll"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="flex justify-between items-start mb-4 text-xs text-gray-500">
        <p className="w-full">
          LEVELe pairs aluminum-framed panels with an interlocking grid system.
          Multiple configurations, each defined by wall panel shape and layout,
          make it easy to create distinctive elevator interiors. Choose one of
          the configurations below and give it a name at right (optional).
        </p>
      </div>
      <div className="flex  border-gray-300">
        {["LEVELe", "LEVELr", "LEVELc"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedModel(null);
              setOpeningOptions({ front: false, frontRear: false });
            }}
            className={`px-4 py-1 text-sm transition-colors border border-gray-300 border-b-0 ${
              activeTab === tab
                ? "bg-[#6D6E71] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-3 gap-3 p-2 border bg-white">
        {currentModels.map((model, index) => {
          const selectedIndex = selectedModel
            ? currentModels.findIndex((m) => m.id === selectedModel.id)
            : -1;
          const selectedRow =
            selectedIndex >= 0 ? getRowForIndex(selectedIndex) : -1;
          const currentRow = getRowForIndex(index);
          const showSubImageAfterThis =
            selectedModel && selectedRow === currentRow && isLastInRow(index);

          return (
            <React.Fragment key={model.id}>
              <div>
                {selectedModel?.id === model.id ? (
                  /* Opening Options - Replaces the clicked image */
                  <div className="border-3 border-[#8CC63F] bg-white flex flex-col justify-between h-full w-full ">
                    <h4 className="text-xs  text-gray-700 my-2 text-center">
                      {model.name}
                      <br />
                      OPENING OPTIONS
                    </h4>
                    <div className="">
                      {" "}
                      {/* Front Opening Option */}
                      <div
                        onClick={() => handleOpeningOptionClick("front")}
                        className={`flex items-center p-1 border-2 cursor-pointer transition-all bg-white border-gray-300 hover:border-gray-400 text-black text-xs  py-2
                    
                          
                      `}
                      >
                        <div
                          className={`w-5 h-5 border-2 flex items-center justify-center mr-2 ${
                            openingOptions.front
                              ? "bg-[#8DC63F] border-[#8CC63F]"
                              : "bg-white border-gray-400"
                          }`}
                        >
                          {openingOptions.front && (
                            <Check className="w-4 h-4 text-white outline outline-white" />
                          )}
                        </div>
                        <span
                          className={` text-xs font-medium text-gray-700
                        `}
                        >
                          Front
                        </span>
                      </div>
                      {/* Front & Rear Opening Option */}
                      <div
                        onClick={() => handleOpeningOptionClick("frontRear")}
                        className="flex items-center justify-center p-1 border-2 cursor-pointer transition-all bg-white border-gray-300 hover:border-gray-400 py-2"
                      >
                        <div
                          className={`w-5 h-5 border-2 flex items-center justify-center mr-2 ${
                            openingOptions.frontRear
                              ? "bg-[#8DC63F] border-[#8DC63F]"
                              : "bg-white border-gray-400"
                          }`}
                        >
                          {openingOptions.frontRear && (
                            <Check className="w-4 h-4 text-white outline outline-white" />
                          )}
                        </div>
                        <span className="font-medium text-xs text-gray-700">
                          Front & Rear
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular Model Card */
                  <div
                    onClick={() => handleModelClick(model)}
                    className="border-2  cursor-pointer transition-all border-gray-300 hover:border-gray-400 h-full w-full"
                  >
                    <div className="text-center mb-1 text-xs text-gray-700">
                      {model.name}
                    </div>
                    <div className="flex justify-center items-center  bg-gray-100">
                      {/* Placeholder for elevator image */}
                      <div className="w-22   rounded-sm relative">
                        <img src="/Sending/GAF-001/v2/GAF-001 v2.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Show sub-image directly below the selected model's row */}
              {showSubImageAfterThis && (
                <div className="col-span-3 flex justify-center p-2 bg-[#969696]">
                  <div className="border bg-[#F1F3F2] border-[#8DC63F] w-auto">
                    <div className="text-center mb-1 text-xs font-semibold text-gray-700">
                      {selectedModel.name}
                    </div>
                    <div className="flex justify-center items-center bg-gray-50">
                      {/* Match size to original card */}
                      <div className="relative" style={{ width: "100px" }}>
                        <img
                          src="/Sending/GAF-001/v2/GAF-001 v2.jpg"
                          alt=""
                          className="w-full h-auto object-contain px-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* Important Design Tips Section */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300">
        <h3 className="text-lg font-semibold text-gray-600">
          IMPORTANT DESIGN TIPS
        </h3>
      </div>
    </div>
  );
};

export default ElevatorConfigurator;
