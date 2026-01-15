"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorState {
  variant: "default" | "hover" | "text" | "click" | "hidden";
  text?: string;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: "default",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasFinPointer, setHasFinPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Check for fine pointer on mount
  useEffect(() => {
    setIsMounted(true);
    setHasFinPointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isMounted || !hasFinPointer) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for data attributes
      if (target.closest("[data-cursor-hover]")) {
        setCursorState({ variant: "hover" });
        return;
      }

      if (target.closest("[data-cursor-text]")) {
        const text =
          target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "";
        setCursorState({ variant: "text", text });
        return;
      }

      // Check for interactive elements
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setCursorState({ variant: "hover" });
        return;
      }

      setCursorState({ variant: "default" });
    };

    const handleMouseDown = () => {
      if (cursorState.variant !== "hidden") {
        setCursorState((prev) => ({ ...prev, variant: "click" }));
      }
    };

    const handleMouseUp = () => {
      if (cursorState.variant === "click") {
        setCursorState({ variant: "default" });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, cursorState.variant, isVisible, isMounted, hasFinPointer]);

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "rgba(255, 51, 51, 0.5)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(255, 51, 51, 0.3)",
      mixBlendMode: "difference" as const,
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(255, 51, 51, 0.9)",
      mixBlendMode: "normal" as const,
    },
    click: {
      width: 15,
      height: 15,
      backgroundColor: "rgba(255, 51, 51, 0.8)",
      mixBlendMode: "difference" as const,
    },
    hidden: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      mixBlendMode: "normal" as const,
    },
  };

  // Don't render on touch devices or before mount
  if (!isMounted || !hasFinPointer) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={cursorState.variant}
        variants={variants}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {cursorState.variant === "text" && cursorState.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-xs font-medium uppercase tracking-wider"
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-[#FF3333] rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && cursorState.variant !== "hidden" ? 1 : 0,
          scale: cursorState.variant === "click" ? 0.5 : 1,
        }}
      />

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
