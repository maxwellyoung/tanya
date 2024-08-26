"use client";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-6xl mx-auto p-6 md:p-12"
    >
      <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#333333]">
        About <span className="font-medium">Me</span>
      </h2>
      <Separator className="mb-12 bg-[#FF3333]" />
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Avatar className="h-48 w-48 md:h-64 md:w-64 rounded-full overflow-hidden">
            <AvatarImage src="/profile.webp" alt="Tanya Bardell-Young" />
            <AvatarFallback>TBY</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full " />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-3xl font-medium mb-4 text-[#333333]">
            Tanya Bardell-Young
          </h3>
          <p className="text-lg font-light leading-relaxed text-[#666666] mb-6">
            I&apos;m a passionate colour consultant and interior designer with a
            keen eye for detail and a love for all things colour. My goal is to
            help you create harmonious and comforting spaces that reflect your
            unique style.
          </p>
          <p className="text-lg font-light leading-relaxed text-[#666666]">
            With years of experience in the industry, I bring a fresh
            perspective to every project. Whether you&apos;re looking to revamp
            a single room or transform your entire home, I&apos;m here to guide
            you through the process and bring your vision to life.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
