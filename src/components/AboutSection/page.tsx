"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealOnScroll from "@/components/RevealOnScroll";

const services = [
  {
    title: "Colour Consulting",
    description: "Finding the perfect palette to transform your space and reflect your personality.",
  },
  {
    title: "Interior Design",
    description: "Creating harmonious, functional spaces that feel like home from day one.",
  },
  {
    title: "Visual Merchandising",
    description: "Curating displays that tell stories and inspire customers to imagine possibilities.",
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <RevealOnScroll>
        <div className="mb-12 md:mb-20">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#999999] mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About
          </motion.p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#333333] leading-tight">
            Creating spaces that feel<br />
            <span className="italic text-[#666666]">like home</span>
          </h2>
        </div>
      </RevealOnScroll>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left - Image */}
        <RevealOnScroll direction="left">
          <motion.div
            ref={imageRef}
            className="relative"
            style={{ y: imageY }}
          >
            {/* Main image container */}
            <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden">
              <img
                src="/profile.webp"
                alt="Tanya Bardell-Young"
                className="w-full h-full object-cover"
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Caption */}
            <motion.p
              className="mt-4 text-sm text-[#999999] text-center italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Auckland, New Zealand
            </motion.p>
          </motion.div>
        </RevealOnScroll>

        {/* Right - Content */}
        <div className="space-y-10 md:space-y-14 lg:pt-8">
          <RevealOnScroll delay={0.1}>
            <div className="space-y-5 md:space-y-6">
              <h3 className="text-2xl md:text-3xl font-light text-[#333333]">
                Hello, I&apos;m{" "}
                <span className="font-medium">Tanya</span>
              </h3>
              <p className="text-base md:text-lg font-light leading-relaxed text-[#666666]">
                I believe that colour has the power to transform not just spaces,
                but how we feel within them. With over a decade of experience in
                colour consulting and interior design, I help people discover
                palettes that truly resonate with their lives.
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed text-[#666666]">
                My approach is simple: listen deeply, observe carefully, and create
                thoughtfully. Every home has its own story, and I&apos;m here to help
                you tell yours through colour and design.
              </p>
            </div>
          </RevealOnScroll>

          {/* Services */}
          <RevealOnScroll delay={0.2}>
            <div className="space-y-6 md:space-y-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#999999]">
                What I do
              </p>
              <div className="space-y-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.title}
                    className="pb-6 border-b border-[#333333]/10 last:border-0 last:pb-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <h4 className="text-lg md:text-xl font-light text-[#333333] mb-2">
                      {service.title}
                    </h4>
                    <p className="text-sm md:text-base text-[#666666] font-light">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Quote */}
          <RevealOnScroll delay={0.3}>
            <blockquote className="relative pl-5 md:pl-6 border-l-2 border-[#FF3333]/40">
              <p className="text-lg md:text-xl font-light italic text-[#333333] leading-relaxed">
                &ldquo;Colour is a power which directly influences the soul.&rdquo;
              </p>
              <cite className="text-sm text-[#999999] mt-3 block not-italic">
                — Wassily Kandinsky
              </cite>
            </blockquote>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
