"use client";

import Link from "next/link";
import { Building2, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Award, Shield, CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Compliance Ribbon */}
      <div className="bg-navy-600 border-t border-navy-400">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-gold" />
              <span className="text-sm font-medium">ISO 9001 Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-gold" />
              <span className="text-sm font-medium">ISO 45001 Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-gold" />
              <span className="text-sm font-medium">FMB Member</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-gold" />
              <span className="text-sm font-medium">PICMS Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-gold" />
              <span className="text-sm font-medium">TrustMark Registered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gold p-2 rounded-lg">
                <Building2 className="h-8 w-8 text-navy" />
              </div>
              <div>
                <span className="text-white font-bold text-xl">EMPIRE</span>
                <span className="text-gold font-bold text-xl ml-1">CONTRACTORS</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Portsmouth&apos;s premier construction company. Building quality homes and commercial spaces since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/hmo-conversions" className="text-gray-400 hover:text-white transition-colors">
                  HMO Conversions
                </Link>
              </li>
              <li>
                <Link href="/services/extensions" className="text-gray-400 hover:text-white transition-colors">
                  Extensions
                </Link>
              </li>
              <li>
                <Link href="/services/new-builds" className="text-gray-400 hover:text-white transition-colors">
                  New Builds
                </Link>
              </li>
              <li>
                <Link href="/services/renovations" className="text-gray-400 hover:text-white transition-colors">
                  Renovations
                </Link>
              </li>
              <li>
                <Link href="/services/commercial" className="text-gray-400 hover:text-white transition-colors">
                  Commercial Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-white transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gold font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Empire House<br />
                  123 Commercial Road<br />
                  Portsmouth, PO1 1AB
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                <a href="tel:02392123456" className="text-gray-400 hover:text-white transition-colors">
                  023 9212 3456
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold flex-shrink-0" />
                <a href="mailto:info@empirecontractors.co.uk" className="text-gray-400 hover:text-white transition-colors">
                  info@empirecontractors.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-400 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Empire Contractors Ltd. All rights reserved. Company No. 12345678
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
