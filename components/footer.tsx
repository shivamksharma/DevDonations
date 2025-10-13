"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      className="border-t border-border/50 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.div
            className="flex items-center gap-2 text-primary"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-medium text-lg">DevDonations</span>
          </motion.div>

          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Spreading warmth, one piece at a time.
          </p>

          <div className="text-xs text-muted-foreground/70 mt-4">
            &copy; {new Date().getFullYear()} DevDonations. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
}