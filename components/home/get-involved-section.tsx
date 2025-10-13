"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Users } from "lucide-react";
import Link from "next/link";

export function GetInvolvedSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-8 leading-tight">
            Want to make a
            <br />
            <span className="font-medium">difference today?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join our community of changemakers and help us spread warmth and hope to those who need it most.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/donate">
              <motion.div
                className="group relative bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6">
                    <Heart className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-2xl font-medium mb-4 text-foreground">
                    Start Donating
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Give your gently used clothes a second life and bring warmth to someone in need.
                  </p>

                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                    Donate Now
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/volunteer">
              <motion.div
                className="group relative bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-accent" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-2xl font-medium mb-4 text-foreground">
                    Become a Volunteer
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Join our team and help us organize, sort, and distribute donations to communities.
                  </p>

                  <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-4 transition-all">
                    Join Our Team
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
