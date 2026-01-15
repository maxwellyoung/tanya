"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  type?: "words" | "chars" | "lines";
  once?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.03,
  type = "words",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const splitText = () => {
    if (type === "chars") {
      return children.split("");
    }
    if (type === "lines") {
      return children.split("\n");
    }
    return children.split(" ");
  };

  const items = splitText();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const item: { hidden: Variant; visible: Variant } = {
    hidden: {
      y: 50,
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
      style={{ perspective: 1000 }}
    >
      {items.map((text, index) => (
        <motion.span
          key={index}
          variants={item}
          className="inline-block"
          style={{ transformOrigin: "top" }}
        >
          {text}
          {type === "words" && index < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.div>
  );
}
