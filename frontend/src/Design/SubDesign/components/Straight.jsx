// Straight.jsx
import React from "react";

const MATERIALS = {
  "GAF-001": {
    name: "GAF-001",
    images: Array.from(
      { length: 20 },
      (_, i) => `Sending/GAF-001/v1/${i + 1}.png`
    ),
  },
  "GAF-003": {
    name: "GAF-003",
    images: Array.from(
      { length: 20 },
      (_, i) => `Sending/GAF-003/v1/${i + 1}.png`
    ),
  },
};

const Straight = ({ panelMaterials = [], activePanel = null }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: "600px",
          height: "800px",
        }}
      >
        {panelMaterials.map((materialKey, index) => {
          const imageSrc = MATERIALS[materialKey]?.images[index];

          if (!imageSrc) {
            return null; // safety
          }

          const isActive = activePanel === index;

          return (
            <img
              key={index}
              src={imageSrc}
              alt={`Panel ${index + 1}`}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-300"
              style={{
                zIndex: isActive ? 100 : index + 1,
                filter: isActive
                  ? "brightness(1.15) drop-shadow(0 0 20px rgba(141,198,63,0.6))"
                  : "none",
                border: isActive ? "4px solid #8DC63F" : "none",
                borderRadius: isActive ? "8px" : "0",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Straight;
