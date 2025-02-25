"use client"

import React, { useState } from 'react';
import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: '/car_sales_weijun', label: 'Car Sales' },
    { href: '/house_pricing_karthik', label: 'House Pricing' },
    { href: '/wheat_type_gabriel', label: 'Wheat Type' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center">
        {/* Logo - taking 1/3 of the space */}
        <div className="w-1/3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg transition-colors hover:text-primary">
            <span className="text-primary">📚</span>
            <span className='text-lg font-black'>MLOps Assignment</span>
          </Link>
        </div>

        {/* Desktop Navigation - centered in the middle 1/3 */}
        <nav className="hidden md:flex items-center justify-center w-1/3">
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Right side with theme toggle - taking 1/3 of the space */}
        <div className="w-1/3 flex items-center justify-end gap-4">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-muted-foreground hover:text-primary transition-colors" />
            ) : (
              <Menu size={24} className="text-muted-foreground hover:text-primary transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}