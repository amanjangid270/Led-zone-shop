import { motion } from 'motion/react';
import { ArrowRight, PenTool, ShoppingBag, ShieldCheck, HelpCircle, ChevronDown, Check, Mail, BellRing, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';

// Reusable Magnetic Hover Card component using Framer Motion
const MagneticCard = ({ children, className, onClick, ...props }: { children: React.ReactNode; className: string; onClick?: () => void; [key: string]: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Calculate subtle pull effect: capped at maximum of 14px displacement
    const x = (clientX - centerX) * 0.12;
    const y = (clientY - centerY) * 0.12;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.1 }}
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const Home = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 8000);
    }
  };

  const faqData = [
    {
      q: "Why does my LED TV have clear sound but no picture displays?",
      a: "This is the most common LED issue, usually indicating backlight strip failure or driver malfunction. The internal processor operates correctly, but the crystal panel has no background illumination. Our experts scan and swap out damaged LED diodes using premium high-grade beads, restoring full clarity safely."
    },
    {
      q: "Can a shattered or cracked LED glass panel be repaired?",
      a: "A physically fractured liquid crystal matrix can only be resolved via complete panel replacement. Because replacement panels can be costly, our diagnostics will honestly let you know if a swap is ideal—or if you should save up to 50% by choosing one of our Class-A++ Certified premium refurbished inventory."
    },
    {
      q: "What causes a dark blue, purple, or violet tint casting over the screen?",
      a: "This is caused by phosphor degradation in backlight beads. Over thousands of hours, the yellow phosphor coating covering the white LEDs organic layer peels off, revealing raw ultra-violet blue light. We solve this permanently with next-gen, high-CRI pure white LED replacement sets."
    },
    {
      q: "How does the secure home pickup and QR payment tracking work?",
      a: "Once booked, a specialized engineer performs a localized check and updates your 'My Orders' log dashboard. We generate an E2E cryptographic transaction panel. Simply scan and make a payment on your mobile app, and get absolute certificate coverage of up to 180 days on all repairs."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=2000&bg=f9fafb" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="flex flex-col items-start text-left">
              <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest mb-4">Premium Electronics Solutions</span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-black tracking-tight mb-6 uppercase"
              >
                FUTURE OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-cyan-500">VISUAL TECH.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-500 max-w-xl mb-10 text-sm leading-relaxed"
              >
                Expert LED & LCD repair services meeting high-end retail marketplace. Seamless booking, guaranteed components, and AI-assisted performance diagnostics.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/booking?type=repair" className="px-8 py-4 rounded-xl bg-black text-white font-bold tracking-widest text-[10px] uppercase hover:bg-gray-800 hover:shadow-xl transition-all flex items-center justify-center space-x-2 border border-black group">
                  <PenTool className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Book a Repair</span>
                </Link>
                <Link to="/new-leds" className="px-8 py-4 rounded-xl bg-white text-black border border-gray-100 font-bold tracking-widest text-[10px] uppercase hover:shadow-xl hover:border-gray-200 transition-all flex items-center justify-center space-x-2 group">
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Shop Marketplace</span>
                </Link>
              </motion.div>
            </div>

            {/* Abstract 3D Animated Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center perspective-1000"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                {/* Rotating rings */}
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-cyan-500/10 border-dashed"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 rounded-full border border-black/5"
                />
                
                {/* Microscopic Motherboard block */}
                <motion.div 
                  animate={{ rotateY: [-8, 8], rotateX: [8, -8] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                  className="absolute inset-2 bg-gray-950 rounded-3xl overflow-hidden border-4 border-gray-900 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col items-center justify-center transform-style-preserve-3d"
                >
                  {/* Microscopic Grid background */}
                  <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }} />
                  
                  {/* Dynamic LED Backlight Glowing traces */}
                  <motion.div animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 1.8, repeat: Infinity }} className="absolute top-1/5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_12px_#06b6d4]" />
                  <motion.div animate={{ opacity: [0.1, 0.6, 0.1] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.4 }} className="absolute top-3/5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399]" />
                  <motion.div animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }} className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-500 to-transparent shadow-[0_0_12px_#06b6d4]" />
                  <motion.div animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 3.2, repeat: Infinity, delay: 1.2 }} className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-pink-500 to-transparent shadow-[0_0_12px_#ec4899]" />
                  
                  {/* CENTRAL CPU PROCESSOR */}
                  <motion.div 
                    animate={{ scale: [1, 1.04, 1], rotate: [0, 1, 0] }} 
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative w-28 h-28 bg-black border-2 border-cyan-500/50 rounded-2xl flex flex-col items-center justify-center z-10 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    {/* Micro Traces on Core */}
                    <div className="absolute inset-1.5 border border-cyan-400/20 rounded-xl pointer-events-none" />
                    <span className="text-[9px] text-cyan-400 font-mono tracking-widest font-black uppercase">LED-CORE_X1</span>
                    <span className="text-[7px] text-gray-500 font-mono mt-1 font-bold">TEMPMON: OK</span>
                    
                    {/* Micro Status lights */}
                    <div className="absolute top-2.5 right-2.5 flex gap-1">
                      <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_4px_red]" />
                      <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_4px_green]" />
                    </div>
                  </motion.div>

                  {/* CARTOON WORKERS CREW */}
                  
                  {/* WORKER 1: 👷‍♂️ Welding Sparks Crewman (Bottom Left) */}
                  <div className="absolute left-8 bottom-8 z-20 flex flex-col items-center">
                    {/* Welding Spark Generator */}
                    <div className="relative">
                      {/* Sparks particles */}
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            x: [0, (i % 2 === 0 ? 1 : -1) * (18 + i * 4)],
                            y: [0, -25 - i * 8],
                            opacity: [1, 0],
                            scale: [1.2, 0.4]
                          }}
                          transition={{
                            duration: 0.8 + i * 0.1,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.15
                          }}
                          className="absolute w-1 h-1 bg-yellow-400 rounded-full shadow-[0_0_8px_yellow]"
                        />
                      ))}
                      {/* Spark Flame point */}
                      <motion.div 
                        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                        className="absolute bottom-6 left-5 w-2.5 h-2.5 bg-cyan-300 rounded-full filter blur-[1.5px]"
                      />
                    </div>
                    {/* Worker Avatar & motion */}
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                      className="text-xl filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] cursor-default select-none"
                      title="Micro-Repair Welder"
                    >
                      👷‍♂️
                    </motion.div>
                    <span className="text-[6px] text-yellow-400 font-mono font-bold tracking-widest mt-0.5 bg-black/60 px-1 py-0.5 rounded uppercase">Weld Unit</span>
                  </div>

                  {/* WORKER 2: 🤖 Assembly Bot Drone (Top Right) */}
                  <motion.div 
                    animate={{ 
                      y: [-12, 12, -12],
                      x: [-4, 4, -4]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-10 top-10 z-20 flex flex-col items-center"
                  >
                    <div className="text-xl filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] select-none">
                      🤖
                    </div>
                    <span className="text-[6px] text-cyan-400 font-mono font-bold tracking-widest mt-0.5 bg-black/60 px-1 py-0.5 rounded uppercase">Chip Assembly</span>
                    {/* Tiny microchip being transported by drone */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-3.5 h-3.5 bg-emerald-500 border border-emerald-300 rounded shadow-[0_0_6px_#10b981] mt-1 flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 bg-black rounded" />
                    </motion.div>
                  </motion.div>

                  {/* WORKER 3: 🔍 Quality Inspector (Bottom Right) */}
                  <div className="absolute right-8 bottom-8 z-20 flex flex-col items-center">
                    {/* Pulsing scanning beam */}
                    <motion.div 
                      animate={{ 
                        scaleX: [1, 1.5, 1],
                        opacity: [0.1, 0.6, 0.1],
                        y: [-25, -12, -25]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-6 right-3 w-12 h-0.5 bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      className="text-xl select-none"
                    >
                      🕵️‍♂️
                    </motion.div>
                    <span className="text-[6px] text-emerald-400 font-mono font-bold tracking-widest mt-0.5 bg-black/60 px-1 py-0.5 rounded uppercase">QC Scan</span>
                  </div>

                  {/* LASER CALIBRATION ARM (Floating Diagnostic Tool) */}
                  <motion.div 
                    animate={{ 
                      x: [-60, 60, 30, -30, -60], 
                      y: [-20, 20, -10, 10, -20],
                    }} 
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 z-20 text-yellow-400 origin-bottom-right"
                  >
                    <div className="relative">
                      <PenTool className="w-10 h-10 -rotate-45 drop-shadow-[0_0_15px_yellow]" />
                      <motion.div animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="absolute -left-1 -top-1 w-3 h-3 bg-yellow-300 rounded-full filter blur-[1.5px]" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid with Premium Magnetic Hover Effect */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-xs font-black uppercase tracking-widest text-[#06b6d4] mb-2 font-mono flex items-center justify-center gap-2">
               <Sparkles className="w-3.5 h-3.5" /> OUR SOLUTIONS
             </h2>
             <h3 className="text-4xl font-black uppercase tracking-tighter">Everything <span className="text-cyan-500">LED</span></h3>
             <p className="text-[11px] text-gray-400 tracking-wide mt-2">Hover your cursor near cards to experience physical magnetic tracking dynamics</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Professional Repair',
                desc: 'Book immediate expert component diagnostics & certified same-day pick services.',
                icon: PenTool,
                link: '/booking?type=repair',
                theme: 'white',
                badge: 'Same-Day Service'
              },
              {
                title: 'Buy Premium New',
                desc: 'Explore the absolute pinnacle of high-end home cinema screens direct from warehouses.',
                icon: ShoppingBag,
                link: '/new-leds',
                theme: 'black',
                badge: 'Wholesale Pricing'
              },
              {
                title: 'QC Certified Renewed',
                desc: 'Strict 42-point checked, grade-A++ secondary appliances with premium coverage policy.',
                icon: ShieldCheck,
                link: '/refurbished-leds',
                theme: 'white',
                badge: 'Up to 50% Off'
              }
            ].map((s, i) => (
              <MagneticCard
                key={i}
                className="h-full"
              >
                <div 
                  className={`relative p-8 border rounded-3xl shadow-xl transition-all h-full flex flex-col justify-between overflow-hidden group ${
                    s.theme === 'black' 
                      ? 'bg-zinc-950 text-white border-zinc-900 shadow-zinc-900/40 shadow-2xl' 
                      : 'bg-white border-gray-100 hover:shadow-cyan-100/40 hover:border-cyan-200 shadow-slate-200/50'
                  }`}
                >
                  {s.theme === 'white' && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 translate-x-8 -translate-y-8 rotate-45 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform z-0" />
                  )}
                  
                  <div>
                    {/* Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        s.theme === 'black' ? 'bg-zinc-800 text-cyan-400' : 'bg-cyan-50 text-cyan-500'
                      }`}>
                        {s.badge}
                      </span>
                    </div>

                    <div className={`${s.theme === 'black' ? 'bg-zinc-900 border border-zinc-800' : 'bg-gray-50 border border-gray-100'} relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                     <s.icon className={`w-6 h-6 ${s.theme === 'black' ? 'text-cyan-400' : 'text-zinc-700'}`} />
                    </div>
                    
                    <h3 className={`font-black text-lg relative z-10 uppercase tracking-tight ${s.theme === 'black' ? 'text-zinc-100' : 'text-zinc-900'}`}>
                      {s.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed relative z-10">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100/10 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-cyan-500 group-hover:text-cyan-400 relative z-10 transition-colors">
                    <span>Enter Portal</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  
                  <Link to={s.link} className="absolute inset-0 z-20" />
                </div>
              </MagneticCard>
            ))}
          </div>

          <div className="mt-16 bg-white/45 backdrop-blur-md border border-gray-100 rounded-3xl p-6 flex gap-6 items-center shadow-lg max-w-3xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-300 border-2 border-white shadow-md flex-shrink-0 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150')] bg-cover bg-center"></div>
            <div className="text-left">
              <p className="text-xs font-medium italic text-zinc-700 leading-snug">"Best service experience in North Delhi. My Samsung Curved TV was fixed and delivered within 24 hours. The QR payment was so smooth!"</p>
              <p className="text-[9px] uppercase tracking-widest font-black text-cyan-500 mt-2">Arjun Sharma — Verified Customer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-zinc-50 border-y border-zinc-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="text-left">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#06b6d4] font-mono mb-2">OUR PROCESS</h2>
              <h2 className="text-4xl font-black uppercase tracking-tighter">See Our <span className="text-cyan-500">Work</span></h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1555543468-b7ebbc68f126?auto=format&fit=crop&q=80&w=800'
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer shadow-md ${i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover aspect-video" />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center">
                  <span className="text-white font-bold text-[10px] tracking-widest uppercase bg-black/50 backdrop-blur-sm px-4 py-2 rounded">View Image</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Glassmorphic FAQ Section (Common Technical Questions) */}
      <section className="py-24 relative bg-zinc-950 text-white overflow-hidden">
        {/* Subtle decorative glowing background patterns */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #38bdf8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 text-cyan-400 font-mono text-[9px] font-black uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              <HelpCircle className="w-3.5 h-3.5" /> DIAGNOSTICS & FAQS
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-4">
              COMMONLY ASKED <br className="hidden sm:block" />TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">KNOWLEDGE</span>
            </h2>
            <p className="text-gray-400 text-xs mt-3 max-w-xl mx-auto leading-relaxed">
              Explore troubleshooting indices prepared by our certified engineering desk detailing diagnostic workflows.
            </p>
          </div>

          {/* FAQ list using beautiful Glassmorphism blocks */}
          <div className="space-y-4">
            {faqData.map((item, index) =>  {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-white/[0.02] backdrop-blur-md border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full relative py-5 px-6 flex items-center justify-between text-left focus:outline-none focus:ring-0 group select-none"
                  >
                    <span className="text-sm font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors flex items-center gap-3">
                      <span className="text-[#ca8a04] font-mono text-xs font-bold leading-none">0{index + 1}.</span>
                      <span>{item.q}</span>
                    </span>
                    <span className={`p-1.5 rounded-lg bg-white/[0.04] text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400 bg-cyan-500/10' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.03] bg-black/20">
                      <p className="pl-6">{item.a}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-20 bg-zinc-900 border-t border-zinc-805 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1.2px, transparent 1.2px)', backgroundSize: '16px 16px' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4 shrink-0 pointer-events-none opacity-10">
              <BellRing className="w-44 h-44 text-cyan-400" />
            </div>

            <div className="text-left max-w-xl relative">
              <span className="text-[8px] font-black uppercase tracking-widest text-cyan-400 font-mono bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                ⚡ PRIORITY NOTIFIER
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase mt-3">
                NEVER MISS A <span className="text-cyan-400">PRICE DROP</span>
              </h3>
              <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                Join our private newsletter loop. Receive smart notifications the instant inventory prices change, along with certified maintenance hacks from the experts.
              </p>
            </div>

            {/* Live Interactive Subscription Card Interface */}
            <div className="w-full md:w-auto min-w-[320px] relative">
              {subscribed ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-2 group shadow-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-550 text-emerald-450 border border-emerald-400/30 flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black uppercase text-emerald-400 tracking-wider">Subscription Active!</h4>
                  <p className="text-[10px] text-zinc-300">You represent our list for instant price updates.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter security email ID"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-zinc-550 focus:outline-none transition-all font-sans font-medium hover:zinc-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.35)] shrink-0 active:scale-95"
                  >
                    JOIN LIST
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Status Line */}
      <footer className="px-4 md:px-10 py-8 border-t border-zinc-800 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest gap-4">
          <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Delhi / NCR Hub</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Status: Active</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Support: +91 9084184735</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => window.location.href='mailto:Support.ledzone@gmail.com'}>Support.ledzone@gmail.com</span>
          </div>
          <div className="flex flex-wrap text-center gap-4 items-center">
            <span className="text-zinc-300">Language: EN / HI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

