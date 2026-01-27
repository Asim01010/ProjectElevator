import React from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronDoubleUp,
} from "react-icons/hi";

export default function OpenModel({
  selectedView,
  setSelectedView,
  activeStep,
  onNext,
  highlightedPanels = [],
  activeZone,
}) {
  const SkeletonModelview1 = [
    { id: 1, img: "/DESIGN 1 SKELTON/V1/1.png" },
    { id: 2, img: "/DESIGN 1 SKELTON/V1/2.png" },
    { id: 3, img: "/DESIGN 1 SKELTON/V1/3.png" },
    { id: 4, img: "/DESIGN 1 SKELTON/V1/4.png" },
    { id: 5, img: "/DESIGN 1 SKELTON/V1/5.png" },
    { id: 6, img: "/DESIGN 1 SKELTON/V1/6.png" },
    { id: 7, img: "/DESIGN 1 SKELTON/V1/7.png" },
    { id: 8, img: "/DESIGN 1 SKELTON/V1/8.png" },
    { id: 9, img: "/DESIGN 1 SKELTON/V1/9.png" },
    { id: 10, img: "/DESIGN 1 SKELTON/V1/10.png" },
    { id: 11, img: "/DESIGN 1 SKELTON/V1/11.png" },
    { id: 12, img: "/DESIGN 1 SKELTON/V1/12.png" },
    { id: 13, img: "/DESIGN 1 SKELTON/V1/13.png" },
    { id: 14, img: "/DESIGN 1 SKELTON/V1/14.png" },
  ];

  const SkeletonModelview2 = [
    { id: 1, img: "/DESIGN 1 SKELTON/V2/1.png" },
    { id: 2, img: "/DESIGN 1 SKELTON/V2/2.png" },
    { id: 3, img: "/DESIGN 1 SKELTON/V2/3.png" },
    { id: 4, img: "/DESIGN 1 SKELTON/V2/4.png" },
    { id: 5, img: "/DESIGN 1 SKELTON/V2/5.png" },
    { id: 6, img: "/DESIGN 1 SKELTON/V2/6.png" },
    { id: 7, img: "/DESIGN 1 SKELTON/V2/7.png" },
    { id: 8, img: "/DESIGN 1 SKELTON/V2/8.png" },
    { id: 9, img: "/DESIGN 1 SKELTON/V2/9.png" },
    { id: 10, img: "/DESIGN 1 SKELTON/V2/10.png" },
    { id: 11, img: "/DESIGN 1 SKELTON/V2/11.png" },
    { id: 12, img: "/DESIGN 1 SKELTON/V2/12.png" },
    { id: 13, img: "/DESIGN 1 SKELTON/V2/13.png" },
    { id: 14, img: "/DESIGN 1 SKELTON/V2/14.png" },
    { id: 15, img: "/DESIGN 1 SKELTON/V2/15.png" },
    { id: 16, img: "/DESIGN 1 SKELTON/V2/16.png" },
    { id: 17, img: "/DESIGN 1 SKELTON/V2/17.png" },
    { id: 18, img: "/DESIGN 1 SKELTON/V2/18.png" },
    { id: 19, img: "/DESIGN 1 SKELTON/V2/19.png" },
    { id: 20, img: "/DESIGN 1 SKELTON/V2/20.png" },
  ];

  const SkeletonModelview3 = [
    { id: 1, img: "/DESIGN 1 SKELTON/V3/1.png" },
    { id: 2, img: "/DESIGN 1 SKELTON/V3/2.png" },
    { id: 3, img: "/DESIGN 1 SKELTON/V3/3.png" },
    { id: 4, img: "/DESIGN 1 SKELTON/V3/4.png" },
    { id: 5, img: "/DESIGN 1 SKELTON/V3/5.png" },
    { id: 6, img: "/DESIGN 1 SKELTON/V3/6.png" },
    { id: 7, img: "/DESIGN 1 SKELTON/V3/7.png" },
    { id: 8, img: "/DESIGN 1 SKELTON/V3/8.png" },
    { id: 9, img: "/DESIGN 1 SKELTON/V3/9.png" },
    { id: 10, img: "/DESIGN 1 SKELTON/V3/10.png" },
  ];

  const getActiveView = () => {
    if (selectedView === 2) return SkeletonModelview2;
    if (selectedView === 3) return SkeletonModelview3;
    return SkeletonModelview1;
  };

  const activeLayers = getActiveView();

  // Map of which panel numbers correspond to which layer IDs for each zone
  const panelMap = {
    A: [
      { layerId: 1, panelNum: 1, top: "45%", left: "8%" },
      { layerId: 5, panelNum: 2, top: "45%", left: "46%" },
      { layerId: 6, panelNum: 3, top: "50%", left: "53%" },
      { layerId: 10, panelNum: 4, top: "50%", left: "93%" },
    ],
    B: [
      { layerId: 2, panelNum: 1, top: "30%", left: "30%" },
      { layerId: 7, panelNum: 2, top: "30%", left: "70%" },
    ],
    C: [
      { layerId: 3, panelNum: 1, top: "45%", left: "30%" },
      { layerId: 8, panelNum: 2, top: "45%", left: "70%" },
    ],
    D: [
      { layerId: 4, panelNum: 1, top: "60%", left: "30%" },
      { layerId: 9, panelNum: 2, top: "60%", left: "70%" },
    ],
    E: [
      { layerId: 11, panelNum: 1, top: "23%", left: "50%" },
      { layerId: 13, panelNum: 2, top: "72%", left: "50%" },
    ],
  };

  // Determine if panel indicators should be visible
  const shouldShowPanelIndicators =
    activeStep === "Wall Panels" && selectedView === 1;

  return (
    <div className="w-full h-full relative flex">
      {/* ===== Top Right Info Overlay ===== */}
      <div className="absolute top-4 right-6 text-[11px] text-gray-500 text-right z-20 bg-white/80 backdrop-blur-sm p-2 rounded-sm border border-gray-100">
        <span className="underline cursor-pointer hover:text-gray-800 transition-colors">
          Cassidy Delacruz
        </span>
        {" | "}
        <strong className="text-gray-800">LEVELe-108 #2</strong>{" "}
        <span className="underline cursor-pointer text-lime-600 font-bold ml-1">
          (edit)
        </span>
      </div>

      {/* ===== Central Preview Stage (The Model Images) ===== */}
      <div className="flex-grow flex flex-col items-center justify-center p-10 relative">
        {/* Background Text */}
        <h1 className="text-7xl font-black text-gray-200/50 absolute select-none">
          PREVIEW
        </h1>

        {/* IMAGE STACK AREA */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* DEFAULT LABEL SECTION */}
          {activeStep === "Configurations" && (
            <div className="relative z-10 flex flex-col items-center pointer-events-none mb-20">
              <span className="text-xs font-bold text-gray-400 tracking-[0.5em] mb-2">
                MODEL
              </span>
              <h2 className="text-5xl text-gray-800 font-bold tracking-tight">
                LEVELe-108
              </h2>
              <div className="w-24 h-1 bg-lime-500 mt-4"></div>
            </div>
          )}

          {/* SKELETON LAYERS with conditional panel indicators */}
          {activeLayers.map((layer) => (
            <React.Fragment key={layer.id}>
              <img
                src={layer.img}
                alt={`layer-${layer.id}`}
                className="absolute w-full h-full object-contain pointer-events-none"
                onError={(e) => (e.target.style.display = "none")}
              />

              {/* Panel indicators - ONLY show on Wall Panels step AND view 1 */}
              {shouldShowPanelIndicators &&
                Object.entries(panelMap).map(([zone, panels]) => {
                  const panel = panels.find((p) => p.layerId === layer.id);
                  if (!panel) return null;

                  const isSelected =
                    activeZone === zone &&
                    highlightedPanels.includes(panel.panelNum);

                  return (
                    <div
                      key={`${zone}-${panel.panelNum}`}
                      className={`absolute flex items-center justify-center text-gray-500 font-bold shadow-md border border-white z-30 transition-all duration-200
                      ${isSelected ? "bg-[#8DC63F] text-white" : "bg-gray-300"}`}
                      style={{
                        width: "20px",
                        height: "20px",
                        fontSize: "10px",
                        top: panel.top,
                        left: panel.left,
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                      }}
                    >
                      {isSelected ? panel.panelNum : zone}
                    </div>
                  );
                })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ===== Bottom Navigation Bar ===== */}
      <div className="flex flex-col justify-start items-center gap-1 mt-40 mr-4 z-10">
        <div
          onClick={() => setSelectedView(2)}
          className={`flex items-center justify-center border p-1 cursor-pointer transition-colors ${selectedView === 2 ? "bg-[#8DC63F] text-white" : "bg-white hover:bg-gray-100"}`}
        >
          <HiChevronDoubleLeft size={30} />
        </div>

        <div
          onClick={() => setSelectedView(1)}
          className={`flex items-center justify-center border p-1 cursor-pointer transition-colors ${selectedView === 1 ? "bg-[#8DC63F] text-white" : "bg-white hover:bg-gray-100"}`}
        >
          <HiChevronDoubleUp size={30} />
        </div>

        <div
          onClick={() => setSelectedView(3)}
          className={`flex items-center justify-center border p-1 cursor-pointer transition-colors ${selectedView === 3 ? "bg-[#8DC63F] text-white" : "bg-white hover:bg-gray-100"}`}
        >
          <HiChevronDoubleRight size={30} />
        </div>

        <button
          onClick={onNext}
          className="relative flex items-center justify-center overflow-hidden bg-[#8DC63F] hover:bg-gray-800 text-white py-6 px-1 font-bold uppercase text-xs tracking-[0.2em] transition-all duration-300 cursor-pointer"
          style={{
            clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
          }}
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}
