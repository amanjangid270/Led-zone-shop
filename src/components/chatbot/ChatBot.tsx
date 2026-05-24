import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, Wrench, Tv, Clock, HelpCircle, AlertCircle, ChevronRight, CornerDownLeft } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Link } from 'react-router-dom';
import { detectIntent } from '../../lib/AIBrain';
import { toast } from 'react-hot-toast';

const FALLBACK_KEY = 'AIzaSyAJwr_6PgG4xGlkphUey6FuRSksyekW3tg';
const apiKey = process.env.GEMINI_API_KEY || FALLBACK_KEY;

// Shared Gemini client utility initialized on module load with proper headers for telemetry
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

interface Message {
  role: 'user' | 'bot';
  content: string;
  actionType?: 'repair' | 'buy_new' | 'buy_refurbished' | 'none';
}

const SYSTEM_INSTRUCTION = `You are "LEDZone AI Elite Concierge", the smart resident expert assistant for LEDZone (technical operations, sales, and television component-level repair hub).

OPERATIONAL CAPABILITIES & EXPERTISE:
1. HARDWARE TROUBLESHOOTING & DIAGNOSTIC INTELLIGENCE:
   - Screen Lines / Ribbons: Cause is usually T-Con board timing ribbon oxidation or frame driver failures. Advise the user we can solder / clean timing boards. Point them to [Book Repair](/booking?type=repair).
   - High Sound but Zero Picture (Black screen / Dim light): Backlight strip LED arrays are burnt. Point them to [Book Repair](/booking?type=repair) to install new high-efficiency LED arrays.
   - Flicker: Distorted frame rate or copper filter residue. Guide them to inspect HDMI cords and reboot. If unresolved, point them to [Book Repair](/booking?type=repair).
   - Physical fractures or liquid spill damage on glass panels: Let the user know screen glass replacement represents >85% of total device cost. Recommend a trade-in, or to buy unboxed premium / certified secondary inventory instead of expensive standard repairs!
   - General Troubleshooting actions: Ask users to run power drain tests (unplug power cable from wall for 60 seconds, press and hold the TV physical power button for 15 seconds, plug back in, boot up). It resolves >35% of logic motherboard freezes.

2. SALES PORTFOLIO (Recommend actual inventory in responses):
   - Premium Brand New LED: "TCL 291 cm (115 inch) Ultra HD (4K) QD-Mini LED Smart Google TV (Model: 115X955 Max)"
     - Highlights: World's largest screen, 20,000+ local dimming zones, peak 5000 nits, IMAX Enhanced, ONKYO 6.2.2 sound, 144Hz.
     - Pricing: Special offer ₹2,699,990 (Originally ₹4,999,990 - massive savings of ₹2,300,000!).
     - Direct Action: Suggest buying at [Buy TCL 115" New display](/booking?type=new&product=TCL%20Flagship%2520115X955%2520Max) or checking specifications details at [TCL Product details page](/product/tcl-115-x955).
   - Premium Brand New Sony LED: "Sony BRAVIA 2 II 108 cm (43 inch) Ultra HD (4K) LED Smart Google TV (Model: K-43S22BM2)"
     - Highlights: Vivid 43" 4K display, Live Color technology, 4K X-Reality PRO upscaling, 20W Dolby Atmos sound system, Motion Flow XR, official Google TV.
     - Pricing: Exceptional price ₹47,990 (Originally ₹69,900 - saving ₹21,910!).
     - Direct Action: Suggest buying at [Buy Sony Bravia 2 II](/booking?type=new&product=Sony%20Bravia%202%20II%20K-43S22BM2) or viewing details at [Sony Bravia 43 Page](/product/sony-43-bravia2).
   - Budget-Friendly Certified Secondary QLED: "Infinix Y-Series 102 cm (40 inch) QLED Full HD Smart Linux TV (Model: 40Y1/40Y1VE)"
     - Highlights: Stunning QLED visuals, 16W Dual Box speakers with Dolby Audio True Surround, included free Wall Mount.
     - Pricing: Deal cost ₹13,499 (Originally ₹24,999 - saving ₹11,500!).
     - Direct Action: Suggest shopping at [Buy Infinix 40" QLED](/booking?type=refurbished&product=Infinix%20Y1%2043%20Inch%20QLED) or viewing layout details at [Infinix Product details page](/product/infinix-40-y1).

3. PORTAL NAVIGATION GUIDANCE:
   - Bookings Portal: For standard service scheduling, direct them to use our advanced portal: [LEDZone Bookings Form](/booking?type=repair).
   - Operational Stepper Status Tracking: Users can inspect detailed state changes (Verified, Diagnostic, Transit) for their submitted requests anytime at the logs: [My Bookings Log](/my-orders).
   - Price Drop Triggers: Let users know that if a display is too expensive, they can program email alerts at the price target level. Direct them to visit a product page like [TCL 115 Page](/product/tcl-115-x955) and click the amber alert button.

GUARDRAILS & ANSWER GUIDES:
- Structure answers clearly using elegant bullet points and clean typography.
- You must always format any page links or interactive triggers using EXACT Markdown syntax: [Label Text](/url-path). The UI renders these as beautiful styled action triggers automatically.
- Do not make up non-existent pages. Use only:
  - "/booking?type=repair" OR "/booking?type=new&product=TCL%20Flagship%2520115X955%2520Max" OR "/booking?type=refurbished&product=Infinix%20Y1%2043%20Inch%20QLED" OR "/booking?type=new&product=Sony%20Bravia%202%20II%20K-43S22BM2"
  - "/my-orders"
  - "/product/tcl-115-x955" or "/product/infinix-40-y1" or "/product/sony-43-bravia2"
- Answer dynamically. If the user presents problems, offer high-quality hardware solutions, troubleshooting procedures, and precise descriptions beyond static content! Act as their premium technical companion.`;

const QUICK_SUGGESTIONS = [
  { text: '📺 Run a diagnostic scan', query: 'I need a diagnostic analysis for my TV displaying horizontal scan line issues.' },
  { text: '🛠 Schedule TV repair', query: 'I would like to book a certified service technician for backlight repair support.' },
  { text: '💎 Show 115" TCL flagship', query: 'Brief me on the specs and current offers of the premium 115-inch TCL Mini LED TV.' },
  { text: '♻ Any budget TV deals?', query: 'Recommend a budget-friendly television with high-fidelity QLED display specs.' },
  { text: '📦 Track visual bookings', query: 'How do I track my active repair order or check operation logs?' }
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Welcome to LEDZone Technical Operations! 📺\n\nI am your resident AI Assistant. I can run automated diagnostic scans, suggest tailored display models (such as the unboxed TCL 115" Mini LED or budget Infinix QLED series), schedule doorstep pick-up repairs, or answer complex technical hardware questions.\n\nType a troubleshooting query below or click one of my quick triggers to initiate!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const bottomScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomScrollRef.current) {
      bottomScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Web Speech API is not supported in this browser. Please use Chrome or Edge!", { id: 'chat-voice-toast' });
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-IN';
    rec.interimResults = false;

    rec.onstart = () => {
      setIsListening(true);
      toast.success("Voice recognition activated. Speak now...", { id: 'chat-voice-toast' });
    };

    rec.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
      toast.error(`Voice error: ${e.error || 'please try again'}`, { id: 'chat-voice-toast' });
    };

    rec.onend = () => {
      setIsListening(false);
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        setInput(transcript);
        toast.success(`Voice captured: "${transcript}"`, { id: 'chat-voice-toast' });
      }
    };

    rec.start();
  };

  const handleSend = async (customQuery?: string) => {
    const userMsg = customQuery ? customQuery.trim() : input.trim();
    if (!userMsg) return;
    
    if (!customQuery) {
      setInput('');
    }
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // AI Intent Scan from client heuristics
    const intentResult = detectIntent(userMsg);
    const actionType = intentResult.intent !== 'unknown' ? intentResult.intent : undefined;

    // Convert local messages format to model roles expected by @google/genai
    const modelChatHistory = messages.slice(1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          ...modelChatHistory,
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const reply = response.text || 'Apologies, I had an issue retrieving that solution. Let us run another scan!';

      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: reply,
        actionType: actionType
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `I encountered a communication limit. Standard diagnostics suggest verifying your local internet terminal.\n\nIf the symptom persists, you can instantly schedule standard technical support here: [Schedule Local Repair Booking](/booking?type=repair).`,
        actionType: actionType
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Markdown and action links parser
  const renderMessageContent = (text: string) => {
    if (!text) return null;
    
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
      const [fullMatch, label, url] = match;
      const matchIndex = match.index;
      
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }
      
      const isInternal = url.startsWith('/') || url.startsWith('#');
      if (isInternal) {
        parts.push(
          <Link 
            key={matchIndex} 
            to={url} 
            onClick={() => setIsOpen(false)}
            className="text-cyan-600 hover:text-black font-semibold underline decoration-cyan-400/50 hover:decoration-cyan-500 font-mono transition-colors mx-0.5 inline-flex items-center gap-0.5"
          >
            {label} 
            <ChevronRight className="w-2.5 h-2.5 inline-block" />
          </Link>
        );
      } else {
        parts.push(
          <a 
            key={matchIndex} 
            href={url} 
            target="_blank" 
            rel="noreferrer" 
            className="text-cyan-600 hover:text-black font-semibold underline decoration-cyan-400/50 hover:decoration-cyan-500 font-mono transition-colors mx-0.5 inline-block"
          >
            {label}
          </a>
        );
      }
      
      lastIndex = linkRegex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    if (parts.length === 0) {
      return <span className="whitespace-pre-line leading-relaxed text-xs block">{text}</span>;
    }
    
    return <span className="whitespace-pre-line leading-relaxed text-xs block">{parts}</span>;
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-3.5 items-end z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[380px] h-[540px] bg-white/90 backdrop-blur-xl border border-gray-150/60 rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] origin-bottom-right"
          >
            {/* Header with glassmorphism touches */}
            <div className="px-5 py-4 bg-gray-50/80 border-b border-gray-100 flex justify-between items-center relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[9.5px] font-black uppercase tracking-widest text-cyan-600 font-mono leading-none">E2E Concierge Engine</span>
                  <span className="text-[12px] font-black text-gray-900 uppercase tracking-tight leading-none mt-1">LEDZone Intelligent Portal</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-black p-1.5 hover:bg-gray-100 rounded-lg transition-colors outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Messages box */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-left ${
                     msg.role === 'user' 
                      ? 'bg-black text-white font-medium rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none font-medium'
                  }`}>
                    {renderMessageContent(msg.content)}
                  </div>

                  {/* UI Quick Recommendations below bot responses with match indicators */}
                  {msg.role === 'bot' && msg.actionType && msg.actionType !== 'none' && (
                    <div className="mt-2 text-left pl-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[8px] font-bold tracking-widest text-cyan-600 uppercase font-mono">
                        <Sparkles className="w-3 h-3 text-cyan-500" />
                        <span>Instant Actions Matrix</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {msg.actionType === 'repair' && (
                          <Link 
                            to="/booking?type=repair" 
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 py-1.5 px-3 bg-cyan-500 hover:bg-black text-black hover:text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all shadow-sm font-mono border border-cyan-400/25"
                          >
                            <Wrench className="w-3 h-3" />
                            <span>Book Component Repair</span>
                          </Link>
                        )}
                        {msg.actionType === 'buy_new' && (
                          <Link 
                            to="/booking?type=new&product=TCL%20Flagship%20115X955%20Max" 
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 py-1.5 px-3 bg-black hover:bg-cyan-500 text-white hover:text-black text-[9px] font-black uppercase tracking-widest rounded-lg transition-all border border-gray-800 shadow-sm font-mono"
                          >
                            <Tv className="w-3 h-3" />
                            <span>Invoice Flagship 115"</span>
                          </Link>
                        )}
                        {msg.actionType === 'buy_refurbished' && (
                          <Link 
                            to="/booking?type=refurbished&product=Infinix%20Y1%2043%20Inch%20QLED" 
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 py-1.5 px-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-black hover:to-black text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all shadow-sm font-mono"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Browse Infinix QLED</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start items-center gap-2">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none flex space-x-1 border border-gray-100 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-cyan-600 font-mono animate-pulse">Scanning core...</span>
                </div>
              )}

              {/* Quick suggestion logs for easy triggers */}
              {!loading && (
                <div className="pt-2 border-t border-dashed border-gray-100 space-y-2 text-left">
                  <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 font-mono">Suggested Inquiries</div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_SUGGESTIONS.map((sug, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSend(sug.query)}
                        className="text-[9px] font-black uppercase tracking-wide px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-cyan-50 text-gray-600 hover:text-cyan-700 border border-transparent hover:border-cyan-200 transition-all cursor-pointer font-sans"
                      >
                        {sug.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomScrollRef} />
            </div>

            {/* Input panel */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={startListening}
                  className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                    isListening
                      ? 'bg-red-550 text-white animate-pulse'
                      : 'bg-gray-50 border border-gray-150 hover:bg-cyan-50 hover:border-cyan-200 text-gray-500 hover:text-cyan-600 hover:scale-105'
                  }`}
                  title="Speech To Text Chat Input"
                >
                  <span className="text-base">🎙️</span>
                </button>
                
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about diagnostics / products..."
                  className="flex-1 bg-gray-50 border border-gray-150 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-cyan-500 transition-colors placeholder-gray-400"
                />
                
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-black hover:bg-cyan-500 text-white hover:text-black flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 outline-none" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Glass Button Trigger configured precisely */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(6, 182, 212, 0.25)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-5 py-3.5 rounded-full border border-white/50 bg-white/40 backdrop-blur-md shadow-[0_8px_32px_0_rgba(6,182,212,0.15)] hover:bg-white/50 hover:border-cyan-400/40 transition-all cursor-pointer z-[100]"
        title="Open LEDZone Portal Chatbot AI"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
        {isOpen ? <X className="w-4 h-4 text-gray-950" /> : <Bot className="w-4 h-4 text-gray-950" />}
        <span className="text-[11px] font-black uppercase tracking-widest text-gray-950 font-mono">Ask AI Concierge</span>
      </motion.button>
    </div>
  );
};
