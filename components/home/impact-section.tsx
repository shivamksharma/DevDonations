"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Clothes Donated" },
  { value: "5K+", label: "Lives Impacted" },
  { value: "50+", label: "Communities Served" }
];

export function ImpactSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Impact
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-card p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="text-4xl font-bold text-primary mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xl text-card-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}