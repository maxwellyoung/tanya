"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, RefreshCw, Copy, Check, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface ColorScheme {
  name: string;
  colors: string[];
  description: string;
}

const colorSchemes: ColorScheme[] = [
  {
    name: "Warm Sunset",
    colors: ["#FF6B6B", "#FFA07A", "#FFD93D", "#C9E4DE", "#6BCB77"],
    description: "Energetic and inviting warmth",
  },
  {
    name: "Ocean Breeze",
    colors: ["#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8", "#023E8A"],
    description: "Calm and refreshing tranquility",
  },
  {
    name: "Forest Retreat",
    colors: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#B7E4C7"],
    description: "Natural and grounding serenity",
  },
  {
    name: "Blush Dreams",
    colors: ["#FF85A1", "#FBB1BD", "#F9DCC4", "#FEC89A", "#F8EDEB"],
    description: "Soft and romantic elegance",
  },
  {
    name: "Modern Minimal",
    colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C", "#D90429"],
    description: "Bold and sophisticated contrast",
  },
  {
    name: "Earth Tones",
    colors: ["#BC6C25", "#DDA15E", "#FEFAE0", "#606C38", "#283618"],
    description: "Warm and organic comfort",
  },
];

const moods = ["Energetic", "Calm", "Cozy", "Modern", "Natural", "Romantic"];

function ColorSwatch({
  color,
  index,
  onCopy,
  copied,
  isMobile,
}: {
  color: string;
  index: number;
  onCopy: (color: string) => void;
  copied: boolean;
  isMobile: boolean;
}) {
  const [showCopied, setShowCopied] = useState(false);

  const handleClick = () => {
    onCopy(color);
    if (isMobile) {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1500);
    }
  };

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={isMobile ? {} : { scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <div
        className="w-full aspect-square rounded-xl md:rounded-2xl shadow-lg active:shadow-md transition-shadow duration-200"
        style={{ backgroundColor: color }}
      />

      {/* Desktop hover overlay */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 rounded-xl md:rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300"
          initial={false}
          whileHover={{ opacity: 1 }}
        >
          {copied ? (
            <Check className="w-6 h-6 text-white" />
          ) : (
            <Copy className="w-5 h-5 text-white" />
          )}
        </motion.div>
      )}

      {/* Mobile tap feedback */}
      {isMobile && showCopied && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Check className="w-6 h-6 text-white" />
        </motion.div>
      )}

      <p className="text-center mt-2 md:mt-3 text-xs md:text-sm font-mono text-[#666666]">
        {color}
      </p>
    </motion.div>
  );
}

export default function ColorLab() {
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(colorSchemes[0]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || !window.matchMedia("(pointer: fine)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCopy = useCallback((color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  }, []);

  const generateRandomScheme = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * colorSchemes.length);
      setSelectedScheme(colorSchemes[randomIndex]);
      setIsGenerating(false);
    }, 600);
  }, []);

  const filterByMood = useCallback((mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
    const moodMap: Record<string, number> = {
      Energetic: 0,
      Calm: 1,
      Natural: 2,
      Romantic: 3,
      Modern: 4,
      Cozy: 5,
    };
    if (mood !== selectedMood && moodMap[mood] !== undefined) {
      setSelectedScheme(colorSchemes[moodMap[mood]]);
    }
  }, [selectedMood]);

  // Wrapper for buttons - uses MagneticButton on desktop only
  const ButtonWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isMobile) return <>{children}</>;
    return <MagneticButton strength={0.15}>{children}</MagneticButton>;
  };

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#FFF5F5] rounded-full mb-4 md:mb-6"
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF3333]" />
            <span className="text-xs md:text-sm font-medium text-[#FF3333]">Interactive</span>
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-light text-[#333333] leading-[1.1] mb-4 md:mb-6">
            Colour{" "}
            <span className="italic font-medium text-[#FF3333]">Lab</span>
          </h2>
          <p className="text-base md:text-lg text-[#666666] font-light max-w-2xl mx-auto px-4">
            Explore curated colour palettes for your space. Tap any colour to copy its hex code.
          </p>
        </motion.div>

        {/* Mood Filters - Scrollable on mobile */}
        <motion.div
          className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {moods.map((mood) => (
            <ButtonWrapper key={mood}>
              <button
                onClick={() => filterByMood(mood)}
                className={`flex-shrink-0 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 active:scale-95 ${
                  selectedMood === mood
                    ? "bg-[#FF3333] text-white"
                    : "bg-[#FFF5F5] text-[#666666] active:bg-[#FF3333]/20"
                }`}
              >
                {mood}
              </button>
            </ButtonWrapper>
          ))}
        </motion.div>

        {/* Color Display */}
        <motion.div
          className="bg-[#FFF5F5] rounded-2xl md:rounded-3xl p-5 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Scheme Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-10">
            <div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={selectedScheme.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl md:text-3xl font-medium text-[#333333] mb-1 md:mb-2"
                >
                  {selectedScheme.name}
                </motion.h3>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedScheme.description}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm md:text-base text-[#666666]"
                >
                  {selectedScheme.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <ButtonWrapper>
              <button
                onClick={generateRandomScheme}
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white rounded-full shadow-sm active:shadow-none active:scale-95 transition-all duration-200 text-[#333333] font-medium disabled:opacity-70 w-full md:w-auto"
              >
                <motion.div
                  animate={isGenerating ? { rotate: 360 } : {}}
                  transition={{ duration: 0.6, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.div>
                <span>Surprise Me</span>
              </button>
            </ButtonWrapper>
          </div>

          {/* Color Swatches */}
          <div className="grid grid-cols-5 gap-2 md:gap-6">
            <AnimatePresence mode="wait">
              {selectedScheme.colors.map((color, index) => (
                <ColorSwatch
                  key={`${selectedScheme.name}-${color}`}
                  color={color}
                  index={index}
                  onCopy={handleCopy}
                  copied={copiedColor === color}
                  isMobile={isMobile}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Preview Bar */}
          <motion.div
            className="mt-6 md:mt-10 h-10 md:h-16 rounded-xl md:rounded-2xl overflow-hidden flex shadow-inner"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {selectedScheme.colors.map((color, index) => (
              <motion.div
                key={`bar-${color}`}
                className="flex-1 h-full"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.08 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Scheme Gallery */}
        <motion.div
          className="mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs md:text-sm text-[#666666] uppercase tracking-wider mb-4 md:mb-6 text-center">
            All Palettes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {colorSchemes.map((scheme) => (
              <motion.button
                key={scheme.name}
                onClick={() => setSelectedScheme(scheme)}
                className={`p-2.5 md:p-3 rounded-lg md:rounded-xl transition-all duration-200 active:scale-95 ${
                  selectedScheme.name === scheme.name
                    ? "bg-[#FF3333]/10 ring-2 ring-[#FF3333]"
                    : "bg-white active:bg-[#FFF5F5]"
                }`}
                whileHover={isMobile ? {} : { y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-0.5 md:gap-1 mb-2">
                  {scheme.colors.slice(0, 5).map((color) => (
                    <div
                      key={color}
                      className="flex-1 h-6 md:h-8 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-xs font-medium text-[#333333] truncate">
                  {scheme.name}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm md:text-base text-[#666666] mb-4 md:mb-6">
            Want a custom colour palette for your space?
          </p>
          <ButtonWrapper>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#333333] text-white rounded-full font-medium active:bg-[#FF3333] md:hover:bg-[#FF3333] transition-colors duration-200 active:scale-95"
            >
              <Palette className="w-4 h-4" />
              <span>Book a Consultation</span>
            </a>
          </ButtonWrapper>
        </motion.div>
      </div>
    </section>
  );
}
