// WallPanels.jsx
import React from "react";

const WallPanels = ({
  activePanel,
  setActivePanel,
  panelMaterials,
  setPanelMaterials,
}) => {
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  const applyMaterial = (material) => {
    if (activePanel === null) return;

    setPanelMaterials((prev) => {
      const updated = [...prev];
      updated[activePanel] = material;
      return updated;
    });
  };

  const currentMaterial =
    activePanel !== null ? panelMaterials[activePanel] : null;

  return (
    <div className="flex flex-col gap-8 p-4">
      <h3 className="text-2xl font-bold text-gray-800">Select Panel</h3>

      <div className="grid grid-cols-5 gap-4">
        {numbers.map((num, index) => (
          <button
            key={num}
            onClick={() => setActivePanel(index)}
            className={`w-16 h-16 text-xl font-bold rounded-xl border-4 transition-all duration-300 shadow-lg
              ${
                activePanel === index
                  ? "bg-[#8DC63F] text-white border-[#8DC63F] scale-110 shadow-2xl"
                  : "bg-white text-gray-800 border-gray-300 hover:border-gray-500 hover:scale-105"
              }`}
          >
            {num}
          </button>
        ))}
      </div>

      {activePanel !== null && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl border-2 border-[#8DC63F]">
          <p className="text-lg font-semibold text-gray-700 mb-6">
            Selected Panel:{" "}
            <span className="text-[#8DC63F] text-2xl">{activePanel + 1}</span>
            <br />
            Current Material: <strong>{currentMaterial}</strong>
          </p>

          <h4 className="text-xl font-bold text-gray-800 mb-6">
            Choose Material
          </h4>

          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => applyMaterial("GAF-001")}
              className={`relative aspect-square rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border-4
                ${
                  currentMaterial === "GAF-001"
                    ? "border-[#8DC63F] ring-8 ring-[#8DC63F]/30 scale-105"
                    : "border-gray-400 hover:border-gray-600"
                }`}
            >
              <img
                src="Sending/GAF-001/v1/1.png"
                alt="GAF-001"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                <span className="text-white text-lg font-bold">GAF-001</span>
              </div>
            </button>

            <button
              onClick={() => applyMaterial("GAF-003")}
              className={`relative aspect-square rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 border-4
                ${
                  currentMaterial === "GAF-003"
                    ? "border-[#8DC63F] ring-8 ring-[#8DC63F]/30 scale-105"
                    : "border-gray-400 hover:border-gray-600"
                }`}
            >
              <img
                src="Sending/GAF-003/v1/1.png"
                alt="GAF-003"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4">
                <span className="text-white text-lg font-bold">GAF-003</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WallPanels;
