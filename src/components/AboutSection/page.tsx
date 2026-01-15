"use client";

import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";
import RevealOnScroll from "@/components/RevealOnScroll";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const skills = [
  { name: "Colour Theory", level: 95 },
  { name: "Interior Design", level: 90 },
  { name: "Space Planning", level: 85 },
  { name: "Visual Merchandising", level: 88 },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-[#333333]">{name}</span>
        <span className="text-sm text-[#666666]">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#333333]/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF3333] to-[#FF6666] rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.215, 0.61, 0.355, 1] }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <RevealOnScroll>
        <div className="mb-16">
          <motion.span
            className="text-sm uppercase tracking-[0.3em] text-[#FF3333] font-medium mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-light text-[#333333] leading-[1.1]">
            Creating spaces that{" "}
            <span className="italic font-medium text-[#FF3333]">inspire</span>
          </h2>
        </div>
      </RevealOnScroll>

      <Separator className="mb-16 bg-[#FF3333]/20" />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left - Image with Parallax */}
        <RevealOnScroll direction="left">
          <motion.div
            ref={imageRef}
            className="relative"
            style={{ y: imageY }}
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-6 -left-6 w-32 h-32 bg-[#FF3333]/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#33CCFF]/10 rounded-full blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Main image container */}
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
              style={{ rotate: imageRotate }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3333]/20 to-transparent z-10" />
              <img
                src="/profile.webp"
                alt="Tanya Bardell-Young"
                className="w-full h-full object-cover"
              />

              {/* Floating badge */}
              <motion.div
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-sm font-medium text-[#333333]">
                  Colour Consultant
                </span>
              </motion.div>
            </motion.div>

            {/* Accent shape */}
            <motion.div
              className="absolute -z-10 top-8 -right-8 w-full h-full border-2 border-[#FF3333]/30 rounded-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            />
          </motion.div>
        </RevealOnScroll>

        {/* Right - Content */}
        <div className="space-y-12">
          <RevealOnScroll delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-light text-[#333333]">
                Tanya{" "}
                <span className="font-medium">Bardell-Young</span>
              </h3>
              <p className="text-lg font-light leading-relaxed text-[#666666]">
                I&apos;m a passionate colour consultant and interior designer with a
                keen eye for detail and a love for creating harmonious spaces. My
                approach combines artistic intuition with practical functionality.
              </p>
              <p className="text-lg font-light leading-relaxed text-[#666666]">
                With over a decade of experience in the industry, I bring a fresh
                perspective to every project. Whether you&apos;re looking to revamp
                a single room or transform your entire home, I&apos;m here to guide
                you through the process.
              </p>
            </div>
          </RevealOnScroll>

          {/* Stats */}
          <RevealOnScroll delay={0.3}>
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-[#333333]/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-light text-[#FF3333] mb-1">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-[#666666] uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Skills */}
          <RevealOnScroll delay={0.4}>
            <div>
              <h4 className="text-lg font-medium text-[#333333] mb-6">
                Expertise
              </h4>
              {skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </RevealOnScroll>

          {/* Quote */}
          <RevealOnScroll delay={0.5}>
            <blockquote className="relative pl-6 border-l-2 border-[#FF3333]">
              <p className="text-xl font-light italic text-[#333333]">
                &ldquo;Colour is a power which directly influences the soul.&rdquo;
              </p>
              <cite className="text-sm text-[#666666] mt-2 block not-italic">
                — Wassily Kandinsky
              </cite>
            </blockquote>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
