"use client";

import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, ArrowRight, CheckCircle, Users } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useRef, useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@devdonations.org",
      action: "mailto:support@devdonations.org",
      gradient: "from-blue-500/20 to-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team during business hours",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      gradient: "from-green-500/20 to-green-500/10",
      iconColor: "text-green-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come to our office for in-person consultations",
      contact: "123 Tech Street, San Francisco, CA 94105",
      action: "#",
      gradient: "from-purple-500/20 to-purple-500/10",
      iconColor: "text-purple-500",
    },
  ];

  const faqs = [
    {
      question: "How can I donate equipment?",
      answer: "You can donate through our website by filling out the donation form, or contact us directly to arrange equipment pickup. We accept laptops, monitors, keyboards, and other tech equipment.",
    },
    {
      question: "What types of equipment do you need?",
      answer: "We're always looking for functional laptops, monitors, keyboards, mice, and other computer peripherals. All equipment should be in working condition and no more than 5 years old.",
    },
    {
      question: "How do I become a volunteer?",
      answer: "Visit our volunteer page to learn about opportunities and apply. We have roles in equipment collection, testing, distribution, and community outreach.",
    },
    {
      question: "Do you provide training or support?",
      answer: "Yes! We offer coding workshops, mentorship programs, and ongoing support to help recipients make the most of their equipment and develop their skills.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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
                <MessageSquare className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
              Get in <span className="font-medium">Touch</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Have questions, want to donate, or ready to volunteer? We're here to help you make a difference in the developer community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
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
              Contact <span className="font-medium">Methods</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the best way to reach us. We're available through multiple channels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="group relative bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => method.action.startsWith('mailto:') || method.action.startsWith('tel:') ? window.open(method.action) : null}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl ${method.gradient.replace('from-', 'from-').replace('to-', 'to-')}`}
                />

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center mb-6`}>
                    <method.icon className={`w-8 h-8 ${method.iconColor}`} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-2xl font-medium mb-4">
                    {method.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {method.description}
                  </p>

                  <div className="text-foreground font-medium text-lg">
                    {method.contact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
                  Send us a <span className="font-medium">Message</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form below and we'll get back to you as soon as possible.
                  We typically respond within 24 hours during business days.
                </p>
              </div>

              {isSubmitted && (
                <motion.div
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background border-border h-12"
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
                      className="bg-background border-border h-12"
                    />
                  </div>
                </div>

                <div>
                  <Input
                    id="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="bg-background border-border h-12"
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
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Send Message
                      <Send className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information & Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
                  Get in <span className="font-medium">Touch</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We're here to help you make a positive impact in the developer community.
                  Whether you have questions or want to get involved, we're just a message away.
                </p>
              </div>

              {/* Business Hours */}
              <div className="bg-card border border-border rounded-3xl p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium">Business Hours</h3>
                </div>

                <div className="space-y-3 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-foreground">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-foreground">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground/70">Closed</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium mb-4">Quick Actions</h3>

                <div className="grid gap-4">
                  <a
                    href="/donate"
                    className="group flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:shadow-lg transition-all hover:border-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Send className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">Donate Equipment</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="/volunteer"
                    className="group flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:shadow-lg transition-all hover:border-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-medium">Become a Volunteer</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Frequently Asked <span className="font-medium">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about DevDonations
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-xl font-medium mb-4">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>

            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Ready to Make a <span className="font-medium">Difference?</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Join our community of donors, volunteers, and developers working together to create opportunities for everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/donate">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                  Donate Equipment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>

              <a href="/volunteer">
                <Button variant="outline" className="px-8 py-4 text-lg border-border hover:bg-secondary">
                  Join Our Team
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}