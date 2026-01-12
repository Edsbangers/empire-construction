"use client";

import { useState } from "react";
import {
  Building2,
  Home,
  Hammer,
  Wrench,
  Store,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Send
} from "lucide-react";

const projectTypes = [
  { id: "extension", label: "Extension", icon: Home, desc: "Single/double storey, rear or side extensions" },
  { id: "hmo", label: "HMO Conversion", icon: Building2, desc: "Property conversion to multiple occupancy" },
  { id: "newbuild", label: "New Build", icon: Hammer, desc: "Complete new residential or commercial build" },
  { id: "renovation", label: "Renovation", icon: Wrench, desc: "Modernisation, structural changes, refurbishment" },
  { id: "commercial", label: "Commercial", icon: Store, desc: "Office, retail, hospitality fit-outs" }
];

const budgetRanges = [
  "Under £50,000",
  "£50,000 - £100,000",
  "£100,000 - £250,000",
  "£250,000 - £500,000",
  "£500,000+",
  "Not sure yet"
];

const timelines = [
  "ASAP",
  "Within 3 months",
  "3-6 months",
  "6-12 months",
  "Just exploring options"
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    address: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    preferredContact: "email"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleProjectSelect = (type: string) => {
    setFormData({ ...formData, projectType: type });
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store in localStorage for demo
    if (typeof window !== 'undefined') {
      const quotes = JSON.parse(localStorage.getItem('empireQuotes') || '[]');
      quotes.push({ ...formData, id: Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('empireQuotes', JSON.stringify(quotes));
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-navy mb-4">Quote Request Received!</h1>
            <p className="text-gray-600 text-lg mb-8">
              Thank you for your interest in Empire Contractors. One of our project managers
              will be in touch within 24 hours to discuss your requirements.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
              <h3 className="font-semibold text-navy mb-4">Your Request Summary:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Project Type:</span> <span className="font-medium">{projectTypes.find(p => p.id === formData.projectType)?.label}</span></p>
                <p><span className="text-gray-500">Budget:</span> <span className="font-medium">{formData.budget}</span></p>
                <p><span className="text-gray-500">Timeline:</span> <span className="font-medium">{formData.timeline}</span></p>
                <p><span className="text-gray-500">Location:</span> <span className="font-medium">{formData.address}</span></p>
              </div>
            </div>
            <a href="/" className="btn-primary inline-flex items-center">
              Return to Home <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Request a <span className="text-gold">Free Quote</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll provide a detailed, no-obligation quote within 24 hours.
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-gold text-navy' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle className="h-6 w-6" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-gold' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2 text-sm">
          <span className={`px-4 ${step === 1 ? 'text-gold font-semibold' : 'text-gray-500'}`}>Project Type</span>
          <span className={`px-4 ${step === 2 ? 'text-gold font-semibold' : 'text-gray-500'}`}>Details</span>
          <span className={`px-4 ${step === 3 ? 'text-gold font-semibold' : 'text-gray-500'}`}>Contact</span>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Step 1: Project Type */}
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-navy mb-2">What type of project?</h2>
              <p className="text-gray-500 mb-8">Select the option that best describes your project</p>

              <div className="grid md:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleProjectSelect(type.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all touch-friendly ${
                      formData.projectType === type.id
                        ? 'border-gold bg-gold/10'
                        : 'border-gray-200 hover:border-gold'
                    }`}
                  >
                    <type.icon className="h-10 w-10 text-gold mb-4" />
                    <h3 className="text-lg font-bold text-navy">{type.label}</h3>
                    <p className="text-gray-500 text-sm mt-1">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-navy mb-2">Project Details</h2>
              <p className="text-gray-500 mb-8">Help us understand your requirements better</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Budget Range</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {budgetRanges.map((budget) => (
                      <button
                        key={budget}
                        onClick={() => setFormData({ ...formData, budget })}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors touch-friendly ${
                          formData.budget === budget
                            ? 'border-gold bg-gold/10 text-navy'
                            : 'border-gray-200 text-gray-600 hover:border-gold'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">When do you want to start?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timelines.map((timeline) => (
                      <button
                        key={timeline}
                        onClick={() => setFormData({ ...formData, timeline })}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors touch-friendly ${
                          formData.timeline === timeline
                            ? 'border-gold bg-gold/10 text-navy'
                            : 'border-gray-200 text-gray-600 hover:border-gold'
                        }`}
                      >
                        {timeline}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Property Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter the property address in Portsmouth"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold touch-friendly"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Project Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us more about what you're looking to achieve..."
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!formData.budget || !formData.timeline || !formData.address}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ArrowRight className="ml-2 h-5 w-5 inline" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="p-8">
              <h2 className="text-2xl font-bold text-navy mb-2">Contact Details</h2>
              <p className="text-gray-500 mb-8">How can we reach you with your quote?</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold touch-friendly"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold touch-friendly"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07xxx xxxxxx"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold touch-friendly"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">Preferred Contact Method</label>
                  <div className="flex space-x-4">
                    {[
                      { id: "email", label: "Email", icon: Mail },
                      { id: "phone", label: "Phone", icon: Phone }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: method.id })}
                        className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center space-x-2 transition-colors touch-friendly ${
                          formData.preferredContact === method.id
                            ? 'border-gold bg-gold/10 text-navy'
                            : 'border-gray-200 text-gray-600 hover:border-gold'
                        }`}
                      >
                        <method.icon className="h-5 w-5" />
                        <span>{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        Submit Request <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Phone className="h-10 w-10 text-gold mx-auto mb-4" />
            <h3 className="font-bold text-navy mb-2">Call Us</h3>
            <a href="tel:02392123456" className="text-gray-600 hover:text-gold">023 9212 3456</a>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Mail className="h-10 w-10 text-gold mx-auto mb-4" />
            <h3 className="font-bold text-navy mb-2">Email Us</h3>
            <a href="mailto:quotes@empirecontractors.co.uk" className="text-gray-600 hover:text-gold">quotes@empirecontractors.co.uk</a>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <MapPin className="h-10 w-10 text-gold mx-auto mb-4" />
            <h3 className="font-bold text-navy mb-2">Visit Us</h3>
            <p className="text-gray-600">123 Commercial Road, Portsmouth</p>
          </div>
        </div>
      </div>
    </div>
  );
}
