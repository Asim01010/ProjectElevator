import React, { useState } from "react";
import { Check } from "lucide-react";

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
    {
      label: "Review",
      icon: "/ConfigurationNavbar/review.png",
      active: false,
    },
  ]);

  const handleStepClick = (clickedIndex) => {
    setSteps(
      steps.map((step, index) => ({
        ...step,
        active: index === clickedIndex,
      }))
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="flex flex-col w-full max-w-7xl">
          <nav className="w-full border border-gray-300 bg-gradient-to-b from-white to-gray-100">
            <div className="flex items-stretch">
              {steps.map((step, index) => (
                <div
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`relative flex flex-1 items-center justify-between py-4 px-4 cursor-pointer
                    ${step.active ? "bg-white" : "bg-transparent"}
                    ${
                      index !== steps.length - 1
                        ? "border-r border-gray-300"
                        : ""
                    }
                  `}
                >
                  {/* Text - Top Left */}
                  <p
                    className={`text-xs tracking-widest uppercase whitespace-nowrap self-start
                      ${
                        step.active
                          ? "text-gray-700 font-semibold"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {step.label}
                  </p>

                  {/* Icon - Right Center */}
                  <div className="relative flex items-center">
                    <img
                      src={step.icon}
                      alt={step.label}
                      className={`${
                        step.active ? "w-16 h-16" : "w-14 h-14 opacity-40"
                      } object-contain`}
                    />

                    {/* Active Tick - Dead Center of Image */}
                    {step.active && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8DC63F] rounded-full border-2 border-white p-1 shadow-md">
                        <Check className="text-white w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Active Green Chevron */}
                  {step.active && index < steps.length - 1 && (
                    <div className="absolute  right-0 top-0 bottom-0 flex items-center pointer-events-none">
                      {/* Chevron 1 */}
                      <div
                        className="absolute w-[26px] h-full bg-[#8CC63F]"
                        style={{
                          clipPath:
                            "polygon(75% 0%, 100% 50%, 75% 100%, 35% 100%, 62% 49%, 46% 0)",
                        }}
                      />
                      {/* Chevron 2 */}
                      <div
                        className="absolute w-[26px] h-full bg-[#C1DE9B]"
                        style={{
                          clipPath:
                            "polygon(75% 0%, 100% 50%, 75% 100%, 35% 100%, 62% 49%, 46% 0)",
                        }}
                      />
                      {/* Chevron 3 */}
                      <div
                        className="absolute w-[26px] h-full bg-[#D8E7C5]"
                        style={{
                          clipPath:
                            "polygon(75% 0%, 100% 50%, 75% 100%, 35% 100%, 62% 49%, 46% 0)",
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          <div className="flex p-2 bg-green-500">
            <div className="flex w-[40%] bg-amber-500 p-2 h-96"></div>
            <div className="flex w-[60%] bg-red-400 p-2 h-96"></div>
          </div>
        </div>
      </div>
    </>
  );
}
