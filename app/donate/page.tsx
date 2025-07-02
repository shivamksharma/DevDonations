"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DonationModal } from "@/components/donate/donation-modal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Clock, MapPin, Heart, CheckCircle } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export default function DonatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Heart className="w-4 h-4 mr-2" />
            Make a Difference
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-6"
            variants={fadeIn}
          >
            Donate Your Pre-Loved Clothes
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
            variants={fadeIn}
          >
            Your gently used clothing can transform lives. Join our mission to provide quality clothing to those in need through a simple, transparent donation process.
          </motion.p>
          
          <motion.div variants={fadeIn}>
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-7 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Donating Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 mb-12"
          variants={fadeIn}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="p-1 bg-gradient-to-r from-primary to-secondary">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Donating your clothes has never been easier. Follow these simple steps to make an impact.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />,
                    title: "1. Select Items",
                    description: "Choose the clothing items you'd like to donate from our easy-to-use selection."
                  },
                  {
                    icon: <Clock className="w-10 h-10 text-primary mx-auto mb-4" />,
                    title: "2. Schedule Pickup",
                    description: "Let us know when and where you'd like us to pick up your donation."
                  },
                  {
                    icon: <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />,
                    title: "3. Make an Impact",
                    description: "Your donation will be distributed to those in need through our network."
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl transition-all hover:shadow-md"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="text-center">
                      <div className="mb-4">{step.icon}</div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <DonationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}