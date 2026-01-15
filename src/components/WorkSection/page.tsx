"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import RevealOnScroll from "@/components/RevealOnScroll";

const projects = [
  {
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern-living-room-1-RDSXWNQHOXwIdxhuLLNZNZcThLOnkY.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern-living-room-2-0f7Uc5Jt9Zy4TI9a5sPVQgYZBXBnSo.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/modern-living-room-3-8QLuOxSrOXxvDrQVXBgLQQxXNLVLBf.jpg",
    ],
    alt: "Modern living room design",
    badge: "Interior Design",
    title: "Contemporary Comfort",
    description: "Modern living room design with a focus on comfort and style.",
    details:
      "This project transformed a dated living space into a contemporary haven. We focused on creating a harmonious blend of comfort and style, incorporating a neutral color palette with pops of muted tones. The design features clean lines, plush textures, and statement lighting to create a welcoming atmosphere that's perfect for both relaxation and entertaining.",
    color: "#FF3333",
    year: "2024",
  },
  {
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/color-palette-1-5sPMvSZZ3zTXgKBtMoRXXBgBvYLqbf.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/color-palette-2-QLNLXWNZNZcThLOnkYRDSXWNQHOXwI.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/color-palette-3-dxhuLLNZNZcThLOnkYRDSXWNQHOXw.jpg",
    ],
    alt: "Vibrant home color palette",
    badge: "Colour Consulting",
    title: "Vibrant Harmony",
    description: "Colour palette consultation for a vibrant and cohesive home.",
    details:
      "For this color consultation project, we worked closely with the homeowners to develop a vibrant yet harmonious color scheme that reflects their personality and enhances their living space. The palette incorporates a mix of bold and subtle hues, carefully balanced to create a cohesive flow throughout the home. We considered natural light, existing furnishings, and the desired atmosphere for each room to craft a truly personalized color story.",
    color: "#33CCFF",
    year: "2024",
  },
  {
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visual-merchandising-1-I9a5sPVQgYZBXBnSo0f7Uc5Jt9Zy4T.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visual-merchandising-2-QgYZBXBnSo0f7Uc5Jt9Zy4TI9a5sPV.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visual-merchandising-3-Zy4TI9a5sPVQgYZBXBnSo0f7Uc5Jt9.jpg",
    ],
    alt: "Citta Design visual merchandising",
    badge: "Visual Merchandising",
    title: "Citta Design Showcase",
    description:
      "Visual merchandising for Citta Design, a New Zealand homeware store.",
    details:
      "Our visual merchandising project for Citta Design aimed to create an immersive and inspiring shopping experience. We curated product displays that tell a cohesive story, highlighting the brand's unique aesthetic and quality craftsmanship. By strategically arranging products, implementing eye-catching focal points, and using creative props, we transformed the store into a space that not only showcases products effectively but also inspires customers with lifestyle vignettes.",
    color: "#FFCC33",
    year: "2023",
  },
];

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.1,
      y: (e.clientY - rect.top - rect.height / 2) * 0.1,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-lg"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          rotateX: -mousePosition.y * 0.5,
          rotateY: mousePosition.x * 0.5,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        onClick={onClick}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        data-cursor-text="View"
      >
        {/* Image container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={project.images[0]}
            alt={project.alt}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          />

          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />

          {/* Badge */}
          <motion.span
            className="absolute top-4 left-4 px-3 py-1.5 text-xs font-medium text-white rounded-full backdrop-blur-sm"
            style={{ backgroundColor: `${project.color}CC` }}
            animate={{ y: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {project.badge}
          </motion.span>

          {/* Year */}
          <span className="absolute top-4 right-4 text-xs text-white/60">
            {project.year}
          </span>

          {/* View button */}
          <motion.div
            className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center"
            animate={{
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-5 h-5 text-[#333333]" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3
            className="text-xl font-medium text-[#333333] mb-2"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <p className="text-sm text-[#666666] font-light line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
          style={{ backgroundColor: project.color }}
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function WorkSection() {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const handleProjectClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <RevealOnScroll>
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              className="text-sm uppercase tracking-[0.3em] text-[#FF3333] font-medium mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Selected Work
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-light text-[#333333] leading-[1.1]">
              Projects that{" "}
              <span className="italic font-medium text-[#FF3333]">shine</span>
            </h2>
          </div>
          <p className="text-lg text-[#666666] font-light max-w-md">
            A curated selection of interior transformations and colour consultations
          </p>
        </div>
      </RevealOnScroll>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>

      {/* Project Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {selectedProject && (
            <DialogContent className="max-w-5xl mx-auto p-0 bg-white overflow-hidden rounded-2xl border-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col md:flex-row h-full max-h-[90vh]"
              >
                {/* Image Carousel */}
                <div className="md:w-3/5 relative bg-[#333333]">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                      {selectedProject.images.map((src, idx) => (
                        <CarouselItem key={idx} className="h-full">
                          <div className="relative h-64 md:h-full min-h-[300px]">
                            <img
                              src={src}
                              alt={`${selectedProject.alt} ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg">
                      <ChevronLeft className="h-5 w-5" />
                    </CarouselPrevious>
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-lg">
                      <ChevronRight className="h-5 w-5" />
                    </CarouselNext>
                  </Carousel>

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
                    <span className="text-xs text-white">
                      {selectedProject.images.length} images
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/5 p-8 md:p-10 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span
                      className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-4"
                      style={{ backgroundColor: selectedProject.color }}
                    >
                      {selectedProject.badge}
                    </span>

                    <h3 className="text-3xl md:text-4xl font-light text-[#333333] mb-4">
                      {selectedProject.title}
                    </h3>

                    <p className="text-lg text-[#666666] font-light mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <div className="w-12 h-px bg-[#333333]/20 mb-6" />

                    <p className="text-[#666666] leading-relaxed">
                      {selectedProject.details}
                    </p>

                    <div className="mt-8 pt-6 border-t border-[#333333]/10">
                      <span className="text-xs text-[#666666] uppercase tracking-wider">
                        Year: {selectedProject.year}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <DialogClose className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#FFF5F5] transition-colors">
                <X className="h-4 w-4 text-[#333333]" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>

      {/* View All CTA */}
      <RevealOnScroll delay={0.3}>
        <div className="mt-16 text-center">
          <MagneticButton strength={0.2}>
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#333333] text-white rounded-full font-medium hover:bg-[#FF3333] transition-colors duration-300"
              data-cursor-hover
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </MagneticButton>
        </div>
      </RevealOnScroll>
    </div>
  );
}
