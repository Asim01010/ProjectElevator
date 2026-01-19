import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  profileReset,
} from "../redux/features/Register/profileSlice"; // adjust path
import { Images } from "lucide-react";
import Navbar from "../components/Navbar";

const ProfileEdit = () => {
  const dispatch = useDispatch();

  // Add this instead:
  const { user: profileUser } = useSelector((state) => state.profile);

  const { profileLoading, profileSuccess, profileError, profileMessage } =
    useSelector((state) => state.profile);

  const [activeTab, setActiveTab] = useState("account");

  // Single form data object
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    country: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  // Password change
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Image preview
  const [imagePreview, setImagePreview] = useState("/hero.jpg");
  const fileInputRef = useRef(null);

  // 1. Check token & fetch profile only if authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to access profile");
      // optionally navigate to login
      return;
    }
    dispatch(getUserProfile());
  }, [dispatch]);

  // Populate form from profile slice user
  useEffect(() => {
    if (profileUser?._id) {
      setFormData({
        email: profileUser.email || "",
        firstName: profileUser.firstName || "",
        lastName: profileUser.lastName || "",
        company: profileUser.company || "",
        jobTitle: profileUser.jobTitle || "",
        country: profileUser.country || "",
        city: profileUser.city || "",
        zipCode: profileUser.zipCode || "",
        phone: profileUser.phone || "",
      });
      setImagePreview(profileUser.profileImage || "/hero.jpg");
    }
  }, [profileUser]);

  // 3. Toast feedback
  // Toast feedback – success
  useEffect(() => {
    // Only show toast for updates (skip when still loading / fetching profile)
    if (profileSuccess && !profileLoading) {
      toast.success(profileMessage || "Profile updated successfully!");
      dispatch(profileReset());
    }
  }, [profileSuccess, profileMessage, profileLoading, dispatch]);

  // Handlers
  const handleImageAreaClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      toast.success("Image selected (upload coming soon)");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
      toast.success("Image dropped (upload coming soon)");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!previousPassword.trim() || !newPassword.trim()) {
      return toast.error("Both passwords are required");
    }
    dispatch(
      changeUserPassword({ oldPassword: previousPassword, newPassword }),
    );
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    const cleanedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      jobTitle: formData.jobTitle,
      country: formData.country,
      city: formData.city,
      zipCode: formData.zipCode,
      phone: formData.phone,
    };

    dispatch(updateUserProfile(cleanedData));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800 py-22">
        <div
          className="  md:px-20 sm:px-10"
          style={{ paddingRight: "15rem", paddingLeft: "15rem" }}
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-light text-gray-700 mb-8 tracking-wide">
              PROFILE EDIT
            </h1>

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

            {activeTab === "account" ? (
              <div className="grid md:grid-cols-2 gap-12">
                {/* Profile Image */}
                <div>
                  <h2 className="text-xl font-normal text-gray-600 mb-8 tracking-wide">
                    Profile Image
                  </h2>

                  <div className="mb-8">
                    <img
                      src={
                        imagePreview ||
                        "https://via.placeholder.com/400x400?text=Profile"
                      }
                      alt="Profile preview"
                      className="w-full max-w-lg object-cover rounded shadow"
                    />
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast("Image upload feature coming soon", { icon: "🖼️" });
                    }}
                  >
                    <div
                      className="border-2 border-dashed border-gray-400 flex flex-col items-center justify-center p-12 text-center bg-white cursor-pointer hover:border-gray-600 transition"
                      onClick={handleImageAreaClick}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <Images className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-base text-gray-600 font-light tracking-wide">
                        Drag & drop or click to upload new profile picture
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="w-full mt-6 bg-gray-800 text-white py-3 rounded hover:bg-gray-700 disabled:opacity-50 transition"
                    >
                      {profileLoading ? "Uploading..." : "Update Profile Image"}
                    </button>
                  </form>
                </div>

                {/* Change Password */}
                <div>
                  <p className="text-gray-500 font-light mb-6 tracking-wide">
                    Enter your current password and new password below.
                  </p>

                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-500 font-light mb-2 text-sm tracking-wide">
                        CURRENT PASSWORD
                      </label>
                      <input
                        type="password"
                        value={previousPassword}
                        onChange={(e) => setPreviousPassword(e.target.value)}
                        className="w-full py-3 px-4 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        placeholder="Enter current password"
                        required
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
                        className="w-full py-3 px-4 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                        placeholder="Enter new password"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="w-full bg-gray-800 text-white py-3 rounded hover:bg-gray-700 disabled:opacity-50 transition"
                    >
                      {profileLoading ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="grid md:grid-cols-2 gap-8 max-w-5xl"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      EMAIL
                    </label>
                    <div className="w-full px-4 py-3 border border-gray-300 bg-gray-100 rounded font-light tracking-wide cursor-not-allowed text-gray-700">
                      {profileUser?.email || "Not available"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 font-light tracking-wide"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 font-light tracking-wide"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      COMPANY
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 font-light tracking-wide"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      JOB TITLE
                    </label>
                    <select
                      value={formData.jobTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, jobTitle: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 font-light tracking-wide appearance-none bg-white"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: "right 0.8rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.2em",
                      }}
                    >
                      <option value="">Select Job Title</option>
                      <option value="Architect">Architect</option>
                      <option value="Designer">Designer</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Project Manager">Project Manager</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      COUNTRY
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 font-light tracking-wide appearance-none bg-white"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: "right 0.8rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.2em",
                      }}
                    >
                      <option value="">Select Country</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      CITY
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 font-light tracking-wide"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      ZIP/POSTAL CODE
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 font-light tracking-wide"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-light mb-2 tracking-wide">
                      PHONE
                    </label>
                    <div className="flex items-center">
                      <span className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 text-gray-500 font-light rounded-l">
                        📞
                      </span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r focus:outline-none focus:border-gray-500 font-light tracking-wide"
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 mt-8">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-light tracking-wide px-20 py-4 rounded transition disabled:opacity-60"
                  >
                    {profileLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};;

export default ProfileEdit;
