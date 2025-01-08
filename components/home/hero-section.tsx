"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80"
          alt="Clothes Donation"
          fill
          className="object-cover brightness-50"
        />
      </div>
      <motion.div 
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Clothes for Cause, Donate Today
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Your gently used clothes can provide warmth and hope to those in need. Start donating today and make a difference!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            href="/donate"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-2 transition-all hover:scale-105"
          >
            Start Donating <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}