// src/pages/components/ProjectsGrid.jsx
import React, { useMemo } from "react";
import Project from "./Project";

// ── Glass card token (same as Profile) ────────────────────────────────────────
const glassCard = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(161,124,80,0.18)",
  borderRadius: "12px",
  boxShadow:
    "0 8px 32px rgba(161,124,80,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
};

// ── Spinner ────────────────────────────────────────────────────────────────────
function GoldSpinner() {
  return (
    <div
      className="w-9 h-9 rounded-full border-2 animate-spin"
      style={{ borderColor: "rgba(161,124,80,0.25)", borderTopColor: "#A17C50" }}
    />
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar({ total, inProgress, completed }) {
  const items = [
    { label: "Total", value: total },
    { label: "In Progress", value: inProgress },
    { label: "Completed", value: completed },
  ];
  return (
    <div className="flex gap-4 mb-2">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center px-4 rounded-lg"
          style={{ background: "rgba(161,124,80,0.07)", border: "1px solid rgba(161,124,80,0.14)" }}
        >
          <span className="text-base font-bold" style={{ color: "#A17C50", fontFamily: "'Playfair Display', serif" }}>
            {value}
          </span>
          <span className="text-[8px] font-bold uppercase tracking-widest mt-0.5" style={{ color: "rgba(161,124,80,0.6)" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Main grid component ────────────────────────────────────────────────────────
const ProjectsGrid = ({
  projects = [],
  isLoading = false,
  onProjectClick,
  onEdit,
  onDelete,
  onDuplicate,
  onAddDesign,
}) => {
  const stats = useMemo(() => ({
    total:      projects.length,
    inProgress: projects.filter((p) => p.subprojects?.length > 0).length,
    completed:  projects.filter((p) => p.status === "Complete").length,
  }), [projects]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="py-16 flex flex-col items-center justify-center gap-4">
        <GoldSpinner />
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(161,124,80,0.5)" }}>
          Loading projects…
        </p>
      </div>
    );
  }

  // ── Empty state ──────────────────────────────────────────────────────────
  if (projects.length === 0) {
    return (
      <div className="py-14 flex flex-col items-center gap-4 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(161,124,80,0.08)" }}
        >
          <span className="text-3xl">✦</span>
        </div>
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "rgba(161,124,80,0.55)" }}>
          No projects found
        </p>
        <p className="text-[11px] max-w-xs" style={{ color: "rgba(161,124,80,0.4)" }}>
          Start creating your first elevator design project using the panel on the left.
        </p>
      </div>
    );
  }

  // ── Grid ─────────────────────────────────────────────────────────────────
  return (
    <div>
      <StatsBar
        total={stats.total}
        inProgress={stats.inProgress}
        completed={stats.completed}
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => onProjectClick?.(project._id)}
          >
            <Project
              projectId={project._id}
              name={project.name}
              company={project.company}
              createdAt={project.createdAt}
              updatedAt={project.updatedAt}
              subprojectsCount={project.subprojects?.length || 0}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onAddDesign={onAddDesign}
            />
          </div>
        ))}
      </div>

      <div
        className="mt-8 text-center text-[9px] font-bold uppercase tracking-widest"
        style={{ color: "rgba(161,124,80,0.4)" }}
      >
        Showing {projects.length} project{projects.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default ProjectsGrid;