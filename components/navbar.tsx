"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { DonationModal } from "@/components/donate/donation-modal";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);

  return (
    <>
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              DevDonations
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground/80 hover:text-foreground transition">
                Home
              </Link>
              <Link href="/distribution" className="text-foreground/80 hover:text-foreground transition">
                Distribution
              </Link>
              <Link href="/volunteer" className="text-foreground/80 hover:text-foreground transition">
                Volunteer
              </Link>
              <Link href="/learn-more" className="text-foreground/80 hover:text-foreground transition">
                Learn More
              </Link>
              <ThemeToggle />
              <Button 
                variant="default" 
                size="sm" 
                className="ml-2 bg-primary hover:bg-primary/90"
                onClick={() => setShowDonationModal(true)}
              >
                Donate Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-foreground/80 hover:text-foreground transition py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <button
                  onClick={() => {
                    setShowDonationModal(true);
                    setIsOpen(false);
                  }}
                  className="text-foreground/80 hover:text-foreground transition py-2 text-left"
                >
                  Donate
                </button>
                <Link
                  href="/distribution"
                  className="text-foreground/80 hover:text-foreground transition py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Distribution
                </Link>
                <Link
                  href="/volunteer"
                  className="text-foreground/80 hover:text-foreground transition py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Volunteer
                </Link>
                <Link
                  href="/learn-more"
                  className="text-foreground/80 hover:text-foreground transition py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Learn More
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      <DonationModal 
        isOpen={showDonationModal} 
        onClose={() => setShowDonationModal(false)} 
      />
    </>
  );
}