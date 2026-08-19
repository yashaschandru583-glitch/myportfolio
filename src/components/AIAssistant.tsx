import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  User, 
  MessageSquare, 
  Minimize2, 
  Maximize2,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';
import { api } from '../services/api';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistant: React.FC = () => {
  const { theme } = useTheme();
  const { profile } = usePortfolio();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I'm ${profile?.name || 'YASHAS C'}'s AI Assistant. Ask me anything about their projects, technical skills, education, or career background!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Client-side knowledge base fallback for static deployments (like GitHub Pages)
  const getStaticAiAnswer = (q: string): string => {
    const query = q.toLowerCase();
    if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
      return "YASHAS C is proficient across Full-Stack Web (React, Node.js, Express, Tailwind CSS, TypeScript), Core Programming (Java OOP, C, C++, Python), Databases (MongoDB, PostgreSQL, MySQL), and Embedded Systems (Arduino, ESP32, IoT sensors).";
    }
    if (query.includes('street light') || query.includes('arduino') || query.includes('hardware') || query.includes('iot')) {
      return "The Automatic Street Light Controller is an Arduino Uno project utilizing LDR light sensors and relay modules to intelligently toggle street lights based on natural dusk/dawn lux thresholds with hysteresis debounce to prevent car headlight false triggers. It achieved up to 43% simulated energy savings!";
    }
    if (query.includes('student') || query.includes('management') || query.includes('school')) {
      return "The Student Management System is a full-stack MERN application with role-based access control (Admin, Faculty, Student), transcript generation with GPA computation, and real-time attendance analytics.";
    }
    if (query.includes('calculator') || query.includes('java')) {
      return "The Java Multi-Function Calculator is a desktop application with custom Dijkstra's Shunting-yard expression parsing, Reverse Polish Notation evaluation, and arbitrary precision arithmetic.";
    }
    if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach')) {
      return `You can reach YASHAS C directly via email at ${profile?.email || 'yashas.c.dev@gmail.com'} or by phone at ${profile?.phone || '+91 8147837927'}. They are also available on GitHub and LinkedIn!`;
    }
    if (query.includes('hire') || query.includes('open') || query.includes('job') || query.includes('intern') || query.includes('role') || query.includes('opportunity')) {
      return "Yes! YASHAS C is actively open to Full-Stack Developer, Software Engineer, and MERN Stack roles (both full-time and internships, with openness to remote and relocation).";
    }
    if (query.includes('education') || query.includes('college') || query.includes('degree') || query.includes('gpa')) {
      return "YASHAS C is pursuing a Bachelor of Technology (B.Tech) in Computer Science and Engineering with an 8.9 / 10.0 CGPA, with strong foundations in Data Structures & Algorithms, DBMS, OS, and Networks.";
    }
    return `YASHAS C is a passionate Full-Stack Software Engineer with experience in React, Node.js, Express, MongoDB, Java, C++, and IoT. Feel free to explore the interactive project cards or open their verified resume!`;
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.askAI(textToSend);
      const aiReply: Message = {
        sender: 'ai',
        text: res.answer || getStaticAiAnswer(textToSend),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      // Graceful client-side answer fallback
      const fallbackAnswer = getStaticAiAnswer(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: fallbackAnswer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    'What are your top full-stack skills?',
    'Tell me about the Street Light Controller',
    'Are you open to full-time roles?',
    'What databases do you use?'
  ];

  return (
    <>
      {/* Floating Chat Trigger Bubble Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="ai-assistant-toggle-btn"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Portfolio Assistant"
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 cursor-pointer border border-white/20 backdrop-blur-md"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
          </div>
          <span className="text-xs font-bold font-mono tracking-wide hidden sm:inline-block">
            Ask AI Assistant
          </span>
        </motion.button>
      </div>

      {/* Floating Chat Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-chat-window"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[530px] rounded-[32px] border border-white/10 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl bg-[#020617]/95 text-white shadow-black/80"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">Portfolio AI Agent</h4>
                  <span className="text-[10px] font-mono text-emerald-400">Gemini 2.5 & Node.js</span>
                </div>
              </div>

              <button
                id="ai-assistant-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
                className="p-1.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${
                    m.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white ${
                    m.sender === 'user'
                      ? 'bg-blue-600'
                      : 'bg-emerald-600'
                  }`}>
                    {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`p-3.5 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <span className={`block text-[9px] mt-1 text-right font-mono ${
                      m.sender === 'user' ? 'text-blue-200' : 'text-slate-500'
                    }`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-slate-400 p-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span className="text-[11px] font-mono">Analyzing portfolio context...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Sample Questions (Chips) */}
            <div className="p-2.5 border-t border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar bg-black/20">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="shrink-0 px-3 py-1 rounded-full text-[10px] font-medium border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <form
                id="ai-chat-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  id="ai-chat-input-field"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-xs border border-white/10 bg-white/5 text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  id="ai-chat-send-btn"
                  disabled={loading || !input.trim()}
                  aria-label="Send query"
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
