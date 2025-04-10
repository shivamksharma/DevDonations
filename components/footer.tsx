"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "Github" },
];

export function Footer() {
  return (
    <motion.footer 
      className="border-t bg-background/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DevDonations. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}