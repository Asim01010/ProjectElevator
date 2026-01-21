import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  profileReset,
} from "../redux/features/Register/profileSlice";
import { Images } from "lucide-react";

const ProfileEdit = () => {
  const dispatch = useDispatch();

  const { user: profileUser } = useSelector((state) => state.profile);
  const { profileLoading, profileSuccess, profileError, profileMessage } =
    useSelector((state) => state.profile);

  const [activeTab, setActiveTab] = useState("contact");

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

  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [imagePreview, setImagePreview] = useState("/hero.jpg");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to access profile");
      return;
    }
    dispatch(getUserProfile());
  }, [dispatch]);

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

  useEffect(() => {
    if (profileSuccess && !profileLoading) {
      toast.success(profileMessage || "Profile updated successfully!");
      dispatch(profileReset());
    }
  }, [profileSuccess, profileMessage, profileLoading, dispatch]);

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
      <div className="min-h-screen bg-white py-18 px-4 sm:px-6 lg:px-8 xl:px-72">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-[8px] text-gray-400 mb-4 uppercase tracking-wider">
            HOME &gt; USER ACCOUNT &gt;{" "}
            <span className="text-[#8DC63F]">PROFILE EDIT</span>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl font-light text-gray-400 mb-8 tracking-wider">
            PROFILE EDIT
          </h1>

          {/* Tabs */}
          <div className="flex border-b border-gray-300 mb-8">
            <button
              onClick={() => setActiveTab("account")}
              className={`px-6 py-3 text-sm font-light tracking-wider ${
                activeTab === "account"
                  ? "text-gray-800 border-2 border-b-0 border-gray-300 bg-white"
                  : "text-gray-400  border-2 hover:text-gray-600"
              }`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-6 py-3 text-sm font-light tracking-wider -ml-px ${
                activeTab === "contact"
                  ? "text-gray-800 border-2 border-b-0 border-gray-300 bg-white"
                  : "text-gray-400  border-2 hover:text-gray-600"
              }`}
            >
              Contact Info
            </button>
          </div>

          {activeTab === "account" ? (
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Profile Image Section */}
              <div>
                <h2 className="text-base font-light text-gray-500 mb-6 tracking-wide uppercase">
                  Profile Image
                </h2>

                <div className="mb-6">
                  <div className="w-full h-60">
                    <img
                      src={
                        imagePreview ||
                        "https://via.placeholder.com/400x400?text=Profile"
                      }
                      alt="Profile preview"
                      className="w-full h-full object-cover bg-gray-200"
                    />
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast("Image upload feature coming soon", { icon: "🖼️" });
                  }}
                >
                  <div
                    className="border border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-center bg-white cursor-pointer hover:border-gray-400 transition"
                    onClick={handleImageAreaClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <Images className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-sm text-gray-400 font-light tracking-wide">
                      Drag and drop here, or click to replace profile image.
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </form>
              </div>

              {/* Change Password Section */}
              <div>
                <p className="text-sm text-gray-500 font-light mb-6 tracking-wide">
                  Please enter your previous password and your updated password
                  to change your password.
                </p>

                <form onSubmit={handlePasswordSubmit} className="space-y-1">
                  <div>
                    <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                      Previous Password
                    </label>
                    <input
                      type="password"
                      value={previousPassword}
                      onChange={(e) => setPreviousPassword(e.target.value)}
                      className="w-full py-2.5 px-4 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-light mb-2 text-xs tracking-widest uppercase">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full mb-4 py-2.5 px-4 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="w-full bg-[#8DC63F] hover:bg-[#BBDD8C] text-white py-3 uppercase tracking-widest font-light text-sm disabled:opacity-50 transition"
                  >
                    {profileLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleContactSubmit}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Left Column */}
              <div className="space-y-1">
                <div>
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    Email:
                  </label>
                  <div className="w-full px-4 py-2.5 border border-gray-300 bg-gray-100 font-light tracking-wide cursor-not-allowed text-gray-600 text-sm">
                    {profileUser?.email || "Not available"}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    First Name:
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-500 font-light tracking-wide text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-500 font-light tracking-wide text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    Company:
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-500 font-light tracking-wide text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    Job Title:
                  </label>
                  <select
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-500 font-light tracking-wide appearance-none bg-white text-sm"
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

              {/* Right Column */}
              <div className="space-y-1">
                <div>
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    Country:
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-500 font-light tracking-wide appearance-none bg-white text-sm"
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
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    City:
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-500 font-light tracking-wide text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    Zip/Postal Code:
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-500 font-light tracking-wide text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-light mb-1 text-xs tracking-widest uppercase">
                    Phone:
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 text-gray-500 font-light text-sm">
                      📞
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="flex-1 px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-500 font-light tracking-wide text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="bg-[#8DC63F] hover:bg-[#BBDD8C] text-white font-light tracking-widest px-16 py-3 uppercase text-sm transition disabled:opacity-60"
                >
                  {profileLoading ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
