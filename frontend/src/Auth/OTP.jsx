import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyUserOtp,
  resendOtp,
  userReset,
} from "../redux/features/Register/registerSlice";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const OTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, userLoading, userSuccess, userError, userMessage } =
    useSelector((state) => state.register);

  const userIdFromState = location.state?.userId;
  const storedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userId = userIdFromState || storedUser?._id;

  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    if (!userId) {
      toast.error("No user information found.");
      navigate("/register");
      return;
    }
    dispatch(verifyUserOtp({ id: userId, otp: code.trim() }));
  };
console.log("User role after success:", user?.role || storedUser?.role);
  const handleResend = () => {
    const email = user?.email || storedUser?.email;
    if (email) dispatch(resendOtp(email));
  };

  // Improved Role-based Redirect
  useEffect(() => {
    if (userSuccess) {
      const currentUser = user || storedUser;

      if (currentUser?.role) {
        toast.success(userMessage || "Account verified successfully!");

        const redirectMap = {
          user: "/",
          fabricator: "/dashboard_fabricator",
          supplier: "/supplier/dashboard",
        };

        const targetPath = redirectMap[currentUser.role] || "/";

        navigate(targetPath, { replace: true });

        dispatch(userReset({ resetUserOnly: false }));
        localStorage.removeItem("userInfo");
      }
    }

    if (userError) {
      toast.error(userMessage || "Verification failed");
      dispatch(userReset({ resetUserOnly: true }));
    }
  }, [userSuccess, userError, userMessage, user, storedUser, dispatch, navigate]);

  // Safety redirect
  useEffect(() => {
    if (!userId) {
      const timer = setTimeout(() => navigate("/register"), 2500);
      return () => clearTimeout(timer);
    }
  }, [userId, navigate]);

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf8f5] text-center p-6">
        <div className="w-12 h-12 border-4 border-[#c29d59] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#4a3e3d] font-medium">Session expired...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f5] min-h-screen font-sans antialiased selection:bg-[#c29d59]/20">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-8 md:px-16 lg:px-48 xl:px-60 max-w-7xl mx-auto">
        {/* Your existing UI code remains unchanged from here */}
        <nav className="text-[10px] tracking-widest font-semibold text-gray-400 mb-8 uppercase">
          Home &gt; User Account &gt;{" "}
          <span className="text-[#c29d59]">Verify Your Account</span>
        </nav>

        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#332a29] mb-4">
            Verify Your Account
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl leading-relaxed">
            Please verify your account using the unique code sent to your e-mail address to activate your profile settings.
          </p>
        </header>

        <div className="bg-white border border-gray-200/80 shadow-sm rounded-sm p-6 md:p-10 max-w-3xl">
          <p className="text-xs text-gray-500 mb-8 leading-relaxed">
            You should receive a verification message from{" "}
            <span className="font-semibold text-[#332a29]">webmaster@forms-surfaces.net</span>{" "}
            within minutes...
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Your existing form fields (email, code, buttons) - keep as is */}
            <div>
              <label className="block text-[10px] tracking-widest font-bold text-gray-400 mb-2 uppercase">
                Registered Email
              </label>
              <div className="w-full border border-gray-200 px-4 py-3 bg-[#faf8f5] text-gray-600 rounded-sm font-medium select-none">
                {user?.email || storedUser?.email || "Loading..."}
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-widest font-bold text-gray-400 mb-2 uppercase">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 bg-white text-[#332a29] font-medium tracking-widest placeholder:tracking-normal placeholder:font-normal focus:outline-none focus:border-[#c29d59] focus:ring-1 focus:ring-[#c29d59] transition-all rounded-sm shadow-inner"
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
            </div>

            <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
              <button onClick={handleResend} type="button" className="text-xs font-semibold text-gray-500 hover:text-[#c29d59] underline underline-offset-4 transition-colors">
                Resend verification code
              </button>

              <button
                type="submit"
                disabled={userLoading}
                className="w-full sm:w-auto min-w-[160px] bg-[#c29d59] text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-[#a07f43] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm rounded-sm"
              >
                {userLoading ? "Verifying..." : "Verify Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;