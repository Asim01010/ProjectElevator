import React, { useState } from "react";

const Review = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full max-w-6xl mx-auto  font-sans">
      {/* Top Header Text */}
      <div className="flex justify-between items-start mb-6 text-[11px] leading-relaxed text-gray-500">
        <p className="w-full uppercase">
          <span className="font-bold text-gray-700">
            LEVELe-101B | DESIGN REVIEW:
          </span>{" "}
          Your elevator design is complete. At right, you can see how it looks.
          Below, you can provide additional details required for the ‘Advanced
          Download’ feature. Finally, you can choose where to go from here:
          download a PDF of your design; begin a new design; or go to your
          ‘Projects’ folder.
        </p>
      </div>

      {/* Main Form Container */}
      <div
        className="w-full border border-gray-400 p-2 flex flex-col gap-4 overflow-y-scroll shadow-[inset_0_-15px_20px_rgba(0,0,0,0.05)] "
        style={{ scrollbarWidth: "none" }}
      >
        <small className="font-bold text-gray-600 tracking-widest">
          + DIMENSIONS
        </small>
        <p className="text-[11px] text-gray-500 italic">
          Dimensions are not mandatory at this stage to complete your design.
          However, you will need to provide them to request an ‘Advanced
          Download’. You can do this now or in the future.
        </p>

        {/* Dimension Entry Area */}
        <div className="p-4 border border-gray-300 bg-gray-50 flex flex-col gap-3">
          <DimensionRow label="D1" title="DEPTH:" />
          <DimensionRow label="W1" title="WIDTH:" />
          <DimensionRow label="H1" title="CAB SHELL HEIGHT:" />
          <DimensionRow label="H2" title="CEILING HEIGHT:" />

          <button className="bg-[#8DC63F] hover:bg-[#7cb135] text-white font-bold py-2 px-4 text-xs mt-2 transition-colors">
            EDIT CAB DIMENSIONS
          </button>
        </div>

        {/* Quantity Input */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <small className="font-bold text-gray-600">+ QUANTITY:</small>
          <input
            type="number"
            className="border border-gray-400 w-16 text-center text-sm p-1 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {/* Notes Textarea */}
        <textarea
          rows={4}
          placeholder="Enter project notes here..."
          className="w-full border border-gray-400 p-2 text-xs outline-none focus:border-gray-600 placeholder:italic"
        ></textarea>

        {/* Collapsible Details */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-left text-[10px] font-bold text-gray-500 underline uppercase tracking-tighter"
        >
          {isOpen
            ? "+ Less Details (click to collapse)"
            : "+ More Details (click to expand)"}
        </button>

        {isOpen && (
          <div className="flex flex-col gap-2 animate-in fade-in duration-300">
            <SelectRow label="Job Type" />
            <SelectRow label="Job Type" />
            <SelectRow label="Job Type" />
            <SelectRow label="Job Type" />
          </div>
        )}
      </div>

      {/* Wrap-Up Section */}
      <div className="w-full border border-gray-400  flex flex-col gap-4 shadow-[inset_0_-15px_20px_rgba(0,0,0,0.05)]">
        <small className="font-bold text-gray-600 uppercase tracking-widest text-center">
          Wrap-Up
        </small>
        <p className="text-[11px] text-gray-500 text-center px-4 leading-relaxed">
          You’ve reached the end of the design process. Your selections have
          automatically been saved. From here, you can choose from the options
          below to: download a PDF that provides a visual recap and product
          details for your design; begin a new design; or go your Project page.
        </p>

        <div className="flex items-center justify-around mt-4">
          <ActionItem img="/octagon.webp" label="DOWNLOAD" />
          <ActionItem img="/octagon.webp" label="NEW ELEVATOR INTERIOR" />
          <ActionItem img="/octagon.webp" label="GO TO PROJECT" />
        </div>
      </div>
    </div>
  );
};

// Helper: Dimension Row
const DimensionRow = ({ label, title }) => (
  <div className="flex items-center gap-4">
    <div className="border-2 border-gray-400 text-gray-600 font-bold w-10 h-10 flex items-center justify-center text-xs bg-white">
      {label}
    </div>
    <p className="text-[11px] font-bold text-gray-700 tracking-wider uppercase">
      {title}
    </p>
    <div className="flex-grow border-b border-dotted border-gray-300 mb-1"></div>
    <input
      type="text"
      className="w-20 border-b border-gray-400 bg-transparent outline-none text-right text-xs p-1"
      placeholder="0.00"
    />
  </div>
);

// Helper: Select Row
const SelectRow = ({ label }) => (
  <div className="flex justify-between items-center py-1 border-b border-gray-100">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      + {label}:
    </p>
    <select className="text-[11px] border-none bg-transparent font-bold text-gray-700 outline-none cursor-pointer">
      <option value="">Select an option</option>
      <option value="">New</option>
      <option value="">Modernization</option>
    </select>
  </div>
);

// Helper: Bottom Action Items
const ActionItem = ({ img, label }) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer w-24">
    <div className="border border-gray-300 p-2 group-hover:border-gray-500 transition-colors">
      <img
        src={img}
        width={60}
        height={60}
        alt={label}
        className="opacity-80 group-hover:opacity-100"
      />
    </div>
    <span className="text-[9px] font-bold text-gray-600 text-center leading-tight uppercase tracking-tighter">
      {label}
    </span>
  </div>
);

export default Review;
