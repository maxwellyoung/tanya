"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Mail, MapPin } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <RevealOnScroll>
        <div className="mb-12 md:mb-20 text-center">
          <motion.p
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#999999] mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#333333] leading-tight mb-4 md:mb-6">
            Let&apos;s work<br className="md:hidden" />{" "}
            <span className="italic text-[#666666]">together</span>
          </h2>
          <p className="text-base md:text-lg text-[#666666] font-light max-w-xl mx-auto">
            Ready to transform your space? I&apos;d love to hear about your project.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left - Contact Info */}
        <RevealOnScroll direction="left" className="lg:col-span-2">
          <div className="space-y-8 md:space-y-10">
            {/* Contact details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#FF3333]" />
                </div>
                <div>
                  <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@threecoloursred.com"
                    className="text-[#333333] hover:text-[#FF3333] transition-colors"
                  >
                    hello@threecoloursred.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#FF3333]" />
                </div>
                <div>
                  <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-[#333333]">Auckland, New Zealand</p>
                </div>
              </div>
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-700">
                Currently accepting new projects
              </span>
            </div>

            {/* Note */}
            <p className="text-sm text-[#999999] font-light leading-relaxed">
              I typically respond within 24-48 hours. Looking forward to hearing
              about your project.
            </p>
          </div>
        </RevealOnScroll>

        {/* Right - Form */}
        <RevealOnScroll direction="right" delay={0.1} className="lg:col-span-3">
          <div className="bg-white p-6 md:p-10 rounded-xl md:rounded-2xl shadow-sm border border-[#333333]/5">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-light text-[#333333] mb-3">
                    Message Sent
                  </h3>
                  <p className="text-[#666666] text-sm md:text-base mb-6">
                    Thank you for reaching out. I&apos;ll be in touch soon.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      form.reset();
                    }}
                    className="text-[#FF3333] text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                        <FormField
                          name="name"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#333333] text-sm font-medium">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  {...field}
                                  className="h-12 bg-[#f8f8f8] border-0 focus:bg-white focus:ring-1 focus:ring-[#FF3333]/30 transition-all duration-300 rounded-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="email"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#333333] text-sm font-medium">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  {...field}
                                  className="h-12 bg-[#f8f8f8] border-0 focus:bg-white focus:ring-1 focus:ring-[#FF3333]/30 transition-all duration-300 rounded-lg"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        name="message"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#333333] text-sm font-medium">
                              Message
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell me about your project..."
                                {...field}
                                className="min-h-[140px] bg-[#f8f8f8] border-0 focus:bg-white focus:ring-1 focus:ring-[#FF3333]/30 transition-all duration-300 rounded-lg resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 md:h-14 px-8 font-medium text-white bg-[#333333] rounded-lg hover:bg-[#FF3333] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3333] focus-visible:ring-offset-2 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                      >
                        <span className="text-sm md:text-base">
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </span>
                        {!isSubmitting && (
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        )}
                      </button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
