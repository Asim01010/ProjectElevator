import React, { useState } from "react";
import { Check } from "lucide-react";
import SelectModel from "./Configuration/SelectModel";
import OpenModel from "./Configuration/OpenModel";

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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-20 px-68">
      <div className="w-full max-w-[1400px] bg-transparent">
        {/* ===== Top Navigation ===== */}
        <nav className="w-full border border-gray-300 bg-gradient-to-b from-white to-gray-100">
          <div className="flex items-stretch shadow-[inset_0_-20px_6px_rgba(0,0,0,0.10)]">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => handleStepClick(index)}
                className={`relative flex flex-1 items-center justify-between py-1 px-4 cursor-pointer 
                  ${step.active ? "bg-white" : "bg-transparent"}
                  ${index !== steps.length - 1 ? "border-r border-gray-300" : ""}
                `}
              >
                {/* Step Label */}
                <p
                  className={`text-xs tracking-widest uppercase self-start
                  ${step.active ? "text-gray-600 font-bold" : "text-gray-500 font-bold"}
                `}
                >
                  {step.label}
                </p>

                {/* Step Icon */}
                <div className="relative flex items-center">
                  <img
                    src={step.icon}
                    alt={step.label}
                    className={`${step.active ? "w-16 h-16" : "w-14 h-14 opacity-40"} object-contain`}
                  />

                  {/* Active Check */}
                  {step.active && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#8DC63F] rounded-full border-2 border-white p-1 shadow">
                      <Check className="text-white w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Chevron Arrows */}
                <div className="h-full">
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
              </div>
            ))}
          </div>
        </nav>

        {/* ===== Main Content ===== */}
        <div className="flex min-h-[600px]">
          <SelectModel />
          <OpenModel />
        </div>
      </div>
    </div>
  );
}
