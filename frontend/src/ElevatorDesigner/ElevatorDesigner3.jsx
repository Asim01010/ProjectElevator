import React, { useState } from "react";
import { Check } from "lucide-react";
import SelectModel from "./Configuration/SelectModel";
import OpenModel from "./Configuration/OpenModel";
import WallpanelController from "./Configuration/WallpanelController";
import HandrailController from "./Configuration/HandrailController";
import CeilingController from "./Configuration/CeilingController";
import Review from "./Configuration/Review";


export default function ElevatorDesigner3() {
  const [steps, setSteps] = useState([
    {
      label: "Configurations",
      icon: "/ConfigurationNavbar/Elevator.png",
      active: true,
    },
    {
      label: "Wall Panels",
      icon: "/ConfigurationNavbar/Wallpanel.png",
      active: false,
    },
    {
      label: "Handrails",
      icon: "/ConfigurationNavbar/handrail.png",
      active: false,
    },
    {
      label: "Ceilings",
      icon: "/ConfigurationNavbar/ceiling.png",
      active: false,
    },
    { label: "Review", icon: "/ConfigurationNavbar/review.png", active: false },
  ]);

  const handleStepClick = (clickedIndex) => {
    setSteps(
      steps.map((step, index) => ({
        ...step,
        active: index === clickedIndex,
      })),
    );
  };
  const activeStep = steps.find((step) => step.active)?.label;

  return (
    /* 1. mt-16 (or whatever your main navbar height is) prevents overlap.
       2. Responsive padding: 0 on mobile, large on desktop (xl:px-48).
    */
    <div className="min-h-screen bg-gray-100 py-10 px-0 md:px-10 xl:px-48 mt-[64px]">
      {/* This container handles the internal responsiveness. 
          overflow-x-auto allows the user to swipe/scroll if the screen is too narrow.
      */}
      <div className="w-full max-w-[1600px] mx-auto overflow-x-auto custom-scrollbar">
        {/* Set a min-width to ensure the UI doesn't break/merge on mobile */}
        <div className="min-w-[1100px] flex flex-col ">
          {/* ===== Top Navigation (Step Bar) ===== */}
          <nav className="w-full border border-gray-300 bg-gradient-to-b from-white to-gray-100 sticky top-0 z-20">
            <div className="flex items-stretch shadow-[inset_0_-15px_20px_rgba(0,0,0,0.10)]">
              {steps.map((step, index) => (
                <div
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`relative flex flex-1 items-center justify-between py-2 px-4 cursor-pointer 
                    ${step.active ? "bg-white" : "bg-transparent"}
                    ${index !== steps.length - 1 ? "border-r border-gray-300" : ""}
                  `}
                >
                  <p
                    className={`text-[10px] tracking-widest uppercase font-bold
                    ${step.active ? "text-gray-800" : "text-gray-400"}
                  `}
                  >
                    {step.label}
                  </p>

                  <div className="relative flex items-center">
                    <img
                      src={step.icon}
                      alt={step.label}
                      className={`${step.active ? "w-16 h-16" : "w-12 h-12 opacity-30"} object-contain`}
                    />
                    {step.active && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8DC63F] rounded-full border-2 border-white p-1 shadow">
                        <Check className="text-white w-3 h-3 stroke-[4]" />
                      </div>
                    )}
                  </div>

                  {/* Chevrons logic remains exactly as you had it */}
                  {step.active && index < steps.length - 1 && (
                    <div className="absolute right-7 top-0 bottom-0 flex items-center pointer-events-none">
                      {["#8CC63F", "#C1DE9B", "#D8E7C5"].map((color, i) => (
                        <div
                          key={i}
                          className="absolute w-[26px] h-full"
                          style={{
                            backgroundColor: color,
                            left: `${i * 10}px`,
                            clipPath:
                              "polygon(70% 0%, 90% 50%, 70% 100%, 40% 100%, 62% 50%, 40% 0%)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* ===== Main Content ===== */}
          <div className="flex gap-4 min-h-[750px] items-stretch">
            {/* Left Dynamic Panel: Control Panel */}
            <div className="w-[420px] shrink-0  flex flex-col">
              {activeStep === "Configurations" && <SelectModel />}
              {activeStep === "Wall Panels" && <WallpanelController />}
              {activeStep === "Handrails" && <HandrailController />}
              {activeStep === "Ceilings" && <CeilingController />}
              {activeStep === "Review" && <Review />}
            </div>

            {/* Right Constant Panel: Preview Stage */}
            <div className="flex-grow   relative min-h-full">
              <OpenModel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}