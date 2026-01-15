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
import { Send, CheckCircle, Mail, MapPin, Clock } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import RevealOnScroll from "@/components/RevealOnScroll";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@threecoloursred.com",
    color: "#FF3333",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Auckland, New Zealand",
    color: "#33CCFF",
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Mon-Fri, 9am-5pm",
    color: "#FFCC33",
  },
];

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <RevealOnScroll>
        <div className="mb-16 text-center">
          <motion.span
            className="text-sm uppercase tracking-[0.3em] text-[#FF3333] font-medium mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-light text-[#333333] leading-[1.1] mb-6">
            Let&apos;s create something{" "}
            <span className="italic font-medium text-[#FF3333]">beautiful</span>
          </h2>
          <p className="text-lg text-[#666666] font-light max-w-2xl mx-auto">
            Ready to transform your space? I&apos;d love to hear about your project
            and discuss how we can bring your vision to life.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left - Contact Info */}
        <RevealOnScroll direction="left">
          <div className="space-y-12">
            {/* Contact cards */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-medium text-[#333333]">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative quote */}
            <motion.div
              className="relative p-8 bg-gradient-to-br from-[#FFF5F5] to-white rounded-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF3333]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#33CCFF]/10 rounded-full blur-2xl" />

              <p className="text-2xl font-light text-[#333333] leading-relaxed relative z-10">
                &ldquo;The best rooms have something to say about the people who live
                in them.&rdquo;
              </p>
              <p className="text-sm text-[#666666] mt-4 relative z-10">
                — David Hicks
              </p>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-700 font-medium">
                Currently accepting new projects
              </span>
            </motion.div>
          </div>
        </RevealOnScroll>

        {/* Right - Form */}
        <RevealOnScroll direction="right" delay={0.2}>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-medium text-[#333333] mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-[#666666] mb-8">
                    Thank you for reaching out. I&apos;ll get back to you within
                    24-48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      form.reset();
                    }}
                    className="text-[#FF3333] font-medium hover:underline"
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#333333] font-medium">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                className="h-12 bg-[#FFF5F5] border-0 focus:bg-white focus:ring-2 focus:ring-[#FF3333]/20 transition-all duration-300 rounded-xl"
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
                            <FormLabel className="text-[#333333] font-medium">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                className="h-12 bg-[#FFF5F5] border-0 focus:bg-white focus:ring-2 focus:ring-[#FF3333]/20 transition-all duration-300 rounded-xl"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="message"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#333333] font-medium">
                              Message
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell me about your project..."
                                {...field}
                                className="min-h-[150px] bg-[#FFF5F5] border-0 focus:bg-white focus:ring-2 focus:ring-[#FF3333]/20 transition-all duration-300 rounded-xl resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <MagneticButton strength={0.15} className="w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 px-8 font-medium text-white bg-[#FF3333] rounded-xl shadow-lg hover:bg-[#FF6666] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3333] focus-visible:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                          data-cursor-hover
                        >
                          <span>
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </span>
                          <motion.div
                            animate={
                              isSubmitting
                                ? { rotate: 360 }
                                : { x: [0, 5, 0] }
                            }
                            transition={
                              isSubmitting
                                ? { duration: 1, repeat: Infinity, ease: "linear" }
                                : { duration: 1.5, repeat: Infinity }
                            }
                          >
                            <Send className="w-4 h-4" />
                          </motion.div>
                        </button>
                      </MagneticButton>
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
