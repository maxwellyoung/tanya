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

// Animated nav link - simplified for mobile
function NavLink({
  section,
  activeSection,
  onClick,
  isMobile,
}: {
  section: string;
  activeSection: string;
  onClick: () => void;
  isMobile: boolean;
}) {
  const isActive = activeSection === section;

  const button = (
    <button
      data-section={section}
      onClick={onClick}
      className={`relative px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
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
  );

  // Only use magnetic effect on desktop
  if (isMobile) {
    return button;
  }

  return <MagneticButton strength={0.2}>{button}</MagneticButton>;
}

// Hero text animation - faster on mobile
function AnimatedHeroText({ isMobile }: { isMobile: boolean }) {
  const words = ["Harmonious", "Colours,", "Comforting", "Designs"];
  const baseDelay = isMobile ? 0.3 : 0.8;

  return (
    <motion.p className="text-lg md:text-2xl lg:text-3xl font-light text-[#666666] flex flex-wrap gap-x-2 md:gap-x-3 justify-center lg:justify-start">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: baseDelay + index * 0.08,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
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
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || !window.matchMedia("(pointer: fine)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // Faster animation delays on mobile
  const animDelay = isMobile ? 1.2 : 2.5;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} isMobile={isMobile} />}
      </AnimatePresence>

      <SmoothScroll>
        {/* Only render custom cursor on desktop */}
        {!isMobile && <CustomCursor />}
        <ScrollProgress />

        <main className="flex flex-col items-center justify-between min-h-screen bg-[#FFF5F5] text-[#333333] overflow-x-hidden font-sans">
          {/* Navigation */}
          <motion.nav
            ref={navRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: animDelay, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 flex justify-center gap-0.5 md:gap-1 p-1 md:p-1.5 bg-white/90 md:bg-white/80 rounded-full shadow-lg backdrop-blur-xl z-50 border border-white/20"
          >
            {["about", "work", "contact"].map((section) => (
              <NavLink
                key={section}
                section={section}
                activeSection={activeSection}
                onClick={() => handleClick(section)}
                isMobile={isMobile}
              />
            ))}
          </motion.nav>

          {/* Hero Section */}
          <motion.section
            ref={heroRef}
            id="hero"
            className="relative w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-6 py-16 md:py-20 overflow-hidden"
            style={isMobile ? {} : { opacity: heroOpacity, scale: heroScale, y: heroY }}
          >
            {/* WebGL Background - only on desktop */}
            {!isMobile && (
              <div className="absolute inset-0 w-full h-full">
                <Suspense fallback={null}>
                  {!isLoading && <ColorBlob />}
                </Suspense>
              </div>
            )}

            {/* Mobile fallback background */}
            {isMobile && (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.div
                  className="absolute w-32 h-32 rounded-full bg-[#FF3333]/30 blur-3xl"
                  style={{ top: "20%", left: "10%" }}
                  animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-40 h-40 rounded-full bg-[#33CCFF]/30 blur-3xl"
                  style={{ top: "40%", right: "10%" }}
                  animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-36 h-36 rounded-full bg-[#FFCC33]/30 blur-3xl"
                  style={{ bottom: "30%", left: "20%" }}
                  animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            )}

            <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center relative z-10">
              <motion.div
                className="w-full lg:w-2/3 text-center lg:text-left lg:pr-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: animDelay }}
              >
                {/* Main title */}
                <div className="overflow-hidden mb-4 md:mb-6">
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-9xl font-light leading-[0.95] tracking-tight"
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: animDelay + 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    Three
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-4 md:mb-6">
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-9xl font-light leading-[0.95] tracking-tight"
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: animDelay + 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    Colours{" "}
                    <span className="text-[#FF3333] font-medium italic">Red</span>
                  </motion.h1>
                </div>

                {/* Animated tagline */}
                <motion.div
                  className="mb-8 md:mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: animDelay + 0.3 }}
                >
                  <AnimatedHeroText isMobile={isMobile} />
                </motion.div>

                {/* Intro text */}
                <motion.div
                  className="space-y-3 md:space-y-4 max-w-xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: animDelay + 0.5 }}
                >
                  <p className="text-base md:text-xl font-light leading-relaxed">
                    Hey! I&apos;m{" "}
                    <span className="font-medium">Tanya Bardell-Young</span>.
                  </p>
                  <p className="text-base md:text-xl font-light leading-relaxed text-[#666666]">
                    I care about colours working together in harmony and gorgeously
                    comforting interior design.
                  </p>
                  <p className="text-base md:text-xl font-light leading-relaxed">
                    If you&apos;re looking for colour consulting or interior design
                    advice,{" "}
                    <button
                      onClick={() => handleClick("contact")}
                      className="text-[#FF3333] font-medium underline underline-offset-4 active:opacity-70"
                    >
                      get in touch
                    </button>
                    !
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: animDelay + 0.8 }}
            >
              <button
                onClick={() => handleClick("about")}
                className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
              >
                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-[#666666] group-hover:text-[#FF3333] transition-colors">
                    Scroll
                  </span>
                  <ArrowDownIcon className="w-5 h-5 text-[#FF3333]" />
                </motion.div>
              </button>
            </motion.div>
          </motion.section>

          {/* About Section */}
          <section
            id="about"
            className="relative w-full min-h-screen flex items-center py-20 md:py-32 px-4 md:px-6"
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
            className="relative w-full min-h-screen flex items-center py-20 md:py-32 px-4 md:px-6 bg-white"
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
            className="relative w-full min-h-screen flex items-center py-20 md:py-32 px-4 md:px-6"
          >
            <div className="max-w-7xl w-full mx-auto">
              <ContactForm />
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full py-8 md:py-12 px-4 md:px-6 bg-[#333333] text-white">
            <div className="max-w-7xl mx-auto">
              <RevealOnScroll>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-light mb-2">
                      Three Colours{" "}
                      <span className="text-[#FF3333] font-medium">Red</span>
                    </h3>
                    <p className="text-white/60 text-sm">
                      Colour Consulting & Interior Design
                    </p>
                  </div>
                  <div className="flex gap-6 md:gap-8">
                    {["about", "work", "contact"].map((section) => (
                      <button
                        key={section}
                        onClick={() => handleClick(section)}
                        className="text-white/60 hover:text-[#FF3333] active:text-[#FF3333] transition-colors text-sm uppercase tracking-wider"
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
