"use client";

import { motion, useInView } from "framer-motion";
import { Heart, Star, Quote, ArrowRight, Users, Code, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useRef } from "react";
import Link from "next/link";

export default function Stories() {
  const featuredStories = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      location: "San Francisco, CA",
      image: "/api/placeholder/400/400",
      story: "After losing my laptop during a move, I thought my coding journey was over. DevDonations provided me with a refurbished MacBook that not only got me back on track but exceeded my expectations. Today, I'm working as a full-stack developer at a tech startup, and I volunteer with DevDonations to help others facing similar challenges.",
      impact: "Landed her first developer job within 6 months",
      quote: "DevDonations didn't just give me a laptop—they gave me my future.",
      gradient: "from-blue-500/20 to-blue-500/10",
      iconColor: "text-blue-500",
      delay: 0,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Mobile App Developer",
      location: "Austin, TX",
      image: "/api/placeholder/400/400",
      story: "Coming from a small town with limited resources, I taught myself coding through free online courses. But without proper equipment, I couldn't practice what I was learning. The development setup I received from DevDonations included a laptop, monitor, and even a drawing tablet. Now I'm building mobile apps and mentoring other aspiring developers.",
      impact: "Built and launched 3 successful apps in his portfolio",
      quote: "Every great developer started somewhere. DevDonations made sure I had the tools to start.",
      gradient: "from-purple-500/20 to-purple-500/10",
      iconColor: "text-purple-500",
      delay: 0.2,
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Data Scientist",
      location: "Seattle, WA",
      image: "/api/placeholder/400/400",
      story: "As a single mother returning to school for a computer science degree, balancing coursework with childcare was challenging enough. Without reliable equipment, it would have been impossible. The workstation DevDonations provided helped me complete my degree with honors and land a role in data science. Now I give back by donating my time to teach coding workshops.",
      impact: "Graduated summa cum laude and secured a $95k starting salary",
      quote: "DevDonations invested in my family's future, and now I'm investing in others.",
      gradient: "from-green-500/20 to-green-500/10",
      iconColor: "text-green-500",
      delay: 0.4,
    },
  ];

  const stats = [
    { number: "85%", label: "Found employment within 1 year", icon: Trophy },
    { number: "92%", label: "Completed their learning goals", icon: BookOpen },
    { number: "78%", label: "Started their own projects", icon: Code },
    { number: "95%", label: "Would recommend to others", icon: Heart },
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
                <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
              Success <span className="font-medium">Stories</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Real stories from real developers whose lives have been transformed through the power of community and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
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
              The <span className="font-medium">Impact</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Numbers that tell the story of transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-card border border-border rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>

                  <div className="text-3xl font-light mb-2 text-foreground">
                    {stat.number}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
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
              Featured <span className="font-medium">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet some of the incredible developers whose journeys have been transformed by DevDonations
            </p>
          </motion.div>

          <div className="space-y-20">
            {featuredStories.map((story, index) => (
              <motion.div
                key={story.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: story.delay, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${story.gradient} flex items-center justify-center mb-6`}>
                      <Quote className={`w-10 h-10 ${story.iconColor}`} strokeWidth={1.5} />
                    </div>

                    <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-foreground">
                      "{story.quote}"
                    </blockquote>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium">{story.name}</h3>
                        <p className="text-muted-foreground">{story.role}</p>
                        <p className="text-sm text-muted-foreground">{story.location}</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-primary fill-current" />
                        <span className="font-medium text-primary">Impact</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{story.impact}</p>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
                    <h4 className="text-xl font-medium mb-4">Their Journey</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {story.story}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Stories Grid */}
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
              More <span className="font-medium">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every donation creates a ripple effect of success stories across our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Rodriguez",
                role: "Frontend Developer",
                location: "Miami, FL",
                story: "From self-taught coder to professional developer in 8 months.",
                gradient: "from-orange-500/20 to-orange-500/10",
              },
              {
                name: "Emma Thompson",
                role: "UX Designer",
                location: "Portland, OR",
                story: "Built her design portfolio and landed her dream job in tech.",
                gradient: "from-pink-500/20 to-pink-500/10",
              },
              {
                name: "David Kim",
                role: "Backend Engineer",
                location: "Denver, CO",
                story: "Started coding bootcamp and now leads development teams.",
                gradient: "from-cyan-500/20 to-cyan-500/10",
              },
              {
                name: "Lisa Wang",
                role: "DevOps Engineer",
                location: "Boston, MA",
                story: "Transitioned from marketing to a successful tech career.",
                gradient: "from-indigo-500/20 to-indigo-500/10",
              },
              {
                name: "James Wilson",
                role: "Mobile Developer",
                location: "Nashville, TN",
                story: "Published 5 apps and started his own development studio.",
                gradient: "from-teal-500/20 to-teal-500/10",
              },
              {
                name: "Maria Garcia",
                role: "Data Analyst",
                location: "Phoenix, AZ",
                story: "From Excel user to data science professional in one year.",
                gradient: "from-emerald-500/20 to-emerald-500/10",
              },
            ].map((person, index) => (
              <motion.div
                key={person.name}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${person.gradient} flex items-center justify-center mb-4`}>
                    <Heart className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-medium mb-2">{person.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{person.role}</p>
                  <p className="text-xs text-muted-foreground/70 mb-4">{person.location}</p>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {person.story}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
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
              <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>

            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Share <span className="font-medium">Your Story</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
              Have you been impacted by DevDonations? We'd love to hear your story and share it with our community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg">
                  Share Your Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link href="/about-us">
                <Button variant="outline" className="px-8 py-4 text-lg border-border hover:bg-secondary">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}