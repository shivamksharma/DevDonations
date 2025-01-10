"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "10K+", label: "Clothes Donated", description: "Making a difference one piece at a time" },
  { value: "5K+", label: "Lives Impacted", description: "Helping families across communities" },
  { value: "50+", label: "Communities Served", description: "Reaching those who need it most" },
];

export function ImpactSection() {
  return (
    <section className="h-screen flex items-center justify-center snap-start relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-4">Our Impact</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Together, we're making a real difference in our communities through your generous donations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.div
                className="bg-card p-8 rounded-xl shadow-lg text-center h-full transform transition-transform hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-6xl font-bold text-primary mb-4"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.2 + 0.3 
                  }}
                >
                  {stat.value}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-3">{stat.label}</h3>
                <p className="text-muted-foreground">{stat.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/join">
            <Button 
              size="lg" 
              className="font-semibold text-lg px-8 py-6 rounded-full"
              variant="default"
            >
              Join as Volunteer <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
