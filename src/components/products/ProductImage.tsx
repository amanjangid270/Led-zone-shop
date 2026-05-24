import { motion } from 'motion/react';
import React from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = '', onClick }) => {
  const isCustom = src.startsWith('custom-');

  if (!isCustom) {
    return (
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={className}
        onClick={onClick}
      />
    );
  }

  // Common Mesh Grids Background
  const MeshGrid = () => (
    <div 
      className="absolute inset-0 opacity-15 pointer-events-none" 
      style={{ 
        backgroundImage: 'radial-gradient(circle at center, #06b6d4 1.2px, transparent 1.2px)', 
        backgroundSize: '16px 16px' 
      }} 
    />
  );

  // 1. Olympic Circles SVG
  const OlympicCircles = () => (
    <svg className="w-12 h-6" viewBox="0 0 100 50">
      <circle cx="20" cy="20" r="10" stroke="#0085C7" strokeWidth="2" fill="none" />
      <circle cx="42" cy="20" r="10" stroke="#000000" strokeWidth="2" fill="none" />
      <circle cx="64" cy="20" r="10" stroke="#DF0024" strokeWidth="2" fill="none" />
      <circle cx="31" cy="31" r="10" stroke="#F4C300" strokeWidth="2" fill="none" />
      <circle cx="53" cy="31" r="10" stroke="#009F3D" strokeWidth="2" fill="none" />
    </svg>
  );

  // Render correct custom visual asset matching the user's uploaded images
  switch (src) {
    case 'custom-tcl-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-black text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 md:p-6 border border-zinc-850 shadow-2xl select-none ${className}`}
        >
          {/* Subtle gold circuit trace line backing */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full stroke-yellow-500/45 fill-none" viewBox="0 0 400 220">
              <path d="M 0 50 L 100 50 L 130 80 L 270 80 L 300 110 L 400 110" strokeWidth="0.5" />
              <path d="M 50 220 L 120 150 L 200 150 L 220 170 C 240 190, 260 190, 280 170 L 350 100" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="130" cy="80" r="1.5" className="fill-amber-400" />
              <circle cx="300" cy="110" r="1.5" className="fill-amber-400" />
            </svg>
          </div>
          
          <MeshGrid />
          
          {/* Top Row: TCL Brand & Right Olympic Worldwide Partner pill */}
          <div className="flex justify-between items-start z-10 w-full">
            {/* TCL logo / tagline */}
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white font-sans italic leading-none">TCL</span>
              <span className="text-[5px] md:text-[6px] tracking-widest text-[#ECC06E] font-bold uppercase font-mono mt-1">
                QD-Mini LED X955 PREMIUM CORE
              </span>
            </div>

            {/* Olympic Partner Badge as in image */}
            <div className="flex items-center space-x-2 bg-white px-2.5 py-1 rounded-md border border-neutral-200 shadow-md">
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-black text-[#E31E24] leading-tight select-none">TCL</span>
                <span className="text-[4.5px] text-gray-500 leading-none select-none font-bold uppercase tracking-tighter">Worldwide Partner</span>
              </div>
              <div className="w-[0.5px] h-5 bg-neutral-300" />
              <OlympicCircles />
            </div>
          </div>

          {/* Center Display: Beautiful Blooming gold-blue fiber-core flower */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="relative w-44 h-44 md:w-[260px] md:h-[260px] mt-2 flex items-center justify-center opacity-95"
            >
              {/* Radial flare glowing backing */}
              <div className="absolute inset-8 bg-gradient-to-tr from-cyan-500/50 via-indigo-600/20 to-amber-500/35 rounded-full blur-[45px] animate-pulse" />
              
              <svg className="w-full h-full text-cyan-400 fill-none stroke-current" viewBox="0 0 140 140">
                <defs>
                  <radialGradient id="cyberOrb" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="40%" stopColor="#ECC06E" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Central shining cosmic core ball */}
                <circle cx="70" cy="70" r="14" fill="url(#cyberOrb)" className="animate-pulse" />
                <circle cx="70" cy="70" r="16" stroke="#ECC06E" strokeWidth="0.5" strokeDasharray="2 2" />

                {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((rot) => (
                  <g key={rot} transform={`rotate(${rot} 70 70)`}>
                    {/* Intricate sweeping flower petals like the image close-up */}
                    <path d="M 70 56 Q 52 28 70 8 Q 88 28 70 56" strokeWidth="1.2" className="text-cyan-400/90" />
                    <path d="M 70 56 Q 61 38 70 20 Q 79 38 70 56" strokeWidth="0.8" className="text-amber-400/90" />
                    <path d="M 70 70 C 40 50 40 30 70 11 C 100 30 100 50 70 70" strokeWidth="0.3" className="text-blue-500/40" />
                    <circle cx="70" cy="22" r="1" className="fill-orange-400 text-none" />
                  </g>
                ))}
              </svg>
            </motion.div>
          </div>

          {/* Bottom Row & Left Badges */}
          <div className="flex justify-between items-end z-10 w-full mt-auto">
            {/* Red 115 Inch badge stacked on bottom left */}
            <div className="flex flex-col space-y-1.5 max-w-[150px] text-left">
              <div className="bg-[#E31E24] text-white px-3 py-1.5 rounded-r-xl border border-[#E31E24]/30 shadow-[0_4px_20px_rgba(227,30,36,0.45)]">
                <div className="text-3xl md:text-4xl font-extrabold tracking-tighter leading-none font-sans italic">115"</div>
                <div className="text-[7px] md:text-[8px] font-black uppercase tracking-wide mt-1 opacity-95 font-mono">
                  QD-Mini LED X955
                </div>
              </div>

              {/* Dimming and HDR specs list overlay */}
              <div className="flex flex-col space-y-1 font-mono text-[6.5px] md:text-[8px] text-zinc-300 bg-black/75 backdrop-blur-md p-2 rounded-lg border border-zinc-800 shadow-md">
                <div className="flex items-center space-x-1">
                  <span className="text-cyan-400 font-extrabold font-mono">[ 20000+ ]</span>
                  <span className="font-semibold text-white">20000+ Local Dimming Zones</span>
                </div>
                <div className="font-extrabold text-[#ECC06E] flex items-center space-x-1">
                  <span>HDR 5000 nits Peak</span>
                </div>
                <div className="text-[6px] font-extrabold uppercase text-cyan-300 tracking-wider flex items-center space-x-1">
                  <span>T-SCREEN</span>
                  <span className="bg-cyan-500 text-white text-[5px] px-1 py-0.2 rounded font-mono font-black italic">ULTRA</span>
                </div>
              </div>
            </div>

            {/* NEW 2025 Model badge on right */}
            <div className="flex flex-col items-end text-right font-mono bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-zinc-800 shadow-xl">
              <span className="text-[14px] md:text-[18px] font-black text-amber-400 tracking-tighter leading-none italic">NEW</span>
              <span className="text-[7.5px] md:text-[8.5px] font-black text-white tracking-widest mt-0.5 uppercase">2025 Model</span>
            </div>
          </div>
        </div>
      );

    case 'custom-tcl-immersive':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-black text-white rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />
          
          {/* Header Title Bar */}
          <div className="text-center py-2.5 z-10 w-full bg-zinc-950/80 border-b border-zinc-900">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#ECC06E] uppercase font-sans">
              Bigger, Brighter & More Immersive
            </h2>
          </div>

          {/* Three grids horizontal blocks */}
          <div className="grid grid-rows-3 divide-y divide-zinc-900 h-full w-full z-10">
            {/* Box 1: 115" Large Screen */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-cyan-400 stroke-current fill-none" viewBox="0 0 24 24">
                  <path d="M 3 12 L 3 3 L 12 3" strokeWidth="1.5" />
                  <path d="M 3 3 L 18 18" strokeWidth="1.5" strokeDasharray="2 2" />
                  <path d="M 14 18 L 18 18 L 18 14" strokeWidth="1.5" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white tracking-wide font-sans leading-none">115" Large Screen</span>
                  <span className="text-[6.5px] text-zinc-400 font-semibold font-mono tracking-wide mt-1">Cinematic Grandeur Board</span>
                </div>
              </div>
              {/* Screen illustration on right displaying waterfall landscape split */}
              <div className="justify-self-end w-24 h-11 border border-zinc-800 bg-slate-950 rounded p-[1px] relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-indigo-900/60 flex items-center justify-center">
                  <div className="w-[1.5px] h-6 bg-cyan-300 absolute left-8 opacity-65 animate-pulse" />
                  <span className="text-[6px] font-mono font-black text-sky-300 tracking-tighter uppercase select-none">TCL 115" SCREEN</span>
                </div>
              </div>
            </div>

            {/* Box 2: QD-Mini LED TV layers exploded */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-indigo-400 tracking-wide font-sans leading-none">QD-Mini LED TV</span>
                <span className="text-[6.5px] text-zinc-400 font-semibold font-mono mt-1">Layered Optical Spectrum Matrix</span>
              </div>
              {/* Exploded Layers Illustration */}
              <div className="justify-self-end flex items-center h-10 select-none pr-1">
                <div className="relative w-28 h-8 flex items-center justify-center">
                  {[
                    { color: 'border-yellow-400/40 bg-yellow-950/20', offset: '-translate-x-12', label: 'Backlight' },
                    { color: 'border-cyan-400/40 bg-cyan-950/25', offset: '-translate-x-7', label: 'QD Film' },
                    { color: 'border-indigo-400/40 bg-slate-900/35', offset: '-translate-x-2', label: 'TFT Matrix' },
                    { color: 'border-violet-400/40 bg-violet-950/15', offset: 'translate-x-3', label: 'LC Layer' },
                    { color: 'border-rose-400/45 bg-rose-950/10', offset: 'translate-x-8', label: 'Filters' },
                    { color: 'border-blue-400/70 bg-indigo-950/40', offset: 'translate-x-14', label: 'Glass' }
                  ].map((layer, idx) => (
                    <div 
                      key={idx} 
                      className={`absolute w-7 h-7 rounded border ${layer.color} shadow-md flex flex-col items-center justify-center scale-x-[0.6] rotate-x-[45deg] rotate-y-[-20deg] ${layer.offset} transition-transform hover:scale-105`}
                    >
                      <span className="text-[3.5px] text-white font-mono leading-none tracking-tighter select-none scale-[0.8]">
                        {layer.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Box 3: Ultra Slim Design profile view */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald-400 stroke-current fill-none" viewBox="0 0 24 24">
                  <rect x="7" y="3" width="10" height="18" rx="1" strokeWidth="1.5" />
                  <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-emerald-400 tracking-wide font-sans leading-none">Ultra Slim Design</span>
                  <span className="text-[6.5px] text-zinc-400 font-semibold font-mono tracking-wide mt-1">Sleek side chasis bezel</span>
                </div>
              </div>
              {/* Slim Side Silhouette SVG */}
              <div className="justify-self-end flex items-center justify-center pr-4">
                <svg className="w-20 h-8 text-cyan-400 fill-none" viewBox="0 0 80 30">
                  <line x1="20" y1="5" x2="60" y2="5" stroke="#ecc06e" strokeWidth="1" />
                  <line x1="18" y1="15" x2="62" y2="15" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 2" />
                  <path d="M 18 10 L 62 10 Q 64 15 62 20 L 18 20 Q 16 15 18 10 Z" fill="#ffffff10" stroke="#0ea5e9" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom regulatory ribbon */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full">
            <span>T-SCREEN ULTRA ANTI-REFLECTION R-ABS: 99.8%</span>
            <span>MODEL CONFIGURATION ID: 115X955-MAX-V5</span>
          </div>
        </div>
      );

    case 'custom-tcl-visual':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-black text-white rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />
          
          {/* Header Title Bar */}
          <div className="text-center py-2.5 z-10 w-full bg-zinc-950/80 border-b border-zinc-900">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#ECC06E] uppercase font-sans">
              Unparalleled Visual Excellence
            </h2>
          </div>

          {/* Three grids dynamic content */}
          <div className="grid grid-rows-3 divide-y divide-zinc-900 h-full w-full z-10">
            {/* Box 1: 4K Ultra HD and Vortex graphic */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-sm font-black text-amber-400 font-sans tracking-tight leading-none">4K Ultra HD</span>
                <span className="text-[6.5px] text-zinc-400 font-semibold font-mono tracking-widest mt-1">3840 x 2160 Pixels Resolution</span>
              </div>
              <div className="justify-self-end w-20 h-9 relative overflow-hidden rounded bg-[#1c1917]/30 border border-amber-900/20">
                {/* Vortex SVG */}
                <svg className="absolute inset-0 w-full h-full fill-none" viewBox="0 0 80 36">
                  <path d="M 10 18 Q 40 -10 70 18" stroke="#f59e0b" strokeWidth="1" />
                  <path d="M 20 18 Q 40 40 60 18" stroke="#3b82f6" strokeWidth="1" />
                  <circle cx="58" cy="18" r="6" stroke="#fbbf24" strokeWidth="1.5" className="animate-ping" />
                  <circle cx="58" cy="18" r="4" fill="#fbbf24" />
                </svg>
              </div>
            </div>

            {/* Box 2: IMAX Enhanced astronaut helmet reflections */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black text-white bg-rose-950 px-2 py-0.5 border border-rose-800 rounded uppercase leading-none font-sans italic tracking-tighter">
                  IMAX
                </span>
                <span className="text-[8px] font-normal tracking-widest uppercase font-mono text-zinc-300 leading-none">
                  Enhanced
                </span>
              </div>
              <div className="justify-self-end w-20 h-9 relative overflow-hidden rounded bg-[#09090b]">
                {/* Space helmet drawing in perspective */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 36">
                  {/* Outer helmet curve */}
                  <circle cx="40" cy="18" r="14" fill="#3f3f46" stroke="#71717a" strokeWidth="0.5" />
                  {/* Visor reflecting bright round globe */}
                  <path d="M 30 18 C 30 10 50 10 50 18 C 50 26 30 26 30 18 Z" fill="#020617" stroke="#0ea5e9" strokeWidth="1" />
                  <path d="M 32 14 Q 40 22 48 14" stroke="#e0f2fe" strokeWidth="0.5" strokeLinecap="round" />
                  <circle cx="42" cy="13" r="2" fill="#fff" className="animate-pulse" />
                </svg>
              </div>
            </div>

            {/* Box 3: 144Hz Refresh Rate and sports car */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-cyan-400 font-sans tracking-wide leading-none italic uppercase">
                  144Hz Refresh Rate
                </span>
                <span className="text-[6.5px] text-zinc-400 font-semibold font-mono mt-1">Super Smooth sport pacing</span>
              </div>
              {/* Dynamic Sports car outline drawing with golden glow sparks */}
              <div className="justify-self-end w-28 h-9 relative overflow-hidden flex items-center justify-center select-none">
                <svg className="absolute inset-0 w-full h-full text-cyan-400 fill-none stroke-current" viewBox="0 0 100 36">
                  {/* Horizontal speed traces */}
                  <line x1="5" y1="12" x2="35" y2="12" stroke="#eab308" strokeWidth="0.5" strokeDasharray="3 3By" />
                  <line x1="12" y1="24" x2="45" y2="24" stroke="#0ea5e9" strokeWidth="0.5" strokeDasharray="2 2" />
                  
                  {/* Stylized sports car silhouette */}
                  <path d="M 30 28 L 34 22 L 50 20 L 70 20 Q 82 22 88 26 L 88 29 L 30 29 Z" fill="#ffffff15" strokeWidth="1.2" />
                  {/* Wheels */}
                  <circle cx="42" cy="28" r="4" fill="#000" stroke="#0ea5e9" strokeWidth="0.8" />
                  <circle cx="78" cy="28" r="4" fill="#000" stroke="#0ea5e9" strokeWidth="0.8" />
                  <circle cx="42" cy="28" r="1.5" fill="#fff" />
                  <circle cx="78" cy="28" r="1.5" fill="#fff" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full">
            <span>MEMC CHIP REFRESH DRIVE ENG: CORE-V5</span>
            <span>FRAME SYNC PROTOCOL: FREESYNC PREMIUM PRO</span>
          </div>
        </div>
      );

    case 'custom-tcl-audio':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-black text-white rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />
          
          {/* Header Title Bar */}
          <div className="text-center py-2.5 z-10 w-full bg-zinc-950/80 border-b border-zinc-900">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#ECC06E] uppercase font-sans">
              Cinematic Audio for Every Scene
            </h2>
          </div>

          {/* Three audio categories division */}
          <div className="grid grid-rows-3 divide-y divide-zinc-900 h-full w-full z-10">
            {/* Box 1: Onkyo spatial audio setup */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex flex-col text-left">
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] font-black text-white font-sans leading-none">Dolby Atmos</span>
                  <span className="text-[6.5px] text-zinc-400 font-bold font-mono">with</span>
                  <span className="text-[10px] font-black text-violet-400 font-sans leading-none">ONKYO 6.2.2</span>
                </div>
                <span className="text-[6px] md:text-[6.5px] font-bold text-zinc-400 font-mono tracking-wide mt-1">Multi-Channel Hi-Fi Sound Array</span>
              </div>
              <div className="justify-self-end w-24 h-9 relative overflow-hidden rounded bg-zinc-950 border border-zinc-900">
                {/* 3D Soundwaves radiating */}
                <svg className="absolute inset-0 w-full h-full fill-none animate-pulse" viewBox="0 0 80 36">
                  <circle cx="40" cy="18" r="8" stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="2 2" />
                  <path d="M 15 18 A 25 25 0 0 1 65 18" stroke="#6366f1" strokeWidth="0.75" />
                  <path d="M 5 18 A 35 35 0 0 1 75 18" stroke="#8b5cf6" strokeWidth="0.5" />
                </svg>
              </div>
            </div>

            {/* Box 2: AI Sound Optimization wireframe room */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-cyan-400 font-sans leading-none">AI Sound Optimization</span>
                <span className="text-[6.5px] text-zinc-400 font-semibold font-mono tracking-wide mt-1">Real-time Echo tuning sonar</span>
              </div>
              <div className="justify-self-end w-24 h-9 relative overflow-hidden rounded bg-[#09090b] border border-zinc-900">
                {/* Wireframe lines simulation */}
                <svg className="absolute inset-0 w-full h-full fill-none text-cyan-500" viewBox="0 0 80 36">
                  {/* Perspective grids represent room */}
                  <line x1="0" y1="5" x2="80" y2="5" stroke="#ffffff10" strokeWidth="0.5" />
                  <line x1="0" y1="31" x2="80" y2="31" stroke="#ffffff10" strokeWidth="0.5" />
                  <path d="M 10 18 Q 40 31 70 18" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="40" cy="18" r="3" fill="#38bdf8" className="animate-ping" />
                  <circle cx="40" cy="18" r="1.5" fill="#38bdf8" />
                </svg>
              </div>
            </div>

            {/* Box 3: Woofers stack technical schematic */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-[#ECC06E] font-sans leading-none">Bass-Boosted Woofers</span>
                <span className="text-[6.5px] text-zinc-400 font-semibold font-mono mt-1">Double Low sound sub vents</span>
              </div>
              {/* Speaker coil cones diagram drawing */}
              <div className="justify-self-end w-20 h-9 relative overflow-hidden rounded flex items-center justify-center">
                <svg className="w-full h-full fill-none stroke-current text-yellow-500" viewBox="0 0 80 36">
                  {/* Multiple cone outlines layered */}
                  <circle cx="25" cy="18" r="10" stroke="#ecc06e" strokeWidth="1" />
                  <circle cx="25" cy="18" r="6" stroke="#b45309" strokeWidth="1" />
                  <circle cx="25" cy="18" r="2.5" fill="#ecc06e" />
                  <circle cx="55" cy="18" r="10" stroke="#ecc06e" strokeWidth="1" />
                  <circle cx="55" cy="18" r="6" stroke="#b45309" strokeWidth="1" />
                  <circle cx="55" cy="18" r="2.5" fill="#ecc06e" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom description banner */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full">
            <span>PHYSICAL DRIVE CORE MATRIX: COIL-A9</span>
            <span>DEEP HARMONIC SONIC INTERVAL: 20HZ-24KHZ</span>
          </div>
        </div>
      );

    case 'custom-tcl-entertainment':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-black text-white rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />
          
          {/* Header Title Bar */}
          <div className="text-center py-2.5 z-10 w-full bg-zinc-950/80 border-b border-zinc-900">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#ECC06E] uppercase font-sans">
              Entertainment, Reimagined
            </h2>
          </div>

          {/* Three key entertainment suites split */}
          <div className="grid grid-rows-3 divide-y divide-zinc-900 h-full w-full z-10">
            {/* Box 1: Google TV OS details */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-green-400 font-sans leading-none">Google TV</span>
                <span className="text-[6.5px] text-zinc-400 font-semibold font-mono tracking-wide mt-1">Smart user recommendation ecosystem</span>
              </div>
              <div className="justify-self-end w-24 h-9 relative overflow-hidden rounded bg-zinc-950 border border-zinc-900 p-1 flex flex-col justify-between">
                <div className="h-1.5 bg-zinc-800 rounded w-10/12 mb-1" />
                {/* Simulated Google TV dashboard rows */}
                <div className="grid grid-cols-4 gap-0.5">
                  <div className="h-4 bg-gradient-to-tr from-[#E31E24]/30 to-[#E31E24]/10 rounded border border-[#E31E24]/20" />
                  <div className="h-4 bg-gradient-to-tr from-cyan-600/30 to-cyan-600/10 rounded border border-cyan-500/20" />
                  <div className="h-4 bg-gradient-to-tr from-yellow-600/30 to-yellow-600/10 rounded border border-yellow-500/20" />
                  <div className="h-4 bg-gradient-to-tr from-green-600/30 to-green-600/10 rounded border border-green-500/20" />
                </div>
              </div>
            </div>

            {/* Box 2: Hey Google hand-free audio microphone */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Assistant color circles */}
                <div className="flex space-x-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 block animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 block animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 block animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 block animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
                <span className="text-[10px] font-black text-sky-400 font-sans leading-none">Hey Google</span>
              </div>
              <div className="justify-self-end w-20 h-9 relative overflow-hidden flex items-center justify-center select-none bg-zinc-950 border border-zinc-900 rounded">
                <span className="text-[9px] font-bold text-white font-mono flex items-center gap-1">
                  🎙️ <span className="text-[7.5px] animate-pulse text-sky-400">"Search SciFi"</span>
                </span>
              </div>
            </div>

            {/* Box 3: Multi View split screen */}
            <div className="grid grid-cols-2 p-2.5 items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-pink-400 font-sans leading-none">Multi View 2.0</span>
                <span className="text-[6.5px] text-zinc-400 font-semibold font-mono mt-1">Split display into quadrants symmetrically</span>
              </div>
              <div className="justify-self-end w-20 h-9 relative overflow-hidden rounded bg-black p-0.5 border border-zinc-900 grid grid-cols-2 gap-0.5">
                <div className="bg-sky-500/25 border border-sky-500/20 rounded flex items-center justify-center text-[5px] text-sky-400 font-bold">HDMI1</div>
                <div className="bg-pink-500/25 border border-pink-500/20 rounded flex items-center justify-center text-[5px] text-pink-400 font-bold">HDMI3</div>
                <div className="bg-amber-500/25 border border-amber-500/20 rounded flex items-center justify-center text-[5px] text-amber-400 font-bold">Mobile</div>
                <div className="bg-emerald-500/25 border border-emerald-500/20 rounded flex items-center justify-center text-[5px] text-emerald-400 font-bold">GoogleTV</div>
              </div>
            </div>
          </div>

          {/* Bottom OS signature */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full">
            <span>OPERATING OS CORE: ANDROID 12 REVISION T</span>
            <span>VOICE RANGE SENSOR COGNITIVE RADAR: 5M ROUND</span>
          </div>
        </div>
      );

    case 'custom-tcl-art':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-black text-white rounded-2xl overflow-hidden flex items-center justify-center p-4 md:p-6 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          {/* Deep celestial golden lightning filaments */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full stroke-amber-500" viewBox="0 0 400 220">
              <path d="M 200 110 C 240 180, 160 200, 130 220" strokeWidth="0.5" />
              <path d="M 200 110 C 160 50, 240 20, 260 0" strokeWidth="0.5" />
              <path d="M 200 110 C 250 150, 380 90, 400 50" strokeWidth="0.5" strokeDasharray="1 1" />
            </svg>
          </div>

          <MeshGrid />
          
          {/* Backlight visual blooming ring */}
          <div className="absolute inset-4 bg-gradient-to-tr from-cyan-500/40 via-indigo-500/10 to-amber-500/25 rounded-full blur-[45px] animate-pulse" />

          {/* High Density full SVG master artwork inside frame of TV */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="relative w-44 h-44 md:w-68 md:h-68 flex items-center justify-center z-13"
          >
            <svg className="w-full h-full text-cyan-400 fill-none stroke-current" viewBox="0 0 140 140">
              <defs>
                <radialGradient id="cyberBloomCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                  <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="65%" stopColor="#0891b2" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Central glistening golden sun */}
              <circle cx="70" cy="70" r="16" fill="url(#cyberBloomCore)" />
              <circle cx="70" cy="70" r="18" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="3 3" />

              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((rot) => (
                <g key={rot} transform={`rotate(${rot} 70 70)`}>
                  {/* Outer layered gorgeous metallic flower petals representing the sixth masterpiece flower image */}
                  <path d="M 70 56 Q 52 28 70 8 Q 88 28 70 56" strokeWidth="1.5" className="text-cyan-400/90" />
                  <path d="M 70 56 Q 62 36 70 18 Q 78 36 70 56" strokeWidth="1.2" className="text-amber-400/80" />
                  <path d="M 70 70 C 40 50 40 28 70 10 C 100 28 100 50 70 70" strokeWidth="0.4" className="text-blue-500/30" />
                  <circle cx="70" cy="20" r="1.5" className="fill-cyan-400 focus:outline-none text-none" />
                </g>
              ))}
            </svg>
          </motion.div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-zinc-805 z-20 pointer-events-none text-center">
            <span className="text-[12px] font-black tracking-widest text-[#ECC06E] uppercase font-sans">
              TCL Flagship 115X955 LUXURY ART MODE
            </span>
          </div>
        </div>
      );

    case 'custom-infinix-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-neutral-900 text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3 md:p-5 border border-zinc-850 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />
          
          {/* Swirling Lava flows graphics inside TV screen frame */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-xl border border-zinc-800 m-1 bg-[#09090b]">
            <svg className="w-full h-full scale-105" viewBox="0 0 400 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lavaFlow1" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#ec4899" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#f97316" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#eab308" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="lavaFlow2" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              
              {/* Backing base color gradient */}
              <rect width="400" height="220" fill="url(#lavaFlow2)" />
              
              {/* Complex fluid lava wave shapes */}
              <path d="M 0 160 C 80 120, 120 70, 180 100 C 240 130, 300 90, 400 150 L 400 220 L 0 220 Z" fill="url(#lavaFlow1)" className="opacity-90" />
              <path d="M 0 180 C 100 130, 140 180, 220 150 C 300 120, 320 180, 400 140 L 400 220 L 0 220 Z" fill="#eb5c1e" fillOpacity="0.45" />
              <path d="M 50 140 C 130 90, 170 120, 260 60 C 310 30, 350 70, 400 40 L 400 220 L 50 220 Z" fill="#fbbf24" fillOpacity="0.3" />
            </svg>
            
            {/* Top row labels inside screen layout */}
            <div className="absolute top-2.5 left-3 z-10 flex">
              <span className="bg-black/65 backdrop-blur border border-zinc-700 rounded-md py-0.5 px-2 text-[5.5px] md:text-[6.5px] font-black uppercase tracking-widest text-[#FFF]">
                QLED TV
              </span>
            </div>
            
            <div className="absolute top-2.5 right-3 z-10">
              <span className="text-[6.5px] md:text-[7.5px] text-zinc-100 font-extrabold tracking-wide font-sans bg-black/40 px-1.5 py-0.5 rounded">
                Y1V 102 CM (40")
              </span>
            </div>

            {/* Frosted Floating App Icons Container shelf */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-11/12 max-w-[340px] bg-black/45 backdrop-blur-md rounded-lg py-1 px-2 border border-white/10 flex justify-between items-center z-10">
              {[
                { name: 'JioCinema', bg: 'from-[#be185d] to-[#db2777]', tag: '🎬' },
                { name: 'Hotstar', bg: 'from-[#1e3a8a] to-[#3b82f6]', tag: '⭐' },
                { name: 'Prime', bg: 'from-[#0369a1] to-[#0284c7]', tag: '✓' },
                { name: 'YouTube', bg: 'from-[#b91c1c] to-[#ef4444]', tag: '▶' },
                { name: 'ZEE5', bg: 'from-[#09090b] to-[#27272a]', tag: 'O' },
                { name: 'SonyLIV', bg: 'from-[#6b21a8] to-[#1e1b4b]', tag: 'L' },
                { name: 'ErosNow', bg: 'from-[#0891b2] to-[#0ea5e9]', tag: 'E' },
                { name: 'AajTak', bg: 'from-[#991b1b] to-[#dc2626]', tag: 'T' }
              ].map((app, index) => (
                <div key={index} className="flex flex-col items-center justify-center space-y-0.5 select-none hover:scale-110 transition-transform">
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-md bg-gradient-to-tr ${app.bg} flex items-center justify-center border border-white/5 shadow-md`}>
                    <span className="text-[7px] md:text-[8px] font-black font-sans text-white">{app.tag}</span>
                  </div>
                  <span className="text-[3.5px] md:text-[4.5px] font-bold text-zinc-200 uppercase tracking-tighter leading-none scale-[0.9]">
                    {app.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Thin Bezel Bezel frame details below */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
            <span className="text-[8px] md:text-[9px] font-black uppercase text-zinc-100 tracking-wider font-sans italic hover:opacity-80">
              Infinix
            </span>
          </div>

          {/* Angled supports TV Stand Legs representation */}
          <div className="absolute bottom-0 left-[18%] w-1.5 h-2 bg-gradient-to-t from-zinc-950 to-zinc-700 transform skew-x-[-15deg] border-b border-zinc-950" />
          <div className="absolute bottom-0 right-[18%] w-1.5 h-2 bg-gradient-to-t from-zinc-950 to-zinc-700 transform skew-x-[15deg] border-b border-zinc-950" />
        </div>
      );

    case 'custom-infinix-audio':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#050505] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 md:p-6 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />
          
          {/* Headline box header text */}
          <div className="text-center w-full z-10 pt-1.5">
            <h2 className="text-md md:text-lg font-black tracking-widest text-[#ECC06E] uppercase font-sans">
              UPTO 16W BOX SPEAKERS
            </h2>
            <p className="text-[6.5px] md:text-[7.5px] text-zinc-400 font-extrabold uppercase tracking-[0.2em] font-mono mt-0.5">
              TRUE SURROUND SOUND
            </p>
          </div>

          {/* Dolby Audio dynamic stamp in upper segment */}
          <div className="absolute top-4 right-5 z-10 flex items-center space-x-1.5 bg-black/60 border border-zinc-800 px-2.5 py-1 rounded">
            {/* Double D logo */}
            <div className="flex -space-x-0.5 font-bold text-[7px] text-zinc-200">
              <span className="border border-r-0 border-zinc-200 rounded-l-sm px-0.5 py-0.1 bg-zinc-900 font-mono">D</span>
              <span className="border border-l-0 border-zinc-200 rounded-r-sm px-0.5 py-0.1 bg-zinc-900 font-mono transform rotate-180">D</span>
            </div>
            <span className="text-[6px] md:text-[7px] font-black uppercase tracking-widest text-zinc-200 font-sans">Dolby Audio</span>
          </div>

          {/* TV silhouette top perspective render */}
          <div className="w-[68%] aspect-[4/1] bg-gradient-to-t from-zinc-950 to-zinc-850 xs:h-[18%] mx-auto my-auto relative border border-zinc-800 rounded-md p-1 flex items-stretch z-10 shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            <div className="absolute inset-0 bg-zinc-900/40 rounded-md flex items-center justify-center">
              <span className="text-[5px] text-[#ECC06E] font-black font-sans tracking-widest uppercase">QLED TV 102 CM</span>
            </div>
            {/* Speaker Grilles simulation at the bottom endpoints */}
            <div className="w-6 h-1 bg-zinc-750 absolute bottom-1.5 left-3 rounded-full opacity-60 flex gap-0.5 items-center justify-center p-[1px]">
              <div className="w-full h-full bg-black rounded" />
            </div>
            <div className="w-6 h-1 bg-zinc-750 absolute bottom-1.5 right-3 rounded-full opacity-60 flex gap-0.5 items-center justify-center p-[1px]">
              <div className="w-full h-full bg-black rounded" />
            </div>
          </div>

          {/* Dynamic glowing blue sound ripple rings expanding from bottom left/right speakers */}
          <div className="absolute bottom-[2%] left-0 right-0 h-16 pointer-events-none z-0">
            {/* Left speaker waves */}
            <div className="absolute left-[20%] bottom-0 w-16 h-16 flex items-center justify-center">
              {[1, 2, 3].map((wave) => (
                <motion.div
                  key={`l-${wave}`}
                  animate={{ scale: [1, 3], opacity: [0.7, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: wave * 0.5, ease: "easeOut" }}
                  className="absolute w-6 h-6 border-2 border-cyan-400 rounded-full"
                />
              ))}
            </div>

            {/* Right speaker waves */}
            <div className="absolute right-[20%] bottom-0 w-16 h-16 flex items-center justify-center">
              {[1, 2, 3].map((wave) => (
                <motion.div
                  key={`r-${wave}`}
                  animate={{ scale: [1, 3], opacity: [0.7, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: wave * 0.5, ease: "easeOut" }}
                  className="absolute w-6 h-6 border-2 border-cyan-400 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Bottom status boundary marker */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>INFINIX BOX SPECS: HEAVY 16W COIL ARR</span>
            <span>DOLBY DEPTH CALIBRATION RES_BAND</span>
          </div>
        </div>
      );

    case 'custom-infinix-performance':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-neutral-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />
          
          {/* Header Title Section */}
          <div className="text-center py-2 z-10 w-full bg-zinc-950/80 border-b border-zinc-900">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#ECC06E] uppercase font-sans">
              POWERFUL PERFORMANCE
            </h2>
          </div>

          <div className="grid grid-cols-2 h-full w-full z-10">
            {/* Left Specs List with graphic pointers */}
            <div className="flex flex-col justify-center p-4 space-y-2.5 text-left border-r border-zinc-900 bg-black/40">
              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <span className="text-[9px] text-[#ECC06E]">⚡</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white leading-none">512MB RAM</span>
                  <span className="text-[6px] text-zinc-400 font-mono mt-0.5">High Speed Active Cache</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <span className="text-[9px] text-violet-400">💾</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white leading-none">4GB ROM</span>
                  <span className="text-[6px] text-zinc-400 font-mono mt-0.5">Local Storage Hub Space</span>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-5 h-5 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <span className="text-[9px] text-cyan-400">🔄</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white leading-none">60Hz Refresh Rate</span>
                  <span className="text-[6px] text-zinc-400 font-mono mt-0.5">Fluid Video Sync Response</span>
                </div>
              </div>
            </div>

            {/* Right microchip motherboard schematic drawing */}
            <div className="relative flex items-center justify-center p-2 overflow-hidden bg-[#070709]">
              {/* Circuit copper tracing graphic absolute */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full stroke-indigo-500 fill-none" viewBox="0 0 160 120">
                  <path d="M 0 30 L 50 30 L 70 50 L 110 50" strokeWidth="0.5" />
                  <path d="M 160 90 L 110 90 L 90 70 L 60 70" strokeWidth="0.5" />
                  <path d="M 80 0 L 80 40 L 90 50 L 90 120" strokeWidth="0.5" strokeDasharray="2 2" />
                  <circle cx="70" cy="50" r="1.5" className="fill-indigo-400" />
                  <circle cx="90" cy="70" r="1.5" className="fill-indigo-400" />
                </svg>
              </div>

              {/* Glowing Processor package */}
              <div className="relative w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 flex flex-col justify-between items-center shadow-[0_0_25px_rgba(79,70,229,0.3)] hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-indigo-600/10 rounded-lg blur-[2px] animate-pulse" />
                {/* Micro pins layout lines */}
                <div className="absolute inset-1.5 border border-zinc-700/60 rounded flex flex-col justify-between p-1">
                  <span className="text-[5.5px] font-bold text-zinc-500 font-mono leading-none tracking-widest text-center">INFINIX</span>
                  <span className="text-[5px] text-zinc-400 font-mono text-center">CORE V.1</span>
                </div>
                {/* Silicon die logic core center */}
                <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-cyan-600 via-indigo-600 to-indigo-800 flex items-center justify-center border border-indigo-400/30 relative z-10 shadow-lg">
                  <span className="text-[8px] font-black text-cyan-300 font-sans tracking-wide">QLED</span>
                  <span className="absolute w-2 h-2 rounded-full bg-white opacity-40 blur-[1px] animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom description banner */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full">
            <span>PERFORMANCE BLUEPRINT STATUS: SECURE</span>
            <span>HARDWARE BOARD COMPONENT REVISION: Y1</span>
          </div>
        </div>
      );

    case 'custom-infinix-specs':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />
          
          {/* Header Title Bar */}
          <div className="text-center py-2 z-10 w-full bg-zinc-950/80 border-b border-zinc-900">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#ECC06E] uppercase font-sans">
              DIMENSION & ASSEMBLY SPECIFICATION
            </h2>
          </div>

          {/* Engineering Drawings splits: Left Front TV, Right Side Prof */}
          <div className="grid grid-cols-2 h-full w-full z-10 p-3 items-center">
            {/* Left Front View Dimension Drawing */}
            <div className="relative h-28 flex flex-col items-center justify-center border-r border-zinc-900 bg-black/10">
              <span className="text-[6px] text-zinc-500 font-mono font-bold absolute top-1 uppercase tracking-widest">Front Silhouette</span>
              
              {/* Width Dimension Line (horizontal arrow) */}
              <div className="absolute top-[16%] left-[10%] right-[10%] flex items-center justify-between">
                <div className="w-1.5 h-1 bg-zinc-500" />
                <div className="h-[0.5px] bg-zinc-500 flex-grow relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-zinc-950 text-[5px] font-mono text-zinc-300 font-bold px-1 select-none">894 mm</span>
                  </div>
                </div>
                <div className="w-1.5 h-1 bg-zinc-500" />
              </div>

              {/* TV Screen body silhouette layout */}
              <div className="w-[102px] h-[58px] border-2 border-zinc-700 bg-zinc-900/40 rounded shadow-md relative flex items-center justify-center mt-3">
                {/* 102 cm (40") diagonal lines drawing */}
                <svg className="absolute inset-0 w-full h-full stroke-zinc-500/20 fill-none" viewBox="0 0 102 58">
                  <line x1="0" y1="0" x2="102" y2="58" strokeDasharray="1.5 1.5" />
                  <text x="44" y="32" className="fill-zinc-400 font-mono text-[7px] font-black" textAnchor="middle">102 CM</text>
                </svg>
                {/* Stand legs */}
                <div className="absolute bottom-[-6px] left-[18%] w-1 h-1.5 bg-zinc-600 transform skew-x-[-15deg]" />
                <div className="absolute bottom-[-6px] right-[18%] w-1 h-1.5 bg-zinc-600 transform skew-x-[15deg]" />
              </div>

              {/* Bezel Height Annotation */}
              <div className="absolute left-[3%] top-[34%] bottom-[20%] flex flex-col items-center justify-between">
                <div className="w-1 h-[0.5px] bg-zinc-500" />
                <div className="w-[0.5px] bg-zinc-500 flex-grow relative flex items-center justify-center">
                  <span className="bg-zinc-950 text-[4px] font-mono text-zinc-400 font-medium px-0.5 select-none transform rotate-[-90deg]">512mm</span>
                </div>
                <div className="w-1 h-[0.5px] bg-zinc-500" />
              </div>

              {/* Total Stand Height Annotation */}
              <div className="absolute right-[3%] top-[34%] bottom-[8%] flex flex-col items-center justify-between">
                <div className="w-1 h-[0.5px] bg-zinc-500" />
                <div className="w-[0.5px] bg-zinc-500 flex-grow relative flex items-center justify-center">
                  <span className="bg-zinc-950 text-[4px] font-mono text-[#ECC06E] font-black px-0.5 select-none transform rotate-[90deg]">557mm</span>
                </div>
                <div className="w-1 h-[0.5px] bg-zinc-500" />
              </div>
            </div>

            {/* Right Side Profile View with Specs details */}
            <div className="relative h-28 flex flex-col items-center justify-center bg-black/15 pl-4">
              <span className="text-[6px] text-zinc-500 font-mono font-bold absolute top-1 uppercase tracking-widest">Profile view</span>
              
              {/* Silhouette vertical bar showing back bump */}
              <svg className="w-12 h-[58px] text-zinc-500 fill-none mt-2" viewBox="0 0 40 58">
                {/* Panel thin bezel outline */}
                <line x1="25" y1="5" x2="25" y2="53" stroke="#52525b" strokeWidth="1" />
                {/* Back chassis bulge */}
                <path d="M 25 20 L 15 24 L 15 48 L 25 50" stroke="#71717a" strokeWidth="1" fill="#18181b" />
                {/* Stand leg base profile */}
                <path d="M 25 53 L 13 58" stroke="#ecc06e" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 25 53 L 34 58" stroke="#ecc06e" strokeWidth="1.5" strokeLinecap="round" />
              </svg>

              {/* Stand depth annotation list */}
              <div className="absolute bottom-1 right-2 left-2 flex justify-between items-center bg-black/50 border border-zinc-900 p-1 rounded">
                <span className="text-[5px] text-zinc-500 font-mono uppercase">Leg Stand Depth:</span>
                <span className="text-[6.2px] text-zinc-200 font-bold font-mono">192 mm</span>
              </div>
            </div>
          </div>

          {/* Bottom CAD reference bar */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full">
            <span>MECHANICAL CAD: FILE_Y1V_ASSEMBLY</span>
            <span>CHASSIS CALIBRATED RANGE RATIO: E1</span>
          </div>
        </div>
      );

    case 'custom-sony-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#0c0d12] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 md:p-6 border border-zinc-800 shadow-2xl select-none group ${className}`}
        >
          {/* Subtle grid background */}
          <MeshGrid />
          
          {/* Floating light particles behind Mount Fuji */}
          <div className="absolute inset-x-0 bottom-4 top-1/4 bg-radial-gradient from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* SONY logo on Top Right */}
          <div className="absolute top-4 right-6 z-20">
            <span className="text-[14px] md:text-[18px] font-black tracking-[0.22em] text-white font-serif uppercase leading-none">SONY</span>
          </div>

          {/* Main Visual: Mount Fuji, Samurai & Golden Petals Layer */}
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none">
            {/* Custom SVG Illustration of Mount Fuji silhouette, Sunset/Sky glowing, Samurai warrior, Autumn Leaves */}
            <svg className="w-full h-full object-cover" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="40%" stopColor="#2e1065" />
                  <stop offset="70%" stopColor="#4c1d95" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <radialGradient id="sunGlow" cx="50%" cy="40%" r="40%">
                  <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#fef08a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Sky Background */}
              <rect x="0" y="0" width="400" height="220" fill="url(#skyGrad)" />

              {/* Glowing Ambient sun behind Fuji mountain */}
              <circle cx="200" cy="90" r="70" fill="url(#sunGlow)" />

              {/* Mount Fuji (Symmetric steep mountain with majestic snowy peak) */}
              {/* Mountain shadow silhouette */}
              <polygon points="120,180 200,60 280,180" fill="#090d16" />
              {/* Snowcap Peak overlay */}
              <polygon points="172,103 200,60 228,103 218,108 200,98 182,108" fill="#f8fafc" opacity="0.95" />

              {/* Samurai Warrior facing towards Fuji, silhouette in foreground */}
              {/* Head / top-knot */}
              <circle cx="200" cy="125" r="3.5" fill="#020617" />
              <line x1="200" x2="204" y1="123" y2="120" stroke="#020617" strokeWidth="1.2" />
              {/* Shoulders & Cloak */}
              <path d="M 186 160 C 188 136, 196 130, 200 130 C 204 130, 212 136, 214 160 Z" fill="#020617" />
              {/* Dual Katana swords crossing behind back */}
              <line x1="204" x2="216" y1="136" y2="114" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="204" x2="214" y1="138" y2="118" stroke="#f1f5f9" strokeWidth="0.5" strokeLinecap="round" />
              {/* Foreground Golden Meadow floor */}
              <path d="M 0 170 Q 200 160 400 170 L 400 220 L 0 220 Z" fill="#eab308" fillOpacity="0.85" />
              <path d="M 0 180 Q 200 172 400 180 L 400 220 L 0 220 Z" fill="#ca8a04" />

              {/* Autumn Golden Leaves falling/blowing left to right */}
              {[
                { cx: 80, cy: 30, r: 2.2 },
                { cx: 110, cy: 55, r: 1.8 },
                { cx: 75, cy: 92, r: 2.5 },
                { cx: 125, cy: 115, r: 2 },
                { cx: 285, cy: 45, r: 2.8 },
                { cx: 310, cy: 85, r: 2.1 },
                { cx: 270, cy: 110, r: 1.5 },
                { cx: 290, cy: 135, r: 2.3 },
                { cx: 330, cy: 112, r: 2.5 },
                { cx: 245, cy: 105, r: 1.9 },
                { cx: 145, cy: 75, r: 2.2 }
              ].map((lf, i) => (
                <g key={i}>
                  <ellipse cx={lf.cx} cy={lf.cy} rx={lf.r * 1.5} ry={lf.r} fill="#f59e0b" transform={`rotate(${15 + i * 25} ${lf.cx} ${lf.cy})`} className="animate-pulse" />
                  <ellipse cx={lf.cx + 4} cy={lf.cy + 3} rx={lf.r * 1.2} ry={lf.r * 0.8} fill="#eab308" transform={`rotate(${30 + i * 20} ${lf.cx + 4} ${lf.cy + 3})`} />
                </g>
              ))}
            </svg>
          </div>

          {/* Left Feature Column: 43", 4K Ultra HD, Google TV, Live Color, Dolby Atmos, Refined specs */}
          <div className="relative z-10 font-sans text-left flex flex-col justify-start space-y-2 max-w-[170px] bg-black/45 backdrop-blur-md p-3.5 rounded-r-2xl border-r border-y border-white/5 shadow-2xl h-full mt-[-16px] ml-[-16px]">
            {/* Screen Size Badge */}
            <div className="mb-1">
              <span className="text-3xl md:text-5xl font-black italic tracking-tighter text-white font-sans leading-none block">43"</span>
              <span className="text-[7px] md:text-[8px] tracking-widest text-zinc-300 font-extrabold font-mono uppercase">4K Ultra HD</span>
            </div>

            {/* Google TV Pill */}
            <div className="flex items-center space-x-1.5 bg-black/60 border border-zinc-805 px-2 py-0.5 rounded-md max-w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[7px] text-white font-black uppercase tracking-wider font-mono">Google TV</span>
            </div>

            {/* Live Color Tech Display */}
            <div className="border border-gradient-to-r from-red-500 via-yellow-500 to-cyan-500 p-[1px] rounded">
              <div className="bg-black/80 px-1.5 py-0.5 rounded-[3px] text-center">
                <span className="text-[7px] font-black uppercase tracking-widest text-[#FFF]">LIVE COLOR</span>
              </div>
            </div>

            {/* Dolby Atmos Dolby Badge */}
            <div className="flex items-center space-x-1 font-mono text-[7px] text-zinc-300">
              <span className="text-cyan-400 font-bold">Dolby</span>
              <span className="font-semibold text-white">Atmos Sound</span>
            </div>

            {/* 4K X-Reality PRO */}
            <div className="bg-zinc-950/90 py-1 px-1.5 rounded border border-zinc-800 text-center font-mono">
              <span className="text-[6.5px] font-bold text-[#eab308] tracking-wider block">4K X-Reality PRO</span>
            </div>
          </div>

          {/* Bottom Row Labeling & Series */}
          <div className="relative z-10 flex justify-end items-end w-full mt-auto">
            {/* BRAVIA 2 II Series Signatures */}
            <div className="text-right font-sans bg-[#0c0d12]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-800 shadow-xl max-w-xs">
              <h3 className="text-lg md:text-2xl font-black text-white tracking-tight leading-none italic uppercase">
                BRAVIA <span className="text-[#ca8a04]">2 </span><span className="text-zinc-400">II</span>
              </h3>
              <p className="text-[6.5px] md:text-[7.5px] text-gray-400 font-mono tracking-widest uppercase mt-1 leading-none">
                Sony Intelligence Hub Edition
              </p>
            </div>
          </div>
        </div>
      );

    case 'custom-sony-audio':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#040508] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 md:p-6 border border-zinc-900 shadow-2xl select-none group ${className}`}
        >
          <MeshGrid />
          
          {/* Central Blue Backdrop ambient lighting */}
          <div className="absolute inset-x-10 top-5 bottom-5 bg-gradient-to-t from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[60px] pointer-events-none" />

          {/* Dynamic header labels */}
          <div className="text-center w-full z-10 py-1">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#ca8a04] uppercase font-mono">
              Immersive Surround Sound
            </h2>
            <h3 className="text-md md:text-xl font-black uppercase tracking-tighter text-white font-sans mt-0.5 flex items-center justify-center gap-2">
              <span>DOLBY ATMOS® CALIBRATED</span>
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            </h3>
          </div>

          {/* Room Wireframe Sketch: Sofa bottom left, Bravia 43" on wall displaying action sports racing car */}
          <div className="relative flex-grow flex items-center justify-center z-10 mt-2">
            
            {/* SONY TV on Wall visualization */}
            <div className="absolute top-[5%] right-[22%] w-[48%] aspect-video bg-black rounded border-2 border-zinc-700 shadow-2xl p-[1px] overflow-hidden flex flex-col justify-between">
              
              {/* Dynamic Action Formula Racecar drawing on TV */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/80 to-indigo-950/80 flex items-center justify-center">
                <svg className="w-full h-full stroke-cyan-400 fill-none text-cyan-400" viewBox="0 0 100 56">
                  {/* Dirt race trail line */}
                  <path d="M 0 44 Q 50 36 100 44" stroke="#4a5568" strokeWidth="1" />
                  {/* Exploding fast trail speeds */}
                  <line x1="10" y1="20" x2="33" y2="28" stroke="#ca8a04" strokeWidth="0.75" strokeDasharray="2 2" />
                  
                  {/* Formula Racecar silhouette outline */}
                  <path d="M 28 35 L 34 26 L 55 24 L 75 25 Q 85 28 92 33 L 92 38 Z" fill="#ffffff15" strokeWidth="1" />
                  {/* Rear wing stabilizer */}
                  <polygon points="26,35 24,20 34,20" fill="currentColor" strokeWidth="0.5" />
                  {/* Custom tires */}
                  <circle cx="44" cy="35" r="5" fill="#000" stroke="currentColor" strokeWidth="1" />
                  <circle cx="80" cy="35" r="5" fill="#000" stroke="currentColor" strokeWidth="1" />
                  <circle cx="44" cy="35" r="1.5" fill="#fff" />
                  <circle cx="80" cy="35" r="1.5" fill="#fff" />
                </svg>
              </div>

              {/* SONY logo on screen bezel */}
              <div className="w-full text-center pb-0.5 z-10 mt-auto bg-black/60">
                <span className="text-[4px] text-white tracking-widest uppercase font-serif">SONY</span>
              </div>
            </div>

            {/* Sovereign Cozy Sofa Couch bottom left */}
            <div className="absolute bottom-1 left-[8%] w-[33%] md:w-[30%] h-10 border border-zinc-850 bg-black/85 rounded-t-xl p-1 flex flex-col justify-end shadow-xl">
              <div className="flex justify-between w-full h-full gap-0.5">
                {/* Back Cushions */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-md flex-1" />
                <div className="bg-zinc-900 border border-zinc-800 rounded-md flex-1" />
                <div className="bg-zinc-900 border border-zinc-800 rounded-md flex-1" />
              </div>
              <div className="h-2.5 bg-zinc-850 rounded border border-zinc-800 mt-1 w-full" />
            </div>

            {/* Glowing Soundwave lines radiating from SONY wall TV to Sofa */}
            <div className="absolute top-[16%] right-[32%] bottom-[25%] left-[24%] pointer-events-none">
              <svg className="w-full h-full fill-none text-cyan-500 animate-pulse" viewBox="0 0 160 80">
                {/* Concentric expanding cyan Dolby audio waves */}
                {[1, 2, 3, 4].map((wave) => (
                  <motion.path
                    key={`aud-${wave}`}
                    d="M 120 25 A 35 35 0 0 0 35 55"
                    strokeWidth={1.5 - wave * 0.25}
                    className="text-cyan-400"
                    animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.3, 0.85, 0.3] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: wave * 0.4 }}
                    style={{ transformOrigin: "120px 25px" }}
                  />
                ))}
                
                {/* Secondary sound wave reflection lines */}
                {[1, 2].map((wave) => (
                  <motion.path
                    key={`aud-rev-${wave}`}
                    d="M 120 20 A 45 45 0 0 0 55 70"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                    className="text-amber-400"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.65, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: wave * 0.8 }}
                    style={{ transformOrigin: "120px 20px" }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Bottom status boundary */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>SONY DUAL STEERABLE AUDIO CHANNEL: CH-20W</span>
            <span>DOLBY ATMOS DECODER CALIBRATION: ACTIVE</span>
          </div>
        </div>
      );

    case 'custom-sony-box':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#090b0e] text-white rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-900 shadow-2xl select-none group ${className}`}
        >
          <MeshGrid />

          {/* Header Title Bar */}
          <div className="text-center py-2.5 z-10 w-full bg-zinc-950/90 border-b border-zinc-900">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-cyan-400 uppercase font-sans">
              WHAT'S INSIDE THE BOX SETUP
            </h2>
          </div>

          <div className="grid grid-cols-2 h-full w-full z-10 p-3.5 items-center gap-4">
            {/* Left Column: Lists of included materials (Image 3) */}
            <div className="flex flex-col justify-center space-y-2.5 text-left bg-black/45 border border-zinc-850 p-3.5 rounded-xl h-full shadow-inner">
              <span className="text-[8px] text-[#ca8a04] font-black uppercase tracking-widest block font-mono">Packaged Contents</span>
              
              <ul className="text-[9px] font-sans font-bold space-y-1.5 text-zinc-300">
                <li className="flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Sony BRAVIA 2 II 43" Screen x 1</span>
                </li>
                <li className="flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Premium Warranty Card x 1</span>
                </li>
                <li className="flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Heavy AC Power Cord Base x 1</span>
                </li>
                <li className="flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Standard Sony IR Remote x 1</span>
                </li>
                <li className="flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Heavy Duty AAA Batteries x 2</span>
                </li>
                <li className="flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>User Manual & Guide Booklet x 1</span>
                </li>
              </ul>
            </div>

            {/* Right Column: High Quality Technical blueprints of parts (TV, Remote, Batteries, Power line) */}
            <div className="relative h-full flex flex-wrap items-center justify-center p-2 rounded-xl bg-black/20 border border-zinc-900 select-none overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-cyan-900/10 via-transparent to-transparent opacity-50" />
              
              <svg className="w-full h-full text-zinc-500 fill-none stroke-current" viewBox="0 0 160 110">
                {/* TV screen graphic outline top section */}
                <g transform="translate(10, 10)" className="text-zinc-400">
                  <rect x="0" y="0" width="70" height="40" rx="1.5" strokeWidth="1.2" />
                  <line x1="15" y1="40" x2="10" y2="46" strokeWidth="1" />
                  <line x1="55" y1="40" x2="60" y2="46" strokeWidth="1" />
                  <line x1="8" y1="46" x2="62" y2="46" strokeWidth="0.8" />
                  <text x="35" y="24" className="text-[5.5px] font-mono fill-zinc-400 text-center uppercase tracking-wider stroke-none" textAnchor="middle">43" SONY TV</text>
                </g>

                {/* Remote control outline bottom left */}
                <g transform="translate(95, 10)" className="text-zinc-300">
                  <rect x="0" y="0" width="12" height="44" rx="2" strokeWidth="1" />
                  {/* Micro button grid dots */}
                  <circle cx="6" cy="6" r="1.5" className="fill-[#ef4444]" stroke="none" />
                  <circle cx="4" cy="14" r="0.8" />
                  <circle cx="8" cy="14" r="0.8" />
                  <circle cx="4" cy="20" r="0.8" />
                  <circle cx="8" cy="20" r="0.8" />
                  <rect x="3.5" y="26" width="5" height="4" rx="0.5" strokeWidth="0.5" />
                  <line x1="3" x2="9" y1="36" y2="36" strokeWidth="0.5" />
                  <line x1="3" x2="9" y1="39" y2="39" strokeWidth="0.5" />
                  <text x="6" y="-3" className="text-[4px] font-mono fill-zinc-400 text-center stroke-none" textAnchor="middle">REMOTE</text>
                </g>

                {/* Power Cord cable schema bottom right */}
                <g transform="translate(10, 68)" className="text-cyan-400">
                  {/* Double rounded plug prongs */}
                  <path d="M 5 15 C 5 9 15 9 15 15 L 15 25" strokeWidth="1" />
                  <rect x="7" y="25" width="6" height="8" rx="0.5" strokeWidth="1" />
                  {/* Dual metal pins */}
                  <line x1="8.5" x2="8.5" y1="33" y2="38" strokeWidth="1" />
                  <line x1="11.5" x2="11.5" y1="33" y2="38" strokeWidth="1" />
                  <text x="18" y="26" className="text-[4.5px] font-mono fill-zinc-400 stroke-none" textAnchor="start">POWER CORD</text>
                </g>

                {/* Triple AAA Batteries outlines bottom center-right */}
                <g transform="translate(90, 70)" className="text-[#eab308]">
                  {/* Battery 1 */}
                  <rect x="0" y="2" width="8" height="22" rx="0.5" strokeWidth="1" />
                  <rect x="2.5" y="0" width="3" height="2" strokeWidth="1" />
                  <line x1="2" x2="6" y1="10" y2="10" strokeWidth="0.8" />
                  <line x1="4" x2="4" y1="8" y2="12" strokeWidth="0.8" />
                  
                  {/* Battery 2 */}
                  <rect x="12" y="5" width="8" height="22" rx="0.5" strokeWidth="1" />
                  <rect x="14.5" y="3" width="3" height="2" strokeWidth="1" />
                  <line x1="14" x2="18" y1="13" y2="13" strokeWidth="0.8" />
                  <line x1="16" x2="16" y1="11" y2="15" strokeWidth="0.8" />
                  <text x="32" y="17" className="text-[4.5px] font-mono fill-zinc-400 stroke-none" textAnchor="start">AAA x 2</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Bottom cardboard labeling */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>PACKAGING STANDARDS: LEVEL-E PACK</span>
            <span>BOX CONTAINER CONTENTS LOGISTICS REVISION 2.1</span>
          </div>
        </div>
      );

    case 'custom-sony-dimensions':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#07090c] text-white rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-900 shadow-2xl select-none group ${className}`}
        >
          <MeshGrid />

          {/* Header Title Bar */}
          <div className="text-center py-2.5 z-10 w-full bg-zinc-950/90 border-b border-zinc-900">
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#ca8a04] uppercase font-sans">
              BEZEL BLUEPRINT & PHYSICAL MEASUREMENTS
            </h2>
          </div>

          {/* Dimension drawings workspace (Image 4) */}
          <div className="relative flex-grow flex items-center justify-center z-10 p-4">
            
            {/* Wide span annotation width line on TOP */}
            <div className="absolute top-[8%] left-[16%] right-[16%] flex items-center justify-between">
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-sm" />
              <div className="h-[0.5px] bg-zinc-500 flex-grow relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-[#07090c] text-[6px] font-mono text-[#ca8a04] font-black px-1.5 select-none uppercase tracking-widest">
                    37.71" / 95.8 cm Width
                  </span>
                </div>
              </div>
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-sm" />
            </div>

            {/* SONY BRAVIA front panel TV */}
            <div className="w-[144px] h-[82px] border-[2.2px] border-zinc-700 bg-zinc-950/70 rounded-md relative flex items-center justify-center mt-3 shadow-2xl overflow-hidden">
              
              {/* Inside screen display: Mount fuji watermarked diagonal specs */}
              <svg className="absolute inset-0 w-full h-full stroke-zinc-500/10 fill-none" viewBox="0 0 144 82">
                <defs>
                  <linearGradient id="diagonalLineGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                </defs>
                
                {/* Diagonal measurement lines and arrow hooks */}
                <line x1="8" y1="74" x2="136" y2="8" stroke="url(#diagonalLineGrad)" strokeWidth="1.2" strokeDasharray="3 3" />
                
                {/* Silhouette Mount Fuji sketch */}
                <polygon points="40,78 72,30 104,78" stroke="#374151" strokeWidth="0.4" />
                <polygon points="61,46 72,30 83,46" stroke="#4b5563" strokeWidth="0.4" />
                
                {/* Diagonal Tagging text */}
                <rect x="42" y="34" width="60" height="12" rx="2" fill="black" stroke="#ca8a04" strokeWidth="0.5" />
                <text x="72" y="42" className="text-[5.5px] font-mono fill-zinc-200 font-extrabold stroke-none text-center" textAnchor="middle">
                  43 inch / 108 cm
                </text>
              </svg>

              {/* Pedestal stand support rails at bottom */}
              <div className="absolute bottom-[-1px] left-[15%] w-2 h-2.5 bg-zinc-650 rounded-b transform skew-x-[-12deg] shadow-lg" />
              <div className="absolute bottom-[-1px] right-[15%] w-2 h-2.5 bg-zinc-650 rounded-b transform skew-x-[12deg] shadow-lg" />
            </div>

            {/* Bezel height annotation line on RIGHT */}
            <div className="absolute right-[4%] top-[18%] bottom-[12%] flex flex-col items-center justify-between">
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-sm" />
              <div className="w-[0.5px] bg-zinc-500 flex-grow relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-[#07090c] text-[5.5px] font-mono text-[#06b6d4] font-black px-1.5 select-none transform rotate-[90deg] whitespace-nowrap uppercase tracking-wider">
                    22.44" / 57.0 cm Height
                  </span>
                </div>
              </div>
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-sm" />
            </div>
          </div>

          {/* Bottom CAD calibration bar */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>SONY BLUEPRINT REFERENCE: K-43S22BM2-DIM</span>
            <span>CHASSIS DEPTH PROFILE VALUE: EXTRA SLIM</span>
          </div>
        </div>
      );

    case 'custom-samsung-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#02040a] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 border border-zinc-850 shadow-2xl select-none group/samsung ${className}`}
        >
          <MeshGrid />
          
          {/* Neon Purple-Blue Backlight ambient glow */}
          <div className="absolute inset-x-8 top-8 bottom-4 bg-gradient-to-tr from-blue-600/25 via-violet-600/10 to-transparent rounded-full blur-[50px] pointer-events-none" />

          {/* Top Row: Samsung Brand & Left Matrix label */}
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest text-[#00a3ff] font-sans">SAMSUNG</span>
              <span className="text-[5.5px] tracking-widest text-zinc-400 font-extrabold font-mono uppercase mt-0.5">
                NEO QLED 4K QUANTUM ENGINE
              </span>
            </div>
            
            <div className="flex items-center space-x-1 border border-zinc-800 bg-black/60 px-2 py-0.5 rounded">
              <span className="text-[5px] font-black text-[#a1a1aa] uppercase tracking-widest font-mono">
                98" MODEL QA98QN90A
              </span>
            </div>
          </div>

          {/* Core Screen Visual Art: Pulsing Neon Cube Spectrum */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.div 
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="relative w-40 h-40 flex items-center justify-center opacity-85"
            >
              <svg className="w-full h-full text-indigo-400 fill-none stroke-current" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="samsungCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#02040a" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="10" fill="url(#samsungCore)" />
                <rect x="35" y="35" width="30" height="30" rx="4" stroke="#00a3ff" strokeWidth="0.8" className="animate-pulse" />
                <rect x="25" y="25" width="50" height="50" rx="8" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="#3b82f6" strokeWidth="0.25" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#3b82f6" strokeWidth="0.25" />
              </svg>
            </motion.div>
          </div>

          {/* Bottom Row Labelings */}
          <div className="flex justify-between items-end z-10 w-full mt-auto">
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-3 py-1.5 rounded-r-xl border border-blue-600/30">
              <div className="text-2xl font-black italic leading-none font-sans">98"</div>
              <div className="text-[5.5px] font-extrabold uppercase tracking-widest mt-0.5 font-mono">NEO QLED CHASSIS</div>
            </div>

            <div className="flex flex-col items-end text-right bg-black/80 p-2 rounded-lg border border-zinc-800">
              <span className="text-[8px] font-black text-white tracking-widest uppercase">QUANTUM MATRIX PRO</span>
              <span className="text-[6px] font-bold text-zinc-400 font-mono mt-0.5">120W Dolby Atmos Sound Ready</span>
            </div>
          </div>

          {/* Silent Thin Support stand legs */}
          <div className="absolute bottom-0 left-[24%] right-[24%] h-0.5 bg-zinc-800 rounded-t-sm" />
        </div>
      );

    case 'custom-oneplus-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#050505] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 border border-zinc-900 shadow-2xl select-none group/oneplus ${className}`}
        >
          <MeshGrid />

          {/* Red and cyan neon backlight fluid blend */}
          <div className="absolute -inset-10 bg-gradient-to-r from-[#f43f5e]/15 via-transparent to-cyan-500/10 rounded-full blur-[60px]" />

          {/* Top Row: OnePlus Branding logo */}
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="px-1.5 py-0.5 bg-[#f43f5e] text-white rounded font-sans font-black text-[9px] leading-none mb-0.5">1+</span>
                <span className="text-lg font-black tracking-tighter text-white font-sans">ONEPLUS</span>
              </div>
              <span className="text-[6px] tracking-widest text-[#f43f5e] font-black font-mono uppercase mt-0.5">
                BEZEL-LESS DISPLAY CORE
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 block animate-ping" />
              <span className="text-[5.5px] font-bold tracking-widest uppercase font-mono text-zinc-300">
                QC Certified Renewed
              </span>
            </div>
          </div>

          {/* Fluid colorful flow center graphic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-56 h-28 transform overflow-hidden rounded-lg border border-zinc-900/20 bg-black/45 p-1">
              <svg className="w-full h-full text-rose-500 fill-none" viewBox="0 0 100 50">
                <path d="M 0 30 Q 25 10 50 25 T 100 20 L 100 50 L 0 50 Z" fill="url(#opFluid)" className="opacity-95" />
                <path d="M 0 35 C 30 20, 60 40, 100 28 L 100 50 L 0 50 Z" fill="#06b6d4" fillOpacity="0.25" />
                <defs>
                  <linearGradient id="opFluid" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Bottom Spec badges */}
          <div className="flex justify-between items-end z-10 w-full mt-auto">
            <div className="bg-[#f43f5e] text-white px-2.5 py-1 rounded-r-lg shadow-lg">
              <span className="text-lg font-black italic leading-none font-sans">50"</span>
            </div>

            <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-md p-1.5 rounded-lg border border-zinc-800">
              <div className="flex flex-col text-right">
                <span className="text-[7.5px] font-black uppercase text-zinc-100 font-sans tracking-wide">30W Dynaudio Stack</span>
                <span className="text-[5.5px] text-zinc-400 font-mono mt-0.5">Gamma Engine AI Enabled</span>
              </div>
            </div>
          </div>

          {/* Base pedestal supports */}
          <div className="absolute bottom-0 left-[20%] w-1.5 h-2 bg-zinc-650" />
          <div className="absolute bottom-0 right-[20%] w-1.5 h-2 bg-zinc-650" />
        </div>
      );

    case 'custom-wobble-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#030303] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          {/* Vibrant Red Neon Backlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-red-950/10 to-transparent blur-[40px] pointer-events-none" />
          <MeshGrid />

          {/* Core TV Bezel Screen display inside border */}
          <div className="absolute inset-1 bg-[#d91d1d]/90 m-1 rounded-lg overflow-hidden flex flex-col justify-between p-4 flex-1">
            {/* Artistic Backdrop Wave with model / visual elements */}
            <div className="absolute inset-0 bg-radial-gradient from-red-500 via-red-700 to-red-950 flex items-center justify-between pointer-events-none">
              <div className="absolute inset-0 opacity-15">
                <svg className="w-full h-full stroke-white" viewBox="0 0 320 180" fill="none">
                  <path d="M 0 90 Q 80 40 160 90 T 320 90" strokeWidth="1" />
                  <path d="M 0 110 Q 80 60 160 110 T 320 110" strokeWidth="0.5" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Vector representation of model portrait styled as a futuristic agent with sunglasses */}
              <div className="absolute inset-y-0 right-4 w-44 flex items-center justify-center opacity-90">
                <svg className="w-full h-full text-zinc-900 fill-current" viewBox="0 0 100 100">
                  {/* Cyber Agent Head Silhouette */}
                  <path d="M 40 40 C 40 10, 80 10, 80 40 C 80 55, 75 75, 45 80 C 42 70, 41 60, 40 40 Z" fill="#000" />
                  {/* Bob haircut outline */}
                  <path d="M 33 40 C 33 5, 87 5, 87 40 C 87 45, 85 55, 80 65 C 75 55, 78 40, 75 42 L 50 42 C 45 40, 42 45, 33 40 Z" fill="#090d16" />
                  {/* Cyber glasses/visor */}
                  <polygon points="35,32 75,32 72,48 42,48" fill="#06b6d4" className="opacity-80 animate-pulse" />
                  <polygon points="37,34 73,34 71,46 44,46" fill="#020617" />
                  {/* High collar neck coat */}
                  <path d="M 45 80 C 47 70, 73 70, 75 80 L 80 100 L 40 100 Z" fill="#020617" />
                </svg>
              </div>
            </div>

            {/* Top Bar inside active OLED display screen */}
            <div className="flex justify-between items-start z-10 w-full col-span-12">
              {/* Bold 32 HD Logo Red Tagging badge */}
              <div className="bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-805 shadow-md flex flex-col items-start text-left">
                <span className="text-xl md:text-2xl font-black tracking-tighter text-white font-sans leading-none">32 HD</span>
                <span className="text-[5.5px] font-bold text-[#06b6d4] uppercase tracking-widest font-mono mt-0.5">Google TV with Android 14</span>
              </div>

              {/* Brand logo: wobble in distinctive font */}
              <div className="flex flex-col items-end text-right">
                <span className="text-2xl font-black font-sans leading-none tracking-tighter text-white italic">wobble</span>
                <span className="text-[6.5px] font-black uppercase text-white/80 font-mono tracking-widest mt-1">2025 Flagship Edition</span>
              </div>
            </div>

            {/* Display Center Spec pills on the Left */}
            <div className="flex flex-col justify-end space-y-1.5 max-w-[150px] text-left z-10 mt-auto ml-1">
              <div className="flex items-center space-x-1.5 bg-black/80 backdrop-blur-md rounded-lg py-1 px-2 border border-white/5 shadow">
                <span className="text-[6.5px] font-black text-rose-500 font-sans leading-none">[ FSE ]</span>
                <span className="text-[6.5px] text-zinc-200 font-mono font-bold uppercase leading-none">Frame Stabilization Engine</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-black/80 backdrop-blur-md rounded-lg py-1 px-2 border border-white/5 shadow">
                <span className="text-[7px] text-yellow-400">⚡</span>
                <span className="text-[6.5px] text-zinc-200 font-mono font-bold uppercase leading-none">30W Super Audio Speakers</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-[#06b6d4] text-black rounded-lg py-1 px-2 border border-cyan-400/30 shadow">
                <span className="text-[6.5px] font-mono font-black uppercase tracking-wider leading-none">ZERO FRAME DESIGN</span>
              </div>
            </div>

            {/* Solid localized stamps label: "MADE IN INDIA" */}
            <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end text-right bg-black/60 px-2.5 py-1 rounded">
              <span className="text-[5px] font-bold text-zinc-400 uppercase tracking-widest leading-none font-mono">Manufacture Hub</span>
              <span className="text-[8px] font-extrabold text-white uppercase tracking-wider mt-0.5 font-sans">MADE IN INDIA</span>
            </div>
          </div>

          {/* Pedestal feet support pins */}
          <div className="absolute bottom-0 left-[18%] w-1.5 h-1.5 bg-gradient-to-t from-zinc-950 to-zinc-650 transform skew-x-[-15deg]" />
          <div className="absolute bottom-0 right-[18%] w-1.5 h-1.5 bg-gradient-to-t from-zinc-950 to-zinc-650 transform skew-x-[15deg]" />
        </div>
      );

    case 'custom-wobble-grid':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />

          {/* Zero Frame Design grid layout */}
          <div className="grid grid-cols-12 gap-1.5 h-full w-full z-10 p-1">
            {/* Top Left: Bezel Info */}
            <div className="col-span-4 bg-zinc-900/65 border border-zinc-800 rounded-lg p-1.5 flex flex-col justify-between text-left">
              <span className="text-[7px] font-mono font-black text-cyan-400 uppercase tracking-widest leading-none">Bezel Outline</span>
              <div className="text-[9px] font-black uppercase text-white font-sans mt-0.5">ZERO FRAME DESIGN</div>
              <div className="w-full h-3 border border-dashed border-zinc-650 mt-1 relative">
                <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
              </div>
            </div>

            {/* Top Right: FSE chip */}
            <div className="col-span-8 bg-zinc-900/65 border border-zinc-800 rounded-lg p-1.5 flex flex-col justify-between text-left">
              <div className="flex justify-between items-center w-full">
                <span className="text-[7px] font-mono font-black text-yellow-500 uppercase tracking-widest leading-none">ENGINE COR</span>
                <span className="bg-yellow-500 text-black text-[5.5px] px-1 py-0.2 rounded font-mono font-black">FSE</span>
              </div>
              <div className="text-[9px] font-black uppercase text-white font-sans mt-0.5">Frame Stabilization Engine</div>
              <span className="text-[5.5px] text-zinc-400 font-mono">Dynamic motion stabilization & HDR15 depth processing.</span>
            </div>

            {/* Center Box: Complete snowy mountain cinematic landscape */}
            <div className="col-span-12 bg-black border border-zinc-850 h-13 rounded-lg overflow-hidden relative p-[1px] shadow-lg flex items-center justify-center">
              {/* Dynamic Mountain Range landscape wireframe */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/35 to-indigo-950/20" />
              <svg className="absolute inset-x-0 bottom-0 top-1 w-full h-full fill-none" viewBox="0 0 300 50">
                {/* Silhouette mountains */}
                <polygon points="10,50 60,15 110,50" fill="#0c4a6e" className="opacity-20" />
                <polygon points="80,50 140,8 200,50" fill="#0369a1" className="opacity-35" />
                <polygon points="160,50 210,18 260,50" fill="#0284c7" className="opacity-25" />
                {/* Snowy mountain range line */}
                <path d="M 0 45 L 30 38 L 60 15 L 75 30 L 140 8 L 175 35 L 210 18 L 245 42 L 300 45" stroke="#38bdf8" strokeWidth="1" />
                <text x="150" y="44" className="text-[6px] font-black font-sans fill-white tracking-widest uppercase text-center" textAnchor="middle">wobble 32" CINEMATIC</text>
              </svg>
            </div>

            {/* Bottom Row: Dolby Left + Subwoofer Audio Output */}
            <div className="col-span-5 bg-zinc-900/65 border border-zinc-800 rounded-lg p-1.5 flex flex-col justify-between text-left">
              <span className="text-[7.5px] font-mono font-black text-violet-400 uppercase tracking-widest leading-none">CODEL CALIB</span>
              <div className="text-[9px] font-black uppercase text-white font-sans mt-0.5">DOLBY AUDIO</div>
              <span className="text-[5px] text-zinc-400 font-mono">Premium digital dual-channel matrix decoder.</span>
            </div>

            {/* Bottom Speaker: 30W Super Audio output logo */}
            <div className="col-span-7 bg-zinc-900/65 border border-zinc-800 rounded-lg p-1.5 flex flex-col justify-between text-left">
              <div className="flex justify-between items-center w-full">
                <span className="text-[7px] font-mono font-black text-emerald-400 uppercase tracking-widest leading-none">SOUND DEPTH</span>
                <span className="text-[9px] font-mono font-black text-emerald-400">30W</span>
              </div>
              <div className="text-[9px] font-black uppercase text-white font-sans mt-0.5">30W SUPER AUDIO SPEAKER</div>
              <span className="text-[5.5px] text-zinc-400 font-mono">Double high-velocity voice-coil audio array.</span>
            </div>
          </div>
        </div>
      );

    case 'custom-wobble-audio':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#040406] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />

          {/* Large text banners overlay */}
          <div className="text-center w-full z-10 pt-2">
            <h2 className="text-sm md:text-md font-black tracking-widest text-[#06b6d4] uppercase font-sans leading-none">
              Dolby Audio | 30W SUPER AUDIO
            </h2>
            <p className="text-[5.5px] md:text-[6.5px] text-zinc-400 font-extrabold uppercase tracking-[0.2em] font-mono mt-1.5">
              30W HIGH VELOCITY DUAL SPEAKER ARR
            </p>
          </div>

          {/* Home theater room surround setup display illustration */}
          <div className="relative w-full h-24 flex items-center justify-center z-10">
            {/* Ambient sound ray rings stretching outwards from bottom center speakers */}
            <svg className="absolute inset-0 w-full h-full fill-none animate-pulse" viewBox="0 0 320 96">
              {/* Symmetrical expanding circle ripples */}
              <ellipse cx="160" cy="85" rx="50" ry="25" stroke="#0ea5e9" strokeWidth="0.6" strokeDasharray="3 3" />
              <ellipse cx="160" cy="85" rx="95" ry="42" stroke="#22d3ee" strokeWidth="0.5" />
              <ellipse cx="160" cy="85" rx="145" ry="60" stroke="#06b6d4" strokeWidth="0.4" />
              <ellipse cx="160" cy="85" rx="195" ry="80" stroke="#0891b2" strokeWidth="0.3" className="opacity-90 animate-ping" />

              {/* Minimal Couch representation in center of sound fields */}
              <rect x="135" y="70" width="50" height="15" rx="1.5" fill="#1c1917" stroke="#444" strokeWidth="0.5" />
              <rect x="142" y="65" width="36" height="5" rx="1" fill="#1c1917" />
              {/* Virtual audience heads */}
              <circle cx="148" cy="58" r="3" fill="#888" />
              <circle cx="172" cy="58" r="3" fill="#888" />

              {/* Front Television outline panel block */}
              <rect x="125" y="10" width="70" height="35" rx="2" fill="black" stroke="#22c55e" strokeWidth="1" />
              <line x1="150" y1="45" x2="150" y2="48" stroke="#22c55e" strokeWidth="1" />
              <line x1="140" y1="48" x2="180" y2="48" stroke="#22c55e" strokeWidth="1" />
              <text x="160" y="28" className="text-[5.5px] font-sans fill-zinc-100 font-black text-center" textAnchor="middle">wobble 30W TV</text>
            </svg>
          </div>

          {/* Bottom decorative bar */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>SOUND WAVE RESPONSE RANGE: 30HZ-20KHZ</span>
            <span>SPEC DECODER MODE: DOLBY PRO LOGIC STACK</span>
          </div>
        </div>
      );

    case 'custom-wobble-googletv':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />

          {/* Header OS signature line branding */}
          <div className="flex justify-between items-center px-3.5 py-1 z-10 bg-zinc-950 border-b border-zinc-900 w-full mb-1">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-black text-white font-sans uppercase">Google TV</span>
            </div>
            <span className="text-[6.5px] font-mono font-black text-zinc-400 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.2">Android 14 OS</span>
          </div>

          {/* Google TV UI simulation elements */}
          <div className="flex-grow m-1.5 bg-[#0a0a0c] border border-zinc-900 rounded-xl p-2.5 flex flex-col justify-between z-10 shadow-inner">
            {/* Navigation Tabs bar inside UI */}
            <div className="flex justify-between items-center border-b border-zinc-900/60 pb-1 w-full shrink-0">
              <div className="flex space-x-2 text-[6px] font-bold text-zinc-350 uppercase tracking-wider">
                <span className="text-white border-b-2 border-cyan-400 select-all font-black">For you</span>
                <span className="hover:text-white transition-colors cursor-pointer">Movies</span>
                <span className="hover:text-white transition-colors cursor-pointer">Shows</span>
                <span className="hover:text-white transition-colors cursor-pointer">Apps</span>
                <span className="hover:text-white transition-colors cursor-pointer">Library</span>
              </div>
              <span className="text-[6.5px] font-mono text-cyan-400 font-extrabold flex items-center">🔍 SEARCH</span>
            </div>

            {/* Simulated Hero image movie cover slider */}
            <div className="flex-grow flex items-center justify-between gap-2.5 mt-1.5">
              <div className="flex-1 flex flex-col text-left justify-center space-y-1">
                <span className="text-[10px] font-black text-white leading-none font-sans uppercase">Doctor Strange in the Multiverse</span>
                <span className="text-[5px] text-zinc-400 font-medium">Explore alternative realities on your watchlists.</span>
                <div className="flex gap-1.5">
                  <span className="bg-[#06b6d4] text-black text-[5px] px-1.5 py-0.2 rounded font-black uppercase">Play Movie</span>
                  <span className="bg-zinc-800 text-white text-[5px] px-1.5 py-0.2 rounded font-black border border-zinc-700 uppercase">Save List</span>
                </div>
              </div>

              {/* Poster thumbnail graphic */}
              <div className="w-[85px] h-[45px] rounded-lg border border-red-500/20 bg-gradient-to-tr from-rose-950/25 to-zinc-900 relative overflow-hidden shrink-0 shadow flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-indigo-900/10" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 85 45">
                  <circle cx="42" cy="22" r="10" stroke="#f43f5e" strokeWidth="0.8" className="animate-pulse" />
                </svg>
                <span className="text-[5.5px] font-bold text-white uppercase font-sans tracking-wide z-10 text-center">DOCTOR STRANGE</span>
              </div>
            </div>

            {/* Bottom shelf with total apps counts labels */}
            <div className="mt-1.5 flex justify-between items-center pt-1 border-t border-zinc-900/60 shrink-0 w-full">
              <span className="text-[5.5px] font-bold text-zinc-400 uppercase tracking-widest font-mono">10,000+ Apps Ready</span>
              <div className="flex space-x-1 select-none">
                {['▶', '🎬', '⭐', '✓', '🎨', 'O'].map((app, i) => (
                  <span key={i} className="w-2.5 h-2.5 rounded bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[4px] font-bold">{app}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom metadata tags */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full">
            <span>CHROMECAST BUILT-IN CHIP ENAB</span>
            <span>GOOGLE CAST LICENSED CORE ENGINE</span>
          </div>
        </div>
      );

    case 'custom-wobble-profiles':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#060608] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />

          {/* Header model description info */}
          <div className="text-center pt-1.5 z-10">
            <span className="text-[7.5px] font-mono font-black text-rose-500 uppercase tracking-widest leading-none">Chassis Profiles Blueprints</span>
            <h2 className="text-xs md:text-sm font-black tracking-widest text-[#FFF] uppercase font-sans mt-0.5">
              SLIM SILHOUETTE DESIGN WOBBLE
            </h2>
          </div>

          {/* Isometric three views: side profiles and pedestal feet blueprint views */}
          <div className="flex-1 flex items-center justify-around h-24 my-1 z-10 px-4">
            {/* View A: Left profile view */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[5.5px] font-mono font-bold text-zinc-400 uppercase">Left Profile</span>
              <svg className="w-11 h-20 text-zinc-500 fill-none" viewBox="0 0 30 60">
                {/* Slim Side Bezel Silhouette */}
                <rect x="13" y="10" width="4" height="40" rx="0.5" fill="#1c1917" stroke="#06b6d4" strokeWidth="0.8" />
                <rect x="11" y="24" width="2" height="12" rx="0.2" fill="#000" />
                {/* Base pedestal support pins */}
                <path d="M 15 50 L 5 57 L 25 57 Z" fill="#222" stroke="#555" strokeWidth="0.5" />
              </svg>
            </div>

            {/* View B: Bottom view schematic */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[5.5px] font-mono font-bold text-zinc-400 uppercase">Bottom View</span>
              <svg className="w-24 h-11 text-zinc-500 fill-none" viewBox="0 0 100 40">
                {/* Horizontal long bar */}
                <rect x="10" y="15" width="80" height="8" rx="1" fill="#111" stroke="#22d3ee" strokeWidth="0.8" />
                {/* Sound grille slats bottom firing */}
                <line x1="16" y1="19" x2="32" y2="19" stroke="#444" strokeWidth="1.5" strokeDasharray="1 1" />
                <line x1="68" y1="19" x2="84" y2="19" stroke="#444" strokeWidth="1.5" strokeDasharray="1 1" />
                {/* Dual support stands bottom profiles */}
                <rect x="22" y="23" width="4" height="5" fill="#444" />
                <rect x="74" y="23" width="4" height="5" fill="#444" />
              </svg>
            </div>

            {/* View C: Right profile view */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[5.5px] font-mono font-bold text-zinc-400 uppercase">Right Profile</span>
              <svg className="w-11 h-20 text-zinc-500 fill-none" viewBox="0 0 30 60">
                {/* Same as left profile flipped or mirroring */}
                <rect x="13" y="10" width="4" height="40" rx="0.5" fill="#1c1917" stroke="#06b6d4" strokeWidth="0.8" />
                <rect x="17" y="22" width="2" height="14" rx="0.2" fill="#000" />
                <path d="M 15 50 L 5 57 L 25 57 Z" fill="#222" stroke="#555" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          {/* Bottom status CAD limits */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-905 z-10 w-full mt-auto">
            <span>BLUEPRINT DESIGN REFRENCED CODE: WB-BEZ-SLIM</span>
            <span>CHASSIS TYPE: ULTRALIGHT SLIM CONTOUR</span>
          </div>
        </div>
      );

    case 'custom-wobble-dimensions':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#06060a] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />

          {/* Main Layout containing dual columns: Screen Specs CAD display and Star Rating label */}
          <div className="grid grid-cols-12 gap-2 flex-grow h-28 mt-2.5 z-10 items-stretch px-1">
            {/* Screen layout blueprints: Column Left */}
            <div className="col-span-8 bg-black/60 border border-zinc-850 rounded-xl p-2.5 relative flex flex-col justify-between shadow-sm">
              <span className="text-[6px] font-mono font-black text-cyan-400 uppercase tracking-widest leading-none">Screen Measurements</span>
              
              <div className="relative flex-grow flex items-center justify-center p-1 mt-1.5">
                {/* Screen Outline block */}
                <div className="w-32 h-16 border-[1.5px] border-zinc-700 bg-zinc-950/70 rounded relative flex items-center justify-center shadow-lg overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full stroke-zinc-500/15 fill-none" viewBox="0 0 128 64">
                    {/* Diagonal Screen Arrow line */}
                    <line x1="6" y1="58" x2="122" y2="6" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="64" y="32" className="text-[6.5px] font-mono fill-zinc-200 font-extrabold stroke-none text-center" textAnchor="middle">
                      32 inch / 80.01 cm
                    </text>
                  </svg>
                </div>

                {/* Left/Right arrow margins */}
                <div className="absolute left-1 flex flex-col items-center justify-center text-[4.5px] font-mono text-zinc-400">
                  <span className="scale-[0.8]">42.6cm</span>
                </div>
                <div className="absolute top-0 right-14 text-[4.5px] font-mono text-zinc-400">
                  <span className="scale-[0.8]">71.6 cm Width</span>
                </div>
              </div>

              <div className="flex justify-between text-[4.5px] md:text-[5.5px] font-mono text-zinc-400 uppercase border-t border-zinc-900 pt-1 mt-1.5">
                <span>Thickness: 8.6cm</span>
                <span>Stand Height: 48.7cm</span>
              </div>
            </div>

            {/* BEE Star Rating Label replication: Column Right */}
            <div className="col-span-4 bg-white text-black p-2 rounded-xl border border-zinc-200 relative flex flex-col justify-between shadow">
              {/* Header Star title */}
              <div className="text-center bg-green-700 text-white rounded text-[5px] font-sans font-black uppercase py-0.5 tracking-wide leading-none select-none">
                SAVINGS GUIDE
              </div>

              {/* Star array displaying 1 star */}
              <div className="flex justify-center space-x-0.5 my-1 text-[7px] text-zinc-300">
                <span className="text-red-500 animate-pulse">★</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
              </div>

              {/* Annual Energy consumption score */}
              <div className="text-center bg-zinc-50 border border-zinc-200 rounded p-1">
                <div className="text-[10px] font-black font-mono leading-none text-zinc-900">62*</div>
                <div className="text-[4px] font-extrabold text-zinc-500 uppercase tracking-tighter mt-0.5 font-mono">kWh/Year Year</div>
              </div>

              {/* Star Rating details */}
              <div className="text-[4px] font-extrabold text-zinc-650 font-mono text-center leading-tight">
                Model: WB32K <br />
                Label: 2025
              </div>
            </div>
          </div>

          {/* Bottom status boundary */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>BEE ELECTRIC STAR REGISTER: WOBBLE-32K-ENERGY</span>
            <span>STANDARD WEIGHT MEASURE: 3.8 KG WITH LEG RA</span>
          </div>
        </div>
      );

    case 'custom-wobble-ports':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#050505] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-900 shadow-2xl select-none ${className}`}
        >
          <MeshGrid />

          {/* Symmetrical Left/Right Split layout */}
          <div className="grid grid-cols-12 gap-2 flex-grow h-28 mt-2 z-10 items-stretch px-1">
            {/* Sidebar Columns of actual port descriptions */}
            <div className="col-span-4 bg-zinc-950/70 border-r border-zinc-900 p-2 flex flex-col justify-between text-left">
              <div>
                <span className="text-[7.5px] font-mono font-black text-amber-500 uppercase tracking-widest leading-none">Port Matrix</span>
                <h3 className="text-sm font-black uppercase text-white font-sans mt-0.5 leading-none">MULTI PORTS</h3>
              </div>
              <p className="text-[5.5px] text-zinc-400 font-mono leading-relaxed pb-1 leading-normal">
                Symmetric integration layout gives dual HDMI slot and cable connection matrix accessibility.
              </p>
            </div>

            {/* List with rich vector styled ports schemas */}
            <div className="col-span-8 p-1 flex flex-col justify-around divide-y divide-zinc-900">
              {[
                { name: 'HDMI 1.4 x3 Ports', desc: 'Secure high definition streams', icon: '◰' },
                { name: 'USB 2.0 x2 Media slots', desc: 'Local video/audio disk playback', icon: '▮' },
                { name: 'LAN PORT / Ethernet Wire', desc: 'Direct stable internet sync up to 100Mbps', icon: '◳' },
                { name: 'Optic Node & AV IN ports', desc: 'Sound bar outputs integration spec', icon: '⚙' }
              ].map((port, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 first:pt-0 last:pb-0">
                  <div className="flex items-center space-x-2 text-left">
                    <span className="text-cyan-400 font-mono text-[9px] font-black">{port.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-[7.5px] font-black text-white leading-tight font-sans uppercase">{port.name}</span>
                      <span className="text-[5.5px] text-zinc-400 font-mono leading-none mt-0.5">{port.desc}</span>
                    </div>
                  </div>
                  <span className="text-[5px] font-mono font-bold text-zinc-500 uppercase">Secure Core</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom status regulatory labels */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>INPUT CONNECTIONS MATR_PORT_SPEC_CO</span>
            <span>LICENSED CHASSIS INGRESS PORTS VALUE: VERIFIED</span>
          </div>
        </div>
      );

    case 'custom-vw-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#000] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 border border-zinc-900 shadow-2xl select-none  cursor-pointer ${className}`}
        >
          {/* Backlight / Ambient blur */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-pink-600/10 to-transparent blur-[40px] pointer-events-none" />
          <MeshGrid />

          {/* Active Screen Display (inner area inside thin border) */}
          <div className="absolute inset-1 bg-black m-1 rounded-lg overflow-hidden flex flex-col justify-between p-3.5 flex-1 border border-zinc-800">
            {/* Colorful Visio World flow gradient artwork background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#120f26] via-[#2d113a] to-[#40121a] flex items-center justify-between pointer-events-none">
              {/* Complex color waves with smooth colorful blend shapes */}
              <div className="absolute inset-0 opacity-80 mix-blend-screen">
                <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
                  <path d="M-50,90 Q50,-40 180,90 T400,90 L400,200 L-50,200 Z" fill="url(#vw-wave-gold)" opacity="0.6"/>
                  <path d="M-20,110 Q80,20 220,110 T450,110 L450,200 L-20,200 Z" fill="url(#vw-wave-rainbow)" opacity="0.45"/>
                  <path d="M-80,60 Q120,160 280,60 T600,60 L600,200 L-80,200 Z" fill="url(#vw-wave-cyan)" opacity="0.3"/>
                  <defs>
                    <linearGradient id="vw-wave-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b"/>
                      <stop offset="50%" stopColor="#ef4444"/>
                      <stop offset="100%" stopColor="#ec4899"/>
                    </linearGradient>
                    <linearGradient id="vw-wave-rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981"/>
                      <stop offset="40%" stopColor="#3b82f6"/>
                      <stop offset="80%" stopColor="#8b5cf6"/>
                      <stop offset="100%" stopColor="#ec4899"/>
                    </linearGradient>
                    <linearGradient id="vw-wave-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4"/>
                      <stop offset="100%" stopColor="#3b82f6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Content Overlays */}
            <div className="flex justify-between items-start z-10 w-full col-span-12">
              {/* Pure View Series Badge (Classic VW Style but updated for 32" model / high contrast) */}
              <div className="bg-white/95 text-black p-2 rounded-xl border border-white/20 shadow-lg flex flex-col items-start text-left max-w-[110px]">
                <span className="text-2xl font-black tracking-tighter font-sans leading-none text-zinc-950">32</span>
                <span className="text-[5px] font-black text-rose-600 uppercase tracking-widest font-mono mt-0.5 leading-none">PURE VIEW Series</span>
              </div>

              {/* Brand Logo "vw VISIO WORLD" */}
              <div className="flex flex-col items-end text-right">
                <div className="flex items-center space-x-1">
                  {/* Custom twin line V-W logo vector symbol */}
                  <svg className="w-9 h-6 text-white" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 4,6 L 12,20 L 20,8 L 28,20 L 36,6" />
                  </svg>
                </div>
                <span className="text-[5.5px] font-extrabold uppercase text-white/90 font-mono tracking-widest mt-0.5">VISIO WORLD</span>
              </div>
            </div>

            {/* Sidebar with specifications listed (VW Style) on Left */}
            <div className="flex flex-col space-y-1 max-w-[130px] text-left z-10 mt-auto ml-1">
              <div className="bg-black/75 backdrop-blur-md rounded-lg py-1 px-1.8 border border-white/10 flex flex-col space-y-0.5">
                <span className="text-[5.5px] font-mono font-black text-[#f59e0b] leading-none">■ EDGELESS DESIGN</span>
                <span className="text-[5.5px] font-mono font-black text-zinc-350 leading-none">■ True Display Panel</span>
                <span className="text-[5.5px] font-mono font-black text-zinc-350 leading-none">■ 20W Surround Audio Output</span>
                <span className="text-[5.5px] font-mono font-black text-zinc-350 leading-none">■ 300 Dazzling Nits Brightness</span>
              </div>
            </div>

            {/* BEE Power Savings Guide Badge on Bottom Right */}
            <div className="absolute bottom-4 right-4 z-10 flex items-stretch bg-white text-black p-1 rounded-lg border border-zinc-200 shadow-lg select-none max-w-[100px]">
              <div className="flex flex-col justify-between px-1 border-r border-zinc-250">
                <div className="flex space-x-0.2 text-[4.5px] text-red-500 font-bold">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                </div>
                <span className="text-[3.5px] font-extrabold text-green-700 uppercase leading-none font-mono mt-0.5">POWER SAVINGS</span>
              </div>
              <div className="flex flex-col justify-center px-1 text-right">
                <span className="text-[8px] font-black text-zinc-900 leading-none font-mono">27.0*</span>
                <span className="text-[3.5px] font-bold text-zinc-500 uppercase tracking-tighter leading-none mt-0.5">kWh/Year</span>
              </div>
            </div>
          </div>

          {/* Table stand feet */}
          <div className="absolute bottom-0 left-[22%] w-2 h-2.5 bg-gradient-to-t from-zinc-950 to-zinc-700 transform skew-x-[-20deg]" />
          <div className="absolute bottom-0 right-[22%] w-2 h-2.5 bg-gradient-to-t from-zinc-950 to-zinc-700 transform skew-x-[20deg]" />
        </div>
      );

    case 'custom-vw-cinema':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#0a0f18] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-4 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />

          {/* Heading with elegant Cinema Zoom Filmstrip Banner */}
          <div className="text-center w-full z-10 pt-1">
            <div className="inline-flex flex-col items-center">
              {/* Filmstrip dashes border top */}
              <div className="text-[5px] font-mono tracking-[0.25em] text-amber-500/80 leading-none">
                ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
              </div>
              <h2 className="text-sm md:text-md font-black tracking-[0.15em] text-white uppercase font-sans py-1 leading-none">
                CINEMA <span className="text-amber-400">ZOOM</span>
              </h2>
              {/* Filmstrip dashes border bottom */}
              <div className="text-[5px] font-mono tracking-[0.25em] text-amber-500/80 leading-none">
                ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
              </div>
            </div>
          </div>

          {/* Double display visualizer side by side */}
          <div className="flex-1 flex gap-4 items-center justify-center z-10 p-2">
            {/* Display Left: Normal Feed */}
            <div className="flex-1 flex flex-col space-y-1 items-center">
              <span className="text-[6.5px] font-mono font-bold text-zinc-400 uppercase">Normal Mode (Standard Aspect)</span>
              <div className="w-full aspect-[16/9] bg-black rounded-lg border border-zinc-800 p-0.5 relative overflow-hidden flex items-center justify-center shadow-lg">
                <div className="absolute inset-x-0 inset-y-1 bg-zinc-950 flex items-center justify-center">
                  <span className="text-[5px] text-zinc-650 tracking-[0.15em] absolute top-1 uppercase font-mono">16:9 Aspect Limit</span>
                  {/* Landscape vector visual */}
                  <svg className="w-16 h-10 stroke-zinc-500 fill-none" viewBox="0 0 80 45">
                    <polygon points="5,45 35,15 65,45" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                    <circle cx="55" cy="20" r="4" stroke="#e2e8f0" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Display Right: Cinema Zoom active */}
            <div className="flex-1 flex flex-col space-y-1 items-center">
              <span className="text-[6.5px] font-mono font-bold text-amber-400 uppercase">Cinema Zoom Mode</span>
              <div className="w-full aspect-[16/9] bg-black rounded-lg border border-amber-500 p-0.5 relative overflow-hidden flex items-center justify-center shadow-lg shadow-amber-500/10">
                {/* Visual zoomed in with vibrant glowing colors */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center scale-125">
                  <svg className="w-16 h-10 stroke-amber-400 fill-none" viewBox="0 0 80 45">
                    <polygon points="5,45 35,15 65,45" fill="#3b2b1d" stroke="#f59e0b" strokeWidth="0.8" />
                    <circle cx="55" cy="20" r="4" stroke="#fbbf24" strokeWidth="0.8" />
                  </svg>
                </div>
                <div className="absolute inset-x-0 bottom-0.5 bg-black/85 text-[5px] py-0.5 font-sans font-black text-white tracking-widest text-center z-10">
                  AUTO VIEWPORT ENVELOPE SCALE
                </div>
              </div>
            </div>
          </div>

          {/* Bottom regulatory specifications line */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>INTU_SCALING ENGINE_V1_ZO_MA</span>
            <span>CINEMATIC CALIBRATION ALIGNED CORE TECH</span>
          </div>
        </div>
      );

    case 'custom-vw-dimensions':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#040406] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />

          {/* Title Header text */}
          <div className="text-center pt-1.5 z-10">
            <span className="text-[7.5px] font-mono font-black text-rose-500 uppercase tracking-widest leading-none">Ergonomics & Frame Dimensions Blueprints</span>
            <h2 className="text-xs md:text-sm font-black tracking-widest text-white uppercase font-sans mt-0.5">
              SLIM DEPTH CHASSIS ENGINEERING LAYOUT
            </h2>
          </div>

          {/* Diagonal Screen Arrow specs lines representation */}
          <div className="flex-1 flex items-center justify-around my-1 z-10 px-4">
            {/* Diagram Left: Front View measurement card */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[5.5px] font-mono font-bold text-zinc-400 uppercase">Front Silhouette Layout</span>
              <div className="w-36 h-20 border border-dashed border-zinc-700 bg-black/75 rounded-lg relative flex items-center justify-center p-2">
                <div className="w-28 h-14 border border-zinc-500 bg-zinc-950 rounded flex flex-col items-center justify-center relative">
                  {/* Diagonal measure line */}
                  <svg className="absolute inset-0 w-full h-full stroke-zinc-500/30" viewBox="0 0 100 50">
                    <line x1="5" y1="45" x2="95" y2="5" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
                  </svg>
                  <span className="text-[7px] font-black font-sans text-white leading-none">80 cm</span>
                  <span className="text-[5.5px] font-mono text-zinc-400 leading-none mt-0.5">32 inch class screen</span>
                </div>

                {/* Annotation lines */}
                <div className="absolute left-1 flex flex-col justify-center h-full text-[4px] font-mono text-zinc-400 leading-none scale-[0.9]">
                  <span>43.0 cm</span>
                  <span className="opacity-70 mt-0.5">Height</span>
                </div>
                <div className="absolute top-1 text-[4px] font-mono text-zinc-400 leading-none scale-[0.9] text-center w-full">
                  <span>73.0 cm Width Panel Scope</span>
                </div>
              </div>
            </div>

            {/* Diagram Right: Profile aspect */}
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[5.5px] font-mono font-bold text-zinc-400 uppercase">Side depth scale</span>
              <div className="w-16 h-20 border border-dashed border-zinc-700 bg-black/75 rounded-lg flex flex-col items-center justify-center p-2">
                <svg className="w-10 h-14 text-zinc-500 fill-none" viewBox="0 0 20 40">
                  {/* Bezel slim edge profile */}
                  <rect x="8" y="4" width="4" height="28" rx="0.3" fill="#1c1917" stroke="#fbbf24" strokeWidth="0.6" />
                  {/* Pedestal stand */}
                  <path d="M 10 32 L 2 37 L 18 37 Z" fill="#222" stroke="#555" strokeWidth="0.5" />
                </svg>
                <div className="text-[4.5px] font-mono text-zinc-400 leading-none mt-1 text-center">
                  <span>Depth: 16.0 cm</span> <br />
                  <span className="opacity-75">including stand leg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom metadata tags */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>REGISTRATION CODE: VW-DIMENS-32-SPEC</span>
            <span>NET WEIGHT: 3.4 KG ULTRA LIGHT SHELL</span>
          </div>
        </div>
      );

    case 'custom-vw-infographic':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#020204] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />

          {/* Core grid configuration dual pane layout */}
          <div className="grid grid-cols-12 gap-2.5 flex-grow h-28 mt-2.5 z-10 items-stretch px-1">
            {/* Grid Box Left Core Tech Pills */}
            <div className="col-span-6 flex flex-col justify-between space-y-1">
              {[
                { label: '300 Nits Brightness', sub: 'DAZZLING BRIGHTNESS ARRAY', highlight: true },
                { label: 'Edgeless Slim Frame', sub: 'MAXIMIZES SCREEN FOCUS', highlight: false },
                { label: 'True Display Gamut', sub: 'FOR DEEP RICH ENHANCED COLO', highlight: false },
                { label: '20W Surround Audio', sub: 'IMMERSIVE HOME CINEMA SOUND', highlight: false }
              ].map((badge, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-start text-left p-1 rounded border ${
                    badge.highlight 
                      ? 'bg-amber-500/10 border-amber-500/30' 
                      : 'bg-zinc-900/40 border-zinc-800'
                  }`}
                >
                  <span className={`text-[7.5px] font-black font-sans uppercase leading-tight ${
                    badge.highlight ? 'text-amber-400' : 'text-white'
                  }`}>
                    {badge.label}
                  </span>
                  <span className="text-[4px] text-zinc-400 font-mono tracking-widest mt-0.5">{badge.sub}</span>
                </div>
              ))}
            </div>

            {/* Grid Box Right 3D Visual Art TV frame */}
            <div className="col-span-6 bg-zinc-950/80 border border-zinc-850 p-2 rounded-xl relative flex items-center justify-center overflow-hidden">
              {/* Soft neon circles background decorative flow */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600/25 via-pink-600/10 to-transparent blur-md pointer-events-none animate-pulse" />
              
              {/* Angled TV representation */}
              <div className="w-28 aspect-[16/9] border border-zinc-700 bg-black rounded shadow-2xl relative overflow-hidden flex items-center justify-center">
                {/* Display active prism on screen inside frame */}
                <div className="absolute inset-[1px] bg-gradient-to-br from-indigo-900 via-rose-950 to-amber-950/80 rounded flex items-center justify-center">
                  <svg className="w-12 h-12 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none">
                    <polygon points="12,2 22,22 2,22" stroke="currentColor" strokeWidth="1" className="opacity-80" />
                  </svg>
                  <span className="absolute bottom-1 text-[4px] font-black tracking-widest text-white/90 font-mono uppercase">
                    VIVID PRISM RENDER
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status metrics */}
          <div className="flex justify-between items-center px-4 py-1.5 text-[6px] md:text-[7px] text-zinc-500 uppercase font-mono bg-zinc-950 border-t border-zinc-900 z-10 w-full mt-auto">
            <span>HARDWARE STABILIZED LED CHIP AR_CORE</span>
            <span>WIDE PERSPECTIVE SCALE: 178 DEGREES CONT</span>
          </div>
        </div>
      );

    case 'custom-realme-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex border border-zinc-800 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Neon drum and guitar rock artwork background */}
          <div className="absolute inset-0 z-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
              <defs>
                <radialGradient id="neonGlow" cx="60%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="320" height="180" fill="url(#neonGlow)" />
              {/* Guitar neck fretboard lines */}
              <line x1="50" y1="140" x2="320" y2="30" stroke="#06b6d4" strokeWidth="1" strokeDasharray="1 3" />
              <line x1="45" y1="145" x2="320" y2="35" stroke="#06b6d4" strokeWidth="0.8" />
              <line x1="40" y1="150" x2="320" y2="40" stroke="#06b6d4" strokeWidth="0.5" />
              <line x1="35" y1="155" x2="320" y2="45" stroke="#06b6d4" strokeWidth="0.5" />
              {/* Drum vectors */}
              <ellipse cx="140" cy="115" rx="30" ry="18" stroke="#ec4899" strokeWidth="1.5" />
              <ellipse cx="140" cy="115" rx="27" ry="15" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="2 1" />
              <ellipse cx="250" cy="95" rx="35" ry="20" stroke="#ec4899" strokeWidth="1.5" />
              <ellipse cx="250" cy="95" rx="32" ry="17" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="3 2" />
            </svg>
          </div>

          {/* Left panel dark semi-transparent card block over TV face */}
          <div className="w-[42%] bg-black/75 border-r border-zinc-900 z-10 flex flex-col justify-between p-3.5 relative font-sans">
            {/* Top Tag: 32" Yellow sticker */}
            <div className="self-start">
              <div className="bg-[#FFD100] text-black px-2 py-1 rounded-sm font-black text-xl italic tracking-tighter leading-none shadow-md">
                32"
              </div>
            </div>

            {/* Middle body: specs stacked */}
            <div className="flex flex-col space-y-2 text-left my-auto">
              <div className="border-b border-zinc-800 pb-1">
                <span className="text-sm font-black tracking-tighter text-white uppercase italic">HD-QLED</span>
              </div>
              
              {/* Dolby Audio with custom SVG logo badge */}
              <div className="flex items-center space-x-1.5 text-[8.5px] font-black text-zinc-100">
                <svg className="w-5 h-3 text-cyan-400" viewBox="0 0 24 12" fill="currentColor">
                  <path d="M 6 1 A 5 5 0 0 0 6 11 L 10 L 10 L 6 z M 18 1 A 5 5 0 0 1 18 11 L 14 L 14 L 18 z" fill="currentColor" />
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[8px] font-black tracking-widest uppercase">Dolby</span>
                  <span className="text-[6px] tracking-widest text-zinc-400 uppercase font-mono">AUDIO</span>
                </div>
              </div>

              {/* 16.78 Billion Colours wheel */}
              <div className="flex items-center space-x-1.5">
                <div className="w-4 h-4 rounded-full border border-zinc-800 bg-gradient-to-tr from-cyan-400 via-yellow-400 to-rose-450 animate-spin" style={{ animationDuration: '10s' }} />
                <div className="flex flex-col leading-none">
                  <span className="text-[8.5px] font-extrabold text-white">16.78</span>
                  <span className="text-[6px] text-zinc-400 font-medium">Billion Colours</span>
                </div>
              </div>

              {/* Google TV 5.0 Badge */}
              <div className="flex items-center space-x-1 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded self-start">
                <svg className="w-2.5 h-2.5 text-[#06b6d4]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.35 10.04a7.5 7.5 0 1 0-14.2 1.96 7 7 0 1 0 14.2-1.96z" />
                </svg>
                <span className="text-[6.5px] font-black uppercase text-zinc-200 tracking-wide font-mono">Google TV 5.0</span>
              </div>
            </div>

            {/* Bottom mini print */}
            <span className="text-[5px] text-zinc-500 font-mono tracking-widest uppercase mt-1">realme TechLife Series OEM</span>
          </div>

          {/* Right layout: Branding, high fidelity speaker indicators and neon atmosphere */}
          <div className="flex-1 flex flex-col justify-between p-3.5 z-10 relative">
            <div className="flex justify-end">
              {/* TL TechLife Yellow branding square */}
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-[#FFD100] rounded-sm flex items-center justify-center font-black text-black text-[9px] font-sans">TL</div>
                <span className="text-[8px] font-extrabold text-zinc-200 uppercase tracking-tight">realme TechLife</span>
              </div>
            </div>

            {/* Center neon sphere with nice text overlay */}
            <div className="my-auto flex flex-col items-end text-right pr-2">
              <span className="text-[10px] font-extrabold tracking-widest text-[#FFD100] font-mono leading-none">CYBER ACOUSTIC</span>
              <span className="text-[15px] font-black tracking-tighter uppercase leading-tight italic mt-1 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                AUDIO-VISUALS
              </span>
            </div>

            {/* Right bottom 2026 Edition badge */}
            <div className="flex justify-end">
              <div className="bg-zinc-900/90 border border-zinc-800 px-2 py-1 rounded-lg flex flex-col items-end text-right font-mono">
                <span className="text-[9px] font-black text-[#0c8] italic">LIMITED</span>
                <span className="text-[6px] font-extrabold text-zinc-400 tracking-wider">2026 EDITION</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'custom-realme-audio':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-800 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          {/* Header */}
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-zinc-400 font-black uppercase font-mono mb-1">
                EXPERTLY TUNED ACOUSTICS
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Immerse Yourself in Expertly Tuned Sound
              </h3>
            </div>
            {/* Branding */}
            <div className="flex items-center space-x-1 bg-zinc-900/60 p-1 rounded">
              <div className="w-3.5 h-3.5 bg-[#FFD100] rounded-sm flex items-center justify-center font-black text-black text-[8px]">TL</div>
              <span className="text-[7px] font-extrabold text-zinc-200">realme TechLife</span>
            </div>
          </div>

          {/* Sound Features Grid Row */}
          <div className="grid grid-cols-4 gap-2 z-10 w-full my-1 md:my-2">
            {[
              { label: '26 Watt Speakers', sub: 'EXPRESSIVE DUAL DRIVERS' },
              { label: 'Dolby Audio', sub: 'SURROUND SOUND FIELD' },
              { label: 'Down Firing Speakers', sub: 'ACOUSTIC SHIFT DESIGN' },
              { label: '5 Sound Modes', sub: 'EQ CUSTOMIZABLE PROFILES' }
            ].map((spec, i) => (
              <div key={i} className="bg-zinc-900/75 border border-zinc-800/80 p-1.5 rounded-lg flex flex-col items-center text-center">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFD100]/10 border border-[#FFD100]/30 flex items-center justify-center mb-1">
                  <span className="text-[5.5px] font-black text-[#FFD100]">✔</span>
                </div>
                <span className="text-[7.5px] font-bold text-zinc-100 uppercase tracking-tight leading-tight">{spec.label}</span>
                <span className="text-[4px] text-zinc-500 font-mono tracking-widest mt-0.5 leading-none">{spec.sub}</span>
              </div>
            ))}
          </div>

          {/* Bottom Area: TV representation displaying glowing Guitarist and sounding waves */}
          <div className="h-16 bg-zinc-900/30 rounded-xl border border-zinc-850 p-1 flex items-center justify-center relative overflow-hidden z-10">
            {/* Speaker waves radiating downwards */}
            <div className="absolute inset-x-0 bottom-0 top-6 flex items-center justify-center pointer-events-none opacity-40">
              <svg className="w-full h-full" viewBox="0 0 300 40">
                <path d="M 50 10 C 100 35, 200 35, 250 10" stroke="#a21caf" strokeWidth="1.5" fill="none" className="animate-pulse" />
                <path d="M 60 15 C 110 38, 190 38, 240 15" stroke="#a21caf" strokeWidth="0.8" fill="none" />
                <path d="M 70 20 C 120 40, 180 40, 230 20" stroke="#06b6d4" strokeWidth="1.2" fill="none" />
              </svg>
            </div>

            <div className="w-24 aspect-[16/9] bg-black rounded border border-zinc-700 relative overflow-hidden shadow-lg flex items-center justify-center">
              {/* Screen graphic: Guitarist rendering in warm neon */}
              <div className="absolute inset-[1px] bg-gradient-to-tr from-fuchsia-950/80 via-[#1e112a] to-cyan-950/85 flex items-center justify-center">
                <svg className="w-8 h-8 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M 6 18 L 18 6" />
                  <ellipse cx="6" cy="18" rx="3" ry="2" fill="currentColor" className="text-pink-500" />
                  <rect x="15" y="5" width="4" height="2" fill="currentColor" />
                </svg>
                <div className="absolute top-1 left-1.5 flex items-center space-x-1">
                  <div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[3.5px] font-bold text-zinc-300 font-mono tracking-widest uppercase">TUNED SOUND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'custom-realme-performance':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#020205] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          {/* Header */}
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-cyan-400 font-black uppercase font-mono mb-1">
                SYSTEM CORE ARCHITECTURE
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                High-Performance for Smooth Operations
              </h3>
            </div>
            {/* Branding */}
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 bg-[#FFD100] rounded-sm flex items-center justify-center font-black text-black text-[8px]">TL</div>
              <span className="text-[7.5px] font-extrabold text-zinc-400">realme TechLife</span>
            </div>
          </div>

          {/* Custom vector schematic representing glowing CPU Chip & RAM */}
          <div className="grid grid-cols-12 gap-3 z-10 items-center flex-grow mt-2 px-1">
            {/* Core Tech Specs */}
            <div className="col-span-12 md:col-span-5 flex flex-col space-y-2 text-left">
              <div className="bg-zinc-950/90 border border-zinc-800 p-2 rounded-xl">
                <span className="text-[#FFD100] text-[9px] font-mono leading-none tracking-tight font-black uppercase">Hardware Memory</span>
                <div className="text-[12px] font-black text-white mt-1">1GB + 8GB</div>
                <div className="text-[5px] text-zinc-500 font-mono tracking-widest mt-0.5 uppercase">SYSTEM ACTIVE SPEED MEMORY</div>
              </div>

              <div className="bg-zinc-950/90 border border-zinc-800 p-2 rounded-xl">
                <span className="text-cyan-400 text-[9px] font-mono leading-none tracking-tight font-black uppercase">Core Engine</span>
                <div className="text-[11px] font-black text-white mt-1">Quad Core</div>
                <div className="text-[5.5px] text-zinc-500 font-mono tracking-widest mt-0.5 uppercase">ZERO LAG COMPUTE POWER</div>
              </div>
            </div>

            {/* Motherboard graphics rendering on right */}
            <div className="col-span-12 md:col-span-7 bg-zinc-900/60 border border-zinc-850 p-2 rounded-xl aspect-[16/9] flex items-center justify-center relative overflow-hidden">
              {/* Circuit grid background */}
              <svg className="absolute inset-0 w-full h-full stroke-cyan-500/10 fill-none" viewBox="0 0 160 90">
                <path d="M 0 20 L 40 20 L 50 30 L 100 30 L 110 40 L 160 40" />
                <path d="M 20 90 L 50 60 L 110 60 L 120 70 M 80 0 L 80 90" strokeDasharray="2 2" />
              </svg>

              {/* Glowing microchip Core */}
              <div className="w-16 h-16 rounded-lg bg-zinc-950 border-2 border-cyan-500/40 p-1 flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-pulse">
                {/* Golden pin pads */}
                <div className="absolute top-0 inset-x-2 flex justify-between h-[3px]">
                  {[1,2,3,4,5].map(x => <div key={x} className="w-[1.5px] bg-yellow-500" />)}
                </div>
                <div className="absolute bottom-0 inset-x-2 flex justify-between h-[3px]">
                  {[1,2,3,4,5].map(x => <div key={x} className="w-[1.5px] bg-yellow-500" />)}
                </div>
                <div className="absolute left-0 inset-y-2 flex flex-col justify-between w-[3px]">
                  {[1,2,3,4,5].map(x => <div key={x} className="h-[1.5px] bg-yellow-500" />)}
                </div>
                <div className="absolute right-0 inset-y-2 flex flex-col justify-between w-[3px]">
                  {[1,2,3,4,5].map(x => <div key={x} className="h-[1.5px] bg-yellow-500" />)}
                </div>

                {/* Core engraving text */}
                <span className="text-[8px] font-black tracking-widest text-[#FFD100] font-sans led-none">QUAD</span>
                <span className="text-[10px] font-black tracking-tight text-white font-mono leading-none mt-0.5">CORE</span>
                <span className="text-[4px] font-semibold text-cyan-400 font-mono tracking-widest uppercase mt-1">PROCESSOR</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'custom-realme-smooth':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#040407] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          {/* Header */}
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-[#FFD100] font-black uppercase font-mono mb-1">
                SEAMLESS VIEWING PRECISION
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Seamless Viewing Without Interruption
              </h3>
            </div>
            {/* Branding */}
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 bg-[#FFD100] rounded-sm flex items-center justify-center font-black text-black text-[8px]">TL</div>
              <span className="text-[7.5px] font-extrabold text-zinc-400">realme TechLife</span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 z-10 items-center flex-grow mt-2 px-1">
            {/* Info overlays */}
            <div className="col-span-12 md:col-span-5 flex flex-col space-y-1.5 text-left">
              <div className="bg-zinc-900/80 border border-zinc-800 p-1.5 rounded-lg">
                <span className="text-[8px] font-bold text-zinc-100 uppercase tracking-tight">Dual Band Wi-Fi</span>
                <div className="text-[5px] text-cyan-400 font-mono tracking-widest mt-0.5 uppercase">2.4 GHz + 5 GHz ACCESS</div>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 p-1.5 rounded-lg">
                <span className="text-[8px] font-bold text-zinc-100 uppercase tracking-tight">Built-In Graphics</span>
                <div className="text-[5px] text-[#0c8] font-mono tracking-widest mt-0.5 uppercase">ZERO LAG GPU COREGUIDE</div>
              </div>
            </div>

            {/* Sportscar visual breaking boundary */}
            <div className="col-span-12 md:col-span-7 aspect-[16/9] rounded-xl bg-zinc-950 border border-zinc-850 overflow-hidden relative flex items-center justify-center">
              {/* Speed lines */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-zinc-950/80 to-pink-900/15" />
              <svg className="absolute inset-0 w-full h-full stroke-zinc-700/20 fill-none" viewBox="0 0 160 90">
                <line x1="0" y1="45" x2="160" y2="45" strokeDasharray="3 3" />
                <line x1="0" y1="15" x2="160" y2="35" />
                <line x1="0" y1="75" x2="160" y2="55" />
              </svg>

              {/* Dynamic yellow sportcar rendering out of frame boundaries */}
              <div className="relative w-28 h-12 flex items-center justify-center transform rotate-[-4deg] animate-pulse">
                {/* Neon headlights projection */}
                <div className="absolute right-0 top-3 w-16 h-8 bg-gradient-to-r from-yellow-400/30 to-transparent blur-md rounded-r-full" />
                <div className="absolute right-0 bottom-1 w-16 h-8 bg-gradient-to-r from-yellow-400/30 to-transparent blur-md rounded-r-full" />

                {/* Stylized vector race car */}
                <svg className="w-full h-full text-yellow-500 fill-current" viewBox="0 0 120 40">
                  <path d="M 10 30 Q 15 20 40 18 Q 70 12 90 20 L 115 22 Q 120 28 115 32 L 15 32 z" />
                  <path d="M 45 18 Q 65 5 85 18 z" fill="#1e1b4b" opacity="0.9" />
                  <circle cx="34" cy="31" r="7" fill="#000" stroke="#06b6d4" strokeWidth="1.5" />
                  <circle cx="94" cy="31" r="7" fill="#000" stroke="#06b6d4" strokeWidth="1.5" />
                  <circle cx="34" cy="31" r="2" fill="#fff" />
                  <circle cx="94" cy="31" r="2" fill="#fff" />
                </svg>
                <span className="absolute bottom-0.5 right-6 text-[4.5px] font-black tracking-widest text-[#FFD100] font-mono lowercase">ZERO-LAG CORE</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'custom-realme-angle':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-800 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          {/* Header */}
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-[#FFD100] font-black uppercase font-mono mb-1">
                HARDWARE DESIGN PROFILE MATRIX
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Premium Sleek Silhouette Angled View
              </h3>
            </div>
            {/* Branding */}
            <div className="flex items-center space-x-1">
              <div className="w-3.5 h-3.5 bg-[#FFD100] rounded-sm flex items-center justify-center font-black text-black text-[8px]">TL</div>
              <span className="text-[7px] font-extrabold text-zinc-400">realme TechLife</span>
            </div>
          </div>

          {/* 3D Angled TV Representation */}
          <div className="flex-grow flex items-center justify-center relative z-10 my-1">
            <div className="absolute inset-0 bg-radial-gradient from-zinc-800/15 via-transparent to-transparent pointer-events-none" />
            
            {/* Angled TV Wireframe shape */}
            <div className="relative w-44 aspect-[16/9] border border-zinc-750 bg-black rounded shadow-[0_15px_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between">
              {/* Bezel branding custom details */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/90 via-zinc-900 to-zinc-950/90 flex items-center justify-center">
                <div className="text-center font-mono text-[6px] tracking-widest text-zinc-650 animate-pulse">
                  SLIM BEZEL CHASSIS
                </div>
              </div>
              
              {/* Bottom Bezel mini printed branding */}
              <div className="h-2 border-t border-zinc-800 bg-zinc-950 flex items-center justify-center w-full z-15 text-[4px] text-zinc-400 font-extrabold uppercase font-sans py-0.5">
                TL realme TechLife
              </div>
            </div>

            {/* Stand Base Legs */}
            <div className="absolute bottom-1.5 flex justify-between w-40 px-6">
              <div className="w-3.5 h-4.5 border-l-2 border-zinc-700 transform rotate-[15deg]" />
              <div className="w-3.5 h-4.5 border-r-2 border-zinc-700 transform rotate-[-15deg]" />
            </div>
          </div>

          {/* Bottom Prints */}
          <div className="flex justify-between items-center text-[5.5px] font-mono text-zinc-650 tracking-wider">
            <span>CHASSIS DEPTH PROFILE: ULTRA THIN 2026 EDITION MAT</span>
            <span>PEDESTAL STAND: REINFORCED RIGID POLY BRACKET</span>
          </div>
        </div>
      );

    case 'custom-realme-dimensions':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-800 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          {/* Header */}
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-cyan-400 font-black uppercase font-mono mb-1">
                HARDWARE CALIBRATION DIMENSIONAL BLUEPRINT
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Chassis Physical Metrics & Energy Blueprint
              </h3>
            </div>
            {/* Branding */}
            <div className="flex items-center space-x-1">
              <div className="w-3.5 h-3.5 bg-[#FFD100] rounded-sm flex items-center justify-center font-black text-black text-[8px]">TL</div>
              <span className="text-[7px] font-extrabold text-zinc-400">realme TechLife</span>
            </div>
          </div>

          {/* Main Blueprint layout */}
          <div className="grid grid-cols-12 gap-3 z-10 items-center flex-grow py-1">
            {/* Left measurement statistics */}
            <div className="col-span-12 md:col-span-4 flex flex-row md:flex-col justify-between md:justify-center md:space-y-1.5 text-left font-mono text-[7px] text-zinc-400">
              <div className="border-l border-[#FFD100] pl-2 py-0.5">
                <span className="text-zinc-500 block text-[6px] uppercase leading-none">Chassis Width</span>
                <span className="font-extrabold text-white text-[8px]">720 mm</span>
              </div>
              <div className="border-l border-cyan-400 pl-2 py-0.5">
                <span className="text-zinc-500 block text-[6px] uppercase leading-none">V-Panel Height</span>
                <span className="font-extrabold text-white text-[8px]">475 mm</span>
              </div>
              <div className="border-l border-[#0c8] pl-2 py-0.5">
                <span className="text-zinc-500 block text-[6px] uppercase leading-none">Total Leg Depth</span>
                <span className="font-extrabold text-white text-[8px]">210 mm</span>
              </div>
              <div className="border-l border-[#c08] pl-2 py-0.5">
                <span className="text-zinc-550 block text-[6px] uppercase leading-none">Bezel Diagonal</span>
                <span className="font-extrabold text-white text-[8px]">800 mm</span>
              </div>
            </div>

            {/* Right Schematic render with measurement arrows */}
            <div className="col-span-12 md:col-span-8 bg-black/60 border border-zinc-900 rounded-xl flex items-center justify-center p-3 relative h-24 overflow-hidden">
              <svg className="w-full h-full text-cyan-400/40 stroke-current fill-none font-mono" viewBox="0 0 160 90">
                <rect x="25" y="15" width="110" height="60" stroke="#71717a" strokeWidth="1" />
                <rect x="27" y="17" width="106" height="56" stroke="#27272a" strokeWidth="0.5" />
                
                <line x1="38" y1="75" x2="30" y2="82" stroke="#71717a" strokeWidth="1.5" />
                <line x1="122" y1="75" x2="130" y2="82" stroke="#71717a" strokeWidth="1.5" />

                <path d="M 25 8 L 135 8" stroke="#FFD100" strokeWidth="0.5" />
                <path d="M 25 8 L 29 5 M 25 8 L 29 11 M 135 8 L 131 5 M 135 8 L 131 11" stroke="#FFD100" strokeWidth="0.5" />
                <text x="80" y="6" textAnchor="middle" fill="#FFD100" fontSize="5.5" fontWeight="extrabold">720 mm</text>

                <path d="M 15 15 L 15 75" stroke="#00d8f6" strokeWidth="0.5" />
                <path d="M 15 15 L 12 19 M 15 15 L 18 19 M 15 75 L 12 71 M 15 75 L 18 71" stroke="#00d8f6" strokeWidth="0.5" />
                <text x="11" y="47" textAnchor="middle" fill="#00d8f6" fontSize="5.5" fontWeight="extrabold" transform="rotate(-90 11 47)">475 mm</text>

                <line x1="27" y1="73" x2="133" y2="17" stroke="#ea580c" strokeWidth="0.5" strokeDasharray="2 2" />
                <text x="82" y="52" fill="#ea580c" fontSize="5.5" fontWeight="extrabold" transform="rotate(-23 82 52)" textAnchor="middle">800 mm diagonal</text>

                <path d="M 22 84 L 50 84" stroke="#10b981" strokeWidth="0.5" />
                <text x="75" y="86" fill="#10b981" fontSize="5.5" fontWeight="extrabold" textAnchor="middle">Leg depth: 210 mm</text>
              </svg>
            </div>
          </div>
        </div>
      );

    case 'custom-samsung-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#030008] text-white rounded-2xl overflow-hidden flex border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Dense glowing fiber optics background */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
              <defs>
                <radialGradient id="auroraBackground" cx="60%" cy="80%" r="70%">
                  <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.6" />
                  <stop offset="40%" stopColor="#4c1d95" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#030008" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="fiberBlue" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                  <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="fiberPink" x1="0" y1="1" x2="0.5" y2="0">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                  <stop offset="60%" stopColor="#f472b6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffe4e6" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="fiberPurple" x1="1" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#e879f9" stopOpacity="0" />
                  <stop offset="70%" stopColor="#c084fc" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#f3e8ff" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect width="320" height="180" fill="url(#auroraBackground)" />
              
              {/* Radiating fiber optical pathways */}
              {[
                { d: "M 200 180 Q 200 120 220 50", s: "url(#fiberBlue)", w: "1" },
                { d: "M 200 180 Q 180 110 260 40", s: "url(#fiberPink)", w: "1.2" },
                { d: "M 200 180 Q 220 130 160 30", s: "url(#fiberPurple)", w: "0.8" },
                { d: "M 200 180 Q 240 100 290 60", s: "url(#fiberBlue)", w: "1.5" },
                { d: "M 200 180 Q 160 120 120 70", s: "url(#fiberPink)", w: "1.1" },
                { d: "M 200 180 Q 140 140 100 110", s: "url(#fiberPurple)", w: "1.3" },
                { d: "M 200 180 Q 210 90 280 20", s: "url(#fiberBlue)", w: "0.9" },
                { d: "M 200 180 Q 150 90 140 10", s: "url(#fiberPink)", w: "1" },
                { d: "M 200 180 Q 190 80 195 5", s: "url(#fiberPurple)", w: "1.4" },
                { d: "M 200 180 Q 250 150 310 130", s: "url(#fiberBlue)", w: "1" },
                { d: "M 200 180 Q 130 160 80 140", s: "url(#fiberPink)", w: "0.7" },
                { d: "M 200 180 C 230 100, 150 50, 180 10", s: "url(#fiberPurple)", w: "1.2" },
                { d: "M 200 180 C 170 120, 260 70, 240 15", s: "url(#fiberBlue)", w: "1.1" }
              ].map((f, i) => (
                <path 
                  key={i} 
                  d={f.d} 
                  stroke={f.s} 
                  strokeWidth={f.w} 
                  fill="none" 
                  className="opacity-70"
                />
              ))}

              {/* Glowing point sparkles */}
              <circle cx="220" cy="50" r="1.5" fill="#fff" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="260" cy="40" r="2" fill="#fff" className="animate-pulse" />
              <circle cx="160" cy="30" r="1.5" fill="#fff" />
              <circle cx="290" cy="60" r="2" fill="#fff" className="animate-ping" style={{ animationDuration: '4s' }} />
              <circle cx="120" cy="70" r="1.5" fill="#fff" />
              <circle cx="280" cy="20" r="2.5" fill="#fff" className="animate-pulse" />
              <circle cx="140" cy="10" r="1.5" fill="#fff" />
            </svg>
          </div>

          {/* Left Panel: Translucent overlay representing crystal series specification dashboard */}
          <div className="w-[38%] bg-black/80 border-r border-zinc-900/60 z-10 flex flex-col justify-between p-3.5 relative font-sans">
            <div>
              {/* Header: Crystal 4K badge */}
              <div className="bg-[#0ea5e9] text-white px-2 py-1 rounded font-black text-[10px] tracking-tight text-center leading-none shadow-md inline-block">
                Crystal 4K
              </div>

              {/* Display size metric */}
              <div className="mt-4 flex items-baseline space-x-1">
                <span className="text-3xl font-black tracking-tighter text-white leading-none">50</span>
                <span className="text-[10px] font-mono tracking-wider text-zinc-400 font-extrabold uppercase">UHD TV</span>
              </div>
            </div>

            {/* Speclist matching original image badges */}
            <div className="flex flex-col space-y-2 text-left my-auto">
              <div className="flex items-center space-x-1.5 text-[8px] font-bold text-zinc-200">
                <span className="text-[#38bdf8] text-xs font-mono">💎</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white">Vision AI</span>
                  <span className="text-[6px] text-zinc-500 uppercase font-mono font-black">Companion</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[8px] font-bold text-zinc-200">
                <span className="text-yellow-400 text-xs font-mono">⚡</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white">4K Upscaling</span>
                  <span className="text-[6px] text-zinc-500 uppercase font-mono font-black">Detail Booster</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[8px] font-bold text-zinc-200">
                <span className="text-emerald-400 text-xs font-mono">🎙️</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white">Voice Assist</span>
                  <span className="text-[6px] text-zinc-500 uppercase font-mono font-black">Hands-Free Hub</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[8px] font-bold text-zinc-200">
                <span className="text-pink-500 text-xs font-mono">🔊</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white">30W Speakers</span>
                  <span className="text-[6px] text-zinc-500 uppercase font-mono font-black">Acoustics setup</span>
                </div>
              </div>
            </div>

            {/* Bottom mini print */}
            <span className="text-[5px] text-zinc-650 font-mono tracking-widest uppercase mt-1">SAMSUNG TIZEN PLATFORM</span>
          </div>

          {/* Right layout: Smart tech specs, samsung branding */}
          <div className="flex-1 flex flex-col justify-between p-3.5 z-10 relative">
            <div className="flex justify-end">
              {/* Samsung Brand Logo */}
              <span className="text-white font-black tracking-[0.25em] text-xs font-sans uppercase">SAMSUNG</span>
            </div>

            {/* Floating details */}
            <div className="my-auto text-right pr-2">
              <span className="text-[8px] font-mono tracking-widest text-[#0ea5e9] uppercase font-bold leading-none block">AI-UPSCALED FLUID DISPLAY</span>
              <span className="text-[13px] font-black tracking-tight uppercase leading-tight italic mt-1 bg-gradient-to-r from-white via-zinc-200 to-zinc-450 bg-clip-text text-transparent">
                CRYSTAL VISION
              </span>
            </div>

            {/* Knox security label */}
            <div className="flex justify-end items-center space-x-1">
              <div className="bg-zinc-950/70 border border-zinc-805 px-2 py-1 rounded-md flex items-center space-x-1">
                <span className="text-[7px] font-extrabold text-teal-400 font-mono">🔒 KNOX SECURITY</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'custom-samsung-vision-ai':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#04010a] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-sky-400 font-black uppercase font-mono mb-1">
                SAMSUNG INTELLIGENT COMPANION
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight leading-tight">
                Samsung Vision AI Companion Hub
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7.5px] font-black tracking-[0.15em] text-zinc-400 font-sans uppercase">SAMSUNG</span>
          </div>

          {/* Interactive translucent overlay boards */}
          <div className="grid grid-cols-12 gap-2.5 z-10 w-full items-center my-auto">
            {/* Left sports play background */}
            <div className="col-span-12 md:col-span-6 bg-zinc-900/45 rounded-lg border border-zinc-850 p-1 bg-gradient-to-tr from-zinc-950 to-indigo-950 relative overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-950/15" />
              {/* Stadium graphic details */}
              <svg className="absolute inset-0 w-full h-full stroke-zinc-800/40 fill-none" viewBox="0 0 100 75">
                <rect x="5" y="5" width="90" height="65" />
                <path d="M 50 5 L 50 70 M 50 37.5 C 40 37.5, 40 37.5, 50 37.5" />
                <circle cx="50" cy="37.5" r="10" />
              </svg>
              {/* Floating query bubble */}
              <div className="bg-sky-500/95 text-white p-1 rounded-md text-[4.5px] font-mono leading-relaxed absolute top-2 left-2 max-w-[85px] shadow border border-sky-400">
                "Who has won the league last year?"
              </div>
              <span className="text-[5px] font-bold text-zinc-400 font-mono absolute bottom-1 right-2">Vision Live Engine</span>
            </div>

            {/* Right smart card matrix */}
            <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-1 text-left font-sans">
              <div className="bg-sky-950/60 border border-sky-900/50 p-1.5 rounded-md flex flex-col justify-center">
                <span className="text-[5px] text-sky-400 font-mono font-bold uppercase leading-none mb-0.5">M-Copilot</span>
                <span className="text-[8px] font-black text-white">Copilot Interface</span>
                <span className="text-[4px] text-zinc-500 leading-none mt-0.5">Integrated helper</span>
              </div>
              <div className="bg-zinc-900/85 border border-zinc-800 p-1.5 rounded-md flex flex-col justify-center">
                <span className="text-[5px] text-purple-400 font-mono font-bold uppercase leading-none mb-0.5">Perplexity AI</span>
                <span className="text-[8px] font-black text-white">Knowledge Sync</span>
                <span className="text-[4px] text-zinc-500 leading-none mt-0.5">E2E answers</span>
              </div>
              <div className="bg-zinc-900/85 border border-zinc-800 p-1.5 rounded-md flex flex-col justify-center">
                <span className="text-[5px] text-emerald-400 font-mono font-bold uppercase leading-none mb-0.5">Screen Mode</span>
                <span className="text-[8px] font-black text-white">AI Optimize Tech</span>
                <span className="text-[4px] text-zinc-500 leading-none mt-0.5 font-sans">Auto brightness</span>
              </div>
              <div className="bg-indigo-950/60 border border-indigo-900/50 p-1.5 rounded-md flex flex-col justify-center">
                <span className="text-[5px] text-pink-400 font-mono font-bold uppercase leading-none mb-0.5">Wall Art</span>
                <span className="text-[8px] font-black text-white">Gen Wallpaper</span>
                <span className="text-[4px] text-zinc-500 leading-none mt-0.5 font-sans">Ambient wallpaper</span>
              </div>
            </div>
          </div>

          <div className="text-[5px] font-mono text-zinc-650 tracking-widest text-left uppercase z-10 w-full border-t border-zinc-900/80 pt-1 flex justify-between">
            <span>SAMSUNG SMART HUBNET 2026 EDITION ACTIVE</span>
            <span>150+ FREE CHANNELS SYNC</span>
          </div>
        </div>
      );

    case 'custom-samsung-football':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#010803] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-emerald-400 font-black uppercase font-mono mb-1">
                STADIUM ACOUSTICS AND TEXTURE SYNC
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Immersive Stadium Football Mode
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7px] font-black tracking-widest text-zinc-500 uppercase">SAMSUNG SPORT</span>
          </div>

          {/* Action Stadium Layout */}
          <div className="my-auto h-20 bg-gradient-to-t from-emerald-950 to-zinc-950 rounded-xl border border-zinc-850 p-1.5 flex items-center justify-between relative overflow-hidden z-10">
            {/* Radiating crowd audio waves */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none opacity-45">
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 animate-ping absolute left-2" />
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 animate-ping absolute right-2" strokeDasharray="3 1" />
            </div>

            {/* Stadium Pitch */}
            <div className="flex-1 flex items-center justify-center relative aspect-[16/9] bg-[#0c4015] rounded border border-[#0f6c25] overflow-hidden ml-4">
              {/* Stadium white lines */}
              <div className="absolute inset-y-0 left-0 right-0 border-x-4 border-white/50" />
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/40" />
              
              {/* Ball vector */}
              <circle cx="50" cy="35" r="2.5" fill="#fff" stroke="#000" strokeWidth="0.5" />
            </div>

            {/* Compare sliding bar represent ON vs OFF */}
            <div className="w-24 flex flex-col justify-center pl-3 space-y-1 font-mono text-[7px] text-zinc-400 z-20">
              <span className="text-[5px] text-emerald-400 uppercase font-bold">Football Mode ON</span>
              <div className="bg-zinc-950 border border-zinc-850 p-1 rounded-md">
                <span className="text-zinc-650 block text-[5px]">Grass Quality</span>
                <span className="text-[#0c8] font-black text-[7px]">Ultra-saturated green</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-850 p-1 rounded-md">
                <span className="text-zinc-650 block text-[5px]">Surround sound</span>
                <span className="text-sky-300 font-extrabold text-[6.5px]">30W Crowd wave active</span>
              </div>
            </div>
          </div>

          <div className="text-[5.5px] font-mono text-zinc-650 tracking-wider flex justify-between uppercase">
            <span>Stadium Crowd Resonance Field Active</span>
            <span className="text-emerald-400 font-black">ADAPTIVE AUDIO CHANNELS</span>
          </div>
        </div>
      );

    case 'custom-samsung-processor':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#020204] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-sky-400 font-black uppercase font-mono mb-1">
                4K SMART COMPUTER PIPELINE
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Crystal Processor 4K Engine
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7px] font-black tracking-widest text-zinc-500 uppercase">SAMSUNG</span>
          </div>

          {/* Glowing Processor chip rendering centered inside motherboard */}
          <div className="flex-grow flex items-center justify-center relative z-10 my-2">
            {/* Circuit motherboard tracing lines */}
            <svg className="absolute inset-x-4 top-1 bottom-1 w-11/12 h-5/6 stroke-sky-500/10 fill-none" viewBox="0 0 160 80">
              <path d="M 10 40 L 45 40 L 55 50" />
              <path d="M 150 40 L 115 40 L 105 30" />
              <path d="M 80 5 C 80 30, 80 50, 80 75" strokeDasharray="3 3" />
            </svg>

            {/* Processor Block */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 w-40 flex flex-col items-center justify-center relative shadow-[0_0_20px_rgba(14,165,233,0.15)] animate-pulse">
              {/* Left and right copper wiring pads pinheads */}
              <div className="absolute left-0 inset-y-2 flex flex-col justify-between w-1 h-5/6">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-[2px] bg-sky-400" />)}
              </div>
              <div className="absolute right-0 inset-y-2 flex flex-col justify-between w-1 h-5/6">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-[2px] bg-sky-400" />)}
              </div>

              <span className="text-[5px] text-sky-400 uppercase font-mono font-black tracking-widest">SAMSUNG SYSTEM</span>
              <span className="text-sm font-black text-white font-sans mt-0.5 tracking-tight uppercase">Crystal</span>
              <span className="text-[9px] font-bold text-zinc-300 font-sans tracking-tight leading-none mt-0.5">Processor 4K</span>
              <span className="text-[4px] text-zinc-500 uppercase font-mono tracking-widest mt-2">REALTIME COLOR MAPPING & UPSCALING</span>
            </div>
          </div>

          <div className="text-[5.5px] font-mono text-zinc-650 tracking-wider flex justify-between uppercase">
            <span>CHIP ID: S-UA50UE83 PRO</span>
            <span>HARDWARE STABILIZED TRACE</span>
          </div>
        </div>
      );

    case 'custom-samsung-hdr':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-805 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Immersive landscape vector forest scene displaying sun rays and high contrast ratios */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="60%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
                <radialGradient id="sunburst" cx="80%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
                  <stop offset="30%" stopColor="#facc15" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Sky */}
              <rect width="320" height="180" fill="url(#skyGrad)" />
              {/* Sunbeam */}
              <rect width="320" height="180" fill="url(#sunburst)" />
              
              {/* Deep dark forest silhouettes shadows contrast */}
              <path d="M 0 180 L 40 100 L 70 120 L 110 80 L 150 140 L 210 90 L 260 130 L 320 80 L 320 180 Z" fill="#022c22" opacity="0.9" />
              <path d="M 0 180 L 30 120 L 80 140 L 140 110 L 190 150 L 240 100 L 290 140 L 320 110 L 320 180 Z" fill="#042f1a" opacity="0.4" />
              
              {/* Fine details contrast sunbeams */}
              <line x1="256" y1="54" x2="100" y2="180" stroke="#fef08a" strokeWidth="1" strokeDasharray="50 10" opacity="0.25" />
              <line x1="256" y1="54" x2="160" y2="180" stroke="#fef08a" strokeWidth="2" strokeDasharray="30 20" opacity="0.15" />
              <line x1="256" y1="54" x2="50" y2="180" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="40 15" opacity="0.2" />
            </svg>
          </div>

          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-[#facc15] font-black uppercase font-mono mb-1">
                HIGH DYNAMIC RANGE BRIGHTNESS MODEL
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Brilliant Peak Contrasts with HDR10+
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7.5px] font-black tracking-widest text-zinc-300 font-sans uppercase">SAMSUNG</span>
          </div>

          {/* Screen contrast badges */}
          <div className="z-10 mt-auto flex justify-between items-end w-full">
            <div className="bg-black/80 border border-zinc-800 p-2 rounded-lg max-w-[170px] text-left">
              <span className="text-[#facc15] block text-[7px] font-mono uppercase font-black">HIGH PEAK CONTRAST</span>
              <span className="text-[9.5px] font-extrabold text-white mt-1 leading-tight block">Deepest Shadows, Radiant Highlights</span>
            </div>

            <div className="bg-[#facc15] text-black px-2 py-1 rounded font-black text-[9px]">
              HDR 10+
            </div>
          </div>
        </div>
      );

    case 'custom-samsung-purcolor':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#030006] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-pink-500 font-black uppercase font-mono mb-1">
                CINEMATIC EXPANSIVE SPECTRUM
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-rose-100 uppercase tracking-tight">
                Vibrant PurColor Spatial Shading
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7px] font-black tracking-widest text-zinc-400">SAMSUNG CHROMA</span>
          </div>

          {/* Color spectrum visualization */}
          <div className="my-auto h-20 flex flex-col justify-between relative z-10">
            {/* Balloon layout representations */}
            <div className="flex justify-around items-center px-6">
              {[
                { color: "bg-red-500", label: "Scarlet" },
                { color: "bg-cyan-400", label: "Aqua" },
                { color: "bg-yellow-400", label: "Gold" },
                { color: "bg-fuchsia-500", label: "Magenta" },
                { color: "bg-emerald-400", label: "Mint" }
              ].map((ball, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-3.5 h-4.5 rounded-full ${ball.color} shadow-lg`} />
                  <span className="text-[4px] text-zinc-500 font-mono mt-0.5 uppercase leading-none">{ball.label}</span>
                </div>
              ))}
            </div>

            {/* Multi-spectral curve heatmap */}
            <div className="h-6 bg-zinc-900/40 rounded-lg border border-zinc-850 p-1 overflow-hidden relative">
              <div className="absolute inset-x-0 bottom-0 top-1 bg-gradient-to-r from-red-600 via-yellow-400 via-emerald-400 via-sky-400 via-purple-500 to-pink-600 opacity-60 blur-[3px]" />
              <svg className="absolute inset-0 w-full h-full stroke-white" viewBox="0 0 150 15">
                <path d="M 0 10 Q 30 2, 60 8 T 120 4 T 150 12" fill="none" strokeWidth="0.8" />
              </svg>
            </div>
          </div>

          <div className="text-[5px] font-mono text-zinc-650 tracking-wider flex justify-between uppercase">
            <span>Color mapping resolution matrix: 1024 points</span>
            <span className="text-pink-500 font-extrabold font-mono">PURCOLOR SYNC CERTIFIED</span>
          </div>
        </div>
      );

    case 'custom-samsung-angle':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-zinc-950 text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-800 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-sky-400 font-black uppercase font-mono mb-1">
                HARDWARE SLIM PROFILE MATRIX
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Narrow Bezel & Profile Pedestal
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7.5px] font-black text-zinc-400 uppercase">SAMSUNG CHASSIS</span>
          </div>

          {/* 3D Angled bezel outline representation */}
          <div className="flex-grow flex items-center justify-center relative z-10 my-1">
            <div className="absolute inset-0 bg-radial-gradient from-zinc-800/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Bezel */}
            <div className="relative w-48 aspect-[16/9] border border-zinc-750 bg-black rounded shadow-[0_15px_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between">
              {/* Display screen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/80 via-zinc-900 to-sky-900/50 flex flex-col justify-center items-center">
                <span className="text-zinc-600 font-black tracking-[0.2em] text-[5px] uppercase">SAMSUNG</span>
                <span className="text-white font-mono text-[9px] font-black uppercase tracking-widest mt-1">Crystal UHD</span>
              </div>
              
              {/* Bottom Bezel */}
              <div className="h-2 border-t border-zinc-800 bg-zinc-950 flex items-center justify-center w-full z-15 text-[4px] text-zinc-500 font-extrabold uppercase font-sans">
                SAMSUNG ELECTRONICS CO.
              </div>
            </div>

            {/* Pedestal stand */}
            <div className="absolute bottom-1 w-44 flex justify-between px-10">
              <div className="w-4 h-3.5 bg-zinc-800 rounded-sm transform rotate-[10deg]" />
              <div className="w-4 h-3.5 bg-zinc-800 rounded-sm transform rotate-[-10deg]" />
            </div>
          </div>

          <div className="flex justify-between items-center text-[5.5px] font-mono text-zinc-650 tracking-wider">
            <span>SLIM LOOK PROFILE DESIGN - MINIMAL BEZEL MATRICES</span>
            <span>KNOX SECURITY ACTIVATED INTEGRATED PLATFORM</span>
          </div>
        </div>
      );

    case 'custom-wobble55-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#04020a] text-white rounded-2xl overflow-hidden flex border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Beautiful glowing galaxy backdrop with a planet sphere */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
              <defs>
                <radialGradient id="cosmosGlow" cx="70%" cy="30%" r="80%">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#6b21a8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#04020a" stopOpacity="1" />
                </radialGradient>
                <radialGradient id="planetGlow" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#0284c7" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#1e1b4b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                </radialGradient>
                {/* Atmosphere ring halo */}
                <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="320" height="180" fill="url(#cosmosGlow)" />
              
              {/* Star field sparks */}
              <circle cx="50" cy="30" r="0.5" fill="#fff" opacity="0.8" />
              <circle cx="80" cy="110" r="0.3" fill="#fff" opacity="0.5" />
              <circle cx="280" cy="50" r="0.6" fill="#fff" opacity="0.9" className="animate-pulse" />
              <circle cx="210" cy="140" r="0.4" fill="#fff" opacity="0.7" />
              <circle cx="160" cy="20" r="0.5" fill="#fff" opacity="0.6" />
              
              {/* Giant elegant graphic planet Earth/Cosmic Sphere representing user image 2 */}
              <circle cx="240" cy="90" r="65" fill="url(#planetGlow)" />
              {/* Atmosphere halo overlay */}
              <circle cx="240" cy="90" r="70" fill="url(#ringGlow)" />
              
              {/* Planet surface glow details */}
              <path d="M 185 75 C 200 65, 230 65, 255 70 C 270 73, 295 80, 305 90" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
              <path d="M 178 95 C 190 85, 225 80, 250 92 C 275 102, 290 105, 301 115" stroke="#38bdf8" strokeWidth="0.8" opacity="0.3" />
              
              {/* Solar Flare flare dot */}
              <circle cx="180" cy="88" r="4" fill="#fff" className="blur-[1px] animate-pulse" />
              <circle cx="180" cy="88" r="8" fill="#e0f2fe" opacity="0.5" className="blur-[3px]" />
            </svg>
          </div>

          <MeshGrid />

          {/* Left specification sidebar panel */}
          <div className="w-[45%] bg-black/85 border-r border-zinc-900 z-10 flex flex-col justify-between p-3 relative font-sans">
            <div>
              {/* 55 UHD tag badge */}
              <div className="bg-zinc-90 w-fit border border-zinc-800 text-white px-2.5 py-1 rounded-md shadow-md inline-flex flex-col items-start leading-none text-left">
                <span className="text-sm font-black tracking-tighter">55 UHD</span>
              </div>
            </div>

            {/* List of features aligned exactly to the TV image sidebar */}
            <div className="flex flex-col space-y-2 text-left my-auto">
              <div className="flex items-center space-x-1.5 text-[8px] font-bold text-zinc-300">
                <span className="text-sky-400 text-sm font-mono leading-none">📱</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-[8px]">Google TV</span>
                  <span className="text-[5.5px] text-zinc-500 uppercase font-mono font-black">With Android 14</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[8px] font-bold text-zinc-300">
                <span className="text-amber-400 text-sm font-mono leading-none">💎</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-[8px]">ULTRA QLED</span>
                  <span className="text-[5.5px] text-zinc-500 uppercase font-mono font-black">Quantum Dot Panel</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[8px] font-bold text-zinc-300">
                <span className="text-orange-400 text-sm font-mono leading-none">🔊</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-[8px]">80W Speakers</span>
                  <span className="text-[5.5px] text-zinc-500 uppercase font-mono font-black">Rocket acoustics setup</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[8px] font-bold text-zinc-300">
                <span className="text-teal-400 text-sm font-mono leading-none">🎧</span>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-[8px]">Dolby Vision·Atmos</span>
                  <span className="text-[5.5px] text-zinc-500 uppercase font-mono font-black">Cinematic spatial sync</span>
                </div>
              </div>
            </div>

            {/* Bottom mini seal */}
            <span className="text-[5.5px] text-zinc-650 font-mono tracking-widest uppercase mt-1">WOBBLE PREMIUM DIRECT</span>
          </div>

          {/* Right layout: Wobble brand, Proudly Made in India badge */}
          <div className="flex-1 flex flex-col justify-between p-3 z-10 relative">
            <div className="flex justify-between items-center w-full">
              {/* Made in India Badge */}
              <div className="bg-zinc-950/75 border border-amber-500/20 px-1.5 py-0.5 rounded flex items-center space-x-1">
                <div className="w-1.5 h-1 bg-amber-500 rounded-sm" />
                <span className="text-[5px] font-black text-amber-500 font-mono uppercase tracking-wider">MADE IN INDIA</span>
              </div>

              {/* Wobble Brand Logo */}
              <span className="text-white font-extrabold tracking-tighter text-base font-sans italic leading-none">wobble</span>
            </div>

            {/* Display status or models tags */}
            <div className="my-auto text-right pr-1">
              <span className="text-[6.5px] font-mono tracking-widest text-[#a5f3fc] uppercase font-black leading-none block">120Hz VRR MOTION MATRIX</span>
              <span className="text-[12px] font-black tracking-tight uppercase leading-tight italic mt-1 bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                X-SERIES SPEC
              </span>
            </div>

            {/* bottom tag */}
            <div className="flex justify-end items-center">
              <div className="bg-[#ea580c]/10 border border-[#ea580c]/20 px-1.5 py-0.5 rounded-md flex items-center">
                <span className="text-[6px] font-black text-[#ea580c] font-mono">120Hz REFRESH SYNCHRONIZATION</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'custom-wobble55-features':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#020106] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-[#f97316] font-black uppercase font-mono mb-1">
                A55+A75 MULTI-ENGINE COMPUTE SYSTEM
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                C.R.I.S.P AI Picture Processing Unit
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7px] tracking-wider text-zinc-500 uppercase font-bold font-mono">WOBBLE CHIP</span>
          </div>

          {/* Central TV Screen with bending cosmic event horizon accretion disk */}
          <div className="my-auto h-[90px] w-full flex items-center justify-between z-10 gap-2 relative">
            
            {/* Left float blocks */}
            <div className="flex flex-col space-y-1 w-[28%] text-left font-sans">
              <div className="bg-orange-950/40 border border-orange-500/20 p-1 rounded flex flex-col justify-center">
                <span className="text-[5px] text-orange-400 font-mono font-extrabold uppercase leading-none">ULTRA QLED</span>
                <span className="text-[7px] font-black text-white leading-none mt-0.5">Pro Saturation</span>
              </div>
              <div className="bg-amber-950/40 border border-amber-500/20 p-1 rounded flex flex-col justify-center">
                <span className="text-[5px] text-amber-400 font-mono font-extrabold uppercase leading-none">80W SPEAKERS</span>
                <span className="text-[7px] font-black text-white leading-none mt-0.5">Heavy Soundstage</span>
              </div>
              <div className="bg-sky-950/40 border border-sky-500/20 p-1 rounded flex flex-col justify-center">
                <span className="text-[5px] text-sky-400 font-mono font-extrabold uppercase leading-none">DOLBY SYSTEM</span>
                <span className="text-[7px] font-black text-white leading-none mt-0.5">Vision & Atmos Sync</span>
              </div>
            </div>

            {/* TV Screen Showing Glowing Orange accretion disk black hole */}
            <div className="flex-1 h-full bg-black rounded-lg border border-zinc-850 p-0.5 relative overflow-hidden shadow-[0_0_15px_rgba(249,115,22,0.1)] flex items-center justify-center">
              
              {/* Starfield backdrop */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 80">
                <rect width="160" height="80" fill="#000" />
                <circle cx="20" cy="15" r="0.3" fill="#fff" opacity="0.5" />
                <circle cx="140" cy="20" r="0.3" fill="#fff" opacity="0.6" />
                <circle cx="40" cy="70" r="0.4" fill="#fff" opacity="0.8" />
                <circle cx="120" cy="65" r="0.2" fill="#fff" opacity="0.4" />
                <circle cx="150" cy="50" r="0.5" fill="#fff" opacity="0.7" />
                
                {/* Nebula dust */}
                <radialGradient id="nebulaColor" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c2410c" stopOpacity="0.15" />
                  <stop offset="60%" stopColor="#7c2d12" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <circle cx="80" cy="40" r="35" fill="url(#nebulaColor)" />
              </svg>

              {/* Glowing Accretion Disk (Black Hole) */}
              <div className="relative w-11 h-11 bg-black rounded-full shadow-[0_0_12px_#ea580c] flex items-center justify-center z-12 animate-pulse">
                {/* Inner horizon dark hole */}
                <div className="w-6 h-6 bg-black rounded-full border border-[#f97316]/50 shadow-[inset_0_0_6px_rgba(0,0,0,1)] z-15" />
                
                {/* Curved orange/yellow matter ring */}
                <div className="absolute inset-0 rounded-full border-[1.5px] border-orange-500 opacity-80 animate-[spin_10s_linear_infinite]" />
                <div className="absolute -inset-1.5 rounded-full border border-amber-300 opacity-60 animate-[spin_15s_linear_infinite] border-dashed" />
                
                {/* Horizontal Accretion bar */}
                <div className="absolute h-1.5 w-16 bg-gradient-to-r from-transparent via-orange-500 via-amber-200 via-orange-500 to-transparent blur-[0.4px] rotate-[-8deg] z-14 shadow-[0_0_8px_#ea580c]" />
                <div className="absolute h-[1px] w-20 bg-white rotate-[-8deg] opacity-75 z-15" />
              </div>
            </div>

            {/* Right float blocks */}
            <div className="flex flex-col space-y-1 w-[28%] text-left font-sans">
              <div className="bg-emerald-950/40 border border-emerald-500/20 p-1 rounded flex flex-col justify-center">
                <span className="text-[5px] text-emerald-400 font-mono font-extrabold uppercase leading-none">120Hz VRR</span>
                <span className="text-[7px] font-black text-white leading-none mt-0.5">Smooth gaming frames</span>
              </div>
              <div className="bg-purple-950/40 border border-purple-500/20 p-1 rounded flex flex-col justify-center">
                <span className="text-[5px] text-purple-400 font-mono font-extrabold uppercase leading-none">MEMC CHASSIS</span>
                <span className="text-[7px] font-black text-white leading-none mt-0.5">Fluid frame motion</span>
              </div>
              <div className="bg-pink-950/40 border border-pink-500/20 p-1 rounded flex flex-col justify-center">
                <span className="text-[5px] text-pink-400 font-mono font-extrabold uppercase leading-none">DUAL CORES</span>
                <span className="text-[7px] font-black text-white leading-none mt-0.5">A55+A75 High setup</span>
              </div>
            </div>

          </div>

          <div className="text-[5px] font-mono text-zinc-650 tracking-wider flex justify-between uppercase z-10 w-full border-t border-zinc-900/40 pt-1">
            <span>C.R.I.S.P AI OPTIMIZED INTERACTIVE CORE PLATFORM</span>
            <span>PRO SATURATION CINEMA MODE SYNC</span>
          </div>
        </div>
      );

    case 'custom-wobble55-qled':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#03010b] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-[#a855f7] font-black uppercase font-mono mb-1">
                ULTRA-HIGH CONTRAST BRIGHTNESS ARRAY
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Vibrant Ultra QLED Quantum-Grid Panel
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7px] font-black tracking-widest text-zinc-500 uppercase font-mono">WOBBLE</span>
          </div>

          {/* Sunrise horizon view with backlight dividing grid */}
          <div className="my-auto h-[90px] w-full bg-zinc-950 border border-zinc-850 rounded-xl relative overflow-hidden flex items-center justify-center z-10 p-0.5">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 80">
              <defs>
                <linearGradient id="horizonSun" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="40%" stopColor="#f59e0b" />
                  <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="sunFlare" cx="50%" cy="80%" r="55%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="30%" stopColor="#fef08a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Sky background */}
              <rect width="160" height="80" fill="url(#horizonSun)" />
              {/* Glowing sunrise bulb */}
              <circle cx="80" cy="72" r="28" fill="url(#sunFlare)" />
              {/* Curve of Planet Earth */}
              <path d="M -10 80 Q 80 52 170 80 Z" fill="#0c0a1e" />
              <path d="M -10 80 Q 80 52 170 80 Z" stroke="#38bdf8" strokeWidth="0.8" fill="none" opacity="0.6" />

              {/* Grid split lines to represent local dimming layers */}
              <line x1="80" y1="0" x2="80" y2="80" stroke="#fff" strokeWidth="1" strokeDasharray="2 1" opacity="0.5" />
              
              {/* Light rays on the right (vibrant side) */}
              <path d="M 80 72 L 95 10 M 80 72 L 115 15 M 80 72 L 138 30 M 80 72 L 155 52" stroke="#facc15" strokeWidth="0.5" opacity="0.3" />
              <circle cx="110" cy="35" r="2" fill="#fff" opacity="0.8" className="animate-ping" />
              <circle cx="130" cy="22" r="1.5" fill="#fff" opacity="0.9" />
            </svg>

            {/* Left side standard split label */}
            <div className="absolute top-1 left-2 bg-black/60 px-1.5 py-0.5 rounded border border-zinc-800 text-[4px] font-mono text-zinc-400">
              STD LCD Backlight
            </div>
            {/* Right side QLED split label */}
            <div className="absolute top-1 right-2 bg-purple-950/70 px-1.5 py-0.5 rounded border border-purple-500/30 text-[4.2px] font-bold text-sky-300">
              Wobble Ultra QLED (1B active colors)
            </div>
          </div>

          <div className="text-[5px] font-mono text-zinc-650 tracking-wider flex justify-between uppercase z-10 w-full border-t border-zinc-900/40 pt-1">
            <span>PRO SATURATION HARDWARE COMPONENT INVENTORY</span>
            <span className="text-[#a855f7] font-black">100% COLOR VOLUME WITH QUANTUM DOT CORE</span>
          </div>
        </div>
      );

    case 'custom-wobble55-audio':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#020108] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-amber-500 font-black uppercase font-mono mb-1">
                80W ULTRASONIC DOLBY SOUND SYSTEM
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-rose-100 uppercase tracking-tight">
                Rocket Blast Core Sound Resonance
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7px] font-black text-zinc-400 font-mono">DOLBY ATMOS SOUND</span>
          </div>

          {/* Space Shuttle Launch rendering with radiating sound circles */}
          <div className="my-auto h-[90px] w-full bg-[#030206] rounded-xl border border-zinc-900 relative overflow-hidden flex items-center justify-between z-10 p-2">
            
            {/* Sound Wave ripple circles on both sides */}
            <svg className="absolute inset-0 w-full h-full stroke-orange-500/15 fill-none" viewBox="0 0 160 80">
              <circle cx="30" cy="40" r="10" className="animate-ping" style={{ animationDuration: '4s' }} />
              <circle cx="30" cy="40" r="22" strokeDasharray="3 3" />
              <circle cx="130" cy="40" r="10" className="animate-ping" style={{ animationDuration: '4.5s' }} />
              <circle cx="130" cy="40" r="22" strokeDasharray="3 3" />
            </svg>

            {/* Left speaker cone vector */}
            <div className="w-[18%] flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center relative shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]">
                <div className="w-4 h-4 rounded-full bg-zinc-900 border border-orange-500/40" />
                <div className="absolute w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              </div>
              <span className="text-[4.5px] text-zinc-500 font-mono mt-1">L-Speaker Setup</span>
            </div>

            {/* Center: Blast-off space shuttle rocket vector */}
            <div className="flex-1 max-w-[45%] h-full relative flex flex-col justify-end items-center">
              {/* Space Shuttle shuttle graphic */}
              <svg className="w-12 h-16 text-zinc-200 fill-current" viewBox="0 0 50 60">
                {/* Fuel Tank (orange center core) */}
                <rect x="21" y="10" width="8" height="35" rx="4" fill="#ea580c" />
                {/* White shuttle orbiter */}
                <path d="M 22 2 C 22 2, 25 15, 25 35 L 28 38 L 22 38 Z" fill="#fff" />
                {/* Left/Right booster rockets */}
                <rect x="15" y="18" width="4" height="24" rx="2" fill="#d4d4d8" />
                <rect x="31" y="18" width="4" height="24" rx="2" fill="#d4d4d8" />
                
                {/* Blast fumes (gradient clouds of orange/red) */}
                <path d="M 12 40 Q 25 58, 38 40 Q 30 46, 25 41 Q 20 46, 12 40" fill="#f97316" className="animate-pulse" />
                <circle cx="21" cy="48" r="3" fill="#ef4444" opacity="0.8" />
                <circle cx="25" cy="51" r="4.5" fill="#facc15" className="blur-[1.5px]" />
                <circle cx="29" cy="48" r="3" fill="#ef4444" opacity="0.8" />
              </svg>
              <span className="text-[5.5px] text-zinc-300 font-extrabold font-mono tracking-wide text-center mt-1 uppercase">80W Rocket acoustic field</span>
            </div>

            {/* Right speaker cone vector */}
            <div className="w-[18%] flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center relative shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]">
                <div className="w-4 h-4 rounded-full bg-zinc-900 border border-orange-500/40" />
                <div className="absolute w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              </div>
              <span className="text-[4.5px] text-zinc-500 font-mono mt-1">R-Speaker Setup</span>
            </div>
          </div>

          <div className="text-[5px] font-mono text-zinc-650 tracking-wider flex justify-between uppercase z-10 w-full border-t border-zinc-900/40 pt-1">
            <span>DENSE SOUND RESIDENCE FIELD INTEGRATED DECK ACTIVE</span>
            <span className="text-amber-500 font-extrabold">DOLBY PROFESSIONAL CO-CERTIFIED ACOUSTICS</span>
          </div>
        </div>
      );

    case 'custom-wobble55-profiles':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#020104] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col">
              <span className="text-[5.5px] tracking-widest text-[#06b6d4] font-black uppercase font-mono mb-1">
                HARDWARE DESIGN SCHEMATICS & PROFILES
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-white uppercase tracking-tight">
                Chassis Physical Profile Blueprint
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7.5px] font-black text-zinc-400 uppercase font-mono">SPEC PLANS</span>
          </div>

          {/* Three side physical profiles in blue thin line art */}
          <div className="my-auto h-[90px] w-full bg-black border border-zinc-900 rounded-xl relative overflow-hidden flex items-center justify-around z-10 p-2 text-center">
            
            {/* Profile 1: Left Elevation (with ports highlighted) */}
            <div className="flex flex-col items-center flex-1 relative border-r border-zinc-900">
              <svg className="h-[55px] w-16 fill-none stroke-cyan-500" viewBox="0 0 20 60">
                {/* Back chassis outline side view */}
                <path d="M 8 2 L 11 2 L 11 25 L 14 25 L 14 45 L 10 45 L 10 50 L 8 50 Z" strokeWidth="0.8" />
                {/* Tripod Stand bottom leg */}
                <path d="M 10 48 L 4 58 M 10 48 L 16 58" strokeWidth="1.2" strokeLinecap="round" />
                {/* Port holes */}
                <circle cx="12" cy="28" r="0.8" className="stroke-teal-400" />
                <rect x="11.5" y="32" width="1.2" height="2" rx="0.3" className="stroke-amber-400" />
                <rect x="11.5" y="36" width="1.2" height="2.5" rx="0.3" className="stroke-teal-400" />
              </svg>
              <span className="text-[5px] text-[#06b6d4] font-mono uppercase mt-0.5 font-bold">Left Elev. & Ports</span>
            </div>

            {/* Profile 2: Right Elevation (clean backing) */}
            <div className="flex flex-col items-center flex-1 relative border-r border-zinc-900">
              <svg className="h-[55px] w-16 fill-none stroke-cyan-500" viewBox="0 0 20 60">
                {/* Symmetrical right elevation */}
                <path d="M 11 2 L 8 2 L 8 25 L 5 25 L 5 45 L 9 45 L 9 50 L 11 50 Z" strokeWidth="0.8" />
                <path d="M 9 48 L 15 58 M 9 48 L 3 58" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-[5px] text-zinc-500 font-mono uppercase mt-0.5">Right Elevation</span>
            </div>

            {/* Profile 3: Under-panel view (grills layout & central brackets) */}
            <div className="flex flex-col items-center flex-1 relative">
              <svg className="h-[55px] w-[70px] fill-none stroke-cyan-500" viewBox="0 0 60 20">
                {/* Bottom chassis border */}
                <rect x="5" y="4" width="50" height="6" rx="1.5" strokeWidth="0.6" />
                {/* Central bracket wall screw */}
                <rect x="27" y="2" width="6" height="2" strokeWidth="0.5" />
                
                {/* Left/Right Audio Vent boxes */}
                <rect x="10" y="5.5" width="12" height="3" rx="0.5" strokeWidth="0.4" className="stroke-orange-400" />
                <line x1="11" y1="7" x2="21" y2="7" strokeDasharray="1 1" className="stroke-orange-400" strokeWidth="0.4" />
                
                <rect x="38" y="5.5" width="12" height="3" rx="0.5" strokeWidth="0.4" className="stroke-orange-400" />
                <line x1="39" y1="7" x2="49" y2="7" strokeDasharray="1 1" className="stroke-orange-400" strokeWidth="0.4" />
                
                {/* Feet supports bottom attach */}
                <circle cx="12" cy="10" r="1" className="fill-cyan-500" />
                <circle cx="48" cy="10" r="1" className="fill-cyan-500" />
              </svg>
              <span className="text-[5px] text-[#06b6d4] font-mono uppercase mt-0.5 font-bold">Bottom Speakers</span>
            </div>

          </div>

          <div className="text-[5px] font-mono text-zinc-650 tracking-wider flex justify-between uppercase z-10 w-full border-t border-zinc-900/40 pt-1">
            <span>CHASSIS TOTAL DEPTH: 85MM | RIGID TRIPOD SECURING SYSTEM</span>
            <span>WOBBLE PATENTED STEEL-PEDESTAL STRUCTURAL ASSEMBLY</span>
          </div>
        </div>
      );

    case 'custom-samsung55-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#040906] text-white rounded-2xl overflow-hidden flex border border-[#1b351e]/30 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Beautiful glowing forest background with coordinates and mushrooms */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
              <defs>
                <radialGradient id="forestGlow" cx="60%" cy="80%" r="90%">
                  <stop offset="0%" stopColor="#1e3f22" stopOpacity="0.45" />
                  <stop offset="45%" stopColor="#112415" stopOpacity="0.3) " />
                  <stop offset="100%" stopColor="#040906" stopOpacity="1" />
                </radialGradient>
                {/* Glowing mushrooms gradients */}
                <radialGradient id="shroomCapGlow" cx="50%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#84cc16" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="stemGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#3f6212" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <rect width="320" height="180" fill="url(#forestGlow)" />
              
              {/* Spores and fireflies particles */}
              <circle cx="160" cy="110" r="1.5" fill="#e2f8d1" opacity="0.75" className="blur-[0.5px] animate-pulse" />
              <circle cx="190" cy="120" r="1.2" fill="#fff" opacity="0.6" />
              <circle cx="210" cy="80" r="2" fill="#bef264" opacity="0.8" className="blur-[1px] animate-pulse" />
              <circle cx="230" cy="130" r="1" fill="#fff" opacity="0.5" />
              <circle cx="270" cy="110" r="1.8" fill="#bef264" opacity="0.8" className="blur-[0.5px]" />
              <circle cx="280" cy="140" r="1.2" fill="#e2f8d1" opacity="0.7" />
              <circle cx="140" cy="145" r="2.2" fill="#bef264" opacity="0.5" className="blur-[1px]" />
              <circle cx="172" cy="75" r="1" fill="#fff" opacity="0.4" />
              <circle cx="255" cy="55" r="1.5" fill="#bef264" opacity="0.6" />

              {/* TALL MUSHROOM (Right) */}
              {/* Stem */}
              <path d="M 228 145 Q 229 110, 227 80" stroke="url(#stemGlow)" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
              <path d="M 228 145 Q 229 110, 227 80" stroke="#fef08a" strokeWidth="0.8" strokeLinecap="round" opacity="0.9" />
              {/* Cap underglow */}
              <ellipse cx="227" cy="80" rx="20" ry="15" fill="url(#shroomCapGlow)" />
              {/* Cap structure */}
              <path d="M 205 82 C 205 82, 203 60, 227 57 C 251 60, 249 82, 249 82 C 249 82, 238 84, 227 83 C 216 84, 205 82, 205 82 Z" fill="#bbf7d0" opacity="0.9" stroke="#14532d" strokeWidth="0.5" />
              {/* Cap gills structure inside */}
              <path d="M 210 82 Q 227 75, 244 82" stroke="#4f8a10" strokeWidth="0.5" opacity="0.3" />
              <path d="M 215 82 Q 227 72, 239 82" stroke="#4f8a10" strokeWidth="0.5" opacity="0.3" />

              {/* SHORTER MUSHROOM (Left) */}
              {/* Stem */}
              <path d="M 181 145 Q 180 125, 181 110" stroke="url(#stemGlow)" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
              {/* Cap underglow */}
              <ellipse cx="181" cy="110" rx="14" ry="10" fill="url(#shroomCapGlow)" />
              {/* Cap */}
              <path d="M 166 111 C 166 111, 164 96, 181 94 C 198 96, 196 111, 196 111 C 196 111, 188 112, 181 112 C 174 112, 166 111, 166 111 Z" fill="#bbf7d0" opacity="0.95" stroke="#14532d" strokeWidth="0.4" />

              {/* Soft grass texture underneath */}
              <path d="M 130 145 Q 140 141, 150 145 Q 165 140, 180 145 Q 200 138, 220 145 Q 240 141, 260 145 L 300 145 L 300 152 L 120 152 Z" fill="#14532d" opacity="0.9" />
              <path d="M 145 145 L 147 138 M 205 145 L 203 139 M 212 145 L 214 140 M 248 145 L 250 137" stroke="#84cc16" strokeWidth="1" opacity="0.7" />
            </svg>
          </div>

          <MeshGrid />

          {/* Left panel layout replicating the exact image badge & feature specifications */}
          <div className="w-[43%] bg-black/85 border-r border-[#1e3f22]/20 z-10 flex flex-col justify-between p-3.5 relative font-sans">
            <div>
              {/* 55 Crystal 4K UHD TV label badge */}
              <div className="bg-[#00a6e0] text-white px-2.5 py-2 rounded-lg shadow-lg inline-flex flex-col items-start leading-none text-left w-full mb-1">
                <span className="text-sm font-black tracking-tight leading-none block">55</span>
                <span className="text-[6.5px] font-black uppercase tracking-widest text-[#e2f8d1] mt-0.5 font-mono">Crystal 4K UHD TV</span>
              </div>
            </div>

            {/* Structured specification labels replicating exact feature texts */}
            <div className="flex flex-col space-y-2.5 text-left my-auto">
              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-sky-400 stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-[7.5px] tracking-tight">Samsung Knox Security</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-sky-400 stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-[7.5px] tracking-tight">Multiple Voice Assistant</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-sky-400 stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2.5">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                  <line x1="7" y1="2" x2="7" y2="22" />
                  <line x1="17" y1="2" x2="17" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" strokeDasharray="2 2" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-[7.5px] tracking-tight">Endless Content</span>
                  <span className="text-[4.5px] text-zinc-500 font-mono">SAMSUNG TV PLUS PLATFORM</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center shrink-0">
                  <span className="text-[7px] font-black text-amber-500 font-mono">7</span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-extrabold text-white text-[7.5px] tracking-tight">7 Years Free OS Upgrade</span>
                </div>
              </div>
            </div>

            <span className="text-[5px] text-zinc-600 font-mono tracking-widest uppercase">INFINITY VISION SERIES</span>
          </div>

          {/* Right layout: Samsung logo */}
          <div className="flex-1 flex flex-col justify-between p-3 z-10 relative">
            <div className="flex justify-end w-full">
              <span className="text-white font-black tracking-widest text-[9px] font-sans uppercase">SAMSUNG</span>
            </div>

            <div className="my-auto text-right pr-2">
              <span className="text-[6.5px] font-mono tracking-widest text-emerald-400 uppercase font-black leading-none block">MOSS & PARTICLE LUMINANCE</span>
              <span className="text-[12px] font-black tracking-tight uppercase leading-tight italic mt-1 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent block">
                UA55UE84A
              </span>
            </div>

            <div className="flex justify-end">
              <div className="bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center space-x-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[5.5px] font-bold text-emerald-300 font-mono">UNIVERSAL GESTURES HANDLER</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'custom-samsung55-features':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#fafafa] text-zinc-900 rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-200 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Top television simulator showing purple bubbles exact image 2 layout */}
          <div className="h-[92px] w-full bg-gradient-to-br from-[#0c051e] to-[#03000a] rounded-lg border border-zinc-350 p-0.5 relative overflow-hidden flex items-end justify-center shadow-md">
            
            {/* Elegant glass-bubble fluid pattern */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 180">
              <defs>
                <radialGradient id="bubble1" cx="40%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                  <stop offset="70%" stopColor="#4f46e5" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0c051e" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="bubble2" cx="70%" cy="70%" r="45%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.7" />
                  <stop offset="80%" stopColor="#312e81" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#03000a" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="purpleBack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="100%" stopColor="#08071a" />
                </linearGradient>
              </defs>
              <rect width="320" height="180" fill="url(#purpleBack)" />
              
              {/* Highlight bubbles */}
              <circle cx="80" cy="90" r="35" fill="url(#bubble1)" />
              <circle cx="210" cy="110" r="42" fill="url(#bubble2)" />
              <circle cx="140" cy="45" r="20" fill="url(#bubble1)" opacity="0.6" />
              <circle cx="270" cy="50" r="25" fill="url(#bubble2)" opacity="0.5" />
              
              {/* Glossy overlay rings */}
              <circle cx="80" cy="90" r="32" stroke="#e9d5ff" strokeWidth="0.5" fill="none" opacity="0.4" />
              <circle cx="210" cy="110" r="38" stroke="#cbd5e1" strokeWidth="0.6" fill="none" opacity="0.5" />
              <circle cx="140" cy="45" r="18" stroke="#e9d5ff" strokeWidth="0.4" fill="none" opacity="0.3" />
            </svg>

            <div className="absolute top-1.5 left-2">
              <span className="text-[5.5px] text-zinc-400 font-extrabold tracking-widest uppercase">SAMSUNG</span>
            </div>

            {/* Bottom-right Crystal UHD text on TV screen */}
            <div className="absolute bottom-1 right-2 text-right">
              <h4 className="text-[9px] font-black text-white tracking-wide">Crystal UHD</h4>
            </div>

            {/* TV pedestal tiny feet */}
            <div className="absolute -bottom-0.5 inset-x-0 flex justify-between px-14 z-12">
              <div className="w-3 h-1 bg-zinc-900 rounded-t-sm" />
              <div className="w-3 h-1 bg-zinc-900 rounded-t-sm" />
            </div>
          </div>

          {/* Grid list of exactly 10 premium technical icons replicating the exact visual features */}
          <div className="grid grid-cols-5 gap-y-1.5 gap-x-1 my-auto pt-1 font-sans text-center">
            
            {/* Box 1 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-zinc-300 rounded flex items-center justify-center bg-white shadow-sm shrink-0">
                <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-zinc-900 tracking-tight leading-tight mt-1">Crystal Processor 4K</span>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-zinc-300 rounded flex items-center justify-center bg-white shadow-sm shrink-0">
                <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-zinc-900 tracking-tight leading-tight mt-1">4K Upscaling</span>
            </div>

            {/* Box 3 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-zinc-300 rounded flex items-center justify-center bg-white shadow-sm shrink-0">
                <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                  <circle cx="7.5" cy="10.5" r="1.5" />
                  <circle cx="11.5" cy="7.5" r="1.5" />
                  <circle cx="16.5" cy="9.5" r="1.5" />
                  <circle cx="15.5" cy="14.5" r="1.5" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-zinc-900 tracking-tight leading-tight mt-1">PurColor</span>
            </div>

            {/* Box 4 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-zinc-300 rounded flex items-center justify-center bg-white shadow-sm shrink-0">
                <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-zinc-900 tracking-tight leading-tight mt-1">HDR 10+ Range</span>
            </div>

            {/* Box 5 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-blue-200 rounded flex items-center justify-center bg-blue-50 shadow-sm shrink-0">
                <svg className="w-3 h-3 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-blue-600 tracking-tight leading-tight mt-1">Voice Assistant</span>
            </div>

            {/* Box 6 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-zinc-300 rounded flex items-center justify-center bg-white shadow-sm shrink-0">
                <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 17H19M5 7H19M5 12H19" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-zinc-900 tracking-tight leading-tight mt-1">Boundless Screen</span>
            </div>

            {/* Box 7 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-zinc-300 rounded flex items-center justify-center bg-white shadow-sm shrink-0">
                <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-zinc-900 tracking-tight leading-tight mt-1">Endless Content</span>
            </div>

            {/* Box 8 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-zinc-300 rounded flex items-center justify-center bg-white shadow-sm shrink-0">
                <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M8 3v18M16 3v18" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-zinc-900 tracking-tight leading-tight mt-1">Slim Look Design</span>
            </div>

            {/* Box 9 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-zinc-300 rounded flex items-center justify-center bg-white shadow-sm shrink-0">
                <svg className="w-3 h-3 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22a10 10 0 0 0 10-10H12V2z" />
                  <path d="M12 2H2a10 10 0 0 0 10 10V2z" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-zinc-900 tracking-tight leading-tight mt-1">Acoustic OTS Lite</span>
            </div>

            {/* Box 10 */}
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 border border-blue-200 rounded flex items-center justify-center bg-blue-500 shadow-sm shrink-0">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="4" r="2" />
                  <circle cx="4" cy="12" r="2" />
                  <circle cx="20" cy="12" r="2" />
                  <circle cx="12" cy="20" r="2" />
                  <line x1="12" y1="6" x2="12" y2="9" />
                  <line x1="6" y1="12" x2="9" y2="12" />
                  <line x1="18" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="18" x2="12" y2="15" />
                </svg>
              </div>
              <span className="text-[4.5px] font-black uppercase text-blue-600 tracking-tight leading-tight mt-1">SmartThings</span>
            </div>

          </div>

          <div className="flex justify-between items-center text-[5.5px] font-mono text-zinc-400 tracking-wider border-t border-zinc-200 pt-1">
            <span>SAMSUNG SMART TIZEN PLATFORM SERVICES</span>
            <span>OS LEVEL OPTIMIZED MEMORY CONTROL ACTIVE</span>
          </div>
        </div>
      );

    case 'custom-samsung55-side':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#fafafa] text-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-200 shadow-xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col font-sans">
              <span className="text-[5.5px] tracking-widest text-sky-600 font-extrabold uppercase font-mono mb-0.5">
                SLIM FIT WALL MOUNT & PEDESTAL PLAN
              </span>
              <h3 className="text-[12px] font-black text-zinc-900 uppercase tracking-tight">
                Boundless Profile Dimensions
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7.5px] font-black text-zinc-400 uppercase font-mono">SAMSUNG</span>
          </div>

          {/* Symmetrical Left / Right Profile view at an perspective skewed angle */}
          <div className="my-auto h-[90px] w-full bg-zinc-50 border border-zinc-200 rounded-xl relative overflow-hidden flex items-center justify-around z-10 p-2 text-center">
            
            {/* Perspective skew TV display box */}
            <div className="w-[50%] h-full flex items-center justify-center relative border-r border-zinc-200 pr-1">
              <div 
                style={{ transform: 'perspective(200px) rotateY(-20deg)' }}
                className="w-28 h-[58px] bg-gradient-to-br from-[#1e1b4b] to-[#0c0a0f] border-2 border-zinc-900 rounded relative overflow-hidden shadow-lg flex items-center justify-center"
              >
                {/* Glowing fluid gradient inside television display */}
                <div className="absolute w-20 h-20 bg-purple-500/30 rounded-full blur-xl left-2 top-1" />
                <div className="absolute w-12 h-12 bg-sky-500/20 rounded-full blur-lg right-1 bottom-1" />
                <span className="text-[6.5px] font-black tracking-widest text-[#cbd5e1] font-sans">Crystal UHD</span>
              </div>
              {/* Pedestal stand representation */}
              <div className="absolute bottom-1 w-20 flex justify-between px-4">
                <div className="w-1 h-3 bg-zinc-900 rounded-sm transform translate-x-2" />
                <div className="w-1 h-3 bg-zinc-900 rounded-sm transform -translate-x-2" />
              </div>
            </div>

            {/* Profile specifications list on the right */}
            <div className="w-[45%] flex flex-col justify-center space-y-1 text-left pl-3 font-sans">
              <div className="flex items-center space-x-1">
                <span className="text-[5.5px] font-mono text-zinc-400 font-bold uppercase">PHYSICAL STAND WIDTH:</span>
                <span className="text-[6.5px] font-extrabold text-zinc-900 font-mono">1025.4 mm</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-[5.5px] font-mono text-zinc-400 font-bold uppercase">TOTAL WEIGHT (STAND):</span>
                <span className="text-[6.5px] font-extrabold text-zinc-900 font-mono">14.2 kg</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-[5.5px] font-mono text-zinc-400 font-bold uppercase">VESA MOUNT PATTERN:</span>
                <span className="text-[6.5px] font-extrabold text-zinc-900 font-mono">200 x 200 mm</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-[5.5px] font-mono text-zinc-400 font-bold uppercase">BEZEL GAP THICKNESS:</span>
                <span className="text-[6.5px] font-extrabold text-emerald-600 font-mono">Slim Bezel-less</span>
              </div>
            </div>

          </div>

          <div className="text-[5px] font-mono text-zinc-405 tracking-wider flex justify-between uppercase z-10 w-full border-t border-zinc-200 pt-1">
            <span>UNIVERSAL GESTURES SENSOR POSITIONING DESIGN</span>
            <span className="text-sky-600 font-extrabold">SOLID STEEL PEDESTAL ARCHITECTURE</span>
          </div>
        </div>
      );

    case 'custom-samsung55-stadium':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#ece8df] text-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-300 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Beautiful Cozy living room wall structure with stadium TV screen */}
          <div className="absolute inset-0 z-0 bg-[#e7e1d5]" />
          
          {/* Vertical wood panel vertical stripes */}
          <div className="absolute inset-y-0 w-full flex justify-between px-6 z-0 opacity-[0.25]">
            <div className="w-[1px] h-full bg-[#78350f]" />
            <div className="w-[1px] h-full bg-[#78350f]" />
            <div className="w-[1px] h-full bg-[#78350f]" />
            <div className="w-[1px] h-full bg-[#78350f]" />
            <div className="w-[1px] h-full bg-[#78350f]" />
            <div className="w-[1px] h-full bg-[#78350f]" />
            <div className="w-[1px] h-full bg-[#78350f]" />
            <div className="w-[1px] h-full bg-[#78350f]" />
          </div>

          {/* Living room floor striped rug shadow */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#c5bbb0] to-transparent opacity-80 z-0" />

          {/* Header row */}
          <div className="flex justify-between items-start z-10 w-full font-sans">
            <span className="text-[5.5px] tracking-widest text-[#78350f] font-black uppercase font-mono">
              STADIUM FOOTBALL MODE OPTIMIZATION
            </span>
            <span className="text-[7px] font-bold text-zinc-500 uppercase font-mono">LIVING AREA SUITE</span>
          </div>

          {/* The main core living room visualizer */}
          <div className="my-auto h-[105px] w-full flex items-end justify-between relative z-10 px-2">
            
            {/* Left side: cozy armchair and little side table */}
            <div className="w-[18%] flex flex-col items-center mb-1">
              {/* Cozy round armchair and leg support */}
              <div className="w-9 h-7 bg-amber-500 rounded-t-xl rounded-b-md shadow-md border-b-[2.5px] border-amber-600 relative">
                {/* Arm chair pillow */}
                <div className="absolute top-1 left-1.5 right-1.5 h-3 bg-amber-400 rounded-md" />
                {/* Arm chair arm rests */}
                <div className="absolute top-1 left-0.5 w-1.5 h-4 bg-amber-600/30 rounded-sm" />
                <div className="absolute top-1 right-0.5 w-1.5 h-4 bg-amber-600/30 rounded-sm" />
              </div>
              <span className="text-[4px] text-zinc-500 font-mono mt-1 font-bold">Suite Chair</span>
            </div>

            {/* Center: Beautiful wall-mounted TV with high-saturation Stadium Match content */}
            <div className="flex-1 max-w-[62%] h-[75px] bg-black rounded border-[1.5px] border-zinc-850 p-0.5 relative overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center">
              
              {/* Stadium graphic background vector */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 80">
                {/* Deep atmospheric sky */}
                <rect width="160" height="80" fill="#0c4a6e" />
                <path d="M 0 80 Q 80 40, 160 80 Z" fill="#15803d" />
                
                {/* Stadium spectators grandstands in stadium mode */}
                <path d="M 0 60 Q 80 15, 160 60 L 160 20 Q 80 -10, 0 20 Z" fill="#b91c1c" />
                {/* Separating rows */}
                <path d="M 0 50 Q 80 10, 160 50" stroke="#fca5a5" strokeWidth="0.5" strokeDasharray="2 2" />
                <path d="M 0 40 Q 80 0, 160 40" stroke="#fca5a5" strokeWidth="0.5" strokeDasharray="3 1" />
                <path d="M 0 30 Q 80 -10, 160 30" stroke="#fca5a5" strokeWidth="0.5" />
                
                {/* Left/Right massive glowing floodlight stadium stands */}
                <line x1="30" y1="2" x2="30" y2="18" stroke="#cbd5e1" strokeWidth="1" />
                <rect x="25" y="2" width="10" height="4" fill="#fff" className="animate-pulse" />
                
                <line x1="130" y1="2" x2="130" y2="18" stroke="#cbd5e1" strokeWidth="1" />
                <rect x="125" y="2" width="10" height="4" fill="#fff" className="animate-pulse" />

                {/* Soccer soccer pitch markup lines */}
                <line x1="80" y1="56" x2="80" y2="80" stroke="#fff" strokeWidth="0.5" />
                <circle cx="80" cy="80" r="15" stroke="#fff" strokeWidth="0.5" fill="none" />
                
                {/* Dynamic vibrant soccer players indicators */}
                <circle cx="68" cy="65" r="1.5" fill="#fff" />
                <circle cx="82" cy="72" r="1.5" fill="#facc15" />
                <circle cx="95" cy="63" r="1.5" fill="#fff" />
              </svg>

              <div className="absolute top-1 left-1.5 bg-green-950/80 px-1 py-0.5 rounded border border-green-500/30 text-[3.8px] font-bold text-white uppercase font-mono">
                Stadium Mode: PRO CONTRAST INTENSE
              </div>

              {/* Wooden credenza / console below the TV */}
              <div className="absolute bottom-0 w-[85%] h-5 bg-[#a16207] border border-[#78350f] rounded-t-sm z-12 flex justify-between px-3 items-center shadow">
                <div className="w-5 h-2.5 border border-[#854d0e] rounded bg-[#854d0e]/60" />
                <div className="w-5 h-2.5 border border-[#854d0e] rounded bg-[#854d0e]/60" />
                <div className="w-5 h-2.5 border border-[#854d0e] rounded bg-[#854d0e]/60" />
              </div>
            </div>

            {/* Right side: green tropical plants in pot stand */}
            <div className="w-[18%] flex flex-col items-center mb-1">
              {/* Houseplant leaves */}
              <div className="w-5 h-8 flex flex-col justify-end items-center relative gap-0.5">
                <span className="text-[9px] leading-none text-emerald-600 block">🌿</span>
                {/* Small pot */}
                <div className="w-3.5 h-3 bg-zinc-400 rounded-b-md border border-zinc-500" />
              </div>
              <span className="text-[4px] text-zinc-500 font-mono mt-1 font-bold">Palm Stand</span>
            </div>

          </div>

          {/* Footer bar */}
          <div className="text-[4.8px] font-mono text-[#78350f]/70 tracking-wider flex justify-between uppercase z-10 w-full border-t border-[#78350f]/10 pt-1">
            <span>SOUND OUT: CO-CERTIFIED OBJECT TRACKING SOUND LITE SYSTEM</span>
            <span>VIBRANCE SPECTACLE ENHANCED OPTIMIZATION</span>
          </div>
        </div>
      );

    case 'custom-samsung55-chip':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#02040c] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-900 shadow-2xl select-none cursor-pointer ${className}`}
        >
          <MeshGrid />
          
          <div className="flex justify-between items-start z-10 w-full mb-1">
            <div className="flex flex-col font-sans">
              <span className="text-[5.5px] tracking-widest text-[#22d3ee] font-black uppercase font-mono mb-1">
                4K UPSCALING HIGH COMPUTE SEMICONDUCTOR
              </span>
              <h3 className="text-[11px] md:text-[13px] font-black text-rose-100 uppercase tracking-tight">
                Crystal Processor 4K Dual Engine
              </h3>
            </div>
            {/* Branding */}
            <span className="text-[7.5px] font-black tracking-widest text-zinc-500 uppercase font-mono">SAMSUNG SILICON</span>
          </div>

          {/* Central Processor graphics layout exact image 5 */}
          <div className="my-auto h-[90px] w-full bg-zinc-950 border border-zinc-900 rounded-xl relative overflow-hidden flex items-center justify-center z-10 p-2">
            
            {/* Glowing electrical circuit tracks layout */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 80">
              <defs>
                <radialGradient id="processorGlow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="160" height="80" fill="url(#processorGlow)" />
              
              {/* Glowing neon circuit tracings */}
              <path d="M 12 10 L 40 10 L 48 20 M 12 70 L 40 70 L 48 60" stroke="#06b6d4" strokeWidth="0.5" fill="none" opacity="0.4" />
              <path d="M 148 10 L 120 10 L 112 20 M 148 70 L 120 70 L 112 60" stroke="#06b6d4" strokeWidth="0.5" fill="none" opacity="0.4" />
              
              <line x1="48" y1="40" x2="112" y2="40" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.3" />
              <line x1="80" y1="20" x2="80" y2="60" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.3" />
              
              {/* Terminal solder dots representing chip mounting legs */}
              <circle cx="48" cy="20" r="1" fill="#22d3ee" className="animate-pulse" />
              <circle cx="112" cy="20" r="1" fill="#22d3ee" className="animate-pulse" />
              <circle cx="48" cy="60" r="1" fill="#22d3ee" className="animate-pulse" />
              <circle cx="112" cy="60" r="1" fill="#22d3ee" className="animate-pulse" />
            </svg>

            {/* Solid physical chip die centered */}
            <div className="w-32 h-[55px] bg-gradient-to-br from-[#10131e] via-[#090b11] to-[#040508] border-[1.5px] border-[#22d3ee]/40 rounded shadow-[0_0_15px_rgba(34,211,238,0.25)] flex flex-col justify-between p-2 text-center active:scale-98 transition-transform">
              <span className="text-[5.5px] font-mono tracking-widest text-[#22d3ee] font-black uppercase">S_CHIP_ENGINE PRO</span>
              
              {/* Chip core title texts replicating exact labels */}
              <div className="my-auto">
                <span className="text-[9px] font-black tracking-tight leading-none text-white block">SAMSUNG</span>
                <span className="text-[7.5px] font-black tracking-tight leading-none text-[#22d3ee] uppercase block mt-0.5">Crystal UHD</span>
                <span className="text-[6.5px] font-bold text-zinc-400 block uppercase mt-0.5">Processor 4K</span>
              </div>

              <div className="flex justify-between items-center text-[4.5px] font-mono text-zinc-500">
                <span>REDUCED ENGINE LATENCY</span>
                <span>HW MODEL 4K_A55X</span>
              </div>
            </div>

          </div>

          <div className="text-[5px] font-mono text-zinc-650 tracking-wider flex justify-between uppercase z-10 w-full border-t border-zinc-900/40 pt-1">
            <span>CORE TEMPERATURE CRYO PROTECTION MODULE ENGAGED</span>
            <span className="text-[#22d3ee] font-black">AI-POWERED REAL-TIME NOISE SCALING FILTERS ACTIVE</span>
          </div>
        </div>
      );

    case 'custom-compaq55-main':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#0c1a24] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-800 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Beautiful flowing wavy background reproducing the red & turquoise liquid/smoke style */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
              <defs>
                <linearGradient id="waveGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0e1b21" />
                  <stop offset="60%" stopColor="#0f2b34" />
                  <stop offset="100%" stopColor="#0a2a33" />
                </linearGradient>
                <radialGradient id="redLiquid" cx="20%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="#e11d48" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#9f1239" stopOpacity="0.6" />
                  <stop offset="75%" stopColor="#1e111d" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0c1a24" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="tealLiquid" cx="80%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#06b6d2" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#0d9488" stopOpacity="0.5" />
                  <stop offset="85%" stopColor="#0f2a33" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0c1a24" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="320" height="180" fill="url(#waveGlow)" />
              {/* Left fluid wave red */}
              <circle cx="60" cy="90" r="110" fill="url(#redLiquid)" />
              {/* Right fluid wave deep turquoise */}
              <circle cx="250" cy="80" r="130" fill="url(#tealLiquid)" />
              
              {/* Stylized vector paint stream/flow lines */}
              <path d="M -10 60 Q 120 110, 210 50 Q 280 10, 340 70" stroke="#f43f5e" strokeWidth="6" opacity="0.12" fill="none" class="blur-md" />
              <path d="M 0 140 Q 100 70, 200 130 Q 280 180, 330 90" stroke="#06b6d4" strokeWidth="8" opacity="0.15" fill="none" class="blur-md" />
              
              {/* Bubbles floaters exactly like Image 1 */}
              <circle cx="45" cy="50" r="3.5" fill="#fca5a5" stroke="#f43f5e" strokeWidth="0.5" opacity="0.4" />
              <circle cx="85" cy="135" r="4.2" fill="#fda4af" stroke="#f43f5e" strokeWidth="0.5" opacity="0.3" class="animate-pulse" />
              <circle cx="70" cy="110" r="11.5" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.25" />
              <circle cx="70" cy="110" r="10.5" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
              <circle cx="280" cy="45" r="7.5" fill="none" stroke="#22d3ee" strokeWidth="1.2" opacity="0.3" />
              <circle cx="280" cy="45" r="6.2" fill="#22d3ee" opacity="0.15" />
              <circle cx="180" cy="140" r="3" fill="#cbd5e1" opacity="0.2" />
            </svg>
          </div>

          <MeshGrid />

          {/* Top-left BRANDING in stylized bold font */}
          <div className="z-10 flex justify-between items-start font-sans">
            <span className="text-white text-[12px] font-black tracking-widest italic uppercase">
              COMPAQ
            </span>
            <div className="flex space-x-1.5 items-center">
              <span className="bg-red-600/95 text-white px-1 py-0.2 rounded text-[4.8px] font-black tracking-widest">
                WCG+ PANEL
              </span>
              <span className="bg-cyan-550/30 border border-cyan-400/20 px-1 py-0.2 rounded text-[4.8px] font-bold text-cyan-300">
                2 GB RAM
              </span>
            </div>
          </div>

          {/* Center Title overlay precisely following the photo: HUEQ X / androidtv */}
          <div className="z-10 text-center font-sans my-auto flex flex-col justify-center items-center">
            <h1 className="text-[26px] md:text-[32px] font-extrabold tracking-widest text-white uppercase drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.5)]">
              HUEQ <span className="text-red-500 font-black">X</span>
            </h1>
            <p className="text-[12px] font-light tracking-wide text-zinc-200 mt-0.5 lowercase flex items-center gap-1">
              <span>android</span>
              <span className="font-bold text-white">tv</span>
            </p>
          </div>

          {/* Bottom layout: model label vs UHD mark */}
          <div className="z-10 flex justify-between items-end font-sans">
            <div className="text-left">
              <span className="text-[5.5px] text-zinc-400 block tracking-widest uppercase font-mono">MODEL SERIES CQV55AX1UD</span>
              <span className="text-[7.5px] font-black text-[#22d3ee] uppercase tracking-wider block font-mono">140 CM (55&quot;) INCH BEZEL-LESS DISPLAY</span>
            </div>
            
            <h3 className="text-[14px] font-black text-zinc-100 uppercase tracking-widest font-mono">UHD</h3>
          </div>

          {/* Micro television feet bottom borders overlay */}
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-16 z-20 pointer-events-none">
            <div className="w-4 h-1.5 bg-zinc-950 rounded-t-sm transform -rotate-12 translate-y-0.5 border-t border-zinc-700" />
            <div className="w-4 h-1.5 bg-zinc-950 rounded-t-sm transform rotate-12 translate-y-0.5 border-t border-zinc-700" />
          </div>
        </div>
      );

    case 'custom-compaq55-nature':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#0f2a17] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-800 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Nature Background: Orchid green tone vignette */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0c2311] via-[#051108] to-[#010402]" />

          {/* Stunning illustrated botanical/hummingbird scene in central layout */}
          <div className="absolute inset-0 z-0 opacity-80 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
              <defs>
                <radialGradient id="flowerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#cb8a05" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#051108" stopOpacity="0" />
                </radialGradient>
                {/* Beautiful metallic colors for bird feathers */}
                <linearGradient id="birdFeathers" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>

              {/* Decorative vertical botanical soft lines */}
              <circle cx="100" cy="90" r="50" fill="url(#flowerGlow)" className="blur-xl" />

              {/* THE EXOTIC FLOWER (Yellow tropical plant spike) */}
              <path d="M 103 160 Q 94 110, 105 50" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 85 140 Q 98 135, 102 130" stroke="#15803d" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 85 140 Q 82 120, 89 105" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />
              {/* Petal layers on the flower spikes */}
              <path d="M 105 50 C 95 50, 90 70, 102 85 C 105 80, 115 65, 105 50 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
              <path d="M 104 65 C 93 65, 87 88, 101 100 C 105 92, 112 78, 104 65 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.5" />
              <path d="M 103 80 C 94 82, 88 102, 101 115 C 104 108, 111 93, 103 80 Z" fill="#d97706" stroke="#92400e" strokeWidth="0.5" />
              <path d="M 102 96 C 94 98, 89 116, 100 128 L 102 110 Z" fill="#b45309" stroke="#78350f" strokeWidth="0.5" />

              {/* HUMMINGBIRD (Facing Left) */}
              {/* Long thin beak pointing to flower */}
              <path d="M 152 75 L 112 68" stroke="#111827" strokeWidth="1" strokeLinecap="round" />
              {/* Head */}
              <circle cx="155" cy="76" r="5" fill="#1e293b" />
              <circle cx="154" cy="75" r="0.8" fill="#fff" /> {/* eye */}
              {/* Throat (vibrant cyan/emerald) */}
              <path d="M 150 78 Q 155 86, 162 82 Z" fill="#06d6a0" />
              {/* Body */}
              <path d="M 156 78 Q 163 94, 182 90 C 190 85, 185 75, 172 75 Z" fill="url(#birdFeathers)" />
              {/* Wings soaring upwards */}
              <path d="M 166 75 C 160 55, 185 30, 205 38 C 195 48, 178 62, 175 75 Z" fill="#1d4ed8" />
              <path d="M 168 75 C 163 60, 180 40, 195 45 C 188 53, 178 64, 175 75 Z" fill="#06b6d4" opacity="0.8" />
              {/* Tail feathers */}
              <path d="M 182 90 Q 205 105, 218 98 Q 195 90, 182 90" fill="#1e3a8a" />
              <path d="M 182 90 L 210 108" stroke="#000" strokeWidth="0.6" />
            </svg>
          </div>

          <MeshGrid />

          {/* Red branding top center exactly like image 2 */}
          <div className="z-10 flex flex-col items-center w-full font-sans text-center">
            <span className="text-red-500 text-[14px] font-black tracking-widest uppercase italic">
              COMPAQ
            </span>
            <p className="text-[6px] md:text-[7.5px] uppercase tracking-widest text-zinc-300 font-semibold mt-1 max-w-[240px]">
              ONLY THE SPARKLE IN YOUR EYE WILL MATCH THE DAZZLE OF COLOR
            </p>
          </div>

          {/* Bottom layout 4K UHD boxed logo precisely like Image 2 */}
          <div className="z-10 flex flex-col items-center w-full font-sans">
            <div className="border-[1.8px] border-zinc-100 bg-black/50 backdrop-blur-xs px-3 py-1 font-black text-[13px] md:text-[15px] tracking-tight uppercase italic leading-none flex items-center space-x-1 mb-1 shadow-lg">
              <span className="text-white">4K</span>
              <span className="bg-white text-zinc-950 px-1 ml-0.5 rounded-xs font-serif font-black">UHD</span>
            </div>
            
            <div className="flex justify-between items-center w-full text-[4.8px] font-mono text-zinc-400 mt-1 uppercase">
              <span>WCG+ DEEP CHROMATIC RE-SHAPING MODULE READY</span>
              <span>178 DEGREE SUPER IPS GRADE SPECTRAL RESPONSE ACTIVE</span>
            </div>
          </div>
        </div>
      );

    case 'custom-compaq55-angles':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#eceff1] text-zinc-950 rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-zinc-200 shadow-xl select-none cursor-pointer ${className}`}
        >
          {/* Subtle light geometric lines representing industrial studio backdrop */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#f1f5f9] via-[#e2e8f0] to-[#cbd5e1]" />
          
          <div className="absolute inset-0 opacity-[0.06] z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />
            </svg>
          </div>

          <div className="z-10 flex flex-col items-center w-full font-sans text-center">
            <span className="text-red-500 text-[13px] font-black tracking-widest uppercase italic">
              COMPAQ
            </span>
            <p className="text-[6.5px] uppercase tracking-wider text-zinc-650 font-black mt-1">
              EXPERIENCE THE SAME VISUALS FROM THE DIFFERENT ANGLES
            </p>
          </div>

          {/* Symmetrical perspectives with double televisions showing architecture */}
          <div className="my-auto h-[95px] w-full flex items-center justify-around relative z-10 px-2">
            
            {/* L-TV Angled 3D Representation precisely */}
            <div className="w-[45%] h-full flex flex-col justify-center items-center">
              <div 
                style={{ transform: 'perspective(300px) rotateY(28deg)' }}
                className="w-[105px] h-[58px] bg-sky-950 border-2 border-zinc-900 rounded relative overflow-hidden shadow-2xl"
              >
                {/* skyscraper upwards shot vector image */}
                <svg className="w-full h-full" viewBox="0 0 100 55" preserveAspectRatio="none">
                  <rect width="100%" height="55" fill="#38bdf8" />
                  {/* Sky gradient */}
                  <path d="M0 0 L100 0 L100 55 L0 55" fill="none" class="bg-gradient-to-b from-[#0284c7] to-[#bae6fd]" />
                  {/* Skyscraper from perspective ground angle */}
                  <polygon points="10,55 45,55 52,10 22,10" fill="#0f172a" />
                  <polygon points="50,55 90,55 78,5 60,5" fill="#1e293b" />
                  {/* Glass pane highlights */}
                  <line x1="30" y1="55" x2="35" y2="10" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                  <line x1="70" y1="55" x2="68" y2="5" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                </svg>
                {/* Thin glass screen gloss glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
              </div>
              <span className="text-[4.5px] font-bold text-zinc-500 font-mono mt-1">3D SKEW INTEGRAL (28° L-ROTATION)</span>
            </div>

            {/* R-TV Flat Representation */}
            <div className="w-[45%] h-full flex flex-col justify-center items-center">
              <div className="w-[105px] h-[58px] bg-sky-950 border-2 border-zinc-900 rounded relative overflow-hidden shadow-2xl">
                {/* Identical skyscraper upwards shot vector image */}
                <svg className="w-full h-full" viewBox="0 0 100 55" preserveAspectRatio="none">
                  <rect width="100%" height="55" fill="#38bdf8" />
                  <polygon points="10,55 45,55 52,10 22,10" fill="#0f172a" />
                  <polygon points="50,55 90,55 78,5 60,5" fill="#1e293b" />
                  {/* Glass highlights */}
                  <line x1="30" y1="55" x2="35" y2="10" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                  <line x1="70" y1="55" x2="68" y2="5" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                </svg>
                {/* Bezel-less highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20" />
              </div>
              <span className="text-[4.5px] font-bold text-zinc-500 font-mono mt-1">AXIAL FACING COMPOSITE VIEW</span>
            </div>

          </div>

          {/* Bottom Viewing Angle schematic icon */}
          <div className="z-10 flex justify-between items-end border-t border-zinc-300 pt-1.5 font-sans">
            <span className="text-[5px] text-zinc-400 uppercase font-mono font-bold leading-none">CQV55AX1UD CHASSIS PLAN</span>
            
            <div className="flex items-center space-x-1 bg-zinc-950 text-white px-2 py-0.5 rounded text-[5px] uppercase font-mono leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 rotate-45 transform" />
              <span className="font-extrabold text-[#22d3ee]">WIDE VIEWING ANGLE 178°</span>
            </div>
          </div>
        </div>
      );

    case 'custom-compaq55-sound':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#0d0912] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3.5 border border-[#4c1d95]/20 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Symmetrical Sound Emission Halo expanding from behind the TV */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0b0711] via-[#050308] to-[#010103]" />

          {/* Glowing Purple acoustic sound boundary dome */}
          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[155px] z-0 pointer-events-none">
            <div className="w-full h-full rounded-t-full border-[1.5px] border-[#a78bfa]/40 bg-[#6d28d9]/10 shadow-[0_0_50px_rgba(109,40,217,0.3)] flex items-center justify-center relative">
              {/* Inner sound dome rings */}
              <div className="w-[85%] h-[85%] rounded-t-full border border-[#c084fc]/20 bg-[#6d28d9]/5 flex items-center justify-center">
                <div className="w-[70%] h-[70%] rounded-t-full border border-[#d8b4fe]/10" />
              </div>
              {/* Particle dusts with low opacity */}
              <div className="absolute w-20 h-20 rounded-full bg-violet-600/10 blur-xl top-5" />
            </div>
          </div>

          <MeshGrid />

          {/* Top text branding layout */}
          <div className="z-10 flex flex-col items-center w-full font-sans text-center">
            <span className="text-red-500 text-[13px] font-black tracking-widest uppercase italic leading-none block">
              COMPAQ
            </span>
            <p className="text-[6px] uppercase tracking-widest text-[#a78bfa] font-black mt-1">
              IMMERSE YOURSELF IN A 360° SOUND EXPERIENCE
            </p>
          </div>

          {/* Bedroom/Studio TV Wall Mounted render */}
          <div className="my-auto h-[75px] w-full flex flex-col justify-end items-center relative z-10 font-sans">
            
            {/* The Wall-Mounted TV screen */}
            <div className="w-[110px] h-[55px] bg-[#020205] border-[1.2px] border-[#a78bfa]/40 rounded relative overflow-hidden shadow-2xl flex items-center justify-center p-0.5 mb-1.5 transition-transform active:scale-98">
              
              {/* Image singer vocal scene in deep indigo theme */}
              <svg className="w-full h-full" viewBox="0 0 100 50">
                <defs>
                  <radialGradient id="singerGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#020205" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="50" fill="#040108" />
                <circle cx="50" cy="25" r="30" fill="url(#singerGlow)" />
                
                {/* Vocal singer abstract silhouette */}
                <path d="M 40 50 C 40 40, 48 30, 50 12 C 51 30, 60 40, 60 50" fill="#a78bfa" opacity="0.67" />
                <circle cx="50" cy="11" r="3.5" fill="#f5f3ff" />
                
                {/* Microphone hold */}
                <line x1="43" y1="21" x2="49" y2="16" stroke="#fff" strokeWidth="0.8" />
                <circle cx="43" cy="21" r="1" fill="#fff" />
              </svg>

              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/0 via-violet-500/5 to-white/10" />
            </div>

            {/* Contemporary clean high-end media console table */}
            <div className="w-[140px] h-3 bg-zinc-950 border border-zinc-800 rounded flex justify-between px-6 items-center shadow-md">
              <div className="w-10 h-1.5 border border-zinc-850 rounded bg-zinc-900/50" />
              <div className="w-10 h-1.5 border border-zinc-850 rounded bg-zinc-900/50" />
            </div>
            
            {/* Soft shadow below console */}
            <div className="w-[125px] h-1.5 bg-black/40 blur-xs rounded-full mt-0.5" />
          </div>

          {/* Dolby Audio emblem precisely replicated on bottom center */}
          <div className="z-10 flex flex-col items-center w-full font-sans border-t border-[#4c1d95]/20 pt-1.5">
            <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded border border-[#6d28d9]/30">
              <span className="font-sans font-black text-[10px] tracking-tighter text-white inline-flex items-center">
                <span className="border-2 border-white rounded-l px-0.5 mr-0.5 rotate-180 inline-block text-[5.8px] leading-tight">D</span>
                <span className="border-2 border-white rounded-r px-0.5 inline-block text-[5.8px] leading-tight">D</span>
              </span>
              <span className="text-[6.5px] font-black text-zinc-100 tracking-wider">DOLBY AUDIO™</span>
            </div>
          </div>
        </div>
      );

    case 'custom-compaq55-hdr':
      return (
        <div 
          onClick={onClick}
          className={`relative aspect-video bg-[#061019] text-white rounded-2xl overflow-hidden flex flex-col justify-between p-3 border border-zinc-800 shadow-2xl select-none cursor-pointer ${className}`}
        >
          {/* Symmetrical High energy radial background for HDR illustration */}
          <div className="absolute inset-0 z-0 bg-[#02070e]" />
          
          <div className="absolute inset-0 z-0 opacity-85">
            <svg className="w-full h-full" viewBox="0 0 320 180" fill="none">
              <defs>
                <radialGradient id="hdrBurst" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#ea580c" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#be123c" stopOpacity="0.65" />
                  <stop offset="65%" stopColor="#1e152a" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#02070e" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="320" height="180" fill="url(#hdrBurst)" />
              
              {/* Vibrant abstract fire streaks representation */}
              <path d="M 0 90 Q 160 10, 320 90 L 320 180 L 0 180 Z" fill="#44051a" opacity="0.3" />
              
              {/* Symmetrical flock of storks flying across bright red sunrays */}
              {/* Stork 1 */}
              <path d="M 125 55 Q 112 50, 104 53 Q 115 54, 125 55" fill="#fff" stroke="#111827" strokeWidth="0.5" />
              <path d="M 112 51 C 112 51, 110 38, 122 35 C 118 43, 115 48, 112 51 Z" fill="#ffffff" /> {/* wing up */}
              <circle cx="127" cy="55" r="0.8" fill="#e11d48" /> {/* eye red stub */}

              {/* Stork 2 (Symmetrical minor bird) */}
              <path d="M 235 75 Q 225 72, 218 73 Q 227 74, 235 75" fill="#fff" stroke="#111827" strokeWidth="0.5" />
              <path d="M 225 73 C 225 73, 224 63, 233 60 C 230 66, 228 70, 225 73 Z" fill="#ffffff" />
            </svg>
          </div>

          <MeshGrid />

          {/* Top block branding header */}
          <div className="z-10 flex justify-between items-start font-sans">
            <span className="text-red-500 text-[12px] font-black tracking-widest uppercase italic">
              COMPAQ
            </span>
            <span className="text-[5.5px] text-zinc-400 font-mono tracking-wider uppercase bg-black/60 px-1 py-0.5 rounded border border-zinc-800">
              ULTRA HD HDR10+ COMPLIANT DIRECT DIRECT-ARRAY PANEL
            </span>
          </div>

          {/* Center visual indicator HDR10 */}
          <div className="z-10 text-center font-sans my-auto">
            <h2 className="text-[32px] font-black text-white italic tracking-tighter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              HDR<span className="text-[17px] align-super italic font-black text-[#facc15]">10</span>
            </h2>
          </div>

          {/* Bottom layout text content precisely from Image 5 */}
          <div className="z-10 flex flex-col items-center w-full font-sans text-center border-t border-zinc-800/40 pt-1.5">
            <span className="text-[7.5px] font-black text-rose-50 tracking-widest uppercase">
              ENJOY THE BRIGHTEST AND FINEST PICTURE EVER
            </span>
            <span className="text-[4.5px] font-mono text-zinc-500 uppercase mt-0.5 tracking-normal">
              PRO-TUNED COLOR SPECIFICATION HIGH VELOCITY GAMMA GRADIENT SELECTION ACTIVE
            </span>
          </div>
        </div>
      );

    default:
      return (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className={className}
          onClick={onClick}
        />
      );
  }
};

