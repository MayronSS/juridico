"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const premiumEase = [0.22, 1, 0.36, 1] as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.65,
  y = 18,
  trigger = "view",
  amount = 0.22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  trigger?: "load" | "view";
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const motionProps =
    trigger === "load"
      ? {
          animate: { opacity: 1, y: 0 },
        }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount },
        };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration, delay, ease: premiumEase }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  trigger = "view",
  amount = 0.18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "load" | "view";
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const motionProps =
    trigger === "load"
      ? {
          animate: "show",
        }
      : {
          whileInView: "show",
          viewport: { once: true, amount },
        };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: premiumEase },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, delay, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString("pt-BR")
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    motionValue.set(0);
    const controls = animate(motionValue, value, {
      duration: 0.9,
      ease: premiumEase,
    });
    const unsubscribe = rounded.on("change", setDisplay);

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, reduceMotion, rounded, value]);

  return (
    <span className={cn("tabular-nums", className)}>
      {reduceMotion ? value.toLocaleString("pt-BR") : display}
    </span>
  );
}
