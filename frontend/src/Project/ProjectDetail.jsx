import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RingLoader } from "react-spinners";
import { gsap } from "gsap";

import {
  addSubproject,
  deleteProject,
  duplicateProject,
  getProjectById,
  projectReset,
} from "../redux/features/Project/projectSlice";
import { IoAddCircleOutline, IoCopyOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import SubProjectDetail from "./SubProjectDetail";
// Change this line in ProjectDetail.jsx:
import { useToast } from "../context/useToast";


const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(161,124,80,0.18)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(161,124,80,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
};

const labelStyle = {
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(161,124,80,0.75)",
};
function ActionBtn({ icon, label, onClick, danger = false }) {
  const ref = useRef(null);
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => gsap.to(ref.current, { x: 3, duration: 0.2 })}
      onMouseLeave={() => gsap.to(ref.current, { x: 0, duration: 0.2 })}
      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest py-1.5 transition-colors"
      style={{ color: danger ? "rgba(192,57,43,0.75)" : "rgba(161,124,80,0.7)", letterSpacing: "0.15em" }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      {label}
    </button>
  );
}

const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
const toast = useToast();

  const {
    currentProject,
    projectLoading,
    projectError,
    projectMessage,
    projectSuccess,
  } = useSelector((state) => state.project);

  const [projectName, setProjectName] = useState("");
  const [company, setCompany] = useState("");
  const [specifier, setSpecifier] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  useEffect(() => {
    if (id) dispatch(getProjectById(id));
    return () => dispatch(projectReset());
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProject) {
      setProjectName(currentProject.name || "elevator_2");
      setCompany(currentProject.company || "");
      setSpecifier(currentProject.specifier || "");
      setJobLocation(currentProject.jobLocation || "");
    }
  }, [currentProject]);

useEffect(() => {
  // Debug log: Open your browser Console (F12) to see what Redux is actually sending
  console.log("Toast Trigger Check:", { projectSuccess, projectError, projectMessage });

  if (projectSuccess) {
    const msg = projectMessage?.toLowerCase() || "";

    if (msg.includes("delete")) {
      toast.success("Project deleted");
      navigate("/profile");
    } else if (msg.includes("duplicate")) {
      toast.success("Project duplicated");
    } else if (msg.includes("add")) {
      toast.success("New design added");
      dispatch(getProjectById(id));
    } else if (projectMessage) {
      // Fallback: Show whatever message the API sent back
      toast.success(projectMessage);
    } else {
      // General success fallback
      toast.success("Operation successful");
    }

    // Reset Redux state AFTER triggering the toast
    dispatch(projectReset());
  }

  if (projectError) {
    toast.error(projectMessage || "Operation failed");
    dispatch(projectReset());
  }
}, [projectSuccess, projectError, projectMessage, navigate, dispatch, id, toast]);

  // GSAP Entrance
  useEffect(() => {
    if (!projectLoading && currentProject) {
      const tl = gsap.timeline();
      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(cardRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.2");
    }
  }, [projectLoading, currentProject]);

  if (projectLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4ED]">
        <RingLoader size={80} color="#A17C50" />
      </div>
    );
  }

  if (!currentProject && id) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Project not found</div>;
  }

  const created = currentProject?.createdAt ? new Date(currentProject.createdAt).toLocaleString() : "N/A";
  const lastModified = currentProject?.updatedAt ? new Date(currentProject.updatedAt).toLocaleString() : "N/A";

  return (
    
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-x-hidden py-24 px-4 sm:px-8 md:px-12 lg:px-16"
      style={{ backgroundColor: "#F7F4ED", fontFamily: "'DM Sans', sans-serif", opacity: 0 }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;800&display=swap');
        input::placeholder, textarea::placeholder { color: rgba(120,106,88,0.4); }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Breadcrumb + Header */}
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-2 mb-4" style={{ color: "rgba(161,124,80,0.55)" }}>
            My Projects › <span style={{ color: "#A17C50" }}>{projectName}</span>
          </p>
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: "#A17C50" }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3.5vw, 36px)", color: "#2C2822" }}>
              My Project <span className="font-light" style={{ color: "#A17C50" }}>| {projectName}</span>
            </h1>
          </div>
        </div>

        {/* Main Project Card */}
        <div ref={cardRef} style={glassCard} className="overflow-hidden mb-10">
          <div className="px-5 py-3 flex items-center justify-between bg-white/40 border-b border-[#A17C50]/10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#A17C50" }} />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#A17C50]">Patent-Pending Technology</span>
            </div>
            <span className="text-[9px] text-[#A17C50]/50">Elevator Design Studio v2.0</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Column - Image + Actions */}
            <div className="p-5 flex flex-col gap-4 border-r border-[#A17C50]/10">
              <div className="relative rounded-lg overflow-hidden border border-[#A17C50]/10">
                <img src="/12345.jpg" alt="Project" className="w-full h-48 object-cover" />
              </div>

              <div className="space-y-1">
                <p style={labelStyle}>Project Actions</p>
                <ActionBtn
                  icon="＋"
                  label="ADD ELEVATOR INTERIOR"
                  onClick={() => dispatch(addSubproject({ projectId: id, subData: { elevatorName: "New Elevator" } }))}
                />
                <ActionBtn
                  icon="⧉"
                  label="DUPLICATE PROJECT"
                  onClick={() => {
                    const newName = prompt("Enter name for duplicated project:", `${projectName} (Copy)`);
                    if (newName) dispatch(duplicateProject({ id, newName: newName.trim() }));
                  }}
                />
                <ActionBtn
                  icon="✕"
                  label="DELETE PROJECT"
                  danger
                  onClick={() => {
                    if (window.confirm("Delete this project and all its designs?")) dispatch(deleteProject(id));
                  }}
                />
              </div>
            </div>

            {/* Right Columns - Info */}
            <div className="lg:col-span-2 p-5">
              <p className="text-xs leading-relaxed mb-5" style={{ color: "#7A705F" }}>
                Within a project you can create multiple elevator interior designs...
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label style={labelStyle}>Project Name</label>
                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="px-3 py-2.5 text-xs rounded" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(161,124,80,0.22)" }} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={labelStyle}>Company</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="px-3 py-2.5 text-xs rounded" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(161,124,80,0.22)" }} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={labelStyle}>Specifier</label>
                    <input type="text" value={specifier} onChange={(e) => setSpecifier(e.target.value)} className="px-3 py-2.5 text-xs rounded" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(161,124,80,0.22)" }} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label style={labelStyle}>Job Location</label>
                    <textarea value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} rows={2} className="px-3 py-2.5 text-xs rounded resize-none" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(161,124,80,0.22)" }} />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-lg p-2" style={{ background: "rgba(161,124,80,0.05)" }}>
                    <div><label style={labelStyle}>Created</label><p className="text-xs mt-1">{created}</p></div>
                    <div className="mt-3"><label style={labelStyle}>Last Modified</label><p className="text-xs mt-1">{lastModified}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<button onClick={() => toast.success("test toast")}>Test</button>

        {/* Sub Projects */}
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C2822", fontSize: "22px" }}>Elevator Interiors</h2>
          <button
            onClick={() => dispatch(addSubproject({ projectId: id, subData: { elevatorName: "New Elevator" } }))}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white rounded-sm"
            style={{ backgroundColor: "#A17C50" }}
          >
            + Add New Interior
          </button>
        </div>

        {currentProject?.subprojects?.map((sub) => (
          <SubProjectDetail key={sub._id} subproject={sub} projectId={id} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;