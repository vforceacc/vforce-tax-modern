'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, MessageSquare, Send, Bot, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const AiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "G'day! I'm the VForce Tax assistant. How can I help you or your business in Townsville today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          await delay(Math.pow(2, i) * 1000);
          continue;
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      } catch (e) {
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
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        console.error('[AiChatWidget] API error status:', response.status);
        throw new Error('Chat API error');
      }

      const data = await response.json();
      let replyText: string = data.reply || "Sorry, I'm experiencing a technical issue. Please call us on 07 3473 5556.";

      // Check for lead capture trigger
      if (replyText.includes('[LEAD_CAPTURED]')) {
        replyText = replyText.replace('[LEAD_CAPTURED]', '').trim();
        setLeadCaptured(true);
      }

      setMessages([...newMessages, { role: 'model', text: replyText }]);
    } catch {
      setMessages([...newMessages, { role: 'model', text: "Sorry, the network is playing up. Please call our Townsville office directly on 07 3473 5556." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#0f1629] border border-white/10 rounded-2xl w-80 sm:w-96 h-[500px] mb-4 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-[#1a233a] p-4 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#39d237]/10 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-5 h-5 text-[#39d237]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-widest uppercase">VForce Assistant</h3>
                <p className="text-[10px] text-[#39d237] font-bold">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'model' && (
                  <div className="w-6 h-6 bg-[#39d237] rounded-full flex items-center justify-center mr-2 shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[#0a0f1e]" />
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                  m.role === 'user'
                    ? 'bg-[#39d237] text-[#0a0f1e] font-medium rounded-tr-sm'
                    : 'bg-[#1a233a] text-slate-200 border border-white/5 rounded-tl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 bg-[#39d237] rounded-full flex items-center justify-center mr-2">
                  <Bot className="w-4 h-4 text-[#0a0f1e]" />
                </div>
                <div className="bg-[#1a233a] p-3 rounded-2xl rounded-tl-sm border border-white/5 flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            {leadCaptured && (
              <div className="bg-[#39d237]/10 border border-[#39d237]/30 rounded-xl p-3 flex items-center">
                <CheckCircle2 className="w-5 h-5 text-[#39d237] mr-2 shrink-0" />
                <p className="text-[11px] text-[#39d237] font-bold">Your details have been securely sent to our CRM. A Townsville accountant will be in touch.</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#1a233a] border-t border-white/5">
            <div className="flex items-center bg-[#0a0f1e] rounded-xl border border-white/10 p-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a tax question..."
                className="flex-1 bg-transparent border-none text-white text-sm px-3 focus:outline-none placeholder:text-slate-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#39d237] text-[#0a0f1e] p-2 rounded-lg disabled:opacity-50 hover:bg-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#39d237] hover:bg-white rounded-full shadow-[0_0_25px_rgba(57,210,55,0.5)] flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 group relative overflow-hidden"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {/* Pulsing ring */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-4 border-[#39d237] animate-ping opacity-20"></div>
        )}
        
        {isOpen ? (
          <X className="w-7 h-7 text-[#0a0f1e]" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-7 h-7 text-[#0a0f1e] fill-current" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-[#39d237]"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default AiChatWidget;
