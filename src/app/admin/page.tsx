"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Building2,
  Camera,
  Send,
  Bot,
  Image as ImageIcon,
  Hash,
  Sparkles,
  Check,
  MessageSquare,
  Users,
  FileText,
  TrendingUp,
  Clock,
  Eye,
  Reply,
  Star,
  AlertCircle,
  Filter,
  Search,
  ChevronRight,
  RefreshCw,
  Download,
  LayoutDashboard,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  Phone,
  Mail,
  Calendar
} from "lucide-react";

interface NewsPost {
  id: string;
  originalText: string;
  enhancedText: string;
  hashtags: string[];
  imageUrl: string | null;
  status: "draft" | "published";
  createdAt: Date;
}

interface ChatConversation {
  id: string;
  messages: ChatMessage[];
  lastUpdated: string;
  status: "active" | "qualified" | "closed";
  leadData?: {
    projectType?: string;
    location?: string;
    budget?: string;
    timeline?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
  };
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  leadData?: Record<string, string>;
}

// Simulated AI enhancement
const enhanceText = (text: string): { enhanced: string; hashtags: string[] } => {
  const enhancedVersions: Record<string, { enhanced: string; hashtags: string[] }> = {
    default: {
      enhanced: `${text}\n\nAnother milestone achieved by our expert team at Empire Contractors. Quality craftsmanship and attention to detail in every project we deliver.`,
      hashtags: ["#EmpireContractors", "#PortsmouthConstruction", "#QualityBuilding", "#FMBMember"]
    }
  };

  // Smart enhancement based on keywords
  const lowerText = text.toLowerCase();

  if (lowerText.includes("steel") || lowerText.includes("structural")) {
    return {
      enhanced: `⚙️ Structural Progress Update\n\n${text}\n\nOur structural steel installation is now complete, marking a significant milestone in this project. The precision engineering and expert installation by our team ensures the building will stand strong for generations to come.\n\n🏗️ Empire Contractors - Building Excellence Across Portsmouth`,
      hashtags: ["#StructuralSteel", "#ConstructionProgress", "#PortsmouthBuilders", "#EmpireContractors", "#QualityCraftsmanship"]
    };
  }

  if (lowerText.includes("hmo") || lowerText.includes("conversion")) {
    return {
      enhanced: `🏠 HMO Conversion Update\n\n${text}\n\nTransforming Portsmouth properties into high-quality HMO accommodation. Our team ensures full compliance with local regulations while delivering exceptional living spaces.\n\n✅ FMB Member | ISO Ready | PICMS Compliant`,
      hashtags: ["#HMOConversion", "#PortsmouthProperty", "#PropertyInvestment", "#EmpireContractors", "#HMOExperts"]
    };
  }

  if (lowerText.includes("finished") || lowerText.includes("complete")) {
    return {
      enhanced: `✅ Project Completion\n\n${text}\n\nAnother successful project delivered on time and to the highest standards. Thank you to our incredible team and valued client for their trust in Empire Contractors.\n\n📞 Ready for your next project? Contact us for a free quote.`,
      hashtags: ["#ProjectComplete", "#EmpireContractors", "#PortsmouthConstruction", "#QualityGuaranteed", "#CustomerSatisfaction"]
    };
  }

  return enhancedVersions.default;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "news" | "chats" | "settings">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // News/Chat-to-Post state
  const [chatInput, setChatInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedPost, setGeneratedPost] = useState<{ enhanced: string; hashtags: string[] } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat logs state
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [chatFilter, setChatFilter] = useState<"all" | "qualified" | "active">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [replyInput, setReplyInput] = useState("");

  // Load conversations from localStorage
  useEffect(() => {
    const loadConversations = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('empirePilotConversations');
        if (stored) {
          const parsed = JSON.parse(stored);
          const convArray: ChatConversation[] = Object.entries(parsed).map(([id, data]: [string, any]) => ({
            id,
            messages: data.messages || [],
            lastUpdated: data.lastUpdated,
            status: data.status || "active",
            leadData: data.messages?.find((m: any) => m.leadData)?.leadData
          }));
          setConversations(convArray.sort((a, b) =>
            new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
          ));
        }
      }
    };

    loadConversations();
    const interval = setInterval(loadConversations, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Load news posts from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('empireNewsPosts');
      if (stored) {
        setNewsPosts(JSON.parse(stored));
      }
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!chatInput.trim()) return;

    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = enhanceText(chatInput);
    setGeneratedPost(result);
    setIsGenerating(false);
  };

  const handlePublish = () => {
    if (!generatedPost) return;

    const newPost: NewsPost = {
      id: `post_${Date.now()}`,
      originalText: chatInput,
      enhancedText: generatedPost.enhanced,
      hashtags: generatedPost.hashtags,
      imageUrl: selectedImage,
      status: "published",
      createdAt: new Date()
    };

    const updatedPosts = [newPost, ...newsPosts];
    setNewsPosts(updatedPosts);

    if (typeof window !== 'undefined') {
      localStorage.setItem('empireNewsPosts', JSON.stringify(updatedPosts));
    }

    // Reset form
    setChatInput("");
    setSelectedImage(null);
    setGeneratedPost(null);
  };

  const filteredConversations = conversations.filter(conv => {
    if (chatFilter !== "all" && conv.status !== chatFilter) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return conv.messages.some(m => m.content.toLowerCase().includes(searchLower)) ||
        conv.leadData?.contactName?.toLowerCase().includes(searchLower) ||
        conv.leadData?.contactEmail?.toLowerCase().includes(searchLower);
    }
    return true;
  });

  const stats = [
    { label: "Total Chats", value: conversations.length, icon: MessageSquare, color: "bg-blue-500" },
    { label: "Qualified Leads", value: conversations.filter(c => c.status === "qualified").length, icon: Star, color: "bg-gold" },
    { label: "Active Now", value: conversations.filter(c => c.status === "active").length, icon: Users, color: "bg-green-500" },
    { label: "News Posts", value: newsPosts.length, icon: Newspaper, color: "bg-purple-500" }
  ];

  const renderSidebar = () => (
    <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-navy transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-navy-400">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gold p-2 rounded-lg">
              <Building2 className="h-8 w-8 text-navy" />
            </div>
            <div>
              <span className="text-white font-bold text-lg">EMPIRE</span>
              <p className="text-gold text-xs">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "news", label: "News Uploader", icon: Newspaper },
            { id: "chats", label: "Chat Logs", icon: MessageSquare },
            { id: "settings", label: "Settings", icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors touch-friendly ${
                activeTab === item.id
                  ? "bg-gold text-navy font-semibold"
                  : "text-gray-300 hover:bg-navy-600 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-navy-400">
          <Link href="/" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-navy-600 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>
        </div>
      </div>
    </aside>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-navy">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-navy flex items-center">
              <Star className="h-5 w-5 text-gold mr-2" />
              Recent Qualified Leads
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {conversations
              .filter(c => c.status === "qualified")
              .slice(0, 5)
              .map((conv) => (
                <div key={conv.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedConversation(conv); setActiveTab("chats"); }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-navy">{conv.leadData?.contactName || "Unknown"}</p>
                      <p className="text-sm text-gray-500">{conv.leadData?.projectType} - {conv.leadData?.location}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            {conversations.filter(c => c.status === "qualified").length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No qualified leads yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-navy flex items-center">
              <Newspaper className="h-5 w-5 text-gold mr-2" />
              Recent News Posts
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {newsPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy line-clamp-2">{post.originalText}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {newsPosts.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No news posts yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsUploader = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Chat-to-Post Interface */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-navy p-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Bot className="h-6 w-6 text-gold mr-3" />
            Agent-Assisted News Uploader
          </h2>
          <p className="text-gray-400 mt-1">Upload a photo and describe your update - the AI will do the rest!</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Site Photo</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-gold transition-colors"
            >
              {selectedImage ? (
                <div className="relative">
                  <img src={selectedImage} alt="Upload preview" className="max-h-64 mx-auto rounded-lg" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Click to upload a site photo</p>
                  <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Describe Your Update</label>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="e.g., Just finished the structural steel on Eastney Road..."
              className="w-full border border-gray-200 rounded-xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none touch-friendly"
              rows={3}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!chatInput.trim() || isGenerating}
            className="w-full btn-primary flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Professional Post
              </>
            )}
          </button>
        </div>

        {/* Generated Preview */}
        {generatedPost && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              Generated Post Preview
            </h3>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              {selectedImage && (
                <img src={selectedImage} alt="Post preview" className="w-full max-h-96 object-cover rounded-lg" />
              )}
              <p className="whitespace-pre-wrap text-navy">{generatedPost.enhanced}</p>
              <div className="flex flex-wrap gap-2">
                {generatedPost.hashtags.map((tag, i) => (
                  <span key={i} className="bg-gold/20 text-gold-600 px-3 py-1 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handlePublish}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                <Check className="h-5 w-5 mr-2" />
                Publish to News Feed
              </button>
              <button
                onClick={() => setGeneratedPost(null)}
                className="btn-secondary"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Posts */}
      {newsPosts.length > 0 && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-navy">Recent Posts</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {newsPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="p-6">
                <div className="flex items-start space-x-4">
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="" className="w-24 h-24 rounded-lg object-cover" />
                  )}
                  <div className="flex-1">
                    <p className="text-navy line-clamp-3">{post.enhancedText}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.hashtags.map((tag, i) => (
                        <span key={i} className="text-gold text-sm">{tag}</span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Posted {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderChatLogs = () => (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Conversations List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <button
              onClick={() => {
                const stored = localStorage.getItem('empirePilotConversations');
                if (stored) {
                  const parsed = JSON.parse(stored);
                  const convArray: ChatConversation[] = Object.entries(parsed).map(([id, data]: [string, any]) => ({
                    id,
                    messages: data.messages || [],
                    lastUpdated: data.lastUpdated,
                    status: data.status || "active",
                    leadData: data.messages?.find((m: any) => m.leadData)?.leadData
                  }));
                  setConversations(convArray);
                }
              }}
              className="p-2 text-gray-400 hover:text-navy"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>

          <div className="flex space-x-2">
            {[
              { id: "all", label: "All" },
              { id: "qualified", label: "Qualified" },
              { id: "active", label: "Active" }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setChatFilter(filter.id as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  chatFilter === filter.id
                    ? "bg-gold text-navy"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`p-4 cursor-pointer transition-colors ${
                selectedConversation?.id === conv.id
                  ? "bg-gold/10 border-l-4 border-gold"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-navy truncate">
                      {conv.leadData?.contactName || `Visitor ${conv.id.slice(-6)}`}
                    </p>
                    {conv.status === "qualified" && (
                      <Star className="h-4 w-4 text-gold flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conv.messages[conv.messages.length - 1]?.content.slice(0, 50)}...
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {new Date(conv.lastUpdated).toLocaleString()}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  conv.status === "qualified"
                    ? "bg-green-100 text-green-700"
                    : conv.status === "active"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {conv.status}
                </span>
              </div>
            </div>
          ))}

          {filteredConversations.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Conversation Detail */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-navy text-lg">
                    {selectedConversation.leadData?.contactName || `Visitor ${selectedConversation.id.slice(-6)}`}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    {selectedConversation.leadData?.contactEmail && (
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {selectedConversation.leadData.contactEmail}
                      </span>
                    )}
                    {selectedConversation.leadData?.contactPhone && selectedConversation.leadData.contactPhone !== "Not provided" && (
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {selectedConversation.leadData.contactPhone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedConversation.status === "qualified" && selectedConversation.leadData && (
                    <button className="btn-primary text-sm flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Export Lead
                    </button>
                  )}
                </div>
              </div>

              {/* Lead Summary */}
              {selectedConversation.leadData?.projectType && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500">Project Type</p>
                    <p className="font-semibold text-navy">{selectedConversation.leadData.projectType}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-navy">{selectedConversation.leadData.location || "—"}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-semibold text-navy">{selectedConversation.leadData.budget || "—"}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500">Timeline</p>
                    <p className="font-semibold text-navy">{selectedConversation.leadData.timeline || "—"}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-navy text-white rounded-br-md"
                        : "bg-white text-navy shadow-md border border-gray-100 rounded-bl-md"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === "assistant" && (
                        <Bot className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p
                          className="text-sm whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{
                            __html: message.content
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\n/g, '<br />')
                          }}
                        />
                        <p className={`text-xs mt-2 ${message.role === "user" ? "text-gray-300" : "text-gray-400"}`}>
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Send a follow-up message..."
                  className="flex-1 border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button className="btn-primary p-3 rounded-full">
                  <Reply className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Note: Manual replies will be sent via email to the customer
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Eye className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Select a conversation to view</p>
              <p className="text-sm text-gray-400 mt-1">Click on a chat from the list to see details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-navy mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Company Name</label>
            <input
              type="text"
              defaultValue="Empire Contractors Ltd"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">Contact Email</label>
            <input
              type="email"
              defaultValue="info@empirecontractors.co.uk"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">Contact Phone</label>
            <input
              type="tel"
              defaultValue="023 9212 3456"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-navy">Empire Pilot AI</p>
              <p className="text-sm text-gray-500">Enable AI chat assistant on website</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>

          <button className="w-full btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-0">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-navy z-50 px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-2">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <span className="text-white font-bold">Empire Admin</span>
        <div className="w-10" />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {renderSidebar()}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 mt-14 lg:mt-0 min-h-screen">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-navy">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "news" && "News Uploader"}
              {activeTab === "chats" && "Chat Logs"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === "dashboard" && "Overview of your website activity"}
              {activeTab === "news" && "Create and publish news updates with AI assistance"}
              {activeTab === "chats" && "View and respond to Empire Pilot conversations"}
              {activeTab === "settings" && "Manage your admin portal settings"}
            </p>
          </div>

          {/* Content */}
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "news" && renderNewsUploader()}
          {activeTab === "chats" && renderChatLogs()}
          {activeTab === "settings" && renderSettings()}
        </main>
      </div>
    </div>
  );
}
