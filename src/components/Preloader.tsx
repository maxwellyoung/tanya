"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
  isMobile?: boolean;
}

export default function Preloader({ onComplete, isMobile = false }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Faster loading on mobile
  const loadTime = isMobile ? 1200 : 2500;
  const progressSpeed = isMobile ? 25 : 15;

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * progressSpeed;
      });
    }, 80);

    // Complete loading after animation
    const timeout = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, loadTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete, loadTime, progressSpeed]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#FFF5F5]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: isMobile ? 0.4 : 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Animated circles */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 mb-8 md:mb-12">
            <motion.div
              className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#FF3333]"
              style={{ mixBlendMode: "multiply" }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: [-15, 15, -15],
                y: [-8, 8, -8],
                scale: 1,
              }}
              transition={{
                scale: { duration: 0.4, ease: "easeOut" },
                x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#33CCFF]"
              style={{ mixBlendMode: "multiply", left: "30%" }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: [8, -12, 8],
                y: [12, -4, 12],
                scale: 1,
              }}
              transition={{
                scale: { duration: 0.4, ease: "easeOut", delay: 0.1 },
                x: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#FFCC33]"
              style={{ mixBlendMode: "multiply", left: "15%", top: "30%" }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: [-12, 20, -12],
                y: [-15, 4, -15],
                scale: 1,
              }}
              transition={{
                scale: { duration: 0.4, ease: "easeOut", delay: 0.2 },
                x: { duration: 1.9, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 2.3, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </div>

          {/* Brand text */}
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-4xl font-light text-[#333333] mb-2">
              Three Colours{" "}
              <span className="text-[#FF3333] font-medium">Red</span>
            </h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-40 md:w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-[2px] bg-[#333333]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF3333]"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <motion.p
              className="text-xs md:text-sm text-[#666666] text-center mt-3 md:mt-4 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
