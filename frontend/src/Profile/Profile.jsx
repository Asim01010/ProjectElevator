import React from "react";
import Navbar from "../components/Navbar";
import { FilePenLine } from "lucide-react";
import { Link } from "react-router-dom";
import Project from "./components/Project";
import ProjectsGrid from "./components/ProjectsGrid";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-gray-50 text-gray-800 py-30   md:px-20 sm:px-10"
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

        {/* Divider */}
        <hr className="max-w-6xl mx-auto border-t border-gray-300 mb-10" />

        {/* Top Section: My Profile + How Does It Work? */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2  mb-10">
          {/* My Profile */}
          <div>
            <h2 className="text-xl font-normal text-gray-600 mb-6 tracking-wide">
              MY PROFILE
            </h2>
            <div className=" flex flex-col md:flex-row items-center gap-8">
              <img
                src="https://wallpapers.com/images/hd/yellow-ferrari-sports-car-front-view-00xjwnmlnze0mzij.jpg"
                alt="Profile placeholder (yellow sports car)"
                className="w-64 h-48 object-cover shadow-sm"
              />
              <div className="space-y-4 text-sm font-light">
                <Link to="/profile-edit">
                  <a
                    href="#"
                    className="flex items-center gap-2 text-gray-700 hover:underline tracking-wide"
                  >
                    <FilePenLine size={14} /> Edit Username/Password
                  </a>
                </Link>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:underline tracking-wide"
                >
                  <FilePenLine size={14} /> Edit Contact Information
                </a>
              </div>
            </div>
          </div>

          {/* How Does It Work? */}
          <div>
            <h2 className="text-xl font-normal text-gray-600 mb-6 tracking-wide">
              HOW DOES IT WORK?
            </h2>
            <div className="">
              <p className="text-gray-700 leading-relaxed mb-6 font-light tracking-wide">
                Getting started with the Elevator Design Studio (EDS) is easy.
                In 10 simple steps, this tutorial will show you how to select
                your elevator interior configuration, apply materials and
                finishes, view your progress with realistic renderings, and
                manage your project from a single location.{" "}
                <span
                  href="#"
                  className="text-gray-500 font-light tracking-wide leading-relaxed text-sm"
                >
                  MORE
                </span>{" "}
              </p>
              <Link to="/how-does-it-work">
                <img
                  src="/Howorks.jpg"
                  alt="Designer working on computer with design software"
                  className="w-full shadow-sm"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="max-w-6xl mx-auto border-t border-gray-300 mb-16" />

        {/* Bottom Section: Create New Project + My Projects */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Create a New Project */}
          <div>
            <h2 className="text-xl font-normal text-gray-600 mb-6 tracking-wide">
              CREATE A NEW PROJECT
            </h2>
            <div className=" border flex flex-col md:flex-row items-center justify-center gap-8">
              <img
                src="https://media.istockphoto.com/id/516160935/vector/vector-add-cancel-plus-and-minus-signs-on-buttons.jpg?s=612x612&w=0&k=20&c=73ePIeB81zGtJPlMgA_cgHwVjk8DgmxDpPnTEV-2zTs="
                alt="Large plus button to create new project"
                className="w-48 h-48 object-contain"
              />
              <img
                src="https://static.vecteezy.com/system/resources/previews/034/132/743/non_2x/point-and-click-with-this-3d-realistic-mouse-cursor-icon-png.png"
                alt="Mouse cursor clicking"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>

          {/* My Projects */}
          <div>
            <h2 className="text-xl font-normal text-gray-600 mb-6 tracking-wide">
              MY PROJECTS
            </h2>
            <div className="">
              <p className="text-gray-700 leading-relaxed mb-8 font-light tracking-wide">
                Just click on any project thumbnail to open it and access its
                corresponding Elevator Design Studio (EDS) designs, or start an
                entirely new project. Saved projects icons allow you to directly
                access some project-specific features such as: edit, create new
                EDS design, duplicate, and delete.
              </p>

              {/* Sorting & Search */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="mb-6 md:mb-0">
                  <span className="font-light mr-4 tracking-wide">SORTING</span>
                  <div className="inline-flex gap-2 mt-3">
                    <button className="px-2 py-1 border border-gray-300 font-light tracking-wide">
                      ↑↓
                    </button>
                    <button className="px-2 py-1 border border-gray-300 font-light tracking-wide">
                      A-Z
                    </button>
                    <button className="px-2 py-1 border border-gray-300 font-light tracking-wide">
                      Date
                    </button>
                    <button className="px-2 py-1 border border-gray-300 font-light tracking-wide">
                      Custom
                    </button>
                  </div>
                </div>

                <div>
                  <span className="font-light mr-4 tracking-wide">
                    SEARCH PROJECTS
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Project Name"
                    className="px-4 py-2 border border-gray-300 mt-3 w-64 font-light tracking-wide"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjectsGrid/>
      </div>
    </>
  );
};

export default Profile;
