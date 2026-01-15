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
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.215, 0.61, 0.355, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] mb-5 md:mb-6 overflow-hidden rounded-lg md:rounded-xl">
        <motion.img
          src={project.images[0]}
          alt={project.alt}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

        {/* Badge */}
        <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-medium text-white bg-[#333333]/80 backdrop-blur-sm rounded-full">
          {project.badge}
        </span>

        {/* View indicator */}
        <div className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#333333]" />
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg md:text-xl font-light text-[#333333] group-hover:text-[#FF3333] transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs text-[#999999]">{project.year}</span>
        </div>
        <p className="text-sm text-[#666666] font-light line-clamp-2">
          {project.description}
        </p>
      </div>
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
        <div className="mb-12 md:mb-20">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#999999] mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Selected Work
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#333333] leading-tight">
              Projects that<br className="hidden md:block" />{" "}
              <span className="italic text-[#666666]">tell stories</span>
            </h2>
            <p className="text-base md:text-lg text-[#666666] font-light max-w-sm">
              A curated selection of interior transformations and colour consultations
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
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
            <DialogContent className="max-w-5xl mx-auto p-0 bg-white overflow-hidden rounded-xl md:rounded-2xl border-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col md:flex-row h-full max-h-[90vh]"
              >
                {/* Image Carousel */}
                <div className="md:w-3/5 relative bg-[#f5f5f5]">
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
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
                    <span className="text-xs text-white">
                      {selectedProject.images.length} images
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-2/5 p-6 md:p-10 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-block px-3 py-1 text-xs font-medium text-[#333333] bg-[#f5f5f5] rounded-full mb-4">
                      {selectedProject.badge}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-light text-[#333333] mb-4">
                      {selectedProject.title}
                    </h3>

                    <p className="text-base md:text-lg text-[#666666] font-light mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <div className="w-12 h-px bg-[#333333]/20 mb-6" />

                    <p className="text-sm md:text-base text-[#666666] leading-relaxed font-light">
                      {selectedProject.details}
                    </p>

                    <div className="mt-8 pt-6 border-t border-[#333333]/10">
                      <span className="text-xs text-[#999999] uppercase tracking-wider">
                        Year: {selectedProject.year}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <DialogClose className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
                <X className="h-4 w-4 text-[#333333]" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>

      {/* CTA */}
      <RevealOnScroll delay={0.3}>
        <div className="mt-12 md:mt-20 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#333333] hover:text-[#FF3333] transition-colors duration-300 group"
          >
            <span className="text-base md:text-lg font-light">Interested in working together?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </RevealOnScroll>
    </div>
  );
}
