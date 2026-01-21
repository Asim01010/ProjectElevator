// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getUserProjects,
  createProject,
  projectReset,
  duplicateProject,
  deleteProject,
} from "../redux/features/Project/projectSlice";
import { FilePenLine, PlusCircle } from "lucide-react";
import ProjectsGrid from "./components/ProjectsGrid";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    projects,
    projectLoading,
    projectSuccess,
    projectError,
    projectMessage,
  } = useSelector((state) => state.project);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState("date");

  // Fetch projects on mount
  useEffect(() => {
    dispatch(getUserProjects());
  }, [dispatch]);

  // Toast + reset + redirect after create
  useEffect(() => {
    if (projectSuccess) {
      toast.success(projectMessage || "Operation successful");
      dispatch(projectReset());

      if (projectMessage?.includes("created")) {
        const latestProject = projects[projects.length - 1];
        if (latestProject?._id) {
          navigate(`/project/${latestProject._id}`);
        }
      }
    }

    if (projectError) {
      toast.error(projectMessage || "Something went wrong");
      dispatch(projectReset());
    }
  }, [
    projectSuccess,
    projectError,
    projectMessage,
    projects,
    navigate,
    dispatch,
  ]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim()) {
      return toast.error("Project name and company are required");
    }
    dispatch(createProject(formData));
    setFormData({ name: "", company: "" });
    setShowCreateModal(false);
  };

  // Client-side search & sort
  const filteredAndSortedProjects = projects
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortMode === "az") return a.name.localeCompare(b.name);
      if (sortMode === "za") return b.name.localeCompare(a.name);
      if (sortMode === "date")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-12 xl:px-40 2xl:px-60">
      {/* Header Text */}
      <div className="max-w-6xl mx-auto text-justify mb-8 sm:mb-5">
        <h1 className="text-sm sm:text-base lg:text-xl font-light text-gray-500 tracking-wide px-4">
          FAST-TRACK THE DESIGN PROCESS! my.EDS lets you create and manage
          Elevator Design Studio projects, designs, and your profile information
          from one spot.
        </h1>
      </div>
      <hr className="max-w-6xl mx-auto border-t border-gray-300 mb-8 sm:mb-10" />

      {/* Top Section: My Profile + How Does It Work? */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 sm:mb-10 ">
        {/* My Profile */}
        <div className="border-e">
          <h2 className="text-lg sm:text-sm font-normal text-gray-600 mb-4 sm:mb-6 tracking-wide">
            MY PROFILE
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 px-3">
            <img
              src="/Howorks.jpg"
              alt="Profile placeholder"
              className="w-48 sm:w-48 md:w-48 h-48 object-cover shadow-sm border"
            />
            <div className="space-y-1 sm:space-y-2 text-xs underline font-light w-full sm:w-auto">
              <Link
                to="/profile-edit"
                className="flex items-center justify-center sm:justify-start gap-1 text-gray-700 hover:underline tracking-wide"
              >
                <FilePenLine size={14} />Edit Username/Password
              </Link>
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start gap-2 text-gray-700 hover:underline tracking-wide"
              >
                 <Link
                to="/profile-edit"
                className="flex items-center justify-center sm:justify-start gap-1 text-gray-700 hover:underline tracking-wide"
              >

                <FilePenLine size={14} />Edit Contact Information
              </Link>
              </a>
            </div>
          </div>
        </div>

        {/* How Does It Work? */}
        <div>
          <h2 className="text-lg sm:text-sm font-normal text-gray-600 mb-4 sm:mb-1 tracking-wide">
            HOW DOES IT WORK?
          </h2>
          <div className="flex items-center justify-center">
            <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 font-light tracking-wide text-[10px] sm:text-[12px] w-[80%]">
              Getting started with the Elevator Design Studio (EDS) is easy. In
              10 simple steps, this tutorial will show you how to select your
              elevator interior configuration, apply materials and finishes,
              view your progress with realistic renderings, and manage your
              project from a single location.{" "}
              <span className="text-gray-500 font-light tracking-wide leading-relaxed text-sm">
                MORE
              </span>
            </p>
            <Link to="/how-does-it-work" >
              <img
                src="/Howorks.jpg"
                alt="Designer working on computer with design software"
                className="w-full shadow-sm hover:opacity-90 transition ms-auto"
              />
            </Link>
          </div>
        </div>
      </div>

      <hr className="max-w-6xl mx-auto border-t border-gray-300 mb-10 sm:mb-5" />

      {/* Bottom Section: Create New Project + My Projects */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Create a New Project */}
        <div className="col-span-1 ">
          <h2 className="text-lg sm:text-sm font-normal text-gray-600 mb-4 sm:mb-6 tracking-wide">
            CREATE A NEW PROJECT
          </h2>
          <div
            className="border flex  flex-row items-center justify-center gap-6 sm:gap-8 p-6 sm:p-8 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setShowCreateModal(true)}
          >
            <img
              src="https://media.istockphoto.com/id/516160935/vector/vector-add-cancel-plus-and-minus-signs-on-buttons.jpg?s=612x612&w=0&k=20&c=73ePIeB81zGtJPlMgA_cgHwVjk8DgmxDpPnTEV-2zTs="
              alt="Large plus button to create new project"
              className="w-32 h-32 sm:w-40 sm:h-20 lg:w-28 lg:h-28 object-contain"
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/034/132/743/non_2x/point-and-click-with-this-3d-realistic-mouse-cursor-icon-png.png"
              alt="Mouse cursor clicking"
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"
            />
          </div>
        </div>

        {/* My Projects */}
        <div className="col-span-2">
          <h2 className="text-lg sm:text-sm font-normal text-gray-600 mb-4 sm:mb-6 tracking-wide">
            MY PROJECTS
          </h2>
          <div>
            <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 font-light tracking-wide text-sm sm:text-base">
              Just click on any project thumbnail to open it and access its
              corresponding Elevator Design Studio (EDS) designs, or start an
              entirely new project. Saved projects icons allow you to directly
              access some project-specific features such as: edit, create new
              EDS design, duplicate, and delete.
            </p>

            {/* Sorting & Search */}
            <div className="flex  gap-2">
              {/* Sorting */}
              <div>
                <span className="font-light tracking-wide text-sm sm:text-base block mb-3">
                  SORTING
                </span>
                <div className="flex text-[8px] sm:text-[10px] ">
                  <button
                    onClick={() => setSortMode("date")}
                    className={`px-2 sm:px-2 py-1 border border-gray-300 font-light tracking-wide transition hover:bg-gray-100 ${
                      sortMode === "date" ? "bg-gray-200" : ""
                    }`}
                  >
                    Date
                  </button>
                  <button
                    onClick={() => setSortMode("az")}
                    className={`px-2 sm:px-2 py-1 border border-gray-300 font-light tracking-wide transition hover:bg-gray-100 ${
                      sortMode === "az" ? "bg-gray-200" : ""
                    }`}
                  >
                    A-Z
                  </button>
                  <button
                    onClick={() => setSortMode("za")}
                    className={`px-2 sm:px-2 py-1 border border-gray-300 font-light tracking-wide transition hover:bg-gray-100 ${
                      sortMode === "za" ? "bg-gray-200" : ""
                    }`}
                  >
                    Z-A
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="w-full">
                <span className="font-light tracking-wide text-sm sm:text-base block mb-3 l">
                  SEARCH PROJECTS
                </span>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 font-light tracking-wide text-sm sm:text-base focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto mt-8 sm:mt-12">
        <ProjectsGrid
          projects={filteredAndSortedProjects}
          isLoading={projectLoading}
          onProjectClick={(projectId) => navigate(`/project/${projectId}`)}
          onEdit={(projectId) => {
            toast.info("Edit project name/company — coming soon");
          }}
          onDelete={(projectId) => {
            if (
              window.confirm(
                "Are you sure you want to delete this project? This will delete all its designs too.",
              )
            ) {
              dispatch(deleteProject(projectId));
            }
          }}
          onDuplicate={(projectId) => {
            const newName = prompt(
              "Enter new project name:",
              `${projects.find((p) => p._id === projectId)?.name} (Copy)`,
            );
            if (newName && newName.trim()) {
              dispatch(
                duplicateProject({ id: projectId, newName: newName.trim() }),
              );
            }
          }}
          onAddDesign={(projectId) => {
            toast.info("Add new design (elevator) — coming in next step");
          }}
        />
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-md">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">
              Create New Project
            </h3>
            <form onSubmit={handleCreateProject} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-500 text-sm sm:text-base"
                  placeholder="e.g. Residential Tower Lift"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-500 text-sm sm:text-base"
                  placeholder="e.g. ABC Elevators Pvt Ltd"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                <button
                  type="submit"
                  disabled={projectLoading}
                  className="flex-1 bg-blue-600 text-white py-2 sm:py-3 rounded hover:bg-blue-700 disabled:opacity-50 transition text-sm sm:text-base font-medium"
                >
                  {projectLoading ? "Creating..." : "Create Project"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-gray-300 py-2 sm:py-3 rounded hover:bg-gray-100 transition text-sm sm:text-base font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
