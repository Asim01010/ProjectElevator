import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, userReset } from "../redux/features/Register/registerSlice";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLoading, userSuccess, userError, userMessage } = useSelector(
    (state) => state.register
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (userSuccess) {
      toast.success(userMessage);
      dispatch(userReset());
      navigate("/profile", { replace: true }); // navigate to dashboard/home
    }
    if (userError) {
      toast.error(userMessage);
      dispatch(userReset());
    }
  }, [userSuccess, userError, userMessage, dispatch, navigate]);

  return (
    <div className="bg-white min-h-screen">
      {/* <Navbar /> */}

      <div className="pt-24 px-4 sm:px-8 md:px-16 lg:px-60 xl:px-60">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-6">
          HOME &gt; USER ACCOUNT &gt;{" "}
          <span className="text-[#8DC63F]">Login</span>
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-light text-gray-700 mb-4">
          Login to Your Account
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6 max-w-3xl">
          Already registered? Use your existing Elevator Design Studio (EDS)
          credentials to access your account.
        </p>

        <p className="text-gray-500 mb-10 max-w-3xl leading-relaxed">
          Not registered yet? Create an account to start designing with the
          Elevator Design Studio. Registration is quick, secure, and easy.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-6">
          {/* Email */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#8DC63F]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#8DC63F]"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={userLoading}
            className="w-full bg-[#8DC63F] text-white py-3 text-lg font-medium hover:bg-[#b1d286] transition"
          >
            {userLoading ? "Logging in..." : "Log in"}
          </button>

          {/* Links */}
          <div className="flex flex-col gap-2 mt-2">
            <Link
              to="/forgot-password"
              className="text-gray-500 hover:text-[#8DC63F] hover:underline transition"
            >
              Forgot your password?
            </Link>

            <Link
              to="/register"
              className="text-gray-500 hover:text-[#8DC63F] hover:underline transition"
            >
              Register for an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
