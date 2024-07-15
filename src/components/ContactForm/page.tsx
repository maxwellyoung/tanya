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
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

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
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl font-light md:text-2xl mb-4">Contact Me</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    className="placeholder-gray-500 placeholder-opacity-75"
                  />
                </FormControl>
                <FormDescription>This is your name.</FormDescription>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Your email"
                    {...field}
                    className="placeholder-gray-500 placeholder-opacity-75"
                  />
                </FormControl>
                <FormDescription>This is your email address.</FormDescription>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    {...field}
                    className="placeholder-gray-500 placeholder-opacity-75"
                    rows={4}
                  />
                </FormControl>
                <FormDescription>Enter your message.</FormDescription>
                <FormMessage>
                  {form.formState.errors.message?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-gray-700 rounded-md shadow hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}
