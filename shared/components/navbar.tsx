"use client";

import { Menu, X, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/shared/components/theme/theme-toggle";
import { useDonateModal } from "@/shared/lib/store/donate-modal-store";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/#contact", label: "Contact", scroll: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useDonateModal();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, scroll?: boolean) => {
    if (scroll && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (pathname !== "/") {
        // If not on homepage, navigate to home then scroll
        window.location.href = href;
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center transition-all duration-300 ${
                  scrolled ? "shadow-md" : "shadow-lg shadow-primary/50"
                }`}>
                  <Heart className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-foreground" : "text-white drop-shadow-lg"
                }`}>
                  DevDonations
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.scroll)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 group ${
                      scrolled
                        ? isActiveLink(link.href)
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                      isActiveLink(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right side - Theme toggle and Donate button */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                onClick={openModal}
                className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Heart className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Donate Now</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  scrolled
                    ? "hover:bg-accent/50"
                    : "hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className={`h-6 w-6 ${scrolled ? "text-foreground" : "text-white"}`} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className={`h-6 w-6 ${scrolled ? "text-foreground" : "text-white"}`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background border-l border-border shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-semibold">DevDonations</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-8">
                  <div className="space-y-1 px-6">
                    {navigationLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href, link.scroll)}
                          className={`flex items-center px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                            isActiveLink(link.href)
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          }`}
                        >
                          {link.label}
                          {isActiveLink(link.href) && (
                            <motion.div
                              layoutId="active-pill"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mobile Donate Button */}
                <div className="p-6 border-t border-border">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      openModal();
                      setIsOpen(false);
                    }}
                    className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Donate Now</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}