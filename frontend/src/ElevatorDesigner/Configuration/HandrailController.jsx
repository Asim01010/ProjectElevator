import React, { useState } from "react";

const HandrailController = () => {
  // States to track selections
  const [location, setLocation] = useState(
    "THREE HANDRAILS / BACK WALL + SIDE WALLS",
  );
  const [series, setSeries] = useState("ROUND");
  const [standoffDesign, setStandoffDesign] = useState(
    "1.25 INCHES DIAMETER WITH FLAT END",
  );
  const [material, setMaterial] = useState("STIPPLED STAINLESS STEEL");

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
      <div
        className="w-full max-w-6xl mx-auto overflow-y-scroll bg-black"
        style={{ scrollbarWidth: "none" }}
      >
        {/* 1. Main Preview Area */}
        <div className="relative w-full h-72 bg-black flex flex-col justify-end p-6">
          {/* Placeholder for the Handrail Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4/5 h-20 bg-gradient-to-r from-gray-400 via-gray-100 to-gray-500 rounded-full shadow-2xl rotate-[-15deg]"></div>
          </div>

          {/* Preview Description Text */}
          <div className="relative z-10">
            <h2 className="text-white font-bold text-sm uppercase tracking-wide leading-tight">
              ROUND HANDRAIL: 1.25 inches diameter with Flat End in Stippled
              Stainless Steel
            </h2>
          </div>
        </div>

        {/* 2. Handrail Location Section */}
        <SectionWrapper label="HANDRAIL LOCATION" value={location}>
          <div className="flex gap-2">
            {[1, 2, 3].map((item) => (
              <Swatch key={item} active={item === 1} />
            ))}
            <button className="w-16 h-16 border-2 border-gray-700 flex items-center justify-center text-[10px] text-white font-bold bg-black">
              NONE
            </button>
          </div>
        </SectionWrapper>

        {/* 3. Handrail Series Section */}
        <SectionWrapper label="HANDRAIL SERIES" value={series}>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Swatch key={item} active={item === 3} />
            ))}
          </div>
        </SectionWrapper>

        {/* 4. Standoff Design Section */}
        <SectionWrapper label="STANDOFF DESIGN" value={standoffDesign}>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((item) => (
              <Swatch key={item} active={item === 1} />
            ))}
          </div>
        </SectionWrapper>

        {/* 5. Standoff Material & Finish Section */}
        <SectionWrapper label="STANDOFF MATERIAL & FINISH" value={material}>
          <div className="flex gap-2 pb-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Swatch
                key={item}
                active={item === 3}
                isGradient={true}
                color={
                  item > 3
                    ? "bg-gradient-to-b from-orange-200 to-orange-900"
                    : "bg-gradient-to-b from-gray-300 to-gray-800"
                }
              />
            ))}
          </div>
        </SectionWrapper>
      </div>
    </>
  );
};

/**
 * Reusable Section Wrapper for the Label bars
 */
const SectionWrapper = ({ label, value, children }) => (
  <div className="w-full">
    <div className="bg-[#4a4a4a] px-4 py-1 flex items-center gap-2">
      <span className="text-[#cccccc] text-[11px] font-bold uppercase tracking-wider">
        {label}:
      </span>
      <span className="text-white text-[11px] font-bold uppercase">
        {value}
      </span>
    </div>
    <div className="bg-black p-4">{children}</div>
  </div>
);

/**
 * Reusable Swatch Box
 */
const Swatch = ({ active, isGradient, color }) => (
  <div
    className={`
    w-16 h-16 p-1 cursor-pointer transition-all
    ${active ? "border-2 border-white" : "border-2 border-transparent hover:border-gray-600"}
  `}
  >
    <div
      className={`w-full h-full bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden`}
    >
      {/* This represents the small icons in your image */}
      {isGradient ? (
        <div className={`w-full h-full ${color}`} />
      ) : (
        <div className="w-10 h-2 bg-gray-500 rotate-[-45deg] shadow-lg"></div>
      )}
    </div>
  </div>
);

export default HandrailController;
