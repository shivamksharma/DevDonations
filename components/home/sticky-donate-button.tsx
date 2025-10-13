"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyDonateButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 400], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      style={{ opacity }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link href="/donate">
        <motion.button
          className="group bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-3 px-6 py-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Heart className="w-5 h-5 fill-current" />
          </motion.div>
          <span className="font-medium">Donate Now</span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
