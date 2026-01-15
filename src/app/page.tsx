"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Menu, X } from "lucide-react";
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
const Inspiration = dynamic(() => import("@/components/Inspiration"), {
  ssr: false,
});

// Mobile menu overlay
function MobileMenu({
  isOpen,
  onClose,
  onNavigate,
  activeSection,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
}) {
  const sections = ["about", "work", "contact"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#333333]/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white active:scale-95 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav items */}
            <nav className="flex flex-col items-center gap-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => {
                    onNavigate(section);
                    onClose();
                  }}
                  className={`text-4xl font-light tracking-wide transition-colors px-8 py-4 ${
                    activeSection === section
                      ? "text-[#FF3333]"
                      : "text-white/80 active:text-[#FF3333]"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
            </nav>

            {/* Brand */}
            <motion.p
              className="absolute bottom-12 text-white/40 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Three Colours Red
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Desktop nav link
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
        onClick={onClick}
        className={`relative px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
          isActive ? "text-[#FF3333]" : "text-[#333333] hover:text-[#FF3333]"
        }`}
      >
        <span className="relative z-10">{section}</span>
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

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

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
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const animDelay = isMobile ? 1.0 : 2.5;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} isMobile={isMobile} />}
      </AnimatePresence>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      <SmoothScroll>
        {!isMobile && <CustomCursor />}
        <ScrollProgress />

        <main className="flex flex-col items-center min-h-screen bg-[#FFF5F5] text-[#333333] overflow-x-hidden font-sans">
          {/* Mobile Header */}
          {isMobile && (
            <motion.header
              className="fixed top-0 left-0 right-0 z-50 px-5 py-4 flex items-center justify-between"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: animDelay }}
            >
              <motion.span
                className="text-lg font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animDelay + 0.2 }}
              >
                <span className="text-[#333333]">TCR</span>
              </motion.span>

              <motion.button
                onClick={() => setMenuOpen(true)}
                className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center active:scale-95 transition-transform border border-white/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: animDelay + 0.1, type: "spring", stiffness: 300 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-5 h-5 text-[#333333]" />
              </motion.button>
            </motion.header>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.nav
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: animDelay }}
              className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-1 p-1.5 bg-white/80 rounded-full shadow-lg backdrop-blur-xl z-50 border border-white/20"
            >
              {["about", "work", "contact"].map((section) => (
                <NavLink
                  key={section}
                  section={section}
                  activeSection={activeSection}
                  onClick={() => handleNavigate(section)}
                />
              ))}
            </motion.nav>
          )}

          {/* Hero Section */}
          <motion.section
            ref={heroRef}
            id="hero"
            className="relative w-full min-h-[100svh] flex flex-col justify-center items-center px-6 md:px-8 pt-20 pb-24 md:py-20 overflow-hidden"
            style={isMobile ? {} : { opacity: heroOpacity, scale: heroScale, y: heroY }}
          >
            {/* Background */}
            {!isMobile ? (
              <div className="absolute inset-0 w-full h-full">
                <Suspense fallback={null}>
                  {!isLoading && <ColorBlob />}
                </Suspense>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {/* Larger, more vibrant blobs for mobile */}
                <motion.div
                  className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-[#FF3333]/40 to-[#FF6666]/20 blur-3xl"
                  style={{ top: "-5%", left: "-20%" }}
                  animate={{
                    x: [0, 30, 0],
                    y: [0, 20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[#33CCFF]/35 to-[#33CCFF]/10 blur-3xl"
                  style={{ top: "30%", right: "-25%" }}
                  animate={{
                    x: [0, -25, 0],
                    y: [0, 30, 0],
                    scale: [1.1, 1, 1.1],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#FFCC33]/35 to-[#FFCC33]/10 blur-3xl"
                  style={{ bottom: "5%", left: "-10%" }}
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            )}

            {/* Hero Content */}
            <div className="max-w-7xl w-full mx-auto relative z-10">
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: animDelay }}
              >
                {/* Title */}
                <div className="overflow-hidden mb-2 md:mb-4">
                  <motion.h1
                    className="text-[13vw] md:text-[8vw] lg:text-[7vw] font-light leading-[0.9] tracking-tight"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: animDelay + 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    Three
                  </motion.h1>
                </div>
                <div className="overflow-hidden mb-6 md:mb-8">
                  <motion.h1
                    className="text-[13vw] md:text-[8vw] lg:text-[7vw] font-light leading-[0.9] tracking-tight"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: animDelay + 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    Colours{" "}
                    <span className="text-[#FF3333] font-medium italic">Red</span>
                  </motion.h1>
                </div>

                {/* Tagline */}
                <motion.p
                  className="text-base md:text-xl lg:text-2xl font-light text-[#666666] mb-8 md:mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: animDelay + 0.4 }}
                >
                  Harmonious Colours, Comforting Designs
                </motion.p>

                {/* Intro text */}
                <motion.div
                  className="space-y-4 max-w-lg mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: animDelay + 0.5 }}
                >
                  <p className="text-base md:text-lg font-light leading-relaxed">
                    Hey! I&apos;m <span className="font-medium">Tanya Bardell-Young</span>.
                  </p>
                  <p className="text-base md:text-lg font-light leading-relaxed text-[#666666]">
                    I care about colours working together in harmony and gorgeously
                    comforting interior design.
                  </p>
                  <p className="text-base md:text-lg font-light leading-relaxed">
                    If you&apos;re looking for colour consulting or interior design advice,{" "}
                    <button
                      onClick={() => handleNavigate("contact")}
                      className="text-[#FF3333] font-medium underline underline-offset-4 decoration-[#FF3333]/50 hover:decoration-[#FF3333] active:opacity-70 transition-all"
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
              className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: animDelay + 0.8 }}
            >
              <button
                onClick={() => handleNavigate("about")}
                className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#999999] font-medium">
                  Scroll
                </span>
                <motion.div
                  className="w-10 h-10 rounded-full border border-[#FF3333]/30 flex items-center justify-center group-hover:border-[#FF3333] group-hover:bg-[#FF3333]/5 transition-colors"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-4 h-4 text-[#FF3333]" />
                </motion.div>
              </button>
            </motion.div>
          </motion.section>

          {/* About Section */}
          <section id="about" className="relative w-full py-20 md:py-32 px-5 md:px-8">
            <div className="max-w-7xl w-full mx-auto">
              <RevealOnScroll>
                <AboutSection />
              </RevealOnScroll>
            </div>
          </section>

          {/* Work Section */}
          <section id="work" className="relative w-full py-20 md:py-32 px-5 md:px-8 bg-white">
            <div className="max-w-7xl w-full mx-auto">
              <WorkSection />
            </div>
          </section>

          {/* Inspiration Section */}
          <Inspiration />

          {/* Contact Section */}
          <section id="contact" className="relative w-full py-20 md:py-32 px-5 md:px-8">
            <div className="max-w-7xl w-full mx-auto">
              <ContactForm />
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full py-10 md:py-12 px-5 md:px-8 bg-[#333333] text-white">
            <div className="max-w-7xl mx-auto">
              <RevealOnScroll>
                <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-light mb-1">
                      Three Colours <span className="text-[#FF3333] font-medium">Red</span>
                    </h3>
                    <p className="text-white/50 text-sm">Colour Consulting & Interior Design</p>
                  </div>
                  <div className="flex gap-8">
                    {["about", "work", "contact"].map((section) => (
                      <button
                        key={section}
                        onClick={() => handleNavigate(section)}
                        className="text-white/50 hover:text-[#FF3333] active:text-[#FF3333] transition-colors text-sm uppercase tracking-wider"
                      >
                        {section}
                      </button>
                    ))}
                  </div>
                  <p className="text-white/30 text-xs">
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
