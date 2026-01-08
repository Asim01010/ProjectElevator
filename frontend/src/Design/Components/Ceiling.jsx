import React from 'react'
import { CeilingData } from './ConfigurationData/ceiling';

const Ceiling = () => {
  return (
    <>
      <div className="flex flex-col">
        <small>
          LEVELe-102 | CEILING SELECTION: Ceilings may be specified with one of
          several lighting configurations. Material options include Stainless
          Steel and Fused Metal in finishes to complement the wall panels. Begin
          by selecting a lighting configuration below.
        </small>
        <div className="bg-black text-white w-full max-w-4xl mx-auto font-sans">
                {/* TOP IMAGE PLACEHOLDER */}
                <div className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-900 mb-6"></div>
        
                {/* TITLE */}
                <p className="px-4 text-sm font-semibold mb-6">
                  QUADRANT HANDRAIL: Rail in Satin Stainless Steel with Block Standoff
                  in Satin Stainless Steel
                </p>
        
                {/* SECTIONS */}
                <div className="flex flex-col gap-6">
                  {CeilingData.map((section, index) => (
                    <div key={index}>
                      {/* SECTION HEADER */}
                      <div className="bg-gray-700 px-4 py-2 text-xs font-semibold tracking-wide uppercase">
                        {section.name}
                      </div>
        
                      {/* OPTIONS GRID */}
                      <div className="px-4 py-4">
                        <div className="grid grid-cols-6 gap-3">
                          {section.images.map((img, i) => (
                            <div
                              key={i}
                              className="aspect-square bg-black border border-gray-500 flex items-center justify-center cursor-pointer hover:border-gray-300 transition"
                            >
                              <img
                                src={img}
                                alt={`handrail-${i}`}
                                className="w-full h-full object-contain"
                                onError={() => console.log("Image not found:", img)}
                              />
                              <div className="w-10 h-10 bg-gray-600"></div>
                            </div>
                          ))}
        
                          {/* OPTIONAL NONE BOX (only for first section) */}
                          {index === 0 && (
                            <div className="aspect-square bg-black border border-white flex items-center justify-center text-xs font-semibold">
                              NONE
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
      </div>
    </>
  );
}

export default Ceiling
