import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import ProfileEdit from "./Profile/ProfileEdit";
import HowDoesItWork from "./Profile/components/HowDoesItWork";
import ProjectDetail from "./Project/ProjectDetail";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ElevatorDesigner from "./ElevatorDesigner/ElevatorDesigner"; // Add this import
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ElevatorDesigner2 from "./ElevatorDesigner/ElevatorDesigner2";
import ElevatorDesigner3 from "./ElevatorDesigner/ElevatorDesigner3";

import OTP from "./Auth/OTP";

const App = () => {
  return (
    <Router>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/how-does-it-work" element={<HowDoesItWork />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/elevator-designer" element={<ElevatorDesigner />} />
        <Route path="/elevator-designer2" element={<ElevatorDesigner2 />} />
        <Route path="/design/:id" element={<ElevatorDesigner3 />} />
        <Route path="/verify-otp" element={<OTP />} />
        {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
