"use client";

import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
} from "../ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const projects = [
  {
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400/0000FF",
      "https://via.placeholder.com/600x400/FF0000",
    ],
    alt: "Project 1",
    badge: "Interior Design",
    description: "Modern living room design with a focus on comfort and style.",
  },
  {
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400/00FF00",
      "https://via.placeholder.com/600x400/FFFF00",
    ],
    alt: "Project 2",
    badge: "Colour Consulting",
    description: "Colour palette consultation for a vibrant and cohesive home.",
  },
  {
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400/FF00FF",
      "https://via.placeholder.com/600x400/00FFFF",
    ],
    alt: "Project 3",
    badge: "Visual Merchandising",
    description:
      "Visual merchandising for Citta Design, a New Zealand homeware store.",
  },
];

export default function WorkSection() {
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedAlt, setSelectedAlt] = useState("");

  const handleImageClick = (images: string[], alt: string) => {
    setSelectedImages(images);
    setSelectedAlt(alt);
    setOpen(true);
  };

  return (
    <div
      id="work"
      className="h-screen w-full max-w-4xl p-6 md:p-12 lg:p-24 flex flex-col items-center"
    >
      <h2 className="text-xl font-light md:text-2xl mb-4">
        Here are some interiors I&apos;ve helped shine
      </h2>
      <Separator className="mb-6" />
      <ScrollArea className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="carousel-item">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <img
                    src={project.images[0]}
                    alt={project.alt}
                    className="w-full h-64 md:h-96 object-cover rounded-lg cursor-pointer"
                    onClick={() =>
                      handleImageClick(project.images, project.alt)
                    }
                  />
                </DialogTrigger>
                <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
                <DialogContent className="p-0 border-0 bg-transparent max-w-4xl mx-auto">
                  <Carousel className="relative w-full h-full">
                    <CarouselContent>
                      {selectedImages.map((src, idx) => (
                        <CarouselItem key={idx}>
                          <img
                            src={src}
                            alt={`${selectedAlt} ${idx + 1}`}
                            className="w-full h-auto"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2" />
                    <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2" />
                  </Carousel>
                </DialogContent>
              </Dialog>
              <Badge className="mt-2">{project.badge}</Badge>
              <p className="text-lg font-light leading-relaxed text-gray-700 mt-2">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
