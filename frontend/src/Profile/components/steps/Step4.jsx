import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LayoutGrid, FolderKanban, SquareStack, Plus } from "lucide-react";

const accordionItems = [
  {
    title: "Profile Dashboard",
    icon: LayoutGrid,
    summary: "Your account overview and the quickstart guide, side by side.",
    details: [
      "Account Overview card shows your avatar, an \"Active\" status badge, and quick links to edit Security & Password and Contact Information.",
      "Quickstart Guide banner introduces the 10-step tutorial — select your configuration, apply materials and finishes, view 3D renderings, and manage projects, all from one place.",
      "A thumbnail preview links straight into \"How Does It Work?\" for the full walkthrough.",
      "Both cards sit in a 12-column grid — Account Overview takes 5 columns, Quickstart Guide takes 7 — so they read as one balanced header.",
      "A \"Trusted by Industry Leaders\" strip (OTIS, KONE, TKE, Schindler, Mitsubishi) closes out the page for credibility.",
    ],
  },
  {
    title: "Create & Browse Projects",
    icon: FolderKanban,
    summary: "Start a new project, then search, sort and scan every existing one.",
    details: [
      "\"Create New Project\" is a single click-to-open panel — a modal asks for Project Name and Company Name, both required.",
      "My Projects panel includes a live Search box that filters by project name as you type.",
      "Sort controls — Date, A–Z, Z–A — re-order the grid instantly, no page reload.",
      "A stats bar above the grid totals your projects and breaks down how many are In Progress vs. Completed.",
      "Hovering any project card reveals it's clickable; an empty state with guidance appears if no projects exist yet.",
    ],
  },
  {
    title: "Project Cards",
    icon: SquareStack,
    summary: "Each card previews a project and its designs, with quick actions.",
    details: [
      "A numbered badge on the card shows how many sub-designs (elevator interiors) that project contains.",
      "Clicking the card body navigates into the project to see all its designs.",
      "Four icon actions sit in the footer: Edit (rename project/company), Add New Design (create another sub-design), Duplicate (copy the whole project under a new name), and Delete (removes the project and every design inside it, with a confirmation prompt).",
      "Duplicate and Delete both dispatch straight to the backend — duplicate asks for a new name via prompt, delete requires confirming the action can't be undone.",
      "Each action stops click propagation so it never accidentally opens the project instead.",
    ],
  },
];

function AccordionRow({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const Icon = item.icon;

  useEffect(() => {
    if (!bodyRef.current) return;
    if (isOpen) {
      gsap.to(bodyRef.current, { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
    }
  }, [isOpen]);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.6)",
        border: `1px solid ${isOpen ? "rgba(161,124,80,0.4)" : "rgba(161,124,80,0.18)"}`,
        transition: "border-color 0.25s",
      }}
    >
      <button type="button" onClick={onToggle} className="w-full flex items-center gap-3 p-3.5 text-left">
        <span
          className="flex items-center justify-center rounded-md shrink-0"
          style={{
            width: 34,
            height: 34,
            background: isOpen ? "#A17C50" : "rgba(161,124,80,0.1)",
            transition: "background 0.25s",
          }}
        >
          <Icon size={17} color={isOpen ? "#FFFFFF" : "#A17C50"} strokeWidth={1.8} />
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: "#2C2822" }}>{item.title}</p>
          <p className="text-xs leading-relaxed" style={{ color: "#7A705F" }}>{item.summary}</p>
        </div>

        <Plus
          size={16}
          color="#A17C50"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s", flexShrink: 0 }}
        />
      </button>

      <div ref={bodyRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <ul className="px-3.5 pb-3.5 pl-[58px] flex flex-col gap-1.5" style={{ color: "#5C5344" }}>
          {item.details.map((line, i) => (
            <li key={i} className="text-xs leading-relaxed list-disc marker:text-[#A17C50]/60">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const Step4 = () => {
  const imgWrapRef = useRef(null);
  const contentRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      imgWrapRef.current,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    ).fromTo(
      contentRef.current,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
      "-=0.45"
    );
  }, []);

  const images = [
    { src: "howitworkssteps/project.png", alt: "Projects dashboard" },
    { src: "howitworkssteps/subproject.png", alt: "Sub-project designs" },
    { src: "howitworkssteps/Profile.png", alt: "Profile overview" },
  ];

  return (
    <div
      className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-12 px-6 sm:px-10 lg:px-16 py-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;800&display=swap');
      `}</style>

      {/* Left — screenshots, stacked */}
      <div ref={imgWrapRef} className="w-full lg:w-1/2 flex flex-col gap-4 lg:sticky lg:top-10" style={{ opacity: 0 }}>
        {images.map((img) => (
          <div
            key={img.src}
            className="rounded-xl overflow-hidden"
            style={{
              border: "1px solid rgba(161,124,80,0.2)",
              boxShadow: "0 20px 50px -20px rgba(161,124,80,0.35)",
            }}
          >
            <img src={img.src} alt={img.alt} className="w-full h-auto block" />
          </div>
        ))}
      </div>

      {/* Right — info */}
      <div ref={contentRef} className="w-full lg:w-1/2" style={{ opacity: 0 }}>
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-3"
          style={{ background: "rgba(161,124,80,0.1)", color: "#8F5D28" }}
        >
          Step 04 — Manage Your Projects
        </span>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(24px, 2.6vw, 34px)",
            color: "#2C2822",
            lineHeight: 1.15,
          }}
          className="mb-3"
        >
          Your profile is project command central
        </h2>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#7A705F" }}>
          From your profile you can create projects, browse every design inside them, and
          jump straight into editing. Open a section below for the full breakdown.
        </p>

        <div className="flex flex-col gap-2.5">
          {accordionItems.map((item, i) => (
            <AccordionRow
              key={item.title}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step4;