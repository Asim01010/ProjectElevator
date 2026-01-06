import React from "react";
import Navbar from "../components/Navbar";
import { designNav } from "./Data/DesignNav";
import Configuration from "./Components/Configuration";
import ConfigureModal from "./SubDesign/ConfigureModal";

const Design = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <div className="bg-white border-gray-200">
          <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
            <div className="flex items-center space-x-1 overflow-x-auto py-3">
              {designNav.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 group cursor-pointer min-w-max"
                >
                  <span className="font-medium text-gray-700 group-hover:text-[#8DC63F] transition-colors whitespace-nowrap">
                    {item.name}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#8DC63F] text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <img
                    width={28}
                    height={28}
                    src={item.image}
                    alt={item.name}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="w-[40%] p-2 bg-green-200">
                <Configuration />
              </div>
              <div className="w-[60%] p-2 bg-amber-400">
                <ConfigureModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;
