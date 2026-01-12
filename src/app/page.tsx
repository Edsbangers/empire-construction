"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Home,
  Hammer,
  CheckCircle,
  Star,
  Phone,
  Award,
  Users,
  Clock,
  Shield,
  ChevronRight,
  MapPin
} from "lucide-react";

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const services = [
    {
      icon: Building2,
      title: "HMO Conversions",
      description: "Expert conversion of properties into Houses in Multiple Occupation. Full compliance with Portsmouth Council regulations.",
      link: "/services/hmo-conversions"
    },
    {
      icon: Home,
      title: "Extensions",
      description: "Transform your home with beautiful, functional extensions. From single-storey to double-storey builds.",
      link: "/services/extensions"
    },
    {
      icon: Hammer,
      title: "New Builds",
      description: "Complete new build construction from foundation to finish. Quality craftsmanship guaranteed.",
      link: "/services/new-builds"
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Completed", icon: Building2 },
    { value: "14", label: "Years Experience", icon: Clock },
    { value: "100%", label: "Satisfaction Rate", icon: Star },
    { value: "50+", label: "Team Members", icon: Users }
  ];

  const testimonials = [
    {
      text: "Empire Contractors transformed our Victorian terrace into a stunning 6-bed HMO. Their knowledge of Portsmouth regulations saved us months of delays.",
      author: "Sarah Mitchell",
      role: "Property Investor",
      location: "Southsea"
    },
    {
      text: "Professional from start to finish. The extension they built exceeded our expectations and was completed on time and on budget.",
      author: "James Thompson",
      role: "Homeowner",
      location: "Eastney"
    },
    {
      text: "We've used Empire for three commercial fit-outs now. Their attention to detail and project management is second to none.",
      author: "Michael Chen",
      role: "Business Owner",
      location: "Gunwharf"
    }
  ];

  const projects = [
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      title: "Southsea HMO Conversion",
      category: "HMO",
      description: "6-bed luxury HMO with en-suites"
    },
    {
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      title: "Eastney Extension",
      category: "Extension",
      description: "Double-storey rear extension"
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      title: "Milton New Build",
      category: "New Build",
      description: "4-bedroom family home"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-navy overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')"
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />

        {/* Gold Accent Line */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gold" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-gold/20 border border-gold/30 rounded-full px-4 py-2 mb-6">
                <Award className="h-5 w-5 text-gold mr-2" />
                <span className="text-gold text-sm font-medium">Portsmouth&apos;s Premier Builders</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Building
                <span className="text-gradient"> Excellence</span>
                <br />
                Across Portsmouth
              </h1>

              <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-xl">
                Expert HMO conversions, stunning extensions, and quality new builds.
                With 14 years of local experience, we bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/quote" className="btn-primary text-center text-lg flex items-center justify-center">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/projects" className="btn-secondary text-center text-lg flex items-center justify-center">
                  View Our Work
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-gold" />
                  <div>
                    <p className="text-white text-sm font-semibold">ISO Certified</p>
                    <p className="text-gray-400 text-xs">9001 & 45001 Ready</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-8 w-8 text-gold" />
                  <div>
                    <p className="text-white text-sm font-semibold">FMB Member</p>
                    <p className="text-gray-400 text-xs">Quality Assured</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-8 w-8 text-gold" />
                  <div>
                    <p className="text-white text-sm font-semibold">PICMS</p>
                    <p className="text-gray-400 text-xs">SHEQ Compliant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/20">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Empire Contractors Project"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy to-transparent p-6">
                  <p className="text-gold font-semibold">Featured Project</p>
                  <p className="text-white text-xl">Southsea HMO Conversion</p>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border-l-4 border-gold">
                <div className="flex items-center space-x-4">
                  <div className="bg-gold/20 rounded-full p-3">
                    <Star className="h-8 w-8 text-gold" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-navy">500+</p>
                    <p className="text-gray-600">Projects Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gold py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-10 w-10 text-navy mx-auto mb-3" />
                <p className="text-4xl font-bold text-navy">{stat.value}</p>
                <p className="text-navy/80 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Our <span className="text-gold">Specialist</span> Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From HMO conversions to complete new builds, we deliver excellence on every project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-premium group">
                <div className="p-8">
                  <div className="bg-gold/10 rounded-xl p-4 w-fit mb-6 group-hover:bg-gold transition-colors">
                    <service.icon className="h-10 w-10 text-gold group-hover:text-navy transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link
                    href={service.link}
                    className="inline-flex items-center text-gold hover:text-gold-600 font-semibold transition-colors touch-friendly"
                  >
                    Learn More <ChevronRight className="ml-1 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary inline-flex items-center">
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Recent <span className="text-gold">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Showcasing our finest work across Portsmouth and Hampshire
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-gold text-navy text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-gray-300">{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects" className="btn-primary inline-flex items-center">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
                Why Choose <span className="text-gold">Empire Contractors?</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                With over 14 years of experience in Portsmouth, we understand the local market,
                regulations, and what it takes to deliver exceptional results.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Local Expertise", desc: "Deep knowledge of Portsmouth planning and building regulations" },
                  { title: "HMO Specialists", desc: "Leaders in HMO conversions with full compliance expertise" },
                  { title: "Quality Guaranteed", desc: "FMB member with ISO-ready quality management systems" },
                  { title: "Transparent Pricing", desc: "Detailed quotes with no hidden costs or surprises" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gold rounded-full p-2 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-lg">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                alt="Empire Contractors Team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-navy rounded-xl p-6 shadow-xl hidden sm:block">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-10 w-10 text-gold" />
                  <div>
                    <p className="text-white font-semibold">Proudly Serving</p>
                    <p className="text-gold text-xl font-bold">Portsmouth & Hampshire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Client <span className="text-gold">Testimonials</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hear from our satisfied clients across Portsmouth
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card-premium p-8 sm:p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-gold fill-current" />
                ))}
              </div>
              <blockquote className="text-xl sm:text-2xl text-navy text-center mb-8 italic">
                &quot;{testimonials[activeTestimonial].text}&quot;
              </blockquote>
              <div className="text-center">
                <p className="font-bold text-navy text-lg">{testimonials[activeTestimonial].author}</p>
                <p className="text-gold">{testimonials[activeTestimonial].role}</p>
                <p className="text-gray-500 text-sm">{testimonials[activeTestimonial].location}</p>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-colors touch-friendly ${
                    index === activeTestimonial ? 'bg-gold' : 'bg-gray-300 hover:bg-gold/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your <span className="text-gold">Project?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Get in touch today for a free consultation and quote. Let&apos;s build something great together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="btn-primary text-lg flex items-center justify-center">
                Request a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="tel:02392123456" className="btn-secondary text-lg flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                Call 023 9212 3456
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
