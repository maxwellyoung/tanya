"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  },
];

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
    <div className="w-full max-w-6xl mx-auto py-20">
      <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#333333]">
        My <span className="font-medium">Work</span>
      </h2>
      <p className="text-xl md:text-2xl font-light mb-12 text-[#666666]">
        Here are some interiors I&apos;ve helped shine
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Dialog key={index} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3 py-1 text-sm font-semibold text-white bg-[#FF3333] rounded-full">
                    {project.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#333333]">
                    {project.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-[#666666]">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl mx-auto p-0 bg-white/95 backdrop-blur-md overflow-hidden">
              <AnimatePresence>
                {selectedProject && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row h-full"
                  >
                    <div className="md:w-1/2 relative">
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {selectedProject.images.map((src, idx) => (
                            <CarouselItem key={idx} className="h-full">
                              <img
                                src={src}
                                alt={`${selectedProject.alt} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <ChevronLeft className="h-6 w-6" />
                        </CarouselPrevious>
                        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <ChevronRight className="h-6 w-6" />
                        </CarouselNext>
                      </Carousel>
                    </div>
                    <div className="md:w-1/2 p-8 overflow-y-auto max-h-[80vh]">
                      <h3 className="text-3xl font-bold mb-4 text-[#333333]">
                        {selectedProject.title}
                      </h3>
                      <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-[#FF3333] bg-[#FFF0F0] rounded-full">
                        {selectedProject.badge}
                      </span>
                      <p className="text-lg font-light leading-relaxed text-[#333333] mb-6">
                        {selectedProject.description}
                      </p>
                      <p className="text-md leading-relaxed text-[#666666]">
                        {selectedProject.details}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
