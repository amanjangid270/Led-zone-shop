import { motion } from 'motion/react';
import { ArrowRight, PenTool, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
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

      {/* Services Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-xs font-black uppercase tracking-widest text-center text-gray-500 mb-2">Our Solutions</h2>
             <h3 className="text-4xl font-black uppercase tracking-tighter">Everything <span className="text-cyan-500">LED</span></h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Repair',
                desc: 'Instant Booking',
                icon: PenTool,
                link: '/booking?type=repair',
                theme: 'white'
              },
              {
                title: 'Buy New',
                desc: 'E-Store',
                icon: ShoppingBag,
                link: '/new-leds',
                theme: 'black'
              },
              {
                title: 'Refurbished LED',
                desc: 'QC Certified',
                icon: ShieldCheck,
                link: '/refurbished-leds',
                theme: 'white'
              }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`group relative p-6 border rounded-2xl shadow-xl transition-all cursor-pointer overflow-hidden ${
                  s.theme === 'black' ? 'bg-black text-white border-black' : 'bg-white border-gray-100 hover:shadow-cyan-100'
                }`}
              >
                {s.theme === 'white' && (
                  <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500 translate-x-6 -translate-y-6 rotate-45 group-hover:translate-x-4 transition-transform z-0"></div>
                )}
                
                <div className={`${s.theme === 'black' ? 'bg-gray-800' : 'bg-gray-50'} relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                 <s.icon className={`w-6 h-6 ${s.theme === 'black' ? 'text-cyan-400' : ''}`} />
                </div>
                
                <h3 className={`font-bold relative z-10 text-sm uppercase tracking-wider ${s.theme === 'black' ? 'text-cyan-400' : ''}`}>{s.title}</h3>
                <p className="text-[11px] text-gray-400 mt-1 relative z-10">{s.desc}</p>
                <Link to={s.link} className="absolute inset-0 z-20"></Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-white/40 backdrop-blur-md border border-gray-100 rounded-3xl p-6 flex gap-6 items-center shadow-sm max-w-3xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm flex-shrink-0"></div>
            <div>
              <p className="text-xs font-medium italic italic-serif">"Best service experience in North Delhi. My Samsung Curved TV was fixed and delivered within 24 hours. The QR payment was so smooth!"</p>
              <p className="text-[10px] uppercase tracking-widest font-bold mt-2">Arjun Sharma — Verified Customer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Our Process</h2>
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

      {/* Footer Status Line */}
      <footer className="px-4 md:px-10 py-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest gap-4">
          <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
            <span className="hover:text-black cursor-pointer">Delhi / NCR Hub</span>
            <span className="hover:text-black cursor-pointer">Status: Online</span>
            <span className="hover:text-black cursor-pointer">Support: +91 9084184735</span>
            <span className="hover:text-black cursor-pointer" onClick={() => window.location.href='mailto:Support.ledzone@gmail.com'}>Support.ledzone@gmail.com</span>
          </div>
          <div className="flex flex-wrap text-center gap-4 items-center">
            <span className="text-black">Language: EN / HI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
