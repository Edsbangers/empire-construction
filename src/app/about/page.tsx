"use client";

import Link from "next/link";
import {
  Building2,
  Award,
  Shield,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Target,
  Heart,
  Lightbulb
} from "lucide-react";

const team = [
  {
    name: "James Richardson",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "30+ years in construction, founded Empire Contractors in 2010."
  },
  {
    name: "Sarah Mitchell",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Oversees all project delivery and client relationships."
  },
  {
    name: "David Chen",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Chartered Surveyor specialising in HMO regulations."
  },
  {
    name: "Emma Thompson",
    role: "Health & Safety Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "NEBOSH certified, ensuring PICMS compliance across all sites."
  }
];

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "We never compromise on quality. Every project is built to the highest standards, backed by comprehensive warranties."
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Your vision is our priority. We listen, advise, and deliver construction solutions that exceed expectations."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing modern construction methods and technology to deliver better results, faster and more efficiently."
  },
  {
    icon: Shield,
    title: "Safety Always",
    description: "Zero compromise on health and safety. Our PICMS-compliant SHEQ systems protect everyone on site."
  }
];

const milestones = [
  { year: "2010", title: "Founded in Portsmouth", desc: "Started with a small team of 5 dedicated builders" },
  { year: "2014", title: "FMB Membership", desc: "Achieved Federation of Master Builders accreditation" },
  { year: "2017", title: "100th Project", desc: "Completed our 100th successful construction project" },
  { year: "2019", title: "ISO Ready Status", desc: "Implemented ISO 9001 & 45001 ready quality systems" },
  { year: "2021", title: "HMO Specialists", desc: "Became Portsmouth's leading HMO conversion experts" },
  { year: "2024", title: "500+ Projects", desc: "Celebrated completion of over 500 successful projects" }
];

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="text-gold">Empire Contractors</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Portsmouth&apos;s trusted construction partner since 2010. Building excellence with integrity, quality, and local expertise.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-6">
                Our <span className="text-gold">Story</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Empire Contractors was founded in 2010 by James Richardson, a Portsmouth native with a vision to deliver exceptional construction services to his local community.
              </p>
              <p className="text-gray-600 mb-6">
                What started as a small team of five dedicated builders has grown into one of Portsmouth&apos;s most respected construction companies, with over 50 team members and 500+ completed projects.
              </p>
              <p className="text-gray-600 mb-8">
                Our expertise in HMO conversions has made us the go-to contractor for property investors across Hampshire. We understand Portsmouth&apos;s unique planning requirements and building regulations inside out.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-4xl font-bold text-gold">14+</p>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-4xl font-bold text-gold">500+</p>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                alt="Empire Contractors Team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-gold rounded-xl p-6 shadow-xl hidden sm:block">
                <Building2 className="h-12 w-12 text-navy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Our <span className="text-gold">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gold/10 rounded-xl p-4 w-fit mb-4">
                  <value.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Our <span className="text-gold">Journey</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold/30 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className={`bg-white rounded-xl p-6 shadow-lg inline-block ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <span className="text-gold font-bold text-2xl">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-navy mt-2">{milestone.title}</h3>
                      <p className="text-gray-600 mt-1">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 bg-gold rounded-full items-center justify-center z-10 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-navy" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Meet the <span className="text-gold">Team</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              The experienced professionals behind every successful project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-navy-600 rounded-xl overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-gold mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Accreditations & <span className="text-gold">Compliance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: Shield, title: "ISO 9001 Ready", desc: "Quality Management" },
              { icon: Shield, title: "ISO 45001 Ready", desc: "Health & Safety" },
              { icon: Award, title: "FMB Member", desc: "Federation of Master Builders" },
              { icon: CheckCircle, title: "PICMS", desc: "SHEQ Compliant" },
              { icon: Award, title: "TrustMark", desc: "Registered Business" }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <item.icon className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="font-bold text-navy">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-navy/80 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have trusted Empire Contractors with their construction projects.
          </p>
          <Link href="/quote" className="btn-secondary inline-flex items-center">
            Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
