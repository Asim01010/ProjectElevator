import { useRef, useState } from 'react';
import { FaArrowRightLong, FaRegCirclePlay, FaXmark } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function HeroContent() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const arrowSvgRef = useRef(null);
  const videoRef = useRef(null);

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => {
    setIsVideoOpen(true);
    // Small delay so the video element is in the DOM before we call play()
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked by browser – user can still press play
        });
      }
    }, 50);
  };

  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsVideoOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col justify-center py-6 sm:py-10 text-left"
    >
      {/* Background Glow effects */}
      <div className="absolute -top-10 right-50 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-full bg-[#FFFFFF] rounded-full blur-[50px] sm:blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-full bg-[#FFFFFF] rounded-full blur-[40px] sm:blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-full bg-[#FFFFFF] rounded-full blur-[40px] sm:blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 -left-60 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-full bg-[#FFFFFF] rounded-full blur-[40px] sm:blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-full bg-[#FFFFFF] rounded-full blur-[40px] sm:blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-40 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-full bg-[#FFFFFF] rounded-full blur-[40px] sm:blur-[60px] pointer-events-none" />

      {/* Main Hero Card Content */}
      <div className="relative z-10 max-w-2xl">
        {/* Tag & Main Headline */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-block text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-black mb-3">
            The Elevator Design Platform
          </span>
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif font-normal tracking-tight text-gray-900 leading-[1.15]"
          >
            Design Elevator Interiors That <br className="hidden sm:block" />
            <span className="font-sans text-[#8B6D35] italic font-semibold">
              Inspire Every Ride
            </span>
          </h1>
        </div>

        {/* Subtext Description */}
        <p
          ref={subtextRef}
          className="text-gray-700 font-normal text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-sm"
        >
          Beautiful spaces begin with inspiration. No experience required.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-4">
       <Link to="/login">
          <button
            ref={primaryBtnRef}
            className="
              group
              relative
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-sm
              bg-gradient-to-b
              from-[#C79A63]
              via-[#A67C52]
              to-[#7F5A34]
              px-6
              sm:px-8
              py-3.5
              sm:py-4.5
              text-xs
              sm:text-[13px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-white
              shadow-[0_12px_28px_rgba(95,65,30,0.35),inset_0_2px_2px_rgba(255,255,255,.45),inset_0_-3px_4px_rgba(0,0,0,.25)]
              transition-shadow
              duration-300
              hover:shadow-[0_18px_35px_rgba(95,65,30,0.45),inset_0_2px_2px_rgba(255,255,255,.55)]
              cursor-pointer
            "
          >
            <span className="whitespace-nowrap">Get Inspired</span>
            <span ref={arrowSvgRef} className="inline-block transition-transform duration-200">
              <FaArrowRightLong />
            </span>
          </button>
</Link>
          <button
            ref={secondaryBtnRef}
            onClick={openVideo}
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-3
              rounded-sm
              bg-white/40
              backdrop-blur-md
              border
              border-white/50
              px-6
              sm:px-7
              py-3.5
              sm:py-4
              text-xs
              sm:text-[13px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-gray-900
              shadow-md
              transition-all
              duration-300
              hover:bg-white
              hover:shadow-lg
              cursor-pointer
            "
          >
            <FaRegCirclePlay className="text-lg sm:text-xl text-[#8B6D35]" />
            <span className="whitespace-nowrap">Watch Demo</span>
          </button>
        </div>
      </div>

      {/* Video Overlay / Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          {/* Close button */}
          <button
            onClick={closeVideo}
            className="absolute top-24 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
            aria-label="Close video"
          >
            <FaXmark className="text-xl" />
          </button>

          {/* Video player */}
          <div className="relative w-full max-w-5xl aspect-video">
            <video
              ref={videoRef}
              src="/ProjectVideo.mp4"
              controls
              playsInline
              className="w-full h-full rounded-lg shadow-2xl bg-black"
              // All native controls (play, pause, volume, timeline, fullscreen, settings) are available
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}