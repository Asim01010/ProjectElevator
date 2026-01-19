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

// OTP.jsx – replace the problematic parts

const OTP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, userLoading, userSuccess, userError, userMessage } =
    useSelector((state) => state.register);

  // Get userId correctly – prefer location.state first
  const userIdFromState = location.state?.userId;
  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userIdFromState || storedUser?._id;

  const [code, setCode] = useState("");

  // ────────────────────────────────────────────────
  //  VERY IMPORTANT: REMOVE THIS BLOCK COMPLETELY
  // if (!userId) { ... dispatch(...) }
  // ────────────────────────────────────────────────

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim()) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    if (!userId) {
      toast.error("No user information found. Please register again.");
      navigate("/register");
      return;
    }

    // Send as string – backend will convert
    dispatch(verifyUserOtp({ id: userId, otp: code.trim() }));
  };

  const handleResend = () => {
    if (!user?.email && !storedUser?.email) {
      toast.error("Cannot resend – email not found");
      return;
    }
    dispatch(resendOtp(user?.email || storedUser.email));
  };

  useEffect(() => {
    if (userSuccess) {
      // After successful verification we usually have token + user
      toast.success(userMessage || "Account verified successfully!");
      
      // Important: clear sensitive temp data
      dispatch(userReset({ resetUserOnly: false })); // or custom clear
      localStorage.removeItem("userInfo");           // remove temp unverified user
      
      navigate("/login", { replace: true });
    }

    if (userError) {
      toast.error(userMessage || "Verification failed");
      dispatch(userReset({ resetUserOnly: true }));
    }
  }, [userSuccess, userError, userMessage, dispatch, navigate]);

  // If no userId at all → early redirect
  if (!userId) {
    return <div className="p-10 text-center">Session expired. <br/>Redirecting to register...</div>;
    // or use useEffect + navigate
  }

  // rest of your JSX ...

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="pt-24 px-4 sm:px-8 md:px-16 lg:px-60 xl:px-60">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-6">
          HOME &gt; USER ACCOUNT &gt;{" "}
          <span className="text-[#8DC63F]">Verify Your Account</span>
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-light text-gray-700 mb-4">
          Verify Your Account
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6 max-w-3xl">
          Please verify your account using the code sent to your e-mail.
        </p>

        <p className="text-gray-500 mb-10 max-w-3xl leading-relaxed">
          You should receive a verification message from{" "}
          <span className="font-medium">webmaster@forms-surfaces.net</span>{" "}
          within minutes. Make sure to check your spam filter or add the address
          to your whitelist if necessary. If you do not receive a verification
          message, please contact us at{" "}
          <span className="underline cursor-pointer">
            support@forms-surfaces.com
          </span>
          .
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-6">
          {/* Email Display */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              EMAIL
            </label>
            <div className="w-full border border-gray-300 px-4 py-3 bg-gray-100">
              {user?.email || "Loading..."}
            </div>
          </div>

          {/* Verification Code */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              VERIFICATION CODE
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#8DC63F]"
              placeholder="Enter verification code"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={userLoading}
            className="w-full bg-[#8DC63F] text-white py-3 text-lg font-medium hover:bg-[#b1d286] transition"
          >
            {userLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Resend Link */}
        <button
          onClick={handleResend}
          className="mt-4 text-gray-500 hover:text-[#8DC63F] hover:underline transition"
        >
          Resend verification code
        </button>
      </div>
    </div>
  );
};

export default OTP;
