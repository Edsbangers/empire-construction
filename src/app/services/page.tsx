"use client";

import Link from "next/link";
import {
  Building2,
  Home,
  Hammer,
  Wrench,
  Store,
  ArrowRight,
  CheckCircle,
  Phone
} from "lucide-react";

const services = [
  {
    id: "hmo-conversions",
    icon: Building2,
    title: "HMO Conversions",
    description: "Transform your property into a profitable HMO investment with full regulatory compliance.",
    features: [
      "Full feasibility assessments",
      "Planning application support",
      "Building regulations compliance",
      "Fire safety installation",
      "En-suite bathroom additions",
      "Shared kitchen facilities"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  {
    id: "extensions",
    icon: Home,
    title: "Extensions",
    description: "Expand your living space with beautifully designed extensions tailored to your needs.",
    features: [
      "Single-storey extensions",
      "Double-storey extensions",
      "Rear and side extensions",
      "Wrap-around extensions",
      "Permitted development guidance",
      "Architectural design services"
    ],
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
  },
  {
    id: "new-builds",
    icon: Hammer,
    title: "New Builds",
    description: "Complete new build construction from foundation to finish with quality craftsmanship.",
    features: [
      "Residential new builds",
      "Multi-unit developments",
      "Turnkey solutions",
      "Project management",
      "Warranty backed construction",
      "SAP calculations & EPC"
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
  },
  {
    id: "renovations",
    icon: Wrench,
    title: "Renovations",
    description: "Breathe new life into existing properties with expert renovation services.",
    features: [
      "Full property refurbishment",
      "Structural alterations",
      "Period property restoration",
      "Kitchen & bathroom fitting",
      "Electrical rewiring",
      "Plumbing upgrades"
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
  },
  {
    id: "commercial",
    icon: Store,
    title: "Commercial",
    description: "Professional commercial fit-outs and construction for businesses of all sizes.",
    features: [
      "Office fit-outs",
      "Retail space development",
      "Restaurant & hospitality",
      "Industrial units",
      "Accessibility compliance",
      "Minimal business disruption"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="text-gold">Services</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From HMO conversions to commercial fit-outs, we deliver excellence on every project across Portsmouth and Hampshire.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="bg-gold/10 rounded-xl p-4 w-fit mb-6">
                  <service.icon className="h-12 w-12 text-gold" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-gold flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/quote"
                  className="btn-primary inline-flex items-center"
                >
                  Get a Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-navy rounded-xl p-4 shadow-xl hidden sm:block">
                    <p className="text-gold font-bold text-lg">14+ Years</p>
                    <p className="text-gray-300 text-sm">Experience</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-navy/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and detailed quote. Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-secondary inline-flex items-center justify-center">
              Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="tel:02392123456" className="bg-white text-navy font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              023 9212 3456
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
