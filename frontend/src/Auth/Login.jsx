import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, userReset } from "../redux/features/Register/registerSlice";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { MdOutlineCloudQueue } from "react-icons/md";

const Login = () => {
  // --- Redux and Navigation Hooks ---
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLoading, userSuccess, userError, userMessage, user } = useSelector(
    (state) => state.register
  );

  // --- Form States ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  // --- Role Options Configuration ---


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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(breadcrumbRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(badgeRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" },
        "-=0.15"
      )
      .fromTo(ruleRef.current,
        { height: 0, opacity: 0 },
        { height: 32, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.15"
      )
      .fromTo(headingRef.current,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
        "-=0.25"
      )
      .fromTo(formRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        "-=0.2"
      );

      gsap.to(btnRef.current, {
        y: -2,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- GSAP Micro-Interactions ---
  // const handleBtnEnter = () => {
  //   gsap.to(btnRef.current, { scale: 1.02, backgroundColor: "#8B6942", duration: 0.25 });
  //   gsap.to(arrowRef.current, { x: 5, duration: 0.2 });
  // };

  // const handleBtnLeave = () => {
  //   gsap.to(btnRef.current, { scale: 1, backgroundColor: "#A17C50", duration: 0.25 });
  //   gsap.to(arrowRef.current, { x: 0, duration: 0.2 });
  // };

  const handleBtnClick = () => {
    gsap.timeline()
      .to(btnRef.current, { scale: 0.97, duration: 0.08 })
      .to(btnRef.current, { scale: 1.02, duration: 0.18, ease: "elastic.out(1, 0.5)" })
      .to(btnRef.current, { scale: 1, duration: 0.12 });
  };

  // --- Submit Logic ---
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password, role: selectedRole }));
  };

  // --- Redux Success/Error Listeners ---
  useEffect(() => {
    if (userSuccess && user?.role) {
      toast.success(userMessage || "Login successful!");

      const redirectMap = {
        user: "/profile",
        fabricator: "/dashboard_fabricator",
        supplier: "/supplier/dashboard",
      };

      const targetPath = redirectMap[user.role] || "/";
      navigate(targetPath, { replace: true });

      dispatch(userReset());
    }

    if (userError) {
      toast.error(userMessage);
      dispatch(userReset());
    }
  }, [userSuccess, userError, userMessage, user, dispatch, navigate]);

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
    e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1), 0 2px 10px rgba(161,124,80,0.06)";
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "rgba(161,124,80,0.22)";
    e.target.style.background = "rgba(255,255,255,0.65)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="flex h-screen w-full items-stretch justify-center overflow-hidden">
      {/* Left Panel */}
      <div
        className="w-full lg:w-1/2 h-screen relative overflow-hidden flex flex-col justify-center"
        style={{ backgroundColor: "#F7F4ED", fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* CSS Injectors */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;800&display=swap');
          input::placeholder { color: rgba(120,106,88,0.45); }
          input:focus { outline: none; }
          .eds-pw-toggle { background: none; border: none; cursor: pointer; color: rgba(161,124,80,0.55); display: flex; align-items: center; justify-content: center; transition: color 0.2s; }
          .eds-pw-toggle:hover { color: #A17C50; }
          .eds-secondary-btn { transition: all 0.2s; }
          .eds-secondary-btn:hover { background: rgba(161,124,80,0.08); }
          .eds-trust-icon { transition: all 0.2s; }
          .eds-role-card { transition: all 0.2s ease-in-out; cursor: pointer; }
          .eds-role-card:hover { border-color: #A17C50 !important; }
        `}</style>

        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(161,124,80,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(161,124,80,0.08) 0%, transparent 70%)" }} />

        {/* Main Content Box */}
        <div
          ref={containerRef}
          className="relative z-10 py-4 px-6 sm:px-12 md:px-14 lg:px-12 xl:px-16 flex flex-col justify-between h-full max-h-[920px] my-auto"
          style={{ opacity: 0 }}
        >
          {/* Header Block */}
          <div>
            <div className="flex items-center justify-between mb-3">
              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-2">
             <img src="logo/logo.png" width={150} alt="" />
              </Link>

              {/* Patent Badge */}
           
            </div>
   {/* <div
                ref={badgeRef}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em]"
                style={{
                  background: "rgba(161,124,80,0.08)",
                  border: "1px solid rgba(161,124,80,0.2)",
                  color: "#A17C50",
                  opacity: 0,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: "#A17C50",
                    animation: "pulse 2s infinite",
                  }}
                />
                Patent-Pending technology
                <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.65)}}`}</style>
              </div> */}
            {/* Heading */}
            <h1
              ref={headingRef}
              className="flex items-center mb-2"
              style={{ opacity: 0 }}
            >
           
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 3vw, 42px)",
                  color: "#2C2822",
                  lineHeight: 1.15,
                }}
              >
                Welcome Back
              </span>
            </h1>

            <p className="text-sm leading-relaxed  max-w-lg text-black" >
             Sign in to your account to create, Customize and Visulaize stunning elevator interiors in 3D.
            </p>
          </div>

            <div className="flex items-center gap-3 my-0.5">
              
              <span className="text-[13px] font-bold text-[#473522]" style={{ color: "rgba(161,124,80,1)" }}>Sign in to your Account</span>
              <span className="flex-1 h-px" style={{ backgroundColor: "rgba(161,124,80,0.18)" }} />
            </div>

          {/* Form Block */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-w-lg"
            style={{ opacity: 0 }}
          >
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label
                className="text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-1  text-[#8F5D28]"
               
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#A17C50" className="w-2.5 h-2.5  text-[#8F5D28]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.２５ ０ ０１－２．３６－０Ｌ３．３２ ８．９１a２．２５ ２．２５ ０ ０１－１．０７－１．９１６V６．７５" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-sm px-3.5 py-2.5 text-xs transition-all duration-200"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label
                className="text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-1  text-[#8F5D28]"
               
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#A17C50" className="w-2.5 h-2.5  text-[#8F5D28]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-sm px-3.5 py-2.5 pr-10 text-xs transition-all duration-200"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="eds-pw-toggle absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5  text-[#8F5D28]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5 text-[#8F5D28]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-[10px] tracking-wide transition-opacity hover:opacity-60 text-[#8F5D28]"
                  
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              ref={btnRef}
              type="submit"
              disabled={userLoading}
              onClick={handleBtnClick}
              // onMouseEnter={handleBtnEnter}
              // onMouseLeave={handleBtnLeave}
              className="w-full flex items-center justify-center gap-2 rounded-sm py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#8F5D28",
                boxShadow: "0 6px 18px -4px rgba(161,124,80,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {userLoading ? "Logging in…" : "Sign In"}
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

            {/* Divider */}
            <div className="flex items-center gap-3 my-0.5">
              <span className="flex-1 h-px" style={{ backgroundColor: "rgba(161,124,80,0.18)" }} />
              <span className="text-[9px] font-bold tracking-[0.2em]" style={{ color: "rgba(161,124,80,0.5)" }}>OR</span>
              <span className="flex-1 " style={{ backgroundColor: "rgba(161,124,80,0.18)" }} />
            </div>
<p className="text-[11px] font-bold tracking-[0.2em] p-0 m-0 " style={{ color: "rgba(161,124,80,1)" }} >New to my Elevator Design Studios?</p>
            {/* Secondary Link */}
            <Link
              to="/register"
              className="eds-secondary-btn w-full flex items-center justify-center gap-2 rounded-sm py-2.5 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ border: "1.5px solid #A17C50", color: "#A17C50" }}
            >
              Create An Account
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-2.5 h-2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Account Type Selector (Placed below Create An Account button) */}
            <div className="mt-1 max-w-lg">
              <label className="block text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: "rgba(161,124,80,0.75)" }}>
                Select Your Account Type
              </label>
             
            </div>
          </form>

          {/* Footer Trust Features */}
          <div
            className="pt-3 max-w-lg grid grid-cols-3 gap-2 mt-2"
            style={{ borderTop: "1px solid rgba(161,124,80,0.15)" }}
          >
            {[
              {
                label: "Secure & Reliable",
                desc: "Protected workspace",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                ),
              },
              {
                label: "Cloud Based",
                desc: "Access anywhere",
                icon: (
                <MdOutlineCloudQueue size={24} className="w-6.5 h-6.5 text-[#A17C50]" />
                ),
              },
              {
                label: "24/7 Support",
                desc: "Expert assistance",
                icon: (
                 <TfiHeadphoneAlt size={20} className="w-6.5 h-6.5 text-[#A17C50]" />
                ),
              },
            ].map((item) => (
              <div key={item.label} className="eds-trust-icon flex  items-start gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A17C50" className="w-6.5 h-6.5">
                  {item.icon}
                </svg>
                <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-[0.08em]" style={{ color: "#2C2822" }}>{item.label}</span>
                <span className="text-[8px] leading-tight" style={{ color: "#8A7A5A" }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="hidden lg:block lg:w-1/2 h-screen overflow-hidden">
        <img src="/AuthImage.png" alt="Elevator Design Workspace" className="w-full h-full object-center" />
      </div>
    </div>
  );
};

export default Login;