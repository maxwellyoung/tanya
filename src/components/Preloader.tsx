"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Complete loading after animation
    const timeout = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#FFF5F5]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Animated circles */}
          <div className="relative w-48 h-48 mb-12">
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-[#FF3333]"
              style={{ mixBlendMode: "multiply" }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: [-20, 20, -20],
                y: [-10, 10, -10],
                scale: 1,
              }}
              transition={{
                scale: { duration: 0.5, ease: "easeOut" },
                x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-[#33CCFF]"
              style={{ mixBlendMode: "multiply", left: "30%" }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: [10, -15, 10],
                y: [15, -5, 15],
                scale: 1,
              }}
              transition={{
                scale: { duration: 0.5, ease: "easeOut", delay: 0.1 },
                x: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-[#FFCC33]"
              style={{ mixBlendMode: "multiply", left: "15%", top: "30%" }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: [-15, 25, -15],
                y: [-20, 5, -20],
                scale: 1,
              }}
              transition={{
                scale: { duration: 0.5, ease: "easeOut", delay: 0.2 },
                x: { duration: 1.9, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 2.3, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          </div>

          {/* Brand text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-light text-[#333333] mb-2">
              Three Colours{" "}
              <span className="text-[#FF3333] font-medium">Red</span>
            </h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-[2px] bg-[#333333]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF3333]"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.p
              className="text-sm text-[#666666] text-center mt-4 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
