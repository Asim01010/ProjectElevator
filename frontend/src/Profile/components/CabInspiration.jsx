import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Pencil,
  Lightbulb,
  Grid,
  Shield,
  Layers,
  FileText,
  Heart,
  Box,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { BsBagCheck } from "react-icons/bs";
import { GiMaterialsScience } from "react-icons/gi";
import { IoStorefrontSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { GiStraightPipe } from "react-icons/gi";
import { TbDeviceAirpodsCase } from "react-icons/tb";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { SiPerforce } from "react-icons/si";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { SiMaterialdesignicons } from "react-icons/si";
import { SiCssdesignawards } from "react-icons/si";
import { FaRegLightbulb } from "react-icons/fa";
import { FaDribbbleSquare } from "react-icons/fa";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { RiVoiceRecognitionFill } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import { PiBuildingOffice } from "react-icons/pi";
import { TbScreenShare } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CabInspiration = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("ALL STYLES");

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  // ✅ Each entry now has its own icon + unique copy instead of repeating the same title/desc
  const customDesigns = [
    {
      icon: <SiCssdesignawards className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
      title: "Bespoke Concepts",
      desc: "Original layouts built around your brand, not a template.",
    },
    {
      icon: <SiMaterialdesignicons className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
      title: "Material Matching",
      desc: "Real finishes sourced to match your palette exactly.",
    },
    {
      icon: <MdOutlineWorkspacePremium className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
      title: "Premium Detailing",
      desc: "Hardware and trim selected for a refined final look.",
    },
    {
      icon: <SiPerforce className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
      title: "Code Compliance",
      desc: "Every concept checked against local elevator codes.",
    },
    {
      icon: <AiOutlineDeliveredProcedure className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
      title: "Fast Turnaround",
      desc: "Custom renderings delivered in days, not weeks.",
    },
  ];

  // Features Data
  const features = [
    { icon: <Pencil className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Wall Panels" },
    { icon: <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Lighting" },
    { icon: <Grid className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Ceiling Design" },
    { icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Flooring" },
    { icon: <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Panel Layout" },
    { icon: <GiStraightPipe className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Handrails" },
    { icon: <CiGrid41 className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Bumper Pods" },
    { icon: <TbDeviceAirpodsCase className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Car Pods" },
    { icon: <MdOutlineDashboardCustomize className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />, title: "Custom Graphics" },
  ];

  // ✅ Unique title + description per MEDS card instead of the same copy repeated six times
  // const meds = [
  //   {
  //     icon: <FaRegLightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
  //     title: "Real-Time Preview",
  //     desc: "See every material swap update your cab instantly.",
  //   },
  //   {
  //     icon: <FaDribbbleSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
  //     title: "Designer-Led Palettes",
  //     desc: "Curated combinations that always look cohesive.",
  //   },
  //   {
  //     icon: <HiMiniPencilSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
  //     title: "Editable Anytime",
  //     desc: "Revisit and adjust your design before you order.",
  //   },
  //   {
  //     icon: <RiVoiceRecognitionFill className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
  //     title: "Guided Support",
  //     desc: "Our team reviews your concept before production.",
  //   },
  //   {
  //     icon: <TbScreenShare className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
  //     title: "Shareable Designs",
  //     desc: "Send a link so stakeholders can review and approve.",
  //   },
  //   {
  //     icon: <PiBuildingOffice className="w-8 h-8 sm:w-10 sm:h-10 text-[#8C6239]" />,
  //     title: "Built for Any Building",
  //     desc: "Concepts scale from single lobbies to full portfolios.",
  //   },
  // ];

  // Category Filter Pills
  const categories = ["ALL STYLES", "INDUSTRIAL", "HEALTHCARE", "HOSPITALITY", "CORPORATE"];

  // Elevator Concepts Cards Data
  const concepts = [
    { id: 1, title: "Natural Harmony", desc: "Warm wood tones with refined metal accents.", image: "Cab Inspiration/1.png" },
    { id: 2, title: "Brushed Elegance", desc: "Sleek stainless finish for a modern, professional feel.", image: "Cab Inspiration/2.png" },
    { id: 3, title: "Timeless Marble", desc: "Bright, elegant and timeless design that stands out.", image: "Cab Inspiration/3.png" },
    { id: 4, title: "Industrial Edge", desc: "Concrete textures with dark metal details.", image: "Cab Inspiration/4.png" },
    { id: 5, title: "Modern Bronze", desc: "Rich bronze tones that create a bold statement.", image: "Cab Inspiration/5.png" },
  ];

// Get Inspired
const getInspired = [
  // { image: "howitworkssteps/getispired.png", title: "Step 1: Get Inspired", path: "/step1" },
  { image: "getInspired/configuration.png", title: "Step 1: Models Selection" },
  { image: "getInspired/wallpanel.png", title: "Step 2: Wall Panels" },
  { image: "getInspired/handrail.png", title: "Step 4: Handrails and Bumpers" },
  { image: "getInspired/ceiling_floor.png", title: "Step 3: Ceilings and Floors" },
  { image: "getInspired/review.png", title: "Step 5: Review & Approve" },
];

  // Stat Highlights
  const statHighlights = [
    { icon: <BsBagCheck className="text-[#8C6239] text-lg shrink-0" />, number: "600+", label: "professionally designed elevators" },
    { icon: <GiMaterialsScience className="text-[#8C6239] text-lg shrink-0" />, number: "Thousands", label: "of material combinations" },
    { icon: <FiShare2 className="text-[#8C6239] text-lg shrink-0" />, number: "Unlimited", label: "custom configurations" },
    { icon: <IoStorefrontSharp className="text-[#8C6239] text-lg shrink-0" />, number: "Compatible", label: "with all standard cabs" },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen text-[#2C2822] py-4 px-3 sm:px-6 lg:px-10"
      style={{ backgroundColor: "#FBF9F5", fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>

      {/* ----------------- SECTION 1: HERO HEADER ----------------- */}
      <div className="w-full bg-[#FAF8F5] rounded-b-sm overflow-hidden mt-12 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left Side: Content */}
          <div className="p-5 sm:p-8 lg:p-10 gap-5 flex flex-col justify-center">
            <div className="pl-3 sm:pl-5 border-l-2 border-[#A17C50] mb-4">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6239] mb-1.5">
                Cab Inspiration
              </p>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#2C2822] flex flex-col flex-wrap gap-x-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span>Discover.</span>
                <span>Customize.</span>
                <span className="text-[#7F5A34]">Create.</span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#5C5446] font-medium mb-4 leading-relaxed max-w-xl">
              Explore professionally designed elevator interiors or start with a blank canvas and build something completely your own.
            </p>

            {/* Stats Highlights Grid */}
            <div className="grid grid-cols-2 sm:flex  gap-x-4 gap-y-3 mb-4">
              {statHighlights.map((stat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {stat.icon}
                  <div className="flex flex-col text-xs text-[#2C2822] font-medium">
                    <span className="font-bold text-sm text-[#2C2822]">{stat.number}</span>
                    <span className="capitalize text-[#6B6355] leading-snug">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="
                  group relative inline-flex items-center gap-2 rounded-sm
                  bg-gradient-to-b from-[#C79A63] via-[#A67C52] to-[#7F5A34]
                  px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white
                  shadow-[0_10px_25px_rgba(95,65,30,0.25)]
                  transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(95,65,30,0.35)]
                  active:translate-y-0
                "
              >
                Start Designing
              </button>

              <button
                className="
                  inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold
                  uppercase tracking-[0.15em] text-[#7F5A34] hover:text-[#5C4124] transition-colors hover:bg-[#EADBCE] hover:rounded-sm cursor-pointer
                "
              >
                Log In <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Right Side: Image Container */}
          <div className="h-56 sm:h-64 lg:h-full w-full relative overflow-hidden bg-[#F4EFEA]">
            <img
              src="Cab Inspiration/heroinspired.png"
              alt="Cab Inspiration Preview"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 2: TOP FEATURES BAR ----------------- */}
      <div className="w-full max-w-7xl mx-auto mb-4">
        <h2 className="text-sm font-bold text-[#2C2822] font-bold mb-3 text-center uppercase tracking-wider">
          What can you customize?
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-0">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center gap-2 sm:border-r-2 sm:border-r-[#E6E0D6] last:border-r-0 p-2 sm:p-3"
            >
              <div className="p-2 bg-[#FBF9F5] text-[#8C6239] shrink-0">{feat.icon}</div>
              <p className="text-[10px] font-bold tracking-wider text-[#2C2822] uppercase leading-snug">
                {feat.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------- SECTION 3: EXPLORE FILTER HEADER ----------------- */}
      <div className="max-w-7xl mx-auto mb-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest font-bold text-[#2C2822] mb-1">
          EXPLORE STANDARD CONCEPTS
        </p>
        <p className="text-xs text-[#7A705F] mb-3">
          Browse professionally designed elevator interiors to inspire your project.
        </p>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E6E0D6] pb-3">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-[#8C6239] text-white shadow-sm"
                  : "text-[#6B6355] hover:bg-[#EADBCE]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ----------------- SECTION 4: CONCEPTS GRID ----------------- */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
        {concepts.map((concept) => (
          <div
            key={concept.id}
            className="bg-white border border-[#E6E0D6] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
          >
            <div className="bg-[#F3ECE0] h-32 sm:h-44 overflow-hidden relative">
              <img
                src={concept.image}
                alt={concept.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-2.5 sm:p-3.5 bg-white flex justify-between items-start gap-2">
              <div>
                <h3 className="text-xs font-bold text-[#2C2822] mb-1">{concept.title}</h3>
                <p className="text-[10px] text-[#7A705F] leading-snug">{concept.desc}</p>
              </div>
              <button
                aria-label="Save concept"
                className="text-[#A17C50] hover:text-[#8C6239] transition-colors pt-0.5 shrink-0"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

         {/* ----------------- SECTION 5: Ruling images ----------------- */}
          <div className="max-w-7xl mx-auto mt-10 mb-2 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {getInspired.map((step, idx) => (
    <div key={idx} className="flex flex-col items-center">
      <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-[#F3ECE0]">
        <img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover transition-opacity hover:opacity-90 cursor-pointer"
        />
      </div>
      <p className="text-[20px] font-semibold text-[#2C2822] mt-2">
        {step.title}
      </p>
    </div>
  ))}
</div>

      {/* SECTION Create a Custom Design */}
      <div className="w-full max-w-7xl mx-auto mb-4">
        <div className="bg-[#FAF8F5] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-stretch">
            {/* Left Column: Content & Steps */}
            <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-[#FAF8F5] to-[#F5EFE6]">
              <div>
                <h1
                  className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-[#2C2822] leading-tight mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Don't see exactly what you're looking for?
                </h1>

                <p className="text-xs sm:text-sm text-[#6B6355] leading-relaxed mb-5">
                  Upload your inspiration, photos, or rough sketches. Our expert design team will bring your unique vision to life with a full custom 3D concept.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-5">
                  {customDesigns.map((design, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center text-center p-2.5 rounded-lg transition-all hover:bg-white/60"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#F3ECE0] flex items-center justify-center text-[#8C6239] mb-1.5 shrink-0">
                        {design.icon}
                      </div>
                      <h3 className="text-[10px] font-bold text-[#2C2822] leading-tight mb-1">
                        {design.title}
                      </h3>
                      <p className="text-[9px] text-[#7A705F] leading-snug">{design.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="
                  w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl
                  bg-gradient-to-b from-[#C79A63] via-[#A67C52] to-[#7F5A34]
                  px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white
                  shadow-[0_10px_25px_rgba(95,65,30,0.25)]
                  transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(95,65,30,0.35)]
                  active:translate-y-0
                "
              >
                Create a Custom Design
              </button>
            </div>

            {/* Right Column: Visual Preview */}
            <div className="lg:col-span-7 bg-[#EFE9DF] relative overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-full flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#C79A63]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 w-full h-full max-h-[380px] rounded-2xl overflow-hidden border border-white/60 shadow-[0_20px_40px_rgba(44,40,34,0.12)] bg-white">
                <img
                  src="Cab Inspiration/createdCustomDesign.png"
                  alt="Custom 3D Interior Concept"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section MEDS */}
      {/* <div className="max-w-7xl mx-auto mb-4">
        <p className="uppercase  font-bold tracking-widest text-black mb-3 text-center">
          Why designs with MEDS?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 ">
          {meds.map((med, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-2 p-3 border-e *:border-[#E6E0D6] last:border-r-0">
              <div className="w-9 h-9 rounded-lg bg-[#F3ECE0] flex items-center justify-center text-[#8C6239] shrink-0">
                {med.icon}
              </div>
              <h3 className="text-[11px] font-bold text-[#2C2822]">{med.title}</h3>
              <p className="text-[10px] text-[#7A705F] leading-snug">{med.desc}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Section Black */}
      <div className="w-full max-w-7xl mx-auto mb-4 bg-black rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-12">
          <div className="hidden sm:block sm:col-span-3">
            <img
              src="Cab Inspiration/createblackdesign.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="sm:col-span-9 flex flex-col items-center justify-center gap-2 text-center py-8 px-4">
            <h1 className="text-white text-xl sm:text-2xl">Ready to design your elevator?</h1>
            <span className="text-white text-sm sm:text-base">Join thousands of possibilities.</span>
            <button
              className="
                mt-2 group relative inline-flex items-center gap-2 rounded-sm
                bg-gradient-to-b from-[#C79A63] via-[#A67C52] to-[#7F5A34]
                px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white
                shadow-[0_10px_25px_rgba(95,65,30,0.25)]
                transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(95,65,30,0.35)]
                active:translate-y-0
              "
            >
              Start Designing
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="w-full bg-[#FAF8F5] text-[#2C2822] border-t border-[#E6E0D6] pt-10 pb-8 px-3 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-8 mb-6">
            {/* 1. Logo, Detail & Social Icons */}
            <div className="flex-1 min-w-[220px] max-w-sm flex flex-col gap-3">
              <Link to="/"><img src="logo/logo.png" className="w-[85%] h-full" alt="" /></Link>

              <p className="text-xs text-[#7A705F] leading-relaxed">
                Transforming elevator spaces with our interactive 3D studio. High-end materials, custom configurations, and real-time visualization.
              </p>

              <div className="flex items-center gap-2.5 mt-1">
                {[
                  { icon: <FaFacebookF className="w-3.5 h-3.5" />, href: "#" },
                  { icon: <FaTwitter className="w-3.5 h-3.5" />, href: "#" },
                  { icon: <FaInstagram className="w-3.5 h-3.5" />, href: "#" },
                  { icon: <FaLinkedinIn className="w-3.5 h-3.5" />, href: "#" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="w-8 h-8 rounded-full bg-white border border-[#E6E0D6] flex items-center justify-center text-[#8C6239] hover:bg-[#8C6239] hover:text-white hover:border-[#8C6239] transition-all duration-300 shadow-sm"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* 2. Platform Links */}
            <div className="flex-1 min-w-[140px] flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2C2822]">Platform</h3>
              <ul className="flex flex-col gap-2 text-xs text-[#7A705F]">
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">3D Studio Configurator</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Material Library</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Lighting & Ceilings</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Panels & Layouts</a></li>
              </ul>
            </div>

            {/* 3. Resources Links */}
            <div className="flex-1 min-w-[140px] flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2C2822]">Resources</h3>
              <ul className="flex flex-col gap-2 text-xs text-[#7A705F]">
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Design Gallery</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">3D Renderings</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Case Studies</a></li>
              </ul>
            </div>

            {/* 4. Company Links */}
            <div className="flex-1 min-w-[140px] flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2C2822]">Company</h3>
              <ul className="flex flex-col gap-2 text-xs text-[#7A705F]">
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#8C6239] transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* 5. Newsletter Input */}
            <div className="flex-1 min-w-[240px] max-w-sm flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2C2822]">Newsletter</h3>
              <p className="text-xs text-[#7A705F] leading-relaxed">
                Subscribe to get the latest 3D design trends, product updates, and interior releases.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col  gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D6]  text-xs text-[#2C2822] placeholder:text-[#A89F91] focus:outline-none focus:border-[#8C6239] transition-colors shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#8C6239] text-white px-4 py-2.5  text-xs font-bold hover:bg-[#7A542F] transition-colors flex items-center justify-center gap-1 shrink-0 shadow-sm"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar / Copyright */}
          <div className="border-t border-[#E6E0D6] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A89F91]">
            <p>© {new Date().getFullYear()} Project Elevator. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-[#8C6239] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#8C6239] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#8C6239] transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CabInspiration;