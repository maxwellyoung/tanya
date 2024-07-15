"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm/page";
import WorkSection from "@/components/WorkSection/page";
import AboutSection from "@/components/AboutSection/page";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "work", "contact"];
      const scrollPos = window.scrollY + window.innerHeight / 2;
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
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Initialize the highlight position and size
    if (navRef.current) {
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
    }
  }, [navRef, activeSection]);

  const handleClick = (
    section: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setActiveSection(section);
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
    const buttonRect = (
      event.target as HTMLButtonElement
    ).getBoundingClientRect();
    const parentRect = (
      event.target as HTMLButtonElement
    ).parentElement!.getBoundingClientRect();
    setHighlightStyle({
      left: buttonRect.left - parentRect.left,
      width: buttonRect.width,
    });
  };

  const [highlightStyle, setHighlightStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div
        ref={navRef}
        className="sticky top-4 flex justify-center gap-2 p-2 bg-slate-100 rounded-3xl shadow  backdrop-blur-sm bg-opacity-65 z-50"
      >
        {["about", "work", "contact"].map((section) => (
          <button
            key={section}
            data-section={section}
            onClick={(e) => handleClick(section, e)}
            className={`px-4 py-2 rounded-3xl relative z-10 transition-colors  duration-300 ${
              activeSection === section ? "text-white" : "text-gray-700"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
        <motion.div
          className="absolute top-1 bottom-1 bg-gray-700 rounded-3xl z-0"
          initial={false}
          animate={{ left: highlightStyle.left, width: highlightStyle.width }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
      <div className="relative w-full max-w-4xl h-screen flex flex-col justify-center p-6 md:p-12 lg:p-24">
        <div className="mb-8 z-30">
          <div className="text-2xl font-light md:text-4xl">
            Three Colours <span className="font-normal text-red-500">Red</span>
          </div>
        </div>
        <div className="relative h-64 mb-8 z-10">
          <div className="absolute w-48 h-48 bg-pink-300 rounded-full top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-48 h-48 bg-indigo-300 rounded-full top-1/3 left-3/4 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-48 h-48 bg-rose-400 rounded-full top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-30 mb-8">
          <p className="text-xl font-light leading-relaxed text-black md:text-2xl">
            Hey!
            <br />
            <br />
            I’m Tanya Bardell-Young.
            <br />
            <br />I care about colours working together in harmony and
            gorgeously comforting interior design.
            <br />
            <br />
            If you’re looking for colour consulting or interior design advice,{" "}
            <span className="underline cursor-pointer">get in touch</span>!
          </p>
        </div>
      </div>
      <div id="about" className="h-screen w-full max-w-4xl p-6 md:p-12 lg:p-24">
        <AboutSection />
      </div>
      <div id="work" className="h-screen w-full max-w-4xl p-6 md:p-12 lg:p-24">
        <WorkSection />
      </div>
      <div
        id="contact"
        className="h-screen w-full max-w-4xl p-6 md:p-12 lg:p-24"
      >
        <ContactForm />
      </div>
    </main>
  );
}
