import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Trash2, 
  ThumbsUp, 
  ThumbsDown,
  RefreshCcw,
  Zap
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { toast } from 'sonner';

type Msg = { 
  role: "user" | "bot"; 
  text: string;
  timestamp: string;
};

const SUGGESTED_PROMPTS = [
  "How can I recycle a broken laptop?",
  "What is ReLink's reward system?",
  "Find a recycler near me",
  "Calculate my CO2 offset"
];

const Assistant = () => {
  const [msgs, setMsgs] = useState<Msg[]>([
    { 
      role: "bot", 
      text: "Hello! I'm ReLink AI, your personal sustainability assistant. I can help you schedule pickups, explain the recycling process, or calculate your environmental impact. How can I assist you today? 🌱",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [val, setVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, isTyping]);

  const simulateLLMResponse = (userQuery: string) => {
    setIsTyping(true);
    
    // Simple logic for simulation
    let response = "That's a great question! I'm currently in demo mode, but once connected to our LLM backend, I'll be able to give you precise instructions. For now, did you know that recycling one laptop saves enough energy to power a home for 300+ days?";
    
    if (userQuery.toLowerCase().includes("laptop")) {
      response = "To recycle a laptop: 1. Backup your data. 2. Perform a factory reset. 3. Schedule a pickup via our 'Schedule' tab. We'll ensure it's processed by a certified recycler!";
    } else if (userQuery.toLowerCase().includes("reward")) {
      response = "You earn ReLink points based on the weight and type of e-waste. Laptops usually give 300-500 points, while smartphones give 100-200. You can redeem them in the 'Rewards' section!";
    } else if (userQuery.toLowerCase().includes("offset")) {
      response = "Your current CO2 offset is 1.2 tons! This is equivalent to planting about 20 trees. Great job! 🌍";
    }

    setTimeout(() => {
      const botMsg: Msg = { 
        role: "bot", 
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMsgs((m) => [...m, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const send = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!val.trim()) return;
    
    const userMsg: Msg = { 
      role: "user", 
      text: val,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMsgs((m) => [...m, userMsg]);
    const currentVal = val;
    setVal("");
    simulateLLMResponse(currentVal);
  };

  const clearChat = () => {
    setMsgs([msgs[0]]);
    toast.info("Chat history cleared");
  };

  const sidebarItems = [
    { label: 'Dashboard', icon: <Zap className="w-5 h-5" />, href: '/dashboard' },
    { label: 'My Pickups', icon: <User className="w-5 h-5" />, href: '/dashboard/pickups' },
    { label: 'AI Assistant', icon: <Sparkles className="w-5 h-5" />, href: '/dashboard/assistant' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="user">
      <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ReLink AI</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-xs text-emerald-400 font-medium">Online & Ready</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearChat} className="text-slate-400 hover:text-red-400">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <div className="flex-1 glass rounded-3xl border border-slate-800 flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          
          <ScrollArea className="flex-1 p-6" viewportRef={scrollRef}>
            <div className="space-y-6">
              <AnimatePresence>
                {msgs.map((m, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                      m.role === "bot" ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                    }`}>
                      {m.role === "bot" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    
                    <div className={`space-y-2 max-w-[80%] ${m.role === "user" ? "items-end" : ""}`}>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user" 
                        ? "bg-emerald-600 text-white rounded-tr-none" 
                        : "bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-none backdrop-blur-sm"
                      }`}>
                        {m.text}
                      </div>
                      <div className={`flex items-center gap-3 px-1 ${m.role === "user" ? "justify-end" : ""}`}>
                        <span className="text-[10px] text-slate-500 font-medium">{m.timestamp}</span>
                        {m.role === "bot" && (
                          <div className="flex gap-2">
                            <button className="text-slate-600 hover:text-slate-400 transition-colors"><ThumbsUp className="w-3 h-3" /></button>
                            <button className="text-slate-600 hover:text-slate-400 transition-colors"><ThumbsDown className="w-3 h-3" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-slate-800/80 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center border border-slate-700/50">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          <div className="p-6 bg-slate-950/50 border-t border-slate-800 backdrop-blur-xl">
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => { setVal(prompt); }}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            
            <form onSubmit={send} className="flex gap-3 relative">
              <Input 
                value={val} 
                onChange={(e)=>setVal(e.target.value)} 
                placeholder="Ask about recycling, rewards, or pickups..." 
                className="bg-slate-900 border-slate-700 h-12 pr-12 focus:ring-emerald-500"
              />
              <Button 
                type="submit" 
                disabled={!val.trim() || isTyping}
                className="absolute right-1 top-1 h-10 w-10 p-0 bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-lg shadow-emerald-500/20"
              >
                <Send className="h-4 w-4 text-white" />
              </Button>
            </form>
            <p className="mt-3 text-[10px] text-center text-slate-600 uppercase tracking-widest font-bold">
              Powered by ReLink LLM Engine
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Assistant;
