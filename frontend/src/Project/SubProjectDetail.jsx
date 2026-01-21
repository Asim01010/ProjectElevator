import React from 'react'
import { HiDownload } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // ← add
import { useDispatch } from "react-redux"; // ← add
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { deleteSubproject, duplicateSubproject } from '../redux/features/Project/projectSlice';
const SubProjectDetail = ({
  subproject, // ← we will pass this
  projectId, // ← we will pass this
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!subproject) {
    return <div className="p-8 text-center">No design selected</div>;
  }

  const handleDelete = () => {
    if (window.confirm("Delete this design? This cannot be undone.")) {
      dispatch(deleteSubproject({ projectId, subId: subproject._id }));
    }
  };

  const handleDuplicate = () => {
    const newName = prompt(
      "New elevator name:",
      `${subproject.elevatorName} (Copy)`,
    );
    if (newName && newName.trim()) {
      dispatch(
        duplicateSubproject({
          projectId,
          subId: subproject._id,
          newElevatorName: newName.trim(),
        }),
      );
    }
  };

  const handleEdit = () => {
    navigate(`/design/${subproject._id}`);
  };

  // ... your existing JSX stays exactly the same ...

  return (
    <div className="w-[70%] border-b border-e border-s bg-[#F1F2F2]">
      <div className="grid grid-cols-3 gap-6  text-[12px] text-gray-700">
        {/* Column 1 - Left Preview Section */}
        <div>
          <div className="relative mt-3">
            <img
              src="/Howorks.jpg"
              alt="Elevator Preview"
              className="w-full object-contain"
            />
            <span className="absolute bottom-4 right-4 text-black font-bold opacity-70 text-[22px]">
              IN PROGRESS
            </span>
          </div>

          <div className="mt-4 space-y-2 p-4">
            <p>
              <strong>CREATED:</strong>{" "}
              {new Date(subproject.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>MODIFIED:</strong>{" "}
              {new Date(subproject.updatedAt).toLocaleString()}
            </p>
            <p>
              <strong>STATUS:</strong> {subproject.status || "In Progress"}
            </p>
            <p className="mt-2 leading-relaxed text-gray-500">
              Your elevator interior design status will change from 'In
              Progress' to 'Complete' once you reach 'Step Five: Review'. This
              will activate the download links below.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <button className="flex uppercase items-center gap-2 text-gray-500 hover:text-gray-800 underline text-[12px]">
                  <HiDownload /> Overview PDF
                </button>
                <button className="flex uppercase items-center gap-2 text-gray-500 hover:text-gray-800 underline text-[12px]">
                  <HiDownload /> Design JPG
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800 underline text-[12px]">
                  <HiDownload /> ADVANCE DOWNLOAD
                </button>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-800 underline text-[12px]"
                >
                  <MdOutlineModeEdit /> EDIT DESIGN
                </button>
                <button
                  onClick={handleDuplicate}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-800 underline text-[12px]"
                >
                  <IoCopyOutline /> DUPLICATE
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-800 underline text-[12px]"
                >
                  <MdDeleteForever /> DELETE DESIGN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 - Left Form Column */}
        <div className="flex flex-col gap-2 py-4">
          {/* Elevator Name */}
          <div className="flex items-center">
            <label className="whitespace-nowrap font-semibold text-[12px] w-[140px]">
              ELEVATOR NAME:
            </label>
            <input
              type="text"
              value={subproject.elevatorName || ""}
              readOnly
              className="flex-1 border px-2 py-1 bg-white text-[12px]"
            />
          </div>

          {/* Configuration */}
          <div className="flex items-center">
            <label className="whitespace-nowrap font-semibold text-[12px] w-[140px]">
              CONFIGURATION:
            </label>
            <p className="text-[12px]">LEVEL-e-102</p>
          </div>

          {/* Frame Style */}
          <div className="flex items-center">
            <label className="whitespace-nowrap font-semibold text-[12px] w-[140px]">
              FRAME STYLE:
            </label>
            <p className="text-[12px]">Minimal</p>
          </div>

          {/* Lightplane */}
          <div className="flex items-center">
            <label className="whitespace-nowrap font-semibold text-[12px] w-[140px]">
              LIGHTPLANE:
            </label>
            <div>
              <p className="text-[12px]">Panel A - N</p>
              <p className="text-[12px]">Panel B - N</p>
            </div>
          </div>

          {/* Dimensions Box */}
          <div className="border p-3 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <span className="border px-2 py-1 text-[12px]">D1</span>
              <span className="text-[12px]">DEPTH:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="border px-2 py-1 text-[12px]">W1</span>
              <span className="text-[12px]">WIDTH:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="border px-2 py-1 text-[12px]">H1</span>
              <span className="text-[12px]">CAB SHELL HEIGHT:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="border px-2 py-1 text-[12px]">H2</span>
              <span className="text-[12px]">CEILING HEIGHT:</span>
            </div>

            <div className="col-span-2 mt-2">
              <button className="bg-lime-500 text-white px-5 py-2 font-semibold text-[12px]">
                EDIT CAB DIMENSIONS
              </button>
            </div>
          </div>

          {/* Opening Option */}
          <div className="flex items-center">
            <label className="whitespace-nowrap font-semibold text-[12px] w-[140px]">
              OPENING OPTION: <span className="text-red-500">*</span>
            </label>
            <select className="flex-1 border px-2 py-1 bg-white text-gray-500 text-[12px]">
              <option>Front</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="flex items-center">
            <label className="font-semibold text-[12px] w-[140px]">
              QUANTITY: <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value="1"
              className="flex-1 border px-2 py-1 bg-white text-[12px]"
            />
          </div>
        </div>

        {/* Column 3 - Right Form Column */}
        <div className="flex flex-col gap-4 py-4 px-2">
          {/* Job Type */}
          <div className="flex items-center">
            <label className="font-semibold text-[12px] whitespace-nowrap w-[140px]">
              JOB TYPE:
            </label>
            <select className="flex-1 border px-2 py-1 bg-white text-gray-500 text-[12px]">
              <option>Select an Option</option>
            </select>
          </div>

          {/* Elevator Type */}
          <div className="flex items-center">
            <label className="font-semibold text-[12px] whitespace-nowrap w-[140px]">
              ELEVATOR TYPE:
            </label>
            <select className="flex-1 border px-2 py-1 bg-white text-gray-500 text-[12px]">
              <option>Select an Option</option>
            </select>
          </div>

          {/* Shell Material */}
          <div className="flex items-center">
            <label className="font-semibold text-[12px] whitespace-nowrap w-[140px]">
              SHELL MATERIAL:
            </label>
            <select className="flex-1 border px-2 py-1 bg-white text-gray-500 text-[12px]">
              <option>Select an Option</option>
            </select>
          </div>

          {/* Manufacturer */}
          <div className="flex items-center">
            <label className="font-semibold text-[12px] whitespace-nowrap w-[140px]">
              MANUFACTURER:
            </label>
            <select className="flex-1 border px-2 py-1 bg-white text-gray-500 text-[12px]">
              <option>Select an Option</option>
            </select>
          </div>

          {/* Comments */}
          <div className="flex items-start">
            <label className="font-semibold text-[12px] w-[140px]">
              COMMENTS:
            </label>
            <textarea
              rows="4"
              className="flex-1 border px-2 py-1 resize-none bg-white text-[12px]"
            ></textarea>
          </div>

          {/* Mandatory Text */}
          <div className="text-red-500 text-[12px]">
            * Mandatory field
            <br />
            This information is required to request an 'Advanced Download'.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubProjectDetail
