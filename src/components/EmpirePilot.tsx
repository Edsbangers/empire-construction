"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  HardHat,
  Building2,
  FileText,
  ChevronRight,
  Shield
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  leadData?: LeadData;
}

interface LeadData {
  projectType?: string;
  location?: string;
  budget?: string;
  timeline?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  status?: "qualifying" | "qualified" | "submitted";
}

const quickActions = [
  { label: "Get a Quote", icon: FileText, action: "quote" },
  { label: "HMO Info", icon: Building2, action: "hmo" },
  { label: "Planning Help", icon: HardHat, action: "planning" },
  { label: "Our Credentials", icon: Shield, action: "credentials" }
];

const faqs: Record<string, string> = {
  hmo: `**HMO Conversions in Portsmouth**

We specialise in converting properties into Houses in Multiple Occupation (HMOs). Here's what you need to know:

**Planning Permission:**
- Article 4 Direction applies in many Portsmouth areas
- Planning permission typically required for 3+ unrelated occupants
- We handle all applications for you

**Building Regulations:**
- Fire safety (30-min fire doors, detection systems)
- Room sizes (minimum 6.51m² for single, 10.22m² for double)
- Kitchen/bathroom ratios
- Sound insulation between units

**Our HMO Services:**
- Feasibility studies
- Full design and planning
- Building regs compliance
- Complete construction

Would you like a free feasibility assessment for your property?`,

  planning: `**Planning Permission in Portsmouth**

**Do I need planning permission?**
- Extensions under 3m (semi) or 4m (detached) usually Permitted Development
- Loft conversions within 40m³ often PD
- HMO conversions almost always need full planning in Portsmouth

**Our Planning Services:**
- Pre-application advice
- Full application submission
- Liaison with Portsmouth City Council
- Appeals if required

**Typical Timescales:**
- Householder applications: 8 weeks
- Full applications: 13 weeks
- Pre-application responses: 4-6 weeks

We have a 94% first-time approval rate with Portsmouth Council!

Would you like us to check if your project needs planning permission?`,

  credentials: `**Our Credentials & Compliance**

**Industry Memberships:**
- Federation of Master Builders (FMB) Member
- TrustMark Registered
- Constructionline Approved

**Quality Standards:**
- ISO 9001 Quality Management Ready
- ISO 45001 Health & Safety Ready
- PICMS (SHEQ) Compliant

**Insurance:**
- £10M Public Liability
- £5M Professional Indemnity
- Contractor All Risks

**What This Means for You:**
- Guaranteed quality workmanship
- Comprehensive warranties
- Health & Safety excellence
- Financial protection

View our full compliance documentation at any time. Would you like more details on any certification?`,

  quote: `**Request a Quote**

I'd love to help you get a quote! To provide an accurate estimate, I'll need to ask a few quick questions.

First, what type of project are you planning?

1. **Extension** (single/double storey, rear/side)
2. **HMO Conversion** (property to multiple occupancy)
3. **New Build** (residential or commercial)
4. **Renovation** (modernisation, structural changes)
5. **Commercial Fit-out** (office, retail, hospitality)

Just type the number or tell me more about your project!`
};

// Store messages in localStorage for admin access
const saveConversation = (messages: Message[], sessionId: string) => {
  if (typeof window !== 'undefined') {
    const conversations = JSON.parse(localStorage.getItem('empirePilotConversations') || '{}');
    conversations[sessionId] = {
      messages,
      lastUpdated: new Date().toISOString(),
      status: messages.some(m => m.leadData?.status === 'qualified') ? 'qualified' : 'active'
    };
    localStorage.setItem('empirePilotConversations', JSON.stringify(conversations));
  }
};

export default function EmpirePilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      saveConversation(messages, sessionId);
    }
  }, [messages, sessionId]);

  const addMessage = (role: "user" | "assistant", content: string, leadUpdate?: Partial<LeadData>) => {
    const newLeadData = leadUpdate ? { ...leadData, ...leadUpdate } : leadData;
    if (leadUpdate) setLeadData(newLeadData);

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
      leadData: role === "user" ? newLeadData : undefined
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const simulateTyping = async (response: string, leadUpdate?: Partial<LeadData>) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    setIsTyping(false);
    addMessage("assistant", response, leadUpdate);
  };

  const processUserInput = async (userInput: string) => {
    const lowerInput = userInput.toLowerCase();

    // Lead qualification flow
    if (leadData.status === "qualifying") {
      // Check for project type
      if (!leadData.projectType) {
        let projectType = "";
        if (lowerInput.includes("1") || lowerInput.includes("extension")) projectType = "Extension";
        else if (lowerInput.includes("2") || lowerInput.includes("hmo")) projectType = "HMO Conversion";
        else if (lowerInput.includes("3") || lowerInput.includes("new build")) projectType = "New Build";
        else if (lowerInput.includes("4") || lowerInput.includes("renovation")) projectType = "Renovation";
        else if (lowerInput.includes("5") || lowerInput.includes("commercial")) projectType = "Commercial";

        if (projectType) {
          await simulateTyping(
            `Great! A **${projectType}** project. Where is the property located? (e.g., Southsea, Eastney, Milton, Fratton, or another Portsmouth area)`,
            { projectType }
          );
          return;
        }
      }

      // Check for location
      if (leadData.projectType && !leadData.location) {
        const portsmouthAreas = ["southsea", "eastney", "milton", "fratton", "copnor", "hilsea", "cosham", "portsmouth", "gunwharf", "old portsmouth"];
        const foundArea = portsmouthAreas.find(area => lowerInput.includes(area));

        if (foundArea || lowerInput.length > 2) {
          const location = foundArea ? foundArea.charAt(0).toUpperCase() + foundArea.slice(1) : userInput;
          await simulateTyping(
            `Perfect, **${location}** - we know that area well! What's your approximate budget for this project?\n\n1. Under £50,000\n2. £50,000 - £100,000\n3. £100,000 - £250,000\n4. £250,000+\n5. Not sure yet`,
            { location }
          );
          return;
        }
      }

      // Check for budget
      if (leadData.location && !leadData.budget) {
        let budget = "";
        if (lowerInput.includes("1") || lowerInput.includes("under") || lowerInput.includes("50")) budget = "Under £50,000";
        else if (lowerInput.includes("2") || lowerInput.includes("100")) budget = "£50,000 - £100,000";
        else if (lowerInput.includes("3") || lowerInput.includes("250")) budget = "£100,000 - £250,000";
        else if (lowerInput.includes("4") || lowerInput.includes("over")) budget = "£250,000+";
        else if (lowerInput.includes("5") || lowerInput.includes("not sure")) budget = "To be confirmed";

        if (budget) {
          await simulateTyping(
            `Thanks! When are you looking to start the project?\n\n1. ASAP\n2. Within 3 months\n3. 3-6 months\n4. 6+ months\n5. Just exploring options`,
            { budget }
          );
          return;
        }
      }

      // Check for timeline
      if (leadData.budget && !leadData.timeline) {
        let timeline = "";
        if (lowerInput.includes("1") || lowerInput.includes("asap")) timeline = "ASAP";
        else if (lowerInput.includes("2") || lowerInput.includes("within 3")) timeline = "Within 3 months";
        else if (lowerInput.includes("3") || lowerInput.includes("3-6")) timeline = "3-6 months";
        else if (lowerInput.includes("4") || lowerInput.includes("6+")) timeline = "6+ months";
        else if (lowerInput.includes("5") || lowerInput.includes("exploring")) timeline = "Exploring options";

        if (timeline) {
          await simulateTyping(
            `Excellent! I have all the project details. To send you a personalised quote and have one of our team reach out, could you share your name?`,
            { timeline }
          );
          return;
        }
      }

      // Collect contact details
      if (leadData.timeline && !leadData.contactName) {
        await simulateTyping(
          `Nice to meet you, **${userInput}**! What's the best email address to send your quote to?`,
          { contactName: userInput }
        );
        return;
      }

      if (leadData.contactName && !leadData.contactEmail) {
        if (userInput.includes("@")) {
          await simulateTyping(
            `Great! And what's the best phone number to reach you on? (Or type "skip" if you prefer email only)`,
            { contactEmail: userInput }
          );
          return;
        }
      }

      if (leadData.contactEmail && !leadData.contactPhone) {
        const phone = userInput.toLowerCase() === "skip" ? "Not provided" : userInput;
        const qualifiedLead = { ...leadData, contactPhone: phone, status: "qualified" as const };

        await simulateTyping(
          `**Thank you for your enquiry!** 🏗️

Here's a summary of your project:
- **Type:** ${qualifiedLead.projectType}
- **Location:** ${qualifiedLead.location}
- **Budget:** ${qualifiedLead.budget}
- **Timeline:** ${qualifiedLead.timeline}
- **Contact:** ${qualifiedLead.contactName}

One of our project managers will be in touch within 24 hours to discuss your requirements in detail.

In the meantime, feel free to ask me any questions about building regulations, planning permission, or our services!`,
          qualifiedLead
        );
        return;
      }
    }

    // General conversation handling
    if (lowerInput.includes("hmo") || lowerInput.includes("conversion")) {
      await simulateTyping(faqs.hmo);
    } else if (lowerInput.includes("planning") || lowerInput.includes("permission")) {
      await simulateTyping(faqs.planning);
    } else if (lowerInput.includes("credential") || lowerInput.includes("certified") || lowerInput.includes("iso") || lowerInput.includes("picms")) {
      await simulateTyping(faqs.credentials);
    } else if (lowerInput.includes("quote") || lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("estimate")) {
      await simulateTyping(faqs.quote, { status: "qualifying" });
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      await simulateTyping(
        `Hello! 👋 I'm the **Empire Pilot**, your AI assistant for Empire Contractors Ltd.

I can help you with:
- **Getting a quote** for your construction project
- **HMO conversion** information and regulations
- **Planning permission** guidance for Portsmouth
- Information about our **credentials and compliance**

What would you like to know about?`
      );
    } else {
      await simulateTyping(
        `Thanks for your message! I can help with:

1. **Getting a quote** - Tell me about your project
2. **HMO conversions** - Portsmouth regulations & compliance
3. **Planning permission** - Local requirements & process
4. **Our credentials** - ISO, FMB, PICMS certifications

What would you like to explore?`
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage("user", input);
    const userInput = input;
    setInput("");
    await processUserInput(userInput);
  };

  const handleQuickAction = async (action: string) => {
    addMessage("user", quickActions.find(a => a.action === action)?.label || action);
    await simulateTyping(faqs[action] || faqs.quote, action === "quote" ? { status: "qualifying" } : undefined);
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage("assistant", `Welcome to **Empire Contractors Ltd**! 🏗️

I'm the **Empire Pilot**, your AI construction assistant. I'm here 24/7 to help with:

✅ **Free quotes** for extensions, HMOs & new builds
✅ **Planning permission** guidance for Portsmouth
✅ **Building regulations** information
✅ **PICMS compliance** & SHEQ credentials

How can I help you today?`);
      }, 300);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 bg-gold hover:bg-gold-600 text-navy p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 touch-friendly"
          aria-label="Open Empire Pilot chat"
        >
          <div className="relative">
            <MessageCircle className="h-8 w-8" />
            <span className="absolute -top-1 -right-1 bg-navy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              1
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? "bottom-6 right-6 w-80"
              : "bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-full sm:h-[600px] sm:rounded-2xl"
          }`}
        >
          <div className={`bg-white shadow-2xl flex flex-col ${isMinimized ? "rounded-2xl" : "h-full sm:rounded-2xl"} overflow-hidden border border-gray-200`}>
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gold rounded-full p-2">
                  <HardHat className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Empire Pilot</h3>
                  <p className="text-gold text-sm">AI Construction Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white p-2 touch-friendly"
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  <Minimize2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-2 touch-friendly"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 ${
                          message.role === "user"
                            ? "bg-navy text-white rounded-br-md"
                            : "bg-white text-navy shadow-md border border-gray-100 rounded-bl-md"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.role === "assistant" && (
                            <Bot className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                          )}
                          <div
                            className="text-sm whitespace-pre-wrap prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: message.content
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\n/g, '<br />')
                            }}
                          />
                          {message.role === "user" && (
                            <User className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-navy shadow-md border border-gray-100 rounded-2xl rounded-bl-md p-4">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-5 w-5 text-gold" />
                          <div className="flex space-x-1">
                            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length <= 1 && (
                  <div className="px-4 py-3 border-t border-gray-100 bg-white">
                    <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <button
                          key={action.action}
                          onClick={() => handleQuickAction(action.action)}
                          className="flex items-center space-x-1 bg-gray-100 hover:bg-gold hover:text-navy text-gray-700 px-3 py-2 rounded-full text-sm transition-colors touch-friendly"
                        >
                          <action.icon className="h-4 w-4" />
                          <span>{action.label}</span>
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent touch-friendly"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="bg-gold hover:bg-gold-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-navy p-3 rounded-full transition-colors touch-friendly"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Powered by Empire Pilot AI • <a href="/admin" className="text-gold hover:underline">Admin</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
