import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { gsap } from "gsap";
import { Upload, Shield, User, Mail, Phone, MapPin, Building, Briefcase, Lock, Key } from "lucide-react";

import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  profileReset,
} from "../redux/features/Register/profileSlice";

const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(161,124,80,0.18)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(161,124,80,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
};

const inputStyle = {
  background: "rgba(255,255,255,0.6)",
  border: "1px solid rgba(161,124,80,0.22)",
  borderRadius: "8px",
  color: "#2C2822",
  fontFamily: "inherit",
  backdropFilter: "blur(6px)",
  outline: "none",
};

const labelStyle = {
  fontSize: "15px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(161,124,80,0.75)",
};

function GoldBtn({ children, onClick, disabled }) {
  const ref = useRef(null);
  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => gsap.to(ref.current, { backgroundColor: "#8B6942", scale: 1.02, duration: 0.25 })}
      onMouseLeave={() => gsap.to(ref.current, { backgroundColor: "#A17C50", scale: 1, duration: 0.25 })}
      className="inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-white py-2 px-6 rounded-lg disabled:opacity-50 transition-all text-md w-full"
      style={{ backgroundColor: "#A17C50", boxShadow: "0 6px 20px -4px rgba(161,124,80,0.4)" }}
    >
      {children}
    </button>
  );
}

function EDSInput({ label, type = "text", value, onChange, readOnly, icon: Icon }) {
  const inputRef = useRef(null);
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label style={labelStyle}>{label}</label>}
      <div className="relative">
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A17C50]/50"><Icon size={16} /></div>}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          style={inputStyle}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-2 text-md`}
          onFocus={() => gsap.to(inputRef.current, { borderColor: "#A17C50", boxShadow: "0 0 0 3px rgba(161,124,80,0.1)", duration: 0.2 })}
          onBlur={() => gsap.to(inputRef.current, { borderColor: "rgba(161,124,80,0.22)", boxShadow: "none", duration: 0.2 })}
        />
      </div>
    </div>
  );
}

function EDSSelect({ label, value, onChange, children, icon: Icon }) {
  const selectRef = useRef(null);
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label style={labelStyle}>{label}</label>}
      <div className="relative">
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A17C50]/50"><Icon size={16} /></div>}
        <select
          ref={selectRef}
          value={value}
          onChange={onChange}
          style={{ ...inputStyle, appearance: "none" }}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-10 py-2 text-md`}
          onFocus={() => gsap.to(selectRef.current, { borderColor: "#A17C50", boxShadow: "0 0 0 3px rgba(161,124,80,0.1)", duration: 0.2 })}
          onBlur={() => gsap.to(selectRef.current, { borderColor: "rgba(161,124,80,0.22)", boxShadow: "none", duration: 0.2 })}
        >
          {children}
        </select>
      </div>
    </div>
  );
}

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);

  const { user: profileUser, profileLoading, profileSuccess, profileError, profileMessage } = useSelector((state) => state.profile);

  const [activeTab, setActiveTab] = useState("contact");

  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "", company: "", jobTitle: "",
    country: "", city: "", zipCode: "", phone: "",
  });

  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [imagePreview, setImagePreview] = useState("/hero.jpg");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in to access profile");
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
    if (profileSuccess) {
      toast.success(profileMessage || "Profile updated successfully!");
      dispatch(profileReset());
    }
    if (profileError) {
      toast.error(profileMessage || "Update failed");
      dispatch(profileReset());
    }
  }, [profileSuccess, profileError, profileMessage, dispatch]);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
  }, []);

  const handleTabChange = (tab) => {
    gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
    setActiveTab(tab);
  };

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

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!previousPassword || !newPassword) return toast.error("Both passwords are required");
    dispatch(changeUserPassword({ oldPassword: previousPassword, newPassword }));
    setPreviousPassword("");
    setNewPassword("");
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden pt-19 pb-8 py-4 px-4 sm:px-6 lg:px-10 flex flex-col"
      style={{ backgroundColor: "#F7F4ED", fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col flex-1 min-h-0">
        <div ref={headerRef} className="shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2" style={{ color: "rgba(161,124,80,0.55)" }}>
            HOME &gt; USER ACCOUNT &gt; <span style={{ color: "#A17C50" }}>PROFILE EDIT</span>
          </p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-7 rounded-full" style={{ background: "#A17C50" }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 4vw, 30px)", color: "#2C2822" }}>
              PROFILE EDIT
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-4 border-b shrink-0" style={{ borderBottom: "1px solid rgba(161,124,80,0.15)" }}>
          <button
            onClick={() => handleTabChange("contact")}
            className={`px-5 py-2 text-[20px] font-bold uppercase tracking-wider ${activeTab === "contact" ? "text-[#A17C50]" : "text-gray-400"}`}
          >
            Contact Info
          </button>
          <button
            onClick={() => handleTabChange("account")}
            className={`px-5 py-2 text-[20px] font-bold uppercase tracking-wider ${activeTab === "account" ? "text-[#A17C50]" : "text-gray-400"}`}
          >
            Account
          </button>
        </div>

        <div ref={formRef} className="flex-1 min-h-0 overflow-hidden">
          {activeTab === "contact" ? (
            /* Contact Info: two columns of fields */
            <form onSubmit={handleContactSubmit} style={glassCard} className="h-full flex flex-col">
              <div className="px-5 py-2.5 border-b shrink-0" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                <h2 className="text-[15px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>Contact Information</h2>
              </div>
              <div className="p-5 grid md:grid-cols-2 gap-x-8 gap-y-3 overflow-y-hidden">
                {/* Left column */}
                <div className="space-y-3">
                  <EDSInput label="Email:" value={formData.email} readOnly icon={Mail} />
                  <EDSInput label="First Name:" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} icon={User} />
                  <EDSInput label="Last Name:" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} icon={User} />
                  <EDSInput label="Company:" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} icon={Building} />
                  <EDSSelect label="Job Title:" value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} icon={Briefcase}>
                    <option value="">Select Job Title</option>
                    <option value="Architect">Architect</option>
                    <option value="Designer">Designer</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Project Manager">Project Manager</option>
                  </EDSSelect>
                </div>

                {/* Right column */}
                <div className="space-y-3 flex flex-col">
                  <EDSSelect label="Country:" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} icon={MapPin}>
                    <option value="">Select Country</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </EDSSelect>

                  <EDSInput label="City:" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                  <EDSInput label="Zip/Postal Code:" value={formData.zipCode} onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} />

                  <div className="flex flex-col gap-1">
                    <label style={labelStyle}>Phone:</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A17C50]/50">📞</span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={inputStyle}
                        className="w-full pl-10 pr-4 py-1.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <GoldBtn disabled={profileLoading}>
                      {profileLoading ? "Saving..." : "Update"}
                    </GoldBtn>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* Account: Profile Image + Account Security side by side */
            <div className="grid lg:grid-cols-2 gap-6 h-full">
              {/* Profile Image */}
              <div style={glassCard} className="flex flex-col overflow-hidden">
                <div className="px-5 py-2.5 border-b shrink-0" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                  <h2 className="text-[15px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>Profile Image</h2>
                </div>
                <div className="p-4 flex flex-col flex-1 min-h-0">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full flex-1 min-h-0 object-cover rounded-lg mb-3"
                    style={{ border: "1px solid rgba(161,124,80,0.15)" }}
                  />
                  <div
                    className="border-2 border-dashed rounded-xl p-3 text-center cursor-pointer hover:border-[#A17C50] shrink-0"
                    style={{ borderColor: "rgba(161,124,80,0.25)" }}
                    onClick={handleImageAreaClick}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <Upload size={20} style={{ color: "rgba(161,124,80,0.5)", margin: "0 auto" }} />
                    <p className="text-md mt-1.5 text-gray-600">Drag and drop here, or click to replace profile image.</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              {/* Account Security */}
              <div style={glassCard} className="flex flex-col overflow-hidden">
                <div className="px-5 py-2.5 border-b shrink-0" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                  <h2 className="text-[15px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>Account Security</h2>
                </div>
                <div className="p-5 space-y-3 overflow-y-auto">
                  <p className="text-md" style={{ color: "#7A705F" }}>
                    Please enter your previous password and your updated password to change your password.
                  </p>

                  <EDSInput label="Previous Password" type="password" value={previousPassword} onChange={(e) => setPreviousPassword(e.target.value)} icon={Key} />
                  <EDSInput label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} icon={Lock} />

                  <GoldBtn disabled={profileLoading} onClick={handlePasswordSubmit}>
                    {profileLoading ? "Updating..." : "Update Password"}
                  </GoldBtn>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;