"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

const stories = [
  {
    quote: "The warm coat I received helped me get through the winter. I'm forever grateful for your kindness.",
    name: "Maria Rodriguez",
    image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    quote: "My children can now go to school with confidence, wearing clean, fitting clothes. Thank you for restoring their dignity.",
    name: "James Chen",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    quote: "These donations gave me hope during my toughest times. Now I volunteer to help others the way I was helped.",
    name: "Sarah Thompson",
    image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export function StoriesSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-32 px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Stories of Change
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Hear from those whose lives have been touched by your generosity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.div
                className="bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-8">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{story.quote}"
                  </p>
                  <p className="font-medium text-foreground">
                    {story.name}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
