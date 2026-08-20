import { useRef } from 'react';
import HeroContent from "./heroComponent/HeroContent";

export default function Hero() {
  const brandRef = useRef(null);

  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center overflow-hidden ">
      {/* Background Image */}
   <img src="/hero.png" alt="" className="absolute  w-full h-full pt-7 -z-10" />

      {/* Light Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-transparent -z-10 md:w-3/4 lg:w-2/3" />
      <div className="absolute inset-0 bg-black/10 -z-10" />

      {/* Center Left Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-24 md:pb-16 flex items-center">
        <div className="w-full lg:w-[60%] xl:w-[55%]">
          <HeroContent />
        </div>
      </div>

      {/* 📍 BOTTOM CENTERED STRIP - Fixed to viewport center-bottom */}
      <div
        ref={brandRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 w-full px-6 py-4  backdrop-blur-xs border-t border-[#573d0c]"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16 text-center font-mono">

          {/* 1. INSPIRATION */}
          <div className="relative group inline-flex items-center justify-center px-2 py-1">
            <div className="absolute inset-0 -z-10 bg-white/60 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-black tracking-[0.22em] text-sm sm:text-sm  text-[#8B6D35] drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
              INSPIRATION
            </span>
          </div>

          {/* 2. DESIGN */}
          <div className="relative group inline-flex items-center justify-center px-2 py-1">
            <div className="absolute inset-0 -z-10 bg-white/60 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-black tracking-[0.22em] text-sm sm:text-sm  text-gray-900 transition-colors duration-300 hover:text-[#8B6D35] drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
              DESIGN
            </span>
          </div>

          {/* 3. REALITY */}
          <div className="relative group inline-flex items-center justify-center px-2 py-1">
            <div className="absolute inset-0 -z-10 bg-white/60 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-black tracking-[0.22em] text-sm sm:text-sm  text-gray-900 transition-colors duration-300 hover:text-[#8B6D35] drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
              REALITY
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}