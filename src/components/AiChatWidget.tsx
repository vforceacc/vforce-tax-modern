'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, MessageSquare, Send, Bot, CheckCircle2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface ChatButton {
  label: string;
  url: string;
  type: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  buttons?: ChatButton[];
  bookingData?: {
    action: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
  };
}

const AiChatWidget = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hey! 👋 I'm Vee. I can answer any BAS, bookkeeping, or general tax questions you might have to help prepare you for a consultation! What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic intro based on current page
  useEffect(() => {
    setMessages(prev => {
      // Only change intro if user hasn't interacted yet
      if (prev.length > 1) return prev;

      let introText = "Hey! 👋 I'm Vee. I can answer any BAS, bookkeeping, or general tax questions you might have to help prepare you for a consultation! What's on your mind?";
      
      if (pathname.includes('/news/2026-27-tax-reform')) {
        introText = "Hi there! 👋 Reading up on the new 2026-27 Budget? Let me know if you want to know how the changes to CGT or negative gearing might affect you directly.";
      } else if (pathname.includes('/news')) {
        introText = "Hey! 👋 Looking for the latest tax updates? Let me know if you want a summary of recent changes or have a specific tax question.";
      } else if (pathname.includes('/individual-tax')) {
        introText = "Hey! 👋 Need help with your personal tax return or maximising your deductions? Ask away!";
      } else if (pathname.includes('/business-tax')) {
        introText = "Hi! 👋 Running a business comes with a lot of tax obligations. Need help with BAS, GST, or corporate tax strategies?";
      } else if (pathname.includes('/business-services')) {
        introText = "Hey! 👋 Looking to streamline your bookkeeping, payroll, or need business advisory? Let me know what you need help with.";
      } else if (pathname.includes('/contact')) {
        introText = "Hey! 👋 Ready to book a session? You can ask me to help schedule it or just send me your contact details to pass on to the team.";
      } else if (pathname.includes('/about')) {
        introText = "Hi! 👋 We're proud of our Townsville roots. Want to know more about our CPA qualifications or our approach to tax?";
      }

      return [{ role: 'model', text: introText }];
    });
  }, [pathname]);

  // 30-second notification badge (instead of auto-opening, which is intrusive on mobile)
  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('chatNotificationDismissed');
      if (!dismissed && !isOpen) {
        setShowNotification(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = useCallback(async (url: string, options: RequestInit, retries = 5): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, options);
        if (res.ok) return res;
        if (res.status === 429) {
          if (i === retries - 1) {
            throw new Error("RATE_LIMITED");
          }
          await delay(Math.pow(2, i) * 1000);
          continue;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      } catch (e: any) {
        if (e.message === "RATE_LIMITED") throw e;
        if (i === retries - 1) throw e;
        await delay(Math.pow(2, i) * 1000);
      }
    }
    throw new Error('Max retries exceeded');
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Call our own API route which proxies to Gemini & handles HubSpot
      const response = await fetchWithRetry('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, pathname })
      });

      if (!response.ok) {
        console.error('[AiChatWidget] API error status:', response.status);
        throw new Error('Chat API error');
      }

      const data = await response.json();
      let replyText: string = data.reply || "Sorry, I'm experiencing a technical issue. Please call us on 07 3473 5556.";
      const actionButtons = data.buttons || [];
      const bookingData = data.bookingData || null;

      // Check for lead capture trigger from the new CRM logic
      if (data.hubspotId) {
        setLeadCaptured(true);
      }

      setMessages([...newMessages, { role: 'model', text: replyText, buttons: actionButtons, bookingData }]);
    } catch (err: any) {
      if (err.message === "RATE_LIMITED") {
        setMessages([
          ...newMessages,
          { 
            role: 'model', 
            text: "Whoa, hold your horses! 🐎 We've received a heap of questions lately and hit a brief speed limit to protect the server. Please wait a tick or give our Townsville office a buzz on 07 3473 5556!" 
          }
        ]);
      } else {
        setMessages([
          ...newMessages, 
          { 
            role: 'model', 
            text: "Sorry, the network is playing up. Please call our Townsville office directly on 07 3473 5556." 
          }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavClick = (url: string) => {
    router.push(url);
    setMessages(prev => [
      ...prev,
      { role: 'model', text: "Have a read through and come back if you've got questions! 😊" }
    ]);
  };

  const toggleChat = () => {
    setIsOpen(prev => {
      const next = !prev;
      if (!next) sessionStorage.setItem('chatClosedByUser', 'true');
      return next;
    });
    // Dismiss the notification badge when user opens chat
    if (!isOpen) {
      setShowNotification(false);
      sessionStorage.setItem('chatNotificationDismissed', 'true');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white border border-vforce-border rounded-2xl w-80 sm:w-96 h-[500px] mb-4 shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-vforce-navy p-4 flex justify-between items-center border-b border-vforce-border">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-vforce-emerald/20 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-5 h-5 text-vforce-emerald" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-widest uppercase">VForce Assistant</h3>
                <p className="text-[10px] text-vforce-emerald font-bold">Online</p>
              </div>
            </div>
            <button onClick={() => { setIsOpen(false); sessionStorage.setItem('chatClosedByUser', 'true'); }} className="text-gray-300 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-vforce-primary">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'model' && (
                  <div className="w-6 h-6 bg-vforce-navy rounded-full flex items-center justify-center mr-2 shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`flex flex-col max-w-[80%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl text-sm ${
                    m.role === 'user'
                      ? 'bg-vforce-emerald text-white font-medium rounded-tr-sm'
                      : 'bg-vforce-secondary text-vforce-charcoal border border-vforce-border rounded-tl-sm'
                  }`}>
                    {m.text}
                  </div>
                  
                  {/* Render Action Buttons if any */}
                  {m.buttons && m.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.buttons.map((btn, btnIdx) => (
                        btn.type === 'nav' ? (
                          <button
                            key={btnIdx}
                            onClick={() => handleNavClick(btn.url)}
                            className="bg-transparent text-vforce-navy text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all border border-vforce-border hover:bg-vforce-secondary"
                          >
                            {btn.label}
                          </button>
                        ) : (
                          <a
                            key={btnIdx}
                            href={btn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-vforce-navy-blue text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all hover:bg-vforce-navy shadow-sm"
                          >
                            {btn.label}
                          </a>
                        )
                      ))}
                    </div>
                  )}
                  {/* Render Booking CTA if OPEN_BOOKING signal received */}
                  {m.bookingData && m.bookingData.action === 'OPEN_BOOKING' && (
                    <div className="mt-3">
                      <button 
                        onClick={() => router.push('/booking')}
                        className="bg-vforce-emerald text-white text-[12px] font-black uppercase tracking-wider px-5 py-3 rounded-xl transition-all hover:bg-emerald-600 shadow-md w-full text-center flex justify-center items-center gap-2"
                      >
                        Book Your Free Consultation →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 bg-vforce-navy rounded-full flex items-center justify-center mr-2">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-vforce-secondary p-3 rounded-2xl rounded-tl-sm border border-vforce-border flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            {leadCaptured && (
              <div className="bg-vforce-emerald/10 border border-vforce-emerald/30 rounded-xl p-3 flex items-center">
                <CheckCircle2 className="w-5 h-5 text-vforce-emerald mr-2 shrink-0" />
                <p className="text-[11px] text-vforce-emerald font-bold">Your details have been securely sent to our CRM. A Townsville accountant will be in touch.</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-vforce-border">
            <div className="flex items-center bg-vforce-secondary rounded-xl border border-vforce-border p-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a tax question..."
                className="flex-1 bg-transparent border-none text-vforce-charcoal text-sm px-3 focus:outline-none placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-vforce-navy-blue text-white p-2 rounded-lg disabled:opacity-50 hover:bg-vforce-navy transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="w-16 h-16 bg-vforce-navy-blue hover:bg-vforce-navy rounded-full shadow-lg flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 group relative overflow-hidden"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {/* Pulsing ring */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-4 border-vforce-navy-blue animate-ping opacity-20"></div>
        )}
        
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-7 h-7 text-white fill-current" />
            {/* Static white dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-vforce-navy-blue"></div>
            {/* Red notification badge - appears after 30s */}
            {showNotification && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                <span className="text-white text-[9px] font-black leading-none">1</span>
              </div>
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default AiChatWidget;
