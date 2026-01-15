"use client";

import { useState, useCallback } from "react";
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
}: {
  color: string;
  index: number;
  onCopy: (color: string) => void;
  copied: boolean;
}) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onClick={() => onCopy(color)}
    >
      <div
        className="w-full aspect-square rounded-2xl shadow-lg transition-shadow duration-300 group-hover:shadow-xl"
        style={{ backgroundColor: color }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      >
        {copied ? (
          <Check className="w-6 h-6 text-white" />
        ) : (
          <Copy className="w-5 h-5 text-white" />
        )}
      </motion.div>
      <p className="text-center mt-3 text-sm font-mono text-[#666666] group-hover:text-[#333333] transition-colors">
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
    }, 800);
  }, []);

  const filterByMood = useCallback((mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
    // Simple mood mapping
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

  return (
    <section className="w-full py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF5F5] rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-[#FF3333]" />
            <span className="text-sm font-medium text-[#FF3333]">Interactive</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-light text-[#333333] leading-[1.1] mb-6">
            Colour{" "}
            <span className="italic font-medium text-[#FF3333]">Lab</span>
          </h2>
          <p className="text-lg text-[#666666] font-light max-w-2xl mx-auto">
            Explore curated colour palettes for your space. Click any colour to copy
            its hex code.
          </p>
        </motion.div>

        {/* Mood Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {moods.map((mood) => (
            <MagneticButton key={mood} strength={0.15}>
              <button
                onClick={() => filterByMood(mood)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedMood === mood
                    ? "bg-[#FF3333] text-white"
                    : "bg-[#FFF5F5] text-[#666666] hover:bg-[#FF3333]/10 hover:text-[#FF3333]"
                }`}
              >
                {mood}
              </button>
            </MagneticButton>
          ))}
        </motion.div>

        {/* Color Display */}
        <motion.div
          className="bg-[#FFF5F5] rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Scheme Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={selectedScheme.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl md:text-3xl font-medium text-[#333333] mb-2"
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
                  className="text-[#666666]"
                >
                  {selectedScheme.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <MagneticButton strength={0.2}>
              <button
                onClick={generateRandomScheme}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-[#333333] font-medium disabled:opacity-70"
              >
                <motion.div
                  animate={isGenerating ? { rotate: 360 } : {}}
                  transition={{ duration: 0.8, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.div>
                <span>Surprise Me</span>
              </button>
            </MagneticButton>
          </div>

          {/* Color Swatches */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            <AnimatePresence mode="wait">
              {selectedScheme.colors.map((color, index) => (
                <ColorSwatch
                  key={`${selectedScheme.name}-${color}`}
                  color={color}
                  index={index}
                  onCopy={handleCopy}
                  copied={copiedColor === color}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Preview Bar */}
          <motion.div
            className="mt-10 h-16 rounded-2xl overflow-hidden flex shadow-inner"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {selectedScheme.colors.map((color, index) => (
              <motion.div
                key={`bar-${color}`}
                className="flex-1 h-full"
                style={{ backgroundColor: color }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Scheme Gallery */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-[#666666] uppercase tracking-wider mb-6 text-center">
            All Palettes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colorSchemes.map((scheme) => (
              <motion.button
                key={scheme.name}
                onClick={() => setSelectedScheme(scheme)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  selectedScheme.name === scheme.name
                    ? "bg-[#FF3333]/10 ring-2 ring-[#FF3333]"
                    : "bg-white hover:bg-[#FFF5F5]"
                }`}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-1 mb-2">
                  {scheme.colors.slice(0, 5).map((color) => (
                    <div
                      key={color}
                      className="flex-1 h-8 rounded-md"
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
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#666666] mb-6">
            Want a custom colour palette for your space?
          </p>
          <MagneticButton strength={0.2}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#333333] text-white rounded-full font-medium hover:bg-[#FF3333] transition-colors duration-300"
            >
              <Palette className="w-4 h-4" />
              <span>Book a Consultation</span>
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
