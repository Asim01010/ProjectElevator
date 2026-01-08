import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>

      <div className="py-20 px-4 sm:px-8 md:px-16 lg:px-60 xl:px-80">
        <h1 className="text-gray-800 text-3xl font-bold mb-6">LOGIN</h1>

        <div className="mb-8 space-y-4">
          <p className="text-gray-600">
            Already registered? Use your current Elevator Design Studio (EDS)
            login credentials (email and password) to access your EDS user
            account on this new 3.0 version of the application. NOTE: You will
            be prompted to import your legacy EDS projects the first time you
            log in. The import process is fast and easy and can be completed at
            any time.
          </p>
          <p className="text-gray-600">
            Not registered yet? Register now to experience the benefits of
            working with the Elevator Design Studio. Registration is fast,
            secure, and the first step in beginning your creative journey.
          </p>
        </div>

        <form action="" className="w-full flex flex-col gap-4 max-w-lg">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              EMAIL
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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-3 bg-[#8DC63F] hover:bg-[#7ab52e] text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
          >
            Log in
          </button>

          <div className="mt-4 space-y-2">
            <a
              href="#"
              className="block text-gray-600 hover:text-[#8DC63F] hover:underline transition-colors"
            >
              Forgot your Password?
            </a>
            <Link to="/register">
              <p className="block text-gray-600 hover:text-[#8DC63F] hover:underline transition-colors">
                {" "}
                Register for an Account
              </p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
