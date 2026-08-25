import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { User, Factory, Truck, Plus } from "lucide-react";

// Mirrors the account types from the Register component
const roleOptions = [
  {
    label: "End User",
    icon: User,
    summary: "Design & visualize your project in 3D before it's built.",
    details: [
      "Full access to the project configurator — pick wall panels, handrails, flooring, ceiling, and lighting, then preview it all in a live 3D rendering.",
      "At sign-up, choose a category — contractor, consultant, architect, developer, and more — so your dashboard surfaces projects and templates relevant to how you work.",
      "Save unlimited projects and sub-designs, and share any of them with a fabricator for quoting with a single link.",
      "Every saved version stays in your rendering history, so you can compare iterations or roll back to an earlier design.",
      "Invite collaborators to a project so multiple stakeholders can review the same 3D rendering before it's finalized.",
    ],
  },
  {
    label: "Fabricator",
    icon: Factory,
    summary: "Manufacture designs and manage production across projects.",
    details: [
      "Design specs — materials, dimensions, finishes — arrive directly from the End User's project, so nothing needs to be re-entered by hand.",
      "A production board tracks every job by status: Queued, In Fabrication, Quality Check, and Ready to Ship.",
      "Message the assigned End User directly from the project to confirm measurements or flag a substitution before production starts.",
      "Maintain a list of preferred suppliers per material type, so sourcing a specific finish is one click from the job.",
      "Generate a quote against the incoming spec and send it back to the End User for approval inside the same project thread.",
    ],
  },
  {
    label: "Supplier",
    icon: Truck,
    summary: "Supply materials and coordinate delivery with fabricators.",
    details: [
      "List available materials, panels, and hardware in a searchable catalog, each with pricing, lead time, and stock status.",
      "Get notified the moment a fabricator requests one of your materials for an active project.",
      "Track shipments and delivery confirmations tied to a specific project ID, so nothing gets lost between orders.",
      "Fabricators can filter your catalog by material type or finish, keeping your listings visible for the jobs they're actually sourcing.",
      "Update lead times and availability in real time so fabricators always quote against accurate numbers.",
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
          <p className="text-sm font-semibold" style={{ color: "#2C2822" }}>{item.label}</p>
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

const Step2 = () => {
  const imgRef = useRef(null);
  const contentRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  const images = [
    { src: "howitworkssteps/registerpage.png", alt: "Register page" },
    { src: "howitworkssteps/fabricator.png", alt: "Fabricator page" },
    { src: "howitworkssteps/supplier.png", alt: "Supplier page" },
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      imgRef.current,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    ).fromTo(
      contentRef.current,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
      "-=0.45"
    );
  }, []);

  return (
    <div
      className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-12 px-6 sm:px-10 lg:px-16 py-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;800&display=swap');
      `}</style>

      {/* Left — screenshots, stacked */}
      <div ref={imgRef} className="w-full lg:w-1/2 flex flex-col gap-4 lg:sticky lg:top-10 pt-10" style={{ opacity: 0 }}>
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
          Step 02 — Create an Account
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
          Sign up as the role that fits you
        </h2>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#7A705F" }}>
          Registration takes under a minute. Enter your email and choose one of three
          account types below, each unlocking a workspace tailored to how you work with
          elevator interiors. Open a section to see everything that role gets access to.
        </p>

        <div className="flex flex-col gap-2.5">
          {roleOptions.map((item, i) => (
            <AccordionRow
              key={item.label}
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

export default Step2;