"use client";

import React from "react";
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
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-2xl mx-auto p-6 md:p-12"
    >
      <h2 className="text-4xl md:text-5xl font-light mb-6 text-[#333333]">
        Get in <span className="font-medium">Touch</span>
      </h2>
      <p className="text-xl font-light mb-8 text-[#666666]">
        I&apos;d love to hear about your project. Let&apos;s create something
        beautiful together.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333333]">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    className="bg-white border-[#FF3333] focus:border-[#FF6666] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6666] focus-visible:ring-offset-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333333]">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email"
                    {...field}
                    className="bg-white border-[#FF3333] focus:border-[#FF6666] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6666] focus-visible:ring-offset-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#333333]">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    {...field}
                    className="bg-white border-[#FF3333] focus:border-[#FF6666] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6666] focus-visible:ring-offset-2"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full px-4 py-3 font-medium text-white bg-[#FF3333] rounded-full shadow hover:bg-[#FF6666] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6666] focus-visible:ring-offset-2 transition-colors duration-300"
          >
            Send Message
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
