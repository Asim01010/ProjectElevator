import React, { useState } from "react";
import Configuration from "./Components/Configuration";
import WallPanels from "./Components/WallPanels";
import HandRails from "./Components/HandRails";
import Review from "./Components/Review";
import Ceiling from "./Components/Ceiling";
import ConfigureModal from "./SubDesign/ConfigureModal";
import WallPanelModal from "./SubDesign/WallPanelModal";
import Straight from "./SubDesign/components/Straight";

const Design = () => {
  const [activeTab, setActiveTab] = useState("Configuration"); // track active tab
  // 🔥 SHARED STATE
  const [panelMaterials, setPanelMaterials] = useState(
    Array(20).fill("GAF-001")
  );

  const [activePanel, setActivePanel] = useState(null);

  const [selectedConfigImage, setSelectedConfigImage] = useState(
    "/Configuration/levele-101-b (1).svg"
  );
  // 🔥 HANDLER TO MOVE TO WALL PANELS
  const goToWallPanels = () => {
    setActiveTab("WallPanels");
  };
  const tabs = [
    { id: "Configuration", label: "Configuration", number: 1 },
    { id: "WallPanels", label: "Wall Panels", number: 2 },
    { id: "HandRails", label: "Handrails", number: 3 },
    { id: "Ceiling", label: "Ceilings", number: 4 },
    { id: "Review", label: "Review", number: 5 },
  ];

  return (
    <>
      <div className="pt-20">
        <div className="bg-white border-gray-200">
          <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-32">
            {/* Top Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group cursor-pointer min-w-max relative"
                >
                  <span className="px-2 py-0.5 text-xs font-medium bg-[#8DC63F] text-white">
                    {tab.number}
                  </span>
                  <span
                    className={`font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id ? "text-[#8DC63F]" : "text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#8DC63F] transform transition-transform duration-200 ${
                      activeTab === tab.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex gap-5 p-2">
              {/* Left Side - Components */}
              <div className="w-[40%] p-2">
                {activeTab === "Configuration" && (
                  <Configuration onSubImageSelect={setSelectedConfigImage} />
                )}
                {activeTab === "WallPanels" && (
                  <WallPanels
                    activePanel={activePanel}
                    setActivePanel={setActivePanel}
                    panelMaterials={panelMaterials}
                    setPanelMaterials={setPanelMaterials}
                  />
                )}
                {activeTab === "HandRails" && <HandRails />}
                {activeTab === "Ceiling" && <Ceiling />}
                {activeTab === "Review" && <Review />}
              </div>

              {/* Right Side - Modals */}
              <div className="w-[60%] p-2">
                {activeTab === "Configuration" && (
                  <ConfigureModal
                    image={selectedConfigImage}
                    onApply={goToWallPanels}
                  />
                )}
                {activeTab === "WallPanels" && (
                  <WallPanelModal>
                    <Straight
                      panelMaterials={panelMaterials}
                      activePanel={activePanel} // ← ADD THIS
                    />
                  </WallPanelModal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;
