// src/pages/Profile.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { gsap } from "gsap";

import {
  getUserProjects,
  createProject,
  projectReset,
  duplicateProject,
  deleteProject,
} from "../redux/features/Project/projectSlice";
import { FilePenLine, PlusCircle, Search, X } from "lucide-react";
import ProjectsGrid from "./components/ProjectsGrid";
import { useToast } from "../context/useToast";
// ── Shared style tokens ────────────────────────────────────────────────────────
const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(161,124,80,0.18)",
  borderRadius: "12px",
  boxShadow:
    "0 8px 32px rgba(161,124,80,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
};

const inputStyle = {
  background: "rgba(255,255,255,0.6)",
  border: "1px solid rgba(161,124,80,0.22)",
  borderRadius: "8px",
  color: "#2C2822",
  fontFamily: "inherit",
  backdropFilter: "blur(6px)",
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
};

const labelStyle = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(161,124,80,0.75)",
};
// ── Small reusable components ──────────────────────────────────────────────────

function SectionDot() {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{ backgroundColor: "#A17C50" }}
    />
  );
}

function SectionHeader({ title }) {
  return (
    <div
      className="flex items-center gap-2 p-2 border-b"
      style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}
    >
      <SectionDot />
      <h2
        className="text-[11px] font-bold uppercase tracking-wider"
        style={{ color: "#2C2822" }}
      >
        {title}
      </h2>
    </div>
  );
}

function ActionLink({ icon, label, to, onClick }) {
  const ref = useRef(null);
  return (
    <Link
      to={to || "#"}
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => gsap.to(ref.current, { x: 3, duration: 0.18 })}
      onMouseLeave={() => gsap.to(ref.current, { x: 0, duration: 0.18 })}
      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest py-1.5 transition-colors"
      style={{ color: "rgba(161,124,80,0.75)", textDecoration: "none" }}
    >
      <FilePenLine size={13} />
      {label}
    </Link>
  );
}

// ── Create Project Modal ───────────────────────────────────────────────────────
function CreateProjectModal({ isOpen, onClose, onSubmit, isLoading }) {
  const modalRef   = useRef(null);
  const contentRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", company: "" });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(contentRef.current,
        { scale: 0.94, y: 28, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: "back.out(0.7)" }
      );
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, e);
    setFormData({ name: "", company: "" });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-2"
      style={{ background: "rgba(44,40,34,0.62)", backdropFilter: "blur(8px)" }}
    >
      <div ref={contentRef} className="relative w-full max-w-md" style={glassCard}>
        {/* Header */}
        <div
          className="flex items-center justify-between p-2 border-b"
          style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}
        >
          <div className="flex items-center gap-2">
            <SectionDot />
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>
              Create New Project
            </h3>
          </div>
          <button
            onClick={onClose}
            className="transition-opacity hover:opacity-60"
            style={{ color: "rgba(161,124,80,0.6)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-2 space-y-5">
          <div>
            <label style={labelStyle} className="block mb-1.5">Project Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              className="w-full px-3 py-2.5 text-sm"
              placeholder="e.g. Residential Tower Lift"
              onFocus={e => { e.target.style.borderColor = "#A17C50"; e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1)"; }}
              onBlur={e =>  { e.target.style.borderColor = "rgba(161,124,80,0.22)"; e.target.style.boxShadow = "none"; }}
              required
            />
          </div>
          <div>
            <label style={labelStyle} className="block mb-1.5">Company Name *</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={inputStyle}
              className="w-full px-3 py-2.5 text-sm"
              placeholder="e.g. ABC Elevators Pvt Ltd"
              onFocus={e => { e.target.style.borderColor = "#A17C50"; e.target.style.boxShadow = "0 0 0 3px rgba(161,124,80,0.1)"; }}
              onBlur={e =>  { e.target.style.borderColor = "rgba(161,124,80,0.22)"; e.target.style.boxShadow = "none"; }}
              required
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-lg disabled:opacity-50 transition-all"
              style={{
                backgroundColor: "#A17C50",
                boxShadow: "0 6px 20px -4px rgba(161,124,80,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {isLoading ? "Creating…" : "Create Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all"
              style={{
                background: "rgba(161,124,80,0.08)",
                color: "rgba(161,124,80,0.7)",
                border: "1px solid rgba(161,124,80,0.2)",
              }}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* decorative corner */}
        <div className="absolute -top-3 -right-3 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow-lg opacity-80">
          <span className="text-base">✦</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Profile Component ─────────────────────────────────────────────────────
const Profile = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
const toast = useToast();

  const containerRef = useRef(null);
  const headerRef    = useRef(null);

  const {
    projects,
    projectLoading,
    projectSuccess,
    projectError,
    projectMessage,
    lastCreatedSubprojectId,
  } = useSelector((state) => state.project);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm]           = useState("");
  const [sortMode, setSortMode]               = useState("date");

  // ── Fetch on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(getUserProjects());
  }, [dispatch]);

  // ── Entrance animation ─────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    ).fromTo(headerRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
      "-=0.2"
    );
  }, []);

  // ── Toast + reset + redirect ───────────────────────────────────────────────
useEffect(() => {
  if (projectSuccess) {
    toast.success(projectMessage || "Operation successful");

    if (
      projectMessage?.toLowerCase().includes("created") &&
      lastCreatedSubprojectId
    ) {
      const subId = lastCreatedSubprojectId;
      dispatch(projectReset());
      navigate(`/design/${subId}`); // ✅ subproject id, NOT project id
      return;
    }

    dispatch(projectReset());
  }

  if (projectError) {
    toast.error(projectMessage || "Something went wrong");
    dispatch(projectReset());
  }
}, [
  projectSuccess,
  projectError,
  projectMessage,
  lastCreatedSubprojectId,
  navigate,
  dispatch,
]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleCreateProject = (formData, e) => {
    e?.preventDefault();
    if (!formData.name.trim() || !formData.company.trim()) {
      return toast.error("Project name and company are required");
    }
    dispatch(createProject(formData));
    setShowCreateModal(false);
  };

  const handleDelete = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project? This will delete all its designs too.")) {
      dispatch(deleteProject(projectId));
    }
  };

  const handleDuplicate = (projectId) => {
    const found = projects.find((p) => p._id === projectId);
    const newName = prompt("Enter new project name:", `${found?.name} (Copy)`);
    if (newName && newName.trim()) {
      dispatch(duplicateProject({ id: projectId, newName: newName.trim() }));
    }
  };

  const handleEdit = (projectId) => {
    toast.info("Edit project name/company — coming soon");
  };

  // ── Client-side filter & sort ──────────────────────────────────────────────
  const filteredProjects = projects
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortMode === "az")   return a.name.localeCompare(b.name);
      if (sortMode === "za")   return b.name.localeCompare(a.name);
      if (sortMode === "date") return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const sortBtnStyle = (mode) => ({
    padding: "0.35rem 0.75rem",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    border: "1px solid rgba(161,124,80,0.25)",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all .2s",
    background: sortMode === mode ? "#A17C50" : "rgba(255,255,255,0.6)",
    color:      sortMode === mode ? "#fff"     : "rgba(161,124,80,0.7)",
    fontFamily: "inherit",
  });

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        backgroundColor: "#F7F4ED",
        fontFamily: "'DM Sans', sans-serif",
        opacity: 0,
        paddingTop: "40px",    /* clear fixed navbar */
        paddingBottom: "52px", /* clear fixed footer */
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        input::placeholder { color: rgba(120,106,88,0.4); }
      `}</style>

      {/* Ambient glow blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(161,124,80,0.07) 0%, transparent 70%)", zIndex: 0 }} />
      <div className="fixed bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(161,124,80,0.05) 0%, transparent 70%)", zIndex: 0 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">

        {/* ── Page header ── */}
        <div ref={headerRef} className="mb-2">
          {/* Breadcrumb */}
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-2 mb-2"
            style={{ color: "rgba(161,124,80,0.55)" }}>
            <Link to="/" className="hover:opacity-70 transition-opacity" style={{ color: "inherit" }}>Home</Link>
            <span style={{ color: "rgba(161,124,80,0.3)" }}>›</span>
            <span style={{ color: "#A17C50" }}>My Profile</span>
          </p>

          <div className="flex items-center gap-4">
            <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: "#A17C50" }} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(22px, 4vw, 34px)", color: "#2C2822", lineHeight: 1.2 }}>
              My Profile
              <span className="font-light ml-3" style={{ color: "#A17C50", fontSize: "0.75em" }}>
                | Elevator Design Studio
              </span>
            </h1>
          </div>
        </div>

        {/* ── Intro banner ── */}
        {/* <div className="mb-2" style={glassCard}>
          <div className="p-5">
            <p className="text-xs leading-relaxed" style={{ color: "#7A705F" }}>
              FAST-TRACK THE DESIGN PROCESS! my.EDS lets you create and manage Elevator Design Studio projects,
              designs, and your profile information from one spot.
            </p>
          </div>
        </div> */}

      <div className="w-full max-w-7xl mx-auto mb-2 " >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ── CARD 1: My Profile (Compact Luxury Badge Layout) ── */}
        <div className="lg:col-span-5 bg-white border border-[#E6E0D6] shadow-sm flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle Accent Line */}
          <div className="h-1 w-full bg-gradient-to-r from-[#8C6239] to-[#A17C50]" />
          
          <div className="p-2 sm:p-2 flex-1">
            <div className="flex items-center justify-between mb-2 pb-4 border-b border-[#F0EAE1]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6239]">
                Account Overview
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-[#FAF8F5] text-[#7A705F] border border-[#E6E0D6]">
                Active
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar Frame with Gold Accent */}
              <div className="relative shrink-0">
                <img
                  src="/123.jpg"
                  alt="Profile"
                  className="w-28 h-28 object-cover shadow-sm border border-[#E6E0D6]"
                />
                <div className="absolute -bottom-2 -right-2 bg-[#2C2822] text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5">
                  User
                </div>
              </div>

              {/* Action Links Container */}
              <div className="w-full space-y-3">
                <h3 className="text-lg font-medium text-[#2C2822] font-serif mb-1">
                  My Profile
                </h3>
                <div className="flex flex-col gap-2 text-xs font-medium">
                  <Link 
                    to="/profile-edit" 
                    className="p-1.5 bg-[#FAF8F5] hover:bg-[#2C2822] text-[#2C2822] hover:text-white transition-all duration-200 border border-[#E6E0D6] flex items-center justify-between group/btn"
                  >
                    <span>Edit Security & Password</span>
                    <span className="text-[#8C6239] group-hover/btn:text-white transition-colors">→</span>
                  </Link>
                  <Link 
                    to="/profile-edit" 
                    className="p-1.5 bg-[#FAF8F5] hover:bg-[#2C2822] text-[#2C2822] hover:text-white transition-all duration-200 border border-[#E6E0D6] flex items-center justify-between group/btn"
                  >
                    <span>Contact Information</span>
                    <span className="text-[#8C6239] group-hover/btn:text-white transition-colors">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2: How Does It Work? (Hero Spotlight Banner Layout) ── */}
        <div className="lg:col-span-7 bg-[#2C2822] text-white flex flex-col justify-between relative overflow-hidden p-2 sm:p-2">
          
          {/* Subtle Decorative Background Element */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#8C6239]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="py-2 px-4 flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A17C50]">
                Quickstart Guide
              </span>
              <span className="text-[10px] text-white/60 tracking-wider uppercase border border-white/10 px-2 py-0.5">
                10 Steps Tutorial
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-medium font-serif text-white mb-2">
              How Does It Work?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <p className="sm:col-span-8 text-xs leading-relaxed text-white/70">
                Getting started with the Elevator Design Studio (EDS) is simple. Learn how to select your configuration, apply materials and finishes, view realistic 3D renderings, and manage your project from a single location.
              </p>

              {/* Preview Thumbnail */}
              <Link 
                to="/how-does-it-work" 
                className="sm:col-span-4 group relative overflow-hidden block border border-white/20 hover:border-[#A17C50] transition-colors"
              >
                <img
                  src="/123456.jpg"
                  alt="Tutorial preview"
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#8C6239] px-2 py-1 shadow-md">
                    Watch
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-2 px-4 mt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-white/50">
              Master the EDS platform in minutes
            </span>
            <Link
              to="/how-does-it-work"
              className="text-xs font-bold uppercase tracking-widest text-[#A17C50] hover:text-white transition-colors flex items-center gap-2 group"
            >
              <span>Launch Tutorial</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>

      </div>
    </div>

        {/* ── Row 2: Create New Project + My Projects ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

          {/* Create New Project */}
          <div>
            <div style={glassCard}>
              <SectionHeader title="Create New Project" />
              <div
                className="p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:scale-[1.02]"
                onClick={() => setShowCreateModal(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setShowCreateModal(true)}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(161,124,80,0.1)" }}
                >
                  <PlusCircle size={38} style={{ color: "#A17C50" }} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#A17C50" }}>
                  Start New Project
                </p>
                <p className="text-[9px] text-center" style={{ color: "rgba(161,124,80,0.5)" }}>
                  Click to create a new elevator interior project
                </p>
              </div>
            </div>
          </div>

          {/* My Projects */}
          <div className="lg:col-span-2">
            <div style={glassCard}>
              <div className="p-4 border-b" style={{ borderBottom: "1px solid rgba(161,124,80,0.12)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <SectionDot />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2C2822" }}>My Projects</h2>
                </div>
                <p className="text-[11px] leading-relaxed mb-2" style={{ color: "#7A705F" }}>
                  Click any project thumbnail to open it and access its EDS designs, or start an entirely new project.
                  Hover over a project card to edit, duplicate, or delete it.
                </p>

                {/* Search + Sort */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(161,124,80,0.5)" }} />
                    <input
                      type="text"
                      placeholder="Search projects…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={inputStyle}
                      className="w-full pl-9 pr-3 py-2 text-xs"
                    />
                  </div>
                  {/* Sort */}
                  <div className="flex items-center gap-1.5">
                    <span style={{ fontSize: "9px", color: "rgba(161,124,80,0.6)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Sort</span>
                    {["date", "az", "za"].map((mode) => (
                      <button key={mode} onClick={() => setSortMode(mode)} style={sortBtnStyle(mode)}>
                        {mode === "date" ? "Date" : mode.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects grid lives here — using the real ProjectsGrid */}
              <div className="p-4">
                <ProjectsGrid
                  projects={filteredProjects}
                  isLoading={projectLoading}
                  onProjectClick={(id) => navigate(`/project/${id}`)}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onAddDesign={() => toast.info("Add new design — coming in next step")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Trusted by ── */}
        <div className="mt-2 pt-2 border-t" style={{ borderTop: "1px solid rgba(161,124,80,0.15)" }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "rgba(161,124,80,0.45)" }}>
            Trusted by Industry Leaders
          </p>
          <div className="flex items-center gap-6" style={{ opacity: 0.45, filter: "grayscale(1)" }}>
            {["OTIS", "KONE", "TKE"].map((b) => (
              <span key={b} className="font-black text-sm tracking-tighter cursor-pointer transition-all hover:opacity-100" style={{ color: "#5A4F40" }}>{b}</span>
            ))}
            <span className="font-light text-xs tracking-wide cursor-pointer" style={{ color: "#5A4F40" }}>Schindler</span>
            <span className="font-light text-xs tracking-wide cursor-pointer" style={{ color: "#5A4F40" }}>Mitsubishi</span>
          </div>
        </div>
      </div>

      {/* ── Create Project Modal ── */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
        isLoading={projectLoading}
      />
    </div>
  );
};

export default Profile;