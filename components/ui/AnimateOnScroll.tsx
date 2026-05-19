"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === "up"    && { y: 40 }),
      ...(direction === "down"  && { y: -40 }),
      ...(direction === "left"  && { x: 40 }),
      ...(direction === "right" && { x: -40 }),
      ...(direction === "scale" && { scale: 0.88 }),
    },
    show: {
      opacity: 1,
      y: 0, x: 0, scale: 1,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
    },
  };

  return (
    <m.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </m.div>
  );
}
