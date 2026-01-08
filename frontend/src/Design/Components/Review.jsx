import React from "react";

const Review = () => {
  return (
    <div className="flex flex-col font-sans text-xs">
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <small className="text-gray-700 leading-relaxed">
          <span className="font-semibold text-gray-900">
            LEVELe-102 | DESIGN REVIEW:
          </span>{" "}
          Your elevator design is complete. At right, you can see how it looks.
          Below, you can provide additional details required for the ‘Advanced
          Download’ feature. Finally, you can choose where to go from here:
          download a PDF of your design; begin a new design; or go to your
          ‘Projects’ folder.
        </small>
      </div>

      <div className="border border-gray-300 rounded-lg w-full p-5 flex flex-col gap-4 bg-white shadow-sm">
        {/* DIMENSIONS SECTION */}
        <div className="border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-4 bg-[#8DC63F] rounded-sm"></div>
            <small className="font-semibold text-gray-700">+ DIMENSIONS</small>
          </div>
          <small className="text-gray-500 block mb-4">
            Dimensions are not mandatory at this stage to complete your design.
            However, you will need to provide them to request an ‘Advanced
            Download’. You can do this now or in the future.
          </small>

          <div className="border border-gray-300 rounded-md flex flex-col items-start justify-start p-4 gap-4 bg-gray-50">
            {["DEPTH", "WIDTH", "CAB SHELL HEIGHT", "CEILING HEIGHT"].map(
              (item, index) => (
                <div key={index} className="flex items-center gap-3 w-full">
                  <button className="w-10 h-10 border border-gray-400 rounded-md flex items-center justify-center text-gray-600 hover:border-[#8DC63F] hover:text-[#8DC63F] transition-colors">
                    {`0${index + 1}`}
                  </button>
                  <p className="text-gray-600 font-medium">{item}</p>
                </div>
              )
            )}

            <button className="px-4 py-2 text-xs font-semibold bg-[#8DC63F] hover:bg-[#7CB536] text-white rounded-md transition-colors shadow-sm hover:shadow">
              EDIT CAB DIMENSION
            </button>
          </div>
        </div>

        {/* QUANTITY */}
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 bg-[#8DC63F] rounded-sm"></div>
            <small className="font-semibold text-gray-700">+ Quantity</small>
          </div>
          <input
            type="number"
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border border-gray-300 rounded-md w-20 px-3 py-1 text-center focus:border-[#8DC63F] focus:outline-none focus:ring-1 focus:ring-[#8DC63F]"
            defaultValue="1"
          />
        </div>

        {/* ADDITIONAL COMMENTS */}
        <div className="border-b pb-4">
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-md placeholder:text-gray-400 placeholder:text-xs text-xs p-3 text-gray-600 focus:border-[#8DC63F] focus:outline-none focus:ring-1 focus:ring-[#8DC63F] resize-none"
            placeholder="Use this Shield to share any additional comment on your elevator"
          ></textarea>
        </div>

        {/* COLLAPSIBLE DETAILS */}
        <div className="border-b pb-4">
          <button className="flex items-center gap-2 group">
            <div className="w-2 h-4 bg-[#8DC63F] rounded-sm"></div>
            <small className="font-semibold text-gray-700 group-hover:text-[#8DC63F] transition-colors">
              + Less Details (click to collapse)
            </small>
          </button>

          <div className="flex flex-col gap-3 mt-4 pl-4">
            {[
              "Job Type",
              "Elevator Type",
              "Cab Shell Material",
              "Manufacturer",
            ].map((label, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-gray-600 font-medium">{`+ ${label}:`}</p>
                <select
                  className="border border-gray-300 rounded px-3 py-1 text-xs text-gray-600 focus:border-[#8DC63F] focus:outline-none focus:ring-1 focus:ring-[#8DC63F]"
                  defaultValue=""
                >
                  <option value="">Select an Option</option>
                  <option value="new">New</option>
                  <option value="modernization">Modernization</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* WARM-UP SECTION */}
        <div className="p-3 flex flex-col gap-3 bg-gray-50 rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 bg-[#8DC63F] rounded-sm"></div>
            <small className="font-semibold text-gray-800">WARM-UP</small>
          </div>
          <small className="text-gray-500 leading-relaxed">
            You've reached the end of the design process. Your selections have
            automatically been saved. From here, you can choose from the options
            below to: download a PDF that provides a visual recap and product
            details for your design; begin a new design; or go your Project
            page.
          </small>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4 justify-center">
          {[
            { label: "DOWNLOAD", icon: "Configuration/levele-101-b.svg" },
            {
              label: "NEW ELEVATOR INTERIOR",
              icon: "Configuration/levele-101-b.svg",
            },
            { label: "GO TO PROJECT", icon: "Configuration/levele-101-b.svg" },
          ].map((action, index) => (
            <button
              key={index}
              className="px-4 py-3 border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#8DC63F] hover:shadow-md transition-all flex-1 max-w-[140px]"
            >
              <img
                src={action.icon}
                width={40}
                alt={action.label}
                className="opacity-80"
              />
              <span className="text-[11px] font-semibold text-gray-700">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
