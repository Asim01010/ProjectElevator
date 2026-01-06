import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import ProfileEdit from "./Profile/ProfileEdit";
import HowDoesItWork from "./Profile/components/HowDoesItWork";
import ProjectDetail from "./Profile/components/ProjectDetail";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Design from "./Design/Design";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* You can add more routes here in future */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/how-does-it-work" element={<HowDoesItWork />} />
        <Route path="/project-detail" element={<ProjectDetail />} />
        <Route path="/design" element={<Design />} />
      </Routes>
    </Router>
  );
};

export default App;
