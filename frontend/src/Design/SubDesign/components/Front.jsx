import React from 'react'
const MATERIALS = {
  "GAF-001": {
    name: "GAF-001",
    images: [
      "Sending/GAF-001/v2/1.png",
      "Sending/GAF-001/v2/2.png",
      "Sending/GAF-001/v2/3.png",
      "Sending/GAF-001/v2/4.png",
      "Sending/GAF-001/v2/5.png",
      "Sending/GAF-001/v2/6.png",
      "Sending/GAF-001/v2/7.png",
      "Sending/GAF-001/v2/8.png",
      "Sending/GAF-001/v2/9.png",
      "Sending/GAF-001/v2/10.png",
      "Sending/GAF-001/v2/11.png",
      "Sending/GAF-001/v2/12.png",
      "Sending/GAF-001/v2/13.png",
      "Sending/GAF-001/v2/14.png",
     
    ],
  },
  "GAF-003": {
    name: "GAF-003",
    images: [
      "Sending/GAF-003/v2/1.png",
      "Sending/GAF-003/v2/2.png",
      "Sending/GAF-003/v2/3.png",
      "Sending/GAF-003/v2/4.png",
      "Sending/GAF-003/v2/5.png",
      "Sending/GAF-003/v2/6.png",
      "Sending/GAF-003/v2/7.png",
      "Sending/GAF-003/v2/8.png",
      "Sending/GAF-003/v2/9.png",
      "Sending/GAF-003/v2/10.png",
      "Sending/GAF-003/v2/11.png",
      "Sending/GAF-003/v2/12.png",
      "Sending/GAF-003/v2/13.png",
      "Sending/GAF-003/v2/14.png",
     
    ],
  },
};
const Front = () => {
  return (
    <div className="flex items-center justify-center">
      {/* IMPORTANT: parent must be relative */}
      <div
        className="relative"
        style={{
          width: "600px",
          height: "800px",
        }}
      >
        {MATERIALS["GAF-001"].images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Panel ${index + 1}`}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              zIndex: index + 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Front
