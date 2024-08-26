"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";
import ContactForm from "@/components/ContactForm/page";
import WorkSection from "@/components/WorkSection/page";
import AboutSection from "@/components/AboutSection/page";

interface CircleProps {
  color: string;
  initialPosition: { x: number; y: number };
}

const Circle: React.FC<CircleProps> = ({ color, initialPosition }) => {
  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);

  return (
    <motion.div
      className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full cursor-move"
      style={{
        backgroundColor: color,
        x,
        y,
        mixBlendMode: "multiply",
      }}
      drag
      dragConstraints={{
        top: -200,
        left: -200,
        right: 200,
        bottom: 200,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    />
  );
};

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const navRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);

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

  useEffect(() => {
    if (navRef.current && activeSection !== "hero") {
      const activeButton = navRef.current.querySelector<HTMLButtonElement>(
        `button[data-section="${activeSection}"]`
      );
      if (activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const parentRect = activeButton.parentElement!.getBoundingClientRect();
        setHighlightStyle({
          left: buttonRect.left - parentRect.left,
          width: buttonRect.width,
        });
      }
    } else {
      setHighlightStyle(null);
    }
  }, [navRef, activeSection]);

  const handleClick = (section: string) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-[#FFF5F5] text-[#333333] overflow-x-hidden font-sans">
      <nav
        ref={navRef}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-2 p-2 bg-white/90 rounded-full shadow-lg backdrop-blur-md z-50"
      >
        {["about", "work", "contact"].map((section) => (
          <button
            key={section}
            data-section={section}
            onClick={() => handleClick(section)}
            className={`px-6 py-3 rounded-full relative z-10 transition-colors duration-300 text-lg font-medium ${
              activeSection === section
                ? "text-[#FF3333]"
                : "text-[#333333] hover:text-[#FF3333]"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
        <AnimatePresence>
          {highlightStyle && (
            <motion.div
              className="absolute top-1 bottom-1 bg-white rounded-full z-0"
              initial={{ left: 0, width: 0, opacity: 0 }}
              animate={{
                left: highlightStyle.left,
                width: highlightStyle.width,
                opacity: 1,
              }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </AnimatePresence>
      </nav>

      <section
        id="hero"
        className="relative w-full min-h-screen flex flex-col md:flex-row justify-center items-center px-4 py-20 overflow-hidden"
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center relative">
          <motion.div
            className="md:w-1/2 text-left md:pr-8 z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6">
              Three Colours{" "}
              <span className="text-[#FF3333] font-medium">Red</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-[#666666]">
              Harmonious Colors, Comforting Designs
            </p>
            <div className="space-y-4">
              <p className="text-lg font-light leading-relaxed">
                Hey! I&apos;m Tanya Bardell-Young.
              </p>
              <p className="text-lg font-light leading-relaxed">
                I care about colours working together in harmony and gorgeously
                comforting interior design.
              </p>
              <p className="text-lg font-light leading-relaxed">
                If you&apos;re looking for colour consulting or interior design
                advice,{" "}
                <a
                  href="#contact"
                  className="text-[#FF3333] underline hover:text-[#FF6666] transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick("contact");
                  }}
                >
                  get in touch
                </a>
                !
              </p>
            </div>
          </motion.div>
          <div className="md:w-1/2 relative h-64 md:h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0"
            >
              <Circle color="#FF3333" initialPosition={{ x: -100, y: -50 }} />
              <Circle color="#33CCFF" initialPosition={{ x: 50, y: 50 }} />
              <Circle color="#FFCC33" initialPosition={{ x: 100, y: -100 }} />
            </motion.div>
          </div>
        </div>
        <motion.button
          onClick={() => handleClick("about")}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-0 right-0 flex justify-center items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3333] focus-visible:ring-offset-2 rounded-full p-2"
          aria-label="Scroll to About section"
        >
          <ArrowDownIcon className="w-12 h-12 text-[#FF3333]" />
        </motion.button>
      </section>

      <section
        id="about"
        className="w-full min-h-screen flex items-center py-20 px-4"
      >
        <div className="max-w-7xl w-full mx-auto">
          <AboutSection />
        </div>
      </section>

      <section
        id="work"
        className="w-full min-h-screen flex items-center py-20 px-4 bg-white"
      >
        <div className="max-w-7xl w-full mx-auto">
          <WorkSection />
        </div>
      </section>

      <section
        id="contact"
        className="w-full min-h-screen flex items-center py-20 px-4"
      >
        <div className="max-w-7xl w-full mx-auto">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
