import React from "react";
import Navbar from "../components/Navbar";
const Register = () => {
  return (
    <div>
      <Navbar />

      <div className="pt-20 px-4 sm:px-8 md:px-16 lg:px-60 xl:px-60 w-full" >
        <h1 className="text-gray-800 text-3xl font-bold mb-6">
          Register for an Account
        </h1>
        <p className="text-gray-600 mb-4">
          Passwords must follow the following requirements:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
          <li>Minimum length of 8 characters</li>
          <li>At least 1 number</li>
          <li>At least 1 special character</li>
          <li>At least 1 uppercase letter</li>
          <li>At least 1 lowercase letter</li>
        </ul>

        <form action="" className="w-full flex flex-col gap-4 max-w-lg">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent transition-all"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-1"
            >
              Re-Check Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-transparent transition-all"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-3 bg-[#8DC63F] hover:bg-[#7ab52e] text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
