import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { regUser, userReset } from "../redux/features/Register/registerSlice";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoShieldCheckmark } from "react-icons/io5";
import {
  PiBagSimpleLight,
  PiCaretDownBold,
  PiWrenchLight,
  PiUserGearLight,
  PiHardHatLight,
  PiCompassLight,
  PiBuildingLight,
  PiBuildingsLight,
  PiPaletteLight,
} from "react-icons/pi";

// Sub-role options for End User
const END_USER_SUB_ROLES = [
  { label: "Elevator Contractor", icon: PiWrenchLight },
  { label: "Consultant", icon: PiUserGearLight },
  { label: "General Contractor", icon: PiHardHatLight },
  { label: "Architectural Firm", icon: PiCompassLight },
  { label: "Building Owner", icon: PiBuildingLight },
  { label: "Property Manager", icon: PiBuildingsLight },
  { label: "Designer", icon: PiPaletteLight },
];

const roleOptions = [
  {
    value: "user",
    label: "End User",
    desc: "Design & visualize your project",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    ),
  },
  {
    value: "fabricator",
    label: "Fabricator",
    desc: "Manufacture & manage projects",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
    ),
  },
  {
    value: "supplier",
    label: "Supplier",
    desc: "Supply & deliver materials",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h-5.25l-2.25 4.5m7.5-4.5v4.5m-7.5 0h7.5m-7.5 0l-2.25 4.5m2.25-4.5v4.5m0 0h4.5" />
    ),
  },
];

// --- Dedicated Category Dropdown Component ---
const CategorySelect = ({ formData, setFormData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedRoleObj = END_USER_SUB_ROLES.find(
    (item) => item.label === formData.subRole
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (roleLabel) => {
    setFormData((prev) => ({ ...prev, subRole: roleLabel }));
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
      <label className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#8F5D28]">
        Category
      </label>

      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 text-xs rounded-sm border bg-white/65 backdrop-blur-[6px] outline-none flex items-center justify-between transition-colors text-left"
        style={{
          borderColor: "rgba(161,124,80,0.3)",
          color: "#2C2822",
        }}
      >
        <div className="flex items-center gap-2">
          {selectedRoleObj ? (
            <>
              <selectedRoleObj.icon className="text-sm text-[#A17C50]" />
              <span className="font-medium">{selectedRoleObj.label}</span>
            </>
          ) : (
            <>
              <PiBagSimpleLight className="text-sm text-[#A17C50]" />
              <span className="text-gray-400">Select your category</span>
            </>
          )}
        </div>
        <PiCaretDownBold
          className={`text-xs text-[#A17C50] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-[105%] z-50 bg-white border rounded-sm shadow-lg max-h-60 overflow-y-auto"
          style={{ borderColor: "rgba(161,124,80,0.3)" }}
        >
          {END_USER_SUB_ROLES.map((item) => {
            const IconComponent = item.icon;
            const isSelected = formData.subRole === item.label;

            return (
              <div
                key={item.label}
                onClick={() => handleSelect(item.label)}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[#A17C50]/15 text-[#8F5D28] font-semibold"
                    : "text-[#2C2822] hover:bg-[#A17C50]/10 hover:text-[#8F5D28]"
                }`}
              >
                <IconComponent className="text-sm text-[#A17C50] flex-shrink-0" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// --- Main Register Component ---
const Register = () => {
  // --- Redux and Navigation Hooks ---
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userLoading, userSuccess, userError, userMessage } = useSelector(
    (state) => state.register
  );

  // --- Form States ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    subRole: "",
  });

  const { email, password, confirmPassword, role } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- GSAP Animation Refs ---
  const containerRef = useRef(null);
  const ruleRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const btnRef = useRef(null);
  const arrowRef = useRef(null);
  const badgeRef = useRef(null);
  const breadcrumbRef = useRef(null);

  // --- GSAP Entry Animations ---
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        breadcrumbRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" },
        "-=0.2"
      )
      .fromTo(
        ruleRef.current,
        { height: 0, opacity: 0 },
        { height: 32, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.15"
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
        "-=0.25"
      )
      .fromTo(
        formRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        "-=0.2"
      );

    // Idle float on button
    gsap.to(btnRef.current, {
      y: -2,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.2,
    });
  }, []);

  // --- GSAP Micro-Interactions ---
  const handleBtnEnter = () => {
    gsap.to(btnRef.current, { scale: 1.02, backgroundColor: "#8F5D28", duration: 0.25 });
    gsap.to(arrowRef.current, { x: 5, duration: 0.2 });
  };

  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, backgroundColor: "#8F5D28", duration: 0.25 });
    gsap.to(arrowRef.current, { x: 0, duration: 0.2 });
  };

  const handleBtnClick = () => {
    gsap
      .timeline()
      .to(btnRef.current, { scale: 0.97, duration: 0.08 })
      .to(btnRef.current, { scale: 1.02, duration: 0.18, ease: "elastic.out(1, 0.5)" })
      .to(btnRef.current, { scale: 1, duration: 0.12 });
  };

  // --- Form Handlers ---
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(regUser({ email, password, confirmPassword, role, subRole: formData.subRole }));
  };

  // --- Redux Success/Error Listeners ---
  useEffect(() => {
    if (userSuccess) {
      toast.success(userMessage);
      navigate("/verify-otp", { state: { userId: user?._id } });
      dispatch(userReset({ resetUserOnly: false }));
    }
    if (userError) {
      toast.error(userMessage);
      dispatch(userReset({ resetUserOnly: true }));
    }
  }, [userSuccess, userError, userMessage, dispatch, navigate, user]);

  const inputStyle = {
    background: "rgba(255,255,255,0.65)",
    border: "1px solid rgba(161,124,80,0.22)",
    color: "#2C2822",
    backdropFilter: "blur(6px)",
    fontFamily: "'DM Sans', sans-serif",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#A17C50";
    e.target.style.background = "rgba(255,255,255,0.92)";
    e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1), 0 4px 16px rgba(161,124,80,0.08)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(161,124,80,0.22)";
    e.target.style.background = "rgba(255,255,255,0.65)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="flex h-screen w-full items-stretch justify-center overflow-hidden">
      <div
        className="w-full lg:w-1/2 h-screen relative flex flex-col justify-between"
        style={{ backgroundColor: "#F7F4ED", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Global CSS Injectors */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;800&display=swap');
          input::placeholder { color: rgba(120,106,88,0.45); }
          input:focus { outline: none; }
          .brand-item { transition: all 0.2s; }
          .brand-item:hover { color: #A17C50 !important; opacity: 1 !important; filter: grayscale(0) !important; }
          .eds-pw-toggle { background: none; border: none; cursor: pointer; color: rgba(161,124,80,0.55); display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
          .eds-pw-toggle:hover { color: #A17C50; }
          .eds-secondary-btn { transition: all 0.2s; }
          .eds-secondary-btn:hover { background: rgba(161,124,80,0.08); }
          .eds-role-card { transition: all 0.2s; }
        `}</style>

        {/* Ambient Glow Overlays */}
        <div
          className="absolute top-0 left-0 w-64 h-64 md:w-[360px] md:h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(161,124,80,0.13) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(161,124,80,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-36 h-36 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)" }}
        />

        {/* Main Content Area */}
        <div
          ref={containerRef}
          className="relative z-10 py-5 px-6 sm:px-10 md:px-12 lg:px-10 xl:px-16 my-auto flex flex-col justify-center"
          style={{ opacity: 0 }}
        >
          {/* Logo & Breadcrumb Row */}
          <div className="flex items-center justify-between gap-4 mb-1">
            <Link to="/" className="inline-flex items-center gap-2 py-2">
              <img src="logo/logo.png" width={150} alt="Logo" />
            </Link>
          </div>

          {/* Patent Badge */}
          <div className="mb-1">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em]"
              style={{
                background: "rgba(161,124,80,0.08)",
                border: "1px solid rgba(161,124,80,0.2)",
                color: "#8F5D28",
                opacity: 0,
              }}
            >
              <IoShieldCheckmark size={16} /> Patent-Pending Technology
            </div>
          </div>

          {/* Heading Header */}
          <h1
            ref={headingRef}
            className="flex items-center mb-1"
            style={{ opacity: 0 }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(22px, 2.5vw, 34px)",
                color: "#2C2822",
                lineHeight: 1.15,
              }}
            >
              Create an Account
            </span>
          </h1>
          <p className="text-sm leading-relaxed max-w-lg mb-2" style={{ color: "#7A705F" }}>
            Create your account to design, customize and visualize stunning elevator interiors in 3D
          </p>

          {/* Role Selection */}
          <div className="mb-3 max-w-lg">
            <label className="block text-[9px] font-bold uppercase tracking-[0.18em] mb-1.5 text-[#8F5D28]">
              Select Your Account Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((r) => {
                const selected = formData.role === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        role: r.value,
                        subRole: r.value === "user" ? prev.subRole || "" : "",
                      }));
                    }}
                    className="eds-role-card flex flex-col items-start gap-1 p-2.5 rounded-sm border text-left transition-all duration-150"
                    style={{
                      borderColor: selected ? "#8F5D28" : "rgba(161,124,80,0.2)",
                      backgroundColor: selected ? "#8F5D28" : "transparent",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.6}
                      stroke={selected ? "#FFFFFF" : "#A17C50"}
                      className="w-4 h-4"
                    >
                      {r.icon}
                    </svg>
                    <span
                      className="text-[9px] font-bold uppercase tracking-[0.06em]"
                      style={{ color: selected ? "#FFFFFF" : "#2C2822" }}
                    >
                      {r.label}
                    </span>
                    <span
                      className="text-[9px] leading-tight"
                      style={{ color: selected ? "rgba(255,255,255,0.85)" : "#8A7A5A" }}
                    >
                      {r.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-lg"
            style={{ opacity: 0 }}
          >
            {/* Email field */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.18em] flex items-center gap-1 text-[#8F5D28]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#A17C50"
                  className="w-3 h-3 text-[#8F5D28]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInput}
                placeholder="Enter your email address"
                required
                className="w-full rounded-sm px-3.5 py-2.5 text-xs transition-all duration-200"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Conditional Sub-Role Dropdown for End User */}
            {formData.role === "user" && (
              <CategorySelect formData={formData} setFormData={setFormData} />
            )}

            {/* Password fields grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Password field */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-[0.18em] flex items-center gap-1 text-[#8F5D28]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#A17C50"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleInput}
                    placeholder="Create password"
                    required
                    className="w-full rounded-sm px-3.5 py-2.5 pr-9 text-xs transition-all duration-200"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="eds-pw-toggle absolute right-2.5 top-1/2 -translate-y-1/2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password field */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-[0.18em] flex items-center gap-1 text-[#8F5D28]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#A17C50"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInput}
                    placeholder="Re-enter password"
                    required
                    className="w-full rounded-sm px-3.5 py-2.5 pr-9 text-xs transition-all duration-200"
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="eds-pw-toggle absolute right-2.5 top-1/2 -translate-y-1/2"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              ref={btnRef}
              type="submit"
              disabled={userLoading}
              onClick={handleBtnClick}
              onMouseEnter={handleBtnEnter}
              onMouseLeave={handleBtnLeave}
              className="w-full flex items-center justify-center gap-2.5 rounded-sm py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{
                backgroundColor: "#8F5D28",
                boxShadow: "0 6px 20px -5px rgba(161,124,80,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {userLoading ? "Creating Account…" : "Register"}
              {!userLoading && (
                <svg
                  ref={arrowRef}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </button>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <span className="flex-1 h-px" style={{ backgroundColor: "rgba(161,124,80,0.18)" }} />
              <span className="text-[9px] font-bold tracking-[0.18em]" style={{ color: "#8F5D28" }}>
                OR
              </span>
              <span className="flex-1 h-px" style={{ backgroundColor: "rgba(161,124,80,0.18)" }} />
            </div>

            {/* Secondary CTA */}
            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-center" style={{ color: "#8F5D28" }}>
                Already registered with My Elevator Design Studios?
              </p>
              <Link
                to="/login"
                className="eds-secondary-btn w-full flex items-center justify-center gap-2 rounded-sm py-2.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ border: "1.5px solid #A17C50", color: "#8F5D28" }}
              >
                Sign In Here
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3 h-3 text-[#8F5D28]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </form>

          {/* Footer Contact Row */}
          <div
            className="mt-4 pt-2 max-w-lg flex items-center gap-2"
            style={{ borderTop: "1px solid rgba(161,124,80,0.15)" }}
          >
            <span className="text-xl" style={{ color: "rgba(161,124,80,0.5)" }}>
              <TfiHeadphoneAlt color="#8F5D28" />
            </span>
            <span className="font-semibold text-md tracking-wide text-gray-600">Contact Us:</span>
            <span className="text-sm tracking-wide text-gray-600">support@myelevatordesignstudios.com</span>
          </div>
        </div>
      </div>

      {/* Right side image */}
      <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 overflow-hidden">
        <img src="/AuthImage.png" alt="Auth Preview" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;