import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronDoubleUp } from "react-icons/hi";
export default function OpenModel() {
  return (
    <div className="w-full h-full relative flex  ">
      {/* ===== Top Right Info Overlay ===== */}
      <div className="absolute top-4 right-6  text-gray-500 text-right z-10 backdrop-blur-sm  rounded-sm border border-gray-100">
        <span className="underline cursor-pointer hover:text-gray-800 transition-colors">
          Cassidy Delacruz
        </span>
        {" | "}
        <strong className="text-gray-800">LEVELe-108 #2</strong>{" "}
        <span className="underline cursor-pointer text-lime-600 font-bold ml-1">
          (edit)
        </span>
      </div>

      {/* ===== Central Preview Stage ===== */}
      <div className="flex-grow flex flex-col items-center justify-center p-10">
        {/* Shadow floor to give 3D feel */}
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
          {/* The Text background */}
          <h1 className="text-7xl font-black text-gray-200/50 absolute select-none">
            PREVIEW
          </h1>

          {/* Main Title */}
          <div className="relative z-0 flex flex-col items-center">
            <span className="text-xs font-bold text-gray-400 tracking-[0.5em] mb-2">
              MODEL
            </span>
            <h2 className="text-5xl text-gray-800 font-bold tracking-tight">
              LEVELe-108
            </h2>
            <div className="w-24 h-1 bg-lime-500 mt-4"></div>
          </div>
        </div>
      </div>

      {/* ===== Bottom Navigation Bar ===== */}
      <div className=" flex flex-col justify-start items-center gap-4 mt-40 ">
        <div className="flex items-center justify-center  border">
          <HiChevronDoubleLeft size={30} />
        </div>
        <div className="flex items-center justify-center  border">
          <HiChevronDoubleUp size={30} />
        </div>
        <div className="flex items-center justify-center  border">
          <HiChevronDoubleRight size={30} />
        </div>

        <button
          className="group relative flex items-center justify-center border bg-[#8DC63F] hover:bg-gray-800 text-white py-6 px-1 font-bold uppercase text-xs tracking-[0.2em] transition-all duration-300 cursor-pointer"
          style={{
            clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)",
          }}
        >
          <span className="">Next</span>
        </button>
      </div>
    </div>
  );
}
