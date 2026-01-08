import React, { useState } from "react";
import { Images } from "lucide-react";
import Navbar from "../components/Navbar";

const ProfileEdit = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <>
      {" "}
      
      <div className="min-h-screen bg-gray-50 text-gray-800 py-30 md:px-20 sm:px-10" style={{ paddingRight:"15rem", paddingLeft:"15rem" }}>
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl font-light text-gray-700 mb-8 tracking-wide">
            PROFILE EDIT
          </h1>

          {/* Tabs */}
          <div className="flex border-b border-gray-300 mb-12">
            <button
              onClick={() => setActiveTab("account")}
              className={`px-8 py-4 text-lg font-normal tracking-wide ${
                activeTab === "account"
                  ? "text-gray-800 border-b-2 border-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-8 py-4 text-lg font-normal tracking-wide ${
                activeTab === "contact"
                  ? "text-gray-800 border-b-2 border-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Contact Info
            </button>
          </div>

          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === "account" ? (
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Side: Profile Image */}
              <div>
                <h2 className="text-xl font-normal text-gray-600 mb-8 tracking-wide">
                  Profile Image
                </h2>

                {/* Current Profile Image */}
                <div className="mb-8">
                  <img
                    src="https://wallpapers.com/images/hd/yellow-ferrari-sports-car-front-view-00xjwnmlnze0mzij.jpg"
                    alt="Profile"
                    className="w-full max-w-lg"
                  />
                </div>

                {/* Upload / Drag & Drop Area */}
                <div className="border border-gray-400 border-dashed flex flex-col items-center justify-center p-12 text-center bg-white">
                  <div className="text-5xl text-gray-400 mb-4">
                    <Images />
                  </div>
                  <p className="text-base text-gray-600 font-light tracking-wide">
                    Drag and drop here, or click to replace profile image.
                  </p>
                </div>
              </div>

              {/* Right Side: Change Password Form */}
              <div>
                <p className="text-gray-500 font-light mb-6 tracking-wide">
                  Please enter your previous password and your updated password
                  to change your password.
                </p>

                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-500 font-light mb-2 text-sm tracking-wide">
                      PREVIOUS PASSWORD
                    </label>
                    <input
                      type="password"
                      value={previousPassword}
                      onChange={(e) => setPreviousPassword(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 font-light mb-2 text-sm tracking-wide">
                      NEW PASSWORD
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full py-3 px-4 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 font-light tracking-wide transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    EMAIL:
                  </label>
                  <input
                    type="email"
                    defaultValue="masimqw4nd@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    FIRST NAME:
                  </label>
                  <input
                    type="text"
                    defaultValue="Muhammad"
                    className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    LAST NAME:
                  </label>
                  <input
                    type="text"
                    defaultValue="Asim"
                    className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    COMPANY:
                  </label>
                  <input
                    type="text"
                    defaultValue="Castle Shepherd"
                    className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    JOB TITLE:
                  </label>
                  <select
                    defaultValue="Architect"
                    className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide appearance-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em",
                    }}
                  >
                    <option>Architect</option>
                    <option>Designer</option>
                    <option>Engineer</option>
                    <option>Project Manager</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    COUNTRY:
                  </label>
                  <select
                    defaultValue="Pakistan"
                    className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide appearance-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")",
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em",
                    }}
                  >
                    <option>Pakistan</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    CITY:
                  </label>
                  <input
                    type="text"
                    defaultValue="Gujar Khan"
                    className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    ZIP/POSTAL CODE:
                  </label>
                  <input
                    type="text"
                    defaultValue="47850"
                    className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-light mb-2 tracking-wide">
                    PHONE:
                  </label>
                  <div className="flex items-center">
                    <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 text-gray-500 font-light">
                      📞
                    </span>
                    <input
                      type="tel"
                      defaultValue="+92 316 0560676"
                      className="flex-1 px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-gray-500 font-light tracking-wide"
                    />
                  </div>
                </div>
              </div>

              {/* Update Button for Contact Info */}
              <div className="md:col-span-2 mt-8">
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-light tracking-wide px-20 py-4 transition-colors">
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
