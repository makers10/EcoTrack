import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, User, Loader2, Leaf, Globe, Wind } from 'lucide-react';
import api from '../services/api';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
}

export function EcoAdvicePage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: "Hello! Ask me anything about sustainability or eco-friendly alternatives!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/eco/advice', { question: input });
      const botMessage: Message = { id: (Date.now() + 1).toString(), type: 'bot', text: res.data.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), type: 'bot', text: "Error connecting to AI. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-3 max-w-5xl mx-auto space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
         <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
               <Sparkles className="text-primary" size={20} />
               AI Eco Advice
            </h1>
         </div>
         <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
            <span className="flex items-center gap-1"><Globe size={14} /> Global</span>
            <span className="flex items-center gap-1 text-primary"><Wind size={14} /> Realtime</span>
         </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass rounded-xl overflow-hidden flex flex-col min-h-0 bg-white/[0.02]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
           <AnimatePresence mode="popLayout">
              {messages.map((m) => (
                <motion.div 
                   key={m.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`flex gap-3 ${m.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/10 ${m.type === 'bot' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-text-muted'}`}>
                      {m.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                   </div>
                   <div className={`max-w-[85%] p-3 rounded-xl border border-white/5 ${m.type === 'bot' ? 'bg-white/5' : 'bg-primary text-white'}`}>
                      <p className="text-sm whitespace-pre-wrap leading-tight">{m.text}</p>
                   </div>
                </motion.div>
              ))}
           </AnimatePresence>
        </div>

        {/* Action input */}
        <form onSubmit={handleSend} className="p-3 pt-0">
           <div className="relative flex items-center group">
              <input 
                type="text" 
                placeholder="Ask me anything..."
                className="input-field w-full pl-3 pr-12 h-10 text-sm border-white/10"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit" 
                disabled={loading}
                className="absolute right-2 w-8 h-8 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center disabled:opacity-50"
              >
                <Send size={14} />
              </button>
           </div>
        </form>
      </div>

      {/* Suggested Questions */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none m-3">
         {["Plastic Alternatives", "Green Energy", "Composting"].map((suggest) => (
           <button 
             key={suggest}
             onClick={() => setInput(suggest)}
             className="px-3 py-2 bg-white/5 border border-white/5 rounded-lg text-xs font-medium hover:bg-primary/10 hover:border-primary/30 transition-all flex items-center gap-2 whitespace-nowrap"
           >
              <Leaf size={12} className="text-primary" />
              {suggest}
           </button>
         ))}
      </div>
    </div>
  );
}
