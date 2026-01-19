import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getUserProjects,
  createProject,
  projectReset,
} from "../redux/features/Project/projectSlice"; // adjust path
import Navbar from "../components/Navbar";
import { FilePenLine, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
  const [sortMode, setSortMode] = useState("date"); // date | az | za | custom

  // Fetch projects on mount
  useEffect(() => {
    dispatch(getUserProjects());
  }, [dispatch]);

  // Toast + reset + redirect after create
  useEffect(() => {
    if (projectSuccess) {
      toast.success(projectMessage || "Operation successful");
      dispatch(projectReset());

      // If we just created → redirect to the new project's detail page
      // (assuming the last project in list is the newest)
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
      return 0; // custom → keep original order or implement later
    });

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-gray-50 text-gray-800 py-20 md:px-20 sm:px-10"
        style={{ paddingLeft: "15rem", paddingRight: "15rem" }}
      >
        {/* Header Text */}
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h1 className="text-lg font-light text-gray-500 tracking-wide">
            FAST-TRACK THE DESIGN PROCESS! my.EDS lets you create and manage
            Elevator Design Studio projects, designs, and your profile
            information from one spot.
          </h1>
        </div>

        <hr className="max-w-6xl mx-auto border-t border-gray-300 mb-10" />

        {/* Top Section: My Profile + How Does It Work? */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 mb-10">
          {/* My Profile */}
          <div>
            <h2 className="text-xl font-normal text-gray-600 mb-6 tracking-wide">
              MY PROFILE
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="https://wallpapers.com/images/hd/yellow-ferrari-sports-car-front-view-00xjwnmlnze0mzij.jpg"
                alt="Profile placeholder"
                className="w-64 h-48 object-cover shadow-sm"
              />
              <div className="space-y-4 text-sm font-light">
                <Link to="/profile-edit">
                  <span className="flex items-center gap-2 text-gray-700 hover:underline tracking-wide cursor-pointer">
                    <FilePenLine size={14} /> Edit Username/Password
                  </span>
                </Link>
                <Link to="/profile-edit">
                  <span className="flex items-center gap-2 text-gray-700 hover:underline tracking-wide cursor-pointer">
                    <FilePenLine size={14} /> Edit Contact Information
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* How Does It Work? */}
          <div>
            <h2 className="text-xl font-normal text-gray-600 mb-6 tracking-wide">
              HOW DOES IT WORK?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 font-light tracking-wide">
              Getting started with the Elevator Design Studio (EDS) is easy...
            </p>
            <Link to="/how-does-it-work">
              <img
                src="/Howorks.jpg"
                alt="Designer working"
                className="w-full shadow-sm"
              />
            </Link>
          </div>
        </div>

        <hr className="max-w-6xl mx-auto border-t border-gray-300 mb-16" />

        {/* Bottom Section */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Create New Project – now clickable */}
          <div>
            <h2 className="text-xl font-normal text-gray-600 mb-6 tracking-wide">
              CREATE A NEW PROJECT
            </h2>
            <div
              className="border flex flex-col md:flex-row items-center justify-center gap-8 p-8 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusCircle size={120} className="text-gray-400" />
              <p className="text-gray-500 font-light">
                Click to start a new project
              </p>
            </div>
          </div>

          {/* My Projects */}
          <div>
            <h2 className="text-xl font-normal text-gray-600 mb-6 tracking-wide">
              MY PROJECTS
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8 font-light tracking-wide">
              Click on any project to open it...
            </p>

            {/* Sorting & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div>
                <span className="font-light mr-4 tracking-wide">SORTING</span>
                <div className="inline-flex gap-2 mt-2">
                  <button
                    onClick={() => setSortMode("date")}
                    className={`px-3 py-1 border font-light tracking-wide ${
                      sortMode === "date" ? "bg-gray-200" : ""
                    }`}
                  >
                    Date
                  </button>
                  <button
                    onClick={() => setSortMode("az")}
                    className={`px-3 py-1 border font-light tracking-wide ${
                      sortMode === "az" ? "bg-gray-200" : ""
                    }`}
                  >
                    A-Z
                  </button>
                  <button
                    onClick={() => setSortMode("za")}
                    className={`px-3 py-1 border font-light tracking-wide ${
                      sortMode === "za" ? "bg-gray-200" : ""
                    }`}
                  >
                    Z-A
                  </button>
                </div>
              </div>

              <div>
                <span className="font-light mr-4 tracking-wide">SEARCH</span>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 mt-2 w-64 font-light tracking-wide"
                />
              </div>
            </div>

            {/* Project List */}
            {projectLoading ? (
              <>
                {/* Replace the grid div with: */}
                <ProjectsGrid
                  projects={filteredAndSortedProjects}
                  isLoading={projectLoading}
                  onProjectClick={(projectId) =>
                    navigate(`/project/${projectId}`)
                  }
                />
              </>
            ) : filteredAndSortedProjects.length === 0 ? (
              <p className="text-center text-gray-500">No projects found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAndSortedProjects.map((proj) => (
                  <Link
                    key={proj._id}
                    to={`/project/${proj._id}`}
                    className="block border rounded shadow hover:shadow-lg transition"
                  >
                    <div className="p-4">
                      <h3 className="font-medium text-lg">{proj.name}</h3>
                      <p className="text-sm text-gray-600">
                        Company: {proj.company}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Created: {new Date(proj.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-6">Create New Project</h3>
              <form onSubmit={handleCreateProject} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="e.g. Residential Tower Lift"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    placeholder="e.g. ABC Elevators Pvt Ltd"
                    required
                  />
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={projectLoading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {projectLoading ? "Creating..." : "Create Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 border py-2 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
