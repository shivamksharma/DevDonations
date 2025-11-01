"use client";

import { motion, useInView } from "framer-motion";
import { Heart, Package, RefreshCw, Send, Users, Target, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useDonateModal } from "@/shared/lib/store/donate-modal-store";
import { useVolunteerModal } from "@/shared/lib/store/volunteer-modal-store";
import { useRef, useState } from "react";

export default function LearnMore() {
  const { openModal } = useDonateModal();
  const { openModal: openVolunteerModal } = useVolunteerModal();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen">
      {/* Hero/Intro Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
              About <span className="font-medium">DevDonations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              We're on a mission to bridge the digital divide by empowering underprivileged developers 
              with access to essential tools and equipment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-medium">Our Mission</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  DevDonations exists to eliminate the barriers that prevent talented individuals 
                  from pursuing their dreams in technology. We believe that access to proper tools 
                  shouldn't be a luxury—it's a fundamental right for every aspiring developer.
                </p>
                <p>
                  By collecting, refurbishing, and redistributing tech equipment, we're creating 
                  pathways for underserved communities to enter the digital economy. Every laptop, 
                  monitor, and peripheral we donate represents an opportunity for someone to learn, 
                  create, and build their future.
                </p>
                <p>
                  We're not just donating equipment—we're investing in human potential and fostering 
                  a more inclusive tech ecosystem for everyone.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-medium">Our Vision</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We envision a world where every developer, regardless of their economic background, 
                  has access to the tools they need to succeed. A world where talent and determination—not 
                  financial resources—determine who gets to shape our digital future.
                </p>
                <p>
                  Our long-term goal is to build a sustainable, global network of donors, volunteers, 
                  and beneficiaries that continuously cycles resources to where they're needed most. 
                  We're working toward a future where no one's potential is wasted due to lack of equipment.
                </p>
                <p className="font-medium text-foreground">
                  We believe in equity, sustainability, and the transformative power of technology to 
                  change lives.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Our <span className="font-medium">Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Together, we're making a real difference in developers' lives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Equipment Donated", icon: Package, delay: 0 },
              { number: "300+", label: "Developers Supported", icon: Users, delay: 0.1 },
              { number: "100+", label: "Active Volunteers", icon: Heart, delay: 0.2 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-card border border-border rounded-3xl p-10 text-center hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  
                  <div className="text-5xl font-light mb-4 text-foreground">
                    {stat.number}
                  </div>
                  
                  <p className="text-muted-foreground text-lg">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              What <span className="font-medium">We Do</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our three-step process ensures quality equipment reaches those who need it most
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Collect",
                description: "We gather gently used but functional tech equipment from generous donors who want to make a difference.",
                gradient: "from-blue-500/20 to-blue-500/10",
                iconColor: "text-blue-500",
              },
              {
                icon: RefreshCw,
                title: "Refurbish",
                description: "Our team ensures every device is secure, functional, and ready to use—wiping data and performing quality checks.",
                gradient: "from-purple-500/20 to-purple-500/10",
                iconColor: "text-purple-500",
              },
              {
                icon: Send,
                title: "Distribute",
                description: "We deliver equipment directly to aspiring developers and learners who need them to pursue their goals.",
                gradient: "from-green-500/20 to-green-500/10",
                iconColor: "text-green-500",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-card border border-border rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6`}>
                    <step.icon className={`w-8 h-8 ${step.iconColor}`} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-medium mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-center">
              Our <span className="font-medium">Story</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                DevDonations was born from a simple observation: countless talented individuals are 
                held back from pursuing careers in technology simply because they lack access to basic 
                equipment like laptops and computers.
              </p>
              
              <p>
                At the same time, millions of functional devices sit unused in closets and offices, 
                waiting to be retired or discarded. We saw an opportunity to bridge this gap and 
                create meaningful change.
              </p>
              
              <p>
                What started as a small community initiative has grown into a passionate movement of 
                donors, volunteers, and beneficiaries working together to democratize access to technology. 
                Every device we collect, refurbish, and donate represents a story—someone's opportunity 
                to learn, create, and transform their future.
              </p>
              
              <p className="text-foreground font-medium text-xl pt-4">
                We're just getting started, and we invite you to be part of this journey.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Get <span className="font-medium">In Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or want to learn more? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Email</h3>
                <a 
                  href="mailto:support@devdonations.org" 
                  className="text-2xl hover:text-primary transition-colors"
                >
                  support@devdonations.org
                </a>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Phone</h3>
                <a 
                  href="tel:+1234567890" 
                  className="text-2xl hover:text-primary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>

              <div className="pt-8">
                <p className="text-muted-foreground mb-4">
                  Prefer to reach out directly? Send us a message and we'll get back to you as soon as possible.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <Textarea
                    id="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="min-h-[150px] bg-background border-border resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Call to Action Cards */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="group relative bg-card border border-border rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={openModal}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6">
                  <Package className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-medium mb-4">
                  Donate Equipment
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Have tech equipment you no longer need? Give it a second life and empower a developer's journey.
                </p>

                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                  Donate Now
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative bg-card border border-border rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={openVolunteerModal}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl font-medium mb-4">
                  Become a Volunteer
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Join our community and help us collect, refurbish, and distribute equipment to those in need.
                </p>

                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-4 transition-all">
                  Join Our Team
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 