"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Tag, Search, Filter } from "lucide-react";

interface NewsPost {
  id: string;
  originalText: string;
  enhancedText: string;
  hashtags: string[];
  imageUrl: string | null;
  status: "draft" | "published";
  createdAt: string;
}

const defaultPosts: NewsPost[] = [
  {
    id: "demo1",
    originalText: "Structural steel complete on Eastney Road project",
    enhancedText: "⚙️ Structural Progress Update\n\nStructural steel complete on Eastney Road project\n\nOur structural steel installation is now complete, marking a significant milestone in this project. The precision engineering and expert installation by our team ensures the building will stand strong for generations to come.\n\n🏗️ Empire Contractors - Building Excellence Across Portsmouth",
    hashtags: ["#StructuralSteel", "#ConstructionProgress", "#PortsmouthBuilders", "#EmpireContractors"],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    status: "published",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo2",
    originalText: "HMO conversion completed in Southsea",
    enhancedText: "🏠 HMO Conversion Update\n\nHMO conversion completed in Southsea\n\nTransforming Portsmouth properties into high-quality HMO accommodation. Our team ensures full compliance with local regulations while delivering exceptional living spaces.\n\n✅ FMB Member | ISO Ready | PICMS Compliant",
    hashtags: ["#HMOConversion", "#PortsmouthProperty", "#PropertyInvestment", "#EmpireContractors"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    status: "published",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo3",
    originalText: "New extension project starting in Milton",
    enhancedText: "✅ Project Kickoff\n\nNew extension project starting in Milton\n\nExciting times as we begin another residential extension project. Our team is on-site and ready to transform this family home with a beautiful double-storey rear extension.\n\n📞 Ready for your next project? Contact us for a free quote.",
    hashtags: ["#Extensions", "#MiltonPortsmouth", "#HomeImprovements", "#EmpireContractors"],
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    status: "published",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default function NewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('empireNewsPosts');
      if (stored) {
        const storedPosts = JSON.parse(stored);
        setPosts([...storedPosts, ...defaultPosts]);
      } else {
        setPosts(defaultPosts);
      }
    }
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(p => p.hashtags)));

  const filteredPosts = posts.filter(post => {
    if (post.status !== "published") return false;
    if (searchTerm && !post.enhancedText.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedTag && !post.hashtags.includes(selectedTag)) return false;
    return true;
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            News & <span className="text-gold">Updates</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay up to date with our latest projects, company news, and construction insights from Portsmouth.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedTag
                  ? 'bg-gold text-navy'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-gold text-navy'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {tag.replace('#', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                {post.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(post.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <p className="text-navy font-medium line-clamp-4 whitespace-pre-wrap">
                    {post.enhancedText.split('\n').slice(0, 3).join('\n')}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.hashtags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gold/10 text-gold-600 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Filter className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">No news found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Start Your Own <span className="text-gold">Project?</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get in touch with our team today for a free consultation and quote.
          </p>
          <Link href="/quote" className="btn-primary inline-flex items-center">
            Request a Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
