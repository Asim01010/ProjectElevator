import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { regUser, userReset } from "../redux/features/Register/registerSlice";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, userLoading, userSuccess, userError, userMessage } = useSelector(
    (state) => state.register
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = formData;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(regUser({ email, password, confirmPassword }));
  };

useEffect(() => {
  if (userSuccess) {
    toast.success(userMessage);
    // navigate and pass Redux userId
    navigate("/verify-otp", { state: { userId: user?._id } });
    dispatch(userReset({ resetUserOnly: false })); // reset success/error flags only, keep user
  }
  if (userError) {
    toast.error(userMessage);
    dispatch(userReset({ resetUserOnly: true })); // reset error only
  }
}, [userSuccess, userError, userMessage, dispatch, navigate, user]);



  return (
    <div className="bg-white min-h-screen">
      <div className="pt-24 pb-10 px-4 sm:px-8 md:px-16 lg:px-60 xl:px-60">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-6">
          HOME &gt; USER ACCOUNT &gt;{" "}
          <span className="text-[#8DC63F]">Register</span>
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-light text-gray-700 mb-4">
          Register for an Account
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-4 max-w-3xl leading-relaxed">
          Passwords must follow the following requirements:
        </p>

        {/* Password Rules */}
        <ul className="text-gray-500 mb-10 max-w-3xl leading-relaxed list-disc pl-5 space-y-1">
          <li>Minimum Length of 8 Characters</li>
          <li>At least 1 number</li>
          <li>At least 1 special character</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 lowercase letter</li>
        </ul>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl flex flex-col gap-6">
          {/* Email */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#8DC63F]"
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
              name="password"
              value={password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#8DC63F]"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs tracking-widest text-gray-500 mb-2">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInput}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#8DC63F]"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={userLoading}
            className="w-full bg-[#8DC63F] text-white py-3 text-lg font-medium hover:bg-[#b1d286] transition"
          >
            {userLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
