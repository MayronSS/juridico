"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero video background with graceful fallback.
 *
 * Preferred sources (when available):
 *   /videos/hero-balanca.webm  → lighter, modern browsers
 *   /videos/hero-balanca.mp4   → broad compatibility
 *
 * Falls back to the legacy /mp_.mp4 automatically.
 *
 * TODO: Re-export the hero video in higher quality (1080 p, ≤ 4 MB)
 *       and place the files in public/videos/. Generate a poster
 *       frame at public/images/hero-poster.jpg.
 */
export function HeroVideoBackground() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCanPlay = useCallback(() => setIsLoaded(true), []);

  /* Static fallback for prefers-reduced-motion */
  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,#071421_0%,#102335_40%,#1a3350_100%)]"
      />
    );
  }

  return (
    <>
      {/* Fade-in once the video is ready to play */}
      <motion.video
        ref={videoRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg"
        onCanPlay={handleCanPlay}
      >
        {/* Prefer optimised sources when present */}
        <source src="/videos/hero-balanca.webm" type="video/webm" />
        <source src="/videos/hero-balanca.mp4" type="video/mp4" />
        {/* Legacy fallback */}
        <source src="/mp_.mp4" type="video/mp4" />
      </motion.video>

      {/* Solid colour shown while video loads, fades out smoothly */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,#071421_0%,#102335_40%,#1a3350_100%)]"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </>
  );
}
