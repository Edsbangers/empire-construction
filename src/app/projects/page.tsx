"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Tag } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Southsea HMO Conversion",
    category: "HMO",
    location: "Southsea",
    year: "2024",
    description: "Complete transformation of a Victorian terrace into a 6-bed luxury HMO with en-suite bathrooms and modern communal spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    features: ["6 en-suite bedrooms", "Modern communal kitchen", "Fire safety compliant", "Full planning approval"]
  },
  {
    id: 2,
    title: "Eastney Double Extension",
    category: "Extension",
    location: "Eastney",
    year: "2024",
    description: "Stunning double-storey rear extension adding 80sqm of living space to a family home.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    features: ["80sqm additional space", "Open-plan kitchen/diner", "Bi-fold doors", "Velux skylights"]
  },
  {
    id: 3,
    title: "Milton New Build",
    category: "New Build",
    location: "Milton",
    year: "2023",
    description: "Contemporary 4-bedroom family home built to the highest energy efficiency standards.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    features: ["4 bedrooms", "EPC rating A", "Solar panels", "10-year warranty"]
  },
  {
    id: 4,
    title: "Fratton Victorian Renovation",
    category: "Renovation",
    location: "Fratton",
    year: "2023",
    description: "Sympathetic restoration of a period property while modernising all systems and layout.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    features: ["Period features restored", "Full rewire", "New heating system", "Modern insulation"]
  },
  {
    id: 5,
    title: "Gunwharf Office Fit-out",
    category: "Commercial",
    location: "Gunwharf",
    year: "2023",
    description: "Modern open-plan office space for a tech startup with breakout areas and meeting rooms.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    features: ["500sqm office space", "Meeting rooms", "Kitchen facilities", "Accessibility compliant"]
  },
  {
    id: 6,
    title: "Cosham 8-Bed HMO",
    category: "HMO",
    location: "Cosham",
    year: "2023",
    description: "Large-scale HMO conversion of a detached property into 8 high-quality letting rooms.",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    features: ["8 bedrooms", "2 shared kitchens", "Garden access", "Parking for 4 cars"]
  }
];

const categories = ["All", "HMO", "Extension", "New Build", "Renovation", "Commercial"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="text-gold">Projects</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our portfolio of completed projects across Portsmouth and Hampshire.
            Quality craftsmanship on every build.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors touch-friendly ${
                  activeCategory === category
                    ? 'bg-gold text-navy'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-navy text-sm font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {project.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="text-gold hover:text-gold-600 font-semibold flex items-center">
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Want to See Your Project <span className="text-gold">Here?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your vision. Our team is ready to bring your construction project to life.
          </p>
          <Link href="/quote" className="btn-primary inline-flex items-center">
            Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
