import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PanelsTopLeft, GripHorizontal, MessageSquareQuote, Plus } from "lucide-react";

const accordionItems = [
  {
    title: "Wall Panels",
    icon: PanelsTopLeft,
    summary: "Browse finishes and textures for every elevator interior wall.",
    details: [
      "A filterable gallery of wall panel finishes — brushed metal, laminate, stone-look, and painted textures — each shown on a full-height panel mockup.",
      "Hovering a swatch previews it at full scale so you can judge grain, sheen, and color before committing.",
      "Panels are tagged by category (Metal, Laminate, Wood-look, Stone-look) so you can narrow the gallery to a family of finishes.",
      "Selecting a panel carries it straight into your active design's material picker, no re-entering the configurator needed.",
      "Each swatch lists compatible trims and reveals so you can plan the whole cab, not just one surface.",
    ],
  },
  {
    title: "Handrails",
    icon: GripHorizontal,
    summary: "Compare handrail profiles and finishes side by side.",
    details: [
      "A row of handrail profiles — round, flat, and combination rail — rendered against a neutral backdrop for true-to-life comparison.",
      "Each profile is available in multiple finishes (satin stainless, bronze, black powder-coat) with a click-to-swap preview.",
      "Mounting style (wall-mounted vs. stand-off brackets) is called out under each option so it's clear what fits your cab layout.",
      "A \"Pairs well with\" note links each handrail to wall panels and floor finishes that complement it.",
      "Adding a handrail to your project updates the live 3D rendering immediately.",
    ],
  },
  {
    title: "Reviews & Renderings",
    icon: MessageSquareQuote,
    summary: "See finished projects and what other designers had to say.",
    details: [
      "A curated feed of completed cab renderings submitted by other users, each paired with the panel and handrail combination used.",
      "Star ratings and short written reviews highlight which finish combinations held up best in real installations.",
      "Filter reviews by building type — commercial, residential, hospitality — to find inspiration relevant to your project.",
      "A \"Save to Moodboard\" action lets you bookmark any rendering for later reference while you design.",
      "Verified badges mark reviews left by users with a completed, installed project on file.",
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

const Step5 = () => {
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
    { src: "getInspired/wallpanel.png", alt: "Wall panel finish gallery" },
    { src: "getInspired/handrail.png", alt: "Handrail profile options" },
    { src: "getInspired/review.png", alt: "Project reviews and renderings" },
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
          Step 05 — Get Inspired
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
          Explore finishes others have loved
        </h2>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#7A705F" }}>
          Browse wall panels, handrails, and real project reviews to spark ideas for
          your own design. Open a section below for the full breakdown.
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

export default Step5;