"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  splitBy?: "chars" | "words";
  animation?: "slide" | "fade" | "scale" | "blur";
  once?: boolean;
}

export default function AnimatedText({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  as: Component = "span",
  splitBy = "words",
  animation = "slide",
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const items = splitBy === "chars" ? children.split("") : children.split(" ");

  const getAnimation = () => {
    switch (animation) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(10px)" },
          visible: { opacity: 1, filter: "blur(0px)" },
        };
      case "slide":
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const variants = getAnimation();

  return (
    <Component ref={ref as any} className={className}>
      {items.map((item, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{
              duration,
              delay: delay + index * 0.03,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {item}
            {splitBy === "words" && index < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
