import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { User, Image as ImageIcon, ShieldCheck, Plus } from "lucide-react";

const accordionItems = [
  {
    title: "Contact Information",
    icon: User,
    summary: "Two-column form for identity, company and location details.",
    details: [
      "Email — shown as read-only; it's the account identifier and can't be changed here.",
      "First Name & Last Name — editable text fields, saved as part of your display identity.",
      "Company — the organization you're associated with.",
      "Job Title — dropdown: Architect, Designer, Engineer, or Project Manager.",
      "Country — dropdown of supported countries (Pakistan, United States, United Kingdom, Canada).",
      "City & Zip/Postal Code — free-text location fields.",
      "Phone — contact number with a dedicated field.",
      "An \"Update\" button submits all contact fields together; a toast confirms success or failure.",
    ],
  },
  {
    title: "Profile Image",
    icon: ImageIcon,
    summary: "Live preview with drag-and-drop or click-to-browse upload.",
    details: [
      "Current photo is shown full-size at the top of the card, falling back to a default image if none is set.",
      "Drag a file anywhere onto the dashed drop-zone, or click it to open the file browser.",
      "Preview updates instantly using a local object URL, before the upload is confirmed.",
      "Only image files are accepted (accept=\"image/*\").",
      "A toast confirms the image was selected, even while server upload support is finalized.",
    ],
  },
  {
    title: "Account Security",
    icon: ShieldCheck,
    summary: "Change your password by confirming the current one.",
    details: [
      "Previous Password — required, verifies it's really you before changing anything.",
      "New Password — required, replaces the old password on submit.",
      "Both fields must be filled or the form blocks submission with an error toast.",
      "\"Update Password\" dispatches the change and clears both fields immediately after.",
      "Lives side-by-side with Profile Image under the \"Account\" tab.",
    ],
  },
  {
    title: "Navigation & Layout",
    icon: Plus,
    summary: "Two tabs — Contact Info and Account — inside one glass panel.",
    details: [
      "\"Contact Info\" tab shows the two-column contact form described above.",
      "\"Account\" tab splits into Profile Image (left) and Account Security (right) side by side on desktop.",
      "Switching tabs animates the panel with a quick fade-and-rise transition.",
      "A breadcrumb (Home › User Account › Profile Edit) sits above the tabs for orientation.",
      "The whole page loads your existing profile data automatically and pre-fills every field.",
    ],
  },
];

function AccordionRow({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const Icon = item.icon;

  useEffect(() => {
    if (!bodyRef.current) return;
    if (isOpen) {
      gsap.to(bodyRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
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
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3.5 text-left"
      >
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
          <p className="text-sm font-semibold" style={{ color: "#2C2822" }}>
            {item.title}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "#7A705F" }}>
            {item.summary}
          </p>
        </div>

        <Plus
          size={16}
          color="#A17C50"
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s",
            flexShrink: 0,
          }}
        />
      </button>

      <div ref={bodyRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        <ul
          className="px-3.5 pb-3.5 pl-[58px] flex flex-col gap-1.5"
          style={{ color: "#5C5344" }}
        >
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

const Step3 = () => {
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
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(161,124,80,0.2)",
            boxShadow: "0 20px 50px -20px rgba(161,124,80,0.35)",
          }}
        >
          <img
            src="howitworkssteps/profile-edit.png"
            alt="Profile edit page"
            className="w-full h-auto block"
          />
        </div>
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(161,124,80,0.2)",
            boxShadow: "0 20px 50px -20px rgba(161,124,80,0.35)",
          }}
        >
          <img
            src="howitworkssteps/password edit.png"
            alt="Account security password edit"
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* Right — info */}
      <div ref={contentRef} className="w-full lg:w-1/2" style={{ opacity: 0 }}>
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-3"
          style={{ background: "rgba(161,124,80,0.1)", color: "#8F5D28" }}
        >
          Step 03 — Manage Your Profile
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
          Keep your account details up to date
        </h2>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#7A705F" }}>
          Your profile page is split into two tabs — Contact Info and Account — so your
          details, photo, and password are always a click away. Open a section below for
          the full breakdown.
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

export default Step3;