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
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.div 
                className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <step.icon className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}