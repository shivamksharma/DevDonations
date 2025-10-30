"use client";

import { motion } from "framer-motion";
import { Heart, Package, Truck } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Choose Donation Type",
    description: "Select whether you want to drop off your clothes or have them picked up"
  },
  {
    icon: Truck,
    title: "Schedule Pickup",
    description: "Fill out a simple form with your details and preferred pickup time"
  },
  {
    icon: Heart,
    title: "We Deliver to Those in Need",
    description: "Your clothes will be distributed to those who need them most"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="min-h-screen flex items-center justify-center py-32 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            How It Works
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto" />
        </motion.div>

        <div className="relative">
          <svg
            className="absolute top-20 left-0 w-full h-0.5 hidden md:block"
            style={{ zIndex: 0 }}
          >
            <motion.line
              x1="16.666%"
              y1="0"
              x2="83.333%"
              y2="0"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8 8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </svg>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="relative mb-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative z-10">
                      <step.icon className="w-9 h-9 text-primary" strokeWidth={1.5} />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10"
                      initial={{ scale: 1, opacity: 0 }}
                      whileInView={{ scale: 1.3, opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "easeOut"
                      }}
                    />
                  </motion.div>

                  <h3 className="text-xl font-medium mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
