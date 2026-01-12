"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Building2, Phone, ChevronDown } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { name: "HMO Conversions", href: "/services/hmo-conversions" },
    { name: "Extensions", href: "/services/extensions" },
    { name: "New Builds", href: "/services/new-builds" },
    { name: "Renovations", href: "/services/renovations" },
    { name: "Commercial", href: "/services/commercial" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gold p-2 rounded-lg">
              <Building2 className="h-8 w-8 text-navy" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl tracking-tight">EMPIRE</span>
              <span className="text-gold font-bold text-xl tracking-tight ml-1">CONTRACTORS</span>
              <p className="text-gray-400 text-xs -mt-1">Master Builders Since 2010</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gold transition-colors font-medium">
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                className="text-white hover:text-gold transition-colors font-medium flex items-center touch-friendly"
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block px-4 py-3 text-navy hover:bg-gold hover:text-navy transition-colors touch-friendly"
                      onClick={() => setServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/projects" className="text-white hover:text-gold transition-colors font-medium">
              Projects
            </Link>
            <Link href="/about" className="text-white hover:text-gold transition-colors font-medium">
              About Us
            </Link>
            <Link href="/news" className="text-white hover:text-gold transition-colors font-medium">
              News
            </Link>
            <Link href="/contact" className="text-white hover:text-gold transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:02392123456" className="text-gold hover:text-gold-400 flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-semibold">023 9212 3456</span>
            </a>
            <Link href="/quote" className="btn-primary">
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-white p-3 touch-friendly"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-navy-600 border-t border-navy-400">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" className="block text-white text-lg py-3 touch-friendly" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <div className="border-t border-navy-400 pt-4">
              <p className="text-gold font-semibold mb-2">Services</p>
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="block text-gray-300 text-lg py-3 pl-4 touch-friendly"
                  onClick={() => setIsOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link href="/projects" className="block text-white text-lg py-3 touch-friendly" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
            <Link href="/about" className="block text-white text-lg py-3 touch-friendly" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link href="/news" className="block text-white text-lg py-3 touch-friendly" onClick={() => setIsOpen(false)}>
              News
            </Link>
            <Link href="/contact" className="block text-white text-lg py-3 touch-friendly" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <div className="border-t border-navy-400 pt-4 space-y-4">
              <a href="tel:02392123456" className="flex items-center text-gold text-lg py-3 touch-friendly">
                <Phone className="h-6 w-6 mr-3" />
                023 9212 3456
              </a>
              <Link href="/quote" className="btn-primary block text-center text-lg" onClick={() => setIsOpen(false)}>
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
