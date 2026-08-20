import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { PiBagSimpleLight } from "react-icons/pi";

// Mirrors the account types from the Register component
const roleOptions = [
  {
    label: "End User",
    desc: "Design & visualize your project in 3D before it's built.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    ),
  },
  {
    label: "Fabricator",
    desc: "Manufacture designs and manage production across projects.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
    ),
  },
  {
    label: "Supplier",
    desc: "Supply materials and coordinate delivery with fabricators.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h-5.25l-2.25 4.5m7.5-4.5v4.5m-7.5 0h7.5m-7.5 0l-2.25 4.5m2.25-4.5v4.5m0 0h4.5" />
    ),
  },
];

const Step2 = () => {
  const imgRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

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

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: "power2.out", delay: 0.35 }
    );
  }, []);

  return (
    <div
      className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-6 sm:px-10 lg:px-16 py-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;800&display=swap');
      `}</style>

      {/* Left — screenshot */}
      <div ref={imgRef} className="w-full lg:w-1/2 flex justify-center" style={{ opacity: 0 }}>
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(161,124,80,0.2)",
            boxShadow: "0 20px 50px -20px rgba(161,124,80,0.35)",
          }}
        >
          <img
            src="howitworkssteps/registerpage.png"
            alt="Register page"
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
          elevator interiors.
        </p>

        <div className="flex flex-col gap-3">
          {roleOptions.map((r, i) => (
            <div
              key={r.label}
              ref={(el) => (cardsRef.current[i] = el)}
              className="flex items-start gap-3 p-3.5 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(161,124,80,0.18)",
              }}
            >
              <span
                className="flex items-center justify-center rounded-md shrink-0"
                style={{ width: 34, height: 34, background: "rgba(161,124,80,0.1)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  stroke="#A17C50"
                  className="w-4.5 h-4.5"
                >
                  {r.icon}
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#2C2822" }}>
                  {r.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#7A705F" }}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs mt-5 flex items-center gap-1.5" style={{ color: "#8F5D28" }}>
          <PiBagSimpleLight className="text-sm" />
          End Users can also pick a category — contractor, consultant, architect and more —
          right from the sign-up form.
        </p>
      </div>
    </div>
  );
};

export default Step2;