"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-lg font-semibold text-foreground tracking-wide">
              DevDonations
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connecting developers with communities in need through technology and generosity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about-us"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Get Involved */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Get Involved
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/join"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Join Us
              </Link>
              <Link
                href="/volunteer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Volunteer
              </Link>
              <Link
                href="/stories"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Success Stories
              </Link>
            </nav>
          </div>

          {/* Contact & Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Resources
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/distribution"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Distribution
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/analytics"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </Link>
            </nav>

            {/* Contact Info */}
            <div className="pt-4 border-t border-border/20">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@devdonations.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs text-muted-foreground">
              &copy; {currentYear} DevDonations. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}