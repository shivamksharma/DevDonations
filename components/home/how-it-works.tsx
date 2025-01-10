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
    title: "Make an Impact",
    description: "Your clothes will be distributed to those who need them most"
  }
];

export function HowItWorks() {
  return (
    <section className="h-screen flex items-center justify-center bg-secondary snap-start relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.div 
                className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <step.icon className="w-12 h-12 text-primary" />
                {index < steps.length - 1 && (
                  <div className="absolute left-full top-1/2 w-full h-0.5 bg-primary/20 -translate-y-1/2 hidden md:block" />
                )}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
