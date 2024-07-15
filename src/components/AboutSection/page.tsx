"use client";

import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AboutSection() {
  return (
    <div
      id="about"
      className="h-screen w-full max-w-4xl p-6 md:p-12 lg:p-24 flex flex-col items-center"
    >
      <h2 className="text-xl font-light md:text-2xl mb-4">
        A little bit about me...
      </h2>
      <Separator className="mb-6" />
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-6 md:mb-0">
          <AvatarImage src="/profile.webp" alt="Tanya Bardell-Young" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="text-center md:text-left">
          <p className="text-lg font-light leading-relaxed text-gray-700">
            I’m Tanya Bardell-Young, a passionate colour consultant and interior
            designer. My goal is to help you create harmonious and comforting
            spaces that reflect your unique style.
          </p>
          <p className="text-lg font-light leading-relaxed text-gray-700 mt-4">
            With a keen eye for detail and a love for all things colour, I bring
            a fresh perspective to every project. Let&apos;s work together to
            bring your vision to life.
          </p>
        </div>
      </div>
    </div>
  );
}
