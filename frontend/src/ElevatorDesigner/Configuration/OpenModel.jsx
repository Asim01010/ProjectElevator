import React from "react";

export default function OpenModel() {
  return (
    <div className="w-[60%] relative flex flex-col items-center justify-center">
      {/* ===== Top Right P Tag ===== */}
      <p className="absolute top-0 right-0  text-gray-700 text-right">
        <span className="underline cursor-pointer">Cassidy Delacruz</span>{" "}
        <strong>LEVELe-108 #2</strong>{" "}
        <span className="underline cursor-pointer">(edit)</span>
      </p>

      {/* ===== Large Model Preview ===== */}
      <div className="text-5xl text-gray-400 font-semibold mb-8 relative">
        LEVELe-108
        <div className="absolute inset-0 border-4 border-transparent rounded-full" />
      </div>

      {/* ===== Next Button ===== */}
      <button className="absolute right-6 bottom-6 bg-[#8DC63F] text-white px-6 py-3 font-semibold clip-path-chevron">
        Next
      </button>
    </div>
  );
}
