"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const sections = [
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact Us" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
];

export default function LearnMore() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId || "about");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Sticky Navigation */}
      <nav className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 space-y-20">
        {/* About Us Section */}
        <section id="about" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6">About Us</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-lg mb-8">
                DevDonations is a non-profit initiative dedicated to bridging the digital divide by providing
                essential tech equipment to developers in need. Our mission is to empower aspiring and
                underprivileged developers with the tools they need to build their future.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-muted-foreground">Equipment Donated</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">300+</p>
                  <p className="text-muted-foreground">Developers Supported</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold">100+</p>
                  <p className="text-muted-foreground">Volunteers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-muted-foreground">Email</p>
                <a href="mailto:support@devdonations.org" className="text-lg hover:underline">
                  support@devdonations.org
                </a>
                <p className="text-muted-foreground mt-4">Phone</p>
                <a href="tel:+1234567890" className="text-lg hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
              <form className="space-y-4">
                <div>
                  <Input id="name" placeholder="Name" className="bg-background" />
                </div>
                <div>
                  <Input id="email" type="email" placeholder="Email" className="bg-background" />
                </div>
                <div>
                  <Textarea
                    id="message"
                    placeholder="Message"
                    className="min-h-[120px] bg-background"
                  />
                </div>
                <Button type="submit" variant="outline">Send Message</Button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* Privacy Policy Section */}
        <section id="privacy" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Collection</h3>
                  <p className="text-muted-foreground">
                    We collect contact information, device details, and usage data to provide and improve our services.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Data Protection</h3>
                  <p className="text-muted-foreground">
                    Your data is protected through encryption, regular security audits, and access controls.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Third-Party Services</h3>
                  <p className="text-muted-foreground">
                    We use Firebase, Google Analytics, and cloud storage providers to deliver our services.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Terms & Conditions Section */}
        <section id="terms" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Terms & Conditions</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">User Responsibilities</h3>
                  <p className="text-muted-foreground">
                    Provide accurate information, respect privacy, and use the platform as intended.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Donation Guidelines</h3>
                  <p className="text-muted-foreground">
                    Ensure equipment is functional, data-free, and legally yours to donate.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Liability</h3>
                  <p className="text-muted-foreground">
                    We are not responsible for equipment condition after donation or third-party service issues.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
} 