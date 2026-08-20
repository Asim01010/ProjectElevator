import React, { createContext, useState, useCallback, useMemo, useRef, useEffect } from "react";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { gsap } from "gsap";

export const ToastContext = createContext(null);

const ToastItem = ({ t, removeToast }) => {
  const toastRef = useRef(null);
  const progressBarRef = useRef(null);

  // Function to handle reverse animation (sliding back out left)
  const handleDismiss = useCallback(() => {
    if (!toastRef.current) return;

    // GSAP EXIT: Slide back out to the Left (-120%) & Fade out to Opacity 0
    gsap.to(toastRef.current, {
      xPercent: -120,
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => removeToast(t.id), // Only unmount from state AFTER animation completes!
    });
  }, [removeToast, t.id]);

  useEffect(() => {
    // 1. GSAP ENTRANCE: Off-screen Left (-120%) -> Slide In to 0%
    gsap.fromTo(
      toastRef.current,
      { xPercent: -120, opacity: 0 },
      { 
        xPercent: 0, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power3.out" 
      }
    );

    // 2. Progress Bar Animation
    if (t.duration && progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { width: "100%" },
        { width: "0%", duration: t.duration / 1000, ease: "linear" }
      );
    }

    // 3. Auto-Dismiss: Trigger the exit animation when the timer finishes
    let timer;
    if (t.duration) {
      timer = setTimeout(() => {
        handleDismiss();
      }, t.duration);
    }

    return () => clearTimeout(timer);
  }, [t.duration, handleDismiss]);

  return (
    <div
      ref={toastRef}
      className="relative overflow-hidden flex items-center justify-between gap-4 p-2 text-white border border-white/20 shadow-2xl backdrop-blur-xl group my-1"
      style={{
        background: "linear-gradient(135deg, #C79A63 0%, #A67C52 50%, #7F5A34 100%)",
        boxShadow: "0 20px 40px -15px rgba(127, 90, 52, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        willChange: "transform, opacity",
      }}
    >
      {/* Icon & Text */}
      <div className="flex items-center gap-3.5 z-10">
        <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-inner">
          {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />}
          {t.type === "error" && <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />}
          {t.type === "info" && <Info className="w-5 h-5 text-amber-200 shrink-0" />}
        </div>
        
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-white/95 leading-snug">
          {t.message}
        </p>
      </div>

      {/* Manual Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="text-white/70 hover:text-white transition-all duration-200 p-1.5 rounded-lg hover:bg-white/15 shrink-0 z-10"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar Line */}
      {t.duration && (
        <div
          ref={progressBarRef}
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-white/80 via-amber-200 to-white/40 rounded-full"
        />
      )}

      {/* Ambient Back Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const toast = useMemo(
    () => ({
      success: (msg, duration) => addToast(msg, "success", duration),
      error: (msg, duration) => addToast(msg, "error", duration),
      info: (msg, duration) => addToast(msg, "info", duration),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div
        className="fixed bottom-6 left-6 z-[999999] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0 overflow-hidden p-2"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem t={t} removeToast={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};