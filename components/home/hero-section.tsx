"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <Image
          src="https://images.pexels.com/photos/6995244/pexels-photo-6995244.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2"
          alt="Community helping hands"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-light tracking-tight mb-8 text-white leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Give Warmth.
          <br />
          <span className="font-medium">Share Hope.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Your unused clothes can change lives. Join us in spreading kindness, one donation at a time.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/donate"
            className="group bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full text-base font-medium inline-flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl shadow-lg"
          >
            Donate Clothes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/learn-more"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-10 py-4 rounded-full text-base font-medium inline-flex items-center gap-2 transition-all hover:scale-105"
          >
            Learn How It Works
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
