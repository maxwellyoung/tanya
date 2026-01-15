"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const inspirations = [
  {
    title: "Natural Light",
    description: "Spaces that breathe with the rhythm of daylight",
    colors: ["#F5E6D3", "#E8D5C4", "#D4C4B0", "#C7B299"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Warm Neutrals",
    description: "Timeless palettes that embrace and comfort",
    colors: ["#D4A574", "#C9A077", "#B8956F", "#A08060"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Organic Textures",
    description: "Materials that tell stories of craft and nature",
    colors: ["#8B7355", "#A0826D", "#6B5B4F", "#5C4D42"],
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80",
  },
];

const philosophy = [
  {
    number: "01",
    title: "Listen",
    text: "Every space has a story. I begin by understanding how you live, what brings you joy, and how colour can enhance your daily experience.",
  },
  {
    number: "02",
    title: "Curate",
    text: "Drawing from years of experience, I curate palettes that feel both fresh and timeless—colours that grow more beautiful with time.",
  },
  {
    number: "03",
    title: "Transform",
    text: "The right colours don't just decorate a room—they transform how it feels. I create spaces where you truly feel at home.",
  },
];

export default function Inspiration() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-40 bg-white overflow-hidden">
      {/* Philosophy Section */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 mb-24 md:mb-40">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#999999] mb-4 md:mb-6">
            The Approach
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#333333] leading-tight">
            Thoughtful design,<br />
            <span className="italic text-[#666666]">beautifully considered</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {philosophy.map((item, index) => (
            <motion.div
              key={item.number}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <span className="text-[#FF3333] text-sm font-medium tracking-wider mb-4 block">
                {item.number}
              </span>
              <h3 className="text-xl md:text-2xl font-light text-[#333333] mb-3 md:mb-4">
                {item.title}
              </h3>
              <p className="text-[#666666] font-light leading-relaxed text-sm md:text-base">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inspiration Gallery */}
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#999999] mb-4 md:mb-6">
            Inspiration
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#333333]">
            Mood & <span className="italic text-[#666666]">Palette</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {inspirations.map((item, index) => (
            <motion.div
              key={item.title}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] mb-5 md:mb-6 overflow-hidden rounded-lg md:rounded-xl">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Color swatches */}
              <div className="flex gap-2 mb-4">
                {item.colors.map((color, colorIndex) => (
                  <motion.div
                    key={color}
                    className="flex-1 h-8 md:h-10 rounded-md first:rounded-l-lg last:rounded-r-lg"
                    style={{ backgroundColor: color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + colorIndex * 0.05 }}
                  />
                ))}
              </div>

              {/* Text */}
              <h3 className="text-lg md:text-xl font-light text-[#333333] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-[#666666] font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quote/CTA */}
      <motion.div
        className="max-w-3xl mx-auto px-5 md:px-8 mt-24 md:mt-40 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <blockquote className="text-xl md:text-3xl lg:text-4xl font-light text-[#333333] leading-relaxed mb-8 md:mb-10">
          &ldquo;The best rooms have something to say about the people who live in them.&rdquo;
        </blockquote>
        <p className="text-[#999999] text-sm uppercase tracking-widest">
          — David Hicks
        </p>
      </motion.div>
    </section>
  );
}
