"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_FRAME_COUNT = 40;

function getFramePath(basePath: string, index: number) {
  return `${basePath}/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

export function HeroFrameAnimation({
  basePath = "/animacoes",
  className,
  frameCount = DEFAULT_FRAME_COUNT,
  fps = 12,
  imageClassName,
  objectPosition = "center center",
}: {
  basePath?: string;
  className?: string;
  frameCount?: number;
  fps?: number;
  imageClassName?: string;
  objectPosition?: string;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const framePaths = useMemo(
    () => Array.from({ length: frameCount }, (_, index) => getFramePath(basePath, index)),
    [basePath, frameCount]
  );

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    let animationFrame = 0;
    let activeFrame = 0;
    let lastFrameAt = 0;
    const paths = framePaths;

    paths.forEach((src) => {
      const preload = new Image();
      preload.decoding = "async";
      preload.src = src;
    });

    const animateFrames = (time: number) => {
      if (time - lastFrameAt >= 1000 / fps) {
        activeFrame = (activeFrame + 1) % paths.length;
        image.src = paths[activeFrame];
        lastFrameAt = time;
      }

      animationFrame = window.requestAnimationFrame(animateFrames);
    };

    image.src = paths[0];
    const startAnimation = () => {
      animationFrame = window.requestAnimationFrame(animateFrames);
    };

    if (image.complete) {
      startAnimation();
    } else {
      image.addEventListener("load", startAnimation, { once: true });
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      image.removeEventListener("load", startAnimation);
    };
  }, [fps, framePaths]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ backgroundImage: `url(${framePaths[0]})` }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={framePaths[0]}
        alt=""
        className={cn("size-full object-cover", imageClassName)}
        style={{ objectPosition }}
        draggable={false}
      />
    </div>
  );
}
