"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButton from "@/components/MagneticButton";
import RevealOnScroll from "@/components/RevealOnScroll";

// Dynamic imports for heavy components
const ContactForm = dynamic(() => import("@/components/ContactForm/page"), {
  ssr: false,
});
const WorkSection = dynamic(() => import("@/components/WorkSection/page"), {
  ssr: false,
});
const AboutSection = dynamic(() => import("@/components/AboutSection/page"), {
  ssr: false,
});
const ColorBlob = dynamic(() => import("@/components/ColorBlob"), {
  ssr: false,
});
const ColorLab = dynamic(() => import("@/components/ColorLab"), {
  ssr: false,
});

// Animated nav link
function NavLink({
  section,
  activeSection,
  onClick,
}: {
  section: string;
  activeSection: string;
  onClick: () => void;
}) {
  const isActive = activeSection === section;

  return (
    <MagneticButton strength={0.2}>
      <button
        data-section={section}
        onClick={onClick}
        className={`relative px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
          isActive ? "text-[#FF3333]" : "text-[#333333] hover:text-[#FF3333]"
        }`}
      >
        <span className="relative z-10">
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </span>
        {isActive && (
          <motion.div
            layoutId="navIndicator"
            className="absolute inset-0 bg-white rounded-full shadow-sm"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </button>
    </MagneticButton>
  );
}

// Hero text animation
function AnimatedHeroText() {
  const words = ["Harmonious", "Colours,", "Comforting", "Designs"];

  return (
    <motion.p className="text-xl md:text-2xl lg:text-3xl font-light text-[#666666] flex flex-wrap gap-x-3">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8 + index * 0.1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ perspective: 1000 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "work", "contact"];
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const sectionElement = document.getElementById(section);
        if (
          sectionElement &&
          scrollPos >= sectionElement.offsetTop &&
          scrollPos < sectionElement.offsetTop + sectionElement.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (section: string) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SmoothScroll>
        <CustomCursor />
        <ScrollProgress />

        {/* Noise texture overlay */}
        <div className="noise-overlay" />

        <main className="flex flex-col items-center justify-between min-h-screen bg-[#FFF5F5] text-[#333333] overflow-x-hidden font-sans">
          {/* Navigation */}
          <motion.nav
            ref={navRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 flex justify-center gap-1 p-1.5 bg-white/80 rounded-full shadow-lg backdrop-blur-xl z-50 border border-white/20"
          >
            {["about", "work", "contact"].map((section) => (
              <NavLink
                key={section}
                section={section}
                activeSection={activeSection}
                onClick={() => handleClick(section)}
              />
            ))}
          </motion.nav>

          {/* Hero Section */}
          <motion.section
            ref={heroRef}
            id="hero"
            className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 py-20 overflow-hidden"
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          >
            {/* WebGL Background */}
            <div className="absolute inset-0 w-full h-full">
              <Suspense fallback={null}>
                {!isLoading && <ColorBlob />}
              </Suspense>
            </div>

            <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center relative z-10">
              <motion.div
                className="lg:w-2/3 text-center lg:text-left lg:pr-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                {/* Main title with character animation */}
                <div className="overflow-hidden mb-6">
                  <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 2.6, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    Three
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6">
                  <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] tracking-tight"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 2.7, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    Colours{" "}
                    <span className="text-[#FF3333] font-medium italic">Red</span>
                  </motion.h1>
                </div>

                {/* Animated tagline */}
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                >
                  <AnimatedHeroText />
                </motion.div>

                {/* Intro text with stagger */}
                <motion.div
                  className="space-y-4 max-w-xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.2 }}
                >
                  <p className="text-lg md:text-xl font-light leading-relaxed">
                    Hey! I&apos;m{" "}
                    <span className="font-medium">Tanya Bardell-Young</span>.
                  </p>
                  <p className="text-lg md:text-xl font-light leading-relaxed text-[#666666]">
                    I care about colours working together in harmony and gorgeously
                    comforting interior design.
                  </p>
                  <motion.p
                    className="text-lg md:text-xl font-light leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5 }}
                  >
                    If you&apos;re looking for colour consulting or interior design
                    advice,{" "}
                    <button
                      onClick={() => handleClick("contact")}
                      className="text-[#FF3333] font-medium line-reveal inline-block"
                      data-cursor-text="Let's talk"
                    >
                      get in touch
                    </button>
                    !
                  </motion.p>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.8 }}
            >
              <MagneticButton strength={0.3} onClick={() => handleClick("about")}>
                <motion.div
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-[#666666] group-hover:text-[#FF3333] transition-colors">
                    Scroll
                  </span>
                  <ArrowDownIcon className="w-5 h-5 text-[#FF3333]" />
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.section>

          {/* About Section */}
          <section
            id="about"
            className="relative w-full min-h-screen flex items-center py-32 px-6"
          >
            <div className="max-w-7xl w-full mx-auto">
              <RevealOnScroll>
                <AboutSection />
              </RevealOnScroll>
            </div>
          </section>

          {/* Work Section */}
          <section
            id="work"
            className="relative w-full min-h-screen flex items-center py-32 px-6 bg-white"
          >
            <div className="max-w-7xl w-full mx-auto">
              <WorkSection />
            </div>
          </section>

          {/* Color Lab - Interactive Feature */}
          <ColorLab />

          {/* Contact Section */}
          <section
            id="contact"
            className="relative w-full min-h-screen flex items-center py-32 px-6"
          >
            <div className="max-w-7xl w-full mx-auto">
              <ContactForm />
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full py-12 px-6 bg-[#333333] text-white">
            <div className="max-w-7xl mx-auto">
              <RevealOnScroll>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-light mb-2">
                      Three Colours{" "}
                      <span className="text-[#FF3333] font-medium">Red</span>
                    </h3>
                    <p className="text-white/60 text-sm">
                      Colour Consulting & Interior Design
                    </p>
                  </div>
                  <div className="flex gap-8">
                    {["about", "work", "contact"].map((section) => (
                      <button
                        key={section}
                        onClick={() => handleClick(section)}
                        className="text-white/60 hover:text-[#FF3333] transition-colors text-sm uppercase tracking-wider"
                      >
                        {section}
                      </button>
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">
                    © {new Date().getFullYear()} Tanya Bardell-Young
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </footer>
        </main>
      </SmoothScroll>
    </>
  );
}
